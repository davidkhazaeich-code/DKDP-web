import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { RevealDisabledProvider } from '@/components/ui/SectionReveal'
import { HomeHero } from '@/components/sections/HomeHero'
import { FAQ_ITEMS_EN } from '@/data/faq'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness, buildFAQPage, buildWebSite, buildOrganization, buildWebPageWithSpeakable } from '@/lib/schema'

// Below-the-fold sections lazy-loaded, same as FR home (LCP/TTI)
const LogoBanner       = dynamic(() => import('@/components/sections/LogoBanner').then(m => ({ default: m.LogoBanner })))
const AllServices      = dynamic(() => import('@/components/sections/AllServices').then(m => ({ default: m.AllServices })))
const ProblemBlock     = dynamic(() => import('@/components/sections/ProblemBlock').then(m => ({ default: m.ProblemBlock })))
const FormationSpotlight = dynamic(() => import('@/components/sections/FormationSpotlight').then(m => ({ default: m.FormationSpotlight })))
const ProcessSteps     = dynamic(() => import('@/components/sections/ProcessSteps').then(m => ({ default: m.ProcessSteps })))
const TechWatch        = dynamic(() => import('@/components/sections/TechWatch').then(m => ({ default: m.TechWatch })))
const ProofStack       = dynamic(() => import('@/components/sections/ProofStack').then(m => ({ default: m.ProofStack })))
const Testimonials     = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const TeamSection      = dynamic(() => import('@/components/sections/TeamSection').then(m => ({ default: m.TeamSection })))
const FAQSection       = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const EstimationBanner = dynamic(() => import('@/components/sections/EstimationBanner').then(m => ({ default: m.EstimationBanner })))
const CTAFinal         = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))

export const metadata: Metadata = {
  title: 'Corporate AI Training and AI Agency, Geneva | DKDP',
  description:
    'DKDP trains your teams on Claude, ChatGPT and Copilot, then builds your AI agents with them across French-speaking Switzerland.',
  alternates: {
    canonical: 'https://dkdp.ch/en',
    languages: {
      'fr-CH': 'https://dkdp.ch/',
      'en': 'https://dkdp.ch/en',
      'x-default': 'https://dkdp.ch/',
    },
  },
  openGraph: {
    title: 'Corporate AI Training and AI Agency, Geneva | DKDP',
    description:
      'DKDP trains your teams on Claude, ChatGPT and Copilot, then builds your AI agents with them. Quote within 48 hours.',
    url: 'https://dkdp.ch/en',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DKDP, corporate AI training and AI agency in Geneva' }],
  },
  twitter: {
    images: ['/og-image.png'],
  },
}

export default function HomePageEN() {
  return (
    <>
      <SchemaOrg schema={buildLocalBusiness('en')} />
      <SchemaOrg schema={buildOrganization('en')} />
      <SchemaOrg schema={buildFAQPage(FAQ_ITEMS_EN.map(({ question, answer }) => ({ question, answer })))} />
      <SchemaOrg schema={buildWebSite('en')} />
      <SchemaOrg schema={buildWebPageWithSpeakable({ name: 'Corporate AI training and AI agency in Geneva', url: '/en', description: 'DKDP trains teams across French-speaking Switzerland on Claude, ChatGPT and Copilot, builds their AI agents and automations, and also creates websites.', lang: 'en' })} />
      <RevealDisabledProvider>
        <HomeHero lang="en" />
        <ProblemBlock lang="en" />
        <FormationSpotlight lang="en" />
        <LogoBanner lang="en" />
        <AllServices lang="en" />
        <ProcessSteps lang="en" />
        <TechWatch lang="en" />
        <ProofStack lang="en" />
        <Testimonials lang="en" />
        <TeamSection lang="en" />
        <FAQSection lang="en" items={FAQ_ITEMS_EN} title="Frequently asked questions" />
        <EstimationBanner lang="en" />
        <CTAFinal lang="en" />
      </RevealDisabledProvider>
    </>
  )
}
