/**
 * @file      analytics.ts
 * @summary   GA4 + Meta Pixel, predisposti ma SPENTI finché in `.env` non ci sono ID reali.
 *            I valori placeholder/dummy vengono ignorati: nessun tag viene caricato.
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID

function isRealGaId(v: string | undefined): v is string {
  return !!v && /^G-[A-Z0-9]{4,}$/i.test(v) && !/dummy|your_/i.test(v)
}

function isRealPixelId(v: string | undefined): v is string {
  return !!v && /^\d{6,}$/.test(v) && !/dummy/i.test(v)
}

export const gaEnabled = isRealGaId(GA_ID)
export const pixelEnabled = isRealPixelId(PIXEL_ID)
export const analyticsEnabled = gaEnabled || pixelEnabled

interface FbqStub {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  loaded: boolean
  version: string
  push: FbqStub
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    _fbq?: (...args: unknown[]) => void
  }
}

let initialized = false

/** Carica gli script di tracciamento. No-op se nessun ID reale è configurato. */
export function initAnalytics(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  if (gaEnabled) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    const gtag = (...args: unknown[]): void => {
      window.dataLayer!.push(args)
    }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', GA_ID, { send_page_view: false })
  }

  if (pixelEnabled) {
    if (!window.fbq) {
      const stub = ((...args: unknown[]): void => {
        if (stub.callMethod) stub.callMethod(...args)
        else stub.queue.push(args)
      }) as unknown as FbqStub
      stub.queue = []
      stub.loaded = true
      stub.version = '2.0'
      stub.push = stub
      window.fbq = stub
      if (!window._fbq) window._fbq = stub
      const t = document.createElement('script')
      t.async = true
      t.src = 'https://connect.facebook.net/en_US/fbevents.js'
      const first = document.getElementsByTagName('script')[0]
      first.parentNode?.insertBefore(t, first)
    }
    window.fbq?.('init', PIXEL_ID)
    window.fbq?.('track', 'PageView')
  }
}

/** Page view su cambio rotta (hash). */
export function trackPageview(path: string): void {
  if (gaEnabled) window.gtag?.('event', 'page_view', { page_path: path })
  if (pixelEnabled) window.fbq?.('track', 'PageView')
}

/** Evento custom del funnel (es. lead_submit, demo_request, quiz_step1). */
export function trackEvent(name: string, props: Record<string, unknown> = {}): void {
  if (gaEnabled) window.gtag?.('event', name, props)
  if (pixelEnabled) window.fbq?.('trackCustom', name, props)
}
