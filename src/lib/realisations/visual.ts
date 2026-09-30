import type { Realisation } from './types'

/**
 * Le visuel qui represente une etude hors de sa page (hub, cartes, « etude
 * suivante ») : la composition d'appareils si elle existe, sinon la
 * couverture, sinon le premier ecran du site. L'image de presentation peut
 * avoir un decor genere (mise en scene aux couleurs du client), mais ses ecrans
 * montrent toujours de vraies captures ou de vrais livrables, jamais une
 * interface inventee.
 */
export function studyVisual(r: Realisation): { src: string; alt: string; focus?: string } | null {
  if (r.mockup) return r.mockup
  if (r.cover) return { src: r.cover.src, alt: r.cover.alt }
  if (r.hero?.desktopView) return { src: r.hero.desktopView, alt: `${r.client.name} : ${r.meta.title}` }
  return null
}
