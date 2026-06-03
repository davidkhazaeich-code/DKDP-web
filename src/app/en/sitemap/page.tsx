import type { Metadata } from 'next'
import Link from 'next/link'
import { GradTag } from '@/components/ui/GradTag'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata: Metadata = buildServiceMetadata({
  title: 'Sitemap · DKDP',
  description:
    'Complete sitemap of the English version of dkdp.ch. Digital agency, AI, training, pricing, contact and legal pages.',
  enPath: '/en/sitemap',
  frPath: '/plan-du-site',
})

const SECTIONS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Main',
    links: [
      { label: 'Home', href: '/en' },
      { label: 'About', href: '/en/about' },
      { label: 'Pricing', href: '/en/pricing' },
      { label: 'Contact', href: '/en/contact' },
    ],
  },
  {
    title: 'Digital agency',
    links: [
      { label: 'Hub', href: '/en/digital-agency' },
      { label: 'Web design', href: '/en/digital-agency/web-design' },
      { label: 'Website redesign', href: '/en/digital-agency/website-redesign' },
      { label: 'App development', href: '/en/digital-agency/app-development' },
      { label: 'SEO', href: '/en/digital-agency/seo' },
      { label: 'Google Ads', href: '/en/digital-agency/google-ads' },
      { label: 'Social media', href: '/en/digital-agency/social-media' },
      { label: 'Video production', href: '/en/digital-agency/video-production' },
      { label: 'Marketing consulting', href: '/en/digital-agency/marketing-consulting' },
      { label: 'GDPR & cookies', href: '/en/digital-agency/gdpr-cookies' },
      { label: 'Free SEO audit', href: '/en/digital-agency/seo/seo-audit' },
      { label: 'Free site audit', href: '/en/digital-agency/web-design/site-audit' },
      { label: 'Free quote', href: '/en/digital-agency/web-design/quote' },
    ],
  },
  {
    title: 'Artificial intelligence',
    links: [
      { label: 'Hub', href: '/en/artificial-intelligence' },
      { label: 'Custom AI agents', href: '/en/artificial-intelligence/ai-agents' },
      { label: 'Business automation', href: '/en/artificial-intelligence/automation' },
      { label: 'AI audit & consulting', href: '/en/artificial-intelligence/audit-consulting' },
      { label: 'AI implementation', href: '/en/artificial-intelligence/implementation' },
      { label: 'AI chatbot', href: '/en/artificial-intelligence/ai-chatbot' },
    ],
  },
  {
    title: 'Corporate training',
    links: [
      { label: 'Hub', href: '/en/corporate-training' },
      { label: 'AI training', href: '/en/corporate-training/ai' },
      { label: 'Claude training', href: '/en/corporate-training/claude-ai' },
      { label: 'Office tools', href: '/en/corporate-training/office-tools' },
      { label: 'Social media', href: '/en/corporate-training/social-media' },
      { label: 'Cybersecurity', href: '/en/corporate-training/cybersecurity' },
      { label: 'Canva', href: '/en/corporate-training/canva' },
      { label: 'Web design with Figma', href: '/en/corporate-training/web-design' },
      { label: 'IT skills', href: '/en/corporate-training/it-skills' },
      { label: 'Video editing', href: '/en/corporate-training/video-editing' },
      { label: 'Individual training', href: '/en/individual-training' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Legal notice', href: '/en/legal-notice' },
      { label: 'Privacy policy', href: '/en/privacy-policy' },
      { label: 'Terms of service', href: '/en/terms-of-service' },
      { label: 'GDPR & cookies', href: '/en/digital-agency/gdpr-cookies' },
    ],
  },
]

export default function Page() {
  return (
    <main className="pt-28 sm:pt-36 pb-20 sm:pb-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <GradTag>Sitemap</GradTag>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mt-3 mb-5">Sitemap</h1>
        <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-10 max-w-[700px]">
          Every English page available on dkdp.ch. The French version is at{' '}
          <Link href="/plan-du-site" className="underline hover:no-underline">/plan-du-site</Link>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-text-secondary hover:text-text text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
