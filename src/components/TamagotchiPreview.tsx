import React, { useState } from 'react';
import { motion } from 'framer-motion';

export type TamagotchiState = 'active' | 'default' | 'down';

export const TamagotchiPreview: React.FC = () => {
  const [state, setState] = useState<TamagotchiState>('default');

  return (
    <div className="w-full max-w-sm p-[1.5px] rounded-[20px] bg-gradient-to-br from-[#FAF9F6]/15 to-[#34BBC0]/5 shadow-2xl overflow-hidden glass-panel">
      <div className="p-6 flex flex-col gap-6 items-center text-[#FAF9F6]">
        
        {/* Widget Header */}
        <div className="w-full flex justify-between items-center border-b border-[#FAF9F6]/10 pb-3">
          <div>
            <h4 className="font-serif font-bold text-sm text-[#FAF9F6]">
              Stato dell'Atleta (Tamagotchi)
            </h4>
            <p className="text-[9px] text-[#FAF9F6]/40 uppercase tracking-widest mt-0.5">
              Dimostrazione App Atlete
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#171F2E] border border-[#FAF9F6]/10 text-[9px] font-bold text-[#DAE69A] uppercase tracking-wider">
            Live Demo
          </span>
        </div>

        {/* State Interactive Switcher */}
        <div className="flex gap-1 p-1 bg-[#080C12] border border-[#FAF9F6]/5 rounded-full w-full">
          {(['active', 'default', 'down'] as TamagotchiState[]).map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={`flex-1 py-1.5 px-3 rounded-full text-[10px] sm:text-xs font-bold transition-all capitalize ${
                state === s
                  ? 'bg-[#34BBC0] text-[#080C12]'
                  : 'text-[#FAF9F6]/60 hover:text-[#FAF9F6]'
              }`}
            >
              {s === 'active' ? 'Peak (High)' : s === 'default' ? 'Base (Mid)' : 'Rest (Low)'}
            </button>
          ))}
        </div>

        {/* Avatar Display Area */}
        <div className="relative w-48 h-48 flex items-center justify-center rounded-full bg-[#080C12]/50 border border-[#FAF9F6]/5 overflow-hidden">
          
          {/* Radial Glow for Active State */}
          {state === 'active' && (
            <div className="absolute w-[120px] h-[120px] bg-[#DAE69A] opacity-[0.15] rounded-full blur-[30px] pointer-events-none animate-pulse" />
          )}
          {state === 'default' && (
            <div className="absolute w-[100px] h-[100px] bg-[#34BBC0] opacity-[0.05] rounded-full blur-[25px] pointer-events-none" />
          )}

          {/* Surrounding Recovery Ring */}
          <div
            className={`absolute inset-3 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
              state === 'active'
                ? 'border-transparent bg-gradient-to-tr from-[#34BBC0] to-[#DAE69A] p-[2px]'
                : state === 'default'
                ? 'border-[#34BBC0]/40'
                : 'border-[#171F2E]'
            }`}
          >
            {state === 'active' && <div className="w-full h-full bg-[#080C12] rounded-full" />}
          </div>

          {/* Floating Stars / Particles for Active State */}
          {state === 'active' && (
            <>
              <motion.span
                animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                className="absolute top-8 left-12 text-[#DAE69A] text-xs"
              >
                ✦
              </motion.span>
              <motion.span
                animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
                className="absolute top-12 right-12 text-[#DAE69A] text-sm"
              >
                ✦
              </motion.span>
              <motion.span
                animate={{ y: [0, -12, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                className="absolute bottom-12 left-16 text-[#34BBC0] text-xs"
              >
                ✦
              </motion.span>
            </>
          )}

          {/* Zzz Speech Bubble for Down State */}
          {state === 'down' && (
            <motion.div
              animate={{ scale: [0.9, 1.05, 0.9], y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-6 right-8 bg-[#171F2E] border border-[#FAF9F6]/10 px-2 py-0.5 rounded-lg text-[9px] font-bold text-[#DAE69A]"
            >
              Zzz...
            </motion.div>
          )}

          {/* Tamagotchi Pixel Character */}
          <motion.div
            animate={
              state === 'active'
                ? { y: [0, -10, 0] }
                : state === 'default'
                ? { y: [0, -3, 0] }
                : { scaleY: [0.98, 1, 0.98] }
            }
            transition={
              state === 'active'
                ? { duration: 0.6, repeat: Infinity, ease: 'easeOut' }
                : state === 'default'
                ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }
            className={`w-20 h-20 flex flex-col items-center justify-center relative transition-all duration-500 ${
              state === 'down' ? 'opacity-75 desaturate-25' : ''
            }`}
          >
            {/* SVG Tamagotchi Render */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Blanket outline for down state */}
              {state === 'down' && (
                <path
                  d="M15 65 C 15 45, 85 45, 85 65 L 85 85 L 15 85 Z"
                  fill="#171F2E"
                  stroke="#FAF9F6"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              )}

              {/* Main Character Body (Retro style rounded bean) */}
              <rect
                x="25"
                y="30"
                width="50"
                height="45"
                rx="20"
                fill={state === 'down' ? '#171F2E' : '#34BBC0'}
                stroke="#FAF9F6"
                strokeWidth="3.5"
              />

              {/* Hands */}
              {state === 'active' ? (
                <>
                  {/* Hands Raised */}
                  <line x1="20" y1="35" x2="10" y2="20" stroke="#FAF9F6" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="80" y1="35" x2="90" y2="20" stroke="#FAF9F6" strokeWidth="4.5" strokeLinecap="round" />
                </>
              ) : state === 'default' ? (
                <>
                  {/* Hands Neutral */}
                  <line x1="20" y1="55" x2="12" y2="55" stroke="#FAF9F6" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="80" y1="55" x2="88" y2="55" stroke="#FAF9F6" strokeWidth="4.5" strokeLinecap="round" />
                </>
              ) : null}

              {/* Eyes */}
              {state === 'active' && (
                <>
                  {/* Sparkling Diamond Eyes */}
                  <polygon points="35,42 40,47 35,52 30,47" fill="#DAE69A" stroke="#FAF9F6" strokeWidth="1" />
                  <polygon points="65,42 70,47 65,52 60,47" fill="#DAE69A" stroke="#FAF9F6" strokeWidth="1" />
                </>
              )}
              {state === 'default' && (
                <>
                  {/* Simple round eyes */}
                  <circle cx="38" cy="48" r="4" fill="#FAF9F6" />
                  <circle cx="62" cy="48" r="4" fill="#FAF9F6" />
                </>
              )}
              {state === 'down' && (
                <>
                  {/* Curved sleeping eyes (u u) */}
                  <path d="M 33 46 Q 38 52 43 46" fill="none" stroke="#FAF9F6" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 57 46 Q 62 52 67 46" fill="none" stroke="#FAF9F6" strokeWidth="2.5" strokeLinecap="round" />
                </>
              )}

              {/* Mouth */}
              {state === 'active' && (
                <path d="M 43 57 Q 50 67 57 57 Z" fill="#DAE69A" stroke="#FAF9F6" strokeWidth="2" />
              )}
              {state === 'default' && (
                <line x1="45" y1="58" x2="55" y2="58" stroke="#FAF9F6" strokeWidth="3.5" strokeLinecap="round" />
              )}
              {state === 'down' && (
                <path d="M 46 58 Q 50 55 54 58" fill="none" stroke="#FAF9F6" strokeWidth="2.5" strokeLinecap="round" />
              )}
            </svg>
          </motion.div>
        </div>

        {/* Status Indicators Footer */}
        <div className="w-full flex justify-between items-center text-xs">
          <span className="text-[#FAF9F6]/50">Rapporto Prevenzione:</span>
          {state === 'active' && (
            <span className="font-bold text-[#DAE69A] animate-pulse flex items-center gap-1">
              ✦ Peak Performance (95%)
            </span>
          )}
          {state === 'default' && (
            <span className="font-bold text-[#34BBC0] flex items-center gap-1">
              ✦ Baseline Stabile (75%)
            </span>
          )}
          {state === 'down' && (
            <span className="font-bold text-[#DAE69A] flex items-center gap-1">
              ● Piano B Attivo (45%)
            </span>
          )}
        </div>

        {/* Down state context helper */}
        {state === 'down' && (
          <div className="text-[10px] text-[#FAF9F6]/60 text-center leading-relaxed bg-[#FAF9F6]/5 p-2.5 rounded-lg border border-[#FAF9F6]/10">
            "Oggi il tuo corpo sta usando energia extra. Consigliato scarico precauzionale. Stretching (10 min) per +50 XP."
          </div>
        )}
        
      </div>
    </div>
  );
};
