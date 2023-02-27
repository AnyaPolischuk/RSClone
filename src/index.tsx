import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import commonRu from './translations/ru/common.json';
import commonEn from './translations/en/common.json';

import App from './App';

import './index.css';
import { store } from './store/store'
import { Provider } from 'react-redux';

i18next.init({
  interpolation: { escapeValue: false },
  lng: JSON.parse(localStorage.getItem('config') as string)?.lang ?? 'en',
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
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>
);
