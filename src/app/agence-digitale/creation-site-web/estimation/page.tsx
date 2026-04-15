import type { Metadata } from 'next'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildService } from '@/lib/schema'
import { EstimationStarter } from '../_components/EstimationStarter'
import { PriceChart } from '../_components/PriceChart'

export const metadata: Metadata = {
  title: 'Estimation gratuite site web · Simulateur de prix en ligne · DKDP',
  description:
    'Estimez le coût de votre site web en quelques clics. Simulateur interactif avec prix transparents. Site vitrine, e-commerce ou sur mesure. Devis détaillé sous 48h.',
  alternates: { canonical: 'https://dkdp.ch/agence-digitale/creation-site-web/estimation' },
}

export default function EstimationPage() {
  return (
    <main className="relative min-h-screen">
      <SchemaOrg schema={buildBreadcrumbList([
        { name: 'Accueil', url: 'https://dkdp.ch' },
        { name: 'Agence Digitale', url: 'https://dkdp.ch/agence-digitale' },
        { name: 'Création de site web', url: 'https://dkdp.ch/agence-digitale/creation-site-web' },
        { name: 'Estimation', url: 'https://dkdp.ch/agence-digitale/creation-site-web/estimation' },
      ])} />
      <SchemaOrg schema={buildService({
        name: 'Estimation gratuite de site web',
        url: '/agence-digitale/creation-site-web/estimation',
        description: 'Simulateur interactif pour estimer le coût de votre site web à Genève. Répondez à quelques questions et recevez un devis détaillé sous 48h.',
      })} />

      {/* ── Fond grille ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(167,139,250,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(167,139,250,0.12) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/40 via-transparent to-[#09090B]" />
      </div>

      {/* ── Hero ── */}
      <section className="relative pt-24 sm:pt-32 pb-10">
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#A78BFA' }}>
            Simulateur de prix
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white mb-10 leading-tight">
            Combien coûte votre site web ?
          </h1>
          <EstimationStarter />
        </div>
      </section>

      {/* ── Chart ── */}
      <section className="relative pb-12 px-4 sm:px-6">
        <PriceChart />
      </section>

      {/* ── Contexte SEO ── */}
      <section className="relative pb-20">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="rounded-[16px] border border-zinc-800 bg-zinc-900/40 p-7">
            <h2 className="text-white font-bold text-lg mb-3">Comment fonctionne le simulateur ?</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Le simulateur de prix DKDP calcule une fourchette de coût basée sur le type de site (vitrine, e-commerce, application web), le nombre de pages, les fonctionnalités souhaitées (formulaires, blog, espace client, multilangue) et vos besoins en maintenance. Ces critères déterminent le volume de travail et donc le budget.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Les tarifs indiqués correspondent aux prix pratiqués par DKDP à Genève pour des sites web sur mesure développés en Next.js ou Astro. Un site vitrine standard démarre à partir de CHF 2 500, un site avec CMS à partir de CHF 4 500, et un e-commerce à partir de CHF 6 000.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Le résultat est une estimation indicative. Après envoi, un expert DKDP analyse votre projet et vous envoie un devis personnalisé et détaillé sous 48h ouvrées. Aucun engagement, aucune carte bancaire requise.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
