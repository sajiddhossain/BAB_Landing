/**
 * @file BabProvider.tsx
 * @summary Wrapper di contesto per le preview del design system (claude.ai/design).
 *          Fornisce i18n (I18nextProvider) e disabilita le animazioni
 *          (MotionConfig reducedMotion="always") così le card renderizzano
 *          deterministicamente in headless. Non usato dall'app runtime.
 * @author Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MotionConfig } from 'framer-motion';
import i18n from '../i18n';

export function BabProvider({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <MotionConfig reducedMotion="always">{children}</MotionConfig>
    </I18nextProvider>
  );
}
