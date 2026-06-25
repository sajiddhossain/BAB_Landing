/**
 * @file      AppSimulator.tsx
 * @summary   Demo-gioco "BAB Buddy" come racconto unico Atleta → Coach → Genitore.
 *            Flusso: check-in dei segnali del corpo (ciclo/energia/umore) → 2 micro-task
 *            tattili (idratazione, respiro) → mini-quiz educativo in tono BAB → festa +
 *            reveal privacy interattivo (la stessa giornata vista da atleta/coach/genitore).
 *            Tutte le stringhe sono localizzate (it/en/fr) via i18next.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BabBuddy, { type BuddyMood } from './BabBuddy';
import Doodle from './Doodle';
import PrivacyReveal from './PrivacyReveal';
import type { UserType } from '../lib/leads';
import { COACH_ENABLED } from '../lib/flags';

interface AppSimulatorProps {
  onOpenWaitlist?: (target?: UserType) => void;
}

type Mood = BuddyMood;
type Phase = 'checkin' | 'care' | 'quiz' | 'reveal';
type Opt = 'opt1' | 'opt2' | 'opt3';

/* ───────── Metri (colori PROTETTI — non cambiare) ───────── */
type CareId = 'acqua' | 'energia' | 'umore' | 'calma';
const METER_COLOR: Record<CareId, string> = { acqua: '#8FD4E8', energia: '#D2EC7C', umore: '#FF8FB1', calma: '#B8A9E8' };
const METER_EMOJI: Record<CareId, string> = { acqua: '💧', energia: '🔋', umore: '❤️', calma: '🌙' };
const START: Record<CareId, number> = { acqua: 30, energia: 20, umore: 35, calma: 25 };
/** I 2 micro-task tattili rimasti (check-in copre energia/umore). */
const CARE_TASKS: CareId[] = ['acqua', 'calma'];
/** Valore-metro dalle risposte del check-in (per riempire le barre energia/umore). */
const OPT_VAL: Record<Opt, number> = { opt1: 85, opt2: 55, opt3: 30 };

/* ───────── Check-in: 3 domande sui segnali del corpo ───────── */
type Checkin = { cycle: Opt | null; energy: Opt | null; mood: Opt | null };
const CHECKIN_GROUPS: { key: keyof Checkin; label: string; base: string }[] = [
  { key: 'cycle', label: 'simulator.checkin.cycleLabel', base: 'simulator.checkin.cycle' },
  { key: 'energy', label: 'simulator.checkin.energyLabel', base: 'simulator.checkin.energy' },
  { key: 'mood', label: 'simulator.checkin.moodLabel', base: 'simulator.checkin.mood' },
];

/* ───────── Quiz educativo (copy DA APPROVARE — Gaia) ───────── */
const QUIZ: { base: string; correct: Opt }[] = [
  { base: 'simulator.quiz.q1', correct: 'opt2' },
  { base: 'simulator.quiz.q2', correct: 'opt3' },
];

function moodFor(avg: number): Mood {
  if (avg < 35) return 'sleepy';
  if (avg < 55) return 'meh';
  if (avg < 85) return 'ok';
  return 'happy';
}

/* ───────── Componente ───────── */
export default function AppSimulator({ onOpenWaitlist }: AppSimulatorProps) {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<Phase>('checkin');
  const [meters, setMeters] = useState<Record<CareId, number>>({ ...START });
  const [checkin, setCheckin] = useState<Checkin>({ cycle: null, energy: null, mood: null });
  const [active, setActive] = useState<CareId | null>(null);
  const [bounce, setBounce] = useState(0);

  const avg = (meters.acqua + meters.energia + meters.umore + meters.calma) / 4;
  const careDone = CARE_TASKS.every(id => meters[id] >= 100);
  const mood: Mood = phase === 'reveal' ? 'star' : moodFor(avg);

  const bump = () => setBounce(b => b + 1);
  const fill = (id: CareId) => { setMeters(m => ({ ...m, [id]: 100 })); setBounce(b => b + 1); setActive(null); };

  const startCare = () => {
    // Le risposte del check-in popolano le barre energia/umore (le altre 2 sono task).
    setMeters(m => ({ ...m, energia: OPT_VAL[checkin.energy ?? 'opt2'], umore: OPT_VAL[checkin.mood ?? 'opt2'] }));
    setPhase('care');
  };
  const finishQuiz = () => { setMeters({ acqua: 100, energia: 100, umore: 100, calma: 100 }); setBounce(b => b + 1); setPhase('reveal'); };
  const reset = () => { setPhase('checkin'); setMeters({ ...START }); setCheckin({ cycle: null, energy: null, mood: null }); setActive(null); };

  // Etichette tradotte delle risposte del check-in → pannello "Atleta" del reveal.
  const answerText = (k: keyof Checkin) => {
    const g = CHECKIN_GROUPS.find(x => x.key === k)!;
    const opt = checkin[k] ?? 'opt2';
    return t(`${g.base}.${opt}`);
  };

  if (phase === 'reveal') {
    return (
      <Page>
        <Reveal
          mood={mood}
          bounce={bounce}
          answers={{ cycle: answerText('cycle'), energy: answerText('energy'), mood: answerText('mood') }}
          onOpenWaitlist={onOpenWaitlist}
          onReset={reset}
        />
      </Page>
    );
  }

  const buddyLine =
    phase === 'checkin' ? t('simulator.checkin.intro')
      : phase === 'quiz' ? t('simulator.quiz.intro')
        : careDone ? t('simulator.buddyMax')
          : avg < 40 ? t('simulator.buddyLow') : t('simulator.buddyOk');

  return (
    <Page>
      <div className="bg-[#0F0F12] p-2 border-[4px] border-black shadow-[4px_4px_0_0_#0F0F12] sm:shadow-[8px_8px_0_0_#0F0F12]">
        <div className="bg-white border-[3px] border-black p-4 sm:p-5">

          {/* Buddy + battuta */}
          <div className="flex items-center gap-3 mb-4 min-h-[120px]">
            <BabBuddy mood={mood} bounce={bounce} />
            <p className="text-sm font-bold leading-snug bg-[#FAF9F6] border-[2px] border-black p-2.5 shadow-[3px_3px_0_0_#0F0F12] flex-1">
              {buddyLine}
            </p>
          </div>

          {/* ── FASE: CHECK-IN ── */}
          {phase === 'checkin' && (
            <CheckIn value={checkin} onChange={(k, v) => setCheckin(c => ({ ...c, [k]: v }))} onNext={startCare} />
          )}

          {/* ── FASE: CURA (2 micro-task) ── */}
          {phase === 'care' && (
            <>
              {/* Indicatori (tutti e 4: energia/umore dal check-in, acqua/calma da riempire) */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5">
                {(Object.keys(METER_COLOR) as CareId[]).map(id => (
                  <div key={id}>
                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wide mb-0.5">
                      <span>{METER_EMOJI[id]} {t(`simulator.care.${id}`)}</span><span>{meters[id]}%</span>
                    </div>
                    <div className="h-3 border-[2px] border-black bg-white overflow-hidden">
                      <div className="h-full transition-[width] duration-500 ease-out" style={{ width: `${meters[id]}%`, backgroundColor: METER_COLOR[id] }} />
                    </div>
                  </div>
                ))}
              </div>

              {!active && !careDone && (
                <div className="grid grid-cols-2 gap-2.5">
                  {CARE_TASKS.map(id => {
                    const full = meters[id] >= 100;
                    return (
                      <button
                        key={id}
                        onClick={() => setActive(id)}
                        disabled={full}
                        className={`min-h-[60px] p-2 border-[3px] border-black font-black text-sm flex flex-col items-center justify-center gap-0.5 transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${full ? 'bg-[#DAE69A] opacity-70' : 'bg-white shadow-[3px_3px_0_0_#0F0F12] active:translate-y-[2px] active:shadow-none'}`}
                      >
                        <span className="text-2xl" aria-hidden="true">{METER_EMOJI[id]}</span>
                        {full ? t('simulator.careDone') : t(`simulator.care.${id}`)}
                      </button>
                    );
                  })}
                </div>
              )}

              {careDone && !active && (
                <button
                  onClick={() => setPhase('quiz')}
                  className="w-full px-4 py-3.5 border-[3px] border-black bg-[#D2EC7C] font-black text-base uppercase tracking-wider shadow-[5px_5px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all"
                >
                  {t('simulator.doneBtn')}
                </button>
              )}

              {active === 'acqua' && <HoldTask color={METER_COLOR.acqua} emoji="💧" title={t('simulator.hold.title')} hint={t('simulator.hold.hint')} onDone={() => fill('acqua')} onCancel={() => setActive(null)} onTick={bump} />}
              {active === 'calma' && <BreatheTask onDone={() => fill('calma')} onCancel={() => setActive(null)} />}
            </>
          )}

          {/* ── FASE: QUIZ ── */}
          {phase === 'quiz' && <Quiz onDone={finishQuiz} />}

        </div>
      </div>
      <p className="text-center text-xs font-bold text-black/55 mt-4">{t('simulator.footer')}</p>
    </Page>
  );
}

/* ───────── Layout pagina ───────── */
function Page({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <section className="bg-[#FAF9F6] text-[#0F0F12] py-20 md:py-28 px-4 font-['Space_Grotesk',_sans-serif] min-h-screen flex flex-col items-center">
      <div className="w-full max-w-sm">
        <div className="bg-[#EBE5FF] border-[2px] border-black px-3 py-1.5 mb-3 font-black uppercase text-xs tracking-widest inline-block shadow-[3px_3px_0_0_#0F0F12]">{t('simulator.badge')}</div>
        <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-4xl font-black leading-tight mb-6">{t('simulator.pageTitle')}</h1>
        {children}
      </div>
    </section>
  );
}

/* ───────── Check-in: 3 radiogroup a chip ───────── */
function CheckIn({ value, onChange, onNext }: { value: Checkin; onChange: (k: keyof Checkin, v: Opt) => void; onNext: () => void }) {
  const { t } = useTranslation();
  const opts: Opt[] = ['opt1', 'opt2', 'opt3'];
  const allAnswered = value.cycle && value.energy && value.mood;
  return (
    <div className="flex flex-col gap-4">
      {CHECKIN_GROUPS.map(g => (
        <div key={g.key} role="radiogroup" aria-label={t(g.label)}>
          <div className="text-[11px] font-black uppercase tracking-wide mb-1.5">{t(g.label)}</div>
          <div className="grid grid-cols-3 gap-2">
            {opts.map(o => {
              const sel = value[g.key] === o;
              return (
                <button
                  key={o}
                  role="radio"
                  aria-checked={sel}
                  onClick={() => onChange(g.key, o)}
                  className={`min-h-[52px] px-1 py-2 border-[2px] border-black text-xs font-black leading-tight transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] ${sel ? 'bg-[#D2EC7C] shadow-none translate-y-[2px]' : 'bg-white shadow-[3px_3px_0_0_#0F0F12] active:translate-y-[2px] active:shadow-none'}`}
                >
                  {t(`${g.base}.${o}`)}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex items-start gap-2 bg-[#EBE5FF] border-[2px] border-black p-2.5 text-[12px] font-bold">
        <Doodle name="lock" className="w-4 h-4 shrink-0 mt-0.5 text-[#1F7A63]" stroke={2} />
        <span>{t('simulator.checkin.privacyNote')}</span>
      </div>
      <button
        onClick={onNext}
        disabled={!allAnswered}
        className="w-full px-4 py-3 border-[3px] border-black bg-[#D2EC7C] font-black text-base uppercase tracking-wider shadow-[5px_5px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {t('simulator.checkin.next')}
      </button>
    </div>
  );
}

/* ───────── Quiz educativo (1-2 domande, spiegazione dopo la risposta) ───────── */
function Quiz({ onDone }: { onDone: () => void }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Opt | null>(null);
  const opts: Opt[] = ['opt1', 'opt2', 'opt3'];
  const q = QUIZ[step];
  const last = step >= QUIZ.length - 1;

  const next = () => {
    if (last) { onDone(); return; }
    setStep(s => s + 1);
    setPicked(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-black uppercase text-sm tracking-widest">{t('simulator.quiz.title')}</h2>
        <span className="text-[11px] font-black text-black/55">{step + 1}/{QUIZ.length}</span>
      </div>
      <p className="text-sm font-bold leading-snug" id={`quiz-prompt-${step}`}>{t(`${q.base}.prompt`)}</p>

      <div role="radiogroup" aria-labelledby={`quiz-prompt-${step}`} className="flex flex-col gap-2">
        {opts.map(o => {
          const sel = picked === o;
          const isCorrect = o === q.correct;
          const showState = picked !== null;
          return (
            <button
              key={o}
              role="radio"
              aria-checked={sel}
              disabled={showState}
              onClick={() => setPicked(o)}
              className={`text-left px-3 py-2.5 border-[2px] border-black text-sm font-bold transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] ${showState && isCorrect ? 'bg-[#D2EC7C]' : sel ? 'bg-[#EBE5FF]' : 'bg-white shadow-[3px_3px_0_0_#0F0F12] active:translate-y-[2px] active:shadow-none disabled:opacity-60'}`}
            >
              <span className="inline-flex items-center gap-2">
                {showState && isCorrect && <span aria-hidden="true">✓</span>}
                {t(`${q.base}.${o}`)}
              </span>
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} aria-live="polite" className="border-[3px] border-black bg-[#FAF9F6] shadow-[4px_4px_0_0_#0F0F12] p-3">
          <p className="text-[12px] font-black uppercase tracking-wide mb-1">{t('simulator.quiz.goodjob')}</p>
          <p className="text-sm font-bold leading-snug">{t(`${q.base}.explain`)}</p>
        </motion.div>
      )}

      {picked !== null && (
        <button
          onClick={next}
          className="w-full px-4 py-3 border-[3px] border-black bg-[#D2EC7C] font-black text-base uppercase tracking-wider shadow-[5px_5px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all"
        >
          {last ? t('simulator.quiz.continue') : t('simulator.quiz.continue')}
        </button>
      )}
    </div>
  );
}

/* ───────── Task: TIENI PREMUTO (acqua) ───────── */
function HoldTask({ color, emoji, title, hint, onDone, onCancel, onTick }: { color: string; emoji: string; title: string; hint: string; onDone: () => void; onCancel: () => void; onTick: () => void }) {
  const { t } = useTranslation();
  const DURATION = 1500;
  const [val, setVal] = useState(0);
  const ref = useRef<number | null>(null);
  const t0 = useRef(0);
  const lastBump = useRef(0);
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
        <div className="border-t-[3px] border-black py-2 font-black uppercase text-sm">{val >= 100 ? t('simulator.hold.done') : t('simulator.hold.action')}</div>
      </button>
    </TaskShell>
  );
}

/* ───────── Task: RESPIRA (calma) ───────── */
function BreatheTask({ onDone, onCancel }: { onDone: () => void; onCancel: () => void }) {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<'idle' | 'in' | 'out' | 'done'>('idle');
  const run = () => {
    if (phase !== 'idle') return;
    setPhase('in');
    setTimeout(() => setPhase('out'), 4000);
    setTimeout(() => { setPhase('done'); setTimeout(onDone, 500); }, 8000);
  };
  return (
    <TaskShell title={t('simulator.breathe.title')} hint={t('simulator.breathe.hint')} onCancel={onCancel}>
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
          {phase === 'idle' ? t('simulator.breathe.ready') : phase === 'in' ? t('simulator.breathe.in') : phase === 'out' ? t('simulator.breathe.out') : t('simulator.breathe.great')}
        </p>
        {phase === 'idle' && (
          <button onClick={run} className="px-5 py-2.5 border-[3px] border-black bg-[#D2EC7C] font-black text-sm uppercase shadow-[3px_3px_0_0_#0F0F12] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12]">
            {t('simulator.breathe.start')}
          </button>
        )}
      </div>
    </TaskShell>
  );
}

/* ───────── Guscio task (titolo + chiudi) ───────── */
function TaskShell({ title, hint, onCancel, children }: { title: string; hint: string; onCancel: () => void; children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-black uppercase text-sm tracking-widest">{title}</h2>
        <button onClick={onCancel} aria-label={t('simulator.close')} className="w-8 h-8 border-[2px] border-black bg-white font-black flex items-center justify-center active:translate-y-[1px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12]">✕</button>
      </div>
      <p className="text-xs font-bold text-black/65 mb-3">{hint}</p>
      {children}
    </motion.div>
  );
}

/* ───────── Schermata finale: festa + reveal privacy interattivo ───────── */
function Reveal({ mood, bounce, answers, onOpenWaitlist, onReset }: { mood: Mood; bounce: number; answers: { cycle: string; energy: string; mood: string }; onOpenWaitlist?: (t?: UserType) => void; onReset: () => void }) {
  const { t } = useTranslation();
  const confetti = ['🎉', '✨', '💛', '⭐', '💚', '🎊'];
  return (
    <div>
      <div className="relative bg-[#0F0F12] p-2 border-[4px] border-black shadow-[4px_4px_0_0_#0F0F12] sm:shadow-[8px_8px_0_0_#0F0F12] overflow-hidden">
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
        <div className="bg-white border-[3px] border-black p-5 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-2"><BabBuddy mood={mood} bounce={bounce} /></div>
            <div className="inline-block bg-[#FFC042] border-[3px] border-black px-4 py-1.5 font-black uppercase text-sm shadow-[3px_3px_0_0_#0F0F12] mb-2">{t('simulator.done.badge')}</div>
            <p className="font-black uppercase text-xs tracking-widest text-black/70 mb-4">{t('simulator.done.day')}</p>
          </div>
          <PrivacyReveal answers={answers} />
        </div>
      </div>

      {/* CTA */}
      <p className="font-bold text-sm text-black/80 my-4 text-center">{t('simulator.done.ctaQuestion')}</p>
      <div className="flex flex-col gap-2.5">
        <button onClick={() => onOpenWaitlist?.('genitore')} className="w-full cta px-6 py-3.5 font-black uppercase tracking-wider">{t('simulator.done.ctaWaitlist')}</button>
        {COACH_ENABLED ? (
          <a href="/coach" className="w-full text-center bg-white text-[#0F0F12] border-[3px] border-black px-6 py-3.5 font-black uppercase tracking-wider shadow-[5px_5px_0_0_#0F0F12] hover:bg-[#EBE5FF] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all">{t('simulator.done.ctaClub')}</a>
        ) : (
          <button onClick={() => onOpenWaitlist?.('societa')} className="w-full text-center bg-white text-[#0F0F12] border-[3px] border-black px-6 py-3.5 font-black uppercase tracking-wider shadow-[5px_5px_0_0_#0F0F12] hover:bg-[#EBE5FF] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all">{t('simulator.done.ctaClub')}</button>
        )}
        <button onClick={onReset} className="w-full text-center text-sm font-bold underline text-black/60 py-2">{t('simulator.done.replay')}</button>
      </div>
    </div>
  );
}
