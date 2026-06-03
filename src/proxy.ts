/**
 * Proxy (Next 16 = anciennement middleware).
 *
 * Roles :
 * 1. Injecter le pathname dans un header `x-pathname` sur la REQUETE pour que
 *    les Server Components puissent detecter la locale via `headers()` et
 *    renvoyer le bon `<html lang>`.
 * 2. Poser un cookie `geo-eu` selon le pays IP (header Vercel) pour la
 *    banniere cookies RGPD.
 *
 * IMPORTANT : ce fichier doit etre dans `src/` (a cote de `app/`), pas a la racine.
 */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const EUROPEAN_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  'IS', 'LI', 'NO',
  'CH', 'GB',
])

export function proxy(request: NextRequest) {
  // 1. Inject pathname into REQUEST headers (lisible par headers() server-side)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  // 2. Geo-EU cookie pour RGPD
  const country = request.headers.get('x-vercel-ip-country') ?? ''
  const isEurope = !country || EUROPEAN_COUNTRIES.has(country)
  response.cookies.set('geo-eu', isEurope ? '1' : '0', {
    httpOnly: false,
    secure: true,
    sameSite: 'lax',
    maxAge: 86400,
  })

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|fonts|robots.txt|sitemap.xml).*)'],
}
