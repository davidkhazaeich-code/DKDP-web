import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildLocalBusiness } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contact DKDP · Digital Agency Geneva | Book a Call',
  description:
    'Talk to DKDP, a Geneva-based digital agency. Free quote within 24 hours, no commitment. Phone, email or book a 30-minute call online.',
  alternates: {
    canonical: 'https://dkdp.ch/en/contact',
    languages: {
      'fr-CH': 'https://dkdp.ch/contact',
      en: 'https://dkdp.ch/en/contact',
      'x-default': 'https://dkdp.ch/contact',
    },
  },
  openGraph: {
    title: 'Contact DKDP · Digital Agency Geneva | Book a Call',
    description: 'Free quote within 24 hours. Phone, email or book a 30-minute call online.',
    url: 'https://dkdp.ch/en/contact',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
  },
}

export default function EnContactPage() {
  return (
    <>
      <SchemaOrg schema={buildLocalBusiness()} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'Contact', url: '/en/contact' },
        ])}
      />

      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <GradTag>Contact</GradTag>
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight leading-[1.08] mt-4 mb-5">
            Let&apos;s build <GradText as="span">something useful.</GradText>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-[680px] mx-auto">
            Free quote within 24 hours, no commitment. Tell us what you want to ship, we will reply with scope, price and timeline.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-3 gap-5">
          {/* Book a call */}
          <div className="rounded-2xl p-7 border border-border flex flex-col" style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.18)' }}>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}>
              <Phone size={20} style={{ color: '#A78BFA' }} />
            </div>
            <h2 className="text-xl font-bold mb-2">Book a call</h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
              30-minute call to discuss your project. Free, no pitch deck, no sales pressure.
            </p>
            <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="md">
              Pick a slot <ArrowRight size={14} />
            </LiquidMetalButton>
          </div>

          {/* Email */}
          <div className="rounded-2xl p-7 border border-border flex flex-col" style={{ background: 'var(--bg-card)' }}>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4 bg-[var(--chrome-bg)] border border-[var(--chrome-border)]">
              <Mail size={20} className="text-text-secondary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Email</h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3 flex-1">
              Prefer writing? Send us the brief and any deck, screenshots or references you have.
            </p>
            <a href="mailto:dk@dkdp.ch" className="inline-flex items-center gap-1.5 text-sm font-semibold text-text hover:opacity-80">
              dk@dkdp.ch <ArrowRight size={14} />
            </a>
          </div>

          {/* Phone */}
          <div className="rounded-2xl p-7 border border-border flex flex-col" style={{ background: 'var(--bg-card)' }}>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.25)' }}>
              <Phone size={20} style={{ color: '#FF8C00' }} />
            </div>
            <h2 className="text-xl font-bold mb-2">Phone</h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3 flex-1">
              Monday to Friday, 9am to 6pm Geneva time. Voicemail outside business hours, we call back.
            </p>
            <a href="tel:+41799407969" className="inline-flex items-center gap-1.5 text-sm font-semibold text-text hover:opacity-80">
              +41 79 940 79 69 <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 border-t border-border" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <GradTag>Visit us</GradTag>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-3 mb-4">Eaux-Vives, Geneva</h2>
            <address className="not-italic space-y-3 text-text-secondary text-base">
              <a href="https://www.google.com/maps/dir/?api=1&destination=DKDP+Service+Digital,36+Rue+du+31+D%C3%A9cembre,1207+Gen%C3%A8ve" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-text">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" style={{ color: '#A78BFA' }} />
                <span>36 Rue du 31 Decembre<br />Eaux-Vives District<br />1207 Geneva, Switzerland</span>
              </a>
              <p className="flex items-center gap-3">
                <Clock size={18} className="flex-shrink-0" style={{ color: '#A78BFA' }} />
                Mon-Fri 09:00-18:00
              </p>
            </address>
          </div>

          <div>
            <GradTag>How we reply</GradTag>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-3 mb-4">Within 24 hours, with substance</h2>
            <ul className="space-y-3 text-text-secondary text-base">
              <li>1. We read your brief and ask any clarifying question</li>
              <li>2. We send a written quote with scope, price and timeline</li>
              <li>3. If useful, we book a 30-minute call to align before signature</li>
              <li>4. If you decide to engage, we kick off within the same week</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Want to read up first?</h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-6">
            Browse pricing, the AI catalogue or the training catalogue before reaching out.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/en/pricing" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-border text-sm font-semibold hover:bg-[var(--surface-default)]">Pricing <ArrowRight size={14} /></Link>
            <Link href="/en/digital-agency" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-border text-sm font-semibold hover:bg-[var(--surface-default)]">Digital services <ArrowRight size={14} /></Link>
            <Link href="/en/artificial-intelligence" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-border text-sm font-semibold hover:bg-[var(--surface-default)]">AI services <ArrowRight size={14} /></Link>
            <Link href="/en/corporate-training" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-border text-sm font-semibold hover:bg-[var(--surface-default)]">Training catalogue <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
