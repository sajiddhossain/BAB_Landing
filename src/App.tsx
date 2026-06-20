/**
 * @file      App.tsx
 * @summary   Routing Principale e Layout per BAB (Breaking All Barriers)
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 * @notice    Questo codice è di proprietà intellettuale dell'autore. 
 *            L'utilizzo, la modifica o la distribuzione non autorizzata 
 *            sono severamente vietati in assenza di accordi contrattuali scritti.
 */
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Route Components
import Home from './components/Home';
import AppSimulator from './components/AppSimulator';
import CoachDashboard from './components/CoachDashboard';
import Features from './components/Features';
import About from './components/About';
import WaitlistModal from './components/WaitlistModal';

export default function App() {
  const { t, i18n } = useTranslation();
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash || '#/');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

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

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentPath(hash);
      window.scrollTo(0, 0);
      setIsMenuOpen(false); // Chiudi il menu al cambio pagina
    };
    
    // Set initial hash if empty
    if (!window.location.hash) {
      window.location.hash = '#/';
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navLinks = [
    { path: '#/', label: t('nav.home') },
    { path: '#/app', label: t('nav.app') },
    { path: '#/coach', label: t('nav.coach') },
    { path: '#/features', label: t('nav.features') },
    { path: '#/about', label: t('nav.about') },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F0F12] selection:bg-[#FFDE4D] selection:text-[#0F0F12] font-['Space_Grotesk',_sans-serif] y2k-grid relative">
      
      {/* HEADER (Neobrutalism) */}
      <header className="fixed top-0 inset-x-0 h-20 bg-white border-b-[3px] border-black z-50 px-4 md:px-12 flex items-center justify-between shadow-[0_4px_0_0_#0F0F12]">
        <a href="#/" className="flex items-center gap-3 hover:-translate-y-0.5 transition-transform z-50">
          <img src="/BAB_logo.svg" alt="BAB Logo" className="h-8 md:h-10" />
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-black uppercase tracking-widest">
          {navLinks.map((link) => (
             <a 
               key={link.path} 
               href={link.path} 
               className={`transition-all hover:-translate-y-0.5 ${currentPath === link.path ? 'text-[#34BBC0] underline decoration-[3px] underline-offset-4' : 'text-black hover:text-[#34BBC0]'}`}
             >
               {link.label}
             </a>
          ))}
          
          {/* Language Switcher Dropdown */}
          <div 
            className="relative ml-4"
            onMouseEnter={() => setIsLangDropdownOpen(true)}
            onMouseLeave={() => setIsLangDropdownOpen(false)}
          >
            <button className="w-8 h-8 rounded-full overflow-hidden border-[2px] border-black hover:-translate-y-1 transition-transform bg-[#FAF9F6] shadow-[2px_2px_0_0_#000] z-50 relative flex items-center justify-center">
              <img src={getFlagImg(currentLang)} alt={currentLang.toUpperCase()} className="w-full h-full object-cover" />
            </button>
            
            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 flex flex-col gap-2 bg-white border-[2px] border-black p-2 shadow-[4px_4px_0_0_#000] z-40 rounded"
                >
                  {otherLangs.map(lng => (
                    <button 
                      key={lng}
                      onClick={() => {
                        i18n.changeLanguage(lng);
                        setIsLangDropdownOpen(false);
                      }} 
                      className="w-8 h-8 rounded-full overflow-hidden border-[2px] border-black hover:-translate-y-1 hover:scale-110 transition-transform opacity-80 hover:opacity-100"
                      title={lng.toUpperCase()}
                    >
                      <img src={getFlagImg(lng)} alt={lng.toUpperCase()} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => setIsWaitlistOpen(true)} 
            className="y2k-btn bg-[#FFDE4D] text-xs hover:bg-[#34BBC0] hover:text-white transition-colors ml-4"
          >
            {t('nav.waitlist')}
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-12 h-12 bg-white border-[3px] border-black flex flex-col items-center justify-center gap-1.5 shadow-[4px_4px_0_0_#0F0F12] z-50 transition-transform active:translate-y-1 active:shadow-[0_0_0_0_#000]"
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
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-[#FFDE4D] z-40 flex flex-col items-center justify-center border-b-[4px] border-black"
          >
             <nav className="flex flex-col items-center gap-8 text-2xl font-black uppercase tracking-widest w-full px-6">
                {navLinks.map((link) => (
                   <a 
                     key={link.path} 
                     href={link.path} 
                     className="w-full text-center bg-white border-[3px] border-black py-4 shadow-[6px_6px_0_0_#0F0F12] active:translate-y-1 active:shadow-[0_0_0_0_#000] transition-all"
                   >
                     {link.label}
                   </a>
                ))}
                <button 
                  onClick={() => {
                    setIsWaitlistOpen(true);
                    setIsMenuOpen(false);
                  }} 
                  className="w-full text-center bg-[#34BBC0] border-[3px] border-black py-4 shadow-[6px_6px_0_0_#0F0F12] mt-4 hover:bg-[#FFDE4D] transition-colors"
                >
                  {t('nav.waitlist')} ✦
                </button>
                
                {/* Mobile Language Switcher */}
                <div className="flex justify-center gap-4 mt-8">
                  <button onClick={() => i18n.changeLanguage('it')} className={`w-10 h-10 rounded-full overflow-hidden border-[3px] border-black active:translate-y-1 transition-transform ${i18n.language.startsWith('it') ? 'shadow-[4px_4px_0_0_#000]' : 'opacity-60'}`}>
                    <img src="/flags/italy.png" alt="IT" className="w-full h-full object-cover" />
                  </button>
                  <button onClick={() => i18n.changeLanguage('en')} className={`w-10 h-10 rounded-full overflow-hidden border-[3px] border-black active:translate-y-1 transition-transform ${i18n.language.startsWith('en') ? 'shadow-[4px_4px_0_0_#000]' : 'opacity-60'}`}>
                    <img src="/flags/united-kingdom.png" alt="EN" className="w-full h-full object-cover" />
                  </button>
                  <button onClick={() => i18n.changeLanguage('fr')} className={`w-10 h-10 rounded-full overflow-hidden border-[3px] border-black active:translate-y-1 transition-transform ${i18n.language.startsWith('fr') ? 'shadow-[4px_4px_0_0_#000]' : 'opacity-60'}`}>
                    <img src="/flags/france.png" alt="FR" className="w-full h-full object-cover" />
                  </button>
                </div>
             </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT ROUTING */}
      <main className="pt-20 w-full overflow-x-hidden relative z-10">
        <AnimatePresence mode="wait">
          {currentPath === '#/' && <Home key="home" onOpenWaitlist={() => setIsWaitlistOpen(true)} />}
          {currentPath === '#/app' && <AppSimulator key="app" />}
          {currentPath === '#/coach' && <CoachDashboard key="coach" />}
          {currentPath === '#/features' && <Features key="features" />}
          {currentPath === '#/about' && <About key="about" />}
        </AnimatePresence>
      </main>

      {/* GLOBAL WAITLIST MODAL */}
      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)} 
      />

    </div>
  );
}
