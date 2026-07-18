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
      posts.push({
        slug,
        lang,
        title: data.title || slug,
        date: data.date ? new Date(data.date).toISOString().slice(0, 10) : null,
        updated: data.updated ? new Date(data.updated).toISOString().slice(0, 10) : null,
        author: data.author || null,
        excerpt: data.excerpt || '',
        cover: data.cover || null,
        coverAlt: data.coverAlt || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        // FAQ opzionali (per l'AEO/GEO): coppie q/a validate, mostrate in pagina
        // e pubblicate come dato strutturato FAQPage nel prerender.
        faq: Array.isArray(data.faq)
          ? data.faq.filter((x) => x && x.q && x.a).map((x) => ({ q: String(x.q), a: String(x.a) }))
          : [],
        words: content.trim().split(/\s+/).filter(Boolean).length,
        readingMinutes: readingMinutes(content),
        // Durata di lettura in ISO 8601 (BlogPosting.timeRequired) + fonti citate
        // estratte dalla sezione "Fonti"/"Sources" (BlogPosting.citation).
        timeRequired: `PT${readingMinutes(content)}M`,
        sources: extractSources(content),
        html: marked.parse(content),
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
// eslint-disable-next-line no-console
console.log(`✓ blog: ${posts.length} articoli → src/generated/blog.json`);
