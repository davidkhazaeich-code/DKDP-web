import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('next/navigation', () => ({ usePathname: () => '/' }))
vi.mock('@/components/ui/GhostButton', () => ({
  GhostButton: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
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

  it('renders mega menu triggers for the 3 pillars', () => {
    render(<Header />)
    expect(screen.getByText('Agence Digitale')).toBeInTheDocument()
    expect(screen.getByText('Intelligence Artificielle')).toBeInTheDocument()
    expect(screen.getByText('Formation')).toBeInTheDocument()
  })

  it('renders simple nav links', () => {
    render(<Header />)
    expect(screen.getByText('Réalisations')).toBeInTheDocument()
    expect(screen.getByText('Tarifs')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })

  it('not scrolled — no backdrop-blur', () => {
    render(<Header />)
    expect(screen.getByRole('banner').className).not.toMatch(/backdrop-blur/)
  })

  it('scrolled past 20px — applies backdrop-blur', () => {
    render(<Header />)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 30 })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(screen.getByRole('banner').className).toMatch(/backdrop-blur/)
  })
})
