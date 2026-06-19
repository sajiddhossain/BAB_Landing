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

  return (
    <div className="min-h-screen bg-[#080C12] text-[#FAF9F6] selection:bg-[#34BBC0]/30 selection:text-[#FAF9F6]">
      {/* Header bar */}
      <header className="fixed top-0 inset-x-0 h-20 border-b border-[#FAF9F6]/5 bg-[#080C12]/80 backdrop-blur-md z-40 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold font-serif text-[#FAF9F6]" style={{ fontFamily: "'Corben', serif" }}>
            BAB
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#171F2E] border border-[#FAF9F6]/10 text-[10px] font-bold text-[#34BBC0] tracking-wider uppercase">
            Protocollo Prevenzione
          </span>
        </div>
        <button
          onClick={() => {
            if (successData) {
              resetFlow();
            } else {
              setShowQuiz(true);
            }
          }}
          className="px-5 py-2 rounded-full border border-[#34BBC0]/40 text-xs sm:text-sm font-bold text-[#FAF9F6] hover:bg-[#34BBC0] hover:text-[#080C12] hover:border-transparent transition-all shadow-md active:scale-95"
        >
          {successData ? 'Ricomincia' : 'Richiedi Accesso ✦'}
        </button>
      </header>

      {/* Main Container */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {!successData ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              {/* Hero Section */}
              <HeroSection
                onJoinWaitlist={() => setShowQuiz(true)}
              />

              {/* Bento Grid Section */}
              <section className="max-w-6xl w-full px-6 py-20 flex flex-col gap-12">
                <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
                  <span className="text-xs font-bold text-[#34BBC0] tracking-widest uppercase">
                    ✦ Tecnologie & Design ✦
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF9F6]" style={{ fontFamily: "'Corben', serif" }}>
                    Una piattaforma integrata per la tutela dell'atleta
                  </h3>
                  <p className="text-sm sm:text-md text-[#FAF9F6]/60 leading-relaxed">
                    Uniamo intelligenza artificiale per il controllo dei movimenti e un sistema di monitoraggio del carico biologico che rispetta la privacy delle ragazze.
                  </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
                  
                  {/* Card 1: Controllo Ginocchia AI */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="md:col-span-8 p-8 rounded-[20px] glass-panel flex flex-col gap-6 justify-between group transition-all"
                  >
                    <div className="flex flex-col gap-4">
                      {/* LCA Icon: primitive rotated square diamond intersected by horizontal line */}
                      <div className="w-12 h-12 rounded-xl bg-[#FAF9F6]/5 flex items-center justify-center border border-[#FAF9F6]/10 group-hover:border-[#34BBC0]/40 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#34BBC0] fill-none" strokeWidth="1.5">
                          <rect x="5" y="5" width="14" height="14" rx="2" transform="rotate(45 12 12)" />
                          <line x1="2" y1="12" x2="22" y2="12" stroke="#FAF9F6" strokeWidth="1.5" />
                        </svg>
                      </div>
                      
                      <h4 className="text-xl font-bold font-serif" style={{ fontFamily: "'Corben', serif" }}>
                        Controllo Ginocchia AI (Prevenzione LCA)
                      </h4>
                      <p className="text-sm text-[#FAF9F6]/60 leading-relaxed">
                        Analizziamo i video dei test motori tramite algoritmi avanzati per identificare segnali premonitori di instabilità e sovraccarico sul legamento crociato anteriore. Nessun sensore costoso, solo la fotocamera del tuo smartphone.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#FAF9F6]/5">
                      <span className="px-3 py-1 rounded-full bg-[#34BBC0]/10 border border-[#34BBC0]/20 text-[11px] font-medium text-[#34BBC0]">
                        Screening Video
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#DAE69A]/10 border border-[#DAE69A]/20 text-[11px] font-medium text-[#DAE69A]">
                        -60% Rischio Infortuni
                      </span>
                    </div>
                  </motion.div>

                  {/* Card 2: Tamagotchi Widget Preview */}
                  <div className="md:col-span-4 flex items-center justify-center">
                    <TamagotchiPreview />
                  </div>

                  {/* Card 3: Privacy Zero-Spia */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="md:col-span-6 p-8 rounded-[20px] glass-panel flex flex-col gap-6 justify-between group transition-all"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Icon: 4-pointed Y2K Star */}
                      <div className="w-12 h-12 rounded-xl bg-[#FAF9F6]/5 flex items-center justify-center border border-[#FAF9F6]/10 group-hover:border-[#34BBC0]/40 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#DAE69A] stroke-none">
                          <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
                        </svg>
                      </div>
                      
                      <h4 className="text-xl font-bold font-serif" style={{ fontFamily: "'Corben', serif" }}>
                        Privacy Zero-Spia (100% GDPR)
                      </h4>
                      <p className="text-sm text-[#FAF9F6]/60 leading-relaxed">
                        Le atlete si sentono protette. I dati biologici personali e i log del ciclo mestruale sono cifrati a livello locale e invisibili agli allenatori. Il sistema fornisce ai coach solo avvisi e consigli di carico aggregati.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#FAF9F6]/5">
                      <span className="px-3 py-1 rounded-full bg-[#FAF9F6]/5 border border-[#FAF9F6]/10 text-[11px] font-medium text-[#FAF9F6]/60">
                        Zero Spionaggio
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#34BBC0]/10 border border-[#34BBC0]/20 text-[11px] font-medium text-[#34BBC0]">
                        Crittografia Locale
                      </span>
                    </div>
                  </motion.div>

                  {/* Card 4: Prevenzione Personalizzata */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="md:col-span-6 p-8 rounded-[20px] glass-panel flex flex-col gap-6 justify-between group transition-all"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Icon: triangle with center dot */}
                      <div className="w-12 h-12 rounded-xl bg-[#FAF9F6]/5 flex items-center justify-center border border-[#FAF9F6]/10 group-hover:border-[#34BBC0]/40 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#FAF9F6] fill-none" strokeWidth="1.5" strokeLinecap="round">
                          <polygon points="12,4 21,19 3,19" />
                          <circle cx="12" cy="14" r="2.5" className="fill-[#34BBC0] stroke-none" />
                        </svg>
                      </div>
                      
                      <h4 className="text-xl font-bold font-serif" style={{ fontFamily: "'Corben', serif" }}>
                        Pannello Coach di Prevenzione
                      </h4>
                      <p className="text-sm text-[#FAF9F6]/60 leading-relaxed">
                        Gli allenatori non vedono dati grezzi, ma ricevono alert chiari e indicazioni pratiche (es. ridurre salti, aumentare stretching statico) basate sullo stato di prontezza e fatica accumulata dal team.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#FAF9F6]/5">
                      <span className="px-3 py-1 rounded-full bg-[#DAE69A]/10 border border-[#DAE69A]/20 text-[11px] font-medium text-[#DAE69A]">
                        Indice di Prontezza
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#34BBC0]/10 border border-[#34BBC0]/20 text-[11px] font-medium text-[#34BBC0]">
                        Actionable Insights
                      </span>
                    </div>
                  </motion.div>
                  
                </div>
              </section>
            </motion.div>
          ) : (
            /* Success / Confirmation Page */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="min-h-[80vh] flex items-center justify-center px-4 py-12"
            >
              <div className="max-w-xl w-full p-[1.5px] rounded-[20px] bg-gradient-to-br from-[#FAF9F6]/15 to-[#34BBC0]/5 shadow-2xl glass-panel">
                <div className="p-8 flex flex-col gap-6 text-[#FAF9F6]">
                  
                  {/* Success Title */}
                  <div className="text-center border-b border-[#FAF9F6]/10 pb-4">
                    <span className="text-4xl">🎉</span>
                    <h2 className="text-2xl font-serif font-bold text-[#FAF9F6] mt-3" style={{ fontFamily: "'Corben', serif" }}>
                      Sei in Lista d'Attesa!
                    </h2>
                    <p className="text-xs text-[#34BBC0] uppercase tracking-widest mt-1 font-bold">
                      Registrazione Completata
                    </p>
                  </div>

                  {/* SITG Score Panel */}
                  <div className="bg-[#080C12]/60 border border-[#FAF9F6]/10 rounded-xl p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-bold text-[#FAF9F6]/80">
                          Punteggio Skin in the Game (SITG)
                        </h4>
                        <p className="text-[10px] text-[#FAF9F6]/40 uppercase tracking-wider mt-0.5">
                          Misuratore d'Intento di Validazione
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-serif font-bold text-[#DAE69A]" style={{ fontFamily: "'Corben', serif" }}>
                          {successData.sitgScore}
                        </span>
                        <span className="text-xs text-[#FAF9F6]/40 font-bold block">Punti</span>
                      </div>
                    </div>

                    {/* Quality Badge */}
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#171F2E] border border-[#FAF9F6]/5 text-xs">
                      <span className="text-lg">🛡️</span>
                      <div>
                        <span className="font-bold block text-[#FAF9F6]/90">
                          {successData.sitgScore >= 80 
                            ? 'Lead Qualificato ad Alto Intento (B2B/Beta Cohort)' 
                            : successData.sitgScore >= 50 
                            ? 'Lead Qualificato a Medio Intento' 
                            : 'Lead a Basso Intento (Consumatore)'}
                        </span>
                        <span className="text-[10px] text-[#FAF9F6]/50">
                          {successData.sitgScore >= 80 
                            ? 'Verrai inserito nel gruppo di test prioritario.' 
                            : 'Riceverai la documentazione gratuita a breve.'}
                        </span>
                      </div>
                    </div>

                    {/* Points Breakdown */}
                    <div className="text-[11px] text-[#FAF9F6]/60 flex flex-col gap-2 pt-2 border-t border-[#FAF9F6]/5">
                      <div className="flex justify-between">
                        <span>Fornito dettagli sport e storico:</span>
                        <span className="text-[#DAE69A] font-bold">+40 pt</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fornito indirizzo email valido:</span>
                        <span className="text-[#DAE69A] font-bold">+30 pt</span>
                      </div>
                      {successData.data.email.split('@')[1] && ![
                        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
                        'live.com', 'icloud.com', 'libero.it', 'virgilio.it'
                      ].includes(successData.data.email.split('@')[1].toLowerCase()) && (
                        <div className="flex justify-between">
                          <span>Bonus Dominio Professionale/B2B:</span>
                          <span className="text-[#DAE69A] font-bold">+30 pt</span>
                        </div>
                      )}
                      {referralShared && (
                        <div className="flex justify-between text-[#34BBC0] font-bold">
                          <span>Condivisione Referral:</span>
                          <span>+30 pt</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Call to Action: Referral share */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs text-[#FAF9F6]/50 text-center">
                      Invita un altro allenatore o genitore e ottieni **+30 punti bonus** per scalare la lista d'attesa e sbloccare la beta prima di tutti!
                    </p>
                    <button
                      onClick={handleShareReferral}
                      disabled={referralShared}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-sm text-center transition-all ${
                        referralShared 
                          ? 'bg-[#171F2E] text-[#FAF9F6]/40 border border-[#FAF9F6]/10 cursor-not-allowed'
                          : 'bg-[#34BBC0] text-[#080C12] hover:bg-[#34BBC0]/95 active:scale-98 shadow-md'
                      }`}
                    >
                      {referralShared ? 'Link Condiviso! +30 Punti Aggiunti ✦' : 'Copia Link di Invito (+30 XP) ✦'}
                    </button>
                  </div>

                  {/* Back Link */}
                  <button
                    onClick={resetFlow}
                    className="text-xs text-[#FAF9F6]/40 hover:text-[#FAF9F6]/80 text-center transition-colors hover:underline"
                  >
                    Torna alla Home Page
                  </button>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#FAF9F6]/5 py-12 px-6 sm:px-12 bg-[#080C12] text-xs text-[#FAF9F6]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-serif font-bold text-[#FAF9F6]" style={{ fontFamily: "'Corben', serif" }}>
            BAB
          </span>
          <span>© {new Date().getFullYear()} Breaking All Barriers. Tutti i diritti riservati.</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#FAF9F6] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#FAF9F6] transition-colors">Termini di Servizio</a>
          <a href="#" className="hover:text-[#FAF9F6] transition-colors">Contatti</a>
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
