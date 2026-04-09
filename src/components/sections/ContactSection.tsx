'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, CalendarCheck, MessageSquare } from 'lucide-react'
import { ContactForm } from '@/components/sections/ContactForm'
import { CalBooking } from '@/components/sections/CalBooking'

const INFO = [
  { Icon: Phone, label: 'Téléphone', value: '+41 79 940 79 69', href: 'tel:+41799407969' },
  { Icon: Mail, label: 'Email', value: 'dk@dkdp.ch', href: 'mailto:dk@dkdp.ch' },
  { Icon: MapPin, label: 'Adresse', value: '36 Rue du 31 Décembre · Eaux-Vives · 1207 Genève', href: 'https://maps.google.com/?q=36+Rue+du+31+Décembre+1207+Genève' },
  { Icon: Clock, label: 'Horaires', value: 'Lun–Ven, 09:00–18:00', href: undefined },
]

type Tab = 'message' | 'booking'

export function ContactSection() {
  const [tab, setTab] = useState<Tab>('message')

  return (
    <section className="pb-32">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Tab switcher */}
        <div className="flex gap-3 mb-10 p-1 bg-bg-card border border-border rounded-[14px] w-full sm:w-fit">
          <button
            onClick={() => setTab('message')}
            className="flex flex-1 sm:flex-none items-center justify-center gap-2.5 px-5 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all duration-200"
            style={{
              background: tab === 'message' ? 'rgba(124,58,237,0.18)' : 'transparent',
              color: tab === 'message' ? '#A78BFA' : '#6B7280',
              border: tab === 'message' ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent',
            }}
          >
            <MessageSquare size={15} />
            Envoyer un message
          </button>
          <button
            onClick={() => setTab('booking')}
            className="flex flex-1 sm:flex-none items-center justify-center gap-2.5 px-5 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all duration-200"
            style={{
              background: tab === 'booking' ? 'rgba(124,58,237,0.18)' : 'transparent',
              color: tab === 'booking' ? '#A78BFA' : '#6B7280',
              border: tab === 'booking' ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent',
            }}
          >
            <CalendarCheck size={15} />
            Réserver un appel
          </button>
        </div>

        {/* Message tab */}
        {tab === 'message' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

            {/* Form */}
            <div className="bg-bg-card border border-border rounded-[20px] p-8 md:p-10">
              <h2 className="text-xl font-bold text-white mb-1">Décrivez votre projet</h2>
              <p className="text-text-muted text-sm mb-8">On vous répond sous 24h avec une proposition adaptée.</p>
              <ContactForm />
            </div>

            {/* Info sidebar */}
            <div className="space-y-4 lg:sticky lg:top-[106px]">

              {/* Direct contact */}
              <div className="bg-bg-card border border-border rounded-[16px] p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-violet-light mb-5">
                  Contact direct
                </p>
                <div className="space-y-4">
                  {INFO.map(({ Icon, label, value, href }) => {
                    const content = (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-[8px] bg-violet/10 border border-violet/20 flex items-center justify-center flex-shrink-0">
                          <Icon size={14} className="text-violet-light" />
                        </div>
                        <div>
                          <p className="text-[10px] text-text-muted uppercase tracking-[0.08em] mb-0.5">{label}</p>
                          <p className="text-[13px] font-medium text-white">{value}</p>
                        </div>
                      </div>
                    )
                    return href
                      ? <a key={label} href={href} className="block hover:opacity-80 transition-opacity">{content}</a>
                      : <div key={label}>{content}</div>
                  })}
                </div>
              </div>

              {/* Switch to booking CTA */}
              <button
                onClick={() => setTab('booking')}
                className="w-full border border-violet/25 rounded-[16px] p-6 text-left transition-opacity hover:opacity-80"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0.03) 100%)' }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-[8px] bg-violet/15 border border-violet/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CalendarCheck size={14} className="text-violet-light" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-white mb-1.5">Préférez un appel ?</p>
                    <p className="text-text-secondary text-[12.5px] leading-relaxed">
                      Réservez un créneau de 15 ou 30 minutes directement dans mon agenda. Gratuit et sans engagement.
                    </p>
                    <p className="text-violet-light text-[12px] font-semibold mt-2">Voir les disponibilités →</p>
                  </div>
                </div>
              </button>

              {/* Availability */}
              <div className="flex items-center gap-3 px-4 py-3 bg-bg-card border border-border rounded-[10px]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <p className="text-text-secondary text-[12.5px]">
                  Disponible · Réponse sous <span className="text-white font-medium">24h ouvrables</span>
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Booking tab */}
        {tab === 'booking' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">Choisissez un créneau</h2>
              <p className="text-text-muted text-sm">
                Appel découverte de 15 min ou 30 min · Gratuit · Sans engagement
              </p>
            </div>
            <div
              className="border border-border rounded-[20px] overflow-hidden backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <CalBooking />
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
