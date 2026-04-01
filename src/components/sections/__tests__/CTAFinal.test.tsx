import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/canvas/LiquidMetalButton', () => ({
  LiquidMetalButton: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}))

import { CTAFinal } from '../CTAFinal'

describe('CTAFinal', () => {
  it('renders main heading', () => {
    render(<CTAFinal />)
    expect(screen.getByText(/parlons de/i)).toBeInTheDocument()
    expect(screen.getByText(/votre projet/i)).toBeInTheDocument()
  })

  it('renders CTA button linking to /contact', () => {
    render(<CTAFinal />)
    expect(screen.getByRole('link', { name: /réservez votre appel/i })).toHaveAttribute('href', '/contact')
  })

  it('renders phone number', () => {
    render(<CTAFinal />)
    expect(screen.getByText('+41 79 940 79 69')).toBeInTheDocument()
  })

  it('renders email', () => {
    render(<CTAFinal />)
    expect(screen.getByText('dk@dkdp.ch')).toBeInTheDocument()
  })

  it('renders reassurance copy', () => {
    render(<CTAFinal />)
    expect(screen.getByText(/sans engagement/i)).toBeInTheDocument()
  })
})
