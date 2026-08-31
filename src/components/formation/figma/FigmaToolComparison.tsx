import type { Locale } from '@/i18n/config'

/**
 * Comparatif Figma / Canva / Adobe XD / Sketch.
 *
 * Bloc pensé pour la citation par les moteurs IA : les tableaux comparatifs
 * sont le format le plus extrait par les moteurs génératifs. Chaque cellule
 * est une affirmation courte et autoportante, lisible hors de son contexte.
 *
 * Rendu : tableau sur desktop, cartes empilées sur mobile (même contenu, un
 * seul jeu de données, pas de duplication de texte pour le crawl).
 */

type Tool = {
  name: string
  maker: string
  color: string
  cells: string[]
  verdict: string
  highlight?: boolean
}

const CONTENT: Record<Locale, { criteria: string[]; tools: Tool[]; verdictLabel: string; note: string }> = {
  fr: {
    verdictLabel: 'Notre verdict',
    criteria: [
      'Conçu pour',
      'Travail à plusieurs',
      'Prix pour démarrer',
      'Fonctionne sur',
      'Transmission aux développeurs',
    ],
    note: "Comparatif établi en août 2026. Adobe a placé XD en maintenance et ne le vend plus séparément depuis l'échec du rachat de Figma.",
    tools: [
      {
        name: 'Figma',
        maker: 'Standard du marché',
        color: '#F24E1E',
        highlight: true,
        cells: [
          'Interfaces de sites web et applications',
          'Temps réel, plusieurs curseurs dans le même fichier',
          'Gratuit jusqu’à trois fichiers partagés, sans date de fin',
          'Navigateur, Mac et Windows, interface en français',
          'Dev Mode intégré, mesures et code CSS repris directement',
        ],
        verdict: "C'est l'outil sur lequel on forme. Le reste de la page part de là.",
      },
      {
        name: 'Canva',
        maker: 'Visuels marketing',
        color: '#7C3AED',
        cells: [
          'Affiches, posts, présentations, documents',
          'Temps réel, très simple à prendre en main',
          'Gratuit, offre Pro pour la marque',
          'Navigateur, mobile, Mac et Windows',
          'Aucune, ce n’est pas sa fonction',
        ],
        verdict: "Excellent pour la communication, inadapté à la conception d'interface.",
      },
      {
        name: 'Adobe XD',
        maker: 'En fin de vie',
        color: '#9CA3AF',
        cells: [
          'Interfaces, à l’époque où Adobe l’investissait',
          'Partage de fichiers, pas de vrai temps réel',
          'Plus vendu séparément',
          'Mac et Windows',
          'Partage de spécifications, développement arrêté',
        ],
        verdict: "À écarter pour un nouveau projet : l'outil ne reçoit plus de fonctionnalités.",
      },
      {
        name: 'Sketch',
        maker: 'Historique macOS',
        color: '#9CA3AF',
        cells: [
          'Interfaces, forte culture design',
          'Collaboration ajoutée après coup',
          'Payant dès la première maquette',
          'macOS uniquement',
          'Passe par des extensions tierces',
        ],
        verdict: 'Solide, mais exclut vos collaborateurs sous Windows.',
      },
    ],
  },
  en: {
    verdictLabel: 'Our verdict',
    criteria: [
      'Built for',
      'Working together',
      'Cost to start',
      'Runs on',
      'Handover to developers',
    ],
    note: 'Comparison as of August 2026. Adobe moved XD into maintenance and no longer sells it separately after the failed Figma acquisition.',
    tools: [
      {
        name: 'Figma',
        maker: 'Industry standard',
        color: '#F24E1E',
        highlight: true,
        cells: [
          'Website and application interfaces',
          'Real time, several cursors in the same file',
          'Free for up to three shared files, with no end date',
          'Browser, Mac and Windows, French interface available',
          'Built-in Dev Mode, measurements and CSS taken straight from the file',
        ],
        verdict: 'This is the tool we train on. Everything below follows from it.',
      },
      {
        name: 'Canva',
        maker: 'Marketing visuals',
        color: '#7C3AED',
        cells: [
          'Posters, posts, presentations, documents',
          'Real time, very easy to pick up',
          'Free, with a Pro tier for brand assets',
          'Browser, mobile, Mac and Windows',
          'None, that is not what it does',
        ],
        verdict: 'Excellent for communication, unsuited to interface design.',
      },
      {
        name: 'Adobe XD',
        maker: 'End of life',
        color: '#9CA3AF',
        cells: [
          'Interfaces, back when Adobe still invested in it',
          'File sharing, no true real-time editing',
          'No longer sold separately',
          'Mac and Windows',
          'Spec sharing, development has stopped',
        ],
        verdict: 'Rule it out for a new project: the tool no longer receives features.',
      },
      {
        name: 'Sketch',
        maker: 'macOS veteran',
        color: '#9CA3AF',
        cells: [
          'Interfaces, with a strong design culture',
          'Collaboration bolted on later',
          'Paid from the very first mockup',
          'macOS only',
          'Relies on third-party plugins',
        ],
        verdict: 'Solid, but it locks out every colleague on Windows.',
      },
    ],
  },
}

export function FigmaToolComparison({ lang = 'fr' }: { lang?: Locale }) {
  const t = CONTENT[lang]

  return (
    <div>
      {/* Desktop : tableau */}
      <div className="hidden md:block overflow-hidden rounded-[16px] border border-border">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            {lang === 'fr'
              ? 'Comparatif des outils de maquette : Figma, Canva, Adobe XD et Sketch'
              : 'Comparison of design tools: Figma, Canva, Adobe XD and Sketch'}
          </caption>
          <thead>
            <tr className="bg-bg-card">
              <th scope="col" className="p-4 w-[152px]" />
              {t.tools.map((tool) => (
                <th key={tool.name} scope="col" className="p-4 align-bottom">
                  <span className="block text-text font-bold text-[15px]">{tool.name}</span>
                  <span className="block text-[11px] font-semibold mt-0.5" style={{ color: tool.color }}>
                    {tool.maker}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.criteria.map((criterion, row) => (
              <tr key={criterion} className="border-t border-border">
                <th scope="row" className="p-4 align-top text-text-muted text-[11px] font-semibold uppercase tracking-wide">
                  {criterion}
                </th>
                {t.tools.map((tool) => (
                  <td
                    key={tool.name}
                    className="p-4 align-top text-[12.5px] leading-snug"
                    style={{
                      color: tool.highlight ? 'var(--color-text)' : 'var(--color-text-secondary)',
                      background: tool.highlight ? 'rgba(242,78,30,0.05)' : undefined,
                    }}
                  >
                    {tool.cells[row]}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-border">
              <th scope="row" className="p-4 align-top text-text-muted text-[11px] font-semibold uppercase tracking-wide">
                {t.verdictLabel}
              </th>
              {t.tools.map((tool) => (
                <td
                  key={tool.name}
                  className="p-4 align-top text-[12.5px] leading-snug italic"
                  style={{
                    color: tool.highlight ? 'var(--color-text)' : 'var(--color-text-muted)',
                    background: tool.highlight ? 'rgba(242,78,30,0.05)' : undefined,
                  }}
                >
                  {tool.verdict}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile : cartes */}
      <div className="md:hidden space-y-3">
        {t.tools.map((tool) => (
          <div
            key={tool.name}
            className="rounded-[14px] border p-4"
            style={{
              borderColor: tool.highlight ? 'rgba(242,78,30,0.28)' : 'var(--color-border)',
              background: tool.highlight ? 'rgba(242,78,30,0.05)' : 'var(--color-bg-card)',
            }}
          >
            <p className="text-text font-bold text-[15px]">{tool.name}</p>
            <p className="text-[11px] font-semibold mb-3" style={{ color: tool.color }}>
              {tool.maker}
            </p>
            <dl className="space-y-2">
              {t.criteria.map((criterion, i) => (
                <div key={criterion}>
                  <dt className="text-text-muted text-[10px] font-semibold uppercase tracking-wide">{criterion}</dt>
                  <dd className="text-text-secondary text-[12.5px] leading-snug">{tool.cells[i]}</dd>
                </div>
              ))}
              <div>
                <dt className="text-text-muted text-[10px] font-semibold uppercase tracking-wide">{t.verdictLabel}</dt>
                <dd className="text-text text-[12.5px] leading-snug italic">{tool.verdict}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <p className="text-text-muted text-[11px] mt-4">{t.note}</p>
    </div>
  )
}
