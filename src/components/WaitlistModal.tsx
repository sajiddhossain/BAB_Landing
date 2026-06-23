/**
 * @file WaitlistModal.tsx
 * @summary Waitlist B2C (atlete/genitori) per BAB. Cattura email + risposte quiz su
 * Supabase, calcola lo score SITG reale e mostra stati di invio/successo/errore.
 * @author Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { insertLead, type UserType } from '../lib/leads';
import { trackEvent } from '../lib/analytics';
import { useAntiSpam, HONEYPOT_FIELD } from '../lib/antispam';
import Doodle from './Doodle';

interface WaitlistModalProps {
 isOpen: boolean;
 onClose: () => void;
 target?: UserType;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const GENERIC_DOMAINS = [
 'gmail.com', 'yahoo.com', 'yahoo.it', 'hotmail.com', 'hotmail.it', 'outlook.com',
 'outlook.it', 'libero.it', 'icloud.com', 'live.com', 'live.it', 'gmx.com',
 'virgilio.it', 'tin.it', 'aol.com', 'proton.me', 'protonmail.com', 'tiscali.it', 'alice.it',
];

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/** SITG: +20 sport, +20 focus, +30 email valida, +30 bonus dominio non generico (alto intento B2B). */
function computeSitg(sport: string | null, concern: string | null, email: string): number {
 let s = 0;
 if (sport) s += 20;
 if (concern) s += 20;
 if (isValidEmail(email)) {
 s += 30;
 const domain = email.split('@')[1]?.toLowerCase() ?? '';
 if (domain && !GENERIC_DOMAINS.includes(domain)) s += 30;
 }
 return s;
}

export default function WaitlistModal({ isOpen, onClose, target }: WaitlistModalProps) {
 // Il corpo è montato solo quando aperto: ogni apertura riparte con stato pulito
 // (niente effetto di reset → niente cascading render).
 return (
 <AnimatePresence>
 {isOpen && <WaitlistBody onClose={onClose} target={target} />}
 </AnimatePresence>
 );
}

function WaitlistBody({ onClose, target }: { onClose: () => void; target?: UserType }) {
 const dialogRef = useRef<HTMLDivElement>(null);

 // Focus iniziale sul modale + ripristino del focus alla chiusura (a11y)
 useEffect(() => {
 const previouslyFocused = document.activeElement as HTMLElement | null;
 const focusables = () =>
 Array.from(
 dialogRef.current?.querySelectorAll<HTMLElement>(
 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
 ) ?? []
 );
 // Porta il focus sul primo elemento interattivo del modale
 focusables()[0]?.focus();

 const onKeyDown = (e: KeyboardEvent) => {
 if (e.key === 'Escape') {
 onClose();
 return;
 }
 if (e.key !== 'Tab') return;
 // Focus trap: il Tab resta dentro al modale
 const items = focusables();
 if (items.length === 0) return;
 const first = items[0];
 const last = items[items.length - 1];
 const active = document.activeElement;
 if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
 e.preventDefault();
 last.focus();
 } else if (!e.shiftKey && active === last) {
 e.preventDefault();
 first.focus();
 }
 };

 document.addEventListener('keydown', onKeyDown);
 return () => {
 document.removeEventListener('keydown', onKeyDown);
 previouslyFocused?.focus?.();
 };
 }, [onClose]);

 return (
 <div ref={dialogRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="waitlist-title">
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={onClose}
 className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
 />
 <motion.div
 initial={{ opacity: 0, y: 50, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 20, scale: 0.95 }}
 transition={{ type: 'spring', stiffness: 300, damping: 25 }}
 className="relative w-full max-w-md z-10"
 >
 <WaitlistPanelContent onClose={onClose} target={target} />
 </motion.div>
 </div>
 );
}

/** Badge ✓ di step completato: entra con un "pop" a molla, esce con un fade. */
function StepCheck({ reduce }: { reduce: boolean | null }) {
 return (
 <motion.span
 initial={reduce ? { opacity: 0 } : { scale: 0, rotate: -40 }}
 animate={reduce ? { opacity: 1 } : { scale: 1, rotate: 0 }}
 exit={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
 transition={{ type: 'spring', stiffness: 520, damping: 14 }}
 className="bg-[#34BBC0] border-2 border-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
 >
 ✓
 </motion.span>
 );
}

function WaitlistPanelContent({ onClose, target }: { onClose: () => void; target?: UserType }) {
 const { t, i18n } = useTranslation();
 const reduce = useReducedMotion();

 // Varianti condivise: lista che scaglia i figli, ogni voce entra da sinistra con
 // uno spring secco (in linea con lo stile neobrutalista). Reduced-motion → solo fade.
 const listV = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: reduce ? 0 : 0.04 } } };
 const itemV = reduce
 ? { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }
 : {
 hidden: { opacity: 0, x: -16 },
 show: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 460, damping: 26 } },
 exit: { opacity: 0, x: 12, transition: { duration: 0.12 } },
 };

 const [quizStep, setQuizStep] = useState(1);
 const [sport, setSport] = useState<string | null>(null);
 const [concern, setConcern] = useState<string | null>(null);
 const [email, setEmail] = useState('');
 const [consent, setConsent] = useState(false);
 const [score, setScore] = useState<number | null>(null);
 const [status, setStatus] = useState<SubmitStatus>('idle');
 const antiSpam = useAntiSpam();

 const sports = t('waitlist.sports', { returnObjects: true }) as unknown as string[];
 const concerns = t('waitlist.concerns', { returnObjects: true }) as unknown as string[];

 const chooseSport = (s: string) => {
 setSport(s);
 setQuizStep(2);
 trackEvent('quiz_step1', { sport: s });
 };

 const chooseConcern = (c: string) => {
 setConcern(c);
 setQuizStep(3);
 trackEvent('quiz_step2', { concern: c });
 };

 const handleQuizSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 const cleanEmail = email.trim().toLowerCase();
 if (status === 'submitting' || !isValidEmail(cleanEmail) || !consent) return;

 const sitg = computeSitg(sport, concern, cleanEmail);
 // Anti-spam: bot riconosciuto → finto successo, nessuna scrittura sul DB.
 if (antiSpam.isLikelyBot()) {
 setScore(sitg);
 setStatus('success');
 trackEvent('lead_spam_blocked', { form: 'waitlist' });
 return;
 }
 setStatus('submitting');

 const userType: UserType = target ?? 'genitore';
 const lang = i18n.language ? i18n.language.substring(0, 2) : 'it';

 const result = await insertLead({
 email: cleanEmail,
 user_type: userType,
 sport,
 concern,
 sitg_score: sitg,
 lang,
 });

 if (result.ok) {
 setScore(sitg);
 setStatus('success');
 trackEvent('lead_submit', { user_type: userType, sitg_score: sitg, sport, concern });
 } else {
 setStatus('error');
 trackEvent('lead_error', { reason: result.error ?? 'unknown' });
 }
 };

 return (
 <div className="relative w-full max-w-md bg-[#FAF9F6] border-[4px] border-black shadow-[12px_12px_0_0_#0F0F12] flex flex-col z-10 max-h-[90vh] overflow-y-auto">

 <div className="flex items-center justify-between p-4 border-b-[3px] border-black bg-[#D2EC7C]">
 <h2 id="waitlist-title" className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black uppercase tracking-widest">
 {t('waitlist.title')}
 </h2>
 <button
 onClick={onClose}
 aria-label={t('waitlist.close')}
 className="w-11 h-11 shrink-0 flex items-center justify-center bg-white border-2 border-black font-black text-xl hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] transition-colors"
 >
 ✕
 </button>
 </div>

 <div className="p-6">

 <motion.div
 initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85, rotate: -6 }}
 animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: -1 }}
 transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.1 }}
 className="bg-black text-[#D2EC7C] px-4 py-2 flex items-center justify-center gap-3 shadow-[4px_4px_0_0_#D2EC7C] mb-8"
 >
 <Doodle name="lock" className="w-5 h-5 shrink-0 text-[#D2EC7C]" stroke={2} />
 <span className="text-sm font-black uppercase tracking-widest">
 {t('waitlist.scarcity')}
 </span>
 </motion.div>

 <div className="flex flex-col gap-6">

 {/* Step 1 — Sport */}
 <div className={`bg-white border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] p-5 ${quizStep >= 1 ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
 <div className="flex justify-between items-center mb-4 border-b-[2px] border-black pb-2">
 <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black">{t('waitlist.step1Title')}</h3>
 <AnimatePresence>
 {quizStep > 1 && <StepCheck reduce={reduce} />}
 </AnimatePresence>
 </div>
 <AnimatePresence mode="wait">
 {quizStep === 1 && (
 <motion.div variants={listV} initial="hidden" animate="show" exit="hidden" className="flex flex-col gap-3">
 {sports.map(s => (
 <motion.div key={s} variants={itemV}>
 <button onClick={() => chooseSport(s)} className="w-full py-3 px-4 bg-white border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#0F0F12] active:translate-y-1 active:shadow-[0_0_0_0_#0F0F12] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] transition-all text-left font-black uppercase text-sm">
 {s}
 </button>
 </motion.div>
 ))}
 </motion.div>
 )}
 </AnimatePresence>
 </div>

 {/* Step 2 — Focus */}
 <div className={`bg-white border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] p-5 ${quizStep >= 2 ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
 <div className="flex justify-between items-center mb-4 border-b-[2px] border-black pb-2">
 <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black">{t('waitlist.step2Title')}</h3>
 <AnimatePresence>
 {quizStep > 2 && <StepCheck reduce={reduce} />}
 </AnimatePresence>
 </div>
 <AnimatePresence mode="wait">
 {quizStep === 2 && (
 <motion.div variants={listV} initial="hidden" animate="show" exit="hidden" className="flex flex-col gap-3">
 {concerns.map(c => (
 <motion.div key={c} variants={itemV}>
 <button onClick={() => chooseConcern(c)} className="w-full py-3 px-4 bg-white border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#0F0F12] active:translate-y-1 active:shadow-[0_0_0_0_#0F0F12] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] transition-all text-left font-black uppercase text-sm">
 {c}
 </button>
 </motion.div>
 ))}
 </motion.div>
 )}
 </AnimatePresence>
 </div>

 {/* Step 3 — Accesso */}
 <div className={`bg-white border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] p-5 ${quizStep >= 3 ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
 <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black mb-4 border-b-[2px] border-black pb-2">{t('waitlist.step3Title')}</h3>

 {quizStep >= 3 && status !== 'success' && (
 <motion.form
 onSubmit={handleQuizSubmit}
 className="flex flex-col gap-4"
 initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ type: 'spring', stiffness: 380, damping: 28 }}
 >
 {/* Honeypot: invisibile agli umani, compilato dai bot → invio scartato */}
 <div className="absolute left-[-9999px] top-0 w-px h-px overflow-hidden" aria-hidden="true">
 <label htmlFor={HONEYPOT_FIELD}>Non compilare questo campo</label>
 <input
 id={HONEYPOT_FIELD}
 name={HONEYPOT_FIELD}
 type="text"
 tabIndex={-1}
 autoComplete="off"
 value={antiSpam.trap}
 onChange={e => antiSpam.setTrap(e.target.value)}
 />
 </div>
 <input
 type="email"
 placeholder={t('waitlist.emailPlaceholder')}
 aria-label={t('waitlist.emailPlaceholder')}
 required
 value={email}
 onChange={e => setEmail(e.target.value)}
 className="w-full py-3 px-4 bg-white border-[3px] border-black font-bold uppercase text-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-[#34BBC0]/60 shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)] transition-all duration-300"
 />

 <div className="flex items-start gap-3 bg-[#EBE5FF] border-[3px] border-black p-3 my-2 shadow-[4px_4px_0_0_#0F0F12]">
 <Doodle name="shield" className="w-5 h-5 shrink-0 mt-0.5 text-[#1F7A63]" stroke={2} />
 <p className="text-xs font-bold leading-relaxed uppercase tracking-wide">
 {t('waitlist.privacyNote')}
 </p>
 </div>

 <label htmlFor="waitlist-consent" className="flex items-start gap-3 cursor-pointer py-1">
 <input
 id="waitlist-consent"
 type="checkbox"
 checked={consent}
 onChange={e => setConsent(e.target.checked)}
 required
 className="mt-0.5 w-5 h-5 shrink-0 accent-[#1F7A63] border-[2px] border-black focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
 />
 <span className="text-xs font-bold leading-relaxed">
 {t('waitlist.consentPre')}{' '}
 <a href="/privacy" target="_blank" rel="noopener" className="underline text-vividteal hover:no-underline">{t('waitlist.consentLink')}</a>.
 </span>
 </label>

 {status === 'error' && (
 <p role="alert" className="text-xs font-black uppercase tracking-wide bg-[#FDEBEB] text-[#7A1F1F] border-[3px] border-[#7A1F1F] p-3">
 {t('waitlist.error')}
 </p>
 )}

 <button
 type="submit"
 disabled={status === 'submitting' || !isValidEmail(email) || !consent}
 className="w-full bg-[#D2EC7C] text-[#0F0F12] border-[3px] border-black px-6 py-3 text-base font-black uppercase tracking-wide shadow-[4px_4px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
 >
 {status === 'submitting' ? t('waitlist.submitting') : t('waitlist.submit')}
 </button>
 </motion.form>
 )}

 {status === 'success' && (
 <motion.div
 className="text-center py-4"
 role="status"
 aria-live="polite"
 variants={listV}
 initial="hidden"
 animate="show"
 >
 <motion.p variants={itemV} className="font-black uppercase tracking-widest mb-2 text-xs">{t('waitlist.scoreLabel')}</motion.p>
 <motion.div
 initial={reduce ? { opacity: 0 } : { scale: 0.2, rotate: 10, opacity: 0 }}
 animate={reduce ? { opacity: 1 } : { scale: 1, rotate: -2, opacity: 1 }}
 transition={{ type: 'spring', stiffness: 260, damping: 13, delay: reduce ? 0 : 0.12 }}
 className="text-6xl font-['Bricolage_Grotesque',_sans-serif] font-black bg-[#D2EC7C] border-[3px] border-black inline-block px-6 py-2 shadow-[6px_6px_0_0_#0F0F12] mb-4"
 >
 {score}
 </motion.div>
 <motion.p variants={itemV} className="text-xs font-bold uppercase tracking-widest bg-black text-white py-2 px-4 inline-block transform ">{t('waitlist.successTag')}</motion.p>
 <motion.div variants={itemV}>
 <button onClick={onClose} className="mt-6 font-bold uppercase text-xs hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]">{t('waitlist.closeWindow')}</button>
 </motion.div>
 </motion.div>
 )}
 </div>

 </div>
 </div>
 </div>
 );
}

/**
 * WaitlistPanel — variante del modale SENZA overlay fixed, pensata per le preview
 * del design system (claude.ai/design). Rende solo il pannello del quiz/email.
 */
export function WaitlistPanel({ target }: { target?: UserType }) {
  return <WaitlistPanelContent onClose={() => {}} target={target} />;
}
