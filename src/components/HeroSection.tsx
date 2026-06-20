import { useState } from 'react';

export default function HeroSection() {
  const [role, setRole] = useState<'allenatore' | 'genitore'>('allenatore');

  return (
    <section className="bg-[#080C12] text-[#FAF9F6] py-16 px-6 font-['Space_Grotesk',_sans-serif] min-h-screen flex flex-col items-center justify-center text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-[#171F2E]/75 backdrop-blur-[20px] border border-[#34BBC0]/30 text-[#DAE69A] text-xs font-bold tracking-wide uppercase mb-8">
        ✦ Selezionato al Techstars Startup Weekend AI · Lecco
      </div>
      
      <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight mb-8">
        Una ragazza su due abbandona lo sport durante la pubertà. <br className="hidden md:block"/>
        <span className="text-[#34BBC0]">Non lasciare che accada alla tua squadra.</span>
      </h1>

      <div className="flex bg-[#171F2E]/75 backdrop-blur-[20px] rounded-full p-1 mb-8 border border-white/10 shadow-lg">
        <button 
          onClick={() => setRole('allenatore')}
          className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${role === 'allenatore' ? 'bg-[#34BBC0] text-[#080C12] font-bold shadow-[0_0_15px_rgba(52,187,192,0.4)]' : 'text-[#FAF9F6] hover:bg-white/5'}`}
        >
          Sono un Allenatore
        </button>
        <button 
          onClick={() => setRole('genitore')}
          className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${role === 'genitore' ? 'bg-[#34BBC0] text-[#080C12] font-bold shadow-[0_0_15px_rgba(52,187,192,0.4)]' : 'text-[#FAF9F6] hover:bg-white/5'}`}
        >
          Sono un Genitore
        </button>
      </div>

      <p className="text-lg md:text-xl text-[#FAF9F6]/80 max-w-2xl mb-12 min-h-[60px]">
        {role === 'allenatore' 
          ? "Prevedi gli infortuni e monitora il benessere delle tue atlete incrociando i dati del ciclo mestruale con i carichi di lavoro."
          : "Proteggi la salute sportiva di tua figlia e aiutala a comprendere il proprio corpo per performare al meglio in totale sicurezza."}
      </p>

      <div className="bg-[#171F2E]/75 backdrop-blur-[20px] border border-[#DAE69A]/40 rounded-2xl p-4 flex items-center gap-4 max-w-md w-full justify-center shadow-lg">
        <span className="text-2xl animate-pulse">🔥</span>
        <p className="text-sm font-medium text-left">
          <span className="text-[#DAE69A] font-bold">42/50 posti già assegnati.</span><br/> L'accesso anticipato è aperto solo ai primi 50 coach.
        </p>
      </div>
    </section>
  );
}
