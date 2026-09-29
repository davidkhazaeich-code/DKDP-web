/**
 * Infographies du blog (kit dg-*, docs/claude/22-diagrammes-animes.md).
 *
 * Les articles portent leurs schémas en HTML brut (blocs `<div style="…">` passés tels quels
 * par renderMarkdown). Au lieu d'annoter 126 blocs à la main, ce module les repère dans le DOM
 * et leur pose les classes du kit : titre en fondu, lignes qui arrivent dans l'ordre, barres qui
 * se remplissent, nombres qui défilent. Le HTML servi n'est pas modifié (Google, sans JS) ; les
 * classes restent inertes tant que le moteur n'a pas armé le bloc hors écran.
 */

const STEP = 80 // ms entre deux éléments de la séquence
const MAX_STEPS = 14
const INLINE = new Set(['SPAN', 'STRONG', 'B', 'EM', 'I', 'A', 'CODE', 'BR', 'SMALL', 'SUP', 'SUB', 'MARK', 'IMG', 'SVG'])
const PERCENT_WIDTH = /(?:^|;)\s*width\s*:\s*(\d+(?:\.\d+)?)%/i
const NUMBER = /^(\d{2,4})(\s?%)?$/

/** Blocs d'infographie d'un article : les div à style en ligne au premier niveau de la prose. */
export function findInfographics(article: Element): HTMLElement[] {
  return [...article.querySelectorAll<HTMLElement>(':scope > div > div[style]')].filter(
    (block) => block.children.length > 0 && !block.hasAttribute('data-dg'),
  )
}

const isList = (el: Element) => {
  if (el.children.length < 2) return false
  const display = getComputedStyle(el).display
  return display.includes('flex') || display.includes('grid')
}
const isLeaf = (el: Element) => [...el.children].every((c) => INLINE.has(c.tagName))

function setVar(el: HTMLElement, name: string, value: string | number) {
  el.style.setProperty(name, String(value))
}

/**
 * Pose les classes sur un bloc. Rend false si le bloc n'offre rien à animer.
 * Ordre = ordre de lecture ; un élément de liste s'anime d'un bloc (on ne descend pas dedans).
 */
export function annotateInfographic(block: HTMLElement): boolean {
  let seq = 0
  const next = () => Math.min(seq++, MAX_STEPS)
  const delays = new Map<Element, number>()

  const mark = (el: HTMLElement, cls: 'dg-rise' | 'dg-fade') => {
    const at = next() * STEP
    el.classList.add(cls)
    setVar(el, '--dg-at', `${at}ms`)
    delays.set(el, at)
  }

  const visit = (node: HTMLElement) => {
    const list = isList(node)
    for (const child of [...node.children] as HTMLElement[]) {
      if (INLINE.has(child.tagName)) continue
      if (list) mark(child, 'dg-rise')
      else if (isList(child) || !isLeaf(child)) visit(child)
      else mark(child, 'dg-fade')
    }
  }
  visit(block)
  if (seq < 2) return false

  const delayOf = (el: Element) => {
    for (let n: Element | null = el; n && n !== block; n = n.parentElement) {
      const d = delays.get(n)
      if (d !== undefined) return d
    }
    return 0
  }

  // Barres : largeur en % dans le style, fines, colorées. Sans texte : elles se remplissent ;
  // avec du texte : elles se révèlent (un scaleX écraserait les lettres).
  for (const bar of block.querySelectorAll<HTMLElement>('[style*="width"]')) {
    const match = PERCENT_WIDTH.exec(bar.getAttribute('style') ?? '')
    if (!match || Number(match[1]) < 3 || Number(match[1]) > 100) continue
    const cs = getComputedStyle(bar)
    if (parseFloat(cs.height) > 28) continue
    if (cs.backgroundColor === 'rgba(0, 0, 0, 0)' && cs.backgroundImage === 'none') continue
    if (bar.classList.contains('dg-rise') || bar.classList.contains('dg-fade')) continue
    bar.classList.add(bar.textContent?.trim() ? 'dg-wipe' : 'dg-grow-x')
    setVar(bar, '--dg-at', `${delayOf(bar) + 180}ms`)
    setVar(bar, '--dg-dur', '900ms')
  }

  // Nombres seuls (« 80 », « 38 % ») : ils défilent. Pas les années, pas les prix ni les décimales.
  for (const el of block.querySelectorAll<HTMLElement>('div, span, strong, p, b')) {
    if (el.children.length > 0 || el.closest('.dg-count')) continue
    const text = el.textContent?.trim() ?? ''
    const match = NUMBER.exec(text)
    if (!match) continue
    const value = Number(match[1])
    if (value < 10 || (value >= 1900 && value <= 2100)) continue
    const count = document.createElement('span')
    count.className = 'dg-count'
    count.textContent = match[1]
    setVar(count, '--dg-to', value)
    setVar(count, '--dg-at', `${delayOf(el) + 120}ms`)
    setVar(count, '--dg-count-align', match[2] ? 'end' : 'center')
    // Une seule enveloppe en ligne : dans un conteneur flex, chiffre et unité restent un seul
    // élément (sinon le gap du flex s'intercalerait entre « 38 » et « % »).
    const wrap = document.createElement('span')
    wrap.append(count)
    if (match[2]) wrap.append(match[2])
    el.replaceChildren(wrap)
  }
  return true
}
