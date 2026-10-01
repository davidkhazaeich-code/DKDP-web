import type { HubSlide } from '@/components/realisations/HubHeroVisual'
import { domainLabel, sectorLabel } from './taxonomy'
import { studyVisual } from './visual'
import { heroProof } from './hero'
import { formatDateShort } from '@/lib/format'
import type { Realisation } from './types'
import type { Locale } from '@/i18n/config'

/**
 * Diapositives du visuel tournant des realisations (hub, accueil), dans l'ordre
 * recu : image de presentation, ce qui a ete mis en place (`teaser`) et le
 * premier resultat source, avec sa date de releve. Une etude sans visuel est
 * ecartee. Les etudes doivent deja etre localisees pour `lang`.
 */
export function realisationSlides(items: Realisation[], lang: Locale, max = 6): HubSlide[] {
  const base = lang === 'en' ? '/en/portfolio' : '/realisations'
  return items
    .map((r): HubSlide | null => {
      const visual = studyVisual(r)
      if (!visual) return null
      const proof = heroProof(r)
      return {
        src: visual.src,
        alt: visual.alt,
        href: `${base}/${r.slug}`,
        client: r.client.name,
        label: `${domainLabel(r.domains[0], lang)} · ${sectorLabel(r.sector, lang)}`,
        points: r.teaser ?? [],
        result: proof ? { value: proof.value, metric: proof.metric, date: formatDateShort(proof.capturedAt) } : undefined,
      }
    })
    .filter((s): s is HubSlide => s !== null)
    .slice(0, max)
}
