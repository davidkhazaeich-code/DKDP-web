/**
 * Pixel de mesure OpenAI (ChatGPT Ads) — constantes partagees
 * ----------------------------------------------------------------------------
 * Doc officielle : https://developers.openai.com/ads/measurement-pixel
 *
 * Deux chemins envoient les MEMES conversions, dedupliques par identifiant :
 *   1. Navigateur  : `oaiq("measure", ...)`            (pixel, ce fichier)
 *   2. Serveur     : POST bzr.openai.com/v1/events     (voir openai-ads-server.ts)
 * La deduplication se fait en reutilisant la meme valeur dans l'option
 * `event_id` du pixel et dans le champ `id` de l'evenement serveur.
 *
 * Contrainte du SDK (verifiee dans oaiq.min.js le 2026-09-10) : le champ `data`
 * n'accepte QUE des cles connues, et pour `customer_action` c'est
 * `type`, `amount`, `currency`. Aucun parametre libre (pas de `form_type`).
 * La segmentation fine reste donc dans GA4 ; cote OpenAI on distingue les
 * intentions par le NOM de l'evenement.
 */

/** Pixel DKDP, cree dans OpenAI Ads Manager (onglet Conversions). */
export const OPENAI_PIXEL_ID = 'MhbGMaod48Cuvp7YJVsNgA'

/** Endpoint serveur de l'API de conversion. */
export const OPENAI_ADS_API_URL = 'https://bzr.openai.com/v1/events'

/**
 * Evenements standard supportes par OpenAI, avec le `data.type` impose pour
 * chacun (table extraite du SDK). Envoyer un autre couple = evenement rejete.
 */
export const OPENAI_EVENT_DATA_TYPE = {
  page_viewed: 'contents',
  contents_viewed: 'contents',
  items_added: 'contents',
  checkout_started: 'contents',
  order_created: 'contents',
  lead_created: 'customer_action',
  registration_completed: 'customer_action',
  appointment_scheduled: 'customer_action',
  subscription_created: 'plan_enrollment',
  trial_started: 'plan_enrollment',
  custom: 'custom',
} as const

export type OpenAiEventName = keyof typeof OPENAI_EVENT_DATA_TYPE
export type OpenAiDataType =
  (typeof OPENAI_EVENT_DATA_TYPE)[OpenAiEventName]

/**
 * Correspondance evenement GA4 (source de verite du site) -> evenement OpenAI.
 *
 * Choix de mapping :
 *   - `lead_created` est reserve aux VRAIES demandes entrantes (formulaires).
 *     C'est l'evenement sur lequel optimiser les campagnes.
 *   - un rendez-vous Cal.com confirme est un `appointment_scheduled`.
 *   - une inscription newsletter est un `registration_completed`.
 *   - les signaux d'intention (clic telephone, WhatsApp, email, ouverture du
 *     calendrier ou du chatbot) partent en evenements personnalises : ils
 *     restent mesurables dans Ads Manager sans gonfler le compte de leads.
 */
export type OpenAiMapping =
  | { event: Exclude<OpenAiEventName, 'custom'> }
  | { event: 'custom'; customName: string }

export const GA4_TO_OPENAI: Record<string, OpenAiMapping> = {
  generate_lead: { event: 'lead_created' },
  book_appointment: { event: 'appointment_scheduled' },
  newsletter_signup: { event: 'registration_completed' },
  phone_click: { event: 'custom', customName: 'phone_click' },
  whatsapp_click: { event: 'custom', customName: 'whatsapp_click' },
  email_click: { event: 'custom', customName: 'email_click' },
  booking_start: { event: 'custom', customName: 'booking_start' },
  chat_open: { event: 'custom', customName: 'chat_open' },
}

/**
 * Identifiant d'evenement partage navigateur <-> serveur.
 * `crypto.randomUUID` est dispo partout en HTTPS ; repli sur du pseudo-aleatoire
 * pour les navigateurs anciens (l'important est l'unicite, pas la cryptographie).
 */
export function newEventId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID()
    }
  } catch {
    /* contexte non securise : on tombe sur le repli */
  }
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`
}
