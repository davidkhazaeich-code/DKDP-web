import { violet, orange } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'

/**
 * Frise du déploiement de ChatGPT Ads, du test américain à l'ouverture
 * suisse. Dates : fiche `docs/chatgpt-ads-facts-2026-09-10.md` (pages OpenAI,
 * sauf le 24 août qui vient de la presse spécialisée : OpenAI écrivait
 * « la semaine prochaine » le 18 août).
 */

type Milestone = { date: string; title: string; text: string; accent?: 'violet' | 'orange' }

const MILESTONES: Record<Locale, Milestone[]> = {
  fr: [
    { date: '9 février 2026', title: 'Premier test aux États-Unis', text: 'Utilisateurs adultes des forfaits Free et Go. Plus, Pro et les forfaits entreprise restent sans publicité.' },
    { date: '26 mars 2026', title: 'Canada, Australie, Nouvelle-Zélande', text: 'OpenAI ne constate aucun impact sur les indicateurs de confiance et un faible taux de rejet des annonces.' },
    { date: '5 mai 2026', title: 'Ads Manager en libre-service', text: 'Version bêta ouverte aux PME, enchères au clic ajoutées au CPM, Conversions API et mesure par pixel.' },
    { date: 'Mai à août 2026', title: 'Cinq marchés de plus', text: 'Royaume-Uni, Mexique, Brésil, Japon et Corée du Sud rejoignent le programme.' },
    { date: '18 août 2026', title: 'L\'Europe annoncée', text: '31 marchés européens, d\'abord via l\'équipe Ads Solutions d\'OpenAI et les agences partenaires.' },
    { date: '24 août 2026', title: 'Premières annonces en Suisse', text: 'Les utilisateurs Free et Go de Suisse et de l\'Union européenne voient les premières cartes sponsorisées.', accent: 'orange' },
    { date: '31 août 2026', title: 'Les entreprises suisses entrent', text: 'Ads Manager en libre-service dans les 31 marchés. La Suisse est listée comme disponible par OpenAI.', accent: 'violet' },
  ],
  en: [
    { date: '9 February 2026', title: 'First test in the United States', text: 'Adult users on the Free and Go plans. Plus, Pro and business plans stay ad-free.' },
    { date: '26 March 2026', title: 'Canada, Australia, New Zealand', text: 'OpenAI reports no impact on user trust metrics and a low ad rejection rate.' },
    { date: '5 May 2026', title: 'Self-serve Ads Manager', text: 'Beta open to SMEs, cost-per-click bidding added to CPM, Conversions API and pixel measurement.' },
    { date: 'May to August 2026', title: 'Five more markets', text: 'United Kingdom, Mexico, Brazil, Japan and South Korea join the programme.' },
    { date: '18 August 2026', title: 'Europe announced', text: '31 European markets, at first through OpenAI\'s Ads Solutions team and partner agencies.' },
    { date: '24 August 2026', title: 'First ads in Switzerland', text: 'Free and Go users in Switzerland and the European Union see the first sponsored cards.', accent: 'orange' },
    { date: '31 August 2026', title: 'Swiss businesses can enter', text: 'Self-serve Ads Manager across all 31 markets. Switzerland is listed as available by OpenAI.', accent: 'violet' },
  ],
}

export function RolloutTimeline({ lang = 'fr' }: { lang?: Locale }) {
  const items = MILESTONES[lang]
  return (
    <div className="relative -mx-6 px-6 md:mx-0 md:px-0">
      <ol
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-7 md:overflow-visible md:pb-0 list-none m-0 p-0"
        style={{ scrollbarWidth: 'thin' }}
      >
        {items.map((m, i) => {
          const accent = m.accent === 'orange' ? orange : m.accent === 'violet' ? violet : null
          return (
            <li
              key={m.date}
              className="snap-start flex-shrink-0 w-[240px] md:w-auto flex flex-col gap-3 p-5 rounded-[14px] border h-full"
              style={{
                background: accent ? accent.bg : 'var(--bg-card)',
                borderColor: accent ? accent.border : 'var(--border)',
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ background: accent ? accent.color : 'var(--text-muted)' }}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-bold tracking-wide" style={{ color: accent ? accent.color : 'var(--text-secondary)' }}>
                  {m.date}
                </span>
              </div>
              <p className="text-text font-semibold text-sm leading-snug">{m.title}</p>
              <p className="text-text-muted text-xs leading-relaxed">{m.text}</p>
              <span className="sr-only">{`${i + 1} / ${items.length}`}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
