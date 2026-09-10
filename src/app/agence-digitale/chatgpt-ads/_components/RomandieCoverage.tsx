import Link from 'next/link'
import { MapPin, ChevronRight } from 'lucide-react'
import { violet } from '@/lib/tokens'
import type { Locale } from '@/i18n/config'
import { localizedPath } from '@/i18n/slugs'
import { CITIES } from '@/lib/cities'

/**
 * ChatGPT Ads à Genève, Lausanne et dans toute la Suisse romande. Le bloc
 * répond aux requêtes locales sans mentir : Ads Manager cible par pays, la
 * localité se construit dans la langue, le message, la page de destination et
 * les indications de contexte. Les huit villes sont celles des pages locales
 * du site, reliées via `localizedPath`.
 */

const COPY: Record<Locale, { title: string; text: string; alemannic: string; cityKicker: string; base: string }> = {
  fr: {
    title: 'ChatGPT Ads à Genève, Lausanne et dans toute la Suisse romande',
    text: 'Ads Manager cible d\'abord par pays, et un ciblage par ville n\'est pas garanti en Suisse. Pour toucher Genève ou la Suisse romande, DKDP joue sur ce qui compte dans une conversation : des cartes rédigées en français, un message qui nomme votre ville ou votre quartier, une page de destination locale et des indications de contexte qui décrivent les demandes de vos clients romands.',
    alemannic: 'Vous vendez aussi outre-Sarine ? DKDP prépare des cartes en allemand dans un groupe d\'annonces séparé, avec ses propres indications de contexte.',
    cityKicker: 'Agence digitale',
    base: 'Agence basée aux Eaux-Vives, à Genève. Interventions dans toute la Suisse romande.',
  },
  en: {
    title: 'ChatGPT Ads in Geneva, Lausanne and across French-speaking Switzerland',
    text: 'Ads Manager targets by country first, and city targeting is not guaranteed in Switzerland. To reach Geneva or French-speaking Switzerland, DKDP works on what matters inside a conversation: cards written in French, a message that names your city or neighbourhood, a local landing page and context hints that describe what your Swiss-French customers ask for.',
    alemannic: 'Selling across the Sarine too? DKDP prepares German cards in a separate ad group, with its own context hints.',
    cityKicker: 'Digital agency',
    base: 'Agency based in Eaux-Vives, Geneva. Working across French-speaking Switzerland.',
  },
}

export function RomandieCoverage({ lang = 'fr' }: { lang?: Locale }) {
  const t = COPY[lang]
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 items-start">
      <div>
        <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-text mb-4">{t.title}</h3>
        <p className="text-text-secondary leading-relaxed mb-4">{t.text}</p>
        <p className="text-text-secondary leading-relaxed mb-4">{t.alemannic}</p>
        <p className="text-text-muted text-sm flex items-start gap-2">
          <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: violet.color }} aria-hidden="true" />
          <span>{t.base}</span>
        </p>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 list-none m-0 p-0">
        {CITIES.map((city) => (
          <li key={city.slug}>
            <Link
              href={localizedPath(`/agence-digitale/${city.slug}`, lang)}
              className="group flex flex-col gap-1 p-4 rounded-[12px] border border-border bg-bg-card h-full transition-all hover:-translate-y-0.5 duration-200"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: violet.color }}>{t.cityKicker}</span>
              <span className="text-text font-semibold text-sm flex items-center gap-1">
                {city.name}
                <ChevronRight size={12} className="text-text-muted group-hover:text-text transition-colors" aria-hidden="true" />
              </span>
              <span className="text-text-muted text-[11px]">{city.canton}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
