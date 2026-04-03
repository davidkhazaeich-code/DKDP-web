import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LogoBanner } from '../LogoBanner'

describe('LogoBanner', () => {
  it('renders default label when no label prop passed', () => {
    render(<LogoBanner />)
    expect(screen.getByText(/ils nous font confiance/i)).toBeInTheDocument()
  })

  it('renders custom label when label prop is provided', () => {
    render(<LogoBanner label="700+ clients accompagnés" />)
    expect(screen.getByText(/700\+ clients accompagnés/i)).toBeInTheDocument()
  })

  it('renders SwissLife logo', () => {
    render(<LogoBanner />)
    expect(screen.getAllByAltText(/swisslife/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders Howden logo', () => {
    render(<LogoBanner />)
    expect(screen.getAllByAltText(/howden/i).length).toBeGreaterThanOrEqual(1)
  })

  it('duplicates logos for seamless 2x loop', () => {
    render(<LogoBanner />)
    // 14 logos × 2 = 28 img elements
    const allLogos = screen.getAllByRole('img')
    expect(allLogos.length).toBe(28)
  })
})
