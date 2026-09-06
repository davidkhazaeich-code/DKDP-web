/**
 * Chatbot DKDP : analytics legeres avec resume Haiku par session.
 *
 * Logique :
 * - Pendant la conversation, chaque message est logge dans chat_messages
 *   (metriques uniquement, sauf si CHAT_LOG_VERBATIM=true).
 * - A la fin de la session (beforeunload ou inactivite client-side),
 *   POST /api/chat/close declenche closeSession() :
 *     1. Fetch tous les messages de la session
 *     2. Si moins de 2 messages ou moins de 30s, on logge sans resume
 *     3. Sinon, Haiku genere un JSON {summary, intent, outcome}
 *     4. Insert chat_sessions
 *     5. Delete chat_messages de la session (sauf calibration)
 *
 * Tout est defensif : aucune erreur Supabase ou Anthropic ne doit
 * casser la reponse du chatbot pour le visiteur.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { Resend } from 'resend'

// Haiku 4.5 pricing (USD/M tokens) -> CHF approx (taux 0.9)
const PRICE_INPUT_CHF_PER_TOKEN = (1.0 / 1_000_000) * 0.9
const PRICE_OUTPUT_CHF_PER_TOKEN = (5.0 / 1_000_000) * 0.9

// On resume des qu'il y a un message porteur de texte. L'ancien verrou
// (2 messages ET 30 s) n'a laisse passer aucune conversation en quatre mois
// de production : les visiteurs posent leur question et repartent.
const SUMMARY_MIN_MESSAGES = 1
const VERBATIM_MAX_LENGTH = 200

let cachedClient: SupabaseClient | null = null

function getClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  cachedClient = createClient(url, key, { auth: { persistSession: false } })
  return cachedClient
}

export function isVerbatimMode(): boolean {
  return process.env.CHAT_LOG_VERBATIM === 'true'
}

// ── logMessage : appele dans /api/chat onFinish ─────────────────────────

export interface LogMessageInput {
  sessionId: string
  role: 'user' | 'assistant'
  tokensIn?: number
  tokensOut?: number
  latencyMs?: number
  verbatimText?: string
  // Provenance portee par le message et non plus par le seul beacon de
  // fermeture : une session balayee cote serveur garde sa page d'origine.
  referrer?: string
  ipCountry?: string
}

export async function logMessage(input: LogMessageInput): Promise<void> {
  const client = getClient()
  if (!client) return
  try {
    await client.from('chat_messages').insert({
      session_id: input.sessionId,
      role: input.role,
      tokens_in: input.tokensIn ?? null,
      tokens_out: input.tokensOut ?? null,
      latency_ms: input.latencyMs ?? null,
      verbatim_text: isVerbatimMode() ? (input.verbatimText ?? null) : null,
      referrer: input.referrer ?? null,
      ip_country: input.ipCountry ?? null,
    })
  } catch (err) {
    console.error('[chat-analytics] logMessage failed', err)
  }
}

// ── closeSession : appele depuis /api/chat/close ────────────────────────

export interface CloseSessionInput {
  sessionId: string
  referrer?: string
  ipCountry?: string
}

interface SummaryJson {
  summary: string
  intent: 'devis' | 'question_service' | 'support' | 'hors_sujet' | 'autre'
  outcome: 'resolu' | 'abandon' | 'lead_chaud' | 'lead_froid' | 'court'
  contact?: {
    phone?: string | null
    email?: string | null
    name?: string | null
    company?: string | null
  }
}

const SUMMARY_PROMPT = `Tu es un analyste qui resume des conversations de chatbot DKDP (agence digitale Geneve).

Analyse la conversation ci-dessous et reponds STRICTEMENT en JSON valide, sans markdown, sans texte avant ou apres, avec ces 4 cles exactes :

{
  "summary": "1-2 phrases factuelles : sujet + besoin du visiteur. Pas de jugement.",
  "intent": "devis" | "question_service" | "support" | "hors_sujet" | "autre",
  "outcome": "resolu" | "abandon" | "lead_chaud" | "lead_froid" | "court",
  "contact": {
    "phone": "<numero formate ex +41 79 123 45 67> | null",
    "email": "<email valide> | null",
    "name": "<prenom + nom si donne, sinon prenom seul> | null",
    "company": "<nom de l'entreprise> | null"
  }
}

Definitions outcome :
- lead_chaud : a demande devis/RDV/contact ou a laisse coordonnees
- lead_froid : interet detecte sans engagement concret
- resolu : question reponse, pas de suite attendue
- abandon : conversation interrompue sans resolution
- court : moins de 3 echanges, intention pas claire

Regles STRICTES pour le bloc contact :
- N'extrais QUE ce que le visiteur a EXPLICITEMENT donne dans ses messages (pas le bot).
- Ne devine JAMAIS, ne reformule pas. Si pas mentionne -> null.
- Pas de fausse extraction : "j'ai 79 ans" n'est PAS un numero de telephone.
- Telephone : formate avec espaces si possible (+41 79 123 45 67), garde le format international du visiteur.
- Email : doit contenir un @ et un domaine valide.
- Name : prenom et/ou nom de famille seulement, pas de titre ("Mr Dupont" -> "Dupont").
- Company : nom raisonnable de societe, pas un domaine d'activite.

Reponds en francais.`

export async function closeSession(input: CloseSessionInput): Promise<void> {
  const client = getClient()
  if (!client) return

  try {
    const { data: rows, error } = await client
      .from('chat_messages')
      .select('role, ts, tokens_in, tokens_out, verbatim_text, referrer, ip_country')
      .eq('session_id', input.sessionId)
      .order('ts', { ascending: true })

    if (error || !rows || rows.length === 0) return

    // Idempotence : une session deja enregistree n'est rejouee que si de
    // nouveaux messages sont arrives depuis, cas du visiteur qui reprend la
    // conversation apres une pause dans le meme onglet.
    const { data: existing } = await client
      .from('chat_sessions')
      .select('id, messages_count, outcome')
      .eq('id', input.sessionId)
      .maybeSingle()
    if (existing && Number(existing.messages_count) >= rows.length) return

    const startedAt = new Date(rows[0].ts as string)
    const endedAt = new Date(rows[rows.length - 1].ts as string)
    const durationSec = Math.max(0, Math.floor((endedAt.getTime() - startedAt.getTime()) / 1000))
    const messagesCount = rows.length
    const tokensTotal = rows.reduce(
      (sum, r) => sum + (r.tokens_in ?? 0) + (r.tokens_out ?? 0),
      0,
    )
    const costChf = rows.reduce(
      (sum, r) =>
        sum +
        (r.tokens_in ?? 0) * PRICE_INPUT_CHF_PER_TOKEN +
        (r.tokens_out ?? 0) * PRICE_OUTPUT_CHF_PER_TOKEN,
      0,
    )

    // Provenance : le balayage serveur n'a pas de beacon, on retombe sur ce
    // que le premier message a enregistre.
    const firstReferrer = (rows.find((r) => r.referrer)?.referrer as string) ?? null
    const firstIpCountry = (rows.find((r) => r.ip_country)?.ip_country as string) ?? null

    // Premiere question utilisateur, raw, pour copy/FAQ.
    const firstUserMsg = rows.find((r) => r.role === 'user' && r.verbatim_text)
    const verbatimQuestion = firstUserMsg?.verbatim_text
      ? String(firstUserMsg.verbatim_text).slice(0, VERBATIM_MAX_LENGTH)
      : null

    let summary: string | null = null
    let intent: string | null = null
    let outcome: string | null = null
    let contactPhone: string | null = null
    let contactEmail: string | null = null
    let contactName: string | null = null
    let contactCompany: string | null = null

    const tooShort = messagesCount < SUMMARY_MIN_MESSAGES

    if (tooShort) {
      outcome = 'court'
    } else {
      const summaryResult = await generateSummary(rows)
      if (summaryResult) {
        summary = summaryResult.summary
        intent = summaryResult.intent
        outcome = summaryResult.outcome
        contactPhone = summaryResult.contact?.phone ?? null
        contactEmail = summaryResult.contact?.email ?? null
        contactName = summaryResult.contact?.name ?? null
        contactCompany = summaryResult.contact?.company ?? null
      }
    }

    await client.from('chat_sessions').upsert({
      id: input.sessionId,
      started_at: startedAt.toISOString(),
      ended_at: endedAt.toISOString(),
      duration_sec: durationSec,
      messages_count: messagesCount,
      tokens_total: tokensTotal,
      cost_chf: Number(costChf.toFixed(5)),
      summary,
      intent,
      outcome,
      verbatim_question: verbatimQuestion,
      referrer: input.referrer ?? firstReferrer,
      ip_country: input.ipCountry ?? firstIpCountry,
      contact_phone: contactPhone,
      contact_email: contactEmail,
      contact_name: contactName,
      contact_company: contactCompany,
    })

    // En production (pas calibration), on supprime les messages bruts apres resume.
    if (!isVerbatimMode()) {
      await client.from('chat_messages').delete().eq('session_id', input.sessionId)
    }

    // Notification email immediate si lead chaud (a rappeler vite). On ne
    // notifie que sur la bascule, jamais deux fois pour la meme session.
    if (outcome === 'lead_chaud' && existing?.outcome !== 'lead_chaud') {
      void notifyLeadChaud({
        sessionId: input.sessionId,
        summary,
        verbatimQuestion,
        referrer: input.referrer,
        ipCountry: input.ipCountry,
        messagesCount,
        contactPhone,
        contactEmail,
        contactName,
        contactCompany,
      })
    }
  } catch (err) {
    console.error('[chat-analytics] closeSession failed', err)
  }
}

// ── sweepOpenSessions : filet de securite serveur ───────────────────

export interface SweepResult {
  swept: number
  sessionIds: string[]
}

/**
 * Resume les sessions que le navigateur n'a jamais fermees.
 *
 * Le close client-side (sendBeacon sur beforeunload / pagehide / onglet
 * cache) se perd regulierement : onglet tue, navigation soft Next.js,
 * Safari mobile. Sans filet, ces conversations n'apparaissent nulle part
 * dans /admin/chat. C'est ce qui est arrive a une session sur deux entre
 * juin et septembre 2026.
 *
 * Une session est consideree terminee quand son dernier message date de
 * plus de `staleAfterMinutes`. Le timer d'inactivite du widget etant a
 * 5 min, la valeur par defaut laisse la place a une conversation qui
 * reprend, sans la couper en deux sessions.
 *
 * S'appuie sur la vue chat_sessions_pending (cf docs/supabase-chat-schema.sql)
 * qui liste les sessions sans resume, ou dont le nombre de messages a
 * augmente depuis le dernier resume.
 */
export async function sweepOpenSessions(
  opts: { staleAfterMinutes?: number; limit?: number } = {},
): Promise<SweepResult> {
  const client = getClient()
  if (!client) return { swept: 0, sessionIds: [] }

  const staleAfterMinutes = opts.staleAfterMinutes ?? 15
  const limit = opts.limit ?? 25
  const cutoff = new Date(Date.now() - staleAfterMinutes * 60 * 1000).toISOString()

  try {
    const { data: pending, error } = await client
      .from('chat_sessions_pending')
      .select('session_id, last_ts')
      .lt('last_ts', cutoff)
      .order('last_ts', { ascending: true })
      .limit(limit)

    if (error) {
      console.error('[chat-analytics] sweep: lecture chat_sessions_pending', error)
      return { swept: 0, sessionIds: [] }
    }
    if (!pending || pending.length === 0) return { swept: 0, sessionIds: [] }

    // En serie : chaque session declenche un appel Haiku, et le volume
    // attendu tient largement dans la duree d'une invocation cron.
    const sessionIds: string[] = []
    for (const row of pending) {
      const sessionId = String(row.session_id)
      await closeSession({ sessionId })
      sessionIds.push(sessionId)
    }

    return { swept: sessionIds.length, sessionIds }
  } catch (err) {
    console.error('[chat-analytics] sweepOpenSessions failed', err)
    return { swept: 0, sessionIds: [] }
  }
}

// ── Notification email Resend pour leads chauds ────────────────────────

interface LeadNotifyInput {
  sessionId: string
  summary: string | null
  verbatimQuestion: string | null
  referrer?: string
  ipCountry?: string
  messagesCount: number
  contactPhone?: string | null
  contactEmail?: string | null
  contactName?: string | null
  contactCompany?: string | null
}

async function notifyLeadChaud(input: LeadNotifyInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  try {
    const resend = new Resend(apiKey)
    const adminToken = process.env.ADMIN_TOKEN
    const dashboardUrl = adminToken
      ? `https://dkdp.ch/admin/chat?token=${adminToken}`
      : 'https://dkdp.ch/admin/chat'

    const headline = [input.contactName, input.contactCompany].filter(Boolean).join(' - ')
    const subjectSuffix = headline || input.verbatimQuestion?.slice(0, 50) || 'nouvelle conversation'

    const hasContact = Boolean(input.contactPhone || input.contactEmail)
    const phoneTel = input.contactPhone?.replace(/[^+0-9]/g, '') ?? ''

    await resend.emails.send({
      from: 'DKDP Chatbot <contact@dkdp.ch>',
      to: 'dk@dkdp.ch',
      subject: `[Lead chaud] ${subjectSuffix}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <div style="background:#FF6B00;padding:14px 20px;border-radius:8px 8px 0 0">
            <h2 style="margin:0;color:#fff;font-size:18px">Lead chaud detecte sur le chatbot</h2>
            <p style="margin:4px 0 0;color:#ffe5d0;font-size:13px">A rappeler dans l'heure pour maximiser la conversion</p>
          </div>
          <div style="padding:20px;background:#fafafa;border-radius:0 0 8px 8px">
            ${headline ? `<p style="margin:0 0 14px;font-size:17px;font-weight:700;color:#1a1a1a">${escapeHtml(headline)}</p>` : ''}
            ${hasContact ? `
              <div style="margin:0 0 18px;padding:14px 16px;background:#fff7f0;border:1px solid #FF6B0030;border-radius:8px">
                <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#FF6B00;text-transform:uppercase;letter-spacing:0.05em">Coordonnees laissees</p>
                ${input.contactPhone ? `<p style="margin:4px 0;font-size:15px"><a href="tel:${escapeHtml(phoneTel)}" style="color:#1a1a1a;text-decoration:none;font-weight:600">${escapeHtml(input.contactPhone)}</a></p>` : ''}
                ${input.contactEmail ? `<p style="margin:4px 0;font-size:15px"><a href="mailto:${escapeHtml(input.contactEmail)}" style="color:#7C3AED;font-weight:600">${escapeHtml(input.contactEmail)}</a></p>` : ''}
              </div>
            ` : ''}
            ${input.verbatimQuestion ? `
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#71717a;text-transform:uppercase;letter-spacing:0.05em">Question initiale du visiteur</p>
              <p style="margin:0 0 16px;padding:12px 14px;background:#fff;border-left:3px solid #FF6B00;font-style:italic;color:#1a1a1a">${escapeHtml(input.verbatimQuestion)}</p>
            ` : ''}
            ${input.summary ? `
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#71717a;text-transform:uppercase;letter-spacing:0.05em">Resume de la conversation</p>
              <p style="margin:0 0 16px;line-height:1.6;color:#1a1a1a">${escapeHtml(input.summary)}</p>
            ` : ''}
            <table style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:13px">
              <tr>
                <td style="padding:6px 0;color:#71717a;width:130px">Messages echanges</td>
                <td style="padding:6px 0;color:#1a1a1a"><strong>${input.messagesCount}</strong></td>
              </tr>
              ${input.referrer ? `
              <tr>
                <td style="padding:6px 0;color:#71717a">Page d'origine</td>
                <td style="padding:6px 0;color:#1a1a1a">${escapeHtml(input.referrer)}</td>
              </tr>` : ''}
              ${input.ipCountry ? `
              <tr>
                <td style="padding:6px 0;color:#71717a">Pays</td>
                <td style="padding:6px 0;color:#1a1a1a">${escapeHtml(input.ipCountry)}</td>
              </tr>` : ''}
            </table>
            <a href="${dashboardUrl}" style="display:inline-block;padding:10px 18px;background:#7C3AED;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px">Voir dans le dashboard</a>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error('[chat-analytics] notifyLeadChaud failed', err)
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ── Generation du resume Haiku ──────────────────────────────────────────

interface MessageRow {
  role: string
  verbatim_text: string | null
}

async function generateSummary(rows: MessageRow[]): Promise<SummaryJson | null> {
  // Si on n'a pas le verbatim (mode prod sans calibration), on ne peut
  // pas generer un resume. On retourne null et on stocke juste les metriques.
  const conversation = rows
    .filter((r) => r.verbatim_text)
    .map((r) => `${r.role === 'user' ? 'VISITEUR' : 'BOT'}: ${r.verbatim_text}`)
    .join('\n')

  if (!conversation) return null

  try {
    const result = await generateText({
      model: anthropic('claude-haiku-4-5-20251001'),
      system: SUMMARY_PROMPT,
      prompt: `Conversation a analyser :\n\n${conversation}`,
      maxOutputTokens: 250,
    })

    const text = result.text.trim()
    // Tolere markdown ```json ... ``` ou JSON brut
    const jsonStr = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim()

    const parsed = JSON.parse(jsonStr) as SummaryJson
    if (!parsed.summary || !parsed.intent || !parsed.outcome) return null
    return parsed
  } catch (err) {
    console.error('[chat-analytics] generateSummary failed', err)
    return null
  }
}
