import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserFrame } from '../BrowserFrame'

describe('BrowserFrame', () => {
  it('renders the three traffic-light dots', () => {
    const { container } = render(
      <BrowserFrame
        src="/test.webp"
        alt="Test"
        browserUrl="example.com"
      />
    )
    const dots = container.querySelectorAll('[data-browser-dot]')
    expect(dots.length).toBe(3)
  })

  it('renders the browser URL in the address bar', () => {
    render(
      <BrowserFrame src="/test.webp" alt="Test" browserUrl="goldencash.ch" />
    )
    expect(screen.getByText(/goldencash\.ch/)).toBeInTheDocument()
  })

  it('truncates long URLs with ellipsis', () => {
    render(
      <BrowserFrame
        src="/test.webp"
        alt="Test"
        browserUrl="example.com/this/is/a/very/long/path/that/should/be/truncated"
      />
    )
    const urlEl = screen.getByTestId('browser-url')
    expect(urlEl.textContent).toContain('...')
  })

  it('renders fallback when src is empty', () => {
    render(<BrowserFrame src="" alt="Goldencash" browserUrl="goldencash.ch" />)
    expect(screen.getByText(/Capture indisponible/i)).toBeInTheDocument()
  })

  it('applies card aspect ratio by default', () => {
    const { container } = render(
      <BrowserFrame src="/test.webp" alt="Test" browserUrl="example.com" />
    )
    const frame = container.querySelector('[data-browser-frame]')
    expect(frame?.className).toContain('aspect-[16/10]')
  })

  it('applies hero variant aspect ratio when variant=hero', () => {
    const { container } = render(
      <BrowserFrame
        src="/test.webp"
        alt="Test"
        browserUrl="example.com"
        variant="hero"
      />
    )
    const frame = container.querySelector('[data-browser-frame]')
    expect(frame?.className).toContain('aspect-[16/9]')
  })
})
