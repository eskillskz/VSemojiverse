
import { EmojiRaw, EmojiGroup, Locale, GROUP_NAMES, LOCALE_DATA } from '@/types';
import { FALLBACK_EMOJIS } from '@/data/fallback';

// Using Emojibase CDN for localized data
const BASE_URL = 'https://cdn.jsdelivr.net/npm/emojibase-data@7';

// Canvas context for checking emoji support
let ctx: CanvasRenderingContext2D | null = null;

/**
 * Checks if an emoji is supported by the current browser/OS.
 */
const isEmojiSupported = (char: string): boolean => {
  if (typeof document === 'undefined') return true; // SSR safety

  if (!ctx) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    ctx = canvas.getContext('2d', { willReadFrequently: true });
  }

  if (!ctx) return true;

  const fontSize = 16;
  ctx.font = `${fontSize}px "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Android Emoji", sans-serif`;
  
  const measure = ctx.measureText(char);
  
  if (measure.width === 0) return false;
  if (char.length > 2 && measure.width > fontSize * 2.5) {
    return false;
  }

  return true;
};

/**
 * Helper to process raw data into groups
 */
const processEmojiData = (data: EmojiRaw[]): EmojiGroup[] => {
  const groups: Record<string, EmojiRaw[]> = {};
  
  // Initialize groups order based on GROUP_NAMES values
  Object.values(GROUP_NAMES).forEach(name => {
    if (name !== 'Component') groups[name] = [];
  });

  data.forEach(emoji => {
    // Basic support check
    if (!isEmojiSupported(emoji.emoji)) return;

    // Map numeric group ID to string name
    const groupName = GROUP_NAMES[emoji.group];
    
    // Skip if group is undefined or is 'Component' (skin tones etc)
    if (!groupName || groupName === 'Component') return;

    // Process variants/skins if they exist
    if (emoji.skins) {
      emoji.skins = emoji.skins.filter(skin => isEmojiSupported(skin.emoji));
    }

    // Ensure the group array exists before pushing
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    
    groups[groupName].push(emoji);
  });

  // Convert the map to an array of groups, filtering out empty ones
  return Object.entries(groups)
    .filter(([_, list]) => list.length > 0)
    .map(([groupName, emojis]) => ({
      groupName,
      emojis
    }));
};

/**
 * Fetches emoji data.
 */
export const fetchEmojis = async (locale: Locale = 'en'): Promise<EmojiGroup[]> => {
  try {
    let primaryLocale = locale;
    if (locale === 'kk') primaryLocale = 'ru'; // Fallback Kazakh to Russian for Emojibase

    console.log(`Fetching emojis for locale: ${primaryLocale}...`);

    // 1. Fetch Primary Locale (Display Language)
    const primaryResponse = await fetch(`${BASE_URL}/${primaryLocale}/data.json`);
    
    if (!primaryResponse.ok) {
      console.warn(`Locale ${locale} not found (Network Error or 404), trying English fallback.`);
      
      // If requested locale fails, try English. 
      if (primaryLocale !== 'en') {
         const enResponse = await fetch(`${BASE_URL}/en/data.json`);
         if (enResponse.ok) {
            const enData = await enResponse.json();
            return processEmojiData(enData);
         }
      }
      // If English fails (no internet), use local fallback
      console.warn("No internet connection or CDN blocked. Using limited local fallback data.");
      return processEmojiData(FALLBACK_EMOJIS);
    }

    const primaryData: EmojiRaw[] = await primaryResponse.json();
    
    // Map hexcode -> EmojiRaw for easy access to attach extra search tags
    const emojiMap = new Map<string, EmojiRaw>();
    primaryData.forEach(e => {
      e.searchTags = (e.label || '').toLowerCase(); // Initialize with own label
      if (e.tags) e.searchTags += ' ' + e.tags.join(' ').toLowerCase();
      emojiMap.set(e.hexcode, e);
    });

    // 2. Background Fetch for Multilingual Search
    // We do not await this to ensure the UI loads fast
    const otherLocales = LOCALE_DATA
      .map(l => (l.code === 'kk' ? 'ru' : l.code)) 
      .filter(code => code !== primaryLocale && code !== 'en'); 
    
    const uniqueLocales = [...new Set(otherLocales)];

    // Fire and forget (optional enhancement)
    Promise.all(uniqueLocales.map(code => 
      fetch(`${BASE_URL}/${code}/data.json`)
        .then(res => res.ok ? res.json() : [])
        .catch(() => []) 
    ));

    return processEmojiData(primaryData);

  } catch (error) {
    console.error(`CRITICAL: Failed to fetch emojis. Using fallback.`, error);
    return processEmojiData(FALLBACK_EMOJIS);
  }
};