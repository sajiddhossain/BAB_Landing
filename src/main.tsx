/**
 * @file      main.tsx
 * @summary   Entry point per l'applicazione React
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 * @notice    Questo codice è di proprietà intellettuale dell'autore. 
 *            L'utilizzo, la modifica o la distribuzione non autorizzata 
 *            sono severamente vietati in assenza di accordi contrattuali scritti.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import './i18n'
import App from './App.tsx'
import { printSignature } from './lib/signature'

// Firma dell'architettura: una riga in console su ogni pagina, prima del mount.
printSignature()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user" => rispetta prefers-reduced-motion (ferma marquee e animazioni) */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
