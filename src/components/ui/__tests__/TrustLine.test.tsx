import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TrustLine } from '../TrustLine'

describe('TrustLine', () => {
  const items = ['Audit gratuit', 'Sans engagement', 'Réponse sous 24h']

  it('renders every item passed', () => {
    render(<TrustLine items={items} />)
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('renders one checkmark icon per item', () => {
    const { container } = render(<TrustLine items={items} />)
    expect(container.querySelectorAll('svg')).toHaveLength(items.length)
  })

  it('aligns to start by default', () => {
    render(<TrustLine items={items} />)
    expect(screen.getByRole('list')).toHaveClass('justify-start')
  })

  it('aligns to center when align="center"', () => {
    render(<TrustLine items={items} align="center" />)
    expect(screen.getByRole('list')).toHaveClass('justify-center')
  })

  it('applies custom accent color via inline style', () => {
    const { container } = render(<TrustLine items={['x']} accentRgb="255, 140, 0" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveStyle({ color: 'rgb(255, 140, 0)' })
  })

  it('uses semantic list markup with accessible label', () => {
    render(<TrustLine items={items} />)
    const list = screen.getByRole('list', { name: /garanties/i })
    expect(list).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(items.length)
  })
})
