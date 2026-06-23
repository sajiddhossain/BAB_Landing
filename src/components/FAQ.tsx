/**
 * @file FAQ.tsx
 * @summary Sezione FAQ della Home (contenuti localizzati via i18n).
 * @author Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
 const { t } = useTranslation();
 const faqData = t('faqHome.items', { returnObjects: true }) as unknown as { q: string; a: string }[];
 const [openIndex, setOpenIndex] = useState<number | null>(null);

 const toggleFaq = (index: number) => {
 setOpenIndex(openIndex === index ? null : index);
 };

 return (
 <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
 <div className="flex flex-col items-center mb-12 text-center">
 <span className="inline-block bg-[#EBE5FF] text-[#0F0F12] border-[3px] border-black font-black text-xs sm:text-sm tracking-widest uppercase mb-4 px-4 py-2 shadow-[4px_4px_0_0_#0F0F12] ">
 <span className="block ">{t('faqHome.badge')}</span>
 </span>
 <h2
 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-6xl font-black uppercase leading-none text-[#D2EC7C] tracking-tighter drop-shadow-[4px_4px_0_rgba(15,15,18,1)] "
 style={{ WebkitTextStroke: '2px #0F0F12' }}
 >
 <span className="block ">{t('faqHome.title')}</span>
 </h2>
 </div>

 <div className="flex flex-col gap-4 sm:gap-6">
 {faqData.map((faq, index) => {
 const isOpen = openIndex === index;
 return (
 <div
 key={index}
 className={`border-[2px] border-black overflow-hidden shadow-[4px_4px_0_0_#0F0F12] hover:-translate-y-1 transition-all duration-300 crosshairs ${isOpen ? 'bg-[#D2EC7C]' : 'bg-white text-[#0F0F12]'}`}
 >
 <div className=" h-full flex flex-col">
 <button
 onClick={() => toggleFaq(index)}
 aria-expanded={isOpen}
 className="w-full flex items-center justify-between p-3 sm:p-5 text-left focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-3px] focus-visible:outline-[#34BBC0]"
 >
 <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-lg sm:text-xl font-black pr-4 text-black">
 {faq.q}
 </h3>
 <motion.div
 animate={{ rotate: isOpen ? 180 : 0 }}
 transition={{ type: 'spring', stiffness: 200, damping: 20 }}
 className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border-[2px] shrink-0 ${isOpen ? 'border-black bg-black text-white' : 'border-black bg-white text-black'}`}
 aria-hidden="true"
 >
 <span className="font-['Space_Grotesk',_sans-serif] font-black text-xl leading-none">
 {isOpen ? '−' : '+'}
 </span>
 </motion.div>
 </button>

 <AnimatePresence>
 {isOpen && (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: 'auto', opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.3, ease: 'easeInOut' }}
 >
 <div className="p-4 sm:p-5 pt-0 border-t-[2px] font-['Space_Grotesk',_sans-serif] font-bold text-sm sm:text-base leading-relaxed text-black border-black">
 {faq.a}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </div>
 );
 })}
 </div>
 </section>
 );
}
