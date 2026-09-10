/**
 * Analytics & conversion tracking — DKDP
 * ----------------------------------------------------------------------------
 * Source de verite UNIQUE pour tous les evenements de conversion du site.
 *
 * Chaque evenement est envoye a la fois a :
 *   - Google Analytics 4  (gtag, mesure G-SCXF5R826D)  ← chemin fiable, GA4 le recoit toujours
 *   - dataLayer Google Tag Manager (GTM-NDMXZL8)        ← permet de declencher des tags Ads/remarketing
 *   - pixel OpenAI (ChatGPT Ads, MhbGMaod48Cuvp7YJVsNgA) ← conversions des campagnes ChatGPT
 *
 * Cote Google Ads, les conversions partent MAINTENANT en direct depuis ce fichier
 * (`GA4_TO_GOOGLE_ADS` plus bas). La route precedente — marquer les evenements en
 * « Key events » GA4 puis les importer dans Ads — est restee inachevee de juin a
 * septembre 2026 : la balise `AW-395809057` etait bien active sur le site (via les
 * balises Google liees, invisible dans le HTML) mais AUCUN evenement de conversion
 * avec libelle n'etait jamais envoye. Resultat : 0 conversion enregistree en 90
 * jours et des actions affichees « Mauvaise configuration » dans Google Ads.
 *
 * ⚠️ Ne PAS importer en plus ces memes evenements GA4 comme conversions dans
 * Google Ads : ils seraient comptes deux fois.
 * Procedure complete + mapping : docs/analytics-conversions.md
 *
 * Cote OpenAI Ads, le mapping evenement GA4 -> evenement OpenAI vit dans
 * `lib/openai-ads.ts`, et le meme evenement peut partir en double depuis le
 * serveur (API de conversion) : passer alors `event_id` pour la deduplication.
 *
 * Toutes les fonctions sont no-op cote serveur (SSR-safe).
 */

import {
  GA4_TO_OPENAI,
  OPENAI_EVENT_DATA_TYPE,
  newEventId,
} from './openai-ads'

export { newEventId }

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
    /** File d'attente du pixel OpenAI, posee dans le <head> du layout. */
    oaiq?: (...args: unknown[]) => void
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
  sendToOpenAi(name, clean)
  sendToGoogleAds(name, clean)
}

/**
 * Relaie l'evenement au pixel OpenAI, si et seulement s'il est mappe dans
 * `GA4_TO_OPENAI`. Les evenements non mappes ne partent pas : le pixel refuse
 * les noms inconnus.
 *
 * Parametres reconnus dans `params` :
 *   - `event_id` : identifiant de deduplication partage avec l'API serveur
 *   - `value` + `currency` : valeur du lead (optionnelle, entier)
 * Les autres parametres GA4 sont volontairement laisses de cote : le pixel
 * n'accepte aucune cle libre dans `data`.
 */
function sendToOpenAi(
  name: string,
  params: Record<string, string | number | boolean>,
): void {
  const mapping = GA4_TO_OPENAI[name]
  if (!mapping) return

  const data: Record<string, unknown> = {
    type: OPENAI_EVENT_DATA_TYPE[mapping.event],
  }
  if (typeof params.value === 'number' && Number.isFinite(params.value)) {
    data.amount = Math.round(params.value)
    data.currency =
      typeof params.currency === 'string' ? params.currency.toUpperCase() : 'CHF'
  }

  const options: Record<string, unknown> = {}
  if (typeof params.event_id === 'string' && params.event_id) {
    options.event_id = params.event_id
  }
  if (mapping.event === 'custom') {
    options.custom_event_name = mapping.customName
  }

  try {
    window.oaiq?.('measure', mapping.event, data, options)
  } catch {
    /* pixel bloque ou indisponible : on ignore */
  }
}

/**
 * Libelles de conversion Google Ads (compte `AW-395809057`), releves le
 * 2026-09-10 dans les `tag_snippets` des actions de conversion existantes du
 * compte. Ce ne sont PAS de nouvelles actions : elles existaient deja, personne
 * ne les declenchait.
 *
 *   generate_lead    -> « Formulaire - Demande professionnelle »  (id 6919766282)
 *   book_appointment -> « RDV Call avec formulaire - Formation IA - DKDP » (7155635183)
 *   whatsapp_click   -> « Contact Whatsapp »                      (id 957006627)
 *
 * ⚠️ `phone_click` n'est volontairement PAS mappe : le compte n'a pas d'action de
 * type page web pour le clic telephone (« Appel depuis site » est de type
 * WEBSITE_CALL, le numero de renvoi de Google, qu'un gtag ne peut pas declencher).
 * Creer une action « DKDP - Clic telephone » dans Google Ads, puis ajouter son
 * libelle ici.
 *
 * ⚠️ « Formulaire - Demande professionnelle » compte encore *plusieurs par clic* :
 * deux envois du meme formulaire font deux conversions. Le `transaction_id`
 * ci-dessous neutralise les doubles envois accidentels, mais le reglage lui-meme
 * doit passer a « une par clic » dans l'interface Google Ads.
 */
const GA4_TO_GOOGLE_ADS: Record<
  string,
  { sendTo: string; value?: number }
> = {
  [ConversionEvent.Lead]: {
    sendTo: 'AW-395809057/0utiCIqCzeMZEKGi3rwB',
    value: 1,
  },
  [ConversionEvent.BookingComplete]: {
    sendTo: 'AW-395809057/6dkTCO-nidQaEKGi3rwB',
  },
  [ConversionEvent.WhatsAppClick]: {
    sendTo: 'AW-395809057/nBXMCKOGq8gDEKGi3rwB',
  },
}

/**
 * Envoie la conversion Google Ads correspondante, si l'evenement est mappe.
 * Les evenements non mappes ne partent pas : une conversion sans libelle est
 * ignoree par Google Ads.
 *
 * `event_id` (deja genere par les formulaires pour la deduplication OpenAI) est
 * reutilise comme `transaction_id`, la cle de deduplication de Google Ads.
 */
function sendToGoogleAds(
  name: string,
  params: Record<string, string | number | boolean>,
): void {
  const mapping = GA4_TO_GOOGLE_ADS[name]
  if (!mapping) return

  const payload: Record<string, unknown> = { send_to: mapping.sendTo }

  const value =
    typeof params.value === 'number' ? params.value : mapping.value
  if (typeof value === 'number' && Number.isFinite(value)) {
    payload.value = value
    payload.currency =
      typeof params.currency === 'string' ? params.currency.toUpperCase() : 'CHF'
  }
  if (typeof params.event_id === 'string' && params.event_id) {
    payload.transaction_id = params.event_id
  }

  try {
    window.gtag?.('event', 'conversion', payload)
  } catch {
    /* gtag indisponible (bloqueur, consentement refuse...) : on ignore */
  }
}

/**
 * Page vue, envoyee au seul pixel OpenAI (GA4 gere deja ses propres page_view
 * via gtag). Appelee par `OpenAiPageView` au chargement et a chaque navigation
 * interne : sans ce signal, OpenAI ne voit que les conversions, jamais le
 * trafic qui y mene.
 */
export function trackOpenAiPageView(): void {
  if (typeof window === 'undefined') return
  try {
    window.oaiq?.('measure', 'page_viewed', { type: 'contents' })
  } catch {
    /* pixel bloque ou indisponible : on ignore */
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
