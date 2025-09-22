import { Helmet } from 'react-helmet-async';
import { useTypedTranslation } from '@/hooks/useTranslation';

interface SEOHeadProps {
  page?: string;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  page,
  title: customTitle,
  description: customDescription,
  keywords: customKeywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
}) => {
  const { t, getCurrentLanguage } = useTypedTranslation();
  const currentLanguage = getCurrentLanguage();
  const baseUrl = 'https://turnbold.com.br';
  
  // Get translated content with proper fallbacks
  const pageKey = page || 'home';
  
  // Try to get page-specific meta, then fall back to common meta
  const getMetaValue = (field: 'title' | 'description' | 'keywords') => {
    // First try custom value
    if (field === 'title' && customTitle) return customTitle;
    if (field === 'description' && customDescription) return customDescription;
    if (field === 'keywords' && customKeywords) return customKeywords;
    
    // Then try page-specific meta
    const pageValue = t(`pages:${pageKey}.meta.${field}`, { defaultValue: '' });
    if (pageValue) return pageValue;
    
    // Finally fall back to common meta
    return t(`common:meta.${field}`, { 
      defaultValue: field === 'title' ? 'Turnbold Solutions' : 
                    field === 'description' ? 'Transformamos empresas com soluções inovadoras de IA e desenvolvimento de software personalizado.' :
                    'inteligência artificial, desenvolvimento software, IA generativa, automação empresarial'
    });
  };
  
  const title = getMetaValue('title');
  const description = getMetaValue('description');
  const keywords = getMetaValue('keywords');
  
  // Build full title
  const commonTitle = t('common:meta.title', { defaultValue: 'Turnbold Solutions' });
  const fullTitle = title === commonTitle || title.includes('Turnbold Solutions') ? title : `${title} | Turnbold Solutions`;
  
  // Build canonical and alternate URLs
  const canonicalUrl = url || `${baseUrl}${window.location.pathname}`;
  const alternateUrls = {
    'pt-BR': canonicalUrl.replace(/^\/(en|es)\//, '/'),
    'en': canonicalUrl.replace(/^\//, '/en/').replace(/^\/en\/en\//, '/en/'),
    'es': canonicalUrl.replace(/^\//, '/es/').replace(/^\/es\/es\//, '/es/'),
  };
  
  // Default image
  const defaultImage = `${baseUrl}/images/og-default.jpg`;
  const ogImage = image || defaultImage;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <html lang={currentLanguage} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical and alternate URLs */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={alternateUrls['pt-BR']} hrefLang="pt-BR" />
      <link rel="alternate" href={alternateUrls['en']} hrefLang="en" />
      <link rel="alternate" href={alternateUrls['es']} hrefLang="es" />
      <link rel="alternate" href={alternateUrls['pt-BR']} hrefLang="x-default" />
      
      {/* Open Graph meta tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Turnbold Solutions" />
      <meta property="og:locale" content={currentLanguage === 'pt-BR' ? 'pt_BR' : currentLanguage} />
      <meta property="og:locale:alternate" content="pt_BR" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="es_ES" />
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional meta tags for articles */}
      {type === 'article' && (
        <>
          {author && <meta name="author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          <meta property="article:author" content={author || 'Turnbold Solutions'} />
        </>
      )}
      
      {/* Language detection and SEO optimization */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Structured data for organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Turnbold Solutions",
          "url": baseUrl,
          "logo": `${baseUrl}/images/logo.png`,
          "sameAs": [
            "https://www.linkedin.com/company/turnbold-solutions",
            "https://www.instagram.com/turnbold",
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "availableLanguage": ["Portuguese", "English", "Spanish"]
          }
        })}
      </script>
      
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": ogImage,
            "url": canonicalUrl,
            "author": {
              "@type": "Organization",
              "name": author || "Turnbold Solutions"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Turnbold Solutions",
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/images/logo.png`
              }
            },
            "datePublished": publishedTime,
            "dateModified": modifiedTime || publishedTime,
            "inLanguage": currentLanguage
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;