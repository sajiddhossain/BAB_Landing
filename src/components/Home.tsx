import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import FAQ from './FAQ';
import { trackEvent } from '../lib/analytics';
import type { UserType } from '../lib/leads';

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

  return (
    <div className="flex flex-col items-center w-full min-h-screen text-[#0F0F12]">
      
      {/* 1. HERO SECTION */}
      <section className="w-full min-h-[100dvh] pt-24 md:pt-32 pb-16 flex justify-center relative overflow-hidden bg-white">
        {/* Sfondo a Griglia Leggera */}
        <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-6xl w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
          
          {/* COLONNA SINISTRA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left w-full"
          >
            {/* Techstars Badge */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-1.5 bg-white border-[3px] border-black text-[#0F0F12] font-['Space_Grotesk',_sans-serif] font-bold text-[10px] sm:text-xs tracking-widest uppercase mb-8 shadow-[4px_4px_0_0_#0F0F12]"
            >
              {t('home.badge')}
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="font-['Bricolage_Grotesque',_sans-serif] text-[2.75rem] sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tighter w-full text-[#0F0F12]"
            >
              {t('home.heroTitle')}
            </motion.h1>

            {/* Punchline "Non lasciare che accada." */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mb-10"
            >
              <div className="inline-block px-6 py-3 bg-[#1E293B] border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12]">
                 <span className="font-['Space_Grotesk',_sans-serif] font-bold text-white text-xl sm:text-2xl tracking-wide">{t('home.heroHighlight')}</span>
              </div>
            </motion.div>

            {/* IMMAGINE MOBILE (Nascosta su Desktop) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full flex justify-center mb-10 lg:hidden"
            >
              <div className="w-full max-w-[280px] sm:max-w-[320px] relative mt-4">
                {/* Yellow Offset Layer */}
                <div className="absolute inset-0 bg-[#FFDE4D] border-[4px] border-black translate-x-3 translate-y-3"></div>
                {/* Main Image Container */}
                <div className="relative bg-white border-[4px] border-black p-2 z-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #e5e5e5 10px, #e5e5e5 11px)' }}>
                  <img 
                    src="/fotobab/HY2jAVYB5JU8HdxplxBzkh8TQo.avif" 
                    alt="BAB Atlete" 
                    className="w-full aspect-square object-cover border-[3px] border-black grayscale"
                  />
                  {/* Floating Widget */}
                  <div className="absolute -bottom-4 -left-4 bg-[#121212] text-white border-[3px] border-black p-2 shadow-[4px_4px_0_0_#FFDE4D] flex items-center gap-2 z-20">
                    <div className="bg-[#FFDE4D] text-[#0F0F12] border-2 border-black w-6 h-6 flex items-center justify-center text-sm shadow-[2px_2px_0_0_#000]">
                      <span className="font-['Space_Grotesk'] font-black">+</span>
                    </div>
                    <div>
                      <p className="font-['Bricolage_Grotesque',_sans-serif] italic font-black leading-none text-[10px] sm:text-xs uppercase">{t('home.widgetTitle')}</p>
                      <p className="font-['Space_Grotesk',_sans-serif] font-bold text-[8px] sm:text-[10px] opacity-80">Indice in tempo reale</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SWITCH INTERATTIVO */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-lg mb-6 bg-white border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12] flex flex-col sm:flex-row text-[#0F0F12]"
            >
               <button
                 onClick={() => selectTarget('allenatore')}
                 aria-pressed={heroTarget === 'allenatore'}
                 className={`flex-1 py-4 px-4 text-sm font-black uppercase tracking-wider transition-colors border-b-[4px] sm:border-b-0 sm:border-r-[4px] border-black ${heroTarget === 'allenatore' ? 'bg-[#FFDE4D]' : 'hover:bg-neutral-100'}`}
               >
                 {t('home.coachBtn')}
               </button>
               <button
                 onClick={() => selectTarget('genitore')}
                 aria-pressed={heroTarget === 'genitore'}
                 className={`flex-1 py-4 px-4 text-sm font-black uppercase tracking-wider transition-colors ${heroTarget === 'genitore' ? 'bg-white' : 'hover:bg-neutral-100'}`}
               >
                 {t('home.parentBtn')}
               </button>
            </motion.div>

            {/* SOTTO-TESTO DINAMICO */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="min-h-[4rem] flex items-center mb-8 max-w-lg"
            >
               <p className="text-base sm:text-lg font-bold border-l-[4px] border-black pl-4 text-left leading-relaxed text-[#0F0F12]">
                 {heroTarget === 'allenatore' && t('home.coachDesc')}
                 {heroTarget === 'genitore' && t('home.parentDesc')}
               </p>
            </motion.div>

            {/* CTA BUTTONS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-start gap-4 w-full text-[#0F0F12]"
            >
              <button
                onClick={handleHeroCta}
                className="font-['Space_Grotesk',_sans-serif] font-black text-xl sm:text-2xl bg-[#FFDE4D] border-[4px] border-black px-8 py-4 shadow-[6px_6px_0_0_#0F0F12] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[4px_4px_0_0_#0F0F12] transition-all uppercase"
              >
                {heroTarget === 'allenatore' ? t('home.ctaCoach') : t('home.ctaParent')}
              </button>
              
              <div className="font-['Space_Grotesk',_sans-serif] font-bold text-xs uppercase bg-[#EBE5FF] border-[3px] border-black px-4 py-2 shadow-[4px_4px_0_0_#0F0F12] cursor-default text-center">
                 <span dangerouslySetInnerHTML={{__html: t('home.appTag').replace('\n', ' + ')}} />
              </div>
            </motion.div>

          </motion.div>

          {/* COLONNA DESTRA (Span 5 - Solo Desktop) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="lg:col-span-5 w-full justify-center hidden lg:flex relative text-[#0F0F12]"
          >
            <div className="w-full max-w-md relative mt-12">
              {/* Yellow Offset Layer */}
              <div className="absolute inset-0 bg-[#FFDE4D] border-[4px] border-black translate-x-4 translate-y-4"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-white border-[4px] border-black p-3 z-10 transition-transform hover:-translate-y-1 hover:-translate-x-1 duration-300" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 15px, #e5e5e5 15px, #e5e5e5 16px)' }}>
                <img 
                  src="/fotobab/HY2jAVYB5JU8HdxplxBzkh8TQo.avif" 
                  alt="BAB Atlete" 
                  className="w-full aspect-[4/5] object-cover border-[4px] border-black grayscale transition-all duration-500 hover:grayscale-0"
                />
                
                {/* Floating Widget (Neobrutalism) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-6 -left-8 bg-[#121212] text-white border-[4px] border-black p-3 shadow-[6px_6px_0_0_#FFDE4D] flex items-center gap-3 z-20"
                >
                  <div className="bg-[#FFDE4D] text-[#0F0F12] border-[3px] border-black w-10 h-10 flex items-center justify-center text-xl shadow-[3px_3px_0_0_#000]">
                    <span className="font-['Space_Grotesk'] font-black">+</span>
                  </div>
                  <div>
                    <p className="font-['Bricolage_Grotesque',_sans-serif] italic font-black leading-none text-sm uppercase">{t('home.widgetTitle')}</p>
                    <p className="font-['Space_Grotesk',_sans-serif] font-bold text-xs opacity-80">Indice in tempo reale</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE SPORTIVO */}
      <div className="w-full bg-[#DAE993] border-y-[4px] border-black overflow-hidden py-3 sm:py-4 relative z-20 flex items-center shadow-[0_4px_0_0_#0F0F12]" aria-hidden="true">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="flex whitespace-nowrap w-max motion-reduce:animate-none"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="font-['Space_Grotesk',_sans-serif] font-black text-xl sm:text-2xl text-black uppercase tracking-widest shrink-0 px-8">
              /// {t('home.marquee')} </span>
          ))}
        </motion.div>
      </div>

      {/* 1.5 LA MISSIONE */}
      <section className="w-full bg-[#3B4A6B] py-24 px-4 text-center relative text-white border-y-[4px] border-black shadow-[0_8px_0_0_#0F0F12] z-10 overflow-hidden mt-16 mb-16">
        <div className="max-w-5xl mx-auto relative z-10">
           <div className="inline-block bg-[#EBE5FF] text-[#0F0F12] border-[3px] border-black px-6 py-2 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_#0F0F12] mb-12 skew-btn">
             <span className="skew-btn-content">{t('home.missionBadge')}</span>
           </div>
           <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-6xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-10 text-white drop-shadow-[4px_4px_0_rgba(15,15,18,1)]">
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

      {/* 2. BIVIO SCELTA (IL MODELLO FINANZ) */}
      <section className="w-full px-4 py-24 mb-16 relative bg-[#FAF9F6] text-[#0F0F12] border-y-[4px] border-black overflow-hidden">
        {/* Sfondo Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex justify-center mb-16 sm:mb-24">
            <div className="relative inline-block skew-btn">
              <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-5xl lg:text-6xl font-black italic text-center uppercase tracking-tighter bg-[#0F0F12] border-[4px] border-[#0F0F12] px-8 py-3 text-[#FFDE4D] m-0 shadow-[8px_8px_0_0_#34BBC0]">
                <span className="skew-btn-content pr-2">{t('home.costBadge')}</span>
              </h2>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-stretch gap-8 sm:gap-12 w-full relative z-10">
            {/* Vecchio Metodo (Obsoleto) */}
            <div className="flex-1 relative md:mt-12 flex flex-col">
              <div className="h-full p-6 sm:p-8 border-[4px] border-black bg-neutral-200 text-neutral-500 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] skew-x-[2deg] crosshairs">
                <div className="skew-x-[-2deg]">
                  <div className="flex justify-between items-center mb-8 border-b-[3px] border-neutral-400 pb-4">
                    <h3 className="font-['Bricolage_Grotesque',_sans-serif] italic text-3xl font-black uppercase tracking-tight text-neutral-600 line-through decoration-[4px] decoration-[#FF5722]/60">{t('home.oldMethod')}</h3>
                  </div>
                  <ul className="space-y-6 font-extrabold text-lg text-neutral-600">
                    <li className="flex gap-4 items-start"><span className="font-['Bricolage_Grotesque',_sans-serif] text-4xl leading-none text-neutral-400 font-black italic tracking-tighter">01.</span> <span className="leading-snug mt-1">{t('home.old1')}</span></li>
                    <li className="flex gap-4 items-start"><span className="font-['Bricolage_Grotesque',_sans-serif] text-4xl leading-none text-neutral-400 font-black italic tracking-tighter">02.</span> <span className="leading-snug mt-1">{t('home.old2')}</span></li>
                    <li className="flex gap-4 items-start"><span className="font-['Bricolage_Grotesque',_sans-serif] text-4xl leading-none text-neutral-400 font-black italic tracking-tighter">03.</span> <span className="leading-snug mt-1">{t('home.old3')}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Metodo BAB (High Performance) */}
            <div className="flex-[1.2] relative flex flex-col z-20">
              <div className="h-full p-8 sm:p-10 border-[4px] border-black bg-white text-[#0F0F12] shadow-[12px_12px_0_0_#34BBC0] skew-x-[-2deg] crosshairs ring-[8px] ring-[#FAF9F6]">
                <div className="skew-x-[2deg] h-full flex flex-col">
                  <div className="flex justify-between items-center mb-8 border-b-[3px] border-[#34BBC0] pb-4 relative">
                    <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-5xl italic font-black uppercase tracking-tight text-[#0F0F12]">{t('home.babMethod')}</h3>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-[2px] bg-gradient-to-r from-[#34BBC0] to-transparent"></div>
                  </div>
                  
                  <ul className="space-y-8 font-extrabold text-lg sm:text-xl mb-12 flex-grow">
                    <li className="flex gap-4 items-start"><span className="font-['Bricolage_Grotesque',_sans-serif] text-5xl leading-none text-[#34BBC0] font-black italic tracking-tighter drop-shadow-[2px_2px_0_rgba(15,15,18,1)]" style={{ WebkitTextStroke: '1.5px #0F0F12' }}>01.</span> <span className="leading-snug mt-1">{t('home.bab1')}</span></li>
                    <li className="flex gap-4 items-start"><span className="font-['Bricolage_Grotesque',_sans-serif] text-5xl leading-none text-[#FFDE4D] font-black italic tracking-tighter drop-shadow-[2px_2px_0_rgba(15,15,18,1)]" style={{ WebkitTextStroke: '1.5px #0F0F12' }}>02.</span> <span className="leading-snug mt-1">{t('home.bab2')}</span></li>
                    <li className="flex gap-4 items-start"><span className="font-['Bricolage_Grotesque',_sans-serif] text-5xl leading-none text-[#FF5722] font-black italic tracking-tighter drop-shadow-[2px_2px_0_rgba(15,15,18,1)]" style={{ WebkitTextStroke: '1.5px #0F0F12' }}>03.</span> <span className="leading-snug mt-1">{t('home.bab3')}</span></li>
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                     <a href="#/app" className="group flex items-center justify-center gap-4 flex-1 bg-[#FFDE4D] text-[#0F0F12] font-black italic text-lg sm:text-xl uppercase px-4 py-4 border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] active:scale-95 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all skew-btn"><span className="skew-btn-content text-center flex-1">{t('home.testAppBtn')}</span></a>
                     <a href="#/coach" className="group flex items-center justify-center gap-4 flex-1 bg-[#34BBC0] text-[#0F0F12] font-black italic text-lg sm:text-xl uppercase px-4 py-4 border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] active:scale-95 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all skew-btn"><span className="skew-btn-content text-center flex-1">{t('home.testCoachBtn')}</span></a>
                  </div>
                </div>
              </div>
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

      {/* 3. DATA THAT BREAK BARRIERS */}
      <section className="w-full bg-[#EBE5FF] border-y-[4px] border-black py-20 px-4 my-16 relative overflow-hidden text-[#0F0F12] grid-pattern">
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="inline-block bg-white text-[#0F0F12] border-[3px] border-black px-4 py-2 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_#0F0F12] mb-8 relative skew-btn">
              <span className="skew-btn-content italic">{t('home.dataBadge')}</span>
            </div>
            <h2 
              className="font-['Bricolage_Grotesque',_sans-serif] text-[#0F0F12] text-4xl sm:text-6xl italic font-black leading-tight uppercase mb-6 tracking-tighter"
              dangerouslySetInnerHTML={{__html: t('home.dataTitle')}}
            />
            <p className="text-xl font-extrabold mb-8 max-w-3xl text-[#0F0F12]">{t('home.dataSubtitle')}</p>
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
        
        <div className="max-w-5xl mx-auto mt-12 relative z-10 text-[#0F0F12]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 relative">
            <div className="bg-white border-[4px] border-black p-8 shadow-[6px_6px_0_0_#0F0F12] relative crosshairs skew-x-[-6deg]">
               <div className="duct-tape duct-tape-black -top-4 right-4 rotate-[15deg] w-20 h-6 z-20 opacity-70"></div>
               <div className="skew-x-[6deg]">
                 <span className="font-['Bricolage_Grotesque',_sans-serif] text-8xl md:text-[8rem] leading-none font-black italic text-[#FFDE4D] mb-4 block tracking-tighter" style={{ WebkitTextStroke: '3px #0F0F12', textShadow: '6px 6px 0px #0F0F12' }}>{t('home.data1Val')}</span>
                 <p className="font-extrabold uppercase text-sm tracking-tight border-l-[4px] border-black pl-3">{t('home.data1Desc')}</p>
               </div>
            </div>
            <div className="bg-white border-[4px] border-black p-8 shadow-[6px_6px_0_0_#0F0F12] relative crosshairs skew-x-[-6deg]">
               <div className="duct-tape -bottom-3 left-4 rotate-[-8deg] w-16 h-6 z-20 opacity-60"></div>
               <div className="skew-x-[6deg]">
                 <span className="font-['Bricolage_Grotesque',_sans-serif] text-8xl md:text-[8rem] leading-none font-black italic text-[#FF5722] mb-4 block tracking-tighter" style={{ WebkitTextStroke: '3px #0F0F12', textShadow: '6px 6px 0px #0F0F12' }}>{t('home.data2Val')}</span>
                 <p className="font-extrabold uppercase text-sm tracking-tight border-l-[4px] border-black pl-3">{t('home.data2Desc')}</p>
               </div>
            </div>
            <div className="bg-white border-[4px] border-black p-8 shadow-[6px_6px_0_0_#0F0F12] relative crosshairs skew-x-[-6deg]">
               <div className="duct-tape duct-tape-black -top-3 left-1/2 -translate-x-1/2 rotate-[2deg] w-24 h-6 z-20 opacity-80"></div>
               <div className="skew-x-[6deg]">
                 <span className="font-['Bricolage_Grotesque',_sans-serif] text-8xl md:text-[8rem] leading-none font-black italic text-[#34BBC0] mb-4 block tracking-tighter" style={{ WebkitTextStroke: '3px #0F0F12', textShadow: '6px 6px 0px #0F0F12' }}>{t('home.data3Val')}</span>
                 <p className="font-extrabold uppercase text-sm tracking-tight border-l-[4px] border-black pl-3">{t('home.data3Desc')}</p>
               </div>
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

      {/* 4. WAITLIST (Global popup is now used instead) */}

      {/* 5. TESTIMONIALS */}
      <section className="w-full py-24 text-[#0F0F12] overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 mb-12 sm:mb-16">
          <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-[#0F0F12] text-4xl sm:text-6xl font-black uppercase text-center md:text-left leading-tight tracking-tighter">
            {t('home.testimonialsTitle')}
          </h2>
          
          {/* Navigation Arrows */}
          <div className="flex gap-4 shrink-0 hidden sm:flex">
            <button onClick={scrollLeft} className="w-14 h-14 bg-white border-[4px] border-black shadow-[4px_4px_0_0_#0F0F12] flex items-center justify-center hover:-translate-y-1 hover:bg-[#EBE5FF] transition-all group active:translate-y-0 active:shadow-none">
              <span className="text-3xl font-black group-hover:-translate-x-1 transition-transform">←</span>
            </button>
            <button onClick={scrollRight} className="w-14 h-14 bg-[#FFDE4D] border-[4px] border-black shadow-[4px_4px_0_0_#0F0F12] flex items-center justify-center hover:-translate-y-1 hover:bg-[#EBE5FF] transition-all group active:translate-y-0 active:shadow-none">
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

      {/* 6. FOOTER / MANIFESTO */}
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

        <div className="mt-20 border-t-[3px] border-black/20 pt-12 border-dashed flex flex-col items-center gap-6 relative text-center">
          <img src="/BAB_logo.svg" alt="BAB Logo" className="h-10 md:h-12 mb-2" />
          <p className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black max-w-lg mb-2 text-[#0F0F12]">
             {t('home.motto')}
          </p>
          <div className="flex gap-6 font-bold uppercase tracking-widest text-sm mb-4">
             <a href="https://substack.com/@babcommunity" target="_blank" rel="noopener noreferrer" className="hover:text-[#C2410C] transition-colors underline decoration-2 underline-offset-4">Substack</a>
             <a href="https://www.instagram.com/bab_community/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C2410C] transition-colors underline decoration-2 underline-offset-4">Instagram</a>
          </div>
          <div className="font-black uppercase tracking-widest text-xs text-[#0F0F12]/60">
            {t('home.footerTags')}<br/><br/>
            © 2026 BAB. ALL RIGHTS RESERVED.
          </div>
        </div>
      </section>

    </div>
  );
}
