/**
 * @file      CoachDashboard.tsx
 * @summary   Percorso B2B "Per le Società": sezione vendita accessibile (testi dritti,
 *            niente skew/stroke/rotazioni, contrasto AA) + anteprima della Coach Dashboard.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ClubLeadForm from './ClubLeadForm';

export default function CoachDashboard() {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<'squadra' | 'singolo'>('squadra');
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const values = [
    { title: t('coach.value1Title'), desc: t('coach.value1Desc') },
    { title: t('coach.value2Title'), desc: t('coach.value2Desc') },
    { title: t('coach.value3Title'), desc: t('coach.value3Desc') },
  ];
  const trust = [t('coach.trust1'), t('coach.trust2'), t('coach.trust3')];

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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {values.map((v, i) => (
              <div key={i} className="bg-white border-[2px] border-black border-l-[6px] border-l-[#34BBC0] shadow-[4px_4px_0_0_#0F0F12] p-5">
                <h3 className="text-lg font-bold text-[#0F0F12] mb-1">{v.title}</h3>
                <p className="text-sm leading-relaxed text-[#42424a]">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#0F0F12] border-[2px] border-black p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#DAE69A] font-semibold">{t('coach.pricingLabel')}</div>
              <div className="text-lg text-white font-bold mt-1">{t('coach.pricingValue')}</div>
            </div>
            <button
              onClick={scrollToForm}
              className="bg-[#34BBC0] text-[#0F0F12] border-[2px] border-black px-5 py-2.5 font-bold hover:bg-[#FFDE4D] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              {t('coach.pricingCta')}
            </button>
          </div>

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

      {/* ===== ANTEPRIMA PRODOTTO: Coach Dashboard (mock localizzato) ===== */}
      <section className="w-full px-4 pb-24">
        <div className="w-full max-w-5xl mx-auto flex flex-col">

          <div className="flex items-center gap-3 mb-8">
            <span className="bg-black text-white px-2 py-1 font-bold text-xs uppercase tracking-wide">{t('coach.previewLabel')}</span>
            <div className="flex-1 h-[3px] bg-black/20"></div>
          </div>

          {/* Header Dashboard */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4 border-b-[4px] border-black pb-6">
            <div>
              <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-5xl font-black mb-2 uppercase">{t('coach.teamName')}</h2>
              <p className="font-bold text-sm uppercase tracking-widest bg-black text-white inline-block px-3 py-1">{t('coach.teamStatus')}</p>
            </div>

            <div className="flex bg-white border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveView('squadra')}
                className={`px-6 py-3 font-black text-xs uppercase tracking-widest transition-colors border-r-[3px] border-black focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-3px] focus-visible:outline-[#34BBC0] ${activeView === 'squadra' ? 'bg-[#FFDE4D]' : 'hover:bg-neutral-100 hover:text-[#C2410C]'}`}
              >
                {t('coach.tabOverview')}
              </button>
              <button
                onClick={() => setActiveView('singolo')}
                className={`px-6 py-3 font-black text-xs uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-3px] focus-visible:outline-[#34BBC0] ${activeView === 'singolo' ? 'bg-[#FFDE4D]' : 'hover:bg-neutral-100 hover:text-[#C2410C]'}`}
              >
                {t('coach.tabDetail')}
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#DAE69A] border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] p-6 hover:-translate-y-1 transition-transform">
              <h3 className="text-xs font-black uppercase tracking-widest mb-1 border-b-2 border-black pb-2">{t('coach.kpiReadiness')}</h3>
              <div className="text-6xl font-['Bricolage_Grotesque',_sans-serif] font-black mt-4">18/20</div>
              <p className="text-sm font-bold mt-2">{t('coach.kpiReadyPlayers')}</p>
            </div>
            <div className="bg-[#EBE5FF] border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] p-6 hover:-translate-y-1 transition-transform">
              <h3 className="text-xs font-black uppercase tracking-widest mb-1 border-b-2 border-black pb-2">{t('coach.kpiRisk')}</h3>
              <div className="text-6xl font-['Bricolage_Grotesque',_sans-serif] font-black mt-4">{t('coach.kpiRiskValue')}</div>
              <p className="text-sm font-bold mt-2">{t('coach.kpiRiskNote')}</p>
            </div>
            <div className="bg-[#FFE3D1] border-[3px] border-black shadow-[4px_4px_0_0_#0F0F12] p-6 hover:-translate-y-1 transition-transform">
              <h3 className="text-xs font-black uppercase tracking-widest mb-1 border-b-2 border-black pb-2">{t('coach.kpiFocus')}</h3>
              <div className="text-4xl font-['Bricolage_Grotesque',_sans-serif] font-black mt-4 uppercase leading-none">{t('coach.kpiFocusValue')}</div>
            </div>
          </div>

          {/* Actionable Insights */}
          <div className="w-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-black text-white px-2 py-1 font-black text-sm shadow-[2px_2px_0_0_#FFDE4D]">{t('coach.actionBadge')}</span>
              <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-2xl font-black uppercase">{t('coach.actionsLabel')}</h3>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-[#0F0F12] p-2 border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12] hover:-translate-y-1 transition-transform">
                <div className="bg-white border-[3px] border-black p-6 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center h-full">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#C2410C] text-white border-[3px] border-black rounded-full flex items-center justify-center font-black text-xl shrink-0" aria-hidden="true">!</div>
                    <div>
                      <h4 className="font-black text-lg uppercase">{t('coach.alert1Title')}</h4>
                      <p className="text-sm font-bold mt-1 max-w-md">{t('coach.alert1Desc')}</p>
                    </div>
                  </div>
                  <button className="bg-[#FFDE4D] text-[#0F0F12] border-[3px] border-black px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all w-full sm:w-auto">{t('coach.alert1Cta')}</button>
                </div>
              </div>

              <div className="bg-neutral-300 p-2 border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12] hover:-translate-y-1 transition-transform">
                <div className="bg-white border-[3px] border-black p-6 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center h-full">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#DAE69A] border-[3px] border-black rounded-full flex items-center justify-center font-black text-xl shrink-0" aria-hidden="true">✓</div>
                    <div>
                      <h4 className="font-black text-lg uppercase">{t('coach.alert2Title')}</h4>
                      <p className="text-sm font-bold mt-1 max-w-md">{t('coach.alert2Desc')}</p>
                    </div>
                  </div>
                  <button className="bg-[#FFDE4D] text-[#0F0F12] border-[3px] border-black px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all w-full sm:w-auto">{t('coach.alert2Cta')}</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
