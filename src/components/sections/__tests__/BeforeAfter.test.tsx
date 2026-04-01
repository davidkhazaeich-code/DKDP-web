import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BeforeAfter } from '../BeforeAfter'

describe('BeforeAfter', () => {
  it('renders section heading', () => {
    render(<BeforeAfter />)
    expect(screen.getByText(/ce que ça change, concrètement/i)).toBeInTheDocument()
  })

  it('renders Solid SA transformation', () => {
    render(<BeforeAfter />)
    expect(screen.getByText('Solid SA')).toBeInTheDocument()
    expect(screen.getAllByText(/avant/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/après/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders WellWays transformation', () => {
    render(<BeforeAfter />)
    expect(screen.getByText('WellWays')).toBeInTheDocument()
  })

  it('renders WellWays descriptions', () => {
    render(<BeforeAfter />)
    expect(screen.getByText(/présence digitale inexistante/i)).toBeInTheDocument()
    expect(screen.getByText(/site vitrine moderne/i)).toBeInTheDocument()
  })

  it('renders transformation descriptions', () => {
    render(<BeforeAfter />)
    expect(screen.getByText(/340% de trafic organique/i)).toBeInTheDocument()
  })
})
