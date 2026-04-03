/**
 * DKDP Design Tokens
 *
 * Source unique pour toutes les couleurs, backgrounds et borders du site.
 * Chaque token = { color, bg, border }
 *
 * Usage :
 *   import { violet, orange } from '@/lib/tokens'
 *   style={{ color: violet.color, background: violet.bg, border: `1px solid ${violet.border}` }}
 *
 * Ou avec alias courts pour les pages denses :
 *   import { violet as V, orange as OR } from '@/lib/tokens'
 */

// ─── Piliers principaux ───────────────────────────────────────────────────────

/** Agence digitale / Claude / Violet */
export const violet = {
  color:  '#A78BFA',
  bg:     'rgba(124,58,237,0.10)',
  border: 'rgba(124,58,237,0.25)',
  glow:   'rgba(124,58,237,0.15)',
} as const

/** Formation / Orange */
export const orange = {
  color:  '#FF8C00',
  bg:     'rgba(255,107,0,0.08)',
  border: 'rgba(255,107,0,0.20)',
  glow:   'rgba(255,107,0,0.15)',
} as const

/** Intelligence artificielle / Chrome */
export const chrome = {
  color:  '#D4D4D8',
  bg:     'rgba(212,212,216,0.08)',
  border: 'rgba(212,212,216,0.18)',
} as const

/** À propos / Gris */
export const gray = {
  color:  '#9CA3AF',
  bg:     'rgba(156,163,175,0.08)',
  border: 'rgba(156,163,175,0.18)',
} as const

// ─── Couleurs produits / sémantiques ─────────────────────────────────────────

/** Claude Code / Vert */
export const green = {
  color:  '#4ade80',
  bg:     'rgba(74,222,128,0.08)',
  border: 'rgba(74,222,128,0.22)',
} as const

/** Commercial / Bleu */
export const blue = {
  color:  '#60a5fa',
  bg:     'rgba(96,165,250,0.08)',
  border: 'rgba(96,165,250,0.22)',
} as const

/** RH / Rose */
export const pink = {
  color:  '#f472b6',
  bg:     'rgba(244,114,182,0.08)',
  border: 'rgba(244,114,182,0.22)',
} as const

/** Finance / Teal */
export const teal = {
  color:  '#2dd4bf',
  bg:     'rgba(45,212,191,0.08)',
  border: 'rgba(45,212,191,0.22)',
} as const

/** Juridique / Ambre */
export const amber = {
  color:  '#fbbf24',
  bg:     'rgba(251,191,36,0.07)',
  border: 'rgba(251,191,36,0.22)',
} as const

/** Alerte / Rouge */
export const red = {
  color:  '#ef4444',
  bg:     'rgba(239,68,68,0.08)',
  border: 'rgba(239,68,68,0.22)',
} as const

// ─── Surfaces neutres ─────────────────────────────────────────────────────────

/** Fonds de cartes et sections */
export const surface = {
  subtle:  'rgba(255,255,255,0.02)',
  default: 'rgba(255,255,255,0.04)',
  border:  'rgba(255,255,255,0.07)',
  divider: 'rgba(255,255,255,0.06)',
} as const

// ─── Map piliers (utile pour Header, nav) ─────────────────────────────────────

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
