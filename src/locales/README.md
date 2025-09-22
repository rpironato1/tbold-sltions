# Internationalization (i18n) Setup

This directory contains the translation files for the Turnbold Solutions website.

## Structure

```
src/locales/
├── pt-BR/
│   └── common.json     # Portuguese (Brazil) translations
├── en/
│   └── common.json     # English translations
├── es/
│   └── common.json     # Spanish translations
└── README.md          # This file
```

## Usage in Components

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('navigation.home')}</h1>
      <p>{t('common.loading')}</p>
    </div>
  );
}
```

## Adding New Translations

1. Add the new key-value pairs to all language files
2. Use TypeScript autocomplete to access them in components
3. Always add to all three languages (pt-BR, en, es)

## Language Detection

The system automatically detects the user's preferred language based on:
1. Previously saved language in localStorage
2. Browser language settings
3. Falls back to Portuguese (Brazil) as default

## Language Switching

Use the `LanguageSelector` component or programmatically:

```tsx
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const switchToEnglish = () => {
    i18n.changeLanguage('en');
  };
  
  return <button onClick={switchToEnglish}>Switch to English</button>;
}
```