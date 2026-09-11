# BAB — Breaking All Barriers (landing + blog)

Sito di BAB: salute e performance delle giovani atlete (13-17 anni). Due pubblici, allenatori/società
(B2B) e famiglie/atlete (B2C). Voce: calda, diretta, basata su evidenze. Identità visiva scrapbook /
neobrutalista (bordi neri 3px, ombre offset, lime `#D2EC7C`, teal `#34BBC0`, fondo crema `#FAF9F6`).

- Stack: React + Vite + Tailwind, i18next (it/en/fr), Supabase solo per i lead, deploy Vercel da `main`.
- Il sito è **prerenderizzato al build**: ogni rotta diventa un `dist/{rotta}/index.html` con meta e
  JSON-LD. Nessun SSR a runtime.

## Comandi

```bash
npm run dev        # build del manifest blog + vite dev
npm run build      # build-blog.mjs → tsc → vite build (prerender + llms.txt + faq.txt + feed.xml)
npm run lint       # eslint (baseline noto: 8 errori pre-esistenti, non introdurne altri)
```

`npm run build` deve sempre passare prima di committare. Il prerender stampa i conteggi (pagine,
articoli, pagine-risposta, KB di `llms-full.txt`): sono la verifica rapida che nulla sia sparito.

## Struttura

| Dove | Cosa |
| --- | --- |
| `content/blog/{it,en}/*.md` | Gli articoli. Una coppia IT+EN per slug, stesso nome file. |
| `scripts/build-blog.mjs` | Legge i markdown → `src/generated/blog.json` (frontmatter + HTML + ancore). |
| `vite.config.ts` | Plugin di prerender: pagine statiche, JSON-LD, sitemap, llms.txt, faq.txt, feed.xml. |
| `scripts/sitemap.ts` | Come si scrive una sitemap: indice + sezioni, `xhtml:link`, `image:image`, intestazione firmata, foglio di stile. |
| `src/lib/signature.ts` | La firma dell'architettura: console del browser + intestazione dei file generati. |
| `src/data/glossary.ts` | Glossario bilingue, fonte unica per DefinedTerm e `/glossario` (il conteggio si legge dal file, non da qui). |
| `src/data/facts.ts` | Statistiche citabili, bilingui, con fonte e DOI → `/dati`. |
| `src/data/faqBab.ts` | 14 domande sul progetto (non sui contenuti) → `/faq`. |
| `src/lib/autolink.ts` | Collega i termini tecnici degli articoli al glossario. |
| `docs/media-credits.md` | Provenienza e licenza di ogni immagine. Obbligatorio per ogni cover nuova. |

`.claude/launch.json` e `docs/research/` non vanno mai committati.

## L'architettura AEO

Il principio che tiene insieme tutto: **ogni risposta ha un indirizzo**. Un answer engine non deve
citare "il sito" o "l'articolo", ma la riga esatta che risponde — e portarsi dietro la popolazione in
cui il dato è stato misurato.

### Le superfici citabili

| Superficie | URL | Quantità |
| --- | --- | --- |
| Risposta in breve (capsule) | in cima a ogni articolo | 24 × 2 lingue |
| FAQ degli articoli | `/blog/{slug}#faq-{domanda}` | ~212 per lingua |
| Definizioni | `/glossario#{chiave}` · `/en/glossario` | 44 × 2 |
| Statistiche | `/dati#{id}` · `/en/dati` | 56 × 2 |
| Domande sul progetto | `/faq#{id}` · `/en/faq` | 14 × 2 |
| Sezioni di articolo | `/blog/{slug}#{titolo-slugificato}` | tutti gli H2/H3 |
| Testo integrale per macchine | `/blog/{slug}.md`, `/llms.txt`, `/llms-full.txt`, `/faq.txt` | — |
| Scoperta | `/sitemap.xml` (indice) → `sitemap-pages`, `sitemap-blog-it`, `sitemap-blog-en`, `sitemap-answers`; `/feed.xml` (RSS) | — |

### Come si generano le ancore

`scripts/build-blog.mjs` slugifica titoli e domande e le rende univoche per pagina (`uniqueSlug`),
poi scrive gli `id` nell'HTML e l'indice `headings[]` nel manifest. Le FAQ ricevono `faq-{domanda}`.
Da lì:

- `BlogPost.tsx` rende sommario, capsule e FAQ con gli stessi `id` dell'HTML statico;
- il prerender inietta lo stesso contenuto in `#root` (visibile senza JS) e usa gli `id` per dare
  `@id`/`url` a ogni `Question` del `FAQPage`.

**Invariante da non rompere:** la classe `.answer-capsule` sta sul `<p>` del testo, non sul
contenitore, sia nel client sia nel prerender — `abstract` e i selettori `speakable` puntano lì. Se la
sposti, un assistente vocale legge anche l'etichetta "In breve".

### La sitemap

`scripts/sitemap.ts` genera **un indice più quattro sezioni**, tutte al build: non esiste più un
`public/sitemap.xml` scritto a mano che invecchia in silenzio.

| File | Cosa contiene | changefreq · priority |
| --- | --- | --- |
| `/sitemap.xml` | `sitemapindex`: l'unico file da dichiarare a robots.txt e a Search Console | — |
| `/sitemap-pages.xml` | rotte statiche + i due indici del blog | da `STATIC_PAGES` · weekly 0.9 per gli indici |
| `/sitemap-blog-it.xml` | articoli italiani, ordinati dal più recente | monthly · 0.7 |
| `/sitemap-blog-en.xml` | articoli inglesi sotto `/en` | monthly · 0.7 |
| `/sitemap-answers.xml` | glossario, FAQ e dati nelle due lingue | monthly · 0.8 |

Regole che reggono il file:

- `lastmod` è la data dell'ultima revisione **reale** (`updated`), mai la data del deploy. Le pagine
  statiche hanno la propria data dichiarata in `STATIC_PAGES` dentro `vite.config.ts`: se cambia il
  testo di una pagina, si cambia lì.
- Ogni URL bilingue porta `xhtml:link` per `it`, `en` e `x-default`, che punta all'italiano.
- Gli articoli portano la cover come `image:image`, con `image:caption` uguale all'`alt` della pagina.
- `<?xml-stylesheet?>` punta a `/sitemap.xsl`: aprendo la sitemap nel browser si vede una tabella
  invece dell'XML grezzo. È un miglioramento progressivo — Chrome sta rimuovendo XSLT, e quando
  accadrà i file torneranno a mostrarsi come XML valido.
- Le due estensioni (`xhtml`, `image`) fanno fallire la validazione contro l'XSD ufficiale 0.9, che
  non prevede elementi esterni: è atteso, ed è ciò che Google stesso documenta. Il controllo che
  conta è che i file siano ben formati (`xmllint --noout dist/sitemap*.xml`).

### Dati strutturati generati (vite.config.ts)

Per articolo: `BlogPosting` (con `abstract` = capsule, `citation` = fonti con DOI, `about`/`mentions` =
DefinedTerm localizzati, `encoding` = gemello markdown, `speakable`, `workTranslation`/`translationOfWork`),
`FAQPage` (ogni `Question` con il suo URL), `BreadcrumbList`.
Per pagina-risposta: `DefinedTermSet` (glossario), `ItemList` + `WebPage.citation` (dati), `FAQPage` (faq).
Site-wide in `index.html`: `Organization` (con `knowsAbout`), `WebSite`.

### Pubblicare un articolo nuovo

Frontmatter richiesto in **entrambe** le lingue, stesso `slug`:

```yaml
slug, title, date, updated, author, excerpt, answer, cover, coverAlt, tags[], faq[]
```

- `excerpt` invita alla lettura; `answer` **risponde**: 40-60 parole, il dato e la fonte dentro la
  frase, e il limite dichiarato lì (`campione adulto`, `report non peer-reviewed`). Sono cose diverse,
  non copiare l'una nell'altra.
- `tags` in italiano usa le chiavi del glossario dove esistono: è così che l'articolo dichiara le
  proprie entità `about`.
- La sezione `## Fonti` / `## Sources` è un elenco puntato; `build-blog.mjs` ne estrae i DOI come
  `ScholarlyArticle`. Preferire sempre il link DOI.
- Cover: solo immagini senza copyright (CC0/Pexels/pubblico dominio), provenienza in
  `docs/media-credits.md`, nessun minore identificabile. Le rendition rawpixel `image_1300` sono
  filigranate: usare `editor_1024`.
- Dopo aver scritto: aggiungere il termine nuovo a `src/data/glossary.ts` e la statistica-chiave a
  `src/data/facts.ts` se merita di essere citata da sola.

### Verificare i DOI (non saltarlo)

I DOI scritti a memoria sbagliano. Ogni voce di `facts.ts` va confrontata con la bibliografia
dell'articolo che la cita: cerca il cognome del primo autore fra le righe `- ` della sezione Fonti ed
estrai il DOI da lì. In una sessione questo controllo ha trovato 6 identificativi errati su 49.

## Guardrail sui claim di salute (non negoziabili)

Si parla di salute di adolescenti: i testi devono reggere davanti a un genitore informato.

- Ogni affermazione di salute, fisiologica o statistica ha una fonte peer-reviewed citata. Nessun
  numero senza fonte, mai.
- La popolazione viaggia insieme al numero. Se lo studio è su adulte, su maschi o su un campione
  clinico selezionato, va detto **nella stessa frase**, non in una nota.
- La ricerca grigia (report, sondaggi di settore) va etichettata come tale.
- Taglio prudente e non diagnostico: contenuto educativo, mai parere medico. Ogni articolo chiude con
  il disclaimer e con quando rivolgersi a un professionista.
- Claim ritirati da non reintrodurre: crittografia end-to-end, foto di celebrità o da Wikipedia,
  Techstars come acceleratore, endorsement inventati.
- **Eccezione**: le FAQ della home (`faqHome` nei locales) contengono «team medico» e «esperti
  clinici». È una scelta esplicita della founder, riconfermata ad agosto 2026 dopo che è stata
  riproposta due volte. Non riscriverle di iniziativa propria.

## Trappole note

- **Router SPA e ancore**: il click handler in `App.tsx` intercetta ogni `href` che inizia con `/`.
  Path e hash vanno separati (`href.split('#')`), altrimenti un link tipo `/blog/x#faq-y` diventa un
  path inesistente → 404. Lo scroll all'ancora aspetta che l'elemento compaia: il chunk di route è
  lazy, e all'arrivo diretto su un URL con hash il browser scrolla sull'HTML statico che React
  sostituisce un istante dopo.
- **Autolink**: `src/lib/autolink.ts` non deve mai inserire link dentro heading, link esistenti,
  `<code>` o la bibliografia. Solo termini tecnici, una occorrenza ciascuno, max 6 per articolo:
  linkare parole comuni («dolore», «sonno») produce rumore.
- **Rotte bilingui**: `/glossario`, `/faq`, `/dati` esistono anche sotto `/en`. Aggiungerne una
  richiede tre punti: `BILINGUAL_ROUTES` in `App.tsx`, il ciclo delle pagine-risposta in
  `vite.config.ts`, e le chiavi `seo.*` nei tre locales.
- **Dev server**: non avviabile dalle sessioni non presidiate (run schedulati). Per verificare un
  componente si può renderizzarlo lato server:
  `npx vite build --ssr file.tsx --outDir .ssr-tmp` e poi eseguirlo con node — la cartella di output
  deve stare dentro il progetto, altrimenti non risolve `react-dom`.
- **`updated`**: va cambiata solo quando il testo cambia davvero. È `dateModified` nei dati
  strutturati, e mentire lì è un segnale sprecato.

## Routine automatica

Un task schedulato (`bab-blog-content-seo`) pubblica e ottimizza contenuti da solo: ogni run produce
almeno 3 modifiche SEO + 3 AEO + 3 GEO e valuta se pubblicare un articolo nuovo. Ruota i bersagli
guardando `git log`. Identità commit: `sajiddhossain <bab.community.official@gmail.com>`, con trailer
`Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
