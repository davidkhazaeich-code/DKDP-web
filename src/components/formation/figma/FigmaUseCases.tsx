import { Globe2, Smartphone, Palette, FileSearch, Wrench, Handshake } from 'lucide-react'
import type { Locale } from '@/i18n/config'

/**
 * Cas d'usage concrets, formulés comme des situations d'entreprise.
 *
 * Chaque carte suit la même mécanique : la situation, puis ce que la formation
 * change concrètement. C'est ce format « problème réel, issue réelle » que les
 * moteurs génératifs reprennent quand on leur demande à quoi sert une formation
 * Figma en entreprise.
 */

type UseCase = { Icon: typeof Globe2; title: string; situation: string; outcome: string }

const CONTENT: Record<Locale, { outcomeLabel: string; cases: UseCase[] }> = {
  fr: {
    outcomeLabel: 'Après la formation',
    cases: [
      {
        Icon: Globe2,
        title: 'Refondre le site de l’entreprise',
        situation:
          "Vous décrivez ce que vous voulez à l'agence, elle propose autre chose, et trois allers-retours plus tard le budget a fondu.",
        outcome:
          'Vous arrivez avec les écrans déjà dessinés. Le devis porte sur du développement, plus sur de l’interprétation.',
      },
      {
        Icon: Smartphone,
        title: 'Lancer une application interne',
        situation:
          'Le projet part en développement sur la foi de captures d’écran et d’un tableau de spécifications que personne ne lit pareil.',
        outcome:
          'Le parcours se teste sur un vrai téléphone avant la première ligne de code. Les erreurs se corrigent quand elles ne coûtent rien.',
      },
      {
        Icon: Palette,
        title: 'Tenir une charte sur la durée',
        situation:
          'Chaque support repart d’un fichier différent, et cinq nuances de la couleur de marque cohabitent sur les documents officiels.',
        outcome:
          'Une bibliothèque partagée fait autorité. Modifier la couleur à la source la met à jour partout, sans repasser sur chaque fichier.',
      },
      {
        Icon: FileSearch,
        title: 'Préparer un appel d’offres',
        situation:
          "Vous devez faire valider une direction en interne, mais il n'existe rien à montrer, seulement un document de texte.",
        outcome:
          'Une maquette et un prototype cliquable rendent la décision possible. On arbitre sur ce qu’on voit, pas sur ce qu’on imagine.',
      },
      {
        Icon: Wrench,
        title: 'Documenter une interface métier',
        situation:
          'Vos développeurs reconstruisent des écrans techniques à partir de consignes orales et de captures annotées à la main.',
        outcome:
          'Le Dev Mode donne les mesures, les couleurs et les exports. La spécification devient lisible sans être designer.',
      },
      {
        Icon: Handshake,
        title: 'Reprendre la main sur un prestataire',
        situation:
          'Chaque modification passe par un e-mail, un appel, puis une facture, parce que vous ne pouvez rien montrer vous-même.',
        outcome:
          'Vous produisez la proposition d’écran en interne. Le prestataire exécute au lieu d’interpréter, et vous gardez le contrôle.',
      },
    ],
  },
  en: {
    outcomeLabel: 'After the training',
    cases: [
      {
        Icon: Globe2,
        title: 'Redesigning the company website',
        situation:
          'You describe what you want to the agency, they propose something else, and three rounds later the budget has gone.',
        outcome:
          'You arrive with the screens already drawn. The quote covers development, not interpretation.',
      },
      {
        Icon: Smartphone,
        title: 'Launching an internal application',
        situation:
          'The project goes into development on the strength of screenshots and a spec sheet no two people read the same way.',
        outcome:
          'The journey gets tested on a real phone before the first line of code. Mistakes are fixed while they still cost nothing.',
      },
      {
        Icon: Palette,
        title: 'Holding a brand together over time',
        situation:
          'Every asset starts from a different file, and five shades of the brand colour coexist across official documents.',
        outcome:
          'A shared library becomes the reference. Changing the colour at the source updates it everywhere, with no file-by-file pass.',
      },
      {
        Icon: FileSearch,
        title: 'Preparing a tender',
        situation:
          'You need internal sign-off on a direction, but there is nothing to show, only a text document.',
        outcome:
          'A mockup and a clickable prototype make the decision possible. People judge what they see, not what they picture.',
      },
      {
        Icon: Wrench,
        title: 'Documenting a technical interface',
        situation:
          'Your developers rebuild operational screens from verbal instructions and hand-annotated screenshots.',
        outcome:
          'Dev Mode supplies measurements, colours and exports. The specification becomes readable without being a designer.',
      },
      {
        Icon: Handshake,
        title: 'Taking back control from a supplier',
        situation:
          'Every change goes through an email, a call, then an invoice, because you cannot show anything yourself.',
        outcome:
          'You produce the proposed screen in house. The supplier executes instead of interpreting, and you keep control.',
      },
    ],
  },
}

export function FigmaUseCases({ lang = 'fr', accent = '#FF8C00' }: { lang?: Locale; accent?: string }) {
  const t = CONTENT[lang]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {t.cases.map(({ Icon, title, situation, outcome }) => (
        <div
          key={title}
          className="flex flex-col gap-3 rounded-[16px] border border-border bg-bg-card p-6 h-full"
        >
          <div
            className="flex h-11 w-11 items-center justify-center rounded-[10px] flex-shrink-0"
            style={{ background: 'rgba(255,140,0,0.10)', border: '1px solid rgba(255,140,0,0.25)' }}
          >
            <Icon size={19} style={{ color: accent }} />
          </div>

          <h3 className="text-text font-bold text-[15px] leading-snug">{title}</h3>

          <p className="text-text-muted text-[13px] leading-relaxed">{situation}</p>

          <div className="mt-auto pt-3 border-t border-border">
            <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: accent }}>
              {t.outcomeLabel}
            </p>
            <p className="text-text-secondary text-[13px] leading-snug">{outcome}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
