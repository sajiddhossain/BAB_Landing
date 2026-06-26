/**
 * @file WaitlistModal.tsx
 * @summary Waitlist unica BAB. Un solo flusso a 3 step: "Chi sei" (ruolo) → "Su di
 * te" (genere, età, sport, località, [società]) → "Accesso" (email, beta, consenso).
 * Il ruolo deriva la divisione famiglia/società (user_type). Salva su Supabase.
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

/**
 * Ruoli (= prima domanda). `userType` mappa la divisione famiglia/società sul DB,
 * `canonical` è l'etichetta stabile salvata su Supabase (indipendente dalla lingua
 * UI, così l'analisi della CEO resta coerente). `isClub` mostra il campo società.
 */
const ROLES: { id: string; userType: UserType; isClub: boolean; key: string; canonical: string }[] = [
  { id: 'coach', userType: 'societa', isClub: true, key: 'waitlist.role.coach', canonical: 'Coach' },
  { id: 'technical', userType: 'societa', isClub: true, key: 'waitlist.role.technical', canonical: 'Technical staff' },
  { id: 'medical', userType: 'societa', isClub: true, key: 'waitlist.role.medical', canonical: 'Medical staff' },
  { id: 'parent', userType: 'genitore', isClub: false, key: 'waitlist.role.parent', canonical: 'Parent' },
  { id: 'athlete', userType: 'atleta', isClub: false, key: 'waitlist.role.athlete', canonical: 'Athlete' },
];

const GENDERS: { key: string; canonical: string }[] = [
  { key: 'waitlist.gender.female', canonical: 'Female' },
  { key: 'waitlist.gender.male', canonical: 'Male' },
  { key: 'waitlist.gender.nonbinary', canonical: 'Non-binary' },
  { key: 'waitlist.gender.preferNot', canonical: 'Prefer not to say' },
];

/** Etichette tradotte da `waitlist.ageRanges`; i canonici (DB) restano stabili. */
const AGE_CANONICAL = ['Under 18', '18-24', '25-34', '35-44', '45+'];

const GENERIC_DOMAINS = [
  'gmail.com', 'yahoo.com', 'yahoo.it', 'hotmail.com', 'hotmail.it', 'outlook.com',
  'outlook.it', 'libero.it', 'icloud.com', 'live.com', 'live.it', 'gmx.com',
  'virgilio.it', 'tin.it', 'aol.com', 'proton.me', 'protonmail.com', 'tiscali.it', 'alice.it',
];

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/** SITG (intento): email valida +30, dominio non generico +20, sport +20, località +15, beta +15. */
function computeSitg(sport: string, location: string, beta: boolean | null, email: string): number {
  let s = 0;
  if (sport.trim()) s += 20;
  if (location.trim()) s += 15;
  if (beta) s += 15;
  if (isValidEmail(email)) {
    s += 30;
    const domain = email.split('@')[1]?.toLowerCase() ?? '';
    if (domain && !GENERIC_DOMAINS.includes(domain)) s += 20;
  }
  return s;
}

export default function WaitlistModal({ isOpen, onClose, target }: WaitlistModalProps) {
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
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
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

  const listV = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: reduce ? 0 : 0.04 } } };
  const itemV = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, x: -16 },
        show: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 460, damping: 26 } },
        exit: { opacity: 0, x: 12, transition: { duration: 0.12 } },
      };

  // I ruoli mostrati dipendono dal punto d'ingresso: dal CTA club → solo ruoli club;
  // dal CTA famiglia/genitore/atleta → solo ruoli famiglia; dalla nav → tutti.
  const visibleRoles = ROLES.filter(r =>
    target === 'societa' ? r.isClub : target ? !r.isClub : true,
  );

  const [step, setStep] = useState(1);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [ageIdx, setAgeIdx] = useState<number | null>(null);
  const [sport, setSport] = useState('');
  const [location, setLocation] = useState('');
  const [club, setClub] = useState('');
  const [email, setEmail] = useState('');
  const [beta, setBeta] = useState<boolean | null>(null);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const antiSpam = useAntiSpam();

  const role = ROLES.find(r => r.id === roleId) ?? null;
  const ageRanges = t('waitlist.ageRanges', { returnObjects: true }) as unknown as string[];

  const chooseRole = (r: typeof ROLES[number]) => {
    setRoleId(r.id);
    setStep(2);
    trackEvent('waitlist_role', { role: r.canonical });
  };

  const step2Valid =
    gender !== null &&
    ageIdx !== null &&
    sport.trim() !== '' &&
    location.trim() !== '' &&
    (role?.isClub ? club.trim() !== '' : true);

  const goStep3 = (e: React.FormEvent) => { e.preventDefault(); if (step2Valid) setStep(3); };

  const step3Valid = isValidEmail(email) && beta !== null && consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (status === 'submitting' || !step3Valid || !role) return;
    if (antiSpam.isLikelyBot()) { setStatus('success'); trackEvent('lead_spam_blocked', { form: 'waitlist' }); return; }
    setStatus('submitting');

    const lang = i18n.language ? i18n.language.substring(0, 2) : 'it';
    const sitg = computeSitg(sport, location, beta, cleanEmail);

    const result = await insertLead({
      email: cleanEmail,
      user_type: role.userType,
      role: role.canonical,
      gender,
      age_range: ageIdx !== null ? AGE_CANONICAL[ageIdx] : null,
      sport: sport.trim() || null,
      location: location.trim() || null,
      club: role.isClub ? club.trim() || null : null,
      beta_tester: beta,
      sitg_score: sitg,
      lang,
    });

    if (result.ok) {
      setStatus('success');
      trackEvent('lead_submit', { user_type: role.userType, role: role.canonical, beta, sitg_score: sitg });
    } else {
      setStatus('error');
      trackEvent('lead_error', { reason: result.error ?? 'unknown', form: 'waitlist' });
    }
  };

  const inputCls = 'w-full py-3 px-4 bg-white border-[3px] border-black font-bold text-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-[#34BBC0]/60 shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)] transition-all';
  const labelCls = 'text-xs font-black uppercase tracking-wide text-[#0F0F12]';
  const cardCls = (active: boolean) => `bg-white border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] p-5 ${active ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`;
  const pickBtn = 'w-full py-3 px-4 bg-white border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#0F0F12] active:translate-y-1 active:shadow-[0_0_0_0_#0F0F12] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] transition-all text-left font-black uppercase text-sm';
  const chip = (selected: boolean) => `py-2 px-3 border-[3px] border-black text-xs font-black uppercase tracking-wide transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] ${selected ? 'bg-[#0F0F12] text-[#D2EC7C]' : 'bg-white text-[#0F0F12] hover:bg-[#EBE5FF]'}`;

  return (
    <div className="relative w-full max-w-md bg-[#FAF9F6] border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12] sm:shadow-[12px_12px_0_0_#0F0F12] flex flex-col z-10 max-h-[90vh] overflow-y-auto">

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

        {status === 'success' ? (
          <motion.div className="text-center py-4" role="status" aria-live="polite" variants={listV} initial="hidden" animate="show">
            <motion.div
              initial={reduce ? { opacity: 0 } : { scale: 0.2, rotate: 10, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { scale: 1, rotate: -2, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 13, delay: reduce ? 0 : 0.1 }}
              className="w-16 h-16 mx-auto bg-[#34BBC0] text-[#0F0F12] border-[3px] border-black flex items-center justify-center font-black text-3xl shadow-[6px_6px_0_0_#0F0F12] mb-5"
              aria-hidden="true"
            >✓</motion.div>
            <motion.p variants={itemV} className="font-['Bricolage_Grotesque',_sans-serif] font-black text-xl uppercase tracking-wide mb-2">{t('waitlist.successTitle')}</motion.p>
            <motion.p variants={itemV} className="text-sm font-bold leading-relaxed text-[#0F0F12]/75 mb-5 max-w-xs mx-auto">{t('waitlist.successBody')}</motion.p>
            <motion.div variants={itemV}>
              <button onClick={onClose} className="font-bold uppercase text-xs hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]">{t('waitlist.closeWindow')}</button>
            </motion.div>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85, rotate: -6 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.1 }}
              className="bg-black text-[#D2EC7C] px-4 py-2 flex items-center justify-center gap-3 shadow-[4px_4px_0_0_#D2EC7C] mb-8"
            >
              <Doodle name="lock" className="w-5 h-5 shrink-0 text-[#D2EC7C]" stroke={2} />
              <span className="text-sm font-black uppercase tracking-widest">{t('waitlist.scarcity')}</span>
            </motion.div>

            {/* Honeypot: invisibile agli umani, compilato dai bot → invio scartato */}
            <div className="absolute left-[-9999px] top-0 w-px h-px overflow-hidden" aria-hidden="true">
              <label htmlFor={HONEYPOT_FIELD}>Non compilare questo campo</label>
              <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" value={antiSpam.trap} onChange={e => antiSpam.setTrap(e.target.value)} />
            </div>

            <div className="flex flex-col gap-6">

              {/* Step 1 — Chi sei */}
              <div className={cardCls(step >= 1)}>
                <div className="flex justify-between items-center mb-4 border-b-[2px] border-black pb-2">
                  <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black">{t('waitlist.stepRole')}</h3>
                  <AnimatePresence>{step > 1 && <StepCheck reduce={reduce} />}</AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div variants={listV} initial="hidden" animate="show" exit="hidden" className="flex flex-col gap-3">
                      {visibleRoles.map(r => (
                        <motion.div key={r.id} variants={itemV}>
                          <button onClick={() => chooseRole(r)} className={pickBtn}>{t(r.key)}</button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Step 2 — Su di te */}
              <div className={cardCls(step >= 2)}>
                <div className="flex justify-between items-center mb-4 border-b-[2px] border-black pb-2">
                  <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black">{t('waitlist.stepAbout')}</h3>
                  <AnimatePresence>{step > 2 && <StepCheck reduce={reduce} />}</AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  {step === 2 && (
                    <motion.form onSubmit={goStep3} variants={listV} initial="hidden" animate="show" exit="hidden" className="flex flex-col gap-4">

                      {/* Genere */}
                      <motion.fieldset variants={itemV} className="flex flex-col gap-2">
                        <legend className={`${labelCls} mb-2`}>{t('waitlist.genderLabel')}</legend>
                        <div className="grid grid-cols-2 gap-2">
                          {GENDERS.map(g => (
                            <button type="button" key={g.canonical} aria-pressed={gender === g.canonical} onClick={() => setGender(g.canonical)} className={chip(gender === g.canonical)}>{t(g.key)}</button>
                          ))}
                        </div>
                      </motion.fieldset>

                      {/* Età */}
                      <motion.fieldset variants={itemV} className="flex flex-col gap-2">
                        <legend className={`${labelCls} mb-2`}>{t('waitlist.ageLabel')}</legend>
                        <div className="flex flex-wrap gap-2">
                          {ageRanges.map((a, i) => (
                            <button type="button" key={AGE_CANONICAL[i]} aria-pressed={ageIdx === i} onClick={() => setAgeIdx(i)} className={chip(ageIdx === i)}>{a}</button>
                          ))}
                        </div>
                      </motion.fieldset>

                      {/* Sport */}
                      <motion.div variants={itemV} className="flex flex-col gap-1">
                        <label htmlFor="wl-sport" className={labelCls}>{t('waitlist.sportLabelNew')}</label>
                        <input id="wl-sport" type="text" required value={sport} onChange={e => setSport(e.target.value)} placeholder={t('waitlist.sportPlaceholderNew')} className={inputCls} />
                      </motion.div>

                      {/* Località */}
                      <motion.div variants={itemV} className="flex flex-col gap-1">
                        <label htmlFor="wl-location" className={labelCls}>{t('waitlist.locationLabel')}</label>
                        <input id="wl-location" type="text" required value={location} onChange={e => setLocation(e.target.value)} placeholder={t('waitlist.locationPlaceholder')} className={inputCls} />
                      </motion.div>

                      {/* Società (solo ruoli club) */}
                      {role?.isClub && (
                        <motion.div variants={itemV} className="flex flex-col gap-1">
                          <label htmlFor="wl-club" className={labelCls}>{t('club.club')}</label>
                          <input id="wl-club" type="text" required value={club} onChange={e => setClub(e.target.value)} placeholder={t('club.clubPlaceholder')} className={inputCls} />
                        </motion.div>
                      )}

                      <motion.button variants={itemV} type="submit" disabled={!step2Valid} className="w-full bg-[#D2EC7C] text-[#0F0F12] border-[3px] border-black px-6 py-3 text-base font-black uppercase tracking-wide shadow-[4px_4px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] disabled:opacity-50 disabled:cursor-not-allowed transition-all">{t('waitlist.continue')}</motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Step 3 — Accesso */}
              <div className={cardCls(step >= 3)}>
                <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-xl font-black mb-4 border-b-[2px] border-black pb-2">{t('waitlist.step3Title')}</h3>
                {step >= 3 && (
                  <motion.form onSubmit={handleSubmit} className="flex flex-col gap-4" initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 28 }}>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="wl-email" className={labelCls}>{t('club.email')}</label>
                      <input id="wl-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={t('waitlist.emailPlaceholder')} className={`${inputCls} uppercase`} />
                    </div>

                    {/* Beta tester */}
                    <fieldset className="flex flex-col gap-2">
                      <legend className={labelCls}>{t('waitlist.betaLabel')}</legend>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <button type="button" aria-pressed={beta === true} onClick={() => setBeta(true)} className={chip(beta === true)}>{t('waitlist.betaYes')}</button>
                        <button type="button" aria-pressed={beta === false} onClick={() => setBeta(false)} className={chip(beta === false)}>{t('waitlist.betaNo')}</button>
                      </div>
                    </fieldset>

                    <div className="flex items-start gap-3 bg-[#EBE5FF] border-[3px] border-black p-3 my-1 shadow-[4px_4px_0_0_#0F0F12]">
                      <Doodle name="shield" className="w-5 h-5 shrink-0 mt-0.5 text-[#1F7A63]" stroke={2} />
                      <p className="text-xs font-bold leading-relaxed uppercase tracking-wide">{t('waitlist.privacyNote')}</p>
                    </div>

                    <label htmlFor="wl-consent" className="flex items-start gap-3 cursor-pointer py-1">
                      <input id="wl-consent" type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required className="mt-0.5 w-5 h-5 shrink-0 accent-[#1F7A63] border-[2px] border-black focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]" />
                      <span className="text-xs font-bold leading-relaxed">{t('waitlist.consentPre')}{' '}<a href="/privacy" target="_blank" rel="noopener" className="underline text-vividteal hover:no-underline">{t('waitlist.consentLink')}</a>.</span>
                    </label>

                    {status === 'error' && (
                      <p role="alert" className="text-xs font-black uppercase tracking-wide bg-[#FDEBEB] text-[#7A1F1F] border-[3px] border-[#7A1F1F] p-3">{t('waitlist.error')}</p>
                    )}

                    <button type="submit" disabled={status === 'submitting' || !step3Valid} className="w-full cta px-6 py-3 text-base font-black uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed">
                      {status === 'submitting' ? t('waitlist.submitting') : t('waitlist.submit')}
                    </button>
                  </motion.form>
                )}
              </div>

            </div>
          </>
        )}

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
