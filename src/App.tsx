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

// Route Components
import Home from './components/Home';
import AppSimulator from './components/AppSimulator';
import CoachDashboard from './components/CoachDashboard';
import Features from './components/Features';
import About from './components/About';
import WaitlistModal from './components/WaitlistModal';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash || '#/');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

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
    { path: '#/', label: 'Home' },
    { path: '#/app', label: 'App Simulator' },
    { path: '#/coach', label: 'Coach Dashboard' },
    { path: '#/features', label: 'Features' },
    { path: '#/about', label: 'About Us' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F0F12] selection:bg-[#FFDE4D] selection:text-[#0F0F12] font-['Space_Grotesk',_sans-serif] y2k-grid relative">
      
      {/* HEADER (Neobrutalism) */}
      <header className="fixed top-0 inset-x-0 h-20 bg-white border-b-[3px] border-black z-50 px-4 md:px-12 flex items-center justify-between shadow-[0_4px_0_0_#0F0F12]">
        <a href="#/" className="flex items-center gap-3 hover:-translate-y-0.5 transition-transform z-50">
          <span className="font-['Bricolage_Grotesque',_sans-serif] font-black text-3xl text-black tracking-tighter">BAB</span>
          <span className="bg-[#DAE69A] text-black px-2 py-0.5 rounded border-2 border-black text-xs font-black uppercase tracking-widest shadow-[2px_2px_0_0_#000]">Beta</span>
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
          <button 
            onClick={() => setIsWaitlistOpen(true)} 
            className="y2k-btn bg-[#FFDE4D] text-xs hover:bg-[#34BBC0] hover:text-white transition-colors"
          >
            Join Waitlist
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
                  JOIN WAITLIST ✦
                </button>
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
