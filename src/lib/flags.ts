/**
 * @file      flags.ts
 * @summary   Feature flag del sito. Per riattivare una pagina nascosta basta
 *            rimettere il flag a true (e ripristinare la rotta in
 *            vite.config.ts PRERENDER_ROUTES + sitemap.xml).
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */

// Pagina /coach ("Per le Società") temporaneamente nascosta (richiesta CEO).
export const COACH_ENABLED = false;

// Demo /app ("L'App") temporaneamente nascosta (richiesta CEO, da rifinire).
export const APP_ENABLED = false;
