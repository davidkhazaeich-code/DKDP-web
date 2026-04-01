import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PillarCards } from '../PillarCards'

describe('PillarCards', () => {
  it('renders section heading', () => {
    render(<PillarCards />)
    expect(screen.getByText(/trois expertises/i)).toBeInTheDocument()
  })

  it('renders 3 pillar titles', () => {
    render(<PillarCards />)
    expect(screen.getByText('Agence Digitale')).toBeInTheDocument()
    expect(screen.getByText('Intelligence Artificielle')).toBeInTheDocument()
    expect(screen.getByText('Formation Entreprise')).toBeInTheDocument()
  })

  it('renders 3 pillar descriptions', () => {
    render(<PillarCards />)
    expect(screen.getByText(/un site qui convertit/i)).toBeInTheDocument()
    expect(screen.getByText(/automatisez ce qui vous ralentit/i)).toBeInTheDocument()
    expect(screen.getByText(/des équipes formées/i)).toBeInTheDocument()
  })

  it('renders links to pillar pages', () => {
    render(<PillarCards />)
    expect(screen.getByRole('link', { name: /découvrir l'agence/i })).toHaveAttribute('href', '/agence-digitale')
    expect(screen.getByRole('link', { name: /explorer l'ia/i })).toHaveAttribute('href', '/intelligence-artificielle')
    expect(screen.getByRole('link', { name: /voir les formations/i })).toHaveAttribute('href', '/formation-entreprise')
  })
})
