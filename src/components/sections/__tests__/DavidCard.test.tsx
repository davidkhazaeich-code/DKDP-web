import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DavidCard } from '../DavidCard'

describe('DavidCard', () => {
  it('renders David name', () => {
    render(<DavidCard />)
    expect(screen.getByText('David Khazaei')).toBeInTheDocument()
  })

  it('renders personalization text', () => {
    render(<DavidCard />)
    expect(screen.getByText(/15 ans à construire/i)).toBeInTheDocument()
  })

  it('renders link to /a-propos', () => {
    render(<DavidCard />)
    expect(screen.getByRole('link', { name: /en savoir plus/i })).toHaveAttribute('href', '/a-propos')
  })
})
