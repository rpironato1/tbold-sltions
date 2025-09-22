import 'react-i18next';

// Import the type of the common namespace
import type common from '../locales/pt-BR/common.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
    };
  }
}