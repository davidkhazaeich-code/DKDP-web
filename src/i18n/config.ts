/**
 * DKDP — i18n configuration
 *
 * Pattern : Next 16 natif (pas de next-intl) avec dictionaries server-only.
 * - FR : racine /, pas de prefix (preserve SEO existant)
 * - EN : prefix /en/
 *
 * Slugs : traduits cote EN pour SEO local (ex : /agence-digitale -> /en/digital-agency).
 * Mapping bidirectionnel dans ./slugs.ts.
 */

export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

export const localeLabels: Record<Locale, string> = {
  fr: 'Francais',
  en: 'English',
}

export const localeFlags: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
}

/** OpenGraph locale codes. */
export const ogLocales: Record<Locale, string> = {
  fr: 'fr_CH',
  en: 'en_US',
}

/** html lang attribute values. */
export const htmlLangs: Record<Locale, string> = {
  fr: 'fr-CH',
  en: 'en',
}

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/**
 * Detect locale from a Next.js path.
 * /en/anything -> 'en'
 * anything else -> 'fr' (default)
 */
export function detectLocaleFromPath(pathname: string): Locale {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  return 'fr'
}
