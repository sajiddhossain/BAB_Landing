import React, { useState } from 'react';
import { motion } from 'framer-motion';

export type TamagotchiState = 'active' | 'default' | 'down';

export const TamagotchiPreview: React.FC = () => {
  const [state, setState] = useState<TamagotchiState>('default');

  return (
    <div className="w-full max-w-sm bg-white border-[3px] border-black rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-[#0F0F12] overflow-hidden">
      <div className="p-6 flex flex-col gap-6 items-center">
        
        {/* Widget Header */}
        <div className="w-full flex justify-between items-center border-b-2 border-black pb-3">
          <div>
            <h4 className="font-serif font-black text-sm text-[#0F0F12]">
              Stato dell'Atleta (Tamagotchi)
            </h4>
            <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-black mt-0.5">
              Dimostrazione App Atlete
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-lg bg-[#FFDE4D] border-2 border-black text-[9px] font-black text-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            Live Demo
          </span>
        </div>

        {/* State Interactive Switcher */}
        <div className="flex gap-2 p-1 bg-[#F6F4FF] border-2 border-black rounded-xl w-full">
          {(['active', 'default', 'down'] as TamagotchiState[]).map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={`flex-1 py-2 px-3 rounded-lg text-[10px] sm:text-xs font-black transition-all capitalize border-2 border-transparent cursor-pointer ${
                state === s
                  ? 'bg-[#34BBC0] text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              {s === 'active' ? 'Peak (High)' : s === 'default' ? 'Base (Mid)' : 'Rest (Low)'}
            </button>
          ))}
        </div>

        {/* Avatar Display Area */}
        <div className="relative w-48 h-48 flex items-center justify-center rounded-full bg-[#FFE3D1]/50 border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          
          {/* Radial Glow for Active State */}
          {state === 'active' && (
            <div className="absolute w-[120px] h-[120px] bg-[#FFDE4D] opacity-[0.25] rounded-full blur-[20px] pointer-events-none animate-pulse" />
          )}

          {/* Surrounding Recovery Ring */}
          <div
            className={`absolute inset-3 rounded-full border-2 border-black transition-all duration-500 flex items-center justify-center`}
          >
            {state === 'active' && <div className="w-full h-full bg-[#D1FFEF] rounded-full opacity-30" />}
          </div>

          {/* Floating Stars / Particles for Active State */}
          {state === 'active' && (
            <>
              <motion.span
                animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                className="absolute top-8 left-12 text-[#FFDE4D] text-xs font-black drop-shadow"
              >
                ✦
              </motion.span>
              <motion.span
                animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
                className="absolute top-12 right-12 text-[#34BBC0] text-sm font-black drop-shadow"
              >
                ✦
              </motion.span>
              <motion.span
                animate={{ y: [0, -12, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                className="absolute bottom-12 left-16 text-[#34BBC0] text-xs font-black drop-shadow"
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
              className="absolute top-6 right-8 bg-white border-2 border-black px-2 py-0.5 rounded-lg text-[9px] font-black text-[#0F0F12] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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
                  fill="#EBE5FF"
                  stroke="#0F0F12"
                  strokeWidth="2.5"
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
                fill={state === 'down' ? '#EBE5FF' : '#FFDE4D'}
                stroke="#0F0F12"
                strokeWidth="3.5"
              />

              {/* Hands */}
              {state === 'active' ? (
                <>
                  {/* Hands Raised */}
                  <line x1="20" y1="35" x2="10" y2="20" stroke="#0F0F12" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="80" y1="35" x2="90" y2="20" stroke="#0F0F12" strokeWidth="4.5" strokeLinecap="round" />
                </>
              ) : state === 'default' ? (
                <>
                  {/* Hands Neutral */}
                  <line x1="20" y1="55" x2="12" y2="55" stroke="#0F0F12" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="80" y1="55" x2="88" y2="55" stroke="#0F0F12" strokeWidth="4.5" strokeLinecap="round" />
                </>
              ) : null}

              {/* Eyes */}
              {state === 'active' && (
                <>
                  {/* Sparkling Diamond Eyes */}
                  <polygon points="35,42 40,47 35,52 30,47" fill="#34BBC0" stroke="#0F0F12" strokeWidth="1" />
                  <polygon points="65,42 70,47 65,52 60,47" fill="#34BBC0" stroke="#0F0F12" strokeWidth="1" />
                </>
              )}
              {state === 'default' && (
                <>
                  {/* Simple round eyes */}
                  <circle cx="38" cy="48" r="4.5" fill="#0F0F12" />
                  <circle cx="62" cy="48" r="4.5" fill="#0F0F12" />
                </>
              )}
              {state === 'down' && (
                <>
                  {/* Curved sleeping eyes (u u) */}
                  <path d="M 33 46 Q 38 52 43 46" fill="none" stroke="#0F0F12" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 57 46 Q 62 52 67 46" fill="none" stroke="#0F0F12" strokeWidth="3" strokeLinecap="round" />
                </>
              )}

              {/* Mouth */}
              {state === 'active' && (
                <path d="M 43 57 Q 50 67 57 57 Z" fill="#FFE3D1" stroke="#0F0F12" strokeWidth="2.5" />
              )}
              {state === 'default' && (
                <line x1="45" y1="58" x2="55" y2="58" stroke="#0F0F12" strokeWidth="4" strokeLinecap="round" />
              )}
              {state === 'down' && (
                <path d="M 46 58 Q 50 55 54 58" fill="none" stroke="#0F0F12" strokeWidth="2.5" strokeLinecap="round" />
              )}
            </svg>
          </motion.div>
        </div>

        {/* Status Indicators Footer */}
        <div className="w-full flex justify-between items-center text-xs">
          <span className="text-neutral-500 font-bold">Stato Prevenzione:</span>
          {state === 'active' && (
            <span className="font-black text-[#34BBC0] flex items-center gap-1">
              ✦ Peak Performance (95%)
            </span>
          )}
          {state === 'default' && (
            <span className="font-black text-amber-500 flex items-center gap-1">
              ✦ Baseline Stabile (75%)
            </span>
          )}
          {state === 'down' && (
            <span className="font-black text-rose-500 flex items-center gap-1">
              ● Piano B Attivo (45%)
            </span>
          )}
        </div>

        {/* Down state context helper */}
        {state === 'down' && (
          <div className="text-[10px] text-neutral-600 text-center font-bold leading-relaxed bg-[#EBE5FF] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            "Oggi il tuo corpo sta usando energia extra. Consigliato scarico precauzionale. Stretching (10 min) per +50 XP."
          </div>
        )}
        
      </div>
    </div>
  );
};
