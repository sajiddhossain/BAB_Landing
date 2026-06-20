/**
 * @file      HeroSection.tsx
 * @summary   Componente UI per BAB (Breaking All Barriers)
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 * @notice    Questo codice è di proprietà intellettuale dell'autore. 
 *            L'utilizzo, la modifica o la distribuzione non autorizzata 
 *            sono severamente vietati in assenza di accordi contrattuali scritti.
 */
import { useState } from 'react';

export default function HeroSection() {
  const [role, setRole] = useState<'allenatore' | 'genitore'>('allenatore');

  return (
    <section className="bg-[#FAF9F6] text-[#0F0F12] py-16 px-6 font-['Space_Grotesk',_sans-serif] min-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-12">
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full max-w-2xl">
        <div className="inline-block px-4 py-1.5 bg-[#DAE993] border-2 md:border-4 border-[#0F0F12] shadow-[4px_4px_0px_0px_#0F0F12] text-[#0F0F12] text-xs font-black tracking-widest uppercase mb-8 -rotate-1">
          ✦ Startup Weekend Lecco
        </div>
        
        <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl md:text-7xl font-black uppercase leading-none mb-8 drop-shadow-[4px_4px_0px_rgba(15,15,18,1)] text-[#FFDE4D]" style={{ WebkitTextStroke: '2px #0F0F12' }}>
          Stop<br/>Drop-Out<br/>
          <span className="text-[#34BBC0] drop-shadow-none" style={{ WebkitTextStroke: '0px' }}>Inizia Da Qui.</span>
        </h1>

        <p className="text-xl md:text-2xl font-bold max-w-xl mb-12 min-h-[80px] border-l-4 border-[#0F0F12] pl-4">
          {role === 'allenatore' 
            ? "Prevedi gli infortuni e monitora il benessere incrociando i dati del ciclo mestruale con i carichi."
            : "Proteggi la salute sportiva di tua figlia e aiutala a comprendere il corpo per performare in sicurezza."}
        </p>

        <div className="flex bg-[#FAF9F6] border-2 md:border-4 border-[#0F0F12] shadow-[4px_4px_0px_0px_#0F0F12] md:shadow-[6px_6px_0px_0px_#0F0F12] p-1 mb-8 w-full max-w-md">
          <button 
            onClick={() => setRole('allenatore')}
            className={`flex-1 px-4 py-3 font-black text-sm uppercase transition-all duration-300 border-2 border-transparent ${role === 'allenatore' ? 'bg-[#FFDE4D] border-[#0F0F12] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none' : 'hover:text-[#FF5722]'}`}
          >
            Coach
          </button>
          <button 
            onClick={() => setRole('genitore')}
            className={`flex-1 px-4 py-3 font-black text-sm uppercase transition-all duration-300 border-2 border-transparent ${role === 'genitore' ? 'bg-[#FFDE4D] border-[#0F0F12] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none' : 'hover:text-[#FF5722]'}`}
          >
            Parent
          </button>
        </div>

        <div className="bg-white border-2 md:border-4 border-[#0F0F12] p-4 flex items-center gap-4 w-full shadow-[4px_4px_0px_0px_#0F0F12] md:shadow-[6px_6px_0px_0px_#0F0F12] rotate-1">
          <span className="text-3xl animate-pulse">🔥</span>
          <p className="text-sm font-bold text-left uppercase">
            <span className="text-[#FF5722] font-black text-base block">42/50 posti assegnati</span>
            Accesso anticipato in chiusura.
          </p>
        </div>
      </div>

      <div className="flex-1 w-full flex justify-center mt-12 md:mt-0">
         {/* Placeholder for image or graphic */}
         <div className="w-full max-w-md aspect-square bg-[#EBE5FF] border-2 md:border-4 border-[#0F0F12] shadow-[4px_4px_0px_0px_#0F0F12] md:shadow-[6px_6px_0px_0px_#0F0F12] flex items-center justify-center rotate-3 hover:rotate-0 transition-transform">
           <span className="font-['Bricolage_Grotesque',_sans-serif] text-4xl font-black uppercase text-center p-6 text-[#34BBC0]">App<br/>Preview<br/>Here</span>
         </div>
      </div>
    </section>
  );
}
