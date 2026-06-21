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
import { useTranslation } from 'react-i18next';

export default function AppSimulator() {
  const { t } = useTranslation();
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
    <section className="bg-[#FAF9F6] text-[#0F0F12] py-24 md:py-32 px-4 font-['Space_Grotesk',_sans-serif] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        
        <div className="bg-[#DAE69A] border-2 md:border-4 border-[#0F0F12] px-4 py-2 mb-6 font-black uppercase text-sm shadow-[4px_4px_0px_0px_#0F0F12] rotate-2 inline-block">
          {t('simulator.title')}
        </div>

        <div className="bg-[#0F0F12] p-2 border-[4px] border-[#0F0F12] shadow-[8px_8px_0_0_#0F0F12] md:shadow-[12px_12px_0_0_#0F0F12]">
          <div className="bg-white border-[3px] border-[#0F0F12] flex flex-col p-6 relative">
            
            {/* Telemetry Corners */}
            <div className="absolute top-4 left-4 bg-[#EBE5FF] border-2 border-[#0F0F12] px-2 py-1 font-black text-xs">
              BPM {data.bpm}
            </div>
            <div className="absolute top-4 right-4 bg-vividteal text-white border-2 border-[#0F0F12] px-2 py-1 font-black text-xs">
              ZONA {data.zone}
            </div>

            <div className="w-full aspect-square bg-[#FAF9F6] border-[4px] border-[#0F0F12] shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)] flex items-center justify-center mt-12 mb-8">
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
                  onClick={() => setTamagotchiState(btn as 'A' | 'B' | 'C')}
                  aria-label={`Stato ${btn}`}
                  className={`w-14 h-14 rounded-full border-[3px] border-[#0F0F12] flex items-center justify-center font-black text-xl transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${tamagotchiState === btn ? 'bg-[#FFDE4D] shadow-none translate-x-[3px] translate-y-[3px]' : 'bg-white shadow-[6px_6px_0px_0px_#0F0F12] hover:shadow-none hover:translate-y-[6px] hover:translate-x-[6px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none'}`}
                >
                  {btn}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
