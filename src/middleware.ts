import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const EUROPEAN_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  'IS', 'LI', 'NO',
  'CH', 'GB',
])

export function middleware(req: NextRequest) {
  const country = req.headers.get('x-vercel-ip-country') ?? ''
  // No country header = localhost/dev, allow by default
  const isEurope = !country || EUROPEAN_COUNTRIES.has(country)

  const res = NextResponse.next()
  res.cookies.set('geo-eu', isEurope ? '1' : '0', {
    httpOnly: false,
    secure: true,
    sameSite: 'lax',
    maxAge: 86400,
  })
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|fonts|robots.txt|sitemap.xml).*)'],
}
