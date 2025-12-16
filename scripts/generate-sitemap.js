
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ---
const BASE_URL = 'https://emojiverse.netlify.app';
const SUPPORTED_LOCALES = [
  'en', 'ru', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar', 'hi', 'kk'
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const articlesDir = path.join(rootDir, 'src', 'data', 'articles');
const publicDir = path.join(rootDir, 'public');

// --- HELPER TO GET ALL ARTICLE SLUGS ---
function getArticleSlugs() {
  if (!fs.existsSync(articlesDir)) return [];
  
  // Get all subdirectories in src/data/articles
  // Each folder name is the slug (e.g., "instagram-bio-hacks")
  return fs.readdirSync(articlesDir).filter(file => {
    return fs.statSync(path.join(articlesDir, file)).isDirectory();
  });
}

// --- GENERATE XML ---
function generateSitemap() {
  const slugs = getArticleSlugs();
  const currentDate = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // 1. Add Homepage (with language variants)
  SUPPORTED_LOCALES.forEach(lang => {
    // English is default /
    const loc = lang === 'en' ? BASE_URL + '/' : `${BASE_URL}/?lang=${lang}`;
    xml += `
  <url>
    <loc>${loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;
  });

  // 2. Add All Articles (with language variants)
  slugs.forEach(slug => {
    SUPPORTED_LOCALES.forEach(lang => {
      // Structure: /?lang=es&post=slug
      // For English, we can just use ?post=slug (or ?lang=en&post=slug to be explicit)
      const loc = `${BASE_URL}/?lang=${lang}&post=${slug}`;
      
      xml += `
  <url>
    <loc>${loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
  });

  xml += `
</urlset>`;

  return xml;
}

// --- WRITE FILE ---
try {
  const sitemap = generateSitemap();
  // Ensure public dir exists
  if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log(`✅ Sitemap generated with ${getArticleSlugs().length} articles across ${SUPPORTED_LOCALES.length} languages.`);
  console.log(`📍 Location: ${path.join(publicDir, 'sitemap.xml')}`);
} catch (error) {
  console.error("❌ Error generating sitemap:", error);
  process.exit(1);
}