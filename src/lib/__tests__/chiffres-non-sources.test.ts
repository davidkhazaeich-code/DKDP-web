import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Aucun résultat chiffré inventé sur le site (25/09/2026, décisions de David).
 *
 * Les témoignages anonymes et les résultats sans source ont été retirés de
 * toutes les pages FR et EN : « 18 h libérées par semaine », « x3.1 de ROI »,
 * « moyenne constatée sur 14 PME », « progression type observée »… Ce test
 * refuse leur retour, par exemple à la fusion d'une ancienne branche. Il lit le
 * code sans ses commentaires, qui gardent la trace de ce qui a été retiré.
 *
 * Seuls chiffres admis : la fiche Google (5,0 sur 22 avis), la fondation en
 * 2019, les réalisations publiées et les prix de `src/data/pricing.ts`.
 */
const RACINE = join(__dirname, '..', '..')
const EXCLUS = new Set(['chat-knowledge-base.ts', 'chiffres-non-sources.test.ts'])
const INTERDITS: Array<{ motif: RegExp; raison: string }> = [
  { motif: /Marc-Antoine V\./, raison: 'témoignage inventé' },
  { motif: /[Pp]rogression type observée|[Tt]ypical progress observed/, raison: 'progression sans mesure' },
  { motif: /observée?s? (sur nos participants|après nos formations)|observed (on|after) our (participants|training)/i, raison: 'mesure revendiquée sans source' },
  { motif: /(constatée?|observed) (sur|across) (les |the )?14 (PME|SMBs)/, raison: 'moyenne inventée' },
  { motif: /Durée moyenne constatée|Average duration observed/, raison: 'moyenne inventée' },
  { motif: /\b18 ?h(eures)? libérées|18 hours freed|freed up 18 hours/, raison: 'gain inventé' },
  { motif: /\bx ?3[.,]1\b/, raison: 'ROI inventé' },
  { motif: /\+240 ?% (de )?(trafic|traffic)/, raison: 'résultat inventé' },
  { motif: /100\+ (sites livrés|websites delivered)/, raison: 'compte de projets sans source' },
]

function fichiers(dir: string): string[] {
  return readdirSync(dir).flatMap((nom) => {
    const chemin = join(dir, nom)
    if (statSync(chemin).isDirectory()) return fichiers(chemin)
    return /\.(tsx?|txt)$/.test(nom) && !/\.test\.tsx?$/.test(nom) && !EXCLUS.has(nom) ? [chemin] : []
  })
}

/** Retire les blocs `/* … *\/` (dont `{/* … *\/}` en JSX) et les fins de ligne `// …`, sans toucher aux URL. */
function sansCommentaires(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1')
}

describe('chiffres non sourcés', () => {
  it('aucun résultat inventé ne revient dans src/ ni dans llms.txt', () => {
    const cibles = [...fichiers(RACINE), join(RACINE, '..', 'public', 'llms.txt')]
    const trouves: string[] = []
    for (const f of cibles) {
      const contenu = sansCommentaires(readFileSync(f, 'utf8'))
      for (const { motif, raison } of INTERDITS) {
        const m = contenu.match(motif)
        if (m) trouves.push(`${f.replace(RACINE, 'src')} : « ${m[0]} » (${raison})`)
      }
    }
    expect(trouves).toEqual([])
  })
})
