/**
 * @file      ReadinessWidget.tsx
 * @summary   Componente UI per BAB (Breaking All Barriers)
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 * @notice    Questo codice è di proprietà intellettuale dell'autore. 
 *            L'utilizzo, la modifica o la distribuzione non autorizzata 
 *            sono severamente vietati in assenza di accordi contrattuali scritti.
 */


export default function ReadinessWidget() {
  return (
    <div className="bg-[#171F2E]/75 backdrop-blur-[20px] rounded-3xl p-6 border border-white/10 shadow-2xl max-w-sm w-full font-['Space_Grotesk',_sans-serif] text-[#FAF9F6] relative overflow-hidden group">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#34BBC0]/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#34BBC0]/20 transition-colors duration-500"></div>

      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h3 className="text-xs text-white/50 uppercase tracking-widest mb-1 font-bold">Status Squadra</h3>
          <p className="font-['Bricolage_Grotesque',_sans-serif] text-2xl font-bold">Oggi</p>
        </div>
        <div className="bg-[#34BBC0]/10 text-[#34BBC0] px-3 py-1 rounded-full text-xs font-bold border border-[#34BBC0]/30 shadow-[0_0_10px_rgba(52,187,192,0.2)]">
          ● LIVE
        </div>
      </div>

      <div className="flex items-baseline gap-3 mb-8 relative z-10">
        <div className="text-6xl font-['Bricolage_Grotesque',_sans-serif] font-black text-[#DAE69A] drop-shadow-[0_0_15px_rgba(218,230,154,0.3)] tracking-tighter">
          90%
        </div>
        <div className="text-lg text-[#DAE69A] font-medium opacity-90">Ottimo</div>
      </div>

      <div className="space-y-3 relative z-10">
        <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-[#34BBC0] bg-[#34BBC0]/10 w-8 h-8 rounded-full flex items-center justify-center text-sm">❤️</span>
            <span className="text-sm font-medium text-white/80">HRV (Variabilità)</span>
          </div>
          <span className="font-bold text-[#FAF9F6]">Alta</span>
        </div>

        <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-[#34BBC0] bg-[#34BBC0]/10 w-8 h-8 rounded-full flex items-center justify-center text-sm">🌙</span>
            <span className="text-sm font-medium text-white/80">Sonno Medio</span>
          </div>
          <span className="font-bold text-[#FAF9F6]">8h 12m</span>
        </div>

        <div className="flex justify-between items-center p-4 rounded-2xl bg-[#DAE69A]/5 border border-[#DAE69A]/20 hover:bg-[#DAE69A]/10 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-[#DAE69A] bg-[#DAE69A]/10 w-8 h-8 rounded-full flex items-center justify-center text-sm">⚡</span>
            <span className="text-sm font-medium text-[#DAE69A]">Carico Fisico</span>
          </div>
          <span className="font-bold text-[#DAE69A]">Moderato</span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10 text-center relative z-10">
        <p className="text-[11px] text-white/40 font-medium tracking-wide">
          Aggiornato 5 min fa · Algoritmo BAB AI
        </p>
      </div>
    </div>
  );
}
