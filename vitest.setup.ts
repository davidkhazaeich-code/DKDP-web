import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { configure } from '@testing-library/react'

// jsdom does not implement ResizeObserver; mock it globally
class MockResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  constructor(_callback: ResizeObserverCallback) {}
}
Object.defineProperty(window, 'ResizeObserver', { writable: true, configurable: true, value: MockResizeObserver })
Object.defineProperty(global, 'ResizeObserver', { writable: true, configurable: true, value: MockResizeObserver })

// jsdom does not implement IntersectionObserver; mock it so framer-motion
// whileInView animations don't throw in tests.
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

// Mock matchMedia to signal prefers-reduced-motion so framer-motion skips
// animation timing loops — prevents userEvent.click from timing out in tests
// that use vi.useFakeTimers().
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
})

// @testing-library/react v16 only detects jest fake timers, not vitest's.
// Override asyncWrapper so the internal setTimeout(0) drain resolves when
// vitest fake timers are active (detected by the clock property on setTimeout).
configure({
  asyncWrapper: async (cb) => {
    const result = await cb()
    // Flush the RTL internal setTimeout(0) drain with vitest's fake clock
    // when fake timers are active.
    const isVitestFakeTimers =
      typeof setTimeout === 'function' &&
      Object.prototype.hasOwnProperty.call(setTimeout, 'clock')
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 0)
      if (isVitestFakeTimers) {
        vi.advanceTimersByTime(0)
      }
    })
    return result
  },
})

