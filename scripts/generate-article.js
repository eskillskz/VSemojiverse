import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// ---------- PATHS ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// ---------- ENV ----------
dotenv.config({ path: path.join(rootDir, '.env') });

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("❌ ERROR: API_KEY not found.");
  process.exit(1);
}

// ---------- INPUT ----------
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

console.log(`📄 Reading input.txt`);
console.log(`👀 Preview: "${rawContent.substring(0, 100).replace(/\n/g, ' ')}..."`);

// ---------- SLUG ----------
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
fs.mkdirSync(articleDir, { recursive: true });

const ai = new GoogleGenAI({ apiKey });

// ---------- HELPERS ----------
const delay = ms => new Promise(r => setTimeout(r, ms));

function extractJSON(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?/, '').replace(/```$/, '').trim();
  }
  return JSON.parse(cleaned);
}

// ---------- STEP 1 ----------
async function generateMaster() {
  console.log(`🚀 Generating English master content...`);

  const prompt = `
You are an expert CMS Content Generator and SEO Specialist.

INPUT TEXT:
"${rawContent}"

RULES (CRITICAL):
- DO NOT rewrite or shorten the content meaningfully.
- Preserve ALL custom markers such as [ACCORDION] and [/ACCORDION] exactly as-is.
- Output valid JSON ONLY.
- content.content must be an ARRAY OF STRINGS.
- HTML tables are allowed as strings.
- DO NOT create objects inside content.content.

TABLES:
- Convert detected tables to HTML wrapped in:
  <div class="overflow-x-auto my-6">
- Table classes:
  table: min-w-full border border-gray-200
  th: bg-gray-800 text-white px-4 py-2 text-left
  td: px-4 py-2 border-t text-gray-800

IMAGES:
- Use: "IMAGE: keyword | Alt text"

OUTPUT FORMAT:
{
  "meta": {
    "category": "...",
    "gradient": "...",
    "coverImagePrompt": "..."
  },
  "content": {
    "title": "...",
    "seoTitle": "...",
    "excerpt": "...",
    "seoDescription": "...",
    "content": ["string", "string"]
  }
}
`;

  const MAX_RETRIES = 4;

  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const text = res.text;
      if (!text) throw new Error("Empty AI response");

      return extractJSON(text);

    } catch (e) {
      console.warn(`⚠️ Master attempt ${i} failed: ${e.message}`);
      if (i === MAX_RETRIES) throw e;
      await delay(3000);
    }
  }
}

// ---------- STEP 2 ----------
async function translateTo(lang, masterContent) {
  console.log(`   🌍 Translating to ${lang}`);

  const prompt = `
Translate the JSON below to "${lang}".

STRICT RULES:
- Keep JSON structure IDENTICAL.
- Preserve [ACCORDION] markers unchanged.
- Do NOT translate HTML tags or class names.
- Translate only visible text.

SOURCE JSON:
${JSON.stringify(masterContent)}
`;

  const MAX_RETRIES = 3;

  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const text = res.text;
      if (!text) throw new Error("Empty response");

      return extractJSON(text);

    } catch (e) {
      console.warn(`⚠️ ${lang} attempt ${i} failed`);
      if (i === MAX_RETRIES) return null;
      await delay(2500);
    }
  }
}

// ---------- MAIN ----------
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
      if (!translated) continue;

      fs.writeFileSync(
        path.join(articleDir, `${lang}.ts`),
        `import { ArticleContent } from '../../../types';\nexport const ${lang}: ArticleContent = ${JSON.stringify(translated, null, 2)};`
      );

      available.push(lang);
    }

    const varName = slug.replace(/-/g, '_').toUpperCase();

    const imgPrompt = encodeURIComponent(
      `${master.meta.coverImagePrompt}, professional stock photo, 4k`
    );

    const imageUrl = `https://image.pollinations.ai/prompt/${imgPrompt}?width=1200&height=630&nologo=true`;

    fs.writeFileSync(
      path.join(articleDir, 'index.ts'),
      `
import { ArticleMaster } from '../../../types';
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

    console.log(`🎉 Article generated successfully`);

  } catch (e) {
    console.error("❌ FATAL:", e);
  }
}

main();
