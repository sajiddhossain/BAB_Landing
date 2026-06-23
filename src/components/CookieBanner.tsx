/**
 * @file CookieBanner.tsx
 * @summary Banner consenso cookie (GDPR). Compare alla prima visita finché
 * l'utente non sceglie. "Accetta" attiva gli analytics, "Rifiuta" no.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getConsent, setConsent, type CookieConsent } from '../lib/consent';

interface CookieBannerProps {
 /** Chiamato con la scelta dell'utente; il padre attiva gli analytics se 'accepted'. */
 onChoice: (choice: CookieConsent) => void;
}

export default function CookieBanner({ onChoice }: CookieBannerProps) {
 const { t } = useTranslation();
 // Mostra solo se non c'è ancora una scelta salvata.
 const [visible, setVisible] = useState(() => getConsent() === null);

 if (!visible) return null;

 const choose = (choice: CookieConsent) => {
 setConsent(choice);
 setVisible(false);
 onChoice(choice);
 };

 return (
 <div
 role="dialog"
 aria-modal="false"
 aria-label={t('cookieBanner.aria')}
 className="fixed bottom-0 inset-x-0 z-[90] p-4 sm:p-6 flex justify-center pointer-events-none"
 >
 <div className="pointer-events-auto w-full max-w-3xl bg-[#FAF9F6] border-[3px] border-black shadow-[6px_6px_0_0_#0F0F12] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
 <p className="font-['Space_Grotesk',_sans-serif] text-sm leading-relaxed text-[#0F0F12] flex-1">
 {t('cookieBanner.text')}{' '}
 <a href="/cookie" className="underline text-vividteal hover:no-underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12]">
 {t('cookieBanner.link')}
 </a>.
 </p>
 <div className="flex gap-3 shrink-0">
 <button
 onClick={() => choose('rejected')}
 className="flex-1 sm:flex-none px-5 py-3 bg-white text-[#0F0F12] border-[3px] border-black font-black uppercase text-xs tracking-wide hover:bg-neutral-100 active:translate-y-1 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all"
 >
 {t('cookieBanner.reject')}
 </button>
 <button
 onClick={() => choose('accepted')}
 className="flex-1 sm:flex-none px-5 py-3 bg-[#D2EC7C] text-[#0F0F12] border-[3px] border-black font-black uppercase text-xs tracking-wide shadow-[3px_3px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all"
 >
 {t('cookieBanner.accept')}
 </button>
 </div>
 </div>
 </div>
 );
}
