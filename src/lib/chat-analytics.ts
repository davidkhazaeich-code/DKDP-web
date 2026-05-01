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

const SUMMARY_MIN_MESSAGES = 2
const SUMMARY_MIN_DURATION_SEC = 30
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
}

const SUMMARY_PROMPT = `Tu es un analyste qui resume des conversations de chatbot DKDP (agence digitale Geneve).

Analyse la conversation ci-dessous et reponds STRICTEMENT en JSON valide, sans markdown, sans texte avant ou apres, avec ces 3 cles exactes :

{
  "summary": "1-2 phrases factuelles : sujet + besoin du visiteur. Pas de jugement.",
  "intent": "devis" | "question_service" | "support" | "hors_sujet" | "autre",
  "outcome": "resolu" | "abandon" | "lead_chaud" | "lead_froid" | "court"
}

Definitions outcome :
- lead_chaud : a demande devis/RDV/contact ou a laisse coordonnees
- lead_froid : interet detecte sans engagement concret
- resolu : question reponse, pas de suite attendue
- abandon : conversation interrompue sans resolution
- court : moins de 3 echanges, intention pas claire

Reponds en francais.`

export async function closeSession(input: CloseSessionInput): Promise<void> {
  const client = getClient()
  if (!client) return

  try {
    const { data: rows, error } = await client
      .from('chat_messages')
      .select('role, ts, tokens_in, tokens_out, verbatim_text')
      .eq('session_id', input.sessionId)
      .order('ts', { ascending: true })

    if (error || !rows || rows.length === 0) return

    // Idempotence : si une session existe deja avec ce sessionId, on bail.
    const { data: existing } = await client
      .from('chat_sessions')
      .select('id')
      .eq('id', input.sessionId)
      .maybeSingle()
    if (existing) return

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

    // Premiere question utilisateur, raw, pour copy/FAQ.
    const firstUserMsg = rows.find((r) => r.role === 'user' && r.verbatim_text)
    const verbatimQuestion = firstUserMsg?.verbatim_text
      ? String(firstUserMsg.verbatim_text).slice(0, VERBATIM_MAX_LENGTH)
      : null

    let summary: string | null = null
    let intent: string | null = null
    let outcome: string | null = null

    const tooShort =
      messagesCount < SUMMARY_MIN_MESSAGES || durationSec < SUMMARY_MIN_DURATION_SEC

    if (tooShort) {
      outcome = 'court'
    } else {
      const summaryResult = await generateSummary(rows)
      if (summaryResult) {
        summary = summaryResult.summary
        intent = summaryResult.intent
        outcome = summaryResult.outcome
      }
    }

    await client.from('chat_sessions').insert({
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
      referrer: input.referrer ?? null,
      ip_country: input.ipCountry ?? null,
    })

    // En production (pas calibration), on supprime les messages bruts apres resume.
    if (!isVerbatimMode()) {
      await client.from('chat_messages').delete().eq('session_id', input.sessionId)
    }

    // Notification email immediate si lead chaud (a rappeler vite).
    if (outcome === 'lead_chaud') {
      void notifyLeadChaud({
        sessionId: input.sessionId,
        summary,
        verbatimQuestion,
        referrer: input.referrer,
        ipCountry: input.ipCountry,
        messagesCount,
      })
    }
  } catch (err) {
    console.error('[chat-analytics] closeSession failed', err)
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

    await resend.emails.send({
      from: 'DKDP Chatbot <contact@dkdp.ch>',
      to: 'dk@dkdp.ch',
      subject: `[Lead chaud] Chatbot DKDP - ${input.verbatimQuestion?.slice(0, 50) ?? 'nouvelle conversation'}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <div style="background:#FF6B00;padding:14px 20px;border-radius:8px 8px 0 0">
            <h2 style="margin:0;color:#fff;font-size:18px">Lead chaud detecte sur le chatbot</h2>
            <p style="margin:4px 0 0;color:#ffe5d0;font-size:13px">A rappeler dans l'heure pour maximiser la conversion</p>
          </div>
          <div style="padding:20px;background:#fafafa;border-radius:0 0 8px 8px">
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
