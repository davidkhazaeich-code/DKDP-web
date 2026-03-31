import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

const mockUsePathname = vi.fn(() => '/')
vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

import { Navigation } from '../Navigation'

describe('Navigation', () => {
  it('renders 3 pillar links', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: /agence digitale/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /intelligence artificielle/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /formation/i })).toBeInTheDocument()
  })

  it('renders secondary links', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: /réalisations/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /tarifs/i })).toBeInTheDocument()
  })

  it('renders Contact CTA', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('no active link at root path', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Navigation />)
    const activeLinks = screen.queryAllByRole('link').filter(
      (l) => l.getAttribute('aria-current') === 'page'
    )
    expect(activeLinks).toHaveLength(0)
  })

  it('active pillar link gets aria-current="page"', () => {
    mockUsePathname.mockReturnValue('/agence-digitale')
    render(<Navigation />)
    const activeLink = screen.getByRole('link', { name: /agence digitale/i })
    expect(activeLink).toHaveAttribute('aria-current', 'page')
  })

  it('child route activates parent pillar link', () => {
    mockUsePathname.mockReturnValue('/agence-digitale/creation-site-web')
    render(<Navigation />)
    const activeLink = screen.getByRole('link', { name: /agence digitale/i })
    expect(activeLink).toHaveAttribute('aria-current', 'page')
  })
})
