import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { GradText } from '../GradText'
import { GradTag } from '../GradTag'

describe('GradText', () => {
  it('renders children', () => {
    render(<GradText>performante</GradText>)
    expect(screen.getByText('performante')).toBeInTheDocument()
  })

  it('applies grad-text class', () => {
    render(<GradText>performante</GradText>)
    expect(screen.getByText('performante')).toHaveClass('grad-text')
  })

  it('renders as span by default', () => {
    render(<GradText>Test</GradText>)
    expect(screen.getByText('Test').tagName).toBe('SPAN')
  })

  it('renders as custom tag', () => {
    render(<GradText as="h1">Titre</GradText>)
    expect(screen.getByText('Titre').tagName).toBe('H1')
  })

  it('accepts additional className', () => {
    render(<GradText className="text-5xl">Big</GradText>)
    expect(screen.getByText('Big')).toHaveClass('text-5xl')
  })
})

describe('GradTag', () => {
  it('renders children', () => {
    render(<GradTag>Agence</GradTag>)
    expect(screen.getByText('Agence')).toBeInTheDocument()
  })

  it('applies grad-tag class', () => {
    render(<GradTag>Agence</GradTag>)
    expect(screen.getByText('Agence')).toHaveClass('grad-tag')
  })
})
