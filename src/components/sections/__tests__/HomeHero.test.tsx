import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/canvas/DottedSurface', () => ({
  DottedSurface: ({ className }: { className?: string }) => (
    <div data-testid="dotted-surface" className={className} />
  ),
}))

vi.mock('@/components/canvas/LiquidMetalButton', () => ({
  LiquidMetalButton: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}))

import { HomeHero } from '../HomeHero'

describe('HomeHero', () => {
  it('renders H1 with key phrase', () => {
    render(<HomeHero />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/votre entreprise mérite/i)).toBeInTheDocument()
  })

  it('renders primary CTA linking to pillar section', () => {
    render(<HomeHero />)
    expect(screen.getByRole('link', { name: /découvrez nos services/i })).toHaveAttribute('href', '#nos-expertises')
  })

  it('renders secondary CTA linking to /contact', () => {
    render(<HomeHero />)
    expect(screen.getByRole('link', { name: /réserver un appel/i })).toHaveAttribute('href', '/contact')
  })

  it('renders 4 stat labels', () => {
    render(<HomeHero />)
    expect(screen.getByText(/ans d'expérience/i)).toBeInTheDocument()
    expect(screen.getByText(/entreprises accompagnées/i)).toBeInTheDocument()
    expect(screen.getByText(/note google/i)).toBeInTheDocument()
    expect(screen.getByText(/élèves formés/i)).toBeInTheDocument()
  })

  it('renders stat values', () => {
    render(<HomeHero />)
    expect(screen.getByText('10+')).toBeInTheDocument()
    expect(screen.getByText('150+')).toBeInTheDocument()
    expect(screen.getByText('4.9/5')).toBeInTheDocument()
    expect(screen.getByText('463+')).toBeInTheDocument()
  })

  it('renders DottedSurface background', () => {
    render(<HomeHero />)
    expect(screen.getByTestId('dotted-surface')).toBeInTheDocument()
  })
})
