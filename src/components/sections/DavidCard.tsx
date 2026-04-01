import Image from 'next/image'
import Link from 'next/link'
import { SectionReveal } from '@/components/ui/SectionReveal'

export function DavidCard() {
  return (
    <section aria-labelledby="david-heading" className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionReveal>
          <div className="bg-bg-card border border-border rounded-[16px] p-8 md:p-12 flex flex-col sm:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden">
                <Image
                  src="/images/team/david-khazaei.png"
                  alt="David Khazaei"
                  width={144}
                  height={144}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-center sm:text-left">
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
                className="text-violet-light text-sm font-semibold hover-grad-text transition-all inline-flex items-center gap-1"
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
