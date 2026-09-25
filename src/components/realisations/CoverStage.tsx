import type { RealisationCover } from '@/lib/realisations/types'

/**
 * Visuel principal d'une etude sans site a capturer, quand sa couverture est
 * un vrai livrable mis en scene (rapport, supports de formation) : une image
 * large, cadree comme la scene d'appareils des etudes de site. C'est souvent
 * l'element le plus grand du premier ecran, d'ou le chargement prioritaire.
 */
export function CoverStage({ cover }: { cover: RealisationCover }) {
  return (
    <div className="relative isolate mx-auto mt-4 max-w-[1200px] px-6 md:mt-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[10%] top-[10%] bottom-[-4%] -z-10 rounded-[40%] bg-[radial-gradient(closest-side,rgba(124,58,237,0.32),transparent)] blur-2xl"
      />
      <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]">
        <img
          src={cover.src}
          alt={cover.alt}
          width={1600}
          height={1000}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="block h-auto w-full"
        />
      </figure>
    </div>
  )
}
