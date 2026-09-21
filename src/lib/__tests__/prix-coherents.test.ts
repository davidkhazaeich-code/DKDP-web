import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { PRIX } from '@/data/pricing'

/**
 * Un prix public, une seule valeur (21/09/2026, plan SEO, action D13).
 *
 * Avant `src/data/pricing.ts`, le SEO valait 500, 600 ou 650 par mois selon
 * la page, la formation 150 ou 200 de l'heure, l'audit IA 500 ou 490. Ce test
 * refuse le retour des anciennes valeurs contradictoires dans les pages, les
 * donnees et `llms.txt`. Il ne cherche pas a lister tous les prix du site :
 * il attrape ceux qui ont deja diverge une fois.
 */
const RACINE = join(__dirname, '..', '..')
const EXCLUS = new Set(['chat-knowledge-base.ts', 'prix-coherents.test.ts'])
const INTERDITS: Array<{ motif: RegExp; raison: string }> = [
  { motif: /CHF 650\s*\/\s*(mois|month)/, raison: `SEO mensuel = ${PRIX.seoMonthly}` },
  { motif: /CHF 500\s*\/\s*(mois|month) pour un (accompagnement|site vitrine)/, raison: `SEO mensuel = ${PRIX.seoMonthly}` },
  { motif: /(starts|démarre) (at|à) CHF 500\s*\/\s*(mois|month)/, raison: `SEO mensuel = ${PRIX.seoMonthly}` },
  { motif: /CHF 150\s*\/\s*h (pour|for) 1 (personne|person)/, raison: `formation 1 personne = ${PRIX.formationHourly1}` },
  { motif: /CHF 150 (par|per) (heure|hour)/, raison: `particuliers = ${PRIX.particuliersHourly} (grille cours-informatique.ch)` },
  { motif: /(audit et conseil IA|AI audit).{0,40}CHF 500\b/i, raison: `audit IA = ${PRIX.auditIaStandard}` },
  { motif: /À partir de CHF 3'500',\s*note: 'selon la complexité/, raison: `site = ${PRIX.siteFrom}` },
  { motif: /463\+/, raison: 'compte de clients sans source' },
  { motif: /4[.,]6\/5/, raison: 'note sans source (la fiche Google dit 4,9 sur 86 pour cours-info, 5,0 sur 22 pour dkdp)' },
]

function fichiers(dir: string): string[] {
  return readdirSync(dir).flatMap((nom) => {
    const chemin = join(dir, nom)
    if (statSync(chemin).isDirectory()) return fichiers(chemin)
    return /\.(tsx?|txt)$/.test(nom) && !/\.test\.tsx?$/.test(nom) && !EXCLUS.has(nom) ? [chemin] : []
  })
}

describe('prix coherents', () => {
  it('aucune ancienne valeur contradictoire dans src/ et llms.txt', () => {
    const cibles = [...fichiers(RACINE), join(RACINE, '..', 'public', 'llms.txt')]
    const trouves: string[] = []
    for (const f of cibles) {
      const contenu = readFileSync(f, 'utf8')
      for (const { motif, raison } of INTERDITS) {
        const m = contenu.match(motif)
        if (m) trouves.push(`${f.replace(RACINE, 'src')} : « ${m[0]} » (${raison})`)
      }
    }
    expect(trouves).toEqual([])
  })
})
