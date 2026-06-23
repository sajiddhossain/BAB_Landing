/**
 * @file FlagIcon.tsx
 * @summary Bandiere lingua come SVG vettoriali "a tutto quadrato": riempiono il
 * box fino ai bordi e vengono ritagliate a cerchio dal container
 * (rounded-full + overflow-hidden). Niente PNG/trasparenza → nessun
 * disallineamento del cerchio, nitide a ogni dimensione, sistema pulito.
 * @author Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */

export type FlagLang = 'it' | 'en' | 'fr';

interface FlagIconProps {
 lang: FlagLang;
 className?: string;
}

/** Tricolore a bande verticali (Italia / Francia). 48×48, riempie il quadrato. */
function Tricolore({ left, mid, right }: { left: string; mid: string; right: string }) {
 return (
 <>
 <rect x="0" y="0" width="16" height="48" fill={left} />
 <rect x="16" y="0" width="16" height="48" fill={mid} />
 <rect x="32" y="0" width="16" height="48" fill={right} />
 </>
 );
}

/** Union Jack semplificata ma riconoscibile (croce di S. Giorgio + saltire). */
function UnionJack() {
 return (
 <>
 <rect x="0" y="0" width="48" height="48" fill="#012169" />
 {/* Saltire (diagonali): bianco spesso, poi rosso sottile sopra */}
 <g strokeLinecap="butt">
 <line x1="0" y1="0" x2="48" y2="48" stroke="#FFFFFF" strokeWidth="9" />
 <line x1="48" y1="0" x2="0" y2="48" stroke="#FFFFFF" strokeWidth="9" />
 <line x1="0" y1="0" x2="48" y2="48" stroke="#C8102E" strokeWidth="3.5" />
 <line x1="48" y1="0" x2="0" y2="48" stroke="#C8102E" strokeWidth="3.5" />
 </g>
 {/* Croce di San Giorgio: bianco largo, rosso sopra */}
 <rect x="18" y="0" width="12" height="48" fill="#FFFFFF" />
 <rect x="0" y="18" width="48" height="12" fill="#FFFFFF" />
 <rect x="20" y="0" width="8" height="48" fill="#C8102E" />
 <rect x="0" y="20" width="48" height="8" fill="#C8102E" />
 </>
 );
}

export default function FlagIcon({ lang, className = '' }: FlagIconProps) {
 return (
 <svg
 viewBox="0 0 48 48"
 className={className}
 preserveAspectRatio="xMidYMid slice"
 role="img"
 aria-hidden="true"
 focusable="false"
 xmlns="http://www.w3.org/2000/svg"
 >
 {lang === 'it' && <Tricolore left="#009246" mid="#FFFFFF" right="#CE2B37" />}
 {lang === 'fr' && <Tricolore left="#0055A4" mid="#FFFFFF" right="#EF4135" />}
 {lang === 'en' && <UnionJack />}
 </svg>
 );
}
