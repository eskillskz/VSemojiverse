import React from 'react';
import { Helmet } from 'react-helmet-async';
import { LOCALE_DATA, Locale } from '@/types';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  currentLocale?: Locale;
  slug?: string; // Если есть slug, значит мы внутри статьи
}

const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  image = 'https://webseotips.com/og-image-default.jpg', // Убедитесь, что эта картинка есть или замените на актуальную
  // url проп больше не обязателен, мы генерируем его сами для точности
  type = 'website',
  publishedTime,
  author = 'WebSEOTips Team',
  currentLocale = 'en',
  slug
}) => {
  const baseUrl = 'https://webseotips.com';

  // --- ГЛАВНАЯ ФУНКЦИЯ ГЕНЕРАЦИИ URL ---
  // Она создает правильную ссылку для каждого языка
  const getLocaleUrl = (locCode: string) => {
    const params = new URLSearchParams();
    
    // Для всех языков кроме английского добавляем ?lang=...
    if (locCode !== 'en') {
      params.set('lang', locCode);
    }
    
    // Если мы в статье, добавляем ?post=...
    if (slug) {
      params.set('post', slug);
    }

    const queryString = params.toString();
    // Если параметров нет (главная на английском), возвращаем чистый домен
    return queryString ? `${baseUrl}/?${queryString}` : `${baseUrl}/`;
  };

  // --- ОПРЕДЕЛЕНИЕ КАНОНИЧЕСКОГО URL ---
  // Это решает проблему "Страница является копией" в Google.
  // Мы генерируем "чистый" URL для ТЕКУЩЕГО языка и говорим гуглу: "Это оригинал".
  const currentCanonicalUrl = getLocaleUrl(currentLocale);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* !!! SELF-REFERENCING CANONICAL !!! */}
      <link rel="canonical" href={currentCanonicalUrl} />

      {/* Hreflang Tags (Связи между языками) */}
      {LOCALE_DATA.map((loc) => (
        <link 
          key={loc.code} 
          rel="alternate" 
          hrefLang={loc.code} 
          href={getLocaleUrl(loc.code)} 
        />
      ))}
      
      {/* X-Default (Обычно указывает на английскую версию) */}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={getLocaleUrl('en')} 
      />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="WebSEOTips" />
      <meta property="og:locale" content={currentLocale} />

      {/* Article Specific OG Tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentCanonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;