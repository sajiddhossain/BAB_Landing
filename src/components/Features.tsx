/**
 * @file      Features.tsx
 * @summary   Componente UI per BAB (Breaking All Barriers)
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 * @notice    Questo codice è di proprietà intellettuale dell'autore. 
 *            L'utilizzo, la modifica o la distribuzione non autorizzata 
 *            sono severamente vietati in assenza di accordi contrattuali scritti.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Features() {
  const [tamagotchiState, setTamagotchiState] = useState<'default' | 'active' | 'down'>('default');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs = [
    { id: '1', q: "Come funziona la privacy dei dati biologici?", a: "Tutti i dati sensibili, inclusi quelli sul ciclo mestruale, sono criptati e salvati in locale sul telefono dell'atleta. L'allenatore vede solo aggregati anonimi o alert generici (es. 'Consigliato scarico')." },
    { id: '2', q: "È adatta a tutti gli sport?", a: "Sì, l'algoritmo di BAB si adatta ai carichi di lavoro specifici di sport di squadra (Calcio, Volley, Basket) e sport individuali." },
    { id: '3', q: "L'app è gratuita per le atlete?", a: "Sì, l'app mobile per le atlete è completamente gratuita. I club sportivi sottoscrivono l'abbonamento per l'accesso alla Coach Dashboard." },
  ];

  const modules = [
    { num: '01', title: 'TRACK', desc: "Monitor energy levels, sleep and mood, underpinned by menstrual health and growth metrics to build a complete picture of the athlete's wellbeing through longitudinal inputs", hasWidget: true },
    { num: '02', title: 'UNDERSTAND', desc: "Translate inputs into clear, simple and engaging language and deliver personalised, actionable insights and body literacy resources, delivered gradually, session by session", hasWidget: false },
    { num: '03', title: 'OPTIMISE', desc: "Balance performance with long-term physical and emotional wellbeing, through personalised, daily recommendations, delivered by clinical experts with the support of Al", hasWidget: false },
    { num: '04', title: 'PREVENT', desc: "Identify and flag warning signs early before they affect health, wellbeing, or performance", hasWidget: false },
    { num: '05', title: 'SUPPORT', desc: "Create a stronger support system around the athlete both on and off the field with dedicated tools for parents and coaches", hasWidget: false }
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen text-[#0F0F12] px-4 py-16">
      <div className="max-w-3xl mx-auto w-full">
        
        <div className="text-center mb-20">
          <span className="inline-block bg-[#EBE5FF] border-[3px] border-black text-black font-black text-xs tracking-widest uppercase mb-6 px-4 py-1.5 shadow-[4px_4px_0_0_#0F0F12] rotate-1">
            ✦ L'Ecosistema BAB ✦
          </span>
          <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-7xl font-black leading-none uppercase drop-shadow-[4px_4px_0_rgba(52,187,192,1)]">
            Performance<br/>x Salute
          </h1>
        </div>

        {/* Flusso Moduli (Neobrutalism Layout - Scrapbook Timeline) */}
        <div className="relative flex flex-col gap-16 mb-24 w-full">
          
          {/* Vertical Timeline String */}
          <div className="absolute left-10 md:left-24 top-0 bottom-0 w-1 bg-black opacity-20 hidden sm:block border-l-[4px] border-dashed border-black"></div>

          {modules.map((m, idx) => {
             const bgColors = ['bg-[#FFDE4D]', 'bg-[#EBE5FF]', 'bg-[#FFE3D1]', 'bg-white', 'bg-[#D1FFEF]'];
             const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1'];
             const tapes = ['washi-black', 'washi-peach', 'washi-yellow', 'washi-purple', 'washi-lime'];
             
             return (
               <div key={idx} className={`flex flex-col gap-6 items-start w-full relative ${rotations[idx]} hover:rotate-0 transition-transform duration-300 z-10 ${m.hasWidget ? 'bg-[#DAE69A]' : bgColors[idx]} border-[4px] border-black p-6 sm:p-10 shadow-[12px_12px_0_0_#0F0F12]`}>
                 <div className={`washi-tape ${tapes[idx]} w-24 -top-3 left-1/2 -translate-x-1/2`}></div>
                 
                 <div className="flex flex-col sm:flex-row gap-6 items-start w-full">
                   <div className="font-['Bricolage_Grotesque',_sans-serif] text-7xl sm:text-8xl font-black shrink-0 leading-none text-white" style={{ WebkitTextStroke: '3px #0F0F12', textShadow: '4px 4px 0px #0F0F12' }}>
                     {m.num}
                   </div>
                   <div className="mt-2 w-full">
                     <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-5xl font-black mb-4 uppercase text-[#34BBC0] drop-shadow-[2px_2px_0_rgba(15,15,18,1)]">{m.title}</h3>
                     <p className="font-['Space_Grotesk',_sans-serif] font-bold text-lg sm:text-xl leading-relaxed border-l-[4px] border-black pl-4 sm:pl-6 bg-white/50">{m.desc}</p>
                   </div>
                 </div>

                 {m.hasWidget && (
                   <div className="bg-white border-[4px] border-black p-6 flex flex-col items-center gap-6 shadow-[inset_6px_6px_0_rgba(0,0,0,0.1)] w-full mt-4 rotate-1">
                      <div className="text-6xl sm:text-8xl font-['Space_Grotesk',_sans-serif] text-black font-black mb-4 tracking-tighter">
                        {tamagotchiState === 'active' ? '[ °_° ]✨' : tamagotchiState === 'down' ? '[ =_= ]💤' : '[ °_° ]'}
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => setTamagotchiState('active')} className={`font-black text-xl px-6 py-2 border-[3px] border-black rounded-lg transition-all ${tamagotchiState === 'active' ? 'bg-[#FFDE4D] translate-y-1 shadow-none' : 'bg-white border-b-[6px] hover:-translate-y-1 hover:shadow-[0_4px_0_0_#000] active:border-b-[3px] active:translate-y-1 active:shadow-none'}`}>A</button>
                        <button onClick={() => setTamagotchiState('default')} className={`font-black text-xl px-6 py-2 border-[3px] border-black rounded-lg transition-all ${tamagotchiState === 'default' ? 'bg-[#34BBC0] translate-y-1 shadow-none' : 'bg-white border-b-[6px] hover:-translate-y-1 hover:shadow-[0_4px_0_0_#000] active:border-b-[3px] active:translate-y-1 active:shadow-none'}`}>B</button>
                        <button onClick={() => setTamagotchiState('down')} className={`font-black text-xl px-6 py-2 border-[3px] border-black rounded-lg transition-all ${tamagotchiState === 'down' ? 'bg-[#FFE3D1] translate-y-1 shadow-none' : 'bg-white border-b-[6px] hover:-translate-y-1 hover:shadow-[0_4px_0_0_#000] active:border-b-[3px] active:translate-y-1 active:shadow-none'}`}>C</button>
                      </div>
                      <div className="text-xs font-black uppercase tracking-widest text-center mt-2 border-t-[3px] border-black pt-4 w-full">
                        Testa lo stato del Buddy
                      </div>
                   </div>
                 )}
               </div>
             );
          })}
        </div>

        {/* FAQ Section Neobrutalism Folders */}
        <div className="pt-16 border-t-[4px] border-black">
          <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl font-black mb-12 text-center uppercase drop-shadow-[4px_4px_0_rgba(255,222,77,1)]">F.A.Q.</h3>
          <div className="flex flex-col gap-6">
            {faqs.map(faq => (
              <div key={faq.id} className="y2k-brutal-card bg-white overflow-hidden p-0 border-[3px] border-black shadow-[6px_6px_0_0_#0F0F12]">
                <button 
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className={`w-full px-6 py-5 flex justify-between items-center text-left border-b-[3px] border-transparent transition-all duration-300 ${openFaq === faq.id ? 'bg-[#FFDE4D] border-black' : 'hover:bg-neutral-100'}`}
                >
                  <span className="font-black uppercase pr-8 text-sm sm:text-base">{faq.q}</span>
                  <span className={`text-2xl font-black transition-transform duration-300 ease-in-out ${openFaq === faq.id ? 'rotate-45 scale-110' : 'rotate-0'}`}>
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === faq.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-6 font-bold text-sm leading-relaxed bg-[#FAF9F6] border-t-[3px] border-black">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
