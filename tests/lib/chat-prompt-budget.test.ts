import { describe, it, expect } from 'vitest'
import { DKDP_SYSTEM_PROMPT } from '@/lib/chat-system-prompt'
import {
  CHAT_KNOWLEDGE_BASE,
  CHAT_KNOWLEDGE_BASE_PAGES_COUNT,
} from '@/data/chat-knowledge-base'

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
