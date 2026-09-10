'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackOpenAiPageView } from '@/lib/analytics'

/**
 * Envoie `page_viewed` au pixel OpenAI a chaque page reellement affichee.
 *
 * Le SDK n'envoie RIEN tout seul (verifie dans oaiq.min.js) : sans ce composant,
 * OpenAI ne verrait que les conversions et aucune visite, ce qui prive
 * l'attribution du clic publicitaire d'origine.
 *
 * Le site etant en App Router, une navigation interne ne recharge pas la page :
 * on suit `usePathname`. Le ref evite le double envoi du montage en mode strict
 * (dev) et lors d'un re-rendu sans changement d'URL.
 */
export function OpenAiPageView() {
  const pathname = usePathname()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    trackOpenAiPageView()
  }, [pathname])

  return null
}
