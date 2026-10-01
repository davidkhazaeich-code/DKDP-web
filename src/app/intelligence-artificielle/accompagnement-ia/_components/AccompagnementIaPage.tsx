import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  ChevronRight, CheckCircle2, CalendarCheck, ScanSearch, Plug, MousePointerClick,
  Presentation, Users,
  MailOpen, FileText, Mic, PenLine, BookOpen, BarChart2, Lock,
} from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { GradText } from '@/components/ui/GradText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { HeroBg } from '@/components/ui/HeroBg'
import { HeroPills } from '@/components/ui/HeroPills'
import { ScrollSpyNav } from '@/components/ui/ScrollSpyNav'
import { LiquidMetalButton } from '@/components/canvas/LiquidMetalButton'
import { StepConnector } from '@/components/motion/StepConnector'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildServiceWithLocalBusiness, buildFAQPage, buildBreadcrumbList } from '@/lib/schema'
import { chrome, violet, green } from '@/lib/tokens'
import { localizedPath } from '@/i18n/slugs'
import type { Locale } from '@/i18n/config'
import { CONTENT, FAQ, FR_PATH } from './content'
import { HeroVisual } from './HeroVisual'
import { Livrables } from './Livrables'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const LogoBanner = dynamic(() => import('@/components/sections/LogoBanner').then(m => m.LogoBanner))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(m => m.FAQSection))

const CH = chrome.color
const V = violet.color
const G = green.color
const bg = 'rgba(212,212,216,0.06)'
const border = 'rgba(212,212,216,0.15)'

const STEP_ICONS = [ScanSearch, Presentation, Plug, Users]
const CAS_ICONS = [MailOpen, FileText, Mic, PenLine, BookOpen, BarChart2]
const PILL_ICONS = [ScanSearch, Plug, MousePointerClick]

/**
 * Page Accompagnement IA, partagée entre le FR (/intelligence-artificielle/accompagnement-ia)
 * et l'EN (/en/artificial-intelligence/ai-adoption) par la prop `lang`, comme les composants
 * bilingues de la formation ChatGPT. Contenu et justification : ./content.ts.
 */
export function AccompagnementIaPage({ lang = 'fr' }: { lang?: Locale }) {
  const t = CONTENT[lang]
  const faq = FAQ[lang]
  const L = (p: string) => localizedPath(p, lang)
  const pagePath = L(FR_PATH)

  return (
    <main>
      <SchemaOrg
        schema={buildServiceWithLocalBusiness({
          name: t.schemaName,
          url: pagePath,
          description: t.schemaDesc,
          serviceType: t.schemaType,
          lang,
        })}
      />
      <SchemaOrg schema={buildFAQPage(faq)} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: t.breadcrumbHome, url: L('/') },
          { name: t.crumbHub, url: L('/intelligence-artificielle') },
          { name: t.crumbPage, url: pagePath },
        ])}
      />

      {/* ── Hero : texte vers 57 %, visuel à droite ── */}
      <HeroBg blob1="rgba(212,212,216,0.09)" blob2="rgba(124,58,237,0.10)" accentRgb="212,212,216">
        <section className="pt-28 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Link href={L('/intelligence-artificielle')} className="text-text-muted text-sm hover:text-text transition-colors">
                {t.crumbHub}
              </Link>
              <ChevronRight size={14} className="text-text-muted" aria-hidden="true" />
              <span className="text-sm" style={{ color: CH }}>{t.crumbPage}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-14 items-center">
              <div>
                <h1 className="grad-tag inline-block text-xs md:text-sm mb-6">{t.h1}</h1>
                <p className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-[-0.03em] leading-[1.05] text-text mb-6">
                  {t.headline[0]}<GradText as="span">{t.headline[1]}</GradText>{t.headline[2]}
                </p>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-6">{t.lead}</p>
                <HeroPills accentRgb="212, 212, 216" items={t.pills.map((label, i) => ({ label, Icon: PILL_ICONS[i] }))} />
                <div className="flex flex-wrap gap-4 items-center">
                  <LiquidMetalButton calLink="david-khazaei/planifier-un-appel" size="lg">
                    <span className="inline-flex items-center gap-2"><CalendarCheck size={16} aria-hidden="true" />{t.cta}</span>
                  </LiquidMetalButton>
                  <Link href="#methode" className="text-sm text-text-muted hover:text-text transition-colors">
                    {t.ctaSecondary} <span aria-hidden="true">↓</span>
                  </Link>
                </div>
              </div>
              <HeroVisual lang={lang} />
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Faits de l'offre ── */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((s) => (
              <SectionReveal key={s.l}>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold mb-1 text-text">{s.v}</p>
                  <p className="text-text text-sm font-semibold">{s.l}</p>
                  <p className="text-text-muted text-xs mt-0.5">{s.sub}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <LogoBanner lang={lang} />

      <ScrollSpyNav
        items={t.nav}
        cta={{ label: t.navCta, href: L('/contact') }}
        accentColor="#D4D4D8"
        accentBg="rgba(212,212,216,0.10)"
        accentBorder="rgba(212,212,216,0.20)"
      />

      {/* ── Le constat et pour qui ── */}
      <section id="pour-qui" className="py-24 bg-bg-card border-b border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <GradTag className="mb-4">{t.constatTag}</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">{t.constatTitle}</h2>
              <p className="text-text-secondary leading-relaxed mb-5">{t.constatP1}</p>
              <p className="text-text-secondary leading-relaxed">{t.constatP2}</p>
            </SectionReveal>
            <SectionReveal delay={0.12}>
              <div className="rounded-[20px] border p-8" style={{ background: bg, borderColor: border }}>
                <p className="text-text font-semibold mb-5">{t.pourQuiTitle}</p>
                <ul className="space-y-3.5">
                  {t.pourQui.map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: G }} aria-hidden="true" />
                      <span className="text-text-secondary text-sm leading-relaxed">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Méthode en 4 étapes ── */}
      <HeroBg accentRgb="212,212,216" blob1="rgba(212,212,216,0.08)" blob2="rgba(124,58,237,0.06)">
        <section id="methode" className="py-24 scroll-mt-[124px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionReveal>
              <div className="text-center mb-14 max-w-2xl mx-auto">
                <GradTag className="mb-4">{t.methodeTag}</GradTag>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">{t.methodeTitle}</h2>
                <p className="text-text-secondary mt-4 leading-relaxed">{t.methodeIntro}</p>
              </div>
            </SectionReveal>
            <div className="relative">
              <StepConnector tone="chrome" background="linear-gradient(to right, transparent, rgba(212,212,216,0.20) 5%, #c0c0c0 25%, #D4D4D8 50%, #c0c0c0 75%, rgba(212,212,216,0.20) 95%, transparent)" />
              <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.steps.map((s, i) => {
                  const Icon = STEP_ICONS[i]
                  return (
                    <SectionReveal key={s.title} delay={i * 0.1}>
                      <div className="relative flex flex-col gap-4 p-7 bg-bg rounded-[16px] border border-border h-full">
                        <span className="absolute top-4 right-5 text-3xl font-bold tracking-tight" style={{ color: 'rgba(212,212,216,0.28)' }} aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex h-12 w-12 items-center justify-center rounded-[10px]" style={{ background: bg, border: `1px solid ${border}` }}>
                          <Icon size={22} style={{ color: CH }} aria-hidden="true" />
                        </span>
                        <h3 className="text-text font-bold text-lg">{s.title}</h3>
                        <p className="text-text-secondary leading-relaxed text-sm flex-1">{s.desc}</p>
                      </div>
                    </SectionReveal>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </HeroBg>

      {/* ── Livrables mois par mois ── */}
      <Livrables lang={lang} />

      {/* ── Cas d'usage ── */}
      <section id="cas-usage" className="py-24 bg-bg-card border-y border-border scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <GradTag className="mb-4">{t.casTag}</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">{t.casTitle}</h2>
              <p className="text-text-secondary mt-4 leading-relaxed">{t.casIntro}</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.cas.map((c, i) => {
              const Icon = CAS_ICONS[i]
              return (
                <SectionReveal key={c.title} delay={i * 0.06}>
                  <div className="flex flex-col h-full rounded-[14px] border p-6" style={{ background: bg, borderColor: border }}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-[9px] mb-4" style={{ background: bg, border: `1px solid ${border}` }}>
                      <Icon size={20} style={{ color: CH }} aria-hidden="true" />
                    </span>
                    <h3 className="text-text font-bold text-base mb-2">{c.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </SectionReveal>
              )
            })}
          </div>
          <SectionReveal delay={0.2}>
            <p className="mt-10 text-center text-sm text-text-muted">
              {t.casMore}{' '}
              <Link href={L('/intelligence-artificielle/agents-ia')} className="text-text-secondary underline underline-offset-4 hover:text-text">{t.casMoreAgents}</Link>{' '}
              {t.casMoreAnd}{' '}
              <Link href={L('/intelligence-artificielle/automatisation')} className="text-text-secondary underline underline-offset-4 hover:text-text">{t.casMoreAuto}</Link>
              {/^[,.;]/.test(t.casMoreEnd) ? '' : ' '}{t.casMoreEnd}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Outils ── */}
      <section id="outils" className="py-24 scroll-mt-[124px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <div className="max-w-2xl mb-12">
              <GradTag className="mb-4">{t.outilsTag}</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">{t.outilsTitle}</h2>
              <p className="text-text-secondary mt-4 leading-relaxed">{t.outilsIntro}</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.outils.map((o, i) => (
              <SectionReveal key={o.name} delay={i * 0.08}>
                <div className="flex flex-col h-full rounded-[16px] border p-6" style={{ background: i === 2 ? 'rgba(167,139,250,0.05)' : bg, borderColor: i === 2 ? 'rgba(167,139,250,0.25)' : border }}>
                  <h3 className="text-text font-bold text-lg mb-2">{o.name}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">{o.fit}</p>
                  <p className="mt-auto text-text-muted text-xs leading-relaxed border-t border-border pt-4">{o.note}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal delay={0.2}>
            <div className="mt-6 flex items-start gap-3 rounded-[14px] border p-5" style={{ background: 'rgba(74,222,128,0.04)', borderColor: 'rgba(74,222,128,0.2)' }}>
              <Lock size={18} className="mt-0.5 flex-shrink-0" style={{ color: G }} aria-hidden="true" />
              <p className="text-sm text-text-secondary leading-relaxed">{t.outilsData}</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Qui intervient : vraie photo de session ── */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <SectionReveal>
              <figure>
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(212,212,216,0.08)' }}>
                  <Image
                    src="/images/gallery/formation-claude-ia-geneve-session-equipe-entreprise.webp"
                    alt={t.photoAlt}
                    fill
                    className="object-cover"
                    style={{ objectPosition: '50% 40%' }}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
                <figcaption className="text-text-muted text-xs mt-3">{t.photoCaption}</figcaption>
              </figure>
            </SectionReveal>
            <SectionReveal delay={0.12}>
              <GradTag className="mb-4">{t.equipeTag}</GradTag>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">{t.equipeTitle}</h2>
              <p className="text-text-secondary leading-relaxed mb-8">{t.equipeP}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.team.map((p) => (
                  <li key={p.name} className="flex items-center gap-3 rounded-[14px] border border-border bg-bg-card p-3">
                    <span className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-border">
                      <Image src={p.src} alt="" fill className="object-cover object-top" sizes="48px" />
                    </span>
                    <span>
                      <span className="block text-text font-semibold text-sm">{p.name}</span>
                      <span className="block text-text-muted text-xs">{p.role}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── FAQ (réponses GEO de 40 à 60 mots) ── */}
      <div id="faq" className="scroll-mt-[124px] border-t border-border">
        <FAQSection items={faq} title={t.faqTitle} lang={lang} />
      </div>

      {/* ── Ponts vers les offres voisines ── */}
      <section className="py-16 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionReveal>
            <p className="text-center text-text-muted text-xs font-semibold uppercase tracking-widest mb-8">{t.bridgeTitle}</p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.bridges.map((b, i) => (
              <SectionReveal key={b.href} delay={0.05 + i * 0.05}>
                <Link
                  href={L(b.href)}
                  className="group flex items-center justify-between gap-5 rounded-[14px] p-6 border transition-all hover:-translate-y-0.5 duration-200"
                  style={{ background: i === 1 ? 'rgba(255,107,0,0.06)' : i === 2 ? 'rgba(167,139,250,0.07)' : 'rgba(74,222,128,0.05)', borderColor: i === 1 ? 'rgba(255,107,0,0.22)' : i === 2 ? 'rgba(167,139,250,0.22)' : 'rgba(74,222,128,0.18)' }}
                >
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: i === 1 ? '#FF8C00' : i === 2 ? V : G }}>{b.tag}</span>
                    <span className="block text-text font-semibold">{b.title}</span>
                    <span className="block text-text-muted text-xs mt-1">{b.desc}</span>
                  </span>
                  <ChevronRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: i === 1 ? '#FF8C00' : i === 2 ? V : G }} aria-hidden="true" />
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTAFinal accentRgb="212,212,216" lang={lang} />
    </main>
  )
}
