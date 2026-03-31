import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from '../Badge'

describe('Badge', () => {
  it('renders label', () => {
    render(<Badge>Agence Digitale</Badge>)
    expect(screen.getByText('Agence Digitale')).toBeInTheDocument()
  })

  it('renders in violet-light color by default', () => {
    render(<Badge data-testid="badge">Label</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('text-violet-light')
  })
})
