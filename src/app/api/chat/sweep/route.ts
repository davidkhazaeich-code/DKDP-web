import { NextRequest } from 'next/server'
import { sweepOpenSessions } from '@/lib/chat-analytics'

// Balayage serveur des sessions que le navigateur n'a pas fermees.
//
// Deux appelants :
//   - le cron Vercel (voir vercel.json), qui envoie Authorization: Bearer
//     ${CRON_SECRET} des que la variable est definie sur le projet ;
//   - David, a la main, avec ?token=ADMIN_TOKEN pour rattraper l'historique.
//
// Sans autorisation valable on repond 404 et non 401, comme /admin/chat :
// la route n'existe pas pour qui n'a pas le secret.

export const dynamic = 'force-dynamic'
export const maxDuration = 60

function isAuthorized(req: NextRequest, token: string | null): boolean {
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && req.headers.get('authorization') === `Bearer ${cronSecret}`) return true

  const adminToken = process.env.ADMIN_TOKEN
  if (adminToken && token === adminToken) return true

  return false
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)

  if (!isAuthorized(req, url.searchParams.get('token'))) {
    return new Response(null, { status: 404 })
  }

  // ?stale=N : age minimal du dernier message, en minutes. 0 balaie tout,
  // y compris une conversation en cours, a ne faire qu'en rattrapage manuel.
  const staleRaw = url.searchParams.get('stale')
  const staleParsed = staleRaw === null ? NaN : Number(staleRaw)
  const staleAfterMinutes =
    Number.isFinite(staleParsed) && staleParsed >= 0 ? staleParsed : undefined

  const result = await sweepOpenSessions({ staleAfterMinutes })

  return Response.json(result, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
