/**
 * @file      CoachDashboard.tsx
 * @summary   Componente UI per BAB (Breaking All Barriers)
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 * @notice    Questo codice è di proprietà intellettuale dell'autore. 
 *            L'utilizzo, la modifica o la distribuzione non autorizzata 
 *            sono severamente vietati in assenza di accordi contrattuali scritti.
 */
import { useState } from 'react';

export default function CoachDashboard() {
  const [activeView, setActiveView] = useState<'squadra' | 'singolo'>('squadra');

  return (
    <div className="flex flex-col items-center w-full min-h-[100dvh] text-[#0F0F12] px-4 py-8">
      
      <div className="w-full max-w-5xl mx-auto flex flex-col pt-10">
        
        {/* Header Dashboard Neo-Brutalist */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4 border-b-[4px] border-black pb-6">
          <div>
            <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl font-black mb-2 uppercase">U18 Femminile</h1>
            <p className="font-bold text-sm uppercase tracking-widest bg-black text-white inline-block px-3 py-1">Stato Squadra: Ottimale</p>
          </div>
          
          <div className="flex bg-white border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] rounded-lg overflow-hidden">
            <button 
              onClick={() => setActiveView('squadra')}
              className={`px-6 py-3 font-black text-xs uppercase tracking-widest transition-colors ${activeView === 'squadra' ? 'bg-[#FFDE4D] border-r-[3px] border-black' : 'hover:bg-neutral-100 hover:text-[#FF5722] border-r-[3px] border-black'}`}
            >
              Panoramica
            </button>
            <button 
              onClick={() => setActiveView('singolo')}
              className={`px-6 py-3 font-black text-xs uppercase tracking-widest transition-colors ${activeView === 'singolo' ? 'bg-[#FFDE4D]' : 'hover:bg-neutral-100 hover:text-[#FF5722]'}`}
            >
              Dettaglio
            </button>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="y2k-brutal-card bg-[#DAE69A] p-6 hover:-translate-y-1 transition-transform">
             <h3 className="text-xs font-black uppercase tracking-widest mb-1 border-b-2 border-black pb-2">Readiness Squadra</h3>
             <div className="text-6xl font-['Bricolage_Grotesque',_sans-serif] font-black mt-4">18/20</div>
             <p className="text-sm font-bold mt-2">Giocatrici pronte</p>
          </div>
          <div className="y2k-brutal-card bg-[#EBE5FF] p-6 hover:-translate-y-1 transition-transform">
             <h3 className="text-xs font-black uppercase tracking-widest mb-1 border-b-2 border-black pb-2">Rischio Infortuni (AI)</h3>
             <div className="text-6xl font-['Bricolage_Grotesque',_sans-serif] font-black mt-4">Basso</div>
             <p className="text-sm font-bold mt-2">Nessun alert critico</p>
          </div>
          <div className="y2k-brutal-card bg-[#FFE3D1] p-6 hover:-translate-y-1 transition-transform">
             <h3 className="text-xs font-black uppercase tracking-widest mb-1 border-b-2 border-black pb-2">Focus Odierno</h3>
             <div className="text-4xl font-['Bricolage_Grotesque',_sans-serif] font-black mt-4 uppercase leading-none">Tecnica<br/>+ Agilità</div>
          </div>
        </div>

        {/* Actionable Insights List (Mobile-First Table replacement) */}
        <div className="w-full">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-black text-white px-2 py-1 font-black text-sm shadow-[2px_2px_0_0_#FFDE4D] rotate-2">ACTION</span>
            <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl font-black uppercase">Consigli AI per l'allenamento</h2>
          </div>
          
          <div className="flex flex-col gap-4">
             {/* Card 1 */}
             <div className="bg-white border-[3px] border-black shadow-[6px_6px_0_0_#0F0F12] p-6 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FF5722] text-white border-[3px] border-black rounded-full flex items-center justify-center font-black text-xl shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.2)]">!</div>
                  <div>
                    <h4 className="font-black text-lg uppercase">2 Atlete in fase pre-mestruale (Luteale Tardiva)</h4>
                    <p className="text-xs font-bold mt-1 max-w-md">Picco di rilassina. Evitare cambi di direzione esplosivi o salti massimali per proteggere il crociato (LCA).</p>
                  </div>
                </div>
                <button className="y2k-btn text-xs bg-[#FFDE4D] w-full sm:w-auto hover:bg-[#FF5722] hover:text-white transition-colors duration-300">Modifica Scheda</button>
             </div>

             {/* Card 2 */}
             <div className="bg-white border-[3px] border-black shadow-[6px_6px_0_0_#0F0F12] p-6 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#DAE69A] border-[3px] border-black rounded-full flex items-center justify-center font-black text-xl shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.2)]">✓</div>
                  <div>
                    <h4 className="font-black text-lg uppercase">80% in picco energetico</h4>
                    <p className="text-xs font-bold mt-1 max-w-md">Alta tolleranza al carico oggi. Ottimo momento per allenamento di forza e resistenza.</p>
                  </div>
                </div>
                <button className="y2k-btn text-xs bg-[#FFDE4D] border-black w-full sm:w-auto hover:bg-[#34BBC0] hover:text-white transition-colors duration-300">Conferma Carico</button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
