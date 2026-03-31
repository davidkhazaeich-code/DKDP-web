import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '../Footer'

describe('Footer', () => {
  it('renders DKDP name', () => {
    render(<Footer />)
    expect(screen.getAllByText(/dkdp/i).length).toBeGreaterThan(0)
  })

  it('renders Genève address', () => {
    render(<Footer />)
    expect(screen.getByText(/genève/i)).toBeInTheDocument()
  })

  it('renders current year in copyright', () => {
    render(<Footer />)
    expect(screen.getByText(new RegExp(new Date().getFullYear().toString()))).toBeInTheDocument()
  })

  it('renders all 3 pillar links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /agence digitale/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /intelligence artificielle/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /formation entreprise/i })).toBeInTheDocument()
  })

  it('renders legal links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /mentions légales/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /politique de confidentialité/i })).toBeInTheDocument()
  })

  it('renders contact link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /réservez un appel/i })).toBeInTheDocument()
  })
})
