import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import FAQ from './FAQ';

interface HomeProps {
  onOpenWaitlist?: () => void;
}

export default function Home({ onOpenWaitlist }: HomeProps) {
  const { t } = useTranslation();
  const [bivioState, setBivioState] = useState<'vecchio' | 'bab'>('vecchio');
  const [heroTarget, setHeroTarget] = useState<'allenatore' | 'genitore'>('allenatore');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
  };

  const testimonials = [
    {
      name: "Lisa Gutfleisch",
      role: "Canottiera Elite Nazionale Tedesca",
      quote: "BAB mi ha fatta sentire compresa e mi ha fatto capire quanto avrei beneficiato di uno strumento simile durante la mia crescita sportiva. Mi ci sono voluti molti anni per capire che la forza non è l'opposto della femminilità, e la prossima generazione di atlete non dovrebbe mai dover scegliere tra diventare forti e sentirsi adeguate.",
      color: "bg-[#FAF9F6]"
    },
    {
      name: "Alisha Menon",
      role: "Dottoranda alla UC Berkeley",
      quote: "Le giovani ragazze affrontano disinformazione e pregiudizi scientifici, sfide spesso amplificate negli ambienti sportivi, in particolare durante i profondi cambiamenti fisici e psicologici della pubertà. BAB fornisce una soluzione preventiva e sicura, contribuendo al contempo al progresso della ricerca in un campo che è stato trascurato per troppo tempo.",
      color: "bg-[#FAF9F6]"
    },
    {
      name: "Vasundhara P.",
      role: "Mamma di un'atleta di 11 anni",
      quote: "Mia figlia ha 11 anni e gareggia a livello regionale e nazionale nella scherma. Uno strumento come BAB mi aiuta a capire come supportare al meglio i suoi obiettivi sportivi in modo sicuro e informato, in particolare mentre affronta i cambiamenti dell'adolescenza continuando a competere ad alto livello.",
      color: "bg-[#FAF9F6]"
    },
    {
      name: "Erica Sali",
      role: "Giocatrice e Allenatrice di Pallavolo",
      quote: "Come giocatrice professionista e allenatrice di pallavolo, non ho mai avuto una risorsa così straordinaria come BAB per supportare le esigenze specifiche che abbiamo io e le mie atlete adolescenti.",
      color: "bg-[#FAF9F6]"
    }
  ];

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
              className="inline-block px-4 py-1 bg-[#EBE5FF] border-[2px] md:border-[3px] border-black text-[#0F0F12] font-black text-[10px] sm:text-xs tracking-widest uppercase mb-4 sm:mb-6 shadow-[4px_4px_0_0_#0F0F12] skew-btn"
            >
              <span className="skew-btn-content">{t('home.badge')}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="font-['Bricolage_Grotesque',_sans-serif] text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tighter w-full relative text-[#0F0F12]"
            >
              {t('home.heroTitle')}<br/>
              <span className="inline-block relative z-10 mt-3 px-4 sm:px-6 py-2 bg-[#3B4A6B] border-[3px] md:border-[4px] border-black shadow-[4px_4px_0_0_#0F0F12] md:shadow-[6px_6px_0_0_#0F0F12] text-white skew-btn">
                 <span className="skew-btn-content italic pr-2">{t('home.heroHighlight')}</span>
              </span>
              
              {/* Hand-drawn Doodle Arrow (Desktop) */}
              <svg className="hidden lg:block absolute right-0 -bottom-8 w-16 h-16 text-[#FFDE4D] drop-shadow-[3px_3px_0_#0F0F12] rotate-12 opacity-90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10 Q 50 50 90 90 M 60 90 L 90 90 L 90 60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.h1>

            {/* IMMAGINE MOBILE (Nascosta su Desktop) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full flex justify-center mb-8 lg:hidden"
            >
              <div className="w-full max-w-[280px] sm:max-w-[320px] bg-white border-[4px] border-black p-2 shadow-[8px_8px_0_0_#FFDE4D] skew-x-[-4deg] relative crosshairs">
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
                 onClick={() => setHeroTarget('allenatore')}
                 className={`w-full sm:flex-1 py-3 sm:py-2 px-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-[2px] border-transparent hover:-skew-x-6 origin-bottom-left ${heroTarget === 'allenatore' ? 'bg-[#FFDE4D] border-black shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.1)]' : 'hover:bg-neutral-100 hover:text-[#FF5722]'}`}
               >
                 {t('home.coachBtn')}
               </button>
               <button 
                 onClick={() => setHeroTarget('genitore')}
                 className={`w-full sm:flex-1 py-3 sm:py-2 px-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-[2px] border-transparent hover:-skew-x-6 origin-bottom-left ${heroTarget === 'genitore' ? 'bg-[#FFDE4D] border-black shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.1)] text-[#0F0F12]' : 'hover:bg-neutral-100 hover:text-[#FF5722]'}`}
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
               <p className="text-sm sm:text-base md:text-lg font-bold border-l-[4px] border-black pl-4 text-left leading-snug text-[#0F0F12]">
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
                onClick={onOpenWaitlist}
                className="group flex items-center justify-between gap-4 w-full sm:w-auto font-['Space_Grotesk',_sans-serif] font-black text-lg italic bg-[#FFDE4D] border-[3px] md:border-[4px] border-black pl-6 md:pl-8 pr-2 py-2 shadow-[6px_6px_0_0_#0F0F12] active:scale-[0.98] hover:shadow-none hover:translate-y-[6px] hover:translate-x-[6px] transition-all duration-300 uppercase skew-btn"
              >
                <span className="skew-btn-content pr-2">{t('home.waitlistBtn')}</span>
                <div className="skew-btn-content w-10 h-10 md:w-12 md:h-12 bg-[#0F0F12] rounded-none flex items-center justify-center text-[#FFDE4D] group-hover:translate-x-1 transition-all duration-300">
                  ↗
                </div>
              </button>
              <div 
                className="font-['Space_Grotesk',_sans-serif] font-black text-[10px] sm:text-xs italic bg-[#EBE5FF] border-[2px] md:border-[3px] border-black px-3 md:px-4 py-2 shadow-[4px_4px_0_0_#0F0F12] cursor-default text-center skew-btn"
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

      {/* MARQUEE SPORTIVO */}
      <div className="w-full bg-[#DAE993] border-y-[4px] border-black overflow-hidden py-3 sm:py-4 relative z-20 flex items-center shadow-[0_4px_0_0_#0F0F12]">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="flex whitespace-nowrap w-max"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="font-['Space_Grotesk',_sans-serif] font-black text-xl sm:text-2xl text-black uppercase tracking-widest shrink-0 px-8">
              /// BREAK BARRIERS /// PERFORMANCE x SALUTE /// REACH YOUR PERSONAL BEST
            </span>
          ))}
        </motion.div>
      </div>

      {/* 1.5 LA MISSIONE */}
      <section className="w-full bg-[#3B4A6B] py-24 px-4 text-center relative text-white border-y-[4px] border-black shadow-[0_8px_0_0_#0F0F12] z-10 overflow-hidden mt-8 mb-16">
        <div className="max-w-5xl mx-auto relative z-10">
           <div className="inline-block bg-[#EBE5FF] text-[#0F0F12] border-[3px] border-black px-6 py-2 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_#0F0F12] mb-12 skew-btn">
             <span className="skew-btn-content italic">La Nostra Missione</span>
           </div>
           <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-6xl md:text-7xl font-black italic uppercase leading-[0.9] tracking-tighter mb-10" style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '4px 4px 0px #0F0F12' }}>
             BAB è la tua coach<br className="hidden sm:block"/> fuori dal campo.
           </h2>
           <p className="font-bold text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-4xl mx-auto border-l-[4px] border-[#FFDE4D] pl-6 md:pl-10 text-left bg-black/20 p-6 md:p-8 backdrop-blur-sm shadow-[inset_4px_4px_0_0_rgba(0,0,0,0.5)]">
             Ti insegna ad ascoltare il tuo corpo, capire i suoi segnali e fare scelte che ti fanno stare bene — per sapere quando dare il massimo e quando recuperare. <span className="text-[#DAE993]">Per continuare a fare sport e divertirti, performando al meglio e sentendoti meglio.</span>
           </p>
        </div>
        
        {/* Background Decorative Doodles */}
        <svg className="absolute top-0 right-0 w-64 h-64 text-[#FFDE4D] opacity-20 -rotate-12 translate-x-1/4 -translate-y-1/4" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="4" />
        </svg>
      </section>

      {/* 2. BIVIO SCELTA (IL MODELLO FINANZ) */}
      <section className="w-full px-4 py-24 mb-16 relative bg-[#121212] text-white border-y-[4px] border-black shadow-[0_8px_0_0_#FFDE4D]">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-16 relative z-10">
            <div className="relative inline-block skew-btn">
              <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-5xl lg:text-6xl font-black italic text-center uppercase tracking-tighter bg-[#FFDE4D] border-[4px] border-black px-8 py-3 relative text-[#0F0F12] m-0 shadow-[8px_8px_0_0_#34BBC0]">
                <span className="skew-btn-content pr-2">{t('home.costBadge')}</span>
              </h2>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 w-full relative z-10 text-[#0F0F12]">
            {/* Vecchio Metodo */}
            <div 
              onClick={() => setBivioState('vecchio')}
              className={`flex-1 transition-all cursor-pointer relative p-2 md:p-3 border-[4px] border-black ${bivioState === 'vecchio' ? 'bg-[#FFDE4D] shadow-[8px_8px_0_0_#FFDE4D] scale-100 z-10' : 'bg-[#3B4A6B] shadow-[4px_4px_0_0_#0F0F12] scale-95 opacity-80 hover:opacity-100'}`}
            >
              <div className={`h-full p-6 sm:p-8 border-[3px] border-black crosshairs ${bivioState === 'vecchio' ? 'bg-[#FAF9F6]' : 'bg-[#121212] text-white'}`}>
                <div className="flex justify-between items-center mb-8 border-b-[3px] border-current pb-4">
                  <h3 className="font-['Bricolage_Grotesque',_sans-serif] italic text-3xl font-black uppercase tracking-tight">{t('home.oldMethod')}</h3>
                </div>
                <ul className="space-y-6 font-bold text-lg">
                  <li className="flex gap-4"><span className="text-[#FF5722] font-black italic">01.</span> {t('home.old1')}</li>
                  <li className="flex gap-4"><span className="text-[#FF5722] font-black italic">02.</span> {t('home.old2')}</li>
                  <li className="flex gap-4"><span className="text-[#FF5722] font-black italic">03.</span> {t('home.old3')}</li>
                </ul>
              </div>
            </div>

            {/* Metodo BAB */}
            <div 
              onClick={() => setBivioState('bab')}
              className={`flex-1 transition-all duration-500 cursor-pointer relative p-2 md:p-3 border-[4px] border-black ${bivioState === 'bab' ? 'bg-[#FFDE4D] shadow-[8px_8px_0_0_#FFDE4D] scale-100 z-10' : 'bg-[#3B4A6B] shadow-[4px_4px_0_0_#0F0F12] scale-95 opacity-80 hover:opacity-100 hover:scale-[0.98]'}`}
            >
              <div className={`h-full p-6 sm:p-8 border-[3px] border-black flex flex-col justify-between crosshairs ${bivioState === 'bab' ? 'bg-[#FAF9F6] text-[#0F0F12]' : 'bg-[#121212] text-white'}`}>
                <div>
                  <div className="flex justify-between items-center mb-8 border-b-[3px] border-current pb-4 relative">
                    <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl italic font-black uppercase tracking-tight relative z-10 bg-inherit pr-4">{t('home.babMethod')}</h3>
                    <div className="telemetry-line"></div>
                  </div>
                  <ul className="space-y-6 font-bold text-lg mb-8">
                    <li className="flex gap-4 items-center"><span className="text-[#34BBC0] font-black italic text-2xl">SYS.</span> {t('home.bab1')}</li>
                    <li className="flex gap-4 items-center"><span className="text-[#34BBC0] font-black italic text-2xl">OP.</span> {t('home.bab2')}</li>
                    <li className="flex gap-4 items-center"><span className="text-[#34BBC0] font-black italic text-2xl">LOG.</span> {t('home.bab3')}</li>
                  </ul>
                </div>
                
                <div className={`flex flex-col sm:flex-row gap-4 mt-auto transition-all duration-500 origin-top ${bivioState === 'bab' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                   <a href="#/app" className="y2k-btn bg-[#FFDE4D] text-[#0F0F12] text-xs text-center flex-1 transition-colors duration-300 italic skew-btn"><span className="skew-btn-content">{t('home.testAppBtn')}</span></a>
                   <a href="#/coach" className="y2k-btn bg-[#FFDE4D] text-[#0F0F12] text-xs text-center flex-1 transition-colors duration-300 italic skew-btn"><span className="skew-btn-content">{t('home.testCoachBtn')}</span></a>
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
            <p className="text-xl font-bold mb-8 max-w-3xl text-[#0F0F12]">{t('home.dataSubtitle')}</p>
          </div>
          
          <div className="w-full md:w-1/3 shrink-0 hidden md:block">
            <div className="w-full aspect-square border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12] skew-x-[4deg] crosshairs relative overflow-hidden bg-white">
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
               <div className="skew-x-[6deg]">
                 <span className="font-['Space_Grotesk',_sans-serif] text-7xl font-black italic text-[#FFDE4D] mb-4 block" style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '4px 4px 0px #0F0F12' }}>{t('home.data1Val')}</span>
                 <p className="font-bold uppercase text-sm tracking-tight border-l-[4px] border-black pl-3">{t('home.data1Desc')}</p>
               </div>
            </div>
            <div className="bg-white border-[4px] border-black p-8 shadow-[6px_6px_0_0_#0F0F12] relative crosshairs skew-x-[-6deg]">
               <div className="skew-x-[6deg]">
                 <span className="font-['Space_Grotesk',_sans-serif] text-7xl font-black italic text-[#3B4A6B] mb-4 block" style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '4px 4px 0px #0F0F12' }}>{t('home.data2Val')}</span>
                 <p className="font-bold uppercase text-sm tracking-tight border-l-[4px] border-black pl-3">{t('home.data2Desc')}</p>
               </div>
            </div>
            <div className="bg-white border-[4px] border-black p-8 shadow-[6px_6px_0_0_#0F0F12] relative crosshairs skew-x-[-6deg]">
               <div className="skew-x-[6deg]">
                 <span className="font-['Space_Grotesk',_sans-serif] text-7xl font-black italic text-[#34BBC0] mb-4 block" style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '4px 4px 0px #0F0F12' }}>{t('home.data3Val')}</span>
                 <p className="font-bold uppercase text-sm tracking-tight border-l-[4px] border-black pl-3">{t('home.data3Desc')}</p>
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
            Cosa dice la Community<br className="hidden sm:block"/> del futuro di BAB
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
          {testimonials.map((t, i) => {
            return (
              <div key={i} className={`snap-center shrink-0 w-[85vw] max-w-[400px] flex flex-col justify-between ${t.color} text-[#0F0F12] border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12] p-8 sm:p-10 transition-transform skew-x-[-2deg] crosshairs hover:-translate-y-2`}>
                <div className="telemetry-line"></div>
                <p className="text-base sm:text-lg font-bold leading-relaxed mb-8 border-l-[4px] border-black pl-4 sm:pl-6 relative skew-x-[2deg]">
                  <span className="absolute -left-3 -top-3 text-4xl opacity-20 font-serif font-black">"</span>
                  {t.quote}
                </p>
                <div className="border-t-[3px] border-black pt-4 mt-auto skew-x-[2deg]">
                  <h4 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl font-black italic uppercase leading-none mb-1">{t.name}</h4>
                  <p className="text-xs font-black italic uppercase tracking-widest opacity-80">{t.role}</p>
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
            className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-6xl font-black italic uppercase leading-tight text-[#3B4A6B] tracking-tighter skew-x-[6deg]" 
            style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '4px 4px 0px #0F0F12' }}
            dangerouslySetInnerHTML={{__html: t('home.footerTitle')}}
          />
        </div>

        <div className="bg-white text-[#0F0F12] border-[4px] border-black p-8 sm:p-12 text-left shadow-[8px_8px_0_0_#0F0F12] relative max-w-3xl mx-auto skew-x-[-2deg] crosshairs">
           <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl font-black italic uppercase mb-6 bg-black text-[#FFDE4D] inline-block px-4 py-2 tracking-tight skew-btn"><span className="skew-btn-content">{t('home.privacyTitle')}</span></h3>
           <p className="font-bold text-lg leading-relaxed mb-6 skew-x-[2deg]">
             {t('home.privacy1')}
           </p>
           <div className="skew-x-[2deg]">
             <p className="font-bold text-lg leading-relaxed bg-[#EBE5FF] border-[3px] border-black p-4 shadow-[4px_4px_0_0_#0F0F12] border-l-[8px] border-l-[#34BBC0]">
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
             <a href="https://substack.com/@babcommunity" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5722] transition-colors underline decoration-2 underline-offset-4">Substack</a>
             <a href="https://www.instagram.com/bab_community/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5722] transition-colors underline decoration-2 underline-offset-4">Instagram</a>
          </div>
          <div className="font-black uppercase tracking-widest text-xs text-[#0F0F12]/60">
            {t('home.footerTags')}<br/><br/>
            © 2026 BAB. All Rights Reserved.
          </div>
        </div>
      </section>

    </div>
  );
}
