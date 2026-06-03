import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildOrganization } from '@/lib/schema'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata: Metadata = buildServiceMetadata({
  title: 'Legal Notice · DKDP Digital Agency Geneva',
  description:
    'Legal notice for DKDP, a digital agency based in Geneva, Switzerland. Publisher, hosting, intellectual property, liability and applicable law.',
  enPath: '/en/legal-notice',
  frPath: '/mentions-legales',
  noIndex: true,
})

const SECTIONS: { title: string; text?: string; items?: { label: string; value: string }[] }[] = [
  {
    title: 'Publisher',
    items: [
      { label: 'Company name', value: 'DKDP' },
      { label: 'Director of publication', value: 'David Khazaei' },
      { label: 'Address', value: '36 Rue du 31 Décembre, Eaux-Vives district, 1207 Geneva, Switzerland' },
      { label: 'Email', value: 'dk@dkdp.ch' },
      { label: 'Phone', value: '+41 79 940 79 69' },
      { label: 'Website', value: 'https://dkdp.ch' },
    ],
  },
  {
    title: 'Editorial responsibility',
    text:
      'David Khazaei, founder of DKDP, holds editorial responsibility for the content published on dkdp.ch.',
  },
  {
    title: 'Hosting',
    items: [
      { label: 'Host', value: 'Vercel Inc.' },
      { label: 'Address', value: '340 S Lemon Ave #4133, Walnut, CA 91789, United States' },
      { label: 'Website', value: 'vercel.com' },
    ],
  },
  {
    title: 'Intellectual property',
    text:
      'All content on this website (texts, images, graphics, logos, icons, sounds, software) is the exclusive property of DKDP, except for brands, logos or content belonging to partner companies or authors. Any reproduction, distribution, modification, adaptation, retransmission or publication, even partial, of these elements is strictly forbidden without the prior written consent of DKDP.',
  },
  {
    title: 'Limitation of liability',
    text:
      'DKDP makes its best efforts to ensure the accuracy and freshness of the information published on this site. However, DKDP does not guarantee the accuracy, precision or exhaustiveness of the information available. DKDP disclaims any liability for direct or indirect damage resulting from access to this site or use of the information and content found therein.',
  },
  {
    title: 'Hyperlinks',
    text:
      'The dkdp.ch website may contain hyperlinks to third-party websites. DKDP cannot review the content of the sites thus visited and shall accept no liability for such content.',
  },
  {
    title: 'Applicable law and jurisdiction',
    text:
      'This website is subject to Swiss law. In case of dispute and failing an amicable agreement, the courts of the canton of Geneva have exclusive jurisdiction. For any binding legal interpretation, the French version prevails.',
  },
]

export default function Page() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildOrganization('en')} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'Legal notice', url: '/en/legal-notice' },
        ])}
      />
      <section className="py-24">
        <div className="max-w-[800px] mx-auto px-6">
          <GradTag className="mb-6">Legal</GradTag>
          <h1 className="text-4xl font-bold tracking-[-0.02em] mb-4">Legal notice</h1>
          <p className="text-text-secondary leading-relaxed mb-16 max-w-lg">
            In compliance with current legal obligations, this page sets out the legal information related to dkdp.ch.
            For any binding legal interpretation, the{' '}
            <Link href="/mentions-legales" className="underline hover:no-underline">
              French version
            </Link>{' '}
            prevails.
          </p>

          <div className="space-y-6">
            {SECTIONS.map((section) => (
              <div
                key={section.title}
                className="rounded-[16px] p-7 border"
                style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}
              >
                <h2 className="font-bold text-lg mb-5" style={{ color: 'var(--text)' }}>
                  {section.title}
                </h2>
                {section.items && (
                  <div className="space-y-2.5">
                    {section.items.map((item) => (
                      <div key={item.label} className="grid grid-cols-[160px_1fr] gap-4">
                        <span className="text-text-muted text-sm">{item.label}</span>
                        <span className="text-text-secondary text-sm">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {section.text && (
                  <p className="text-text-secondary text-sm leading-relaxed">{section.text}</p>
                )}
              </div>
            ))}
          </div>

          <p className="text-text-muted text-xs text-center mt-12">Last updated: April 2026</p>

          <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-4 text-sm">
            <Link href="/en/privacy-policy" className="inline-flex items-center gap-1 text-text-secondary hover:text-text">
              Privacy policy <ArrowRight size={13} />
            </Link>
            <Link href="/en/terms-of-service" className="inline-flex items-center gap-1 text-text-secondary hover:text-text">
              Terms of service <ArrowRight size={13} />
            </Link>
            <Link href="/en/digital-agency/gdpr-cookies" className="inline-flex items-center gap-1 text-text-secondary hover:text-text">
              GDPR and cookies <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
