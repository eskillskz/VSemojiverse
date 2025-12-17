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

// --- PREVIEW INPUT ---
console.log(`\n📄 Reading 'input.txt'...`);
console.log(`👀 CONTENT PREVIEW (First 100 chars):\n"${rawContent.substring(0, 100).replace(/\n/g, ' ')}..."\n`);

// --- SLUG GENERATION ---
let slug = process.argv[2];
if (!slug) {
  let firstLine = rawContent.split('\n')[0].trim();
  if (firstLine.startsWith('SEO_DESC:')) {
     const lines = rawContent.split('\n');
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

// --- HELPER: Delay ---
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- HELPER: Clean and Parse JSON ---
function cleanAndParseJSON(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '').replace(/```$/, '');
  }
  return JSON.parse(cleaned);
}

// --- STEP 1: Generate Master Content (English + Meta) ---
async function generateMaster() {
  console.log(`🚀 Step 1/3: Generating Main Content (English) with Tables & Images...`);
  
  const prompt = `
  You are an expert CMS Content Generator and SEO Specialist.
  Analyze the following text and generate a structured JSON article.
  
  INPUT TEXT:
  "${rawContent}"

  REQUIREMENTS:
  1. Language: English (en).
  2. Create a catchy SEO title.
  3. **SEO DESCRIPTION**: Check if input starts with "SEO_DESC:". If yes, use it. If no, generate one.
  4. **CONTENT STRUCTURE**: 
     - Format content as an array of strings.
     - Use '## ' for headers.
     - Use standard paragraphs.
  
  5. **HANDLING TABLES (CRITICAL)**: 
     - If you detect tabular data in the input (Comparison lists, CSV data, or Markdown tables), DO NOT output a Markdown table.
     - Instead, convert it into a **Responsive HTML Table String** as a single item in the content array.
     - **Format**: Wrap the table in \`<div class="overflow-x-auto my-6">\`.
     - Style the \`<table>\` with Tailwind classes: \`min-w-full divide-y divide-gray-200 border\`.
     - Style \`<th>\` with \`bg-gray-50 px-4 py-2 text-left font-semibold text-gray-900\`.
     - Style \`<td>\` with \`px-4 py-2 border-t\`.
  
  6. **IMAGES**:
     - Insert 2 to 5 images randomly (format: "IMAGE: keyword | Alt text").
  
  7. **METADATA**:
     - Category: 'Instagram', 'Emoji', 'Business', 'History', or 'Astrology'.
     - Gradient: Tailwind CSS string (e.g. 'from-blue-500 to-purple-500').
     - **Cover Image Prompt**: Detailed English description for a stock photo.

  OUTPUT JSON FORMAT:
  {
    "meta": { "category": "...", "gradient": "...", "coverImagePrompt": "..." },
    "content": { "title": "...", "seoTitle": "...", "excerpt": "...", "seoDescription": "...", "content": ["Para 1", "<div class=...><table...>...</table></div>", "## Header"] }
  }
  `;

  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from AI");
      return cleanAndParseJSON(text);

    } catch (e) {
      console.warn(`   ⚠️ Master Generation Attempt ${attempt}/${MAX_RETRIES} failed: ${e.message}`);
      if (attempt === MAX_RETRIES) throw new Error("Failed to generate master content.");
      await delay(3000);
    }
  }
}

// --- STEP 2: Translate Content ---
async function translateTo(lang, masterContent) {
  console.log(`   ... Translating to '${lang}'`);
  
  const prompt = `
  Translate the JSON content to language code: '${lang}'.
  Keep structure EXACTLY same.
  
  RULES:
  1. Translate text fields (paragraphs, headers, seoDescription).
  2. **IMAGES**: Keep "IMAGE: keyword |" in English. Translate only the ALT text after "|".
  3. **TABLES (HTML)**: 
     - If you find an HTML string (starting with \`<div\` or \`<table\`), **DO NOT translate the HTML tags** (class names, div, tr, td).
     - **ONLY translate the visible text content** inside the \`<th>\` and \`<td>\` tags.
  
  SOURCE JSON:
  ${JSON.stringify(masterContent)}
  `;

  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const text = response.text;
      if (!text) throw new Error("Empty response");
      return cleanAndParseJSON(text);

    } catch (e) {
      console.warn(`      ⚠️ Error translating to ${lang} (Attempt ${attempt}): ${e.message}`);
      if (attempt < MAX_RETRIES) await delay(3000);
      else return null;
    }
  }
}

// --- MAIN FLOW ---
async function main() {
  try {
    const masterData = await generateMaster();
    
    // Save English
    const enContent = `import { ArticleContent } from '../../../types';\nexport const en: ArticleContent = ${JSON.stringify(masterData.content, null, 2)};`;
    fs.writeFileSync(path.join(articleDir, `en.ts`), enContent);
    console.log(`   ✅ Saved en.ts`);

    // Translate
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

    // Index & Cover Image
    const varName = slug.replace(/-/g, '_').toUpperCase().replace(/[^A-Z0-9_]/g, '');
    const rawPrompt = masterData.meta.coverImagePrompt || "abstract technology background";
    const encodedPrompt = encodeURIComponent(`${rawPrompt}, high quality, 4k, professional stock photo, unsplash style`);
    const seed = Math.floor(Math.random() * 10000);
    const coverImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=630&nologo=true&seed=${seed}`;

    const indexContent = `
import { ArticleMaster } from '../../../types';
${availableLangs.map(l => `import { ${l} } from './${l}';`).join('\n')}

export const ${varName}: ArticleMaster = {
  slug: '${slug}',
  image: '${coverImageUrl}',
  category: '${masterData.meta.category}',
  gradient: '${masterData.meta.gradient}',
  locales: {
    ${availableLangs.join(',\n    ')}
  }
};`;

    fs.writeFileSync(path.join(articleDir, 'index.ts'), indexContent);

    console.log(`\n🎉 SUCCESS! Article generated at: src/data/articles/${slug}`);
    console.log(`   🖼️ Cover Image Prompt: "${masterData.meta.coverImagePrompt}"`);
    console.log(`   👇 FINAL STEP: Add '${varName}' to src/data/blogPosts.ts`);

  } catch (error) {
    console.error("\n❌ FATAL ERROR:", error);
  }
}

main();