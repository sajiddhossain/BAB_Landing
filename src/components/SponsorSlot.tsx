/**
 * @file      SponsorSlot.tsx
 * @summary   Spazio sponsor STATICO, gestito a mano (nessuna rete pubblicitaria
 *            esterna tipo AdSense). Di default mostra un placeholder on-brand che
 *            invita alla sponsorizzazione; per inserire un partner reale, passare
 *            la prop `sponsor`. Sempre etichettato "Spazio sponsor" per trasparenza.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useTranslation } from 'react-i18next';

export interface Sponsor {
  name: string;
  /** Immagine del banner (logo/creatività), già nello stile del sito. */
  image?: string;
  /** Link di destinazione (sito dello sponsor). */
  href: string;
  /** Testo alternativo accessibile del banner. */
  alt?: string;
}

interface SponsorSlotProps {
  /** Se assente, mostra il placeholder "questo spazio può essere tuo". */
  sponsor?: Sponsor;
  className?: string;
}

const CONTACT = 'mailto:bab.community.official@gmail.com?subject=Sponsorizzazione%20BAB';

export default function SponsorSlot({ sponsor, className = '' }: SponsorSlotProps) {
  const { t } = useTranslation();

  return (
    <aside
      aria-label={t('sponsor.label')}
      className={`relative border-[3px] border-black bg-white shadow-[6px_6px_0_0_#0F0F12] overflow-hidden ${className}`}
    >
      {/* Etichetta trasparente: è uno spazio promozionale, non contenuto editoriale */}
      <span className="absolute top-0 right-0 bg-[#EBE5FF] text-[#0F0F12] border-l-[3px] border-b-[3px] border-black px-3 py-1 text-[10px] font-black uppercase tracking-widest z-10">
        {t('sponsor.label')}
      </span>

      {sponsor ? (
        <a href={sponsor.href} target="_blank" rel="noopener sponsored" className="block focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-3px] focus-visible:outline-[#34BBC0]">
          {sponsor.image ? (
            <img src={sponsor.image} alt={sponsor.alt || sponsor.name} className="w-full h-auto" loading="lazy" />
          ) : (
            <div className="flex items-center justify-center min-h-[120px] p-6 font-black text-xl">{sponsor.name}</div>
          )}
        </a>
      ) : (
        <div className="flex flex-col items-start justify-center gap-2 p-6 sm:p-8 min-h-[120px] bg-[repeating-linear-gradient(135deg,transparent,transparent_10px,rgba(15,15,18,0.03)_10px,rgba(15,15,18,0.03)_20px)]">
          <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-lg sm:text-xl font-black">{t('sponsor.title')}</h3>
          <p className="text-sm font-bold text-[#0F0F12]/70 max-w-md">{t('sponsor.text')}</p>
          <a
            href={CONTACT}
            className="mt-1 inline-flex items-center min-h-[44px] bg-[#D2EC7C] text-[#0F0F12] border-[3px] border-black px-5 py-2 text-sm font-black uppercase tracking-wide shadow-[3px_3px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-0.5 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all"
          >
            {t('sponsor.cta')}
          </a>
        </div>
      )}
    </aside>
  );
}
