'use client'

import { useState } from 'react'
import { MapPin, Navigation, Clock, Phone } from 'lucide-react'
import type { Locale } from '@/i18n/config'

const LAT = 46.2017
const LNG = 6.1630
const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''

// Embed URL with dark mode via style param
const EMBED_SRC = MAPS_API_KEY
  ? `https://www.google.com/maps/embed/v1/place?key=${MAPS_API_KEY}&q=DKDP,36+Rue+du+31+Décembre,1207+Genève&zoom=16&maptype=roadmap`
  : `https://www.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`

const INFO_META = [
  { Icon: MapPin, href: undefined as string | undefined },
  { Icon: Clock, href: undefined as string | undefined },
  { Icon: Phone, href: 'tel:+41799407969' as string | undefined },
]

const CONTENT = {
  fr: {
    heading: 'Nous trouver',
    description: 'Au cœur du quartier des Eaux-Vives, à deux pas du lac Léman.',
    directions: 'Itinéraire Google Maps',
    loading: 'Chargement de la carte...',
    items: [
      { title: '36 Rue du 31 Décembre', sub: '1207 Genève, Suisse' },
      { title: 'Lun - Ven, 09:00 - 18:00', sub: 'Sur rendez-vous le samedi' },
      { title: '+41 79 940 79 69', sub: 'Appel ou WhatsApp' },
    ],
  },
  en: {
    heading: 'Find us',
    description: 'In the heart of the Eaux-Vives district, a stone throw from Lake Geneva.',
    directions: 'Google Maps directions',
    loading: 'Loading map...',
    items: [
      { title: '36 Rue du 31 Décembre', sub: '1207 Geneva, Switzerland' },
      { title: 'Mon - Fri, 09:00 - 18:00', sub: 'Saturday by appointment' },
      { title: '+41 79 940 79 69', sub: 'Call or WhatsApp' },
    ],
  },
} as const

export function GoogleMapSection({ lang = 'fr' }: { lang?: Locale } = {}) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const t = CONTENT[lang]

  return (
    <section className="relative border-t border-border overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(167,139,250,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-6 lg:gap-10">

          {/* Info card */}
          <div
            className="flex flex-col gap-6 p-6 sm:p-8 rounded-[20px] backdrop-blur-lg border border-border self-start bg-bg-card"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.30)' }}
                >
                  <MapPin size={14} className="text-violet-light" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-text">{t.heading}</h2>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {t.description}
              </p>
            </div>

            <div className="space-y-0">
              {INFO_META.map(({ Icon, href }, i) => {
                const { title, sub } = t.items[i]
                return (
                <div key={title} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-[8px] flex-shrink-0"
                    style={{ background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.20)' }}
                  >
                    <Icon size={14} className="text-violet-light" />
                  </div>
                  <div className="min-w-0">
                    {href ? (
                      <a href={href} className="text-text text-sm font-medium hover:text-violet-light transition-colors">{title}</a>
                    ) : (
                      <p className="text-text text-sm font-medium">{title}</p>
                    )}
                    <p className="text-text-muted text-[11px]">{sub}</p>
                  </div>
                </div>
                )
              })}
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=DKDP+Service+Digital,36+Rue+du+31+Décembre,1207+Genève"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[12px] text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg w-full"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(167,139,250,0.15))',
                border: '1px solid rgba(167,139,250,0.35)',
                color: '#A78BFA',
              }}
            >
              <Navigation size={15} />
              {t.directions}
            </a>
          </div>

          {/* Map iframe with subtle overlay */}
          <div
            className="relative rounded-[20px] overflow-hidden"
            style={{
              minHeight: 400,
              border: '1px solid rgba(167,139,250,0.20)',
              boxShadow: '0 0 40px rgba(167,139,250,0.06), 0 0 80px rgba(167,139,250,0.03)',
            }}
          >
            <iframe
              src={EMBED_SRC}
              title="DKDP, Service Digital Genève, 36 Rue du 31 Décembre, 1207 Genève"
              className="absolute inset-0 w-full h-full"
              style={{
                border: 0,
                opacity: iframeLoaded ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              onLoad={() => setIframeLoaded(true)}
            />

            {/* Loading state */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-bg-card z-20">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 rounded-full border-2 border-violet-light border-t-transparent animate-spin" />
                  <span className="text-text-muted text-xs">{t.loading}</span>
                </div>
              </div>
            )}

            {/* Subtle violet tint overlay for brand consistency */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(167,139,250,0.02) 50%, rgba(124,58,237,0.04) 100%)',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
