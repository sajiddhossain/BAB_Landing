/**
 * @file      EnglishVersionNotice.tsx
 * @summary   Avviso sulle pagine italiane del blog per chi legge il sito in un'altra
 *            lingua: la versione inglese esiste, sotto /en, ma chi arriva su /blog/…
 *            (da Google, da un link condiviso, dal footer) non ha modo di saperlo.
 *            L'URL decide la lingua del contenuto — è ciò che tiene coerenti canonical
 *            e hreflang — quindi qui non si reindirizza: si offre il link.
 *            Solo client: la pagina statica prerenderizzata resta identica.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useTranslation } from 'react-i18next';

interface EnglishVersionNoticeProps {
  /** Lingua della pagina, dall'URL. */
  lang: string;
  /** Indirizzo della versione inglese; se manca, l'avviso non compare. */
  href: string | null;
  label: string;
}

export default function EnglishVersionNotice({ lang, href, label }: EnglishVersionNoticeProps) {
  const { i18n } = useTranslation();
  const readerLang = (i18n.language || 'it').slice(0, 2);
  if (lang !== 'it' || readerLang === 'it' || !href) return null;

  return (
    <p lang="en" className="mb-8 bg-[#EBE5FF] text-[#0F0F12] border-[3px] border-black px-4 py-3 shadow-[4px_4px_0_0_#0F0F12] font-bold text-sm">
      <a
        href={href}
        className="underline decoration-[2px] underline-offset-4 hover:text-vividteal focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
      >
        {label} <span aria-hidden="true">→</span>
      </a>
    </p>
  );
}
