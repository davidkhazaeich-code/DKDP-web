import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FeaturedProject } from '../FeaturedProject'

describe('FeaturedProject', () => {
  it('renders project title', () => {
    render(<FeaturedProject />)
    expect(screen.getByText(/solid sa/i)).toBeInTheDocument()
    expect(screen.getByText(/refonte web complète/i)).toBeInTheDocument()
  })

  it('renders key metrics', () => {
    render(<FeaturedProject />)
    expect(screen.getByText('+340%')).toBeInTheDocument()
    expect(screen.getByText(/trafic organique/i)).toBeInTheDocument()
  })

  it('renders link to realisations', () => {
    render(<FeaturedProject />)
    expect(screen.getByRole('link', { name: /voir toutes nos réalisations/i })).toHaveAttribute('href', '/realisations')
  })
})
