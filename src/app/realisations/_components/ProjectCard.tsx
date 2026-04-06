import Link from 'next/link'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { PORTFOLIO_SECTORS, type PortfolioProject } from '@/lib/portfolio'

export function ProjectCard({ project, delay }: { project: PortfolioProject; delay: number }) {
  const sector = PORTFOLIO_SECTORS[project.sector]
  return (
    <SectionReveal delay={delay} className="h-full">
      <Link
        href={`/realisations/${project.slug}`}
        className="group flex flex-col h-full rounded-[16px] border overflow-hidden hover:-translate-y-0.5 transition-transform duration-200"
        style={{ borderColor: sector.border }}
      >
        {/* Screenshot */}
        <div className="aspect-[16/9] flex-shrink-0 relative overflow-hidden bg-zinc-900">
          <img
            src={project.heroScreenshot.src}
            alt={project.heroScreenshot.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span
            className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(10,10,10,0.84)',
              color: sector.color,
              border: `1px solid ${sector.border}`,
            }}
          >
            {sector.label}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-3 bg-zinc-900/60">
          <h3 className="text-white font-semibold text-[15px] leading-snug line-clamp-2">
            {project.name}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed flex-1 line-clamp-2">
            {project.description}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-[12px] font-semibold transition-opacity group-hover:opacity-70"
              style={{ color: sector.color }}
            >
              Voir le projet &rarr;
            </span>
          </div>
        </div>
      </Link>
    </SectionReveal>
  )
}
