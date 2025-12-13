
import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { KaomojiGroup, KaomojiItem, Locale } from '../types';
import { UI_LABELS } from '../data/uiTranslations';

interface KaomojiCategoryProps {
  group: KaomojiGroup;
  onCopy: (kaomoji: string) => void;
  locale?: Locale;
}

interface KaomojiButtonProps {
  item: KaomojiItem;
  onCopy: (k: string) => void;
  label: string;
}

const KaomojiButton: React.FC<KaomojiButtonProps> = ({ item, onCopy, label }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    onCopy(item.text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  }

  return (
    <div 
      className="relative z-0 hover:z-30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleClick}
        className={`
          w-full flex items-center justify-between py-3 px-3 rounded-xl border font-mono text-sm sm:text-base whitespace-nowrap overflow-hidden
          transition-all active:scale-95 group
          ${isCopied
            ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-600 dark:text-green-400'
            : 'bg-slate-50/50 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-300 hover:scale-105 hover:shadow-md'
          }
        `}
      >
        <span className="truncate flex-1 text-center">{item.text}</span>
        {isHovered && (
            <Copy size={14} className="opacity-50 ml-2 shrink-0 animate-in fade-in duration-200" />
        )}
      </button>

      {/* Custom Rich Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-xl border border-slate-700 dark:border-slate-200 z-50 w-max max-w-[200px] text-center pointer-events-none animate-in fade-in zoom-in-95 duration-200">
           {/* Specific Meaning */}
           <div className="text-sm font-bold font-sans leading-tight mb-1">
             {item.meaning}
           </div>
           
           {/* Click to Copy CTA */}
           <div className="text-[10px] uppercase tracking-wider opacity-50 border-t border-white/20 dark:border-slate-900/10 pt-1 flex items-center justify-center gap-1">
             <Copy size={10} /> {label}
           </div>
           
           {/* Triangle */}
           <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 dark:bg-white border-l border-t border-slate-700 dark:border-slate-200 rotate-[-135deg] -mt-1.5"></div>
        </div>
      )}
    </div>
  );
};

const KaomojiCategory: React.FC<KaomojiCategoryProps> = ({ group, onCopy, locale = 'en' }) => {
  const labels = UI_LABELS[locale];

  return (
    <section className="mb-6 bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-white/5 rounded-3xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
        {group.name}
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
          {group.items.length}
        </span>
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {group.items.map((item, index) => (
          <KaomojiButton 
            key={`${group.name}-${index}`}
            item={item}
            onCopy={onCopy}
            label={labels.clickToCopy} 
          />
        ))}
      </div>
    </section>
  );
};

export default KaomojiCategory;
