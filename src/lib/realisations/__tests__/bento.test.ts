import { describe, it, expect } from 'vitest'
import { bentoLayout, LG_COLUMNS } from '../bento'

/** Chaque rangee de 6 colonnes (grand ecran) et de 2 colonnes (tablette) est pleine. */
function rowsAreFull(n: number) {
  const cells = bentoLayout(n)
  expect(cells).toHaveLength(n)
  const lg = cells.reduce((sum, c) => sum + LG_COLUMNS[c.lg], 0)
  expect(lg % 6).toBe(0)
  // En tablette, on remplit les rangees dans l'ordre : jamais une cellule large sur une rangee entamee.
  let used = 0
  for (const c of cells) {
    const width = c.mdFull ? 2 : 1
    if (width === 2) expect(used % 2).toBe(0)
    used += width
  }
  expect(used % 2).toBe(0)
}

describe('bentoLayout', () => {
  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20])('remplit chaque rangee pour %i etudes', (n) => {
    rowsAreFull(n)
  })

  it('met une grande cellule en tete', () => {
    expect(bentoLayout(7)[0].lg).toBe('wide')
  })

  it('donne toute la largeur a une etude seule', () => {
    expect(bentoLayout(1)).toEqual([{ lg: 'full', mdFull: true }])
  })
})
