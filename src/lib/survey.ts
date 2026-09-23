/**
 * @file      src/lib/survey.ts
 * @summary   Il sondaggio «Che cosa sa davvero chi allena»: definizione delle domande
 *            e inserimento delle risposte in Supabase.
 *
 *            Perché questo file esiste. Tutti i numeri del sito vengono da studi
 *            stranieri, e una rassegna di studi stranieri non la linka nessuno.
 *            Il primo numero ITALIANO su un tema, invece, lo cita chiunque ne scriva.
 *            Questo sondaggio esiste per produrre quel numero: dieci domande a cui
 *            si risponde in tre minuti, nessuna delle quali chiede competenze
 *            cliniche a chi risponde — sono domande su PRATICHE e CONOSCENZE, non
 *            su diagnosi. È anche la ragione per cui si può scrivere a una società
 *            sportiva: «rispondi in tre minuti e ti mando i risultati» è una
 *            richiesta accettabile, «leggi il mio articolo» no.
 *
 *            Regola: le domande sono la fonte unica. La UI, lo schema SQL
 *            (docs/supabase_survey_setup.sql) e la futura pagina dei risultati
 *            leggono da qui. Se cambi un `value`, cambia anche il CHECK in SQL.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { getSupabase, isSupabaseConfigured } from './supabase'

const SURVEY_TABLE = import.meta.env.VITE_SUPABASE_SURVEY_TABLE || 'survey_coach'
const INSERT_TIMEOUT_MS = 8000
const MAX_ATTEMPTS = 2

export interface Choice {
  value: string
  label: string
}

export interface Question {
  /** Deve coincidere con il nome della colonna in survey_coach. */
  id: string
  /** La domanda, scritta come la farebbe una persona. */
  label: string
  /** Riga di contesto sotto la domanda, quando serve a non far sbagliare. */
  hint?: string
  kind: 'single' | 'multi' | 'text'
  choices?: Choice[]
  /** Solo per kind 'multi': massimo di voci selezionabili. */
  max?: number
  required: boolean
  placeholder?: string
}

/**
 * Le dieci domande. L'ordine conta: si parte da ciò che è facile e identitario
 * (chi sei, che sport) e si arriva alle domande che chiedono di ammettere di non
 * sapere una cosa — a quel punto chi risponde ha già investito un minuto e non
 * abbandona. Nessuna domanda ha una risposta «giusta» evidente: se ce l'avesse,
 * il dato sarebbe inutile perché tutti sceglierebbero quella.
 */
export const SURVEY_QUESTIONS: Question[] = [
  {
    id: 'role',
    label: 'Qual è il tuo ruolo nello sport giovanile femminile?',
    kind: 'single',
    required: true,
    choices: [
      { value: 'allenatore', label: 'Alleno una o più squadre' },
      { value: 'dirigente', label: 'Sono dirigente di una società' },
      { value: 'preparatore', label: 'Sono preparatore/preparatrice atletico/a' },
      { value: 'sanitario', label: 'Sono fisioterapista, medico o nutrizionista' },
      { value: 'genitore-dirigente', label: 'Sono un genitore con un ruolo in società' },
      { value: 'altro', label: 'Altro' },
    ],
  },
  {
    id: 'sport',
    label: 'Quale sport?',
    kind: 'text',
    required: true,
    placeholder: 'Pallavolo, basket, calcio, atletica, ginnastica…',
  },
  {
    id: 'age_groups',
    label: 'Che età hanno le atlete che segui?',
    hint: 'Se segui più fasce, indica quella su cui passi più tempo.',
    kind: 'single',
    required: true,
    choices: [
      { value: '10-12', label: '10-12 anni' },
      { value: '13-15', label: '13-15 anni' },
      { value: '16-18', label: '16-18 anni' },
      { value: 'piu-fasce', label: 'Più fasce, in modo equivalente' },
    ],
  },
  {
    id: 'experience',
    label: 'Da quanti anni lavori con squadre giovanili?',
    kind: 'single',
    required: true,
    choices: [
      { value: '<2', label: 'Meno di 2' },
      { value: '2-5', label: 'Da 2 a 5' },
      { value: '6-10', label: 'Da 6 a 10' },
      { value: '>10', label: 'Più di 10' },
    ],
  },
  {
    id: 'cycle_talk',
    label: 'Ti è mai capitato di parlare di ciclo mestruale con le tue atlete?',
    hint: 'Non c’è una risposta giusta: serve sapere com’è davvero, non come dovrebbe essere.',
    kind: 'single',
    required: true,
    choices: [
      { value: 'mai', label: 'Mai' },
      { value: 'una-volta', label: 'Una volta o due, per caso' },
      { value: 'solo-se-lo-dicono', label: 'Sì, ma solo quando sono loro a tirarlo fuori' },
      { value: 'argomento-normale', label: 'Sì, è un argomento normale nella mia squadra' },
    ],
  },
  {
    id: 'head_impact',
    label: 'Sapresti che cosa fare nei primi minuti dopo un colpo alla testa?',
    kind: 'single',
    required: true,
    choices: [
      { value: 'no', label: 'No, dovrei chiedere a qualcuno' },
      { value: 'piu-o-meno', label: 'Più o meno, andrei a intuito' },
      { value: 'conosco-protocollo', label: 'Sì, conosco un protocollo di riferimento' },
      { value: 'procedura-scritta', label: 'Sì, e la mia società ha una procedura scritta' },
    ],
  },
  {
    id: 'safeguarding',
    label: 'La tua società ha un responsabile contro abusi, violenze e discriminazioni?',
    hint: 'È un obbligo di legge per le società sportive (d.lgs. 39/2021, art. 16).',
    kind: 'single',
    required: true,
    choices: [
      { value: 'si-so-chi', label: 'Sì, e so chi è' },
      { value: 'si-non-so-chi', label: 'Sì, ma non so chi sia' },
      { value: 'no', label: 'No' },
      { value: 'non-lo-so', label: 'Non lo so' },
    ],
  },
  {
    id: 'training',
    label: 'Hai mai ricevuto formazione sulla salute delle atlete femminili?',
    kind: 'single',
    required: true,
    choices: [
      { value: 'mai', label: 'Mai' },
      { value: 'una-tantum', label: 'Un incontro una tantum' },
      { value: 'corso-allenatori', label: 'Sì, faceva parte del corso allenatori' },
      { value: 'continua', label: 'Sì, in modo continuativo' },
    ],
  },
  {
    id: 'first_thought',
    label: 'Un’atleta cala di rendimento per settimane. Qual è il tuo primo pensiero?',
    hint: 'Il primo, quello onesto — non quello che diresti a un genitore.',
    kind: 'single',
    required: true,
    choices: [
      { value: 'impegno', label: 'Che si sta impegnando meno' },
      { value: 'personale-scuola', label: 'Che ha qualcosa fuori dal campo (scuola, famiglia, amicizie)' },
      { value: 'qualcosa-di-fisico', label: 'Che c’è qualcosa di fisico da indagare' },
      { value: 'non-saprei', label: 'Non saprei da dove partire' },
    ],
  },
  {
    id: 'needs',
    label: 'Di che cosa avresti più bisogno? (fino a 2 risposte)',
    kind: 'multi',
    max: 2,
    required: true,
    choices: [
      { value: 'materiale-pratico', label: 'Materiale pratico da usare in palestra' },
      { value: 'formazione', label: 'Formazione seria, non un webinar di un’ora' },
      { value: 'qualcuno-a-cui-chiedere', label: 'Qualcuno a cui poter chiedere' },
      { value: 'dati-e-fonti', label: 'Dati e fonti affidabili su cui basarmi' },
      { value: 'niente', label: 'Niente, me la cavo' },
    ],
  },
]

export interface SurveyPayload {
  role: string
  sport: string
  age_groups: string
  experience: string
  cycle_talk: string
  head_impact: string
  safeguarding: string
  training: string
  first_thought: string
  /** Multiscelta serializzata: valori separati da virgola. */
  needs: string
  region?: string | null
  email?: string | null
  note?: string | null
  source_path?: string | null
}

export interface InsertSurveyResult {
  ok: boolean
  error?: string
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

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
 * Inserisce una risposta. Non lancia mai: restituisce sempre { ok, error } così la
 * UI può mostrare uno stato. Stessa logica di leads.ts — timeout per tentativo e
 * un solo ritentativo sugli errori di rete, nessun ritentativo sugli errori
 * Postgres, che non sono transitori.
 */
export async function insertSurveyResponse(payload: SurveyPayload): Promise<InsertSurveyResult> {
  if (!isSupabaseConfigured) return { ok: false, error: 'supabase_not_configured' }

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
        supabase.from(SURVEY_TABLE).insert(row),
        INSERT_TIMEOUT_MS,
      )
      if (error) return { ok: false, error: error.message }
      return { ok: true }
    } catch (e) {
      lastError = e instanceof Error ? e.message : 'unknown_error'
      if (attempt < MAX_ATTEMPTS) await wait(600 * attempt)
    }
  }
  return { ok: false, error: lastError }
}
