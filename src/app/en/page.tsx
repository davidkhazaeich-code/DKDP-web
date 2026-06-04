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
const ProcessSteps     = dynamic(() => import('@/components/sections/ProcessSteps').then(m => ({ default: m.ProcessSteps })))
const ProofStack       = dynamic(() => import('@/components/sections/ProofStack').then(m => ({ default: m.ProofStack })))
const Testimonials     = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const TeamSection      = dynamic(() => import('@/components/sections/TeamSection').then(m => ({ default: m.TeamSection })))
const FAQSection       = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const EstimationBanner = dynamic(() => import('@/components/sections/EstimationBanner').then(m => ({ default: m.EstimationBanner })))
const CTAFinal         = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))

export const metadata: Metadata = {
  title: 'Digital Agency Geneva · Web, AI & Training | DKDP',
  description:
    'Geneva digital agency for web design, SEO, AI rollouts and corporate AI training. 700+ Swiss clients. Free quote in 24 hours, fixed price, ships in weeks.',
  alternates: {
    canonical: 'https://dkdp.ch/en',
    languages: {
      'fr-CH': 'https://dkdp.ch/',
      'en': 'https://dkdp.ch/en',
      'x-default': 'https://dkdp.ch/',
    },
  },
  openGraph: {
    title: 'Digital Agency Geneva · Web, AI & Training | DKDP',
    description:
      'Websites that convert, AI that scales, training that sticks. 700+ Swiss clients trust DKDP. Free quote in 24h.',
    url: 'https://dkdp.ch/en',
    locale: 'en_US',
    alternateLocale: ['fr_CH'],
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DKDP, digital agency in Geneva' }],
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
      <SchemaOrg schema={buildWebPageWithSpeakable({ name: 'Digital Agency Geneva', url: '/en', description: 'Geneva digital agency specialised in web design, SEO, artificial intelligence and corporate training.', lang: 'en' })} />
      <RevealDisabledProvider>
        <HomeHero lang="en" />
        <ProblemBlock lang="en" />
        <LogoBanner lang="en" />
        <AllServices lang="en" />
        <ProcessSteps lang="en" />
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
