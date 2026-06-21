/**
 * @file      leads.ts
 * @summary   Inserimento dei lead nel database Supabase condiviso.
 *            Un'unica tabella per tutti i percorsi; `user_type` distingue l'origine
 *            (società / allenatore / genitore / atleta) per il ricontatto manuale.
 */
import { getSupabase, isSupabaseConfigured } from './supabase'

export type UserType = 'societa' | 'allenatore' | 'genitore' | 'atleta'

export interface LeadPayload {
  email: string
  user_type: UserType
  sport?: string | null
  concern?: string | null
  sitg_score?: number | null
  source_path?: string | null
  lang?: string | null
  name?: string | null
  club?: string | null
  role?: string | null
  message?: string | null
}

export interface InsertLeadResult {
  ok: boolean
  /** Codice/messaggio d'errore (es. 'supabase_not_configured' o errore Postgres). */
  error?: string
}

const LEADS_TABLE = import.meta.env.VITE_SUPABASE_LEADS_TABLE || 'leads'

/**
 * Inserisce un lead in Supabase. Non lancia mai: restituisce sempre { ok, error }
 * così la UI può mostrare uno stato di successo/errore.
 */
export async function insertLead(payload: LeadPayload): Promise<InsertLeadResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: 'supabase_not_configured' }
  }
  try {
    const supabase = await getSupabase()
    if (!supabase) return { ok: false, error: 'supabase_not_configured' }
    const row = {
      ...payload,
      source_path:
        payload.source_path ??
        (typeof window !== 'undefined' ? window.location.hash : null),
    }
    const { error } = await supabase.from(LEADS_TABLE).insert(row)
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'unknown_error' }
  }
}
