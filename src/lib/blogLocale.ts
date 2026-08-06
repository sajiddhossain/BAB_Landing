/**
 * @file      blogLocale.ts
 * @summary   Mappa lingua ↔ URL per il blog. L'italiano è la versione canonica e
 *            vive su /blog/{slug}; l'inglese ha un URL proprio su /en/blog/{slug}.
 *            Serve un URL dedicato per lingua perché una traduzione che esiste solo
 *            dentro il bundle JS (montata da React dopo il rilevamento della lingua)
 *            non è indicizzabile: nessun URL del sito la contiene nell'HTML.
 *            NB: deve restare allineato a BLOG_LOCALES in vite.config.ts, che genera
 *            le pagine statiche e gli hreflang corrispondenti.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */

/** Lingue del blog che hanno pagine statiche e URL propri. */
export const BLOG_URL_LANGS = ['it', 'en'] as const;
export type BlogUrlLang = (typeof BLOG_URL_LANGS)[number];

/** Prefisso URL di una lingua: l'italiano è canonico e non ne ha. */
export const blogPrefix = (lang: string): string => (lang === 'en' ? '/en' : '');

/**
 * Lingua implicita nel path. È l'URL a decidere la lingua dell'articolo, non la
 * preferenza del browser: così ciò che un crawler indicizza su /en/blog/{slug} è
 * sempre inglese e ciò che indicizza su /blog/{slug} è sempre italiano, senza che
 * il contenuto renderizzato contraddica il canonical.
 */
export const blogLangFromPath = (path: string): BlogUrlLang =>
  path === '/en/blog' || path.startsWith('/en/blog/') ? 'en' : 'it';

/** Path dell'indice del blog (senza slug) o di un articolo, nella lingua data. */
export const blogPath = (lang: string, slug?: string): string =>
  `${blogPrefix(lang)}/blog${slug ? `/${slug}` : ''}`;

/**
 * Riscrive i link interni dell'HTML di un articolo (/blog/…) verso il prefisso
 * della lingua corrente, così un lettore inglese non viene rimbalzato sulla
 * versione italiana al primo link interno.
 */
export const localizeBlogLinks = (html: string, lang: string): string => {
  const prefix = blogPrefix(lang);
  return prefix ? html.replace(/href="\/blog\//g, `href="${prefix}/blog/`) : html;
};
