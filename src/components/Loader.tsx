import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
      </div>
      <p className="text-slate-500 font-medium animate-pulse">Loading EmojiVerse...</p>
    </div>
  );
};

export default Loader;