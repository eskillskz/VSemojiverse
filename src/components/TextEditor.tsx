
import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Copy, Trash2, Instagram, Smile, Type, Minus, Plus, Wand2, ChevronDown, CaseUpper, BoxSelect } from 'lucide-react';
import { Locale } from '../types';
import { UI_LABELS } from '../data/uiTranslations';

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
  onCopy: () => void;
  onClear: () => void;
  locale?: Locale;
}

const INSTAGRAM_LIMIT = 2200;

// Mapping for "Instagram Fonts" (Unicode Glyphs)
const ALPHABET_MAP: Record<string, string> = {
  'Normal': "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  'Bold': "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
  'Italic': "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧0123456789",
  'Script (Cursive)': "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏0123456789",
  'Bold Script': "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
  'Double Struck': "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
  'Gothic (Fraktur)': "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷0123456789",
  'Monospace': "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿",
  'Circles': "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ0123456789",
};

const TextEditor: React.FC<TextEditorProps> = ({ text, setText, onCopy, onClear, locale = 'en' }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [fontSizeLvl, setFontSizeLvl] = useState(0); // 0 to 6
  const [isFontsMenuOpen, setIsFontsMenuOpen] = useState(false);
  const [isCaseMenuOpen, setIsCaseMenuOpen] = useState(false);
  
  const fontsMenuRef = useRef<HTMLDivElement>(null);
  const caseMenuRef = useRef<HTMLDivElement>(null);

  // Get translations
  const labels = UI_LABELS[locale];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text, fontSizeLvl]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fontsMenuRef.current && !fontsMenuRef.current.contains(event.target as Node)) {
        setIsFontsMenuOpen(false);
      }
      if (caseMenuRef.current && !caseMenuRef.current.contains(event.target as Node)) {
        setIsCaseMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const stats = useMemo(() => {
    const chars = text.length;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const emojis = (text.match(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu) || []).length;
    const remaining = INSTAGRAM_LIMIT - chars;
    return { chars, words, emojis, remaining };
  }, [text]);

  const isOverLimit = stats.remaining < 0;
  
  const currentFontSize = 18 + (fontSizeLvl * 2);

  const handleFontChange = (delta: number) => {
    setFontSizeLvl(prev => {
      const newValue = prev + delta;
      if (newValue < 0) return 0;
      if (newValue > 6) return 6;
      return newValue;
    });
  };

  // ------------------------------------------------
  // FEATURE 1: TEXT TRANSFORMATION (Magic Fonts)
  // ------------------------------------------------
  const transformString = (str: string, targetAlphabet: string, sourceAlphabet: string) => {
    return str.split('').map(char => {
      const index = sourceAlphabet.indexOf(char);
      if (index !== -1 && index < targetAlphabet.length) {
        const targetChars = Array.from(targetAlphabet);
        return targetChars[index] || char;
      }
      return char;
    }).join('');
  };

  const applyInstagramFont = (styleName: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const hasSelection = start !== end;

    if (styleName === 'Normal' && !hasSelection) {
        setIsFontsMenuOpen(false);
        return;
    }

    const targetAlphabet = ALPHABET_MAP[styleName];
    const sourceAlphabet = ALPHABET_MAP['Normal'];
    
    if (!targetAlphabet) return;

    if (hasSelection) {
      const beforeText = text.substring(0, start);
      const selectedText = text.substring(start, end);
      const afterText = text.substring(end);
      
      const transformedSelection = styleName === 'Normal' 
        ? selectedText 
        : transformString(selectedText, targetAlphabet, sourceAlphabet);

      const newText = beforeText + transformedSelection + afterText;
      setText(newText);
    } else {
      const newText = transformString(text, targetAlphabet, sourceAlphabet);
      setText(newText);
    }
    setIsFontsMenuOpen(false);
  };

  // ------------------------------------------------
  // FEATURE 2: CASE CONVERTER
  // ------------------------------------------------
  const changeCase = (type: 'upper' | 'lower' | 'title' | 'alternating') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const hasSelection = start !== end;

    const processText = (str: string) => {
        switch (type) {
            case 'upper': return str.toUpperCase();
            case 'lower': return str.toLowerCase();
            case 'title': return str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            case 'alternating': return str.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
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
    setIsCaseMenuOpen(false);
  };

  // ------------------------------------------------
  // FEATURE 3: INVISIBLE SPACE
  // ------------------------------------------------
  const insertInvisibleSpace = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    // Braille Pattern Blank (commonly used for IG line breaks)
    const invisibleChar = '\u2800'; 

    const newText = text.substring(0, start) + invisibleChar + text.substring(end);
    setText(newText);
  };

  return (
    // Added z-30 here to ensure the dropdown inside this component displays OVER the components below it
    <div className="relative mb-8 group z-30">
      {/* Beautiful Backlight / Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      
      <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] border border-white/20 dark:border-white/10 p-4 md:p-6 transition-all duration-300">
        
        {/* Text Area */}
        <div className="relative group/area">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={labels.searchPlaceholder}
            style={{ fontSize: `${currentFontSize}px`, minHeight: '160px' }}
            className="w-full bg-white dark:bg-slate-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 p-6 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all resize-none overflow-hidden shadow-inner"
          />
          {text.length > 0 && (
            <button 
              onClick={onClear}
              className="absolute top-3 right-3 p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-xl transition-colors opacity-0 group-hover/area:opacity-100"
              title={labels.clearText}
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
          
          {/* Font & Stats & Tools */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Font Size Control */}
            <div className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl mr-2 shadow-sm">
              <button 
                onClick={() => handleFontChange(-1)}
                disabled={fontSizeLvl === 0}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400 disabled:opacity-30 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 min-w-[70px] text-center uppercase tracking-wide">
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

            {/* Stats Chips */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/50 dark:bg-slate-800/50 border border-indigo-100 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400">
              <Type size={14} />
              <span>{stats.chars}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/50 dark:bg-slate-800/50 border border-indigo-100 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400">
              <Smile size={14} />
              <span>{stats.emojis}</span>
            </div>

            {/* 1. Instagram Fonts Button */}
            <div className="relative" ref={fontsMenuRef}>
              <button
                onClick={() => { setIsFontsMenuOpen(!isFontsMenuOpen); setIsCaseMenuOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2 ml-2 rounded-xl border text-sm font-semibold transition-all shadow-sm ${
                   isFontsMenuOpen 
                   ? 'bg-indigo-500 text-white border-indigo-500 shadow-indigo-500/30' 
                   : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50'
                }`}
                title={labels.instagramFonts}
              >
                <Wand2 size={16} />
                <ChevronDown size={14} className={`transition-transform ${isFontsMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFontsMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                  <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    {labels.selectStyle}
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {Object.keys(ALPHABET_MAP).map((style) => (
                      <button
                        key={style}
                        onClick={() => applyInstagramFont(style)}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-500/20 transition-colors text-slate-700 dark:text-slate-200"
                      >
                        <div className="font-medium">{style}</div>
                        <div className="text-xs text-slate-400 mt-0.5 truncate">
                          Preview: 𝐀𝐁𝐂, 𝐴𝐵𝐶, 𝓐𝓑𝓒
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Case Converter Button */}
            <div className="relative" ref={caseMenuRef}>
              <button
                onClick={() => { setIsCaseMenuOpen(!isCaseMenuOpen); setIsFontsMenuOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2 ml-1 rounded-xl border text-sm font-semibold transition-all shadow-sm ${
                   isCaseMenuOpen
                   ? 'bg-purple-500 text-white border-purple-500 shadow-purple-500/30' 
                   : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500/50'
                }`}
                title={labels.textCase}
              >
                <CaseUpper size={16} />
                <ChevronDown size={14} className={`transition-transform ${isCaseMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCaseMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                  <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    {labels.selectCase}
                  </div>
                  <button onClick={() => changeCase('upper')} className="w-full text-left px-4 py-3 text-sm hover:bg-purple-50 dark:hover:bg-purple-500/20 transition-colors text-slate-700 dark:text-slate-200">
                    UPPERCASE
                  </button>
                  <button onClick={() => changeCase('lower')} className="w-full text-left px-4 py-3 text-sm hover:bg-purple-50 dark:hover:bg-purple-500/20 transition-colors text-slate-700 dark:text-slate-200">
                    lowercase
                  </button>
                  <button onClick={() => changeCase('title')} className="w-full text-left px-4 py-3 text-sm hover:bg-purple-50 dark:hover:bg-purple-500/20 transition-colors text-slate-700 dark:text-slate-200">
                    Title Case
                  </button>
                  <button onClick={() => changeCase('alternating')} className="w-full text-left px-4 py-3 text-sm hover:bg-purple-50 dark:hover:bg-purple-500/20 transition-colors text-slate-700 dark:text-slate-200">
                    aLtErNaTiNg
                  </button>
                </div>
              )}
            </div>

            {/* 3. Invisible Space Button */}
            <button
                onClick={insertInvisibleSpace}
                className="flex items-center gap-2 px-3 py-2 ml-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-all shadow-sm hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600"
                title={labels.invisibleSpace}
            >
                <BoxSelect size={16} />
            </button>

          </div>

          {/* Actions & IG Counter */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            {/* Instagram Counter */}
            <div 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-300 border bg-opacity-40 backdrop-blur-sm ${
                isOverLimit 
                  ? 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30' 
                  : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
              }`}
            >
              <Instagram size={18} />
              <div className="flex flex-col items-end leading-none">
                 <span className="text-[10px] font-bold uppercase opacity-70">{labels.igLimit}</span>
                 <span className="font-mono font-bold">{stats.remaining}</span>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={onCopy}
              disabled={text.length === 0}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 dark:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-slate-500/30 dark:shadow-indigo-900/50 active:scale-95 active:shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
            >
              <Copy size={18} />
              {labels.copyText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;