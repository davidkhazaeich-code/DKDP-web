import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { NextRequest } from 'next/server'
import { rateLimit, getIp } from '@/lib/rate-limit'

// Endpoint dedie aux follow-ups dynamiques sous la derniere reponse de
// l'assistant. Appele apres la fin du streaming, prend les 3-4 derniers
// messages, et retourne 3 suggestions courtes (max 10 mots) au format
// JSON pur. Idee tiree du chatbot Solid : re-engager le visiteur dans
// la conversation au lieu de le laisser sortir apres une reponse.

export const runtime = 'nodejs'

const ALLOWED_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  'IS', 'LI', 'NO',
  'CH',
  'GB',
])

const SUGGESTIONS_SYSTEM_PROMPT = `Tu generes 3 suggestions de questions de relance pour un visiteur du site DKDP (agence digitale Geneve). Les suggestions doivent inviter le visiteur a continuer la conversation apres la reponse de l'assistant.

Regles strictes :
- Exactement 3 suggestions, en francais.
- Chaque suggestion : 4 a 10 mots, tutoiement INTERDIT (toujours vouvoyer).
- Formuler comme une question ou une demande (commencer par un verbe ou un "Comment", "Combien", "Quels", "Pouvez-vous", etc.).
- Pertinentes par rapport au DERNIER message de l'assistant.
- Variees : ne pas paraphraser la meme question, couvrir des angles differents (concret, prix, exemple, prochaine etape).
- JAMAIS de em dash, JAMAIS d'emoji.
- Reponse strictement au format JSON suivant, sans markdown, sans texte avant ou apres :
{"suggestions":["...","...","..."]}

Exemples de bonnes suggestions :
- "Combien coute un site web ?"
- "Pouvez-vous me montrer un exemple ?"
- "Quel est le delai pour ce projet ?"
- "Comment se passe la premiere etape ?"

Exemples de MAUVAISES suggestions (ne pas faire) :
- "Tu peux me donner un exemple ?" (tutoiement)
- "Plus d'infos" (trop court, pas une question)
- "Je veux savoir..." (le visiteur ne parle pas a la 1re personne ici, il pose une question au bot)`

type IncomingMessage = {
  role: 'user' | 'assistant' | 'system'
  parts?: Array<{ type: string; text?: string }>
  content?: string
}

function extractText(message: IncomingMessage): string {
  if (typeof message.content === 'string') return message.content
  if (!Array.isArray(message.parts)) return ''
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text' && typeof p.text === 'string')
    .map((p) => p.text)
    .join('')
}

function clean(s: string): string {
  return s.replace(/\s+/g, ' ').trim()
}

export async function POST(req: NextRequest) {
  const country = req.headers.get('x-vercel-ip-country') ?? ''
  if (country && !ALLOWED_COUNTRIES.has(country)) {
    return Response.json({ suggestions: [] }, { status: 200 })
  }

  const ip = getIp(req)
  const { allowed } = rateLimit(ip, { scope: 'chat-suggestions', limit: 20, windowMs: 60 * 1000 })
  if (!allowed) {
    return Response.json({ suggestions: [] }, { status: 200 })
  }

  let body: { messages?: IncomingMessage[] }
  try {
    body = await req.json()
  } catch {
    return Response.json({ suggestions: [] }, { status: 200 })
  }

  const messages = Array.isArray(body.messages) ? body.messages : []
  if (messages.length === 0) return Response.json({ suggestions: [] }, { status: 200 })

  // On garde les 4 derniers messages pour donner du contexte a Haiku.
  const tail = messages.slice(-4)
  const transcript = tail
    .map((m) => `${m.role === 'user' ? 'Visiteur' : 'Assistant'}: ${clean(extractText(m))}`)
    .filter((line) => line.length > 0)
    .join('\n')

  if (!transcript) return Response.json({ suggestions: [] }, { status: 200 })

  try {
    const { text } = await generateText({
      model: anthropic('claude-haiku-4-5-20251001'),
      system: [{ role: 'system', content: SUGGESTIONS_SYSTEM_PROMPT }],
      messages: [
        {
          role: 'user',
          content: `Voici la fin de la conversation :\n\n${transcript}\n\nGenere 3 suggestions de relance au format JSON demande.`,
        },
      ],
      maxOutputTokens: 200,
      temperature: 0.7,
    })

    // Robust JSON parse : on accepte un texte qui contient l'objet
    // meme s'il est wrappe par du markdown ou du whitespace inattendu.
    const match = text.match(/\{[\s\S]*?\}/)
    if (!match) return Response.json({ suggestions: [] }, { status: 200 })

    let parsed: unknown
    try {
      parsed = JSON.parse(match[0])
    } catch {
      return Response.json({ suggestions: [] }, { status: 200 })
    }

    if (
      typeof parsed === 'object' && parsed !== null && 'suggestions' in parsed &&
      Array.isArray((parsed as { suggestions: unknown }).suggestions)
    ) {
      const raw = (parsed as { suggestions: unknown[] }).suggestions
      const suggestions = raw
        .filter((s): s is string => typeof s === 'string')
        .map((s) => clean(s))
        .filter((s) => s.length >= 4 && s.length <= 80)
        .slice(0, 3)
      return Response.json({ suggestions }, { status: 200 })
    }

    return Response.json({ suggestions: [] }, { status: 200 })
  } catch {
    return Response.json({ suggestions: [] }, { status: 200 })
  }
}
