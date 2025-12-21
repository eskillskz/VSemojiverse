import React, { useEffect, useState, useMemo } from 'react';
import { BlogPost, Locale } from '@/types';
import { BLOG_POSTS } from '@/data/blogPosts';
import { ArrowLeft, Share2, Home, ArrowRight, Sparkles, Calendar, Clock } from 'lucide-react';
import { UI_LABELS } from '@/data/uiTranslations';
import ShareModal from './ShareModal';
import AdUnit from './AdUnit'; 

interface BlogPostProps {
  post: BlogPost;
  onBack: () => void;
  onHome: () => void;
  locale: Locale;
  onOpenPost?: (post: BlogPost) => void; 
}

const getCategoryStyle = (cat: string) => {
  const c = cat?.toLowerCase() || '';
  if (c === 'instagram') return 'bg-rose-500 text-white shadow-rose-500/30';
  if (c === 'history') return 'bg-amber-500 text-white shadow-amber-500/30';
  if (c === 'education' || c === 'science') return 'bg-blue-500 text-white shadow-blue-500/30';
  if (c === 'design') return 'bg-purple-500 text-white shadow-purple-500/30';
  if (c === 'trends') return 'bg-emerald-500 text-white shadow-emerald-500/30';
  return 'bg-slate-700 text-white shadow-slate-700/30';
};

const BlogPostView: React.FC<BlogPostProps> = ({ post, onBack, onHome, locale, onOpenPost }) => {
  
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.id]);

  const labels = UI_LABELS[locale] || UI_LABELS['en'];

  // Logic to find Recommended Posts
  const recommendedPosts = useMemo(() => {
    let pool = BLOG_POSTS.filter(p => p.locale === locale && p.id !== post.id);
    if (pool.length < 3) {
        const englishPosts = BLOG_POSTS.filter(p => p.locale === 'en' && p.id !== post.id && !pool.find(existing => existing.slug === p.slug));
        pool = [...pool, ...englishPosts];
    }
    return pool.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [post.id, locale]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seoTitle || post.title,
    "description": post.seoDescription || post.excerpt,
    "image": post.image ? [post.image] : [],
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    "datePublished": post.date, // Using dynamic date
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://emojiverse.netlify.app/?post=${post.slug}`
    }
  };

  // --- Улучшенный парсер текста (Ссылки + Жирный + Курсив) ---
  const renderTextWithFormatting = (text: string) => {
    // 1. Разбиваем по ссылкам [Text](Url)
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

    return parts.map((part, i) => {
      // Ссылка?
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [_, linkText, linkUrl] = linkMatch;
        return (
          <a key={i} href={linkUrl} className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold transition-colors">
            {linkText}
          </a>
        );
      }

      // Не ссылка -> ищем жирный (**text**)
      const subParts = part.split(/(\*\*[^*]+\*\*)/g);
      
      return subParts.map((subPart, j) => {
        if (subPart.startsWith('**') && subPart.endsWith('**')) {
          return <strong key={`${i}-${j}`} className="font-bold text-slate-900 dark:text-white">{subPart.slice(2, -2)}</strong>;
        }
        
        // Разбиваем по курсиву (*text*):
        return subPart.split(/(\*[^*]+\*)/g).map((tinyPart, k) => {
            if (tinyPart.startsWith('*') && tinyPart.endsWith('*') && tinyPart.length > 2) {
                // Игнорируем ** если они вдруг остались, обрабатываем только *
                return <em key={`${i}-${j}-${k}`} className="italic text-slate-800 dark:text-slate-200">{tinyPart.slice(1, -1)}</em>;
            }
            return tinyPart;
        });
      });
    });
  };

  if (!post) return null;

  const contentArray = post.content || [];

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-500">
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 px-4 sm:px-0">
        <div className="flex gap-3">
            <button 
            onClick={onHome}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-sm font-bold text-sm"
            >
            <Home size={16} />
            <span className="hidden sm:inline">{labels.mainMenu}</span>
            </button>

            <button 
            onClick={onBack}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-sm font-bold text-sm"
            >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">{labels.backToArticles}</span>
            <span className="sm:hidden">Back</span>
            </button>
        </div>

        <button 
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all border border-indigo-100 dark:border-indigo-500/30"
        >
            <Share2 size={18} />
            <span className="hidden sm:inline">{labels.share}</span>
        </button>
      </div>

      <article className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Hero Image */}
        <div className="w-full h-64 md:h-96 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
            {post.image ? (
                <img 
                  src={post.image} 
                  alt={post.imageAlt || post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
            ) : (
                <div className={`w-full h-full bg-gradient-to-br ${post.imageGradient} relative`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>
            )}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-slate-900/90 to-transparent"></div>
        </div>

        <div className="px-6 md:px-16 pb-16 -mt-12 relative z-10">
            <div className="mb-12">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={12} />
                        Blog
                    </div>
                    {post.category && (
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getCategoryStyle(post.category)}`}>
                            {post.category}
                        </div>
                    )}
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                    {post.title}
                </h1>

                {/* --- AUTHOR & DATE METADATA --- */}
                <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{post.author.name}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">{post.author.role}</p>
                    </div>
                  </div>

                  <div className="w-px h-10 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

                  <div className="flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                     <div className="flex items-center gap-1.5">
                        <Calendar size={16} className="text-indigo-500" />
                        <span>{post.date}</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <Clock size={16} className="text-indigo-500" />
                        <span>{post.readTime}</span>
                     </div>
                  </div>
                </div>
            </div>

            <AdUnit slotId="article-top" />

            {/* --- CONTENT RENDERER --- */}
            <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500 leading-relaxed">
                {contentArray.length > 0 ? contentArray.map((paragraph, index) => {
                  if (!paragraph) return null;
                  
                  const trimmedBlock = paragraph.trim();

                  // 1. HTML BLOCKS (Tables, Accordions, Lists, Blockquotes)
                  // Добавлена поддержка <ul>, <ol>, <blockquote>
                  if (trimmedBlock.startsWith('<div') || 
                      trimmedBlock.startsWith('<table') || 
                      trimmedBlock.startsWith('<details') ||
                      trimmedBlock.startsWith('<ul') ||
                      trimmedBlock.startsWith('<ol') ||
                      trimmedBlock.startsWith('<blockquote')) {
                    return (
                      <div 
                        key={index} 
                        dangerouslySetInnerHTML={{ __html: trimmedBlock }} 
                        className="my-8 w-full"
                      />
                    );
                  }

                  // 2. IMAGES (Inside Article)
                  if (paragraph.startsWith('IMAGE:')) {
                    const [keywordsPart, altTextPart] = paragraph.replace('IMAGE:', '').split('|');
                    const keywords = keywordsPart ? keywordsPart.trim() : 'abstract';
                    const altText = altTextPart ? altTextPart.trim() : post.title;
                    
                    // Жесткий фильтр: NO PEOPLE, NO TEXT
                    const encodedPrompt = encodeURIComponent(`${keywords}, object only, minimalist, photorealistic, 8k, soft lighting, no text, no letters, no words, no people, no human, no face`);
                    
                    const seed = (post.id.split('').reduce((a,c)=>a+c.charCodeAt(0),0) + index) % 10000;
                    
                    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=768&nologo=true&seed=${seed}&model=flux-realism`;

                    return (
                        <figure key={index} className="my-12">
                            <img 
                                src={imageUrl} 
                                alt={altText} 
                                className="w-full max-w-4xl mx-auto h-auto rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 object-cover"
                                loading="lazy"
                            />
                            <figcaption className="text-center text-sm text-slate-400 dark:text-slate-500 mt-4 italic">
                                {altText}
                            </figcaption>
                        </figure>
                    );
                  }

                  // 3. HEADERS
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl md:text-3xl font-extrabold mt-12 mb-6 text-slate-900 dark:text-white">{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-xl md:text-2xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100">{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('#### ')) {
                    return <h4 key={index} className="text-lg md:text-xl font-bold mt-6 mb-3 text-slate-800 dark:text-slate-200">{paragraph.replace('#### ', '')}</h4>;
                  }

                  // 4. MARKDOWN BLOCKQUOTES
                  if (paragraph.startsWith('> ')) {
                    const quoteText = paragraph.replace('> ', '');
                    return (
                      <blockquote key={index} className="border-l-4 border-indigo-500 pl-4 italic text-slate-700 dark:text-slate-300 my-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-r-lg">
                        {renderTextWithFormatting(quoteText)}
                      </blockquote>
                    );
                  }
                  
                  // 5. STANDARD PARAGRAPH
                  return (
                    <p key={index} className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
                        {renderTextWithFormatting(paragraph)}
                    </p>
                  );
                }) : (
                  <p className="text-slate-500 italic">No content available for this post.</p>
                )}
            </div>

            <AdUnit slotId="article-bottom" />

        </div>
      </article>

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)}
        url={window.location.href}
        title={post.title}
        modalTitle={labels.shareTitle}
      />
    </div>
  );
};

export default BlogPostView;