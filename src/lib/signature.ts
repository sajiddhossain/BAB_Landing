/**
 * @file      src/lib/signature.ts
 * @summary   La firma dell'architettura BAB, in un posto solo. La usano tre
 *            consumatori diversi e devono dire tutti la stessa cosa:
 *            (1) la console del browser, su ogni pagina (printSignature),
 *            (2) i file generati al build — sitemap, robots, llms.txt, feed,
 *            (3) humans.txt.
 *            Se cambia l'anno o il nome, si cambia qui e basta.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */

/** La firma canonica. Non contiene mai `--`: finisce dentro commenti XML. */
export const SIGNATURE = '✦ BAB Architecture designed & coded by Sajid Hossain (2026) ✦'

/** Una riga sotto la firma: cosa è questo sito, per chi legge il sorgente. */
export const SIGNATURE_TAGLINE =
  'Breaking All Barriers — salute e performance delle giovani atlete · https://www.babsport.com'

/**
 * Stampa la firma nella console del browser.
 * Silenziosa in SSR/prerender (dove `window` non esiste) e a prova di eccezione:
 * una console rotta non deve mai impedire il mount di React.
 */
export function printSignature(): void {
  // `globalThis.document` invece di `window`: questo modulo è importato anche da
  // vite.config.ts, che TypeScript compila senza la libreria DOM.
  const inBrowser = typeof (globalThis as { document?: unknown }).document !== 'undefined'
  if (!inBrowser || typeof console === 'undefined') return
  try {
    console.log(
      `%c${SIGNATURE}%c\n${SIGNATURE_TAGLINE}`,
      [
        'background:#D2EC7C',
        'color:#111111',
        'font-weight:700',
        'font-size:13px',
        'padding:6px 10px',
        'border:2px solid #111111',
        'border-radius:2px',
      ].join(';'),
      'color:#34BBC0;font-size:11px;padding-top:4px',
    )
  } catch {
    /* una console non disponibile non è un errore dell'applicazione */
  }
}
