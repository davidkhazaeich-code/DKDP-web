'use client'

import { useState } from 'react'
import { MapPin, Navigation, Clock, Phone } from 'lucide-react'

const LAT = 46.2017
const LNG = 6.1630
const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''

// Embed URL with dark mode via style param
const EMBED_SRC = MAPS_API_KEY
  ? `https://www.google.com/maps/embed/v1/place?key=${MAPS_API_KEY}&q=DKDP,36+Rue+du+31+Décembre,1207+Genève&zoom=16&maptype=roadmap`
  : `https://www.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`

export function GoogleMapSection() {
  const [iframeLoaded, setIframeLoaded] = useState(false)

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
            className="flex flex-col gap-6 p-6 sm:p-8 rounded-[20px] backdrop-blur-lg border border-border self-start"
            style={{ background: 'rgba(20,20,20,0.60)' }}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.30)' }}
                >
                  <MapPin size={14} className="text-violet-light" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold">Nous trouver</h2>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Au coeur du quartier des Eaux-Vives, à deux pas du lac Léman.
              </p>
            </div>

            <div className="space-y-0">
              {([
                { Icon: MapPin, title: '36 Rue du 31 Décembre', sub: '1207 Genève, Suisse' },
                { Icon: Clock, title: 'Lun - Ven, 09:00 - 18:00', sub: 'Sur rendez-vous le samedi' },
                { Icon: Phone, title: '+41 79 940 79 69', sub: 'Appel ou WhatsApp', href: 'tel:+41799407969' },
              ] as const).map(({ Icon, title, sub, ...rest }) => (
                <div key={title} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-[8px] flex-shrink-0"
                    style={{ background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.20)' }}
                  >
                    <Icon size={14} className="text-violet-light" />
                  </div>
                  <div className="min-w-0">
                    {'href' in rest && rest.href ? (
                      <a href={rest.href} className="text-white text-sm font-medium hover:text-violet-light transition-colors">{title}</a>
                    ) : (
                      <p className="text-white text-sm font-medium">{title}</p>
                    )}
                    <p className="text-text-muted text-[11px]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`}
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
              Itinéraire Google Maps
            </a>
          </div>

          {/* Map iframe with dark overlay */}
          <div
            className="relative rounded-[20px] overflow-hidden"
            style={{
              minHeight: 400,
              border: '1px solid rgba(167,139,250,0.20)',
              boxShadow: '0 0 40px rgba(167,139,250,0.06), 0 0 80px rgba(167,139,250,0.03)',
            }}
          >
            {/* Dark color filter over the iframe */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'rgba(9,9,11,0.15)',
                mixBlendMode: 'multiply',
              }}
            />

            <iframe
              src={EMBED_SRC}
              title="DKDP, Service Digital Genève, 36 Rue du 31 Décembre, 1207 Genève"
              className="absolute inset-0 w-full h-full"
              style={{
                border: 0,
                filter: 'saturate(0.3) brightness(0.55) contrast(1.3)',
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
                  <span className="text-text-muted text-xs">Chargement de la carte...</span>
                </div>
              </div>
            )}

            {/* Violet tint overlay for brand consistency */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 50%, rgba(167,139,250,0.05) 100%)',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
