/**
 * @file      PrivacyReveal.tsx
 * @summary   Reveal interattivo della demo /app: la STESSA giornata vista da
 *            Atleta / Coach / Genitore. Mostra cosa ciascuno vede — e soprattutto
 *            cosa NON vede (la privacy è il momento "wow"). Tablist accessibile.
 *            Riusa le stringhe coach.* per la vista Coach (niente /coach, niente
 *            import di CoachDashboard).
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Doodle from './Doodle';

type TabId = 'athlete' | 'coach' | 'parent';

export interface RevealAnswers {
  cycle: string;
  energy: string;
  mood: string;
}

const TABS: { id: TabId; key: string }[] = [
  { id: 'athlete', key: 'simulator.reveal.tabAthlete' },
  { id: 'coach', key: 'simulator.reveal.tabCoach' },
  { id: 'parent', key: 'simulator.reveal.tabParent' },
];

export default function PrivacyReveal({ answers }: { answers: RevealAnswers }) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabId>('athlete');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Tablist: frecce per spostarsi + focus (roving tabindex).
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = e.key === 'ArrowRight' ? (i + 1) % TABS.length : (i - 1 + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="text-left">
      <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-lg font-black uppercase tracking-tight mb-1">{t('simulator.reveal.title')}</h3>
      <p className="text-xs font-bold text-black/65 mb-3">{t('simulator.reveal.intro')}</p>

      {/* Toggle (tablist) */}
      <div role="tablist" aria-label={t('simulator.reveal.title')} className="flex border-[3px] border-black mb-3 bg-white">
        {TABS.map((tb, i) => {
          const selected = tab === tb.id;
          return (
            <button
              key={tb.id}
              ref={el => { tabRefs.current[i] = el; }}
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(tb.id)}
              onKeyDown={e => onTabKey(e, i)}
              className={`flex-1 py-2 font-black uppercase text-xs tracking-wider transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-3px] focus-visible:outline-[#34BBC0] ${i > 0 ? 'border-l-[3px] border-black' : ''} ${selected ? 'bg-[#0F0F12] text-[#D2EC7C]' : 'bg-white text-[#0F0F12] hover:bg-[#EBE5FF]'}`}
            >
              {t(tb.key)}
            </button>
          );
        })}
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} role="tabpanel">
        {tab === 'athlete' && <AthletePanel answers={answers} />}
        {tab === 'coach' && <CoachPanel />}
        {tab === 'parent' && <ParentPanel />}
      </motion.div>
    </div>
  );
}

/* ───────── Vista ATLETA: vede tutto, in chiaro, solo per sé ───────── */
function AthletePanel({ answers }: { answers: RevealAnswers }) {
  const { t } = useTranslation();
  const rows = [
    { label: t('simulator.checkin.cycleLabel'), val: answers.cycle },
    { label: t('simulator.checkin.energyLabel'), val: answers.energy },
    { label: t('simulator.checkin.moodLabel'), val: answers.mood },
  ];
  return (
    <div className="border-[3px] border-black bg-white shadow-[4px_4px_0_0_#0F0F12] p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-black uppercase tracking-widest">{t('simulator.reveal.athleteHeading')}</span>
        <span className="text-xl" aria-hidden="true">👤</span>
      </div>
      <p className="text-sm font-bold leading-snug mb-3">{t('simulator.reveal.athleteBody')}</p>
      <ul className="flex flex-col gap-1.5 mb-3">
        {rows.map(r => (
          <li key={r.label} className="flex items-center justify-between gap-2 bg-[#FAF9F6] border-[2px] border-black px-2.5 py-1.5">
            <span className="text-[11px] font-black uppercase tracking-wide text-black/70">{r.label}</span>
            <span className="text-sm font-bold">{r.val}</span>
          </li>
        ))}
      </ul>
      <p className="text-[12px] font-black bg-[#D2EC7C] border-[2px] border-black px-2.5 py-1.5">{t('simulator.reveal.athleteSees')}</p>
    </div>
  );
}

/* ───────── Vista COACH: solo segnale di squadra aggregato e anonimo ───────── */
function CoachPanel() {
  const { t } = useTranslation();
  const kpis = [
    { label: t('coach.kpiCheckinLabel'), val: '16/20', note: t('coach.kpiCheckinNote'), bg: '#D2EC7C' },
    { label: t('coach.kpiEnergyLabel'), val: t('coach.kpiEnergyValue'), note: t('coach.kpiEnergyNote'), bg: '#EBE5FF' },
    { label: t('coach.kpiMoodLabel'), val: t('coach.kpiMoodValue'), note: t('coach.kpiMoodNote'), bg: '#34BBC0' },
  ];
  return (
    <div className="border-[3px] border-black bg-white shadow-[4px_4px_0_0_#0F0F12] p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-black uppercase tracking-widest">{t('coach.teamName')}</span>
        <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 uppercase tracking-wide">{t('coach.teamMeta')}</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 mb-2.5">
        {kpis.map(k => (
          <div key={k.label} className="border-[2px] border-black p-1.5" style={{ backgroundColor: k.bg }}>
            <div className="text-[9px] font-black uppercase leading-tight mb-0.5">{k.label}</div>
            <div className="text-base font-black leading-none">{k.val}</div>
            <div className="text-[8px] font-bold leading-tight mt-0.5 text-black/70">{k.note}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#FAF9F6] border-[2px] border-black px-2.5 py-1.5 mb-2.5">
        <div className="text-[11px] font-black uppercase tracking-wide mb-0.5">{t('coach.signal1Title')}</div>
        <p className="text-[12px] font-bold leading-snug text-black/75">{t('coach.signal1Desc')}</p>
      </div>
      <p className="flex items-start gap-1.5 text-[12px] font-black bg-[#EBE5FF] border-[2px] border-black px-2.5 py-1.5">
        <Doodle name="lock" className="w-4 h-4 shrink-0 mt-0.5 text-[#1F7A63]" stroke={2} />
        <span>{t('simulator.reveal.coachNotSees')}</span>
      </p>
    </div>
  );
}

/* ───────── Vista GENITORE: riassunto gentile, non clinico ───────── */
function ParentPanel() {
  const { t } = useTranslation();
  return (
    <div className="border-[3px] border-black bg-white shadow-[4px_4px_0_0_#0F0F12] p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-black uppercase tracking-widest">{t('simulator.reveal.parentHeading')}</span>
        <span className="text-xl" aria-hidden="true">💚</span>
      </div>
      <p className="text-sm font-bold leading-snug mb-3 bg-[#FAF9F6] border-[2px] border-black px-2.5 py-2">{t('simulator.reveal.parentBody')}</p>
      <p className="flex items-start gap-1.5 text-[12px] font-black bg-[#EBE5FF] border-[2px] border-black px-2.5 py-1.5">
        <Doodle name="lock" className="w-4 h-4 shrink-0 mt-0.5 text-[#1F7A63]" stroke={2} />
        <span>{t('simulator.reveal.parentNotSees')}</span>
      </p>
    </div>
  );
}
