import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SectionReveal } from '../SectionReveal'

describe('SectionReveal', () => {
  it('renders children', () => {
    render(<SectionReveal><p>contenu</p></SectionReveal>)
    expect(screen.getByText('contenu')).toBeInTheDocument()
  })

  it('forwards className to wrapper', () => {
    const { container } = render(
      <SectionReveal className="section-gap"><p>test</p></SectionReveal>
    )
    expect(container.firstChild).toHaveClass('section-gap')
  })
})
