import Link from 'next/link'
import { Monitor, GraduationCap, Sparkles, ChevronRight, Phone, Mail, MapPin, Clock, LayoutGrid } from 'lucide-react'
import { DkdpLogo } from '@/components/ui/DkdpLogo'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localizedPath } from '@/i18n/slugs'

// ─── Data ────────────────────────────────────────────────────────────────────

type FooterDict = ReturnType<typeof getDictionary>

function getPillars(lang: Locale, dict: FooterDict) {
  const t = dict.footer
  const lp = (fr: string) => localizedPath(fr, lang)
  return [
    {
      label: t.pillars.agence,
      color: '#A78BFA',
      bg: 'rgba(124,58,237,0.10)',
      border: 'rgba(124,58,237,0.20)',
      Icon: Monitor,
      links: [
        { label: t.agenceLinks[0], href: lp('/agence-digitale/creation-site-web/audit-site') },
        { label: t.agenceLinks[1], href: lp('/agence-digitale/seo/audit-seo') },
        { label: t.agenceLinks[2], href: lp('/agence-digitale/creation-site-web') },
        { label: t.agenceLinks[3], href: lp('/agence-digitale/refonte-site-web') },
        { label: t.agenceLinks[4], href: lp('/agence-digitale/seo') },
        { label: t.agenceLinks[5], href: lp('/agence-digitale/publicite-sea') },
        { label: t.agenceLinks[6], href: lp('/agence-digitale/reseaux-sociaux') },
        { label: t.agenceLinks[7], href: lp('/agence-digitale/creation-video') },
        { label: t.agenceLinks[8], href: lp('/agence-digitale/consulting-marketing') },
        { label: t.agenceLinks[9], href: lp('/agence-digitale/creation-site-web/estimation') },
      ],
      hub: { label: dict.common.viewAllServices, href: lp('/agence-digitale') },
    },
    {
      label: t.pillars.formation,
      color: '#FF8C00',
      bg: 'rgba(255,107,0,0.08)',
      border: 'rgba(255,107,0,0.18)',
      Icon: GraduationCap,
      links: [
        { label: t.formationLinks[0], href: lp('/formation-entreprise/ia') },
        { label: t.formationLinks[1], href: lp('/formation-entreprise/claude-ai') },
        { label: t.formationLinks[2], href: lp('/formation-entreprise/canva') },
        { label: t.formationLinks[3], href: lp('/formation-entreprise/figma') },
        { label: t.formationLinks[4], href: lp('/formation-entreprise/bureautique') },
        { label: t.formationLinks[5], href: lp('/formation-entreprise/cybersecurite') },
        { label: t.formationLinks[6], href: lp('/formation-entreprise/reseaux-sociaux') },
        { label: t.formationLinks[7], href: lp('/formation-entreprise/montage-video') },
        { label: t.formationLinks[8], href: lp('/formation-entreprise/informatique') },
        { label: t.formationLinks[9], href: lp('/formation-particuliers') },
      ],
      hub: { label: dict.common.viewAllTrainings, href: lp('/formation-entreprise') },
    },
    {
      label: t.pillars.ia,
      color: 'var(--text-secondary)',
      bg: 'var(--chrome-bg)',
      border: 'var(--chrome-border)',
      Icon: Sparkles,
      links: [
        { label: t.iaLinks[0], href: lp('/intelligence-artificielle/geneve') },
        { label: t.iaLinks[1], href: lp('/intelligence-artificielle/agents-ia') },
        { label: t.iaLinks[2], href: lp('/intelligence-artificielle/chatbot-ia') },
        { label: t.iaLinks[3], href: lp('/intelligence-artificielle/automatisation') },
        { label: t.iaLinks[4], href: lp('/intelligence-artificielle/audit-conseil') },
        { label: t.iaLinks[5], href: lp('/intelligence-artificielle/mise-en-place') },
      ],
      hub: { label: dict.common.viewAllAi, href: lp('/intelligence-artificielle') },
    },
    {
      label: t.pillars.apropos,
      color: 'var(--text-secondary)',
      bg: 'var(--gray-bg)',
      border: 'var(--gray-border)',
      Icon: LayoutGrid,
      links: [
        { label: t.aproposLinks[0], href: lp('/a-propos') },
        { label: t.aproposLinks[1], href: lp('/tarifs') },
        { label: t.aproposLinks[2], href: lp('/blog') },
        { label: t.aproposLinks[3], href: lp('/glossaire') },
      ],
      hub: { label: dict.common.contactAgency, href: lp('/contact') },
    },
  ]
}

function getLegalLinks(lang: Locale, dict: FooterDict) {
  const lp = (fr: string) => localizedPath(fr, lang)
  return [
    { label: dict.footer.legalLinks[0], href: lp('/mentions-legales') },
    { label: dict.footer.legalLinks[1], href: lp('/politique-de-confidentialite') },
    { label: dict.footer.legalLinks[2], href: lp('/agence-digitale/rgpd-cookies') },
    { label: dict.footer.legalLinks[3], href: lp('/conditions-generales-de-vente') },
    { label: dict.footer.legalLinks[4], href: lp('/plan-du-site') },
  ]
}

// Villes : FR et EN ont chacune leurs pages. Label localise (Genève/Geneva, Neuchâtel/Neuchatel).
const CITY_DATA = [
  { fr: '/agence-digitale/geneve', labelFr: 'Genève', labelEn: 'Geneva' },
  { fr: '/agence-digitale/lausanne', labelFr: 'Lausanne', labelEn: 'Lausanne' },
  { fr: '/agence-digitale/nyon', labelFr: 'Nyon', labelEn: 'Nyon' },
  { fr: '/agence-digitale/fribourg', labelFr: 'Fribourg', labelEn: 'Fribourg' },
  { fr: '/agence-digitale/sion', labelFr: 'Sion', labelEn: 'Sion' },
  { fr: '/agence-digitale/neuchatel', labelFr: 'Neuchâtel', labelEn: 'Neuchatel' },
  { fr: '/agence-digitale/morges', labelFr: 'Morges', labelEn: 'Morges' },
  { fr: '/agence-digitale/montreux', labelFr: 'Montreux', labelEn: 'Montreux' },
]

function getCityLinks(lang: Locale) {
  return CITY_DATA.map((c) => ({
    label: lang === 'en' ? c.labelEn : c.labelFr,
    href: localizedPath(c.fr, lang),
  }))
}

const FOOTER_HEIGHT = 540

// ─── Shared inner content ─────────────────────────────────────────────────────

function FooterInner({
  lang,
  dict,
  constrained = false,
  variant = 'all',
}: {
  lang: Locale
  dict: FooterDict
  constrained?: boolean
  variant?: 'mobile' | 'desktop' | 'all'
}) {
  const year = new Date().getFullYear()
  const showDesktop = variant === 'desktop' || variant === 'all'
  const showMobile = variant === 'mobile' || variant === 'all'
  const pillars = getPillars(lang, dict)
  const legalLinks = getLegalLinks(lang, dict)
  const cityLinks = getCityLinks(lang)
  const t = dict.common
  const copyrightText = t.copyright.replace('{year}', String(year))
  const logoAlt = lang === 'en' ? 'DKDP, digital agency in Geneva' : 'DKDP, Service Digital Genève'
  const ariaCitiesLabel = lang === 'en' ? 'Cities we serve' : 'Villes desservies'

  return (
    <footer
      className={`border-t border-border overflow-hidden relative flex flex-col${constrained ? ' h-full' : ''}`}
      style={{ background: 'var(--bg-card)' }}
    >
      {/* Subtle background blobs */}
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)' }}
      />

      {/* ── Desktop layout (lg+) ── */}
      {showDesktop && <div className="hidden lg:block relative z-10 flex-1 max-w-[1200px] w-full mx-auto px-6 pt-10 pb-0">
        <div className="grid grid-cols-[200px_1fr_1fr_1fr_1fr] gap-6 h-full">

          {/* Brand column */}
          <div className="flex flex-col pb-6">
            <DkdpLogo
              alt={logoAlt}
              width={80}
              height={14}
              className="h-auto mb-4"
            />
            <p className="text-text-secondary text-sm leading-relaxed mb-5">
              {t.agencyTagline}
            </p>
            <address className="not-italic space-y-2 flex-1">
              <a href="https://www.google.com/maps/dir/?api=1&destination=DKDP+Service+Digital,36+Rue+du+31+D%C3%A9cembre,1207+Gen%C3%A8ve" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-text-muted hover:text-text text-xs transition-colors">
                <MapPin size={12} className="mt-0.5 flex-shrink-0 text-violet-light" />
                <span>{t.address}<br />{t.neighborhood}<br />{t.city}</span>
              </a>
              <p className="flex items-center gap-2 text-text-muted text-xs">
                <Clock size={12} className="flex-shrink-0 text-violet-light" />
                {t.openingHours}
              </p>
              <a href="tel:+41799407969" className="flex items-center gap-2 text-text-muted hover:text-text text-xs transition-colors">
                <Phone size={12} className="flex-shrink-0 text-violet-light" />
                {t.phone}
              </a>
              <a href="mailto:dk@dkdp.ch" className="flex items-center gap-2 text-text-muted hover:text-text text-xs transition-colors">
                <Mail size={12} className="flex-shrink-0 text-violet-light" />
                {t.email}
              </a>
            </address>
            <Link
              href={localizedPath('/contact', lang)}
              className="mt-auto pt-4 inline-flex items-center gap-1 text-[11.5px] font-semibold text-violet-light transition-opacity hover:opacity-70 w-fit"
            >
              {t.bookCall} <ChevronRight size={11} />
            </Link>
            {/* Language switcher (desktop brand column) */}
            <div className="mt-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted mb-1.5">
                {lang === 'en' ? 'Language' : 'Langue'}
              </p>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Pillar columns */}
          {pillars.map((pillar) => (
            <div key={pillar.label} className="flex flex-col pb-6">
              <Link href={pillar.hub.href} className="flex items-center gap-2 mb-4 pb-3 hover:opacity-75 transition-opacity" style={{ borderBottom: `1px solid ${pillar.border}` }}>
                <div className="flex h-6 w-6 items-center justify-center rounded-[5px] flex-shrink-0" style={{ background: pillar.bg, border: `1px solid ${pillar.border}` }}>
                  <pillar.Icon size={12} style={{ color: pillar.color }} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: pillar.color }}>
                  {pillar.label}
                </span>
              </Link>
              <ul className="space-y-2 flex-1">
                {pillar.links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-text-muted hover:text-text text-[12.5px] transition-colors duration-150 block">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={pillar.hub.href}
                className="mt-auto pt-4 inline-flex items-center gap-1 text-[11.5px] font-semibold transition-opacity hover:opacity-70"
                style={{ color: pillar.color }}
              >
                {pillar.hub.label} <ChevronRight size={11} />
              </Link>
            </div>
          ))}
        </div>
      </div>}

      {/* ── Mobile / Tablet layout (< lg) ── */}
      {showMobile && <div className="lg:hidden relative z-10 max-w-[1200px] w-full mx-auto px-6 pt-10 pb-6">

        {/* Brand section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 pb-8 border-b border-border">
          <div>
            <DkdpLogo
              alt={logoAlt}
              width={80}
              height={14}
              className="h-auto mb-3"
            />
            <p className="text-text-secondary text-sm leading-relaxed">
              {t.agencyTagline}
            </p>
          </div>
          <address className="not-italic space-y-2 sm:text-right">
            <a href="https://www.google.com/maps/dir/?api=1&destination=DKDP+Service+Digital,36+Rue+du+31+D%C3%A9cembre,1207+Gen%C3%A8ve" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 sm:justify-end text-text-muted hover:text-text text-xs transition-colors">
              <MapPin size={12} className="mt-0.5 flex-shrink-0 text-violet-light sm:order-last sm:ml-0" />
              <span>{t.address} · {t.neighborhood.replace(/Quartier des |District/g, '').trim()} · {t.city.replace(', Suisse', '').replace(', Switzerland', '')}</span>
            </a>
            <a href="tel:+41799407969" className="flex items-center gap-2 sm:justify-end text-text-muted hover:text-text text-xs transition-colors">
              <Phone size={12} className="flex-shrink-0 text-violet-light" />
              {t.phone}
            </a>
            <a href="mailto:dk@dkdp.ch" className="flex items-center gap-2 sm:justify-end text-text-muted hover:text-text text-xs transition-colors">
              <Mail size={12} className="flex-shrink-0 text-violet-light" />
              {t.email}
            </a>
          </address>
        </div>

        {/* Pillars grid: 2-col on mobile, 4-col on md */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 py-8 border-b border-border">
          {pillars.map((pillar) => (
            <div key={pillar.label} className="flex flex-col">
              <Link href={pillar.hub.href} className="flex items-center gap-2 mb-3 pb-2.5 hover:opacity-75 transition-opacity" style={{ borderBottom: `1px solid ${pillar.border}` }}>
                <div className="flex h-5 w-5 items-center justify-center rounded-[4px] flex-shrink-0" style={{ background: pillar.bg, border: `1px solid ${pillar.border}` }}>
                  <pillar.Icon size={11} style={{ color: pillar.color }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.10em]" style={{ color: pillar.color }}>
                  {pillar.label}
                </span>
              </Link>
              <ul className="space-y-2 mb-3">
                {pillar.links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-text-muted hover:text-text text-[12px] transition-colors duration-150 block leading-snug">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={pillar.hub.href}
                className="inline-flex items-center gap-1 text-[11px] font-semibold transition-opacity hover:opacity-70 mt-auto"
                style={{ color: pillar.color }}
              >
                {dict.common.seeAll} <ChevronRight size={10} />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA + Language switcher mobile */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={localizedPath('/contact', lang)}
            className="inline-flex items-center gap-1 text-[12px] font-semibold text-violet-light transition-opacity hover:opacity-70"
          >
            {t.bookCall} <ChevronRight size={12} />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
              {lang === 'en' ? 'Language' : 'Langue'}
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>}

      {/* ── City links ── (FR uniquement, pas de version EN des pages villes) */}
      <div className="relative z-10 border-t border-border" aria-label={ariaCitiesLabel}>
        <div className="max-w-[1200px] mx-auto px-6 py-3">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span className="text-text-muted text-[11px] mr-1">{t.locations}</span>
            {cityLinks.map(({ label, href }, i) => (
              <span key={href} className="inline-flex items-center">
                <Link href={href} className="text-text-muted hover:text-text text-[11px] transition-colors">
                  {label}
                </Link>
                {i < cityLinks.length - 1 && <span className="text-text-muted text-[11px] ml-1.5">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 border-t border-border" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-3 lg:h-11 lg:py-0 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0 justify-between">
          <p className="text-text-muted text-[11px]">
            {copyrightText}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {legalLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="text-text-muted hover:text-text text-[11px] transition-colors">
                {label}
              </Link>
            ))}
            <span className="hidden lg:inline-block w-px h-4 bg-border" aria-hidden="true" />
            <LanguageSwitcher placement="top" />
          </div>
        </div>
      </div>

    </footer>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function Footer({ lang = 'fr' }: { lang?: Locale } = {}) {
  const dict = getDictionary(lang)
  return (
    <>
      {/* Mobile + Tablet: normal auto-height footer (only mobile content rendered) */}
      <div className="lg:hidden">
        <FooterInner lang={lang} dict={dict} variant="mobile" />
      </div>

      {/* Desktop: scroll-up effect with fixed height (only desktop content rendered) */}
      <div
        className="hidden lg:block relative"
        style={{ height: FOOTER_HEIGHT, clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
      >
        <div className="fixed bottom-0 w-full" style={{ height: FOOTER_HEIGHT }}>
          <div style={{ position: 'sticky', top: `calc(100vh - ${FOOTER_HEIGHT}px)`, height: FOOTER_HEIGHT }}>
            <FooterInner lang={lang} dict={dict} constrained variant="desktop" />
          </div>
        </div>
      </div>
    </>
  )
}
