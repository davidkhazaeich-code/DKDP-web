import { NextRequest, after } from 'next/server'
import { rateLimit, getIp } from '@/lib/rate-limit'
import { closeSession } from '@/lib/chat-analytics'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// Endpoint appele par le widget en fin de session (beforeunload via
// navigator.sendBeacon, ou inactivite >5 min). Il est crucial qu'il accepte
// `text/plain` parce que sendBeacon n'envoie pas de Content-Type JSON.
export async function POST(req: NextRequest) {
  const ip = getIp(req)

  // Garde-fou : 30 close/IP/min suffit largement pour un visiteur normal.
  const { allowed } = rateLimit(ip, { scope: 'chat-close', limit: 30, windowMs: 60 * 1000 })
  if (!allowed) {
    return new Response(null, { status: 429 })
  }

  let payload: { sessionId?: unknown; referrer?: unknown } = {}
  try {
    const raw = await req.text()
    if (raw) payload = JSON.parse(raw)
  } catch {
    return new Response(null, { status: 204 })
  }

  const sessionId = payload.sessionId
  if (typeof sessionId !== 'string' || !UUID_REGEX.test(sessionId)) {
    return new Response(null, { status: 204 })
  }

  const referrer = typeof payload.referrer === 'string' ? payload.referrer.slice(0, 500) : undefined
  const ipCountry = req.headers.get('x-vercel-ip-country') || undefined

  // On rend 204 tout de suite pour ne pas bloquer beforeunload cote client,
  // mais `after` garde l'invocation vivante le temps que closeSession termine
  // sa lecture Supabase, son appel Haiku et son ecriture. Avec un simple
  // `void`, Vercel peut geler la fonction des la reponse envoyee et couper le
  // resume en plein vol, ce qui ressemble exactement a un beacon perdu.
  after(() => closeSession({ sessionId, referrer, ipCountry }))

  return new Response(null, { status: 204 })
}
