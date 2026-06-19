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

// FAQ Accordion Item Component in Neo-Brutalist Style
const FAQItem = ({ id, question, answer }: { id: string; question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
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
    <div className="min-h-screen bg-[#F6F4FF] text-[#0F0F12] selection:bg-[#34BBC0]/30 selection:text-[#0F0F12]">
      
      {/* Header / Navigazione (Section 1) */}
      <header className="fixed top-0 inset-x-0 h-20 bg-white border-b-[3px] border-black z-40 px-6 sm:px-12 flex items-center justify-between shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3">
          <span 
            onClick={resetFlow}
            tabIndex={0}
            role="button"
            aria-label="Home page BAB"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') resetFlow(); }}
            className="text-2xl font-black font-serif text-[#0F0F12] cursor-pointer hover:text-[#34BBC0] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded"
          >
            BAB
          </span>
          <span className="hidden md:inline-block px-2.5 py-0.5 rounded-lg bg-[#EBE5FF] border-2 border-black text-[9px] font-black text-[#0F0F12] tracking-wider uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            Protocollo Prevenzione
          </span>
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
          className="neo-btn bg-[#FFDE4D] hover:bg-[#FFDE4D]/90 text-xs sm:text-sm font-black"
        >
          {successData ? 'Restart' : 'Join the Waitlist'}
        </button>
      </header>

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
              <div className="max-w-xl w-full bg-white border-[3px] border-black rounded-[32px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
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
                  </div>

                  {/* SITG Score Panel */}
                  <div className="bg-[#FFE3D1] border-2 border-black rounded-2xl p-6 flex flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-black text-[#0F0F12]">
                          Skin in the Game (SITG) Score
                        </h4>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold mt-0.5">
                          Validation Intent Score
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
                            ? 'Lead ad Alto Intento (B2B/Beta Cohort)' 
                            : successData.sitgScore >= 50 
                            ? 'Lead a Medio Intento' 
                            : 'Lead a Basso Intento'}
                        </span>
                        <span className="text-[10px] text-neutral-500 block">
                          {successData.sitgScore >= 80 
                            ? 'Avrai la priorità nei gruppi di beta testing.' 
                            : 'Riceverai presto il report speciale di BAB.'}
                        </span>
                      </div>
                    </div>

                    {/* Points Breakdown */}
                    <div className="text-[11px] text-neutral-700 flex flex-col gap-2 pt-2 border-t-2 border-black/10 font-sans font-bold">
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
                          <span>Bonus B2B/Dominio Istituzionale:</span>
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
                      Invita un altro coach o genitore e ricevi **+30 punti bonus** per assicurarti l'accesso anticipato alla beta ed aiutare a chiudere il gap scientifico!
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
                      {referralShared ? 'Link Condiviso! +30 Punti Aggiunti ✦' : 'Copia Link d\'Invito (+30 XP) ✦'}
                    </button>
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
              {/* PAGE 1: HOME */}
              {currentPath === '#/home' && (
                <motion.div
                  key="home-page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center w-full"
                >
                  <HeroSection onJoinWaitlist={() => setShowQuiz(true)} />

                  {/* Redesigned Quick Stats Introduction Panel */}
                  <motion.section 
                    {...scrollReveal}
                    className="max-w-5xl w-full px-6 py-20 text-center"
                  >
                    <div className="bg-[#FFE3D1] border-[3px] border-black rounded-[32px] p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 relative">
                      <span className="text-xs font-black text-[#34BBC0] tracking-widest uppercase">
                        ✦ The Mission ✦
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-serif font-black leading-tight text-[#0F0F12]">
                        Puberty doesn't fit the rules sport was built on.
                      </h2>
                      <p className="text-xs sm:text-base text-neutral-700 max-w-2xl mx-auto font-bold font-sans">
                        Teenage athletes are expected to handle the impact of adolescence and ovarian hormones alone and in silence, navigating systems that were never designed for their bodies. BAB exists to break this barrier.
                      </p>
                      <div className="flex justify-center mt-2">
                        <a 
                          href="#/about" 
                          className="neo-btn bg-[#FFDE4D] text-black font-black uppercase text-xs"
                        >
                          Scopri di più su di noi
                        </a>
                      </div>
                    </div>
                  </motion.section>
                </motion.div>
              )}

              {/* PAGE 2: APP SIMULATOR */}
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
                    <p className="text-sm sm:text-base text-neutral-600 font-bold font-sans leading-relaxed">
                      Sperimenta in anteprima come funziona l'applicazione. Scegli il tuo buddy, effettua il check-in giornaliero e controlla il tuo livello energetico e i tuoi badge nella sezione del profilo.
                    </p>
                    <div className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs font-bold leading-relaxed text-neutral-600 max-w-md">
                      <span className="text-[#34BBC0] font-black block mb-1">💡 Istruzioni d'uso:</span>
                      Clicca sui pulsanti all'interno dello schermo del telefono a destra per navigare tra le varie schermate e testare l'interazione.
                    </div>
                  </div>
                  
                  <div className="lg:col-span-6 w-full flex justify-center py-6">
                    <AppPreview />
                  </div>
                </motion.div>
              )}

              {/* PAGE 3: FEATURES */}
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
                      ✦ Core Capabilities ✦
                    </span>
                    <h3 className="text-3xl sm:text-5xl font-serif font-black">
                      Performance x Health x Wellbeing
                    </h3>
                    <p className="text-sm text-neutral-500 font-bold font-sans">
                      Everything you need to support teenage athletes, built directly into five core modules.
                    </p>
                  </div>

                  {/* Bento Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
                    
                    {/* PREVENT */}
                    <div className="md:col-span-6 p-8 bg-white border-[3px] border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FFE3D1] border-2 border-black flex items-center justify-center text-black font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                        01
                      </div>
                      <h4 className="text-lg sm:text-xl font-black font-serif text-[#0F0F12]">
                        PREVENT
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans font-bold">
                        Identify and flag warning signs early before they affect health, wellbeing, or performance.
                      </p>
                    </div>

                    {/* SUPPORT */}
                    <div className="md:col-span-6 p-8 bg-white border-[3px] border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#EBE5FF] border-2 border-black flex items-center justify-center text-black font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                        02
                      </div>
                      <h4 className="text-lg sm:text-xl font-black font-serif text-[#0F0F12]">
                        SUPPORT
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans font-bold">
                        Create a stronger support system around the athlete both on and off the field with dedicated tools for parents and coaches.
                      </p>
                    </div>

                    {/* TRACK with Widget */}
                    <div className="md:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 bg-white border-[3px] border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#D1FFEF] border-2 border-black flex items-center justify-center text-black font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                          03
                        </div>
                        <h4 className="text-lg sm:text-xl font-black font-serif text-[#0F0F12]">
                          TRACK (Tamagotchi Engine)
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans font-bold">
                          Monitor energy levels, sleep and mood, underpinned by menstrual health and growth metrics to build a complete picture of the athlete’s wellbeing through longitudinal inputs.
                        </p>
                        <p className="text-xs text-neutral-600 font-bold leading-relaxed font-sans bg-[#FAF8FF] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          💡 Clicca sui pulsanti del widget Tamagotchi a destra per cambiare gli stati dell'atleta in tempo reale!
                        </p>
                      </div>
                      
                      <div className="lg:col-span-5 flex justify-center">
                        <TamagotchiPreview />
                      </div>
                    </div>

                    {/* UNDERSTAND */}
                    <div className="md:col-span-6 p-8 bg-white border-[3px] border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FFDE4D] border-2 border-black flex items-center justify-center text-black font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                        04
                      </div>
                      <h4 className="text-lg sm:text-xl font-black font-serif text-[#0F0F12]">
                        UNDERSTAND
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans font-bold">
                        Translate inputs into clear, simple and engaging language and deliver personalised, actionable insights and body literacy resources, delivered gradually, session by session.
                      </p>
                    </div>

                    {/* OPTIMISE */}
                    <div className="md:col-span-6 p-8 bg-white border-[3px] border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-[#D1FFEF] border-2 border-black flex items-center justify-center text-black font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                          05
                        </div>
                        <h4 className="text-lg sm:text-xl font-black font-serif text-[#0F0F12] mt-2">
                          OPTIMISE
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans font-bold mt-2">
                          Balance performance with long-term physical and emotional wellbeing, through personalised, daily recommendations, delivered by clinical experts with the support of AI.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowQuiz(true)}
                        className="mt-6 neo-btn bg-[#FFDE4D] font-black uppercase text-xs self-start"
                      >
                        Try App Sandbox ✦
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* PAGE 4: ABOUT US (STORY / CASE STUDY) */}
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
                        ✦ Athlete Case Study ✦
                      </span>
                      <h3 className="text-3xl sm:text-5xl font-serif font-black">
                        Mia's Story
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                      <div className="lg:col-span-4 text-left">
                        <h4 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#0F0F12] leading-[1.2]">
                          At thirteen, Mia’s body no longer felt like home.
                        </h4>
                      </div>

                      <div className="lg:col-span-4 flex justify-center">
                        <div className="relative w-72 h-96 bg-white border-[3px] border-black rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                          <img 
                            src="/src/assets/mia_portrait.png" 
                            alt="Teen swimmer Mia portrait smiling" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-4 text-left flex flex-col gap-6 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans font-bold">
                        <p>
                          She had grown taller in a matter of months, and before she understood what was happening, <strong className="text-black font-black">hormones had changed more than just her body</strong>. They changed how she played and how she felt while doing it.
                        </p>
                        <p>
                          Pushing through period symptoms, fatigue and hunger, she learned that "no pain is no gain". <span className="bg-[#FFDE4D] border border-black px-1">Disconnecting from her body became her winning strategy</span>.
                        </p>
                        <p>
                          Soon, injuries and anxiety started creeping in and her performance began to drop. And because no one talked about any of it, Mia kept quiet and started questioning whether she was no longer made for sport.
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 border-t-2 border-black text-center max-w-4xl mx-auto">
                      <p className="text-lg sm:text-2xl font-serif font-black text-[#0F0F12] leading-relaxed">
                        But it wasn’t Mia who had fallen behind. It was sport that failed her by neglecting her changing body, health and wellbeing.
                      </p>
                    </div>
                  </div>

                  {/* Solution & Empathy: Our Why */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-10 pt-10 border-t-2 border-black/10">
                    <div className="lg:col-span-6 relative h-[400px] lg:h-auto overflow-hidden border-[3px] border-black rounded-3xl shadow-[6px_6px_0px_0px_#000]">
                      <img 
                        src="/src/assets/why_athletes.png" 
                        alt="Two female athletes with crossed arms on running track field" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    <div className="lg:col-span-6 px-6 py-6 flex flex-col justify-center items-start text-left gap-6 bg-white border-[3px] border-black rounded-3xl shadow-[6px_6px_0px_0px_#000]">
                      <span className="text-xs font-black text-[#34BBC0] tracking-widest uppercase">
                        ✦ You don't have to figure it alone ✦
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#0F0F12]">
                        You don’t have to figure it all alone
                      </h2>
                      <div className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-600 font-bold leading-relaxed font-sans">
                        <p>
                          BAB is your <strong className="text-[#34BBC0] font-black">coach off-the-field</strong>, designed to support you through puberty and beyond, so you can continue to perform at your best, while feeling your best,
                        </p>
                        <p>
                          and to give your parents, coaches and club the right tools to understand and guide you along.
                        </p>
                      </div>
                      
                      <div className="py-3.5 px-6 rounded-xl bg-[#EBE5FF] border-2 border-black w-full shadow-[2px_2px_0px_0px_#000]">
                        <span className="text-xs sm:text-sm font-black text-black block leading-relaxed italic text-center">
                          ✦ "Because no one should have to choose between doing sport and feeling good" ✦
                        </span>
                      </div>

                      <button
                        onClick={() => setShowQuiz(true)}
                        className="neo-btn bg-[#FFDE4D] text-black font-black uppercase text-xs"
                      >
                        JOIN THE WAITLIST ✦
                      </button>
                    </div>
                  </div>

                  {/* Behind BAB (About Gaia) */}
                  <div className="flex flex-col md:grid md:grid-cols-12 gap-10 pt-10 border-t-2 border-black/10">
                    <div className="md:col-span-4 flex flex-col gap-3 justify-center">
                      <span className="text-xs font-black text-[#34BBC0] tracking-widest uppercase">
                        ✦ The Founder ✦
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-serif font-black">
                        Behind BAB
                      </h3>
                    </div>

                    <div className="md:col-span-8 p-8 bg-white border-[3px] border-black rounded-3xl shadow-[6px_6px_0px_0px_#000] flex flex-col gap-5 text-xs sm:text-sm text-neutral-600 font-bold leading-relaxed font-sans">
                      <p>
                        BAB was born from the personal experience of its founder, <strong className="text-black font-black">Gaia Manzone</strong>. After spending a decade working for adidas and PUMA, Gaia witnessed firsthand the systemic barriers faced by elite female athletes.
                      </p>
                      <p>
                        But her connection to the issue started much earlier, when health challenges arising from managing puberty and performance without the adequate support forced her to stop competing. Gaia believes that <span className="text-[#34BBC0] font-black">without women's health, there can be no women's sport</span>.
                      </p>
                      <p>
                        That belief led her to bring together a trusted network of elite athletes, doctors, researchers, and sport experts to create BAB.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Global Statistics Panel (Redesigned in Neo-Brutalist Grid - Displayed at the bottom of the landing page) */}
        {!successData && currentPath === '#/home' && (
          <motion.section 
            {...scrollReveal}
            className="w-full py-20 bg-[#EBE5FF] border-y-[3px] border-black flex flex-col items-center"
          >
            <div className="max-w-6xl w-full px-6 flex flex-col gap-16">
              
              {/* Part A: Menstrual Pain Points */}
              <div className="flex flex-col gap-10">
                <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
                  <span className="text-xs font-black text-[#34BBC0] tracking-widest uppercase">
                    ✦ The Cost of Silence ✦
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-serif font-black leading-tight">
                    Several athletes pay the cost of bleeding in sport
                  </h2>
                </div>

                {/* Stat Grid (6 cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { percent: '20%', label: 'feel judged or unsupported by coaches during their period', bg: 'bg-[#D1FFEF]' },
                    { percent: '93%', label: 'report a negative period-related experience in sport', bg: 'bg-[#FFE3D1]' },
                    { percent: '77%', label: 'say menstrual symptoms affect performance', bg: 'bg-[#EBE5FF]' },
                    { percent: '73%', label: 'feel pressured to push through period pain', bg: 'bg-[#FFDE4D]' },
                    { percent: '84%', label: 'ignore period pain as their main coping mechanism', bg: 'bg-[#D1FFEF]' },
                    { percent: '36%', label: 'believes missing periods during competition is normal', bg: 'bg-[#FFE3D1]' },
                  ].map((stat, idx) => (
                    <div key={idx} className={`${stat.bg} p-6 rounded-2xl border-2 border-black flex flex-col gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all`}>
                      <span className="text-3xl sm:text-4xl font-serif font-black text-black">
                        {stat.percent}
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-bold font-sans">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part B: The Systemic Gap */}
              <div className="flex flex-col gap-10 pt-12 border-t-2 border-black/10">
                <div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
                  <h4 className="text-xl sm:text-3xl font-serif font-black text-[#0F0F12]">
                    Women are treated as Small Men, and Girls as Small Women*
                  </h4>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-black">
                    the numbers show it
                  </p>
                </div>

                {/* Stat Grid 2 (3 cards) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { percent: '50%', label: 'of teens drop out of sport during puberty', bg: 'bg-white' },
                    { percent: '6%', label: 'of sport research focuses on women’s health', bg: 'bg-white' },
                    { percent: '0%', label: 'barely any research on U18 athletes who menstruate', bg: 'bg-[#FFDE4D]' },
                  ].map((stat, idx) => (
                    <div key={idx} className={`p-8 rounded-2xl border-2 border-black flex flex-col gap-3 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${stat.bg}`}>
                      <span className="text-3xl sm:text-5xl font-serif font-black text-[#0F0F12]">
                        {stat.percent}
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans font-bold">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.section>
        )}

        {/* Global Transparency & Consent Section */}
        {!successData && currentPath === '#/home' && (
          <motion.section 
            {...scrollReveal}
            className="max-w-4xl w-full px-6 py-20 mx-auto text-center"
          >
            <div className="p-8 sm:p-10 bg-white border-2 border-black rounded-[32px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 relative overflow-hidden">
              <span className="text-xs font-black text-[#34BBC0] tracking-widest uppercase">
                ✦ Scientific Integrity & Consent ✦
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-black text-[#0F0F12]">
                Data that Break Barriers
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-bold leading-relaxed max-w-2xl mx-auto font-sans">
                Only if you give consent, what you track the data contributes to anonymous scientific research aimed at improving the health, wellbeing, and performance of both you and other young athletes. Together, we're helping close the gaps in youth and sports research, ensuring that sport and healthcare can support you in the safest and most effective way. Your data is always anonymous, protected, and used solely to advance teenagers' health, wellbeing, development, and performance.
              </p>
              
              <div className="pt-4 border-t-2 border-black/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-neutral-500 font-bold">
                <span>🛡️ Fully encrypted logs</span>
                <span className="hidden sm:inline" aria-hidden="true">•</span>
                <span>🔒 Opt-in only research</span>
                <span className="hidden sm:inline" aria-hidden="true">•</span>
                <span>✨ Your Journey Matters</span>
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
                Common Questions
              </h3>
            </div>

            <div className="flex flex-col">
              <FAQItem
                id="1"
                question="What is the BAB app?"
                answer="We believe that U18 athletes should not have to figure it all out alone. That's why BAB also gives parents, caregivers, coaches, and clubs access to the right tools and resources to better understand and support young athletes throughout their journey."
              />
              <FAQItem
                id="2"
                question="Who is BAB for?"
                answer="BAB is primarily designed to support girls and young people U18 who experience periods and practice sport. The app also offers personalised insights and educational resources for parents, coaches and clubs."
              />
              <FAQItem
                id="3"
                question="What features does the BAB app include?"
                answer="BAB includes period tracking, energy tracking, and mood tracking, helping U18 athletes understand how these factors influence both their athletic performance and everyday life."
              />
              <FAQItem
                id="4"
                question="Is BAB safe, anonymous, and private?"
                answer="Yes. BAB is fully compliant with EU GDPR regulations. All raw personal data remains encrypted and safe, and we never expose individual biological data to coaches."
              />
              <FAQItem
                id="5"
                question="Who created BAB?"
                answer="BAB was founded by Gaia Manzone in collaboration with a multidisciplinary team of sports researchers, doctors, elite U18 athletes, and coaches."
              />
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer (Section 11) */}
      <footer className="border-t-[3px] border-black py-12 px-6 sm:px-12 bg-white text-xs text-neutral-500 font-bold flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
        <div className="flex flex-col gap-2 max-w-sm">
          <span className="font-serif font-black text-lg text-[#0F0F12]">
            BAB
          </span>
          <span>The first health and wellbeing app for teenage girls in sport.</span>
          <span>© 2026 BAB - ALL RIGHTS RESERVED</span>
        </div>
        
        {/* Contact and Social Links */}
        <div className="flex flex-wrap gap-12 font-sans">
          <div className="flex flex-col gap-2">
            <span className="font-black text-[#0F0F12] uppercase tracking-wider text-[10px]">Information</span>
            <a href="mailto:info@bab-sports.com" className="hover:text-[#34BBC0] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded">Contacts</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-black text-[#0F0F12] uppercase tracking-wider text-[10px]">Socials</span>
            <a href="https://substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#34BBC0] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded">Substack</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#34BBC0] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded">Instagram</a>
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
