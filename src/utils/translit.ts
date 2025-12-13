
// Transliteration Mapping for Yandex (Specific rules)
const YANDEX_MAP: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
  'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
  'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
  'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
};

// Standard / Google (ISO-9/Passport style common for Google SEO)
const GOOGLE_MAP: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
  'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'i', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
  'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '',
  'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
};

const slugify = (text: string, map: Record<string, string>): string => {
  if (!text) return '';

  return text
    .toLowerCase()
    .split('')
    .map(char => {
      // Check if it's in the map
      if (map[char] !== undefined) return map[char];
      // If it's a standard latin char or number, keep it
      if (/[a-z0-9]/.test(char)) return char;
      // Spaces become hyphens
      if (/\s/.test(char)) return '-';
      // Everything else (punctuation) is removed
      return '';
    })
    .join('')
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-|-$/g, ''); // Trim hyphens from start/end
};

export const generateTranslit = (text: string) => {
  return {
    google: slugify(text, GOOGLE_MAP),
    yandex: slugify(text, YANDEX_MAP)
  };
};
