'use client'

import { useEffect } from 'react'
import {
  trackPhoneClick,
  trackEmailClick,
  trackWhatsAppClick,
  trackBookingStart,
} from '@/lib/analytics'

/**
 * Ecouteur global de conversions par clic.
 *
 * Monte une seule fois dans le layout. Il capte, via delegation, TOUS les liens
 * telephone / email / WhatsApp et les CTA de reservation Cal.com
 * (boutons `[data-cal-link]`), sans avoir a instrumenter chaque lien
 * individuellement. Les nouveaux liens ajoutes plus tard sont donc traques
 * automatiquement.
 *
 * Les soumissions de formulaires (generate_lead) et la confirmation de
 * reservation (book_appointment) sont traquees ailleurs, au plus pres de
 * l'evenement de succes (composants de formulaire + CalProvider).
 */
export function ConversionTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null
      if (!target?.closest) return

      // 1. CTA de reservation Cal.com (LiquidMetalButton, chatbot, etc.)
      const calEl = target.closest<HTMLElement>('[data-cal-link]')
      if (calEl) {
        trackBookingStart({
          link_location: locationOf(calEl),
          cal_link: calEl.getAttribute('data-cal-link') ?? undefined,
        })
        return
      }

      // 2. Liens telephone / email / WhatsApp
      const anchor = target.closest<HTMLAnchorElement>('a[href]')
      if (!anchor) return
      const href = anchor.getAttribute('href') ?? ''

      if (href.startsWith('tel:')) {
        trackPhoneClick({
          phone_number: href.slice(4),
          link_location: locationOf(anchor),
        })
      } else if (href.startsWith('mailto:')) {
        trackEmailClick({
          email: href.slice(7).split('?')[0],
          link_location: locationOf(anchor),
        })
      } else if (
        href.includes('wa.me') ||
        href.includes('whatsapp.com') ||
        href.includes('api.whatsapp')
      ) {
        trackWhatsAppClick({ link_location: locationOf(anchor) })
      }
    }

    // capture: true => on attrape le clic meme si un handler interne appelle
    // stopPropagation, et avant toute navigation declenchee par le lien.
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}

/**
 * Identifie grossierement l'emplacement d'un element (header, footer, nav,
 * section) pour segmenter les conversions dans GA4. Un parent peut forcer un
 * libelle via l'attribut `data-track-section`.
 */
function locationOf(el: HTMLElement): string {
  const section = el.closest<HTMLElement>(
    '[data-track-section], header, footer, nav',
  )
  if (!section) return 'page'
  const explicit = section.getAttribute('data-track-section')
  if (explicit) return explicit
  if (section.tagName === 'HEADER') return 'header'
  if (section.tagName === 'FOOTER') return 'footer'
  if (section.tagName === 'NAV') return 'nav'
  return 'page'
}
