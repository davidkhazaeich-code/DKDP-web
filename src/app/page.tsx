import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { RevealDisabledProvider } from '@/components/ui/SectionReveal'
import { HomeHero } from '@/components/sections/HomeHero'
import { FAQ_ITEMS } from '@/data/faq'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness, buildFAQPage, buildWebSite, buildOrganization, buildWebPageWithSpeakable } from '@/lib/schema'

// Tout ce qui est sous le fold — lazy-loadé pour ne pas bloquer le bundle initial (LCP/TTI)
const LogoBanner     = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const AllServices    = dynamic(() => import('@/components/sections/AllServices').then(m => ({ default: m.AllServices })))
const ProblemBlock   = dynamic(() => import('@/components/sections/ProblemBlock').then(m => ({ default: m.ProblemBlock })))
const ProcessSteps   = dynamic(() => import('@/components/sections/ProcessSteps').then(m => ({ default: m.ProcessSteps })))
const ProofStack     = dynamic(() => import('@/components/sections/ProofStack').then(m => ({ default: m.ProofStack })))
const Testimonials   = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const TeamSection    = dynamic(() => import('@/components/sections/TeamSection').then(m => ({ default: m.TeamSection })))
const FAQSection     = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const CTAFinal       = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))

export const metadata: Metadata = {
  title: 'Agence Digitale Genève · Sites web, IA & Formation | DKDP',
  description:
    'Agence digitale à Genève spécialisée en création de sites web, SEO, intelligence artificielle et formation entreprise. 700+ clients accompagnés en Suisse romande. Devis gratuit.',
  alternates: { canonical: 'https://dkdp.ch' },
  openGraph: {
    title: 'Agence Digitale Genève · Sites web, IA & Formation | DKDP',
    description:
      'Sites web sur mesure, SEO, IA et formation pour PME à Genève. 700+ clients accompagnés en Suisse romande. Devis gratuit en 24h.',
    url: 'https://dkdp.ch',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DKDP Agence Digitale Genève' }],
  },
  twitter: {
    images: ['/og-image.png'],
  },
}

export default function HomePage() {
  return (
    <>
      <SchemaOrg schema={buildLocalBusiness()} />
      <SchemaOrg schema={buildOrganization()} />
      <SchemaOrg schema={buildFAQPage(FAQ_ITEMS.map(({ question, answer }) => ({ question, answer })))} />
      <SchemaOrg schema={buildWebSite()} />
      <SchemaOrg schema={buildWebPageWithSpeakable({ name: 'Agence Digitale Geneve', url: '/', description: 'Agence digitale a Geneve specialisee en creation de sites web, SEO, intelligence artificielle et formation entreprise.' })} />
      <RevealDisabledProvider>
        <HomeHero />
        <LogoBanner />
        <ProblemBlock />
        <AllServices />
        <ProcessSteps />
        <ProofStack />
        <Testimonials />
        <TeamSection />
        <FAQSection />
        <CTAFinal />
      </RevealDisabledProvider>
    </>
  )
}
