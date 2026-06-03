import 'server-only'

import { headers } from 'next/headers'
import { detectLocaleFromPath, defaultLocale, type Locale } from './config'

/**
 * Detecte la locale courante cote serveur a partir du header `x-pathname`
 * injecte par `proxy.ts`. Fallback sur la locale par defaut si le header
 * est absent (build statique, prefetch, etc.).
 */
export async function getServerLocale(): Promise<Locale> {
  try {
    const h = await headers()
    const pathname = h.get('x-pathname') ?? '/'
    return detectLocaleFromPath(pathname)
  } catch {
    return defaultLocale
  }
}
