import { PRIX } from '@/data/pricing'
import { DiagramMotion } from '@/components/motion/DiagramMotion'
import { dg } from '@/components/motion/dg'

/**
 * Avant, pendant et après une formation (panneau « Impact réel » du hub
 * formation, FR et EN).
 *
 * 25/09/2026 : les barres à 20, 65, 80 et 95 % et la mention « progression type
 * observée en formation » n'avaient aucune source. Le panneau montre désormais
 * ce que l'offre engage, repris des étapes « Déroulement » de la même page.
 *
 * 29/09/2026 : la frise se déroule étape par étape (le trait descend jusqu'au rond
 * suivant, qui apparaît), puis une petite impulsion orange la parcourt de haut en bas
 * (kit dg-*, docs/claude/22-diagrammes-animes.md). Au repos, rendu identique.
 */
export function ProgressionDiagram({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const steps = lang === 'en'
    ? [
        { label: 'Before the training', sub: `${PRIX.discoveryCallMinutes}-minute call, then a programme you approve`, color: '#6B7280' },
        { label: 'During the session', sub: 'Exercises on your own files and tools', color: '#FF8C00' },
        { label: 'At the end', sub: 'PDF recap guide delivered', color: '#FF6900' },
        { label: 'The following 30 days', sub: 'Q&A session available', color: '#FF4500' },
      ]
    : [
        { label: 'Avant la formation', sub: `Appel de ${PRIX.discoveryCallMinutes} minutes, puis programme validé par vous`, color: '#6B7280' },
        { label: 'Pendant la session', sub: 'Exercices sur vos fichiers et vos outils', color: '#FF8C00' },
        { label: 'À la fin', sub: 'Guide PDF récapitulatif livré', color: '#FF6900' },
        { label: 'Les 30 jours suivants', sub: 'Session de questions-réponses disponible', color: '#FF4500' },
      ]
  return (
    <DiagramMotion as="ol" className="w-full" style={{ '--dg-step': '350ms', '--dg-loop-start': '1.8s' } as React.CSSProperties}>
      {steps.map((step, i) => (
        <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="dg-grow-y absolute left-[13px] top-7 bottom-0 w-px"
              style={{ ...dg(i, 350, { '--dg-dur': '400ms', '--dg-origin': 'center top' }), background: `linear-gradient(${step.color}88, ${steps[i + 1].color}88)` }}
            >
              <span className="dg-travel-y dg-tone-orange" style={{ '--dg-dot': '5px', '--dg-loop': '4.2s', '--dg-loop-at': `${i * 450}ms` } as React.CSSProperties} />
            </span>
          )}
          <span
            className="dg-pop relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
            style={{ ...dg(i, 150), background: `linear-gradient(135deg, ${step.color}aa, ${step.color})` }}
          >
            {i + 1}
          </span>
          <div className="dg-rise pt-1" style={dg(i, 200)}>
            <p className="text-text text-sm font-semibold leading-snug">{step.label}</p>
            <p className="text-text-muted text-xs mt-0.5 leading-snug">{step.sub}</p>
          </div>
        </li>
      ))}
    </DiagramMotion>
  )
}
