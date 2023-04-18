import { theme } from '../src/styles/theme';
import i18n from './i18next';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme,
    resetCSS: true,
  },
  i18n,
  locale: 'de',
  locales: {
    de: { title: 'Deutsch', left: '🇩🇪' },
    en: { title: 'English', left: '🇬🇧' },
    cimode: { title: 'cimode (keys)', left: '🔑' },
  },
};
