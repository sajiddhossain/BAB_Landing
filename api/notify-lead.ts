/**
 * @file      api/notify-lead.ts
 * @summary   Email bridge dei lead: riceve il payload di un lead (waitlist B2C o form
 *            Società B2B) subito dopo il salvataggio su Supabase e recapita una email
 *            di notifica, formattata in stile scrapbook BAB, alla casella del team.
 *            Funzione serverless su Vercel (runtime Node). Nessuna dipendenza npm:
 *            usa `fetch` verso l'API di Resend.
 *
 * @env       RESEND_API_KEY               chiave API Resend (obbligatoria per inviare)
 *            LEAD_NOTIFY_TO               destinatario (default: info@babsport.com)
 *            LEAD_NOTIFY_FROM            mittente verificato su Resend
 *                                        (default: "BAB · Waitlist <onboarding@resend.dev>")
 *            LEAD_NOTIFY_ALLOWED_ORIGINS origin ammessi, separati da virgola
 *                                        (default: www/apex babsport.com)
 *
 * @notice    Best-effort e non bloccante lato client: se la chiave manca o Resend
 *            fallisce, l'iscrizione dell'utente resta comunque salvata su Supabase.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */

/* Tipi minimi (strutturali) della richiesta/risposta Vercel Node: evitano una
 * dipendenza da @vercel/node e il rischio di disallineare il lockfile. */
interface Req {
  method?: string
  headers: Record<string, string | string[] | undefined>
  body?: unknown
}
interface Res {
  status(code: number): Res
  json(data: unknown): void
  setHeader(name: string, value: string): void
}

/** Origine di un lead, dedotta dai campi presenti (waitlist ha genere/età/beta). */
type LeadSource = 'waitlist' | 'club'

interface Lead {
  email?: unknown
  user_type?: unknown
  role?: unknown
  name?: unknown
  club?: unknown
  gender?: unknown
  age_range?: unknown
  sport?: unknown
  location?: unknown
  message?: unknown
  beta_tester?: unknown
  sitg_score?: unknown
  lang?: unknown
  source_path?: unknown
}

// --- Palette BAB (email-safe: colori pieni, niente sfumature) ---
const CREAM = '#FAF9F6'
const INK = '#0F0F12'
const LIME = '#D2EC7C'
const VIVIDTEAL = '#1F7A63'
const GOLD = '#FFC042'
const SAND = '#E8E4D8'

const USER_TYPES = new Set(['societa', 'allenatore', 'genitore', 'atleta'])
const isEmail = (s: unknown): s is string =>
  typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

/** Ripulisce ed accorcia un valore testuale arbitrario (difesa in profondità). */
const clip = (v: unknown, n: number): string => (typeof v === 'string' ? v : v == null ? '' : String(v)).slice(0, n)
/** Escape HTML per iniettare valori utente nel corpo email senza rischi. */
const esc = (v: unknown): string =>
  clip(v, 500)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// --- Mappe canoniche → italiano (il DB tiene le etichette EN stabili) ---
const ROLE_IT: Record<string, string> = {
  Coach: 'Allenatore',
  'Technical staff': 'Staff tecnico',
  'Medical staff': 'Staff medico',
  Parent: 'Genitore',
  Athlete: 'Atleta',
}
const TYPE_IT: Record<string, string> = {
  societa: 'Società',
  allenatore: 'Allenatore',
  genitore: 'Genitore',
  atleta: 'Atleta',
}
const GENDER_IT: Record<string, string> = {
  Female: 'Femmina',
  Male: 'Maschio',
  'Non-binary': 'Non binario',
  'Prefer not to say': 'Preferisce non dirlo',
}

/** Livello d'intento (SITG) → etichetta + colori del badge. */
function intentBadge(score: number): { label: string; bg: string; fg: string } {
  if (score >= 80) return { label: 'Alto', bg: VIVIDTEAL, fg: '#FFFFFF' }
  if (score >= 50) return { label: 'Medio', bg: GOLD, fg: INK }
  return { label: 'Basso', bg: SAND, fg: INK }
}

/** Riga della "ledger": etichetta a sinistra, valore a destra, bordo inferiore ink. */
function row(label: string, valueHtml: string, last = false): string {
  const border = last ? '' : 'border-bottom:2px solid ' + INK + ';'
  return (
    '<tr>' +
    `<td style="padding:10px 0;${border}width:36%;vertical-align:top;font-size:11px;font-weight:bold;` +
    `text-transform:uppercase;letter-spacing:1px;color:${INK};opacity:.55;">${label}</td>` +
    `<td style="padding:10px 0 10px 12px;${border}vertical-align:top;font-size:15px;font-weight:bold;` +
    `color:${INK};">${valueHtml}</td>` +
    '</tr>'
  )
}

/** Costruisce oggetto, HTML e testo dell'email a partire dal lead.
 *  Esportata anche per test/anteprima locale (vedi scripts di preview). */
export function buildEmail(lead: Lead): { subject: string; html: string; text: string } {
  const source: LeadSource =
    lead.gender != null || lead.age_range != null || lead.beta_tester != null ? 'waitlist' : 'club'

  const userType = clip(lead.user_type, 40)
  const roleRaw = clip(lead.role, 80)
  const roleIt = ROLE_IT[roleRaw] || roleRaw || TYPE_IT[userType] || userType
  const email = clip(lead.email, 200)
  const sport = clip(lead.sport, 120)
  const location = clip(lead.location, 120)
  const club = clip(lead.club, 160)
  const name = clip(lead.name, 160)
  const lang = clip(lead.lang, 8).toUpperCase() || '—'
  const score = Number.isFinite(Number(lead.sitg_score)) ? Number(lead.sitg_score) : null

  // --- Righe (solo i campi valorizzati) ---
  const rows: string[] = []
  rows.push(row('Email', `<a href="mailto:${esc(email)}" style="color:${VIVIDTEAL};font-weight:bold;">${esc(email)}</a>`))
  if (name) rows.push(row('Nome', esc(name)))
  if (club) rows.push(row('Società', esc(club)))
  if (roleRaw) rows.push(row('Ruolo', esc(roleIt)))
  if (lead.gender != null && clip(lead.gender, 60)) rows.push(row('Genere', esc(GENDER_IT[clip(lead.gender, 60)] || clip(lead.gender, 60))))
  if (lead.age_range != null && clip(lead.age_range, 40)) rows.push(row('Età', esc(clip(lead.age_range, 40))))
  if (sport) rows.push(row('Sport', esc(sport)))
  if (location) rows.push(row('Località', esc(location)))
  if (lead.beta_tester != null) rows.push(row('Beta tester', lead.beta_tester ? 'Sì' : 'No'))
  if (clip(lead.message, 1000)) rows.push(row('Messaggio', esc(clip(lead.message, 1000)).replace(/\n/g, '<br>')))
  rows.push(row('Lingua', esc(lang), true))

  // --- Titolo, hero e oggetto ---
  const isClub = source === 'club'
  const title = isClub ? 'Nuova richiesta demo' : 'Nuova iscrizione alla waitlist'
  const hero = isClub ? club || roleIt : [roleIt, sport].filter(Boolean).join(' · ') || 'Nuova iscrizione'
  const sub = isClub
    ? [roleIt, 'richiesta demo'].filter(Boolean).join(' · ')
    : [location, clip(lead.age_range, 40)].filter(Boolean).join(' · ')
  const subject = isClub
    ? `🏟️ Nuova richiesta demo — ${club || 'società'}${roleRaw ? ` (${roleIt})` : ''}`
    : `🌱 Nuova iscrizione — ${roleIt}${sport ? ` · ${sport}` : ''}${location ? ` · ${location}` : ''}`

  // --- Badge intento (SITG) ---
  let badge = ''
  if (score != null) {
    const b = intentBadge(score)
    badge =
      `<tr><td style="padding:0 18px 4px;">` +
      `<table role="presentation" cellpadding="0" cellspacing="0"><tr>` +
      `<td style="background:${b.bg};color:${b.fg};border:2px solid ${INK};padding:6px 12px;` +
      `font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1.5px;">` +
      `Intento ${esc(b.label)} · ${score}/100</td>` +
      `</tr></table></td></tr>`
  }

  // --- Timestamp Europe/Rome ---
  let stamp = ''
  try {
    stamp = new Intl.DateTimeFormat('it-IT', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Europe/Rome',
    }).format(new Date())
  } catch {
    stamp = new Date().toISOString()
  }
  const sourcePath = esc(clip(lead.source_path, 200) || '/')

  const html =
    `<!doctype html><html lang="it"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<meta name="color-scheme" content="light only"><title>${esc(title)}</title></head>` +
    `<body style="margin:0;background:${SAND};padding:24px 12px;` +
    `font-family:'Space Grotesk',Arial,Helvetica,sans-serif;color:${INK};">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">` +
    // strato "ombra dura": ink dietro, sfalsato in basso a destra
    `<table role="presentation" cellpadding="0" cellspacing="0" width="560" style="max-width:560px;width:100%;background:${INK};">` +
    `<tr><td style="padding:0 7px 7px 0;">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${CREAM};border:3px solid ${INK};">` +
    // header lime
    `<tr><td style="background:${LIME};border-bottom:3px solid ${INK};padding:14px 18px;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>` +
    `<td style="font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:${INK};">● ${esc(title)}</td>` +
    `<td align="right" style="font-size:14px;font-weight:bold;letter-spacing:4px;color:${INK};">BAB</td>` +
    `</tr></table></td></tr>` +
    // hero
    `<tr><td style="padding:22px 18px 8px;">` +
    `<div style="font-size:23px;font-weight:bold;line-height:1.15;color:${INK};">${esc(hero)}</div>` +
    (sub
      ? `<div style="margin-top:6px;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:${INK};opacity:.55;">${esc(sub)}</div>`
      : '') +
    `</td></tr>` +
    badge +
    // ledger
    `<tr><td style="padding:12px 18px 20px;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.join('')}</table>` +
    `</td></tr>` +
    // footer ink
    `<tr><td style="background:${INK};color:${CREAM};padding:14px 18px;font-size:11px;line-height:1.6;">` +
    `Inviato in automatico dai form di <b style="color:${LIME};">babsport.com</b><br>` +
    `${esc(stamp)} · ${sourcePath} · lingua ${esc(lang)}` +
    `</td></tr>` +
    `</table></td></tr></table>` +
    `</td></tr></table></body></html>`

  // --- Fallback testo semplice ---
  const textLines = [
    title.toUpperCase(),
    '',
    `Email: ${email}`,
    name ? `Nome: ${name}` : '',
    club ? `Società: ${club}` : '',
    roleRaw ? `Ruolo: ${roleIt}` : '',
    lead.gender != null ? `Genere: ${GENDER_IT[clip(lead.gender, 60)] || clip(lead.gender, 60)}` : '',
    lead.age_range != null ? `Età: ${clip(lead.age_range, 40)}` : '',
    sport ? `Sport: ${sport}` : '',
    location ? `Località: ${location}` : '',
    lead.beta_tester != null ? `Beta tester: ${lead.beta_tester ? 'Sì' : 'No'}` : '',
    score != null ? `Intento (SITG): ${intentBadge(score).label} · ${score}/100` : '',
    clip(lead.message, 1000) ? `Messaggio: ${clip(lead.message, 1000)}` : '',
    `Lingua: ${lang}`,
    '',
    `${stamp} · ${clip(lead.source_path, 200) || '/'}`,
  ].filter(Boolean)

  return { subject, html, text: textLines.join('\n') }
}

// --- Rate limit best-effort (per IP, in memoria: si azzera a ogni cold start) ---
const HITS = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 8
function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  HITS.set(ip, recent)
  if (HITS.size > 500) HITS.clear() // guardia memoria
  return recent.length > MAX_PER_WINDOW
}

export default async function handler(req: Req, res: Res): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' })
    return
  }

  // Allowlist origin: blocca l'abuso banale cross-origin dal browser.
  const allowed = (process.env.LEAD_NOTIFY_ALLOWED_ORIGINS || 'https://www.babsport.com,https://babsport.com')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : ''
  if (origin && allowed.length && !allowed.includes(origin)) {
    res.status(403).json({ ok: false, error: 'forbidden_origin' })
    return
  }

  const ipHeader = req.headers['x-forwarded-for']
  const ip = (typeof ipHeader === 'string' ? ipHeader.split(',')[0] : '').trim() || 'unknown'
  if (rateLimited(ip)) {
    res.status(429).json({ ok: false, error: 'rate_limited' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_NOTIFY_TO || 'info@babsport.com'
  const from = process.env.LEAD_NOTIFY_FROM || 'BAB · Waitlist <onboarding@resend.dev>'
  // Senza chiave configurata: non è un errore per l'utente, l'iscrizione è salvata.
  if (!apiKey) {
    res.status(200).json({ ok: false, skipped: 'not_configured' })
    return
  }

  // Vercel fa già il parse del JSON quando content-type è application/json.
  const body: Lead = (req.body && typeof req.body === 'object' ? (req.body as Lead) : {})
  if (!isEmail(body.email) || !USER_TYPES.has(clip(body.user_type, 40))) {
    res.status(400).json({ ok: false, error: 'invalid_payload' })
    return
  }

  const { subject, html, text } = buildEmail(body)

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: isEmail(body.email) ? body.email : undefined,
        subject,
        html,
        text,
      }),
    })
    if (!r.ok) {
      const detail = await r.text().catch(() => '')
      res.status(502).json({ ok: false, error: 'resend_error', detail: clip(detail, 300) })
      return
    }
    res.status(200).json({ ok: true })
  } catch (e) {
    res.status(502).json({ ok: false, error: 'network_error', detail: clip(e instanceof Error ? e.message : '', 200) })
  }
}
