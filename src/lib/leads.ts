/**
 * @file      leads.ts
 * @summary   Inserimento dei lead nel database Supabase condiviso.
 *            Un'unica tabella per tutti i percorsi; `user_type` distingue l'origine
 *            (società / allenatore / genitore / atleta) per il ricontatto manuale.
 */
import { getSupabase, isSupabaseConfigured } from './supabase'
import { notifyLead } from './notify'

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
  gender?: string | null
  age_range?: string | null
  location?: string | null
  beta_tester?: boolean | null
}

export interface InsertLeadResult {
  ok: boolean
  /** Codice/messaggio d'errore (es. 'supabase_not_configured' o errore Postgres). */
  error?: string
}

const LEADS_TABLE = import.meta.env.VITE_SUPABASE_LEADS_TABLE || 'leads'

/** Timeout per tentativo (ms) e numero di tentativi totali su errore di rete. */
const INSERT_TIMEOUT_MS = 8000
const MAX_ATTEMPTS = 2

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** Avvolge una promise con un timeout: se scade, rigetta con 'timeout'. */
function withTimeout<T>(promise: PromiseLike<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('timeout')), ms)
    Promise.resolve(promise).then(
      (v) => { clearTimeout(id); resolve(v) },
      (e) => { clearTimeout(id); reject(e) },
    )
  })
}

/**
 * Inserisce un lead in Supabase. Non lancia mai: restituisce sempre { ok, error }
 * così la UI può mostrare uno stato di successo/errore.
 * Ogni tentativo ha un timeout; in caso di errore di rete riprova una volta.
 */
export async function insertLead(payload: LeadPayload): Promise<InsertLeadResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: 'supabase_not_configured' }
  }

  const supabase = await getSupabase()
  if (!supabase) return { ok: false, error: 'supabase_not_configured' }

  const row = {
    ...payload,
    source_path:
      payload.source_path ??
      (typeof window !== 'undefined' ? window.location.pathname : null),
  }

  let lastError = 'unknown_error'
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const { error } = await withTimeout(
        supabase.from(LEADS_TABLE).insert(row),
        INSERT_TIMEOUT_MS,
      )
      // Errore Postgres (es. RLS, validazione): non è transitorio, inutile ritentare
      if (error) return { ok: false, error: error.message }
      // Salvataggio riuscito → avvisa il team via email (best-effort, non bloccante)
      notifyLead(row)
      return { ok: true }
    } catch (e) {
      // Errore di rete / timeout: transitorio → ritenta dopo un breve backoff
      lastError = e instanceof Error ? e.message : 'unknown_error'
      if (attempt < MAX_ATTEMPTS) await wait(600 * attempt)
    }
  }
  return { ok: false, error: lastError }
}
