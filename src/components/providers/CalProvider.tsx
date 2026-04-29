'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { useTheme } from './ThemeProvider'

export function CalProvider() {
  const { theme, mounted } = useTheme()

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
      const cal = await getCalApi({ namespace: 'planifier-un-appel' })
      if (cancelled) return
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
