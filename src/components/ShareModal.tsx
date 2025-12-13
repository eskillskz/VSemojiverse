import React from 'react';
import { X, Copy, Link2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  modalTitle: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url, title, modalTitle }) => {
  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-[#25D366] hover:bg-[#20bd5a]',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      )
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#229ED9] hover:bg-[#1f8dbf]',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
      )
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-black hover:bg-slate-800',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      )
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2] hover:bg-[#166fe5]',
      icon: (
         <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 2.848-5.978 5.817-5.978.995 0 2.018.067 2.218.098v3.298h-1.307c-1.451 0-2.114.623-2.114 1.86v1.992h3.945l-.517 3.667h-3.428v7.98H9.1z"/></svg>
      )
    },
    {
      name: 'Reddit',
      url: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: 'bg-[#FF4500] hover:bg-[#e03d00]',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
      )
    },
    {
        name: 'Email',
        url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
        color: 'bg-slate-500 hover:bg-slate-600',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        )
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied!');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">{modalTitle}</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Icons Grid */}
        <div className="p-6 grid grid-cols-4 gap-4">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110 ${link.color}`}>
                {link.icon}
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Copy Link Section */}
        <div className="px-6 pb-6">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-between border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 overflow-hidden">
                    <Link2 size={18} className="text-slate-400 shrink-0" />
                    <span className="text-sm text-slate-600 dark:text-slate-300 truncate">{url}</span>
                </div>
                <button 
                    onClick={handleCopy}
                    className="ml-2 px-3 py-1.5 bg-white dark:bg-slate-700 rounded-lg text-xs font-bold shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 transition-colors"
                >
                    Copy
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;