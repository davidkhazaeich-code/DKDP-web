import { describe, it, expect } from 'vitest'
import { DKDP_SYSTEM_PROMPT } from '@/lib/chat-system-prompt'
import {
  CHAT_KNOWLEDGE_BASE,
  CHAT_KNOWLEDGE_BASE_PAGES_COUNT,
} from '@/data/chat-knowledge-base'
import { FR_TO_EN } from '@/i18n/slugs'

/**
 * Garde-fou sur la taille du system prompt du chatbot.
 *
 * Contexte : le 2026-06-05, la mise en ligne de la version anglaise du site a
 * fait entrer 51 pages `/en` dans le sitemap. Le crawler nocturne les a
 * avalées, le system prompt est passé de ~113k à 222k tokens, au-delà des
 * 200k de fenêtre de Claude Haiku 4.5, et le chatbot a cessé de répondre.
 *
 * Le bug est resté invisible deux mois et demi pour deux raisons :
 *   1. l'API répond HTTP 200 et cache l'erreur dans le flux SSE, donc aucun
 *      check d'uptime ne pouvait la voir ;
 *   2. la seule estimation de taille existante divisait par 4 chars/token,
 *      un ratio d'anglais, et annonçait 184k au lieu de 222k.
 *
 * Ces tests échouent au premier signe de retour du problème.
 */

// Ratio mesuré au tokenizer Anthropic (endpoint count_tokens) sur le contenu
// FR de dkdp.ch : 3.36 chars/token. On prend 3.2 pour surestimer les tokens,
// de sorte que le test se déclenche avant l'API et jamais après.
const CHARS_PER_TOKEN = 3.2
const MODEL_CONTEXT_LIMIT = 200_000
// Même plafond que scripts/build-chat-knowledge-base.mjs. Les deux doivent
// bouger ensemble.
const MAX_PROMPT_TOKENS = 160_000

const estimateTokens = (text: string) => Math.round(text.length / CHARS_PER_TOKEN)

describe('budget du system prompt chatbot', () => {
  it('tient dans la fenêtre de contexte de Claude Haiku 4.5', () => {
    const tokens = estimateTokens(DKDP_SYSTEM_PROMPT)

    expect(
      tokens,
      `Le system prompt fait ~${tokens} tokens, au-delà des ${MODEL_CONTEXT_LIMIT} ` +
        `de Claude Haiku 4.5. En prod cela ne renvoie pas une erreur HTTP : l'API ` +
        `répond 200 et place {"type":"error"} dans le flux SSE, donc le chatbot ` +
        `est muet sans que rien ne l'annonce. Élaguer la KB via EXCLUDED_PATHS / ` +
        `EXCLUDED_PREFIXES dans scripts/build-chat-knowledge-base.mjs.`
    ).toBeLessThan(MODEL_CONTEXT_LIMIT)
  })

  it('garde une marge sous le plafond de build', () => {
    const tokens = estimateTokens(DKDP_SYSTEM_PROMPT)

    expect(
      tokens,
      `Le system prompt fait ~${tokens} tokens, au-delà du plafond de ` +
        `${MAX_PROMPT_TOKENS}. Ce plafond garde ~40k tokens de marge pour la ` +
        `conversation et la réponse du modèle.`
    ).toBeLessThan(MAX_PROMPT_TOKENS)
  })

  it("n'embarque aucune page de la locale anglaise", () => {
    // Les pages /en sont des traductions mot pour mot des pages FR : elles
    // n'apportent aucun fait nouveau au bot mais pesaient 44 % du prompt.
    // Le prompt statique lui fait déjà répondre en anglais.
    const enPages = CHAT_KNOWLEDGE_BASE.split(/^## Page : /m)
      .slice(1)
      .map((section) => section.split('\n')[0].trim())
      .filter((path) => /^\/en(\/|$)/.test(path))

    expect(
      enPages,
      `${enPages.length} pages /en sont revenues dans la base de connaissances ` +
        `(${enPages.slice(0, 3).join(', ')}...). C'est exactement ce qui a cassé ` +
        `le chatbot le 2026-06-05. Vérifier EXCLUDED_PREFIXES dans ` +
        `scripts/build-chat-knowledge-base.mjs.`
    ).toEqual([])
  })

  it('contient bien le contenu français attendu', () => {
    // Contre-test : sans lui, une KB vide passerait les trois tests ci-dessus.
    expect(CHAT_KNOWLEDGE_BASE_PAGES_COUNT).toBeGreaterThan(30)
    expect(DKDP_SYSTEM_PROMPT).toContain('## Page : /tarifs')
    expect(DKDP_SYSTEM_PROMPT).toContain('## Page : /contact')
  })
})

/**
 * La base de connaissances est en français uniquement, mais le bot répond en
 * anglais. Les faits se traduisent tout seuls, pas les URLs : les slugs EN
 * sont des traductions, pas des préfixes. Sans table de correspondance le bot
 * enverrait un anglophone sur /tarifs, ou pire, inventerait /en/tarifs (404).
 */
describe('liens bilingues du chatbot', () => {
  // Le prompt statique s'arrête au premier séparateur, la KB suit.
  const staticRules = DKDP_SYSTEM_PROMPT.split('\n---\n')[0]

  it('embarque la table de correspondance des chemins', () => {
    expect(DKDP_SYSTEM_PROMPT).toContain(
      '### Table de conversion des chemins (français → anglais)'
    )
    // Slugs traduits, pas préfixés : c'est tout l'intérêt de la table.
    expect(DKDP_SYSTEM_PROMPT).toContain('/tarifs → /en/pricing')
    expect(DKDP_SYSTEM_PROMPT).toContain('/a-propos → /en/about')
    expect(DKDP_SYSTEM_PROMPT).toContain(
      '/agence-digitale/creation-site-web → /en/digital-agency/web-design'
    )
    // L'accueil est un cas particulier : / devient /en, pas /en/.
    expect(DKDP_SYSTEM_PROMPT).toContain('/ → /en')
  })

  it('traduit toutes les pages traduisibles', () => {
    const manquantes = Object.keys(FR_TO_EN).filter(
      (frPath) => !DKDP_SYSTEM_PROMPT.includes(`${frPath} → /en`)
    )
    expect(
      manquantes,
      `${manquantes.length} pages traduites du site n'apparaissent pas dans la ` +
        `table du prompt : ${manquantes.join(', ')}.`
    ).toEqual([])
  })

  it('propose une version anglaise pour chaque lien interne recommandé', () => {
    // C'est le test qui compte sur la durée : si quelqu'un ajoute une page à
    // la carte de liens sans la traduire, les anglophones se retrouvent avec
    // un lien français au milieu d'une réponse anglaise.
    // Gabarits illustrant le format attendu, pas de vraies pages.
    const GABARITS = new Set(['/chemin'])

    const liensCites = [
      ...staticRules.matchAll(/\]\((\/[^)\s]*)\)/g),
    ].map((m) => m[1])

    const sansTraduction = [...new Set(liensCites)]
      .filter((path) => !path.startsWith('/en'))
      .filter((path) => !GABARITS.has(path))
      .filter((path) => !(path in FR_TO_EN))

    expect(
      sansTraduction,
      `Ces pages sont recommandées par le bot mais n'ont pas d'équivalent ` +
        `anglais dans src/i18n/slugs.ts : ${sansTraduction.join(', ')}. ` +
        `Soit traduire la page, soit la retirer de la carte de liens.`
    ).toEqual([])
  })

  it('interdit explicitement de fabriquer une URL anglaise', () => {
    // Le piège naturel du modèle est de préfixer /en devant un slug français.
    expect(DKDP_SYSTEM_PROMPT).toContain("N'invente jamais une URL")
    expect(DKDP_SYSTEM_PROMPT).toContain('/en/tarifs n')
  })

  it('place la table de conversion APRÈS la base de connaissances', () => {
    // Propriété portante, pas cosmétique. Testé en conditions réelles : avec la
    // consigne placée avant la KB, le modèle répondait en anglais mais servait
    // des liens français. La KB fait ~116k tokens et annonce chacune de ses
    // pages par un chemin français, ce qui noie une consigne située en amont.
    // Remontée juste avant le message du visiteur, elle est suivie.
    const posTable = DKDP_SYSTEM_PROMPT.indexOf('### Table de conversion des chemins')
    const posDernierePageKB = DKDP_SYSTEM_PROMPT.lastIndexOf('## Page : ')

    expect(posTable).toBeGreaterThan(-1)
    expect(posDernierePageKB).toBeGreaterThan(-1)
    expect(
      posTable,
      "La table de conversion des liens doit rester APRÈS la base de " +
        'connaissances. Déplacée avant, elle est noyée sous les centaines de ' +
        'chemins français de la KB et le modèle sert des liens FR en anglais.'
    ).toBeGreaterThan(posDernierePageKB)
  })
})
