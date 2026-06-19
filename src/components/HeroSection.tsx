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
    <section className="relative min-h-screen bg-[#F6F4FF] text-[#0F0F12] border-b-[3px] border-black overflow-hidden">
      
      {/* Grid Layout: Split screen on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen items-stretch">
        
        {/* Left Column: Text Content */}
        <div className="lg:col-span-6 px-6 sm:px-12 py-24 flex flex-col justify-center items-start text-left gap-8 relative z-10 bg-[#F6F4FF]">
          
          {/* Upper Value Proposition Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EBE5FF] border-2 border-[#0F0F12] text-xs font-black tracking-wide text-[#0F0F12] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] max-w-xl leading-relaxed"
          >
            <span className="text-[#34BBC0] font-black">✦</span>
            <span>BAB is the first health and wellbeing app for U18 athletes, co-created with medical experts and elite athletes</span>
            <span className="text-[#34BBC0] font-black">✦</span>
          </motion.div>

          {/* Main Brand Title */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif font-black text-4xl sm:text-5xl lg:text-7xl tracking-tight text-[#0F0F12] leading-[1.1] max-w-xl text-balance"
          >
            Breaking <br />
            All Barriers
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg text-[#0F0F12]/90 max-w-xl leading-relaxed font-bold font-sans"
          >
            for the{' '}
            <span className="bg-[#FFDE4D] px-1.5 py-0.5 border border-black inline-block transform -rotate-1 font-black">
              Next Gen athletes to thrive in sport
            </span>
            , without compromising their{' '}
            <span className="underline decoration-2 decoration-[#34BBC0] font-black">
              development, health and wellbeing
            </span>
            .
          </motion.p>

          {/* Interactive Target Selector (Switch Buttons) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex p-1 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-md w-full relative mt-2 overflow-hidden"
            role="tablist"
            aria-label="Target selection"
          >
            <button
              role="tab"
              aria-selected={activeTarget === Target.Coach}
              aria-label="Show features for Coaches and Clubs"
              onClick={() => handleTargetChange(Target.Coach)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-black transition-all duration-300 relative z-10 focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none cursor-pointer ${
                activeTarget === Target.Coach
                  ? 'text-[#0F0F12]'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              For Coaches & Clubs
            </button>
            <button
              role="tab"
              aria-selected={activeTarget === Target.Genitore}
              aria-label="Show features for Parents and Families"
              onClick={() => handleTargetChange(Target.Genitore)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-black transition-all duration-300 relative z-10 focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none cursor-pointer ${
                activeTarget === Target.Genitore
                  ? 'text-[#0F0F12]'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              For Parents & Families
            </button>
            
            {/* Animated Background Selector */}
            <motion.div
              layoutId="activeTargetBg"
              className="absolute top-1 bottom-1 bg-[#34BBC0] border border-black rounded-lg z-0"
              style={{
                width: 'calc(50% - 6px)',
                left: activeTarget === Target.Coach ? '4px' : 'calc(50% + 2px)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </motion.div>

          {/* Dynamic Subtext and CTA Block */}
          <div className="min-h-[120px] flex flex-col justify-start items-start w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTarget}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="flex flex-col items-start gap-4 w-full"
              >
                <p className="text-xs sm:text-sm text-[#0F0F12]/70 font-semibold leading-relaxed max-w-md">
                  {contentMap[activeTarget].subtext}
                </p>
                
                <button
                  onClick={onJoinWaitlist}
                  aria-label="Join the waitlist to receive access"
                  className="neo-btn bg-[#34BBC0] font-black uppercase text-xs sm:text-sm"
                >
                  JOIN THE WAITLIST ✦
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll Down Hint (Only on desktop) */}
          <div className="hidden lg:flex absolute bottom-8 left-12 items-center gap-2 text-[10px] text-neutral-400 uppercase tracking-widest font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34BBC0] animate-ping" aria-hidden="true" />
            <span>SCROLL TO DISCOVER</span>
          </div>

        </div>

        {/* Right Column: Hero Image (Split Layout) */}
        <div className="lg:col-span-6 relative h-[400px] lg:h-auto overflow-hidden lg:border-l-[3px] lg:border-black">
          <img 
            src="/src/assets/hero_athletes.png" 
            alt="Three young female track athletes smiling on track field" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Minimal overlay for Neo-Brutalist graphic feel */}
          <div className="absolute inset-0 bg-[#0F0F12]/10" />
        </div>

      </div>
    </section>
  );
};
