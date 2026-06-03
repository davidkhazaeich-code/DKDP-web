import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GradTag } from '@/components/ui/GradTag'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { buildBreadcrumbList, buildOrganization } from '@/lib/schema'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata: Metadata = buildServiceMetadata({
  title: 'Privacy Policy · DKDP Digital Agency Geneva',
  description:
    'Privacy policy of DKDP, a digital agency in Geneva. Data we collect, how we use it, retention periods, subprocessors and your rights under the Swiss nFADP (formerly nLPD) and the EU GDPR.',
  enPath: '/en/privacy-policy',
  frPath: '/politique-de-confidentialite',
  noIndex: true,
})

export default function Page() {
  return (
    <main className="pt-14">
      <SchemaOrg schema={buildOrganization('en')} />
      <SchemaOrg
        schema={buildBreadcrumbList([
          { name: 'Home', url: '/en' },
          { name: 'Privacy policy', url: '/en/privacy-policy' },
        ])}
      />
      <section className="py-24">
        <div className="max-w-[800px] mx-auto px-6">
          <GradTag className="mb-6">Legal</GradTag>
          <h1 className="text-4xl font-bold tracking-[-0.02em] mb-4">Privacy policy</h1>
          <p className="text-text-secondary leading-relaxed mb-8 max-w-lg">
            At DKDP, protecting your personal data is a priority. This policy explains what data we collect, why, and how you can exercise your rights.
            For any binding legal interpretation, the{' '}
            <Link href="/politique-de-confidentialite" className="underline hover:no-underline">
              French version
            </Link>{' '}
            prevails.
          </p>

          <div className="space-y-6">
            {/* 1. Data controller */}
            <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
              <h2 className="font-bold text-lg mb-5" style={{ color: 'var(--text)' }}>1. Data controller</h2>
              <div className="space-y-2.5">
                {[
                  { label: 'Controller', value: 'David Khazaei (DKDP)' },
                  { label: 'Address', value: '36 Rue du 31 Décembre, 1207 Geneva, Switzerland' },
                  { label: 'Email', value: 'dk@dkdp.ch' },
                  { label: 'Phone', value: '+41 79 940 79 69' },
                ].map((item) => (
                  <div key={item.label} className="grid grid-cols-[140px_1fr] gap-4">
                    <span className="text-text-muted text-sm">{item.label}</span>
                    <span className="text-text-secondary text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Data collected */}
            <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
              <h2 className="font-bold text-lg mb-5" style={{ color: 'var(--text)' }}>2. Data we collect</h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                We only collect the data strictly required to deliver our services and manage the client relationship.
              </p>
              <div className="space-y-3">
                {[
                  { type: 'Contact forms', detail: 'First and last name, email, phone (optional), project description.' },
                  { type: 'Online booking', detail: 'Name, email, time zone, slot picked, via Cal.com.' },
                  { type: 'Browsing data', detail: 'IP address, browser type, pages visited, visit duration, via analytics cookies (see section 6).' },
                  { type: 'Correspondence', detail: 'Emails and messages exchanged in the context of a proposal or engagement.' },
                  { type: 'Chatbot conversations', detail: 'Messages exchanged with the AI assistant, optional email if you share it.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-[10px]" style={{ background: 'var(--surface-default)' }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#D4D4D8' }} />
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{item.type}</p>
                      <p className="text-text-muted text-xs leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Purposes */}
            <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
              <h2 className="font-bold text-lg mb-5" style={{ color: 'var(--text)' }}>3. Purposes of processing</h2>
              <div className="space-y-3">
                {[
                  { purpose: 'Reply to your contact and quote requests', basis: 'Legitimate interest / Contract performance' },
                  { purpose: 'Manage the client relationship and deliver services', basis: 'Contract performance' },
                  { purpose: 'Send information about our services (with consent)', basis: 'Consent' },
                  { purpose: 'Improve the website and our services', basis: 'Legitimate interest' },
                  { purpose: 'Meet our legal and accounting obligations', basis: 'Legal obligation' },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto] gap-4 items-center py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(212,212,216,0.08)' }}>
                    <span className="text-text-secondary text-sm">{item.purpose}</span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 text-right" style={{ background: 'rgba(212,212,216,0.08)', color: '#D4D4D8' }}>{item.basis}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Retention */}
            <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
              <h2 className="font-bold text-lg mb-5" style={{ color: 'var(--text)' }}>4. Retention periods</h2>
              <div className="space-y-2.5">
                {[
                  { type: 'Contact data (non-clients)', duration: '12 months after last contact' },
                  { type: 'Client data (contracts, invoices)', duration: '10 years (Swiss accounting law, CO art. 957)' },
                  { type: 'Analytics data (browsing)', duration: '13 months maximum' },
                  { type: 'Online booking data', duration: '6 months after the call' },
                  { type: 'Chatbot conversation logs', duration: '12 months (anonymised after 30 days for non-clients)' },
                ].map((item) => (
                  <div key={item.type} className="grid grid-cols-[1fr_200px] gap-4 items-start py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(212,212,216,0.08)' }}>
                    <span className="text-text-secondary text-sm">{item.type}</span>
                    <span className="text-text-muted text-xs text-right">{item.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Subprocessors */}
            <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
              <h2 className="font-bold text-lg mb-5" style={{ color: 'var(--text)' }}>5. Subprocessors</h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Your data is never sold. It may be processed by the following technical subprocessors strictly required for our services. Each is bound by a data processing agreement compatible with Swiss and EU law.
              </p>
              <div className="space-y-3">
                {[
                  { name: 'Vercel', role: 'Website hosting and edge functions', country: 'USA (Standard Contractual Clauses)' },
                  { name: 'Cal.com', role: 'Online booking system', country: 'USA (Standard Contractual Clauses)' },
                  { name: 'Google Analytics', role: 'Anonymised audience analytics (when enabled)', country: 'USA (Standard Contractual Clauses)' },
                  { name: 'Anthropic', role: 'Claude LLM used by the chatbot and selected AI agents', country: 'USA (Standard Contractual Clauses)' },
                  { name: 'OpenAI', role: 'GPT models used occasionally by the chatbot and AI analytics', country: 'USA (Standard Contractual Clauses)' },
                  { name: 'Resend', role: 'Transactional email delivery (forms, notifications)', country: 'USA (Standard Contractual Clauses)' },
                  { name: 'Supabase', role: 'Encrypted storage of form submissions and chatbot sessions', country: 'EU (Frankfurt) / USA depending on project' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-[10px]" style={{ background: 'var(--surface-default)' }}>
                    <div>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text)' }}>{item.name}</p>
                      <p className="text-text-muted text-xs">{item.role}</p>
                      <p className="text-text-muted text-[11px] mt-0.5 opacity-70">{item.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Cookies */}
            <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
              <h2 className="font-bold text-lg mb-5" style={{ color: 'var(--text)' }}>6. Cookies</h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                This website uses cookies for proper operation and audience measurement. You can manage your preferences via the consent banner displayed on your first visit, and at any time from our{' '}
                <Link href="/en/digital-agency/gdpr-cookies" className="underline hover:no-underline">
                  cookie policy
                </Link>.
              </p>
              <div className="space-y-2.5">
                {[
                  { type: 'Essential cookies', desc: 'Required for the website to operate. Cannot be disabled.', basis: 'Legitimate interest' },
                  { type: 'Analytics cookies', desc: 'Anonymised audience measurement to improve the site.', basis: 'Consent' },
                  { type: 'Marketing cookies', desc: 'Targeted advertising and conversion tracking (Google Ads).', basis: 'Consent' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-[10px] border" style={{ background: 'var(--surface-subtle)', borderColor: 'rgba(212,212,216,0.08)' }}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{item.type}</p>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(212,212,216,0.08)', color: '#D4D4D8' }}>{item.basis}</span>
                      </div>
                      <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Your rights */}
            <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
              <h2 className="font-bold text-lg mb-5" style={{ color: 'var(--text)' }}>7. Your rights</h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                Under the EU General Data Protection Regulation (GDPR, EU 2016/679) and the Swiss Federal Act on Data Protection (nFADP, formerly nLPD), you have the following rights:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {[
                  { right: 'Right of access', desc: 'Get a copy of your personal data.' },
                  { right: 'Right of rectification', desc: 'Correct inaccurate or incomplete data.' },
                  { right: 'Right of erasure', desc: 'Request the deletion of your data.' },
                  { right: 'Right of portability', desc: 'Receive your data in a structured format.' },
                  { right: 'Right to object', desc: 'Object to certain processing activities.' },
                  { right: 'Right to restriction', desc: 'Restrict the use of your data.' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-[10px]" style={{ background: 'var(--surface-default)' }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{item.right}</p>
                    <p className="text-text-muted text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                To exercise your rights, contact us at{' '}
                <a href="mailto:dk@dkdp.ch" className="hover:underline" style={{ color: 'var(--text)' }}>dk@dkdp.ch</a>.
                We will respond within 30 days. If you reside in Switzerland, you may also contact the Federal Data Protection and Information Commissioner (FDPIC). If you reside in the EU, you may contact your national data protection authority.
              </p>
            </div>

            {/* 8. Security */}
            <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
              <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--text)' }}>8. Security</h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss or alteration: HTTPS encryption, restricted access to data, secure hosting, regular backups.
              </p>
            </div>

            {/* 9. Changes */}
            <div className="rounded-[16px] p-7 border" style={{ background: 'rgba(212,212,216,0.04)', borderColor: 'rgba(212,212,216,0.12)' }}>
              <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--text)' }}>9. Changes to this policy</h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                We reserve the right to amend this policy at any time. The date of the last update is shown below. In case of a material change, we will notify our clients by email.
              </p>
            </div>
          </div>

          <p className="text-text-muted text-xs text-center mt-12">Last updated: April 2026</p>

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
      </section>
    </main>
  )
}
