
import React, { useState } from 'react';
import { Locale } from '../types';
import { getSEOData } from '../data/seoContent';
import { HelpCircle, Info, Tag, ChevronDown, ChevronUp } from 'lucide-react';

interface SEOSectionProps {
  locale: Locale;
  activeTab: 'emoji' | 'kaomoji' | 'translit' | 'capslock';
}

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 overflow-hidden transition-all duration-300 hover:shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left cursor-pointer focus:outline-none"
      >
        <h3 className={`font-bold text-base sm:text-lg transition-colors ${isOpen ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'}`}>
          {q}
        </h3>
        <div className={`mt-1 p-1 rounded-full transition-colors shrink-0 ${isOpen ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>
      
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-5 pt-0">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 text-sm sm:text-base">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
};

const SEOSection: React.FC<SEOSectionProps> = ({ locale, activeTab }) => {
  const data = getSEOData(locale, activeTab);

  // Enhanced Schema.org JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": data.appTitle,
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "url": "https://emojiverse.netlify.app",
        "description": data.metaDescription,
        "featureList": data.keywords.join(', '),
        "availableLanguage": ["English", "Russian", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Kazakh"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "1250",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://emojiverse.netlify.app"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
            "item": `https://emojiverse.netlify.app/${activeTab}`
          }
        ]
      }
    ]
  };

  // Split FAQ into two columns
  const midPoint = Math.ceil(data.faq.length / 2);
  const leftFaq = data.faq.slice(0, midPoint);
  const rightFaq = data.faq.slice(midPoint);

  return (
    <section className="mt-20 border-t border-slate-200 dark:border-white/5 pt-16 pb-8 px-4 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-900/20 animate-in fade-in duration-700">
      {/* Inject Schema.org Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
             <div className="sticky top-24">
                <div className="flex items-center gap-3 mb-4 text-indigo-600 dark:text-indigo-400">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl">
                    <Info size={28} />
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{data.aboutTitle}</h2>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                  {data.subHeading}
                </p>
             </div>
          </div>
          
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-none">
               <div className="prose dark:prose-invert max-w-none space-y-6">
                  {data.aboutText.map((paragraph, idx) => (
                    <p key={idx} className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                      {/* Simple bold rendering */}
                      {paragraph.split('**').map((part, i) => 
                        i % 2 === 1 ? <span key={i} className="font-bold text-indigo-600 dark:text-indigo-400">{part}</span> : part
                      )}
                    </p>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-wide mb-2">
                <HelpCircle size={16} />
                FAQ
             </div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                {data.faqTitle}
             </h2>
             <p className="text-lg text-slate-500 dark:text-slate-400">
                {data.faqIntro}
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex flex-col gap-4">
              {leftFaq.map((item, index) => (
                <FAQItem key={`l-${index}`} q={item.q} a={item.a} />
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {rightFaq.map((item, index) => (
                 <FAQItem key={`r-${index}`} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>

        {/* Keyword Cloud */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-8 text-slate-400">
            <Tag size={18} />
            <h3 className="text-sm font-bold uppercase tracking-widest">
               {locale === 'ru' ? 'Популярно' : 'Popular Topics'}
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {data.keywords.map((tag) => (
              <span 
                key={tag} 
                className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all cursor-default shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SEOSection;
