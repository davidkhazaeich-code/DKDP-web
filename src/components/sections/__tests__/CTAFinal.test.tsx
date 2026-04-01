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

  it('renders phone number with correct href', () => {
    render(<CTAFinal />)
    const tel = screen.getByText('+41 79 940 79 69')
    expect(tel).toBeInTheDocument()
    expect(tel.closest('a')).toHaveAttribute('href', 'tel:+41799407969')
  })

  it('renders email with correct href', () => {
    render(<CTAFinal />)
    const email = screen.getByText('dk@dkdp.ch')
    expect(email).toBeInTheDocument()
    expect(email.closest('a')).toHaveAttribute('href', 'mailto:dk@dkdp.ch')
  })

  it('renders reassurance copy', () => {
    render(<CTAFinal />)
    expect(screen.getByText(/sans engagement/i)).toBeInTheDocument()
  })
})
