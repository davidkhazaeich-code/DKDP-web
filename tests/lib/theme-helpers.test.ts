import { describe, it, expect, beforeEach } from 'vitest'
import { applyTheme } from '@/lib/theme-helpers'

describe('applyTheme', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.style.colorScheme = ''
    // Clean up any existing meta theme-color
    document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.remove())
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    meta.setAttribute('content', '#0A0A0A')
    document.head.appendChild(meta)
  })

  it('sets data-theme="dark" and colorScheme=dark when called with "dark"', () => {
    applyTheme('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })

  it('sets data-theme="light" and colorScheme=light when called with "light"', () => {
    applyTheme('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(document.documentElement.style.colorScheme).toBe('light')
  })

  it('updates meta[name="theme-color"] to match theme', () => {
    applyTheme('light')
    const meta = document.querySelector('meta[name="theme-color"]')
    expect(meta?.getAttribute('content')).toBe('#FAFAF7')

    applyTheme('dark')
    expect(meta?.getAttribute('content')).toBe('#0A0A0A')
  })

  it('does not throw when meta[name="theme-color"] is absent', () => {
    document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.remove())
    expect(() => applyTheme('light')).not.toThrow()
  })
})
