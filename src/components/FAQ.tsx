/**
 * @file      FAQ.tsx
 * @summary   Componente UI per BAB (Breaking All Barriers)
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 * @notice    Questo codice è di proprietà intellettuale dell'autore. 
 *            L'utilizzo, la modifica o la distribuzione non autorizzata 
 *            sono severamente vietati in assenza di accordi contrattuali scritti.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "Cos'è l'app BAB?",
    answer: "Crediamo che le adolescenti non debbano affrontare tutto da sole. Per questo BAB offre a genitori, allenatori e club gli strumenti e le risorse giuste per comprendere e supportare al meglio le giovani atlete durante il loro percorso.",
    color: "bg-[#FFDE4D]"
  },
  {
    question: "A chi si rivolge BAB?",
    answer: "BAB è progettata principalmente per supportare le ragazze e le giovani donne che hanno le mestruazioni e praticano sport.",
    color: "bg-[#DAE69A]"
  },
  {
    question: "Quali funzionalità include l'app?",
    answer: "BAB include il tracciamento del ciclo, dell'energia e dell'umore, aiutando le atlete a capire come questi fattori influenzino sia le performance sportive che la vita quotidiana. L'app offre anche insight personalizzati e risorse educative sviluppate dal nostro team medico, oltre a una funzione di Q&A privata e anonima dove atlete e genitori possono ricevere risposte da professionisti della salute e atleti d'élite.",
    color: "bg-[#EBE5FF]"
  },
  {
    question: "BAB è sicura, anonima e privata?",
    answer: "Assolutamente sì. BAB è completamente conforme alle normative GDPR europee. Ci impegniamo a mantenere i tuoi dati sicuri, protetti, privati e anonimi. Tutti i contenuti sono revisionati da medici e professionisti dello sport per garantire che siano appropriati per l'età, basati su evidenze scientifiche e sicuri.",
    color: "bg-[#34BBC0]"
  },
  {
    question: "Chi ha creato BAB?",
    answer: "BAB è stata fondata da Gaia Manzone in collaborazione con un team multidisciplinare di ricercatori sportivi, medici, atleti d'élite e allenatori, uniti dalla passione per il miglioramento della salute, del benessere e delle performance delle giovani atlete.",
    color: "bg-[#FFE3D1]"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col items-center mb-12 text-center">
        <span className="inline-block bg-black text-white font-black text-xs sm:text-sm tracking-widest uppercase mb-4 px-4 py-2 shadow-[4px_4px_0_0_#FFDE4D] rotate-1">
          ✦ F.A.Q. ✦
        </span>
        <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-6xl font-black uppercase leading-none">
          Domande<br/>Frequenti
        </h2>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6">
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;
          const isDarkTheme = faq.color === 'bg-[#34BBC0]';
          return (
            <div 
              key={index}
              className={`border-[3px] md:border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12] overflow-hidden transition-all duration-300 ${isOpen ? faq.color : 'bg-white hover:bg-gray-50'}`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left focus:outline-none"
              >
                <h3 className={`font-['Bricolage_Grotesque',_sans-serif] text-xl sm:text-2xl font-black pr-4 ${isOpen && isDarkTheme ? 'text-white' : 'text-black'}`}>
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border-[2px] sm:border-[3px] shrink-0 ${isOpen && isDarkTheme ? 'border-white bg-white text-black' : isOpen ? 'border-black bg-black text-white' : 'border-black bg-white text-black'}`}
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
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className={`p-4 sm:p-6 pt-0 border-t-[3px] font-bold text-base sm:text-lg leading-relaxed ${isDarkTheme ? 'text-white border-white' : 'text-black border-black'}`}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
