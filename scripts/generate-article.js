import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Env
dotenv.config({ path: path.join(rootDir, '.env') });

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("❌ ERROR: API_KEY not found.");
  process.exit(1);
}

// Input
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

// Slug
let slug = process.argv[2];
if (!slug) {
  let firstLine = rawContent.split('\n').find(l => l.trim() && !l.startsWith('SEO_DESC:'));
  slug = firstLine
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+$/g, '');

  if (!slug) {
    console.error("❌ ERROR: Could not auto-generate slug.");
    process.exit(1);
  }
}

const ai = new GoogleGenAI({ apiKey });
const articleDir = path.join(rootDir, 'src', 'data', 'articles', slug);
fs.mkdirSync(articleDir, { recursive: true });

// Utils
const delay = (ms) => new Promise(r => setTimeout(r, ms));

function cleanAndParseJSON(text) {
  let cleaned = text.trim()
    .replace(/^```json/, '')
    .replace(/^```/, '')
    .replace(/```$/, '');
  return JSON.parse(cleaned);
}

// 🔒 CRITICAL: normalize content → ONLY string[]
function normalizeContentArray(input) {
  if (!Array.isArray(input)) return [];

  return input.map(item => {
    if (typeof item === 'string') return item;

    if (typeof item === 'object' && item !== null) {
      const key = Object.keys(item)[0] || 'SECTION';
      return `[SECTION: ${key}]\n${JSON.stringify(item[key], null, 2)}`;
    }

    return String(item);
  });
}

// Step 1
async function generateMaster() {
  const prompt = `
You are an expert CMS Content Generator.

STRICT RULES:
- content.content MUST be an array of STRINGS
- NEVER output objects or named keys inside content array
- Interactive blocks (FAQ, accordion) MUST be plain text strings

INPUT:
"${rawContent}"

OUTPUT JSON:
{
  "meta": { "category": "...", "gradient": "...", "coverImagePrompt": "..." },
  "content": {
    "title": "...",
    "seoTitle": "...",
    "excerpt": "...",
    "seoDescription": "...",
    "content": ["string only"]
  }
}
`;

  for (let i = 1; i <= 3; i++) {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const parsed = cleanAndParseJSON(res.text);
      parsed.content.content = normalizeContentArray(parsed.content.content);
      return parsed;

    } catch (e) {
      console.warn(`⚠️ Attempt ${i} failed: ${e.message}`);
      if (i === 3) throw e;
      await delay(3000);
    }
  }
}

// Translation
async function translateTo(lang, content) {
  const prompt = `
Translate JSON to ${lang}.
KEEP STRUCTURE.
DO NOT add keys.
Return valid JSON only.

SOURCE:
${JSON.stringify(content)}
`;

  for (let i = 1; i <= 3; i++) {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const parsed = cleanAndParseJSON(res.text);
      parsed.content = normalizeContentArray(parsed.content);
      return parsed;

    } catch (e) {
      console.warn(`⚠️ ${lang} attempt ${i} failed`);
      if (i === 3) return null;
      await delay(3000);
    }
  }
}

// Main
(async function main() {
  try {
    const master = await generateMaster();

    fs.writeFileSync(
      path.join(articleDir, 'en.ts'),
      `import { ArticleContent } from '../../../types';\nexport const en: ArticleContent = ${JSON.stringify(master.content, null, 2)};`
    );

    const langs = ['ru','es','fr','de','it','pt','zh','ja','ko','ar','hi','kk'];
    const available = ['en'];

    for (const lang of langs) {
      const t = await translateTo(lang, master.content);
      if (!t) continue;

      fs.writeFileSync(
        path.join(articleDir, `${lang}.ts`),
        `import { ArticleContent } from '../../../types';\nexport const ${lang}: ArticleContent = ${JSON.stringify(t, null, 2)};`
      );
      available.push(lang);
    }

    const varName = slug.replace(/-/g, '_').toUpperCase();
    const cover = encodeURIComponent(master.meta.coverImagePrompt || 'abstract');
    const seed = Math.floor(Math.random() * 10000);

    fs.writeFileSync(
      path.join(articleDir, 'index.ts'),
      `
import { ArticleMaster } from '../../../types';
${available.map(l => `import { ${l} } from './${l}';`).join('\n')}

export const ${varName}: ArticleMaster = {
  slug: '${slug}',
  image: 'https://image.pollinations.ai/prompt/${cover}?width=1200&height=630&seed=${seed}',
  category: '${master.meta.category}',
  gradient: '${master.meta.gradient}',
  locales: { ${available.join(', ')} }
};
`
    );

    console.log(`🎉 SUCCESS: ${slug}`);

  } catch (e) {
    console.error("❌ FATAL:", e);
    process.exit(1);
  }
})();
