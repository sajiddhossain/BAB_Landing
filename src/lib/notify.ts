/**
 * @file      notify.ts
 * @summary   Ponte email lato client: dopo un salvataggio riuscito su Supabase,
 *            avvisa il team inviando il lead alla funzione serverless /api/notify-lead
 *            (che recapita l'email in stile BAB via Resend).
 * @notice    Fire-and-forget e best-effort: non attende, non lancia, non blocca mai
 *            lo stato di successo del form. Se l'endpoint non esiste (es. dev locale
 *            senza `vercel dev`) o fallisce, l'errore viene ignorato in silenzio.
 *            Disattivabile con VITE_LEAD_NOTIFY=off.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import type { LeadPayload } from './leads'

const ENABLED = import.meta.env.VITE_LEAD_NOTIFY !== 'off'
const ENDPOINT = '/api/notify-lead'

/**
 * Notifica il team di un nuovo lead. Non attende la risposta: `keepalive` fa
 * completare la richiesta anche se la pagina cambia subito dopo l'invio.
 */
export function notifyLead(payload: LeadPayload): void {
  if (!ENABLED || typeof fetch !== 'function') return
  try {
    void fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      /* best-effort: l'iscrizione è già salvata su Supabase */
    })
  } catch {
    /* best-effort */
  }
}
