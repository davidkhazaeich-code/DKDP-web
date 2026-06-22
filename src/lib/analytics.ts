/**
 * Analytics & conversion tracking — DKDP
 * ----------------------------------------------------------------------------
 * Source de verite UNIQUE pour tous les evenements de conversion du site.
 *
 * Chaque evenement est envoye a la fois a :
 *   - Google Analytics 4  (gtag, mesure G-SCXF5R826D)  ← chemin fiable, GA4 le recoit toujours
 *   - dataLayer Google Tag Manager (GTM-NDMXZL8)        ← permet de declencher des tags Ads/remarketing
 *
 * Cote Google Ads, on N'IMPORTE PAS de conversions en dur ici : on marque les
 * evenements GA4 ci-dessous comme « Key events » dans GA4, puis on les importe
 * comme actions de conversion dans Google Ads (property GA4 liee a Ads).
 * Procedure complete + mapping : docs/analytics-conversions.md
 *
 * Toutes les fonctions sont no-op cote serveur (SSR-safe).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

export type ConversionParam = string | number | boolean | undefined
export type ConversionParams = Record<string, ConversionParam>

/**
 * Noms d'evenements GA4. Centralises pour eviter les fautes de frappe et
 * garder le mapping GA4 -> Google Ads coherent.
 *
 * Conversions « dures » (a importer en priorite dans Google Ads) :
 *   generate_lead, book_appointment, phone_click
 * Conversions secondaires / engagement (a observer) :
 *   booking_start, whatsapp_click, email_click, newsletter_signup, chat_open
 */
export const ConversionEvent = {
  /** Soumission d'un formulaire de demande (devis, contact, audit, estimation, formation). */
  Lead: 'generate_lead',
  /** Clic sur un numero de telephone (lien tel:). */
  PhoneClick: 'phone_click',
  /** Clic sur une adresse email (lien mailto:). */
  EmailClick: 'email_click',
  /** Clic sur un lien WhatsApp. */
  WhatsAppClick: 'whatsapp_click',
  /** Ouverture du calendrier Cal.com (clic sur un CTA de reservation). */
  BookingStart: 'booking_start',
  /** Reservation Cal.com confirmee (rendez-vous reellement pris). */
  BookingComplete: 'book_appointment',
  /** Inscription a la newsletter. */
  Newsletter: 'newsletter_signup',
  /** Ouverture du chatbot. */
  ChatOpen: 'chat_open',
} as const

export type ConversionEventName =
  (typeof ConversionEvent)[keyof typeof ConversionEvent]

function currentPagePath(): string | undefined {
  if (typeof window === 'undefined') return undefined
  return window.location.pathname + window.location.search
}

/**
 * Pousse un evenement vers GA4 (gtag) ET le dataLayer (GTM).
 * No-op cote serveur. Les valeurs `undefined` sont retirees, et `page_path`
 * est ajoute automatiquement s'il n'est pas fourni.
 */
export function trackEvent(name: string, params: ConversionParams = {}): void {
  if (typeof window === 'undefined') return

  const clean: Record<string, string | number | boolean> = {}
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) clean[key] = value
  }
  if (clean.page_path === undefined) {
    const path = currentPagePath()
    if (path) clean.page_path = path
  }

  try {
    window.gtag?.('event', name, clean)
  } catch {
    /* gtag indisponible (bloqueur de pub, consentement refuse...) : on ignore */
  }
  try {
    window.dataLayer?.push({ event: name, ...clean })
  } catch {
    /* dataLayer indisponible : on ignore */
  }
}

/** Soumission d'un formulaire de lead (devis, contact, audit, estimation, formation). */
export function trackLead(
  params: { form_type: string } & ConversionParams,
): void {
  trackEvent(ConversionEvent.Lead, params)
}

/** Clic sur un numero de telephone. */
export function trackPhoneClick(params: ConversionParams = {}): void {
  trackEvent(ConversionEvent.PhoneClick, params)
}

/** Clic sur une adresse email (mailto:). */
export function trackEmailClick(params: ConversionParams = {}): void {
  trackEvent(ConversionEvent.EmailClick, params)
}

/** Clic sur un lien WhatsApp. */
export function trackWhatsAppClick(params: ConversionParams = {}): void {
  trackEvent(ConversionEvent.WhatsAppClick, params)
}

/** Ouverture du calendrier de reservation Cal.com. */
export function trackBookingStart(params: ConversionParams = {}): void {
  trackEvent(ConversionEvent.BookingStart, params)
}

/** Reservation Cal.com confirmee. */
export function trackBookingComplete(params: ConversionParams = {}): void {
  trackEvent(ConversionEvent.BookingComplete, params)
}

/** Inscription a la newsletter. */
export function trackNewsletterSignup(params: ConversionParams = {}): void {
  trackEvent(ConversionEvent.Newsletter, params)
}

/** Ouverture du chatbot. */
export function trackChatOpen(params: ConversionParams = {}): void {
  trackEvent(ConversionEvent.ChatOpen, params)
}
