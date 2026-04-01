import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('next/navigation', () => ({ usePathname: () => '/' }))
vi.mock('@/components/layout/Navigation', () => ({
  Navigation: () => <nav data-testid="nav">Nav</nav>,
}))

import { Header } from '../Header'

describe('Header', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, value: 0 })
  })

  it('renders logo linking to /', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /dkdp/i })).toHaveAttribute('href', '/')
  })

  it('renders navigation', () => {
    render(<Header />)
    expect(screen.getByTestId('nav')).toBeInTheDocument()
  })

  it('not scrolled - no backdrop-blur', () => {
    render(<Header />)
    expect(screen.getByRole('banner').className).not.toMatch(/backdrop-blur/)
  })

  it('scrolled past 20px - applies backdrop-blur', () => {
    render(<Header />)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 30 })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(screen.getByRole('banner').className).toMatch(/backdrop-blur/)
  })
})
