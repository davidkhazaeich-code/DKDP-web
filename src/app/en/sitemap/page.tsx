import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GradTag } from '@/components/ui/GradTag'
import { ARTICLES } from '@/lib/blog'
import { localizedPath } from '@/i18n/slugs'

export const metadata: Metadata = {
  title: 'Sitemap · DKDP Geneva',
  description:
    'DKDP sitemap: find every page of our Geneva digital agency, services, training, AI, blog and resources.',
  alternates: {
    canonical: 'https://dkdp.ch/en/sitemap',
    languages: {
      'fr-CH': 'https://dkdp.ch/plan-du-site',
      en: 'https://dkdp.ch/en/sitemap',
      'x-default': 'https://dkdp.ch/plan-du-site',
    },
  },
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

const lp = (fr: string) => localizedPath(fr, 'en')

interface SitemapGroup {
  label: string
  color: string
  bg: string
  border: string
  links: { label: string; href: string }[]
}

const GROUPS: SitemapGroup[] = [
  {
    label: 'Digital Services',
    color: violet,
    bg: violetBg,
    border: violetBd,
    links: [
      { label: 'Digital agency: overview', href: lp('/agence-digitale') },
      { label: 'Website creation', href: lp('/agence-digitale/creation-site-web') },
      { label: 'Free site audit', href: lp('/agence-digitale/creation-site-web/audit-site') },
      { label: 'SEO', href: lp('/agence-digitale/seo') },
      { label: 'Free SEO audit', href: lp('/agence-digitale/seo/audit-seo') },
      { label: 'Google Ads', href: lp('/agence-digitale/publicite-sea') },
      { label: 'Social media', href: lp('/agence-digitale/reseaux-sociaux') },
      { label: 'Video production', href: lp('/agence-digitale/creation-video') },
      { label: 'Marketing consulting', href: lp('/agence-digitale/consulting-marketing') },
      { label: 'GDPR & Cookies', href: lp('/agence-digitale/rgpd-cookies') },
    ],
  },
  {
    label: 'Artificial Intelligence',
    color: chrome,
    bg: chromeBg,
    border: chromeBd,
    links: [
      { label: 'Artificial intelligence: overview', href: lp('/intelligence-artificielle') },
      { label: 'AI audit & consulting', href: lp('/intelligence-artificielle/audit-conseil') },
      { label: 'Custom AI agents', href: lp('/intelligence-artificielle/agents-ia') },
      { label: 'Business automation', href: lp('/intelligence-artificielle/automatisation') },
      { label: 'AI implementation', href: lp('/intelligence-artificielle/mise-en-place') },
    ],
  },
  {
    label: 'Corporate Training',
    color: orange,
    bg: orangeBg,
    border: orangeBd,
    links: [
      { label: 'Corporate training: overview', href: lp('/formation-entreprise') },
      { label: 'AI training', href: lp('/formation-entreprise/ia') },
      { label: 'Cybersecurity', href: lp('/formation-entreprise/cybersecurite') },
      { label: 'Office & Excel', href: lp('/formation-entreprise/bureautique') },
      { label: 'Social media', href: lp('/formation-entreprise/reseaux-sociaux') },
      { label: 'Canva training', href: lp('/formation-entreprise/canva') },
      { label: 'Figma training', href: lp('/formation-entreprise/figma') },
      { label: 'Video editing', href: lp('/formation-entreprise/montage-video') },
      { label: 'IT skills', href: lp('/formation-entreprise/informatique') },
      { label: 'Individual training', href: lp('/formation-particuliers') },
    ],
  },
  {
    label: 'About & resources',
    color: green,
    bg: greenBg,
    border: greenBd,
    links: [
      { label: 'About the agency', href: lp('/a-propos') },
      { label: 'Pricing', href: lp('/tarifs') },
      { label: 'Blog', href: lp('/blog') },
      { label: 'Glossary', href: lp('/glossaire') },
      { label: 'Contact', href: lp('/contact') },
    ],
  },
]

const LEGAL_LINKS = [
  { label: 'Legal notice', href: lp('/mentions-legales') },
  { label: 'Privacy policy', href: lp('/politique-de-confidentialite') },
  { label: 'GDPR & Cookies', href: lp('/agence-digitale/rgpd-cookies') },
  { label: 'Terms of service', href: lp('/conditions-generales-de-vente') },
  { label: 'Sitemap', href: lp('/plan-du-site') },
]

export default function SitemapPageEN() {
  return (
    <main className="pt-14">
      <section className="py-24">
        <div className="max-w-[1000px] mx-auto px-6">

          <SectionReveal>
            <GradTag className="mb-6">Navigation</GradTag>
            <h1 className="text-4xl font-bold tracking-[-0.02em] mb-4">Sitemap</h1>
            <p className="text-text-secondary leading-relaxed mb-16 max-w-xl">
              Find all the pages of the DKDP site organised by section.
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
                          className="flex items-center gap-2 text-text-secondary hover:text-text text-sm transition-colors duration-150 group"
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

          {/* Blog articles (content remains in French) */}
          <SectionReveal delay={0.28}>
            <div
              className="rounded-[16px] border p-7 mb-6"
              style={{ background: violetBg, borderColor: violetBd }}
            >
              <h2
                className="text-sm font-bold uppercase tracking-widest mb-5"
                style={{ color: violet }}
              >
                Blog articles
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {ARTICLES.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="flex items-start gap-2 text-text-secondary hover:text-text text-sm transition-colors duration-150 group"
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
                Legal pages
              </h2>
              <ul className="space-y-2.5">
                {LEGAL_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center gap-2 text-text-secondary hover:text-text text-sm transition-colors duration-150 group"
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
