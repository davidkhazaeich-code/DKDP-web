import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LogoBanner } from '../LogoBanner'

describe('LogoBanner', () => {
  it('renders trust statement', () => {
    render(<LogoBanner />)
    expect(screen.getByText(/150\+ entreprises/i)).toBeInTheDocument()
  })

  it('renders SwissLife logo', () => {
    render(<LogoBanner />)
    const swisslife = screen.getAllByAltText(/swisslife/i)
    expect(swisslife.length).toBeGreaterThanOrEqual(1)
  })

  it('renders Howden logo', () => {
    render(<LogoBanner />)
    expect(screen.getAllByAltText(/howden/i).length).toBeGreaterThanOrEqual(1)
  })

  it('duplicates logos for seamless loop', () => {
    render(<LogoBanner />)
    // 14 logos × 3 = 42 img elements
    const allLogos = screen.getAllByRole('img')
    expect(allLogos.length).toBe(42)
  })
})
