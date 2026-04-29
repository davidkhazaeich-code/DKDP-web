import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { useThemeColors } from '@/hooks/useThemeColors'

function Probe() {
  const c = useThemeColors()
  return (
    <>
      <span data-testid="bg">{c.bg}</span>
      <span data-testid="point">{c.pointTint}</span>
      <span data-testid="grid">{c.gridLine}</span>
    </>
  )
}

describe('useThemeColors', () => {
  it('returns dark palette by default', () => {
    document.documentElement.removeAttribute('data-theme')
    render(<ThemeProvider><Probe /></ThemeProvider>)
    expect(screen.getByTestId('bg').textContent).toBe('#0A0A0A')
    expect(screen.getByTestId('point').textContent).toBe('#FFFFFF')
    expect(screen.getByTestId('grid').textContent).toBe('rgba(255,255,255,0.10)')
  })

  it('returns light palette after sync to data-theme=light', async () => {
    document.documentElement.setAttribute('data-theme', 'light')
    render(<ThemeProvider><Probe /></ThemeProvider>)
    await act(async () => { await Promise.resolve() })
    expect(screen.getByTestId('bg').textContent).toBe('#FAFAF7')
    expect(screen.getByTestId('point').textContent).toBe('#1A1A18')
    expect(screen.getByTestId('grid').textContent).toBe('rgba(10,10,10,0.16)')
  })
})
