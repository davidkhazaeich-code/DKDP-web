import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { RevealDisabledProvider } from '@/components/ui/SectionReveal'
import { HomeHero } from '@/components/sections/HomeHero'
import { LogoBanner } from '@/components/sections/LogoBanner'
import { PillarCards } from '@/components/sections/PillarCards'
import { FeaturedServices } from '@/components/sections/FeaturedServices'
import { FAQ_ITEMS } from '@/data/faq'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness, buildFAQPage, buildWebSite } from '@/lib/schema'

// Sections sous le fold — lazy-loadées pour ne pas bloquer le bundle initial (LCP/TTI)
const ProblemBlock = dynamic(() => import('@/components/sections/ProblemBlock').then(m => ({ default: m.ProblemBlock })))
const ProcessSteps = dynamic(() => import('@/components/sections/ProcessSteps').then(m => ({ default: m.ProcessSteps })))
const BeforeAfter  = dynamic(() => import('@/components/sections/BeforeAfter').then(m => ({ default: m.BeforeAfter })))
const ProofStack   = dynamic(() => import('@/components/sections/ProofStack').then(m => ({ default: m.ProofStack })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const TeamSection  = dynamic(() => import('@/components/sections/TeamSection').then(m => ({ default: m.TeamSection })))
const FAQSection   = dynamic(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })))
const CTAFinal     = dynamic(() => import('@/components/sections/CTAFinal').then(m => ({ default: m.CTAFinal })))

export const metadata: Metadata = {
  title: 'DKDP · Service Digital à Genève · IA · Formation',
  description:
    'Service digital à Genève spécialisée en création de sites web, SEO, intelligence artificielle et formation entreprise. 700+ clients accompagnés en Suisse romande. Devis gratuit.',
  alternates: { canonical: 'https://dkdp.ch' },
  openGraph: {
    title: 'DKDP · Service Digital à Genève · IA · Formation',
    description:
      'Sites web, SEO, IA et formation pour PME à Genève. 700+ clients accompagnés en Suisse romande.',
    url: 'https://dkdp.ch',
  },
}

export default function HomePage() {
  return (
    <>
      <SchemaOrg schema={buildLocalBusiness()} />
      <SchemaOrg schema={buildFAQPage(FAQ_ITEMS.map(({ question, answer }) => ({ question, answer })))} />
      <SchemaOrg schema={buildWebSite()} />
      <RevealDisabledProvider>
        <HomeHero />
        <LogoBanner />
        <ProblemBlock />
        <PillarCards />
        <FeaturedServices />
        <ProcessSteps />
        <BeforeAfter />
        <ProofStack />
        <Testimonials />
        <TeamSection />
        <FAQSection />
        <CTAFinal />
      </RevealDisabledProvider>
    </>
  )
}
