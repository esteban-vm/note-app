import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-chained-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'
import HttpBackend from 'i18next-http-backend'

await i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS: 'notes',
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    debug: import.meta.env.DEV,
    interpolation: { escapeValue: false },
    backend: {
      backends: [LocalStorageBackend, HttpBackend],
      backendOptions: [{ expirationTime: 14 * 24 * 60 ** 2 * 1000 }, { loadPath: '/locales/{{lng}}/{{ns}}.json' }],
    },
  })
