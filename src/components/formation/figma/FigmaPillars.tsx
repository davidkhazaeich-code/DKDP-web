import type { Locale } from '@/i18n/config'

/**
 * Les trois mécanismes de Figma sur lesquels repose la formation.
 *
 * Version bilingue de l'ancien FigmaFeatureCards, resté monolingue alors que la
 * page anglaise l'affichait en français.
 */

type Feature = { name: string; tag: string; bestFor: string; detail: string; c: string; cbg: string; cborder: string }

const CONTENT: Record<Locale, { bestForLabel: string; detailLabel: string; features: Feature[] }> = {
  fr: {
    bestForLabel: 'Idéal pour',
    detailLabel: 'Bénéfice',
    features: [
      {
        name: 'Auto Layout',
        tag: 'Responsive sans code',
        bestFor: "Des cadres qui s'adaptent tout seuls au contenu et à la taille de l'écran",
        detail: 'Vos écrans mobile, tablette et ordinateur construits en parallèle',
        c: '#F24E1E',
        cbg: 'rgba(242,78,30,0.08)',
        cborder: 'rgba(242,78,30,0.22)',
      },
      {
        name: 'Composants',
        tag: 'Design system',
        bestFor: 'Boutons, cartes et formulaires réutilisés sur toutes les pages, avec leurs variantes',
        detail: 'Une modification à un endroit, répercutée partout',
        c: '#A78BFA',
        cbg: 'rgba(167,139,250,0.10)',
        cborder: 'rgba(167,139,250,0.22)',
      },
      {
        name: 'Prototypes',
        tag: 'Parcours cliquables',
        bestFor: "Cliquer d'un écran à l'autre pour valider l'expérience avant le développement",
        detail: 'Démonstrations client, tests utilisateurs, validation interne',
        c: '#0ACF83',
        cbg: 'rgba(10,207,131,0.08)',
        cborder: 'rgba(10,207,131,0.22)',
      },
    ],
  },
  en: {
    bestForLabel: 'Best for',
    detailLabel: 'What you gain',
    features: [
      {
        name: 'Auto Layout',
        tag: 'Responsive without code',
        bestFor: 'Frames that adapt on their own to the content and the screen size',
        detail: 'Mobile, tablet and desktop screens built in parallel',
        c: '#F24E1E',
        cbg: 'rgba(242,78,30,0.08)',
        cborder: 'rgba(242,78,30,0.22)',
      },
      {
        name: 'Components',
        tag: 'Design system',
        bestFor: 'Buttons, cards and forms reused across every page, with their variants',
        detail: 'One edit in one place, reflected everywhere',
        c: '#A78BFA',
        cbg: 'rgba(167,139,250,0.10)',
        cborder: 'rgba(167,139,250,0.22)',
      },
      {
        name: 'Prototypes',
        tag: 'Clickable journeys',
        bestFor: 'Clicking from screen to screen to validate the experience before development',
        detail: 'Client demos, user testing, internal sign-off',
        c: '#0ACF83',
        cbg: 'rgba(10,207,131,0.08)',
        cborder: 'rgba(10,207,131,0.22)',
      },
    ],
  },
}

export function FigmaPillars({ lang = 'fr' }: { lang?: Locale }) {
  const t = CONTENT[lang]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
      {t.features.map((f) => (
        <div
          key={f.name}
          className="p-4 rounded-[12px] flex flex-col gap-3"
          style={{ background: f.cbg, border: `1px solid ${f.cborder}` }}
        >
          <div>
            <p className="text-text font-bold text-sm mb-1.5">{f.name}</p>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block"
              style={{ background: 'var(--bg-card)', color: f.c, border: `1px solid ${f.cborder}` }}
            >
              {f.tag}
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">{t.bestForLabel}</p>
              <p className="text-[12px] font-semibold leading-snug" style={{ color: f.c }}>
                {f.bestFor}
              </p>
            </div>
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">{t.detailLabel}</p>
              <p className="text-text text-[12px] leading-snug">{f.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
