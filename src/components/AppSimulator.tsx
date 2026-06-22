/**
 * @file      AppSimulator.tsx
 * @summary   Demo-gioco "BAB Buddy" per le atlete: un compagno espressivo (SVG, non ASCII)
 *            che reagisce mentre l'atleta gioca mini-quiz su corpo, energia ed emozioni.
 *            Alla fine mostra COSA vedono coach e genitori: solo un segnale 🟢🟡🔴,
 *            mai i dettagli — la demo fa quello che il prodotto promette.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { UserType } from '../lib/leads';

interface AppSimulatorProps {
  onOpenWaitlist?: (target?: UserType) => void;
}

/* ───────────────────────── Buddy (compagno espressivo) ───────────────────────── */

type Mood = 'happy' | 'star' | 'tired' | 'focused' | 'calm';

const MOOD_BG: Record<Mood, string> = {
  happy: '#D2EC7C',
  star: '#FFC042',
  tired: '#FFE3D1',
  focused: '#8FD4E8',
  calm: '#EBE5FF',
};

const INK = '#0F0F12';

function Buddy({ mood }: { mood: Mood }) {
  const eyes =
    mood === 'tired' ? (
      <>
        <line x1="30" y1="45" x2="42" y2="45" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
        <line x1="58" y1="45" x2="70" y2="45" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
      </>
    ) : mood === 'calm' ? (
      <>
        <path d="M30 46 Q36 52 42 46" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M58 46 Q64 52 70 46" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
      </>
    ) : mood === 'star' ? (
      <>
        <path d="M30 47 L36 40 L42 47" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M58 47 L64 40 L70 47" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : mood === 'focused' ? (
      <>
        <circle cx="36" cy="45" r="3.6" fill={INK} />
        <circle cx="64" cy="45" r="3.6" fill={INK} />
      </>
    ) : (
      <>
        <circle cx="36" cy="44" r="5" fill={INK} />
        <circle cx="64" cy="44" r="5" fill={INK} />
      </>
    );

  const mouth =
    mood === 'tired' ? (
      <path d="M42 73 Q50 68 58 73" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
    ) : mood === 'focused' ? (
      <line x1="41" y1="70" x2="59" y2="70" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
    ) : mood === 'star' ? (
      <path d="M34 64 Q50 86 66 64 Z" fill={INK} />
    ) : (
      <path d="M34 66 Q50 80 66 66" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
    );

  return (
    <motion.svg
      key={mood}
      initial={{ scale: 0.85, rotate: -3 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 16 }}
      width="118"
      height="118"
      viewBox="0 0 100 100"
      role="img"
      aria-label="Il tuo Buddy BAB"
      className="shrink-0 drop-shadow-[4px_4px_0_#0F0F12]"
    >
      <rect x="6" y="9" width="88" height="82" rx="26" fill={MOOD_BG[mood]} stroke={INK} strokeWidth="4.5" />
      {/* guance */}
      <circle cx="24" cy="60" r="4" fill="#FF8FB1" opacity="0.8" />
      <circle cx="76" cy="60" r="4" fill="#FF8FB1" opacity="0.8" />
      {eyes}
      {mouth}
    </motion.svg>
  );
}

/* ───────────────────────── Contenuti dei mini-giochi ───────────────────────── */

const PLAYERS = [
  { id: 'energia', emoji: '💪', label: 'Energia' },
  { id: 'concentrazione', emoji: '🧠', label: 'Concentrazione' },
  { id: 'emozioni', emoji: '❤️', label: 'Emozioni' },
  { id: 'recupero', emoji: '😴', label: 'Recupero' },
];

const LIGHTS = [
  { id: 'verde', emoji: '🟢', label: 'Continua' },
  { id: 'giallo', emoji: '🟡', label: 'Ascolta e adatta' },
  { id: 'rosso', emoji: '🔴', label: 'Fermati e chiedi aiuto' },
];

const SITUATIONS = [
  { text: 'Mi sento stanca, ma muovermi mi fa stare meglio', answer: 'giallo' },
  { text: 'Ho un dolore forte e improvviso', answer: 'rosso' },
  { text: 'Mi sento energica e concentrata', answer: 'verde' },
  { text: 'Sono molto stanca da giorni', answer: 'giallo' },
];

const WORKOUTS = [
  { id: 'sprint', emoji: '🔥', label: 'Sprint', micro: 'Scarica l’energia: 5 minuti di scatti o salti, poi bevi e respira.' },
  { id: 'tecnica', emoji: '⚡', label: 'Tecnica', micro: 'Allena un gesto tecnico lento e preciso. Oggi conta la qualità, non la quantità.' },
  { id: 'recupero', emoji: '🌱', label: 'Recupero attivo', micro: 'Movimento leggero: camminata, mobilità, stretching dolce.' },
  { id: 'riposo', emoji: '🛌', label: 'Giorno di riposo', micro: 'Oggi il riposo È allenamento. Dormi presto e idratati: domani spingi.' },
];

const CORPO_OPTIONS = [
  { id: 'a', emoji: '😟', text: 'Sì, se mi sento goffa vuol dire che sto peggiorando.' },
  { id: 'b', emoji: '💥', text: 'Forse devo solo allenarmi di più e ignorare questa sensazione.' },
  { id: 'c', emoji: '🌱', text: 'No, il mio corpo sta cambiando e deve abituarsi a nuovi equilibri.' },
  { id: 'd', emoji: '👀', text: 'Dipende: se le altre sembrano più coordinate, sono rimasta indietro.' },
];

const PHRASE = {
  feel: ['stanca', 'carica', 'tesa', 'leggera', 'dolorante'],
  action: ['corro', 'salto', 'mi alleno a lungo', 'cambio direzione'],
  result: ['le gambe pesanti', 'il fiato corto', 'tutto scorre', 'un fastidio al ginocchio'],
};

const STEPS = ['intro', 'squadra', 'semaforo', 'allenamento', 'corpo', 'coach', 'reveal'] as const;

/* ───────────────────────── Componente ───────────────────────── */

export default function AppSimulator({ onOpenWaitlist }: AppSimulatorProps) {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState<Mood>('happy');

  // stato dei giochi
  const [strong, setStrong] = useState<string | null>(null);
  const [support, setSupport] = useState<string | null>(null);
  const [lightAns, setLightAns] = useState<Record<number, string>>({});
  const [workout, setWorkout] = useState<string | null>(null);
  const [corpo, setCorpo] = useState<string | null>(null);
  const [phrase, setPhrase] = useState({ feel: PHRASE.feel[0], action: PHRASE.action[0], result: PHRASE.result[0] });

  const id = STEPS[step];
  const allLightsCorrect = SITUATIONS.every((s, i) => lightAns[i] === s.answer);

  const canAdvance =
    id === 'intro' ? true :
    id === 'squadra' ? Boolean(strong && support) :
    id === 'semaforo' ? allLightsCorrect :
    id === 'allenamento' ? Boolean(workout) :
    id === 'corpo' ? Boolean(corpo) :
    id === 'coach' ? true : false;

  const go = (dir: 1 | -1) => setStep(s => Math.min(STEPS.length - 1, Math.max(0, s + dir)));

  const restart = () => {
    setStrong(null); setSupport(null); setLightAns({}); setWorkout(null); setCorpo(null);
    setPhrase({ feel: PHRASE.feel[0], action: PHRASE.action[0], result: PHRASE.result[0] });
    setMood('happy'); setStep(0);
  };

  const pickLight = (i: number, color: string) => {
    setLightAns(p => ({ ...p, [i]: color }));
    const correct = SITUATIONS[i].answer === color;
    setMood(correct ? 'happy' : 'tired');
  };

  const chosenWorkout = WORKOUTS.find(w => w.id === workout);
  const buddyLine = buddyLineFor(id, { strong, support, allLightsCorrect, corpo });

  return (
    <section className="bg-[#FAF9F6] text-[#0F0F12] py-20 md:py-28 px-4 font-['Space_Grotesk',_sans-serif] min-h-screen flex flex-col items-center">
      <div className="w-full max-w-sm">

        {/* Intestazione pagina */}
        <div className="bg-[#EBE5FF] border-[2px] border-black px-3 py-1.5 mb-3 font-black uppercase text-xs tracking-widest inline-block shadow-[3px_3px_0_0_#0F0F12]">
          Gioca con BAB · Demo
        </div>
        <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-4xl font-black leading-tight mb-6">
          Allena anche il tuo corpo ad ascoltarsi.
        </h1>

        {/* "Device": cornice neobrutalist */}
        <div className="bg-[#0F0F12] p-2 border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12]">
          <div className="bg-white border-[3px] border-black p-4 sm:p-5 flex flex-col">

            {/* Progress */}
            <div className="flex items-center gap-1.5 mb-4" aria-hidden="true">
              {STEPS.map((_, i) => (
                <span key={i} className={`h-2 flex-1 border-2 border-black ${i <= step ? 'bg-[#D2EC7C]' : 'bg-white'}`} />
              ))}
            </div>

            {/* Buddy + battuta */}
            <div className="flex items-center gap-3 mb-5 min-h-[118px]">
              <Buddy mood={mood} />
              <p className="text-sm font-bold leading-snug bg-[#FAF9F6] border-[2px] border-black p-2.5 shadow-[3px_3px_0_0_#0F0F12] flex-1">
                {buddyLine}
              </p>
            </div>

            {/* Contenuto del passo */}
            <div className="min-h-[230px]">
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* INTRO */}
                  {id === 'intro' && (
                    <div className="text-center">
                      <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl font-black uppercase mb-2">La tua squadra interiore</h2>
                      <p className="text-sm font-bold text-black/75 mb-1">5 mini-sfide, 1 minuto.</p>
                      <p className="text-sm font-bold text-black/75">Impari ad ascoltare i segnali del corpo — come in un gioco.</p>
                    </div>
                  )}

                  {/* SQUADRA INTERIORE */}
                  {id === 'squadra' && (
                    <div>
                      <h2 className="font-black uppercase text-sm tracking-widest mb-1">1 · Chi gioca oggi?</h2>
                      <p className="text-sm font-bold text-black/70 mb-3">Tocca chi è in forma e chi ha bisogno di supporto.</p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {PLAYERS.map(p => {
                          const isStrong = strong === p.id;
                          const isSupport = support === p.id;
                          return (
                            <button
                              key={p.id}
                              onClick={() => {
                                if (!strong || isStrong) { setStrong(isStrong ? null : p.id); if (support === p.id) setSupport(null); setMood('star'); }
                                else { setSupport(isSupport ? null : p.id); setMood('calm'); }
                              }}
                              className={`relative min-h-[64px] p-3 border-[3px] border-black font-black text-sm flex flex-col items-center justify-center gap-1 transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${isStrong ? 'bg-[#D2EC7C] shadow-none translate-y-[2px]' : isSupport ? 'bg-[#FFE3D1] shadow-none translate-y-[2px]' : 'bg-white shadow-[3px_3px_0_0_#0F0F12]'}`}
                            >
                              <span className="text-2xl" aria-hidden="true">{p.emoji}</span>
                              {p.label}
                              {isStrong && <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] px-1.5 py-0.5 font-black uppercase">Top</span>}
                              {isSupport && <span className="absolute -top-2 -right-2 bg-[#FF6B5C] text-black text-[9px] px-1.5 py-0.5 font-black uppercase border-2 border-black">Cura</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* SEMAFORO */}
                  {id === 'semaforo' && (
                    <div>
                      <h2 className="font-black uppercase text-sm tracking-widest mb-1">2 · Semaforo del corpo</h2>
                      <p className="text-sm font-bold text-black/70 mb-2">Che colore dà il tuo corpo in ogni situazione?</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3 text-[11px] font-bold">
                        {LIGHTS.map(l => <span key={l.id}>{l.emoji} {l.label}</span>)}
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {SITUATIONS.map((s, i) => {
                          const picked = lightAns[i];
                          const ok = picked === s.answer;
                          return (
                            <div key={i} className={`border-[3px] border-black p-2.5 ${picked ? (ok ? 'bg-[#DAE69A]' : 'bg-[#FFE3D1]') : 'bg-white'}`}>
                              <p className="text-[13px] font-bold leading-snug mb-2 flex items-start gap-1.5">
                                {picked && <span aria-hidden="true">{ok ? '✓' : '✗'}</span>}{s.text}
                              </p>
                              <div className="flex gap-2">
                                {LIGHTS.map(l => (
                                  <button
                                    key={l.id}
                                    onClick={() => pickLight(i, l.id)}
                                    aria-label={l.label}
                                    className={`w-11 h-11 text-xl border-[3px] border-black flex items-center justify-center transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${picked === l.id ? 'shadow-none translate-y-[2px] bg-[#EBE5FF]' : 'bg-white shadow-[2px_2px_0_0_#0F0F12]'}`}
                                  >
                                    {l.emoji}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {allLightsCorrect && (
                        <p className="mt-3 text-sm font-black bg-black text-[#D2EC7C] p-2.5 -rotate-1">
                          Il tuo corpo non è un avversario: è il tuo compagno di squadra.
                        </p>
                      )}
                    </div>
                  )}

                  {/* ALLENAMENTO */}
                  {id === 'allenamento' && (
                    <div>
                      <h2 className="font-black uppercase text-sm tracking-widest mb-1">3 · Il corpo di oggi</h2>
                      <p className="text-sm font-bold text-black/70 mb-3">Se oggi fosse un allenamento, sarebbe…</p>
                      <div className="grid grid-cols-2 gap-2.5 mb-3">
                        {WORKOUTS.map(w => (
                          <button
                            key={w.id}
                            onClick={() => { setWorkout(w.id); setMood(w.id === 'riposo' ? 'tired' : w.id === 'sprint' ? 'star' : 'focused'); }}
                            className={`min-h-[60px] p-3 border-[3px] border-black font-black text-sm flex flex-col items-center justify-center gap-1 transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${workout === w.id ? 'bg-[#8FD4E8] shadow-none translate-y-[2px]' : 'bg-white shadow-[3px_3px_0_0_#0F0F12]'}`}
                          >
                            <span className="text-2xl" aria-hidden="true">{w.emoji}</span>
                            {w.label}
                          </button>
                        ))}
                      </div>
                      {chosenWorkout && (
                        <div className="border-[3px] border-black bg-[#EBE5FF] p-3">
                          <p className="text-[11px] font-black uppercase tracking-widest mb-1">La micro-mossa di BAB</p>
                          <p className="text-sm font-bold leading-snug">{chosenWorkout.micro}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CORPO IN AGGIORNAMENTO */}
                  {id === 'corpo' && (
                    <div>
                      <h2 className="font-black uppercase text-sm tracking-widest mb-1">4 · Corpo in aggiornamento</h2>
                      <p className="text-sm font-bold text-black/75 mb-3">Oggi mi sento impacciata anche nei gesti facili. Sto perdendo colpi?</p>
                      <div className="flex flex-col gap-2">
                        {CORPO_OPTIONS.map(o => {
                          const picked = corpo === o.id;
                          const isRight = o.id === 'c';
                          return (
                            <button
                              key={o.id}
                              onClick={() => { setCorpo(o.id); setMood(o.id === 'c' ? 'calm' : 'focused'); }}
                              className={`text-left p-2.5 border-[3px] border-black text-[13px] font-bold leading-snug flex gap-2 transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${picked ? (isRight ? 'bg-[#DAE69A]' : 'bg-[#FFE3D1]') : 'bg-white shadow-[3px_3px_0_0_#0F0F12]'} ${corpo && isRight && !picked ? 'ring-[3px] ring-[#1F7A63] ring-offset-1' : ''}`}
                            >
                              <span className="text-lg" aria-hidden="true">{o.emoji}</span>
                              <span>{o.text}</span>
                            </button>
                          );
                        })}
                      </div>
                      {corpo && (
                        <p className="mt-3 text-[13px] font-bold leading-snug border-l-[4px] border-[#1F7A63] pl-3">
                          {corpo === 'c'
                            ? 'Esatto! Con la pubertà il corpo cambia in fretta: altezza, baricentro, forza. Sentirsi “goffa” qualche giorno è normale — serve solo tempo per abituarsi. Parlarne con il coach aiuta.'
                            : 'In realtà no: non stai disimparando. Con la pubertà cambiano altezza, equilibrio e forza, e il corpo deve riabituarsi. È normale e passa — parlarne con il coach aiuta.'}
                        </p>
                      )}
                    </div>
                  )}

                  {/* PARLA AL COACH */}
                  {id === 'coach' && (
                    <div>
                      <h2 className="font-black uppercase text-sm tracking-widest mb-1">5 · Diccelo con parole tue</h2>
                      <p className="text-sm font-bold text-black/70 mb-3">Costruisci la frase: descrivere aiuta più che lamentarsi.</p>
                      <div className="bg-[#FAF9F6] border-[3px] border-black p-3 text-[15px] font-bold leading-relaxed mb-3">
                        Oggi mi sento <Select value={phrase.feel} opts={PHRASE.feel} onChange={v => { setPhrase(p => ({ ...p, feel: v })); setMood('focused'); }} /> e
                        quando <Select value={phrase.action} opts={PHRASE.action} onChange={v => setPhrase(p => ({ ...p, action: v }))} /> sento <Select value={phrase.result} opts={PHRASE.result} onChange={v => setPhrase(p => ({ ...p, result: v }))} />.
                      </div>
                      <p className="text-sm font-black bg-black text-[#8FD4E8] p-2.5 rotate-1 inline-block">Descrivere ≠ Lamentarsi 💬</p>
                    </div>
                  )}

                  {/* REVEAL — cosa vedono coach & genitori */}
                  {id === 'reveal' && (
                    <div>
                      <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl font-black uppercase mb-2">E loro cosa vedono?</h2>
                      <div className="flex items-start gap-2 mb-4 bg-[#EBE5FF] border-[2px] border-black p-2.5 text-[12px] font-bold">
                        <span aria-hidden="true">🔒</span>
                        <span>Tutto quello che hai scritto resta tuo. Coach e genitori vedono solo un segnale — mai il ciclo, l’umore o i dettagli.</span>
                      </div>

                      <div className="border-[3px] border-black bg-white shadow-[4px_4px_0_0_#0F0F12] p-3 mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-black uppercase tracking-widest">Vista Coach</span>
                          <span className="text-xl" aria-hidden="true">🟡</span>
                        </div>
                        <p className="text-sm font-bold leading-snug">Mia ha bisogno di attenzione. Se la vedi svogliata non è pigrizia: il suo corpo sta cambiando. Aggiungi qualche esercizio di coordinazione.</p>
                      </div>

                      <div className="border-[3px] border-black bg-white shadow-[4px_4px_0_0_#0F0F12] p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-black uppercase tracking-widest">Vista Genitore</span>
                          <span className="text-xl" aria-hidden="true">🟢</span>
                        </div>
                        <p className="text-sm font-bold leading-snug">Mia è al top. Fai il tifo per lei non solo in gara, ma soprattutto quando si allena.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
            </div>

            {/* Navigazione */}
            <div className="flex items-center gap-3 mt-5">
              {step > 0 && id !== 'reveal' && (
                <button
                  onClick={() => go(-1)}
                  className="px-4 py-3 border-[3px] border-black bg-white font-black text-sm uppercase shadow-[3px_3px_0_0_#0F0F12] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all"
                  aria-label="Indietro"
                >←</button>
              )}
              {id !== 'reveal' ? (
                <button
                  onClick={() => go(1)}
                  disabled={!canAdvance}
                  className="flex-1 px-4 py-3 border-[3px] border-black bg-[#D2EC7C] font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {step === 0 ? 'Inizia a giocare' : canAdvance ? 'Continua →' : 'Completa la sfida'}
                </button>
              ) : (
                <button
                  onClick={restart}
                  className="flex-1 px-4 py-3 border-[3px] border-black bg-white font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_#0F0F12] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all"
                >↺ Rigioca</button>
              )}
            </div>

          </div>
        </div>

        {/* CTA finale (appare al reveal) */}
        {id === 'reveal' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <p className="font-bold text-sm text-black/80 mb-3 text-center">Vuoi BAB per tua figlia o per la tua squadra?</p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => onOpenWaitlist?.('genitore')}
                className="w-full bg-[#D2EC7C] text-[#0F0F12] border-[3px] border-black px-6 py-3.5 font-black uppercase tracking-wider shadow-[5px_5px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all"
              >
                Entra in lista d’attesa
              </button>
              <a
                href="/coach"
                className="w-full text-center bg-white text-[#0F0F12] border-[3px] border-black px-6 py-3.5 font-black uppercase tracking-wider shadow-[5px_5px_0_0_#0F0F12] hover:bg-[#EBE5FF] active:translate-y-[2px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all"
              >
                Sono una società →
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── Helper ───────────────────────── */

function Select({ value, opts, onChange }: { value: string; opts: string[]; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="inline bg-[#D2EC7C] border-[2px] border-black px-1.5 py-0.5 font-black focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12]"
    >
      {opts.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function buddyLineFor(
  id: typeof STEPS[number],
  ctx: { strong: string | null; support: string | null; allLightsCorrect: boolean; corpo: string | null },
): string {
  switch (id) {
    case 'intro': return 'Ciao! Sono il tuo Buddy. Giochiamo a conoscere il tuo corpo?';
    case 'squadra': return ctx.strong && ctx.support ? 'Bel lavoro: nessuna giocatrice resta indietro!' : 'Chi è in forma oggi? E chi ha bisogno di una mano?';
    case 'semaforo': return ctx.allLightsCorrect ? 'Perfetto, hai letto tutti i segnali!' : 'Verde, giallo o rosso? Fidati di come ti senti.';
    case 'allenamento': return 'Ogni giorno è diverso. Va bene così.';
    case 'corpo': return ctx.corpo === 'c' ? 'Esatto! Stai solo aggiornando il tuo corpo.' : ctx.corpo ? 'Quasi! Leggi qui sotto 👇' : 'Niente panico: il corpo cambia, non peggiora.';
    case 'coach': return 'Più sei precisa, più ti possiamo aiutare.';
    case 'reveal': return 'Ecco la cosa più importante 👇';
    default: return '';
  }
}
