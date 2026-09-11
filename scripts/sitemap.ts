/**
 * @file      scripts/sitemap.ts
 * @summary   Generatore delle sitemap di BAB, conforme al protocollo 0.9
 *            (https://www.sitemaps.org/protocol.html) e alle due estensioni che
 *            usiamo davvero: `xhtml:link` per le alternative linguistiche e
 *            `image:image` per le cover degli articoli.
 *
 *            Perché un modulo a parte e non due righe dentro vite.config.ts:
 *            la sitemap è un documento pubblico che qualcuno leggerà (un
 *            crawler, un collega, noi tra un anno). Qui stanno le regole di
 *            formattazione — intestazione firmata, tabella di riepilogo,
 *            indentazione stabile — così il file generato è leggibile quanto
 *            uno scritto a mano, senza il rischio di uno scritto a mano.
 *
 *            Struttura prodotta:
 *              /sitemap.xml          indice (sitemapindex) → le quattro sezioni
 *              /sitemap-pages.xml    pagine del sito
 *              /sitemap-blog-it.xml  articoli in italiano
 *              /sitemap-blog-en.xml  articoli in inglese
 *              /sitemap-answers.xml  pagine-risposta (glossario, FAQ, dati)
 *              /sitemap.xsl          foglio di stile: rende leggibile l'XML
 *
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { SIGNATURE } from '../src/lib/signature'

/** Frequenze ammesse dal protocollo (sezione `<changefreq>`). */
export type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export type Alternate = { hreflang: string; href: string }

export type SitemapImage = {
  loc: string
  /** `image:title` — il titolo dell'articolo che la ospita. */
  title?: string
  /** `image:caption` — l'alt testuale della cover: la stessa frase, non un'altra. */
  caption?: string
}

export type SitemapEntry = {
  loc: string
  /** W3C Datetime. Usiamo la forma `YYYY-MM-DD`, che il protocollo ammette. */
  lastmod?: string
  changefreq?: ChangeFreq
  /** Stringa e non numero: `0.6` va scritto così com'è, senza sorprese di virgola mobile. */
  priority?: string
  alternates?: Alternate[]
  images?: SitemapImage[]
}

export type SitemapFile = {
  /** Nome file, es. `sitemap-blog-it.xml`. */
  file: string
  /** Titolo umano della sezione, usato nell'intestazione e nell'indice. */
  title: string
  /** Una riga: che cosa contiene questa sezione. */
  description: string
  entries: SitemapEntry[]
}

const XML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
}

/** Il protocollo chiede che ogni URL sia escapato: è il punto in cui quasi tutte le sitemap sbagliano. */
export const escXml = (s: string) => s.replace(/[&<>"']/g, (c) => XML_ESCAPES[c])

/**
 * Un commento XML non può contenere `--`: qualunque testo che finisce
 * nell'intestazione ci passa da qui prima.
 */
const safeComment = (s: string) => s.replace(/-{2,}/g, '–')

const BOX_LABEL = 14
const BOX_VALUE = 74

const pad = (s: string, n: number) => (s.length >= n ? s.slice(0, n) : s + ' '.repeat(n - s.length))

/** Manda a capo sulle parole, così nessun valore finisce tagliato a metà. */
const wrap = (text: string, width: number): string[] => {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    if (!line.length) line = w
    else if (line.length + 1 + w.length <= width) line += ` ${w}`
    else {
      lines.push(line)
      line = w
    }
  }
  if (line.length) lines.push(line)
  // Una parola più lunga della colonna (un URL) va spezzata comunque.
  return lines.flatMap((l) => (l.length <= width ? [l] : (l.match(new RegExp(`.{1,${width}}`, 'g')) ?? [l])))
}

/** Una tabella a due colonne in caratteri di disegno: leggibile anche in `view-source`. */
const table = (rows: Array<[string, string]>): string[] => {
  const top = `┌${'─'.repeat(BOX_LABEL + 2)}┬${'─'.repeat(BOX_VALUE + 2)}┐`
  const bottom = `└${'─'.repeat(BOX_LABEL + 2)}┴${'─'.repeat(BOX_VALUE + 2)}┘`
  const body = rows.flatMap(([k, v]) =>
    wrap(safeComment(v), BOX_VALUE).map(
      (chunk, i) => `│ ${pad(i === 0 ? safeComment(k) : '', BOX_LABEL)} │ ${pad(chunk, BOX_VALUE)} │`,
    ),
  )
  return [top, ...body, bottom]
}

const RULE = '═'.repeat(BOX_LABEL + BOX_VALUE + 5)

/** L'intestazione firmata, identica in tutti i file generati. */
const banner = (title: string, description: string, rows: Array<[string, string]>): string =>
  [
    '<!--',
    `  ${RULE}`,
    `   ${SIGNATURE}`,
    `  ${RULE}`,
    '',
    `   ${safeComment(title.toUpperCase())}`,
    `   ${safeComment(description)}`,
    '',
    ...table(rows).map((l) => `   ${l}`),
    '',
    '   Generato al build da vite.config.ts + scripts/sitemap.ts: non modificare a mano.',
    '-->',
  ].join('\n')

const tag = (name: string, value: string, indent = '    ') => `${indent}<${name}>${escXml(value)}</${name}>`

/** Un `<url>` completo. Ordine: loc, alternative, immagini, poi i tre campi opzionali del protocollo. */
const renderEntry = (e: SitemapEntry): string => {
  const lines = ['  <url>', tag('loc', e.loc)]
  for (const a of e.alternates ?? []) {
    lines.push(`    <xhtml:link rel="alternate" hreflang="${escXml(a.hreflang)}" href="${escXml(a.href)}" />`)
  }
  for (const img of e.images ?? []) {
    lines.push('    <image:image>')
    lines.push(tag('image:loc', img.loc, '      '))
    if (img.title) lines.push(tag('image:title', img.title, '      '))
    if (img.caption) lines.push(tag('image:caption', img.caption, '      '))
    lines.push('    </image:image>')
  }
  if (e.lastmod) lines.push(tag('lastmod', e.lastmod))
  if (e.changefreq) lines.push(tag('changefreq', e.changefreq))
  if (e.priority) lines.push(tag('priority', e.priority))
  lines.push('  </url>')
  return lines.join('\n')
}

const newest = (entries: SitemapEntry[]): string | undefined =>
  entries
    .map((e) => e.lastmod)
    .filter((d): d is string => Boolean(d))
    .sort()
    .slice(-1)[0]

/** La data più recente di una sezione: è il `lastmod` che la sezione espone nell'indice. */
export const sectionLastmod = (entries: SitemapEntry[]): string | undefined => newest(entries)

const freqSummary = (entries: SitemapEntry[]): string => {
  const counts = new Map<string, number>()
  for (const e of entries) {
    const k = `${e.changefreq ?? '—'} ${e.priority ?? '—'}`
    counts.set(k, (counts.get(k) ?? 0) + 1)
  }
  return [...counts.entries()].map(([k, n]) => `${n}× ${k}`).join(' · ')
}

/** Una sezione: `<urlset>` con le due estensioni dichiarate solo se servono davvero. */
export const renderUrlset = (sm: SitemapFile): string => {
  const withAlternates = sm.entries.filter((e) => (e.alternates?.length ?? 0) > 0).length
  const withImages = sm.entries.filter((e) => (e.images?.length ?? 0) > 0).length
  const ns = [
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ].join('\n')
  const last = newest(sm.entries)
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    banner(`Sitemap · ${sm.title}`, sm.description, [
      ['protocollo', 'sitemaps.org 0.9 · https://www.sitemaps.org/protocol.html'],
      ['URL', String(sm.entries.length)],
      ['lastmod', last ? `${last} (la più recente della sezione)` : 'non dichiarato'],
      ['freq · prio', freqSummary(sm.entries) || 'non dichiarati'],
      ['hreflang', withAlternates ? `xhtml:link su ${withAlternates} URL (it, en, x-default)` : 'non applicabile'],
      ['immagini', withImages ? `image:image su ${withImages} URL (cover degli articoli)` : 'non applicabile'],
      ['indice', 'https://www.babsport.com/sitemap.xml'],
    ]),
    ns,
    ...sm.entries.map(renderEntry),
    '</urlset>',
    '',
  ].join('\n')
}

/** L'indice: l'unico file che serve dichiarare in robots.txt e in Search Console. */
export const renderSitemapIndex = (domain: string, files: SitemapFile[]): string => {
  const rows: Array<[string, string]> = files.map((f) => [
    f.file.replace(/^sitemap-?/, '').replace(/\.xml$/, '') || 'indice',
    `${f.entries.length} URL · ${f.title}`,
  ])
  const total = files.reduce((n, f) => n + f.entries.length, 0)
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    banner(
      'Sitemap · indice',
      'Le quattro sezioni in cui è divisa la mappa del sito. Questo è l’unico file da dichiarare ai motori.',
      [
        ['protocollo', 'sitemaps.org 0.9 · sitemapindex'],
        ['sezioni', String(files.length)],
        ['URL totali', `${total} (limite del protocollo: 50.000 per file)`],
        ...rows,
        ['robots.txt', `${domain}/robots.txt`],
      ],
    ),
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...files.map((f) => {
      const last = newest(f.entries)
      return [
        '  <sitemap>',
        tag('loc', `${domain}/${f.file}`),
        ...(last ? [tag('lastmod', last)] : []),
        '  </sitemap>',
      ].join('\n')
    }),
    '</sitemapindex>',
    '',
  ].join('\n')
}

/**
 * Foglio di stile della sitemap: trasforma l'XML in una tabella leggibile quando
 * un essere umano apre l'URL nel browser. I crawler ignorano l'istruzione di
 * processo `xml-stylesheet`, quindi non cambia nulla per loro.
 *
 * Nota tecnica: Chrome ha annunciato la rimozione di XSLT dal motore; quando
 * accadrà, questi file torneranno a mostrarsi come XML grezzo — che resta
 * perfettamente valido. È un miglioramento progressivo, non una dipendenza.
 */
export const SITEMAP_XSL = `<?xml version="1.0" encoding="UTF-8"?>
<!--
   ${SIGNATURE}
   Foglio di stile delle sitemap BAB: serve solo agli occhi umani.
-->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat" />

  <xsl:template match="/">
    <html lang="it">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, follow" />
        <title>Sitemap · BAB — Breaking All Barriers</title>
        <style>
          :root { color-scheme: light; }
          * { box-sizing: border-box; }
          body { margin: 0; padding: 24px 16px 56px; background: #FAF9F6; color: #111;
                 font: 14px/1.5 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
          .wrap { max-width: 1120px; margin: 0 auto; }
          .card { background: #fff; border: 3px solid #111; box-shadow: 6px 6px 0 #111; padding: 20px 22px; margin-bottom: 24px; }
          h1 { margin: 0 0 6px; font-size: 26px; letter-spacing: -0.02em; }
          h2 { margin: 26px 0 10px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.08em; }
          .lede { margin: 0; max-width: 68ch; color: #333; }
          .pill { display: inline-block; border: 2px solid #111; background: #D2EC7C; padding: 2px 10px;
                  font-weight: 700; font-size: 12px; margin: 0 6px 6px 0; }
          .pill.teal { background: #34BBC0; }
          .scroll { overflow-x: auto; border: 3px solid #111; box-shadow: 6px 6px 0 #111; background: #fff; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; }
          th { background: #111; color: #FAF9F6; text-align: left; padding: 10px 12px; font-size: 11px;
               text-transform: uppercase; letter-spacing: 0.08em; white-space: nowrap; }
          td { padding: 9px 12px; border-top: 1px solid #d9d6cc; vertical-align: top; }
          tr:nth-child(even) td { background: #FBFBF8; }
          td.num { color: #777; text-align: right; width: 48px; font-variant-numeric: tabular-nums; }
          td.meta { white-space: nowrap; font-variant-numeric: tabular-nums; color: #333; }
          a { color: #111; text-decoration: underline; text-underline-offset: 2px; word-break: break-all; }
          a:hover { background: #D2EC7C; }
          code { background: #F1EFE7; border: 1px solid #d9d6cc; padding: 0 4px; font-size: 12px; }
          .lang { display: inline-block; border: 1px solid #111; padding: 0 5px; margin-right: 4px; font-size: 11px; background: #EAF6D6; }
          .legend { display: grid; gap: 6px 18px; grid-template-columns: 130px 1fr; max-width: 80ch; font-size: 13px; }
          .legend dt { font-weight: 700; }
          .legend dd { margin: 0; color: #333; }
          footer { margin-top: 28px; font-size: 12px; color: #444; }
          .sig { display: inline-block; border: 2px solid #111; background: #D2EC7C; padding: 4px 10px; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <xsl:apply-templates select="s:sitemapindex" />
          <xsl:apply-templates select="s:urlset" />
          <footer>
            <span class="sig">${escXml(SIGNATURE)}</span>
            <p>Formato: <a href="https://www.sitemaps.org/protocol.html">protocollo sitemaps.org 0.9</a>.
               Questa tabella è solo una presentazione: il file servito ai motori di ricerca è l'XML.</p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="s:sitemapindex">
    <div class="card">
      <h1>Sitemap di BAB — indice</h1>
      <p class="lede">La mappa del sito è divisa per tipo di contenuto. Ogni sezione dichiara la data
        dell'ultima modifica reale al suo interno: è il segnale che dice a un crawler dove vale la pena tornare.</p>
      <p style="margin:14px 0 0">
        <span class="pill"><xsl:value-of select="count(s:sitemap)" /> sezioni</span>
        <span class="pill teal">sitemapindex</span>
      </p>
    </div>
    <div class="scroll">
      <table>
        <tr><th>#</th><th>Sezione</th><th>Ultima modifica</th></tr>
        <xsl:for-each select="s:sitemap">
          <tr>
            <td class="num"><xsl:value-of select="position()" /></td>
            <td><a href="{s:loc}"><xsl:value-of select="s:loc" /></a></td>
            <td class="meta"><xsl:value-of select="s:lastmod" /></td>
          </tr>
        </xsl:for-each>
      </table>
    </div>
  </xsl:template>

  <xsl:template match="s:urlset">
    <div class="card">
      <h1>Sitemap di BAB</h1>
      <p class="lede">Ogni riga è una pagina che esiste come URL proprio, con la data della sua ultima
        revisione reale. Dove la pagina ha una gemella in un'altra lingua, le alternative sono dichiarate
        nella sitemap stessa con <code>xhtml:link</code>.</p>
      <p style="margin:14px 0 0">
        <span class="pill"><xsl:value-of select="count(s:url)" /> URL</span>
        <span class="pill teal"><xsl:value-of select="count(s:url/xhtml:link)" /> alternative hreflang</span>
        <span class="pill teal"><xsl:value-of select="count(s:url/image:image)" /> immagini</span>
        <span class="pill"><a href="/sitemap.xml">torna all'indice</a></span>
      </p>
    </div>
    <div class="scroll">
      <table>
        <tr>
          <th>#</th><th>URL</th><th>Ultima modifica</th><th>Frequenza</th><th>Priorità</th><th>Lingue</th>
        </tr>
        <xsl:for-each select="s:url">
          <tr>
            <td class="num"><xsl:value-of select="position()" /></td>
            <td>
              <a href="{s:loc}"><xsl:value-of select="s:loc" /></a>
              <xsl:if test="image:image">
                <div style="color:#555;font-size:12px;padding-top:3px">🖼 <xsl:value-of select="image:image/image:loc" /></div>
              </xsl:if>
            </td>
            <td class="meta"><xsl:value-of select="s:lastmod" /></td>
            <td class="meta"><xsl:value-of select="s:changefreq" /></td>
            <td class="meta"><xsl:value-of select="s:priority" /></td>
            <td>
              <xsl:for-each select="xhtml:link">
                <span class="lang"><xsl:value-of select="@hreflang" /></span>
              </xsl:for-each>
            </td>
          </tr>
        </xsl:for-each>
      </table>
    </div>
    <h2>Come leggere questa tabella</h2>
    <div class="card">
      <dl class="legend">
        <dt>Ultima modifica</dt>
        <dd><code>lastmod</code>: cambia solo quando cambia il testo, non a ogni deploy. Mentire qui
            fa perdere credibilità al segnale.</dd>
        <dt>Frequenza</dt>
        <dd><code>changefreq</code>: un suggerimento, non un impegno. Google lo ignora, altri crawler lo usano.</dd>
        <dt>Priorità</dt>
        <dd><code>priority</code>: importanza relativa dentro questo sito, da 0.0 a 1.0. Non influenza il ranking.</dd>
        <dt>Lingue</dt>
        <dd><code>xhtml:link</code>: le versioni linguistiche della stessa pagina, più <code>x-default</code>
            che indica quale servire a chi non corrisponde a nessuna lingua.</dd>
      </dl>
    </div>
  </xsl:template>
</xsl:stylesheet>
`
