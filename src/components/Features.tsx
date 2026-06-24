import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import BabBuddy from './BabBuddy';

export default function Features() {
 const { t } = useTranslation();
 const [tamagotchiState, setTamagotchiState] = useState<'default' | 'active' | 'down'>('default');

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
 <span className="inline-block bg-[#EBE5FF] border-[3px] border-black text-[#0F0F12] font-black text-xs tracking-widest uppercase mb-6 px-4 py-1.5 shadow-[4px_4px_0_0_#0F0F12] ">
 <span className="block ">{t('features.badge')}</span>
 </span>
 <h1 
 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-7xl font-black leading-none uppercase drop-shadow-[3px_3px_0_rgba(15,15,18,1)] md:drop-shadow-[6px_6px_0_rgba(15,15,18,1)] text-[#34BBC0] tracking-tighter" style={{ WebkitTextStroke: '2.5px #0F0F12', paintOrder: 'stroke' }} dangerouslySetInnerHTML={{__html: t('features.title')}}
 />
 </div>

 {/* Flusso Moduli (Neobrutalism Layout - Scrapbook Timeline) */}
 <div className="relative flex flex-col gap-16 mb-24 w-full">
 
 {/* Vertical Timeline String */}
 <div className="absolute left-10 md:left-24 top-0 bottom-0 w-1 bg-black opacity-20 hidden sm:block border-l-[4px] border-dashed border-[#0F0F12]"></div>

 {modules.map((m, idx) => {
 const colors = [
 { bg: 'bg-[#D2EC7C]', text: 'text-[#0F0F12]', shadow: 'shadow-[6px_6px_0_0_#0F0F12]', rot: 'rotate-[-2deg]' },
 { bg: 'bg-[#34BBC0]', text: 'text-[#0F0F12]', shadow: 'shadow-[6px_6px_0_0_#0F0F12]', rot: 'rotate-[1deg]' },
 { bg: 'bg-[#FF6B5C]', text: 'text-[#0F0F12]', shadow: 'shadow-[6px_6px_0_0_#0F0F12]', rot: 'rotate-[-1deg]' },
 { bg: 'bg-[#EBE5FF]', text: 'text-[#0F0F12]', shadow: 'shadow-[6px_6px_0_0_#0F0F12]', rot: 'rotate-[2deg]' },
 { bg: 'bg-[#0F0F12]', text: 'text-[#D2EC7C]', shadow: 'shadow-[6px_6px_0_0_#34BBC0]', rot: 'rotate-[0deg]' },
 ];
 const theme = colors[idx % colors.length];

 return (
 <motion.div 
 key={idx} 
 initial={{ opacity: 0, y: 50 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-40px" }}
 transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1], delay: idx * 0.05 }}
 className={`w-full relative z-10 p-2 md:p-3 bg-neutral-300 border-[4px] border-black shadow-[12px_12px_0_0_#0F0F12] `}
 >
 <div className={`flex flex-col gap-6 items-start w-full bg-[#FAF9F6] border-[3px] border-black p-6 sm:p-10 text-[#0F0F12] h-full `}>
 
 <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start w-full">
 <div className={`${theme.bg} ${theme.text} ${theme.shadow} border-[3px] border-black px-6 py-6 flex flex-col items-center justify-center shrink-0 relative ${theme.rot} min-w-[120px] transition-transform hover:scale-105 duration-300`}>
 {/* Faux paper hole punches */}
 <div className="absolute top-4 left-3 w-3 h-3 rounded-full bg-black/10 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6)]"></div>
 <div className="absolute top-4 right-3 w-3 h-3 rounded-full bg-black/10 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6)]"></div>
 
 <span className="font-['Space_Grotesk',_sans-serif] text-5xl sm:text-7xl font-black leading-none tracking-tighter" style={{ WebkitTextStroke: theme.bg === 'bg-[#0F0F12]' ? '1.5px #D2EC7C' : '2px #0F0F12' }}>
 {m.num}
 </span>
 <span className={`text-[10px] font-black uppercase tracking-widest border-t-[2px] ${theme.bg === 'bg-[#0F0F12]' ? 'border-[#D2EC7C]' : 'border-black'} mt-4 pt-2 w-full text-center opacity-90`}>
 BAB ATHLETE
 </span>
 </div>
 <div className="mt-2 w-full">
 <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-5xl font-black mb-4 uppercase text-[#0F0F12] tracking-tight">{m.title}</h3>
 <p className="font-['Space_Grotesk',_sans-serif] font-extrabold text-lg sm:text-xl leading-relaxed border-l-[4px] border-black pl-4 sm:pl-6 bg-white/70">{m.desc}</p>
 </div>
 </div>

 {m.hasWidget && (
 <div className="bg-white border-[4px] border-black p-6 flex flex-col items-center gap-6 shadow-[inset_6px_6px_0_rgba(0,0,0,0.1)] w-full mt-4 relative overflow-hidden">
 {/* Telemetry Micro-Data */}
 <div className="absolute top-3 left-3 text-[10px] sm:text-xs font-black font-['Space_Grotesk',_sans-serif] bg-[#D2EC7C] border-[2px] border-black px-1.5 py-0.5 ">BPM: 142</div>
 <div className="absolute top-3 right-3 text-[10px] sm:text-xs font-black font-['Space_Grotesk',_sans-serif] bg-vividteal text-white border-[2px] border-black px-1.5 py-0.5 ">ZONA 4</div>
 <div className="absolute bottom-3 right-3 text-[10px] sm:text-xs font-black font-['Space_Grotesk',_sans-serif] border-b-[2px] border-black opacity-50 ">HRV: OK</div>
 
 <div className="z-10 mt-6 sm:mt-4 ">
 <BabBuddy
 mood={tamagotchiState === 'active' ? 'star' : tamagotchiState === 'down' ? 'sleepy' : 'happy'}
 bounce={tamagotchiState === 'active' ? 1 : tamagotchiState === 'down' ? 2 : 0}
 size={132}
 />
 </div>
 <div className="flex gap-4 ">
 <button onClick={() => setTamagotchiState('active')} className={`font-black text-xl px-6 py-2 border-[3px] border-black transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${tamagotchiState ==='active' ? 'bg-[#D2EC7C] translate-y-1 shadow-none' : 'bg-white border-b-[6px] hover:-translate-y-1 hover:shadow-[0_4px_0_0_#0F0F12] hover:text-vividteal active:border-b-[3px] active:translate-y-1 active:shadow-none'}`}>A</button>
 <button onClick={() => setTamagotchiState('default')} className={`font-black text-xl px-6 py-2 border-[3px] border-black transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${tamagotchiState ==='default' ? 'bg-[#D2EC7C] text-black translate-y-1 shadow-none' : 'bg-white border-b-[6px] hover:-translate-y-1 hover:shadow-[0_4px_0_0_#0F0F12] hover:text-vividteal active:border-b-[3px] active:translate-y-1 active:shadow-none'}`}>B</button>
 <button onClick={() => setTamagotchiState('down')} className={`font-black text-xl px-6 py-2 border-[3px] border-black transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${tamagotchiState ==='down' ? 'bg-[#D2EC7C] translate-y-1 shadow-none' : 'bg-white border-b-[6px] hover:-translate-y-1 hover:shadow-[0_4px_0_0_#0F0F12] hover:text-vividteal active:border-b-[3px] active:translate-y-1 active:shadow-none'}`}>C</button>
 </div>
 <div className="text-xs font-black uppercase tracking-widest text-center mt-2 border-t-[3px] border-black pt-4 w-full ">
 {t('features.testBuddy')}
 </div>
 </div>
 )}
 </div>
 </motion.div>
 );
 })}
 </div>

 {/* FAQ rimosse da /features (le FAQ restano sulla home). */}

 </div>

 {/* Privacy & Research (spostato qui dalla home) */}
 <section className="w-full max-w-3xl mx-auto mt-16">
 <div className="bg-white text-[#0F0F12] border-[4px] border-black p-8 sm:p-12 text-left shadow-[8px_8px_0_0_#0F0F12] relative crosshairs">
 <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl font-black uppercase mb-6 bg-black text-[#D2EC7C] inline-block px-4 py-2 tracking-tight">{t('home.privacyTitle')}</h3>
 <div className="font-['Space_Grotesk',_sans-serif] font-bold">
 <p className="text-lg leading-relaxed mb-6">{t('home.privacy1')}</p>
 <p className="text-lg leading-relaxed bg-[#EBE5FF] border-[3px] border-black p-4 shadow-[4px_4px_0_0_#0F0F12] border-l-[8px] border-l-[#34BBC0]">{t('home.privacy2')}</p>
 </div>
 </div>
 </section>
 </div>
 );
}
