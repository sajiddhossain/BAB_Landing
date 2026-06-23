/**
 * @file      flags.ts
 * @summary   Feature flag del sito. Per riattivare la pagina /coach ("Per le Società")
 *            basta rimettere COACH_ENABLED = true (e ripristinare /coach in
 *            vite.config.ts PRERENDER_ROUTES + sitemap.xml).
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */

// Temporaneamente nascosto su richiesta della CEO (da rifinire in futuro).
export const COACH_ENABLED = false;
