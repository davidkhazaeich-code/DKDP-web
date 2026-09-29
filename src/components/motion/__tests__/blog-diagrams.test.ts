import { afterEach, describe, expect, it } from 'vitest'
import { annotateInfographic, findInfographics } from '../blog-diagrams'

// Infographies du blog : les classes du kit sont posées sans rien changer au texte.
const HTML = `
<article data-blog-article><div>
  <p>Paragraphe de l'article.</p>
  <div style="margin:2rem 0;padding:2rem;border:1px solid #333">
    <div style="font-size:0.7rem">Comment le coût s'accumule</div>
    <div style="display:flex;flex-direction:column;gap:0.75rem">
      <div style="display:flex;gap:1rem"><div style="display:flex;justify-content:center">5</div><div>Début de session</div></div>
      <div style="display:flex;gap:1rem"><div style="display:flex;justify-content:center">25</div><div>Mi-session</div></div>
      <div style="display:flex;gap:1rem"><div>80 %</div><div>Session saturée</div></div>
      <div style="display:flex;gap:1rem"><div>2026</div><div>Année</div></div>
      <div><div style="width:54%;height:8px;background-color:rgb(124, 58, 237)"></div></div>
    </div>
  </div>
</div></article>`

afterEach(() => {
  document.body.innerHTML = ''
})

describe('infographies du blog', () => {
  it('repère les blocs à style en ligne de la prose, pas les paragraphes', () => {
    document.body.innerHTML = HTML
    const blocks = findInfographics(document.querySelector('article')!)
    expect(blocks).toHaveLength(1)
  })

  it('titre en fondu, lignes dans l’ordre, barre qui se remplit, texte intact', () => {
    document.body.innerHTML = HTML
    const [block] = findInfographics(document.querySelector('article')!)
    const before = block.textContent
    expect(annotateInfographic(block)).toBe(true)
    expect(block.textContent).toBe(before)

    const title = block.children[0] as HTMLElement
    expect(title.classList.contains('dg-fade')).toBe(true)
    const rows = [...block.children[1].children] as HTMLElement[]
    expect(rows.every((r) => r.classList.contains('dg-rise'))).toBe(true)
    expect(rows.map((r) => r.style.getPropertyValue('--dg-at'))).toEqual(['80ms', '160ms', '240ms', '320ms', '400ms'])
    // Le style est resérialisé quand on y pose une variable : on retrouve la barre par sa largeur.
    const bar = [...block.querySelectorAll<HTMLElement>('div')].find((d) => d.style.width === '54%')!
    expect(bar.classList.contains('dg-grow-x')).toBe(true)
  })

  it('fait défiler 25 et 80 %, jamais 5 ni une année', () => {
    document.body.innerHTML = HTML
    const [block] = findInfographics(document.querySelector('article')!)
    annotateInfographic(block)
    const counts = [...block.querySelectorAll<HTMLElement>('.dg-count')]
    expect(counts.map((c) => c.textContent)).toEqual(['25', '80'])
    expect(counts[1].style.getPropertyValue('--dg-count-align')).toBe('end')
    expect(counts[1].parentElement!.textContent).toBe('80 %')
  })

  it('peut repasser sans envelopper deux fois un nombre', () => {
    document.body.innerHTML = HTML
    const [block] = findInfographics(document.querySelector('article')!)
    annotateInfographic(block)
    annotateInfographic(block)
    expect(block.querySelectorAll('.dg-count')).toHaveLength(2)
    expect(block.querySelectorAll('.dg-count .dg-count')).toHaveLength(0)
  })
})
