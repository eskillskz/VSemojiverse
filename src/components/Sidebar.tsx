import React from 'react';
import AdUnit from './AdUnit';

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-24 space-y-6">
        {/* Skyscraper Ad Unit (Top) */}
        <AdUnit 
          slotId="left-sidebar-top" 
          className="min-h-[300px] bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 shadow-sm"
        />
        
        {/* Pro Tip Widget */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          <p className="font-bold text-lg mb-2 relative z-10">🚀 Pro Tip</p>
          <p className="text-sm opacity-90 relative z-10 leading-relaxed">
            Use <span className="font-mono bg-black/20 px-1.5 py-0.5 rounded text-xs font-bold border border-white/20">Shift + Click</span> on emojis to copy multiple at once!
          </p>
        </div>

        {/* Rectangle Ad Unit (Bottom) */}
        <AdUnit 
          slotId="left-sidebar-bottom" 
          className="min-h-[250px] bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 shadow-sm"
        />
      </div>
    </aside>
  );
};

export default Sidebar;