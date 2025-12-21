import { BlogPost, ArticleMaster, LOCALE_DATA, Author } from '../types';

// ==============================================================================
// 1. IMPORT ARTICLES
// ==============================================================================

// --- Standard Articles ---
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
import { YEAR_OF_THE_FIRE_HORSE_2026 } from './articles/yearOfTheFireHorse2026/index';
import { FIRE_HORSE_YEAR_COMMON_MISTAKES_ZODIAC_SIGNS_MUST_AVOID } from './articles/2026-fire-horse-year-common-mistakes-zodiac-signs-must-avoid/index';
import { SEO_SECRETS_REVEALED_OPTIMIZING_PRODUCT_REVIEWS_FOR_GOOGLE } from './articles/seo-secrets-revealed-optimizing-product-reviews-for-google/index';
import { WHAT_DOES_THE_2026_YEAR_OF_THE_FIRE_HORSE_MEAN } from './articles/what-does-the-2026-year-of-the-fire-horse-mean';
import { IS_2026_YOUR_YEAR_ARIES_NAVIGATING_LOVE_CAREER_AND_FINANCE } from './articles/is-2026-your-year-aries-navigating-love-career-and-finance';
import { THE_ULTIMATE_LEO_HOROSCOPE_2026_NAVIGATING_THE_FIRE_HORSE } from './articles/the-ultimate-leo-horoscope-2026-navigating-the-fire-horse';
import { SAGITTARIUS_2026_FIRE_HORSE_HOROSCOPE_A_DEEP_DIVE_INTO_LOVE_CAREER } from './articles/sagittarius-2026-fire-horse-horoscope-a-deep-dive-into-love-career';
import { VIRGO_FIRE_HORSE_2026_HOROSCOPE_YOUR_COMPLETE_FORECAST_FOR_LOVE } from './articles/virgo-fire-horse-2026-horoscope-your-complete-forecast-for-love';
import { GEMINI_FIRE_HORSE_2026_YOUR_ULTIMATE_GUIDE_TO_CAREER_LOVE } from './articles/gemini-fire-horse-2026-your-ultimate-guide-to-career-love';
import { CAPRICORN_FIRE_HORSE_2026_PREDICTIONS_NAVIGATING_YOUR_PATH_TO_CAREER } from './articles/capricorn-fire-horse-2026-predictions-navigating-your-path-to-career';
import { LIBRAS_KEY_DECISIONS_2026_STRATEGIC_CHOICES_FOR_BUSINESS_MONEY } from './articles/libras-key-decisions-2026-strategic-choices-for-business-money';
import { AQUARIUS_2026_FIRE_HORSE_HOROSCOPE_COMPLETE_FORECAST_FOR_CAREER_LOVE } from './articles/aquarius-2026-fire-horse-horoscope-complete-forecast-for-career-love';
import { FINANCIAL_STABILITY_FOR_CANCER_IN_2026_FIRE_HORSE_INVESTMENT_INSIGHTS } from './articles/financial-stability-for-cancer-in-2026-fire-horse-investment-insights';
import { PISCES_CAREER_HOROSCOPE_2026_NAVIGATING_THE_FIRE_HORSE_ENERGY } from './articles/pisces-career-horoscope-2026-navigating-the-fire-horse-energy';
import { SCORPIO_LOVE_AND_RELATIONSHIPS_2026_PASSION_MEETS_INTENSITY } from './articles/scorpio-love-and-relationships-2026-passion-meets-intensity';
import { TAURUS_PARENTING_AND_HOME_LIFE_2026_NAVIGATING_THE_FIRE_HORSE_INFLUENCE } from './articles/taurus-parenting-and-home-life-2026-navigating-the-fire-horse-influence';
import { MASTERING_PRODUCT_LANDING_PAGE_SEO_IN_2026_20_REALWORLD_PROMOTION_TIPS } from './articles/mastering-product-landing-page-seo-in-2026-20-realworld-promotion-tips';
import { CONTENT_STRATEGY_SECRETS_5_INSTAGRAM_MARKETING_CASE_STUDIES_REVEALED } from './articles/content-strategy-secrets-5-instagram-marketing-case-studies-revealed';
import { THE_ULTIMATE_GUIDE_TO_HIRING_A_CONTENT_HEAD_FROM_SOURCING_TO_SCALING_BUSINESS_GROWTH } from './articles/the-ultimate-guide-to-hiring-a-content-head-from-sourcing-to-scaling-business-growth';
import { LOCAL_SEO_SURVIVAL_GETTING_CUSTOMERS_WHEN_AI_SUMMARIZES_YOUR_BUSINESS_WITHOUT_A_LINK } from './articles/local-seo-survival-getting-customers-when-ai-summarizes-your-business-without-a-link';
import { WHY_YOUR_SEOFRIENDLY_INSTAGRAM_NAME_CHANGE_IS_CONFUSING_FOLLOWERS_AND_KILLING_ENGAGEMENT } from './articles/why-your-seofriendly-instagram-name-change-is-confusing-followers-and-killing-engagement';
import { HASHTAGS_VS_SEMANTIC_KEYWORDS_WHICH_STRATEGY_ACTUALLY_LANDS_SMALL_ACCOUNTS_ON_THE_EXPLORE_PAGE } from './articles/hashtags-vs-semantic-keywords-which-strategy-actually-lands-small-accounts-on-the-explore-page';

// ==============================================================================
// 2. REGISTER ALL ARTICLES
// ==============================================================================
const ARTICLES_LIST: ArticleMaster[] = [
  HASHTAGS_VS_SEMANTIC_KEYWORDS_WHICH_STRATEGY_ACTUALLY_LANDS_SMALL_ACCOUNTS_ON_THE_EXPLORE_PAGE,
  WHY_YOUR_SEOFRIENDLY_INSTAGRAM_NAME_CHANGE_IS_CONFUSING_FOLLOWERS_AND_KILLING_ENGAGEMENT,
  LOCAL_SEO_SURVIVAL_GETTING_CUSTOMERS_WHEN_AI_SUMMARIZES_YOUR_BUSINESS_WITHOUT_A_LINK,
  THE_ULTIMATE_GUIDE_TO_HIRING_A_CONTENT_HEAD_FROM_SOURCING_TO_SCALING_BUSINESS_GROWTH,
  CONTENT_STRATEGY_SECRETS_5_INSTAGRAM_MARKETING_CASE_STUDIES_REVEALED,
  MASTERING_PRODUCT_LANDING_PAGE_SEO_IN_2026_20_REALWORLD_PROMOTION_TIPS,
  TAURUS_PARENTING_AND_HOME_LIFE_2026_NAVIGATING_THE_FIRE_HORSE_INFLUENCE,
  SCORPIO_LOVE_AND_RELATIONSHIPS_2026_PASSION_MEETS_INTENSITY,
  PISCES_CAREER_HOROSCOPE_2026_NAVIGATING_THE_FIRE_HORSE_ENERGY,
  FINANCIAL_STABILITY_FOR_CANCER_IN_2026_FIRE_HORSE_INVESTMENT_INSIGHTS,
  AQUARIUS_2026_FIRE_HORSE_HOROSCOPE_COMPLETE_FORECAST_FOR_CAREER_LOVE,
  LIBRAS_KEY_DECISIONS_2026_STRATEGIC_CHOICES_FOR_BUSINESS_MONEY,
  CAPRICORN_FIRE_HORSE_2026_PREDICTIONS_NAVIGATING_YOUR_PATH_TO_CAREER,
  GEMINI_FIRE_HORSE_2026_YOUR_ULTIMATE_GUIDE_TO_CAREER_LOVE,
  VIRGO_FIRE_HORSE_2026_HOROSCOPE_YOUR_COMPLETE_FORECAST_FOR_LOVE,
  SAGITTARIUS_2026_FIRE_HORSE_HOROSCOPE_A_DEEP_DIVE_INTO_LOVE_CAREER,
  THE_ULTIMATE_LEO_HOROSCOPE_2026_NAVIGATING_THE_FIRE_HORSE,
  IS_2026_YOUR_YEAR_ARIES_NAVIGATING_LOVE_CAREER_AND_FINANCE,
  WHAT_DOES_THE_2026_YEAR_OF_THE_FIRE_HORSE_MEAN,
  SEO_SECRETS_REVEALED_OPTIMIZING_PRODUCT_REVIEWS_FOR_GOOGLE,
  FIRE_HORSE_YEAR_COMMON_MISTAKES_ZODIAC_SIGNS_MUST_AVOID, 
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
// 3. AUTHORS CONFIGURATION (Virtual Authors)
// ==============================================================================
const AUTHORS: Author[] = [
  {
    id: 'sarah',
    name: 'Sarah Jenkins',
    role: 'Content Strategist',
    // AI generated professional face
    avatar: 'https://image.pollinations.ai/prompt/professional%20woman%20portrait%20smiling%20glasses%20marketing%20manager%20linkedin%20profile%20white%20background?width=200&height=200&seed=101&nologo=true'
  },
  {
    id: 'david',
    name: 'David Chen',
    role: 'Emoji Historian',
    avatar: 'https://image.pollinations.ai/prompt/professional%20asian%20man%20portrait%20tech%20writer%20smart%20casual%20studio%20lighting?width=200&height=200&seed=202&nologo=true'
  },
  {
    id: 'maria',
    name: 'Maria Rodriguez',
    role: 'Social Media Expert',
    avatar: 'https://image.pollinations.ai/prompt/creative%20latina%20woman%20portrait%20designer%20colorful%20clothing%20bright%20smile?width=200&height=200&seed=303&nologo=true'
  }
];

// Helper: Calculate Read Time based on actual content length
const calculateReadTime = (content: string[]): string => {
  const text = content.join(' ');
  const wordCount = text.split(/\s+/).length;
  // Average reading speed: 200 words per minute
  const minutes = Math.ceil(wordCount / 200);
  // Ensure at least 1 min
  return `${Math.max(1, minutes)} min read`;
};

// Helper: Get a deterministic author based on article slug
const getAuthorForArticle = (slug: string): Author => {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AUTHORS.length;
  return AUTHORS[index];
};

// Helper: Generate a deterministic "recent" date (2025 context)
// This ensures the date doesn't change on every refresh (good for SEO),
// but looks like a distinct date for each article.
const getDateForArticle = (slug: string): string => {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Base date: Oct 1, 2025
  const baseTime = new Date('2025-10-01').getTime();
  // Add random days between 0 and 60 based on slug hash
  const randomDays = Math.abs(hash) % 60; 
  const targetDate = new Date(baseTime + (randomDays * 24 * 60 * 60 * 1000));
  
  // Format: "Oct 24, 2025"
  return targetDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// ==============================================================================
// SYSTEM LOGIC (Generates the Blog Posts)
// ==============================================================================
export const BLOG_POSTS: BlogPost[] = [];

ARTICLES_LIST.forEach((article) => {
  // Safety check to prevent crashing if an import fails or is undefined
  if (!article) return;

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
        
        // --- DYNAMIC FIELDS ---
        date: getDateForArticle(article.slug),
        readTime: calculateReadTime(Array.isArray(content.content) ? content.content : []),
        author: getAuthorForArticle(article.slug),
        
        image: article.image,
        imageAlt: content.title,
        imageGradient: article.gradient || 'from-gray-500 to-slate-500',
      });
    }
  });
});