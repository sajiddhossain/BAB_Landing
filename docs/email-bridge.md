# Email bridge — notifica lead al team

Quando qualcuno compila la **waitlist** (B2C) o il **form Società** (B2B), oltre al
salvataggio su Supabase parte una **email di notifica** al team, formattata in stile
scrapbook BAB. Serve a reagire in fretta senza dover aprire il pannello Supabase.

## Come funziona

```
Form (WaitlistModal / ClubLeadForm)
   └─ insertLead()  ──►  Supabase (tabella leads)          ← fonte di verità
                    └─►  notifyLead()  ──►  POST /api/notify-lead   ← best-effort
                                              └─►  Resend  ──►  info@babsport.com
```

- **Un solo punto d'aggancio:** la notifica parte da `insertLead()`
  ([`src/lib/leads.ts`](../src/lib/leads.ts)), quindi copre **entrambi** i form senza
  duplicazioni.
- **Non bloccante:** `notifyLead()` ([`src/lib/notify.ts`](../src/lib/notify.ts)) è
  fire-and-forget. Se l'email fallisce, l'iscrizione resta comunque salvata e l'utente
  vede lo stato di successo.
- **Funzione serverless:** [`api/notify-lead.ts`](../api/notify-lead.ts) valida il
  payload, applica allowlist origin + rate-limit, costruisce l'email e la invia via
  Resend. Nessuna dipendenza npm aggiunta (usa `fetch`).

## Setup (una tantum)

### 1. Account Resend
1. Crea un account su [resend.com](https://resend.com) (free: 3.000 email/mese).
2. **API key:** *API Keys → Create* → copia la chiave `re_...`.

### 2. Mittente
Il campo `from` deve stare su un dominio verificato in Resend:

- **Subito, senza DNS:** usa il dominio condiviso di Resend →
  `LEAD_NOTIFY_FROM="BAB · Waitlist <onboarding@resend.dev>"`.
  (Il `reply_to` è comunque l'email della persona iscritta, quindi rispondi diretto.)
- **Consigliato:** verifica `babsport.com` (*Domains → Add Domain*, aggiungi i record
  DNS SPF/DKIM indicati) e poi usa `LEAD_NOTIFY_FROM="BAB · Waitlist <waitlist@babsport.com>"`.
  Migliora recapito e riconoscibilità.

### 3. Variabili d'ambiente su Vercel
*Project → Settings → Environment Variables* (ambiente **Production** e Preview):

| Variabile | Esempio | Note |
|---|---|---|
| `RESEND_API_KEY` | `re_...` | **obbligatoria**; senza, la notifica viene saltata (nessun errore per l'utente) |
| `LEAD_NOTIFY_TO` | `info@babsport.com` | destinatario (default già `info@babsport.com`) |
| `LEAD_NOTIFY_FROM` | `BAB · Waitlist <waitlist@babsport.com>` | mittente verificato in Resend |
| `LEAD_NOTIFY_ALLOWED_ORIGINS` | `https://www.babsport.com,https://babsport.com` | origin ammessi per l'endpoint |

Nessuna di queste ha il prefisso `VITE_`: **restano lato server**, non finiscono nel
bundle del browser. Dopo averle impostate, fai un redeploy.

## Test

- **Locale** (opzionale, serve la Vercel CLI): imposta le variabili in `.env`, togli
  `VITE_LEAD_NOTIFY=off`, poi `vercel dev`. Con il semplice `npm run dev` di Vite le
  funzioni `api/` non girano, quindi la notifica è disattivata di proposito.
- **Produzione:** compila un form di test dal sito e controlla la casella
  `info@babsport.com` (e la dashboard Resend → *Logs*).

## Disattivare

- Lato client: `VITE_LEAD_NOTIFY=off` → l'endpoint non viene nemmeno chiamato.
- Lato server: rimuovi `RESEND_API_KEY` → l'endpoint risponde `200 { skipped }` senza
  inviare nulla.

## Privacy

Resend agisce da **responsabile del trattamento** (sub-processor): riceve i dati del
lead solo per recapitare la notifica interna al team. Da citare nell'informativa privacy
tra i fornitori, come già fatto per Supabase. I dati sono gli stessi già raccolti dal
form; non si aggiunge alcuna nuova categoria.
