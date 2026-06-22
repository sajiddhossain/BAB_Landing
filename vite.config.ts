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
  '/coach': 'coach',
  '/features': 'features',
  '/app': 'app',
  '/about': 'about',
  '/privacy': 'privacy',
  '/cookie': 'cookie',
  '/termini': 'termini',
}

// Etichette brevi per il breadcrumb (il <title> SEO è troppo lungo come nodo)
const BREADCRUMB_LABEL: Record<string, string> = {
  '/coach': 'Per le Società',
  '/features': 'Funzionalità',
  '/app': "L'App",
  '/about': 'Chi siamo',
  '/privacy': 'Privacy Policy',
  '/cookie': 'Cookie Policy',
  '/termini': 'Termini e Condizioni',
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

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
        page = page.replace('</head>', `    ${routeLd.map(ldScript).join('\n    ')}\n  </head>`)

        const outDir = path.join(dist, route)
        fs.mkdirSync(outDir, { recursive: true })
        fs.writeFileSync(path.join(outDir, 'index.html'), page)
      }
      // eslint-disable-next-line no-console
      console.log(`✓ prerender: ${Object.keys(PRERENDER_ROUTES).length} pagine statiche generate`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderRoutes()],
})
