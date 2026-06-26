import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import itTranslation from './locales/it.json';
import frTranslation from './locales/fr.json';

// Lingue attualmente esposte sul sito. Il francese è TEMPORANEAMENTE nascosto
// (decisione CEO, giu 2026): solo IT/EN, le due lingue completamente revisionate.
// La traduzione `fr.json` resta bundlata qui sotto: per riattivare il francese
// basta aggiungere 'fr' a SUPPORTED_LNGS (e rimuovere il filtro nel selettore di App).
export const SUPPORTED_LNGS = ['it', 'en'] as const;

const resources = {
  en: { translation: enTranslation },
  it: { translation: itTranslation },
  // fr resta disponibile per la riattivazione futura, ma fuori da supportedLngs.
  fr: { translation: frTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // Una lingua rilevata fuori da questa lista (es. 'fr' nel browser o salvata da
    // una sessione precedente) ricade automaticamente su fallbackLng.
    supportedLngs: [...SUPPORTED_LNGS],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      // Le risorse sono già bundlate staticamente: senza Suspense, useTranslation non
      // registra l'effetto di "attesa risorse" che cambiava il numero di hook tra i
      // render (warning React "useEffect changed size between renders").
      useSuspense: false,
    },
  });

// Se la lingua rilevata non è più esposta (es. 'fr' salvato da prima), riportala
// subito a una supportata: così localStorage e <html lang> restano coerenti col
// contenuto effettivamente mostrato.
const clampLng = (lng?: string) => {
  const short = (lng ?? '').substring(0, 2);
  return (SUPPORTED_LNGS as readonly string[]).includes(short) ? short : 'en';
};
if (clampLng(i18n.language) !== (i18n.language ?? '').substring(0, 2)) {
  i18n.changeLanguage(clampLng(i18n.language));
}

// Mantieni l'attributo <html lang> sincronizzato con la lingua attiva (SEO + accessibilità)
const syncHtmlLang = (lng: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = clampLng(i18n.resolvedLanguage ?? lng);
  }
};
syncHtmlLang(i18n.language);
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
