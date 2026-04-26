import type { RealisationApproach } from '@/lib/realisations/types'

export function ApproachBlock({ approach }: { approach: RealisationApproach }) {
  return (
    <section id="approche" className="scroll-mt-[124px] border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-[68ch] px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Notre approche
        </h2>
        <h3 className="mt-3 text-xl text-violet-300">{approach.title}</h3>
        <p className="mt-6 text-[17px] leading-[1.7] text-text-secondary md:text-lg">
          {approach.body}
        </p>
        {approach.bullets && approach.bullets.length > 0 && (
          <ul className="mt-8 space-y-3">
            {approach.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-[17px] leading-[1.7] text-text-secondary">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {approach.diagramHtml && (
          <div
            className="mt-12"
            dangerouslySetInnerHTML={{ __html: approach.diagramHtml }}
          />
        )}
      </div>
    </section>
  )
}
