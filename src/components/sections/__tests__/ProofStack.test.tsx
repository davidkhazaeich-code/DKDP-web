import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProofStack } from '../ProofStack'

describe('ProofStack', () => {
  it('renders section heading', () => {
    render(<ProofStack />)
    expect(screen.getByText(/des pme de toute la suisse romande/i)).toBeInTheDocument()
  })

  it('renders the English heading', () => {
    render(<ProofStack lang="en" />)
    expect(screen.getByText(/smbs across french-speaking switzerland/i)).toBeInTheDocument()
  })

  // Rangee de chiffres retiree de l'accueil le 29/09/2026 (demande de David).
  it('renders no stats row before the logos', () => {
    const { unmount } = render(<ProofStack />)
    expect(screen.queryByText('2019')).not.toBeInTheDocument()
    expect(screen.queryByText(/note google/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/pour un devis/i)).not.toBeInTheDocument()
    unmount()
    render(<ProofStack lang="en" />)
    expect(screen.queryByText(/google rating/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/to get a quote/i)).not.toBeInTheDocument()
  })

  it('renders SwissLife logo', () => {
    render(<ProofStack />)
    expect(screen.getByAltText('SwissLife')).toBeInTheDocument()
  })
})
