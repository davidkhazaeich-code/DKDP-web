import { PRIX } from '@/data/pricing'

/**
 * Avant, pendant et après une formation (panneau « Impact réel » du hub
 * formation, FR et EN).
 *
 * 25/09/2026 : les barres à 20, 65, 80 et 95 % et la mention « progression type
 * observée en formation » n'avaient aucune source. Le panneau montre désormais
 * ce que l'offre engage, repris des étapes « Déroulement » de la même page.
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
    <ol className="w-full">
      {steps.map((step, i) => (
        <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute left-[13px] top-7 bottom-0 w-px"
              style={{ background: `linear-gradient(${step.color}88, ${steps[i + 1].color}88)` }}
            />
          )}
          <span
            className="relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${step.color}aa, ${step.color})` }}
          >
            {i + 1}
          </span>
          <div className="pt-1">
            <p className="text-text text-sm font-semibold leading-snug">{step.label}</p>
            <p className="text-text-muted text-xs mt-0.5 leading-snug">{step.sub}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
