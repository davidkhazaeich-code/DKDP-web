'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { applyTheme, type Theme } from '@/lib/theme-helpers'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Init = 'dark' for both SSR and first client render, matches HTML produced by Next.js
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  // Post-mount: read DOM (already set by inline anti-FOUC script), sync state
  useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as Theme | null) ?? 'dark'
    setTheme(current)
    setMounted(true)
  }, [])

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
    try { localStorage.setItem('dkdp-theme', next) } catch { /* private mode, ignore */ }
  }, [theme])

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'dkdp-theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setTheme(e.newValue)
        applyTheme(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
