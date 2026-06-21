/**
 * @file      supabase.ts
 * @summary   Client Supabase per la cattura lead (waitlist B2C + form Società B2B).
 *            Caricato in modo LAZY (dynamic import) così l'SDK non pesa sul bundle
 *            iniziale: viene scaricato solo al primo invio di un form.
 * @notice    La chiave usata è la chiave PUBBLICA (anon/publishable): è sicura lato
 *            client SOLO se la tabella `leads` ha RLS con la sola policy INSERT per il
 *            ruolo `anon`. Vedi docs/supabase_setup.sql.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/** True quando URL e chiave anon sono presenti in `.env`. */
export const isSupabaseConfigured: boolean = Boolean(url && anonKey)

let clientPromise: Promise<SupabaseClient | null> | null = null

/** Restituisce (creando alla prima chiamata) il client Supabase, oppure null se non configurato. */
export function getSupabase(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured) return Promise.resolve(null)
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(url as string, anonKey as string, {
        auth: { persistSession: false },
      })
    )
  }
  return clientPromise
}
