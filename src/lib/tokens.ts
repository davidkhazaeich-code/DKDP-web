/**
 * DKDP Design Tokens
 *
 * Pointers to CSS variables defined in globals.css under :root, [data-theme="dark"],
 * and [data-theme="light"]. Switching the data-theme attribute on <html> swaps all
 * tokens automatically, components consuming these tokens are theme-aware for free.
 *
 * Usage :
 *   import { violet, orange } from '@/lib/tokens'
 *   style={{ color: violet.color, background: violet.bg, border: `1px solid ${violet.border}` }}
 *
 * Or with short aliases for dense pages :
 *   import { violet as V, orange as OR } from '@/lib/tokens'
 */

// ─── Pillar tokens ────────────────────────────────────────────────────────────

/** Agence digitale / Claude / Violet */
export const violet = {
  color:  'var(--violet-light)',
  bg:     'var(--violet-bg)',
  border: 'var(--violet-border)',
  glow:   'var(--violet-glow)',
} as const

/** Formation / Orange */
export const orange = {
  color:  'var(--orange)',
  bg:     'var(--orange-bg)',
  border: 'var(--orange-border)',
  glow:   'var(--orange-glow)',
} as const

/** Intelligence artificielle / Chrome */
export const chrome = {
  color:  'var(--text-secondary)',
  bg:     'var(--chrome-bg)',
  border: 'var(--chrome-border)',
} as const

/** À propos / Gris */
export const gray = {
  color:  'var(--text-secondary)',
  bg:     'var(--gray-bg)',
  border: 'var(--gray-border)',
} as const

// ─── Product / semantic colors ───────────────────────────────────────────────

/** Claude Code / Vert */
export const green = {
  color:  '#4ade80',
  bg:     'var(--green-bg)',
  border: 'var(--green-border)',
} as const

/** Commercial / Bleu */
export const blue = {
  color:  '#60a5fa',
  bg:     'var(--blue-bg)',
  border: 'var(--blue-border)',
} as const

/** RH / Rose */
export const pink = {
  color:  '#f472b6',
  bg:     'var(--pink-bg)',
  border: 'var(--pink-border)',
} as const

/** Finance / Teal */
export const teal = {
  color:  '#2dd4bf',
  bg:     'var(--teal-bg)',
  border: 'var(--teal-border)',
} as const

/** Juridique / Ambre */
export const amber = {
  color:  '#fbbf24',
  bg:     'var(--amber-bg)',
  border: 'var(--amber-border)',
} as const

/** Alerte / Rouge */
export const red = {
  color:  '#ef4444',
  bg:     'var(--red-bg)',
  border: 'var(--red-border)',
} as const

// ─── Neutral surfaces ────────────────────────────────────────────────────────

export const surface = {
  subtle:  'var(--surface-subtle)',
  default: 'var(--surface-default)',
  border:  'var(--surface-border)',
  divider: 'var(--divider)',
} as const

// ─── Pillar map (used by Header, nav) ────────────────────────────────────────

export const PILLAR = {
  agence:    violet,
  formation: orange,
  ia:        chrome,
  apropos:   gray,
} as const

export type PillarKey = keyof typeof PILLAR

// ─── Type helper ─────────────────────────────────────────────────────────────

export type TokenSet = {
  color: string
  bg: string
  border: string
  glow?: string
}

// ─── Canvas / Three.js helper ────────────────────────────────────────────────

/**
 * Returns hex/rgba string values for a given theme. Use this in WebGL/Canvas
 * components that need string literals (not CSS vars) for THREE.Color, fillStyle,
 * createRadialGradient stops, etc.
 *
 * Usage :
 *   const { theme } = useTheme()
 *   const palette = themeColors(theme)
 *   material.color = new THREE.Color(palette.pointTint)
 */
export function themeColors(theme: 'dark' | 'light') {
  return theme === 'dark'
    ? {
        bg:          '#0A0A0A',
        text:        '#FFFFFF',
        orange:      '#FF6B00',
        violet:      '#7C3AED',
        orangeAlpha: 'rgba(255,107,0,0.40)',
        violetAlpha: 'rgba(124,58,237,0.30)',
        pointTint:   '#FFFFFF',
        gridLine:    'rgba(255,255,255,0.10)',
      }
    : {
        bg:          '#FAFAF7',
        text:        '#1A1A18',
        orange:      '#FF6B00',
        violet:      '#7C3AED',
        orangeAlpha: 'rgba(255,107,0,0.22)',
        violetAlpha: 'rgba(124,58,237,0.18)',
        pointTint:   '#1A1A18',
        // Pass 14: bump light grid line alpha 0.36 -> 0.40 to match globals.css
        // --grid-line and improve decoration visibility on cream backgrounds.
        gridLine:    'rgba(10,10,10,0.14)',
      }
}

export type ThemePalette = ReturnType<typeof themeColors>
