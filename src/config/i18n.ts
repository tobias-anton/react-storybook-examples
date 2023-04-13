import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { de } from '../assets/i18n/de';
import { en } from '../assets/i18n/en';

export const DEFAULT_NS = 'general';

type SupportedLanguages = 'de' | 'en';
export const SUPPORTED_LANGUAGES: SupportedLanguages[] = ['de', 'en'];
export const DEFAULT_LANGUAGE = 'de';
export const i18nConfig: InitOptions = {
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  defaultNS: DEFAULT_NS,
  resources: { de, en },
  ns: Object.keys(de),
  interpolation: {
    escapeValue: false,
  },
  appendNamespaceToCIMode: true,
  pluralSeparator: '_',
};

void i18n.use(initReactI18next).init(i18nConfig);

export default i18n;
