import 'i18next';

import { DEFAULT_NS } from '../config/i18n';
import { TranslationKeyStructure } from './translationKeyStructure.type';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NS;
    resources: TranslationKeyStructure;
  }
}
