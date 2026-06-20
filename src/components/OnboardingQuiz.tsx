/**
 * @file      OnboardingQuiz.tsx
 * @summary   Componente UI per BAB (Breaking All Barriers)
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 * @notice    Questo codice è di proprietà intellettuale dell'autore. 
 *            L'utilizzo, la modifica o la distribuzione non autorizzata 
 *            sono severamente vietati in assenza di accordi contrattuali scritti.
 */
import { useState } from 'react';

export default function OnboardingQuiz() {
  const [step, setStep] = useState(1);
  const [_sport, setSport] = useState('');
  const [_concern, setConcern] = useState('');
  const [email, setEmail] = useState('');
  const [score, setScore] = useState<number | null>(null);

  const handleSportSelect = (s: string) => {
    setSport(s);
    setStep(2);
  };

  const handleConcernSelect = (c: string) => {
    setConcern(c);
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setScore(Math.floor(Math.random() * (95 - 75) + 75));
    }
  };

  return (
    <section className="bg-[#FAF9F6] text-[#0F0F12] py-16 px-4 font-['Space_Grotesk',_sans-serif] flex flex-col items-center min-h-[80vh] justify-center">
      <div className="w-full max-w-md bg-white border-2 md:border-4 border-[#0F0F12] shadow-[4px_4px_0px_0px_#0F0F12] md:shadow-[6px_6px_0px_0px_#0F0F12] p-6 md:p-8 relative">
        
        {/* Race Bib Step Indicators */}
        <div className="flex gap-4 mb-8 justify-center">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-12 h-12 flex items-center justify-center border-2 border-[#0F0F12] shadow-[2px_2px_0px_0px_#0F0F12] font-['Bricolage_Grotesque',_sans-serif] font-black text-xl transition-all ${step >= i ? 'bg-[#FFDE4D]' : 'bg-white text-gray-300'}`}>
              {i}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl font-black uppercase mb-6 text-center">Il tuo Sport?</h2>
            <div className="flex flex-col gap-4">
              {['Calcio', 'Volley', 'Basket', 'Altro'].map(s => (
                <button 
                  key={s}
                  onClick={() => handleSportSelect(s)}
                  className="w-full py-4 px-6 bg-white border-2 border-[#0F0F12] shadow-[4px_4px_0px_0px_#0F0F12] hover:bg-[#DAE993] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#0F0F12] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all text-left font-black uppercase text-lg"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl font-black uppercase mb-6 text-center">Focus?</h2>
            <div className="flex flex-col gap-4">
              {['Infortuni gravi / LCA', 'Abbandono ragazze', 'Mancanza comunicazione'].map(c => (
                <button 
                  key={c}
                  onClick={() => handleConcernSelect(c)}
                  className="w-full py-4 px-6 bg-white border-2 border-[#0F0F12] shadow-[4px_4px_0px_0px_#0F0F12] hover:bg-[#DAE993] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#0F0F12] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all text-left font-black uppercase text-base"
                >
                  {c}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-6 text-sm font-bold uppercase hover:text-[#FF5722] w-full text-center">
              ← Indietro
            </button>
          </div>
        )}

        {step === 3 && score === null && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl font-black uppercase mb-4 text-center">Accesso</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input 
                type="email" 
                placeholder="LA TUA EMAIL..." 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full py-4 px-6 border-2 md:border-4 border-[#0F0F12] bg-[#FAF9F6] font-bold uppercase focus:outline-none focus:bg-[#DAE993] transition-colors"
              />

              <div className="flex items-start gap-3 bg-[#EBE5FF] border-2 border-[#0F0F12] p-3 shadow-[4px_4px_0px_0px_#0F0F12] rotate-1">
                <span className="text-xl">🔒</span>
                <p className="text-xs font-bold uppercase leading-tight">
                  Dati criptati. Zero db centrali. Conformità GDPR garantita.
                </p>
              </div>

              <button 
                type="submit"
                className="w-full py-4 px-6 bg-[#FFDE4D] border-2 md:border-4 border-[#0F0F12] shadow-[4px_4px_0px_0px_#0F0F12] md:shadow-[6px_6px_0px_0px_#0F0F12] text-[#0F0F12] font-black text-xl uppercase hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#0F0F12] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                Invia ✦
              </button>
            </form>
            <button onClick={() => setStep(2)} className="mt-6 text-sm font-bold uppercase hover:text-[#FF5722] w-full text-center">
              ← Indietro
            </button>
          </div>
        )}

        {step === 3 && score !== null && (
          <div className="animate-in zoom-in-95 duration-300 text-center py-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#DAE993] border-4 border-[#0F0F12] shadow-[4px_4px_0px_0px_#0F0F12] mb-6 rotate-3">
              <span className="text-4xl">✓</span>
            </div>
            <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl font-black uppercase mb-4">In Waitlist!</h2>
            <p className="font-bold uppercase text-sm mb-4">Score SITG:</p>
            <div className="text-7xl font-['Bricolage_Grotesque',_sans-serif] font-black text-[#FFDE4D] border-4 border-[#0F0F12] shadow-[6px_6px_0px_0px_#0F0F12] inline-block px-8 py-4 mb-6 bg-[#0F0F12] -rotate-2">
              {score}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
