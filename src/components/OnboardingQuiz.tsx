import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface QuizData {
  sport: string;
  concern: string;
  privacy: string;
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
    concern: '',
    privacy: '',
    email: '',
  });
  const [emailError, setEmailError] = useState<string>('');

  const handleSelectSport = (sport: string) => {
    setFormData((prev) => ({ ...prev, sport }));
    triggerTrackingEvent('Quiz_Step1_Submit', { sport });
    setStep(2);
  };

  const handleSelectConcern = (concern: string) => {
    setFormData((prev) => ({ ...prev, concern }));
    triggerTrackingEvent('Quiz_Step2_Submit', { concern });
    setStep(3);
  };

  const handleSelectPrivacy = (privacy: string) => {
    setFormData((prev) => ({ ...prev, privacy }));
    triggerTrackingEvent('Quiz_Step3_Submit', { privacy });
    setStep(4);
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

    let sitgScore = 0;

    if (formData.sport) sitgScore += 20;
    if (formData.concern) sitgScore += 20;
    if (formData.privacy) sitgScore += 10;

    if (formData.email) {
      sitgScore += 30; // +30 points for email

      // B2B Domain Check
      const domain = formData.email.split('@')[1]?.toLowerCase();
      const genericDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
        'live.com', 'icloud.com', 'libero.it', 'virgilio.it'
      ];
      
      if (domain && !genericDomains.includes(domain)) {
        sitgScore += 30; // +30 points B2B bonus (club/school/company)
      }
    }

    triggerTrackingEvent('Quiz_Step4_Submit', { email: formData.email });
    
    if (sitgScore > 50) {
      triggerTrackingEvent('Lead_Qualified', { sitgScore });
    }

    // Simulated API call using VITE_API_URL
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
    <div 
      className="relative max-w-lg w-full bg-white border-[3px] border-black rounded-[32px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-title"
    >
      <div className="w-full p-8 flex flex-col gap-6 text-[#0F0F12]">
        
        {/* Header Row */}
        <div className="flex justify-between items-center border-b-2 border-black pb-4">
          <div>
            <h3 id="quiz-title" className="font-serif font-black text-xl text-[#0F0F12]">
              Analisi di Rischio
            </h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-black mt-0.5">
              Protocollo di Protezione BAB
            </p>
          </div>
          {onClose && (
            <button 
              onClick={onClose} 
              aria-label="Chiudi il quiz"
              className="w-8 h-8 rounded-full border-2 border-black bg-[#EBE5FF] flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-neutral-100 cursor-pointer"
            >
              &times;
            </button>
          )}
        </div>

        {/* Progress Stars Indicators (4 stars) */}
        <div className="flex gap-2 justify-center py-1 text-[#FFDE4D] text-xl font-black tracking-widest" aria-label={`Step ${step} di 4`}>
          <span aria-hidden="true">{step >= 1 ? '✦' : '✧'}</span>
          <span aria-hidden="true">{step >= 2 ? '✦' : '✧'}</span>
          <span aria-hidden="true">{step >= 3 ? '✦' : '✧'}</span>
          <span aria-hidden="true">{step >= 4 ? '✦' : '✧'}</span>
        </div>

        {/* Quiz Steps Container */}
        <div className="min-h-[260px] flex flex-col justify-center overflow-hidden">
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
                <h4 id="question-1" className="text-sm font-black text-[#0F0F12] text-center mb-2">
                  1. Di quale sport ti occupi principalmente?
                </h4>
                <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-labelledby="question-1">
                  {['Calcio Femminile', 'Pallavolo', 'Basket', 'Altro Sport di Squadra'].map((sport) => (
                    <button
                      key={sport}
                      role="radio"
                      aria-checked={formData.sport === sport}
                      onClick={() => handleSelectSport(sport)}
                      className="py-4 px-3 text-xs sm:text-sm font-black bg-white hover:bg-[#FFE3D1] border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all text-center flex items-center justify-center min-h-[56px] focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none cursor-pointer"
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Main Concern */}
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
                <h4 id="question-2" className="text-sm font-black text-[#0F0F12] text-center mb-2">
                  2. Qual è la tua più grande preoccupazione riguardo alla crescita delle atlete?
                </h4>
                <div className="flex flex-col gap-2.5" role="radiogroup" aria-labelledby="question-2">
                  {[
                    { label: 'Il rischio di infortuni gravi (es. crociato LCA)', val: 'Infortuni LCA' },
                    { label: 'Il drop-out precoce (le ragazze che mollano lo sport tra i 12 e i 16 anni)', val: 'Drop-out' },
                    { label: 'La difficoltà di comunicazione sui temi biologici e stanchezza', val: 'Comunicazione' },
                    { label: 'La gestione del sovraccarico fisico durante i campionati', val: 'Sovraccarico' }
                  ].map((option) => (
                    <button
                      key={option.val}
                      role="radio"
                      aria-checked={formData.concern === option.val}
                      onClick={() => handleSelectConcern(option.val)}
                      className="w-full py-3.5 px-4 text-xs sm:text-sm font-black bg-white hover:bg-[#EBE5FF] border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all text-left flex justify-between items-center focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none cursor-pointer"
                    >
                      <span>{option.label}</span>
                      <span className="text-[#34BBC0] shrink-0 ml-2" aria-hidden="true">✦</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Privacy Preference */}
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
                <h4 id="question-3" className="text-sm font-black text-[#0F0F12] text-center mb-2">
                  3. BAB protegge la privacy delle atlete. Come preferisci che vengano gestiti i dati?
                </h4>
                <div className="flex flex-col gap-3" role="radiogroup" aria-labelledby="question-3">
                  {[
                    { label: 'Solo dati aggregati (Voglio vedere la stanchezza generale, non i dati personali)', val: 'Aggregati' },
                    { label: 'Solo alert di prevenzione infortuni (Solo chi rischia sovraccarichi)', val: 'Alert Prevenzione' }
                  ].map((option) => (
                    <button
                      key={option.val}
                      role="radio"
                      aria-checked={formData.privacy === option.val}
                      onClick={() => handleSelectPrivacy(option.val)}
                      className="w-full py-4 px-5 text-xs sm:text-sm font-black bg-white hover:bg-[#FFE3D1] border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all text-left flex justify-between items-center focus-visible:ring-2 focus-visible:ring-[#34BBC0] focus-visible:outline-none cursor-pointer"
                    >
                      <span>{option.label}</span>
                      <span className="text-[#34BBC0] shrink-0 ml-2" aria-hidden="true">✦</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Email Entry */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                <div className="text-center mb-2">
                  <h4 className="text-sm font-black text-[#0F0F12]">
                    4. Ricevi la guida prima di tutti
                  </h4>
                  <p className="text-xs text-neutral-500 font-semibold mt-1">
                    Riceverai l'anteprima gratuita su come evitare l'abbandono sportivo e proteggere le ginocchia delle atlete.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="user-email" className="sr-only">Indirizzo Email</label>
                    <input
                      id="user-email"
                      type="email"
                      required
                      placeholder="Inserisci la tua email migliore..."
                      value={formData.email}
                      onChange={handleEmailChange}
                      className="w-full p-4 bg-white border-2 border-black focus:border-[#34BBC0] outline-none rounded-xl text-sm font-semibold transition-all text-center focus-visible:ring-2 focus-visible:ring-[#34BBC0]"
                    />
                    {emailError && (
                      <span className="text-xs text-red-500 font-bold text-center mt-1" role="alert">
                        {emailError}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full neo-btn py-4 bg-[#FFDE4D] text-black font-black uppercase text-sm"
                  >
                    Ricevi la guida ✦
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
