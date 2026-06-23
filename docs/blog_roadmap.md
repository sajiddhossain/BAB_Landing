# Blog BAB — Roadmap di architettura

> Stato: **PIANIFICATO** (non implementato). Il focus attuale è il go-live della landing.
> Questo documento fissa la direzione, così il blog si costruirà senza stravolgere l'architettura.

## Le 3 domande di partenza
- **Devo scrivere codice a ogni post?** No. Il sistema si scrive UNA volta; ogni articolo è solo contenuto.
- **Possono pubblicare i collaboratori non-tech?** Sì, tramite un editor (CMS), senza vedere il codice.
- **Come si organizza?** 3 strati: (1) dove vive il contenuto, (2) chi/come scrive, (3) come diventa pagina.

## Vincolo chiave: SEO = prerender statico
Il sito è prerenderizzato al build (`prerenderRoutes` in `vite.config.ts` genera un `dist/{rotta}/index.html`
per ogni rotta, con title/description/OG/canonical + JSON-LD). Per avere articoli ben indicizzati il blog
DEVE seguire lo stesso modello: **ogni articolo = una pagina statica generata al build**. Conseguenza:
**alla pubblicazione il sito si ri-genera da solo** (Vercel rebuild ~1-2 min via Deploy Hook). Non è
"scrivere codice", è il sistema che si ricostruisce. Per un blog è il trade-off giusto.

## Decisione: Opzione 1 (Markdown + CMS Git-based) — CONSIGLIATA

### Perché si integra meglio (a livello React/build)
| Aspetto | Opz.1 Markdown + Git-CMS | Opz.2 Supabase + admin |
|---|---|---|
| Riusa il pattern `prerenderRoutes` esistente | Sì, quasi 1:1 | In parte (serve comunque build-step) |
| Tocca Supabase | No (resta solo-lead) | Sì: tabella + RLS SELECT pubblica + Auth |
| Tocca la Home | No | No |
| Nuovo codice da costruire | plugin build markdown + 2 componenti | + UI admin + login + gestione ruoli |
| Contenuto versionato / a prova di errore | Sì (Git) | No (solo DB) |
| Editor per non-tech | Sì (Decap/Keystatic) | Sì (ma da costruire) |

**Conclusione:** l'Opzione 1 estende il modello statico già esistente e lascia Supabase intatto per i lead.
L'Opzione 2 aggiunge autenticazione + admin + nuove policy sul DB e **comunque** richiede un passo di build
per la SEO: più superficie, più rischio, nessun vantaggio reale per un blog editoriale.

### Come si innesta nel codice attuale (schema, non implementazione)
1. **Contenuto** — file Markdown con frontmatter in `content/blog/{it,en,fr}/*.md`
   (es. `title`, `slug`, `date`, `author`, `excerpt`, `cover`). IT obbligatorio, EN/FR opzionali per articolo.
2. **Build** — estendere `vite.config.ts` (o nuovo plugin gemello di `prerenderRoutes`): legge i `.md`
   con `gray-matter` + `marked`, e genera:
   - un manifest `src/generated/blog.json` (lista + HTML per articolo) importato dai componenti React;
   - per ogni articolo `dist/blog/{slug}/index.html` con JSON-LD `BlogPosting` + canonical + OG
     (stesso meccanismo di `breadcrumbLd`/`softwareAppLd` già presenti);
   - voci aggiuntive nel `sitemap.xml`.
3. **Routing** (`src/App.tsx`) — modifica minima:
   - aggiungere `/blog` a `knownPaths`;
   - il match oggi è esatto (`knownPaths.includes`): aggiungere il caso prefisso
     `currentPath.startsWith('/blog/')` per gli articoli → `<BlogPost slug=... />`;
   - due componenti lazy nuovi: `Blog` (lista) e `BlogPost` (articolo), sul modello di `LegalPage.tsx`
     (che già mappa sezioni `h/p` dai dati) — stile e a11y riusati.
4. **SEO testi** — aggiungere `seo.blog` nei locales + `'/blog': 'blog'` in `PRERENDER_ROUTES` e in
   `BREADCRUMB_LABEL` (stesso pattern delle altre rotte).
5. **Pubblicazione collaboratori** — CMS Git-based:
   - **Keystatic** (consigliato: React/TS, gira nel repo, nessun servizio esterno) oppure **Decap CMS**
     (richiede OAuth GitHub). I collaboratori scrivono in un editor web → commit del Markdown →
     Vercel ri-builda → l'articolo è online. Zero codice per post.

### Dipendenze nuove (al momento dell'implementazione)
`gray-matter`, `marked` (o `remark`), e il CMS scelto. Nessuna oggi.

## Multilingua
IT-first come il resto del sito: un articolo esiste se ha la versione IT; EN/FR opzionali per articolo.
Le pagine si generano solo per le lingue presenti, evitando contenuti vuoti.

## Cosa NON fare
- Non rendere il blog solo client-side (fetch a runtime): romperebbe il modello SEO statico del sito.
- Non spostare i lead o cambiare la RLS di Supabase per il blog.

## Quando partire
Dopo il go-live della landing (dominio, email, verifica Supabase). Stima realistica per l'MVP del blog
con Opzione 1: ~1-1.5 giornate di sviluppo (plugin build + 2 componenti + CMS + 1 articolo di prova).
