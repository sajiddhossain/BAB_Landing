/**
 * @file      WaitlistModal.tsx
 * @summary   Componente UI per BAB (Breaking All Barriers)
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 * @notice    Questo codice è di proprietà intellettuale dell'autore. 
 *            L'utilizzo, la modifica o la distribuzione non autorizzata 
 *            sono severamente vietati in assenza di accordi contrattuali scritti.
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [quizStep, setQuizStep] = useState(1);
  const [email, setEmail] = useState('');
  const [score, setScore] = useState<number | null>(null);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setQuizStep(1);
      setEmail('');
      setScore(null);
    }
  }, [isOpen]);

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setScore(Math.floor(Math.random() * (95 - 75) + 75));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-[#FAF9F6] border-[4px] border-black shadow-[12px_12px_0_0_#0F0F12] flex flex-col z-10 max-h-[90vh] overflow-y-auto"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-[3px] border-black bg-[#FFDE4D]">
               <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black uppercase tracking-widest">
                 Join Waitlist ✦
               </h2>
               <button 
                 onClick={onClose}
                 className="w-8 h-8 flex items-center justify-center bg-white border-2 border-black font-black text-xl hover:bg-black hover:text-white transition-colors"
               >
                 ✕
               </button>
            </div>

            {/* Content Area */}
            <div className="p-6">
              
              {/* Badge Scarcity */}
              <div className="bg-black text-[#DAE69A] px-4 py-2 flex items-center justify-center gap-3 shadow-[4px_4px_0_0_#DAE69A] transform -rotate-1 mb-8">
                <span className="text-xl animate-pulse">🔥</span>
                <span className="text-sm font-black uppercase tracking-widest">
                  42/50 posti assegnati
                </span>
              </div>

              {/* Steps Layout */}
              <div className="flex flex-col gap-6">
                
                {/* Step 1 */}
                <div className={`y2k-brutal-card bg-white p-5 ${quizStep >= 1 ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
                  <div className="flex justify-between items-center mb-4 border-b-[2px] border-black pb-2">
                    <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black">1. Sport di Squadra</h3>
                    {quizStep > 1 && <span className="bg-[#34BBC0] border-2 border-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">✓</span>}
                  </div>
                  {quizStep === 1 && (
                    <div className="flex flex-col gap-3">
                      {['Calcio', 'Volley', 'Basket', 'Altro'].map(s => (
                        <button key={s} onClick={() => setQuizStep(2)} className="w-full py-3 px-4 bg-white border-[3px] border-black shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-1 active:shadow-[0_0_0_0_#000] transition-all text-left font-black uppercase text-sm">
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Step 2 */}
                <div className={`y2k-brutal-card bg-white p-5 ${quizStep >= 2 ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
                  <div className="flex justify-between items-center mb-4 border-b-[2px] border-black pb-2">
                    <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black">2. Focus Principale</h3>
                    {quizStep > 2 && <span className="bg-[#34BBC0] border-2 border-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">✓</span>}
                  </div>
                  {quizStep === 2 && (
                    <div className="flex flex-col gap-3">
                      {['Infortuni gravi / LCA', 'Abbandono precoce', 'Comunicazione'].map(c => (
                        <button key={c} onClick={() => setQuizStep(3)} className="w-full py-3 px-4 bg-white border-[3px] border-black shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-1 active:shadow-[0_0_0_0_#000] transition-all text-left font-black uppercase text-sm">
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Step 3 */}
                <div className={`y2k-brutal-card bg-white p-5 ${quizStep >= 3 ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
                  <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black mb-4 border-b-[2px] border-black pb-2">3. Accesso</h3>
                  {quizStep >= 3 && score === null && (
                    <form onSubmit={handleQuizSubmit} className="flex flex-col gap-4">
                      <input type="email" placeholder="LA TUA EMAIL..." required value={email} onChange={e => setEmail(e.target.value)} className="w-full py-3 px-4 bg-white border-[3px] border-black font-bold uppercase text-sm focus:outline-none focus:ring-4 focus:ring-[#FFDE4D]/50 shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)] transition-all duration-300"/>
                      
                      <div className="flex items-start gap-3 bg-[#EBE5FF] border-[3px] border-black p-3 my-2 shadow-[4px_4px_0_0_#0F0F12]">
                        <span className="text-xl mt-0.5">🛡️</span>
                        <p className="text-xs font-bold leading-relaxed uppercase tracking-wide">
                          Dati 100% criptati sul dispositivo, zero db centrali e conformità GDPR minori.
                        </p>
                      </div>

                      <button type="submit" className="y2k-btn bg-[#FFDE4D] w-full text-base hover:bg-[#FF5722] hover:text-white transition-colors duration-300">
                        Richiedi Accesso ✦
                      </button>
                    </form>
                  )}
                  {score !== null && (
                    <div className="text-center py-4">
                      <p className="font-black uppercase tracking-widest mb-2 text-xs">Score di Ingresso (SITG):</p>
                      <div className="text-6xl font-['Bricolage_Grotesque',_sans-serif] font-black bg-[#DAE69A] border-[3px] border-black inline-block px-6 py-2 shadow-[6px_6px_0_0_#000] -rotate-2 mb-4">{score}</div>
                      <p className="text-xs font-bold uppercase tracking-widest bg-black text-white py-2 px-4 inline-block transform rotate-1">In Waitlist ✓</p>
                      <button onClick={onClose} className="mt-6 font-bold uppercase text-xs hover:underline">Chiudi finestra</button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
