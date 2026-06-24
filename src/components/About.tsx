/**
 * @file About.tsx
 * @summary Pagina "Chi siamo": missione, storia di Mia, founder, community (i18n).
 * @author Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Doodle from './Doodle';

export default function About() {
 const { t } = useTranslation();

 const images = [
 "3AycctSWhDTcwrDl8YUS0jxhU.avif",
 "4TVwBEU1QFRvcfO9xe9DmcrDnk.avif",
 "HY2jAVYB5JU8HdxplxBzkh8TQo.avif",
 "Lk1n229r5pBnV0VjfyxuaNksAM8.avif",
 "VdqkhgkqBx24EcakOTkAIdtMLaw.avif",
 "XydzloXdRL8J9FrMqXFFS5kLMs.avif",
 "gn4nifj8VjjdDVeBKC8iUXQLM.avif",
 "s7ERbd0lTRYbrAOonOan3QUHnAI.avif"
 ];

 const stats = t('about.stats', { returnObjects: true }) as unknown as { val: string; label: string }[];
 const statColor = (i: number) => (i < 2 ? '#D2EC7C' : i < 4 ? '#D2EC7C' : '#34BBC0');

 return (
 <div className="flex flex-col items-center w-full min-h-screen text-[#0F0F12] px-4 py-24 md:py-32">
 <div className="max-w-5xl mx-auto w-full">

 {/* HERO MISSION */}
 <section className="mb-24 mt-10 relative">
 <div className="flex flex-col md:flex-row gap-8 items-center">

 <div className="flex-1 text-center md:text-left">
 <span className="inline-flex items-center gap-2 bg-[#D2EC7C] border-[3px] border-black text-black font-black text-xs tracking-widest uppercase mb-6 px-4 py-1.5 shadow-[4px_4px_0_0_#0F0F12] relative">
 <span className="block ">{t('about.missionBadge')}</span>
 </span>
 <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-7xl font-black leading-none uppercase drop-shadow-[4px_4px_0_rgba(52,187,192,1)] mb-6 break-words max-w-full">
 <span className="underline decoration-[#34BBC0] decoration-8 underline-offset-4">{t('about.titleWord')}</span><br/>{t('about.titleRest')}
 </h1>
 <p className="font-extrabold text-lg leading-relaxed border-l-[4px] border-black pl-4">
 {t('about.missionLead')}
 </p>
 </div>

 <div className="flex-1 w-full relative">
 {/* doodle: sparkle + freccia "scarabocchiata" sulla foto, come un diario */}
 <Doodle name="sparkle" className="absolute -top-5 -left-5 w-10 h-10 text-[#D2EC7C] drop-shadow-[2px_2px_0_#0F0F12] rotate-12 z-20" />
 <Doodle name="arrowCurl" className="hidden md:block absolute -bottom-8 -left-12 w-20 h-16 text-[#34BBC0] -rotate-12 z-20" stroke={3} />
 <div className="bg-white border-[4px] border-black p-2 shadow-[8px_8px_0_0_#0F0F12] relative">
 <img
 src="/fotobab/HY2jAVYB5JU8HdxplxBzkh8TQo.avif"
 alt={t('about.photoAlt')}
 className="w-full aspect-square md:aspect-video object-cover border-[3px] border-black transition-all duration-500"
 loading="lazy"
 />
 </div>
 </div>

 </div>
 </section>

 {/* THE STORY OF MIA */}
 <section className="mb-32 mt-6 relative overflow-hidden px-2 sm:px-4">
 <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0JyBoZWlnaHQ9JzQnPjxyZWN0IHdpZHRoPSc0JyBoZWlnaHQ9JzQnIGZpbGw9JyNmZmYnLz48cmVjdCB3aWR0aD0nMScgaGVpZ2h0PScxJyBmaWxsPScjY2NjJy8+PC9zdmc+')] opacity-50 -z-10" aria-hidden="true"></div>

 <div className="text-center mb-16 relative">
 <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-5xl lg:text-6xl font-black uppercase inline-block bg-[#D2EC7C] border-[3px] md:border-[4px] border-black px-8 py-3 shadow-[8px_8px_0_0_#0F0F12] relative z-10">
 <span className="block ">{t('about.storyBadge')}</span>
 </h2>
 </div>

 <div className="relative flex flex-col items-center gap-12 sm:gap-16 max-w-3xl mx-auto mb-20 font-['Space_Grotesk',_sans-serif] font-extrabold text-lg sm:text-xl leading-relaxed">
 {/* Linea tratteggiata che collega la storia */}
 <div className="absolute left-1/2 top-10 bottom-10 w-1 -translate-x-1/2 border-l-[4px] border-dashed border-[#0F0F12] opacity-30 z-0"></div>

 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
 className="relative self-start w-11/12 sm:w-4/5 transition-transform"
 >
 <div className="bg-black p-2 border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12]">
 <div className="bg-[#FAF9F6] border-[3px] border-black p-6 sm:p-8 h-full">
 {t('about.story1')}
 </div>
 </div>
 </motion.div>

 <Doodle name="arrow" className="self-center w-12 h-12 text-[#34BBC0] -rotate-[20deg]" stroke={3} />

 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1], delay: 0.05 }}
 className="relative self-end w-11/12 sm:w-4/5 transition-transform"
 >
 <div className="bg-black p-2 border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12]">
 <div className="bg-[#FAF9F6] border-[3px] border-black p-6 sm:p-8 h-full">
 {t('about.story2pre')}<span className="relative inline-block font-['Bricolage_Grotesque',_sans-serif] bg-black text-white px-3 py-0.5 mx-1 uppercase">
 {t('about.story2highlight')}
 </span>{t('about.story2post')}
 </div>
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
 className="relative w-64 sm:w-80 my-4 shadow-[12px_12px_0_0_#0F0F12] border-[4px] border-black bg-black group z-10 p-2 "
 >
 {/* doodle: decorazioni "da diario" attorno alla polaroid di Mia */}
 <Doodle name="sparkle" className="absolute -top-4 -right-4 w-10 h-10 text-[#D2EC7C] drop-shadow-[2px_2px_0_#0F0F12] rotate-12 z-20 pointer-events-none" />
 <Doodle name="heart" className="absolute -bottom-4 -left-5 w-10 h-10 text-[#FF6B5C] -rotate-12 z-20 drop-shadow-[2px_2px_0_#0F0F12] pointer-events-none" />
 <div className="bg-white p-2 sm:p-3 border-[3px] border-black ">
 <img src="/fotobab/mia.avif" alt={t('about.miaCaption')} className="w-full aspect-square object-cover object-[center_22%] border-[3px] border-black transition-all duration-500" loading="lazy" />
 <div className="p-4 font-['Bricolage_Grotesque',_sans-serif] text-center font-black uppercase text-xl text-neutral-500">{t('about.miaCaption')}</div>
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1], delay: 0.15 }}
 className="relative self-start w-11/12 sm:w-4/5 transition-transform"
 >
 <div className="bg-black p-2 border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12]">
 <div className="bg-[#FAF9F6] border-[3px] border-black p-6 sm:p-8 h-full">
 {t('about.story3')}
 </div>
 </div>
 </motion.div>

 <Doodle name="arrow" className="self-center w-12 h-12 text-[#34BBC0] rotate-[20deg] scale-x-[-1]" stroke={3} />

 <motion.div
 initial={{ opacity: 0, y: 50, scale: 0.95 }}
 whileInView={{ opacity: 1, y: 0, scale: 1 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
 className="relative w-full transition-transform"
 >
 <div className="bg-[#D2EC7C] p-2 md:p-3 border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12]">
 <div className="bg-[#0F0F12] text-white border-[3px] border-black p-8 sm:p-10 h-full">
 {t('about.story4pre')}<span className="underline decoration-4 underline-offset-4 decoration-[#D2EC7C]">{t('about.story4highlight')}</span>{t('about.story4post')}
 </div>
 </div>
 </motion.div>

 </div>

 <div className="text-center mb-24 relative">
 <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-auto -z-10 opacity-30" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
 <path fill="#D2EC7C" d="M42.7,-73.4C54.9,-66.3,64,-53.4,72.6,-40C81.2,-26.6,89.3,-13.3,88.7,-0.3C88.1,12.6,78.8,25.2,70.2,38C61.6,50.8,53.7,63.8,42.2,71.2C30.7,78.6,15.3,80.4,1.4,78C-12.5,75.6,-25,69,-37.2,61.8C-49.4,54.6,-61.3,46.8,-70.5,35.6C-79.7,24.4,-86.2,9.8,-85.4,-4.3C-84.6,-18.4,-76.5,-32,-66.4,-43C-56.3,-54,-44.2,-62.4,-31.6,-69.1C-19,-75.8,-5.9,-80.8,4.5,-88.7C14.9,-96.6,29.8,-86.8,42.7,-73.4Z" transform="translate(100 100) scale(1.1)" />
 </svg>

 {/* doodle: scintille d'enfasi attorno al manifesto */}
 <Doodle name="sparkle" className="absolute -top-2 left-4 sm:left-16 w-9 h-9 text-[#34BBC0] drop-shadow-[2px_2px_0_#0F0F12] -rotate-12" />
 <Doodle name="star" className="absolute top-6 right-4 sm:right-20 w-8 h-8 text-[#FF6B5C] drop-shadow-[2px_2px_0_#0F0F12] rotate-12" />

 <h3
 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-7xl lg:text-[5.5rem] font-black uppercase leading-none drop-shadow-[4px_4px_0_rgba(15,15,18,1)] md:drop-shadow-[7px_7px_0_rgba(15,15,18,1)] text-[#D2EC7C] break-words max-w-full" style={{ WebkitTextStroke: '2.5px #0F0F12', paintOrder: 'stroke' }}>
 {t('about.bigA')}<br/><span className="underline decoration-[#D2EC7C] decoration-8 underline-offset-4 text-white">{t('about.bigHealth')}</span><br/>{t('about.bigB')}<br/><span className="underline decoration-[#34BBC0] decoration-8 underline-offset-4">{t('about.bigSport')}</span>
 </h3>
 <div className="mt-12 relative">
 <p className="font-['Space_Grotesk',_sans-serif] font-black text-sm sm:text-xl bg-black text-white inline-block px-6 sm:px-8 py-3 shadow-[6px_6px_0_0_#34BBC0]">
 <span className="block ">{t('about.bigCaption')}</span>
 </p>
 </div>
 </div>

 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
 {stats.map((s, i) => (
 <div key={i} className="bg-white border-[3px] border-black p-4 sm:p-6 shadow-[4px_4px_0_0_#0F0F12]">
 <span className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-6xl font-black mb-2 block" style={{ color: statColor(i), WebkitTextStroke: '2.5px #0F0F12', textShadow: '4px 4px 0px #0F0F12' }}>{s.val}</span>
 <p className="font-extrabold uppercase text-xs sm:text-sm">{s.label}</p>
 </div>
 ))}
 </div>
 <p className="mt-6 text-xs leading-relaxed text-[#0F0F12]/70 max-w-3xl">{t('about.statsSources')}</p>
 </section>

 {/* THE FOUNDER */}
 <section className="mb-24">
 <div className="text-center mb-12">
 <h2 className="relative inline-block font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-6xl font-black uppercase">
 {t('about.founderTitle')}
 <Doodle name="underline" stretch className="absolute -bottom-3 left-0 w-full h-4 text-[#34BBC0]" stroke={3} />
 </h2>
 </div>

 <div className="bg-[#D2EC7C] border-[4px] border-black p-6 sm:p-12 shadow-[12px_12px_0_0_#0F0F12] flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

 <div className="w-full sm:w-2/3 lg:w-1/3 shrink-0 mx-auto lg:mx-0 relative">
 <Doodle name="sparkle" className="absolute -top-5 -right-4 w-10 h-10 text-[#0F0F12] rotate-12 z-20" />
 <img
 src="/fotobab/GaiaManzone.avif"
 alt="Gaia Manzone, CEO & Founder"
 className="w-full aspect-[4/5] object-cover object-top border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12] transition-transform duration-300"
 loading="lazy"
 />
 </div>

 <div className="flex-1 bg-white border-[4px] border-black p-6 sm:p-8 shadow-[8px_8px_0_0_#0F0F12] w-full">
 <div className="flex flex-col items-start gap-5 mb-8">
 <h3 className="relative inline-block font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-4xl font-black uppercase m-0">Gaia Manzone
 <Doodle name="underline" stretch className="absolute -bottom-2.5 left-0 w-full h-3 text-[#FF6B5C]" stroke={3} />
 </h3>
 <span className="inline-block bg-black text-white text-xs sm:text-sm font-black uppercase tracking-widest px-4 py-1.5 shadow-[4px_4px_0_0_#34BBC0]">
 <span className="block ">{t('about.founderRole')}</span>
 </span>
 </div>

 <div className="font-['Bricolage_Grotesque',_sans-serif] font-black text-lg sm:text-xl leading-relaxed border-l-[4px] border-black pl-4 sm:pl-6 flex flex-col gap-4">
 <p>{t('about.founderQuote1')}</p>
 <p className="text-vividteal">{t('about.founderQuote2')}</p>
 <p className="bg-black text-white p-4 shadow-[4px_4px_0_0_#D2EC7C] mt-4">
 <span className="block ">{t('about.founderQuote3')}</span>
 </p>
 </div>
 </div>

 </div>
 </section>

 {/* COMMUNITY WALL */}
 <section className="mb-20 relative">
 <div className="flex items-center gap-4 mb-8">
 <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-5xl font-black uppercase">{t('about.communityTitle')}</h2>
 <Doodle name="heart" className="w-7 h-7 shrink-0 text-[#FF6B5C] -rotate-12 drop-shadow-[2px_2px_0_#0F0F12]" />
 <div className="flex-1 h-[4px] bg-black"></div>
 <Doodle name="star" className="w-7 h-7 shrink-0 text-[#34BBC0] rotate-12 drop-shadow-[2px_2px_0_#0F0F12]" />
 </div>

 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
 {images.slice(0, 6).map((img, index) => {
 return (
 <motion.div
 key={index}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1], delay: index * 0.05 }}
 className="bg-black p-2 border-[4px] border-black shadow-[4px_4px_0_0_#0F0F12] md:shadow-[8px_8px_0_0_#0F0F12] hover:-translate-y-1 transition-all duration-300 group"
 >
 <div className="bg-[#FAF9F6] p-2 sm:p-3 md:p-4 border-[3px] border-black h-full ">
 <img
 src={`/fotobab/${img}`}
 alt={t('about.photoAlt')}
 className="w-full aspect-[4/5] md:aspect-square object-cover border-[2px] md:border-[3px] border-black transition-all duration-300"
 loading="lazy"
 />
 </div>
 </motion.div>
 );
 })}
 </div>
 </section>

 </div>
 </div>
 );
}
