
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { EmojiGroup, EmojiRaw, Locale } from '../types';
import EmojiButton from './EmojiButton';

interface EmojiCategoryProps {
  group: EmojiGroup;
  id: string;
  onCopy: (emoji: EmojiRaw) => void;
  forceOpen?: boolean | null; // null = use internal state, true/false = force
  favoriteIds?: string[];
  onToggleFavorite?: (emoji: EmojiRaw) => void;
  localizedName?: string; // New prop for translation
  locale?: Locale;
}

const EmojiCategory: React.FC<EmojiCategoryProps> = ({ 
  group, 
  id, 
  onCopy, 
  forceOpen = null,
  favoriteIds = [],
  onToggleFavorite,
  localizedName,
  locale = 'en'
}) => {
  // Default to false as requested
  const [isOpen, setIsOpen] = useState(false);
  const [allowOverflow, setAllowOverflow] = useState(false);

  // Sync with global force state if it changes
  useEffect(() => {
    if (forceOpen !== null) {
      setIsOpen(forceOpen);
    }
  }, [forceOpen]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen) {
      // Wait for the transition (500ms) to finish before allowing overflow
      timer = setTimeout(() => setAllowOverflow(true), 500);
    } else {
      setAllowOverflow(false);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Get a preview of first 7 emojis (more density)
  const previewEmojis = group.emojis.slice(0, 7);

  const displayName = localizedName || group.groupName;

  return (
    <section 
      id={id}
      className="mb-4 sm:mb-6 bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-white/5 rounded-3xl shadow-sm dark:shadow-lg transition-all duration-300 hover:shadow-md dark:hover:bg-slate-900/60 dark:hover:border-white/10 hover:dark:shadow-2xl w-full max-w-full"
    >
      {/* Accordion Header */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 bg-transparent transition-colors cursor-pointer group rounded-3xl focus:outline-none overflow-hidden"
      >
        {/* Title Container - Added min-w-0 for flex truncation */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 truncate">
            <span className="truncate">{displayName}</span>
            <span className="shrink-0 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
              {group.emojis.length}
            </span>
          </h2>
          
          {/* Preview when closed - HIDDEN on Mobile to prevent overflow, Visible on SM+ */}
          {!isOpen && (
            <div className="hidden sm:flex items-center gap-0.5 sm:gap-1 opacity-60 group-hover:opacity-100 transition-opacity overflow-hidden ml-auto">
              {previewEmojis.map((e) => (
                <span key={e.hexcode} className="text-lg transition-all hover:scale-125">{e.emoji}</span>
              ))}
              <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">...</span>
            </div>
          )}
        </div>

        <div className={`ml-3 p-2 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition-transform duration-300 group-hover:text-slate-800 dark:group-hover:text-white shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>

      {/* Accordion Content */}
      <div 
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        } ${isOpen && allowOverflow ? 'overflow-visible' : 'overflow-hidden'}`}
      >
        <div className="p-3 sm:p-6 pt-0">
          {/* Grid density: grid-cols-5 on mobile ensures elements fit without shrinking to zero or overflowing */}
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 sm:gap-3">
            {group.emojis.map((emoji, index) => (
              <EmojiButton 
                key={`${emoji.hexcode}-${index}`}
                emoji={emoji}
                onCopy={onCopy}
                isFavorite={favoriteIds.includes(emoji.hexcode)}
                onToggleFavorite={onToggleFavorite}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmojiCategory;
