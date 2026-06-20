/**
 * @file      AppSimulator.tsx
 * @summary   Componente UI per BAB (Breaking All Barriers)
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 * @notice    Questo codice è di proprietà intellettuale dell'autore. 
 *            L'utilizzo, la modifica o la distribuzione non autorizzata 
 *            sono severamente vietati in assenza di accordi contrattuali scritti.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AppSimulator() {
  const [tamagotchiState, setTamagotchiState] = useState<'A' | 'B' | 'C'>('B');

  const getAvatar = () => {
    switch(tamagotchiState) {
      case 'A': return '[ °_° ]✨';
      case 'B': return '[ °_° ]';
      case 'C': return '[ =_= ]💤';
    }
  };

  const getTelemetry = () => {
    switch(tamagotchiState) {
      case 'A': return { bpm: '145', zone: '4' };
      case 'B': return { bpm: '85', zone: '2' };
      case 'C': return { bpm: '55', zone: '1' };
    }
  };

  const data = getTelemetry();

  return (
    <section className="bg-[#FAF9F6] text-[#0F0F12] py-16 px-4 font-['Space_Grotesk',_sans-serif] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        
        <div className="bg-[#DAE993] border-2 md:border-4 border-[#0F0F12] px-4 py-2 mb-6 font-black uppercase text-sm shadow-[4px_4px_0px_0px_#0F0F12] rotate-2 inline-block">
          Simulator
        </div>

        <div className="bg-white border-2 md:border-4 border-[#0F0F12] shadow-[4px_4px_0px_0px_#0F0F12] md:shadow-[6px_6px_0px_0px_#0F0F12] flex flex-col p-6 relative">
          
          {/* Telemetry Corners */}
          <div className="absolute top-4 left-4 bg-[#EBE5FF] border-2 border-[#0F0F12] px-2 py-1 font-black text-xs">
            BPM {data.bpm}
          </div>
          <div className="absolute top-4 right-4 bg-[#34BBC0] text-white border-2 border-[#0F0F12] px-2 py-1 font-black text-xs">
            ZONA {data.zone}
          </div>

          <div className="w-full aspect-square bg-[#FAF9F6] border-4 border-[#0F0F12] shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)] flex items-center justify-center mt-12 mb-8">
            <motion.div 
              key={tamagotchiState}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-mono text-6xl font-black"
            >
              {getAvatar()}
            </motion.div>
          </div>

          <div className="flex gap-4 justify-center">
            {['A', 'B', 'C'].map(btn => (
              <button 
                key={btn}
                onClick={() => setTamagotchiState(btn as any)}
                className={`w-14 h-14 rounded-full border-2 md:border-4 border-[#0F0F12] flex items-center justify-center font-black text-xl transition-all ${tamagotchiState === btn ? 'bg-[#FFDE4D] shadow-none translate-x-0.5 translate-y-0.5' : 'bg-white shadow-[4px_4px_0px_0px_#0F0F12] hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'}`}
              >
                {btn}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
