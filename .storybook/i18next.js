import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { de } from '../src/assets/i18n/de';
import { en } from '../src/assets/i18n/en';

const DEFAULT_NS = 'general';
const SUPPORTED_LANGUAGES = ['de', 'en'];
const DEFAULT_LANGUAGE = 'de';
const i18nConfig = {
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
