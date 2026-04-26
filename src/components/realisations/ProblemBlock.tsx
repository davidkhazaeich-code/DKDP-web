import type { RealisationProblem } from '@/lib/realisations/types'

export function ProblemBlock({ problem }: { problem: RealisationProblem }) {
  return (
    <section id="contexte" className="scroll-mt-[124px] py-20 md:py-28">
      <div className="mx-auto max-w-[68ch] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Le contexte
        </h2>
        <h3 className="mt-3 text-xl text-violet-300">{problem.title}</h3>
        <p className="mt-6 text-[17px] leading-[1.7] text-text-secondary md:text-lg">
          {problem.body}
        </p>
        {problem.illustration && (
          <figure className="mt-12">
            <img
              src={problem.illustration.src}
              alt={problem.illustration.alt}
              loading="lazy"
              className="rounded-xl border border-white/10"
            />
            {problem.illustration.caption && (
              <figcaption className="mt-3 text-sm italic text-text-muted">
                {problem.illustration.caption}
              </figcaption>
            )}
          </figure>
        )}
      </div>
    </section>
  )
}
