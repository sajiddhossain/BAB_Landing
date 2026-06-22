/**
 * @file      App.tsx
 * @summary   Routing Principale e Layout per BAB (Breaking All Barriers)
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 * @notice    Questo codice è di proprietà intellettuale dell'autore. 
 *            L'utilizzo, la modifica o la distribuzione non autorizzata 
 *            sono severamente vietati in assenza di accordi contrattuali scritti.
 */
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { initAnalytics, trackPageview, trackEvent } from './lib/analytics';
import { getConsent } from './lib/consent';
import CookieBanner from './components/CookieBanner';
import BabLogo from './components/BabLogo';
import type { UserType } from './lib/leads';

// Route Components — Home eager (LCP della landing), il resto code-split per route
import Home from './components/Home';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
const AppSimulator = lazy(() => import('./components/AppSimulator'));
const CoachDashboard = lazy(() => import('./components/CoachDashboard'));
const Features = lazy(() => import('./components/Features'));
const About = lazy(() => import('./components/About'));
const LegalPage = lazy(() => import('./components/LegalPage'));
const WaitlistModal = lazy(() => import('./components/WaitlistModal'));

// Normalizza il path: rimuove lo slash finale (/coach/ → /coach), così il match
// delle rotte funziona anche quando l'hosting serve la pagina con trailing slash.
const normalizePath = (p: string): string => {
  const clean = p.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
};

// Fallback minimale durante il caricamento del chunk di route
function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-live="polite">
      <div className="w-10 h-10 border-[4px] border-black border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
      <span className="sr-only">Caricamento…</span>
    </div>
  );
}

export default function App() {
  const { t, i18n } = useTranslation();
  const [currentPath, setCurrentPath] = useState<string>(normalizePath(window.location.pathname));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistMounted, setWaitlistMounted] = useState(false); // carica il chunk solo al 1° open, poi resta montato per animare la chiusura
  const [waitlistTarget, setWaitlistTarget] = useState<UserType | undefined>(undefined);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const openWaitlist = (target?: UserType) => {
    setWaitlistTarget(target);
    setWaitlistMounted(true);
    setIsWaitlistOpen(true);
    trackEvent('waitlist_open', { target: target ?? 'unknown' });
  };

  const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'en';
  const getFlagImg = (lng: string) => {
    switch(lng) {
      case 'it': return '/flags/italy.png';
      case 'fr': return '/flags/france.png';
      case 'en': default: return '/flags/united-kingdom.png';
    }
  };
  const otherLangs = ['en', 'it', 'fr'].filter(l => l !== currentLang);

  // Easter Egg Signature
  useEffect(() => {
    console.log(
      "%c✦ BAB Architecture designed & coded by Sajid Hossain (2026) ✦",
      "color: #34BBC0; font-family: monospace; font-size: 12px; font-weight: bold; background: #080C12; padding: 4px 8px; border: 1px solid #DAE69A;"
    );
  }, []);

  // Analytics: init SOLO con consenso cookie già accettato (GDPR).
  // Senza consenso → niente tag finché l'utente non accetta dal banner.
  useEffect(() => {
    if (getConsent() === 'accepted') {
      initAnalytics();
      trackPageview(window.location.pathname || '/');
    }
  }, []);

  // Attiva gli analytics nel momento in cui l'utente accetta dal banner.
  const handleCookieChoice = (choice: 'accepted' | 'rejected') => {
    if (choice === 'accepted') {
      initAnalytics();
      trackPageview(window.location.pathname || '/');
    }
  };

  // Chiudi il dropdown lingua su click-fuori o Escape (touch-friendly + a11y)
  useEffect(() => {
    if (!isLangDropdownOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLangDropdownOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [isLangDropdownOpen]);

  // Blocca lo scroll del body quando il menu mobile o la waitlist sono aperti
  useEffect(() => {
    document.body.style.overflow = (isMenuOpen || isWaitlistOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen, isWaitlistOpen]);

  // SEO: title + meta description per-rotta, localizzati (tab, bookmark, share, crawler JS)
  useEffect(() => {
    const map: Record<string, string> = {
      '/': 'home', '/app': 'app', '/coach': 'coach', '/features': 'features',
      '/about': 'about', '/privacy': 'privacy', '/cookie': 'cookie', '/termini': 'termini',
    };
    const isUnknown = !(currentPath in map);
    const key = map[currentPath] ?? 'home';
    document.title = isUnknown ? `${t('notFound.title')} — BAB` : t(`seo.${key}.title`);
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', isUnknown ? t('notFound.body') : t(`seo.${key}.desc`));

    // 404: chiedi ai crawler di non indicizzare la pagina (soft-404 pulito)
    let robots = document.querySelector('meta[name="robots"]');
    if (isUnknown) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        document.head.appendChild(robots);
      }
      robots.setAttribute('content', 'noindex, follow');
    } else if (robots) {
      robots.remove();
    }
  }, [currentPath, t, i18n.language]);

  // Chiudi il menu mobile con Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  // Routing con URL puliti (History API), no hash. Vercel serve index.html su ogni path.
  useEffect(() => {
    // Intercetta i click sui link interni "/..." → navigazione SPA senza ricaricare
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      // solo link interni assoluti; esclude #ancore, mailto/http esterni, target=_blank
      if (!href || !href.startsWith('/') || anchor.getAttribute('target') === '_blank') return;
      e.preventDefault();
      if (href !== window.location.pathname) {
        window.history.pushState({}, '', href);
        setCurrentPath(href);
        window.scrollTo(0, 0);
        trackPageview(href);
      }
      setIsMenuOpen(false);
    };
    // Avanti/Indietro del browser
    const onPop = () => {
      const p = normalizePath(window.location.pathname);
      setCurrentPath(p);
      window.scrollTo(0, 0);
      setIsMenuOpen(false);
      trackPageview(p);
    };
    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  // Navigazione programmatica (CTA non-link)
  const navigate = (path: string) => {
    if (path !== window.location.pathname) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
      trackPageview(path);
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/app', label: t('nav.app') },
    { path: '/coach', label: t('nav.coach') },
    { path: '/features', label: t('nav.features') },
    { path: '/about', label: t('nav.about') },
  ];

  // Route sconosciuta → pagina 404 in-brand (non un finto rendering della Home)
  const knownPaths = ['/', '/app', '/coach', '/features', '/about', '/privacy', '/cookie', '/termini'];
  const isNotFound = !knownPaths.includes(currentPath);
  const activePath = currentPath;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F0F12] selection:bg-[#D2EC7C] selection:text-[#0F0F12] font-['Space_Grotesk',_sans-serif] y2k-grid relative">

      {/* Skip-to-content: primo elemento focusabile, fuori schermo finché non riceve focus */}
      <a
        href="#main-content"
        onClick={() => document.getElementById('main-content')?.focus()}
        className="fixed left-3 -top-24 focus:top-3 z-[200] px-5 py-3 bg-[#D2EC7C] text-[#0F0F12] border-[3px] border-black font-black uppercase text-sm tracking-wide shadow-[4px_4px_0_0_#0F0F12] focus:outline focus:outline-[3px] focus:outline-offset-2 focus:outline-[#0F0F12] transition-all"
      >
        {t('a11y.skipToContent')}
      </a>

      {/* HEADER (Neobrutalism) */}
      <header className="fixed top-0 inset-x-0 h-20 bg-[#FAF9F6] text-[#0F0F12] border-b-[3px] border-black z-50 px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4 shadow-[0_4px_0_0_#0F0F12]">
        <a href="/" aria-label="BAB — Home" className="flex items-center hover:-translate-y-0.5 transition-transform z-50 shrink-0">
          <BabLogo className="h-9 md:h-11 w-auto text-[#143F36]" />
        </a>

        {/* Desktop Nav (>= lg per evitare l'affollamento con le etichette IT) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-black uppercase tracking-widest">
          {navLinks.map((link) => {
            const active = activePath === link.path;
            return (
             <a
               key={link.path}
               href={link.path}
               aria-current={active ? 'page' : undefined}
               className={`relative py-1 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#0F0F12] after:absolute after:left-0 after:-bottom-0.5 after:h-[3px] after:bg-vividteal after:transition-all ${active ? 'text-vividteal after:w-full' : 'text-black hover:text-vividteal after:w-0 hover:after:w-full'}`}
             >
               {link.label}
             </a>
            );
          })}

          {/* Language Switcher Dropdown (click-based, a11y) */}
          <div className="relative ml-2" ref={langRef}>
            <button
              onClick={() => setIsLangDropdownOpen(o => !o)}
              aria-haspopup="true"
              aria-expanded={isLangDropdownOpen}
              aria-label={`Lingua: ${currentLang.toUpperCase()}`}
              className="w-11 h-11 rounded-full overflow-hidden border-[2px] border-black hover:-translate-y-0.5 transition-transform bg-[#FAF9F6] shadow-[2px_2px_0_0_#0F0F12] z-50 relative flex items-center justify-center focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
            >
              <img src={getFlagImg(currentLang)} alt="" className="w-full h-full object-cover" />
            </button>

            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 flex flex-col gap-2 bg-white border-[2px] border-black p-2 shadow-[4px_4px_0_0_#0F0F12] z-40 rounded"
                >
                  {otherLangs.map(lng => (
                    <button
                      key={lng}
                      onClick={() => {
                        i18n.changeLanguage(lng);
                        setIsLangDropdownOpen(false);
                      }}
                      className="w-11 h-11 rounded-full overflow-hidden border-[2px] border-black hover:-translate-y-1 hover:scale-110 transition-transform opacity-80 hover:opacity-100 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] focus-visible:opacity-100"
                      title={lng.toUpperCase()}
                      aria-label={lng.toUpperCase()}
                    >
                      <img src={getFlagImg(lng)} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => openWaitlist()}
            className="group relative bg-[#D2EC7C] text-[#0F0F12] border-[3px] border-black px-6 py-2 ml-4 text-sm font-black uppercase tracking-wider shadow-[4px_4px_0_0_#0F0F12] hover:bg-[#34BBC0] active:shadow-none active:translate-y-1 active:translate-x-1 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all skew-btn"
          >
            <span className="skew-btn-content">{t('nav.waitlist')}</span>
          </button>
        </nav>

        {/* Mobile Hamburger Button (< lg) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="lg:hidden w-12 h-12 shrink-0 bg-white border-[3px] border-black flex flex-col items-center justify-center gap-1.5 shadow-[4px_4px_0_0_#0F0F12] z-50 transition-transform active:translate-y-1 active:shadow-[0_0_0_0_#0F0F12] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
        >
          <span className={`block w-6 h-[3px] bg-black transition-transform ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
          <span className={`block w-6 h-[3px] bg-black transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-[3px] bg-black transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
        </button>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-[#FAF9F6] y2k-grid z-40 lg:hidden flex flex-col items-center overflow-y-auto"
          >
             <nav className="flex flex-col items-center gap-5 text-2xl font-black uppercase tracking-widest w-full px-6 max-w-md my-auto pt-28 pb-16" aria-label="Menu principale">
                {navLinks.map((link) => {
                   const active = activePath === link.path;
                   return (
                   <a
                     key={link.path}
                     href={link.path}
                     onClick={() => setIsMenuOpen(false)}
                     aria-current={active ? 'page' : undefined}
                     className={`w-full text-center border-[3px] border-black py-4 shadow-[6px_6px_0_0_#0F0F12] active:translate-y-1 active:shadow-[0_0_0_0_#0F0F12] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all ${active ? 'bg-[#34BBC0] text-[#0F0F12]' : 'bg-white'}`}
                   >
                     {link.label}
                   </a>
                   );
                })}
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openWaitlist();
                    }}
                    className="w-full flex items-center justify-center py-4 mt-2 -skew-x-6 bg-[#D2EC7C] text-[#0F0F12] border-[3px] border-black font-black text-2xl uppercase tracking-wider shadow-[6px_6px_0_0_#0F0F12] hover:bg-[#34BBC0] active:translate-y-1 active:translate-x-1 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] transition-all"
                  >
                    {t('nav.waitlist')}
                  </button>

                {/* Mobile Language Switcher */}
                <div className="flex justify-center gap-4 mt-8" role="group" aria-label="Lingua">
                  {([['it','/flags/italy.png'],['en','/flags/united-kingdom.png'],['fr','/flags/france.png']] as const).map(([lng, flag]) => {
                    const active = i18n.language.startsWith(lng);
                    return (
                      <button
                        key={lng}
                        onClick={() => i18n.changeLanguage(lng)}
                        aria-label={lng.toUpperCase()}
                        aria-pressed={active}
                        className={`w-11 h-11 rounded-full overflow-hidden border-[3px] border-black active:translate-y-1 transition-transform focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0F0F12] ${active ? 'shadow-[4px_4px_0_0_#0F0F12] scale-110' : 'opacity-60'}`}
                      >
                        <img src={flag} alt="" className="w-full h-full object-cover" />
                      </button>
                    );
                  })}
                </div>
             </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT ROUTING */}
      <main id="main-content" tabIndex={-1} className="pt-20 w-full overflow-x-hidden relative z-10 focus:outline-none">
        <Suspense fallback={<RouteFallback />}>
          <AnimatePresence mode="wait">
            {isNotFound && <NotFound key="404" onNavigate={navigate} />}
            {activePath === '/' && <Home key="home" onOpenWaitlist={openWaitlist} onNavigate={navigate} />}
            {activePath === '/app' && <AppSimulator key="app" onOpenWaitlist={openWaitlist} />}
            {activePath === '/coach' && <CoachDashboard key="coach" />}
            {activePath === '/features' && <Features key="features" />}
            {activePath === '/about' && <About key="about" />}
            {activePath === '/privacy' && <LegalPage key="privacy" page="privacy" />}
            {activePath === '/cookie' && <LegalPage key="cookie" page="cookie" />}
            {activePath === '/termini' && <LegalPage key="termini" page="terms" />}
          </AnimatePresence>
        </Suspense>
      </main>

      {/* GLOBAL FOOTER (tutte le pagine) */}
      <Footer onOpenWaitlist={openWaitlist} />

      {/* GLOBAL WAITLIST MODAL — chunk caricato solo al 1° open, poi resta montato per l'animazione di uscita */}
      {waitlistMounted && (
        <Suspense fallback={null}>
          <WaitlistModal
            isOpen={isWaitlistOpen}
            onClose={() => setIsWaitlistOpen(false)}
            target={waitlistTarget}
          />
        </Suspense>
      )}

      {/* Banner consenso cookie — gate degli analytics (GDPR) */}
      <CookieBanner onChoice={handleCookieChoice} />

    </div>
  );
}
