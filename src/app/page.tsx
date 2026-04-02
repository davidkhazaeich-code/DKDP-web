import type { Metadata } from 'next'
import { HomeHero } from '@/components/sections/HomeHero'
import { LogoBanner } from '@/components/sections/LogoBanner'
import { ProblemBlock } from '@/components/sections/ProblemBlock'
import { PillarCards } from '@/components/sections/PillarCards'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { ProofStack } from '@/components/sections/ProofStack'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Testimonials } from '@/components/sections/Testimonials'
import { TeamSection } from '@/components/sections/TeamSection'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { FeaturedServices } from '@/components/sections/FeaturedServices'
import { FAQSection } from '@/components/sections/FAQSection'
import { FAQ_ITEMS } from '@/data/faq'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness, buildFAQPage } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'DKDP · Service Digital à Genève · IA · Formation',
  description:
    'Service digital à Genève spécialisée en création de sites web, SEO, intelligence artificielle et formation entreprise. 150+ PME accompagnées en Suisse romande. Devis gratuit.',
  alternates: { canonical: 'https://dkdp.ch' },
  openGraph: {
    title: 'DKDP · Service Digital à Genève · IA · Formation',
    description:
      'Sites web, SEO, IA et formation pour PME à Genève. 150+ entreprises accompagnées en Suisse romande.',
    url: 'https://dkdp.ch',
  },
}

export default function HomePage() {
  return (
    <>
      <SchemaOrg schema={buildLocalBusiness()} />
      <SchemaOrg schema={buildFAQPage(FAQ_ITEMS.map(({ question, answer }) => ({ question, answer })))} />
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
    </>
  )
}
