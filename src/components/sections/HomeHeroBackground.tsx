'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTheme } from '@/components/providers/ThemeProvider'

const ParticleWaves = dynamic(
  () => import('@/components/canvas/ParticleWaves').then((m) => ({ default: m.ParticleWaves })),
  { ssr: false, loading: () => null }
)

function buildGridSvg(strokeRgba: string, strokeWidth: number) {
  const encoded = encodeURIComponent(strokeRgba)
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='${encoded}' stroke-width='${strokeWidth}'/%3E%3C/svg%3E")`
}

export function HomeHeroBackground() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  useEffect(() => {
    setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
  }, [])

  const colors = useThemeColors()
  const { theme } = useTheme()
  const gridSvg = useMemo(
    () => buildGridSvg(colors.gridLine, theme === 'light' ? 1.5 : 1),
    [colors.gridLine, theme]
  )

  return (
    <>
      <div
        aria-hidden="true"
        className="md:hidden pointer-events-none absolute inset-0"
        style={{
          backgroundImage: gridSvg,
          backgroundSize: '60px 60px',
          animation: 'gridScrollUp 2s linear infinite',
          zIndex: 1,
        }}
      />
      {isDesktop === true && (
        <ParticleWaves className="absolute inset-0 z-[2] opacity-60" />
      )}
    </>
  )
}
