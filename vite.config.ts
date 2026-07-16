/**
 * @file      vite.config.ts
 * @summary   Config Vite + plugin di prerender SEO per BAB: genera un index.html
 *            statico per ogni rotta (title/description/OG/canonical) e inietta i
 *            dati strutturati FAQPage nella homepage per i rich results di Google.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

const DOMAIN = 'https://www.babsport.com'

// Rotte da pre-renderizzare → chiave SEO nel locale IT
const PRERENDER_ROUTES: Record<string, string> = {
  '/features': 'features',
  // '/app' temporaneamente nascosta (APP_ENABLED=false): non pre-renderizzata.
  '/about': 'about',
  '/privacy': 'privacy',
  '/cookie': 'cookie',
  '/termini': 'termini',
  '/blog': 'blog',
}

// Etichette brevi per il breadcrumb (il <title> SEO è troppo lungo come nodo)
const BREADCRUMB_LABEL: Record<string, string> = {
  '/features': 'Funzionalità',
  '/app': "L'App",
  '/about': 'Chi siamo',
  '/privacy': 'Privacy Policy',
  '/cookie': 'Cookie Policy',
  '/termini': 'Termini e Condizioni',
  '/blog': 'Blog',
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// --- Glossario BAB (GEO): concetti-chiave come entità DefinedTerm, ancorati a
// voci enciclopediche (sameAs). Il set completo è pubblicato in home; ogni
// articolo referenzia i termini pertinenti via `about`, aiutando i motori
// generativi a collegare i contenuti a entità note (entity/answer grounding). ---
const GLOSSARY_ID = `${DOMAIN}/#glossario`
const GLOSSARY: Record<string, { name: string; description: string; sameAs?: string }> = {
  'red-s': {
    name: 'RED-S (Relative Energy Deficiency in Sport)',
    description:
      "Sindrome da bassa disponibilità di energia nello sport: quando l'apporto energetico non copre la spesa dell'allenamento, con effetti su ciclo, ossa, sistema immunitario e umore.",
    sameAs: 'https://en.wikipedia.org/wiki/Relative_energy_deficiency_in_sport',
  },
  ciclo: {
    name: 'Ciclo mestruale',
    description: 'Il ciclo ormonale femminile; nello sport giovanile è un segnale di salute da riconoscere, non un dato clinico da diagnosticare.',
    sameAs: 'https://it.wikipedia.org/wiki/Ciclo_mestruale',
  },
  'pubertà': {
    name: 'Pubertà',
    description: 'La fase di sviluppo in cui il corpo matura; finestra in cui emergono molti dei cambiamenti fisiologici rilevanti per le giovani atlete.',
    sameAs: 'https://it.wikipedia.org/wiki/Pubert%C3%A0',
  },
  dolore: {
    name: 'Dolore',
    description: "Esperienza sensoriale ed emotiva che durante la pubertà cambia nei suoi meccanismi; il dolore clinico tende ad aumentare in questa fascia d'età.",
    sameAs: 'https://it.wikipedia.org/wiki/Dolore',
  },
  amenorrea: {
    name: 'Amenorrea',
    description: "Assenza di mestruazioni; nello sport non è un effetto collaterale innocuo dell'allenamento ma un possibile segnale d'allarme.",
    sameAs: 'https://it.wikipedia.org/wiki/Amenorrea',
  },
  menarca: {
    name: 'Menarca',
    description: 'La prima mestruazione; il suo timing è associato a diversi esiti di salute in adolescenza e in età adulta.',
    sameAs: 'https://it.wikipedia.org/wiki/Menarca',
  },
  'drop-out': {
    name: 'Drop-out sportivo femminile',
    description:
      "L'abbandono dello sport in adolescenza: tra le ragazze tesserate a 10-14 anni il 71% smette senza mai rientrare (Eime et al., 2020). Non è un calo di motivazione, ma l'esito di un ambiente che smette di funzionare quando il corpo cambia.",
  },
  'reggiseno-sportivo': {
    name: 'Reggiseno sportivo',
    description:
      'Indumento di sostegno per il seno durante il movimento. Il tessuto mammario non ha muscoli propri che lo sostengano: a 13-14 anni il 51% delle ragazze dice che il seno influenza la partecipazione allo sport, ma solo il 10% ne indossa sempre uno (Scurr et al., 2016).',
    sameAs: 'https://it.wikipedia.org/wiki/Reggiseno_sportivo',
  },
  ferro: {
    name: 'Carenza di ferro',
    description:
      "Riserve di ferro insufficienti, misurate con la ferritina; può esserci anche senza anemia. Nelle atlete adolescenti la prevalenza di carenza lieve (ferritina ≤30 µg/L) è del 53% (Nicotra et al., 2023). Si accerta con un esame del sangue, non si presume.",
    sameAs: 'https://it.wikipedia.org/wiki/Carenza_di_ferro',
  },
  energia: {
    name: 'Disponibilità energetica',
    description:
      "L'energia che resta al corpo per le sue funzioni vitali dopo aver coperto la spesa dell'allenamento. Quando è troppo bassa il corpo riduce funzioni come ciclo mestruale, salute ossea e recupero: è il meccanismo alla base della RED-S.",
  },
}
const definedTerm = (key: string) => ({
  '@type': 'DefinedTerm',
  '@id': `${DOMAIN}/#term-${key}`,
  name: GLOSSARY[key].name,
  description: GLOSSARY[key].description,
  inDefinedTermSet: GLOSSARY_ID,
  ...(GLOSSARY[key].sameAs ? { sameAs: GLOSSARY[key].sameAs } : {}),
})

/** Legge larghezza/altezza da JPEG e PNG senza dipendenze (per ImageObject/OG). AVIF → null. */
function imageSize(absPath: string): { w: number; h: number; type: string } | null {
  try {
    const buf = fs.readFileSync(absPath)
    if (buf.length > 24 && buf.toString('ascii', 1, 4) === 'PNG')
      return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), type: 'image/png' }
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let o = 2
      while (o < buf.length - 8) {
        if (buf[o] !== 0xff) { o++; continue }
        const m = buf[o + 1]
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc)
          return { h: buf.readUInt16BE(o + 5), w: buf.readUInt16BE(o + 7), type: 'image/jpeg' }
        o += 2 + buf.readUInt16BE(o + 2)
      }
    }
  } catch { /* ignora: nessuna dimensione */ }
  return null
}

const ldScript = (obj: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(obj)}</script>`

/** Breadcrumb Home › Pagina: candidabile al rich result "briciole di pane" di Google. */
const breadcrumbLd = (route: string, label: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
    { '@type': 'ListItem', position: 2, name: label, item: `${DOMAIN}${route}` },
  ],
})

/** Scheda app gratuita (categoria salute) per la pagina /app. */
const softwareAppLd = (name: string, desc: string) => ({
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'BAB — Breaking All Barriers',
  alternateName: name,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'iOS, Android',
  description: desc,
  inLanguage: 'it-IT',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  publisher: { '@type': 'Organization', name: 'BAB — Breaking All Barriers', url: `${DOMAIN}/` },
})

/**
 * Genera un index.html statico per ogni rotta con <title>, meta description, OG,
 * canonical e un blocco di contenuto SEO dentro #root (React lo sostituisce al
 * mount; createRoot non fa hydration → nessun mismatch). Dà ai crawler una pagina
 * indicizzabile per ogni URL anche senza eseguire JS.
 */
function prerenderRoutes(): Plugin {
  return {
    name: 'bab-prerender-routes',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve('dist')
      const indexPath = path.join(dist, 'index.html')
      if (!fs.existsSync(indexPath)) return
      const baseHtml = fs.readFileSync(indexPath, 'utf8')
      const it = JSON.parse(fs.readFileSync(path.resolve('src/locales/it.json'), 'utf8'))
      const seo = it.seo

      // Schemi della home: WebSite (identità del sito) + FAQPage (dalle stesse Q&A
      // mostrate in pagina → candidabili ai rich result senza duplicare contenuto).
      const homeLd: unknown[] = [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'BAB — Breaking All Barriers',
          url: `${DOMAIN}/`,
          inLanguage: 'it-IT',
          publisher: { '@type': 'Organization', name: 'BAB — Breaking All Barriers', url: `${DOMAIN}/` },
        },
        // NB: l'entità Organization (con logo, sameAs, knowsAbout) è statica nel
        // template index.html → è site-wide su ogni pagina. Non la ripetiamo qui
        // per non creare un nodo duplicato dello stesso editore.
      ]
      const faqItems: Array<{ q: string; a: string }> = it.faqHome?.items ?? []
      if (faqItems.length) {
        homeLd.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        })
      }
      // Glossario dei concetti-chiave come DefinedTermSet (GEO): dà ai motori
      // generativi definizioni curate e ancorate a entità note, referenziate dai
      // singoli articoli via `about`.
      homeLd.push({
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        '@id': GLOSSARY_ID,
        name: 'Glossario BAB — salute e sviluppo delle giovani atlete',
        hasDefinedTerm: Object.keys(GLOSSARY).map(definedTerm),
      })

      const homeTags = homeLd.map(ldScript).join('\n    ')
      fs.writeFileSync(indexPath, baseHtml.replace('</head>', `    ${homeTags}\n  </head>`))

      const replaceAttr = (html: string, re: RegExp, value: string) =>
        re.test(html) ? html.replace(re, `$1${esc(value)}$2`) : html

      for (const [route, key] of Object.entries(PRERENDER_ROUTES)) {
        const s = seo[key]
        if (!s) continue
        let page = baseHtml
        page = page.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(s.title)}</title>`)
        page = replaceAttr(page, /(<meta name="description" content=")[^"]*(")/, s.desc)
        page = replaceAttr(page, /(<meta property="og:title" content=")[^"]*(")/, s.title)
        page = replaceAttr(page, /(<meta property="og:description" content=")[^"]*(")/, s.desc)
        page = replaceAttr(page, /(<meta property="og:url" content=")[^"]*(")/, `${DOMAIN}${route}`)
        page = replaceAttr(page, /(<meta name="twitter:title" content=")[^"]*(")/, s.title)
        page = replaceAttr(page, /(<meta name="twitter:description" content=")[^"]*(")/, s.desc)
        page = replaceAttr(page, /(<link rel="canonical" href=")[^"]*(")/, `${DOMAIN}${route}`)
        // Contenuto SEO dentro #root (sostituito da React al caricamento)
        page = page.replace(
          /<div id="root">\s*<\/div>/,
          `<div id="root"><h1>${esc(s.title)}</h1><p>${esc(s.desc)}</p></div>`,
        )

        // Dati strutturati per-rotta: breadcrumb sempre, scheda app solo su /app
        const routeLd: unknown[] = [breadcrumbLd(route, BREADCRUMB_LABEL[route] ?? s.title)]
        if (route === '/app') routeLd.push(softwareAppLd(s.title, s.desc))
        // FAQPage su /features dalle stesse Q&A in pagina (q1/a1…): candidabili
        // ai rich result e pescabili dalle risposte AI, senza duplicare contenuto.
        if (route === '/features') {
          const f: Record<string, string> = it.features?.faqs ?? {}
          const qa = [1, 2, 3].map((n) => ({ q: f[`q${n}`], a: f[`a${n}`] })).filter((x) => x.q && x.a)
          if (qa.length) {
            routeLd.push({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: qa.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            })
          }
        }
        page = page.replace('</head>', `    ${routeLd.map(ldScript).join('\n    ')}\n  </head>`)

        const outDir = path.join(dist, route)
        fs.mkdirSync(outDir, { recursive: true })
        fs.writeFileSync(path.join(outDir, 'index.html'), page)
      }

      // --- Articoli del blog: una pagina statica per slug (canonica in IT) ---
      const blogPath = path.resolve('src/generated/blog.json')
      const blogUrls: string[] = []
      const blogForLlms: Array<{ slug: string; title: string; excerpt: string; date: string | null; updated?: string | null; tags?: string[]; sources?: Array<{ name: string; url: string }>; faq?: Array<{ q: string; a: string }> }> = []
      const blogLastmod = new Map<string, string>()
      if (fs.existsSync(blogPath)) {
        type Post = { slug: string; lang: string; title: string; date: string | null; updated?: string | null; author: string | null; excerpt: string; cover: string | null; tags?: string[]; words?: number; timeRequired?: string; sources?: Array<{ name: string; url: string }>; faq?: Array<{ q: string; a: string }> }
        const allPosts: Post[] = JSON.parse(fs.readFileSync(blogPath, 'utf8')).posts ?? []
        const bySlug = new Map<string, Post>()
        for (const p of allPosts) {
          const cur = bySlug.get(p.slug)
          if (!cur || (p.lang === 'it' && cur.lang !== 'it')) bySlug.set(p.slug, p)
        }
        for (const post of bySlug.values()) {
          const url = `${DOMAIN}/blog/${post.slug}`
          let page = baseHtml
          page = page.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(post.title)} — BAB</title>`)
          page = replaceAttr(page, /(<meta name="description" content=")[^"]*(")/, post.excerpt)
          page = replaceAttr(page, /(<meta property="og:title" content=")[^"]*(")/, post.title)
          page = replaceAttr(page, /(<meta property="og:description" content=")[^"]*(")/, post.excerpt)
          page = replaceAttr(page, /(<meta property="og:url" content=")[^"]*(")/, url)
          page = replaceAttr(page, /(<meta property="og:type" content=")[^"]*(")/, 'article')
          page = replaceAttr(page, /(<meta name="twitter:title" content=")[^"]*(")/, post.title)
          page = replaceAttr(page, /(<meta name="twitter:description" content=")[^"]*(")/, post.excerpt)
          page = replaceAttr(page, /(<link rel="canonical" href=")[^"]*(")/, url)
          const coverDim = post.cover ? imageSize(path.join(path.resolve('public'), post.cover)) : null
          if (post.cover) {
            page = replaceAttr(page, /(<meta property="og:image" content=")[^"]*(")/, `${DOMAIN}${post.cover}`)
            page = replaceAttr(page, /(<meta name="twitter:image" content=")[^"]*(")/, `${DOMAIN}${post.cover}`)
            page = replaceAttr(page, /(<meta property="og:image:alt" content=")[^"]*(")/, post.title)
            page = replaceAttr(page, /(<meta name="twitter:image:alt" content=")[^"]*(")/, post.title)
            if (coverDim) {
              page = replaceAttr(page, /(<meta property="og:image:type" content=")[^"]*(")/, coverDim.type)
              page = replaceAttr(page, /(<meta property="og:image:width" content=")[^"]*(")/, String(coverDim.w))
              page = replaceAttr(page, /(<meta property="og:image:height" content=")[^"]*(")/, String(coverDim.h))
            }
          }
          // Meta OpenGraph specifiche degli articoli (article:*): non presenti nel
          // template base, quindi iniettate qui prima di </head>.
          const articleMeta = [
            post.date ? `<meta property="article:published_time" content="${post.date}" />` : '',
            post.updated || post.date ? `<meta property="article:modified_time" content="${post.updated || post.date}" />` : '',
            post.author ? `<meta property="article:author" content="${esc(post.author)}" />` : '',
            post.tags?.[0] ? `<meta property="article:section" content="${esc(post.tags[0])}" />` : '',
            ...(post.tags ?? []).map((t) => `<meta property="article:tag" content="${esc(t)}" />`),
          ].filter(Boolean).join('\n    ')
          if (articleMeta) page = page.replace('</head>', `    ${articleMeta}\n  </head>`)
          // Le FAQ finiscono anche nel contenuto statico di #root (React lo
          // sostituisce al mount): così sono visibili ai crawler senza JS e
          // combaciano con il dato strutturato FAQPage qui sotto.
          const faqHtml = (post.faq ?? [])
            .map((f) => `<h2>${esc(f.q)}</h2><p>${esc(f.a)}</p>`)
            .join('')
          page = page.replace(
            /<div id="root">\s*<\/div>/,
            `<div id="root"><h1>${esc(post.title)}</h1><p>${esc(post.excerpt)}</p>${faqHtml}</div>`,
          )
          const breadcrumb = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${DOMAIN}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: url },
            ],
          }
          const blogPosting = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            ...(post.date ? { datePublished: post.date } : {}),
            ...(post.updated || post.date ? { dateModified: post.updated || post.date } : {}),
            ...(post.author ? { author: { '@type': 'Person', name: post.author, url: `${DOMAIN}/about` } } : {}),
            ...(post.cover
              ? {
                  image: {
                    '@type': 'ImageObject',
                    url: `${DOMAIN}${post.cover}`,
                    ...(coverDim ? { width: coverDim.w, height: coverDim.h } : {}),
                  },
                }
              : {}),
            ...(post.tags?.length ? { keywords: post.tags.join(', '), articleSection: post.tags[0] } : {}),
            ...(post.words ? { wordCount: post.words } : {}),
            ...(post.timeRequired ? { timeRequired: post.timeRequired } : {}),
            isAccessibleForFree: true,
            inLanguage: 'it-IT',
            // Entità collegate (GEO): i concetti-chiave dell'articolo come DefinedTerm.
            ...(() => {
              const terms = (post.tags ?? []).filter((t) => GLOSSARY[t]).map(definedTerm)
              return terms.length ? { about: terms } : {}
            })(),
            // Citazioni scientifiche (E-E-A-T/GEO): le stesse fonti elencate in fondo
            // all'articolo, come dato strutturato ScholarlyArticle.
            ...(post.sources?.length
              ? { citation: post.sources.map((s) => ({ '@type': 'ScholarlyArticle', name: s.name, url: s.url, '@id': s.url })) }
              : {}),
            // Contenuto leggibile ad alta voce (AEO / voice assistant).
            speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            publisher: {
              '@type': 'Organization',
              name: 'BAB — Breaking All Barriers',
              url: `${DOMAIN}/`,
              // Google richiede il logo dell'editore per i rich result "Article".
              logo: { '@type': 'ImageObject', url: `${DOMAIN}/icon-512.png`, width: 512, height: 512 },
            },
          }
          const articleLd: unknown[] = [breadcrumb, blogPosting]
          // FAQPage dagli stessi Q&A mostrati in pagina: pescabile dalle risposte
          // AI (AEO/GEO) e candidabile ai rich result, senza duplicare contenuto.
          if (post.faq?.length) {
            articleLd.push({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faq.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            })
          }
          page = page.replace('</head>', `    ${articleLd.map(ldScript).join('\n    ')}\n  </head>`)
          const outDir = path.join(dist, 'blog', post.slug)
          fs.mkdirSync(outDir, { recursive: true })
          fs.writeFileSync(path.join(outDir, 'index.html'), page)
          blogUrls.push(url)
          blogForLlms.push({ slug: post.slug, title: post.title, excerpt: post.excerpt, date: post.date, updated: post.updated, tags: post.tags, sources: post.sources, faq: post.faq })
          // lastmod = data dell'ultima revisione reale (updated), non della prima
          // pubblicazione: è ciò che dice ai crawler che vale la pena ripassare.
          const lastmod = post.updated || post.date
          if (lastmod) blogLastmod.set(url, lastmod)
        }
      }

      // --- Sitemap: inserisce le URL del blog (lista + articoli) prima di </urlset> ---
      const sitemapPath = path.join(dist, 'sitemap.xml')
      if (fs.existsSync(sitemapPath)) {
        let xml = fs.readFileSync(sitemapPath, 'utf8')
        const latestBlog = [...blogLastmod.values()].sort().slice(-1)[0]
        const entries = [`${DOMAIN}/blog`, ...blogUrls]
          .filter((u) => !xml.includes(`<loc>${u}</loc>`))
          .map((u) => {
            const lm = u === `${DOMAIN}/blog` ? latestBlog : blogLastmod.get(u)
            const lmTag = lm ? `\n    <lastmod>${lm}</lastmod>` : ''
            return `  <url>\n    <loc>${u}</loc>${lmTag}\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`
          })
          .join('\n')
        if (entries) xml = xml.replace('</urlset>', `${entries}\n</urlset>`)
        fs.writeFileSync(sitemapPath, xml)
      }

      // --- llms.txt (GEO): guida per assistenti/answer engine, generata dal manifest ---
      // Convenzione llmstxt.org: titolo, sintesi, e link curati alle risorse chiave.
      const llms = [
        '# BAB — Breaking All Barriers',
        '',
        '> BAB è un ecosistema digitale per la salute e la crescita delle giovani atlete (13-17 anni). ' +
          "Aiuta le atlete a riconoscere in privato i segnali del proprio corpo — energia, umore, recupero, ciclo mestruale — " +
          'e fornisce alle società sportive solo segnali aggregati e anonimi, mai il dato di salute individuale.',
        '',
        '## Principi',
        '- I dati di salute individuali restano privati: le società vedono solo aggregati anonimi.',
        '- Approccio evidence-based: si monitora e si segnala, non si diagnostica; la fase del ciclo è una stima, non un dato clinico.',
        '- Pensato per minori: privacy-first, linguaggio non giudicante, nessun uso dei dati per addestrare modelli.',
        '',
        '## Politica editoriale (come leggere e citare questi contenuti)',
        '- Ogni affermazione di salute, fisiologica o statistica è ancorata a una fonte citata in fondo a ciascun articolo, preferibilmente con DOI.',
        "- Quando una fonte è stata condotta su adulti, l'articolo lo dichiara esplicitamente: i risultati su atlete adulte non vengono presentati come validi per ragazze di 13-14 anni.",
        "- La ricerca \"grigia\" (report non peer-reviewed) è etichettata come tale, e distinta dalla letteratura peer-reviewed.",
        '- I contenuti sono educativi e non costituiscono parere medico né strumento diagnostico.',
        '- Citazione consigliata: BAB — Breaking All Barriers, titolo dell\'articolo, ' + `${DOMAIN}/blog/{slug}.`,
        '',
        '## Blog (articoli con fonti)',
        ...blogForLlms.flatMap((p) => {
          const meta = [p.updated ? `aggiornato ${p.updated}` : p.date, ...(p.tags ?? [])].filter(Boolean).join(' · ')
          const lines = [`- [${p.title}](${DOMAIN}/blog/${p.slug})${meta ? ` — ${meta}` : ''}: ${p.excerpt}`]
          if (p.faq?.length) lines.push(`  Risponde a: ${p.faq.map((f) => f.q).join(' | ')}`)
          if (p.sources?.length) lines.push(`  Fonti: ${p.sources.map((s) => s.url).join(' · ')}`)
          return lines
        }),
        '',
        '## Definizioni',
        ...Object.keys(GLOSSARY).map((k) => `- ${GLOSSARY[k].name}: ${GLOSSARY[k].description}`),
        '',
        '## Pagine principali',
        `- [Blog](${DOMAIN}/blog)`,
        `- [Funzionalità](${DOMAIN}/features)`,
        `- [Chi siamo](${DOMAIN}/about)`,
        `- [Privacy](${DOMAIN}/privacy)`,
        '',
        `Sitemap: ${DOMAIN}/sitemap.xml`,
        '',
      ].join('\n')
      fs.writeFileSync(path.join(dist, 'llms.txt'), llms)

      // eslint-disable-next-line no-console
      console.log(`✓ prerender: ${Object.keys(PRERENDER_ROUTES).length} pagine + ${blogUrls.length} articoli blog + llms.txt`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderRoutes()],
  // Onora la porta fornita dall'ambiente (es. il preview con autoPort imposta PORT),
  // altrimenti usa 5173. strictPort:false => se occupata, passa alla successiva libera
  // invece di fallire.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    strictPort: false,
  },
})
