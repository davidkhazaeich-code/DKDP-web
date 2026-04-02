import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { ARTICLES } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'Plan du site · DKDP Genève',
  description:
    'Plan du site DKDP : retrouvez toutes les pages de notre agence digitale à Genève - services, formations, IA, blog et ressources.',
  alternates: { canonical: 'https://dkdp.ch/plan-du-site' },
}

const violet   = '#A78BFA'
const violetBg = 'rgba(124,58,237,0.06)'
const violetBd = 'rgba(124,58,237,0.16)'
const orange   = '#FF8C00'
const orangeBg = 'rgba(255,107,0,0.06)'
const orangeBd = 'rgba(255,107,0,0.16)'
const chrome   = '#D4D4D8'
const chromeBg = 'rgba(212,212,216,0.04)'
const chromeBd = 'rgba(212,212,216,0.12)'
const green    = '#4ade80'
const greenBg  = 'rgba(74,222,128,0.06)'
const greenBd  = 'rgba(74,222,128,0.16)'

interface SitemapGroup {
  label: string
  color: string
  bg: string
  border: string
  links: { label: string; href: string }[]
}

const GROUPS: SitemapGroup[] = [
  {
    label: 'Service Digital',
    color: violet,
    bg: violetBg,
    border: violetBd,
    links: [
      { label: 'Agence digitale : vue d\'ensemble', href: '/agence-digitale' },
      { label: 'Création de site web', href: '/agence-digitale/creation-site-web' },
      { label: 'Audit de site gratuit', href: '/agence-digitale/creation-site-web/audit-site' },
      { label: 'Référencement SEO', href: '/agence-digitale/seo' },
      { label: 'Audit SEO gratuit', href: '/agence-digitale/seo/audit-seo' },
      { label: 'Publicité Google Ads', href: '/agence-digitale/publicite-sea' },
      { label: 'Réseaux sociaux', href: '/agence-digitale/reseaux-sociaux' },
      { label: 'Création vidéo', href: '/agence-digitale/creation-video' },
      { label: 'Consulting marketing', href: '/agence-digitale/consulting-marketing' },
      { label: 'RGPD & Cookies', href: '/agence-digitale/rgpd-cookies' },
    ],
  },
  {
    label: 'Intelligence Artificielle',
    color: chrome,
    bg: chromeBg,
    border: chromeBd,
    links: [
      { label: 'Intelligence artificielle : vue d\'ensemble', href: '/intelligence-artificielle' },
      { label: 'Audit & Conseil IA', href: '/intelligence-artificielle/audit-conseil' },
      { label: 'Agents IA sur mesure', href: '/intelligence-artificielle/agents-ia' },
      { label: 'Automatisation métier', href: '/intelligence-artificielle/automatisation' },
      { label: 'Mise en place IA', href: '/intelligence-artificielle/mise-en-place' },
    ],
  },
  {
    label: 'Formation Entreprise',
    color: orange,
    bg: orangeBg,
    border: orangeBd,
    links: [
      { label: 'Formation entreprise : vue d\'ensemble', href: '/formation-entreprise' },
      { label: 'Formation IA', href: '/formation-entreprise/ia' },
      { label: 'Cybersécurité', href: '/formation-entreprise/cybersecurite' },
      { label: 'Bureautique & Excel', href: '/formation-entreprise/bureautique' },
      { label: 'Réseaux sociaux', href: '/formation-entreprise/reseaux-sociaux' },
      { label: 'Web design', href: '/formation-entreprise/web-design' },
      { label: 'Montage vidéo', href: '/formation-entreprise/montage-video' },
      { label: 'Informatique', href: '/formation-entreprise/informatique' },
      { label: 'Formation pour particuliers', href: '/formation-particuliers' },
    ],
  },
  {
    label: 'À propos & ressources',
    color: green,
    bg: greenBg,
    border: greenBd,
    links: [
      { label: 'À propos de l\'agence', href: '/a-propos' },
      { label: 'Réalisations', href: '/realisations' },
      { label: 'Tarifs', href: '/tarifs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Glossaire', href: '/glossaire' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
  { label: 'RGPD & Cookies', href: '/rgpd-cookies' },
  { label: 'Conditions générales de vente', href: '/conditions-generales-de-vente' },
  { label: 'Plan du site', href: '/plan-du-site' },
]

export default function PlanDuSitePage() {
  return (
    <main className="pt-14">
      <section className="py-24">
        <div className="max-w-[1000px] mx-auto px-6">

          <SectionReveal>
            <GradTag className="mb-6">Navigation</GradTag>
            <h1 className="text-4xl font-bold tracking-[-0.02em] mb-4">Plan du site</h1>
            <p className="text-text-secondary leading-relaxed mb-16 max-w-xl">
              Retrouvez toutes les pages du site DKDP organisées par rubrique.
            </p>
          </SectionReveal>

          {/* Main groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {GROUPS.map((group, i) => (
              <SectionReveal key={group.label} delay={i * 0.06}>
                <div
                  className="rounded-[16px] border p-7 h-full"
                  style={{ background: group.bg, borderColor: group.border }}
                >
                  <h2
                    className="text-sm font-bold uppercase tracking-widest mb-5"
                    style={{ color: group.color }}
                  >
                    {group.label}
                  </h2>
                  <ul className="space-y-2.5">
                    {group.links.map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="flex items-center gap-2 text-text-secondary hover:text-white text-sm transition-colors duration-150 group"
                        >
                          <span
                            className="w-1 h-1 rounded-full shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{ background: group.color }}
                          />
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Blog articles */}
          <SectionReveal delay={0.28}>
            <div
              className="rounded-[16px] border p-7 mb-6"
              style={{ background: violetBg, borderColor: violetBd }}
            >
              <h2
                className="text-sm font-bold uppercase tracking-widest mb-5"
                style={{ color: violet }}
              >
                Articles de blog
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {ARTICLES.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="flex items-start gap-2 text-text-secondary hover:text-white text-sm transition-colors duration-150 group"
                    >
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ background: violet }}
                      />
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          {/* Legal */}
          <SectionReveal delay={0.34}>
            <div
              className="rounded-[16px] border p-7"
              style={{ background: chromeBg, borderColor: chromeBd }}
            >
              <h2
                className="text-sm font-bold uppercase tracking-widest mb-5"
                style={{ color: chrome }}
              >
                Pages légales
              </h2>
              <ul className="space-y-2.5">
                {LEGAL_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center gap-2 text-text-secondary hover:text-white text-sm transition-colors duration-150 group"
                    >
                      <span
                        className="w-1 h-1 rounded-full shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ background: chrome }}
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

        </div>
      </section>
    </main>
  )
}
