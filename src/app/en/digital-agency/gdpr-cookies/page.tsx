import { Shield } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'GDPR & Cookies Compliance Geneva · Swiss nLPD Ready | DKDP',
  description:
    'GDPR, Swiss nLPD and cookie compliance for websites and apps. Cookie banner, consent mode, privacy policy review, data inventory. Compliance without breaking analytics.',
  enPath: '/en/digital-agency/gdpr-cookies',
  frPath: '/agence-digitale/rgpd-cookies',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/gdpr-cookies"
      config={{
        pillar: 'agence',
        hubName: 'Digital agency',
        hubHref: '/en/digital-agency',
        tag: 'GDPR & cookies · Geneva',
        h1Lead: 'Compliance without',
        h1Highlight: 'breaking analytics.',
        subtitle:
          'GDPR, Swiss nLPD and cookie compliance done right. A consent flow that respects users, lawyers and Google Analytics at the same time.',
        icon: Shield,
        bullets: [
          { title: 'Cookie banner that works', text: 'Compliant banner with clear accept, refuse and granular options. No dark patterns.' },
          { title: 'Google Consent Mode v2', text: 'Analytics keeps modelling conversions even when users decline. Compliant + measurable.' },
          { title: 'Cookie inventory', text: 'Every cookie listed, classified and described in your privacy policy. Updated when stack changes.' },
          { title: 'Privacy policy review', text: 'Plain-language policy that matches what you actually do, not a generic template.' },
          { title: 'Swiss nLPD coverage', text: 'New Swiss data protection law covered, not just GDPR. We work with SMBs in Geneva daily.' },
          { title: 'Data subject request flow', text: 'Process and tooling to handle access, deletion and rectification requests within legal deadlines.' },
        ],
        stats: [
          { value: "CHF 1'500+", label: 'One-off compliance' },
          { value: 'GDPR + nLPD', label: 'Both covered' },
          { value: '< 2 weeks', label: 'Typical delivery' },
          { value: 'Yes', label: 'Consent Mode v2' },
        ],
        faq: [
          {
            question: 'Do we really need a cookie banner if we are Swiss?',
            answer:
              'If you have visitors from the EU, you need GDPR compliance. The new Swiss nLPD (in force since 1 September 2023) also adds requirements. In practice, a single well-built banner covers both legal frameworks and a few more.',
          },
          {
            question: 'Will it break our Google Analytics?',
            answer:
              'No, that is the point of using Google Consent Mode v2. Even when users refuse cookies, GA continues to receive aggregated, modelled data. You stay compliant and you keep measurable analytics.',
          },
          {
            question: 'Can you handle the privacy policy too?',
            answer:
              "Yes. We review or rewrite your privacy policy in plain language. We are not lawyers, but we collaborate with Geneva-based data protection lawyers for projects that need a legal signature.",
          },
        ],
      }}
    />
  )
}
