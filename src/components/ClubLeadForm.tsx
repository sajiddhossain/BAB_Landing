/**
 * @file ClubLeadForm.tsx
 * @summary Form di contatto B2B "Prenota una demo" per le società sportive.
 * Salva il lead nello stesso DB Supabase della waitlist con user_type='societa'.
 * Stile "compromessi invisibili": testi dritti, nessuno skew/stroke, contrasto AA.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { insertLead } from '../lib/leads';
import { trackEvent } from '../lib/analytics';
import { useAntiSpam, HONEYPOT_FIELD } from '../lib/antispam';

/** Campo honeypot: fuori schermo, non focusabile, ignorato dagli screen reader. */
const honeypotClass = 'absolute left-[-9999px] top-0 w-px h-px overflow-hidden';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const inputClass =
 'w-full border-[2px] border-black bg-white px-3 py-2.5 text-[15px] text-[#0F0F12] ' +
 'focus:outline-none focus-visible:ring-4 focus-visible:ring-[#34BBC0]/60 transition-shadow';
const labelClass = 'block text-xs font-bold uppercase tracking-wide text-[#0F0F12] mb-1';

export default function ClubLeadForm() {
 const { t, i18n } = useTranslation();
 const roles = t('club.roles', { returnObjects: true }) as unknown as string[];

 const [name, setName] = useState('');
 const [club, setClub] = useState('');
 const [email, setEmail] = useState('');
 const [role, setRole] = useState('');
 const [message, setMessage] = useState('');
 const [consent, setConsent] = useState(false);
 const [status, setStatus] = useState<Status>('idle');
 const antiSpam = useAntiSpam();

 const canSubmit = Boolean(name.trim() && club.trim() && isValidEmail(email.trim()) && consent) && status !== 'submitting';

 const onSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!canSubmit) return;
 // Anti-spam: bot riconosciuto → finto successo, nessuna scrittura sul DB.
 if (antiSpam.isLikelyBot()) {
 setStatus('success');
 trackEvent('lead_spam_blocked', { form: 'club' });
 return;
 }
 setStatus('submitting');
 const lang = i18n.language ? i18n.language.substring(0, 2) : 'it';
 const chosenRole = role || roles[0] || null;

 const result = await insertLead({
 email: email.trim().toLowerCase(),
 user_type: 'societa',
 name: name.trim(),
 club: club.trim(),
 role: chosenRole,
 message: message.trim() || null,
 lang,
 });

 if (result.ok) {
 setStatus('success');
 trackEvent('club_waitlist', { club, role: chosenRole });
 } else {
 setStatus('error');
 trackEvent('lead_error', { reason: result.error ?? 'unknown', form: 'club' });
 }
 };

 if (status === 'success') {
 return (
 <div className="bg-white border-[2px] border-black shadow-[4px_4px_0_0_#0F0F12] p-6" role="status" aria-live="polite">
 <div className="flex items-center gap-3 mb-2">
 <span className="bg-[#34BBC0] text-[#0F0F12] border-[2px] border-black w-8 h-8 flex items-center justify-center font-black" aria-hidden="true">✓</span>
 <h3 className="text-xl font-bold text-[#0F0F12]">{t('club.successTitle')}</h3>
 </div>
 <p className="text-[15px] leading-relaxed text-[#33333a]">{t('club.successBody')}</p>
 </div>
 );
 }

 return (
 <form onSubmit={onSubmit} className="bg-white border-[2px] border-black shadow-[4px_4px_0_0_#0F0F12] p-6">
 <h3 className="text-xl font-bold text-[#0F0F12] mb-4">{t('club.formTitle')}</h3>

 {/* Honeypot: invisibile agli umani, compilato dai bot → invio scartato */}
 <div className={honeypotClass} aria-hidden="true">
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

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className={labelClass} htmlFor="club-name">{t('club.name')}</label>
 <input id="club-name" className={inputClass} type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('club.namePlaceholder')} required />
 </div>
 <div>
 <label className={labelClass} htmlFor="club-club">{t('club.club')}</label>
 <input id="club-club" className={inputClass} type="text" value={club} onChange={e => setClub(e.target.value)} placeholder={t('club.clubPlaceholder')} required />
 </div>
 <div>
 <label className={labelClass} htmlFor="club-email">{t('club.email')}</label>
 <input id="club-email" className={inputClass} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t('club.emailPlaceholder')} required />
 </div>
 <div>
 <label className={labelClass} htmlFor="club-role">{t('club.role')}</label>
 <select id="club-role" className={inputClass} value={role || roles[0]} onChange={e => setRole(e.target.value)}>
 {roles.map(r => <option key={r} value={r}>{r}</option>)}
 </select>
 </div>
 </div>

 <div className="mt-4">
 <label className={labelClass} htmlFor="club-message">{t('club.message')}</label>
 <textarea id="club-message" className={inputClass} rows={2} value={message} onChange={e => setMessage(e.target.value)} placeholder={t('club.messagePlaceholder')} />
 </div>

 <label htmlFor="club-consent" className="flex items-start gap-3 cursor-pointer mt-5 py-1">
 <input
 id="club-consent"
 type="checkbox"
 checked={consent}
 onChange={e => setConsent(e.target.checked)}
 required
 className="mt-0.5 w-5 h-5 shrink-0 accent-[#1F7A63] border-[2px] border-black focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
 />
 <span className="text-[13px] font-medium leading-relaxed text-[#0F0F12]/90">
 {t('club.consentPre')}{' '}
 <a href="/privacy" target="_blank" rel="noopener" className="underline text-vividteal hover:no-underline">{t('club.consentLink')}</a>.
 </span>
 </label>

 {status === 'error' && (
 <p role="alert" className="mt-4 text-sm font-bold bg-[#FDEBEB] text-[#7A1F1F] border-[2px] border-[#7A1F1F] p-3">
 {t('club.error')}
 </p>
 )}

 <button
 type="submit"
 disabled={!canSubmit}
 className="mt-5 bg-[#D2EC7C] text-[#0F0F12] border-[2px] border-black shadow-[4px_4px_0_0_#0F0F12] px-6 py-3 text-[15px] font-bold hover:bg-[#34BBC0] active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
 >
 {status === 'submitting' ? t('club.submitting') : t('club.submit')}
 </button>
 </form>
 );
}
