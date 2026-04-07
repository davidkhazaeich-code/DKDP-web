'use client'

import { useRef, useEffect, useState } from 'react'
import { MapPin, Navigation, Clock, Phone } from 'lucide-react'

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
const LAT = 46.2017
const LNG = 6.1630
const MAP_ID = 'dkdp-dark-map'

// Dark theme matching the site's aesthetic
const DARK_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#12121a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#12121a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#6b6b80' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1e1e2e' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#555570' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a0a14' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3a3a50' }] },
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#151520' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#2a2a3a' }] },
]

function loadGoogleMaps(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.google?.maps) return Promise.resolve()

  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      const check = setInterval(() => {
        if (window.google?.maps) { clearInterval(check); resolve() }
      }, 100)
      return
    }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&v=weekly`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Google Maps failed to load'))
    document.head.appendChild(script)
  })
}

export function GoogleMapSection() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    loadGoogleMaps().then(() => {
      if (!mapRef.current || !window.google?.maps) return
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: LAT, lng: LNG },
        zoom: 15,
        styles: DARK_STYLES,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: 'cooperative',
      })

      new google.maps.Marker({
        position: { lat: LAT, lng: LNG },
        map,
        title: 'DKDP, Service Digital Genève',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#A78BFA',
          fillOpacity: 1,
          strokeColor: '#7C3AED',
          strokeWeight: 3,
        },
      })

      setLoaded(true)
    })
  }, [])

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

          {/* Info card — glass effect */}
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
              {[
                { Icon: MapPin, title: '36 Rue du 31 Décembre', sub: '1207 Genève, Suisse' },
                { Icon: Clock, title: 'Lun - Ven, 09:00 - 18:00', sub: 'Sur rendez-vous le samedi' },
                { Icon: Phone, title: '+41 79 940 79 69', sub: 'Appel ou WhatsApp', href: 'tel:+41799407969' },
              ].map(({ Icon, title, sub, href }) => (
                <div key={title} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-[8px] flex-shrink-0"
                    style={{ background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.20)' }}
                  >
                    <Icon size={14} className="text-violet-light" />
                  </div>
                  <div className="min-w-0">
                    {href ? (
                      <a href={href} className="text-white text-sm font-medium hover:text-violet-light transition-colors">{title}</a>
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

          {/* Map — with glow border */}
          <div
            className="relative rounded-[20px] overflow-hidden"
            style={{
              minHeight: 400,
              border: '1px solid rgba(167,139,250,0.20)',
              boxShadow: '0 0 40px rgba(167,139,250,0.06), 0 0 80px rgba(167,139,250,0.03)',
            }}
          >
            <div
              ref={mapRef}
              className="absolute inset-0"
              style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
            />
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-bg-card">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 rounded-full border-2 border-violet-light border-t-transparent animate-spin" />
                  <span className="text-text-muted text-xs">Chargement de la carte...</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
