import React from 'react';
import { ArrowUp, Minimize2, Maximize2, Share2 } from 'lucide-react';

interface FloatingControlsProps {
  onScrollTop: () => void;
  onCollapseAll: () => void;
  onExpandAll: () => void;
  onShare: () => void;
}

const FloatingControls: React.FC<FloatingControlsProps> = ({ onScrollTop, onCollapseAll, onExpandAll, onShare }) => {
  return (
    <>
      {/* PC Version: Vertical, Bottom Right */}
      <div className="hidden md:flex fixed bottom-10 right-10 z-40 flex-col gap-3">
        <button 
          onClick={onShare}
          title="Share"
          className="p-3 bg-indigo-500 text-white shadow-xl shadow-indigo-500/30 rounded-full border border-transparent hover:scale-110 active:scale-95 transition-all"
        >
          <Share2 size={24} />
        </button>
        <button 
          onClick={onScrollTop}
          title="Scroll to Top"
          className="p-3 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xl rounded-full border border-slate-200 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all"
        >
          <ArrowUp size={24} />
        </button>
        <button 
          onClick={onExpandAll}
          title="Expand All Categories"
          className="p-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xl rounded-full border border-slate-200 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all"
        >
          <Maximize2 size={24} />
        </button>
        <button 
          onClick={onCollapseAll}
          title="Collapse All Categories"
          className="p-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xl rounded-full border border-slate-200 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all"
        >
          <Minimize2 size={24} />
        </button>
      </div>

      {/* Mobile Version: Horizontal, Bottom Fixed, Glassmorphism */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-40 flex items-center justify-center gap-4 pointer-events-none">
        <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl pointer-events-auto">
           <button 
            onClick={onCollapseAll}
            className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors active:scale-95"
          >
            <Minimize2 size={20} />
          </button>
          
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>

          <button 
            onClick={onScrollTop}
            className="p-2.5 bg-white dark:bg-slate-800 text-indigo-600 rounded-xl shadow-sm active:scale-95 transition-transform"
          >
            <ArrowUp size={20} />
          </button>
          
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>

          <button 
            onClick={onShare}
            className="p-2.5 bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/30 active:scale-95 transition-transform"
          >
            <Share2 size={20} />
          </button>

          <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>

          <button 
            onClick={onExpandAll}
            className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors active:scale-95"
          >
            <Maximize2 size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingControls;