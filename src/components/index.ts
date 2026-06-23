/**
 * @file index.ts
 * @summary Barrel entry per il converter design-sync (claude.ai/design).
 *          Ri-esporta i componenti mappati come export con nome così il
 *          converter li individua. NON usato dall'app runtime (che importa
 *          i componenti direttamente).
 * @author Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
export { default as About } from './About';
export { default as AppSimulator } from './AppSimulator';
export { default as ClubLeadForm } from './ClubLeadForm';
export { default as CoachDashboard } from './CoachDashboard';
export { default as FAQ } from './FAQ';
export { default as Features } from './Features';
export { default as Home } from './Home';
export { default as WaitlistModal, WaitlistPanel } from './WaitlistModal';
