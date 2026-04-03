import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { HeroBg } from '@/components/ui/HeroBg'

const TRANSFORMATIONS = [
  {
    client: 'Solid SA',
    before: {
      description: 'Site vieillissant, aucune stratégie SEO, 0 lead entrant par mois',
    },
    after: {
      description: 'Refonte complète, +340% de trafic organique en 6 mois, 15 leads/mois',
    },
  },
  {
    client: 'WellWays',
    before: {
      description: 'Présence digitale inexistante, notoriété locale uniquement',
    },
    after: {
      description: 'Site vitrine moderne, Google My Business optimisé, visibilité nationale',
    },
  },
] as const

export function BeforeAfter({ accentRgb }: { accentRgb?: string } = {}) {
  return (
    <HeroBg accentRgb={accentRgb}>
      <section aria-labelledby="beforeafter-heading" className="py-36">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <GradTag className="mb-6">Transformations</GradTag>
              <h2 id="beforeafter-heading" className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">
                Ce que ça change, concrètement.
              </h2>
            </div>
          </SectionReveal>

          <div className="space-y-8">
            {TRANSFORMATIONS.map((t, i) => (
              <SectionReveal key={t.client} delay={i * 0.1}>
                <div className="bg-bg-card/80 backdrop-blur-sm border border-border rounded-[16px] p-6 md:p-8">
                  <p className="text-violet-light text-xs font-semibold uppercase tracking-[0.12em] mb-6">
                    {t.client}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-border text-text-muted mb-4">
                        Avant
                      </span>
                      <ImagePlaceholder
                        title={`${t.client} - avant`}
                        className="mb-4"
                        aspectRatio="4/3"
                      />
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {t.before.description}
                      </p>
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-violet/20 text-violet-light mb-4">
                        Après
                      </span>
                      <ImagePlaceholder
                        title={`${t.client} - après`}
                        className="mb-4"
                        aspectRatio="4/3"
                      />
                      <p className="text-white text-sm leading-relaxed font-medium">
                        {t.after.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </HeroBg>
  )
}
