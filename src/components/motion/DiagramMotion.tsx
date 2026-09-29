'use client'

import './diagram-motion.css'
import { useLayoutEffect, useRef, useSyncExternalStore, type ElementType, type HTMLAttributes } from 'react'
import { initDiagramMotion } from './diagram-motion'

const subscribe = () => () => {}

type DiagramMotionProps = HTMLAttributes<HTMLElement> & {
  /** Balise de la racine, pour garder la sémantique du diagramme (ol, figure…). */
  as?: 'div' | 'ol' | 'ul' | 'figure' | 'section' | 'span'
  /** `view` (défaut) : joue en arrivant à l'écran. `hero` : joue dès l'affichage sur ordinateur. */
  mode?: 'view' | 'hero'
}

/**
 * Racine d'un diagramme animé. Les enfants restent des composants serveur : seuls les
 * attributs d'état de cette racine sont gérés côté client (voir diagram-motion.ts).
 */
export function DiagramMotion({ as = 'div', mode = 'view', children, ...rest }: DiagramMotionProps) {
  const ref = useRef<HTMLElement>(null)
  // Vrai pendant l'hydratation (le HTML serveur est déjà à l'écran), faux pour un rendu
  // client (navigation) : le DOM est neuf, rien n'a été peint, on peut toujours armer.
  const hydrating = useSyncExternalStore(subscribe, () => false, () => true)
  const fresh = useRef(!hydrating)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    return initDiagramMotion(el, { fresh: fresh.current })
  }, [])

  const Tag = as as ElementType
  return (
    <Tag ref={ref} data-dg={mode} {...rest}>
      {children}
    </Tag>
  )
}
