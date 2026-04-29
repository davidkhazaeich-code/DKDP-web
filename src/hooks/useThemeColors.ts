'use client'
import { useMemo } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { themeColors, type ThemePalette } from '@/lib/tokens'

/**
 * Returns the current theme's color palette as hex/rgba string literals.
 * Use in WebGL/Canvas components that need plain strings (not CSS vars)
 * for THREE.Color, ctx.fillStyle, gradient stops, etc.
 *
 * Re-renders the consuming component once per theme switch.
 */
export function useThemeColors(): ThemePalette {
  const { theme } = useTheme()
  return useMemo(() => themeColors(theme), [theme])
}
