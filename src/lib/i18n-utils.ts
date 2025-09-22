import { useTranslation } from 'react-i18next';
import type { Language, Namespace } from '../i18n';

/**
 * Custom hook for i18n with type safety and additional utilities
 */
export const useTypedTranslation = (namespace?: Namespace | Namespace[]) => {
  const { t, i18n } = useTranslation(namespace);
  
  const changeLanguage = async (language: Language) => {
    await i18n.changeLanguage(language);
  };
  
  const getCurrentLanguage = (): Language => {
    return i18n.language as Language;
  };
  
  const isLanguageSupported = (language: string): language is Language => {
    return ['pt-BR', 'en', 'es'].includes(language);
  };
  
  return {
    t,
    i18n,
    changeLanguage,
    getCurrentLanguage,
    isLanguageSupported,
  };
};

/**
 * Get browser language and map it to supported language
 */
export const getBrowserLanguage = (): Language => {
  const browserLanguage = navigator.language;
  
  // Map browser languages to supported languages
  const languageMap: Record<string, Language> = {
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