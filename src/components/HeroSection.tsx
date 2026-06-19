import { useState } from 'react';
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
      subtext: 'Reduce team injuries by 60% and prevent girls from dropping out of the team.',
      cta: 'Activate BAB for my Club',
    },
    [Target.Genitore]: {
      subtext: 'Help your daughter understand her body signals and play sport safely.',
      cta: 'Request Access for my Daughter',
    },
  };

  return (
    <section className="relative min-h-screen bg-[#080C12] text-[#FAF9F6] px-6 py-24 flex flex-col items-center justify-center overflow-hidden border-b border-[#FAF9F6]/5">
      {/* Liquid Glows / Ambient Background Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#34BBC0] opacity-[0.08] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-[#DAE69A] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#34BBC0] to-transparent opacity-[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center gap-8 mt-8">
        
        {/* Upper Value Proposition Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#171F2E]/80 border border-[#FAF9F6]/10 text-xs sm:text-sm font-medium tracking-wide text-[#DAE69A] max-w-3xl leading-relaxed"
        >
          <span>✨</span>
          <span>BAB is the first health and wellbeing app for U18 athletes, co-created with medical experts and elite athletes</span>
          <span>✨</span>
        </motion.div>

        {/* Main Brand Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif font-bold text-4xl sm:text-7xl tracking-tight text-[#FAF9F6] leading-[1.1] max-w-3xl"
          style={{ fontFamily: "'Corben', serif" }}
        >
          Breaking All Barriers
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-[#FAF9F6]/80 max-w-2xl mx-auto leading-relaxed font-sans"
        >
          For the Next Gen athletes to thrive in sport, without compromising their development, health and wellbeing.
        </motion.p>

        {/* Interactive Target Selector (Switch Buttons) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex p-1 bg-[#171F2E]/90 border border-[#FAF9F6]/10 rounded-full shadow-lg max-w-md w-full relative mt-4"
        >
          <button
            onClick={() => handleTargetChange(Target.Coach)}
            className={`flex-1 py-3 px-6 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 relative z-10 ${
              activeTarget === Target.Coach
                ? 'text-[#080C12]'
                : 'text-[#FAF9F6]/60 hover:text-[#FAF9F6]'
            }`}
          >
            I am a Coach
          </button>
          <button
            onClick={() => handleTargetChange(Target.Genitore)}
            className={`flex-1 py-3 px-6 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 relative z-10 ${
              activeTarget === Target.Genitore
                ? 'text-[#080C12]'
                : 'text-[#FAF9F6]/60 hover:text-[#FAF9F6]'
            }`}
          >
            I am a Parent
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
        </motion.div>

        {/* Dynamic Subtext and CTA Block */}
        <div className="min-h-[140px] flex flex-col items-center justify-center max-w-2xl w-full px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTarget}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-6"
            >
              <p className="text-sm sm:text-base text-[#FAF9F6]/60 leading-relaxed max-w-xl">
                {contentMap[activeTarget].subtext}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onJoinWaitlist}
                className="px-8 py-4 bg-[#34BBC0] text-[#080C12] text-sm sm:text-md font-bold rounded-full border border-[#FAF9F6]/10 shadow-lg hover:shadow-[#34BBC0]/20 hover:bg-[#34BBC0]/95 transition-all uppercase tracking-wider"
              >
                {contentMap[activeTarget].cta} ✦
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tagline & Context Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 p-8 rounded-[20px] bg-[#171F2E]/40 border border-[#FAF9F6]/5 max-w-3xl flex flex-col gap-4 text-left glass-panel"
        >
          <h3 className="font-serif font-bold text-lg sm:text-2xl text-[#DAE69A] border-b border-[#FAF9F6]/10 pb-3" style={{ fontFamily: "'Corben', serif" }}>
            Puberty doesn’t fit the rules sport was built on.
          </h3>
          <p className="text-sm sm:text-base text-[#FAF9F6]/75 leading-relaxed font-sans">
            Teenage athletes are expected to handle the impact of adolescence and ovarian hormones alone and in silence, navigating systems that were never designed for their changing bodies and needs. 
            <strong className="text-[#FAF9F6] ml-1">BAB exists so they no longer have to.</strong>
          </p>
        </motion.div>

        {/* GDPR Compliance Footer text */}
        <span className="text-[10px] text-[#FAF9F6]/40 uppercase tracking-widest mt-2 flex items-center gap-1">
          🛡️ 100% GDPR Compliant • Personal data encrypted and safe
        </span>

      </div>
    </section>
  );
};
