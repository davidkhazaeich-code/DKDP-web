import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildOrganization } from '@/lib/schema'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata: Metadata = buildServiceMetadata({
  title: 'Terms of Service · DKDP Digital Agency Geneva',
  description:
    'Terms of service for engagements with DKDP, a Geneva-based digital agency. Quotes, deliverables, payment terms, intellectual property, governing law. English summary of the binding French version.',
  enPath: '/en/terms-of-service',
  frPath: '/conditions-generales-de-vente',
  noIndex: true,
})

const SECTIONS: { title: string; text?: string; items?: { label: string; value: string }[] }[] = [
  {
    title: 'Article 1 — Scope',
    text:
      'These General Terms and Conditions of Sale (the "Terms") govern all services provided by DKDP (the "Provider"), with its registered office at 36 Rue du 31 Décembre, 1207 Geneva, Switzerland, to its corporate and individual clients (the "Client"). Any order implies full acceptance of the Terms. In case of conflict with any other document, these Terms prevail.',
  },
  {
    title: 'Article 2 — Quotes and orders',
    text:
      'Every engagement is documented in a written quote remitted to the Client, valid for 30 days from its date of issuance. The quote is considered accepted upon receipt of a signed purchase order or any written confirmation by the Client (including email). Any change in scope after acceptance requires a written amendment signed by both parties.',
  },
  {
    title: 'Article 3 — Prices and payment terms',
    items: [
      { label: 'Currency', value: 'All prices are stated in Swiss francs (CHF), excluding VAT where applicable (Swiss VAT 8.1%).' },
      { label: 'Deposit', value: '50% of the total fee due upon signature of the quote, balance on delivery.' },
      { label: 'Payment terms', value: '30 days net from the invoice date.' },
      { label: 'Late payment', value: 'Default interest of 5% per annum applies automatically without prior notice (Swiss Code of Obligations, art. 104).' },
      { label: 'Payment methods', value: 'Bank transfer or any other method accepted by the Provider.' },
    ],
  },
  {
    title: 'Article 4 — Delivery timelines',
    text:
      'Timelines quoted are indicative and start from receipt of the deposit and of all materials necessary to begin work. Any delay caused by the Client (late delivery of content, approvals or feedback) automatically extends the timeline without penalty for the Provider.',
  },
  {
    title: 'Article 5 — Client obligations',
    text:
      'The Client commits to providing, within the agreed timelines, all information, content, accesses and approvals required for the proper execution of the engagement. The Client warrants that they hold the intellectual property rights on all materials transmitted to the Provider (texts, images, logos, data). The Client is solely responsible for the compliance of their activities and content with applicable laws.',
  },
  {
    title: 'Article 6 — Intellectual property',
    text:
      'Deliverables produced for the engagement (websites, visuals, content, source code) become the property of the Client upon full payment of all sums due. Until full payment, the Provider retains all intellectual property rights on the work performed. The tools, methods, frameworks and know-how owned by the Provider and used for the engagement remain its exclusive property in all cases. The Provider reserves the right to reference the engagement as a commercial reference unless explicitly forbidden in writing by the Client.',
  },
  {
    title: 'Article 7 — Confidentiality',
    text:
      'The Provider commits to maintaining the strict confidentiality of any information of confidential nature shared by the Client in the context of the engagement. This confidentiality obligation remains in force for a period of 3 years after the end of the engagement. It does not apply to information publicly available or previously known to the Provider.',
  },
  {
    title: 'Article 8 — Limitation of liability',
    text:
      'The Provider\'s liability is limited to direct and foreseeable damages caused by proven fault in the execution of the engagement, capped at the total amount of the engagement concerned. The Provider shall not be held liable for indirect damages, loss of business, loss of data, loss of revenue, or consequences of inadequate use of the deliverables by the Client. The Provider does not guarantee organic search (SEO) results, paid advertising (SEA) results, or marketing campaign outcomes, which depend on factors outside its control.',
  },
  {
    title: 'Article 9 — Termination',
    text:
      'In case of termination by the Client after acceptance of the quote, the deposit paid is retained by the Provider as lump-sum compensation. Work performed up to the date of termination is invoiced pro-rata to the time spent, at the agreed day rate. The Provider may terminate the engagement in case of material breach by the Client of their obligations, after a formal notice (mise en demeure) remained without effect for 15 days.',
  },
  {
    title: 'Article 10 — Governing law and jurisdiction',
    text:
      'These Terms are governed by Swiss law, to the exclusion of any conflict-of-laws rule. In case of dispute, the parties commit to seeking an amicable resolution before any judicial action. Failing an amicable agreement, the courts of the canton of Geneva have exclusive jurisdiction.',
  },
]

export default function Page() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildOrganization('en')} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'Terms of service', url: '/en/terms-of-service' },
        ])}
      />
      <section className="py-24">
        <div className="max-w-[800px] mx-auto px-6">
          <GradTag className="mb-6">Legal</GradTag>
          <h1 className="text-4xl font-bold tracking-[-0.02em] mb-4">Terms of service</h1>
          <p className="text-text-secondary leading-relaxed mb-8 max-w-lg">
            These Terms apply to all services provided by DKDP to its clients, corporate and individual.
            For any binding legal interpretation, the{' '}
            <Link href="/conditions-generales-de-vente" className="underline hover:no-underline">
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
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.label} className="grid grid-cols-[160px_1fr] gap-4">
                        <span className="text-text-muted text-sm">{item.label}</span>
                        <span className="text-text-secondary text-sm leading-relaxed">{item.value}</span>
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
            <Link href="/en/legal-notice" className="inline-flex items-center gap-1 text-text-secondary hover:text-text">
              Legal notice <ArrowRight size={13} />
            </Link>
            <Link href="/en/privacy-policy" className="inline-flex items-center gap-1 text-text-secondary hover:text-text">
              Privacy policy <ArrowRight size={13} />
            </Link>
            <Link href="/en/contact" className="inline-flex items-center gap-1 text-text-secondary hover:text-text">
              Contact <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
