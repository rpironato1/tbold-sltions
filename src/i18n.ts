import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translations synchronously
import commonPtBR from './locales/pt-BR/common.json' with { type: 'json' };
import pagesPtBR from './locales/pt-BR/pages.json' with { type: 'json' };
import componentsPtBR from './locales/pt-BR/components.json' with { type: 'json' };
import projectsPtBR from './locales/pt-BR/projects.json' with { type: 'json' };
import blogPtBR from './locales/pt-BR/blog.json' with { type: 'json' };

import commonEn from './locales/en/common.json' with { type: 'json' };
import pagesEn from './locales/en/pages.json' with { type: 'json' };
import componentsEn from './locales/en/components.json' with { type: 'json' };
import projectsEn from './locales/en/projects.json' with { type: 'json' };
import blogEn from './locales/en/blog.json' with { type: 'json' };

import commonEs from './locales/es/common.json' with { type: 'json' };
import pagesEs from './locales/es/pages.json' with { type: 'json' };
import componentsEs from './locales/es/components.json' with { type: 'json' };
import projectsEs from './locales/es/projects.json' with { type: 'json' };
import blogEs from './locales/es/blog.json' with { type: 'json' };

// Language detection function
const detectLanguage = (): string => {
  // Check localStorage first
  try {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['pt-BR', 'en', 'es'].includes(savedLanguage)) {
      return savedLanguage;
    }
  } catch (e) {
    // localStorage might not be available
  }

  // Check browser language
  const browserLanguage = navigator.language;
  
  // Map browser languages to supported languages
  const languageMap: Record<string, string> = {
    'pt': 'pt-BR',
    'pt-BR': 'pt-BR',
    'pt-PT': 'pt-BR',
    'en': 'en',
    'en-US': 'en',
    'en-GB': 'en',
    'es': 'es',
    'es-ES': 'es',
    'es-MX': 'es',
    'es-AR': 'es',
  };

  // Try exact match first
  if (languageMap[browserLanguage]) {
    return languageMap[browserLanguage];
  }

  // Try language code without region
  const languageCode = browserLanguage.split('-')[0];
  if (languageMap[languageCode]) {
    return languageMap[languageCode];
  }

  // Default to Portuguese (Brazil)
  return 'pt-BR';
};

// Complete resources with all translations loaded synchronously
const resources = {
  'pt-BR': {
    common: commonPtBR,
    pages: pagesPtBR,
    components: componentsPtBR,
    projects: projectsPtBR,
    blog: blogPtBR,
  },
  en: {
    common: commonEn,
    pages: pagesEn,
    components: componentsEn,
    projects: projectsEn,
    blog: blogEn,
  },
  es: {
    common: commonEs,
    pages: pagesEs,
    components: componentsEs,
    projects: projectsEs,
    blog: blogEs,
  },
} as const;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectLanguage(),
    fallbackLng: 'pt-BR',
    
    // Enable debugging in development
    debug: false,

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // Default namespace
    defaultNS: 'common',
    
    // Configure namespaces
    ns: ['common', 'pages', 'components', 'projects', 'blog'],

    // Resource loading configuration
    load: 'currentOnly', // Only load current language initially
    preload: ['pt-BR', 'en', 'es'], // Preload all supported languages
    
    // Performance optimizations
    returnEmptyString: false, // Return key instead of empty string
    returnNull: false, // Always return a string
  });

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('language', lng);
  } catch (e) {
    // localStorage might not be available
  }
});

export default i18n;

// Export types for better TypeScript support
export type Language = 'pt-BR' | 'en' | 'es';
export type Namespace = 'common' | 'pages' | 'components' | 'projects' | 'blog';