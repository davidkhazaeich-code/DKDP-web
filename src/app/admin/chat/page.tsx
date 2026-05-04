import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// Page admin token-protegee : /admin/chat?token=XXX
// Le token est stocke dans la variable d'env ADMIN_TOKEN (Vercel).
// Si manquant ou invalide -> 404 (pas 401, on cache l'existence de la page).

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Chat analytics',
}

interface SessionRow {
  id: string
  started_at: string
  duration_sec: number
  messages_count: number
  tokens_total: number
  cost_chf: number
  summary: string | null
  intent: string | null
  outcome: string | null
  verbatim_question: string | null
  referrer: string | null
  ip_country: string | null
  contact_phone: string | null
  contact_email: string | null
  contact_name: string | null
  contact_company: string | null
}

interface StatsRow {
  total_sessions: number
  avg_messages: number
  avg_duration_sec: number
  total_cost_chf: number
  leads_chauds: number
  abandons: number
}

const INTENT_LABEL: Record<string, string> = {
  devis: 'Devis',
  question_service: 'Question service',
  support: 'Support',
  hors_sujet: 'Hors sujet',
  autre: 'Autre',
}

function formatDuration(sec: number): string {
  if (sec < 60) return `${sec}s`
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}m ${s}s`
}

function formatRelative(iso: string): string {
  const d = new Date(iso)
  const diffMs = Date.now() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return 'a l\'instant'
  if (diffMin < 60) return `il y a ${diffMin} min`
  const diffH = Math.floor(diffMin / 60)
  if (diffH < 24) return `il y a ${diffH}h`
  const diffD = Math.floor(diffH / 24)
  if (diffD < 7) return `il y a ${diffD}j`
  return d.toLocaleDateString('fr-CH', { day: '2-digit', month: '2-digit', timeZone: 'Europe/Zurich' })
}

export default async function AdminChatPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  const expected = process.env.ADMIN_TOKEN

  if (!expected || !token || token !== expected) {
    notFound()
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white p-8">
        <h1 className="text-2xl font-semibold mb-4">Chatbot analytics</h1>
        <p className="text-[#fca5a5]">
          Configuration manquante : SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent etre definies.
        </p>
      </div>
    )
  }

  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })

  const [sessionsRes, statsRes] = await Promise.all([
    supabase
      .from('chat_sessions')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(100),
    supabase.from('chat_stats_7d').select('*').single(),
  ])

  const allSessions = (sessionsRes.data ?? []) as SessionRow[]
  const stats = (statsRes.data ?? null) as StatsRow | null
  const error = sessionsRes.error?.message || statsRes.error?.message

  // Tri par criticité business
  const leadsChauds = allSessions.filter((s) => s.outcome === 'lead_chaud')
  const leadsFroids = allSessions.filter((s) => s.outcome === 'lead_froid')
  const conversations = allSessions.filter(
    (s) => s.outcome === 'resolu' || s.outcome === null,
  )
  const courtsAbandons = allSessions.filter(
    (s) => s.outcome === 'court' || s.outcome === 'abandon',
  )

  const generatedAt = new Date().toLocaleTimeString('fr-CH', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Zurich',
  })

  return (
    <div className="min-h-screen bg-[#09090B] text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-1">Chatbot DKDP</h1>
            <p className="text-[#9CA3AF] text-sm">
              Mis a jour a {generatedAt}.{' '}
              <a
                href={`?token=${token}`}
                className="text-[#A78BFA] hover:text-[#c4b5fd] underline underline-offset-2"
              >
                Rafraichir
              </a>
            </p>
          </div>
          <div className="text-xs text-[#71717a] text-right">
            {allSessions.length} sessions affichees
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 rounded-2xl border border-[#fca5a5]/30 bg-[#fca5a5]/5">
            <p className="text-[#fca5a5] text-sm">Erreur Supabase : {error}</p>
          </div>
        )}

        {/* ── Stats 7 derniers jours ───────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-3">
            7 derniers jours
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <StatCard label="Sessions" value={stats?.total_sessions ?? 0} />
            <StatCard label="Messages moy." value={stats?.avg_messages ?? 0} />
            <StatCard label="Duree moy." value={formatDuration(stats?.avg_duration_sec ?? 0)} />
            <StatCard
              label="Leads chauds"
              value={stats?.leads_chauds ?? 0}
              accent="#FF6B00"
              emphasis={(stats?.leads_chauds ?? 0) > 0}
            />
            <StatCard label="Abandons" value={stats?.abandons ?? 0} accent="#fca5a5" />
            <StatCard label="Cout total" value={`${(stats?.total_cost_chf ?? 0).toFixed(3)} CHF`} />
          </div>
        </section>

        {/* ── 1. LEADS A RAPPELER (priorite maximale) ─────────────────── */}
        {leadsChauds.length > 0 && (
          <section className="mb-10">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: '#FF6B00', boxShadow: '0 0 12px #FF6B00' }}
                />
                A rappeler maintenant
              </h2>
              <span className="text-xs text-[#9CA3AF]">{leadsChauds.length} lead{leadsChauds.length > 1 ? 's' : ''} chaud{leadsChauds.length > 1 ? 's' : ''}</span>
            </div>
            <div className="space-y-3">
              {leadsChauds.map((s) => (
                <LeadCard key={s.id} session={s} priority />
              ))}
            </div>
          </section>
        )}

        {/* ── 2. Leads froids ─────────────────────────────────────────── */}
        {leadsFroids.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-3">
              Interets detectes (a recontacter quand possible)
            </h2>
            <div className="space-y-3">
              {leadsFroids.slice(0, 10).map((s) => (
                <LeadCard key={s.id} session={s} />
              ))}
            </div>
          </section>
        )}

        {/* ── 3. Conversations (resolues / sans outcome) ──────────────── */}
        {conversations.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-3">
              Conversations recentes
            </h2>
            <div className="space-y-2">
              {conversations.slice(0, 20).map((s) => (
                <CompactSessionRow key={s.id} session={s} />
              ))}
            </div>
          </section>
        )}

        {/* ── 4. Sessions courtes / abandons (repliable, info seulement) ──────── */}
        {courtsAbandons.length > 0 && (
          <section className="mb-10">
            <details className="group">
              <summary className="text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-3 cursor-pointer hover:text-[#9CA3AF] list-none flex items-center gap-2">
                <span className="inline-block transition-transform group-open:rotate-90">{'>'}</span>
                Sessions courtes et abandons ({courtsAbandons.length})
              </summary>
              <div className="space-y-2 mt-3">
                {courtsAbandons.slice(0, 30).map((s) => (
                  <CompactSessionRow key={s.id} session={s} />
                ))}
              </div>
            </details>
          </section>
        )}

        {/* ── Empty state ─────────────────────────────────────────────── */}
        {allSessions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#9CA3AF] mb-2">Aucune session pour l&apos;instant.</p>
            <p className="text-[#71717a] text-sm">
              Le widget commencera a logger des qu&apos;un visiteur engage la conversation.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Composants ────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  accent,
  emphasis,
}: {
  label: string
  value: string | number
  accent?: string
  emphasis?: boolean
}) {
  return (
    <div
      className="rounded-2xl p-4 border"
      style={{
        background: emphasis ? `${accent}15` : 'rgba(124,58,237,0.04)',
        borderColor: emphasis ? `${accent}50` : 'rgba(124,58,237,0.18)',
      }}
    >
      <div className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] mb-1">
        {label}
      </div>
      <div className="text-2xl font-semibold" style={{ color: accent ?? '#fff' }}>
        {value}
      </div>
    </div>
  )
}

// LeadCard : carte mise en avant pour les leads chauds/froids.
// Si Haiku a extrait des coordonnees, on les met en haut avec liens cliquables
// (tel: et mailto: marchent depuis iPhone, Mac et la plupart des navigateurs).
function LeadCard({ session, priority }: { session: SessionRow; priority?: boolean }) {
  const accent = priority ? '#FF6B00' : '#60a5fa'
  const phoneTel = session.contact_phone?.replace(/[^+0-9]/g, '') ?? ''
  const headline = [session.contact_name, session.contact_company].filter(Boolean).join(' · ')
  const hasContact = Boolean(
    session.contact_phone || session.contact_email || session.contact_name || session.contact_company,
  )

  return (
    <div
      className="rounded-2xl p-5 border"
      style={{
        background: priority ? `${accent}0c` : 'rgba(96,165,250,0.04)',
        borderColor: priority ? `${accent}40` : 'rgba(96,165,250,0.18)',
      }}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
        <span
          className="font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: `${accent}1a`,
            color: accent,
            border: `1px solid ${accent}40`,
          }}
        >
          {priority ? 'Lead chaud' : 'Lead froid'}
        </span>
        {session.intent && INTENT_LABEL[session.intent] && (
          <span
            className="px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(167,139,250,0.1)',
              color: '#A78BFA',
              border: '1px solid rgba(167,139,250,0.25)',
            }}
          >
            {INTENT_LABEL[session.intent]}
          </span>
        )}
        <span className="text-[#9CA3AF]">{formatRelative(session.started_at)}</span>
        <span className="text-[#71717a]">{'·'}</span>
        <span className="text-[#9CA3AF]">{session.messages_count} msg</span>
        <span className="text-[#71717a]">{'·'}</span>
        <span className="text-[#9CA3AF]">{formatDuration(session.duration_sec)}</span>
        {session.ip_country && (
          <>
            <span className="text-[#71717a]">{'·'}</span>
            <span className="text-[#9CA3AF]">{session.ip_country}</span>
          </>
        )}
      </div>

      {/* Bloc coordonnees : visible uniquement si Haiku a extrait quelque chose */}
      {hasContact && (
        <div
          className="mb-3 p-3 rounded-xl border"
          style={{
            background: priority ? 'rgba(255,107,0,0.08)' : 'rgba(96,165,250,0.06)',
            borderColor: priority ? 'rgba(255,107,0,0.25)' : 'rgba(96,165,250,0.20)',
          }}
        >
          <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: accent }}>
            Coordonnees laissees
          </div>
          {headline && (
            <p className="text-base font-semibold text-white mb-2">{headline}</p>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {session.contact_phone && (
              <a
                href={`tel:${phoneTel}`}
                className="text-white hover:opacity-80 transition-opacity font-medium"
              >
                {session.contact_phone}
              </a>
            )}
            {session.contact_email && (
              <a
                href={`mailto:${session.contact_email}`}
                className="hover:underline transition-opacity font-medium"
                style={{ color: '#A78BFA' }}
              >
                {session.contact_email}
              </a>
            )}
          </div>
        </div>
      )}

      {session.verbatim_question && (
        <div className="mb-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#71717a] mb-1">
            Question initiale du visiteur
          </div>
          <p
            className="text-base leading-relaxed pl-3 border-l-2"
            style={{ borderColor: accent, color: '#fff' }}
          >
            {'« '}
            {session.verbatim_question}
            {' »'}
          </p>
        </div>
      )}

      {session.summary && (
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#71717a] mb-1">
            Resume
          </div>
          <p className="text-sm text-[#e4e4e7] leading-relaxed">{session.summary}</p>
        </div>
      )}

      {session.referrer && (
        <p className="mt-3 text-xs text-[#71717a]">
          Depuis {session.referrer}
        </p>
      )}
    </div>
  )
}

// CompactSessionRow : ligne dense pour les conversations standard.
function CompactSessionRow({ session }: { session: SessionRow }) {
  const isAbandon = session.outcome === 'abandon'
  const isCourt = session.outcome === 'court'
  return (
    <div
      className="rounded-xl p-3 border text-sm"
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-[11px] text-[#71717a] tabular-nums">
          {formatRelative(session.started_at)}
        </span>
        <span className="text-[11px] text-[#71717a]">
          {session.messages_count} msg, {formatDuration(session.duration_sec)}
        </span>
        {(isAbandon || isCourt) && (
          <span
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
            style={{
              background: isAbandon ? 'rgba(252,165,165,0.1)' : 'rgba(156,163,175,0.1)',
              color: isAbandon ? '#fca5a5' : '#9CA3AF',
            }}
          >
            {isAbandon ? 'Abandon' : 'Court'}
          </span>
        )}
        <span className="flex-1 min-w-0 text-[#e4e4e7] truncate">
          {session.summary ?? session.verbatim_question ?? <span className="text-[#71717a] italic">Pas de resume</span>}
        </span>
      </div>
    </div>
  )
}
