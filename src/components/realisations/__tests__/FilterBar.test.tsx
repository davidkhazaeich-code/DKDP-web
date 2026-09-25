import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterBar } from '../FilterBar'

describe('FilterBar', () => {
  it('renders « Tous » and one tab per available domain', () => {
    render(
      <FilterBar
        domains={['site-web', 'automatisation']}
        sectors={['batiment']}
        value={{ domain: 'all', sector: null }}
        onChange={() => {}}
      />
    )
    expect(screen.getByRole('tab', { name: 'Tous' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Site web' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Automatisation IA' })).toBeInTheDocument()
    expect(screen.queryByRole('tab', { name: 'Formation IA' })).not.toBeInTheDocument()
  })

  it('calls onChange with the new domain and keeps the sector', () => {
    const onChange = vi.fn()
    render(
      <FilterBar
        domains={['site-web', 'automatisation']}
        sectors={['batiment']}
        value={{ domain: 'all', sector: 'batiment' }}
        onChange={onChange}
      />
    )
    fireEvent.click(screen.getByRole('tab', { name: 'Site web' }))
    expect(onChange).toHaveBeenCalledWith({ domain: 'site-web', sector: 'batiment' })
  })

  it('renders sector chips that toggle', () => {
    const onChange = vi.fn()
    render(
      <FilterBar
        domains={['site-web']}
        sectors={['batiment', 'metaux-precieux']}
        value={{ domain: 'all', sector: 'batiment' }}
        onChange={onChange}
      />
    )
    expect(screen.getByRole('button', { name: 'Métaux précieux' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Bâtiment' }))
    expect(onChange).toHaveBeenCalledWith({ domain: 'all', sector: null })
  })

  it('shows a reset button when a filter is active', () => {
    render(
      <FilterBar
        domains={['site-web']}
        sectors={['batiment']}
        value={{ domain: 'site-web', sector: null }}
        onChange={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: /Réinitialiser/i })).toBeInTheDocument()
  })
})
