'use client'

import { useEffect, useRef } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { useTheme } from './ThemeProvider'
import { trackBookingComplete } from '@/lib/analytics'

const CAL_NAMESPACE = 'planifier-un-appel'

export function CalProvider() {
  const { theme, mounted } = useTheme()
  // L'effet ci-dessous se re-execute a chaque changement de theme : ce ref
  // garantit que l'ecouteur de reservation confirmee n'est branche qu'une fois
  // (sinon `book_appointment` serait envoye en double).
  const bookingListenerRegistered = useRef(false)

  useEffect(() => {
    // Différer l'initialisation Cal.com après la première interaction utilisateur
    // pour ne pas bloquer le thread principal au chargement initial (impact LCP)
    let initiated = false
    let cancelled = false
    const init = async () => {
      if (initiated || cancelled) return
      initiated = true
      window.removeEventListener('mousemove', init)
      window.removeEventListener('scroll', init, { capture: true })
      window.removeEventListener('touchstart', init)
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      if (cancelled) return

      // Conversion : rendez-vous reellement confirme dans Cal.com.
      // Branche une seule fois, meme si l'effet se re-execute (theme).
      if (!bookingListenerRegistered.current) {
        bookingListenerRegistered.current = true
        cal('on', {
          action: 'bookingSuccessfulV2',
          callback: () => trackBookingComplete({ cal_namespace: CAL_NAMESPACE }),
        })
      }

      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
        theme,
        cssVarsPerTheme: {
          dark: {
            'cal-brand':          '#A78BFA',
            'cal-brand-emphasis': '#8B5CF6',
            'cal-text-emphasis':  '#ffffff',
            'cal-text':           '#A1A1AA',
            'cal-text-muted':     '#71717A',
            'cal-border':         'rgba(212,212,216,0.15)',
            'cal-border-subtle':  'rgba(212,212,216,0.08)',
            'cal-bg':             '#0A0A0A',
            'cal-bg-emphasis':    '#141414',
            'cal-bg-subtle':      '#111111',
          },
          light: {
            'cal-brand':          '#A78BFA',
            'cal-brand-emphasis': '#8B5CF6',
            'cal-text-emphasis':  '#111111',
            'cal-text':           '#3F3F46',
            'cal-text-muted':     '#71717A',
            'cal-border':         'rgba(0,0,0,0.15)',
            'cal-border-subtle':  'rgba(0,0,0,0.08)',
            'cal-bg':             '#ffffff',
            'cal-bg-emphasis':    '#F4F4F5',
            'cal-bg-subtle':      '#FAFAFA',
          },
        },
      })
    }
    window.addEventListener('mousemove', init, { once: true })
    window.addEventListener('scroll', init, { capture: true, once: true })
    window.addEventListener('touchstart', init, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('mousemove', init)
      window.removeEventListener('scroll', init, { capture: true })
      window.removeEventListener('touchstart', init)
    }
    // mounted is needed to gate first init to the post-mount theme value
    // theme triggers a refresh when the user toggles light/dark
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, theme])

  return null
}
