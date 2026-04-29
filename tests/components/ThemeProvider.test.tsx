import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/components/providers/ThemeProvider'

function Probe() {
  const { theme, toggle, mounted } = useTheme()
  return (
    <>
      <span data-testid="theme">{theme}</span>
      <span data-testid="mounted">{String(mounted)}</span>
      <button onClick={toggle} data-testid="toggle">toggle</button>
    </>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.style.colorScheme = ''
    localStorage.clear()
    document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.remove())
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    meta.setAttribute('content', '#0A0A0A')
    document.head.appendChild(meta)
  })

  it('initial render uses dark when no data-theme is set', () => {
    render(<ThemeProvider><Probe /></ThemeProvider>)
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  it('post-mount syncs to existing data-theme attribute', async () => {
    document.documentElement.setAttribute('data-theme', 'light')
    render(<ThemeProvider><Probe /></ThemeProvider>)
    // After useEffect runs (microtask), state should sync to 'light'
    await act(async () => { await Promise.resolve() })
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(screen.getByTestId('mounted').textContent).toBe('true')
  })

  it('toggle flips theme and persists to localStorage', async () => {
    render(<ThemeProvider><Probe /></ThemeProvider>)
    await act(async () => { await Promise.resolve() })
    expect(screen.getByTestId('theme').textContent).toBe('dark')

    await act(async () => { screen.getByTestId('toggle').click() })
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(localStorage.getItem('dkdp-theme')).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')

    await act(async () => { screen.getByTestId('toggle').click() })
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(localStorage.getItem('dkdp-theme')).toBe('dark')
  })

  it('responds to storage events from another tab', async () => {
    render(<ThemeProvider><Probe /></ThemeProvider>)
    await act(async () => { await Promise.resolve() })
    expect(screen.getByTestId('theme').textContent).toBe('dark')

    await act(async () => {
      window.dispatchEvent(new StorageEvent('storage', { key: 'dkdp-theme', newValue: 'light' }))
    })
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('useTheme throws if used outside ThemeProvider', () => {
    const consoleErr = console.error
    console.error = () => {}  // silence React's error boundary noise
    expect(() => render(<Probe />)).toThrow('useTheme must be used within ThemeProvider')
    console.error = consoleErr
  })
})
