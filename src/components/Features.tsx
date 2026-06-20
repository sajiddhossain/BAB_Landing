import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function Features() {
  const { t } = useTranslation();
  const [tamagotchiState, setTamagotchiState] = useState<'default' | 'active' | 'down'>('default');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs = [
    { id: '1', q: t('features.faqs.q1'), a: t('features.faqs.a1') },
    { id: '2', q: t('features.faqs.q2'), a: t('features.faqs.a2') },
    { id: '3', q: t('features.faqs.q3'), a: t('features.faqs.a3') },
  ];

  const modules = [
    { num: '01', title: t('features.modules.m1.title'), desc: t('features.modules.m1.desc'), hasWidget: true },
    { num: '02', title: t('features.modules.m2.title'), desc: t('features.modules.m2.desc'), hasWidget: false },
    { num: '03', title: t('features.modules.m3.title'), desc: t('features.modules.m3.desc'), hasWidget: false },
    { num: '04', title: t('features.modules.m4.title'), desc: t('features.modules.m4.desc'), hasWidget: false },
    { num: '05', title: t('features.modules.m5.title'), desc: t('features.modules.m5.desc'), hasWidget: false }
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen px-4 py-24 md:py-32 text-[#0F0F12]">
      <div className="max-w-3xl mx-auto w-full">
        
        <div className="text-center mb-20">
          <span className="inline-block bg-[#EBE5FF] border-[3px] border-black text-[#0F0F12] font-black text-xs tracking-widest uppercase mb-6 px-4 py-1.5 shadow-[4px_4px_0_0_#0F0F12] rotate-1">
            {t('features.badge')}
          </span>
          <h1 
            className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-7xl font-black leading-none uppercase drop-shadow-[4px_4px_0_rgba(15,15,18,1)] text-[#0F0F12] tracking-tighter"
            dangerouslySetInnerHTML={{__html: t('features.title')}}
          />
        </div>

        {/* Flusso Moduli (Neobrutalism Layout - Scrapbook Timeline) */}
        <div className="relative flex flex-col gap-16 mb-24 w-full">
          
          {/* Vertical Timeline String */}
          <div className="absolute left-10 md:left-24 top-0 bottom-0 w-1 bg-black opacity-20 hidden sm:block border-l-[4px] border-dashed border-[#0F0F12]"></div>

          {modules.map((m, idx) => {
             const bgColors = ['bg-[#FFDE4D]', 'bg-[#EBE5FF]', 'bg-[#FFE3D1]', 'bg-[#DAE69A]', 'bg-[#D1FFEF]'];
             const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1'];
             const tapes = ['washi-black', 'washi-peach', 'washi-yellow', 'washi-purple', 'washi-lime'];
             
             return (
               <motion.div 
                 key={idx} 
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: idx * 0.1 }}
                 className={`w-full relative ${rotations[idx]} z-10 p-2 md:p-3 bg-neutral-300 border-[4px] border-black shadow-[12px_12px_0_0_#0F0F12]`}
               >
                 <div className={`flex flex-col gap-6 items-start w-full bg-[#FAF9F6] border-[3px] border-black p-6 sm:p-10 hover:rotate-1 transition-transform duration-300 text-[#0F0F12] h-full`}>
                   <div className={`washi-tape ${tapes[idx]} w-24 -top-6 left-1/2 -translate-x-1/2`}></div>
                 
                 <div className="flex flex-col sm:flex-row gap-6 items-start w-full">
                   <div className="bg-white border-[3px] border-black px-6 py-4 flex flex-col items-center justify-center shrink-0 shadow-[4px_4px_0_0_#0F0F12] relative -rotate-2 hover:rotate-0 transition-transform">
                     <div className="absolute top-2 left-2 w-2 h-2 rounded-full border-[2px] border-black bg-neutral-200"></div>
                     <div className="absolute top-2 right-2 w-2 h-2 rounded-full border-[2px] border-black bg-neutral-200"></div>
                     <span className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-7xl font-black leading-none text-[#0F0F12] tracking-tighter">
                       {m.num}
                     </span>
                     <span className="text-[10px] font-black uppercase tracking-widest border-t-[2px] border-black mt-2 pt-1 w-full text-center">BAB ATHLETE</span>
                   </div>
                   <div className="mt-2 w-full">
                     <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-5xl font-black mb-4 uppercase text-[#0F0F12] tracking-tight">{m.title}</h3>
                     <p className="font-['Space_Grotesk',_sans-serif] font-bold text-lg sm:text-xl leading-relaxed border-l-[4px] border-black pl-4 sm:pl-6 bg-white/70">{m.desc}</p>
                   </div>
                 </div>

                 {m.hasWidget && (
                   <div className="bg-white border-[4px] border-black p-6 flex flex-col items-center gap-6 shadow-[inset_6px_6px_0_rgba(0,0,0,0.1)] w-full mt-4 rotate-1 relative overflow-hidden">
                      {/* Telemetry Micro-Data */}
                      <div className="absolute top-3 left-3 text-[10px] sm:text-xs font-black font-['Space_Grotesk',_sans-serif] bg-[#DAE993] border-[2px] border-black px-1.5 py-0.5">BPM: 142</div>
                      <div className="absolute top-3 right-3 text-[10px] sm:text-xs font-black font-['Space_Grotesk',_sans-serif] bg-[#34BBC0] text-white border-[2px] border-black px-1.5 py-0.5">ZONA 4</div>
                      <div className="absolute bottom-3 right-3 text-[10px] sm:text-xs font-black font-['Space_Grotesk',_sans-serif] border-b-[2px] border-black opacity-50">HRV: OK</div>
                      
                      <div className="text-6xl sm:text-8xl font-['Space_Grotesk',_sans-serif] text-black font-black mb-4 tracking-tighter z-10 mt-6 sm:mt-4">
                        {tamagotchiState === 'active' ? '[ °_° ]✨' : tamagotchiState === 'down' ? '[ =_= ]💤' : '[ °_° ]'}
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => setTamagotchiState('active')} className={`font-black text-xl px-6 py-2 border-[3px] border-black rounded-lg transition-all ${tamagotchiState === 'active' ? 'bg-[#FFDE4D] translate-y-1 shadow-none' : 'bg-white border-b-[6px] hover:-translate-y-1 hover:shadow-[0_4px_0_0_#000] hover:text-[#FF5722] active:border-b-[3px] active:translate-y-1 active:shadow-none'}`}>A</button>
                        <button onClick={() => setTamagotchiState('default')} className={`font-black text-xl px-6 py-2 border-[3px] border-black rounded-lg transition-all ${tamagotchiState === 'default' ? 'bg-[#FFDE4D] text-black translate-y-1 shadow-none' : 'bg-white border-b-[6px] hover:-translate-y-1 hover:shadow-[0_4px_0_0_#000] hover:text-[#FF5722] active:border-b-[3px] active:translate-y-1 active:shadow-none'}`}>B</button>
                        <button onClick={() => setTamagotchiState('down')} className={`font-black text-xl px-6 py-2 border-[3px] border-black rounded-lg transition-all ${tamagotchiState === 'down' ? 'bg-[#FFDE4D] translate-y-1 shadow-none' : 'bg-white border-b-[6px] hover:-translate-y-1 hover:shadow-[0_4px_0_0_#000] hover:text-[#FF5722] active:border-b-[3px] active:translate-y-1 active:shadow-none'}`}>C</button>
                      </div>
                      <div className="text-xs font-black uppercase tracking-widest text-center mt-2 border-t-[3px] border-black pt-4 w-full">
                        {t('features.testBuddy')}
                      </div>
                   </div>
                 </div>
               </motion.div>
             );
          })}
        </div>

        {/* FAQ Section Neobrutalism Folders */}
        <div className="pt-24 md:pt-32 border-t-[4px] border-black mt-16">
          <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl font-black mb-16 text-center uppercase drop-shadow-[4px_4px_0_rgba(15,15,18,1)] text-[#0F0F12] tracking-tighter">{t('features.faqsTitle')}</h3>
          <div className="flex flex-col gap-8">
            {faqs.map(faq => (
              <motion.div 
                key={faq.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="y2k-brutal-card bg-white text-[#0F0F12] overflow-hidden p-0 border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12]"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className={`w-full px-6 py-5 flex justify-between items-center text-left border-b-[3px] border-transparent transition-all duration-300 ${openFaq === faq.id ? 'bg-[#FFDE4D] border-black' : 'hover:bg-neutral-100 hover:text-[#FF5722]'}`}
                >
                  <span className="font-black uppercase pr-8 text-sm sm:text-base tracking-tight">{faq.q}</span>
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
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
