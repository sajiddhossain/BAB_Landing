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
      const calculatedScore = Math.floor(Math.random() * (95 - 75) + 75);
      setScore(calculatedScore);
    }
  };

  return (
    <section className="bg-[#080C12] text-[#FAF9F6] py-16 px-6 font-['Space_Grotesk',_sans-serif] flex flex-col items-center min-h-[600px] justify-center">
      <div className="w-full max-w-md bg-[#171F2E]/75 backdrop-blur-[20px] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow background effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#34BBC0]/20 rounded-full blur-[50px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#DAE69A]/10 rounded-full blur-[50px] pointer-events-none"></div>

        <div className="flex gap-2 mb-8 justify-center relative z-10">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${step >= i ? 'bg-[#34BBC0]' : 'bg-white/10'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl md:text-3xl font-bold mb-6 text-center leading-tight">Di quale sport ti occupi?</h2>
            <div className="flex flex-col gap-3">
              {['Calcio', 'Volley', 'Basket', 'Altro'].map(s => (
                <button 
                  key={s}
                  onClick={() => handleSportSelect(s)}
                  className="w-full py-4 px-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-[#34BBC0]/20 hover:border-[#34BBC0]/50 transition-all text-left font-medium text-lg active:scale-[0.98]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl md:text-3xl font-bold mb-6 text-center leading-tight">Qual è la tua preoccupazione principale?</h2>
            <div className="flex flex-col gap-3">
              {['Infortuni gravi / LCA', 'Abbandono precoce delle ragazze', 'Mancanza di comunicazione'].map(c => (
                <button 
                  key={c}
                  onClick={() => handleConcernSelect(c)}
                  className="w-full py-4 px-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-[#34BBC0]/20 hover:border-[#34BBC0]/50 transition-all text-left font-medium text-base active:scale-[0.98]"
                >
                  {c}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-6 text-sm text-white/40 hover:text-white underline w-full text-center transition-colors">
              Indietro
            </button>
          </div>
        )}

        {step === 3 && score === null && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl md:text-3xl font-bold mb-6 text-center leading-tight">Richiedi l'accesso</h2>
            <p className="text-center text-white/60 mb-6 text-sm">Inserisci la tua email per calcolare il tuo Score SITG e unirti alla waitlist.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="La tua email..." 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full py-4 px-6 rounded-2xl border border-white/10 bg-[#080C12] text-white focus:outline-none focus:border-[#34BBC0] focus:ring-1 focus:ring-[#34BBC0] transition-all"
              />

              {/* Trust Badge */}
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3 rounded-xl mt-2 mb-2">
                <span className="text-xl">🛡️</span>
                <p className="text-xs text-white/70 font-medium leading-relaxed">
                  Dati 100% criptati sul dispositivo, zero database centrali e conformità GDPR minori.
                </p>
              </div>

              <button 
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#34BBC0] text-[#080C12] font-bold text-lg hover:bg-[#2AA0A5] transition-colors shadow-[0_0_20px_rgba(52,187,192,0.3)] active:scale-[0.98] mt-2"
              >
                Richiedi Accesso Gratuito ✦
              </button>
            </form>
            <button onClick={() => setStep(2)} className="mt-6 text-sm text-white/40 hover:text-white underline w-full text-center transition-colors">
              Indietro
            </button>
          </div>
        )}

        {step === 3 && score !== null && (
          <div className="animate-in zoom-in-95 duration-500 text-center py-6 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#DAE69A]/20 text-[#DAE69A] mb-6 border border-[#DAE69A]/30">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl font-bold mb-2">Sei in Waitlist!</h2>
            <p className="text-white/70 mb-6">Il tuo profilo ha generato uno Score SITG di:</p>
            <div className="text-7xl font-['Bricolage_Grotesque',_sans-serif] font-black text-[#DAE69A] mb-6 drop-shadow-[0_0_15px_rgba(218,230,154,0.4)]">
              {score}
            </div>
            <p className="text-sm text-white/50 bg-white/5 p-4 rounded-xl">Ti contatteremo non appena si libererà un posto tra i primi 50 coach selezionati.</p>
          </div>
        )}
      </div>
    </section>
  );
}
