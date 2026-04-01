import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProblemBlock } from '../ProblemBlock'

describe('ProblemBlock', () => {
  it('renders section heading', () => {
    render(<ProblemBlock />)
    expect(screen.getByText(/ça vous ressemble/i)).toBeInTheDocument()
  })

  it('renders 3 problem cards', () => {
    render(<ProblemBlock />)
    expect(screen.getByText(/votre site existe mais ne génère aucun client/i)).toBeInTheDocument()
    expect(screen.getByText(/vos concurrents utilisent l'ia/i)).toBeInTheDocument()
    expect(screen.getByText(/vos équipes perdent du temps/i)).toBeInTheDocument()
  })

  it('renders conclusion text', () => {
    render(<ProblemBlock />)
    expect(screen.getByText(/on résout ces trois problèmes/i)).toBeInTheDocument()
  })
})
