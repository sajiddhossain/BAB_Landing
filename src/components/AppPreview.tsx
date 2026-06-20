/**
 * @file      AppPreview.tsx
 * @summary   Componente UI per BAB (Breaking All Barriers)
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 * @notice    Questo codice è di proprietà intellettuale dell'autore. 
 *            L'utilizzo, la modifica o la distribuzione non autorizzata 
 *            sono severamente vietati in assenza di accordi contrattuali scritti.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AppScreen = 'CHOOSE_BUDDY' | 'CHECK_IN' | 'DASHBOARD' | 'PROFILE' | 'PIANO_B';

interface Buddy {
  id: string;
  name: string;
  emoji: string;
  bg: string;
}

const BUDDIES: Buddy[] = [
  { id: 'pulcino', name: 'pulcino', emoji: '🐣', bg: 'bg-[#FFE3D1]' },
  { id: 'gattino', name: 'gattino', emoji: '🐱', bg: 'bg-[#FFE3D1]/50' },
  { id: 'volpina', name: 'volpina', emoji: '🦊', bg: 'bg-[#FFE3D1]/50' },
  { id: 'coniglietto', name: 'coniglietto', emoji: '🐰', bg: 'bg-[#EBE5FF]/50' },
];

export const AppPreview: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('CHOOSE_BUDDY');
  const [selectedBuddy, setSelectedBuddy] = useState<Buddy>(BUDDIES[0]);
  const [mood, setMood] = useState<string>('');
  const [xp, setXp] = useState<number>(1240);
  const [streak] = useState<number>(5);

  const handleSelectBuddy = () => {
    setScreen('CHECK_IN');
  };

  const handleSelectMood = (selectedMood: string) => {
    setMood(selectedMood);
    if (selectedMood === 'carica!') {
      setXp(prev => prev + 10);
    }
    setScreen('DASHBOARD');
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white border-[3px] border-[#0F0F12] rounded-[40px] shadow-[8px_8px_0px_0px_rgba(15,15,18,0.95)] overflow-hidden relative flex flex-col min-h-[700px] text-[#0F0F12] font-sans">
      
      {/* Phone Notch/Speaker */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#0F0F12] rounded-full z-30 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mr-2" />
        <div className="w-12 h-1 bg-neutral-800 rounded" />
      </div>

      {/* App Content with Y2K Pop (Soft panna background) */}
      <div className="flex-1 pt-8 pb-16 px-5 flex flex-col bg-[#FAF9F6] overflow-y-auto max-h-[640px]">
        <AnimatePresence mode="wait">
          
          {/* SCREEN 1: CHOOSE BUDDY */}
          {screen === 'CHOOSE_BUDDY' && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="flex-1 flex flex-col text-center"
            >
              {/* Dot Indicators */}
              <div className="flex justify-center gap-1.5 my-4">
                <span className="w-2 h-2 rounded-full bg-[#0F0F12]/10" />
                <span className="w-6 h-2 rounded-full bg-[#34BBC0]" />
                <span className="w-2 h-2 rounded-full bg-[#0F0F12]/10" />
              </div>

              <h3 className="font-serif font-black text-2xl tracking-tight leading-tight mt-2 text-[#0F0F12]">
                scegli il tuo <br />
                <span className="text-[#34BBC0] font-serif">buddy ✦</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-1 font-bold">
                crescerà con te
              </p>

              {/* Grid of Buddies in Glassmorphism */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {BUDDIES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBuddy(b)}
                    className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all border-2 ${
                      selectedBuddy.id === b.id
                        ? 'bg-[#FFDE4D] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5'
                        : 'bg-white/50 backdrop-blur-md border-black/10 shadow-[1px_1px_0px_0px_rgba(0,0,0,0.05)] hover:bg-white/80'
                    }`}
                  >
                    <span className="text-4xl filter drop-shadow">{b.emoji}</span>
                    <span className="text-[10px] font-black text-[#0F0F12] uppercase tracking-wider">
                      {b.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* CTA Action */}
              <div className="mt-auto pt-6 flex flex-col items-center">
                <button
                  onClick={handleSelectBuddy}
                  className="w-full y2k-btn bg-[#34BBC0] font-black"
                >
                  scelgo te! ✦
                </button>
                <span className="text-[10px] text-neutral-400 mt-2 font-black uppercase tracking-wider">
                  posso cambiarlo dopo
                </span>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: CHECK IN */}
          {screen === 'CHECK_IN' && (
            <motion.div
              key="checkin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: 'spring', damping: 22, stiffness: 220 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-6"
            >
              {/* Buddy Glow */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#EBE5FF] opacity-60 rounded-full blur-2xl scale-125" />
                <div className="relative w-28 h-28 bg-white/60 backdrop-blur-md border-2 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-5xl animate-bounce">{selectedBuddy.emoji}</span>
                </div>
              </div>

              <h3 className="font-serif font-black text-2xl text-[#0F0F12] tracking-tight leading-tight mb-6">
                come ti senti?
              </h3>

              {/* Mood options (Vibrant glass cards) */}
              <div className="w-full flex flex-col gap-3">
                <button
                  onClick={() => handleSelectMood('carica!')}
                  className="w-full py-4 px-5 bg-[#34BBC0]/85 backdrop-blur-sm border-2 border-black rounded-2xl flex items-center font-black text-[#0F0F12] text-left gap-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span className="text-xl">⚡</span>
                  <span className="flex-1 font-black">carica!</span>
                </button>
                <button
                  onClick={() => handleSelectMood('ok')}
                  className="w-full py-4 px-5 bg-[#EBE5FF]/85 backdrop-blur-sm border-2 border-black rounded-2xl flex items-center font-black text-[#0F0F12] text-left gap-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span className="text-xl">👌</span>
                  <span className="flex-1 font-black">ok</span>
                </button>
                <button
                  onClick={() => handleSelectMood('meh')}
                  className="w-full py-4 px-5 bg-[#FFE3D1]/85 backdrop-blur-sm border-2 border-black rounded-2xl flex items-center font-black text-[#0F0F12] text-left gap-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span className="text-xl">😴</span>
                  <span className="flex-1 font-black">meh</span>
                </button>
              </div>

              <span className="text-[10px] text-neutral-400 mt-6 font-black uppercase tracking-wider">
                non c'è una risposta sbagliata 💛
              </span>
            </motion.div>
          )}

          {/* SCREEN 3: DASHBOARD */}
          {screen === 'DASHBOARD' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="flex-1 flex flex-col"
            >
              {/* Custom Header */}
              <div className="flex justify-between items-center py-2">
                <span className="font-serif font-black text-xl text-[#0F0F12]">
                  hey irene
                </span>
                <span className="px-3 py-1 bg-[#34BBC0] border-2 border-black rounded-full text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                  ✦ {xp}
                </span>
              </div>

              {/* Buddy Glow Area */}
              <div className="flex-1 flex flex-col items-center justify-center py-4">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[#D1FFEF] opacity-75 rounded-full blur-2xl scale-125" />
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="relative w-36 h-36 bg-white/50 backdrop-blur-md border-2 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <span className="text-6xl">{selectedBuddy.emoji}</span>
                  </motion.div>
                </div>

                <button
                  onClick={() => setScreen('CHECK_IN')}
                  className="px-6 py-2.5 bg-white border-2 border-black rounded-full text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] tracking-wide hover:bg-neutral-50 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] transition-all uppercase cursor-pointer"
                >
                  toccami · dimmi come stai
                </button>
              </div>

              {/* Glassmorphic Cards Grid */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <div className="p-4 bg-white/60 backdrop-blur-md border-2 border-black rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-xl font-black text-[#34BBC0] flex items-center justify-between">
                    <span>{streak}/7</span>
                    <span className="text-sm text-black">✦</span>
                  </div>
                  <span className="text-[9px] uppercase font-black text-neutral-400 block mt-1">
                    streak
                  </span>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <span
                        key={day}
                        className={`w-2.5 h-2.5 rounded-full border border-black/20 ${
                          day <= streak ? 'bg-[#34BBC0]' : 'bg-neutral-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white/60 backdrop-blur-md border-2 border-black rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black block text-[#0F0F12]">
                      ⚡ energia alta
                    </span>
                    {mood && (
                      <span className="text-[9px] text-[#34BBC0] font-black block mt-0.5 capitalize">
                        Stato: {mood}
                      </span>
                    )}
                    <span className="text-[8px] text-neutral-500 font-bold block mt-0.5 leading-tight">
                      oggi puoi spingere 🔥
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN 4: PROFILE ME */}
          {screen === 'PROFILE' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="flex-1 flex flex-col"
            >
              {/* Profile Top */}
              <div className="flex flex-col items-center text-center mt-2">
                <div className="relative mb-2">
                  <div className="absolute inset-0 bg-[#EBE5FF] opacity-50 rounded-full blur-xl" />
                  <div className="relative w-20 h-20 bg-white/60 backdrop-blur-md border-2 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-4xl">🐣</span>
                  </div>
                </div>

                <h3 className="font-serif font-black text-xl text-[#0F0F12]">
                  Irene
                </h3>
                <span className="mt-1 px-3 py-0.5 bg-[#EBE5FF] border-2 border-black rounded-full text-[9px] font-black tracking-wide uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  lv.4 · cosmic runner 🚀
                </span>
              </div>

              {/* Stats Row in Glass */}
              <div className="grid grid-cols-3 gap-2 mt-5">
                {[
                  { val: xp, label: 'XP' },
                  { val: '23', label: 'days' },
                  { val: '5', label: 'badges' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/60 backdrop-blur-sm border-2 border-black rounded-xl p-2 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-sm font-black block text-[#34BBC0]">{stat.val}</span>
                    <span className="text-[8px] text-neutral-400 font-black uppercase tracking-wider block">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Badges Section */}
              <div className="mt-4">
                <span className="text-[10px] font-black text-neutral-500 block mb-1.5 uppercase tracking-wider">
                  ✦ badges
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { label: 'zen', icon: '🧘' },
                    { label: 'streak', icon: '🔥' },
                    { label: 'week 1', icon: '💪' },
                    { label: 'rest', icon: '🌙' },
                  ].map((badge) => (
                    <div
                      key={badge.label}
                      className="bg-white/60 backdrop-blur-sm border-2 border-black rounded-xl p-1.5 flex flex-col items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <span className="text-xl">{badge.icon}</span>
                      <span className="text-[8px] font-black uppercase text-neutral-500 mt-1 leading-none text-center">
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evolution Bar */}
              <div className="mt-4 p-2.5 bg-[#D1FFEF]/80 backdrop-blur-sm border-2 border-black rounded-xl flex items-center justify-between text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-1.5">
                  <span>🐣</span>
                  <span>➔</span>
                  <span>🐥</span>
                </div>
                <span className="text-[9px] font-black text-neutral-600">prossima evoluzione ancora 60 XP ✦</span>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[
                  { label: 'avatar', icon: '🎨' },
                  { label: 'notifiche', icon: '🔔' },
                  { label: 'privacy', icon: '🔒' },
                  { label: 'altro', icon: '⚙️' },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="p-2 bg-white/60 backdrop-blur-sm border-2 border-black rounded-xl flex flex-col items-center justify-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-white"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[8px] font-black text-neutral-500 uppercase">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* SCREEN 5: PIANO B */}
          {screen === 'PIANO_B' && (
            <motion.div
              key="pianob"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col text-center justify-center items-center py-6"
            >
              <div className="w-16 h-16 bg-[#FFDE4D] border-2 border-black rounded-full flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-3xl">◎</span>
              </div>
              <h3 className="font-serif font-black text-2xl text-[#0F0F12] tracking-tight">
                piano b
              </h3>
              <p className="text-xs text-neutral-500 max-w-[200px] mt-2 font-bold leading-relaxed">
                Il tuo piano di allenamento alternativo personalizzato in base al ciclo biologico.
              </p>
              <button
                onClick={() => setScreen('DASHBOARD')}
                className="mt-6 y2k-btn py-2 px-4 text-xs font-black"
              >
                Torna alla Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Simulated Phone Bottom Nav Bar */}
      <div className="absolute bottom-0 inset-x-0 h-14 bg-white border-t-2 border-black flex items-center justify-around z-20">
        <button
          onClick={() => setScreen('DASHBOARD')}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-colors ${
            screen === 'DASHBOARD' || screen === 'CHECK_IN' || screen === 'CHOOSE_BUDDY'
              ? 'text-[#34BBC0]'
              : 'text-neutral-400 hover:text-[#0F0F12]'
          }`}
        >
          <span className="text-lg">✦</span>
          <span className="text-[9px] font-black uppercase">home</span>
        </button>
        
        <button
          onClick={() => setScreen('PIANO_B')}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-colors ${
            screen === 'PIANO_B'
              ? 'text-[#34BBC0]'
              : 'text-neutral-400 hover:text-[#0F0F12]'
          }`}
        >
          <span className="text-lg">◎</span>
          <span className="text-[9px] font-black uppercase">piano b</span>
        </button>

        <button
          onClick={() => setScreen('PROFILE')}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-colors ${
            screen === 'PROFILE' ? 'text-[#34BBC0]' : 'text-neutral-400 hover:text-[#0F0F12]'
          }`}
        >
          <span className="text-lg">☆</span>
          <span className="text-[9px] font-black uppercase">me</span>
        </button>
      </div>
    </div>
  );
};
