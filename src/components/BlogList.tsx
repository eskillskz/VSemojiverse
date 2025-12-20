import React, { useEffect, useState } from 'react';
import { BlogPost, Locale } from '@/types';
import { BLOG_POSTS } from '@/data/blogPosts'; 
import { ArrowRight, BookOpen, Home, Loader2, ChevronDown, Calendar, Clock } from 'lucide-react';
import { UI_LABELS } from '@/data/uiTranslations';
import AdUnit from './AdUnit'; 

interface BlogListProps {
  locale: Locale;
  onReadPost: (post: BlogPost) => void;
  onBackToHome: () => void;
}

const getCategoryStyle = (cat: string) => {
  const c = cat?.toLowerCase() || '';
  if (c === 'instagram') return 'bg-rose-500 text-white shadow-rose-500/30';
  if (c === 'business') return 'bg-blue-600 text-white shadow-blue-600/30';
  if (c === 'emoji') return 'bg-amber-500 text-white shadow-amber-500/30';
  if (c === 'history') return 'bg-purple-600 text-white shadow-purple-600/30';
  if (c === 'astrology') return 'bg-violet-600 text-white shadow-violet-600/30';
  if (c === 'seo google') return 'bg-green-600 text-white shadow-green-600/30';
  return 'bg-slate-700 text-white';
};

const CATEGORIES = ['All', 'Instagram', 'Emoji', 'Business', 'History', 'Astrology', 'SEO Google', 'Digital Marketing'];

const BlogList: React.FC<BlogListProps> = ({ locale, onReadPost, onBackToHome }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9); 
  const [loading, setLoading] = useState(true);
  const labels = UI_LABELS[locale];

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const displayPosts = BLOG_POSTS.filter(p => p.locale === locale);
        setPosts(displayPosts);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [locale]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(p => p.category === selectedCategory));
    }
    setVisibleCount(9); 
  }, [selectedCategory, posts]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;

  const handlePostClick = (e: React.MouseEvent<HTMLAnchorElement>, post: BlogPost) => {
    e.preventDefault();
    onReadPost(post);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
        <p className="text-slate-500 font-medium">Loading stories...</p>
      </div>
    );
  }

  return (
    <div className="py-8 animate-in fade-in duration-500">
      <div className="flex items-center mb-8 px-4 lg:px-0">
        <button 
          onClick={onBackToHome}
          className="group flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all shadow-sm"
        >
          <Home size={18} />
          <span className="font-bold">{labels.mainMenu}</span>
        </button>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-6 space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-wide">
          <BookOpen size={16} />
          Blog & Stories
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Discover the World of Emojis
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3 mt-6">
           {CATEGORIES.map(cat => (
             <button
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                 selectedCategory === cat
                 ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg transform scale-105'
                 : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
               }`}
             >
               {cat === 'All' ? '✨ All' : cat}
             </button>
           ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mb-10">
         <AdUnit 
            slotId="blog-list-header-ad" 
            format="auto" 
            className="min-h-[150px] bg-slate-100 dark:bg-slate-800/50"
         />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No articles found in this category.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 lg:px-0">
            {visiblePosts.map((post) => (
              <a 
                key={post.id}
                href={`?lang=${locale}&post=${post.slug}`}
                onClick={(e) => handlePostClick(e, post)}
                className="group relative bg-white dark:bg-slate-900/50 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full block"
              >
                <div className="absolute top-4 left-4 z-20">
                   <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-md ${getCategoryStyle(post.category || 'Emoji')}`}>
                     {post.category || 'Emoji'}
                   </span>
                </div>

                <div className="h-56 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.imageAlt || post.title} 
                      className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${post.imageGradient || 'from-gray-400 to-gray-600'} flex items-center justify-center`}>
                        <span className="text-6xl drop-shadow-md">✍️</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Metadata Row */}
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-3 flex-1 text-sm leading-relaxed font-medium">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    {/* Author Mini Info */}
                    <div className="flex items-center gap-2">
                       <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                       <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{post.author.name}</span>
                    </div>

                    <div className="flex items-center font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Read <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          {hasMore && (
            <div className="mt-12 text-center">
              <button 
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-200 dark:border-slate-700"
              >
                Load More Stories
                <ChevronDown size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogList;