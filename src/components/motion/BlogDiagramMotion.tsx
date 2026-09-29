'use client'

import './diagram-motion.css'
import { useLayoutEffect, useRef, useSyncExternalStore } from 'react'
import { initDiagramMotion } from './diagram-motion'
import { annotateInfographic, findInfographics } from './blog-diagrams'

const subscribe = () => () => {}

/**
 * Anime les infographies HTML d'un article de blog (voir blog-diagrams.ts). Ne rend rien :
 * au montage, repère les blocs dans l'article, leur pose les classes du kit et les confie au
 * moteur, exactement comme une racine <DiagramMotion mode="view">.
 */
export function BlogDiagramMotion({ selector = 'article[data-blog-article]' }: { selector?: string }) {
  const hydrating = useSyncExternalStore(subscribe, () => false, () => true)
  const fresh = useRef(!hydrating)

  useLayoutEffect(() => {
    const article = document.querySelector(selector)
    if (!article || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const blocks: HTMLElement[] = []
    const cleanups: Array<() => void> = []
    for (const block of findInfographics(article)) {
      if (!annotateInfographic(block)) continue
      block.setAttribute('data-dg', 'view')
      blocks.push(block)
      cleanups.push(initDiagramMotion(block, { fresh: fresh.current }))
    }
    return () => {
      cleanups.forEach((cleanup) => cleanup())
      blocks.forEach((block) => block.removeAttribute('data-dg'))
    }
  }, [selector])

  return null
}
