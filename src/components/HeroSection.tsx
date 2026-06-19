import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Target = {
  Coach: 'COACH',
  Genitore: 'GENITORE',
} as const;

export type Target = typeof Target[keyof typeof Target];

interface HeroSectionProps {
  onJoinWaitlist: () => void;
  onTargetChange?: (target: Target) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onJoinWaitlist,
  onTargetChange,
}) => {
  const [activeTarget, setActiveTarget] = useState<Target>(Target.Coach);

  const handleTargetChange = (target: Target) => {
    setActiveTarget(target);
    if (onTargetChange) {
      onTargetChange(target);
    }
  };

  const contentMap = {
    [Target.Coach]: {
      headline: 'Riduci gli infortuni del team del 60% ed evita che le ragazze mollino la squadra.',
      tagline: 'Fornisci alla tua squadra il vantaggio competitivo del primo sistema integrato di tracciamento biologico e prevenzione LCA.',
      cta: 'Attiva BAB per il mio Club',
    },
    [Target.Genitore]: {
      headline: 'Aiuta tua figlia a capire i segnali del suo corpo e a fare sport in sicurezza.',
      tagline: 'Il primo assistente biologico che monitora lo sviluppo atletico, previene i traumi alle ginocchia e tutela la sua crescita.',
      cta: 'Richiedi accesso per mia Figlia',
    },
  };

  return (
    <section className="relative min-h-screen bg-[#080C12] text-[#FAF9F6] px-4 py-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Liquid Glows / Ambient Background Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#34BBC0] opacity-[0.08] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-[#DAE69A] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#34BBC0] to-transparent opacity-[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center gap-8">
        
        {/* Upper Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171F2E]/80 border border-[#FAF9F6]/10 text-xs font-bold tracking-wider text-[#DAE69A] uppercase"
        >
          <span className="text-[#34BBC0]">✦</span> Il primo sistema per proteggere la salute delle atlete e fermare gli infortuni.
        </motion.div>

        {/* Main Brand Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif font-bold text-4xl sm:text-6xl tracking-tight text-[#FAF9F6] leading-[1.1] max-w-3xl"
          style={{ fontFamily: "'Corben', serif" }}
        >
          BAB
        </motion.h1>

        {/* Interactive Target Selector (Switch Buttons) */}
        <div className="flex p-1 bg-[#171F2E] border border-[#FAF9F6]/10 rounded-full shadow-lg max-w-md w-full relative">
          <button
            onClick={() => handleTargetChange(Target.Coach)}
            className={`flex-1 py-3 px-6 rounded-full text-sm font-bold transition-all duration-300 relative z-10 ${
              activeTarget === Target.Coach
                ? 'text-[#080C12]'
                : 'text-[#FAF9F6]/60 hover:text-[#FAF9F6]'
            }`}
          >
            Sono un Allenatore
          </button>
          <button
            onClick={() => handleTargetChange(Target.Genitore)}
            className={`flex-1 py-3 px-6 rounded-full text-sm font-bold transition-all duration-300 relative z-10 ${
              activeTarget === Target.Genitore
                ? 'text-[#080C12]'
                : 'text-[#FAF9F6]/60 hover:text-[#FAF9F6]'
            }`}
          >
            Sono un Genitore
          </button>
          
          {/* Animated Background Selector */}
          <motion.div
            layoutId="activeTargetBg"
            className="absolute top-1 bottom-1 left-1 bg-[#34BBC0] rounded-full shadow-md z-0"
            style={{
              width: 'calc(50% - 4px)',
              left: activeTarget === Target.Coach ? '4px' : 'calc(50%)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Dynamic Headlines Block */}
        <div className="min-h-[160px] sm:min-h-[140px] flex flex-col justify-center max-w-3xl w-full px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTarget}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF9F6] leading-tight">
                {contentMap[activeTarget].headline}
              </h2>
              <p className="text-sm sm:text-lg text-[#FAF9F6]/60 max-w-2xl mx-auto leading-relaxed">
                {contentMap[activeTarget].tagline}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-3 mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onJoinWaitlist}
            className="px-8 py-4 bg-[#34BBC0] text-[#080C12] text-md font-bold rounded-full border border-[#FAF9F6]/10 shadow-lg hover:shadow-[#34BBC0]/20 hover:bg-[#34BBC0]/95 transition-all"
          >
            {contentMap[activeTarget].cta} ✦
          </motion.button>
          <span className="text-[10px] sm:text-xs text-[#FAF9F6]/40 uppercase tracking-widest flex items-center gap-1">
            🛡️ 100% Conforme GDPR • Dati personali criptati e sicuri
          </span>
        </motion.div>

      </div>
    </section>
  );
};
