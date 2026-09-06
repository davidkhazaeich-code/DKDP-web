-- DKDP chatbot analytics schema
-- A executer une fois dans le SQL editor du projet Supabase DKDP.
-- Idempotent : peut etre rejoue sans casser les donnees existantes.

-- ── Table 1 : chat_messages ───────────────────────────────────────────────
-- Une ligne par message echange (user ou assistant) pendant une conversation.
-- Ces lignes sont SUPPRIMEES apres generation du resume de la session,
-- sauf si la variable d'env CHAT_LOG_VERBATIM=true (mode calibration).
create table if not exists public.chat_messages (
  id            bigserial primary key,
  session_id    uuid not null,
  ts            timestamptz not null default now(),
  role          text not null check (role in ('user', 'assistant')),
  tokens_in     integer,
  tokens_out    integer,
  latency_ms    integer,
  verbatim_text text, -- nullable, rempli uniquement en mode calibration
  referrer      text, -- page d'ou part la conversation, portee par le message
  ip_country    text, -- pays du visiteur (x-vercel-ip-country)
  cache_read_tokens  integer, -- part de tokens_in lue du cache (facturee 10 %)
  cache_write_tokens integer  -- part de tokens_in ecrite au cache (facturee 125 %)
);

-- Rejouable sur une base deja en place (colonnes ajoutees le 2026-09-06).
alter table public.chat_messages add column if not exists referrer           text;
alter table public.chat_messages add column if not exists ip_country         text;
alter table public.chat_messages add column if not exists cache_read_tokens  integer;
alter table public.chat_messages add column if not exists cache_write_tokens integer;

create index if not exists chat_messages_session_idx on public.chat_messages (session_id);
create index if not exists chat_messages_ts_idx      on public.chat_messages (ts desc);

-- ── Table 2 : chat_sessions ───────────────────────────────────────────────
-- Une ligne par conversation completee, contient le resume Haiku + metadata.
-- C'est la table consultee par /admin/chat. Petite, rapide, pas de PII.
create table if not exists public.chat_sessions (
  id                uuid primary key,           -- = session_id
  started_at        timestamptz not null,
  ended_at          timestamptz not null default now(),
  duration_sec      integer not null,
  messages_count    integer not null,
  tokens_total      integer not null default 0,
  cost_chf          numeric(10, 5) not null default 0,
  summary           text,                        -- 2 phrases max generees par Haiku
  intent            text,                        -- devis | question_service | support | hors_sujet | autre
  outcome           text,                        -- resolu | abandon | lead_chaud | lead_froid | court
  verbatim_question text,                        -- 1ere question utilisateur (max 200 char) pour copy/FAQ
  referrer          text,                        -- page d'ou la conversation a demarre
  ip_country        text                         -- pays du visiteur (x-vercel-ip-country) pour stats geo
);

create index if not exists chat_sessions_started_idx on public.chat_sessions (started_at desc);
create index if not exists chat_sessions_intent_idx  on public.chat_sessions (intent);
create index if not exists chat_sessions_outcome_idx on public.chat_sessions (outcome);

-- ── RLS ───────────────────────────────────────────────────────────────────
-- On utilise uniquement la service role key cote serveur. RLS active
-- pour bloquer tout acces depuis l'anon key (pas d'API publique sur ces tables).
alter table public.chat_messages enable row level security;
alter table public.chat_sessions enable row level security;

-- Aucune policy = aucun acces via anon. La service role bypass RLS by design.

-- ── Vue d'aggregation : metriques 7 derniers jours ────────────────────────
-- Utile pour la page /admin/chat (top-cards). Materialized view pas
-- necessaire vu le volume attendu. SECURITY INVOKER pour respecter
-- les permissions du caller (alerte security_definer_view du linter).
drop view if exists public.chat_stats_7d;

create view public.chat_stats_7d
with (security_invoker = true)
as
select
  count(*)                                         as total_sessions,
  coalesce(avg(messages_count), 0)::numeric(10,1)  as avg_messages,
  coalesce(avg(duration_sec), 0)::integer          as avg_duration_sec,
  coalesce(sum(cost_chf), 0)::numeric(10,5)        as total_cost_chf,
  count(*) filter (where outcome = 'lead_chaud')   as leads_chauds,
  count(*) filter (where outcome = 'abandon')      as abandons
from public.chat_sessions
where started_at >= now() - interval '7 days';

-- ── Vue : sessions restant a resumer ──────────────────────────────────────
-- Le close client-side (sendBeacon) se perd une fois sur deux. Cette vue
-- alimente le balayage serveur /api/chat/sweep (cron Vercel toutes les
-- 15 min) : elle liste les sessions sans ligne de resume, et celles dont le
-- nombre de messages a augmente depuis le dernier resume (conversation
-- reprise apres une pause dans le meme onglet).
create or replace view public.chat_sessions_pending
with (security_invoker = true)
as
with agg as (
  select
    session_id,
    min(ts)  as first_ts,
    max(ts)  as last_ts,
    count(*) as messages_count
  from public.chat_messages
  group by session_id
)
select
  a.session_id,
  a.first_ts,
  a.last_ts,
  a.messages_count,
  (s.id is null) as jamais_resumee
from agg a
left join public.chat_sessions s on s.id = a.session_id
where s.id is null or a.messages_count > s.messages_count;

-- ── Auto-purge nocturne : sessions et messages > 30 jours ─────────────────
-- Bon compromis entre retention analytique et minimisation RGPD.
-- Tourne tous les jours a 03:00 UTC (heure creuse).
create extension if not exists pg_cron;

select cron.schedule(
  'purge-old-chat-data',
  '0 3 * * *',
  $$
    delete from public.chat_sessions where started_at < now() - interval '90 days';
    delete from public.chat_messages where ts < now() - interval '90 days';
  $$
);
