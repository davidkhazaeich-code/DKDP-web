import Image from 'next/image'
import { violet, orange } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'

/**
 * Comparatif rapide Claude / ChatGPT / Copilot, au meme format que celui de la
 * page Formation Claude (memes 8 criteres, meme notation sur 5). Notes relues
 * pour les versions de septembre 2026 : Claude Fable 5.1, GPT-6 Astra,
 * Microsoft Copilot (propulse par GPT-6 Astra depuis le 4 septembre 2026).
 *
 * Les couleurs de colonne ChatGPT et Copilot reprennent celles du tableau de la
 * page Claude, pour que les deux tableaux se lisent pareil.
 */

const GPT_COLOR = '#10b981'
const COPILOT_COLOR = '#3b82f6'

type Row = { crit: string; sub: string; claude: number; gpt: number; cop: number }

const ROWS: Record<Locale, Row[]> = {
  fr: [
    { crit: 'Contexte long (documents entiers)',            sub: 'Claude 5 : 1 million de tokens · GPT-6 Astra : 1 million de tokens',      claude: 5, gpt: 5, cop: 2 },
    { crit: 'Raisonnement et analyse complexe',             sub: 'Claude Fable 5.1 vs GPT-6 Astra, raisonnement adaptatif',                 claude: 5, gpt: 5, cop: 3 },
    { crit: 'Confidentialité et contrôle des données',      sub: 'Plans Team, Business et Enterprise : pas d\'entraînement sur vos données', claude: 5, gpt: 4, cop: 4 },
    { crit: 'Travail collaboratif (Projects, GPTs)',        sub: 'Mémoire partagée, fichiers, instructions',                                claude: 5, gpt: 4, cop: 4 },
    { crit: 'Développement et code (agent)',                sub: 'Claude Code vs Codex vs GitHub Copilot',                                  claude: 5, gpt: 4, cop: 4 },
    { crit: 'Analyse de documents visuels (PDF, images)',   sub: 'Tableaux, graphiques, schémas scannés',                                   claude: 5, gpt: 4, cop: 3 },
    { crit: 'Intégration Microsoft 365',                    sub: 'Word, Excel, Outlook, Teams natif · Copilot propulsé par GPT-6 Astra',    claude: 2, gpt: 3, cop: 5 },
    { crit: 'Génération d\'images',                         sub: 'GPT Image vs Image Creator vs aucun natif',                               claude: 1, gpt: 5, cop: 4 },
  ],
  en: [
    { crit: 'Long context (entire documents)',              sub: 'Claude 5: 1 million tokens · GPT-6 Astra: 1 million tokens',             claude: 5, gpt: 5, cop: 2 },
    { crit: 'Complex reasoning and analysis',               sub: 'Claude Fable 5.1 vs GPT-6 Astra, adaptive reasoning',                    claude: 5, gpt: 5, cop: 3 },
    { crit: 'Confidentiality and data control',             sub: 'Team, Business and Enterprise plans: no training on your data',          claude: 5, gpt: 4, cop: 4 },
    { crit: 'Collaborative work (Projects, GPTs)',          sub: 'Shared memory, files, instructions',                                      claude: 5, gpt: 4, cop: 4 },
    { crit: 'Development and code (agent)',                 sub: 'Claude Code vs Codex vs GitHub Copilot',                                  claude: 5, gpt: 4, cop: 4 },
    { crit: 'Visual document analysis (PDF, images)',       sub: 'Tables, charts, scanned diagrams',                                        claude: 5, gpt: 4, cop: 3 },
    { crit: 'Microsoft 365 integration',                    sub: 'Word, Excel, Outlook, Teams native · Copilot powered by GPT-6 Astra',     claude: 2, gpt: 3, cop: 5 },
    { crit: 'Image generation',                             sub: 'GPT Image vs Image Creator vs none native',                               claude: 1, gpt: 5, cop: 4 },
  ],
}

const COPY = {
  fr: {
    tag: 'Comparatif rapide',
    basis: 'Évaluation DKDP basée sur les versions de septembre 2026 (Claude Fable 5.1, GPT-6 Astra, Microsoft Copilot)',
    crit: 'Critère',
    reco: 'Recommandation DKDP : Claude pour l\'analyse et la profondeur · ChatGPT Astra pour automatiser un poste de travail et les images · Copilot si Microsoft 365 est votre stack',
  },
  en: {
    tag: 'Quick comparison',
    basis: 'DKDP assessment based on the September 2026 versions (Claude Fable 5.1, GPT-6 Astra, Microsoft Copilot)',
    crit: 'Criterion',
    reco: 'DKDP recommendation: Claude for analysis and depth · ChatGPT Astra to automate a workstation and for images · Copilot if Microsoft 365 is your stack',
  },
} as const

function Stars({ n, color }: { n: number; color: string }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <span
          key={idx}
          className="text-[13px] leading-none"
          style={{ color: idx < n ? color : 'var(--surface-border)' }}
        >
          ★
        </span>
      ))}
      <span
        className="ml-1.5 text-[10px] font-bold tabular-nums"
        style={{ color: n >= 4 ? color : 'var(--text-muted)' }}
      >
        {n}/5
      </span>
    </span>
  )
}

export function ToolComparison({ lang = 'fr' }: { lang?: Locale }) {
  const t = COPY[lang]
  const rows = ROWS[lang]
  const V = violet.color
  return (
    <div
      className="rounded-[20px] p-6 md:p-8"
      style={{ background: 'var(--surface-subtle)', border: '1px solid var(--surface-border)' }}
    >
      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: orange.color }}>{t.tag}</p>
      <p className="text-text-muted text-xs mb-6">{t.basis}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border-strong">
              <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-text-muted w-[40%]">{t.crit}</th>
              <th className="text-center py-3 px-4 text-xs font-bold" style={{ color: V }}>
                <div className="inline-flex items-center gap-1.5">
                  <Image src="/images/partners/claude-logo.png" alt="" width={14} height={14} className="rounded-[3px]" />
                  Claude
                </div>
              </th>
              <th className="text-center py-3 px-4 text-xs font-bold" style={{ color: GPT_COLOR }}>
                <div className="inline-flex items-center gap-1.5">
                  <Image src="/images/partners/chatgpt-logo.png" alt="" width={14} height={14} className="rounded-[3px]" />
                  ChatGPT
                </div>
              </th>
              <th className="text-center py-3 px-4 text-xs font-bold" style={{ color: COPILOT_COLOR }}>
                <div className="inline-flex items-center gap-1.5">
                  <Image src="/images/partners/copilot-logo.png" alt="" width={14} height={14} className="rounded-[3px]" />
                  Copilot
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.crit} className={`border-b border-border ${i % 2 === 0 ? 'bg-[var(--surface-subtle)]' : ''}`}>
                <td className="py-3 px-4">
                  <p className="text-text font-medium text-[13px] leading-snug">{row.crit}</p>
                  <p className="text-text-muted text-[10px] mt-0.5 leading-snug">{row.sub}</p>
                </td>
                <td className="py-3 px-4 text-center"><Stars n={row.claude} color={V} /></td>
                <td className="py-3 px-4 text-center"><Stars n={row.gpt} color={GPT_COLOR} /></td>
                <td className="py-3 px-4 text-center"><Stars n={row.cop} color={COPILOT_COLOR} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-text-muted text-[11px] mt-5 text-right">{t.reco}</p>
    </div>
  )
}
