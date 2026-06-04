import type { Metadata } from 'next'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { ContactSection } from '@/components/sections/ContactSection'
import { GoogleMapSection } from '@/components/sections/GoogleMapSection'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness, buildBreadcrumbList } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contact · DKDP · Digital Agency Geneva',
  description: 'Contact DKDP for your digital project. Reply within 24h. Book a free 15 or 30-minute discovery call.',
  alternates: {
    canonical: 'https://dkdp.ch/en/contact',
    languages: {
      'fr-CH': 'https://dkdp.ch/contact',
      en: 'https://dkdp.ch/en/contact',
      'x-default': 'https://dkdp.ch/contact',
    },
  },
  openGraph: {
    title: 'Contact · DKDP · Digital Agency Geneva',
    description: 'Contact DKDP for your digital project. Reply within 24h. Free discovery call.',
    url: 'https://dkdp.ch/en/contact',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/images/og/contact.png', width: 1376, height: 768, alt: 'Contact DKDP: let us talk about your digital project, reply within 24h' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og/contact.png'],
  },
}

export default function ContactPageEN() {
  return (
    <HeroBg className="min-h-screen">
      <main>
        <SchemaOrg schema={buildLocalBusiness('en')} />
        <SchemaOrg schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'Contact', url: '/en/contact' },
        ])} />

        {/* Hero */}
        <section className="relative pt-[160px] pb-[72px]">
          <div className="blob-violet absolute -top-40 -right-40 w-[560px] h-[560px] opacity-[0.12] pointer-events-none" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
            <GradTag className="mb-6">Contact</GradTag>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-6">
              Let&apos;s talk about <GradText as="span">your project</GradText>
            </h1>
            <p className="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
              Send us a message or book a 15 to 30-minute call. Free, no commitment, and we tell you honestly whether we can help.
            </p>
          </div>
        </section>

        {/* Contact form + Cal.com booking */}
        <ContactSection lang="en" />

        {/* Google Maps + location info */}
        <GoogleMapSection lang="en" />

      </main>
    </HeroBg>
  )
}
