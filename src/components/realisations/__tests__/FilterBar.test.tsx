import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterBar } from '../FilterBar'

describe('FilterBar', () => {
  it('renders the four category tabs', () => {
    render(
      <FilterBar
        category="all"
        availableTags={['Refonte', 'Chatbot']}
        activeTag={null}
        onChange={() => {}}
      />
    )
    expect(screen.getByRole('tab', { name: 'Tous' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Sites web' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Projets IA' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Sites + IA' })).toBeInTheDocument()
  })

  it('calls onChange with new category when a tab is clicked', () => {
    const onChange = vi.fn()
    render(
      <FilterBar
        category="all"
        availableTags={[]}
        activeTag={null}
        onChange={onChange}
      />
    )
    fireEvent.click(screen.getByRole('tab', { name: 'Sites web' }))
    expect(onChange).toHaveBeenCalledWith({ category: 'site-web', tag: null })
  })

  it('renders available tag chips as buttons', () => {
    render(
      <FilterBar
        category="all"
        availableTags={['Refonte', 'SEO local']}
        activeTag={null}
        onChange={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: 'Refonte' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'SEO local' })).toBeInTheDocument()
  })

  it('shows reset button when filters are active', () => {
    render(
      <FilterBar
        category="site-web"
        availableTags={[]}
        activeTag="Refonte"
        onChange={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: /Reinitialiser/i })).toBeInTheDocument()
  })
})
