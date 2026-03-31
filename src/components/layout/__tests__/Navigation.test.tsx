import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
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
    render(<Navigation />)
    const activeLinks = screen.queryAllByRole('link').filter(
      (l) => l.getAttribute('aria-current') === 'page'
    )
    expect(activeLinks).toHaveLength(0)
  })
})
