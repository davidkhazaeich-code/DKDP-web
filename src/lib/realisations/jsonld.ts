import { ENTITY } from '@/lib/entity'
import { AUTHORS, aboutPath } from './authors'
import { domainLabel } from './taxonomy'
import type { Realisation } from './types'
import type { Locale } from '@/i18n/config'

/**
 * JSON-LD des realisations (v2, 2026-09-25), sorti de `src/lib/schema.ts`
 * pour ne pas partager ce fichier avec les autres chantiers.
 *
 * Une etude de cas est un `Article` : auteur reel (Person avec LinkedIn),
 * editeur (l'Organization du site, par son @id), dates de publication et de
 * revision, client en `about` quand il est nomme, videos en `VideoObject`.
 * La FAQ passe par `buildFAQPage` de `src/lib/schema.ts`, avec le meme texte
 * que celui affiche.
 */
const BASE_URL = ENTITY.url
const ORG_ID = `${BASE_URL}/#organization`

export function realisationUrl(slug: string, lang: Locale = 'fr'): string {
  return lang === 'en' ? `${BASE_URL}/en/portfolio/${slug}` : `${BASE_URL}/realisations/${slug}`
}

function authorNode(r: Realisation, lang: Locale) {
  const key = r.author ?? 'david'
  const a = AUTHORS[key]
  return {
    '@type': 'Person',
    '@id': `${BASE_URL}${aboutPath('fr')}#${key}`,
    name: a.name,
    jobTitle: a.role[lang],
    url: `${BASE_URL}${aboutPath(lang)}`,
    image: `${BASE_URL}${a.photo}`,
    sameAs: [a.linkedin],
    worksFor: { '@id': ORG_ID },
  }
}

function isoDuration(seconds: number): string {
  return `PT${Math.max(1, Math.round(seconds))}S`
}

export function buildRealisationArticle(input: {
  realisation: Realisation
  lang?: Locale
  /** URLs absolues des visuels, la premiere = image principale. */
  images?: string[]
}): Record<string, unknown> {
  const r = input.realisation
  const lang = input.lang ?? 'fr'
  const url = realisationUrl(r.slug, lang)
  const published = r.meta.publishedISO ?? r.meta.dateISO
  const images = (input.images ?? []).filter(Boolean)
  const named = !r.client.anonymized && r.consent.level !== 'anonyme'

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: r.meta.title,
    description: r.meta.excerpt,
    url,
    mainEntityOfPage: url,
    inLanguage: lang === 'en' ? 'en' : 'fr-CH',
    datePublished: published,
    dateModified: r.meta.dateModifiedISO ?? published,
    articleSection: domainLabel(r.domains[0], lang),
    keywords: r.tags.join(', '),
    author: authorNode(r, lang),
    publisher: { '@id': ORG_ID },
    isPartOf: {
      '@type': 'CollectionPage',
      name: lang === 'en' ? 'DKDP portfolio' : 'Réalisations DKDP',
      url: lang === 'en' ? `${BASE_URL}/en/portfolio` : `${BASE_URL}/realisations`,
    },
    ...(images.length > 0
      ? {
          image: images.map((u) => ({ '@type': 'ImageObject', url: u })),
          thumbnailUrl: images[0],
        }
      : {}),
    about: [
      ...(named
        ? [
            {
              '@type': 'Organization',
              name: r.client.name,
              ...(r.liveUrl ? { url: r.liveUrl } : {}),
              ...(r.client.location
                ? { address: { '@type': 'PostalAddress', addressLocality: r.client.location, addressCountry: 'CH' } }
                : {}),
            },
          ]
        : []),
      ...r.domains.map((d) => ({ '@type': 'Thing', name: domainLabel(d, lang) })),
    ],
    ...(r.videos && r.videos.length > 0
      ? {
          video: r.videos.map((v) => ({
            '@type': 'VideoObject',
            name: v.title,
            description: v.description,
            thumbnailUrl: `${BASE_URL}${v.poster}`,
            contentUrl: `${BASE_URL}${v.src}`,
            uploadDate: v.uploadDate,
            duration: isoDuration(v.durationSec),
            width: v.width,
            height: v.height,
            ...(v.transcript ? { transcript: v.transcript } : {}),
          })),
        }
      : {}),
  }
}

export function buildRealisationsCollection(input: {
  items: Pick<Realisation, 'slug' | 'meta'>[]
  lang?: Locale
}): Record<string, unknown> {
  const lang = input.lang ?? 'fr'
  const hubUrl = lang === 'en' ? `${BASE_URL}/en/portfolio` : `${BASE_URL}/realisations`
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: lang === 'en' ? 'DKDP portfolio' : 'Réalisations DKDP',
    url: hubUrl,
    inLanguage: lang === 'en' ? 'en' : 'fr-CH',
    publisher: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: input.items.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: realisationUrl(r.slug, lang),
        name: r.meta.title,
      })),
    },
  }
}
