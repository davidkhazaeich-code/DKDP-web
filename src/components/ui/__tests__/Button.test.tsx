import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../Button'

describe('Button', () => {
  it('renders label', () => {
    render(<Button>Réservez un appel</Button>)
    expect(screen.getByRole('button', { name: 'Réservez un appel' })).toBeInTheDocument()
  })

  it('primary variant has white background', () => {
    render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-white')
  })

  it('primary variant has black text', () => {
    render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('text-black')
  })

  it('ghost variant has violet border', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toMatch(/border/)
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop passed', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders as <a> link when href provided', () => {
    render(<Button href="/contact">Lien</Button>)
    expect(screen.getByRole('link', { name: 'Lien' })).toHaveAttribute('href', '/contact')
  })
})
