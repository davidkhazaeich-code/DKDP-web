import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card } from '../Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('default variant has bg-bg-card class', () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('bg-bg-card')
  })

  it('grad variant applies grad-border class', () => {
    render(<Card variant="grad" data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('grad-border')
  })

  it('hoverable variant applies hover-grad class', () => {
    render(<Card hoverable data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('hover-grad')
  })
})
