import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Chaines cassees relevees le 21/09/2026 (plan SEO, action D14) : vingt lignes
 * du site portaient « ça marché », « une service digital », « vôtrès » ou
 * « démarché ». Une faute de ce genre dans un H2 ou une FAQ finit citee telle
 * quelle par un assistant IA. Ce test refuse leur retour.
 *
 * `chat-knowledge-base.ts` est exclu : c'est un crawl du site, regenere par le
 * cron, il reflete la prod et non la source.
 */
const INTERDITS = ['ça marché', 'une service digital', 'vôtrès', 'démarché', 'structuré technique']
const RACINE = join(__dirname, '..', '..')
const EXCLUS = new Set(['chat-knowledge-base.ts', 'textes-casses.test.ts'])

function fichiers(dir: string): string[] {
  return readdirSync(dir).flatMap((nom) => {
    const chemin = join(dir, nom)
    if (statSync(chemin).isDirectory()) return fichiers(chemin)
    return /\.(tsx?|mdx?)$/.test(nom) && !EXCLUS.has(nom) ? [chemin] : []
  })
}

describe('textes casses', () => {
  it('aucune chaine interdite dans src/', () => {
    const trouves: string[] = []
    for (const f of fichiers(RACINE)) {
      const contenu = readFileSync(f, 'utf8')
      for (const mot of INTERDITS) {
        if (contenu.includes(mot)) trouves.push(`${f.replace(RACINE, 'src')} : « ${mot} »`)
      }
    }
    expect(trouves).toEqual([])
  })
})
