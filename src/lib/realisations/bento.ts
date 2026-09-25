/**
 * Disposition en bento du hub des realisations : une grille de 6 colonnes en
 * grand ecran, 2 en tablette, dont chaque rangee est pleine quel que soit le
 * nombre d'etudes affichees (un filtre peut en laisser 1, 2, 5...).
 *
 * Grand ecran : des rangees « large + etroite » (4 + 2), « trois etroites »
 * (2 + 2 + 2) et « etroite + large » (2 + 4), dans cet ordre ; il reste 2
 * cellules, elles forment une rangee large + etroite, il en reste 1, elle
 * prend toute la largeur.
 *
 * Tablette : une cellule large ou pleine occupe les 2 colonnes ; dans une
 * suite de cellules etroites de longueur impaire, la derniere s'elargit, pour
 * qu'aucune rangee ne reste a moitie vide.
 */
export type BentoSpan = 'wide' | 'narrow' | 'half' | 'full'
export type BentoCell = { lg: BentoSpan; mdFull: boolean }

const ROWS: BentoSpan[][] = [
  ['wide', 'narrow'],
  ['narrow', 'narrow', 'narrow'],
  ['narrow', 'wide'],
  ['narrow', 'narrow', 'narrow'],
]

export function bentoLayout(n: number): BentoCell[] {
  const spans: BentoSpan[] = []
  let row = 0
  while (spans.length < n) {
    const left = n - spans.length
    if (left === 1) spans.push('full')
    else if (left === 2) spans.push(...(row % 2 === 0 ? (['wide', 'narrow'] as const) : (['narrow', 'wide'] as const)))
    else spans.push(...ROWS[row % ROWS.length])
    row++
  }

  const mdFull = spans.map((s) => s === 'wide' || s === 'full')
  let runStart = -1
  for (let i = 0; i <= spans.length; i++) {
    const narrow = i < spans.length && !mdFull[i]
    if (narrow && runStart === -1) runStart = i
    if (!narrow && runStart !== -1) {
      if ((i - runStart) % 2 === 1) mdFull[i - 1] = true
      runStart = -1
    }
  }

  return spans.slice(0, n).map((lg, i) => ({ lg, mdFull: mdFull[i] }))
}

/** Nombre de colonnes occupees par une cellule en grand ecran. */
export const LG_COLUMNS: Record<BentoSpan, number> = { wide: 4, narrow: 2, half: 3, full: 6 }
