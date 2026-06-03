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
    'Legal notice for DKDP, a digital agency based in Geneva, Switzerland. Publisher information, hosting and editorial responsibility.',
  enPath: '/en/legal-notice',
  frPath: '/mentions-legales',
})

export default function Page() {
  return (
    <main className="pt-28 sm:pt-36 pb-20 sm:pb-24">
      <SchemaOrg schema={buildOrganization()} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'Legal notice', url: '/en/legal-notice' },
        ])}
      />
      <div className="max-w-[820px] mx-auto px-6">
        <GradTag>Legal</GradTag>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mt-3 mb-5">Legal notice</h1>
        <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8">
          This page summarises the legal information about the operator of dkdp.ch.
          For any binding legal interpretation, the{' '}
          <Link href="/mentions-legales" className="underline hover:no-underline">
            French version
          </Link>{' '}
          prevails.
        </p>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-text font-bold text-xl mb-2">Publisher</h2>
            <p>
              <strong className="text-text">DKDP</strong> — digital agency
              <br />
              36 Rue du 31 Decembre, Eaux-Vives District
              <br />
              1207 Geneva, Switzerland
              <br />
              Email: <a href="mailto:dk@dkdp.ch" className="underline hover:no-underline">dk@dkdp.ch</a>
              <br />
              Phone: <a href="tel:+41799407969" className="underline hover:no-underline">+41 79 940 79 69</a>
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Editorial responsibility</h2>
            <p>
              David Khazaei, founder, holds editorial responsibility for the content published on dkdp.ch.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Hosting</h2>
            <p>
              The website is hosted by{' '}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                Vercel Inc.
              </a>
              {' '}(340 S Lemon Ave #4133, Walnut, CA 91789, USA).
              Static assets and edge functions may be served from European and Swiss data centres.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Intellectual property</h2>
            <p>
              All content on dkdp.ch (text, images, code, design) is the exclusive property of DKDP unless
              stated otherwise. Reproduction or reuse without prior written authorisation is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Applicable law</h2>
            <p>
              These legal notices are governed by Swiss law. The competent courts of the canton of Geneva
              have exclusive jurisdiction over any dispute.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-4 text-sm">
          <Link href="/en/privacy-policy" className="inline-flex items-center gap-1 text-text-secondary hover:text-text">
            Privacy policy <ArrowRight size={13} />
          </Link>
          <Link href="/en/terms-of-service" className="inline-flex items-center gap-1 text-text-secondary hover:text-text">
            Terms of service <ArrowRight size={13} />
          </Link>
          <Link href="/en/digital-agency/gdpr-cookies" className="inline-flex items-center gap-1 text-text-secondary hover:text-text">
            GDPR & cookies <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </main>
  )
}
