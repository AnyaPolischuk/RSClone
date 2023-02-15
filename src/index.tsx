import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import commonRu from './translations/ru/common.json';
import commonEn from './translations/en/common.json';

import App from './App';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem('lang') ?? 'en',
  resources: {
    en: {
      common: commonEn,
    },
    ru: {
      common: commonRu,
    },
  },
});

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
);
