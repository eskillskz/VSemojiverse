import { EmojiRaw } from '../types';

// A curated list of essential emojis to serve as fallback
// Structure updated to match emojibase (hexcode, emoji, label, group)
export const FALLBACK_EMOJIS: EmojiRaw[] = [
  { hexcode: "1F600", emoji: "😀", label: "grinning face", tags: ["smile", "happy"], group: 0 },
  { hexcode: "1F602", emoji: "😂", label: "face with tears of joy", tags: ["lol", "laugh"], group: 0 },
  { hexcode: "1F970", emoji: "🥰", label: "smiling face with hearts", tags: ["love"], group: 0 },
  
  // Waving Hand + Variants
  { 
    hexcode: "1F44B", 
    emoji: "👋", 
    label: "waving hand", 
    group: 1,
    skins: [
      { hexcode: "1F44B-1F3FB", emoji: "👋🏻", label: "waving hand: light skin tone", group: 1 },
      { hexcode: "1F44B-1F3FC", emoji: "👋🏼", label: "waving hand: medium-light skin tone", group: 1 },
      { hexcode: "1F44B-1F3FD", emoji: "👋🏽", label: "waving hand: medium-dark skin tone", group: 1 },
      { hexcode: "1F44B-1F3FE", emoji: "👋🏾", label: "waving hand: dark skin tone", group: 1 },
      { hexcode: "1F44B-1F3FF", emoji: "👋🏿", label: "waving hand: darker skin tone", group: 1 },
    ]
  },

  { hexcode: "1F436", emoji: "🐶", label: "dog face", tags: ["puppy", "pet"], group: 3 },
  { hexcode: "1F431", emoji: "🐱", label: "cat face", tags: ["kitten", "meow"], group: 3 },
  
  { hexcode: "1F355", emoji: "🍕", label: "pizza", tags: ["cheese", "pepperoni"], group: 4 },
  { hexcode: "1F354", emoji: "🍔", label: "hamburger", tags: ["burger"], group: 4 },
  
  { hexcode: "2708", emoji: "✈️", label: "airplane", tags: ["flight", "fly"], group: 5 },
  { hexcode: "1F697", emoji: "🚗", label: "automobile", tags: ["car"], group: 5 },
  
  { hexcode: "26BD", emoji: "⚽", label: "soccer ball", tags: ["football", "sport"], group: 6 },
  
  { hexcode: "1F4A1", emoji: "💡", label: "light bulb", tags: ["idea"], group: 7 },
  { hexcode: "1F4BB", emoji: "💻", label: "laptop", tags: ["computer"], group: 7 },
  
  { hexcode: "2764", emoji: "❤️", label: "red heart", tags: ["love"], group: 8 },
  
  { hexcode: "1F3F4", emoji: "🏳️", label: "white flag", tags: ["surrender"], group: 9 },
  { hexcode: "1F1FA", emoji: "🇺🇸", label: "United States", tags: ["usa"], group: 9 }
];