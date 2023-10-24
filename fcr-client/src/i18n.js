import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Fichiers de traduction
import translationEN from './i18n/en/translation.json';
import translationFR from './i18n/fr/translation.json';
import translationES from './i18n/es/translation.json';
import translationPOR from './i18n/por/translation.json';
import translationIT from './i18n/it/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  por: {
    translation: translationPOR
  },
  es: {
    translation: translationES
  },
  it: {
    translation: translationIT
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'fr', // langue par défaut
    fallbackLng: 'en', // langue de secours

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;