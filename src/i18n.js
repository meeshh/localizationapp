import i18n from 'i18next'
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from 'react-i18next'
import XHR from 'i18next-xhr-backend'

import languageEN from './locate/en/translate.json'
import languageAR from './locate/ar/translate.json'

i18n
 .use(XHR)
 .use(LanguageDetector)
 .use(initReactI18next)
 .init({
  resources: {
   en: languageEN,
   ar: languageAR
  },
  /* default language when load the website in browser */
  lng: "en",
  /* When react i18next not finding any language to as default in borwser */
  fallbackLng: "en",
  /* debugger For Development environment */
  debug: false,
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: ".",
  interpolation: {
   escapeValue: false,
   formatSeparator: ","
  },
  react: {
   wait: true,
   bindI18n: 'languageChanged loaded',
   bindStore: 'added removed',
   nsMode: 'default'
  }
 })

export default i18n;