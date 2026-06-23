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
  '/app': 'app',
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

      // --- Articoli del blog: una pagina statica per slug (canonica in IT) ---
      const blogPath = path.resolve('src/generated/blog.json')
      const blogUrls: string[] = []
      if (fs.existsSync(blogPath)) {
        type Post = { slug: string; lang: string; title: string; date: string | null; author: string | null; excerpt: string; cover: string | null }
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
          if (post.cover) {
            page = replaceAttr(page, /(<meta property="og:image" content=")[^"]*(")/, `${DOMAIN}${post.cover}`)
            page = replaceAttr(page, /(<meta name="twitter:image" content=")[^"]*(")/, `${DOMAIN}${post.cover}`)
          }
          page = page.replace(
            /<div id="root">\s*<\/div>/,
            `<div id="root"><h1>${esc(post.title)}</h1><p>${esc(post.excerpt)}</p></div>`,
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
            ...(post.author ? { author: { '@type': 'Person', name: post.author } } : {}),
            ...(post.cover ? { image: `${DOMAIN}${post.cover}` } : {}),
            inLanguage: 'it-IT',
            mainEntityOfPage: url,
            publisher: { '@type': 'Organization', name: 'BAB — Breaking All Barriers', url: `${DOMAIN}/` },
          }
          page = page.replace('</head>', `    ${[breadcrumb, blogPosting].map(ldScript).join('\n    ')}\n  </head>`)
          const outDir = path.join(dist, 'blog', post.slug)
          fs.mkdirSync(outDir, { recursive: true })
          fs.writeFileSync(path.join(outDir, 'index.html'), page)
          blogUrls.push(url)
        }
      }

      // --- Sitemap: inserisce le URL del blog (lista + articoli) prima di </urlset> ---
      const sitemapPath = path.join(dist, 'sitemap.xml')
      if (fs.existsSync(sitemapPath)) {
        let xml = fs.readFileSync(sitemapPath, 'utf8')
        const entries = [`${DOMAIN}/blog`, ...blogUrls]
          .filter((u) => !xml.includes(`<loc>${u}</loc>`))
          .map((u) => `  <url>\n    <loc>${u}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`)
          .join('\n')
        if (entries) xml = xml.replace('</urlset>', `${entries}\n</urlset>`)
        fs.writeFileSync(sitemapPath, xml)
      }

      // eslint-disable-next-line no-console
      console.log(`✓ prerender: ${Object.keys(PRERENDER_ROUTES).length} pagine + ${blogUrls.length} articoli blog`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderRoutes()],
})
