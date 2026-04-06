import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { GradTag } from '@/components/ui/GradTag'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildCreativeWork, buildBreadcrumbList } from '@/lib/schema'
import { PROJECTS, PORTFOLIO_SECTORS, getProject } from '@/lib/portfolio'
import { BrowserFrame } from './_components/BrowserFrame'
import { ColorSwatch } from './_components/ColorSwatch'
import dynamic from 'next/dynamic'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  const sector = PORTFOLIO_SECTORS[project.sector]
  return {
    title: `${project.name}, ${sector.label.toLowerCase()} | Realisations DKDP`,
    description: project.description,
    alternates: { canonical: `https://dkdp.ch/realisations/${slug}` },
    openGraph: {
      title: `${project.name} | DKDP`,
      description: project.description,
      url: `https://dkdp.ch/realisations/${slug}`,
      images: [{ url: `https://dkdp.ch${project.heroScreenshot.src}`, width: 1200, height: 675 }],
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const sector = PORTFOLIO_SECTORS[project.sector]

  return (
    <main className="pt-14">
      <SchemaOrg
        schema={buildCreativeWork({
          name: project.name,
          url: `/realisations/${project.slug}`,
          description: project.description,
          image: `https://dkdp.ch${project.heroScreenshot.src}`,
        })}
      />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Accueil', url: 'https://dkdp.ch' },
          { name: 'Realisations', url: 'https://dkdp.ch/realisations' },
          { name: project.name, url: `https://dkdp.ch/realisations/${project.slug}` },
        ])}
      />

      {/* ══ 1. Hero ══ */}
      <HeroBg blob1={`${sector.color}1f`} blob2="rgba(124,58,237,0.07)">
        <section className="pt-28 pb-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-8">
              <Link
                href="/realisations"
                className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
              >
                &larr; Retour aux realisations
              </Link>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: sector.bg, color: sector.color, border: `1px solid ${sector.border}` }}
              >
                {sector.label}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.08] mb-4 text-white">
              {project.name}
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>
        </section>
      </HeroBg>

      {/* ══ 2. Browser mockup ══ */}
      <section className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <BrowserFrame
              src={project.heroScreenshot.src}
              alt={project.heroScreenshot.alt}
              url={project.liveUrl}
            />
          </SectionReveal>
        </div>
      </section>

      {/* ══ 3. Stats bar ══ */}
      <section className="py-12 border-y border-zinc-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Secteur', value: sector.label },
              { label: 'Stack', value: project.techStack.slice(0, 2).join(' + ') },
              { label: 'Typographie', value: project.typography.heading },
              { label: 'Statut', value: 'En ligne' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-white font-semibold text-sm" style={{ color: sector.color }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. Subnav sticky ══ */}
      <div className="sticky top-14 z-30 border-b border-zinc-800 bg-[rgba(9,9,11,0.92)] backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="flex gap-6 py-3 overflow-x-auto scrollbar-none text-[13px]" aria-label="Sections">
            {['Le brief', 'Design', 'Fonctionnalites', 'Voir le site'].map(label => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s/g, '-')}`}
                className="flex-shrink-0 text-zinc-500 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ══ 5. Le brief ══ */}
      <section className="py-24 scroll-mt-[120px]" id="le-brief">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <GradTag className="mb-6">Le brief</GradTag>
            <div className="max-w-3xl">
              <blockquote
                className="text-zinc-300 text-lg leading-relaxed pl-6 border-l-2"
                style={{ borderColor: sector.color }}
              >
                {project.brief}
              </blockquote>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 6. Choix de design ══ */}
      <section className="py-24 border-t border-zinc-800 scroll-mt-[120px]" id="design">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <GradTag className="mb-6">Choix de design</GradTag>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {project.designChoices.map((choice, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="flex gap-4 p-5 rounded-[12px] border border-zinc-800 bg-zinc-900/40">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: sector.bg, color: sector.color, border: `1px solid ${sector.border}` }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed pt-1">{choice}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal delay={0.3}>
            <ColorSwatch colors={project.colors} typography={project.typography} />
          </SectionReveal>
        </div>
      </section>

      {/* ══ 7. Fonctionnalites ══ */}
      <section className="py-24 border-t border-zinc-800 scroll-mt-[120px]" id="fonctionnalites">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <GradTag className="mb-6">Fonctionnalites</GradTag>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {project.features.map((feature, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-4">
                  <svg className="flex-shrink-0 w-5 h-5 mt-0.5" style={{ color: sector.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-zinc-300 text-sm leading-relaxed">{feature}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. Screenshots ══ */}
      {project.screenshots.length > 0 && (
        <section className="py-24 border-t border-zinc-800">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <GradTag className="mb-8">Captures d&apos;ecran</GradTag>
            </SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.screenshots.map((screenshot, i) => (
                <SectionReveal key={i} delay={i * 0.1}>
                  <div className="rounded-[12px] border border-zinc-800 overflow-hidden">
                    <img
                      src={screenshot.src}
                      alt={screenshot.alt}
                      className="w-full h-auto"
                    />
                    {screenshot.caption && (
                      <p className="text-zinc-500 text-xs p-3">{screenshot.caption}</p>
                    )}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ 9. CTA voir le site ══ */}
      <section className="py-24 border-t border-zinc-800 scroll-mt-[120px]" id="voir-le-site">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div
              className="max-w-xl mx-auto rounded-[20px] border p-10 text-center"
              style={{ background: sector.bg, borderColor: sector.border }}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-3 text-white">
                Voir le site en direct
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                Decouvrez {project.name} tel que concu et developpe par DKDP.
              </p>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
                style={{ background: sector.color, color: '#000' }}
              >
                Visiter {project.liveUrl.replace('https://', '')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <div className="mt-6">
                <Link
                  href="/realisations"
                  className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
                >
                  &larr; Retour aux realisations
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 10. CTA Final ══ */}
      <CTAFinal />
    </main>
  )
}
