import type { Metadata } from 'next'
import { HomeHero } from '@/components/sections/HomeHero'
import { LogoBanner } from '@/components/sections/LogoBanner'
import { ProblemBlock } from '@/components/sections/ProblemBlock'
import { PillarCards } from '@/components/sections/PillarCards'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { ProofStack } from '@/components/sections/ProofStack'
import { FeaturedProject } from '@/components/sections/FeaturedProject'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Testimonials } from '@/components/sections/Testimonials'
import { DavidCard } from '@/components/sections/DavidCard'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildLocalBusiness } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'DKDP · Agence Digitale à Genève · IA · Formation',
  description:
    'Agence digitale à Genève. Création de sites, SEO, intelligence artificielle et formation entreprise. 150+ clients. Devis gratuit.',
  alternates: { canonical: 'https://dkdp.ch' },
  openGraph: {
    title: 'DKDP · Agence Digitale à Genève · IA · Formation',
    description:
      'Agence digitale à Genève. 150+ entreprises accompagnées. Devis gratuit.',
    url: 'https://dkdp.ch',
  },
}

export default function HomePage() {
  return (
    <>
      <SchemaOrg schema={buildLocalBusiness()} />
      <HomeHero />
      <LogoBanner />
      <ProblemBlock />
      <PillarCards />
      <BeforeAfter />
      <ProofStack />
      <FeaturedProject />
      <ProcessSteps />
      <Testimonials />
      <DavidCard />
      <CTAFinal />
    </>
  )
}
