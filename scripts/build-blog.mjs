/**
 * @file      scripts/build-blog.mjs
 * @summary   Genera il manifest del blog leggendo i Markdown in content/blog/{lang}/*.md
 *            e producendo src/generated/blog.json (frontmatter + HTML + reading time).
 *            Gira come prebuild/predev: i componenti React importano il JSON, il plugin
 *            di prerender in vite.config.ts genera le pagine statiche da questo stesso file.
 *            gray-matter e marked restano dipendenze SOLO di build (mai nel bundle client).
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const OUT_DIR = path.join(ROOT, 'src', 'generated');
const OUT_FILE = path.join(OUT_DIR, 'blog.json');
const LANGS = ['it', 'en', 'fr'];

marked.setOptions({ mangle: false, headerIds: false });

const readingMinutes = (raw) => Math.max(1, Math.round(raw.trim().split(/\s+/).length / 200));

/**
 * Slug stabile e leggibile da un testo qualsiasi (titolo di sezione o domanda FAQ).
 * Serve a dare a ogni H2 e a ogni risposta un URL proprio: un answer engine che cita
 * BAB può puntare alla riga esatta (/blog/{slug}#{ancora}) invece che alla pagina
 * intera — è la differenza tra una citazione verificabile e un link generico.
 */
function slugifyText(text, max = 60) {
  const base = String(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // accenti
    .replace(/["“”'’«»]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (base.length <= max) return base;
  // taglia sull'ultimo trattino entro il limite, per non spezzare una parola
  const cut = base.slice(0, max);
  return cut.slice(0, cut.lastIndexOf('-') > 20 ? cut.lastIndexOf('-') : max).replace(/-+$/, '');
}

/** Rende univoco uno slug all'interno della stessa pagina (id-2, id-3, …). */
function uniqueSlug(candidate, seen) {
  let slug = candidate || 'sezione';
  let n = 2;
  while (seen.has(slug)) slug = `${candidate}-${n++}`;
  seen.add(slug);
  return slug;
}

const stripTags = (html) => html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").trim();

/**
 * Aggiunge un `id` ad ogni H2/H3 dell'HTML generato e restituisce l'indice dei titoli.
 * L'indice alimenta il sommario citabile in llms.txt e la pagina /faq.
 */
function anchorHeadings(html, seen) {
  const headings = [];
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, level, inner) => {
    const text = stripTags(inner);
    const id = uniqueSlug(slugifyText(text), seen);
    headings.push({ level: Number(level), text, id });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  return { html: out, headings };
}

/**
 * Estrae le fonti citate dalla sezione "## Fonti" / "## Sources" del Markdown:
 * per ogni voce di elenco restituisce { name, url } (l'URL preferito è il DOI).
 * Alimenta il dato strutturato `citation` (ScholarlyArticle) nel prerender — un
 * segnale E-E-A-T/GEO poco sfruttato ma prezioso per un blog basato su evidenze.
 */
function extractSources(content) {
  const lines = content.split('\n');
  const start = lines.findIndex((l) => /^#{2,3}\s+(fonti|sources|bibliografia|references)\b/i.test(l.trim()));
  if (start === -1) return [];
  const sources = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^#{1,6}\s/.test(line)) break; // fine sezione al primo heading successivo
    if (!/^\s*[-*]\s+/.test(line)) continue; // solo voci di elenco
    const urls = [...line.matchAll(/\((https?:\/\/[^)]+)\)/g)].map((m) => m[1]);
    if (!urls.length) continue;
    const url = urls.find((u) => /doi\.org|pubmed|pmc|ncbi/i.test(u)) || urls[0];
    const name = line
      .replace(/^\s*[-*]\s+/, '')
      .replace(/\[([^\]]+)\]\((?:https?:\/\/[^)]+)\)/g, '$1') // link → solo testo
      .replace(/\*\*([^*]+)\*\*/g, '$1') // grassetto
      .replace(/\*([^*]+)\*/g, '$1') // corsivo
      .replace(/\s+/g, ' ')
      .trim();
    if (name) sources.push({ name, url });
  }
  return sources;
}

function collect() {
  const posts = [];
  for (const lang of LANGS) {
    const dir = path.join(CONTENT_DIR, lang);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      const slug = data.slug || file.replace(/\.md$/, '');
      // Un solo registro di ancore per pagina: titoli e FAQ non possono collidere.
      const seenAnchors = new Set();
      const { html, headings } = anchorHeadings(marked.parse(content), seenAnchors);
      const faq = (Array.isArray(data.faq) ? data.faq : [])
        .filter((x) => x && x.q && x.a)
        .map((x) => ({
          q: String(x.q),
          a: String(x.a),
          // Ancora propria per ogni risposta: /blog/{slug}#faq-{domanda}
          id: uniqueSlug(`faq-${slugifyText(String(x.q), 56)}`, seenAnchors),
        }));
      posts.push({
        slug,
        lang,
        title: data.title || slug,
        // Titolo per il solo <title> quando quello editoriale supera i ~60
        // caratteri utili in SERP: H1, og:title e dati strutturati restano
        // sul titolo per esteso, dove lo spazio non è un problema.
        seoTitle: data.seoTitle || '',
        // Meta description dedicata quando la prima frase dell'excerpt supera i
        // ~160 caratteri e il taglio automatico chiuderebbe a metà pensiero.
        seoDescription: data.seoDescription || '',
        date: data.date ? new Date(data.date).toISOString().slice(0, 10) : null,
        updated: data.updated ? new Date(data.updated).toISOString().slice(0, 10) : null,
        author: data.author || null,
        excerpt: data.excerpt || '',
        // Risposta secca alla domanda del titolo, 40-60 parole: è il blocco che un
        // answer engine può citare da solo, e diventa `abstract` nei dati strutturati.
        answer: data.answer || '',
        cover: data.cover || null,
        coverAlt: data.coverAlt || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        // FAQ opzionali (per l'AEO/GEO): coppie q/a validate, mostrate in pagina con
        // un'ancora propria e pubblicate come FAQPage nel prerender, dove ogni
        // Question porta l'URL della sua ancora.
        faq,
        // Indice dei titoli con le rispettive ancore: sommario citabile per sezione.
        headings,
        words: content.trim().split(/\s+/).filter(Boolean).length,
        readingMinutes: readingMinutes(content),
        // Durata di lettura in ISO 8601 (BlogPosting.timeRequired) + fonti citate
        // estratte dalla sezione "Fonti"/"Sources" (BlogPosting.citation).
        timeRequired: `PT${readingMinutes(content)}M`,
        sources: extractSources(content),
        html,
      });
    }
  }
  // più recenti prima
  posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return posts;
}

const posts = collect();
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify({ posts }, null, 2) + '\n');

// --- Split per il client (CWV) ---
// blog.json intero serve solo al prerender (vite.config.ts lo legge da file):
// impacchettarlo nel bundle significava spedire ~1,5 MB di JS a ogni visita.
// Il client riceve tre cose separate:
//   1. blog-index.json  — i metadati di tutti gli articoli (lista, TOC, capsule);
//   2. posts/{lang}--{slug}.json — corpo html + faq del singolo articolo,
//      caricato on demand dalla pagina articolo;
//   3. blog-faq.json — solo domanda+ancora per la pagina /faq.
// `sources` resta fuori dal client: lo usa solo il prerender.
const POSTS_DIR = path.join(OUT_DIR, 'posts');
fs.rmSync(POSTS_DIR, { recursive: true, force: true });
fs.mkdirSync(POSTS_DIR, { recursive: true });
const index = [];
const faqIndex = [];
for (const post of posts) {
  const { html, sources, faq, ...meta } = post;
  index.push(meta);
  fs.writeFileSync(
    path.join(POSTS_DIR, `${post.lang}--${post.slug}.json`),
    JSON.stringify({ html, faq }) + '\n'
  );
  if (faq?.length) {
    faqIndex.push({
      slug: post.slug,
      lang: post.lang,
      title: post.title,
      date: post.date,
      questions: faq.map((f) => ({ q: f.q, id: f.id })),
    });
  }
}
fs.writeFileSync(path.join(OUT_DIR, 'blog-index.json'), JSON.stringify({ posts: index }, null, 2) + '\n');
fs.writeFileSync(path.join(OUT_DIR, 'blog-faq.json'), JSON.stringify({ posts: faqIndex }, null, 2) + '\n');
// eslint-disable-next-line no-console
console.log(`✓ blog: ${posts.length} articoli → src/generated/blog.json (+ index, faq, ${posts.length} corpi)`);
