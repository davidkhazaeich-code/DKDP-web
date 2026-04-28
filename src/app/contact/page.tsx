import type { Metadata } from 'next'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { ContactSection } from '@/components/sections/ContactSection'
import { GoogleMapSection } from '@/components/sections/GoogleMapSection'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness, buildBreadcrumbList } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contact · DKDP · Service Digital Genève',
  description: 'Contactez DKDP pour votre projet digital. Réponse sous 24h. Réservez un appel découverte gratuit de 15 ou 30 minutes.',
  alternates: { canonical: 'https://dkdp.ch/contact' },
}

export default function ContactPage() {
  return (
    <HeroBg className="min-h-screen">
      <main>
        <SchemaOrg schema={buildLocalBusiness()} />
        <SchemaOrg schema={buildBreadcrumbList([
          { name: 'Accueil', url: '/' },
          { name: 'Contact', url: '/contact' },
        ])} />

        {/* Hero */}
        <section className="relative pt-[160px] pb-[72px]">
          <div className="blob-violet absolute -top-40 -right-40 w-[560px] h-[560px] opacity-[0.12] pointer-events-none" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
            <GradTag className="mb-6">Contact</GradTag>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-6">
              Parlons de <GradText as="span">votre projet</GradText>
            </h1>
            <p className="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
              Envoyez-nous un message ou réservez un appel de 15 à 30 minutes. Gratuit, sans engagement, on vous dit honnêtement si on peut vous aider.
            </p>
          </div>
        </section>

        {/* Contact form + Cal.com booking */}
        <ContactSection />

        {/* Google Maps + location info */}
        <GoogleMapSection />

      </main>
    </HeroBg>
  )
}
