/**
 * @file CoachDashboard.tsx
 * @summary Percorso B2B "Per le Società": sezione vendita accessibile (testi dritti,
 * contrasto AA) + demo interattiva della Coach Dashboard. I dati riflettono
 * l'MVP reale: SOLO segnali di squadra aggregati e anonimi (check-in, energia
 * e umore auto-riportati, segnali anonimi) — mai dati biologici individuali.
 * @author Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ClubLeadForm from './ClubLeadForm';
import Doodle from './Doodle';

// Dati demo (mock): partecipazione al check-in + energia media auto-riportata per giorno.
const WEEK = [
 { checkin: 18, energy: 72 },
 { checkin: 16, energy: 64 },
 { checkin: 19, energy: 80 },
 { checkin: 14, energy: 55 },
 { checkin: 17, energy: 76 },
 { checkin: 12, energy: 83 },
 { checkin: 15, energy: 70 },
];

const energyColor = (v: number) => (v < 60 ? '#FFE3D1' : v < 76 ? '#DAE69A' : '#34BBC0');

export default function CoachDashboard() {
 const { t } = useTranslation();
 const [tab, setTab] = useState<'team' | 'week'>('team');
 const [sent, setSent] = useState<Record<number, boolean>>({});
 const formRef = useRef<HTMLDivElement>(null);

 const scrollToForm = () =>
 formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

 const values = [
 { title: t('coach.value1Title'), desc: t('coach.value1Desc') },
 { title: t('coach.value2Title'), desc: t('coach.value2Desc') },
 { title: t('coach.value3Title'), desc: t('coach.value3Desc') },
 ];
 const trust = [t('coach.trust1'), t('coach.trust2'), t('coach.trust3'), t('coach.trust4')];
 const weekDays = t('coach.weekDays', { returnObjects: true }) as unknown as string[];
 const signals = [
 { title: t('coach.signal1Title'), desc: t('coach.signal1Desc'), cta: t('coach.signal1Cta'), warn: true },
 { title: t('coach.signal2Title'), desc: t('coach.signal2Desc'), cta: t('coach.signal2Cta'), warn: false },
 ];

 return (
 <div className="flex flex-col items-center w-full min-h-[100dvh] text-[#0F0F12]">

 {/* ===== SEZIONE B2B "PER LE SOCIETÀ" — variante accessibile (no skew/stroke/rotazioni) ===== */}
 <section className="w-full px-4 pt-24 md:pt-28 pb-16">
 <div className="max-w-5xl mx-auto w-full">
 <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
 <span className="inline-block bg-[#EBE5FF] border-[2px] border-black px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0F0F12]">
 {t('coach.sectionLabel')}
 </span>
 <span className="text-xs text-[#4a4a52]">{t('coach.accessibleNote')}</span>
 </div>

 <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#0F0F12] mb-4 max-w-3xl">
 {t('coach.headline')}
 </h1>
 <p className="text-base sm:text-lg leading-relaxed text-[#33333a] max-w-2xl mb-10">
 {t('coach.sub')}
 </p>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
 {values.map((v, i) => (
 <div key={i} className="bg-white border-[2px] border-black border-l-[6px] border-l-[#34BBC0] shadow-[4px_4px_0_0_#0F0F12] p-5">
 <h3 className="text-lg font-bold text-[#0F0F12] mb-1">{v.title}</h3>
 <p className="text-sm leading-relaxed text-[#42424a]">{v.desc}</p>
 </div>
 ))}
 </div>

 {/* Come funziona, in 3 passi */}
 <div className="mb-12">
 <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl sm:text-3xl font-bold mb-5">{t('coach.howTitle')}</h2>
 <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 {[1, 2, 3].map(n => (
 <li key={n} className="bg-white border-[2px] border-black shadow-[4px_4px_0_0_#0F0F12] p-5">
 <div className="w-9 h-9 flex items-center justify-center bg-[#D2EC7C] border-[2px] border-black font-black text-lg mb-3" aria-hidden="true">{n}</div>
 <h3 className="text-base font-bold text-[#0F0F12] mb-1">{t(`coach.how${n}Title`)}</h3>
 <p className="text-sm leading-relaxed text-[#42424a]">{t(`coach.how${n}Desc`)}</p>
 </li>
 ))}
 </ol>
 </div>

 <div className="bg-[#0F0F12] border-[2px] border-black p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 mb-3">
 <div>
 <div className="text-xs uppercase tracking-wider text-[#DAE69A] font-semibold">{t('coach.pricingLabel')}</div>
 <div className="text-lg text-white font-bold mt-1">{t('coach.pricingValue')}</div>
 </div>
 <button
 onClick={scrollToForm}
 className="bg-[#34BBC0] text-[#0F0F12] border-[2px] border-black px-5 py-2.5 font-bold hover:bg-[#D2EC7C] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
 >
 {t('coach.pricingCta')}
 </button>
 </div>
 <p className="text-sm text-[#42424a] mb-8">{t('coach.ctaReassure')}</p>

 <div className="flex flex-wrap gap-2 mb-10">
 {trust.map((tr, i) => (
 <span key={i} className="inline-flex items-center gap-2 bg-white border-[2px] border-black px-3 py-1.5 text-xs font-semibold text-[#0F0F12]">
 <span className="text-[#0F8a6a]" aria-hidden="true">✓</span>{tr}
 </span>
 ))}
 </div>

 <div ref={formRef}>
 <ClubLeadForm />
 </div>
 </div>
 </section>

 {/* ===== ANTEPRIMA PRODOTTO: Coach Dashboard (demo interattiva, dati MVP onesti) ===== */}
 <section className="w-full px-4 pb-24">
 <div className="w-full max-w-5xl mx-auto flex flex-col">

 <div className="flex items-center gap-3 mb-8">
 <span className="bg-black text-white px-2 py-1 font-bold text-xs uppercase tracking-wide">{t('coach.previewLabel')}</span>
 <div className="flex-1 h-[3px] bg-black/20"></div>
 <span className="bg-[#34BBC0] text-[#0F0F12] border-[2px] border-black px-2 py-1 font-bold text-xs uppercase tracking-wide">{t('coach.demoTag')}</span>
 </div>

 {/* Header + tabs */}
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4 border-b-[4px] border-black pb-6">
 <div>
 <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-5xl font-black mb-2 uppercase">{t('coach.teamName')}</h2>
 <p className="font-bold text-sm uppercase tracking-widest bg-black text-white inline-block px-3 py-1">{t('coach.teamMeta')}</p>
 </div>

 <div role="tablist" aria-label={t('coach.previewLabel')} className="flex bg-white border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] overflow-hidden self-stretch sm:self-auto">
 {([['team', t('coach.tabTeam')], ['week', t('coach.tabWeek')]] as const).map(([key, label], i) => (
 <button
 key={key}
 role="tab"
 aria-selected={tab === key}
 onClick={() => setTab(key)}
 className={`flex-1 sm:flex-none px-6 py-3 font-black text-xs uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-3px] focus-visible:outline-[#34BBC0] ${i === 0 ? 'border-r-[3px] border-black' : ''} ${tab === key ? 'bg-[#D2EC7C]' : 'hover:bg-neutral-100 hover:text-vividteal'}`}
 >
 {label}
 </button>
 ))}
 </div>
 </div>

 {/* Nota privacy sempre visibile nella dashboard */}
 <div className="flex items-start gap-2 mb-8 bg-[#EBE5FF] border-[2px] border-black px-3 py-2 text-xs sm:text-sm font-semibold">
 <Doodle name="lock" className="w-4 h-4 shrink-0 mt-0.5 text-[#1F7A63]" stroke={2} />
 <span>{t('coach.privacyInline')}</span>
 </div>

 {/* ---- TAB: SQUADRA ---- */}
 {tab === 'team' && (
 <div>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-12">
 {/* Check-in */}
 <div className="bg-[#DAE69A] border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] p-6">
 <h3 className="text-xs font-black uppercase tracking-widest mb-1 border-b-2 border-black pb-2">{t('coach.kpiCheckinLabel')}</h3>
 <div className="text-6xl font-['Bricolage_Grotesque',_sans-serif] font-black mt-4">16<span className="text-2xl text-black/50">/20</span></div>
 <p className="text-sm font-bold mt-2">{t('coach.kpiCheckinNote')}</p>
 </div>
 {/* Energia */}
 <div className="bg-[#EBE5FF] border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] p-6">
 <h3 className="text-xs font-black uppercase tracking-widest mb-1 border-b-2 border-black pb-2">{t('coach.kpiEnergyLabel')}</h3>
 <div className="text-5xl font-['Bricolage_Grotesque',_sans-serif] font-black mt-4 uppercase">{t('coach.kpiEnergyValue')}</div>
 <div className="flex gap-1.5 mt-3" aria-hidden="true">
 {[0, 1, 2].map(i => <span key={i} className={`w-7 h-3 border-2 border-black ${i < 2 ? 'bg-[#34BBC0]' : 'bg-white'}`}></span>)}
 </div>
 <p className="text-sm font-bold mt-2">{t('coach.kpiEnergyNote')}</p>
 </div>
 {/* Umore */}
 <div className="bg-[#FFE3D1] border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] p-6">
 <h3 className="text-xs font-black uppercase tracking-widest mb-1 border-b-2 border-black pb-2">{t('coach.kpiMoodLabel')}</h3>
 <div className="text-4xl font-['Bricolage_Grotesque',_sans-serif] font-black mt-4 uppercase leading-none flex items-center gap-2"><span className="text-vividteal" aria-hidden="true">↗</span>{t('coach.kpiMoodValue')}</div>
 <p className="text-sm font-bold mt-3">{t('coach.kpiMoodNote')}</p>
 </div>
 </div>

 {/* Segnali anonimi */}
 <div className="flex flex-wrap items-center gap-3 mb-6">
 <span className="bg-black text-white px-2 py-1 font-black text-sm shadow-[2px_2px_0_0_#D2EC7C]">{t('coach.signalsLabel')}</span>
 <span className="text-xs font-semibold text-[#42424a] uppercase tracking-wider">{t('coach.signalsHint')}</span>
 </div>

 <div className="flex flex-col gap-4">
 {signals.map((s, i) => (
 <div key={i} className={`p-2 border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12] ${s.warn ? 'bg-[#FFE3D1]' : 'bg-[#EBE5FF]'}`}>
 <div className="bg-white border-[3px] border-black p-5 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
 <div className="flex items-center gap-4">
 <div className={`w-12 h-12 border-[3px] border-black rounded-full flex items-center justify-center font-black text-xl shrink-0 ${s.warn ? 'bg-coral text-[#0F0F12]' : 'bg-[#34BBC0] text-[#0F0F12]'}`} aria-hidden="true">{s.warn ? '!' : '?'}</div>
 <div>
 <h4 className="font-black text-base sm:text-lg uppercase leading-tight">{s.title}</h4>
 <p className="text-sm font-bold mt-1 max-w-md">{s.desc}</p>
 </div>
 </div>
 <button
 onClick={() => setSent(p => ({ ...p, [i]: true }))}
 disabled={sent[i]}
 aria-live="polite"
 className={`border-[3px] border-black px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0_0_#0F0F12] transition-all w-full sm:w-auto shrink-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${sent[i] ? 'bg-[#DAE69A] cursor-default translate-y-[3px] shadow-none' : 'bg-[#D2EC7C] hover:bg-[#34BBC0] active:translate-y-1 active:shadow-none'}`}
 >
 {sent[i] ? t('coach.signalSent') : s.cta}
 </button>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* ---- TAB: SETTIMANA ---- */}
 {tab === 'week' && (
 <div>
 <h3 className="font-black uppercase text-sm tracking-widest mb-6">{t('coach.weekTitle')}</h3>

 <div className="bg-white border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] p-4 sm:p-6">
 <div className="flex items-end justify-between gap-2 sm:gap-4 h-56">
 {WEEK.map((d, i) => (
 <div key={i} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
 <span className="text-[10px] sm:text-xs font-black text-black/55">{d.checkin}</span>
 <div
 className="w-full border-[2px] border-black transition-[height] duration-700 ease-out min-h-[6px]"
 style={{ height: `${d.energy}%`, backgroundColor: energyColor(d.energy) }}
 ></div>
 <span className="text-[10px] sm:text-xs font-black uppercase">{weekDays[i]}</span>
 </div>
 ))}
 </div>

 {/* Legenda */}
 <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 pt-4 border-t-2 border-black/15 text-xs font-semibold text-[#42424a]">
 <span className="inline-flex items-center gap-2"><span className="w-4 h-3 border-2 border-black bg-[#34BBC0]" aria-hidden="true"></span>{t('coach.kpiEnergyLabel')}</span>
 <span className="inline-flex items-center gap-2"><span className="font-black text-black">12–19</span>{t('coach.weekCheckin')}</span>
 </div>
 </div>

 <p className="mt-4 font-bold text-sm">{t('coach.weekSummary')}</p>
 </div>
 )}

 </div>
 </section>
 </div>
 );
}
