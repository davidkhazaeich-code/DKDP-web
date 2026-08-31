import { PenLine, LayoutTemplate, MousePointerClick, Boxes } from 'lucide-react'
import type { Locale } from '@/i18n/config'

/**
 * Le vocabulaire de la conception : wireframe, maquette, prototype, design system.
 *
 * Section volontairement pédagogique. Elle répond à une confusion réelle chez
 * les clients (« maquette » désigne tout et n'importe quoi selon l'interlocuteur)
 * et capte la longue traîne autour de la conception de maquette, indépendamment
 * du nom de l'outil.
 *
 * Chaque définition tient en une phrase autoportante, citable telle quelle par
 * un moteur génératif.
 */

type Term = {
  Icon: typeof PenLine
  term: string
  step: string
  definition: string
  purpose: string
  color: string
}

const CONTENT: Record<Locale, { terms: Term[]; stepLabel: string; purposeLabel: string }> = {
  fr: {
    stepLabel: 'Étape',
    purposeLabel: 'Ce que ça évite',
    terms: [
      {
        Icon: PenLine,
        term: 'Le wireframe',
        step: '01',
        definition:
          "Un wireframe est un schéma en noir et blanc qui pose ce qui va où sur un écran, sans aucune décision graphique. Ni couleur, ni police, ni image : uniquement des blocs et leur hiérarchie.",
        purpose: "De discuter de la couleur d'un bouton alors que personne n'est d'accord sur l'ordre des sections.",
        color: '#9CA3AF',
      },
      {
        Icon: LayoutTemplate,
        term: 'La maquette',
        step: '02',
        definition:
          "Une maquette est la représentation fidèle de l'écran final : couleurs réelles, typographie réelle, images réelles, aux bonnes dimensions. C'est ce que verra l'utilisateur, en image fixe.",
        purpose: "De découvrir le rendu de votre site au moment où il est développé, c'est-à-dire trop tard pour le changer sans coût.",
        color: '#FF8C00',
      },
      {
        Icon: MousePointerClick,
        term: 'Le prototype',
        step: '03',
        definition:
          "Un prototype relie vos maquettes entre elles pour qu'on puisse cliquer d'un écran à l'autre. Il se teste sur un vrai téléphone, avant qu'une seule ligne de code n'existe.",
        purpose: "De faire valider un parcours par une capture d'écran, quand seul l'usage révèle qu'il coince.",
        color: '#0ACF83',
      },
      {
        Icon: Boxes,
        term: 'Le design system',
        step: '04',
        definition:
          "Un design system rassemble vos éléments réutilisables (boutons, cartes, formulaires, couleurs, typographie) avec leurs règles d'usage. Modifier l'élément d'origine le met à jour partout où il apparaît.",
        purpose: "De repartir de zéro à chaque nouvelle page, et de voir cinq nuances d'orange cohabiter sur le même site.",
        color: '#A78BFA',
      },
    ],
  },
  en: {
    stepLabel: 'Step',
    purposeLabel: 'What it prevents',
    terms: [
      {
        Icon: PenLine,
        term: 'The wireframe',
        step: '01',
        definition:
          'A wireframe is a black-and-white sketch that settles what goes where on a screen, with no visual decisions at all. No colour, no typeface, no imagery: only blocks and their hierarchy.',
        purpose: 'Arguing about the colour of a button while nobody agrees on the order of the sections.',
        color: '#9CA3AF',
      },
      {
        Icon: LayoutTemplate,
        term: 'The mockup',
        step: '02',
        definition:
          'A mockup is a faithful picture of the finished screen: real colours, real typography, real images, at the right dimensions. It is what the user will see, as a still image.',
        purpose: 'Discovering what your site looks like once it is being built, which is too late to change it cheaply.',
        color: '#FF8C00',
      },
      {
        Icon: MousePointerClick,
        term: 'The prototype',
        step: '03',
        definition:
          'A prototype links your mockups together so you can click from one screen to the next. It can be tested on a real phone before a single line of code exists.',
        purpose: 'Signing off a user journey from a screenshot, when only real use reveals where it stalls.',
        color: '#0ACF83',
      },
      {
        Icon: Boxes,
        term: 'The design system',
        step: '04',
        definition:
          'A design system gathers your reusable pieces (buttons, cards, forms, colours, typography) together with the rules for using them. Editing the original updates every place it appears.',
        purpose: 'Starting from scratch on every new page, and ending up with five shades of orange on one site.',
        color: '#A78BFA',
      },
    ],
  },
}

export function DesignVocabulary({ lang = 'fr' }: { lang?: Locale }) {
  const t = CONTENT[lang]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {t.terms.map(({ Icon, term, step, definition, purpose, color }) => (
        <div
          key={term}
          className="flex flex-col gap-4 rounded-[16px] border border-border bg-bg-card p-6 h-full"
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-[10px] flex-shrink-0"
              style={{ background: `${color}1A`, border: `1px solid ${color}3D` }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
                {t.stepLabel} {step}
              </p>
              <h3 className="text-text font-bold text-lg leading-tight">{term}</h3>
            </div>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed">{definition}</p>

          <div className="mt-auto pt-3 border-t border-border">
            <p className="text-text-muted text-[10px] font-semibold uppercase tracking-wide mb-1">
              {t.purposeLabel}
            </p>
            <p className="text-text-secondary text-[12.5px] leading-snug">{purpose}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
