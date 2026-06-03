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
    'Terms of service for engagements with DKDP, a Geneva-based digital agency. Quotes, deliverables, payment terms, intellectual property, governing law.',
  enPath: '/en/terms-of-service',
  frPath: '/conditions-generales-de-vente',
})

export default function Page() {
  return (
    <main className="pt-28 sm:pt-36 pb-20 sm:pb-24">
      <SchemaOrg schema={buildOrganization()} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'Terms of service', url: '/en/terms-of-service' },
        ])}
      />
      <div className="max-w-[820px] mx-auto px-6">
        <GradTag>Legal</GradTag>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mt-3 mb-5">Terms of service</h1>
        <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8">
          This page summarises the standard terms under which DKDP engages with clients.
          For any binding legal interpretation, the{' '}
          <Link href="/conditions-generales-de-vente" className="underline hover:no-underline">
            French version
          </Link>{' '}
          prevails.
        </p>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-text font-bold text-xl mb-2">Quotes and engagement</h2>
            <p>
              Every project starts with a written quote covering scope, price and timeline. The quote is valid
              for 30 days and becomes binding when signed by both parties. Work starts after a deposit invoice
              is paid (typically 30-50% of total).
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Deliverables</h2>
            <p>
              Deliverables are defined precisely in each quote. Anything not listed is out of scope and may be
              quoted separately as a change request. We commit to weekly progress demos and clear visibility on
              what is shipped, what is in progress and what is blocked.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Payment terms</h2>
            <p>
              Invoices are payable within 30 days of issuance. Late payment triggers a default interest of 5% per
              annum (Swiss Code of Obligations, art. 104). For ongoing retainers, monthly invoicing is the default.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Intellectual property</h2>
            <p>
              On full payment of the project, the client receives a transferable usage right on all deliverables
              produced specifically for them (code, design, content). DKDP retains the right to mention the project
              in its portfolio unless explicitly forbidden in the engagement letter.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Confidentiality</h2>
            <p>
              DKDP keeps confidential any non-public information disclosed during a project. This obligation
              survives the end of the engagement. NDAs can be signed separately for sensitive engagements.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Liability</h2>
            <p>
              DKDP is liable for damages caused by intent or gross negligence, up to the amount of the project fee.
              Indirect damages (loss of profit, business interruption) are excluded to the extent permitted by Swiss law.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Termination</h2>
            <p>
              Either party may terminate a fixed-scope engagement before completion with 30 days written notice.
              In that case, work already performed is invoiced pro-rata. Retainers can be terminated at the end of any
              calendar month with 30 days notice.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Governing law and jurisdiction</h2>
            <p>
              These terms are governed by Swiss law. The competent courts of the canton of Geneva have exclusive
              jurisdiction over any dispute arising from a DKDP engagement.
            </p>
          </section>
        </div>

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
    </main>
  )
}
