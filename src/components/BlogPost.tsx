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
                {/* ------------------------------ */}

            </div>

            <AdUnit slotId="article-top" />

            <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500 leading-relaxed">
                {contentArray.length > 0 ? contentArray.map((paragraph, index) => {
                  if (!paragraph) return null;
                  
                  const trimmedBlock = paragraph.trim();

                  // --- 1. HTML CONTENT (Tables & Accordions) ---
                  // Checks for blocks starting with HTML tags generated by the AI script
                  // This is CRITICAL for rendering the tables and FAQ properly
                  if (trimmedBlock.startsWith('<div') || trimmedBlock.startsWith('<table') || trimmedBlock.startsWith('<details')) {
                    return (
                      <div 
                        key={index} 
                        dangerouslySetInnerHTML={{ __html: trimmedBlock }} 
                        className="my-8 w-full"
                      />
                    );
                  }

                  // --- 2. IMAGE RENDERING LOGIC ---
                  if (paragraph.startsWith('IMAGE:')) {
                    const [keywordsPart, altTextPart] = paragraph.replace('IMAGE:', '').split('|');
                    const keywords = keywordsPart ? keywordsPart.trim() : 'abstract';
                    const altText = altTextPart ? altTextPart.trim() : post.title;
                    
                    const encodedPrompt = encodeURIComponent(`${keywords}, realistic, high quality, 4k`);
                    const seed = post.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + index;
                    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=600&nologo=true&seed=${seed}`;

                    return (
                        <figure key={index} className="my-10">
                            <img 
                                src={imageUrl} 
                                alt={altText} 
                                className="w-full h-auto rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 object-cover max-h-[500px]"
                                loading="lazy"
                            />
                            <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2 italic">
                                {altText}
                            </figcaption>
                        </figure>
                    );
                  }

                  // --- 3. HEADERS ---
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl md:text-3xl font-extrabold mt-12 mb-6 text-slate-900 dark:text-white">{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-xl md:text-2xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100">{paragraph.replace('### ', '')}</h3>;
                  }
                  
                  // --- 4. STANDARD PARAGRAPH (with bold support) ---
                  return (
                    <p key={index} className="mb-6">
                        {paragraph.split('**').map((part, i) => 
                            i % 2 === 1 ? <span key={i} className="font-bold text-slate-900 dark:text-white bg-indigo-50 dark:bg-indigo-500/10 px-1 rounded mx-0.5">{part}</span> : part
                        )}
                    </p>
                  );
                }) : (
                  <p className="text-slate-500 italic">No content available for this post.</p>
                )}
            </div>

            <AdUnit slotId="article-bottom" />

        </div>
      </article>

      {/* Recommended Posts Section */}
      {recommendedPosts.length > 0 && (
          <div className="mt-20 px-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                  <Sparkles className="text-indigo-500" />
                  {locale === 'ru' ? 'Рекомендуем почитать' : locale === 'es' ? 'Artículos recomendados' : 'Recommended Reading'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedPosts.map((recPost) => (
                      <div 
                        key={recPost.id}
                        onClick={() => onOpenPost && onOpenPost(recPost)}
                        className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                      >
                          <div className="relative h-32 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                              {recPost.category && (
                                <div className="absolute top-2 left-2 z-20">
                                   <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm ${getCategoryStyle(recPost.category)}`}>
                                     {recPost.category}
                                   </span>
                                </div>
                              )}
                              {recPost.image ? (
                                <img 
                                  src={recPost.image} 
                                  alt={recPost.imageAlt || recPost.title}
                                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${recPost.imageGradient}`}></div>
                              )}
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2 line-clamp-2 group-hover:text-indigo-500 transition-colors">
                                  {recPost.title}
                              </h4>
                              <div className="flex items-center justify-between mt-auto pt-4 text-xs text-slate-500">
                                  <span>{recPost.date}</span>
                                  <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                      Read <ArrowRight size={14} className="ml-1" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

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