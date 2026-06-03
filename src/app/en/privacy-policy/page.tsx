import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata: Metadata = buildServiceMetadata({
  title: 'Privacy Policy · DKDP',
  description:
    'Privacy policy of DKDP, a digital agency in Geneva. Data we collect, how we use it, your rights under the Swiss nLPD and the EU GDPR.',
  enPath: '/en/privacy-policy',
  frPath: '/politique-de-confidentialite',
})

export default function Page() {
  return (
    <main className="pt-28 sm:pt-36 pb-20 sm:pb-24">
      <div className="max-w-[820px] mx-auto px-6">
        <GradTag>Privacy</GradTag>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mt-3 mb-5">Privacy policy</h1>
        <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8">
          This page summarises how DKDP collects, uses and protects your personal data.
          For any binding legal interpretation, the{' '}
          <Link href="/politique-de-confidentialite" className="underline hover:no-underline">
            French version
          </Link>{' '}
          prevails.
        </p>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-text font-bold text-xl mb-2">Data controller</h2>
            <p>
              The data controller is DKDP — 36 Rue du 31 Decembre, 1207 Geneva, Switzerland —
              <a href="mailto:dk@dkdp.ch" className="underline hover:no-underline ml-1">dk@dkdp.ch</a>.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Data we collect</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong className="text-text">Contact forms:</strong> name, email, phone, project description.</li>
              <li><strong className="text-text">Analytics:</strong> anonymised page views, device and country (via Google Analytics 4 with Consent Mode v2).</li>
              <li><strong className="text-text">Chatbot conversations:</strong> messages exchanged, optional email if you share it.</li>
              <li><strong className="text-text">Newsletter:</strong> email address only.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">How we use it</h2>
            <p>
              Your data is used to reply to your enquiry, send proposals, deliver the services you booked,
              improve dkdp.ch and, if you opted in, send our newsletter. We do not sell your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Retention</h2>
            <p>
              Contact form data is kept for up to 3 years after the last interaction.
              Analytics data is anonymised after 14 months. You can request earlier deletion at any time.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Your rights</h2>
            <p>
              Under the Swiss Federal Act on Data Protection (nLPD) and the EU General Data Protection Regulation (GDPR),
              you have the right to access, rectify, delete or port your personal data, and to object to processing.
              Send any request to{' '}
              <a href="mailto:dk@dkdp.ch" className="underline hover:no-underline">dk@dkdp.ch</a>{' '}
              and we will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Third-party processors</h2>
            <p>
              We use the following processors that may receive personal data:
              Google (Analytics), Vercel (hosting), Cal.com (booking), Anthropic and OpenAI (chatbot AI),
              Resend (transactional email), Supabase (form storage). Each is bound by data processing agreements
              compatible with Swiss and EU law.
            </p>
          </section>

          <section>
            <h2 className="text-text font-bold text-xl mb-2">Cookies</h2>
            <p>
              We use cookies for analytics and basic functionality only. See our{' '}
              <Link href="/en/digital-agency/gdpr-cookies" className="underline hover:no-underline">
                cookie policy
              </Link>{' '}
              for the full list and how to opt out.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-4 text-sm">
          <Link href="/en/legal-notice" className="inline-flex items-center gap-1 text-text-secondary hover:text-text">
            Legal notice <ArrowRight size={13} />
          </Link>
          <Link href="/en/terms-of-service" className="inline-flex items-center gap-1 text-text-secondary hover:text-text">
            Terms of service <ArrowRight size={13} />
          </Link>
          <Link href="/en/contact" className="inline-flex items-center gap-1 text-text-secondary hover:text-text">
            Data request <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </main>
  )
}
