import type { Metadata } from 'next'
import Link from 'next/link'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildService, buildBreadcrumbList } from '@/lib/schema'
import {
  ARTICLES,
  BLOG_CATEGORIES,
  FEATURED_SLUG,
} from '@/lib/blog-data'
import { violet, orange, chrome, green } from '@/lib/tokens'
import { ArticleCard } from './_components/ArticleCard'
import dynamic from 'next/dynamic'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const NewsletterForm = dynamic(() => import('@/components/sections/NewsletterForm').then(m => m.NewsletterForm))

export const metadata: Metadata = {
  title: 'Blog · Ressources digitales, IA et formation · DKDP',
  description:
    "Conseils pratiques sur le SEO, l'intelligence artificielle, la formation en entreprise et la stratégie digitale pour PME en Suisse romande.",
  alternates: { canonical: 'https://dkdp.ch/blog' },
}

/* ── Design tokens (aliases) ── */
const violetColor = violet.color
const violetBg    = violet.bg
const violetBd    = violet.border
const chromeColor = chrome.color
const chromeBg    = chrome.bg
const chromeBd    = chrome.border
const orangeColor = orange.color
const orangeBg    = orange.bg
const orangeBd    = orange.border
const greenColor  = green.color

const FEATURED = ARTICLES.find(a => a.slug === FEATURED_SLUG) ?? ARTICLES[0]
const GRID_ARTICLES = ARTICLES.filter(a => a.slug !== FEATURED_SLUG)

/* ── Page ── */
export default function BlogPage() {
  return (
    <main className="pt-14">
      <SchemaOrg
        schema={buildService({
          name: 'Blog DKDP',
          url: '/blog',
          description: 'Ressources et conseils digitaux pour PME suisses.',
        })}
      />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Accueil', url: 'https://dkdp.ch' },
          { name: 'Blog', url: 'https://dkdp.ch/blog' },
        ])}
      />

      {/* ══ 1. Hero ══ */}
      <HeroBg
        blob1="rgba(124,58,237,0.12)"
        blob2="rgba(255,107,0,0.07)"
      >
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl">
              <GradTag className="mb-6">Blog &amp; Ressources</GradTag>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-6">
                Conseils digitaux, IA et{' '}
                <GradText as="span" className="grad-text">formation pour PME.</GradText>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10">
                Ressources pratiques publiées par l&apos;équipe DKDP. SEO, automatisation, outils IA, stratégie web.
              </p>
              <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                Discuter de votre projet
              </LiquidMetalButton>
              <p className="mt-8 text-zinc-500 text-sm">
                {ARTICLES.length} articles · 4 catégories · Mise à jour mensuelle
              </p>
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ══ 2. Filtres catégories ══ */}
      <div className="sticky top-14 z-30 border-b border-zinc-800 bg-[rgba(9,9,11,0.92)] backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-none" aria-label="Filtres categories">
            <a href="#articles" className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors"
              style={{ background: violetBg, color: violetColor, border: `1px solid ${violetBd}` }}>
              Toutes
            </a>
            <a href="#articles" className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors"
              style={{ background: chromeBg, color: chromeColor, border: `1px solid ${chromeBd}` }}>
              Intelligence Artificielle
            </a>
            <a href="#cat-seo" className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors"
              style={{ background: violetBg, color: violetColor, border: `1px solid ${violetBd}` }}>
              SEO &amp; Visibilité
            </a>
            <a href="#cat-formation" className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors"
              style={{ background: orangeBg, color: orangeColor, border: `1px solid ${orangeBd}` }}>
              Formation
            </a>
            <a href="#cat-outils" className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors"
              style={{ background: 'rgba(74,222,128,0.08)', color: greenColor, border: '1px solid rgba(74,222,128,0.18)' }}>
              Outils &amp; Productivité
            </a>
          </nav>
        </div>
      </div>

      {/* ══ 3. Article mis en avant ══ */}
      <section className="py-24 scroll-mt-[120px]" id="articles">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8">
              A la une
            </p>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <Link
              href={`/blog/${FEATURED.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[20px] border overflow-hidden hover:-translate-y-0.5 transition-transform duration-200"
              style={{ borderColor: violetBd }}
            >
              {/* Hero image */}
              <div className="aspect-[16/9] lg:aspect-auto lg:min-h-[320px] relative overflow-hidden">
                <img
                  src={FEATURED.heroImage.src}
                  alt={FEATURED.heroImage.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 lg:p-10 gap-4 bg-zinc-900/80">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{
                      background: 'rgba(10,10,10,0.84)',
                      color: BLOG_CATEGORIES[FEATURED.category].color,
                      border: `1px solid ${BLOG_CATEGORIES[FEATURED.category].border}`,
                    }}
                  >
                    {BLOG_CATEGORIES[FEATURED.category].label}
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(10,10,10,0.84)', color: violetColor, border: `1px solid ${violetBd}` }}
                  >
                    A la une
                  </span>
                </div>

                <p className="text-zinc-500 text-xs">
                  {FEATURED.date} · {FEATURED.readTime} de lecture
                </p>

                <h2 className="text-white font-bold text-xl md:text-2xl leading-snug tracking-[-0.02em]">
                  {FEATURED.title}
                </h2>

                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                  {FEATURED.excerpt}
                </p>

                <span
                  className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-opacity group-hover:opacity-70"
                  style={{ color: violetColor }}
                >
                  Lire l&apos;article &rarr;
                </span>
              </div>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 4. Grille articles par catégorie ══ */}
      <section className="pb-24 scroll-mt-[120px]" id="cat-ia">
        <div className="max-w-[1200px] mx-auto px-6">

          {/* Intelligence Artificielle */}
          {GRID_ARTICLES.filter(a => a.category === 'ia').length > 0 && (
            <>
              <SectionReveal>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: chromeBg, color: chromeColor, border: `1px solid ${chromeBd}` }}>
                    Intelligence Artificielle
                  </span>
                  <div className="flex-1 h-px" style={{ background: chromeBd }} />
                </div>
              </SectionReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                {GRID_ARTICLES.filter(a => a.category === 'ia').map((article, i) => (
                  <ArticleCard key={article.slug} article={article} delay={i * 0.08} />
                ))}
              </div>
            </>
          )}

          {/* SEO */}
          <div id="cat-seo" className="scroll-mt-[120px]">
            {GRID_ARTICLES.filter(a => a.category === 'seo').length > 0 && (
              <>
                <SectionReveal>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: violetBg, color: violetColor, border: `1px solid ${violetBd}` }}>
                      SEO &amp; Visibilité
                    </span>
                    <div className="flex-1 h-px" style={{ background: violetBd }} />
                  </div>
                </SectionReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                  {GRID_ARTICLES.filter(a => a.category === 'seo').map((article, i) => (
                    <ArticleCard key={article.slug} article={article} delay={i * 0.08} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Formation */}
          <div id="cat-formation" className="scroll-mt-[120px]">
            {GRID_ARTICLES.filter(a => a.category === 'formation').length > 0 && (
              <>
                <SectionReveal>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: orangeBg, color: orangeColor, border: `1px solid ${orangeBd}` }}>
                      Formation
                    </span>
                    <div className="flex-1 h-px" style={{ background: orangeBd }} />
                  </div>
                </SectionReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                  {GRID_ARTICLES.filter(a => a.category === 'formation').map((article, i) => (
                    <ArticleCard key={article.slug} article={article} delay={i * 0.08} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Outils */}
          <div id="cat-outils" className="scroll-mt-[120px]">
            {GRID_ARTICLES.filter(a => a.category === 'outils').length > 0 && (
              <>
                <SectionReveal>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: 'rgba(74,222,128,0.08)', color: greenColor, border: '1px solid rgba(74,222,128,0.18)' }}>
                      Outils &amp; Productivité
                    </span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(74,222,128,0.18)' }} />
                  </div>
                </SectionReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {GRID_ARTICLES.filter(a => a.category === 'outils').map((article, i) => (
                    <ArticleCard key={article.slug} article={article} delay={i * 0.08} />
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </section>

      {/* ══ 5. Newsletter ══ */}
      <section className="py-24 border-t border-zinc-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div
              className="max-w-xl mx-auto rounded-[20px] border p-10 text-center"
              style={{ background: chromeBg, borderColor: chromeBd }}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-3 text-white">
                Recevez les prochains articles.
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                1 article par mois, pratique et directement applicable.
              </p>
              <NewsletterForm />
              <p className="text-zinc-500 text-xs mt-5">
                Aucun spam. Desabonnement en 1 clic.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ 6. CTA Final ══ */}
      <CTAFinal />
    </main>
  )
}
