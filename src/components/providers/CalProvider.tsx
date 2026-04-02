'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'

export function CalProvider() {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: 'planifier-un-appel' })
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
        theme: 'dark',
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
    })()
  }, [])

  return null
}
