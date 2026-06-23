/**
 * @file BabBuddy.tsx
 * @summary Il "Buddy" BAB: compagno SVG espressivo, mobile-friendly. Condiviso fra la
 * demo /app (loop di cura) e la sezione /features, così la mascotte è coerente.
 */
import { motion } from 'framer-motion';

export type BuddyMood = 'sleepy' | 'meh' | 'ok' | 'happy' | 'star';

const INK = '#0F0F12';
const MOOD_BG: Record<BuddyMood, string> = {
 sleepy: '#E8E4D8',
 meh: '#FFE3D1',
 ok: '#8FD4E8',
 happy: '#D2EC7C',
 star: '#FFC042',
};

interface BabBuddyProps {
 mood: BuddyMood;
 /** Cambia valore per rieseguire l'animazione di entrata (es. su un'azione). */
 bounce?: number;
 size?: number;
 className?: string;
}

export default function BabBuddy({ mood, bounce = 0, size = 120, className = '' }: BabBuddyProps) {
 const eyes =
 mood === 'sleepy' ? (
 <>
 <line x1="30" y1="46" x2="42" y2="46" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
 <line x1="58" y1="46" x2="70" y2="46" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
 </>
 ) : mood === 'star' ? (
 <>
 <path d="M30 47 L36 40 L42 47" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
 <path d="M58 47 L64 40 L70 47" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
 </>
 ) : mood === 'meh' ? (
 <>
 <circle cx="36" cy="46" r="3.6" fill={INK} />
 <circle cx="64" cy="46" r="3.6" fill={INK} />
 </>
 ) : (
 <>
 <circle cx="36" cy="44" r="5" fill={INK} />
 <circle cx="64" cy="44" r="5" fill={INK} />
 </>
 );

 const mouth =
 mood === 'sleepy' || mood === 'meh' ? (
 <path d="M42 72 Q50 67 58 72" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
 ) : mood === 'star' ? (
 <path d="M34 64 Q50 86 66 64 Z" fill={INK} />
 ) : (
 <path d="M34 66 Q50 80 66 66" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
 );

 return (
 <motion.svg
 key={bounce}
 initial={{ scale: 0.9, y: 4 }}
 animate={{ scale: 1, y: 0 }}
 transition={{ type: 'spring', stiffness: 360, damping: 12 }}
 width={size}
 height={size}
 viewBox="0 0 100 100"
 role="img"
 aria-label="Il tuo Buddy BAB"
 className={`shrink-0 drop-shadow-[4px_4px_0_#0F0F12] ${className}`}
 >
 <rect x="6" y="9" width="88" height="82" rx="26" fill={MOOD_BG[mood]} stroke={INK} strokeWidth="4.5" />
 <circle cx="24" cy="62" r="4" fill="#FF8FB1" opacity="0.85" />
 <circle cx="76" cy="62" r="4" fill="#FF8FB1" opacity="0.85" />
 {mood === 'star' && <text x="50" y="6" textAnchor="middle" fontSize="14">👑</text>}
 {eyes}
 {mouth}
 </motion.svg>
 );
}
