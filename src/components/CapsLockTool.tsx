
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Copy, Trash2, Minus, Plus, Type, Smile } from 'lucide-react';
import { Locale } from '../types';
import { UI_LABELS } from '../data/uiTranslations';

interface CapsLockToolProps {
  locale?: Locale;
}

const CapsLockTool: React.FC<CapsLockToolProps> = ({ locale = 'en' }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [fontSizeLvl, setFontSizeLvl] = useState(0); // 0 to 6
  
  const labels = UI_LABELS[locale];
  const currentFontSize = 18 + (fontSizeLvl * 2);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text, fontSizeLvl]);

  const stats = useMemo(() => {
    const chars = text.length;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const emojis = (text.match(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu) || []).length;
    return { chars, words, emojis };
  }, [text]);

  const handleFontChange = (delta: number) => {
    setFontSizeLvl(prev => {
      const newValue = prev + delta;
      if (newValue < 0) return 0;
      if (newValue > 6) return 6;
      return newValue;
    });
  };

  const changeCase = (type: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const hasSelection = start !== end;

    const processText = (str: string) => {
        switch (type) {
            case 'upper': return str.toUpperCase();
            case 'lower': return str.toLowerCase();
            case 'title': 
                // Capitalize first letter of every word, lowercase the rest of the word
                return str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            case 'sentence':
                // Capitalize first letter of the string, lowercase the rest
                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
            case 'capitalized':
                 // Capitalize first letter of every word, but simple logic as requested distinct from Title (often synonymous, but here we implement simple start case)
                 // We will treat "Capitalized Case" as capitalizing first letter of words.
                 return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            case 'alternating': 
                return str.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
            case 'inverse':
                return str.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
            default: return str;
        }
    };

    if (hasSelection) {
        const beforeText = text.substring(0, start);
        const selectedText = text.substring(start, end);
        const afterText = text.substring(end);
        setText(beforeText + processText(selectedText) + afterText);
    } else {
        setText(processText(text));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied!');
  };

  const handleClear = () => setText('');

  return (
    <div className="relative mb-8 group z-30 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Backlight Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      
      <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] border border-white/20 dark:border-white/10 p-4 md:p-6 transition-all duration-300">
        
        {/* Text Area */}
        <div className="relative group/area">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here to convert case..."
            style={{ fontSize: `${currentFontSize}px`, minHeight: '160px' }}
            className="w-full bg-white dark:bg-slate-950/50 rounded-2xl border border-orange-100 dark:border-orange-500/20 p-6 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/50 transition-all resize-none overflow-hidden shadow-inner"
          />
          {text.length > 0 && (
            <button 
              onClick={handleClear}
              className="absolute top-3 right-3 p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-xl transition-colors opacity-0 group-hover/area:opacity-100"
              title={labels.clearText}
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
            
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {/* Font Size */}
                <div className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl mr-2 shadow-sm">
                <button 
                    onClick={() => handleFontChange(-1)}
                    disabled={fontSizeLvl === 0}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400 disabled:opacity-30 transition-colors"
                >
                    <Minus size={14} />
                </button>
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 min-w-[70px] text-center uppercase tracking-wide">
                    {labels.fontSize}
                </span>
                <button 
                    onClick={() => handleFontChange(1)}
                    disabled={fontSizeLvl === 6}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400 disabled:opacity-30 transition-colors"
                >
                    <Plus size={14} />
                </button>
                </div>

                {/* Stats */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/50 dark:bg-slate-800/50 border border-orange-100 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400">
                    <Type size={14} />
                    <span>{stats.chars}</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/50 dark:bg-slate-800/50 border border-orange-100 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400">
                    <Smile size={14} />
                    <span>{stats.emojis}</span>
                </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              disabled={text.length === 0}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 dark:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-slate-500/30 dark:shadow-orange-900/50 active:scale-95 active:shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy size={18} />
              {labels.copyText}
            </button>
        </div>

        {/* Case Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6 border-t border-slate-100 dark:border-white/5 pt-6">
            {/* 1. Title Case */}
            <button 
                onClick={() => changeCase('title')}
                className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:border-orange-200 dark:hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm"
            >
                Title Case
            </button>
            {/* 2. lower case */}
            <button 
                onClick={() => changeCase('lower')}
                className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:border-orange-200 dark:hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm"
            >
                lower case
            </button>
            {/* 3. UPPER CASE */}
            <button 
                onClick={() => changeCase('upper')}
                className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:border-orange-200 dark:hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm"
            >
                UPPER CASE
            </button>
            {/* 4. Sentence case */}
            <button 
                onClick={() => changeCase('sentence')}
                className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:border-orange-200 dark:hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm"
            >
                Sentence case
            </button>
            {/* 5. Capitalized Case */}
            <button 
                onClick={() => changeCase('capitalized')}
                className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:border-orange-200 dark:hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm"
            >
                Capitalized Case
            </button>
             {/* 6. Alternating Case */}
             <button 
                onClick={() => changeCase('alternating')}
                className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:border-orange-200 dark:hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm"
            >
                aLtErNaTiNg cAsE
            </button>
             {/* 7. Inverse Case */}
             <button 
                onClick={() => changeCase('inverse')}
                className="col-span-2 sm:col-span-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:border-orange-200 dark:hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm"
            >
                iNVERSE cASE
            </button>
        </div>

      </div>
    </div>
  );
};

export default CapsLockTool;