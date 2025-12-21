import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// ---------- PATHS & SETUP ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(rootDir, '.env') });

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("❌ ERROR: API_KEY not found.");
  process.exit(1);
}

const inputPath = path.join(rootDir, 'input.txt');
if (!fs.existsSync(inputPath)) {
  console.error("❌ ERROR: input.txt not found.");
  process.exit(1);
}

const rawContent = fs.readFileSync(inputPath, 'utf-8');
if (!rawContent.trim()) {
  console.error("❌ ERROR: input.txt is empty.");
  process.exit(1);
}

console.log(`\n📄 Reading input.txt...`);

// ---------- SLUG GENERATION ----------
let slug = process.argv[2];
if (!slug) {
  let firstLine = rawContent.split('\n').find(l => l.trim() && !l.startsWith('SEO_DESC:'));
  slug = firstLine
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+$/g, '');
}

const articleDir = path.join(rootDir, 'src', 'data', 'articles', slug);
if (!fs.existsSync(articleDir)) fs.mkdirSync(articleDir, { recursive: true });

const ai = new GoogleGenAI({ apiKey });
const delay = ms => new Promise(r => setTimeout(r, ms));

// ---------- HELPER: Smart JSON Cleaner ----------
function cleanAndParseJSON(text) {
  let cleaned = text.trim();
  
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?/, '').replace(/```$/, '').trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.warn("⚠️ JSON Parse Warning: Attempting to auto-fix broken JSON...");
    if (cleaned.lastIndexOf('}') < cleaned.lastIndexOf(']')) {
        cleaned += '"]}}'; 
    } else if (cleaned.lastIndexOf('}') === -1) {
        cleaned += '}'; 
    } else if (!cleaned.endsWith('}')) {
        cleaned += '"}';
    }
    
    try {
        return JSON.parse(cleaned);
    } catch (e2) {
        throw new Error("Failed to parse JSON even after auto-fix.");
    }
  }
}

// ---------- STEP 1: Generate Master ----------
async function generateMaster() {
  console.log(`🚀 Generating English master content (Gemini 2.5 Flash)...`);

  const prompt = `
You are an expert CMS Content Generator.
Analyze the input text and generate a STRUCTURED JSON article.

INPUT TEXT:
"${rawContent}"

RULES:
1. **Model**: You are Gemini 2.5 Flash. Be precise and creative.
2. **Content**: Do NOT rewrite meaningful content. Keep it detailed.
3. **Structure**: Output strictly valid JSON.

CRITICAL VISUAL INSTRUCTIONS:

1. **TABLES (Modern UI)**:
   - Identify comparison lists or tabular data.
   - Convert them into a single HTML string inside the content array.
   - **Wrapper**: <div class="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 my-10 shadow-lg bg-white dark:bg-slate-900">
   - **Table Tag**: <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
   - **Header**: <thead class="bg-slate-50 dark:bg-slate-800/50"> ... <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
   - **Body**: <tbody class="divide-y divide-slate-200 dark:divide-slate-800"> ... <td class="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">

2. **ACCORDIONS / FAQ**:
   - Look for content between [ACCORDION] and [/ACCORDION] markers.
   - Convert each Question/Answer pair into this interactive HTML details tag:
   - <details class="group py-4 border-b border-slate-200 dark:border-slate-800 last:border-0"><summary class="flex cursor-pointer items-center justify-between font-bold text-slate-900 dark:text-white list-none"><span>QUESTION_TEXT</span><span class="text-indigo-500 transition group-open:rotate-180"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span></summary><div class="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">ANSWER_TEXT</div></details>
   - Do NOT include the [ACCORDION] markers in the output.

3. **LISTS & QUOTES**:
   - For bullet points, output HTML: <ul><li class="mb-2">...</li></ul>
   - For blockquotes, output HTML: <blockquote class="border-l-4 ...">...</blockquote>

4. **IMAGES**:
   - Insert 2 to 5 images randomly in the content array.
   - Format: "IMAGE: keyword | Alt text"

5. **COVER PROMPT**:
   - Generate a prompt for "coverImagePrompt".
   - **MANDATORY STYLE**: "Minimalist 3D glossy icon of [Subject] floating in center, clean soft gradient background, high quality, 8k, instagram aesthetic".
   - **STRICTLY FORBIDDEN**: "People, faces, text, letters, words, distorted limbs".
   - Keep prompt short (under 20 words).

OUTPUT JSON FORMAT:
{
  "meta": { "category": "...", "gradient": "...", "coverImagePrompt": "..." },
  "content": {
    "title": "...",
    "seoTitle": "...",
    "excerpt": "...",
    "seoDescription": "...",
    "content": [
      "Paragraph 1",
      "## Header",
      "<div class='overflow-hidden...'><table>...</table></div>", 
      "<details>...</details>",
      "<ul><li>...</li></ul>",
      "IMAGE: ..."
    ]
  }
}
`;

  const MAX_RETRIES = 4;
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash', 
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            generationConfig: { maxOutputTokens: 8192 } 
        }
      });

      const text = res.text;
      if (!text) throw new Error("Empty AI response");
      return cleanAndParseJSON(text);

    } catch (e) {
      console.warn(`⚠️ Master attempt ${i} failed: ${e.message}`);
      if (i === MAX_RETRIES) throw e;
      await delay(3000);
    }
  }
}

// ---------- STEP 2: Translate ----------
async function translateTo(lang, masterContent) {
  console.log(`   🌍 Translating to ${lang}...`);

  const prompt = `
Translate the following JSON content to language code: "${lang}".

RULES:
1. Keep the JSON structure EXACTLY the same.
2. **DO NOT TRANSLATE HTML TAGS OR CLASSES**.
   - Keep <div...>, <table...>, <details...>, <ul...>, <blockquote...> EXACTLY as they are.
   - ONLY translate the visible text content.
3. Translate paragraphs and headers.
4. Keep "IMAGE: keyword |" in English, translate only the Alt text part.

SOURCE JSON:
${JSON.stringify(masterContent)}
`;

  const MAX_RETRIES = 3;
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash', 
        contents: prompt,
        config: { 
            responseMimeType: "application/json",
            generationConfig: { maxOutputTokens: 8192 }
        }
      });

      const text = res.text;
      if (!text) throw new Error("Empty response");
      return cleanAndParseJSON(text);

    } catch (e) {
      console.warn(`⚠️ ${lang} attempt ${i} failed: ${e.message}`);
      if (i === MAX_RETRIES) return null;
      await delay(3000);
    }
  }
}

// ---------- MAIN FLOW ----------
async function main() {
  try {
    const master = await generateMaster();

    fs.writeFileSync(
      path.join(articleDir, 'en.ts'),
      `import { ArticleContent } from '../../../types';\nexport const en: ArticleContent = ${JSON.stringify(master.content, null, 2)};`
    );
    console.log(`✅ Saved en.ts`);

    const langs = ['ru','es','fr','de','it','pt','zh','ja','ko','ar','hi','kk'];
    const available = ['en'];

    for (const lang of langs) {
      const translated = await translateTo(lang, master.content);
      if (!translated) {
          console.error(`❌ Failed to translate to ${lang}`);
          continue;
      }

      fs.writeFileSync(
        path.join(articleDir, `${lang}.ts`),
        `import { ArticleContent } from '../../../types';\nexport const ${lang}: ArticleContent = ${JSON.stringify(translated, null, 2)};`
      );
      available.push(lang);
    }

    const varName = slug.replace(/-/g, '_').toUpperCase().replace(/[^A-Z0-9_]/g, '');
    
    // --- 1. COVER IMAGE GENERATION ---
    let rawImgPrompt = master.meta.coverImagePrompt || "abstract technology";
    
    // Обрезаем длину, чтобы не ломался URL
    if (rawImgPrompt.length > 200) rawImgPrompt = rawImgPrompt.substring(0, 190);

    // Жесткие ограничения: NO PEOPLE, NO TEXT
    const coverPrompt = `${rawImgPrompt}, object only, minimal 3D render, gradient background, soft lighting, 8k, high quality, no text, no letters, no people, no human face`;
    
    // Заменяем апострофы
    const encodedPrompt = encodeURIComponent(coverPrompt).replace(/'/g, '%27');
    
    const seed = Math.floor(Math.random() * 1000000);
    // Используем model=flux-realism
    const coverImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=630&nologo=true&seed=${seed}&model=flux-realism`;

    fs.writeFileSync(
      path.join(articleDir, 'index.ts'),
      `import { ArticleMaster } from '../../../types';
${available.map(l => `import { ${l} } from './${l}';`).join('\n')}

export const ${varName}: ArticleMaster = {
  slug: '${slug}',
  image: '${coverImageUrl}',
  category: '${master.meta.category}',
  gradient: '${master.meta.gradient}',
  locales: {
    ${available.join(',\n    ')}
  }
};
`
    );

    console.log(`\n🎉 Article generated successfully: ${slug}`);
    console.log(`🖼️  Cover Image: ${coverImageUrl}`);

  } catch (e) {
    console.error("\n❌ FATAL ERROR:", e);
  }
}

main();