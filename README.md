# BAB — Breaking All Barriers

> **The first support platform for teenage girls in sport.**
> _Reach your personal best, by feeling your best._

> ⚠️ **Work in progress.** This repository is the **pre-launch validation landing**
> for BAB — not the final product. Copy, design, data and features change often as
> we test messaging with real audiences. Nothing here is a finished or guaranteed
> feature of the eventual app.

---

## Mission

One in two girls drops out of sport during puberty. BAB exists to change that.

BAB is a health & wellbeing platform that helps **teenage female athletes** understand
and manage their changing bodies — during the years when the body is most
unpredictable and least talked about — so they can stay in sport and keep growing,
instead of dropping out. The athlete is never alone: BAB also gives her **support
system** (parents and coaches/clubs) the aggregated, privacy-respecting signals they
need to back her up without ever touching her private biological data.

This site exists to **validate that mission** with the people it's for, and to grow a
waitlist ahead of launch.

### Who it's for
- **Athletes** — the core audience (B2C): a playful, body-literate companion off the pitch.
- **Parents** — support, the way she actually needs it.
- **Clubs & coaches** — anonymous, aggregated team signals (energy, check-ins, mood) to
  support athletes — never individual biological data.

---

## Tech stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@theme` tokens) — Y2K-neobrutalist brand system
- **framer-motion** — animation
- **i18next** — trilingual, Italian-first (`it` / `en` / `fr`)
- **Supabase** — lead capture (EU region; client uses the public **anon** key, protected by Row-Level Security)
- Static **prerender** of routes + **Markdown blog** generated at build time

## Getting started

Requires **Node 20+** and npm.

```bash
npm install
cp .env.example .env        # fill in real values for full functionality (optional for UI work)
npm run dev                 # http://localhost:5173
```

The app runs without any env vars — Supabase and analytics simply stay disabled until
real keys are provided (the waitlist form reports `supabase_not_configured`).

### Environment variables

All config lives in `.env` (never committed — see `.env.example` for the full list).

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | Lead capture. The anon key is **safe in the client only with RLS** — see [`docs/supabase_setup.sql`](docs/supabase_setup.sql). |
| `VITE_SUPABASE_LEADS_TABLE` | Leads table name (defaults to `leads`). |
| `VITE_GA_MEASUREMENT_ID` / `VITE_META_PIXEL_ID` / `VITE_CLOUDFLARE_ANALYTICS_TOKEN` | Analytics — **off by default**, activate only with real IDs (GA/Meta require cookie consent). |

> 🔐 **Never** put the Supabase `service_role` key in this repo or the client bundle —
> it bypasses RLS. The client only ever uses the anon key.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (rebuilds the blog first) |
| `npm run build` | Type-check + production build + static prerender |
| `npm run preview` | Serve the production build locally |
| `npm run blog` | Regenerate `src/generated/blog.json` from `content/blog/**` |
| `npm run lint` | ESLint |

## Project structure

```
src/
  components/      UI sections (Home, Features, About, FAQ, WaitlistModal, …)
  lib/             supabase, leads, analytics, anti-spam, feature flags
  locales/         it / en / fr translation JSON (Italian-first)
  i18n.ts          i18next setup
content/blog/      Markdown posts (it/en/fr) → built into the app
docs/              Brand, strategy, market, legal & UX research
scripts/           Build helpers (blog generator, i18n utility)
public/            Static assets, icons, redirects, sitemap
.design-sync/      Inputs for the claude.ai/design design-system sync
```

## Internationalization

Italian is the source language; `en` and `fr` are kept in sync. Translation keys live
in `src/locales/*.json`. Content is brand-reviewed — some claims are deliberate founder
decisions (see `docs/`), so don't "soften" copy without checking.

## Design system

The branded components are synced to **claude.ai/design** so design work stays on-brand.
See [`.design-sync/conventions.md`](.design-sync/conventions.md) for the palette, the
component idiom, and how the system is wrapped.

## Privacy & data

- Lead data is stored in **Supabase (EU region)**, write-only from the client via RLS.
- Analytics are **disabled until configured**; cookie-based trackers require consent.
- No individual biological data is collected; coach/club views are aggregated & anonymous.
- See `docs/legal/` and `docs/strategia/` for the privacy-by-design approach.

---

© 2026 Breaking All Barriers. All rights reserved. This is proprietary source code —
not open source. Unauthorized use, modification, or distribution is prohibited.
