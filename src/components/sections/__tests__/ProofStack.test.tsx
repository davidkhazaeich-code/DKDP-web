import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProofStack } from '../ProofStack'

describe('ProofStack', () => {
  it('renders section heading', () => {
    render(<ProofStack />)
    expect(screen.getByText(/des résultats, pas des promesses/i)).toBeInTheDocument()
  })

  it('renders 4 stat labels', () => {
    render(<ProofStack />)
    expect(screen.getByText(/ans d'expérience/i)).toBeInTheDocument()
    expect(screen.getByText(/entreprises/i)).toBeInTheDocument()
    expect(screen.getByText(/élèves formés/i)).toBeInTheDocument()
    expect(screen.getByText(/note google/i)).toBeInTheDocument()
  })

  it('renders stat descriptions', () => {
    render(<ProofStack />)
    expect(screen.getByText(/dans le digital suisse romand/i)).toBeInTheDocument()
    expect(screen.getByText(/accompagnées avec succès/i)).toBeInTheDocument()
  })

  it('renders SwissLife logo', () => {
    render(<ProofStack />)
    expect(screen.getByAltText('SwissLife')).toBeInTheDocument()
  })
})
