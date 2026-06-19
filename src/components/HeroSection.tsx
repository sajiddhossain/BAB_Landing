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
      subtext: 'Reduce team injuries by 60% and prevent U18 girls from dropping out of the team.',
    },
    [Target.Genitore]: {
      subtext: 'Help your daughter understand her body signals and play sport safely.',
    },
  };

  return (
    <section className="relative min-h-screen bg-[#032e30] text-[#FAF9F6] border-b border-[#FAF9F6]/5 overflow-hidden">
      
      {/* Grid Layout: Split screen on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen items-stretch">
        
        {/* Left Column: Text Content */}
        <div className="lg:col-span-6 px-6 sm:px-12 py-24 flex flex-col justify-center items-start text-left gap-8 relative z-10 bg-[#032e30]">
          {/* Ambient Glows on Left */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#34BBC0] opacity-[0.06] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-[#DAE69A] opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />

          {/* Upper Value Proposition Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#044443]/80 border border-[#FAF9F6]/10 text-xs font-semibold tracking-wide text-[#DAE69A] max-w-xl leading-relaxed"
          >
            <span>✦</span>
            <span>BAB is the first health and wellbeing app for U18 athletes, co-created with medical experts and elite athletes</span>
            <span>✦</span>
          </motion.div>

          {/* Main Brand Title */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tight text-[#FAF9F6] leading-[1.1] max-w-xl"
            style={{ fontFamily: "'Corben', serif" }}
          >
            Breaking All Barriers
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg text-[#FAF9F6]/85 max-w-xl leading-relaxed font-sans"
          >
            for the <strong className="text-[#DAE69A] font-semibold">Next Gen athletes to thrive in sport</strong>, without compromising their <strong className="font-semibold">development, health and wellbeing</strong>.
          </motion.p>

          {/* Interactive Target Selector (Switch Buttons) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex p-1 bg-[#044443]/90 border border-[#FAF9F6]/10 rounded-full shadow-lg max-w-md w-full relative mt-2"
          >
            <button
              onClick={() => handleTargetChange(Target.Coach)}
              className={`flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 relative z-10 ${
                activeTarget === Target.Coach
                  ? 'text-[#032e30]'
                  : 'text-[#FAF9F6]/60 hover:text-[#FAF9F6]'
              }`}
            >
              For Coaches & Clubs
            </button>
            <button
              onClick={() => handleTargetChange(Target.Genitore)}
              className={`flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 relative z-10 ${
                activeTarget === Target.Genitore
                  ? 'text-[#032e30]'
                  : 'text-[#FAF9F6]/60 hover:text-[#FAF9F6]'
              }`}
            >
              For Parents & Families
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
          <div className="min-h-[110px] flex flex-col justify-start items-start w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTarget}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="flex flex-col items-start gap-4 w-full"
              >
                <p className="text-xs sm:text-sm text-[#FAF9F6]/60 leading-relaxed max-w-md">
                  {contentMap[activeTarget].subtext}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onJoinWaitlist}
                  className="px-8 py-3.5 bg-[#c8e6a0] text-[#032e30] text-xs sm:text-sm font-bold rounded-xl border border-[#FAF9F6]/10 shadow-lg hover:bg-[#c8e6a0]/90 transition-all uppercase tracking-wider"
                >
                  JOIN THE WAITLIST ✦
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll Down Hint (Only on desktop) */}
          <div className="hidden lg:flex absolute bottom-8 left-12 items-center gap-2 text-[10px] text-[#FAF9F6]/40 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34BBC0] animate-ping" />
            <span>SCROLL TO DISCOVER</span>
          </div>

        </div>

        {/* Right Column: Hero Image (Split Layout) */}
        <div className="lg:col-span-6 relative h-[400px] lg:h-auto overflow-hidden">
          <img 
            src="/src/assets/hero_athletes.png" 
            alt="U18 Female Athletes running on track" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay gradient to blend bottom/left edges on small viewports */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#032e30] via-transparent to-transparent opacity-40" />
        </div>

      </div>
    </section>
  );
};
