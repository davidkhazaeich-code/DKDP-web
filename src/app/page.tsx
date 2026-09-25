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
const FormationSpotlight = dynamic(() => import('@/components/sections/FormationSpotlight').then(m => ({ default: m.FormationSpotlight })))
const ProcessSteps   = dynamic(() => import('@/components/sections/ProcessSteps').then(m => ({ default: m.ProcessSteps })))
const TechWatch      = dynamic(() => import('@/components/sections/TechWatch').then(m => ({ default: m.TechWatch })))
const ProofStack     = dynamic(() => import('@/components/sections/ProofStack').then(m => ({ default: m.ProofStack })))
const Testimonials   = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const TeamSection    = dynamic(() => import('@/components/sections/TeamSection').then(m => ({ default: m.TeamSection })))
const FAQSection     = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const EstimationBanner = dynamic(() => import('@/components/sections/EstimationBanner').then(m => ({ default: m.EstimationBanner })))
const CTAFinal       = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))

export const metadata: Metadata = {
  // 25/09/2026 : la formation IA et l'IA passent devant (demande David). Mesuré
  // en pixels (Arial 20 et 14, recette de tools/check-serp-width.mjs) : title
  // 394 px sur 600, description 803 px sur 920.
  title: 'Formation IA et agence IA à Genève | DKDP',
  description:
    "DKDP forme vos équipes à Claude, ChatGPT et Copilot, puis construit avec elles vos agents IA, à Genève et en Suisse romande.",
  alternates: {
    canonical: 'https://dkdp.ch',
    languages: {
      'fr-CH': 'https://dkdp.ch/',
      'en': 'https://dkdp.ch/en',
      'x-default': 'https://dkdp.ch/',
    },
  },
  openGraph: {
    title: 'Formation IA et agence IA à Genève | DKDP',
    description:
      "DKDP forme vos équipes à Claude, ChatGPT et Copilot, puis construit avec elles vos agents IA, à Genève et en Suisse romande.",
    url: 'https://dkdp.ch',
    locale: 'fr_CH',
    alternateLocale: ['en_US'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DKDP, formation IA et agence IA à Genève' }],
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
      <SchemaOrg schema={buildWebPageWithSpeakable({ name: 'Formation IA et agence IA à Genève', url: '/', description: 'DKDP forme les équipes des PME de Suisse romande à Claude, ChatGPT et Copilot, construit leurs agents IA et leurs automatisations, et crée aussi des sites web.' })} />
      <RevealDisabledProvider>
        <HomeHero />
        <ProblemBlock />
        <FormationSpotlight />
        <LogoBanner />
        <AllServices />
        <ProcessSteps />
        <TechWatch />
        <ProofStack />
        <Testimonials />
        <TeamSection />
        <FAQSection />
        <EstimationBanner />
        <CTAFinal />
      </RevealDisabledProvider>
    </>
  )
}
