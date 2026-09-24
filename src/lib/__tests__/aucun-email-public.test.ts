import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Plus d'adresse email de David sur le site (décision du 24/09/2026 : trop de
 * spam, le contact écrit passe par le formulaire /contact). Les robots
 * récoltent les adresses dans le HTML, le JSON-LD et llms.txt ; ce test
 * refuse leur retour dans tout ce qui est publié.
 *
 * Restent autorisés, parce que rien n'y est public : les routes d'API (elles
 * envoient les demandes à David), les notifications du chatbot, le PDF
 * d'estimation envoyé au seul demandeur, les tests, et la base du chatbot
 * (un crawl de la prod, régénéré chaque nuit par le cron).
 */
const ADRESSE = /\b(?:dk|david|david\.khazaei)@dkdp\.ch\b/i
const RACINE = join(__dirname, '..', '..', '..')
const AUTORISES = [
  /^src\/app\/api\//,
  /^src\/lib\/chat-analytics\.ts$/,
  /^src\/lib\/estimation\/generate-pdf\.ts$/,
  /^src\/data\/chat-knowledge-base\.ts$/,
  /\/__tests__\//,
]

function fichiers(dir: string): string[] {
  return readdirSync(dir).flatMap((nom) => {
    const chemin = join(dir, nom)
    if (statSync(chemin).isDirectory()) return fichiers(chemin)
    return /\.(tsx?|jsx?|mjs|json|mdx?|txt|xml|html|svg)$/.test(nom) ? [chemin] : []
  })
}

describe('aucune adresse email publique', () => {
  it("l'adresse de David n'apparaît dans aucun fichier publié", () => {
    const trouves = ['src', 'public']
      .flatMap((dossier) => fichiers(join(RACINE, dossier)))
      .map((f) => relative(RACINE, f))
      .filter((f) => !AUTORISES.some((re) => re.test(f)))
      .filter((f) => ADRESSE.test(readFileSync(join(RACINE, f), 'utf8')))
    expect(trouves).toEqual([])
  })
})
