/**
 * @file      Doodle.tsx
 * @summary   Set di doodle disegnati a mano (stessa "mano": tratto irregolare,
 *            linecap tondo) per la pagina Chi siamo — stelle, frecce, cerchi,
 *            sottolineature, cuori, scarabocchi. Decorativi: sempre aria-hidden.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import type { CSSProperties } from 'react';

export type DoodleName =
  | 'sparkle' | 'star' | 'arrow' | 'arrowCurl' | 'circle'
  | 'underline' | 'heart' | 'squiggle' | 'burst' | 'spiral';

interface DoodleProps {
  name: DoodleName;
  className?: string;
  style?: CSSProperties;
  /** Larghezza tratto (default 3). I doodle ereditano il colore da `currentColor`. */
  stroke?: number;
  /** Per cerchi/sottolineature usati come overlay: deforma per riempire il box. */
  stretch?: boolean;
}

/** viewBox + path(s) per ogni doodle. Tratto a mano: curve leggermente irregolari. */
const PATHS: Record<DoodleName, { vb: string; el: React.ReactNode; fill?: boolean }> = {
  // Stella a 4 punte (sparkle) — riempita
  sparkle: {
    vb: '0 0 24 24',
    fill: true,
    el: <path d="M12 1.5c.9 5.5 4.1 8.7 9.6 9.6 .8.13.8 1.27 0 1.4-5.5.9-8.7 4.1-9.6 9.6-.13.8-1.27.8-1.4 0-.9-5.5-4.1-8.7-9.6-9.6-.8-.13-.8-1.27 0-1.4 5.5-.9 8.7-4.1 9.6-9.6.13-.8 1.27-.8 1.4 0Z" />,
  },
  // Stella a 5 punte, leggermente storta
  star: {
    vb: '0 0 24 24',
    fill: true,
    el: <path d="M12 2.2 14.9 8.6 21.6 9.2 16.6 13.8 18.2 20.4 12 16.9 5.8 20.6 7.2 13.9 2.2 9.4 9 8.7Z" />,
  },
  // Freccia curva che indica verso il basso-destra
  arrow: {
    vb: '0 0 40 40',
    el: <>
      <path d="M4 7C19 5 31 13 34 30" />
      <path d="M34 30 26.5 28.5M34 30 31.5 22.5" />
    </>,
  },
  // Freccia con ricciolo (più giocosa)
  arrowCurl: {
    vb: '0 0 48 40',
    el: <>
      <path d="M3 14c6-8 14-6 14 1 0 5-7 6-7 0 0-7 9-9 17-4" />
      <path d="M40 9 44 11.5M44 11.5 41.5 16" />
    </>,
  },
  // Cerchio a mano (aperto), per cerchiare una parola
  circle: {
    vb: '0 0 100 60',
    el: <path d="M53 4C78 2 95 16 93 33 91 50 67 57 42 55 18 53 6 39 9 24 12 11 31 5 58 7" />,
  },
  // Doppia sottolineatura mossa
  underline: {
    vb: '0 0 100 16',
    el: <>
      <path d="M2 5C30 1 70 1 98 6" />
      <path d="M5 12C34 8 66 8 95 13" />
    </>,
  },
  // Cuore disegnato a mano — riempito
  heart: {
    vb: '0 0 24 24',
    fill: true,
    el: <path d="M12 21C2.5 13.5 3 4.5 9 4.5c2.4 0 3 2.3 3 3.4.0-1.1.6-3.4 3-3.4 6 0 6.5 9-3 16.5Z" />,
  },
  // Zigzag/onda
  squiggle: {
    vb: '0 0 60 14',
    el: <path d="M2 8Q8 1 14 8T26 8T38 8T50 8T58 8" />,
  },
  // Esplosione/raggi (enfasi)
  burst: {
    vb: '0 0 32 32',
    el: <>
      <path d="M16 2v6M16 24v6M2 16h6M24 16h6M6 6l4 4M22 22l4 4M26 6l-4 4M10 22l-4 4" />
    </>,
  },
  // Spirale
  spiral: {
    vb: '0 0 32 32',
    el: <path d="M16 16c0-2 3-2 3 1 0 4-5 4-6-1-1-6 6-7 9 0 3 8-7 11-12 4" />,
  },
};

export default function Doodle({ name, className, style, stroke = 3, stretch = false }: DoodleProps) {
  const d = PATHS[name];
  return (
    <svg
      viewBox={d.vb}
      className={className}
      style={style}
      fill={d.fill ? 'currentColor' : 'none'}
      stroke={d.fill ? 'none' : 'currentColor'}
      strokeWidth={d.fill ? undefined : stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio={stretch ? 'none' : 'xMidYMid meet'}
      vectorEffect={stretch ? 'non-scaling-stroke' : undefined}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {d.el}
    </svg>
  );
}
