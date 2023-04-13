import { de } from '../assets/i18n/de';

type DeepObject<T> = {
  [K in keyof T]: T[K] extends object ? DeepObject<T[K]> : T[K];
};

export type TranslationKeyStructure = DeepObject<typeof de>;
