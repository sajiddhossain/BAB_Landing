import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import FAQ from './FAQ';
import Doodle from './Doodle';
import { trackEvent } from '../lib/analytics';
import type { UserType } from '../lib/leads';

// Palette "voci ritrovate": spettro caldo per le affermazioni post-BAB (foto 3).
const BAB_MARK = ['#D4F46A', '#8FD4E8', '#FF8FB1', '#B8A9E8', '#D4F46A', '#FFC042', '#FF8FB1'];

interface HomeProps {
  onOpenWaitlist?: (target?: UserType) => void;
}

export default function Home({ onOpenWaitlist }: HomeProps) {
  const { t } = useTranslation();
  const [heroTarget, setHeroTarget] = useState<'allenatore' | 'genitore'>('allenatore');

  // CTA dinamica: l'allenatore va al percorso B2B "Per le Società", il genitore alla waitlist.
  const handleHeroCta = () => {
    if (heroTarget === 'allenatore') {
      trackEvent('hero_cta', { target: 'allenatore', dest: 'coach' });
      window.location.hash = '#/coach';
    } else {
      trackEvent('hero_cta', { target: 'genitore', dest: 'waitlist' });
      onOpenWaitlist?.('genitore');
    }
  };

  const selectTarget = (target: 'allenatore' | 'genitore') => {
    setHeroTarget(target);
    trackEvent('target_switch', { target });
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
  };

  const testimonials = [
    { name: 'Lisa Gutfleisch', role: t('testimonials.lisa.role'), quote: t('testimonials.lisa.quote') },
    { name: 'Alisha Menon', role: t('testimonials.alisha.role'), quote: t('testimonials.alisha.quote') },
    { name: 'Vasundhara P.', role: t('testimonials.vasundhara.role'), quote: t('testimonials.vasundhara.quote') },
    { name: 'Erica Sali', role: t('testimonials.erica.role'), quote: t('testimonials.erica.quote') },
  ];

  const oldVoices = t('home.silenceOldVoices', { returnObjects: true }) as unknown as string[];
  const babVoices = t('home.silenceBabVoices', { returnObjects: true }) as unknown as string[];

  return (
    <div className="flex flex-col items-center w-full min-h-screen text-[#0F0F12]">
      
      {/* 1. HERO SECTION */}
      <section className="w-full min-h-[100dvh] max-w-6xl mx-auto px-4 py-24 md:py-32 flex items-center justify-center relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* COLONNA SINISTRA (Span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full"
          >
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative inline-block px-4 py-1 bg-[#EBE5FF] border-[2px] md:border-[3px] border-black font-['Space_Grotesk',_sans-serif] text-[#0F0F12] font-black text-[10px] sm:text-xs tracking-widest uppercase mb-4 sm:mb-6 shadow-[4px_4px_0_0_#0F0F12]"
            >
              <div className="duct-tape duct-tape-black -top-2 -left-4 rotate-[-8deg] w-12 h-4"></div>
              <span className="relative z-10">{t('home.badge')}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="font-['Bricolage_Grotesque',_sans-serif] text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tighter w-full relative text-[#0F0F12]"
            >
              {t('home.heroTitle')}<br/>
              <span className="inline-block relative z-10 mt-3 px-4 sm:px-6 py-2 bg-[#143F36] border-[3px] md:border-[4px] border-black shadow-[4px_4px_0_0_#0F0F12] md:shadow-[6px_6px_0_0_#0F0F12] text-white skew-btn">
                 <span className="skew-btn-content font-['Bricolage_Grotesque',_sans-serif] italic font-black pr-2 tracking-wide">{t('home.heroHighlight')}</span>
              </span>
              
              {/* Hand-drawn Doodle Arrow (Desktop) */}
              <svg className="hidden lg:block absolute right-0 -bottom-8 w-16 h-16 text-[#FFDE4D] drop-shadow-[3px_3px_0_#0F0F12] rotate-12 opacity-90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10 Q 50 50 90 90 M 60 90 L 90 90 L 90 60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.h1>

            {/* PARAGRAFO INTRO (messaggio unico, sopra il toggle) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-['Space_Grotesk',_sans-serif] font-bold text-base sm:text-lg leading-relaxed text-[#0F0F12]/90 max-w-xl mb-8 text-center lg:text-left"
            >
              {t('home.heroBody')}
            </motion.p>

            {/* IMMAGINE MOBILE (Nascosta su Desktop) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full flex justify-center mb-8 lg:hidden"
            >
              <div className="w-full max-w-[280px] sm:max-w-[320px] bg-white border-[4px] border-black p-2 shadow-[8px_8px_0_0_#FFDE4D] skew-x-[-4deg] relative crosshairs">
                <div className="duct-tape duct-tape-black -top-4 right-2 rotate-[12deg] w-16 h-6 z-20"></div>
                <img 
                  src="/fotobab/HY2jAVYB5JU8HdxplxBzkh8TQo.avif" 
                  alt="BAB Atlete" 
                  className="w-full max-h-[250px] aspect-[4/5] sm:aspect-auto object-cover border-[3px] border-black grayscale skew-x-[4deg]"
                />
              </div>
            </motion.div>

            {/* SWITCH INTERATTIVO */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-lg mb-6 bg-white border-[3px] border-black shadow-[6px_6px_0_0_#0F0F12] p-1 flex flex-col sm:flex-row gap-2 sm:gap-0 text-[#0F0F12]"
            >
               <button
                 onClick={() => selectTarget('allenatore')}
                 aria-pressed={heroTarget === 'allenatore'}
                 className={`w-full sm:flex-1 py-3 sm:py-2 px-4 font-['Space_Grotesk',_sans-serif] text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-[2px] border-transparent hover:-skew-x-6 origin-bottom-left focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${heroTarget ==='allenatore' ? 'bg-[#FFDE4D] border-black shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.1)]' : 'hover:bg-neutral-100 hover:text-[#C2410C]'}`}
               >
                 {t('home.coachBtn')}
               </button>
               <button
                 onClick={() => selectTarget('genitore')}
                 aria-pressed={heroTarget === 'genitore'}
                 className={`w-full sm:flex-1 py-3 sm:py-2 px-4 font-['Space_Grotesk',_sans-serif] text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-[2px] border-transparent hover:-skew-x-6 origin-bottom-left focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${heroTarget ==='genitore' ? 'bg-[#FFDE4D] border-black shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.1)] text-[#0F0F12]' : 'hover:bg-neutral-100 hover:text-[#C2410C]'}`}
               >
                 {t('home.parentBtn')}
               </button>
            </motion.div>

            {/* SOTTO-TESTO DINAMICO */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="min-h-[4rem] flex items-center mb-8"
            >
               <p className="font-['Space_Grotesk',_sans-serif] text-sm sm:text-base md:text-lg font-bold border-l-[4px] border-black pl-4 text-left leading-snug text-[#0F0F12]">
                 {heroTarget === 'allenatore' && t('home.coachDesc')}
                 {heroTarget === 'genitore' && t('home.parentDesc')}
               </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto text-[#0F0F12]"
            >
              <button
                onClick={handleHeroCta}
                className="group flex items-center justify-center w-full sm:w-auto font-['Bricolage_Grotesque',_sans-serif] italic font-black text-xl sm:text-2xl bg-[#FFDE4D] border-[3px] md:border-[4px] border-black px-10 py-4 shadow-[6px_6px_0_0_#0F0F12] active:scale-[0.98] active:shadow-none active:translate-y-[6px] active:translate-x-[6px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all duration-300 uppercase skew-btn"
              >
                <span className="skew-btn-content">{heroTarget === 'allenatore' ? t('home.ctaCoach') : t('home.ctaParent')}</span>
              </button>
              <div
                className="font-['Space_Grotesk',_sans-serif] font-bold text-[10px] sm:text-xs bg-[#EBE5FF] border-[2px] md:border-[3px] border-black px-3 md:px-4 py-2 shadow-[4px_4px_0_0_#0F0F12] cursor-default text-center skew-btn leading-tight"
              >
                 <span className="skew-btn-content" dangerouslySetInnerHTML={{__html: t('home.appTag').replace('\n', '<br/>')}} />
              </div>
            </motion.div>
          </motion.div>

          {/* COLONNA DESTRA (Span 5 - Solo Desktop) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="lg:col-span-5 w-full justify-center hidden lg:flex relative text-[#0F0F12]"
          >
            <div className="w-full max-w-md bg-white border-[4px] border-black p-2 shadow-[12px_12px_0_0_#FFDE4D] skew-x-[4deg] transition-transform duration-500 relative group crosshairs">
              <img 
                src="/fotobab/HY2jAVYB5JU8HdxplxBzkh8TQo.avif" 
                alt="BAB Atlete" 
                className="w-full aspect-[4/5] object-cover border-[3px] border-black grayscale group-hover:grayscale-0 transition-all duration-500 skew-x-[-4deg]"
              />
              
              {/* Floating Widget (Neobrutalism) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-[#121212] text-white border-[3px] border-black p-3 shadow-[6px_6px_0_0_#FFDE4D] skew-x-[-12deg] z-20 hidden sm:flex items-center gap-3 group-hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-[#FFDE4D] text-[#0F0F12] border-2 border-black w-10 h-10 flex items-center justify-center text-xl shadow-[2px_2px_0_0_#000] skew-x-[12deg]">
                  <span className="font-['Space_Grotesk'] font-black italic">+</span>
                </div>
                <div className="skew-x-[12deg]">
                  <p className="font-['Bricolage_Grotesque',_sans-serif] italic font-black leading-none text-sm uppercase">{t('home.widgetTitle')}</p>
                  <p className="font-['Space_Grotesk',_sans-serif] font-bold text-xs opacity-80">{t('home.widgetDesc')}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE — trust badges */}
      <div className="w-full bg-[#DAE993] border-y-[4px] border-black overflow-hidden py-3 sm:py-4 relative z-20 flex items-center shadow-[0_4px_0_0_#0F0F12]" role="img" aria-label="GDPR Compliant · Backed by Science · Built with Elite Athletes · Puberty Support">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="flex whitespace-nowrap w-max motion-reduce:animate-none"
          aria-hidden="true"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="font-['Space_Grotesk',_sans-serif] font-black text-base sm:text-xl text-black uppercase tracking-wide shrink-0 px-6">
              {t('home.marquee')}&nbsp;</span>
          ))}
        </motion.div>
      </div>

      {/* 1.5 LA MISSIONE */}
      <section className="w-full bg-[#143F36] py-24 px-4 text-center relative text-white border-y-[4px] border-black shadow-[0_8px_0_0_#0F0F12] z-10 overflow-hidden mt-16 mb-16">
        <div className="max-w-5xl mx-auto relative z-10">
           <div className="inline-block bg-[#EBE5FF] text-[#0F0F12] border-[3px] border-black px-6 py-2 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_#0F0F12] mb-12 skew-btn">
             <span className="skew-btn-content">{t('home.missionBadge')}</span>
           </div>
           <h2 
             className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-6xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-10 text-white drop-shadow-[6px_6px_0_rgba(15,15,18,1)]"
             style={{ WebkitTextStroke: '2px #0F0F12' }}
           >
             {t('home.missionTitle')}
           </h2>
           <p className="font-['Space_Grotesk',_sans-serif] font-bold text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-4xl mx-auto border-l-[4px] border-[#FFDE4D] pl-6 md:pl-10 text-left bg-black/20 p-6 md:p-8 backdrop-blur-sm shadow-[inset_4px_4px_0_0_rgba(0,0,0,0.5)]">
             {t('home.missionBody')} <span className="text-[#DAE993]">{t('home.missionBodyHighlight')}</span>
           </p>
        </div>
        
        {/* Background Decorative Doodles */}
        <svg className="absolute top-0 right-0 w-64 h-64 text-[#FFDE4D] opacity-20 -rotate-12 translate-x-1/4 -translate-y-1/4" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="4" />
        </svg>
      </section>

      {/* 1.6 IL COSTO DEL SILENZIO — la voce dell'atleta, prima → dopo BAB (citazioni reali) */}
      <section className="w-full px-4 py-20 sm:py-24 mb-16 relative bg-[#FAF9F6] text-[#0F0F12] border-y-[4px] border-black overflow-hidden grid-pattern">
        <div className="max-w-5xl mx-auto relative z-10">

          {/* Titolo nastrato */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="relative inline-block -rotate-1">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 z-20 rotate-2 opacity-90 shadow-[0_3px_6px_rgba(0,0,0,0.25)]" style={{ backgroundColor: '#FFC042', clipPath: 'polygon(0 5%, 100% 0, 98% 95%, 2% 100%)' }} aria-hidden="true"></div>
              <h2 className="relative font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-5xl font-black uppercase bg-white border-[4px] border-black px-6 sm:px-10 py-3 shadow-[8px_8px_0_0_#0F0F12]">{t('home.silenceBadge')}</h2>
            </div>
            <p className="mt-7 font-['Space_Grotesk',_sans-serif] font-bold text-base sm:text-lg text-[#0F0F12]/80 max-w-lg mx-auto">{t('home.silenceLead')}</p>
          </div>

          {/* Due pagine: Senza BAB  →  Con BAB */}
          <div className="flex flex-col md:flex-row items-stretch gap-5 md:gap-4">

            {/* SENZA BAB — voce spenta, barrata */}
            <div className="flex-1 relative bg-[#FFE3D1] border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12] p-6 sm:p-7 md:-rotate-1">
              <div className="absolute -top-3 left-6 w-20 h-6 z-20 -rotate-6 opacity-90 shadow-[0_3px_6px_rgba(0,0,0,0.25)]" style={{ backgroundColor: '#FFC042', clipPath: 'polygon(0 5%, 100% 0, 98% 95%, 2% 100%)' }} aria-hidden="true"></div>
              <div className="flex items-center justify-between border-b-[3px] border-black/25 pb-3 mb-5">
                <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl sm:text-3xl font-black uppercase text-[#0F0F12]/65">{t('home.silenceOldLabel')}</h3>
                <span className="w-9 h-9 rounded-full bg-[#FF6B5C] text-white border-[3px] border-black flex items-center justify-center font-black shrink-0" aria-hidden="true">✕</span>
              </div>
              <ul className="flex flex-col gap-3">
                {oldVoices.map((v, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#FF6B5C] font-black mt-px shrink-0" aria-hidden="true">✕</span>
                    <span className="font-bold text-base sm:text-lg leading-snug line-through decoration-[#FF6B5C] decoration-2 text-[#0F0F12]/55">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Freccia trasformazione */}
            <div className="flex items-center justify-center shrink-0 py-1 md:py-0">
              <Doodle name="arrow" className="w-12 h-12 text-[#1F7A63] -rotate-45 md:rotate-[200deg]" stroke={3} />
            </div>

            {/* CON BAB — voce viva, evidenziata */}
            <div className="flex-1 relative bg-white border-[4px] border-black shadow-[8px_8px_0_0_#FF8FB1] p-6 sm:p-7 md:rotate-1">
              <div className="absolute -top-3 right-6 w-20 h-6 z-20 rotate-6 opacity-90 shadow-[0_3px_6px_rgba(0,0,0,0.25)]" style={{ backgroundColor: '#B8A9E8', clipPath: 'polygon(0 5%, 100% 0, 98% 95%, 2% 100%)' }} aria-hidden="true"></div>
              <div className="flex items-center justify-between border-b-[3px] border-black pb-3 mb-5">
                <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl sm:text-3xl font-black uppercase">{t('home.silenceBabLabel')}</h3>
                <span className="w-9 h-9 rounded-full bg-[#D4F46A] border-[3px] border-black flex items-center justify-center text-base shrink-0" aria-hidden="true">💚</span>
              </div>
              <ul className="flex flex-col gap-3">
                {babVoices.map((v, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#1F7A63] font-black mt-px shrink-0" aria-hidden="true">✓</span>
                    <span className="font-bold text-base sm:text-lg leading-snug box-decoration-clone px-1.5 py-0.5 text-[#0F0F12]" style={{ backgroundColor: BAB_MARK[i % BAB_MARK.length] }}>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nota fonte */}
          <p className="mt-10 text-center text-xs sm:text-sm font-bold text-[#0F0F12]/55 max-w-xl mx-auto">* {t('home.silenceFootnote')}</p>
        </div>
      </section>

      {/* 2. IL TUO BIVIO */}
      <section className="w-full px-4 py-24 mb-16 relative bg-[#FAF9F6] text-[#0F0F12] border-y-[4px] border-black overflow-hidden">
        {/* Sfondo Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-center justify-center mb-16 sm:mb-20 text-center">
             <div className="font-['Space_Grotesk',_sans-serif] font-black tracking-widest text-sm uppercase text-black/60 mb-4">
               {t('home.bivioSuper')}
             </div>
             <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter text-[#FAF9F6] drop-shadow-[6px_6px_0_rgba(15,15,18,1)] mb-6" style={{ WebkitTextStroke: '2.5px #0F0F12' }}>
               {t('home.bivioTitle')}
             </h2>
             <p className="font-['Space_Grotesk',_sans-serif] font-bold text-lg sm:text-xl max-w-2xl text-[#0F0F12]">
               {t('home.bivioSub')}
             </p>
          </div>
          
          {/* Bivio Grid */}
          <div className="w-full flex flex-col md:flex-row border-[3px] border-black shadow-[12px_12px_0_0_#0F0F12] overflow-hidden bg-white">
             {/* Colonna Allenatore */}
             <div className="flex-1 bg-[#143F36] text-white p-8 sm:p-12 flex flex-col relative">
                <div className="inline-block bg-[#FFDE4D] text-[#0F0F12] border-[2px] border-black px-4 py-1 font-['Space_Grotesk',_sans-serif] font-black uppercase tracking-widest text-xs mb-8 self-start shadow-[4px_4px_0_0_#0F0F12]">
                  {t('home.bivioCoachBadge')}
                </div>
                <h3 className="font-['Space_Grotesk',_sans-serif] text-4xl sm:text-5xl font-black leading-tight mb-8">
                  {t('home.bivioCoachTitle1')}<br/>
                  {t('home.bivioCoachTitle2')}
                </h3>
                <p className="font-['Space_Grotesk',_sans-serif] font-bold text-lg leading-relaxed border-l-[4px] border-[#FFDE4D] pl-6 mb-12 opacity-90">
                  {t('home.bivioCoachDesc')}
                </p>
                <ul className="space-y-4 font-['Space_Grotesk',_sans-serif] font-bold text-base sm:text-lg mb-12 flex-grow opacity-90">
                  <li className="flex gap-4 items-start"><span className="text-[#FFDE4D] font-serif text-xl leading-none mt-0.5">✦</span> <span>{t('home.bivioCoachP1')}</span></li>
                  <li className="flex gap-4 items-start"><span className="text-[#FFDE4D] font-serif text-xl leading-none mt-0.5">✦</span> <span>{t('home.bivioCoachP2')}</span></li>
                  <li className="flex gap-4 items-start"><span className="text-[#FFDE4D] font-serif text-xl leading-none mt-0.5">✦</span> <span>{t('home.bivioCoachP3')}</span></li>
                </ul>
                <a href="#/coach" className="group flex items-center justify-center w-full bg-[#FFDE4D] text-[#0F0F12] font-['Bricolage_Grotesque',_sans-serif] italic font-black text-lg sm:text-xl uppercase px-4 py-4 border-[3px] border-black shadow-[6px_6px_0_0_#0F0F12] hover:-translate-y-1 hover:bg-[#EBE5FF] active:translate-y-0 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all mt-auto text-center">
                  {t('home.bivioCoachCta')}
                </a>
             </div>
             
             {/* Colonna Genitore */}
             <div className="flex-1 bg-[#FAF9F6] text-[#0F0F12] p-8 sm:p-12 flex flex-col relative border-t-[3px] md:border-t-0 md:border-l-[3px] border-black">
                <div className="inline-block bg-[#34BBC0] text-[#0F0F12] border-[2px] border-black px-4 py-1 font-['Space_Grotesk',_sans-serif] font-black uppercase tracking-widest text-xs mb-8 self-start shadow-[4px_4px_0_0_#0F0F12]">
                  {t('home.bivioParentBadge')}
                </div>
                <h3 className="font-['Space_Grotesk',_sans-serif] text-4xl sm:text-5xl font-black leading-tight mb-8">
                  {t('home.bivioParentTitle1')}<br/>
                  {t('home.bivioParentTitle2')}
                </h3>
                <p className="font-['Space_Grotesk',_sans-serif] font-bold text-lg leading-relaxed border-l-[4px] border-[#34BBC0] pl-6 mb-12 opacity-90">
                  {t('home.bivioParentDesc')}
                </p>
                <ul className="space-y-4 font-['Space_Grotesk',_sans-serif] font-bold text-base sm:text-lg mb-12 flex-grow opacity-90">
                  <li className="flex gap-4 items-start"><span className="text-vividteal font-serif text-xl leading-none mt-0.5">✦</span> <span>{t('home.bivioParentP1')}</span></li>
                  <li className="flex gap-4 items-start"><span className="text-vividteal font-serif text-xl leading-none mt-0.5">✦</span> <span>{t('home.bivioParentP2')}</span></li>
                  <li className="flex gap-4 items-start"><span className="text-vividteal font-serif text-xl leading-none mt-0.5">✦</span> <span>{t('home.bivioParentP3')}</span></li>
                </ul>
                <a href="#/app" className="group flex items-center justify-center w-full bg-[#FFDE4D] text-[#0F0F12] font-['Bricolage_Grotesque',_sans-serif] italic font-black text-lg sm:text-xl uppercase px-4 py-4 border-[3px] border-black shadow-[6px_6px_0_0_#0F0F12] hover:-translate-y-1 hover:bg-[#EBE5FF] active:translate-y-0 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all mt-auto text-center">
                  {t('home.bivioParentCta')}
                </a>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="w-full flex justify-center py-8">
        <svg width="300" height="20" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0F0F12] opacity-20">
          <path d="M0 10 L 30 0 L 60 20 L 90 0 L 120 20 L 150 0 L 180 20 L 210 0 L 240 20 L 270 0 L 300 10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* 3. A SYSTEMIC PROBLEM — carta spenta (sand), il dolore in coral, la speranza (kicker) in vividteal */}
      <section className="w-full bg-sand border-y-[4px] border-black py-20 px-4 my-16 relative overflow-hidden text-[#0F0F12] grid-pattern">
        <div className="max-w-5xl mx-auto relative z-10 text-[#0F0F12]">

          {/* Header: testo a sinistra, immagine a destra */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-12 md:items-center">
            <div className="flex-1">
              <div className="inline-block bg-white text-[#0F0F12] border-[3px] border-black px-4 py-2 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_#0F0F12] mb-8 relative skew-btn">
                <span className="skew-btn-content italic">{t('home.dataBadge')}</span>
              </div>
              <h2
                className="font-['Bricolage_Grotesque',_sans-serif] text-[#0F0F12] text-4xl sm:text-6xl italic font-black leading-tight uppercase mb-5 tracking-tighter"
                dangerouslySetInnerHTML={{__html: t('home.dataTitle')}}
              />
              <p className="text-lg sm:text-xl font-extrabold max-w-xl text-[#0F0F12]">{t('home.dataSubtitle')}</p>
            </div>

            <div className="w-full md:w-1/3 shrink-0 hidden md:block">
              <div className="w-full aspect-square border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12] skew-x-[4deg] crosshairs relative overflow-hidden bg-white">
                <div className="duct-tape -top-4 -left-4 rotate-[-15deg] w-32 h-10 z-20 opacity-80"></div>
                <img
                  src="/fotobab/VdqkhgkqBx24EcakOTkAIdtMLaw.avif"
                  alt="Atleta BAB"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 skew-x-[-4deg] scale-110"
                />
              </div>
            </div>
          </div>

          {/* SIGNATURE — Il ledger del silenzio.
              50% → 6% → 0%: più il bisogno si fa specifico, meno se ne sa.
              Numeri cavi allineati (stesso contorno ink + ombra-accento); lo 0% è
              il terminale — l'assenza — che BAB colma. */}
          <ol className="mt-12 sm:mt-16 flex flex-col">

            {/* 50% */}
            <li className="flex items-center gap-5 sm:gap-10 py-5 sm:py-7 border-t-[3px] border-black/10">
              <span className="font-['Bricolage_Grotesque',_sans-serif] text-6xl sm:text-7xl leading-[0.8] font-black text-transparent shrink-0 w-[2.5em] text-right" style={{ WebkitTextStroke: '3px #0F0F12', textShadow: '4px 4px 0 #FFDE4D' }}>{t('home.data1Val')}</span>
              <p className="flex-1 font-extrabold uppercase text-sm sm:text-base tracking-tight leading-snug">{t('home.data1Desc')}</p>
            </li>

            {/* 6% */}
            <li className="flex items-center gap-5 sm:gap-10 py-5 sm:py-7 border-t-[3px] border-black/10">
              <span className="font-['Bricolage_Grotesque',_sans-serif] text-6xl sm:text-7xl leading-[0.8] font-black text-transparent shrink-0 w-[2.5em] text-right" style={{ WebkitTextStroke: '3px #0F0F12', textShadow: '4px 4px 0 var(--color-coral)' }}>{t('home.data2Val')}</span>
              <p className="flex-1 font-extrabold uppercase text-sm sm:text-base tracking-tight leading-snug">{t('home.data2Desc')}</p>
            </li>

            {/* 0% — il terminale: il vuoto che BAB colma */}
            <li className="flex items-center gap-5 sm:gap-10 py-5 sm:py-7 border-y-[3px] border-black/10">
              <span className="font-['Bricolage_Grotesque',_sans-serif] text-6xl sm:text-7xl leading-[0.8] font-black text-transparent shrink-0 w-[2.5em] text-right" style={{ WebkitTextStroke: '3px #0F0F12', textShadow: '4px 4px 0 var(--color-coral)' }}>{t('home.data3Val')}</span>
              <div className="flex-1">
                <p className="font-extrabold uppercase text-sm sm:text-base tracking-tight leading-snug">{t('home.data3Desc')}</p>
                <p className="mt-2 font-black uppercase text-[11px] tracking-widest text-vividteal">↳ {t('home.dataVoid')}</p>
              </div>
            </li>

          </ol>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="w-full flex justify-center py-8">
        <svg width="300" height="20" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0F0F12] opacity-20">
          <path d="M0 10 L 30 0 L 60 20 L 90 0 L 120 20 L 150 0 L 180 20 L 210 0 L 240 20 L 270 0 L 300 10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* 4. WAITLIST (Global popup is now used instead) */}

      {/* 5. TESTIMONIALS */}
      <section className="w-full py-24 text-[#0F0F12] overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 mb-12 sm:mb-16">
          <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-[#0F0F12] text-4xl sm:text-6xl font-black uppercase text-center md:text-left leading-tight tracking-tighter">
            {t('home.testimonialsTitle')}
          </h2>
          
          {/* Navigation Arrows */}
          <div className="flex gap-4 shrink-0 hidden sm:flex">
            <button onClick={scrollLeft} className="w-14 h-14 bg-white border-[4px] border-black shadow-[4px_4px_0_0_#0F0F12] flex items-center justify-center hover:-translate-y-1 hover:bg-[#EBE5FF] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all group active:translate-y-0 active:shadow-none">
              <span className="text-3xl font-black group-hover:-translate-x-1 transition-transform">←</span>
            </button>
            <button onClick={scrollRight} className="w-14 h-14 bg-[#FFDE4D] border-[4px] border-black shadow-[4px_4px_0_0_#0F0F12] flex items-center justify-center hover:-translate-y-1 hover:bg-[#EBE5FF] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all group active:translate-y-0 active:shadow-none">
              <span className="text-3xl font-black group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
        
        {/* Horizontal Slider Polaroid */}
        <div 
          ref={scrollContainerRef}
          className="w-full flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 md:px-12 pb-12 pt-8 hide-scrollbar scroll-smooth"
        >
          {testimonials.map((item, i) => {
            return (
              <div key={i} className="relative snap-center shrink-0 w-[85vw] max-w-[400px] flex flex-col justify-between bg-[#FAF9F6] text-[#0F0F12] border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12] p-8 sm:p-10 transition-transform skew-x-[-2deg] crosshairs hover:-translate-y-2">
                <div className="telemetry-line"></div>
                <p className="text-base sm:text-lg font-extrabold leading-relaxed mb-8 border-l-[4px] border-black pl-4 sm:pl-6 relative skew-x-[2deg]">
                  <span className="absolute -left-3 -top-3 text-4xl opacity-20 font-serif font-black" aria-hidden="true">"</span>
                  {item.quote}
                </p>
                <div className="border-t-[3px] border-black pt-4 mt-auto skew-x-[2deg]">
                  <h4 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl font-black italic uppercase leading-none mb-1">{item.name}</h4>
                  <p className="text-xs font-black uppercase tracking-widest opacity-80">{item.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="w-full flex justify-center py-8">
        <svg width="300" height="20" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0F0F12] opacity-20">
          <path d="M0 10 L 30 0 L 60 20 L 90 0 L 120 20 L 150 0 L 180 20 L 210 0 L 240 20 L 270 0 L 300 10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* 5.5 FAQ SECTION */}
      <FAQ />

      {/* 6. MANIFESTO + PRIVACY (chiusura Home — il footer globale è in App.tsx) */}
      <section className="w-full max-w-4xl mx-auto px-4 py-24 text-center relative text-[#0F0F12]">
        
        {/* Doodle abstract bg for the footer title */}
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-64 opacity-20 -z-10 pointer-events-none" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFDE4D" d="M10 50 Q 50 0 150 50 T 190 50 Q 100 100 10 50 Z" />
        </svg>

        <div className="mb-16 inline-block bg-white border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12] p-8 sm:p-12 relative skew-x-[-6deg] crosshairs">
          <h2 
            className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-6xl font-black uppercase leading-tight text-[#0F0F12] tracking-tighter skew-x-[6deg]" 
            style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '4px 4px 0px #0F0F12' }}
            dangerouslySetInnerHTML={{__html: t('home.footerTitle')}}
          />
        </div>

        <div className="bg-white text-[#0F0F12] border-[4px] border-black p-8 sm:p-12 text-left shadow-[8px_8px_0_0_#0F0F12] relative max-w-3xl mx-auto skew-x-[-2deg] crosshairs">
           <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl font-black uppercase mb-6 bg-black text-[#FFDE4D] inline-block px-4 py-2 tracking-tight skew-btn"><span className="skew-btn-content">{t('home.privacyTitle')}</span></h3>
           <div className="skew-x-[2deg] font-['Space_Grotesk',_sans-serif] font-bold">
             <p className="text-lg leading-relaxed mb-6">
               {t('home.privacy1')}
             </p>
             <p className="text-lg leading-relaxed bg-[#EBE5FF] border-[3px] border-black p-4 shadow-[4px_4px_0_0_#0F0F12] border-l-[8px] border-l-[#34BBC0]">
               {t('home.privacy2')}
             </p>
           </div>
        </div>

      </section>

    </div>
  );
}
