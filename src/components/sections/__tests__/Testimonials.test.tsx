import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.restoreAllMocks()
})

import { Testimonials } from '../Testimonials'

describe('Testimonials', () => {
  it('renders section heading', () => {
    render(<Testimonials />)
    expect(screen.getByText(/ce que disent nos clients/i)).toBeInTheDocument()
  })

  it('renders first testimonial by default', () => {
    render(<Testimonials />)
    expect(screen.getByText(/Frédéric Alimi/)).toBeInTheDocument()
  })

  it('renders prev/next navigation buttons', () => {
    render(<Testimonials />)
    expect(screen.getByRole('button', { name: /précédent/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /suivant/i })).toBeInTheDocument()
  })

  it('renders 4 navigation dots', () => {
    render(<Testimonials />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(4)
  })

  it('first dot is selected', () => {
    render(<Testimonials />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('clicking next dot changes active dot', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime.bind(vi) })
    render(<Testimonials />)
    const tabs = screen.getAllByRole('tab')
    await user.click(tabs[1])
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
  })
})
