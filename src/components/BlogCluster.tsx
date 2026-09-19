/**
 * @file BlogCluster.tsx
 * @summary Pagina pilastro di un tema del blog (/blog/tema/{chiave}, /en/…). Non ha testo
 * proprio da mantenere: mette in fila ciò che esiste già — l'apertura del tema
 * (clusters.ts), la risposta in breve di ogni articolo, i numeri citabili
 * (facts.ts) e i termini del glossario — così la pagina cresce da sola a ogni
 * articolo nuovo e non può contraddire le fonti da cui pesca.
 * @author Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { blogPath } from '../lib/blogLocale';
import { CLUSTERS, clusterByKey, clusterName, clusterPath } from '../data/clusters';
import { FACTS } from '../data/facts';
import { GLOSSARY } from '../data/glossary';
import { BLOG_POSTS, postsForLang, type BlogPostData } from './Blog';
import NotFound from './NotFound';

interface BlogClusterProps {
 clusterKey: string;
 onNavigate?: (path: string) => void;
 /** Lingua imposta dall'URL (/blog/tema/… → it, /en/blog/tema/… → en). */
 lang?: string;
}

/** Quanti numeri mostrare: uno per articolo, i primi del tema. Oltre, c'è /dati. */
const MAX_FACTS = 6;

const focusRing =
 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]';

export default function BlogCluster({ clusterKey, onNavigate, lang: langProp }: BlogClusterProps) {
 const { t, i18n } = useTranslation();
 const lang = langProp ?? (i18n.language || 'it').slice(0, 2);
 const tt = langProp ? i18n.getFixedT(langProp) : t;
 const isEn = lang === 'en';
 const cluster = clusterByKey(clusterKey);

 // Come per gli articoli: in navigazione SPA nessun altro aggiornerebbe title e
 // description, e devono coincidere con quelli della pagina prerenderizzata.
 useEffect(() => {
 if (!cluster) return;
 document.title = `${isEn ? cluster.seoTitleEn : cluster.seoTitle} | BAB`;
 const meta = document.querySelector('meta[name="description"]');
 if (meta) meta.setAttribute('content', isEn ? cluster.seoDescriptionEn : cluster.seoDescription);
 }, [cluster, isEn]);

 if (!cluster) return <NotFound onNavigate={onNavigate} />;

 const bySlug = new Map(postsForLang(lang).map((p) => [p.slug, p]));
 const posts = cluster.slugs.map((s) => bySlug.get(s)).filter((p): p is BlogPostData => Boolean(p));

 // Un numero per articolo, nell'ordine di lettura del tema: la pagina hub dà il
 // colpo d'occhio, l'elenco completo resta su /dati.
 const facts = cluster.slugs
 .map((s) => FACTS.find((f) => f.article === s))
 .filter((f): f is (typeof FACTS)[number] => Boolean(f))
 .slice(0, MAX_FACTS);

 // I termini del tema sono i tag degli articoli che hanno una voce di glossario.
 // Si leggono dalla versione italiana anche su /en: è lì che i tag usano le chiavi
 // del glossario, e le chiavi non cambiano con la lingua.
 const terms = [
 ...new Set(
 BLOG_POSTS.filter((p) => p.lang === 'it' && cluster.slugs.includes(p.slug)).flatMap((p) => p.tags),
 ),
 ].filter((k) => k in GLOSSARY);

 const prefix = isEn ? '/en' : '';

 return (
 <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
 <a
 href={blogPath(lang)}
 className={`inline-flex items-center gap-2 font-bold uppercase text-xs tracking-wide text-vividteal hover:underline ${focusRing} mb-8`}
 >
 <span aria-hidden="true">←</span> {tt('blog.back')}
 </a>

 <header className="mb-10">
 <span className="inline-block bg-[#D2EC7C] text-[#0F0F12] border-[3px] border-black px-4 py-1.5 font-black uppercase tracking-widest text-xs shadow-[4px_4px_0_0_#0F0F12] mb-6">
 {isEn ? 'Topic' : 'Tema'} · {posts.length} {isEn ? 'articles' : 'articoli'}
 </span>
 <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-5">
 {clusterName(cluster, lang)}
 </h1>
 <p className="cluster-intro font-['Space_Grotesk',_sans-serif] text-lg leading-relaxed text-[#0F0F12]/85">
 {isEn ? cluster.introEn : cluster.intro}
 </p>
 </header>

 <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl sm:text-3xl font-black tracking-tight mb-6">
 {isEn ? 'The articles, in reading order' : "Gli articoli, nell'ordine di lettura"}
 </h2>
 <ol className="flex flex-col gap-5 list-none mb-14">
 {posts.map((p, i) => (
 <li key={p.slug}>
 <a
 href={blogPath(lang, p.slug)}
 className={`group block bg-white border-[3px] border-black p-5 shadow-[6px_6px_0_0_#0F0F12] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#0F0F12] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#0F0F12] transition-all ${focusRing}`}
 >
 <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wide text-[#0F0F12]/60 mb-2">
 <span>{String(i + 1).padStart(2, '0')}</span>
 {p.slug === cluster.startHere && (
 <span className="bg-[#D2EC7C] border-2 border-black px-2 py-0.5 text-[#0F0F12]">
 {isEn ? 'Start here' : 'Parti da qui'}
 </span>
 )}
 <span aria-hidden="true">·</span>
 <span>
 {p.readingMinutes} {tt('blog.reading')}
 </span>
 </div>
 <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black leading-tight mb-2 group-hover:text-vividteal transition-colors">
 {p.title}
 </h3>
 <p className="font-['Space_Grotesk',_sans-serif] text-[15px] text-[#0F0F12]/80 leading-relaxed">
 {p.answer || p.excerpt}
 </p>
 </a>
 </li>
 ))}
 </ol>

 {facts.length > 0 && (
 <>
 <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl sm:text-3xl font-black tracking-tight mb-6">
 {isEn ? 'The numbers, with their limits' : 'I numeri, con i loro limiti'}
 </h2>
 <ul className="flex flex-col gap-4 list-none mb-6">
 {facts.map((f) => (
 <li key={f.id} className="border-l-[6px] border-[#34BBC0] pl-4">
 <p className="font-['Space_Grotesk',_sans-serif] text-[15px] leading-relaxed text-[#0F0F12]/85">
 {isEn ? f.claimEn : f.claim}
 </p>
 <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#0F0F12]/60">
 {isEn ? 'Source' : 'Fonte'}:{' '}
 {f.doi ? (
 <a
 href={`https://doi.org/${f.doi}`}
 rel="nofollow noopener"
 className={`text-vividteal hover:underline ${focusRing}`}
 >
 {f.source}
 </a>
 ) : (
 f.source
 )}{' '}
 ·{' '}
 <a href={`${prefix}/dati#${f.id}`} className={`text-vividteal hover:underline ${focusRing}`}>
 {isEn ? 'permalink' : 'link al dato'}
 </a>
 </p>
 </li>
 ))}
 </ul>
 <p className="mb-14">
 <a
 href={`${prefix}/dati`}
 className={`font-bold uppercase text-xs tracking-wide text-vividteal hover:underline ${focusRing}`}
 >
 {isEn ? 'All the numbers →' : 'Tutti i numeri →'}
 </a>
 </p>
 </>
 )}

 {terms.length > 0 && (
 <>
 <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl sm:text-3xl font-black tracking-tight mb-5">
 {isEn ? 'The words of this topic' : 'Le parole di questo tema'}
 </h2>
 <ul className="flex flex-wrap gap-2.5 list-none mb-14">
 {terms.map((k) => (
 <li key={k}>
 <a
 href={`${prefix}/glossario#${k}`}
 className={`inline-block bg-white border-[3px] border-black px-3 py-1.5 font-bold text-sm shadow-[3px_3px_0_0_#0F0F12] hover:-translate-y-0.5 transition-transform ${focusRing}`}
 >
 {isEn ? GLOSSARY[k].nameEn : GLOSSARY[k].name}
 </a>
 </li>
 ))}
 </ul>
 </>
 )}

 <nav aria-labelledby="other-topics" className="border-t-[3px] border-black pt-8">
 <h2 id="other-topics" className="font-black uppercase text-xs tracking-widest mb-4">
 {isEn ? 'The other topics' : 'Gli altri temi'}
 </h2>
 <ul className="flex flex-wrap gap-3 list-none">
 {CLUSTERS.filter((c) => c.key !== cluster.key).map((c) => (
 <li key={c.key}>
 <a
 href={clusterPath(lang, c.key)}
 className={`inline-block bg-[#EBE5FF] border-[3px] border-black px-4 py-2 font-black uppercase tracking-widest text-xs shadow-[4px_4px_0_0_#0F0F12] hover:-translate-y-0.5 transition-transform ${focusRing}`}
 >
 {clusterName(c, lang)} →
 </a>
 </li>
 ))}
 </ul>
 </nav>
 </section>
 );
}
