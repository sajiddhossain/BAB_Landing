import { useState } from 'react';
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

  const testimonials = [
    {
      name: "Lisa Gutfleisch",
      role: t('testimonials.lisa.role'),
      quote: t('testimonials.lisa.quote'),
      color: "bg-[#FFDE4D]"
    },
    {
      name: "Alisha Menon",
      role: t('testimonials.alisha.role'),
      quote: t('testimonials.alisha.quote'),
      color: "bg-[#D1FFEF]"
    },
    {
      name: "Vasundhara P.",
      role: t('testimonials.vasundhara.role'),
      quote: t('testimonials.vasundhara.quote'),
      color: "bg-[#FFE3D1]"
    },
    {
      name: "Erica Sali",
      role: t('testimonials.erica.role'),
      quote: t('testimonials.erica.quote'),
      color: "bg-[#EBE5FF]"
    }
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen text-[#0F0F12]">
      
      {/* 1. HERO SECTION */}
      <section className="w-full min-h-[calc(100vh-80px)] max-w-6xl mx-auto px-4 py-8 md:py-12 flex items-center justify-center relative overflow-hidden">
        
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
              className="inline-block px-3 py-1 bg-[#EBE5FF] border-[2px] md:border-[3px] border-black text-[#0F0F12] font-black text-[10px] sm:text-xs tracking-widest uppercase mb-4 sm:mb-6 shadow-[4px_4px_0_0_#0F0F12] -rotate-1"
            >
              {t('home.badge')}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="font-['Bricolage_Grotesque',_sans-serif] text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tighter w-full relative text-[#0F0F12]"
            >
              {t('home.heroTitle')}<br/>
              <span className="inline-block relative z-10 mt-3 px-4 sm:px-6 py-2 -rotate-2 bg-[#34BBC0] border-[3px] md:border-[4px] border-black shadow-[4px_4px_0_0_#0F0F12] md:shadow-[6px_6px_0_0_#0F0F12] text-white">
                 {t('home.heroHighlight')}
              </span>
              
              {/* Hand-drawn Doodle Arrow (Desktop) */}
              <svg className="hidden lg:block absolute right-0 -bottom-8 w-16 h-16 text-[#0F0F12] rotate-12 opacity-70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10 Q 50 50 90 90 M 60 90 L 90 90 L 90 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.h1>

            {/* IMMAGINE MOBILE (Nascosta su Desktop) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full flex justify-center mb-8 lg:hidden"
            >
              <div className="w-full max-w-[280px] sm:max-w-[320px] bg-white border-[4px] border-white p-2 shadow-[8px_8px_0_0_#0F0F12] rotate-2 relative">
                <div className="washi-tape washi-black w-20 -top-3 left-1/2 -translate-x-1/2 -rotate-2"></div>
                <img 
                  src="/fotobab/HY2jAVYB5JU8HdxplxBzkh8TQo.avif" 
                  alt="BAB Atlete" 
                  className="w-full max-h-[250px] aspect-[4/5] sm:aspect-auto object-cover border-[3px] border-black grayscale"
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
                 className={`w-full sm:flex-1 py-3 sm:py-2 px-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-[2px] border-transparent ${heroTarget === 'allenatore' ? 'bg-[#FFDE4D] border-black shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.1)]' : 'hover:bg-gray-100'}`}
               >
                 {t('home.coachBtn')}
               </button>
               <button 
                 onClick={() => setHeroTarget('genitore')}
                 className={`w-full sm:flex-1 py-3 sm:py-2 px-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-[2px] border-transparent ${heroTarget === 'genitore' ? 'bg-[#34BBC0] text-white border-black shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.2)]' : 'hover:bg-gray-100'}`}
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
                className="w-full sm:w-auto font-['Space_Grotesk',_sans-serif] font-black text-lg bg-[#FFDE4D] border-[3px] md:border-[4px] border-black px-6 md:px-8 py-3 md:py-4 shadow-[6px_6px_0_0_#0F0F12] hover:shadow-[2px_2px_0_0_#0F0F12] hover:translate-y-1 transition-all duration-300 uppercase relative group overflow-hidden"
              >
                <span className="relative z-10">{t('home.waitlistBtn')}</span>
                <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">{t('home.waitlistBtn')}</span>
              </button>
              <div 
                className="font-['Space_Grotesk',_sans-serif] font-black text-[10px] sm:text-xs bg-[#EBE5FF] border-[2px] md:border-[3px] border-black px-3 md:px-4 py-2 shadow-[4px_4px_0_0_#0F0F12] -rotate-1 cursor-default text-center"
                dangerouslySetInnerHTML={{__html: t('home.appTag').replace('\n', '<br/>')}}
              />
            </motion.div>
          </motion.div>

          {/* COLONNA DESTRA (Span 5 - Solo Desktop) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="lg:col-span-5 w-full justify-center hidden lg:flex relative text-[#0F0F12]"
          >
            <div className="w-full max-w-md bg-white border-[4px] border-white p-2 shadow-[12px_12px_0_0_#0F0F12] rotate-3 hover:rotate-1 transition-transform duration-500 relative group">
              <div className="washi-tape washi-black w-24 -top-3 left-1/2 -translate-x-1/2 -rotate-3 z-10"></div>
              <img 
                src="/fotobab/HY2jAVYB5JU8HdxplxBzkh8TQo.avif" 
                alt="BAB Atlete" 
                className="w-full aspect-[4/5] object-cover border-[3px] border-black grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              
              {/* Floating Widget (Neobrutalism) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-[#DAE69A] border-[3px] border-black p-3 shadow-[6px_6px_0_0_#0F0F12] -rotate-3 z-20 hidden sm:flex items-center gap-3 group-hover:-translate-y-2 group-hover:rotate-0 transition-all duration-300"
              >
                <div className="bg-white rounded-full border-2 border-black w-10 h-10 flex items-center justify-center text-xl shadow-[2px_2px_0_0_#000]">
                  📉
                </div>
                <div>
                  <p className="font-['Bricolage_Grotesque',_sans-serif] font-black leading-none text-sm uppercase">{t('home.widgetTitle')}</p>
                  <p className="font-['Space_Grotesk',_sans-serif] font-bold text-xs">{t('home.widgetDesc')}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. BIVIO SCELTA (IL MODELLO FINANZ) */}
      <section className="w-full max-w-5xl px-4 py-16 mx-auto mb-16 relative text-[#0F0F12]">
        <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-5xl lg:text-6xl font-black text-center uppercase mb-16 relative z-10 tracking-tighter">
          <span className="bg-white border-[3px] border-black px-6 py-2 shadow-[6px_6px_0_0_#0F0F12] inline-block -rotate-1 text-[#0F0F12]">{t('home.costBadge')}</span>
        </h2>
        
        {/* Doodle connector between cards */}
        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-black opacity-30 z-0 hidden sm:block" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 50 Q 50 10 90 50 T 10 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8 8"/>
        </svg>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 w-full relative z-10 text-[#0F0F12]">
          {/* Vecchio Metodo */}
          <div 
            onClick={() => setBivioState('vecchio')}
            className={`flex-1 p-8 sm:p-10 border-[4px] border-black transition-all cursor-pointer relative ${bivioState === 'vecchio' ? 'bg-[#FFE3D1] shadow-[8px_8px_0_0_#0F0F12] rotate-0 scale-100 z-10' : 'bg-white/90 backdrop-blur-sm shadow-[4px_4px_0_0_#0F0F12] -rotate-2 scale-95 opacity-80 hover:opacity-100 hover:rotate-0'}`}
          >
            <div className="washi-tape washi-yellow w-20 -top-3 left-1/2 -translate-x-1/2 rotate-3"></div>
            <div className="flex justify-between items-center mb-8 border-b-[3px] border-black pb-4">
              <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl font-black uppercase tracking-tight">{t('home.oldMethod')}</h3>
              <span className="text-4xl">❌</span>
            </div>
            <ul className="space-y-6 font-bold text-lg">
              <li className="flex gap-4"><span className="text-rose-500 font-black">1.</span> {t('home.old1')}</li>
              <li className="flex gap-4"><span className="text-rose-500 font-black">2.</span> {t('home.old2')}</li>
              <li className="flex gap-4"><span className="text-rose-500 font-black">3.</span> {t('home.old3')}</li>
            </ul>
          </div>

          {/* Metodo BAB */}
          <div 
            onClick={() => setBivioState('bab')}
            className={`flex-1 p-8 sm:p-10 border-[4px] border-black transition-all duration-500 cursor-pointer flex flex-col justify-between relative ${bivioState === 'bab' ? 'bg-[#DAE69A] shadow-[8px_8px_0_0_#0F0F12] rotate-1 scale-100 z-10' : 'bg-white/90 backdrop-blur-sm shadow-[4px_4px_0_0_#0F0F12] rotate-3 scale-95 opacity-80 hover:opacity-100 hover:scale-[0.98] hover:rotate-1'}`}
          >
            <div className="washi-tape washi-purple w-20 -top-3 right-8 -rotate-2"></div>
            <div>
              <div className="flex justify-between items-center mb-8 border-b-[3px] border-black pb-4">
                <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl font-black uppercase tracking-tight">{t('home.babMethod')}</h3>
                <span className={`text-4xl transition-transform duration-500 ${bivioState === 'bab' ? 'scale-125 rotate-12' : ''}`}>💚</span>
              </div>
              <ul className="space-y-6 font-bold text-lg mb-8">
                <li className="flex gap-4 items-center"><span className="text-[#34BBC0] font-black text-2xl">✓</span> {t('home.bab1')}</li>
                <li className="flex gap-4 items-center"><span className="text-[#34BBC0] font-black text-2xl">✓</span> {t('home.bab2')}</li>
                <li className="flex gap-4 items-center"><span className="text-[#34BBC0] font-black text-2xl">✓</span> {t('home.bab3')}</li>
              </ul>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-4 mt-auto transition-all duration-500 origin-top ${bivioState === 'bab' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
               <a href="#/app" className="y2k-btn bg-white text-xs text-center flex-1 hover:bg-[#34BBC0] hover:text-white transition-colors duration-300">{t('home.testAppBtn')}</a>
               <a href="#/coach" className="y2k-btn bg-white text-xs text-center flex-1 hover:bg-[#FFDE4D] transition-colors duration-300">{t('home.testCoachBtn')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DATA THAT BREAK BARRIERS */}
      <section className="w-full bg-[#EBE5FF] border-y-[4px] border-black py-20 px-4 my-16 relative overflow-hidden text-[#0F0F12]">
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="inline-block bg-white text-[#0F0F12] border-[3px] border-black px-4 py-2 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_#0F0F12] mb-8">
              {t('home.dataBadge')}
            </div>
            <h2 
              className="font-['Bricolage_Grotesque',_sans-serif] text-[#0F0F12] text-4xl sm:text-6xl font-black leading-tight uppercase mb-6 tracking-tighter"
              dangerouslySetInnerHTML={{__html: t('home.dataTitle')}}
            />
            <p className="text-xl font-bold mb-8 max-w-3xl text-[#0F0F12]">{t('home.dataSubtitle')}</p>
          </div>
          
          <div className="w-full md:w-1/3 shrink-0 hidden md:block">
            <img 
              src="/fotobab/VdqkhgkqBx24EcakOTkAIdtMLaw.avif" 
              alt="Atleta BAB" 
              className="w-full aspect-square object-cover border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12] rotate-3 grayscale hover:grayscale-0 transition-all duration-300" 
            />
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto mt-12 relative z-10 text-[#0F0F12]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 relative">
            {/* SVG Zigzag Connector */}
            <svg className="absolute top-1/2 left-0 w-full h-8 -translate-y-1/2 text-[#0F0F12] opacity-30 -z-10 hidden sm:block" viewBox="0 0 100 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10 L 20 0 L 40 20 L 60 0 L 80 20 L 100 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            
            <div className="bg-white border-[4px] border-black p-8 shadow-[6px_6px_0_0_#0F0F12] rotate-1 relative">
               <div className="washi-tape washi-yellow w-12 -top-3 left-6 -rotate-6"></div>
               <span className="font-['Bricolage_Grotesque',_sans-serif] text-7xl font-black text-[#FFDE4D] mb-4 block" style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '4px 4px 0px #0F0F12' }}>{t('home.data1Val')}</span>
               <p className="font-bold uppercase text-sm tracking-tight">{t('home.data1Desc')}</p>
            </div>
            <div className="bg-white border-[4px] border-black p-8 shadow-[6px_6px_0_0_#0F0F12] -rotate-2 relative">
               <div className="washi-tape washi-peach w-12 -bottom-3 right-6 rotate-6"></div>
               <span className="font-['Bricolage_Grotesque',_sans-serif] text-7xl font-black text-[#34BBC0] mb-4 block" style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '4px 4px 0px #0F0F12' }}>{t('home.data2Val')}</span>
               <p className="font-bold uppercase text-sm tracking-tight">{t('home.data2Desc')}</p>
            </div>
            <div className="bg-white border-[4px] border-black p-8 shadow-[6px_6px_0_0_#0F0F12] rotate-2 relative">
               <div className="washi-tape washi-purple w-12 -top-3 left-1/2 -translate-x-1/2 rotate-1"></div>
               <span className="font-['Bricolage_Grotesque',_sans-serif] text-7xl font-black text-[#DAE69A] mb-4 block" style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '4px 4px 0px #0F0F12' }}>{t('home.data3Val')}</span>
               <p className="font-bold uppercase text-sm tracking-tight">{t('home.data3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WAITLIST (Global popup is now used instead) */}

      {/* 5. TESTIMONIALS */}
      <section className="w-full py-24 px-4 text-[#0F0F12]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-[#0F0F12] text-4xl sm:text-6xl font-black uppercase mb-16 text-center max-w-4xl mx-auto leading-tight tracking-tighter">
            {t('home.testimonialsTitle')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 masonry-like">
            {testimonials.map((t, i) => (
               <div key={i} className={`${t.color} text-[#0F0F12] border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12] p-8 sm:p-10 hover:-translate-y-2 transition-transform ${i % 2 !== 0 ? 'md:mt-16' : ''}`}>
                 <div className="washi-tape washi-black w-24 -top-3 right-10 rotate-3"></div>
                 <p className="text-lg sm:text-xl font-bold leading-relaxed mb-8 border-l-[4px] border-black pl-6">
                   "{t.quote}"
                 </p>
                 <div className="border-t-[3px] border-black pt-4">
                   <h4 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl font-black uppercase">{t.name}</h4>
                   <p className="text-sm font-black uppercase tracking-widest opacity-70 mt-1">{t.role}</p>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 FAQ SECTION */}
      <FAQ />

      {/* 6. FOOTER / MANIFESTO */}
      <section className="w-full max-w-4xl mx-auto px-4 py-24 text-center relative text-[#0F0F12]">
        
        {/* Doodle abstract bg for the footer title */}
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-64 opacity-20 -z-10 pointer-events-none" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFDE4D" d="M10 50 Q 50 0 150 50 T 190 50 Q 100 100 10 50 Z" />
        </svg>

        <div className="mb-16 inline-block bg-white border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12] p-8 sm:p-12 -rotate-1 relative">
          <div className="washi-tape washi-black w-32 -top-3 left-1/2 -translate-x-1/2 rotate-1"></div>
          <h2 
            className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-6xl font-black uppercase leading-tight text-[#34BBC0] tracking-tighter" 
            style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '4px 4px 0px #0F0F12' }}
            dangerouslySetInnerHTML={{__html: t('home.footerTitle')}}
          />
        </div>

        <div className="bg-white text-[#0F0F12] border-[4px] border-black p-8 sm:p-12 text-left shadow-[8px_8px_0_0_#0F0F12] rotate-1 relative max-w-3xl mx-auto">
           <div className="washi-tape washi-lime w-20 -top-3 left-8 -rotate-3"></div>
           <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl font-black uppercase mb-6 bg-black text-white inline-block px-4 py-2 -rotate-1 tracking-tight">{t('home.privacyTitle')}</h3>
           <p className="font-bold text-lg leading-relaxed mb-6">
             {t('home.privacy1')}
           </p>
           <p className="font-bold text-lg leading-relaxed bg-[#EBE5FF] border-[3px] border-black p-4 rotate-1 shadow-[4px_4px_0_0_#0F0F12]">
             {t('home.privacy2')}
           </p>
        </div>

        <div className="mt-20 border-t-[3px] border-black/20 pt-12 border-dashed flex flex-col items-center gap-6 relative text-center">
          <img src="/BAB_logo.svg" alt="BAB Logo" className="h-10 md:h-12 mb-2" />
          <p className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black max-w-lg mb-2 text-[#0F0F12]">
             {t('home.motto')}
          </p>
          <div className="flex gap-6 font-bold uppercase tracking-widest text-sm mb-4">
             <a href="https://substack.com/@babcommunity" target="_blank" rel="noopener noreferrer" className="hover:text-[#34BBC0] transition-colors underline decoration-2 underline-offset-4">Substack</a>
             <a href="https://www.instagram.com/bab_community/" target="_blank" rel="noopener noreferrer" className="hover:text-[#34BBC0] transition-colors underline decoration-2 underline-offset-4">Instagram</a>
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
