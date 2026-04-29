'use client'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { useTheme } from '@/components/providers/ThemeProvider'

// Light mode shipped after polish pass on homepage + 11 service pages.
// To pause the toggle (e.g., during a regression), set this to false AND restore
// the dark-forcing variant of the inline anti-FOUC script in layout.tsx.
const ENABLE_LIGHT_MODE = true

interface ThemeToggleProps {
  /** Tailwind classes appended to the wrapping <button> */
  className?: string
  /** Compact 32x32 instead of default 36x36 (use on mobile header) */
  compact?: boolean
}

/**
 * Manual light/dark theme toggle. Sun icon = currently light, Moon = currently dark.
 * Crossfade rotation pattern (Vercel/Linear style).
 *
 * Hides both icons during the first hydration frame (mounted=false) to avoid
 * SSR/client mismatch flicker. ThemeProvider initializes theme='dark' on the
 * server then syncs to actual localStorage value in useEffect.
 */
export function ThemeToggle({ className = '', compact = false }: ThemeToggleProps) {
  if (!ENABLE_LIGHT_MODE) return null
  const { theme, toggle, mounted } = useTheme()
  const isDark = theme === 'dark'
  const size = compact ? 'h-8 w-8' : 'h-9 w-9'
  const iconSize = compact ? 14 : 16

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className={`relative inline-flex ${size} items-center justify-center rounded-full border transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
      style={{
        background:   'var(--surface-default)',
        borderColor:  'var(--surface-border)',
        color:        'var(--text-secondary)',
      }}
    >
      {/* Sun icon, visible in light mode */}
      <SunIcon
        width={iconSize}
        height={iconSize}
        className="absolute transition-all duration-300"
        style={{
          opacity:   mounted ? (isDark ? 0 : 1) : 0,
          transform: mounted && !isDark
            ? 'rotate(0) scale(1)'
            : 'rotate(-90deg) scale(0.5)',
        }}
        aria-hidden="true"
      />
      {/* Moon icon, visible in dark mode */}
      <MoonIcon
        width={iconSize}
        height={iconSize}
        className="absolute transition-all duration-300"
        style={{
          opacity:   mounted ? (isDark ? 1 : 0) : 0,
          transform: mounted && isDark
            ? 'rotate(0) scale(1)'
            : 'rotate(90deg) scale(0.5)',
        }}
        aria-hidden="true"
      />
    </button>
  )
}
