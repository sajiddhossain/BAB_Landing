# Statistiche di visita senza cookie (Cloudflare Web Analytics)

Il codice è già pronto: `src/lib/analytics.ts` carica il beacon di Cloudflare solo quando
`VITE_CLOUDFLARE_ANALYTICS_TOKEN` contiene un token reale, e `LegalPage.tsx` aggiunge da solo la sezione
«Statistiche di visita» a privacy e cookie policy (IT/EN/FR, testi in `legal.{privacy,cookie}.webAnalytics`
dei locales). Senza token il sito resta esattamente com'è oggi.

## Perché questo strumento
- **Niente cookie e niente localStorage**: non serve il consenso e non cambia il banner.
- **Dati aggregati**: pagine viste, provenienza (Google, Discover, Instagram, newsletter…), dispositivo,
  paese, Core Web Vitals. Basta per capire quali articoli funzionano e per un media kit per gli sponsor.
- **Gestisce da solo la navigazione SPA** (cambio pagina senza ricaricare), che è come funziona il blog.
- Limite: niente eventi personalizzati (per esempio «iscrizione alla waitlist»). Se serviranno, è una
  decisione separata (GA4 con consenso è già predisposto e spento).

## Attivazione (5 minuti, da fare a mano)
1. Cloudflare → **Analytics & Logs → Web Analytics → Add a site** → hostname `www.babsport.com`.
   Scegli l'installazione con snippet JS (il sito è su Vercel, non dietro il proxy Cloudflare).
2. Copia il **token** che compare nello snippet (`"token": "…"`), solo la stringa esadecimale.
3. Vercel → progetto `bab-landing` → **Settings → Environment Variables** →
   `VITE_CLOUDFLARE_ANALYTICS_TOKEN` = token, ambiente **Production** (e Preview se vuoi dati di test).
4. **Redeploy** di `main` (le variabili `VITE_*` entrano nel bundle al build).
5. Verifica: apri il sito, DevTools → Network → deve comparire `beacon.min.js`; dopo qualche minuto le
   visite compaiono nella dashboard Cloudflare. `/privacy` e `/cookie` mostrano la nuova sezione.
6. Aggiorna la data `updated` di privacy e cookie policy nei tre locales (`legal.privacy.updated`,
   `legal.cookie.updated`) e `lastmod` di `/privacy` e `/cookie` in `STATIC_PAGES` (`vite.config.ts`).

## Prima di attivare
- Far rileggere a chi segue la parte legale la nuova sezione dell'informativa (base giuridica: legittimo
  interesse, art. 6.1.f; Cloudflare come responsabile del trattamento, trasferimenti coperti dal Data
  Privacy Framework UE-USA).
- **Da verificare**: l'informativa attuale dice che Supabase è nella regione di **Dublino**, mentre le note
  interne del progetto parlano di **Francoforte**. Va controllato nella dashboard Supabase e corretto dove
  sbagliato.

## Il dato che conta per Discover
Cloudflare mostra le visite, ma le apparizioni in Discover si leggono solo in **Google Search Console →
Rendimento → Discover** (la voce compare quando il sito supera una soglia minima di impressioni).
