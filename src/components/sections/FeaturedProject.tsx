import Link from 'next/link'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { Badge } from '@/components/ui/Badge'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

const METRICS = [
  { value: '3', label: 'mois de délai' },
  { value: '+340%', label: 'trafic organique' },
  { value: '100/100', label: 'score Lighthouse' },
] as const

export function FeaturedProject() {
  return (
    <section aria-labelledby="featured-heading" className="py-24 bg-bg-card border-y border-border">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <GradTag className="mb-6">Étude de cas</GradTag>
            <h2 id="featured-heading" className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
              Solid SA — Refonte web complète
            </h2>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex gap-2 mb-6 flex-wrap">
                <Badge>Site web</Badge>
                <Badge>SEO</Badge>
                <Badge>Design</Badge>
              </div>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                Ce client nous a confié la refonte totale de leur site. En 3 mois,
                de la conception au déploiement : identité visuelle, développement
                sur mesure, stratégie SEO locale. Résultat : un site qui représente
                fidèlement l&apos;entreprise et génère des leads qualifiés.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {METRICS.map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-bold grad-text">{value}</p>
                    <p className="text-text-muted text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/realisations"
                className="inline-flex items-center gap-2 px-[22px] py-[11px] bg-white text-black text-[13px] font-semibold rounded-[8px] hover:bg-gray-100 transition-all duration-[150ms] hover:-translate-y-px"
              >
                Voir toutes nos réalisations →
              </Link>
            </div>
            <div>
              <ImagePlaceholder title="Screenshot — site refait" />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
