import type { CSSProperties } from 'react'
import { DiagramMotion } from './DiagramMotion'

/**
 * Ligne directrice d'une rangée d'étapes (pages service, sur ordinateur seulement) : elle se
 * trace de gauche à droite quand la rangée arrive à l'écran, puis une traînée lumineuse la
 * parcourt de temps en temps, dans le sens des étapes. Les cartes étant opaques, le trait ne
 * se voit qu'entre elles : la traînée est longue pour que chaque intervalle s'allume un instant.
 * Au repos, c'est le trait d'origine.
 *
 * `background` = le dégradé de la page ; `tone` = la couleur de l'impulsion (pilier).
 */
export function StepConnector({
  background,
  tone,
  className = 'hidden lg:block absolute left-0 right-0 h-px top-[52px] z-0 pointer-events-none',
}: {
  background: string
  tone: 'violet' | 'orange' | 'chrome'
  className?: string
}) {
  return (
    <DiagramMotion
      aria-hidden="true"
      className={`${className} dg-tone-${tone}`}
      style={{ '--dg-loop-start': '1.6s', '--dg-loop': '6s', '--dg-dot': '2px', '--dg-trail': '180px', '--dg-trail-head': '100%', '--dg-travel-ease': 'linear' } as CSSProperties}
    >
      <div className="dg-wipe absolute inset-0" style={{ background, '--dg-at': '200ms', '--dg-dur': '1400ms' } as CSSProperties} />
      <span className="dg-travel-x dg-trail" />
    </DiagramMotion>
  )
}
