import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchEmojis } from '@/services/emojiService';
import { EmojiGroup, EmojiRaw, Locale, BlogPost, LOCALE_DATA } from '@/types';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import Toast from '@/components/Toast';
import TextEditor from '@/components/TextEditor';
import TranslitTool from '@/components/TranslitTool';
import CapsLockTool from '@/components/CapsLockTool'; 
import EmojiCategory from '@/components/EmojiCategory';
import KaomojiCategory from '@/components/KaomojiCategory';
import EmojiButton from '@/components/EmojiButton';
import FloatingControls from '@/components/FloatingControls';
import SEOSection from '@/components/SEOSection';
import SEOHead from '@/components/SEOHead'; 
import BlogList from '@/components/BlogList';
import BlogPostView from '@/components/BlogPost';
import ShareModal from '@/components/ShareModal';
import ReactionOverlay from '@/components/ReactionOverlay';
import Sidebar from './components/Sidebar';
import { getSEOData } from '@/data/seoContent';
import { KAOMOJI_DATA } from '@/data/kaomoji';
import { UI_LABELS } from '@/data/uiTranslations';
import { BLOG_POSTS } from '@/data/blogPosts'; 
import { Clock, Heart } from 'lucide-react';

const getGroupId = (name: string) => name.replace(/\s+/g, '-').toLowerCase();
type ViewState = 'home' | 'blog' | 'article';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const App: React.FC = () => {
  const [allGroups, setAllGroups] = useState<EmojiGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Smileys & Emotion');
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  
  const [locale, setLocale] = useState<Locale>(() => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    const isSupported = LOCALE_DATA.some(l => l.code === langParam);
    return (isSupported ? langParam : 'en') as Locale;
  });

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [editorText, setEditorText] = useState('');
  const [activeTab, setActiveTab] = useState<'emoji' | 'translit' | 'kaomoji' | 'capslock'>('emoji');
  const [forceOpenState, setForceOpenState] = useState<boolean | null>(null);
  const [favorites, setFavorites] = useState<EmojiRaw[]>([]);
  const [recent, setRecent] = useState<EmojiRaw[]>([]);
  
  const [viewState, setViewState] = useState<ViewState>('home');
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [triggerEmoji, setTriggerEmoji] = useState<string | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postSlug = params.get('post');
    
    if (postSlug) {
      const targetPost = BLOG_POSTS.find(p => p.slug === postSlug && p.locale === locale);
      const fallbackPost = BLOG_POSTS.find(p => p.slug === postSlug && p.locale === 'en');
      
      if (targetPost || fallbackPost) {
        setCurrentPost(targetPost || fallbackPost || null);
        setViewState('article');
      }
    }
  }, []); 

  useEffect(() => {
    if (viewState === 'article' && currentPost) {
      const localizedPost = BLOG_POSTS.find(p => p.slug === currentPost.slug && p.locale === locale);
      if (localizedPost && localizedPost.id !== currentPost.id) {
        setCurrentPost(localizedPost);
      }
    }
  }, [locale, viewState, currentPost]);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLocale);
    window.history.pushState({}, '', url);
    document.documentElement.lang = newLocale;
  };

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Analytics Handling
  useEffect(() => {
    const pagePath = window.location.pathname + window.location.search;
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-NQHNV1QMT4', {
        page_path: pagePath
      });
    }
  }, [locale, viewState, currentPost, activeTab]);

  useEffect(() => {
    const savedFavs = localStorage.getItem('emoji-favs');
    const savedRecent = localStorage.getItem('emoji-recent');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedRecent) setRecent(JSON.parse(savedRecent));
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const groups = await fetchEmojis(locale);
      setAllGroups(groups);
      setLoading(false);
    };
    init();
  }, [locale]);

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return allGroups;
    const query = searchQuery.toLowerCase();
    return allGroups.map(group => ({
      ...group,
      emojis: group.emojis.filter(emoji => {
        if (emoji.searchTags && emoji.searchTags.includes(query)) return true;
        if (emoji.skins && emoji.skins.some(skin => skin.label && skin.label.toLowerCase().includes(query))) return true;
        return false;
      })
    })).filter(group => group.emojis.length > 0);
  }, [allGroups, searchQuery]);

  const filteredKaomoji = useMemo(() => {
    if (!searchQuery.trim()) return KAOMOJI_DATA;
    const query = searchQuery.toLowerCase();
    
    return KAOMOJI_DATA.map(group => ({
      ...group,
      items: group.items.filter(item => {
        return (
          item.text.includes(query) || 
          item.meaning.toLowerCase().includes(query) ||
          item.tags.some(t => t.toLowerCase().includes(query)) ||
          item.keywords.toLowerCase().includes(query)
        );
      })
    })).filter(group => group.items.length > 0);
  }, [searchQuery]);

  const handleCategorySelect = (groupName: string) => {
    if (viewState !== 'home') setViewState('home'); 
    setActiveCategory(groupName);
    setTimeout(() => {
      const element = document.getElementById(getGroupId(groupName));
      if (element) {
        const headerOffset = 220; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
  };

  const updateRecent = useCallback((emoji: EmojiRaw) => {
    setRecent(prev => {
      const filtered = prev.filter(e => e.hexcode !== emoji.hexcode);
      const updated = [emoji, ...filtered].slice(1, 16); 
      localStorage.setItem('emoji-recent', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback((emoji: EmojiRaw) => {
    setFavorites(prev => {
      const exists = prev.some(e => e.hexcode === emoji.hexcode);
      let updated;
      if (exists) {
        updated = prev.filter(e => e.hexcode !== emoji.hexcode);
      } else {
        updated = [...prev, emoji];
      }
      localStorage.setItem('emoji-favs', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleEmojiSelect = useCallback((emoji: EmojiRaw) => {
    navigator.clipboard.writeText(emoji.emoji).then(() => {
      setToast({ message: `Copied ${emoji.emoji} to clipboard!`, visible: true });
    }).catch(err => console.error('Failed to copy: ', err));
    setEditorText(prev => prev + emoji.emoji);
    updateRecent(emoji);
    setTriggerEmoji(emoji.emoji);
  }, [updateRecent]);

  const handleKaomojiSelect = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToast({ message: `Copied ${text} to clipboard!`, visible: true });
    });
    setEditorText(prev => prev + text);
    setTriggerEmoji('🎉');
  }, []);

  const handleCopyText = useCallback(() => {
    navigator.clipboard.writeText(editorText).then(() => {
      setToast({ message: 'Text copied to clipboard!', visible: true });
      setTriggerEmoji('🎉');
    });
  }, [editorText]);

  const closeToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  const favIds = useMemo(() => favorites.map(f => f.hexcode), [favorites]);

  const toggleBlog = () => {
    if (viewState === 'home') {
      setViewState('blog');
      window.scrollTo(0, 0);
      const url = new URL(window.location.href);
      url.searchParams.delete('post');
      window.history.pushState({}, '', url);
    } else {
      setViewState('home');
      const url = new URL(window.location.href);
      url.searchParams.delete('post');
      window.history.pushState({}, '', url);
    }
  };

  const openArticle = (post: BlogPost) => {
    setCurrentPost(post);
    setViewState('article');
    const url = new URL(window.location.href);
    url.searchParams.set('post', post.slug);
    window.history.pushState({}, '', url);
  };

  const handleBackToBlog = () => {
    setViewState('blog');
    const url = new URL(window.location.href);
    url.searchParams.delete('post');
    window.history.pushState({}, '', url);
  };

  const SpecialSection = ({ title, icon: Icon, list }: { title: string, icon: any, list: EmojiRaw[] }) => {
    if (list.length === 0) return null;
    return (
      <div className="mb-6 bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-white/5 rounded-3xl shadow-sm p-4 sm:p-6 w-full">
        <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-200 font-bold">
          <Icon size={20} className="text-indigo-500" />
          <h3>{title}</h3>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-4">
          {list.map((emoji, index) => (
             <EmojiButton 
               key={`special-${title}-${emoji.hexcode}-${index}`} 
               emoji={emoji} 
               onCopy={handleEmojiSelect}
               isFavorite={favIds.includes(emoji.hexcode)}
               onToggleFavorite={toggleFavorite}
               locale={locale}
             />
          ))}
        </div>
      </div>
    );
  };

  // Determine SEO data based on viewState
  const seoContent = getSEOData(locale, activeTab);
  let renderSEOHead;

  if (viewState === 'article' && currentPost) {
    renderSEOHead = (
      <SEOHead 
        title={`${currentPost.seoTitle || currentPost.title} - WebSEOTips`}
        description={currentPost.seoDescription || currentPost.excerpt}
        image={currentPost.image}
        type="article"
        currentLocale={locale}
        slug={currentPost.slug} // PASS SLUG HERE FOR HREFLANG
      />
    );
  } else if (viewState === 'blog') {
    renderSEOHead = (
      <SEOHead 
        title={`WebSEOTips Blog - Stories & History (${locale.toUpperCase()})`}
        description={seoContent.metaDescription}
        currentLocale={locale}
      />
    );
  } else {
    renderSEOHead = (
      <SEOHead 
        title={seoContent.appTitle}
        description={seoContent.metaDescription}
        currentLocale={locale}
      />
    );
  }

  return (
    <div className="min-h-screen pb-32 bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 relative overflow-x-hidden w-full">
      
      {renderSEOHead}

      {/* Background Ambience */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 dark:bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-pink-500/20 dark:bg-purple-500/10 rounded-full blur-[80px] translate-x-1/3 translate-y-1/3 opacity-70"></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-900/10 rounded-full blur-[120px] translate-y-1/2"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <ReactionOverlay triggerEmoji={triggerEmoji} onComplete={() => setTriggerEmoji(null)} />

      <Header 
        groups={allGroups} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onCategorySelect={handleCategorySelect}
        activeCategory={activeCategory}
        currentLocale={locale}
        onLocaleChange={handleLocaleChange} 
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenBlog={toggleBlog}
        isBlogActive={viewState !== 'home'}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10 w-full">
        
        {viewState === 'home' && (
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
            
            {/* === LEFT SIDEBAR (ADS & TIPS) - Desktop Only === */}
            <Sidebar />

            {/* === MAIN CONTENT (RIGHT) === */}
            <div className="flex-1 min-w-0 w-full">
              
              {/* === EMOJI TAB === */}
              {activeTab === 'emoji' && (
                <>
                  <TextEditor 
                    text={editorText} 
                    setText={setEditorText} 
                    onCopy={handleCopyText}
                    onClear={() => setEditorText('')}
                    locale={locale}
                  />
                  <main className="min-w-0 w-full">
                    {loading ? (
                      <Loader />
                    ) : filteredGroups.length === 0 ? (
                      <div className="text-center py-20 animate-fade-in bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                        <p className="text-6xl mb-4 opacity-50">🧐</p>
                        <p className="text-2xl text-slate-600 dark:text-slate-400 font-medium">{UI_LABELS[locale]?.noEmojisFound}</p>
                      </div>
                    ) : (
                      <>
                        {!searchQuery && (
                          <>
                            <SpecialSection title={UI_LABELS[locale]?.favorites} icon={Heart} list={favorites} />
                            <SpecialSection title={UI_LABELS[locale]?.recent} icon={Clock} list={recent} />
                          </>
                        )}
                        {filteredGroups.map((group) => (
                          <EmojiCategory 
                            key={group.groupName}
                            group={group}
                            id={getGroupId(group.groupName)}
                            onCopy={handleEmojiSelect}
                            forceOpen={forceOpenState}
                            favoriteIds={favIds}
                            onToggleFavorite={toggleFavorite}
                            localizedName={(UI_LABELS[locale]?.categories as any)?.[group.groupName]}
                            locale={locale}
                          />
                        ))}
                      </>
                    )}
                  </main>
                </>
              )}

              {/* === KAOMOJI TAB === */}
              {activeTab === 'kaomoji' && (
                <>
                  <TextEditor 
                    text={editorText} 
                    setText={setEditorText} 
                    onCopy={handleCopyText}
                    onClear={() => setEditorText('')}
                    locale={locale}
                  />
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {filteredKaomoji.map((group, index) => (
                      <KaomojiCategory 
                          key={index}
                          group={group}
                          onCopy={handleKaomojiSelect}
                          locale={locale}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* === SEO TAB === */}
              {activeTab === 'translit' && (
                <TranslitTool locale={locale} />
              )}

              {/* === CAPS LOCK TAB === */}
              {activeTab === 'capslock' && (
                <CapsLockTool locale={locale} />
              )}

              {!loading && <SEOSection locale={locale} activeTab={activeTab} />}
            </div>
          </div>
        )}

        {viewState === 'blog' && (
          <BlogList 
            locale={locale} 
            onReadPost={openArticle} 
            onBackToHome={() => setViewState('home')} 
          />
        )}

        {viewState === 'article' && currentPost && (
          <BlogPostView 
            post={currentPost} 
            onBack={handleBackToBlog} 
            onHome={() => setViewState('home')}
            locale={locale}
            onOpenPost={openArticle}
          />
        )}

      </div>

      <Toast 
        message={toast.message} 
        isVisible={toast.visible} 
        onClose={closeToast} 
      />

      <FloatingControls 
        onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onCollapseAll={() => setForceOpenState(false)}
        onExpandAll={() => setForceOpenState(true)}
        onShare={() => setIsShareModalOpen(true)}
      />

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        url={window.location.href}
        title={viewState === 'home' ? getSEOData(locale, activeTab).appTitle : currentPost?.title || ''}
        modalTitle={UI_LABELS[locale]?.shareTitle}
      />
      
      <footer className="text-center py-10 text-slate-400 dark:text-slate-600 text-sm mb-8 md:mb-0 border-t border-slate-200 dark:border-white/5 mt-8 relative z-10">
        <p>© {new Date().getFullYear()} WebSEOTips. {UI_LABELS[locale]?.footer}</p>
      </footer>
    </div>
  );
};

export default App;