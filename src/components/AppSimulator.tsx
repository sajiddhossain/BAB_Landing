/**
 * @file      AppSimulator.tsx
 * @summary   Componente UI per BAB (Breaking All Barriers)
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 * @notice    Questo codice è di proprietà intellettuale dell'autore. 
 *            L'utilizzo, la modifica o la distribuzione non autorizzata 
 *            sono severamente vietati in assenza di accordi contrattuali scritti.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppSimulator() {
  const [selectedBuddy, setSelectedBuddy] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'pianoB' | 'me'>('home');

  const buddies = [
    { id: 'pulcino', icon: '[ °_° ]', name: 'PULCINO', bg: 'bg-[#FFDE4D]' },
    { id: 'gattino', icon: '(=^･^=)', name: 'GATTINO', bg: 'bg-[#FFE3D1]' },
    { id: 'volpina', icon: '(>°-°<)', name: 'VOLPINA', bg: 'bg-[#EBE5FF]' },
    { id: 'coniglietto', icon: '[ =_= ]', name: 'CONIGLIO', bg: 'bg-[#D1FFEF]' }
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-[100dvh] text-[#0F0F12] px-4 py-8 relative">
      
      {!selectedBuddy ? (
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="w-full max-w-sm mx-auto flex flex-col items-center justify-center flex-1 h-full pt-10">
          <div className="bg-[#34BBC0] border-[3px] border-black px-4 py-2 mb-6 font-black uppercase text-sm shadow-[4px_4px_0_0_#000] rotate-2">
            Inizializzazione...
          </div>
          <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl font-black text-center mb-8 uppercase leading-none">
            Scegli il tuo buddy.
          </h2>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            {buddies.map(buddy => (
              <motion.button 
                key={buddy.id}
                onClick={() => setSelectedBuddy(buddy.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className={`y2k-brutal-card ${buddy.bg} aspect-square flex flex-col items-center justify-center gap-4 hover:shadow-[8px_8px_0_0_#000] transition-all`}
              >
                <span className="text-3xl font-mono tracking-tighter font-black">{buddy.icon}</span>
                <span className="font-black text-xs tracking-widest uppercase bg-white border-2 border-black px-2 py-1">{buddy.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="w-full h-[85dvh] max-w-sm mx-auto bg-white border-[4px] border-black rounded-[32px] shadow-[12px_12px_0_0_#0F0F12] flex flex-col overflow-hidden relative">
          
          {/* Hardware Device Header */}
          <div className="h-10 w-full bg-[#EBE5FF] border-b-[3px] border-black flex justify-between items-center px-6">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-black shadow-[1px_1px_0_0_#000]"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-black shadow-[1px_1px_0_0_#000]"></div>
             </div>
             <span className="font-black text-[10px] uppercase tracking-widest bg-white border-2 border-black px-2 py-0.5">BAB OS v1.0</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
             
             <div className="absolute top-6 left-1/2 -translate-x-1/2">
               <span className="px-4 py-1.5 bg-[#FFDE4D] border-[3px] border-black text-xs font-black uppercase tracking-widest shadow-[4px_4px_0_0_#000]">Oggi</span>
             </div>

             <AnimatePresence mode="wait">
               {activeTab === 'home' && (
                 <motion.div key="home" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="flex flex-col items-center w-full">
                   <div className="w-48 h-48 bg-white border-[4px] border-black rounded-3xl flex items-center justify-center shadow-[6px_6px_0_0_#000] mb-8 relative">
                     <motion.div 
                       animate={{ y: [0, -10, 0] }} 
                       transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                       className="text-5xl font-mono text-black font-black"
                     >
                       {buddies.find(b => b.id === selectedBuddy)?.icon}
                     </motion.div>
                     <div className="absolute -bottom-4 bg-[#DAE69A] border-2 border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0_0_#000]">
                       Follicolare
                     </div>
                   </div>
                   <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl font-black mb-3 text-center uppercase">Tutto OK!</h3>
                   <p className="text-sm font-bold text-center px-4 border-[3px] border-black bg-white p-4 shadow-[4px_4px_0_0_#000]">L'energia è al top. Spingi al massimo oggi in allenamento.</p>
                 </motion.div>
               )}

               {activeTab === 'pianoB' && (
                 <motion.div key="pianoB" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="flex flex-col items-center w-full">
                   <div className="text-6xl mb-4">⚠️</div>
                   <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl font-black mb-6 uppercase">Task Speciale</h3>
                   
                   <div className="w-full bg-[#FFE3D1] border-[3px] border-black rounded-xl p-6 text-left shadow-[6px_6px_0_0_#000]">
                     <span className="text-[10px] font-black bg-black text-white px-2 py-1 mb-3 inline-block uppercase tracking-widest shadow-[2px_2px_0_0_#34BBC0]">
                       +50 XP Sbloccati
                     </span>
                     <h4 className="text-xl font-black mb-2 uppercase">10 min di stretching</h4>
                     <p className="text-xs font-bold mb-6">HRV bassa. Questa task sostituisce il potenziamento di oggi.</p>
                     <button className="y2k-btn bg-white w-full shadow-[4px_4px_0_0_#000] border-[3px] border-black py-2">Inizia Ora</button>
                   </div>
                 </motion.div>
               )}

               {activeTab === 'me' && (
                 <motion.div key="me" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="flex flex-col w-full h-full justify-start pt-16">
                   <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl font-black mb-6 uppercase">Database</h3>
                   <div className="space-y-4">
                     <div className="bg-white border-[3px] border-black shadow-[4px_4px_0_0_#000] p-4 flex justify-between items-center">
                       <span className="text-sm font-black uppercase">Fase</span>
                       <span className="text-xs bg-[#DAE69A] border-2 border-black px-2 py-1 font-black uppercase shadow-[2px_2px_0_0_#000]">Follicolare</span>
                     </div>
                     <div className="bg-white border-[3px] border-black shadow-[4px_4px_0_0_#000] p-4 flex justify-between items-center">
                       <span className="text-sm font-black uppercase">Qualità Sonno</span>
                       <span className="text-xs bg-[#FFDE4D] border-2 border-black px-2 py-1 font-black uppercase shadow-[2px_2px_0_0_#000]">92%</span>
                     </div>
                     <div className="bg-white border-[3px] border-black shadow-[4px_4px_0_0_#000] p-4 flex justify-between items-center">
                       <span className="text-sm font-black uppercase">Infortuni</span>
                       <span className="text-xs bg-[#EBE5FF] border-2 border-black px-2 py-1 font-black uppercase shadow-[2px_2px_0_0_#000]">Nessuno</span>
                     </div>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* LCD Menu Bottom - Neobrutalism Hardware Style */}
          <div className="h-24 w-full bg-[#D1FFEF] border-t-[4px] border-black flex items-center justify-around px-4">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center w-16 h-16 border-[3px] border-black transition-all ${activeTab === 'home' ? 'bg-[#FFDE4D] shadow-[inset_4px_4px_0_rgba(0,0,0,0.2)] translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#000] hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000]'}`}
            >
              <span className="text-xl font-black mb-1">H</span>
              <span className="text-[9px] font-black uppercase">Home</span>
            </button>
            <button 
              onClick={() => setActiveTab('pianoB')}
              className={`flex flex-col items-center justify-center w-16 h-16 border-[3px] border-black transition-all ${activeTab === 'pianoB' ? 'bg-[#FFDE4D] shadow-[inset_4px_4px_0_rgba(0,0,0,0.2)] translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#000] hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000]'}`}
            >
              <span className="text-xl font-black mb-1">!</span>
              <span className="text-[9px] font-black uppercase">Plan B</span>
            </button>
            <button 
              onClick={() => setActiveTab('me')}
              className={`flex flex-col items-center justify-center w-16 h-16 border-[3px] border-black transition-all ${activeTab === 'me' ? 'bg-[#FFDE4D] shadow-[inset_4px_4px_0_rgba(0,0,0,0.2)] translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#000] hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000]'}`}
            >
              <span className="text-xl font-black mb-1">♥</span>
              <span className="text-[9px] font-black uppercase">Me</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
