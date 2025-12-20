export type Locale = 
  | 'en' | 'es' | 'ru' | 'zh' | 'ko' | 'ja' 
  | 'fr' | 'it' | 'kk' | 'ar' | 'hi' | 'pt' | 'de';

export interface EmojiRaw {
  hexcode: string;
  emoji: string;
  label: string;
  baseLabel?: string;
  tags?: string[];
  searchTags?: string;
  group: number;
  subgroup?: number;
  skins?: EmojiRaw[];
  version?: number;
}

export interface EmojiGroup {
  groupName: string;
  emojis: EmojiRaw[];
}

export interface KaomojiItem {
  text: string;
  meaning: string;
  tags: string[];
  keywords: string;
}

export interface KaomojiGroup {
  name: string;
  items: KaomojiItem[];
}

export const GROUP_NAMES: Record<number, string> = {
  0: 'Smileys & Emotion',
  1: 'People & Body',
  2: 'Component',
  3: 'Animals & Nature',
  4: 'Food & Drink',
  5: 'Travel & Places',
  6: 'Activities',
  7: 'Objects',
  8: 'Symbols',
  9: 'Flags',
};

export const LOCALE_DATA: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'kk', label: 'Қазақ', flag: '🇰🇿' },
];

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string; // URL to image
}

export interface BlogPost {
  id: string;
  slug: string; 
  locale: Locale;
  title: string;
  seoTitle?: string;
  category: string;
  excerpt: string;
  seoDescription?: string;
  content: string[]; 
  date: string;       // Changed to required string
  readTime: string;   // Changed to required string
  author: Author;     // Added Author field
  imageGradient: string; 
  image?: string;    
  imageAlt?: string; 
  richText?: any;
  _raw?: any;
}

export interface ArticleContent {
  title: string;
  seoTitle?: string;
  excerpt: string;
  seoDescription?: string;
  content: string[];
}

export interface ArticleMaster {
  slug: string;
  image: string;
  category: 'Instagram' | 'Emoji' | 'Business' | 'History' | 'Astrology' | 'SEO Google' | 'Digital Marketing';
  gradient?: string;
  locales: Partial<Record<Locale, ArticleContent>>;
}