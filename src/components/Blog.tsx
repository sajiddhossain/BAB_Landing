/**
 * @file Blog.tsx
 * @summary Lista articoli del blog BAB. Legge il manifest generato al build
 * (src/generated/blog.json) e mostra le card nella lingua corrente,
 * con fallback all'italiano per gli articoli non ancora tradotti.
 * @author Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useTranslation } from 'react-i18next';
import blogData from '../generated/blog.json';
import SponsorSlot from './SponsorSlot';

export interface BlogPostData {
 slug: string;
 lang: string;
 title: string;
 date: string | null;
 author: string | null;
 excerpt: string;
 cover: string | null;
 /** Testo alternativo della copertina; se assente si ricade sul titolo. */
 coverAlt?: string;
 tags: string[];
 faq?: { q: string; a: string }[];
 readingMinutes: number;
 html: string;
}

export const BLOG_POSTS = (blogData as { posts: BlogPostData[] }).posts;

/** Un articolo per slug: preferisce la lingua corrente, altrimenti ripiega su IT. */
export function postsForLang(lang: string): BlogPostData[] {
 const bySlug = new Map<string, BlogPostData>();
 for (const p of BLOG_POSTS) {
 const cur = bySlug.get(p.slug);
 if (!cur || (p.lang === lang && cur.lang !== lang)) bySlug.set(p.slug, p);
 }
 return [...bySlug.values()].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export function formatDate(date: string | null, lang: string): string {
 if (!date) return '';
 try {
 return new Date(date).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' });
 } catch {
 return date;
 }
}

export default function Blog() {
 const { t, i18n } = useTranslation();
 const lang = (i18n.language || 'it').slice(0, 2);
 const posts = postsForLang(lang);

 return (
 <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
 <header className="mb-12 sm:mb-16">
 <span className="inline-block bg-[#EBE5FF] text-[#0F0F12] border-[3px] border-black px-4 py-1.5 font-black uppercase tracking-widest text-xs shadow-[4px_4px_0_0_#0F0F12] mb-6">
 {t('blog.kicker')}
 </span>
 <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-6xl font-black tracking-tight mb-4">
 {t('blog.title')}
 </h1>
 <p className="font-['Space_Grotesk',_sans-serif] text-lg sm:text-xl text-[#0F0F12]/75 max-w-2xl">
 {t('blog.subtitle')}
 </p>
 </header>

 {posts.length === 0 ? (
 <p className="font-bold text-[#0F0F12]/70 border-[3px] border-black bg-white p-6 shadow-[4px_4px_0_0_#0F0F12]">
 {t('blog.empty')}
 </p>
 ) : (
 <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
 {posts.map((p) => (
 <li key={p.slug}>
 <a
 href={`/blog/${p.slug}`}
 className="group flex flex-col h-full bg-white border-[3px] border-black shadow-[6px_6px_0_0_#0F0F12] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#0F0F12] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#0F0F12] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] transition-all"
 >
 {p.cover && (
 <img
 src={p.cover}
 alt={p.coverAlt || p.title}
 loading="lazy"
 className="w-full aspect-video object-cover border-b-[3px] border-black"
 />
 )}
 <div className="flex flex-col flex-1 p-5">
 <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wide text-[#0F0F12]/60 mb-3">
 <span>{formatDate(p.date, lang)}</span>
 <span aria-hidden="true">·</span>
 <span>{p.readingMinutes} {t('blog.reading')}</span>
 </div>
 <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black leading-tight mb-2 group-hover:text-vividteal transition-colors">
 {p.title}
 </h2>
 <p className="font-['Space_Grotesk',_sans-serif] text-sm text-[#0F0F12]/75 leading-relaxed flex-1">
 {p.excerpt}
 </p>
 {p.author && (
 <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#0F0F12]/60">
 {t('blog.by')} {p.author}
 </p>
 )}
 </div>
 </a>
 </li>
 ))}
 </ul>
 )}

 {/* Spazio sponsor #1 — gestito a mano (vedi SponsorSlot) */}
 <SponsorSlot className="mt-12 sm:mt-16" />
 </section>
 );
}
