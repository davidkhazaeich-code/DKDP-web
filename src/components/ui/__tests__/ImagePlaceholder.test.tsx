import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImagePlaceholder } from '../ImagePlaceholder'

describe('ImagePlaceholder', () => {
  it('renders placeholder text with title', () => {
    render(<ImagePlaceholder title="Photo hero" />)
    expect(screen.getByText(/photo hero/i)).toBeInTheDocument()
  })

  it('accepts className', () => {
    render(<ImagePlaceholder title="Test" className="my-class" />)
    expect(screen.getByTestId('image-placeholder')).toHaveClass('my-class')
  })
})
