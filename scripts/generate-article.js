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

// ---------- HELPER: Smart JSON Cleaner & Parser ----------
// Эта функция спасает скрипт, если Gemini 2.5 забыла закрыть скобку
function cleanAndParseJSON(text) {
  let cleaned = text.trim();
  
  // Убираем markdown обертку
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?/, '').replace(/```$/, '').trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.warn("⚠️ JSON Parse Warning: Attempting to auto-fix broken JSON...");
    // Эвристика: если строка обрывается, пробуем закрыть структуры
    // Часто обрыв бывает в массиве content или в самом конце объекта
    if (cleaned.lastIndexOf('}') < cleaned.lastIndexOf(']')) {
        cleaned += '"]}}'; 
    } else if (cleaned.lastIndexOf('}') === -1) {
        cleaned += '}'; 
    } else if (!cleaned.endsWith('}')) {
        cleaned += '"}'; // Закрываем строку и объект, если обрыв в значении
    }
    
    try {
        return JSON.parse(cleaned);
    } catch (e2) {
        throw new Error(`Failed to parse JSON. Raw text start: ${cleaned.substring(0, 50)}...`);
    }
  }
}

// ---------- STEP 1: Generate Master (English) ----------
async function generateMaster() {
  console.log(`🚀 Generating English master content using gemini-2.5-flash...`);

  const prompt = `
You are an expert CMS Content Generator.
Analyze the input text and generate a STRUCTURED JSON article.

INPUT TEXT:
"${rawContent}"

RULES:
1. **Model**: You are Gemini 2.5. Be precise and creative.
2. **Content**: Do NOT rewrite meaningful content. Keep it detailed.
3. **Structure**: Output strictly valid JSON.

CRITICAL VISUAL INSTRUCTIONS:

1. **TABLES (Modern UI)**:
   - Identify any comparison lists or tabular data.
   - Convert them into a single HTML string inside the content array.
   - **Wrapper**: <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 my-8 shadow-sm">
   - **Table Tag**: <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900/50">
   - **Header**: <thead class="bg-slate-50 dark:bg-slate-800/80"> ... <th class="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
   - **Body**: <tbody class="divide-y divide-slate-200 dark:divide-slate-800"> ... <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">

2. **ACCORDIONS / FAQ**:
   - Look for content explicitly marked with [ACCORDION] ... [/ACCORDION].
   - Convert each Question/Answer pair into this interactive HTML details tag:
   - <details class="group py-4 border-b border-slate-200 dark:border-slate-800 last:border-0"><summary class="flex cursor-pointer items-center justify-between font-bold text-slate-900 dark:text-white list-none"><span>QUESTION_TEXT</span><span class="text-indigo-500 transition group-open:rotate-180"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span></summary><div class="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">ANSWER_TEXT</div></details>
   - Do NOT include the [ACCORDION] markers in the output.

3. **IMAGES**:
   - Insert 2 to 5 images randomly in the content array.
   - Format: "IMAGE: keyword | Alt text"

4. **COVER PROMPT**:
   - Generate a conceptual prompt for "coverImagePrompt".
   - Style: "Photorealistic, 8k, cinematic lighting, professional editorial photography".
   - Avoid: "Text, distorted anatomy, extra limbs, cartoon".

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
      "IMAGE: ..."
    ]
  }
}
`;

  const MAX_RETRIES = 4;
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash', // Используем запрошенную модель
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            // Увеличиваем лимит токенов для надежности
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
   - Keep <div class="...">, <table...>, <details...>, <svg...> EXACTLY as they are.
   - ONLY translate the human-readable text *inside* the tags.
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
      await delay(2000);
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
    
    // --- Image Generation Logic (Flux Model) ---
    const rawImgPrompt = master.meta.coverImagePrompt || "abstract background";
    // Добавляем ключевые слова для реализма и качества
    const improvedPrompt = `${rawImgPrompt}, professional photography, 8k, highly detailed, realistic texture, cinematic lighting, award winning photo, no text, no distorted limbs`;
    const encodedPrompt = encodeURIComponent(improvedPrompt);
    
    const seed = Math.floor(Math.random() * 1000000);
    // Используем модель flux для лучшего качества
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=630&nologo=true&seed=${seed}&model=flux`;

    fs.writeFileSync(
      path.join(articleDir, 'index.ts'),
      `import { ArticleMaster } from '../../../types';
${available.map(l => `import { ${l} } from './${l}';`).join('\n')}

export const ${varName}: ArticleMaster = {
  slug: '${slug}',
  image: '${imageUrl}',
  category: '${master.meta.category}',
  gradient: '${master.meta.gradient}',
  locales: {
    ${available.join(',\n    ')}
  }
};
`
    );

    console.log(`\n🎉 Article generated successfully: ${slug}`);
    console.log(`🖼️  Image Prompt: "${master.meta.coverImagePrompt}"`);

  } catch (e) {
    console.error("\n❌ FATAL ERROR:", e);
  }
}

main();