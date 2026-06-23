/**
 * @file LegalPage.tsx
 * @summary Pagina legale riutilizzabile (Privacy / Cookie / Termini) per BAB.
 * Variante accessibile "compromessi invisibili": testo dritto, alto
 * contrasto, niente skew/stroke — la leggibilità qui è prioritaria.
 */
import { useTranslation } from 'react-i18next';

type LegalKey = 'privacy' | 'cookie' | 'terms';

interface LegalPageProps {
 page: LegalKey;
}

interface Section {
 h: string;
 p: string;
}

export default function LegalPage({ page }: LegalPageProps) {
 const { t } = useTranslation();
 const sections = t(`legal.${page}.sections`, { returnObjects: true }) as unknown as Section[];

 return (
 <div className="w-full min-h-screen px-4 py-24 md:py-32 text-[#0F0F12]">
 <article className="max-w-2xl mx-auto w-full">

 <a
 href="/"
 className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-vividteal hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] mb-10"
 >
 <span aria-hidden="true">←</span> {t('legal.backHome')}
 </a>

 <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-5xl font-black mb-3 tracking-tight">
 {t(`legal.${page}.title`)}
 </h1>
 <p className="text-sm font-bold text-[#0F0F12]/70 mb-10">
 {t('legal.updatedLabel')} {t(`legal.${page}.updated`)}
 </p>

 <p className="font-['Space_Grotesk',_sans-serif] text-base leading-relaxed mb-10 border-l-[4px] border-black pl-5">
 {t(`legal.${page}.intro`)}
 </p>

 <div className="flex flex-col gap-8">
 {Array.isArray(sections) && sections.map((s, i) => (
 <section key={i}>
 <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-xl sm:text-2xl font-black mb-2 tracking-tight">
 {s.h}
 </h2>
 <p className="font-['Space_Grotesk',_sans-serif] text-base leading-relaxed whitespace-pre-line">
 {s.p}
 </p>
 </section>
 ))}
 </div>

 <p className="mt-12 pt-8 border-t-[3px] border-dashed border-black/30 font-['Space_Grotesk',_sans-serif] text-sm leading-relaxed text-[#0F0F12]/80">
 {t('legal.contact')}
 </p>

 </article>
 </div>
 );
}
