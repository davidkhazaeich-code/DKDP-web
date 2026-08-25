import Link from 'next/link'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { HeroBg } from '@/components/ui/HeroBg'
import { SectionReveal } from '@/components/ui/SectionReveal'
import type { Realisation } from '@/lib/realisations/types'
import type { Locale } from '@/i18n/config'

const CATEGORY_LABEL: Record<Locale, Record<Realisation['category'], string>> = {
  fr: { 'site-web': 'Site web', 'projet-ia': 'Projet IA', 'site-web-ia': 'Site + IA' },
  en: { 'site-web': 'Website', 'projet-ia': 'AI project', 'site-web-ia': 'Web + AI' },
}

export function RealisationHeader({ r, lang = 'fr' }: { r: Realisation; lang?: Locale }) {
  const home = lang === 'en' ? '/en' : '/'
  const hub = lang === 'en' ? '/en/portfolio' : '/realisations'
  const contact = lang === 'en' ? '/en/contact' : '/contact'
  const t = {
    home: lang === 'en' ? 'Home' : 'Accueil',
    portfolio: lang === 'en' ? 'Portfolio' : 'Realisations',
    delivered: lang === 'en' ? 'Delivered' : 'Livre',
    visit: lang === 'en' ? 'Visit the site' : 'Visiter le site',
    start: lang === 'en' ? 'Start my project' : 'Lancer mon projet',
  }
  return (
    <HeroBg accentRgb="167,139,250">
      <header className="relative">
        <div className="mx-auto max-w-[1200px] px-6 pt-12 md:pt-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-text-muted">
            <Link href={home} className="hover:text-text">{t.home}</Link>
            <span className="mx-2">/</span>
            <Link href={hub} className="hover:text-text">{t.portfolio}</Link>
            <span className="mx-2">/</span>
            <span className="text-text-secondary">{r.client.name}</span>
          </nav>
        </div>

        <div className="mx-auto max-w-[1200px] px-6 pb-16 md:pb-20">
          <SectionReveal className="flex flex-col items-start">
            <GradTag className="self-start">{CATEGORY_LABEL[lang][r.category]}</GradTag>

            <h1 className="mt-6 text-4xl tracking-[-0.02em] leading-[1.05] text-text md:text-5xl lg:text-6xl">
              {r.client.name} :{' '}
              <GradText as="span">{r.meta.title}</GradText>
            </h1>

            <p className="mt-6 max-w-[68ch] text-lg leading-[1.7] text-text-secondary">
              {r.meta.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-text-muted">
              <span>{r.client.sector}</span>
              {r.client.location && (
                <>
                  <span>·</span>
                  <span>{r.client.location}</span>
                </>
              )}
              <span>·</span>
              <span>
                {t.delivered}{' '}
                {new Date(r.meta.dateISO).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-CH', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {r.liveUrl ? (
                <LiquidMetalButton
                  href={r.liveUrl}
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.visit}<span aria-hidden="true"> →</span>
                </LiquidMetalButton>
              ) : null}
              <Link
                href={contact}
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-[var(--surface-default)]"
              >
                {t.start}
              </Link>
            </div>
          </SectionReveal>
        </div>
      </header>
    </HeroBg>
  )
}
