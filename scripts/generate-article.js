
import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Define paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load .env from root
dotenv.config({ path: path.join(rootDir, '.env') });

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("❌ ERROR: API_KEY not found. Make sure .env exists in the root folder.");
  process.exit(1);
}

const inputPath = path.join(rootDir, 'input.txt');
if (!fs.existsSync(inputPath)) {
  console.error(`❌ ERROR: input.txt not found at ${inputPath}`);
  process.exit(1);
}

const rawContent = fs.readFileSync(inputPath, 'utf-8');
if (!rawContent.trim()) {
  console.error("❌ ERROR: input.txt is empty.");
  process.exit(1);
}

// --- PREVIEW INPUT (Safety Check) ---
console.log(`\n📄 Reading 'input.txt'...`);
console.log(`👀 CONTENT PREVIEW (First 100 chars):\n"${rawContent.substring(0, 100).replace(/\n/g, ' ')}..."\n`);
console.log(`(If this is the OLD text, please save input.txt and run again)\n`);

// --- SLUG GENERATION ---
let slug = process.argv[2];
if (!slug) {
  // Use first line, but ignore SEO_DESC if present
  let firstLine = rawContent.split('\n')[0].trim();
  if (firstLine.startsWith('SEO_DESC:')) {
     const lines = rawContent.split('\n');
     // Find first line that isn't SEO_DESC and isn't empty
     for (let line of lines) {
        if (!line.startsWith('SEO_DESC:') && line.trim().length > 0) {
            firstLine = line.trim();
            break;
        }
     }
  }

  slug = firstLine
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+$/g, '');
  
  if (!slug) {
    console.error("❌ ERROR: Could not auto-generate slug. Provide one manually.");
    process.exit(1);
  }
  console.log(`ℹ️  Slug auto-generated: "${slug}"`);
}

const ai = new GoogleGenAI({ apiKey: apiKey });
const articleDir = path.join(rootDir, 'src', 'data', 'articles', slug);
if (!fs.existsSync(articleDir)) fs.mkdirSync(articleDir, { recursive: true });

// --- STEP 1: Generate Master Content (English + Meta) ---
async function generateMaster() {
  console.log(`🚀 Step 1/3: Generating Main Content (English) with SEO Images & Cover...`);
  
  const prompt = `
  You are an expert CMS Content Generator and SEO Specialist.
  Analyze the following text and generate a structured JSON article.
  
  INPUT TEXT:
  "${rawContent}"

  REQUIREMENTS:
  1. Language: English (en).
  2. Create a catchy SEO title.
  3. **SEO DESCRIPTION RULE**: Check if the input text starts with "SEO_DESC:". 
     - IF YES: Use the text immediately following "SEO_DESC:" exactly as provided.
     - IF NO: Generate a short, engaging SEO description.
  4. Format content as an array of strings (paragraphs). Use '## ' for headers.
  5. Select a Category: 'Instagram', 'Emoji', 'Business', 'History', or 'Astrology'.
  6. Generate a Tailwind CSS gradient string (e.g., 'from-blue-500 to-cyan-500').
  
  **7. IMAGE INSERTION (INTERNAL):**
     - Insert 2 to 5 images randomly throughout the 'content' array.
     - Format: "IMAGE: keyword1,keyword2 | Alt text"
  
  **8. COVER IMAGE PROMPT (IMPORTANT):**
     - Generate a specific, descriptive English prompt for the MAIN cover image. 
     - It should describe a high-quality, professional stock photo style image relevant to the topic.
     - Example: "minimalist workspace with laptop and coffee, soft lighting, 4k" or "futuristic neon interface with emojis, dark background, cyberpunk style"
     - Field name: "coverImagePrompt"

  OUTPUT JSON FORMAT:
  {
    "meta": { "category": "...", "gradient": "...", "coverImagePrompt": "..." },
    "content": { "title": "...", "seoTitle": "...", "excerpt": "...", "seoDescription": "...", "content": ["Para 1", "IMAGE: ...", "## Header"] }
  }
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: { responseMimeType: "application/json" }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI for Master Content");
  return JSON.parse(text);
}

// --- STEP 2: Translate Content ---
async function translateTo(lang, masterContent) {
  console.log(`   ... Translating to '${lang}'`);
  
  const prompt = `
  Translate the following JSON content to language code: '${lang}'.
  Keep the JSON structure exactly the same.
  
  IMPORTANT RULES:
  1. Translate 'seoDescription', 'excerpt', paragraphs, and headers.
  2. **HANDLE IMAGES**: 
     - Find strings starting with "IMAGE:".
     - Keep "IMAGE:" prefix and keywords (first part) in ENGLISH.
     - TRANSLATE ONLY the Alt Text (part after "|").
  
  SOURCE JSON:
  ${JSON.stringify(masterContent)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (e) {
    console.warn(`   ⚠️ Failed to translate to ${lang}:`, e.message);
    return null;
  }
}

// --- MAIN FLOW ---
async function main() {
  try {
    // 1. Generate English Master
    const masterData = await generateMaster();
    
    // Save English File
    const enContent = `import { ArticleContent } from '../../../types';\nexport const en: ArticleContent = ${JSON.stringify(masterData.content, null, 2)};`;
    fs.writeFileSync(path.join(articleDir, `en.ts`), enContent);
    console.log(`   ✅ Saved en.ts`);

    // 2. Translate to others
    const TARGET_LANGUAGES = ['ru', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar', 'hi', 'kk'];
    const availableLangs = ['en'];

    for (const lang of TARGET_LANGUAGES) {
      const translatedData = await translateTo(lang, masterData.content);
      if (translatedData) {
        const fileContent = `import { ArticleContent } from '../../../types';\nexport const ${lang}: ArticleContent = ${JSON.stringify(translatedData, null, 2)};`;
        fs.writeFileSync(path.join(articleDir, `${lang}.ts`), fileContent);
        availableLangs.push(lang);
      }
    }

    // 3. Generate Index with Auto-Generated Cover Image
    const varName = slug.replace(/-/g, '_').toUpperCase().replace(/[^A-Z0-9_]/g, '');
    
    // Construct Dynamic Image URL using Pollinations (Unsplash style)
    // We encode the prompt to ensure it works in a URL
    const rawPrompt = masterData.meta.coverImagePrompt || "abstract technology background";
    const encodedPrompt = encodeURIComponent(`${rawPrompt}, high quality, 4k, professional stock photo, unsplash style`);
    
    // Using a seed (random number) ensures we get a consistent image for this specific generation run, 
    // but a unique one if we regenerate.
    const seed = Math.floor(Math.random() * 10000);
    const coverImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=630&nologo=true&seed=${seed}`;

    const indexContent = `
import { ArticleMaster } from '../../../types';
${availableLangs.map(l => `import { ${l} } from './${l}';`).join('\n')}

export const ${varName}: ArticleMaster = {
  slug: '${slug}',
  image: '${coverImageUrl}', // Auto-generated Unsplash-style image
  category: '${masterData.meta.category}',
  gradient: '${masterData.meta.gradient}',
  locales: {
    ${availableLangs.join(',\n    ')}
  }
};`;

    fs.writeFileSync(path.join(articleDir, 'index.ts'), indexContent);

    console.log(`\n🎉 SUCCESS! Article generated at: src/data/articles/${slug}`);
    console.log(`   🖼️ Cover Image Auto-Generated: "${masterData.meta.coverImagePrompt}"`);
    console.log(`\n👇 FINAL STEP:`);
    console.log(`   Add this line to 'src/data/blogPosts.ts':`);
    console.log(`   import { ${varName} } from './articles/${slug}/index';`);
    console.log(`   ... and add '${varName}' to the ARTICLES_LIST array.`);

  } catch (error) {
    console.error("\n❌ FATAL ERROR:", error);
  }
}

main();