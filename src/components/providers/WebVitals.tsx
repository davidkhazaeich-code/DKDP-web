'use client'

import { useReportWebVitals } from 'next/web-vitals'

/**
 * Core Web Vitals reels vers GA4 (21/09/2026, plan SEO, action D21).
 *
 * CrUX repond 404 pour dkdp.ch : trop peu de visites pour que Google publie
 * des donnees terrain. Sans elles, le seul LCP connu est celui de Lighthouse,
 * un artefact de throttling. Chaque metrique part comme evenement GA4 du
 * nom de la metrique (LCP, INP, CLS, FCP, TTFB) avec sa valeur, son id et
 * son classement, ce qui permet un rapport par page et par appareil.
 *
 * Passe par `window.gtag` : hors dkdp.ch la bibliotheque n'est pas chargee,
 * rien ne part (garde d'hote du layout). `non_interaction` garde le taux
 * de rebond intact, `value` est arrondi (CLS x 1000) comme le recommande
 * la doc web-vitals.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
      non_interaction: true,
    })
  })
  return null
}
