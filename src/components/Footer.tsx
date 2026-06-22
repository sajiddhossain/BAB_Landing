/**
 * @file      Footer.tsx
 * @summary   Footer globale condiviso da tutte le pagine BAB. Navigazione, social,
 *            CTA waitlist e nota legale. Variante scura in-brand (Y2K neobrutalist).
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useTranslation } from 'react-i18next';
import type { UserType } from '../lib/leads';

interface FooterProps {
  onOpenWaitlist?: (target?: UserType) => void;
}

const NAV_LINKS = [
  { path: '#/', key: 'nav.home' },
  { path: '#/app', key: 'nav.app' },
  { path: '#/coach', key: 'nav.coach' },
  { path: '#/features', key: 'nav.features' },
  { path: '#/about', key: 'nav.about' },
] as const;

const SOCIALS = [
  { href: 'https://substack.com/@babcommunity', label: 'Substack' },
  { href: 'https://www.instagram.com/bab_community/', label: 'Instagram' },
] as const;

export default function Footer({ onOpenWaitlist }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#0F0F12] text-[#FAF9F6] border-t-[4px] border-black relative z-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand + tagline + social */}
          <div className="md:col-span-5 flex flex-col items-start gap-6">
            <a href="#/" className="inline-block hover:-translate-y-0.5 transition-transform" aria-label="BAB — Home">
              <img src="/BAB_logo.svg" alt="BAB — Breaking All Barriers" className="h-12" />
            </a>
            <p className="font-['Space_Grotesk',_sans-serif] font-bold text-base leading-relaxed max-w-xs text-[#FAF9F6]/80">
              {t('footer.tagline')}
            </p>

            <div className="flex flex-col gap-3 w-full max-w-xs">
              <span className="font-black uppercase tracking-widest text-[11px] text-[#D2EC7C]">
                {t('footer.followHeading')}
              </span>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[44px] bg-white text-[#0F0F12] border-[3px] border-black px-4 py-2.5 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_0_#34BBC0] hover:bg-[#D2EC7C] hover:shadow-[3px_3px_0_0_#FAF9F6] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] transition-all"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigazione */}
          <nav className="md:col-span-3" aria-label={t('footer.navHeading')}>
            <span className="block font-black uppercase tracking-widest text-[11px] text-[#D2EC7C] mb-5">
              {t('footer.navHeading')}
            </span>
            <ul className="flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="inline-flex items-center min-h-[44px] font-['Space_Grotesk',_sans-serif] font-bold text-base uppercase tracking-wide text-[#FAF9F6]/90 hover:text-[#34BBC0] hover:translate-x-1 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] transition-all"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA waitlist */}
          <div className="md:col-span-4">
            <span className="block font-['Bricolage_Grotesque',_sans-serif] text-2xl font-black uppercase tracking-tight mb-3 text-white">
              {t('footer.ctaHeading')}
            </span>
            <p className="font-['Space_Grotesk',_sans-serif] font-bold text-sm leading-relaxed text-[#FAF9F6]/70 mb-5 max-w-xs">
              {t('footer.ctaText')}
            </p>
            <button
              onClick={() => onOpenWaitlist?.()}
              className="group bg-[#D2EC7C] text-[#0F0F12] border-[3px] border-black px-6 py-3 text-sm font-black uppercase tracking-wider shadow-[5px_5px_0_0_#34BBC0] hover:shadow-[5px_5px_0_0_#FAF9F6] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] transition-all skew-btn"
            >
              <span className="skew-btn-content">{t('nav.waitlist')} ✦</span>
            </button>
          </div>
        </div>

        {/* Legale */}
        <nav className="mt-16 pt-8 border-t-[3px] border-dashed border-[#FAF9F6]/25 flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-1" aria-label={t('footer.legalHeading')}>
          <a href="#/privacy" className="inline-flex items-center min-h-[44px] font-black uppercase tracking-widest text-[11px] text-[#FAF9F6]/70 hover:text-[#34BBC0] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] transition-colors py-2">{t('footer.legalPrivacy')}</a>
          <a href="#/cookie" className="inline-flex items-center min-h-[44px] font-black uppercase tracking-widest text-[11px] text-[#FAF9F6]/70 hover:text-[#34BBC0] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] transition-colors py-2">{t('footer.legalCookie')}</a>
          <a href="#/termini" className="inline-flex items-center min-h-[44px] font-black uppercase tracking-widest text-[11px] text-[#FAF9F6]/70 hover:text-[#34BBC0] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] transition-colors py-2">{t('footer.legalTerms')}</a>
        </nav>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t-[3px] border-dashed border-[#FAF9F6]/25 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="font-black uppercase tracking-widest text-[11px] text-[#FAF9F6]/50 text-center sm:text-left">
            {t('footer.rights')}
          </p>
          <p className="font-black uppercase tracking-widest text-[11px] text-[#34BBC0] text-center sm:text-right">
            {t('footer.tags')}
          </p>
        </div>
      </div>
    </footer>
  );
}
