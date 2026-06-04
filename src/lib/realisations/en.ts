import type { Realisation } from './types'
import type { Locale } from '@/i18n/config'

/**
 * English content overlay for realisations, keyed by slug.
 * FR data stays the single source; this merges EN text when lang === 'en'.
 * Tech labels (stack, dates, images, URLs) are shared and not duplicated here.
 */
type RealisationEN = Partial<Pick<Realisation, 'tags'>> & {
  client?: Partial<Realisation['client']>
  meta?: Partial<Realisation['meta']>
  problem?: Realisation['problem']
  approach?: Realisation['approach']
  results?: Realisation['results']
  testimonial?: Realisation['testimonial']
}

const EN_CONTENT: Record<string, RealisationEN> = {
  'goldencash-refonte': {
    tags: ['Rebuild', 'Astro', 'Live API', 'Admin dashboard', 'Local SEO'],
    client: { sector: 'Precious metals', location: 'Geneva' },
    meta: {
      title: 'Astro rebuild with real-time DTI pricing',
      excerpt:
        'Astro SSG showcase site with a hybrid XMLCharts plus FXCM API, a secure admin dashboard and precious-metal prices refreshed every 10 seconds.',
    },
    problem: {
      title: 'An ageing, unreliable system',
      body: "Golden Cash's previous system had several limitations. Precious-metal prices were not refreshed in real time, forcing clients to call to confirm a rate before each transaction. The admin interface was not properly secured, and occasional bugs affected the public display. For a business where trust and responsiveness on rates are essential, these flaws held back online conversion.",
    },
    approach: {
      title: 'Astro SSG plus a hybrid API with a secure dashboard',
      body: `A complete rebuild on Astro 5 in SSG for performance and deployment simplicity. On the backend, a PHP API acts as a hybrid proxy between two precious-metal price sources: XMLCharts as the primary source and FXCM as an automatic fallback. A 10-second cache limits paid calls while guaranteeing freshly validated rates. The public estimator calculates buy-back in real time based on weight and carat, and a JWT-secured admin dashboard lets the Golden Cash team switch between API sources, adjust margins, override EUR/CHF rates or manually freeze prices in seconds.`,
      bullets: [
        'Astro 5 SSG, Infomaniak deployment, Lighthouse 100/100',
        'Live estimator: weight and carat to real-time price, 30s refresh',
        'DTI table auto-refresh 10s for direct DTI transactions',
        'PHP API with automatic XMLCharts to FXCM fallback',
        'JWT-secured admin dashboard (8h), 1-click API switch',
        'Manual override of EUR/CHF, USD/CHF, USD/EUR rates',
        'Override mode to freeze prices if both APIs are unavailable',
      ],
    },
    results: [
      { metric: 'Lighthouse', value: '100/100', label: 'Mobile performance' },
      { metric: 'Latency', value: '< 10s', label: 'API switch XMLCharts to FXCM' },
      { metric: 'Timeline', value: '< 6 wks', label: 'Brief to production' },
    ],
    testimonial: {
      quote:
        "I highly recommend DKDP digital agency for the quality of its work. David handled my project with great professionalism and fully understood my brief from the start, with great responsiveness at every step. I particularly appreciated his attentiveness, his availability and the care given to details. An efficient and pleasant collaboration.",
      author: 'Sandrine',
      role: 'Co-manager, Golden Cash Geneva',
    },
  },
}

/** Returns the realisation with EN text merged in when lang === 'en'. */
export function localizeRealisation(r: Realisation, lang: Locale): Realisation {
  if (lang !== 'en') return r
  const e = EN_CONTENT[r.slug]
  if (!e) return r
  return {
    ...r,
    tags: e.tags ?? r.tags,
    client: { ...r.client, ...e.client },
    meta: { ...r.meta, ...e.meta },
    problem: e.problem ?? r.problem,
    approach: e.approach ?? r.approach,
    results: e.results ?? r.results,
    testimonial: e.testimonial ?? r.testimonial,
  }
}
