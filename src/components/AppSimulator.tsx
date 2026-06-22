/**
 * @file      AppSimulator.tsx
 * @summary   Demo-gioco "BAB Buddy": un Tamagotchi che riflette il corpo dell'atleta.
 *            Il Buddy parte un po' giù; lo si tiene su con micro-task tattili da 5-10s
 *            (bevi, ricarica, coccola, respira). Niente quiz: solo gesti e feedback.
 *            Al top → festa + reveal: coach e genitori vedono solo un segnale 🟢, mai i dettagli.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { UserType } from '../lib/leads';

interface AppSimulatorProps {
  onOpenWaitlist?: (target?: UserType) => void;
}

const INK = '#0F0F12';

/* ───────── Buddy espressivo (SVG, mobile-friendly) ───────── */
type Mood = 'sleepy' | 'meh' | 'ok' | 'happy' | 'star';
const MOOD_BG: Record<Mood, string> = { sleepy: '#E8E4D8', meh: '#FFE3D1', ok: '#8FD4E8', happy: '#D2EC7C', star: '#FFC042' };

function Buddy({ mood, bounce }: { mood: Mood; bounce: number }) {
  const eyes =
    mood === 'sleepy' ? (
      <>
        <line x1="30" y1="46" x2="42" y2="46" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
        <line x1="58" y1="46" x2="70" y2="46" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
      </>
    ) : mood === 'star' ? (
      <>
        <path d="M30 47 L36 40 L42 47" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M58 47 L64 40 L70 47" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : mood === 'meh' ? (
      <>
        <circle cx="36" cy="46" r="3.6" fill={INK} />
        <circle cx="64" cy="46" r="3.6" fill={INK} />
      </>
    ) : (
      <>
        <circle cx="36" cy="44" r="5" fill={INK} />
        <circle cx="64" cy="44" r="5" fill={INK} />
      </>
    );

  const mouth =
    mood === 'sleepy' || mood === 'meh' ? (
      <path d="M42 72 Q50 67 58 72" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
    ) : mood === 'star' ? (
      <path d="M34 64 Q50 86 66 64 Z" fill={INK} />
    ) : (
      <path d="M34 66 Q50 80 66 66" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
    );

  return (
    <motion.svg
      key={bounce}
      initial={{ scale: 0.9, y: 4 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 360, damping: 12 }}
      width="120" height="120" viewBox="0 0 100 100" role="img" aria-label="Il tuo Buddy BAB"
      className="shrink-0 drop-shadow-[4px_4px_0_#0F0F12]"
    >
      <rect x="6" y="9" width="88" height="82" rx="26" fill={MOOD_BG[mood]} stroke={INK} strokeWidth="4.5" />
      <circle cx="24" cy="62" r="4" fill="#FF8FB1" opacity="0.85" />
      <circle cx="76" cy="62" r="4" fill="#FF8FB1" opacity="0.85" />
      {mood === 'star' && <text x="50" y="6" textAnchor="middle" fontSize="14">👑</text>}
      {eyes}
      {mouth}
    </motion.svg>
  );
}

/* ───────── Care actions ───────── */
type CareId = 'acqua' | 'energia' | 'umore' | 'calma';
const CARE = [
  { id: 'acqua' as const, emoji: '💧', label: 'Acqua', color: '#8FD4E8', verb: 'Tieni premuto per versare' },
  { id: 'energia' as const, emoji: '🔋', label: 'Energia', color: '#D2EC7C', verb: 'Tocca veloce per caricare' },
  { id: 'umore' as const, emoji: '❤️', label: 'Umore', color: '#FF8FB1', verb: 'Coccola il Buddy' },
  { id: 'calma' as const, emoji: '🌙', label: 'Calma', color: '#B8A9E8', verb: 'Respira con lui' },
];

const START: Record<CareId, number> = { acqua: 30, energia: 20, umore: 35, calma: 25 };

function moodFor(avg: number, allFull: boolean): Mood {
  if (allFull) return 'star';
  if (avg < 35) return 'sleepy';
  if (avg < 55) return 'meh';
  if (avg < 85) return 'ok';
  return 'happy';
}

/* ───────── Componente ───────── */
export default function AppSimulator({ onOpenWaitlist }: AppSimulatorProps) {
  const [meters, setMeters] = useState<Record<CareId, number>>({ ...START });
  const [active, setActive] = useState<CareId | null>(null);
  const [done, setDone] = useState(false);
  const [bounce, setBounce] = useState(0);
  const [hearts, setHearts] = useState<number[]>([]);

  const avg = (meters.acqua + meters.energia + meters.umore + meters.calma) / 4;
  const allFull = CARE.every(c => meters[c.id] >= 100);
  const mood: Mood = moodFor(avg, allFull && done);
  const buddyLine = done
    ? 'GRAZIE! Mi hai tenuto al top oggi 💛'
    : allFull
    ? 'Sono al massimo! Tocca “Fatto” 👇'
    : avg < 40
    ? 'Ehi… oggi sono un po’ giù. Mi dai una mano?'
    : 'Mi sento meglio! Continua così 💪';

  const fill = (id: CareId) => {
    setMeters(m => ({ ...m, [id]: 100 }));
    setBounce(b => b + 1);
    setActive(null);
  };
  const bump = () => setBounce(b => b + 1);
  const addHeart = () => setHearts(h => [...h, Date.now() + Math.floor(performance.now())]);
  const reset = () => { setMeters({ ...START }); setDone(false); setActive(null); setHearts([]); };

  /* ---------- HUB ---------- */
  if (done) return <Page><Done onOpenWaitlist={onOpenWaitlist} onReset={reset} mood={mood} bounce={bounce} /></Page>;

  return (
    <Page>
      <div className="bg-[#0F0F12] p-2 border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12]">
        <div className="bg-white border-[3px] border-black p-4 sm:p-5">

          {/* Buddy + battuta */}
          <div className="flex items-center gap-3 mb-4 min-h-[120px]">
            <Buddy mood={mood} bounce={bounce} />
            <p className="text-sm font-bold leading-snug bg-[#FAF9F6] border-[2px] border-black p-2.5 shadow-[3px_3px_0_0_#0F0F12] flex-1">
              {buddyLine}
            </p>
          </div>

          {/* Indicatori */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5">
            {CARE.map(c => (
              <div key={c.id}>
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wide mb-0.5">
                  <span>{c.emoji} {c.label}</span><span>{meters[c.id]}%</span>
                </div>
                <div className="h-3 border-[2px] border-black bg-white overflow-hidden">
                  <div className="h-full transition-[width] duration-500 ease-out" style={{ width: `${meters[c.id]}%`, backgroundColor: c.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Pulsanti cura */}
          {!active && !allFull && (
            <div className="grid grid-cols-2 gap-2.5">
              {CARE.map(c => {
                const full = meters[c.id] >= 100;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActive(c.id)}
                    disabled={full}
                    className={`min-h-[60px] p-2 border-[3px] border-black font-black text-sm flex flex-col items-center justify-center gap-0.5 transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${full ? 'bg-[#DAE69A] opacity-70' : 'bg-white shadow-[3px_3px_0_0_#0F0F12] active:translate-y-[2px] active:shadow-none'}`}
                  >
                    <span className="text-2xl" aria-hidden="true">{c.emoji}</span>
                    {full ? '✓ Fatto' : c.label}
                  </button>
                );
              })}
            </div>
          )}

          {allFull && !active && (
            <button
              onClick={() => setDone(true)}
              className="w-full px-4 py-3.5 border-[3px] border-black bg-[#D2EC7C] font-black text-base uppercase tracking-wider shadow-[5px_5px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all"
            >
              🎉 Fatto! Buddy al top
            </button>
          )}

          {/* Task attiva (overlay) */}
          {active === 'acqua' && <HoldTask color="#8FD4E8" emoji="💧" title="Versa l’acqua" hint="Tieni premuto finché il bicchiere è pieno" onDone={() => fill('acqua')} onCancel={() => setActive(null)} onTick={bump} />}
          {active === 'energia' && <TapTask color="#D2EC7C" emoji="🔋" title="Caricala!" hint="Tocca veloce: saltelli e stretching" onDone={() => fill('energia')} onCancel={() => setActive(null)} onTap={bump} />}
          {active === 'umore' && <CuddleTask onDone={() => fill('umore')} onCancel={() => setActive(null)} onTap={() => { bump(); addHeart(); }} hearts={hearts} mood={mood} bounce={bounce} />}
          {active === 'calma' && <BreatheTask onDone={() => fill('calma')} onCancel={() => setActive(null)} />}

        </div>
      </div>
      <p className="text-center text-xs font-bold text-black/55 mt-4">30 secondi al giorno. Come un Tamagotchi — ma sei tu. 🌱</p>
    </Page>
  );
}

/* ───────── Layout pagina ───────── */
function Page({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[#FAF9F6] text-[#0F0F12] py-20 md:py-28 px-4 font-['Space_Grotesk',_sans-serif] min-h-screen flex flex-col items-center">
      <div className="w-full max-w-sm">
        <div className="bg-[#EBE5FF] border-[2px] border-black px-3 py-1.5 mb-3 font-black uppercase text-xs tracking-widest inline-block shadow-[3px_3px_0_0_#0F0F12]">Gioca con BAB · Demo</div>
        <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-4xl font-black leading-tight mb-6">Prenditi cura del tuo Buddy.</h1>
        {children}
      </div>
    </section>
  );
}

/* ───────── Task: TIENI PREMUTO (acqua) ───────── */
function HoldTask({ color, emoji, title, hint, onDone, onCancel, onTick }: { color: string; emoji: string; title: string; hint: string; onDone: () => void; onCancel: () => void; onTick: () => void }) {
  const DURATION = 1500; // ms di tenuta per riempire
  const [val, setVal] = useState(0);
  const ref = useRef<number | null>(null);
  const t0 = useRef(0);
  const lastBump = useRef(0);
  // Basato sul tempo reale trascorso: robusto anche se i tick sono throttle-ati.
  const start = () => {
    if (ref.current) return;
    t0.current = performance.now();
    lastBump.current = 0;
    ref.current = window.setInterval(() => {
      const n = Math.min(100, ((performance.now() - t0.current) / DURATION) * 100);
      setVal(n);
      if (n - lastBump.current >= 25) { lastBump.current = n; onTick(); }
      if (n >= 100) { stop(); setTimeout(onDone, 300); }
    }, 50);
  };
  const stop = () => { if (ref.current) { clearInterval(ref.current); ref.current = null; } };
  useEffect(() => () => stop(), []);
  return (
    <TaskShell title={title} hint={hint} onCancel={onCancel}>
      <button
        onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop}
        className="w-full select-none touch-none border-[3px] border-black bg-white shadow-[4px_4px_0_0_#0F0F12] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12]"
        aria-label={hint}
      >
        <div className="relative h-32 overflow-hidden flex items-end justify-center">
          <div className="absolute inset-x-0 bottom-0 transition-[height] duration-100" style={{ height: `${val}%`, backgroundColor: color }} />
          <span className="relative text-5xl mb-3 z-10" aria-hidden="true">{val >= 100 ? '😋' : emoji}</span>
        </div>
        <div className="border-t-[3px] border-black py-2 font-black uppercase text-sm">{val >= 100 ? 'Fatto!' : 'Tieni premuto ⤵'}</div>
      </button>
    </TaskShell>
  );
}

/* ───────── Task: TAP VELOCE (energia) ───────── */
function TapTask({ color, emoji, title, hint, onDone, onCancel, onTap }: { color: string; emoji: string; title: string; hint: string; onDone: () => void; onCancel: () => void; onTap: () => void }) {
  const [val, setVal] = useState(0);
  const ref = useRef(0);
  const tap = () => {
    if (ref.current >= 100) return;
    const n = Math.min(100, ref.current + 12);
    ref.current = n;
    setVal(n);
    onTap();
    if (n >= 100) setTimeout(onDone, 300);
  };
  return (
    <TaskShell title={title} hint={hint} onCancel={onCancel}>
      <button
        onPointerDown={tap}
        className="w-full select-none touch-none border-[3px] border-black bg-white shadow-[4px_4px_0_0_#0F0F12] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12]"
        aria-label={hint}
      >
        <motion.div key={val} initial={{ scale: 0.94 }} animate={{ scale: 1 }} className="h-32 flex items-center justify-center text-6xl" aria-hidden="true">
          {val >= 100 ? '⚡' : emoji}
        </motion.div>
        <div className="h-3 border-y-[3px] border-black bg-white overflow-hidden">
          <div className="h-full transition-[width] duration-150" style={{ width: `${val}%`, backgroundColor: color }} />
        </div>
        <div className="py-2 font-black uppercase text-sm">{val >= 100 ? 'Carica!' : 'Tocca, tocca, tocca! ⚡'}</div>
      </button>
    </TaskShell>
  );
}

/* ───────── Task: COCCOLA (umore) ───────── */
function CuddleTask({ onDone, onCancel, onTap, hearts, mood, bounce }: { onDone: () => void; onCancel: () => void; onTap: () => void; hearts: number[]; mood: Mood; bounce: number }) {
  const [n, setN] = useState(0);
  const ref = useRef(0);
  const tap = () => {
    if (ref.current >= 4) return;
    const x = ref.current + 1;
    ref.current = x;
    setN(x);
    onTap();
    if (x >= 4) setTimeout(onDone, 350);
  };
  return (
    <TaskShell title="Coccola il Buddy" hint="Toccalo per fargli sentire il tuo affetto" onCancel={onCancel}>
      <button onPointerDown={tap} className="w-full relative select-none touch-none border-[3px] border-black bg-[#FFE3D1] shadow-[4px_4px_0_0_#0F0F12] active:translate-y-[2px] active:shadow-none py-4 flex flex-col items-center focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12]" aria-label="Coccola il Buddy">
        <Buddy mood={mood} bounce={bounce} />
        <div className="mt-2 font-black uppercase text-sm">{n >= 4 ? '💖 Coccolato!' : `Toccalo ancora (${n}/4)`}</div>
        {hearts.slice(-6).map((h, i) => (
          <motion.span key={h} initial={{ opacity: 1, y: 0, scale: 0.6 }} animate={{ opacity: 0, y: -90, scale: 1.3 }} transition={{ duration: 1 }} className="absolute text-2xl pointer-events-none" style={{ left: `${30 + i * 8}%`, top: '40%' }} aria-hidden="true">❤️</motion.span>
        ))}
      </button>
    </TaskShell>
  );
}

/* ───────── Task: RESPIRA (calma) ───────── */
function BreatheTask({ onDone, onCancel }: { onDone: () => void; onCancel: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'in' | 'out' | 'done'>('idle');
  const run = () => {
    if (phase !== 'idle') return;
    setPhase('in');
    setTimeout(() => setPhase('out'), 4000);
    setTimeout(() => { setPhase('done'); setTimeout(onDone, 500); }, 8000);
  };
  return (
    <TaskShell title="Respira con lui" hint="Un respiro lento insieme: 4 secondi dentro, 4 fuori" onCancel={onCancel}>
      <div className="border-[3px] border-black bg-white p-5 flex flex-col items-center">
        <div className="h-40 flex items-center justify-center">
          <motion.div
            animate={{ scale: phase === 'in' ? 1.5 : phase === 'out' || phase === 'done' ? 0.85 : 1 }}
            transition={{ duration: 4, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-full border-[4px] border-black flex items-center justify-center"
            style={{ backgroundColor: '#B8A9E8' }}
          >
            <span className="text-3xl" aria-hidden="true">{phase === 'done' ? '😌' : '🌙'}</span>
          </motion.div>
        </div>
        <p className="font-black uppercase text-sm mb-3" aria-live="polite">
          {phase === 'idle' ? 'Pronta?' : phase === 'in' ? 'Inspira…' : phase === 'out' ? 'Espira…' : 'Bravissima 😌'}
        </p>
        {phase === 'idle' && (
          <button onClick={run} className="px-5 py-2.5 border-[3px] border-black bg-[#D2EC7C] font-black text-sm uppercase shadow-[3px_3px_0_0_#0F0F12] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12]">
            Inizia il respiro
          </button>
        )}
      </div>
    </TaskShell>
  );
}

/* ───────── Guscio task (titolo + chiudi) ───────── */
function TaskShell({ title, hint, onCancel, children }: { title: string; hint: string; onCancel: () => void; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-black uppercase text-sm tracking-widest">{title}</h2>
        <button onClick={onCancel} aria-label="Chiudi" className="w-8 h-8 border-[2px] border-black bg-white font-black flex items-center justify-center active:translate-y-[1px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12]">✕</button>
      </div>
      <p className="text-xs font-bold text-black/65 mb-3">{hint}</p>
      {children}
    </motion.div>
  );
}

/* ───────── Schermata finale: festa + reveal ───────── */
function Done({ onOpenWaitlist, onReset, mood, bounce }: { onOpenWaitlist?: (t?: UserType) => void; onReset: () => void; mood: Mood; bounce: number }) {
  const confetti = ['🎉', '✨', '💛', '⭐', '💚', '🎊'];
  return (
    <div>
      <div className="relative bg-[#0F0F12] p-2 border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12] overflow-hidden">
        {/* coriandoli */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, x: (i % 2 ? 1 : -1) * (30 + (i % 5) * 22), y: 120 + (i % 4) * 30, scale: 1.2, rotate: i * 40 }}
            transition={{ duration: 1.6, delay: (i % 6) * 0.05 }}
            className="absolute left-1/2 top-6 text-xl pointer-events-none z-20"
            aria-hidden="true"
          >{confetti[i % confetti.length]}</motion.span>
        ))}
        <div className="bg-white border-[3px] border-black p-5 text-center relative z-10">
          <div className="flex justify-center mb-2"><Buddy mood={mood} bounce={bounce} /></div>
          <div className="inline-block bg-[#FFC042] border-[3px] border-black px-4 py-1.5 font-black uppercase text-sm -rotate-2 shadow-[3px_3px_0_0_#0F0F12] mb-2">Buddy al top! 🔥</div>
          <p className="font-black uppercase text-xs tracking-widest text-black/70 mb-4">Giorno 1 · torna domani per la serie</p>

          {/* Reveal privacy */}
          <div className="text-left">
            <div className="flex items-start gap-2 mb-3 bg-[#EBE5FF] border-[2px] border-black p-2.5 text-[12px] font-bold">
              <span aria-hidden="true">🔒</span>
              <span>Ti sei presa 30 secondi per te. Coach e genitori vedono solo un segnale — mai il ciclo, l’umore o i dettagli.</span>
            </div>
            <div className="border-[3px] border-black bg-white shadow-[4px_4px_0_0_#0F0F12] p-3 mb-2.5">
              <div className="flex items-center justify-between mb-1"><span className="text-[11px] font-black uppercase tracking-widest">Vista Coach</span><span className="text-xl" aria-hidden="true">🟢</span></div>
              <p className="text-sm font-bold leading-snug">Mia è carica oggi. Bel momento per spingere sulla tecnica.</p>
            </div>
            <div className="border-[3px] border-black bg-white shadow-[4px_4px_0_0_#0F0F12] p-3">
              <div className="flex items-center justify-between mb-1"><span className="text-[11px] font-black uppercase tracking-widest">Vista Genitore</span><span className="text-xl" aria-hidden="true">🟢</span></div>
              <p className="text-sm font-bold leading-snug">Mia sta bene. Fai il tifo per lei anche in allenamento, non solo in gara.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <p className="font-bold text-sm text-black/80 my-4 text-center">Vuoi BAB per tua figlia o per la tua squadra?</p>
      <div className="flex flex-col gap-2.5">
        <button onClick={() => onOpenWaitlist?.('genitore')} className="w-full bg-[#D2EC7C] text-[#0F0F12] border-[3px] border-black px-6 py-3.5 font-black uppercase tracking-wider shadow-[5px_5px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all">Entra in lista d’attesa</button>
        <a href="/coach" className="w-full text-center bg-white text-[#0F0F12] border-[3px] border-black px-6 py-3.5 font-black uppercase tracking-wider shadow-[5px_5px_0_0_#0F0F12] hover:bg-[#EBE5FF] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all">Sono una società →</a>
        <button onClick={onReset} className="w-full text-center text-sm font-bold underline text-black/60 py-2">↺ Rigioca la demo</button>
      </div>
    </div>
  );
}
