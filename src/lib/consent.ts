/**
 * @file      consent.ts
 * @summary   Consenso cookie (analytics/marketing) persistito in localStorage.
 *            Gli analytics vengono inizializzati SOLO dopo consenso 'accepted'.
 */

export type CookieConsent = 'accepted' | 'rejected';

const KEY = 'bab-cookie-consent';

/** Ritorna la scelta salvata, o null se l'utente non ha ancora deciso. */
export function getConsent(): CookieConsent | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const v = localStorage.getItem(KEY);
    return v === 'accepted' || v === 'rejected' ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: CookieConsent): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* storage non disponibile: il banner ricomparirà, è il comportamento atteso */
  }
}
