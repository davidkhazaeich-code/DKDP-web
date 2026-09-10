import { Check, Minus, Info } from 'lucide-react'
import { orange, green, chrome } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'

/**
 * Ou GPT-6 Astra est vraiment disponible selon l'abonnement ChatGPT, surface
 * par surface (Chat, Work, Codex). Etat au 10 septembre 2026, deploiement
 * encore echelonne. Source unique : fiche de faits Astra du 10.09.2026.
 *
 * C'est l'argument de formation le plus concret de la page : savoir quand
 * GPT-5.6 Sol suffit evite de payer Pro pour rien.
 */

type Cell = {
  /** 'astra' = GPT-6 Astra, 'other' = un autre modele, 'none' = surface absente */
  status: 'astra' | 'other' | 'none'
  label: string
  note?: string
}

type Row = { plan: string; price: string; chat: Cell; work: Cell; codex: Cell }

const ROWS: Record<Locale, Row[]> = {
  fr: [
    {
      plan: 'Free et Go',
      price: '0 et 8 USD par mois',
      chat:  { status: 'other', label: 'GPT-5.6 Luna', note: 'Pas d\'Astra' },
      work:  { status: 'none',  label: 'Non inclus' },
      codex: { status: 'none',  label: 'Pas d\'Astra' },
    },
    {
      plan: 'Plus',
      price: '20 USD, CHF 20 en Suisse',
      chat:  { status: 'other', label: 'GPT-5.6 Sol', note: 'Fenêtres d\'usage de 5 heures. OpenAI n\'a pas dit quand Astra rejoindrait le chat de Plus.' },
      work:  { status: 'astra', label: 'Astra' },
      codex: { status: 'astra', label: 'Astra' },
    },
    {
      plan: 'Pro',
      price: '100 ou 200 USD selon le palier',
      chat:  { status: 'astra', label: 'GPT-6 Pro', note: '50 messages par semaine au palier 100, 200 au palier 200' },
      work:  { status: 'astra', label: 'Astra' },
      codex: { status: 'astra', label: 'Astra' },
    },
    {
      plan: 'Business et Enterprise',
      price: 'Business Standard 20 à 25 USD par siège, Premium 100 à 125, Enterprise sur devis',
      chat:  { status: 'astra', label: 'Astra', note: 'Désactivé par défaut côté Enterprise, l\'administrateur l\'active' },
      work:  { status: 'astra', label: 'Astra' },
      codex: { status: 'astra', label: 'Astra' },
    },
  ],
  en: [
    {
      plan: 'Free and Go',
      price: '0 and 8 USD per month',
      chat:  { status: 'other', label: 'GPT-5.6 Luna', note: 'No Astra' },
      work:  { status: 'none',  label: 'Not included' },
      codex: { status: 'none',  label: 'No Astra' },
    },
    {
      plan: 'Plus',
      price: '20 USD, CHF 20 in Switzerland',
      chat:  { status: 'other', label: 'GPT-5.6 Sol', note: '5-hour usage windows. OpenAI has not said when Astra will reach the Plus chat.' },
      work:  { status: 'astra', label: 'Astra' },
      codex: { status: 'astra', label: 'Astra' },
    },
    {
      plan: 'Pro',
      price: '100 or 200 USD depending on the tier',
      chat:  { status: 'astra', label: 'GPT-6 Pro', note: '50 messages per week on the 100 tier, 200 on the 200 tier' },
      work:  { status: 'astra', label: 'Astra' },
      codex: { status: 'astra', label: 'Astra' },
    },
    {
      plan: 'Business and Enterprise',
      price: 'Business Standard 20 to 25 USD per seat, Premium 100 to 125, Enterprise on quote',
      chat:  { status: 'astra', label: 'Astra', note: 'Off by default on Enterprise, the administrator turns it on' },
      work:  { status: 'astra', label: 'Astra' },
      codex: { status: 'astra', label: 'Astra' },
    },
  ],
}

const COPY = {
  fr: {
    plan: 'Forfait',
    chat: 'Chat',
    work: 'Work',
    codex: 'Codex',
    legendAstra: 'GPT-6 Astra disponible',
    legendOther: 'Autre modèle',
    legendNone: 'Surface absente',
    notes: [
      'L\'usage d\'Astra est compris dans les forfaits. Des crédits supplémentaires s\'achètent à part, mais ils n\'ouvrent pas l\'accès au chat sur les forfaits qui ne l\'ont pas.',
      'Déploiement encore échelonné au 10 septembre 2026 : deux comptes identiques peuvent voir Astra à des jours différents. OpenAI remet l\'usage à zéro pour chaque jour sans accès, depuis le 3 septembre.',
      'Prix publics en USD, septembre 2026. Ils bougent : on les vérifie en début de session.',
    ],
  },
  en: {
    plan: 'Plan',
    chat: 'Chat',
    work: 'Work',
    codex: 'Codex',
    legendAstra: 'GPT-6 Astra available',
    legendOther: 'Another model',
    legendNone: 'Surface not available',
    notes: [
      'Astra usage is included in the plans. Extra credits can be bought separately, but they do not unlock the chat on plans that do not have it.',
      'Roll-out still staggered on 10 September 2026: two identical accounts can see Astra on different days. OpenAI resets usage for every day without access, since 3 September.',
      'Public prices in USD, September 2026. They move: we check them at the start of the session.',
    ],
  },
} as const

function StatusPill({ cell }: { cell: Cell }) {
  const tone =
    cell.status === 'astra'
      ? { color: green.color, bg: green.bg, border: green.border, Icon: Check }
      : cell.status === 'other'
        ? { color: chrome.color, bg: chrome.bg, border: chrome.border, Icon: Info }
        : { color: 'var(--text-muted)', bg: 'transparent', border: 'var(--surface-border)', Icon: Minus }
  const Icon = tone.Icon
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="inline-flex items-center gap-1.5 w-fit text-[11px] font-bold px-2.5 py-1 rounded-full"
        style={{ color: tone.color, background: tone.bg, border: `1px solid ${tone.border}` }}
      >
        <Icon size={11} aria-hidden="true" />
        {cell.label}
      </span>
      {cell.note && <span className="text-text-muted text-[11px] leading-snug">{cell.note}</span>}
    </div>
  )
}

export function AstraAvailability({ lang = 'fr' }: { lang?: Locale }) {
  const t = COPY[lang]
  const rows = ROWS[lang]
  return (
    <div
      className="rounded-[20px] p-5 md:p-8"
      style={{ background: 'var(--surface-subtle)', border: '1px solid var(--surface-border)' }}
    >
      {/* Mobile : une carte par forfait, les trois surfaces empilees. Un tableau a
          quatre colonnes cacherait Work et Codex hors ecran, or c'est tout le sujet. */}
      <div className="md:hidden space-y-3">
        {rows.map((row) => {
          const cells: { label: string; cell: Cell }[] = [
            { label: t.chat, cell: row.chat },
            { label: t.work, cell: row.work },
            { label: t.codex, cell: row.codex },
          ]
          return (
            <div
              key={row.plan}
              className="rounded-[12px] p-4"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--surface-border)' }}
            >
              <p className="text-text font-semibold text-[13px] leading-snug">{row.plan}</p>
              <p className="text-text-muted text-[11px] mt-1 leading-snug">{row.price}</p>
              <dl className="mt-3 space-y-3">
                {cells.map(({ label, cell }) => (
                  <div key={label} className="grid grid-cols-[56px_1fr] gap-3 items-start">
                    <dt className="text-[10px] font-bold uppercase tracking-wider pt-1.5" style={{ color: orange.color }}>{label}</dt>
                    <dd><StatusPill cell={cell} /></dd>
                  </div>
                ))}
              </dl>
            </div>
          )
        })}
      </div>

      {/* Desktop : le tableau, comme le comparatif de la page Claude. */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-border-strong">
              <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-wider text-text-muted w-[28%]">{t.plan}</th>
              <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-wider" style={{ color: orange.color }}>{t.chat}</th>
              <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-wider" style={{ color: orange.color }}>{t.work}</th>
              <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-wider" style={{ color: orange.color }}>{t.codex}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.plan} className={`border-b border-border align-top ${i % 2 === 0 ? 'bg-[var(--surface-subtle)]' : ''}`}>
                <td className="py-4 px-3">
                  <p className="text-text font-semibold text-[13px] leading-snug">{row.plan}</p>
                  <p className="text-text-muted text-[11px] mt-1 leading-snug">{row.price}</p>
                </td>
                <td className="py-4 px-3"><StatusPill cell={row.chat} /></td>
                <td className="py-4 px-3"><StatusPill cell={row.work} /></td>
                <td className="py-4 px-3"><StatusPill cell={row.codex} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-[11px] text-text-muted">
        <span className="inline-flex items-center gap-1.5"><Check size={11} style={{ color: green.color }} aria-hidden="true" />{t.legendAstra}</span>
        <span className="inline-flex items-center gap-1.5"><Info size={11} style={{ color: chrome.color }} aria-hidden="true" />{t.legendOther}</span>
        <span className="inline-flex items-center gap-1.5"><Minus size={11} aria-hidden="true" />{t.legendNone}</span>
      </div>

      <ul className="mt-5 space-y-2">
        {t.notes.map((n) => (
          <li key={n} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
            <span className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: orange.color }} aria-hidden="true" />
            {n}
          </li>
        ))}
      </ul>
    </div>
  )
}
