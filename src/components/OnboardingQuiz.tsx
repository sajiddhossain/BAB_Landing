import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface QuizData {
  sport: string;
  injuryHistory: string;
  email: string;
}

interface OnboardingQuizProps {
  onSubmitComplete: (data: QuizData, sitgScore: number) => void;
  onClose?: () => void;
}

// Helper function for simulated Pixel / GA tracking
const triggerTrackingEvent = (eventName: string, data?: any) => {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  console.log(`%c[Tracking] ${eventName}`, 'color: #34BBC0; font-weight: bold;', {
    metaPixelId: pixelId,
    gaMeasurementId: gaId,
    payload: data,
  });
  if (typeof window !== 'undefined') {
    // @ts-ignore
    if (window.fbq) window.fbq('trackCustom', eventName, data);
    // @ts-ignore
    if (window.gtag) window.gtag('event', eventName, data);
  }
};

export const OnboardingQuiz: React.FC<OnboardingQuizProps> = ({
  onSubmitComplete,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<QuizData>({
    sport: '',
    injuryHistory: '',
    email: '',
  });
  const [emailError, setEmailError] = useState<string>('');

  const handleSelectSport = (sport: string) => {
    setFormData((prev) => ({ ...prev, sport }));
    triggerTrackingEvent('Quiz_Step1_Submit', { sport });
    setStep(2);
  };

  const handleSelectInjuryHistory = (injuryHistory: string) => {
    setFormData((prev) => ({ ...prev, injuryHistory }));
    triggerTrackingEvent('Quiz_Step2_Submit', { injuryHistory });
    setStep(3);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
    if (emailError) setEmailError('');
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError('Inserisci un indirizzo email valido.');
      return;
    }

    /* --------------------------------------------------------------------------
       SKIN IN THE GAME (SITG) SCORE CALCULATION
       --------------------------------------------------------------------------
       This algorithm calculates user commitment intensity to filter low-quality
       leads and prioritize B2B (clubs/coaches) and high-intent parents.
       -------------------------------------------------------------------------- */
    let sitgScore = 0;

    // 1. Core Quiz Completion (Engagement Indicator)
    if (formData.sport) {
      sitgScore += 20; // +20 points for specifying the sport
    }
    if (formData.injuryHistory) {
      sitgScore += 20; // +20 points for answering the injury history question
    }

    // 2. Email Validation & Qualification
    if (formData.email) {
      sitgScore += 30; // +30 points for a valid email input

      // B2B / Professional Domain Check
      const domain = formData.email.split('@')[1]?.toLowerCase();
      const genericDomains = [
        'gmail.com',
        'yahoo.com',
        'hotmail.com',
        'outlook.com',
        'live.com',
        'icloud.com',
        'libero.it',
        'virgilio.it',
      ];
      
      if (domain && !genericDomains.includes(domain)) {
        // High commitment indicator: business, school, or sports club domain (B2B verification)
        sitgScore += 30; // +30 points bonus
      }
    }

    // Pass data and final SITG score to parent callback for dashboard telemetry or API dispatch
    triggerTrackingEvent('Quiz_Step3_Submit', { email: formData.email });
    
    if (sitgScore > 50) {
      triggerTrackingEvent('Lead_Qualified', { sitgScore });
    }

    // Simulated API call to VITE_API_URL
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(`%c[API Request] Sending lead to ${apiUrl}/waitlist`, 'color: #DAE69A; font-weight: bold;', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { ...formData, sitgScore }
    });

    onSubmitComplete(formData, sitgScore);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="relative max-w-lg w-full p-[1.5px] rounded-[20px] bg-gradient-to-br from-[#FAF9F6]/15 to-[#34BBC0]/5 shadow-2xl overflow-hidden">
      
      {/* Glassmorphism Inner Container */}
      <div 
        className="w-full bg-[#171F2E]/75 backdrop-blur-[20px] rounded-[19px] p-8 flex flex-col gap-6 text-[#FAF9F6]"
      >
        
        {/* Header Row */}
        <div className="flex justify-between items-center border-b border-[#FAF9F6]/10 pb-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#FAF9F6]" style={{ fontFamily: "'Corben', serif" }}>
              Analisi di Rischio
            </h3>
            <p className="text-[10px] text-[#FAF9F6]/40 uppercase tracking-widest mt-0.5">
              Protocollo di Protezione BAB
            </p>
          </div>
          {onClose && (
            <button 
              onClick={onClose} 
              className="text-[#FAF9F6]/40 hover:text-[#FAF9F6] transition-colors text-lg"
            >
              &times;
            </button>
          )}
        </div>

        {/* Progress Stars Indicators (Y2K style) */}
        <div className="flex gap-2 justify-center py-1 text-[#DAE69A] text-lg font-bold tracking-widest">
          <span>{step >= 1 ? '✦' : '✧'}</span>
          <span>{step >= 2 ? '✦' : '✧'}</span>
          <span>{step >= 3 ? '✦' : '✧'}</span>
        </div>

        {/* Quiz Steps Container */}
        <div className="min-h-[220px] flex flex-col justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Sport Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                <h4 className="text-sm font-bold text-[#FAF9F6]/80 text-center mb-2">
                  1. Che sport seguite o pratica tua figlia?
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {['Pallavolo', 'Calcio', 'Basket', 'Altro'].map((sport) => (
                    <motion.button
                      key={sport}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectSport(sport)}
                      className="py-4 px-6 text-sm font-bold bg-[#FAF9F6]/5 hover:bg-[#FAF9F6]/10 border border-[#FAF9F6]/10 hover:border-[#34BBC0]/40 rounded-xl transition-all text-center"
                    >
                      {sport}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Injury History */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                <h4 className="text-sm font-bold text-[#FAF9F6]/80 text-center mb-2">
                  2. Vi è capitato di gestire atlete ferme per lunghi mesi a causa di infortuni o forti dolori?
                </h4>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Sì, purtroppo', value: 'Si' },
                    { label: 'Raramente', value: 'Raramente' },
                    { label: 'Mai finora', value: 'Mai' }
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectInjuryHistory(option.value)}
                      className="w-full py-4 px-6 text-sm font-bold bg-[#FAF9F6]/5 hover:bg-[#FAF9F6]/10 border border-[#FAF9F6]/10 hover:border-[#34BBC0]/40 rounded-xl transition-all text-left flex justify-between items-center"
                    >
                      <span>{option.label}</span>
                      <span className="text-[#DAE69A]">✦</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Email Opt-In */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                <div className="text-center mb-2">
                  <h4 className="text-sm font-bold text-[#FAF9F6]/80">
                    3. Ricevi la guida pratica di BAB
                  </h4>
                  <p className="text-xs text-[#FAF9F6]/50 mt-1">
                    Riceverai l'anteprima gratuita su come evitare l'abbandono sportivo e proteggere le ginocchia delle atlete.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <input
                      type="email"
                      required
                      placeholder="Inserisci la tua email migliore..."
                      value={formData.email}
                      onChange={handleEmailChange}
                      className="w-full p-4 bg-[#FAF9F6]/5 border border-[#FAF9F6]/10 focus:border-[#34BBC0]/50 outline-none rounded-xl text-sm transition-all text-center"
                    />
                    {emailError && (
                      <span className="text-xs text-red-400 text-center mt-1">
                        {emailError}
                      </span>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 text-sm font-bold bg-[#34BBC0] text-[#080C12] rounded-xl hover:bg-[#34BBC0]/95 transition-all text-center flex justify-center items-center gap-1"
                  >
                    Ricevi la guida ✦
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
