# BAB — Go-live (deploy)

Stack: **Vite 8 + React 19**. Build → cartella statica `dist/`. Nessun server: si pubblica come **sito statico**. Il push su `main` **non** pubblica da solo finché non colleghi un hosting alla repo.

> Tempo realistico: ~15 minuti per essere online.

---

## ⚙️ Variabili d'ambiente (OBBLIGATORIE)

Senza queste, waitlist e form società **non salvano i lead**. Vanno impostate nell'hosting (non nel repo: `.env` è gitignored).

| Variabile | Dove la trovi | Obbligatoria |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API (anon/public) | ✅ |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 (opzionale) | ⬜ |
| `VITE_META_PIXEL_ID` | Meta Pixel (opzionale) | ⬜ |

Build command: `npm run build` · Output: `dist` · Node: 20+.

---

## Opzione A — Vercel (consigliata, più semplice)

1. [vercel.com](https://vercel.com) → **Add New → Project** → importa la repo `BAB_Landing`.
2. Framework: **Vite** (rilevato in automatico; c'è già `vercel.json`).
3. **Environment Variables** → incolla `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
4. **Deploy.** Ottieni un URL `*.vercel.app`.
5. Ogni `git push` su `main` → **redeploy automatico**.

Da CLI (alternativa): `npm i -g vercel` → `vercel` → `vercel --prod`.

## Opzione B — Cloudflare Pages

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages** → connetti la repo.
2. Build command: `npm run build` · Output directory: `dist`.
3. **Settings → Environment variables** → `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
4. **Save and Deploy.**

---

## 🌐 Dominio

1. Compra il dominio (vedi nota: `babsports.com` risultava occupato → valuta `babsport.com` singolare o `babsports.it`). Consigliato **Cloudflare Registrar** (prezzo a costo, privacy WHOIS gratis) o Namecheap per il `.it`.
2. Hosting → **Domains/Custom domain** → aggiungi il dominio e segui le istruzioni DNS.
3. SSL è automatico (Vercel/Cloudflare).

---

## ✅ Checklist finale al go-live

- [ ] Env Supabase impostate sull'hosting → fai un test reale: invia la waitlist e **verifica la riga in Supabase**.
- [ ] Carica **`public/og-image.jpg`** (1200×630) per l'anteprima link social.
- [ ] Aggiorna il **dominio** in: `index.html` (commento `og:url`), `public/robots.txt`, `public/sitemap.xml`.
- [ ] Aggiungi un meta `<link rel="canonical">` con il dominio definitivo (in `index.html`).
- [ ] (Opzionale) Imposta `VITE_GA_MEASUREMENT_ID` / `VITE_META_PIXEL_ID` per attivare l'analytics.
- [ ] Condividi il link su WhatsApp/LinkedIn e controlla che l'anteprima (titolo + immagine) sia corretta.
