import { BlogPost, ArticleMaster, LOCALE_DATA } from '../types';

// ==============================================================================
// 1. IMPORT ARTICLES
// We use relative paths ('./') to point to files inside 'src/data/articles'
// ==============================================================================

// --- Standard Articles (Transferred from old data) ---
import { INSTAGRAM_BIO_HACKS } from './articles/instagramBioHacks';
import { EMOJI_CREATION_SECRETS } from './articles/emojiCreationSecrets';
import { EMOJI_MARKETING_GUIDE } from './articles/emojiMarketingGuide';
import { SOCIAL_MEDIA_EMOJI_ENGAGEMENT } from './articles/socialMediaEmojiEngagement';
import { EMOJIS_AND_SEO } from './articles/emojisAndSeo';
import { INSTAGRAM_MARKETING_2026 } from './articles/instagramMarketing2026';
import { INSTAGRAM_MARKETING_MISTAKES_2026 } from './articles/instagramMarketingMistakes2026';
import { KAOMOJI_ENGAGEMENT_SEO } from './articles/kaomojiEngagementSEO';
import { KAOMOJI_MARKETING_GUIDE } from './articles/kaomojiMarketingGuide';
import { INSTAGRAM_SEO_2026 } from './articles/instagramSEO2026';
import { NEW_YEAR_POEMS_2026 } from './articles/newYearPoems2026';
import { NEW_YEAR_COLLEAGUES_2026 } from './articles/newYearColleagues2026';
import { NEW_YEAR_WORKPLACE_SONGS_2026 } from './articles/newYearWorkplaceSongs2026';
import { NEW_YEAR_LYRICS_2026 } from './articles/newYearLyrics2026';
import { NEW_YEAR_CONGRATULATORY_LYRICS_2026 } from './articles/newYearCongratulatoryLyrics2026';

// --- Folder-based Articles ---
// Note: Ensure the folder 'yearOfTheFireHorse2026' was copied to src/data/articles
import { YEAR_OF_THE_FIRE_HORSE_2026 } from './articles/yearOfTheFireHorse2026/index';
import { FIRE_HORSE_YEAR_COMMON_MISTAKES_ZODIAC_SIGNS_MUST_AVOID } from './articles/2026-fire-horse-year-common-mistakes-zodiac-signs-must-avoid/index';
import { SEO_SECRETS_REVEALED_OPTIMIZING_PRODUCT_REVIEWS_FOR_GOOGLE } from './articles/seo-secrets-revealed-optimizing-product-reviews-for-google/index';
import { WHAT_DOES_THE_2026_YEAR_OF_THE_FIRE_HORSE_MEAN } from './articles/what-does-the-2026-year-of-the-fire-horse-mean';
import { IS_2026_YOUR_YEAR_ARIES_NAVIGATING_LOVE_CAREER_AND_FINANCE } from './articles/is-2026-your-year-aries-navigating-love-career-and-finance';
import { THE_ULTIMATE_LEO_HOROSCOPE_2026_NAVIGATING_THE_FIRE_HORSE } from './articles/the-ultimate-leo-horoscope-2026-navigating-the-fire-horse';
import { SAGITTARIUS_2026_FIRE_HORSE_HOROSCOPE_A_DEEP_DIVE_INTO_LOVE_CAREER } from './articles/sagittarius-2026-fire-horse-horoscope-a-deep-dive-into-love-career';
import { VIRGO_FIRE_HORSE_2026_HOROSCOPE_YOUR_COMPLETE_FORECAST_FOR_LOVE } from './articles/virgo-fire-horse-2026-horoscope-your-complete-forecast-for-love';
import { WHAT_DOES_2026_HOLD_FOR_THE_CAPRICORN_FIRE_HORSE } from './articles/what-does-2026-hold-for-the-capricorn-fire-horse';
import { GEMINI_FIRE_HORSE_2026_YOUR_ULTIMATE_GUIDE_TO_CAREER_LOVE } from './articles/gemini-fire-horse-2026-your-ultimate-guide-to-career-love';
// ==============================================================================
// 2. REGISTER ALL ARTICLES
// ==============================================================================
const ARTICLES_LIST: ArticleMaster[] = [
  GEMINI_FIRE_HORSE_2026_YOUR_ULTIMATE_GUIDE_TO_CAREER_LOVE,
  WHAT_DOES_2026_HOLD_FOR_THE_CAPRICORN_FIRE_HORSE,
  VIRGO_FIRE_HORSE_2026_HOROSCOPE_YOUR_COMPLETE_FORECAST_FOR_LOVE,
  SAGITTARIUS_2026_FIRE_HORSE_HOROSCOPE_A_DEEP_DIVE_INTO_LOVE_CAREER,
  THE_ULTIMATE_LEO_HOROSCOPE_2026_NAVIGATING_THE_FIRE_HORSE,
  IS_2026_YOUR_YEAR_ARIES_NAVIGATING_LOVE_CAREER_AND_FINANCE,
  WHAT_DOES_THE_2026_YEAR_OF_THE_FIRE_HORSE_MEAN,
  SEO_SECRETS_REVEALED_OPTIMIZING_PRODUCT_REVIEWS_FOR_GOOGLE,
  FIRE_HORSE_YEAR_COMMON_MISTAKES_ZODIAC_SIGNS_MUST_AVOID, // Newest first
  YEAR_OF_THE_FIRE_HORSE_2026,
  NEW_YEAR_CONGRATULATORY_LYRICS_2026,
  NEW_YEAR_LYRICS_2026,
  NEW_YEAR_WORKPLACE_SONGS_2026,
  NEW_YEAR_COLLEAGUES_2026,
  NEW_YEAR_POEMS_2026,
  INSTAGRAM_SEO_2026,
  KAOMOJI_MARKETING_GUIDE,
  KAOMOJI_ENGAGEMENT_SEO,
  INSTAGRAM_MARKETING_MISTAKES_2026,
  INSTAGRAM_MARKETING_2026,
  EMOJIS_AND_SEO,
  SOCIAL_MEDIA_EMOJI_ENGAGEMENT,
  EMOJI_MARKETING_GUIDE,
  EMOJI_CREATION_SECRETS,
  INSTAGRAM_BIO_HACKS
];

// ==============================================================================
// SYSTEM LOGIC (Generates the Blog Posts)
// ==============================================================================
export const BLOG_POSTS: BlogPost[] = [];

ARTICLES_LIST.forEach((article, index) => {
  // Safety check to prevent crashing if an import fails or is undefined
  if (!article) {
    return;
  }

  LOCALE_DATA.forEach(localeInfo => {
    const loc = localeInfo.code;
    // Fallback to English if translation is missing
    const content = article.locales[loc] || article.locales['en'];
    
    if (content) {
      BLOG_POSTS.push({
        id: `${article.slug}-${loc}`,
        slug: article.slug,
        locale: loc,
        
        title: content.title || 'Untitled Post',
        seoTitle: content.seoTitle || content.title,
        excerpt: content.excerpt || '',
        seoDescription: content.seoDescription || content.excerpt,
        content: Array.isArray(content.content) ? content.content : [],
        category: article.category || 'General',
        
        // These fields are required by the UI design
        date: "2024", 
        readTime: "5 min", 
        
        image: article.image,
        imageAlt: content.title,
        imageGradient: article.gradient || 'from-gray-500 to-slate-500',
      });
    }
  });
});