import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type PetAction = 'NONE' | 'EAT' | 'PLAY' | 'SLEEP';
type PetMood = 'HAPPY' | 'HUNGRY' | 'TIRED' | 'SICK';

export const TamagotchiPreview: React.FC = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number>(0);
  const [currentAction, setCurrentAction] = useState<PetAction>('NONE');
  const [mood, setMood] = useState<PetMood>('HAPPY');
  const [hearts, setHearts] = useState<number>(4);
  const [xp, setXp] = useState<number>(100);
  
  const menuItems = [
    { label: 'Cibo', icon: '🍗', action: 'EAT' as PetAction },
    { label: 'Gioco', icon: '⚽', action: 'PLAY' as PetAction },
    { label: 'Nanna', icon: '💤', action: 'SLEEP' as PetAction },
  ];

  // Auto mood degradation over time (simulated)
  useEffect(() => {
    const timer = setInterval(() => {
      setHearts(h => (h > 1 ? h - 1 : h));
      setMood(m => {
        if (m === 'HAPPY') return 'HUNGRY';
        if (m === 'HUNGRY') return 'TIRED';
        return 'SICK';
      });
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // Button A: Cycle through menu
  const pressButtonA = () => {
    if (currentAction !== 'NONE') return;
    setActiveMenuIndex(prev => (prev + 1) % menuItems.length);
  };

  // Button B: Confirm action
  const pressButtonB = () => {
    if (currentAction !== 'NONE') return;
    
    const selected = menuItems[activeMenuIndex];
    setCurrentAction(selected.action);
    
    // Animate state change
    setTimeout(() => {
      setCurrentAction('NONE');
      
      // Update pet state based on action
      if (selected.action === 'EAT') {
        setHearts(4);
        setMood('HAPPY');
        setXp(x => x + 15);
      } else if (selected.action === 'PLAY') {
        setHearts(h => Math.min(4, h + 1));
        setMood(m => m === 'HUNGRY' ? 'TIRED' : 'HAPPY');
        setXp(x => x + 25);
      } else if (selected.action === 'SLEEP') {
        setHearts(4);
        setMood('HAPPY');
        setXp(x => x + 10);
      }
    }, 3000);
  };

  // Button C: Cancel / Reset
  const pressButtonC = () => {
    if (currentAction !== 'NONE') {
      setCurrentAction('NONE');
    } else {
      // Diagnostic check reset
      setMood('HAPPY');
      setHearts(4);
    }
  };

  // Determine pet sprite based on status and action
  const getPetSprite = () => {
    if (currentAction === 'EAT') return '😋🐥🍗';
    if (currentAction === 'PLAY') return '🏃🐥⚽';
    if (currentAction === 'SLEEP') return '💤😴💤';
    
    if (mood === 'HAPPY') return '🐥✨';
    if (mood === 'HUNGRY') return '😭🐣';
    if (mood === 'TIRED') return '🥱💤';
    return '🤒💔';
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Physical Tamagotchi Toy Shell Wrapper */}
      <div className="relative w-80 h-[450px] bg-gradient-to-br from-[#FF007F] via-[#FF007F] to-[#7B00FF] border-[5px] border-black rounded-[140px/180px] shadow-[10px_10px_0px_0px_rgba(15,15,18,0.95)] flex flex-col items-center justify-between p-7 overflow-hidden select-none">
        
        {/* Y2K Shell Decals (Retro stars and loops) */}
        <div className="absolute top-8 left-10 text-white/30 text-2xl font-black">✦</div>
        <div className="absolute top-12 right-12 text-[#FFDE4D]/40 text-3xl font-black">★</div>
        <div className="absolute bottom-24 left-10 text-[#00F0FF]/30 text-3xl font-black">✦</div>
        
        {/* Keyring Loop at Top */}
        <div className="absolute -top-1 w-10 h-10 border-[5px] border-black rounded-full bg-neutral-200 z-0" />
        
        {/* Brand Text Printed on Shell */}
        <div className="text-[14px] font-black text-[#FFDE4D] tracking-widest uppercase font-serif mt-2 relative z-10 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          ★ BAB BUDDY ★
        </div>

        {/* LCD Screen Outer Bezel */}
        <div className="w-[220px] h-[190px] bg-neutral-300 border-[4px] border-black rounded-[24px] p-3 flex items-center justify-center shadow-inner relative z-10">
          
          {/* LCD Screen Display (Monochrome Greenish Backlight Grid) */}
          <div className="w-full h-full bg-[#8E9B79] border-[3px] border-black rounded-lg p-1.5 flex flex-col justify-between relative overflow-hidden font-mono text-[#0F0F12]">
            
            {/* Fine LCD grid scanline overlay */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[linear-gradient(rgba(0,0,0,1)_50%,transparent_50%)] bg-[length:100%_4px]" />

            {/* Top Status Bar (Menu Icons) */}
            <div className="flex justify-between items-center border-b border-black/40 pb-1 text-xs">
              {menuItems.map((item, idx) => (
                <div 
                  key={item.label}
                  className={`px-1.5 py-0.5 rounded font-black flex items-center gap-0.5 transition-all ${
                    activeMenuIndex === idx && currentAction === 'NONE'
                      ? 'bg-black text-[#8E9B79]' 
                      : ''
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-[8px] font-black tracking-tighter uppercase">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Screen Inner Display Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={getPetSprite()}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="text-4xl flex flex-col items-center gap-1"
                >
                  {/* Sprite rendering */}
                  <span className="filter drop-shadow-md tracking-wider">
                    {getPetSprite()}
                  </span>
                  
                  {/* Status Indicator text on LCD */}
                  <span className="text-[8px] font-black uppercase tracking-widest mt-1 bg-black/10 px-1">
                    {currentAction !== 'NONE' ? `${currentAction}...` : `MOOD: ${mood}`}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom LCD Dashboard (Hearts & XP) */}
            <div className="flex justify-between items-center border-t border-black/40 pt-1 text-[8px] font-black uppercase">
              {/* Hearts representation */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map(h => (
                  <span key={h} className="text-[10px]">
                    {h <= hearts ? '❤️' : '🖤'}
                  </span>
                ))}
              </div>
              
              {/* XP display */}
              <span>XP: {xp}</span>
            </div>
            
          </div>
        </div>

        {/* Brand Liquid Label */}
        <div className="text-[10px] text-white/80 font-black tracking-widest uppercase mt-1">
          ✦ 1997 CLASSIC EDITION ✦
        </div>

        {/* Tamagotchi Physical Action Buttons Row */}
        <div className="flex justify-between w-[200px] px-3 pb-2 mt-2 relative z-10">
          
          {/* Button A (Left) */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={pressButtonA}
              className="w-10 h-10 rounded-full bg-[#00F0FF] border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer transition-all focus:outline-none"
              aria-label="Tasto A: Seleziona"
            />
            <span className="text-[9px] font-black text-white uppercase tracking-wider drop-shadow-md">A</span>
          </div>

          {/* Button B (Center) */}
          <div className="flex flex-col items-center gap-1 -translate-y-1">
            <button
              onClick={pressButtonB}
              className="w-11 h-11 rounded-full bg-[#FFDE4D] border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer transition-all focus:outline-none"
              aria-label="Tasto B: Conferma"
            />
            <span className="text-[9px] font-black text-white uppercase tracking-wider drop-shadow-md">B</span>
          </div>

          {/* Button C (Right) */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={pressButtonC}
              className="w-10 h-10 rounded-full bg-[#39FF14] border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer transition-all focus:outline-none"
              aria-label="Tasto C: Indietro"
            />
            <span className="text-[9px] font-black text-white uppercase tracking-wider drop-shadow-md">C</span>
          </div>

        </div>

      </div>

      {/* Under-toy instructions */}
      <div className="text-center font-bold text-xs text-neutral-500 max-w-xs leading-relaxed">
        <p>
          Clicca su <strong className="text-black">A</strong> per scorrere il menu LCD superiore, su <strong className="text-black">B</strong> per confermare l'azione ed accudire il tuo Buddy, e su <strong className="text-black">C</strong> per annullare/resettare.
        </p>
      </div>
    </div>
  );
};
