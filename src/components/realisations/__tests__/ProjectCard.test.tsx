import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectCard } from '../ProjectCard'
import type { Realisation } from '@/lib/realisations/types'

const baseRealisation: Realisation = {
  slug: 'test-projet',
  client: { name: 'Test Client', sector: 'Test sector' },
  meta: {
    title: 'Refonte test',
    excerpt: 'Excerpt court',
    dateISO: '2026-01-01',
    status: 'live',
  },
  category: 'site-web',
  tags: ['Refonte'],
  hero: { desktopFull: '/test.webp', browserUrl: 'test.ch' },
  problem: { title: 'P', body: 'B' },
  approach: { title: 'A', body: 'B' },
  liveUrl: 'https://test.ch',
}

describe('ProjectCard', () => {
  it('links to /realisations/[slug]', () => {
    render(<ProjectCard realisation={baseRealisation} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/realisations/test-projet')
  })

  it('shows client name and sector', () => {
    render(<ProjectCard realisation={baseRealisation} />)
    expect(screen.getByText(/Test Client/)).toBeInTheDocument()
    expect(screen.getByText(/Test sector/)).toBeInTheDocument()
  })

  it('shows "Captures uniquement" when liveUrl is undefined', () => {
    render(
      <ProjectCard realisation={{ ...baseRealisation, liveUrl: undefined }} />
    )
    expect(screen.getByText(/Captures uniquement/i)).toBeInTheDocument()
  })

  it('renders initials chip when client has no logo', () => {
    render(<ProjectCard realisation={baseRealisation} />)
    expect(screen.getByText('T')).toBeInTheDocument()
  })

  it('shows generic name when anonymized', () => {
    render(
      <ProjectCard
        realisation={{
          ...baseRealisation,
          client: { ...baseRealisation.client, anonymized: true, name: 'Cabinet juridique' },
        }}
      />
    )
    expect(screen.getByText(/Cabinet juridique/)).toBeInTheDocument()
  })
})
