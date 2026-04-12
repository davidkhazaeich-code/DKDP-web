import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList } from '@/lib/schema'
import { HeroBg } from '@/components/ui/HeroBg'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { Estimator } from '../_components/Estimator'

export const metadata: Metadata = {
  title: 'Estimation gratuite site web · Simulateur de prix en ligne · DKDP',
  description:
    'Estimez le cout de votre site web en quelques clics. Simulateur interactif avec prix transparents. Site vitrine, e-commerce ou sur mesure. Devis detaille sous 48h.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale/creation-site-web/estimation' },
}

const violet = '#A78BFA'

export default function EstimationPage() {
  return (
    <main>
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
        { name: 'Creation de site web', url: 'https://dkdp.ch/agence-digitale/creation-site-web' },
        { name: 'Estimation', url: 'https://dkdp.ch/agence-digitale/creation-site-web/estimation' },
      ])} />

      {/* ── Hero compact ── */}
      <HeroBg blob1="rgba(124,58,237,0.14)" blob2="rgba(124,58,237,0.07)">
        <section className="pt-28 pb-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/agence-digitale" className="text-text-muted text-sm hover:text-white transition-colors">
                Service Digital
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <Link href="/agence-digitale/creation-site-web" className="text-text-muted text-sm hover:text-white transition-colors">
                Creation de site web
              </Link>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-sm" style={{ color: violet }}>Estimation</span>
            </div>
            <div className="text-center max-w-3xl mx-auto">
              <GradTag className="mb-6">Simulateur de prix</GradTag>
              <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.08] mb-4">
                Estimez votre <GradText as="span">projet web</GradText> en quelques clics
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed">
                Configurez votre site, choisissez vos options et recevez une estimation personnalisee. Prix transparents, devis detaille sous 48h.
              </p>
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Estimateur ── */}
      <section className="py-16">
        <Estimator />
      </section>
    </main>
  )
}
