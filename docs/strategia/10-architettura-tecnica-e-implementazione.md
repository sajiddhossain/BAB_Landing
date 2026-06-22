# BAB — Architettura tecnica e piano di implementazione

> **Documento 10 della strategia BAB** · Versione 1.0 · 2026-06-22
> Autore di riferimento: team tecnico BAB (principal/staff) · Stato: *living document*
> Ambito: dalla landing attuale (in produzione domani sul dominio) fino al prodotto completo (app atleta + backend + Coach Dashboard).

---

> ## 📌 Perché questo documento
>
> BAB nasce come **landing di validazione** ma il prodotto reale è un **ecosistema B2B2C** che tratta **dati di salute di minori**. Questi due fatti hanno conseguenze architetturali pesanti che è meglio decidere *adesso*, mentre il costo del cambiamento è basso, e non dopo aver scritto 50.000 righe.
>
> Questo documento serve a tre cose:
>
> 1. **Fotografare con precisione lo stato attuale** del codice (stack, scelte, razionale) così che chiunque entri nel progetto capisca *cosa* gira e *perché*.
> 2. **Definire l'architettura target** dell'ecosistema (app atleta, backend, Coach Dashboard) e — soprattutto — il **confine privacy** non negoziabile: *i dati di salute individuali dell'atleta sono privati; coach e genitori vedono solo aggregati anonimi 🟢🟡🔴*. Questo confine deve vivere nel **modello dati** e nella **Row Level Security**, non solo nella UI.
> 3. **Tracciare il percorso di implementazione** in fasi con milestone tecniche verificabili, così che ogni decisione di oggi sia compatibile con il prodotto di domani.
>
> Il vincolo guida tutto il resto: **se un coach o un genitore può, con qualsiasi query, risalire al dato individuale di un'atleta, l'architettura ha fallito.**

---

## Indice

1. [Stato attuale: la landing](#1-stato-attuale-la-landing)
2. [Architettura target dell'ecosistema](#2-architettura-target-dellecosistema)
3. [Modello dati e il confine privacy](#3-modello-dati-e-il-confine-privacy)
4. [Sicurezza: Auth, RLS, cifratura, segreti, minori](#4-sicurezza-auth-rls-cifratura-segreti-minori)
5. [Consenso & analytics](#5-consenso--analytics)
6. [Prestazioni & SEO](#6-prestazioni--seo)
7. [Percorso di implementazione: landing → MVP → prodotto](#7-percorso-di-implementazione-landing--mvp--prodotto)
8. [DevOps / Deploy / Testing](#8-devops--deploy--testing)
9. [Rischi tecnici, debito e ADR](#9-rischi-tecnici-debito-e-adr)
10. [Fonti](#10-fonti)

---

## 1. Stato attuale: la landing

### 1.1 Stack reale (dal repo)

Lo stack è volutamente **minimale e statico**: nessun server applicativo, tutto buildato in HTML/CSS/JS e servito da CDN. Dal `package.json`:

| Area | Tecnologia | Versione (range) | Razionale |
|---|---|---|---|
| Build tool | **Vite** | `^8.0.12` | Dev server istantaneo (ESM nativo), build Rollup ottimizzata, plugin ecosystem maturo. |
| UI | **React** + **React DOM** | `^19.2.6` | React 19 (`createRoot`, niente legacy). Funzionalità note del team. |
| Linguaggio | **TypeScript** | `~6.0.2` | Type-safety end-to-end; `tsc -b` con project references (`tsconfig.app.json` + `tsconfig.node.json`). |
| Styling | **Tailwind CSS v4** + `@tailwindcss/vite` | `^4.3.1` | v4 con motore Oxide e **token via `@theme`** in CSS (niente `tailwind.config.js`). Vedi `docs/brand/` per i token ufficiali. |
| Animazioni | **framer-motion** | `^12.40.0` | `AnimatePresence` per transizioni di rotta/modali; rispetto di `prefers-reduced-motion` da curare. |
| i18n | **i18next** + `react-i18next` + `i18next-browser-languagedetector` | `^26 / ^17 / ^8` | Tre locale: `it` (primaria/SEO), `en`, `fr`. |
| Backend lead | **@supabase/supabase-js** | `^2.108.2` | Solo cattura lead; caricato in **lazy import**. |
| E2E (dev) | **playwright** | `^1.61.0` | Presente in devDependencies, non ancora cablato in CI. |

Script (`package.json`):

```jsonc
"dev":     "vite",
"build":   "tsc -b && vite build",   // type-check bloccante + build
"lint":    "eslint .",
"preview": "vite preview"
```

### 1.2 Routing + prerender SEO

Il routing **non** usa una libreria: è gestito a mano in `src/App.tsx` con la **History API** e URL puliti (`/coach`, `/features`, `/app`, `/about`, `/privacy`, `/cookie`, `/termini`). La home è caricata *eager* (è l'LCP), il resto è **code-split** con `React.lazy` + `Suspense`:

```tsx
// src/App.tsx — estratto reale
const AppSimulator   = lazy(() => import('./components/AppSimulator'));
const CoachDashboard = lazy(() => import('./components/CoachDashboard'));
const Features       = lazy(() => import('./components/Features'));
// normalizePath rimuove il trailing slash → match rotte robusto
```

Il problema di una SPA pura è la **SEO**: un crawler che non esegue JS vede una pagina vuota. Per risolverlo il repo usa un **plugin Vite di prerender statico per-rotta** definito in `vite.config.ts` (`prerenderRoutes()`), che gira in fase `build` (hook `closeBundle`). Per ogni rotta in `PRERENDER_ROUTES` genera un `dist/<rotta>/index.html` con `<title>`, `meta description`, Open Graph, `canonical` e un blocco di contenuto SEO dentro `#root`:

```ts
// vite.config.ts — il cuore del prerender
page = page.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(s.title)}</title>`)
page = replaceAttr(page, /(<meta name="description" content=")[^"]*(")/, s.desc)
// ...canonical, og:*, twitter:* ...
page = page.replace(
  /<div id="root">\s*<\/div>/,
  `<div id="root"><h1>${esc(s.title)}</h1><p>${esc(s.desc)}</p></div>`,
)
```

Punto chiave (e razionale, scritto nel commento del file): si usa `createRoot` **senza hydration**, quindi React sostituisce il contenuto al mount e **non c'è mismatch di hydration**. È un compromesso pragmatico: niente framework SSR/SSG completo, ma ogni URL è indicizzabile. I metadati SEO IT sono presi da `src/locales/it.json` → chiave `seo`.

> **Nota architetturale**: questo è un mini-SSG fatto a mano. È la scelta giusta *ora* (zero dipendenze, zero server), ma quando le pagine diventeranno data-driven (blog, contenuti dinamici) andrà valutato il passaggio a un framework con prerender nativo — React Router v7 framework mode, TanStack Start (Vite + Nitro) o Astro. Vedi [ADR-007](#9-rischi-tecnici-debito-e-adr) e §6.

### 1.3 Hosting (Vercel)

`vercel.json`:

```jsonc
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,        // /coach invece di /coach.html
  "trailingSlash": false,
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Il `rewrite` SPA fa sì che qualunque path serva `index.html` (deep-link diretti funzionano). Attenzione: il rewrite catch-all serve `/index.html` (la home prerenderizzata) e **non** la pagina prerenderizzata specifica della rotta — il routing client poi corregge, ma per la SEO conta che i bot raggiungano i file `dist/<rotta>/index.html` generati dal plugin. Con `cleanUrls` Vercel mappa `/coach` → `dist/coach/index.html` *prima* del catch-all: ordine corretto da verificare a ogni deploy (vedi §6.3 e checklist §8).

### 1.4 Lead capture (Supabase)

Due file, separazione netta client/dominio:

- **`src/lib/supabase.ts`** — crea il client **lazy** (`import('@supabase/supabase-js')` solo al primo submit, così l'SDK non pesa sul bundle iniziale). Usa la **chiave anon/publishable** e `auth: { persistSession: false }`. Il commento nel file è esplicito: *la chiave pubblica lato client è sicura **solo se** la tabella `leads` ha RLS con la sola policy INSERT per il ruolo `anon`*.
- **`src/lib/leads.ts`** — dominio. `insertLead(payload)` con:
  - un'unica tabella `leads`, campo `user_type` (`societa | allenatore | genitore | atleta`) a discriminare l'origine;
  - **timeout per tentativo** (8s) + **retry** (max 2) con backoff solo su errori di rete; gli errori Postgres (RLS/validazione) **non** vengono ritentati;
  - non lancia mai eccezioni: ritorna sempre `{ ok, error }` così la UI mostra stato.

```ts
// src/lib/leads.ts — contratto stabile
export interface LeadPayload {
  email: string; user_type: UserType;
  sport?: string|null; concern?: string|null; sitg_score?: number|null;
  source_path?: string|null; lang?: string|null;
  name?: string|null; club?: string|null; role?: string|null; message?: string|null;
}
```

### 1.5 Analytics + consenso (gating)

- **`src/lib/analytics.ts`** — GA4 + Meta Pixel, **predisposti ma spenti** finché in `.env` non ci sono ID *reali* (validazione regex `^G-[A-Z0-9]{4,}$` e `^\d{6,}$`, esclusione di `dummy`/`your_`). `initAnalytics()` è no-op se nessun ID reale. Espone `trackPageview` e `trackEvent` (eventi funnel: `waitlist_open`, `lead_submit`, ecc.).
- **`src/lib/consent.ts`** — consenso `accepted | rejected` persistito in `localStorage` (`bab-cookie-consent`). **Gli analytics si inizializzano solo dopo `accepted`** — questo è il pattern *consent-first* (vedi §5).
- **`CookieBanner`** + **legali** (`/privacy`, `/cookie`, `/termini`) renderizzati da `LegalPage`.

### 1.6 Demo "BAB Buddy"

`AppSimulator.tsx` è una demo **Tamagotchi** ("cura del Buddy", loop di gioco non-quiz) usata in landing per comunicare il tono prodotto. È UI pura, niente backend: è un **prototipo di comunicazione**, non il prodotto. Serve da riferimento UX per l'app reale (§7).

### 1.7 Struttura del repo (sorgenti)

```
src/
├─ App.tsx                 # routing History API + layout + lang switch
├─ main.tsx                # createRoot (no hydration)
├─ i18n.ts                 # init i18next (it/en/fr)
├─ index.css               # Tailwind v4 @theme tokens
├─ lib/
│  ├─ supabase.ts          # client lazy (anon key)
│  ├─ leads.ts             # insertLead (timeout+retry)
│  ├─ analytics.ts         # GA4 + Meta Pixel (gated)
│  └─ consent.ts           # consenso localStorage
├─ components/             # Home, Features, CoachDashboard, AppSimulator,
│  │                       # WaitlistModal, ClubLeadForm, CookieBanner, LegalPage, …
└─ locales/{it,en,fr}.json # contenuti + chiave seo per il prerender
```

---

## 2. Architettura target dell'ecosistema

### 2.1 I tre attori e il modello B2B2C

BAB è un classico **B2B2C**: il cliente pagante (B2B) è la **Società sportiva** / l'**allenatore**; l'utente finale (C) è l'**atleta** (spesso minore); il **genitore** è un terzo attore con diritti di tutela ma **non** di sorveglianza clinica. Architetturalmente questo significa **multi-tenancy** (ogni società è un tenant) con un confine privacy *interno* al tenant: il dato dell'atleta non è del tenant, è dell'atleta.

```
            ┌─────────────────────────────────────────────────────────────┐
            │                        ECOSISTEMA BAB                        │
            └─────────────────────────────────────────────────────────────┘

   ATLETA (minore)         GENITORE/TUTORE          COACH / SOCIETÀ (cliente B2B)
   ─────────────           ───────────────          ───────────────────────────
   App mobile              App/Web (tutela)         Coach Dashboard (web)
   React Native/Expo       view limitata            Vite+React (riuso landing)
        │                       │                        │
        │  dati salute          │  aggregati             │  aggregati di gruppo
        │  INDIVIDUALI          │  del/della figlio/a    │  🟢🟡🔴 (mai individuali)
        │  (privati)            │  (soglia k-anon)       │  (soglia k-anon)
        ▼                       ▼                        ▼
   ┌──────────────────────────────────────────────────────────────────────────┐
   │                          SUPABASE (backend)                               │
   │                                                                           │
   │  Auth (GoTrue)   Postgres + RLS   Edge Functions (Deno)   Storage         │
   │  ─ JWT/ruoli     ─ confine privacy ─ aggregazione         ─ media privati │
   │                    a livello DB      k-anon, notifiche                    │
   │                                                                           │
   │   ┌───────────────┐      pg_cron / pg_net      ┌──────────────────────┐   │
   │   │ tabelle RAW   │ ───── refresh ───────────► │ VISTE AGGREGATE      │   │
   │   │ (individuali) │   materialized view        │ (k-anon, anonime)    │   │
   │   │  RLS: owner   │                            │  RLS: ruolo coach    │   │
   │   └───────────────┘                            └──────────────────────┘   │
   └──────────────────────────────────────────────────────────────────────────┘
            │
            ▼
   Integrazioni: GA4/Pixel (gated), email (Resend/Postmark), push (Expo),
   pagamenti B2B (Stripe), error tracking (Sentry).
```

### 2.2 Scelte di piattaforma e razionale

| Componente | Scelta target | Razionale | Alternative considerate |
|---|---|---|---|
| **App atleta** | **React Native + Expo** (New Architecture, Hermes, EAS Build/Update) | Riuso competenze React/TS del team; OTA update via EAS; un'unica codebase iOS/Android; New Architecture è obbligatoria su RN 0.82+. | Flutter (nuovo linguaggio), nativo (doppio costo), PWA (notifiche/limiti iOS). |
| **Backend** | **Supabase** (Auth, Postgres, RLS, Edge Functions, Storage, pg_cron) | Già in uso per i lead; Postgres + RLS è il modo *giusto* per imporre il confine privacy a livello DB; Edge Functions per logica server. | Firebase (no SQL/RLS), backend custom (più costo/sicurezza da gestire). |
| **Coach Dashboard** | **Web Vite + React** (riuso dello stack landing) | Stesso stack, stessi token brand, stesso team; deploy Vercel. | App nativa coach (non necessaria). |
| **Multi-tenancy** | **Pool pattern** (tabelle condivise, `tenant_id` + RLS) | Densità di risorse alta, isolamento a livello DB engine via RLS; adatto a molti tenant simili (società). | Bridge (schema-per-tenant) e Silo (db-per-tenant): over-engineering per la scala iniziale. |
| **Tenant identification** | **`tenant_id` nel JWT** (claim) | Mainstream 2025; query tenant-scoped *per costruzione*, non per abitudine. | tenant in header (più fragile). |

### 2.3 Perché Supabase regge il vincolo privacy

Il punto cruciale: in Supabase la **Row Level Security di Postgres** viene valutata a ogni accesso alla tabella, come un `WHERE` implicito su ogni query, eseguito dal **database engine**, non dall'applicazione. Questo riduce drasticamente il rischio di "leak applicativo": anche se un bug nel client coach chiedesse i dati individuali, la policy RLS li bloccherebbe alla radice. È esattamente la garanzia che serve per *"il coach vede solo aggregati"*.

---

## 3. Modello dati e il confine privacy

### 3.1 Principio: due mondi separati da una membrana

```
   MONDO PRIVATO (individuale)          ║  MONDO CONDIVISO (aggregato/anonimo)
   ─────────────────────────────         ║  ─────────────────────────────────
   athletes, checkins, mood_logs,        ║  group_wellbeing_daily (vista mat.)
   health_metrics, journal_entries       ║  → solo 🟢🟡🔴 + conteggi ≥ k
   RLS: leggibile SOLO dall'atleta        ║  RLS: leggibile dai coach del tenant
   (e dal tutore, secondo policy)         ║  MAI righe individuali
                          ▲               ║               ▲
                          └──── refresh materialized view (k-anon) ────┘
```

La **membrana** è una vista aggregata calcolata server-side, con **soglia minima di k-anonimato**: nessun gruppo viene mostrato se contiene meno di *k* atlete (es. `k = 5`). Sotto soglia → "dati insufficienti", **non** il dato.

### 3.2 Tabelle principali (DDL indicativo)

```sql
-- ─────────────── TENANT & IDENTITÀ ───────────────
create table tenants (                       -- società sportiva
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'trial',
  created_at timestamptz not null default now()
);

create table profiles (                      -- 1:1 con auth.users
  id uuid primary key references auth.users(id) on delete cascade,
  tenant_id uuid not null references tenants(id),
  role text not null check (role in ('athlete','coach','parent','admin')),
  display_name text,
  birth_date date,                           -- per logica minori (§4.5)
  created_at timestamptz not null default now()
);

-- Relazioni: un coach segue gruppi; un genitore tutela atleti; un atleta sta in gruppi
create table groups (                         -- squadra / categoria
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  name text not null
);

create table memberships (                    -- atleta ∈ gruppo
  group_id uuid references groups(id),
  athlete_id uuid references profiles(id),
  primary key (group_id, athlete_id)
);

create table coach_groups (                   -- coach → gruppo
  coach_id uuid references profiles(id),
  group_id uuid references groups(id),
  primary key (coach_id, group_id)
);

create table guardianships (                  -- genitore → atleta (tutela)
  guardian_id uuid references profiles(id),
  athlete_id uuid references profiles(id),
  consent_signed_at timestamptz,              -- consenso parentale (§4.5)
  primary key (guardian_id, athlete_id)
);

-- ─────────────── MONDO PRIVATO (dati salute individuali) ───────────────
create table checkins (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references profiles(id) on delete cascade,
  tenant_id uuid not null references tenants(id),
  day date not null,
  mood smallint check (mood between 1 and 5),       -- umore
  energy smallint check (energy between 1 and 5),   -- energia
  load_rpe smallint check (load_rpe between 0 and 10), -- carico percepito
  note text,                                         -- libero (sensibile!)
  created_at timestamptz not null default now(),
  unique (athlete_id, day)
);

create table journal_entries (                -- diario privato (mai aggregato)
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);
```

### 3.3 La membrana: aggregazione con k-anonimato

L'aggregato che il coach vede è un **semaforo per gruppo/giorno**, calcolato da una **materialized view** con soglia. La logica:

```sql
-- Per ogni (gruppo, giorno): media benessere → 🟢🟡🔴, MA solo se n ≥ k
create materialized view group_wellbeing_daily as
with per_group as (
  select
    m.group_id,
    c.day,
    count(*)                          as n,           -- numerosità
    avg((c.mood + c.energy)::numeric) as score        -- proxy benessere
  from checkins c
  join memberships m on m.athlete_id = c.athlete_id
  group by m.group_id, c.day
)
select
  group_id,
  day,
  n,
  case
    when n < 5 then 'insufficient'                    -- ← SOGLIA k = 5
    when score >= 7.0 then 'green'                    -- 🟢
    when score >= 5.0 then 'amber'                    -- 🟡
    else 'red'                                        -- 🔴
  end as status
from per_group;

-- Niente score numerico esposto: la vista PUBBLICA per i coach espone solo lo stato
create view group_status_for_coach as
  select group_id, day, status
  from group_wellbeing_daily
  where status <> 'insufficient';     -- sotto soglia → riga assente
```

Refresh schedulato con **pg_cron** (estensione supportata sulla piattaforma Supabase), combinabile con **pg_net** per invocare Edge Functions:

```sql
select cron.schedule(
  'refresh-wellbeing',
  '*/15 * * * *',                                     -- ogni 15 minuti
  $$ refresh materialized view concurrently group_wellbeing_daily $$
);
```

> **Perché materialized view + soglia e non `GROUP BY` al volo?**
> 1. **Performance**: l'aggregato è pre-calcolato, le query coach sono banali.
> 2. **Privacy by construction**: il coach non interroga mai `checkins`. Non ha *nessuna* policy RLS che gli dia accesso alle righe individuali. Può leggere solo `group_status_for_coach`, dove le righe sotto soglia *non esistono*.
> 3. **k-anonimato**: ogni stato mostrato corrisponde ad almeno *k* atlete, quindi un valore non è riconducibile a una singola persona. La soglia *k* va tarata sulla sensibilità: per dati di salute, gruppi piccoli o condizioni rare alzano il rischio di re-identificazione, quindi `k` va scelto con margine e, se serve, le note libere (`note`, `journal_entries`) **non entrano mai** in alcun aggregato.

### 3.4 Riepilogo "chi vede cosa"

| Dato | Atleta | Genitore/Tutore | Coach/Società | Note |
|---|---|---|---|---|
| `checkins` (riga individuale) | ✅ (proprie) | ⚠️ solo del/la figlio/a, se consenso | ❌ mai | confine duro |
| `journal_entries` | ✅ (propri) | ❌ | ❌ | privatissimo |
| `group_status_for_coach` (🟢🟡🔴) | — | parziale (aggregato del/la figlio/a se ≥ k) | ✅ del proprio gruppo | sotto soglia → assente |
| Anagrafica gruppo | ✅ | ✅ | ✅ | non sensibile |

### 3.5 Flusso dati end-to-end (sequence ASCII)

Dal tap dell'atleta fino al semaforo del coach, il dato attraversa la membrana una volta sola:

```
 App atleta (Expo)        Supabase Postgres            pg_cron + MV            Coach Dashboard
 ────────────────         ─────────────────            ────────────           ────────────────
   tap "check-in"
        │  INSERT checkins (mood, energy, rpe, note)
        ├───────────────────────►  RLS: athlete_id = auth.uid()  ✓
        │                          riga scritta in checkins (PRIVATO)
        │                                   │
        │                                   │   ogni 15 min:
        │                                   │   REFRESH MATERIALIZED VIEW
        │                                   ▼
        │                          group_wellbeing_daily
        │                          (n per gruppo, score → 🟢🟡🔴,
        │                           n<k ⇒ 'insufficient')
        │                                   │
        │                                   ▼
        │                          group_status_for_coach (n≥k)
        │                                   │  SELECT status
        │                                   │  RLS: coach ∈ coach_groups del gruppo
        │                                   └──────────────────────────►  rendering 🟢🟡🔴
                                                                          (mai righe individuali)
```

Tre invarianti che il flusso garantisce:
1. **Scrittura solo del proprietario** — la `INSERT` passa solo se `athlete_id = auth.uid()`.
2. **Una sola direzione** — il dato individuale entra, non esce mai dall'altra parte; ciò che esce è già aggregato e soppresso sotto soglia.
3. **Nessun percorso di lettura coach → `checkins`** — l'assenza di policy è essa stessa la difesa.

### 3.6 Edge case del modello da gestire esplicitamente

| Edge case | Rischio | Trattamento |
|---|---|---|
| Atleta in **più gruppi** | Il suo check-in conta in N aggregati; con gruppi piccoli può ridurre il margine k | k calcolato per gruppo; soppressione indipendente per gruppo |
| **Gruppo che scende sotto k** (infortuni, fine stagione) | Uno stato prima visibile sparisce → il coach potrebbe inferire | Mostrare sempre "dati insufficienti", mai la storia del passaggio sotto soglia |
| **Atleta che cambia società** (tenant) | Dati storici e tenancy | I dati restano dell'atleta; la membership al vecchio gruppo si chiude, l'aggregato del nuovo tenant riparte |
| **Revoca consenso** del tutore | Lettura genitore deve cessare *subito* | `consent_signed_at = null` ⇒ la policy `guardian_reads_with_consent` smette di valutare vero |
| **Note libere** con contenuto identificante | Re-identificazione | Le note non entrano in nessun aggregato; visibili solo all'atleta |

---

## 4. Sicurezza: Auth, RLS, cifratura, segreti, minori

### 4.1 Auth

- **Supabase Auth (GoTrue)** con email/OTP o magic link; per i minori, l'onboarding passa dal **flusso di consenso del tutore** (§4.5).
- Il **ruolo** (`athlete | coach | parent | admin`) e il **`tenant_id`** vivono in `profiles` e vengono propagati come **custom claim nel JWT** (via Auth Hook), così la RLS può leggerli senza join costosi.
- Regola d'oro RLS (CVE-2025-48757 e mistakes comuni): **non** affidarsi solo a `auth.uid()`/`auth.jwt()` per escludere `anon`; specificare sempre il ruolo `authenticated` come `TO` della policy.

### 4.2 Row Level Security — esempi

```sql
alter table checkins enable row level security;

-- 1) L'atleta vede e scrive SOLO i propri check-in
create policy "athlete_owns_checkins"
on checkins for all
to authenticated
using  ( athlete_id = (select auth.uid()) )      -- ← (select auth.uid()): valutato 1 volta
with check ( athlete_id = (select auth.uid()) );

-- 2) Il genitore PUÒ leggere i check-in del figlio SOLO se tutela + consenso firmato
create policy "guardian_reads_with_consent"
on checkins for select
to authenticated
using (
  exists (
    select 1 from guardianships g
    where g.athlete_id = checkins.athlete_id
      and g.guardian_id = (select auth.uid())
      and g.consent_signed_at is not null
  )
);

-- 3) NESSUNA policy dà ai coach accesso a checkins → accesso negato by default.
--    I coach leggono solo la vista aggregata:
alter view group_status_for_coach set (security_invoker = on);
-- e una policy sulla materialized base / tabella di supporto limita al proprio gruppo:
create policy "coach_reads_own_groups"
on coach_groups for select
to authenticated
using ( coach_id = (select auth.uid()) );
```

Note di performance/sicurezza (best practice Supabase 2025):
- **Indicizzare** ogni colonna usata nelle policy (`athlete_id`, `tenant_id`, `coach_id`): su tabelle grandi un indice su `athlete_id` può dare >100x.
- Usare **`(select auth.uid())`** invece di `auth.uid()` nudo: Postgres lo valuta una volta sola (initPlan), non per riga.
- **Testare le policy dal client SDK**, non dal SQL Editor (che *bypassa* la RLS).
- Le **security definer functions** non vanno mai create in schemi esposti.

### 4.3 Cifratura

- **In transito**: TLS ovunque (Supabase + Vercel di default).
- **A riposo**: Postgres gestito cifrato a riposo. Per i campi più sensibili (note di diario, eventuali metriche cliniche) valutare **cifratura applicativa** (lato app, chiave non sul server) per i casi in cui nemmeno l'operatore DB debba leggere — trade-off: niente ricerca server-side su quei campi.
- **Storage**: media (eventuali) in bucket **privati** con policy di accesso firmate (signed URL a scadenza), mai pubblici.

### 4.4 Segreti / `.env`

- La landing usa solo `VITE_*` (esposte al client *by design*): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SUPABASE_LEADS_TABLE`, `VITE_GA_MEASUREMENT_ID`, `VITE_META_PIXEL_ID`. **La anon key è pubblica per definizione** — la sicurezza la fa la RLS, non il segreto.
- La **`service_role` key NON deve mai** finire in un bundle client: vive solo in Edge Functions / ambiente server (Vercel/Supabase secrets).
- `.env` fuori dal versionamento; segreti in **Vercel Environment Variables** e **Supabase Secrets**; rotazione documentata.

### 4.5 Minori — il vincolo legale che diventa requisito tecnico

BAB tratta dati di **minori** e dati di **salute** (categoria speciale GDPR). Conseguenze tecniche dirette dalle regole UE:

- **Base giuridica = consenso del tutore** quando l'utente è minore (GDPR Art. 8): soglia 16 anni, abbassabile dagli Stati membri fino a 13. → `guardianships.consent_signed_at` è un **gate tecnico**, non un flag cosmetico: senza consenso, niente trattamento.
- **Account minori privati di default** (stretta UE 2025): nessun profilo aperto, niente liste pubbliche, niente posizione automatica. → la nostra architettura "privato per default, aggregato per scelta" è *allineata*: il default è il mondo privato.
- **Niente dark pattern** (notifiche 24/7, autoplay, infinite scroll) attivi di default per i minori. → da rispettare nell'app Expo (push opt-in, niente loop coercitivi).
- **Age assurance** affidabile e difficile da aggirare (non basta "dichiara l'età"). → roadmap: integrare un meccanismo di verifica tutore robusto; tenere d'occhio l'EU Digital Identity Wallet (2026).
- **Linguaggio chiaro per minori**: privacy e UI in linguaggio comprensibile.

### 4.6 Backup, audit, incident

- **Backup**: PITR (point-in-time recovery) della piattaforma Supabase; test di restore periodico (un backup non testato non esiste).
- **Audit log**: tabella `audit_events` append-only (chi, cosa, quando) per accessi a dati sensibili e cambi di consenso; scrittura via trigger / Edge Function.
- **Least privilege**: ruoli applicativi minimi; `service_role` solo server-side.
- **Incident response**: runbook per data breach (notifica Garante/utenti nei termini GDPR), kill-switch analytics, rotazione chiavi.

---

## 5. Consenso & analytics

### 4.7 Tabella consensi e audit (DDL)

```sql
create table consents (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references profiles(id),   -- l'atleta
  granted_by uuid not null references profiles(id),    -- atleta maggiorenne o tutore
  scope text not null check (scope in ('analytics','marketing','health_processing')),
  policy_version text not null,                         -- versione informativa accettata
  granted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table audit_events (                            -- append-only
  id bigint generated always as identity primary key,
  actor_id uuid,
  action text not null,                                -- es. 'read_checkins','revoke_consent'
  target text,
  meta jsonb,
  at timestamptz not null default now()
);
-- nessuna policy UPDATE/DELETE su audit_events → immutabile per costruzione
```

### 4.8 Modello di minaccia (sintesi)

| Attaccante | Vettore | Difesa primaria |
|---|---|---|
| Coach curioso | usa il proprio client per chiedere dati individuali | RLS: nessuna policy su `checkins` per i coach |
| Coach con gruppo minuscolo | inferenza da aggregato | soglia k + soppressione |
| Sviluppatore distratto | query non tenant-scoped | RLS by default + `tenant_id` in JWT |
| Chiave trapelata | anon key nel bundle | la anon key è pubblica *by design*; nessun potere oltre le policy |
| Insider DB | lettura note di diario | cifratura applicativa opzionale sui campi più sensibili |
| Bot / scraping landing | INSERT massivi su `leads` | rate limit + (futuro) captcha invisibile; solo INSERT consentita |

---

## 5. Consenso & analytics

### 5.1 Com'è ora (landing)

Pattern **consent-first** già implementato: `consent.ts` salva `accepted|rejected`; `analytics.ts` resta no-op finché (a) non c'è consenso *e* (b) non ci sono ID reali in `.env`. Il `CookieBanner` raccoglie la scelta; gli eventi funnel (`trackEvent`) partono solo a valle.

```
   utente → CookieBanner → setConsent('accepted')
                                  │
                                  ▼
                       initAnalytics()  ──►  GA4 + Pixel caricati
                       (solo se ID reali in .env)
```

### 5.2 Come estenderlo al prodotto

| Oggi (landing) | Domani (prodotto) |
|---|---|
| Consenso cookie analytics in `localStorage` | **Consenso prodotto** (trattamento dati salute) **server-side**, versionato e con timestamp, in tabella `consents` + `guardianships.consent_signed_at` |
| Un solo livello (analytics on/off) | **Granularità**: analytics, marketing, funzionali; più consenso clinico separato |
| Gating client | Gating **client + RLS** (il consenso revocato deve *bloccare la lettura*, non solo nascondere la UI) |
| Nessuna prova storica | **Audit**: ogni grant/revoke registrato (chi, quando, versione informativa) |

Principio: in landing il consenso è UX; nel prodotto **il consenso è una condizione di accesso ai dati imposta dal database**.

---

## 6. Prestazioni & SEO

### 6.1 Bundle e caricamento

- **Code-splitting per rotta** (`React.lazy`) già attivo; Home eager per l'LCP.
- **Supabase SDK lazy**: scaricato solo al primo submit → bundle iniziale leggero.
- Analytics caricati **dopo consenso** → niente terze parti a bloccare il first paint.
- Asset immagini in `src/assets/` — verificare formati moderni (AVIF/WebP) e dimensioni responsive; `hero.png` è LCP candidate.

### 6.2 SEO

- **Prerender per-rotta** (§1.2): ogni URL ha `<title>`, description, OG, canonical reali da `it.json`.
- Da aggiungere/verificare in roadmap: `sitemap.xml`, `robots.txt`, `hreflang` per it/en/fr, dati strutturati (JSON-LD Organization/Product).

### 6.3 Accessibilità tecnica & mobile

- `RouteFallback` con `role="status"` + `aria-live="polite"` + `sr-only`: buon segnale.
- **`prefers-reduced-motion`**: framer-motion va condizionato (utenti sensibili / minori).
- **Scroll/mobile**: evitare animazioni pesanti su scroll; per liste lunghe nell'app Expo usare `FlatList`/`FlashList` con `keyExtractor`.
- Contrasto colore: rispettare le regole AA dei token brand (vedi `docs/brand/` e memoria color-system: testo bianco/AA).

---

## 7. Percorso di implementazione: landing → MVP → prodotto

```
 FASE 0 ──────► FASE 1 ──────► FASE 2 ──────► FASE 3 ──────► FASE 4
 LANDING        SCHEMA &        APP ATLETA      COACH          SCALA &
 (oggi)         AUTH            (Expo MVP)      DASHBOARD       INTEGRAZIONI
 ✔ in prod      backend         check-in        aggregati       pagamenti,
                privacy-first   privati         🟢🟡🔴          push, analytics
```

### Fase 0 — Landing (stato attuale, ✔)
Validazione mercato + lead capture. **Già fatto** (vedi task chiusi: infra Supabase, WaitlistModal con SITG reale, ClubLeadForm B2B, i18n, a11y/design, cleanup, verify build).

### Fase 1 — Fondazioni backend (privacy-first)
Milestone tecniche:
- [ ] Schema Postgres (§3) + **RLS su tutte le tabelle** + indici sulle colonne di policy.
- [ ] Auth con ruoli + `tenant_id` come custom claim JWT (Auth Hook).
- [ ] `guardianships` + flusso consenso tutore (gate tecnico).
- [ ] Materialized view `group_wellbeing_daily` + soglia k + pg_cron refresh.
- [ ] **Test RLS dal client SDK** (atleta non legge altri; coach non legge `checkins`; sotto-soglia assente).

### Fase 2 — App atleta (Expo MVP)
- [ ] Expo (New Architecture, Hermes) + React Navigation + EAS Build/Update.
- [ ] Login/onboarding minore con consenso tutore.
- [ ] Loop di check-in giornaliero (eredita la UX del Buddy/AppSimulator) → scrive in `checkins`.
- [ ] Diario privato; push **opt-in** (niente dark pattern).
- [ ] Offline-first leggero (coda di sync) per check-in in palestra.

### Fase 3 — Coach Dashboard (web)
- [ ] App Vite+React (riuso token/brand) che legge **solo** `group_status_for_coach`.
- [ ] Viste 🟢🟡🔴 per gruppo/giorno, con "dati insufficienti" sotto soglia.
- [ ] Vista genitore (tutela) con aggregati del/la figlio/a (≥ k) e, se consenso, accesso individuale.
- [ ] Sezione "Per le Società" già curata in landing → diventa onboarding self-serve.

### Fase 4 — Scala & integrazioni
- [ ] Pagamenti B2B (Stripe) per piani società.
- [ ] Email transazionali (Resend/Postmark), notifiche aggregate.
- [ ] Error tracking (Sentry), product analytics consent-aware.
- [ ] Hardening: audit log completo, PITR test, pen-test mirato su RLS.

---

## 8. DevOps / Deploy / Testing

### 8.1 Ambienti

| Ambiente | Frontend | Backend | Scopo |
|---|---|---|---|
| **dev** | Vite local | progetto Supabase `dev` | sviluppo, dati finti |
| **preview** | Vercel Preview (per PR) | Supabase `staging` | review per-PR |
| **prod** | Vercel Production | Supabase `prod` | utenti reali |

Regola: **mai** puntare un frontend di sviluppo al DB di produzione. Branch DB / progetti separati.

### 8.2 CI/CD

- **Vercel**: build su push (`npm run build` = `tsc -b && vite build`), preview per PR, prod su `main`.
- **GitHub Actions** (da cablare): `lint` + `tsc` + **Playwright** (già in devDeps) su PR.
- **Migrazioni DB**: versionate (Supabase CLI `supabase migration`), applicate in pipeline, mai a mano in prod.

### 8.3 Testing — piramide

```
        e2e (Playwright)        ← funnel lead, login, check-in, dashboard
      integration (RLS!)        ← test policy DAL CLIENT SDK (non SQL editor)
   unit (leads.ts, k-anon, ...) ← timeout/retry, soglia k, calcolo stato
```

Test **prioritari** perché load-bearing per privacy:
- RLS: atleta isolato; coach non raggiunge `checkins`; sotto-soglia → riga assente.
- Soglia k: un gruppo con `n < k` non produce mai uno stato.
- Consenso: revoca → lettura bloccata a livello DB.

### 8.4 Checklist deploy landing (oggi)
- [ ] `.env` di prod su Vercel (URL + anon key reali; ID GA/Pixel reali solo se si vuole tracciare).
- [ ] RLS su `leads`: **solo** `INSERT` per `anon`, nessun `SELECT`.
- [ ] Verifica che `/coach`, `/features`, … servano il file prerenderizzato (curl + `view-source`).
- [ ] `robots.txt` / sitemap / canonical sul dominio reale.

---

## 9. Rischi tecnici, debito e ADR

### 9.1 Rischi & debito

| # | Rischio / debito | Impatto | Mitigazione |
|---|---|---|---|
| R1 | **Leak del confine privacy** (coach → dato individuale) | Critico (legale + fiducia) | RLS by default, nessuna policy coach su `checkins`, test RLS in CI, soglia k. |
| R2 | Re-identificazione da gruppi piccoli / note libere | Alto | k-anon con `k` prudente; note **mai** aggregate; soppressione sotto soglia. |
| R3 | `service_role` key esposta lato client | Critico | Solo Edge Functions/server; scanner segreti in CI. |
| R4 | Prerender fatto a mano si rompe con contenuti dinamici | Medio | ADR-007: migrare a framework con prerender nativo se servono pagine data-driven. |
| R5 | Consenso minori solo UX | Alto | Consenso come gate DB (RLS), audit grant/revoke. |
| R6 | Routing manuale (History API) cresce male | Medio | Valutare React Router v7 quando le rotte si moltiplicano. |
| R7 | Nessuna CI test ancora | Medio | Cablare Actions: lint+tsc+Playwright. |
| R8 | Lock-in Supabase | Basso/Medio | È Postgres standard + Deno; portabilità ragionevole. |

### 9.2 ADR sintetiche

- **ADR-001 — Backend = Supabase.** *Status: Accepted.* Postgres+RLS è il modo per imporre il confine privacy a livello DB; già in uso per i lead. Conseguenza: dipendenza da Postgres/Deno (accettabile).
- **ADR-002 — Multi-tenancy Pool + `tenant_id` in JWT.** *Accepted.* Densità alta, isolamento via RLS; query tenant-scoped per costruzione. Rivedere se arrivano enterprise con requisiti di isolamento fisico.
- **ADR-003 — Confine privacy via materialized view + soglia k-anon.** *Accepted.* Il coach non interroga mai dati individuali; legge solo aggregati ≥ k. Trade-off: leggera latenza di refresh (15 min) accettabile.
- **ADR-004 — App atleta = React Native/Expo.** *Accepted.* Riuso React/TS, OTA via EAS, New Architecture/Hermes. Trade-off: limiti del mondo RN vs nativo puro.
- **ADR-005 — Consenso come condizione di accesso DB (non solo UI).** *Accepted.* Revoca consenso ⇒ RLS blocca lettura. Trade-off: più complessità nelle policy.
- **ADR-006 — Chiave anon pubblica + sicurezza in RLS.** *Accepted (già in prod).* `leads` con solo INSERT per `anon`. Trade-off: zero margine d'errore sulle policy.
- **ADR-007 — Prerender Vite fatto a mano (no framework SSR).** *Accepted per ora.* Zero dipendenze, ogni URL indicizzabile, no hydration mismatch (`createRoot`). Rivedere (→ React Router v7 / TanStack Start / Astro) quando servono pagine data-driven.
- **ADR-008 — Coach Dashboard riusa lo stack web della landing.** *Accepted.* Stesso team/token/brand; deploy Vercel.

---

## 10. Fonti

**Supabase / RLS / aggregazione**
- [Row Level Security — Supabase Docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [RLS Performance and Best Practices — Supabase Docs](https://supabase.com/docs/guides/troubleshooting/rls-performance-and-best-practices-Z5Jjwv)
- [Supabase RLS Best Practices: Production Patterns for Secure Multi-Tenant Apps — Makerkit](https://makerkit.dev/blog/tutorials/supabase-rls-best-practices)
- [Supabase Security Best Practices: RLS, API Keys & CVE-2025-48757 — VibeAppScanner](https://vibeappscanner.com/best-practices/supabase)
- [Supabase RLS: Common Mistakes, the (select auth.uid()) Trap & CVE-2025-48757](https://vibeappscanner.com/supabase-row-level-security)
- [Securing your API — Supabase Docs](https://supabase.com/docs/guides/api/securing-your-api)
- [Scheduling Edge Functions — Supabase Docs](https://supabase.com/docs/guides/functions/schedule-functions)
- [Supabase Cron — Schedule Recurring Jobs in Postgres](https://supabase.com/blog/supabase-cron)

**k-anonimato / privacy dati di salute aggregati**
- [Mastering data privacy: leveraging K-anonymity for robust health data sharing — Int. J. Information Security (Springer, 2024)](https://link.springer.com/article/10.1007/s10207-024-00838-8)
- [Protecting Privacy Using k-Anonymity — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC2528029/)
- [Anonymization for outputs of population health research via an online data center — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC7651952/)
- [K-Anonymity: Is It Still Enough for Enterprise Data Privacy? — Duality](https://dualitytech.com/blog/k-anonymity-explained/)

**Minori / GDPR**
- [Art. 8 GDPR — Conditions applicable to child's consent](https://gdpr-info.eu/art-8-gdpr/)
- [Safeguards for data about children — European Commission](https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/legal-grounds-processing-data/are-there-any-specific-safeguards-data-about-children_en)
- [EU Tightens Rules on Children's Data Protection in 2025 — GDPR Register](https://www.gdprregister.eu/news/eu-tightens-childrens-data-protection/)
- [EU Children's Data Privacy Rules for 2025 — 7 key changes — GDPR Register](https://www.gdprregister.eu/gdpr/eu-childrens-data-privacy-2025-7-changes/)

**Multi-tenancy B2B2C**
- [Architecting Multi-Tenant SaaS: Database Isolation Patterns — developers.dev](https://www.developers.dev/tech-talk/multi-tenant-database-architecture-a-guide-to-isolation-patterns-and-scaling-trade-offs.html)
- [The developer's guide to SaaS multi-tenant architecture — WorkOS](https://workos.com/blog/developers-guide-saas-multi-tenant-architecture)
- [Multi-tenant Architecture Design Patterns in SaaS (2025 Edition) — Zenn](https://zenn.dev/shineos/articles/saas-multi-tenant-architecture-2025?locale=en)

**React Native / Expo**
- [React Native's New Architecture — Expo Documentation](https://docs.expo.dev/guides/new-architecture/)
- [Expo for React Native in 2025: A Perspective — Hashrocket](https://hashrocket.com/blog/posts/expo-for-react-native-in-2025-a-perspective)
- [React Native Performance: Avoiding Re-renders in Expo Apps — Elaris](https://elaris.software/blog/react-native-performance-expo-2025/)
- [Expo app folder structure best practices — Expo](https://expo.dev/blog/expo-app-folder-structure-best-practices)

**Vite / prerender / SSG**
- [Server-Side Rendering (SSR) — Vite](https://vite.dev/guide/ssr)
- [Prerendering React components at build time for SSG — vitejs/vite Discussion #18130](https://github.com/vitejs/vite/discussions/18130)
- [React-based Static Site Generators in 2025 — Crystallize](https://crystallize.com/blog/react-static-site-generators)

---

*Fine documento. Questo è un living document: ogni ADR e ogni soglia (in primis `k`) va rivista quando cambiano scala, normativa o evidenze.*
