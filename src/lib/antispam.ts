/**
 * @file      antispam.ts
 * @summary   Protezione anti-spam dei form SENZA servizi esterni (niente CAPTCHA):
 *            1) honeypot — un campo nascosto che gli umani non vedono ma i bot
 *               compilano automaticamente → se valorizzato, l'invio è un bot;
 *            2) trappola temporale — un invio entro pochi istanti dal montaggio del
 *               form è quasi certamente automatizzato.
 *            Entrambi sono euristiche client-side: alzano il costo dello spam banale
 *            a costo zero, lasciando un CAPTCHA come passo futuro se servirà.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useCallback, useRef, useState } from 'react';

/** Campo nascosto fuori schermo, invisibile anche agli screen reader. */
export const HONEYPOT_FIELD = 'company_website';

export interface AntiSpam {
  /** Valore corrente dell'honeypot (resta '' per gli umani). */
  trap: string;
  setTrap: (v: string) => void;
  /** True se l'invio sembra un bot (honeypot pieno o invio troppo rapido). */
  isLikelyBot: () => boolean;
}

/**
 * @param minMs soglia minima (ms) tra montaggio del form e invio. Default 1500 ms:
 *              ben sotto il tempo che impiega un umano a compilare, ben sopra un bot.
 */
export function useAntiSpam(minMs = 1500): AntiSpam {
  const [trap, setTrap] = useState('');
  const mountedAt = useRef<number>(Date.now());

  const isLikelyBot = useCallback(() => {
    if (trap.trim() !== '') return true;
    if (Date.now() - mountedAt.current < minMs) return true;
    return false;
  }, [trap, minMs]);

  return { trap, setTrap, isLikelyBot };
}
