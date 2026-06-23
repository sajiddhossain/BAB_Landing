/**
 * @file NotFound.tsx
 * @summary Pagina 404 in-brand: evita il "soft 404" (rotta sconosciuta che mostrava
 * la Home) dando all'utente un vicolo non cieco e un ritorno chiaro.
 * @author Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useTranslation } from 'react-i18next';

interface NotFoundProps {
 onNavigate?: (path: string) => void;
}

export default function NotFound({ onNavigate }: NotFoundProps) {
 const { t } = useTranslation();

 return (
 <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
 <span className="inline-block bg-black text-[#D2EC7C] px-4 py-1.5 border-[3px] border-black font-black uppercase tracking-widest text-xs sm:text-sm shadow-[4px_4px_0_0_#D2EC7C] mb-8">
 {t('notFound.code')}
 </span>

 <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-6xl font-black tracking-tighter mb-5 max-w-2xl">
 {t('notFound.title')}
 </h1>

 <p className="font-['Space_Grotesk',_sans-serif] font-bold text-base sm:text-lg leading-relaxed text-[#0F0F12]/80 max-w-md mb-10">
 {t('notFound.body')}
 </p>

 <a
 href="/"
 onClick={(e) => {
 if (onNavigate) {
 e.preventDefault();
 onNavigate('/');
 }
 }}
 className="inline-flex items-center bg-[#D2EC7C] text-[#0F0F12] border-[3px] border-black px-7 py-3 text-base font-black uppercase tracking-wide shadow-[6px_6px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-1 active:translate-x-1 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all skew-btn"
 >
 <span className="skew-btn-content">{t('notFound.cta')}</span>
 </a>
 </section>
 );
}
