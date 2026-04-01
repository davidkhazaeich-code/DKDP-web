import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProcessSteps } from '../ProcessSteps'

describe('ProcessSteps', () => {
  it('renders section heading', () => {
    render(<ProcessSteps />)
    expect(screen.getByText(/comment ça marche/i)).toBeInTheDocument()
  })

  it('renders 5 step titles', () => {
    render(<ProcessSteps />)
    expect(screen.getByText('Premier échange')).toBeInTheDocument()
    expect(screen.getByText('Diagnostic')).toBeInTheDocument()
    expect(screen.getByText('Proposition')).toBeInTheDocument()
    expect(screen.getByText('Réalisation')).toBeInTheDocument()
    expect(screen.getByText('Résultats & Suivi')).toBeInTheDocument()
  })

  it('renders 5 step numbers', () => {
    render(<ProcessSteps />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('05')).toBeInTheDocument()
  })

  it('renders step descriptions', () => {
    render(<ProcessSteps />)
    expect(screen.getByText(/15 minutes gratuites/i)).toBeInTheDocument()
  })
})
