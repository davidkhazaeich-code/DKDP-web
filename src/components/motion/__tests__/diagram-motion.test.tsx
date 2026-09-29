import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { initDiagramMotion } from '../diagram-motion'
import { DgCount } from '../dg'

// Kit des diagrammes animés (docs/claude/22-diagrammes-animes.md) : le HTML servi reste l'état
// final, une racine déjà à l'écran n'est jamais masquée, un bloc sauté finit toujours par jouer.

let fire: (entry: { isIntersecting: boolean; bottom?: number }) => void
class CapturingObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  constructor(callback: IntersectionObserverCallback) {
    fire = ({ isIntersecting, bottom = 400 }) =>
      callback([{ isIntersecting, boundingClientRect: { bottom } } as IntersectionObserverEntry], this as unknown as IntersectionObserver)
  }
}

const media = (queries: Record<string, boolean>) =>
  vi.fn((query: string) => ({ matches: !!queries[query], media: query, addEventListener: vi.fn(), removeEventListener: vi.fn() }))

function makeRoot(mode: 'view' | 'hero', top: number) {
  const el = document.createElement('div')
  el.dataset.dg = mode
  el.getBoundingClientRect = () => ({ top, bottom: top + 300, left: 0, right: 300, width: 300, height: 300, x: 0, y: top, toJSON: () => ({}) })
  document.body.append(el)
  return el
}

const originalIO = window.IntersectionObserver
const originalMatchMedia = window.matchMedia

beforeEach(() => {
  window.IntersectionObserver = CapturingObserver as unknown as typeof IntersectionObserver
  window.matchMedia = media({}) as unknown as typeof window.matchMedia
})
afterEach(() => {
  window.IntersectionObserver = originalIO
  window.matchMedia = originalMatchMedia
  document.body.innerHTML = ''
})

describe('initDiagramMotion', () => {
  it('arme une racine sous l’écran puis la joue à son arrivée, une seule fois', () => {
    const root = makeRoot('view', window.innerHeight + 200)
    initDiagramMotion(root)
    expect(root.hasAttribute('data-dg-armed')).toBe(true)
    expect(root.hasAttribute('data-dg-play')).toBe(false)
    fire({ isIntersecting: true })
    expect(root.hasAttribute('data-dg-play')).toBe(true)
    expect(root.hasAttribute('data-dg-live')).toBe(true)
    fire({ isIntersecting: false })
    expect(root.hasAttribute('data-dg-live')).toBe(false)
    expect(root.hasAttribute('data-dg-play')).toBe(true)
  })

  it('ne masque jamais une racine déjà peinte à l’écran par le HTML serveur', () => {
    const root = makeRoot('view', 100)
    initDiagramMotion(root)
    expect(root.hasAttribute('data-dg-armed')).toBe(false)
    fire({ isIntersecting: true })
    expect(root.hasAttribute('data-dg-live')).toBe(true)
  })

  it('arme toujours un DOM neuf (navigation côté client), même à l’écran', () => {
    const root = makeRoot('view', 100)
    initDiagramMotion(root, { fresh: true })
    expect(root.hasAttribute('data-dg-armed')).toBe(true)
  })

  it('joue un bloc sauté d’un coup (déjà au-dessus de l’écran)', () => {
    const root = makeRoot('view', window.innerHeight + 200)
    initDiagramMotion(root)
    fire({ isIntersecting: false, bottom: -50 })
    expect(root.hasAttribute('data-dg-play')).toBe(true)
  })

  it('joue un bloc survolé par un saut (touche Fin) sans signal de l’observateur', async () => {
    let top = window.innerHeight + 200
    const root = makeRoot('view', top)
    root.getBoundingClientRect = () => ({ top, bottom: top + 300, left: 0, right: 300, width: 300, height: 300, x: 0, y: top, toJSON: () => ({}) })
    initDiagramMotion(root)
    expect(root.hasAttribute('data-dg-armed')).toBe(true)
    top = -2000
    window.dispatchEvent(new Event('scroll'))
    await new Promise((r) => requestAnimationFrame(() => r(null)))
    expect(root.hasAttribute('data-dg-play')).toBe(true)
  })

  it('laisse un visuel de hero au CSS sur grand écran', () => {
    window.matchMedia = media({ '(min-width: 1024px)': true }) as unknown as typeof window.matchMedia
    const root = makeRoot('hero', window.innerHeight + 200)
    initDiagramMotion(root)
    expect(root.hasAttribute('data-dg-armed')).toBe(false)
  })

  it('arme un visuel de hero empilé sous le texte sur mobile', () => {
    const root = makeRoot('hero', window.innerHeight + 200)
    initDiagramMotion(root)
    expect(root.hasAttribute('data-dg-armed')).toBe(true)
  })

  it('ne fait rien avec prefers-reduced-motion', () => {
    window.matchMedia = media({ '(prefers-reduced-motion: reduce)': true }) as unknown as typeof window.matchMedia
    const root = makeRoot('view', window.innerHeight + 200)
    initDiagramMotion(root)
    expect(root.hasAttribute('data-dg-armed')).toBe(false)
  })

  it('rend la racine propre au démontage', () => {
    const root = makeRoot('view', window.innerHeight + 200)
    const cleanup = initDiagramMotion(root)
    fire({ isIntersecting: true })
    cleanup()
    expect([...root.attributes].map((a) => a.name)).toEqual(['data-dg'])
  })

  it('ouvre une infobulle au toucher et la referme par Échap', () => {
    const root = makeRoot('view', 100)
    root.innerHTML = '<div class="dg-tip-host" tabindex="0">Couche<span class="dg-tip">Infobulle</span></div>'
    initDiagramMotion(root)
    const host = root.querySelector<HTMLElement>('.dg-tip-host')!
    host.click()
    expect(host.hasAttribute('data-open')).toBe(true)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(host.hasAttribute('data-open')).toBe(false)
  })
})

describe('DgCount', () => {
  it('sert la vraie valeur dans le HTML (Google, lecteur d’écran, sans JS)', () => {
    const html = renderToStaticMarkup(<DgCount to={87} from={12} />)
    expect(html).toContain('>87</span>')
    expect(html).toContain('--dg-to:87')
    expect(html).toContain('--dg-from:12')
  })
})
