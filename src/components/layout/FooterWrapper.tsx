import { headers } from 'next/headers'
import { Footer } from './Footer'
import { detectLocaleFromPath } from '@/i18n/config'

const HIDDEN_PATHS = [
  '/agence-digitale/creation-site-web/estimation',
  '/en/digital-agency/web-design/quote',
]

export async function FooterWrapper() {
  const h = await headers()
  const pathname = h.get('x-pathname') ?? '/'

  if (HIDDEN_PATHS.includes(pathname)) return null
  if (pathname.startsWith('/admin')) return null

  const locale = detectLocaleFromPath(pathname)
  return <Footer lang={locale} />
}
