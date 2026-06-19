import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { OnboardingQuiz } from './components/OnboardingQuiz';
import type { QuizData } from './components/OnboardingQuiz';
import { TamagotchiPreview } from './components/TamagotchiPreview';
import { AppPreview } from './components/AppPreview';

interface SuccessData {
  data: QuizData;
  sitgScore: number;
}

// FAQ Accordion Item Component in Y2K Glassmorphism Style
const FAQItem = ({ id, question, answer }: { id: string; question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/60 backdrop-blur-md border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        className="w-full flex justify-between items-center text-left py-1 text-sm sm:text-base font-black text-[#0F0F12] focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded cursor-pointer"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-[#34BBC0] font-black text-lg ml-4"
          aria-hidden="true"
        >
          {isOpen ? '−' : '+'}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${id}`}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-xs sm:text-sm text-neutral-600 font-semibold leading-relaxed pt-3 pb-1 border-t-2 border-black/10 mt-2 font-sans">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [referralShared, setReferralShared] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash || '#/home');

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/home';
      setCurrentPath(hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleQuizSubmit = (data: QuizData, sitgScore: number) => {
    setSuccessData({ data, sitgScore });
    setShowQuiz(false);
  };

  const handleShareReferral = () => {
    setReferralShared(true);
    if (successData) {
      setSuccessData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          sitgScore: prev.sitgScore + 30,
        };
      });
    }
  };

  const resetFlow = () => {
    setSuccessData(null);
    setReferralShared(false);
    setShowQuiz(false);
    window.location.hash = '#/home';
  };

  // Framer Motion Scroll Reveal Config
  const scrollReveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" as const }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] y2k-grid text-[#0F0F12] selection:bg-[#34BBC0]/30 selection:text-[#0F0F12] pb-24 md:pb-0">
      
      {/* Header / Navigazione (Section 1) */}
      <header className="fixed top-0 inset-x-0 h-20 bg-white/70 backdrop-blur-md border-b-[3px] border-black z-40 px-4 sm:px-12 flex items-center justify-between shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3">
          <div 
            onClick={resetFlow}
            tabIndex={0}
            role="button"
            aria-label="Home page BAB"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') resetFlow(); }}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded p-1"
          >
            <img src="/logo.svg" alt="BAB Logo" className="h-8 sm:h-9 w-auto" />
          </div>
          <a href="#/features" className="hidden md:inline-block px-2.5 py-0.5 rounded-lg bg-[#EBE5FF] border-2 border-black text-[9px] font-black text-[#0F0F12] tracking-wider uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFDE4D] transition-colors cursor-pointer" title="Scopri le funzionalità">
            Protocollo Prevenzione
          </a>
        </div>
        
        {/* Menu Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-black uppercase tracking-wider">
          <a 
            href="#/home" 
            className={`hover:text-[#34BBC0] transition-colors py-1 px-2 rounded-lg border-2 ${
              currentPath === '#/home' ? 'bg-[#FFDE4D] border-black shadow-[2px_2px_0px_0px_#000]' : 'border-transparent'
            }`}
          >
            Home
          </a>
          <a 
            href="#/app" 
            className={`hover:text-[#34BBC0] transition-colors py-1 px-2 rounded-lg border-2 ${
              currentPath === '#/app' ? 'bg-[#FFDE4D] border-black shadow-[2px_2px_0px_0px_#000]' : 'border-transparent'
            }`}
          >
            Simulatore App
          </a>
          <a 
            href="#/coach" 
            className={`hover:text-[#34BBC0] transition-colors py-1 px-2 rounded-lg border-2 ${
              currentPath === '#/coach' ? 'bg-[#FFDE4D] border-black shadow-[2px_2px_0px_0px_#000]' : 'border-transparent'
            }`}
          >
            Dashboard Coach
          </a>
          <a 
            href="#/features" 
            className={`hover:text-[#34BBC0] transition-colors py-1 px-2 rounded-lg border-2 ${
              currentPath === '#/features' ? 'bg-[#FFDE4D] border-black shadow-[2px_2px_0px_0px_#000]' : 'border-transparent'
            }`}
          >
            Funzionalità
          </a>
          <a 
            href="#/about" 
            className={`hover:text-[#34BBC0] transition-colors py-1 px-2 rounded-lg border-2 ${
              currentPath === '#/about' ? 'bg-[#FFDE4D] border-black shadow-[2px_2px_0px_0px_#000]' : 'border-transparent'
            }`}
          >
            La Nostra Storia
          </a>
        </nav>

        <button
          onClick={() => {
            if (successData) {
              resetFlow();
            } else {
              setShowQuiz(true);
            }
          }}
          className="y2k-btn bg-[#FFDE4D] text-xs sm:text-sm font-black"
        >
          {successData ? 'Ricomincia' : 'Lista d\'Attesa'}
        </button>
      </header>

      {/* Floating Bottom Nav for Mobile Centered UX */}
      <div className="md:hidden fixed bottom-4 inset-x-4 h-16 bg-white/85 backdrop-blur-lg border-2 border-black rounded-2xl z-40 px-2 flex items-center justify-around shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {[
          { path: '#/home', label: 'Home', icon: '🏠' },
          { path: '#/app', label: 'Demo App', icon: '📱' },
          { path: '#/coach', label: 'Coach', icon: '📊' },
          { path: '#/features', label: 'Funzioni', icon: '✦' },
          { path: '#/about', label: 'Storia', icon: '📖' },
        ].map((tab) => {
          const isActive = currentPath === tab.path;
          return (
            <a
              key={tab.path}
              href={tab.path}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-[9px] font-black transition-all ${
                isActive 
                  ? 'text-[#34BBC0] scale-110' 
                  : 'text-[#0F0F12] hover:text-[#34BBC0]'
              }`}
            >
              <span className="text-lg mb-0.5">{tab.icon}</span>
              <span className="tracking-tight">{tab.label}</span>
            </a>
          );
        })}
      </div>

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          
          {/* WAITLIST SUCCESS PAGE */}
          {successData ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="min-h-[80vh] flex items-center justify-center px-4 py-12"
            >
              <div className="max-w-xl w-full bg-white/70 backdrop-blur-md border-[3px] border-black rounded-[32px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-8 flex flex-col gap-6 text-[#0F0F12]">
                  
                  {/* Success Title */}
                  <div className="text-center border-b-2 border-black pb-4">
                    <span className="text-4xl" role="img" aria-label="party popper">🎉</span>
                    <h2 className="text-2xl font-serif font-black text-[#0F0F12] mt-3">
                      Sei in Lista d'Attesa!
                    </h2>
                    <p className="text-xs text-[#34BBC0] uppercase tracking-widest mt-1 font-black">
                      Registrazione Completata
                    </p>
                        {/* SITG Score Panel */}
                  <div className="bg-[#FFE3D1] border-2 border-black rounded-2xl p-6 flex flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-black text-[#0F0F12]">
                          Punteggio di Coinvolgimento (SITG)
                        </h4>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold mt-0.5">
                          Livello di Interesse Rilevato
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-serif font-black text-[#0F0F12]">
                          {successData.sitgScore}
                        </span>
                        <span className="text-xs text-neutral-500 font-bold block">Punti</span>
                      </div>
                    </div>

                    {/* Quality Badge */}
                    <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-xs font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <span className="text-lg" role="img" aria-label="shield">🛡️</span>
                      <div>
                        <span className="font-black block text-[#0F0F12]">
                          {successData.sitgScore >= 80 
                            ? 'Priorità Alta (Squadre & Beta Cohort)' 
                            : successData.sitgScore >= 50 
                            ? 'Priorità Media' 
                            : 'Priorità Base'}
                        </span>
                        <span className="text-[10px] text-neutral-500 block">
                          {successData.sitgScore >= 80 
                            ? 'Avrai la priorità assoluta nei gruppi di beta testing dell\'app.' 
                            : 'Riceverai presto la nostra guida speciale di BAB.'}
                        </span>
                      </div>
                    </div>

                    {/* Points Breakdown */}
                    <div className="text-[11px] text-neutral-700 flex flex-col gap-2 pt-2 border-t-2 border-black/10 mt-2 font-sans font-bold">
                      <div className="flex justify-between">
                        <span>Risposte fornite al quiz:</span>
                        <span className="text-[#34BBC0] font-black">+50 pt</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email valida inviata:</span>
                        <span className="text-[#34BBC0] font-black">+30 pt</span>
                      </div>
                      {successData.data.email.split('@')[1] && ![
                        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
                        'live.com', 'icloud.com', 'libero.it', 'virgilio.it'
                      ].includes(successData.data.email.split('@')[1].toLowerCase()) && (
                        <div className="flex justify-between">
                          <span>Bonus Dominio Società Sportiva / Scuola:</span>
                          <span className="text-[#34BBC0] font-black">+30 pt</span>
                        </div>
                      )}
                      {referralShared && (
                        <div className="flex justify-between text-[#34BBC0] font-black">
                          <span>Link d'Invito Condiviso:</span>
                          <span>+30 pt</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Call to Action: Referral share */}
                  <div className="flex flex-col gap-3 font-sans">
                    <p className="text-xs text-neutral-500 text-center font-bold">
                      Invita un altro coach o genitore e ricevi **+30 punti bonus** per assicurarti l'accesso anticipato alla beta ed aiutare a chiudere il gap scientifico nello sport femminile!
                    </p>
                    <button
                      onClick={handleShareReferral}
                      disabled={referralShared}
                      className={`w-full py-4 px-6 rounded-xl font-black text-sm text-center transition-all focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none border-2 border-black shadow-[4px_4px_0px_0px_#000] cursor-pointer ${
                        referralShared 
                          ? 'bg-neutral-100 text-neutral-400 border-neutral-300 shadow-none translate-x-0.5 translate-y-0.5 cursor-not-allowed'
                          : 'bg-[#34BBC0] text-black hover:bg-[#34BBC0]/90 active:translate-x-0.5 active:translate-y-0.5'
                      }`}
                    >
                      {referralShared ? 'Link Condiviso! +30 Punti Aggiunti ✦' : 'Copia Link d\'Invito (+30 pt) ✦'}
                    </button>
                  </div>
                  </div>

                  {/* Back Link */}
                  <button
                    onClick={resetFlow}
                    className="text-xs text-neutral-400 hover:text-black text-center transition-colors hover:underline font-bold focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded py-0.5 cursor-pointer"
                  >
                    Torna alla Homepage
                  </button>

                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {/* PAGE 1: HOME (Redesigned with Glassmorphism + Y2K Bento) */}
              {currentPath === '#/home' && (
                <motion.div
                  key="home-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center w-full"
                >
                  <HeroSection onJoinWaitlist={() => setShowQuiz(true)} />

                  {/* Bento Grid layout style card for landing page mission statement */}
                  <motion.section 
                    {...scrollReveal}
                    className="max-w-5xl w-full px-6 py-20 text-center"
                  >
                    <div className="y2k-glass-card p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 relative overflow-hidden bg-white/55">
                      {/* Accent glow behind text */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#EBE5FF] opacity-[0.4] rounded-full blur-[90px] pointer-events-none" />
                      
                      <span className="text-xs font-black text-[#34BBC0] tracking-widest uppercase relative z-10">
                        ✦ La Missione ✦
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-serif font-black leading-tight text-[#0F0F12] relative z-10 text-balance">
                        La pubertà non segue le regole su cui è stato costruito lo sport.
                      </h2>
                      <p className="text-xs sm:text-base text-neutral-600 max-w-2xl mx-auto font-bold font-sans relative z-10 leading-relaxed">
                        Le giovani atlete sono costrette ad affrontare lo sviluppo e i cambiamenti ormonali da sole e in silenzio, all'interno di sistemi sportivi che non sono stati pensati per i loro corpi. BAB è qui per abbattere questa barriera.
                      </p>
                      <div className="flex justify-center mt-2 relative z-10">
                        <a 
                          href="#/about" 
                          className="y2k-btn bg-[#FFDE4D] text-black font-black uppercase text-xs"
                        >
                          La Nostra Storia ✦
                        </a>
                      </div>
                    </div>
                  </motion.section>
                </motion.div>
              )}

              {/* PAGE 2: APP SIMULATOR (Athlete UI) */}
              {currentPath === '#/app' && (
                <motion.div
                  key="app-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-6xl w-full px-6 py-12 mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center"
                >
                  <div className="lg:col-span-6 flex flex-col gap-6 items-start text-left">
                    <span className="px-3 py-1 bg-[#EBE5FF] border-2 border-black rounded-lg text-xs font-black shadow-[2px_2px_0px_0px_#000]">
                      ✦ APP INTERACTIVE PLAYGROUND ✦
                    </span>
                    <h2 className="text-4xl sm:text-6xl font-serif font-black leading-tight">
                      Simulatore <br />
                      App BAB
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-500 font-bold font-sans leading-relaxed">
                      Sperimenta in anteprima come funziona l'applicazione per le atlete. Scegli il tuo buddy, effettua il check-in giornaliero e controlla il tuo livello energetico e i tuoi badge.
                    </p>
                    <div className="p-5 bg-white/70 backdrop-blur-md border-2 border-black rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs font-bold leading-relaxed text-neutral-600 max-w-md">
                      <span className="text-[#34BBC0] font-black block mb-1">💡 Istruzioni d'uso:</span>
                      Clicca sui pulsanti all'interno dello schermo del telefono a destra per navigare tra le varie schermate e testare l'interazione.
                    </div>
                  </div>
                  
                  <div className="lg:col-span-6 w-full flex justify-center py-6">
                    <AppPreview />
                  </div>
                </motion.div>
              )}

              {/* PAGE 3: COACH DASHBOARD (30% Y2K, 70% SaaS dark theme) */}
              {currentPath === '#/coach' && (
                <motion.div
                  key="coach-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-6xl w-full px-6 py-12 mx-auto flex flex-col gap-8 text-left"
                >
                  {/* Top Intro Section */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b-2 border-black/10">
                    <div>
                      <span className="px-3 py-1 bg-[#34BBC0]/20 text-[#34BBC0] border-2 border-[#34BBC0] rounded-lg text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(52,187,192,0.15)]">
                        ✦ Area Riservata Club & Staff Tecnico ✦
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-serif font-black mt-3 text-[#0F0F12]">
                        Dashboard Coach
                      </h2>
                      <p className="text-sm text-neutral-500 font-semibold mt-1">
                        SaaS Platform per la prevenzione degli infortuni U18 e monitoraggio della stanchezza biologica.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button className="y2k-btn bg-[#DAE69A] font-black text-xs">
                        Scarica Report Mensile
                      </button>
                      <button className="y2k-btn-secondary text-xs">
                        Aggiungi Atleta +
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Cards — Y2K Style */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-[#D1FFEF] text-[#0F0F12] border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-wider block">Atlete Monitorate</span>
                      <span className="text-3xl font-black mt-1 block">18 / 20</span>
                      <span className="text-[10px] text-[#34BBC0] font-black block mt-2">✦ 90% Tasso di Adozione</span>
                    </div>

                    <div className="bg-[#EBE5FF] text-[#0F0F12] border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-wider block">Prevenzione LCA</span>
                      <span className="text-3xl font-black mt-1 block text-[#34BBC0]">94.2%</span>
                      <span className="text-[10px] text-neutral-600 font-bold block mt-2">Nessun infortunio grave</span>
                    </div>

                    <div className="bg-[#FFE3D1] text-[#0F0F12] border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-wider block">Alert Sovraccarico</span>
                      <span className="text-3xl font-black mt-1 block text-rose-600">2 Atlete</span>
                      <span className="text-[10px] text-rose-600 font-black block mt-2">● Richiesto Scarico</span>
                    </div>

                    <div className="bg-[#FFDE4D] text-[#0F0F12] border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-wider block">Tamagotchi Integrati</span>
                      <span className="text-3xl font-black mt-1 block">100%</span>
                      <span className="text-[10px] text-[#0F0F12] font-black block mt-2">✦ Sincronizzazione Attiva</span>
                    </div>
                  </div>

                  {/* Y2K Athlete Table */}
                  <div className="bg-white/70 backdrop-blur-md text-[#0F0F12] border-[3px] border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-black/10">
                      <div className="flex items-center gap-2">
                        <span className="text-xl text-[#34BBC0]">◎</span>
                        <h3 className="text-lg font-black font-serif text-[#0F0F12]">Rapporto Prevenzione Infortuni & Carico Fisico</h3>
                      </div>
                      <span className="text-[10px] text-[#34BBC0] font-black uppercase tracking-wider bg-[#34BBC0]/10 px-2 py-1 rounded-lg border-2 border-[#34BBC0]/30">
                        Squadra: U18 Femminile
                      </span>
                    </div>

                    <table className="w-full text-left border-collapse min-w-[600px] font-sans">
                      <thead>
                        <tr className="border-b-2 border-black/10 text-[10px] uppercase text-neutral-500 font-black tracking-wider">
                          <th className="py-3 px-4">Atleta</th>
                          <th className="py-3 px-4">Stato Energia</th>
                          <th className="py-3 px-4">Fase Ciclo</th>
                          <th className="py-3 px-4">Rischio LCA / Infortuni</th>
                          <th className="py-3 px-4 text-right">Raccomandazione</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Irene R.', energy: '⚡ Carica', energyBg: 'bg-[#D1FFEF] text-[#0F0F12]', phase: 'Fase Follicolare (Giorno 8)', risk: '✅ Normale', riskColor: 'bg-[#D1FFEF] text-[#0F0F12] border-black/10', rec: 'Sessione Standard', recColor: 'text-[#0F0F12] border-black/20 bg-white/80' },
                          { name: 'Sofia B.', energy: '😴 Stanca', energyBg: 'bg-[#FFE3D1] text-[#0F0F12]', phase: 'Fase Ovulatoria (Giorno 14)', risk: '⚠️ Rischio LCA (Flessibilità Ridotta)', riskColor: 'bg-[#FFE3D1] text-[#0F0F12] border-black/10', rec: 'Attivazione Propriocettiva', recColor: 'text-[#34BBC0] border-[#34BBC0]/30 bg-[#34BBC0]/5' },
                          { name: 'Marta G.', energy: '👌 Ok', energyBg: 'bg-[#EBE5FF] text-[#0F0F12]', phase: 'Fase Luteale Iniziale (Giorno 18)', risk: '✅ Normale', riskColor: 'bg-[#D1FFEF] text-[#0F0F12] border-black/10', rec: 'Sessione Standard', recColor: 'text-[#0F0F12] border-black/20 bg-white/80' },
                          { name: 'Elena D.', energy: '😴 Stanca', energyBg: 'bg-[#FFE3D1] text-[#0F0F12]', phase: 'Fase Luteale Tarda (Giorno 26)', risk: '⚠️ Alert Fatica Elevata', riskColor: 'bg-[#FFE3D1] text-[#0F0F12] border-black/10', rec: 'Scarico Precauzionale', recColor: 'text-rose-700 border-rose-200 bg-rose-50' },
                          { name: 'Chiara L.', energy: '⚡ Carica', energyBg: 'bg-[#D1FFEF] text-[#0F0F12]', phase: 'Fase Follicolare (Giorno 5)', risk: '✅ Normale', riskColor: 'bg-[#D1FFEF] text-[#0F0F12] border-black/10', rec: 'Sessione Standard', recColor: 'text-[#0F0F12] border-black/20 bg-white/80' }
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b border-black/5 hover:bg-black/[0.02] transition-colors">
                            <td className="py-4 px-4 font-black text-[#0F0F12]">{row.name}</td>
                            <td className="py-4 px-4">
                              <span className={`px-2.5 py-1 rounded-lg border-2 border-black/10 text-xs font-black ${row.energyBg}`}>
                                {row.energy}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-xs font-semibold text-neutral-500">{row.phase}</td>
                            <td className="py-4 px-4">
                              <span className={`px-2.5 py-1 rounded-lg border text-xs font-black ${row.riskColor}`}>
                                {row.risk}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className={`text-xs font-bold border px-2 py-0.5 rounded-lg ${row.recColor}`}>
                                {row.rec}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Scientific Insight Card for Coach */}
                  <div className="bg-[#FFE3D1] border-2 border-black rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-[4px_4px_0px_0px_#000]">
                    <div className="text-3xl">💡</div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-black uppercase text-[#0F0F12] tracking-wide">
                        Integrazione Prevenzione LCA
                      </h4>
                      <p className="text-xs text-neutral-700 font-bold mt-1 leading-relaxed">
                        Durante la fase ovulatoria e la fase luteale tarda, i cambiamenti di lassità legamentosa aumentano statisticamente la probabilità di lesione del crociato anteriore (LCA) fino a 3 volte. Il protocollo BAB calcola l'insorgenza di fatica consiglia scarichi localizzati e riscaldamenti propriocettivi riducendo del 60% il tasso di infortuni complessivo.
                      </p>
                    </div>
                  </div>

                  {/* Coach Page CTA */}
                  <div className="mt-4 bg-[#FFDE4D] border-2 border-black rounded-3xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-black text-[#0F0F12] uppercase tracking-widest">✦ Vuoi il tuo team su BAB? ✦</span>
                      <h3 className="text-xl sm:text-2xl font-serif font-black text-[#0F0F12]">Porta il tuo club nella lista d'attesa</h3>
                      <p className="text-xs text-neutral-700 font-bold font-sans">I primi club che si uniscono avranno accesso prioritario e tariffe speciali di lancio.</p>
                    </div>
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="y2k-btn bg-[#0F0F12] text-white font-black text-sm whitespace-nowrap"
                    >
                      Prenota il Tuo Posto ✦
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PAGE 4: FEATURES */}
              {currentPath === '#/features' && (
                <motion.div
                  key="features-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-6xl w-full px-6 py-12 mx-auto flex flex-col gap-12"
                >
                  <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
                    <span className="text-xs font-black text-[#34BBC0] tracking-widest uppercase">
                      ✦ Le Nostre Funzionalità ✦
                    </span>
                    <h3 className="text-3xl sm:text-5xl font-serif font-black">
                      Performance x Salute x Crescita
                    </h3>
                    <p className="text-sm text-neutral-500 font-bold font-sans">
                      Tutto ciò di cui hai bisogno per supportare le giovani atlete, integrato in cinque moduli chiave.
                    </p>
                  </div>

                  {/* Bento Grid in Y2K Glassmorphism */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
                    
                    {/* PREVENIRE */}
                    <div className="md:col-span-6 p-8 y2k-glass-card-interactive flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FFE3D1] border-2 border-black flex items-center justify-center text-black font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                        01
                      </div>
                      <h4 className="text-lg sm:text-xl font-black font-serif text-[#0F0F12]">
                        PREVENIRE
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans font-bold">
                        Identifica e previeni i campanelli d'allarme biologici prima che influiscano sulla salute, sul benessere o sulle prestazioni atletiche.
                      </p>
                    </div>

                    {/* SUPPORTARE */}
                    <div className="md:col-span-6 p-8 y2k-glass-card-interactive flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#EBE5FF] border-2 border-black flex items-center justify-center text-black font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                        02
                      </div>
                      <h4 className="text-lg sm:text-xl font-black font-serif text-[#0F0F12]">
                        SUPPORTARE
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans font-bold">
                        Crea una rete di supporto forte intorno all'atleta, dentro e fuori dal campo, con strumenti dedicati a genitori e allenatori.
                      </p>
                    </div>

                    {/* MONITORARE with Widget */}
                    <div className="md:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 y2k-glass-card">
                      <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#D1FFEF] border-2 border-black flex items-center justify-center text-black font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                          03
                        </div>
                        <h4 className="text-lg sm:text-xl font-black font-serif text-[#0F0F12]">
                          MONITORARE (Il Tamagotchi)
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans font-bold">
                          Monitora i livelli di energia, sonno e umore in relazione alla crescita e al ciclo mestruale, per avere un quadro completo dello stato di forma dell'atleta.
                        </p>
                        <p className="text-xs text-neutral-600 font-bold leading-relaxed font-sans bg-[#FAF8FF]/80 p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          💡 Clicca sui pulsanti del widget Tamagotchi a destra per cambiare gli stati dell'atleta in tempo reale!
                        </p>
                      </div>
                      
                      <div className="lg:col-span-5 flex justify-center">
                        <TamagotchiPreview />
                      </div>
                    </div>

                    {/* COMPRENDERE */}
                    <div className="md:col-span-6 p-8 y2k-glass-card-interactive flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FFDE4D] border-2 border-black flex items-center justify-center text-black font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                        04
                      </div>
                      <h4 className="text-lg sm:text-xl font-black font-serif text-[#0F0F12]">
                        COMPRENDERE
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans font-bold">
                        Traduci i dati fisici in consigli chiari e semplici. Fornisci guide pratiche e nozioni sul funzionamento del corpo femminile, sessione dopo sessione.
                      </p>
                    </div>

                    {/* OTTIMIZZARE */}
                    <div className="md:col-span-6 p-8 y2k-glass-card-interactive flex flex-col gap-4 justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-[#D1FFEF] border-2 border-black flex items-center justify-center text-black font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                          05
                        </div>
                        <h4 className="text-lg sm:text-xl font-black font-serif text-[#0F0F12] mt-2">
                          OTTIMIZZARE
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans font-bold mt-2">
                          Bilancia la performance con il benessere fisico ed emotivo a lungo termine, grazie a indicazioni quotidiane personalizzate create da medici ed esperti dello sport.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowQuiz(true)}
                        className="mt-6 y2k-btn bg-[#FFDE4D] font-black text-xs self-start"
                      >
                        Prova la Demo ✦
                      </button>
                    </div>

                  </div>

                  {/* Features CTA Banner */}
                  <div className="mt-4 bg-[#34BBC0] border-2 border-black rounded-3xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-black text-white/80 uppercase tracking-widest">✦ Pronta a iniziare? ✦</span>
                      <h3 className="text-xl sm:text-2xl font-serif font-black text-white">Unisciti alle atlete che stanno cambiando il gioco</h3>
                      <p className="text-xs text-white/80 font-bold font-sans">Accesso anticipato — posti limitati disponibili.</p>
                    </div>
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="y2k-btn bg-white text-[#0F0F12] font-black text-sm whitespace-nowrap"
                    >
                      Entra nella Waitlist ✦
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PAGE 5: ABOUT US (STORY / CASE STUDY) */}
              {currentPath === '#/about' && (
                <motion.div
                  key="about-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-6xl w-full px-6 py-12 mx-auto flex flex-col gap-20"
                >
                  {/* Mia's Case Study */}
                  <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-3 text-center">
                      <span className="text-xs font-black text-[#34BBC0] tracking-widest uppercase">
                        ✦ Studio di Caso Reale ✦
                      </span>
                      <h3 className="text-3xl sm:text-5xl font-serif font-black">
                        La storia di Mia
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                      <div className="lg:col-span-4 text-left">
                        <h4 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#0F0F12] leading-[1.2]">
                          A 13 anni, il corpo di Mia non le sembrava più casa sua.
                        </h4>
                      </div>

                      <div className="lg:col-span-4 flex justify-center">
                        <div className="relative w-72 h-96 bg-white/70 backdrop-blur-md border-2 border-black rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                          <img 
                            src="/src/assets/mia_portrait.png" 
                            alt="Ritratto della giovane nuotatrice Mia sorridente" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-4 text-left flex flex-col gap-6 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans font-bold">
                        <p>
                          Era cresciuta di molti centimetri in pochi mesi e, prima ancora di capire cosa stesse succedendo, <strong className="text-black font-black">gli ormoni avevano cambiato il suo corpo</strong>, il suo modo di giocare e come si sentiva in campo.
                        </p>
                        <p>
                          Stringendo i denti contro i dolori del ciclo, la stanchezza e la fame, aveva imparato che "chi non soffre non vince". <span className="bg-[#FFDE4D] border border-black px-1.5 py-0.5 inline-block rounded">Ignorare i segnali del proprio corpo era diventata la sua unica strategia</span>.
                        </p>
                        <p>
                          Ben presto sono arrivati gli infortuni e l'ansia, e le sue prestazioni hanno iniziato a calare. Poiché nessuno parlava di queste cose, Mia è rimasta in silenzio, convincendosi di non essere più adatta allo sport.
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 border-t-2 border-black/10 text-center max-w-4xl mx-auto">
                      <p className="text-lg sm:text-2xl font-serif font-black text-[#0F0F12] leading-relaxed">
                        Ma non era Mia ad essere inadeguata. È lo sport che l'ha lasciata sola, ignorando la biologia del suo corpo in crescita.
                      </p>
                    </div>
                  </div>

                  {/* Solution & Empathy: Our Why */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-10 pt-10 border-t-2 border-black/10">
                    <div className="lg:col-span-6 relative h-[400px] lg:h-auto overflow-hidden border-2 border-black rounded-3xl shadow-[6px_6px_0px_0px_#000]">
                      <img 
                        src="/src/assets/why_athletes.png" 
                        alt="Due giovani atlete a braccia conserte sulla pista di atletica" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    <div className="lg:col-span-6 px-6 py-6 flex flex-col justify-center items-start text-left gap-6 bg-white/60 backdrop-blur-md border-2 border-black rounded-3xl shadow-[6px_6px_0px_0px_#000]">
                      <span className="text-xs font-black text-[#34BBC0] tracking-widest uppercase">
                        ✦ Non sei sola in questo percorso ✦
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#0F0F12]">
                        Non devi capire tutto da sola
                      </h2>
                      <div className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-600 font-bold leading-relaxed font-sans">
                        <p>
                          BAB è il tuo <strong className="text-[#34BBC0] font-black">alleato fuori dal campo</strong>, pensato per supportarti durante la pubertà e la crescita, aiutando te a dare il massimo senza soffrire in silenzio,
                        </p>
                        <p>
                          e offrendo a genitori, allenatori e società sportiva gli strumenti giusti per capirti e guidarti al meglio.
                        </p>
                      </div>
                      
                      <div className="py-3.5 px-6 rounded-xl bg-[#EBE5FF] border-2 border-black w-full shadow-[2px_2px_0px_0px_#000]">
                        <span className="text-xs sm:text-sm font-black text-black block leading-relaxed italic text-center">
                          ✦ "Perché nessuno dovrebbe essere costretto a scegliere tra fare sport e stare bene" ✦
                        </span>
                      </div>

                      <button
                        onClick={() => setShowQuiz(true)}
                        className="y2k-btn bg-[#FFDE4D] text-black font-black text-xs"
                      >
                        UNISCITI ALLA WAITLIST ✦
                      </button>
                    </div>
                  </div>

                  {/* Behind BAB (About Gaia) */}
                  <div className="flex flex-col gap-8 pt-10 border-t-2 border-black/10">
                    <div className="text-center flex flex-col gap-2">
                      <span className="text-xs font-black text-[#34BBC0] tracking-widest uppercase">
                        ✦ La Fondatrice ✦
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-serif font-black">
                        Chi c'è dietro BAB
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                      {/* Gaia Card */}
                      <div className="md:col-span-4 bg-[#EBE5FF] border-2 border-black rounded-3xl p-8 shadow-[6px_6px_0px_0px_#000] flex flex-col gap-4 justify-center items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-[#34BBC0] border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center text-4xl">👩</div>
                        <div>
                          <h4 className="text-xl font-serif font-black text-[#0F0F12]">Gaia Manzone</h4>
                          <p className="text-xs font-black text-[#34BBC0] uppercase tracking-wider mt-1">Fondatrice & CEO</p>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center mt-2">
                          <span className="px-3 py-1 bg-white border-2 border-black rounded-lg text-[10px] font-black shadow-[1.5px_1.5px_0px_0px_#000]">10+ anni adidas</span>
                          <span className="px-3 py-1 bg-white border-2 border-black rounded-lg text-[10px] font-black shadow-[1.5px_1.5px_0px_0px_#000]">PUMA Alumni</span>
                          <span className="px-3 py-1 bg-[#FFDE4D] border-2 border-black rounded-lg text-[10px] font-black shadow-[1.5px_1.5px_0px_0px_#000]">Ex Atleta</span>
                        </div>
                      </div>

                      {/* Gaia Story */}
                      <div className="md:col-span-8 p-8 bg-white/60 backdrop-blur-md border-2 border-black rounded-3xl shadow-[6px_6px_0px_0px_#000] flex flex-col gap-5 text-xs sm:text-sm text-neutral-600 font-bold leading-relaxed font-sans">
                        <p>
                          BAB nasce dall'esperienza personale di <strong className="text-black font-black">Gaia Manzone</strong>. Dopo dieci anni di lavoro in adidas e PUMA, Gaia ha visto da vicino le barriere e le difficoltà sistemiche che affrontano le atlete.
                        </p>
                        <p>
                          Ma il suo legame con questo problema risale a molto prima, quando problemi di salute legati a uno sviluppo non supportato l'hanno costretta a smettere di gareggiare. Gaia crede fermamente che <span className="text-[#34BBC0] font-black">senza salute non possa esserci sport femminile</span>.
                        </p>
                        <p>
                          Questa convinzione l'ha spinta a riunire una rete di atlete professioniste, medici, ginecologi, preparatori atletici ed esperti dello sport per creare BAB.
                        </p>
                        <div className="mt-2 bg-[#FFDE4D] border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_0px_#000]">
                          <p className="text-xs font-black text-[#0F0F12] italic text-center">
                            ✦ "Il corpo di una giovane atleta non è un ostacolo alla performance. È la performance." ✦
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* About page bottom CTA */}
                    <div className="bg-[#0F0F12] text-white border-2 border-black rounded-3xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-black text-[#34BBC0] uppercase tracking-widest">✦ Reach Your Personal Best ✦</span>
                        <h3 className="text-xl sm:text-2xl font-serif font-black text-white">Sei convinta? Unisciti alla lista d'attesa</h3>
                        <p className="text-xs text-neutral-400 font-bold font-sans">Primo accesso. Tariffa speciale di lancio. Zero rischi.</p>
                      </div>
                      <button
                        onClick={() => setShowQuiz(true)}
                        className="y2k-btn bg-[#FFDE4D] text-[#0F0F12] font-black text-sm whitespace-nowrap"
                      >
                        Unisciti Ora ✦
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Global Statistics Panel (Bento Box with 3 main stats) */}
        {!successData && currentPath === '#/home' && (
          <motion.section 
            {...scrollReveal}
            className="w-full py-16 px-4 bg-[#EBE5FF]/40 border-y-2 border-black flex flex-col items-center"
          >
            <div className="max-w-5xl w-full flex flex-col gap-10">
              <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
                <span className="text-xs font-black text-[#34BBC0] tracking-widest uppercase">
                  ✦ Il Costo del Silenzio ✦
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-black leading-tight text-[#0F0F12]">
                  Lo sviluppo puberale non può essere un tabù
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 font-semibold">
                  I numeri mostrano chiaramente il divario e la necessità di un intervento immediato.
                </p>
              </div>

              {/* 3 Stats Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Stat 1 */}
                <div 
                  className="bg-[#FFE3D1]/75 p-8 rounded-3xl border-2 border-black flex flex-col justify-between gap-6 shadow-[4px_4px_0px_0px_rgba(15,15,18,0.95)]"
                  style={{ boxShadow: 'inset 0 3px 0 0 rgba(255,255,255,0.45), 4px 4px 0px 0px rgba(15,15,18,0.95)' } as any}
                >
                  <div>
                    <span className="text-5xl sm:text-6xl font-serif font-black text-black block mb-4">
                      50%
                    </span>
                    <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-black font-sans">
                      delle ragazze abbandona lo sport durante la pubertà.
                    </p>
                  </div>
                  <span className="text-xs text-[#0F0F12] font-black uppercase tracking-wider bg-[#FFE3D1] border border-black/10 py-1 px-2.5 rounded-lg self-start">
                    Abbandono precoce
                  </span>
                </div>

                {/* Stat 2 */}
                <div 
                  className="bg-[#EBE5FF]/75 p-8 rounded-3xl border-2 border-black flex flex-col justify-between gap-6 shadow-[4px_4px_0px_0px_rgba(15,15,18,0.95)]"
                  style={{ boxShadow: 'inset 0 3px 0 0 rgba(255,255,255,0.45), 4px 4px 0px 0px rgba(15,15,18,0.95)' } as any}
                >
                  <div>
                    <span className="text-5xl sm:text-6xl font-serif font-black text-black block mb-4">
                      93%
                    </span>
                    <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-black font-sans">
                      soffre di dolori o forte stanchezza legati allo sviluppo in gara.
                    </p>
                  </div>
                  <span className="text-xs text-[#0F0F12] font-black uppercase tracking-wider bg-[#EBE5FF] border border-black/10 py-1 px-2.5 rounded-lg self-start">
                    Dolore in silenzio
                  </span>
                </div>

                {/* Stat 3 */}
                <div 
                  className="bg-[#FFDE4D]/80 p-8 rounded-3xl border-2 border-black flex flex-col justify-between gap-6 shadow-[4px_4px_0px_0px_rgba(15,15,18,0.95)]"
                  style={{ boxShadow: 'inset 0 3px 0 0 rgba(255,255,255,0.45), 4px 4px 0px 0px rgba(15,15,18,0.95)' } as any}
                >
                  <div>
                    <span className="text-5xl sm:text-6xl font-serif font-black text-black block mb-4">
                      0%
                    </span>
                    <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-black font-sans">
                      della ricerca scientifica nello sport è fatta su ragazze under 18.
                    </p>
                  </div>
                  <span className="text-xs text-[#0F0F12] font-black uppercase tracking-wider bg-[#FFDE4D] border border-black/10 py-1 px-2.5 rounded-lg self-start">
                    Vuoto scientifico
                  </span>
                </div>

              </div>
            </div>
          </motion.section>
        )}

        {/* Patto di Privacy & Sicurezza (Bento Grid) */}
        {!successData && currentPath === '#/home' && (
          <motion.section 
            {...scrollReveal}
            className="max-w-5xl w-full px-4 py-16 mx-auto flex flex-col gap-10"
          >
            <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
              <span className="text-xs font-black text-[#34BBC0] tracking-widest uppercase">
                ✦ Sicurezza e Trasparenza ✦
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-black text-[#0F0F12]">
                Il Nostro Patto di Privacy
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-semibold">
                Nessuna spia, massima sicurezza legale e dati blindati sul dispositivo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pillar 1 */}
              <div className="p-6 bg-white/70 backdrop-blur-md border-2 border-black rounded-[28px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 items-start text-left">
                <div className="w-12 h-12 rounded-xl bg-[#D1FFEF] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {/* SVG Crypt/Lock Icon, 2px stroke */}
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-serif font-black text-lg text-[#0F0F12]">Dati Criptati al 100%</h4>
                <p className="text-xs text-neutral-600 font-bold font-sans leading-relaxed">
                  Tutto resta sul telefono di tua figlia. Nessun database centrale che possa esporre o scambiare le sue informazioni personali.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-6 bg-white/70 backdrop-blur-md border-2 border-black rounded-[28px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 items-start text-left">
                <div className="w-12 h-12 rounded-xl bg-[#FFE3D1] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {/* SVG Eye-Off Icon, 2px stroke */}
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                </div>
                <h4 className="font-serif font-black text-lg text-[#0F0F12]">Portale Coach "Zero-Spia"</h4>
                <p className="text-xs text-neutral-600 font-bold font-sans leading-relaxed">
                  L'allenatore vede solo il livello di stanchezza generale aggregato del team per regolare i carichi di lavoro, mai i dati intimi o il ciclo mestruale.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-6 bg-white/70 backdrop-blur-md border-2 border-black rounded-[28px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 items-start text-left">
                <div className="w-12 h-12 rounded-xl bg-[#EBE5FF] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {/* SVG GDPR/Scale Shield Icon, 2px stroke */}
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-serif font-black text-lg text-[#0F0F12]">Conforme GDPR</h4>
                <p className="text-xs text-neutral-600 font-bold font-sans leading-relaxed">
                  Massima tutela legale per i minori e per le società sportive. Conforme alle linee guida sui dati sensibili per la massima tranquillità delle famiglie.
                </p>
              </div>

            </div>
          </motion.section>
        )}

        {/* FAQ Section (Displayed on Features page) */}
        {!successData && currentPath === '#/features' && (
          <motion.section 
            id="faq" 
            {...scrollReveal}
            className="max-w-4xl w-full px-6 py-20 mx-auto flex flex-col gap-12"
          >
            <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
              <span className="text-xs font-black text-[#34BBC0] tracking-widest uppercase">
                ✦ FAQ ✦
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-black">
                Domande Frequenti
              </h3>
            </div>

            <div className="flex flex-col">
              <FAQItem
                id="1"
                question="Cos'è l'app BAB?"
                answer="Crediamo che le atlete under 18 non debbano affrontare tutto da sole. Ecco perché BAB offre a genitori, caregiver, allenatori e società l'accesso agli strumenti e alle risorse adeguate per comprendere e supportare al meglio le ragazze durante la loro crescita."
              />
              <FAQItem
                id="2"
                question="A chi si rivolge BAB?"
                answer="BAB è progettata principalmente per supportare le ragazze e le giovani atlete under 18 che affrontano lo sviluppo e praticano sport. Il sistema offre percorsi e cruscotti dedicati anche per genitori, preparatori e club."
              />
              <FAQItem
                id="3"
                question="Quali funzionalità include l'app di BAB?"
                answer="BAB include il monitoraggio dell'energia fisica, della qualità del sonno e dell'umore, incrociati con le fasi del ciclo mestruale, per aiutare le atlete a capire come questi fattori influenzano la prestazione e la vita quotidiana."
              />
              <FAQItem
                id="4"
                question="BAB è sicura e rispetta la privacy?"
                answer="Assolutamente sì. BAB è pienamente conforme al GDPR europeo. Tutti i dati biologici personali restano crittografati sul telefono dell'atleta. L'allenatore non vedrà mai i dettagli intimi del ciclo o delle risposte della singola ragazza, ma solo un indice aggregato di fatica del team."
              />
              <FAQItem
                id="5"
                question="Chi ha ideato e sviluppato BAB?"
                answer="BAB è stata fondata da Gaia Manzone in collaborazione con un team multidisciplinare composto da preparatori atletici, medici dello sport, ginecologi, e con il contributo diretto di giovani atlete professioniste."
              />
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-[3px] border-black bg-[#0F0F12] text-white mt-12">
        {/* Footer Top — Tagline Banner */}
        <div className="w-full border-b-2 border-white/10 py-10 px-6 sm:px-12 flex flex-col items-center gap-3 text-center">
          <span className="text-[10px] font-black text-[#34BBC0] uppercase tracking-widest">✦ Il Nostro Motto ✦</span>
          <p className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight">
            Reach Your Personal Best,
          </p>
          <p className="text-2xl sm:text-3xl font-serif font-black text-[#FFDE4D] leading-tight">
            By Feeling Your Best.
          </p>
          <button
            onClick={() => setShowQuiz(true)}
            className="mt-4 y2k-btn bg-[#FFDE4D] text-[#0F0F12] font-black text-sm"
          >
            Entra nella Waitlist ✦
          </button>
        </div>

        {/* Footer Bottom */}
        <div className="py-8 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-sm">
            <div className="flex items-center gap-2 mb-1">
              <img src="/logo.svg" alt="BAB Logo" className="h-7 w-auto brightness-0 invert" />
            </div>
            <span className="text-xs text-neutral-400 font-bold">Il primo sistema per proteggere la salute delle atlete under 18 e prevenire gli infortuni.</span>
            <span className="text-xs text-neutral-600 font-bold">© 2026 BAB - Tutti i diritti riservati.</span>
          </div>
          
          {/* Contact and Social Links */}
          <div className="flex flex-wrap gap-12 font-sans text-xs">
            <div className="flex flex-col gap-2">
              <span className="font-black text-white uppercase tracking-wider text-[10px]">Informazioni</span>
              <a href="mailto:info@bab-sports.com" className="text-neutral-400 hover:text-[#34BBC0] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded font-bold">Contatti</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-black text-white uppercase tracking-wider text-[10px]">Social</span>
              <a href="https://substack.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#34BBC0] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded font-bold">Substack</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#34BBC0] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded font-bold">Instagram</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Onboarding Quiz Modal overlay */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0F0F12]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-w-lg"
            >
              <OnboardingQuiz
                onSubmitComplete={handleQuizSubmit}
                onClose={() => setShowQuiz(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
