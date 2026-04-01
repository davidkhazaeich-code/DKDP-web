import Link from 'next/link'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { Watermark } from '@/components/ui/Watermark'
import { GradText } from '@/components/ui/GradText'

export function CTAFinal() {
  return (
    <section aria-labelledby="cta-heading" className="py-32 relative overflow-hidden">
      <Watermark />
      <div
        className="blob-orange absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-15 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="blob-violet absolute bottom-0 left-1/4 w-[400px] h-[400px] opacity-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <SectionReveal>
          <h2 id="cta-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-6">
            Parlons de{' '}
            <GradText as="span">votre projet</GradText>
          </h2>

          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            15 minutes, c&apos;est gratuit, et on vous dit honnêtement si on peut vous aider — et comment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <LiquidMetalButton href="/contact" size="lg">
              Réservez votre appel gratuit<span aria-hidden="true"> →</span>
            </LiquidMetalButton>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-sm text-text-muted items-center">
              <a href="tel:+41799407969" className="hover:text-white transition-colors">
                +41 79 940 79 69
              </a>
              <span className="hidden sm:block" aria-hidden="true">·</span>
              <a href="mailto:dk@dkdp.ch" className="hover:text-white transition-colors">
                dk@dkdp.ch
              </a>
            </div>
          </div>

          <p className="text-text-muted text-sm">
            Sans engagement · Réponse sous 24h · À Genève ou en visio
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
