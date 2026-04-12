import type { Metadata } from 'next'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList } from '@/lib/schema'
import { Estimator } from '../_components/Estimator'

export const metadata: Metadata = {
  title: 'Estimation gratuite site web · Simulateur de prix en ligne · DKDP',
  description:
    'Estimez le cout de votre site web en quelques clics. Simulateur interactif avec prix transparents. Site vitrine, e-commerce ou sur mesure. Devis detaille sous 48h.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale/creation-site-web/estimation' },
}

export default function EstimationPage() {
  return (
    <main className="relative min-h-screen">
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
        { name: 'Creation de site web', url: 'https://dkdp.ch/agence-digitale/creation-site-web' },
        { name: 'Estimation', url: 'https://dkdp.ch/agence-digitale/creation-site-web/estimation' },
      ])} />

      {/* ── Fond grille ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090B]" />
      </div>

      {/* ── Estimateur ── */}
      <section className="relative pt-20 sm:pt-28 pb-16">
        <Estimator />
      </section>
    </main>
  )
}
