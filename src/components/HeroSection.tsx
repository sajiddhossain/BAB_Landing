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
      subtext: 'Riduci gli infortuni del team del 60% ed evita che le ragazze mollino la squadra.',
    },
    [Target.Genitore]: {
      subtext: 'Aiuta tua figlia a capire i segnali del suo corpo e a fare sport in sicurezza.',
    },
  };

  return (
    <section className="relative min-h-screen bg-[#F6F4FF] text-[#0F0F12] border-b-[3px] border-black overflow-hidden flex flex-col justify-center">
      
      {/* Grid Layout: Split screen on Desktop, single column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen items-stretch">
        
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 px-4 sm:px-8 lg:px-12 py-20 lg:py-24 flex flex-col justify-center items-start text-left gap-6 sm:gap-8 relative z-10 bg-[#F6F4FF]">
          
          {/* Logo element for mobile-centered UI (hidden on desktop if logo is in header) */}
          <div className="flex lg:hidden items-center gap-2 mb-2">
            <img src="/logo.svg" alt="BAB Logo" className="h-8 w-auto" />
            <span className="px-2 py-0.5 rounded-lg bg-[#EBE5FF] border-2 border-black text-[9px] font-black text-[#0F0F12] tracking-wider uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              Protocollo Prevenzione
            </span>
          </div>

          {/* Main Brand Title */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#0F0F12] leading-[1.1] max-w-2xl text-balance"
          >
            BAB — Il primo sistema per proteggere la salute delle atlete e fermare gli infortuni.
          </motion.h1>

          {/* Dynamic Switch Buttons in Y2K Glassmorphism with Brackets */}
          <div className="w-full max-w-md flex flex-row gap-3 mt-2">
            <button
              onClick={() => handleTargetChange(Target.Coach)}
              className={`flex-1 py-3.5 px-3 rounded-xl font-black text-xs sm:text-sm transition-all border-2 border-black cursor-pointer text-center ${
                activeTarget === Target.Coach
                  ? 'bg-[#FFDE4D] shadow-[3.5px_3.5px_0px_0px_rgba(15,15,18,0.95)] -translate-y-0.5'
                  : 'bg-white/40 backdrop-blur-md hover:bg-white/60 border-[1.5px] border-black/15 shadow-[1.5px_1.5px_0px_0px_rgba(15,15,18,0.05)]'
              }`}
            >
              [ Sono un Allenatore ]
            </button>
            <button
              onClick={() => handleTargetChange(Target.Genitore)}
              className={`flex-1 py-3.5 px-3 rounded-xl font-black text-xs sm:text-sm transition-all border-2 border-black cursor-pointer text-center ${
                activeTarget === Target.Genitore
                  ? 'bg-[#FFDE4D] shadow-[3.5px_3.5px_0px_0px_rgba(15,15,18,0.95)] -translate-y-0.5'
                  : 'bg-white/40 backdrop-blur-md hover:bg-white/60 border-[1.5px] border-black/15 shadow-[1.5px_1.5px_0px_0px_rgba(15,15,18,0.05)]'
              }`}
            >
              [ Sono un Genitore ]
            </button>
          </div>

          {/* Dynamic Subtext and CTA Block */}
          <div className="min-h-[110px] flex flex-col justify-start items-start w-full gap-4 max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTarget}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="flex flex-col items-start gap-4 w-full"
              >
                <p className="text-xs sm:text-sm text-neutral-600 font-bold leading-relaxed">
                  {contentMap[activeTarget].subtext}
                </p>
                
                <button
                  onClick={onJoinWaitlist}
                  aria-label="Entra nella lista d'attesa"
                  className="y2k-btn bg-[#34BBC0] font-black uppercase text-xs sm:text-sm"
                >
                  Entra nella Waitlist ✦
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll Down Hint (Only on desktop) */}
          <div className="hidden lg:flex absolute bottom-8 left-12 items-center gap-2 text-[10px] text-neutral-400 uppercase tracking-widest font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34BBC0] animate-ping" aria-hidden="true" />
            <span>SCORRI PER SCOPRIRE</span>
          </div>

        </div>

        {/* Right Column: Hero Image (Split Layout) */}
        <div className="lg:col-span-5 relative h-[300px] sm:h-[400px] lg:h-auto overflow-hidden lg:border-l-[3px] lg:border-black">
          <img 
            src="/src/assets/hero_athletes.png" 
            alt="Tre giovani atlete di atletica sorridenti sulla pista di corsa" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F0F12]/10" />
        </div>

      </div>
    </section>
  );
};
