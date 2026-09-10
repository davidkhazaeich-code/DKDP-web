/**
 * API de conversion OpenAI (ChatGPT Ads) — chemin SERVEUR
 * ----------------------------------------------------------------------------
 * Doc : https://developers.openai.com/ads/conversions-api
 *
 * A n'importer QUE depuis une route API / du code serveur : ce module lit
 * `OPENAI_ADS_API_KEY`, qui ne doit jamais partir dans le bundle navigateur.
 *
 * Pourquoi doubler le pixel : un bloqueur de pub, un reseau d'entreprise ou un
 * onglet ferme trop vite font perdre l'evenement navigateur. Le serveur, lui,
 * sait de facon certaine qu'un formulaire est arrive. Les deux chemins portent
 * le MEME identifiant (`id` cote serveur = `event_id` cote pixel), donc OpenAI
 * n'en compte qu'un seul.
 *
 * Regle d'or : cette fonction ne jette JAMAIS et ne bloque jamais une reponse.
 * Un lead doit arriver dans la boite mail meme si OpenAI est en panne.
 */

import { createHash } from 'node:crypto'
import {
  OPENAI_ADS_API_URL,
  OPENAI_EVENT_DATA_TYPE,
  OPENAI_PIXEL_ID,
  type OpenAiEventName,
} from './openai-ads'

const TIMEOUT_MS = 4000

/** Identifiants personnels, hashes SHA-256 avant envoi (jamais en clair). */
export type OpenAiUserInput = {
  email?: string | null
  phone?: string | null
  firstName?: string | null
  lastName?: string | null
  /** Code pays a deux lettres, ex. « CH ». Envoye en clair (pas un identifiant). */
  country?: string | null
  city?: string | null
  region?: string | null
  postalCode?: string | null
}

export type OpenAiAdsEventInput = {
  /** Identifiant partage avec le pixel pour la deduplication. */
  id: string
  type: OpenAiEventName
  /** URL de la page ou la conversion a eu lieu (obligatoire si action_source = web). */
  sourceUrl?: string | null
  user?: OpenAiUserInput
  /** Valeur du lead, entier. Laisser vide tant que la convention n'est pas tranchee. */
  amount?: number
  /** Code ISO a 3 lettres, ex. « CHF ». Ignore sans `amount`. */
  currency?: string
  timestampMs?: number
  actionSource?: 'web' | 'mobile_app' | 'offline'
  /** true = OpenAI valide la charge utile sans enregistrer de conversion. */
  validateOnly?: boolean
}

export type OpenAiAdsResult =
  | { sent: true; status: number; body: string }
  | { sent: false; reason: 'no_api_key' | 'http_error' | 'network_error'; detail?: string }

function sha256(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex')
}

/** Email : on retire les espaces et on passe en minuscules avant de hasher. */
function normalizeEmail(value: string): string | undefined {
  const email = value.trim().toLowerCase()
  return email.includes('@') ? email : undefined
}

/**
 * Telephone : on ne garde que les chiffres (8 a 15) — un numero suisse saisi
 * « 079 940 79 69 » devient « 0799407969 ». Le prefixe pays est conserve s'il
 * est present, on n'en invente pas.
 */
function normalizePhone(value: string): string | undefined {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 8 && digits.length <= 15 ? digits : undefined
}

/** Nom : minuscules, sans ponctuation ni espaces. Les accents sont conserves. */
function normalizeName(value: string): string | undefined {
  const name = value
    .toLowerCase()
    .replace(/[\s.,'"`^~!?;:()[\]{}<>/\\|@#$%&*+=_-]/g, '')
    .trim()
  return name.length > 0 ? name : undefined
}

function buildUser(user?: OpenAiUserInput): Record<string, string> | undefined {
  if (!user) return undefined
  const out: Record<string, string> = {}

  if (user.email) {
    const email = normalizeEmail(user.email)
    if (email) out.email_sha256 = sha256(email)
  }
  if (user.phone) {
    const phone = normalizePhone(user.phone)
    if (phone) out.phone_number_sha256 = sha256(phone)
  }
  if (user.firstName) {
    const first = normalizeName(user.firstName)
    if (first) out.first_name_sha256 = sha256(first)
  }
  if (user.lastName) {
    const last = normalizeName(user.lastName)
    if (last) out.last_name_sha256 = sha256(last)
  }
  if (user.country) out.country = user.country.trim().toUpperCase().slice(0, 2)
  if (user.city) out.city = user.city.trim()
  if (user.region) out.region = user.region.trim()
  if (user.postalCode) out.postal_code = user.postalCode.trim()

  return Object.keys(out).length > 0 ? out : undefined
}

/**
 * Envoie une conversion a OpenAI. Ne jette jamais : en cas d'echec on journalise
 * et on rend un objet decrivant le probleme (visible dans les logs Vercel).
 */
export async function sendOpenAiAdsEvent(
  input: OpenAiAdsEventInput,
): Promise<OpenAiAdsResult> {
  const apiKey = process.env.OPENAI_ADS_API_KEY
  if (!apiKey) {
    // Pas de cle : silencieux en dev, signale une seule ligne en prod.
    if (process.env.NODE_ENV === 'production') {
      console.warn('[openai-ads] OPENAI_ADS_API_KEY absente, conversion non envoyee')
    }
    return { sent: false, reason: 'no_api_key' }
  }

  const pixelId = process.env.OPENAI_ADS_PIXEL_ID || OPENAI_PIXEL_ID
  const actionSource = input.actionSource ?? 'web'

  const data: Record<string, unknown> = {
    type: OPENAI_EVENT_DATA_TYPE[input.type],
  }
  if (typeof input.amount === 'number' && Number.isFinite(input.amount)) {
    data.amount = Math.round(input.amount)
    data.currency = (input.currency ?? 'CHF').toUpperCase()
  }

  const event: Record<string, unknown> = {
    id: input.id,
    type: input.type,
    timestamp_ms: input.timestampMs ?? Date.now(),
    action_source: actionSource,
    data,
  }
  if (input.sourceUrl) event.source_url = input.sourceUrl
  const user = buildUser(input.user)
  if (user) event.user = user

  const payload = {
    validate_only: input.validateOnly ?? false,
    events: [event],
  }

  try {
    const res = await fetch(
      `${OPENAI_ADS_API_URL}?pid=${encodeURIComponent(pixelId)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      },
    )

    const body = await res.text()
    if (!res.ok) {
      // Le corps de la reponse porte la vraie raison du refus : on le garde.
      console.error(`[openai-ads] ${input.type} refuse (HTTP ${res.status}) : ${body.slice(0, 500)}`)
      return { sent: false, reason: 'http_error', detail: `${res.status} ${body.slice(0, 500)}` }
    }
    return { sent: true, status: res.status, body }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    console.error(`[openai-ads] ${input.type} non envoye : ${detail}`)
    return { sent: false, reason: 'network_error', detail }
  }
}

/**
 * Localisation reelle du visiteur, telle que Vercel la pose sur la requete.
 * On ne suppose PAS « CH » : le site a des pages EN et des prospects hors Suisse,
 * et un pays invente degrade la correspondance au lieu de l'ameliorer.
 * En local ces en-tetes sont absents, l'objet revient vide, c'est normal.
 */
export function geoFromRequest(req: Request): Pick<
  OpenAiUserInput,
  'country' | 'city' | 'region' | 'postalCode'
> {
  const read = (name: string): string | undefined => {
    const raw = req.headers.get(name)
    if (!raw) return undefined
    try {
      return decodeURIComponent(raw)
    } catch {
      return raw
    }
  }
  return {
    country: read('x-vercel-ip-country'),
    city: read('x-vercel-ip-city'),
    region: read('x-vercel-ip-country-region'),
    postalCode: read('x-vercel-ip-postal-code'),
  }
}

/**
 * URL de la page d'ou vient la soumission. Le formulaire poste en fetch depuis
 * la page elle-meme, donc `Referer` porte l'URL reelle. Repli sur l'accueil,
 * `source_url` etant obligatoire pour les evenements web.
 */
export function sourceUrlFromRequest(req: Request): string {
  const referer = req.headers.get('referer')
  if (referer) {
    try {
      const url = new URL(referer)
      if (url.protocol === 'https:' || url.protocol === 'http:') return url.toString()
    } catch {
      /* en-tete illisible : on prend le repli */
    }
  }
  return 'https://dkdp.ch'
}
