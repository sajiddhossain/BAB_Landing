import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { OnboardingQuiz } from './components/OnboardingQuiz';
import type { QuizData } from './components/OnboardingQuiz';
import { TamagotchiPreview } from './components/TamagotchiPreview';

interface SuccessData {
  data: QuizData;
  sitgScore: number;
}

// FAQ Accordion Item Component with Accessibility
const FAQItem = ({ id, question, answer }: { id: string; question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#FAF9F6]/10 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        className="w-full flex justify-between items-center text-left py-2 text-sm sm:text-base font-bold text-[#FAF9F6] hover:text-[#DAE69A] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-[#DAE69A] font-mono text-lg ml-4"
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
            <p className="text-xs sm:text-sm text-[#FAF9F6]/60 leading-relaxed pt-2 pb-4 pr-6 font-sans">
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
          sitgScore: prev.sitgScore + 30, // Add +30 score for sharing referral
        };
      });
    }
  };

  const resetFlow = () => {
    setSuccessData(null);
    setReferralShared(false);
    setShowQuiz(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Framer Motion Scroll Reveal Config
  const scrollReveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" as const }
  };

  return (
    <div className="min-h-screen bg-[#032e30] text-[#FAF9F6] selection:bg-[#34BBC0]/30 selection:text-[#FAF9F6]">
      
      {/* Header / Navigazione (Section 1) */}
      <header className="fixed top-0 inset-x-0 h-20 bg-[#044443] border-b border-[#FAF9F6]/5 z-40 px-6 sm:px-12 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <span 
            onClick={resetFlow}
            tabIndex={0}
            role="button"
            aria-label="Home page BAB"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') resetFlow(); }}
            className="text-2xl font-bold font-serif text-[#FAF9F6] cursor-pointer hover:text-[#DAE69A] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded"
          >
            BAB
          </span>
          <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full bg-[#032e30] border border-[#FAF9F6]/10 text-[10px] font-bold text-[#DAE69A] tracking-wider uppercase">
            Protocollo Prevenzione
          </span>
        </div>
        
        {/* Menu Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-[#FAF9F6]/60">
          <button onClick={() => scrollToSection('our-why')} className="hover:text-[#FAF9F6] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded py-1 px-2">Our Why</button>
          <button onClick={() => scrollToSection('features')} className="hover:text-[#FAF9F6] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded py-1 px-2">Features</button>
          <button onClick={() => scrollToSection('behind-bab')} className="hover:text-[#FAF9F6] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded py-1 px-2">About Us</button>
          <button onClick={() => scrollToSection('faq')} className="hover:text-[#FAF9F6] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded py-1 px-2">FAQ</button>
        </nav>

        <button
          onClick={() => {
            if (successData) {
              resetFlow();
            } else {
              setShowQuiz(true);
            }
          }}
          aria-label={successData ? "Ricomincia flusso iscrizione" : "Partecipa alla lista d'attesa"}
          className="px-5 py-2.5 rounded-xl bg-[#c8e6a0] text-[#032e30] text-xs font-bold tracking-wide hover:bg-[#c8e6a0]/90 transition-all shadow-md active:scale-95 uppercase focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none"
        >
          {successData ? 'Restart' : 'Join the Waitlist'}
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {!successData ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center w-full"
            >
              
              {/* Hero Section (Section 2 - Split screen) */}
              <HeroSection onJoinWaitlist={() => setShowQuiz(true)} />

              {/* Sezione 3: Soluzione e Empatia (Our Why - Split Layout Invertito) */}
              <motion.section 
                id="our-why" 
                {...scrollReveal}
                className="relative min-h-[600px] bg-[#032e30] border-b border-[#FAF9F6]/5 overflow-hidden w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  
                  {/* Left Column: Image */}
                  <div className="lg:col-span-6 relative h-[400px] lg:h-auto overflow-hidden">
                    <img 
                      src="/src/assets/why_athletes.png" 
                      alt="Two female athletes with crossed arms on running track field" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-l from-[#032e30] via-transparent to-transparent opacity-40" />
                  </div>

                  {/* Right Column: Content */}
                  <div className="lg:col-span-6 px-6 sm:px-12 py-24 flex flex-col justify-center items-start text-left gap-8 bg-[#032e30] relative">
                    <span className="text-xs font-bold text-[#34BBC0] tracking-widest uppercase">
                      ✦ You don't have to figure it out alone ✦
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF9F6] leading-tight">
                      You don’t have to figure it out all alone
                    </h2>
                    <div className="flex flex-col gap-4 text-sm sm:text-base text-[#FAF9F6]/80 leading-relaxed font-sans">
                      <p>
                        BAB is your <strong className="text-[#DAE69A] font-semibold">coach off-the-field</strong>, designed to support you through puberty and beyond, so you can continue to <strong className="font-semibold">perform at your best, while feeling your best</strong>,
                      </p>
                      <p>
                        and to give your parents, coaches and club the right tools to understand and guide you along.
                      </p>
                    </div>
                    
                    {/* Badge */}
                    <div className="py-4 px-6 rounded-xl bg-[#044443]/70 border border-[#FAF9F6]/10 w-full glass-panel">
                      <span className="text-xs sm:text-sm font-semibold text-[#DAE69A] block leading-relaxed italic text-center">
                        ✦ "Because no one should have to choose between doing sport and feeling good" ✦
                      </span>
                    </div>

                    <button
                      onClick={() => setShowQuiz(true)}
                      className="px-8 py-3.5 bg-[#c8e6a0] text-[#032e30] text-xs sm:text-sm font-bold rounded-xl hover:bg-[#c8e6a0]/90 transition-all uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none"
                    >
                      JOIN THE WAITLIST ✦
                    </button>
                  </div>

                </div>
              </motion.section>

              {/* Sezione 4: Storytelling (Mia's Case Study - 3 Columns Layout) */}
              <motion.section 
                {...scrollReveal}
                className="w-full px-6 py-24 bg-[#021a1b] border-b border-[#FAF9F6]/5 flex flex-col items-center"
              >
                <div className="max-w-6xl w-full flex flex-col gap-16">
                  
                  {/* Title Area */}
                  <div className="flex flex-col gap-3 text-center">
                    <span className="text-xs font-bold text-[#34BBC0] tracking-widest uppercase">
                      ✦ Athlete Case Study ✦
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-serif font-bold">
                      Mia's Story
                    </h3>
                  </div>

                  {/* 3 Columns Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left Column: Big Statement */}
                    <div className="lg:col-span-4 text-left">
                      <h4 
                        className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF9F6] leading-[1.2]"
                      >
                        At thirteen, Mia’s body no longer felt like home.
                      </h4>
                    </div>

                    {/* Center Column: Portrait Photo */}
                    <div className="lg:col-span-4 flex justify-center">
                      <div className="relative w-72 h-96 p-[1.5px] rounded-[32px] bg-gradient-to-br from-[#FAF9F6]/15 to-[#34BBC0]/5 shadow-2xl overflow-hidden glass-panel">
                        <img 
                          src="/src/assets/mia_portrait.png" 
                          alt="Teen swimmer Mia portrait smiling" 
                          className="w-full h-full object-cover rounded-[30px]"
                        />
                      </div>
                    </div>

                    {/* Right Column: Narrative */}
                    <div className="lg:col-span-4 text-left flex flex-col gap-6 text-xs sm:text-sm text-[#FAF9F6]/75 leading-relaxed font-sans">
                      <p>
                        She had grown taller in a matter of months, and before she understood what was happening, <strong className="text-[#FAF9F6]">hormones had changed more than just her body</strong>. They changed how she played and how she felt while doing it.
                      </p>
                      <p>
                        Pushing through period symptoms, fatigue and hunger, she learned that "no pain is no gain". <strong className="text-[#DAE69A]">Disconnecting from her body became her winning strategy</strong>.
                      </p>
                      <p>
                        Soon, injuries and anxiety started creeping in and her performance began to drop. And because no one talked about any of it, Mia kept quiet and started questioning whether she was no longer made for sport.
                      </p>
                    </div>

                  </div>

                  {/* Full-width bottom conclusion */}
                  <div className="pt-8 border-t border-[#FAF9F6]/10 text-center max-w-4xl mx-auto">
                    <p 
                      className="text-lg sm:text-2xl font-serif font-bold text-[#FAF9F6] leading-relaxed"
                    >
                      But it wasn’t Mia who had fallen behind. It was sport that failed her by neglecting her changing body, health and wellbeing.
                    </p>
                  </div>

                </div>
              </motion.section>

              {/* Sezione 5: Dati e Pain Points (Gradiente Rosso/Teal) */}
              <motion.section 
                {...scrollReveal}
                className="w-full py-24 bg-gradient-to-b from-[#3a0d0d] to-[#032e30] flex flex-col items-center border-b border-[#FAF9F6]/5"
              >
                <div className="max-w-6xl w-full px-6 flex flex-col gap-16">
                  
                  {/* Part A: Menstrual Pain Points */}
                  <div className="flex flex-col gap-10">
                    <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
                      <h2 className="text-2xl sm:text-4xl font-serif font-bold leading-tight">
                        Just like Mia, several athletes pay the cost of bleeding in sport
                      </h2>
                    </div>

                    {/* Stat Grid (6 cards) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { percent: '20%', label: 'feel judged or unsupported by coaches during their period' },
                        { percent: '93%', label: 'report a negative period-related experience in sport' },
                        { percent: '77%', label: 'say menstrual symptoms affect performance' },
                        { percent: '73%', label: 'feel pressured to push through period pain' },
                        { percent: '84%', label: 'ignore period pain as their main coping mechanism' },
                        { percent: '36%', label: 'believes missing periods during competition is normal' },
                      ].map((stat, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-[#044443]/30 border border-[#FAF9F6]/5 flex flex-col gap-4 hover:border-[#34BBC0]/30 transition-all hover:shadow-[#34BBC0]/10 hover:shadow-lg glass-panel relative overflow-hidden group">
                          {/* Small icon placeholder */}
                          <div className="w-4 h-4 rounded bg-[#FAF9F6]/10 group-hover:bg-[#34BBC0]/30 transition-colors" />
                          <span 
                            className="text-3xl sm:text-4xl font-serif font-bold text-[#DAE69A] mt-1"
                          >
                            {stat.percent}
                          </span>
                          <p className="text-xs sm:text-sm text-[#FAF9F6]/80 leading-relaxed font-sans">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Source citation */}
                    <div className="text-center">
                      <span className="text-[10px] text-[#FAF9F6]/40 uppercase tracking-widest font-bold">
                        SOURCES ON REQUEST
                      </span>
                    </div>
                  </div>

                  {/* Part B: The Systemic Gap */}
                  <div className="flex flex-col gap-10 pt-12 border-t border-[#FAF9F6]/10">
                    <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
                      <h4 className="text-xl sm:text-3xl font-serif font-bold text-[#FAF9F6]">
                        Women are treated as Small Men, and Girls as Small Women*
                      </h4>
                      <p className="text-xs sm:text-sm text-[#DAE69A] uppercase tracking-widest font-bold">
                        the numbers show it
                      </p>
                    </div>

                    {/* Stat Grid 2 (3 cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { percent: '50%', label: 'of teens drop out of sport during puberty', customBg: 'bg-[#044443]/40' },
                        { percent: '6%', label: 'of sport research focuses on women’s health', customBg: 'bg-[#044443]/40' },
                        { percent: '0%', label: 'barely any research on U18 athletes who menstruate', customBg: 'bg-[#4a1c30]/90 border-[#FAF9F6]/15' },
                      ].map((stat, idx) => (
                        <div key={idx} className={`p-8 rounded-2xl border border-[#FAF9F6]/5 flex flex-col gap-3 text-center glass-panel ${stat.customBg}`}>
                          <span className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF9F6]">
                            {stat.percent}
                          </span>
                          <p className="text-xs sm:text-sm text-[#FAF9F6]/70 leading-relaxed font-sans">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* There's a better way section */}
                    <div className="p-8 rounded-[24px] bg-[#044443]/60 border border-[#FAF9F6]/10 text-center max-w-4xl mx-auto mt-4 glass-panel">
                      <span className="text-xs sm:text-sm font-bold text-[#DAE69A] block mb-3 tracking-widest uppercase">
                        ✨ There's a Better Way ✨
                      </span>
                      <p className="text-sm sm:text-base text-[#FAF9F6]/90 leading-relaxed font-sans">
                        BAB is building specialised support resources designed by experts who understand the unique challenges of navigating the impact of puberty, hormones and adolescence on performance, health and wellbeing.
                      </p>
                    </div>
                  </div>

                </div>
              </motion.section>

              {/* Sezione 6: Funzionalità Core (Features) */}
              <motion.section 
                id="features" 
                {...scrollReveal}
                className="max-w-6xl w-full px-6 py-24 flex flex-col gap-12 border-b border-[#FAF9F6]/5"
              >
                <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
                  <span className="text-xs font-bold text-[#34BBC0] tracking-widest uppercase">
                    ✦ Core Capabilities ✦
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-serif font-bold">
                    Performance x Health x Wellbeing
                  </h3>
                  <p className="text-sm text-[#FAF9F6]/60 leading-relaxed font-sans">
                    Everything you need to support teenage athletes, built directly into five core modules.
                  </p>
                </div>

                {/* Features Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
                  
                  {/* PREVENT */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="md:col-span-6 p-8 rounded-3xl glass-panel flex flex-col gap-4 hover:border-[#34BBC0]/30 transition-all bg-[#044443]/20"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#FAF9F6]/5 flex items-center justify-center border border-[#FAF9F6]/10 text-[#34BBC0] font-bold text-sm">
                      01
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold font-serif text-[#FAF9F6]">
                      PREVENT
                    </h4>
                    <p className="text-xs sm:text-sm text-[#FAF9F6]/60 leading-relaxed font-sans">
                      Identify and flag warning signs early before they affect health, wellbeing, or performance.
                    </p>
                  </motion.div>

                  {/* SUPPORT */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="md:col-span-6 p-8 rounded-3xl glass-panel flex flex-col gap-4 hover:border-[#34BBC0]/30 transition-all bg-[#044443]/20"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#FAF9F6]/5 flex items-center justify-center border border-[#FAF9F6]/10 text-[#34BBC0] font-bold text-sm">
                      02
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold font-serif text-[#FAF9F6]">
                      SUPPORT
                    </h4>
                    <p className="text-xs sm:text-sm text-[#FAF9F6]/60 leading-relaxed font-sans">
                      Create a stronger support system around the athlete both on and off the field with dedicated tools for parents and coaches.
                    </p>
                  </motion.div>

                  {/* TRACK (With Embedded Tamagotchi Preview Widget) */}
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center p-8 rounded-3xl glass-panel bg-[#044443]/20">
                    <div className="sm:col-span-7 flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FAF9F6]/5 flex items-center justify-center border border-[#FAF9F6]/10 text-[#34BBC0] font-bold text-sm">
                        03
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold font-serif text-[#FAF9F6]">
                        TRACK (Tamagotchi Engine)
                      </h4>
                      <p className="text-xs sm:text-sm text-[#FAF9F6]/60 leading-relaxed font-sans">
                        Monitor energy levels, sleep and mood, underpinned by menstrual health and growth metrics to build a complete picture of the athlete’s wellbeing through longitudinal inputs.
                      </p>
                      <p className="text-xs text-[#DAE69A] font-medium leading-relaxed font-sans bg-[#FAF9F6]/5 p-3 rounded-xl border border-[#FAF9F6]/10">
                        💡 Click the buttons on the Tamagotchi widget to test the different athlete states!
                      </p>
                    </div>
                    
                    <div className="sm:col-span-5 flex justify-center">
                      <TamagotchiPreview />
                    </div>
                  </div>

                  {/* UNDERSTAND */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="md:col-span-4 p-8 rounded-3xl glass-panel flex flex-col gap-4 hover:border-[#34BBC0]/30 transition-all justify-between bg-[#044443]/20"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FAF9F6]/5 flex items-center justify-center border border-[#FAF9F6]/10 text-[#34BBC0] font-bold text-sm">
                        04
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold font-serif text-[#FAF9F6]">
                        UNDERSTAND
                      </h4>
                      <p className="text-xs sm:text-sm text-[#FAF9F6]/60 leading-relaxed font-sans">
                        Translate inputs into clear, simple and engaging language and deliver personalised, actionable insights and body literacy resources, delivered gradually, session by session.
                      </p>
                    </div>
                  </motion.div>

                  {/* OPTIMISE */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="md:col-span-12 p-8 rounded-3xl glass-panel flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#34BBC0]/30 transition-all bg-[#044443]/20"
                  >
                    <div className="flex flex-col gap-3 max-w-xl">
                      <div className="w-10 h-10 rounded-lg bg-[#FAF9F6]/5 flex items-center justify-center border border-[#FAF9F6]/10 text-[#34BBC0] font-bold text-sm">
                        05
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold font-serif text-[#FAF9F6]">
                        OPTIMISE
                      </h4>
                      <p className="text-xs sm:text-sm text-[#FAF9F6]/60 leading-relaxed font-sans">
                        Balance performance with long-term physical and emotional wellbeing, through personalised, daily recommendations, delivered by clinical experts with the support of AI.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="px-6 py-3 rounded-full bg-[#c8e6a0] text-[#032e30] text-xs font-bold tracking-wide hover:bg-[#c8e6a0]/90 transition-all self-start md:self-auto shrink-0 focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none"
                    >
                      Try App Sandbox ✦
                    </button>
                  </motion.div>

                </div>
              </motion.section>

              {/* Sezione 7: Trasparenza e Etica */}
              <motion.section 
                {...scrollReveal}
                className="max-w-4xl w-full px-6 py-24 text-center border-b border-[#FAF9F6]/5"
              >
                <div className="p-8 sm:p-10 rounded-[28px] glass-panel border border-[#FAF9F6]/10 flex flex-col gap-6 relative overflow-hidden bg-[#044443]/15">
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#34BBC0]/5 rounded-full blur-3xl" />
                  
                  <span className="text-xs font-bold text-[#DAE69A] tracking-widest uppercase">
                    ✦ Scientific Integrity & Consent ✦
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF9F6]">
                    Data that Break Barriers
                  </h3>
                  <p className="text-xs sm:text-base text-[#FAF9F6]/70 leading-relaxed max-w-2xl mx-auto font-sans">
                    Only if you give consent, what you track the data contributes to anonymous scientific research aimed at improving the health, wellbeing, and performance of both you and other young athletes. Together, we're helping close the gaps in youth and sports research, ensuring that sport and healthcare can support you in the safest and most effective way. Your data is always anonymous, protected, and used solely to advance teenagers' health, wellbeing, development, and performance. Your Journey Matters.
                  </p>
                  
                  <div className="pt-4 border-t border-[#FAF9F6]/5 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#FAF9F6]/50">
                    <span>🛡️ Fully encrypted logs</span>
                    <span className="hidden sm:inline" aria-hidden="true">•</span>
                    <span>🔒 Opt-in only research</span>
                    <span className="hidden sm:inline" aria-hidden="true">•</span>
                    <span>✨ Your Journey Matters</span>
                  </div>
                </div>
              </motion.section>

              {/* Sezione 8: Social Proof (Testimonianze) */}
              <motion.section 
                {...scrollReveal}
                className="max-w-6xl w-full px-6 py-24 flex flex-col gap-12 border-b border-[#FAF9F6]/5"
              >
                <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
                  <span className="text-xs font-bold text-[#34BBC0] tracking-widest uppercase">
                    ✦ Voices of the community ✦
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif font-bold">
                    Co-created by athletes, scientists and parents
                  </h3>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Lisa Gutfleisch */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#044443]/20 border border-[#FAF9F6]/5 flex flex-col justify-between gap-6 glass-panel group transition-colors hover:border-[#34BBC0]/30">
                    <p className="text-xs sm:text-sm text-[#FAF9F6]/80 leading-relaxed font-sans italic">
                      "BAB made me feel seen and realise how much I could have benefitted if something like existed during my upbringing in sport. It took me many years to understand that strength is not the opposite of femininity, and the next generation of female athletes should never have to choose between becoming powerful and fitting in."
                    </p>
                    <div className="flex flex-col border-t border-[#FAF9F6]/10 pt-4 font-sans">
                      <span className="text-sm font-bold text-[#FAF9F6]">Lisa Gutfleisch</span>
                      <span className="text-[10px] text-[#34BBC0] font-bold uppercase tracking-wider mt-0.5">German National Elite Rower</span>
                    </div>
                  </div>

                  {/* Alisha Menon */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#044443]/20 border border-[#FAF9F6]/5 flex flex-col justify-between gap-6 glass-panel group transition-colors hover:border-[#34BBC0]/30">
                    <p className="text-xs sm:text-sm text-[#FAF9F6]/80 leading-relaxed font-sans italic">
                      "Young girls face misinformation and scientific bias, challenges that are often amplified in sports settings, particularly during the profound physical and psychological changes of puberty. BAB provides a safe, preventive solution while contributing to the advancement of research in a field that has been overlooked for far too long."
                    </p>
                    <div className="flex flex-col border-t border-[#FAF9F6]/10 pt-4 font-sans">
                      <span className="text-sm font-bold text-[#FAF9F6]">Alisha Menon</span>
                      <span className="text-[10px] text-[#34BBC0] font-bold uppercase tracking-wider mt-0.5">PhD at UC Berkeley</span>
                    </div>
                  </div>

                  {/* Vasundhara P. */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#044443]/20 border border-[#FAF9F6]/5 flex flex-col justify-between gap-6 glass-panel group transition-colors hover:border-[#34BBC0]/30">
                    <p className="text-xs sm:text-sm text-[#FAF9F6]/80 leading-relaxed font-sans italic">
                      "My daughter is 11 and competes at regional and national levels in fencing. A tool like BAB helps me understand how to best support her athletic goals in a safe and informed way, particularly as she navigates the changes of adolescence while continuing to pursue high-level competition."
                    </p>
                    <div className="flex flex-col border-t border-[#FAF9F6]/10 pt-4 font-sans">
                      <span className="text-sm font-bold text-[#FAF9F6]">Vasundhara P.</span>
                      <span className="text-[10px] text-[#34BBC0] font-bold uppercase tracking-wider mt-0.5">Mum of 11 Year Old Athlete</span>
                    </div>
                  </div>

                  {/* Erica Sali */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#044443]/20 border border-[#FAF9F6]/5 flex flex-col justify-between gap-6 glass-panel group transition-colors hover:border-[#34BBC0]/30">
                    <p className="text-xs sm:text-sm text-[#FAF9F6]/80 leading-relaxed font-sans italic">
                      "As a professional volleyball player and coach, I never had such a great resource as BAB to support the specific needs my teenage athletes and I have."
                    </p>
                    <div className="flex flex-col border-t border-[#FAF9F6]/10 pt-4 font-sans">
                      <span className="text-sm font-bold text-[#FAF9F6]">Erica Sali</span>
                      <span className="text-[10px] text-[#34BBC0] font-bold uppercase tracking-wider mt-0.5">Volleyball Athlete & Coach</span>
                    </div>
                  </div>

                </div>
              </motion.section>

              {/* Sezione 9: Behind BAB (About Us) */}
              <motion.section 
                id="behind-bab" 
                {...scrollReveal}
                className="w-full px-6 py-24 bg-[#021a1b] border-b border-[#FAF9F6]/5 flex flex-col items-center"
              >
                <div className="max-w-4xl w-full flex flex-col md:grid md:grid-cols-12 gap-10">
                  
                  {/* Left Column: Visual branding/Title */}
                  <div className="md:col-span-4 flex flex-col gap-3 justify-center">
                    <span className="text-xs font-bold text-[#34BBC0] tracking-widest uppercase">
                      ✦ The Founder ✦
                    </span>
                    <h3 className="text-3xl sm:text-5xl font-serif font-bold">
                      Behind BAB
                    </h3>
                    <div className="w-16 h-1 bg-[#DAE69A] rounded-full mt-2" aria-hidden="true" />
                  </div>

                  {/* Right Column: Bio text */}
                  <div className="md:col-span-8 p-8 rounded-[24px] glass-panel border border-[#FAF9F6]/10 flex flex-col gap-5 text-sm sm:text-base text-[#FAF9F6]/85 leading-relaxed font-sans">
                    <p>
                      BAB was born from the personal experience of its founder, <strong className="text-[#FAF9F6]">Gaia Manzone</strong>. After spending a decade working for adidas and PUMA, Gaia witnessed firsthand the systemic barriers faced by elite female athletes.
                    </p>
                    <p>
                      But her connection to the issue started much earlier, when health challenges arising from managing puberty and performance without the adequate support forced her to stop competing. Gaia believes that <span className="text-[#DAE69A] font-semibold">without women's health, there can be no women's sport</span>.
                    </p>
                    <p>
                      That belief led her to bring together a trusted network of elite athletes, doctors, researchers, and sport experts to create BAB: a platform built for adolescents, their parents, their coaches, and the scientists working tirelessly to drive change, but often without the resources, tools, or support they need to do so. 
                    </p>
                    <p className="font-bold text-[#FAF9F6] border-t border-[#FAF9F6]/10 pt-4">
                      BAB exists to ensure that no young athlete has to navigate puberty, hormones, health, and performance alone.
                    </p>
                  </div>

                </div>
              </motion.section>

              {/* Sezione 10: FAQ */}
              <motion.section 
                id="faq" 
                {...scrollReveal}
                className="max-w-4xl w-full px-6 py-24 flex flex-col gap-12 border-b border-[#FAF9F6]/5"
              >
                <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
                  <span className="text-xs font-bold text-[#34BBC0] tracking-widest uppercase">
                    ✦ FAQ ✦
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif font-bold">
                    Common Questions
                  </h3>
                </div>

                <div className="glass-panel p-6 sm:p-8 rounded-[24px] border border-[#FAF9F6]/10 flex flex-col bg-[#044443]/15">
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

            </motion.div>
          ) : (
            
            /* Success / Confirmation Page (Waitlist) */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="min-h-[80vh] flex items-center justify-center px-4 py-12"
            >
              <div className="max-w-xl w-full p-[1.5px] rounded-[20px] bg-gradient-to-br from-[#FAF9F6]/15 to-[#34BBC0]/5 shadow-2xl glass-panel bg-[#044443]/20">
                <div className="p-8 flex flex-col gap-6 text-[#FAF9F6]">
                  
                  {/* Success Title */}
                  <div className="text-center border-b border-[#FAF9F6]/10 pb-4">
                    <span className="text-4xl" role="img" aria-label="party popper">🎉</span>
                    <h2 className="text-2xl font-serif font-bold text-[#FAF9F6] mt-3">
                      You're on the Waitlist!
                    </h2>
                    <p className="text-xs text-[#34BBC0] uppercase tracking-widest mt-1 font-bold">
                      Registration Completed
                    </p>
                  </div>

                  {/* SITG Score Panel */}
                  <div className="bg-[#032e30] border border-[#FAF9F6]/10 rounded-xl p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-bold text-[#FAF9F6]/80">
                          Skin in the Game (SITG) Score
                        </h4>
                        <p className="text-[10px] text-[#FAF9F6]/40 uppercase tracking-wider mt-0.5">
                          Validation Intent Score
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-serif font-bold text-[#DAE69A]">
                          {successData.sitgScore}
                        </span>
                        <span className="text-xs text-[#FAF9F6]/40 font-bold block">Points</span>
                      </div>
                    </div>

                    {/* Quality Badge */}
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#044443]/50 border border-[#FAF9F6]/5 text-xs">
                      <span className="text-lg" role="img" aria-label="shield">🛡️</span>
                      <div>
                        <span className="font-bold block text-[#FAF9F6]/90">
                          {successData.sitgScore >= 80 
                            ? 'High-Intent Qualified Lead (B2B/Beta Cohort)' 
                            : successData.sitgScore >= 50 
                            ? 'Medium-Intent Qualified Lead' 
                            : 'Low-Intent Lead'}
                        </span>
                        <span className="text-[10px] text-[#FAF9F6]/50">
                          {successData.sitgScore >= 80 
                            ? 'You will be prioritized in our beta tester groups.' 
                            : 'You will receive our waitlist report shortly.'}
                        </span>
                      </div>
                    </div>

                    {/* Points Breakdown */}
                    <div className="text-[11px] text-[#FAF9F6]/60 flex flex-col gap-2 pt-2 border-t border-[#FAF9F6]/5 font-sans">
                      <div className="flex justify-between">
                        <span>Provided quiz responses:</span>
                        <span className="text-[#DAE69A] font-bold">+50 pt</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Submitted valid email:</span>
                        <span className="text-[#DAE69A] font-bold">+30 pt</span>
                      </div>
                      {successData.data.email.split('@')[1] && ![
                        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
                        'live.com', 'icloud.com', 'libero.it', 'virgilio.it'
                      ].includes(successData.data.email.split('@')[1].toLowerCase()) && (
                        <div className="flex justify-between">
                          <span>B2B/Organization Domain Bonus:</span>
                          <span className="text-[#DAE69A] font-bold">+30 pt</span>
                        </div>
                      )}
                      {referralShared && (
                        <div className="flex justify-between text-[#34BBC0] font-bold">
                          <span>Referral Link Shared:</span>
                          <span>+30 pt</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Call to Action: Referral share */}
                  <div className="flex flex-col gap-3 font-sans">
                    <p className="text-xs text-[#FAF9F6]/50 text-center">
                      Invite another coach or parent and get **+30 bonus points** to secure U18 beta access early and help close the sports science gap!
                    </p>
                    <button
                      onClick={handleShareReferral}
                      disabled={referralShared}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-sm text-center transition-all focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none ${
                        referralShared 
                          ? 'bg-[#032e30]/50 text-[#FAF9F6]/40 border border-[#FAF9F6]/10 cursor-not-allowed'
                          : 'bg-[#c8e6a0] text-[#032e30] hover:bg-[#c8e6a0]/90 active:scale-98 shadow-md'
                      }`}
                    >
                      {referralShared ? 'Link Shared! +30 Points Added ✦' : 'Copy Invitation Link (+30 XP) ✦'}
                    </button>
                  </div>

                  {/* Back Link */}
                  <button
                    onClick={resetFlow}
                    className="text-xs text-[#FAF9F6]/40 hover:text-[#FAF9F6]/80 text-center transition-colors hover:underline font-sans focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded py-0.5"
                  >
                    Back to Homepage
                  </button>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer (Section 11) */}
      <footer className="border-t border-[#FAF9F6]/5 py-12 px-6 sm:px-12 bg-[#021a1b] text-xs text-[#FAF9F6]/40 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-2 max-w-sm">
          <span className="font-serif font-bold text-lg text-[#FAF9F6]">
            BAB
          </span>
          <span>The first health and wellbeing app for teenage girls in sport.</span>
          <span>© 2026 BAB - ALL RIGHTS RESERVED</span>
        </div>
        
        {/* Contact and Social Links */}
        <div className="flex flex-wrap gap-12 font-sans">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[#FAF9F6] uppercase tracking-wider text-[10px]">Information</span>
            <a href="mailto:info@bab-sports.com" className="hover:text-[#FAF9F6] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded">Contacts</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[#FAF9F6] uppercase tracking-wider text-[10px]">Socials</span>
            <a href="https://substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FAF9F6] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded">Substack</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FAF9F6] transition-colors focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none rounded">Instagram</a>
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
            className="fixed inset-0 bg-[#080C12]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
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
