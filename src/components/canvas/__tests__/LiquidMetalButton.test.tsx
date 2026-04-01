// src/components/canvas/__tests__/LiquidMetalButton.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@paper-design/shaders-react', () => ({
  LiquidMetal: () => null,
}))

import { LiquidMetalButton } from '../LiquidMetalButton'

describe('LiquidMetalButton', () => {
  it('renders label', () => {
    render(<LiquidMetalButton>Réservez un appel</LiquidMetalButton>)
    expect(screen.getByText('Réservez un appel')).toBeInTheDocument()
  })

  it('renders as button by default', () => {
    render(<LiquidMetalButton>CTA</LiquidMetalButton>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders as link when href provided', () => {
    render(<LiquidMetalButton href="/contact">Appel gratuit</LiquidMetalButton>)
    expect(screen.getByRole('link', { name: 'Appel gratuit' })).toHaveAttribute('href', '/contact')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<LiquidMetalButton onClick={onClick}>Click</LiquidMetalButton>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders shader container', () => {
    render(<LiquidMetalButton>Test</LiquidMetalButton>)
    expect(screen.getByTestId('shader-mount')).toBeInTheDocument()
  })
})
