
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ---
// ВАЖНО: Укажите здесь ваш реальный домен, который будет в Google Search Console
// Если используете кастомный домен (например, webseotips.com), впишите его сюда вместо netlify
const BASE_URL = 'https://emojiverse.netlify.app'; 

const SUPPORTED_LOCALES = [
  'en', 'ru', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar', 'hi', 'kk'
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const articlesDir = path.join(rootDir, 'src', 'data', 'articles');
const publicDir = path.join(rootDir, 'public');

// --- HELPER: ESCAPE XML SPECIAL CHARS ---
// Это исправляет ошибку "EntityRef: expecting ';'"
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// --- HELPER: GET ALL ARTICLE SLUGS ---
function getArticleSlugs() {
  if (!fs.existsSync(articlesDir)) return [];
  return fs.readdirSync(articlesDir).filter(file => {
    return fs.statSync(path.join(articlesDir, file)).isDirectory();
  });
}

// --- HELPER: BUILD URL ---
function buildUrl(lang, slug = null) {
  let url = BASE_URL;
  
  if (slug) {
    // Article URL structure
    if (lang === 'en') {
      url += `/?post=${slug}`; // Default English structure
    } else {
      url += `/?lang=${lang}&post=${slug}`;
    }
  } else {
    // Homepage URL structure
    if (lang === 'en') {
      url += `/`;
    } else {
      url += `/?lang=${lang}`;
    }
  }
  return url;
}

// --- GENERATE XML ---
function generateSitemap() {
  const slugs = getArticleSlugs();
  const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  // Required header for Hreflang support
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // 1. Process Homepage (Multi-language)
  SUPPORTED_LOCALES.forEach(currentLang => {
    const loc = buildUrl(currentLang);
    
    xml += `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>`;

    // Add Hreflang links (Cross-referencing all languages including self)
    SUPPORTED_LOCALES.forEach(altLang => {
      const altUrl = buildUrl(altLang);
      xml += `
    <xhtml:link 
      rel="alternate" 
      hreflang="${altLang}" 
      href="${escapeXml(altUrl)}"/>`;
    });

    // Add x-default (usually maps to English/Main version)
    const defaultUrl = buildUrl('en');
    xml += `
    <xhtml:link 
      rel="alternate" 
      hreflang="x-default" 
      href="${escapeXml(defaultUrl)}"/>
  </url>`;
  });

  // 2. Process Articles (Multi-language)
  slugs.forEach(slug => {
    SUPPORTED_LOCALES.forEach(currentLang => {
      const loc = buildUrl(currentLang, slug);

      xml += `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;

      // Add Hreflang links for this specific article
      SUPPORTED_LOCALES.forEach(altLang => {
        const altUrl = buildUrl(altLang, slug);
        xml += `
    <xhtml:link 
      rel="alternate" 
      hreflang="${altLang}" 
      href="${escapeXml(altUrl)}"/>`;
      });

      // Add x-default for article
      const defaultUrl = buildUrl('en', slug);
      xml += `
    <xhtml:link 
      rel="alternate" 
      hreflang="x-default" 
      href="${escapeXml(defaultUrl)}"/>
  </url>`;
    });
  });

  xml += `
</urlset>`;

  return xml;
}

// --- WRITE FILE ---
try {
  console.log("🚀 Starting Sitemap Generation...");
  const sitemap = generateSitemap();
  
  // Ensure public dir exists
  if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log(`✅ Sitemap generated successfully!`);
  console.log(`   - Articles: ${getArticleSlugs().length}`);
  console.log(`   - Languages: ${SUPPORTED_LOCALES.length}`);
  console.log(`   - File: ${path.join(publicDir, 'sitemap.xml')}`);
  console.log(`   - XML escaping & Hreflang tags applied.`);
} catch (error) {
  console.error("❌ Error generating sitemap:", error);
  process.exit(1);
}