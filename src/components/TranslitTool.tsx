
import React, { useState } from 'react';
import { Locale } from '../types';
import { UI_LABELS } from '../data/uiTranslations';
import { generateTranslit } from '../utils/translit';
import { Copy, Globe, Search } from 'lucide-react';

interface TranslitToolProps {
  locale: Locale;
}

const TranslitTool: React.FC<TranslitToolProps> = ({ locale }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState({ google: '', yandex: '' });
  const labels = UI_LABELS[locale];

  const handleGenerate = () => {
    setOutput(generateTranslit(input));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="relative mb-8 group z-30 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Backlight Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      
      <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/20 dark:border-white/10 p-6 md:p-8">
        
        <div className="flex items-center gap-3 mb-6 text-slate-800 dark:text-white">
          <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400">
            <Globe size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">{labels.translitTitle}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Google & Yandex Standard ISO-9</p>
          </div>
        </div>

        {/* Input Area */}
        <div className="mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={labels.translitPlaceholder}
            className="w-full bg-white dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 text-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all shadow-inner"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!input.trim()}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-8"
        >
          {labels.generate}
        </button>

        {/* Outputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Google Output */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
             <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <Globe size={14} />
                {labels.translitGoogle}
             </div>
             <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <code className="text-slate-800 dark:text-blue-400 font-mono text-sm overflow-x-auto whitespace-nowrap no-scrollbar">
                  {output.google || '...'}
                </code>
                <button 
                  onClick={() => copyToClipboard(output.google)}
                  disabled={!output.google}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-500 transition-colors"
                >
                  <Copy size={16} />
                </button>
             </div>
          </div>

          {/* Yandex Output */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
             <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <Search size={14} />
                {labels.translitYandex}
             </div>
             <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <code className="text-slate-800 dark:text-amber-400 font-mono text-sm overflow-x-auto whitespace-nowrap no-scrollbar">
                  {output.yandex || '...'}
                </code>
                <button 
                  onClick={() => copyToClipboard(output.yandex)}
                  disabled={!output.yandex}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-amber-500 transition-colors"
                >
                  <Copy size={16} />
                </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TranslitTool;