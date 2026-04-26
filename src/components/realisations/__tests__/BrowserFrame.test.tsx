import { describe, it, expect, vi } from 'vitest'
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

  it('triggers autoscroll via IntersectionObserver when trigger=visible on touch device', async () => {
    // Mock pointer: coarse
    const originalMatchMedia = window.matchMedia
    window.matchMedia = ((query: string) => ({
      matches: query.includes('coarse'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    })) as typeof window.matchMedia

    // Mock IntersectionObserver
    let triggerCallback: ((entries: IntersectionObserverEntry[]) => void) | null = null
    const observe = vi.fn()
    const disconnect = vi.fn()
    const OriginalIO = window.IntersectionObserver
    // Must use a real constructor function (not an arrow) so `new` works
    function MockIO(this: IntersectionObserver, cb: (entries: IntersectionObserverEntry[]) => void) {
      triggerCallback = cb
      this.observe = observe
      this.disconnect = disconnect
      this.unobserve = vi.fn()
      this.takeRecords = vi.fn(() => [])
      ;(this as unknown as Record<string, unknown>).root = null
      ;(this as unknown as Record<string, unknown>).rootMargin = ''
      ;(this as unknown as Record<string, unknown>).thresholds = [0.6]
    }
    window.IntersectionObserver = MockIO as unknown as typeof IntersectionObserver

    const { container } = render(
      <BrowserFrame
        src="/test.webp"
        alt="Test"
        browserUrl="example.com"
        trigger="visible"
      />
    )

    expect(observe).toHaveBeenCalledTimes(1)

    // Initially, the frame should not have data-autoscroll
    const frame = container.querySelector('[data-browser-frame]')
    expect(frame?.getAttribute('data-autoscroll')).toBeNull()

    // Fire the IO callback with intersectionRatio >= 0.6
    triggerCallback?.([
      { isIntersecting: true, intersectionRatio: 0.7 } as IntersectionObserverEntry,
    ])

    // Wait for state update
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(frame?.getAttribute('data-autoscroll')).toBe('true')
    expect(disconnect).toHaveBeenCalledTimes(1)

    // Restore globals
    window.matchMedia = originalMatchMedia
    window.IntersectionObserver = OriginalIO
  })

  it('does not set up IntersectionObserver when trigger=hover (even on touch)', () => {
    const originalMatchMedia = window.matchMedia
    window.matchMedia = ((query: string) => ({
      matches: query.includes('coarse'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    })) as typeof window.matchMedia

    const ioConstructor = vi.fn()
    const OriginalIO = window.IntersectionObserver
    window.IntersectionObserver = ioConstructor as unknown as typeof IntersectionObserver

    render(
      <BrowserFrame
        src="/test.webp"
        alt="Test"
        browserUrl="example.com"
        trigger="hover"
      />
    )

    expect(ioConstructor).not.toHaveBeenCalled()

    window.matchMedia = originalMatchMedia
    window.IntersectionObserver = OriginalIO
  })
})
