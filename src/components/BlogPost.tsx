/**
 * @file BlogPost.tsx
 * @summary Pagina di un singolo articolo del blog. Riceve lo slug, trova l'articolo
 * nel manifest (lingua corrente con fallback IT) e renderizza l'HTML
 * pre-generato dal Markdown. Stile "calmo" e leggibile (zona di respiro).
 * @author Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { blogPath, localizeBlogLinks } from '../lib/blogLocale';
import { autolinkGlossary } from '../lib/autolink';
import { clusterName, clusterOf, clusterPath, relatedSlugs } from '../data/clusters';
import { BLOG_POSTS, formatDate, type BlogPostData, type BlogPostContent } from './Blog';
import NotFound from './NotFound';
import SponsorSlot from './SponsorSlot';

interface BlogPostProps {
 slug: string;
 onNavigate?: (path: string) => void;
 /** Lingua imposta dall'URL (/blog/… → it, /en/blog/… → en). Se assente, quella dell'utente. */
 lang?: string;
}

/**
 * Corpi degli articoli come chunk separati: il manifest nel bundle porta solo i
 * metadati, e l'HTML (+FAQ) del singolo articolo arriva quando serve. È il
 * taglio che ha tolto ~1,4 MB dal chunk del blog.
 */
const contentModules = import.meta.glob('../generated/posts/*.json');
const contentCache = new Map<string, BlogPostContent>();

function loadContent(lang: string, slug: string): Promise<BlogPostContent | null> {
 const key = `${lang}--${slug}`;
 const cached = contentCache.get(key);
 if (cached) return Promise.resolve(cached);
 const loader = contentModules[`../generated/posts/${key}.json`];
 if (!loader) return Promise.resolve(null);
 return loader().then((m) => {
 const content = (m as { default: BlogPostContent }).default;
 contentCache.set(key, content);
 return content;
 });
}

// All'arrivo diretto su /blog/{slug} il caricamento del corpo parte insieme
// alla valutazione di questo chunk, senza aspettare il primo render di React.
if (typeof window !== 'undefined') {
 const m = window.location.pathname.match(/^(\/en)?\/blog\/([^/#?]+)/);
 if (m && m[2]) void loadContent(m[1] ? 'en' : 'it', decodeURIComponent(m[2]));
}

function findPost(slug: string, lang: string): BlogPostData | undefined {
 return (
 BLOG_POSTS.find((p) => p.slug === slug && p.lang === lang) ||
 BLOG_POSTS.find((p) => p.slug === slug && p.lang === 'it') ||
 BLOG_POSTS.find((p) => p.slug === slug)
 );
}

export default function BlogPost({ slug, onNavigate, lang: langProp }: BlogPostProps) {
 const { t, i18n } = useTranslation();
 const lang = langProp ?? (i18n.language || 'it').slice(0, 2);
 // Come nella lista: se la lingua viene dall'URL, le etichette la seguono.
 const tt = langProp ? i18n.getFixedT(langProp) : t;
 const post = findPost(slug, lang);

 // Corpo dell'articolo: sincrono se già in cache (navigazioni successive),
 // altrimenti arriva con il chunk del singolo articolo.
 const contentKey = post ? `${post.lang}--${post.slug}` : null;
 const cachedContent = contentKey ? contentCache.get(contentKey) : undefined;
 const [loaded, setLoaded] = useState<{ key: string; content: BlogPostContent } | null>(null);
 useEffect(() => {
 if (!post || cachedContent) return;
 let alive = true;
 void loadContent(post.lang, post.slug).then((content) => {
 if (alive && content) setLoaded({ key: `${post.lang}--${post.slug}`, content });
 });
 return () => {
 alive = false;
 };
 }, [post, cachedContent]);
 const content = cachedContent ?? (loaded && loaded.key === contentKey ? loaded.content : null);

 // Title e meta description dell'articolo: la pagina statica li ha già corretti, ma
 // in navigazione SPA (da /blog a un articolo) nessuno li aggiornerebbe. Qui l'unica
 // fonte di verità è il manifest, così ciò che vede l'utente — e un crawler che
 // esegue JS — coincide sempre con l'HTML prerenderizzato.
 useEffect(() => {
 if (!post) return;
 document.title = `${post.title} — BAB`;
 const meta = document.querySelector('meta[name="description"]');
 if (meta) meta.setAttribute('content', post.excerpt);
 }, [post]);

 if (!post) return <NotFound onNavigate={onNavigate} />;

 // Il tema dell'articolo e i suoi vicini: stessa funzione (relatedSlugs) usata dal
 // prerender, così i link statici e quelli montati da React sono gli stessi.
 const cluster = clusterOf(post.slug);
 const related = relatedSlugs(post.slug)
 .map((s) => findPost(s, lang))
 .filter((p): p is BlogPostData => Boolean(p));

 return (
 <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
 <a
 href={blogPath(lang)}
 className="inline-flex items-center gap-2 font-bold uppercase text-xs tracking-wide text-vividteal hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] mb-8"
 >
 <span aria-hidden="true">←</span> {tt('blog.back')}
 </a>

 <header className="mb-8">
 {cluster && (
 <a
 href={clusterPath(lang, cluster.key)}
 className="inline-block bg-[#D2EC7C] text-[#0F0F12] border-[3px] border-black px-3 py-1 font-black uppercase tracking-widest text-[11px] shadow-[3px_3px_0_0_#0F0F12] hover:-translate-y-0.5 transition-transform focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] mb-4"
 >
 {clusterName(cluster, lang)}
 </a>
 )}
 <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wide text-[#0F0F12]/60 mb-4">
 <span>{formatDate(post.date, lang)}</span>
 <span aria-hidden="true">·</span>
 <span>{post.readingMinutes} {tt('blog.reading')}</span>
 </div>
 <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-4">
 {post.title}
 </h1>
 {post.author && (
 <p className="text-sm font-bold uppercase tracking-wide text-[#0F0F12]/60">
 {tt('blog.by')} {post.author}
 </p>
 )}
 </header>

 {post.cover && (
 <img
 src={post.cover}
 alt={post.coverAlt || post.title}
 className="w-full aspect-video object-cover border-[3px] border-black shadow-[6px_6px_0_0_#0F0F12] mb-10"
 />
 )}

 {/* Risposta in breve: due frasi che rispondono alla domanda del titolo, con il
 dato e la fonte. È il primo blocco di testo dopo il titolo — quello che un
 answer engine estrae quando deve rispondere in tre righe — ed è dichiarato
 come `abstract` nei dati strutturati e nei selettori Speakable. */}
 {post.answer && (
 // Trattamento leggero: una barra lime e un'etichetta, non una scatola. Sopra il
 // sommario — che è già riquadrato — due blocchi con bordo e ombra si sarebbero
 // fatti concorrenza, e la prima cosa che si legge dev'essere il testo.
 <div className="mb-8 border-l-[6px] border-[#D2EC7C] pl-4 sm:pl-5">
 <span className="block font-black uppercase text-[11px] tracking-widest text-[#0F0F12]/55 mb-1.5">
 {lang === 'en' ? 'In short' : 'In breve'}
 </span>
 <p className="answer-capsule text-[18px] leading-relaxed text-[#0F0F12]/90">{post.answer}</p>
 </div>
 )}

 {/* Sommario: le stesse ancore (#id) generate al build sui titoli dell'articolo.
 Serve al lettore per orientarsi e ai motori per capire — e citare — la sezione
 esatta che risponde a una domanda, invece della pagina intera. */}
 {post.headings && post.headings.filter((h) => h.level === 2).length >= 3 && (
 <nav
 className="blog-toc mb-10 border-[3px] border-black bg-white p-5 shadow-[6px_6px_0_0_#0F0F12]"
 aria-labelledby="toc-heading"
 >
 <h2 id="toc-heading" className="font-black uppercase text-xs tracking-widest mb-3">
 {lang === 'en' ? 'In this article' : 'In questo articolo'}
 </h2>
 <ol className="flex flex-col gap-1.5 list-none">
 {post.headings
 .filter((h) => h.level === 2)
 .map((h) => (
 <li key={h.id}>
 <a
 href={`#${h.id}`}
 className="text-[15px] text-vividteal font-bold hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
 >
 {h.text}
 </a>
 </li>
 ))}
 </ol>
 </nav>
 )}

 {content ? (
 <div
 className="blog-prose font-['Space_Grotesk',_sans-serif] text-[17px] leading-relaxed text-[#0F0F12]"
 dangerouslySetInnerHTML={{ __html: autolinkGlossary(localizeBlogLinks(content.html, lang), lang) }}
 />
 ) : (
 // Riserva lo spazio del corpo mentre il chunk dell'articolo arriva:
 // limita il layout shift e non cancella la pagina sotto i piedi al lettore.
 <div className="blog-prose min-h-[60vh]" aria-busy="true" />
 )}

 {content?.faq && content.faq.length > 0 && (
 // `blog-faq`: aggancio stabile per il selettore Speakable dichiarato nel JSON-LD (vite.config.ts).
 <section className="blog-faq mt-14 border-t-[3px] border-black pt-8" aria-labelledby="faq-heading">
 <h2
 id="faq-heading"
 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl sm:text-3xl font-black tracking-tight mb-6"
 >
 {lang === 'en' ? 'Frequently asked questions' : 'Domande frequenti'}
 </h2>
 <dl className="flex flex-col gap-6">
 {content.faq.map((f, i) => (
 // `id` = ancora della singola risposta: /blog/{slug}#faq-… è l'URL che un
 // answer engine può citare per QUESTA risposta, non per l'articolo intero.
 <div key={f.id ?? i} id={f.id}>
 <dt className="font-['Space_Grotesk',_sans-serif] font-bold text-[17px] text-[#0F0F12] mb-1.5 scroll-mt-24">
 {f.q}
 </dt>
 <dd className="font-['Space_Grotesk',_sans-serif] text-[#0F0F12]/80 leading-relaxed">
 {f.a}
 {f.id && (
 <a
 href={`#${f.id}`}
 aria-label={lang === 'en' ? 'Link to this answer' : 'Link a questa risposta'}
 className="ml-2 text-vividteal font-black no-underline hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
 >
 #
 </a>
 )}
 </dd>
 </div>
 ))}
 </dl>
 </section>
 )}

 {/* Nello stesso tema: i vicini dell'articolo nel suo cluster. È ciò che dà a ogni
 pezzo — anche all'ultimo pubblicato, che nessun vecchio articolo cita ancora —
 link in ingresso dai fratelli e un'uscita che non sia «torna alla lista». */}
 {cluster && related.length > 0 && (
 <nav className="blog-related mt-14 border-t-[3px] border-black pt-8" aria-labelledby="related-heading">
 <h2
 id="related-heading"
 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl sm:text-3xl font-black tracking-tight mb-6"
 >
 {lang === 'en' ? 'More on this topic' : 'Nello stesso tema'}
 </h2>
 <ul className="flex flex-col gap-4 list-none">
 {related.map((r) => (
 <li key={r.slug}>
 <a
 href={blogPath(lang, r.slug)}
 className="group block bg-white border-[3px] border-black p-4 shadow-[4px_4px_0_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#0F0F12] transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
 >
 <span className="block font-['Bricolage_Grotesque',_sans-serif] text-lg font-black leading-tight mb-1 group-hover:text-vividteal transition-colors">
 {r.title}
 </span>
 <span className="block font-['Space_Grotesk',_sans-serif] text-sm text-[#0F0F12]/75 leading-relaxed">
 {r.excerpt}
 </span>
 </a>
 </li>
 ))}
 </ul>
 <p className="mt-5">
 <a
 href={clusterPath(lang, cluster.key)}
 className="font-bold uppercase text-xs tracking-wide text-vividteal hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
 >
 {lang === 'en'
 ? `All ${cluster.slugs.length} articles on ${clusterName(cluster, lang).toLowerCase()} →`
 : `Tutti i ${cluster.slugs.length} articoli su ${clusterName(cluster, lang).toLowerCase()} →`}
 </a>
 </p>
 </nav>
 )}

 {/* Spazio sponsor #2 — in fondo all'articolo, gestito a mano */}
 <SponsorSlot className="mt-12" />
 </article>
 );
}
