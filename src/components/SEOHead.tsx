
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
  slug?: string; // If present, we are on an article page
}

const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  image = 'https://emojiverse.netlify.app/og-image-default.jpg',
  url = window.location.href,
  type = 'website',
  publishedTime,
  author = 'EmojiVerse Team',
  currentLocale = 'en',
  slug
}) => {
  const baseUrl = 'https://emojiverse.netlify.app';

  // Helper to generate URL for a specific locale
  const getLocaleUrl = (locCode: string) => {
    const params = new URLSearchParams();
    params.set('lang', locCode);
    if (slug) {
      params.set('post', slug);
    }
    return `${baseUrl}/?${params.toString()}`;
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Hreflang Tags for SEO (Crucial for Multilingual Sites) */}
      {LOCALE_DATA.map((loc) => (
        <link 
          key={loc.code} 
          rel="alternate" 
          hrefLang={loc.code} 
          href={getLocaleUrl(loc.code)} 
        />
      ))}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={getLocaleUrl('en')} 
      />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="EmojiVerse" />
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
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;