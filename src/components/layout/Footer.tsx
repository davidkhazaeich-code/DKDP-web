import Link from 'next/link'
import Image from 'next/image'
import { Monitor, GraduationCap, Sparkles, ChevronRight, Phone, Mail, MapPin, Clock, LayoutGrid } from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    label: 'Service Digital',
    color: '#A78BFA',
    bg: 'rgba(124,58,237,0.10)',
    border: 'rgba(124,58,237,0.20)',
    Icon: Monitor,
    links: [
      { label: 'Audit site gratuit', href: '/agence-digitale/creation-site-web/audit-site' },
      { label: 'Audit SEO gratuit', href: '/agence-digitale/seo/audit-seo' },
      { label: 'Création de site web', href: '/agence-digitale/creation-site-web' },
      { label: 'Référencement SEO', href: '/agence-digitale/seo' },
      { label: 'Publicité Google Ads', href: '/agence-digitale/publicite-sea' },
      { label: 'Réseaux sociaux', href: '/agence-digitale/reseaux-sociaux' },
      { label: 'Création vidéo', href: '/agence-digitale/creation-video' },
      { label: 'Consulting marketing', href: '/agence-digitale/consulting-marketing' },
    ],
    hub: { label: 'Voir tous les services', href: '/agence-digitale' },
  },
  {
    label: 'Formation',
    color: '#FF8C00',
    bg: 'rgba(255,107,0,0.08)',
    border: 'rgba(255,107,0,0.18)',
    Icon: GraduationCap,
    links: [
      { label: 'Formation IA', href: '/formation-entreprise/ia' },
      { label: 'Bureautique & Excel', href: '/formation-entreprise/bureautique' },
      { label: 'Cybersécurité', href: '/formation-entreprise/cybersecurite' },
      { label: 'Réseaux sociaux', href: '/formation-entreprise/reseaux-sociaux' },
      { label: 'Montage vidéo', href: '/formation-entreprise/montage-video' },
      { label: 'Web design & Canva', href: '/formation-entreprise/web-design' },
      { label: 'Informatique', href: '/formation-entreprise/informatique' },
      { label: 'Pour particuliers', href: '/formation-particuliers' },
    ],
    hub: { label: 'Voir les formations', href: '/formation-entreprise' },
  },
  {
    label: 'IA',
    color: '#D4D4D8',
    bg: 'rgba(212,212,216,0.06)',
    border: 'rgba(212,212,216,0.14)',
    Icon: Sparkles,
    links: [
      { label: 'Agents IA sur mesure', href: '/intelligence-artificielle/agents-ia' },
      { label: 'Automatisation métier', href: '/intelligence-artificielle/automatisation' },
      { label: 'Audit & Conseil IA', href: '/intelligence-artificielle/audit-conseil' },
      { label: 'Mise en place IA', href: '/intelligence-artificielle/mise-en-place' },
    ],
    hub: { label: 'Voir nos solutions IA', href: '/intelligence-artificielle' },
  },
  {
    label: 'À propos',
    color: '#9CA3AF',
    bg: 'rgba(156,163,175,0.06)',
    border: 'rgba(156,163,175,0.14)',
    Icon: LayoutGrid,
    links: [
      { label: 'À propos de l\'agence', href: '/a-propos' },
      { label: 'Tarifs', href: '/tarifs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Glossaire', href: '/glossaire' },
    ],
    hub: { label: 'Contacter l\'agence', href: '/contact' },
  },
]

const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
  { label: 'RGPD & Cookies', href: '/rgpd-cookies' },
  { label: 'CGV', href: '/conditions-generales-de-vente' },
  { label: 'Plan du site', href: '/plan-du-site' },
]

const FOOTER_HEIGHT = 520

// ─── Shared inner content ─────────────────────────────────────────────────────

function FooterInner({ constrained = false }: { constrained?: boolean }) {
  const year = new Date().getFullYear()

  return (
    <footer
      className={`border-t border-border overflow-hidden relative flex flex-col${constrained ? ' h-full' : ''}`}
      style={{ background: '#0e0e0e' }}
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
      <div className="hidden lg:block relative z-10 flex-1 max-w-[1200px] w-full mx-auto px-6 pt-10 pb-0">
        <div className="grid grid-cols-[200px_1fr_1fr_1fr_1fr] gap-6 h-full">

          {/* Brand column */}
          <div className="flex flex-col pb-6">
            <Image
              src="/images/logo/dkdp_blanc-croped.png"
              alt="DKDP, Service Digital Genève"
              width={80}
              height={26}
              className="mb-4"
            />
            <p className="text-text-secondary text-sm leading-relaxed mb-5">
              Service digital à Genève.<br />
              IA · Formation · Web
            </p>
            <address className="not-italic space-y-2 flex-1">
              <p className="flex items-start gap-2 text-text-muted text-xs">
                <MapPin size={12} className="mt-0.5 flex-shrink-0 text-violet-light" />
                <span>36 Rue du 31 Décembre<br />Quartier des Eaux-Vives<br />1207 Genève, Suisse</span>
              </p>
              <p className="flex items-center gap-2 text-text-muted text-xs">
                <Clock size={12} className="flex-shrink-0 text-violet-light" />
                Lun–Ven 09:00–18:00
              </p>
              <a href="tel:+41799407969" className="flex items-center gap-2 text-text-muted hover:text-white text-xs transition-colors">
                <Phone size={12} className="flex-shrink-0 text-violet-light" />
                +41 79 940 79 69
              </a>
              <a href="mailto:dk@dkdp.ch" className="flex items-center gap-2 text-text-muted hover:text-white text-xs transition-colors">
                <Mail size={12} className="flex-shrink-0 text-violet-light" />
                dk@dkdp.ch
              </a>
            </address>
            <Link
              href="/contact"
              className="mt-auto pt-4 inline-flex items-center gap-1 text-[11.5px] font-semibold text-violet-light transition-opacity hover:opacity-70 w-fit"
            >
              Réservez un appel <ChevronRight size={11} />
            </Link>
          </div>

          {/* Pillar columns */}
          {PILLARS.map((pillar) => (
            <div key={pillar.label} className="flex flex-col pb-6">
              <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: `1px solid ${pillar.border}` }}>
                <div className="flex h-6 w-6 items-center justify-center rounded-[5px] flex-shrink-0" style={{ background: pillar.bg, border: `1px solid ${pillar.border}` }}>
                  <pillar.Icon size={12} style={{ color: pillar.color }} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: pillar.color }}>
                  {pillar.label}
                </span>
              </div>
              <ul className="space-y-2 flex-1">
                {pillar.links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-text-muted hover:text-white text-[12.5px] transition-colors duration-150 block">
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
      </div>

      {/* ── Mobile / Tablet layout (< lg) ── */}
      <div className="lg:hidden relative z-10 max-w-[1200px] w-full mx-auto px-6 pt-10 pb-6">

        {/* Brand section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 pb-8 border-b border-border">
          <div>
            <Image
              src="/images/logo/dkdp_blanc-croped.png"
              alt="DKDP, Service Digital Genève"
              width={80}
              height={26}
              className="mb-3"
            />
            <p className="text-text-secondary text-sm leading-relaxed">
              Service digital à Genève.<br />
              IA · Formation · Web
            </p>
          </div>
          <address className="not-italic space-y-2 sm:text-right">
            <p className="flex items-start gap-2 sm:justify-end text-text-muted text-xs">
              <MapPin size={12} className="mt-0.5 flex-shrink-0 text-violet-light sm:order-last sm:ml-0" />
              <span>36 Rue du 31 Décembre · Eaux-Vives · 1207 Genève</span>
            </p>
            <a href="tel:+41799407969" className="flex items-center gap-2 sm:justify-end text-text-muted hover:text-white text-xs transition-colors">
              <Phone size={12} className="flex-shrink-0 text-violet-light" />
              +41 79 940 79 69
            </a>
            <a href="mailto:dk@dkdp.ch" className="flex items-center gap-2 sm:justify-end text-text-muted hover:text-white text-xs transition-colors">
              <Mail size={12} className="flex-shrink-0 text-violet-light" />
              dk@dkdp.ch
            </a>
          </address>
        </div>

        {/* Pillars grid: 2-col on mobile, 4-col on md */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 py-8 border-b border-border">
          {PILLARS.map((pillar) => (
            <div key={pillar.label} className="flex flex-col">
              <div className="flex items-center gap-2 mb-3 pb-2.5" style={{ borderBottom: `1px solid ${pillar.border}` }}>
                <div className="flex h-5 w-5 items-center justify-center rounded-[4px] flex-shrink-0" style={{ background: pillar.bg, border: `1px solid ${pillar.border}` }}>
                  <pillar.Icon size={11} style={{ color: pillar.color }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.10em]" style={{ color: pillar.color }}>
                  {pillar.label}
                </span>
              </div>
              <ul className="space-y-2 mb-3">
                {pillar.links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-text-muted hover:text-white text-[12px] transition-colors duration-150 block leading-snug">
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
                Voir tout <ChevronRight size={10} />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-[12px] font-semibold text-violet-light transition-opacity hover:opacity-70"
          >
            Réservez un appel <ChevronRight size={12} />
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 border-t border-border" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-3 lg:h-11 lg:py-0 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0 justify-between">
          <p className="text-text-muted text-[11px]">
            © {year} dkdp.ch · Service digital Eaux-Vives, Genève · Tous droits réservés
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className="text-text-muted hover:text-white text-[11px] transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <>
      {/* Mobile + Tablet: normal auto-height footer */}
      <div className="lg:hidden">
        <FooterInner />
      </div>

      {/* Desktop: scroll-up effect with fixed height */}
      <div
        className="hidden lg:block relative"
        style={{ height: FOOTER_HEIGHT, clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
      >
        <div className="fixed bottom-0 w-full" style={{ height: FOOTER_HEIGHT }}>
          <div style={{ position: 'sticky', top: `calc(100vh - ${FOOTER_HEIGHT}px)`, height: FOOTER_HEIGHT }}>
            <FooterInner constrained />
          </div>
        </div>
      </div>
    </>
  )
}
