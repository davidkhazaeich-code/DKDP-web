import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Watermark } from '../Watermark'

describe('Watermark', () => {
  it('renders DKDP text', () => {
    render(<Watermark />)
    expect(screen.getByText('DKDP')).toBeInTheDocument()
  })

  it('is aria-hidden', () => {
    render(<Watermark />)
    expect(screen.getByText('DKDP')).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies watermark CSS class', () => {
    render(<Watermark />)
    expect(screen.getByText('DKDP')).toHaveClass('watermark')
  })
})
