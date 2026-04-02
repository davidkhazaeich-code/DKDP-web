import Image from 'next/image'
import Link from 'next/link'
import { SectionReveal } from '@/components/ui/SectionReveal'

export function DavidCard() {
  return (
    <section aria-labelledby="david-heading" className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="bg-bg-card border border-border rounded-[20px] overflow-hidden flex flex-col md:flex-row">

            {/* Photo - fond transparent qui se fond dans la card */}
            <div className="relative flex-shrink-0 flex items-end justify-center md:justify-start w-full md:w-[280px] h-[260px] md:h-auto">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 70%)',
                }}
              />
              <Image
                src="/images/team/david-khazaei.png"
                alt="David Khazaei"
                width={280}
                height={320}
                className="relative z-10 h-full w-auto object-contain object-bottom"
                style={{ maxHeight: '320px' }}
              />
            </div>

            {/* Texte */}
            <div className="flex flex-col justify-center p-8 md:p-12 text-center md:text-left">
              <p className="text-violet-light text-xs font-semibold uppercase tracking-[0.12em] mb-3">
                À propos
              </p>
              <h2 id="david-heading" className="text-2xl md:text-3xl font-bold mb-4">David Khazaei</h2>
              <p className="text-text-secondary leading-relaxed mb-6 max-w-xl">
                15 ans à construire des sites et des outils qui fonctionnent. Pas de grande agence
                anonyme, pas de junior en stage. Vous parlez directement à celui qui fait le
                travail. Genevois d&apos;adoption, passionné de tech et de résultats mesurables.
              </p>
              <Link
                href="/a-propos"
                className="text-violet-light text-sm font-semibold hover-grad-text transition-all inline-flex items-center gap-1 md:w-fit mx-auto md:mx-0"
              >
                En savoir plus<span aria-hidden="true"> →</span>
              </Link>
            </div>

          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
