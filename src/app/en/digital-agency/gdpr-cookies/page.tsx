import { Shield } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildServiceWithLocalBusiness } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'GDPR and Cookies Compliance Geneva · Swiss nFADP Ready | DKDP',
  description:
    'GDPR, Swiss nFADP and cookie compliance for websites and apps. Cookie banner, Consent Mode v2, privacy policy, data inventory. Compliance without breaking analytics. Audit from CHF 800.',
  enPath: '/en/digital-agency/gdpr-cookies',
  frPath: '/agence-digitale/rgpd-cookies',
  imageAlt: 'GDPR and cookies compliance Geneva, Swiss nFADP by DKDP',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/gdpr-cookies"
      config={{
        pillar: 'agence',
        hubName: 'Digital agency',
        hubHref: '/en/digital-agency',
        tag: 'GDPR and cookies · Geneva',
        h1Lead: 'Compliance without',
        h1Highlight: 'breaking analytics.',
        subtitle:
          'GDPR, Swiss nFADP and cookie compliance done right. A consent flow that respects users, lawyers and Google Analytics at the same time. Audit from CHF 800.',
        icon: Shield,
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        problem: {
          title: 'What non-compliance actually costs',
          items: [
            { title: 'GDPR fines up to 20M euros', text: 'Or 4% of worldwide turnover, whichever is higher. EU regulators have fined SMBs for missing or dark-pattern cookie banners.' },
            { title: 'Swiss nFADP penalties up to CHF 250,000', text: 'The new Swiss law (in force since September 2023) carries personal fines for responsible individuals, not just companies.' },
            { title: 'Broken analytics', text: 'Block cookies wrong and your Google Analytics goes dark. Most banners trade compliance for blind measurement. We avoid both.' },
          ],
        },
        bullets: [
          { title: 'Cookie banner that works', text: 'Compliant banner with clear accept, refuse and granular options. No dark patterns.' },
          { title: 'Google Consent Mode v2', text: 'Analytics keeps modelling conversions even when users decline. Compliant and measurable.' },
          { title: 'Cookie inventory', text: 'Every cookie listed, classified and described in your privacy policy. Updated when your stack changes.' },
          { title: 'Privacy policy review', text: 'Plain-language policy that matches what you actually do, not a generic template.' },
          { title: 'Swiss nFADP coverage', text: 'New Swiss data protection law covered, not just GDPR. We work with SMBs in Geneva daily.' },
          { title: 'Processing register', text: 'A documented register of your data processing activities, required under both GDPR and nFADP.' },
          { title: 'Data subject request flow', text: 'Process and tooling to handle access, deletion and rectification requests within legal deadlines.' },
        ],
        stats: [
          { value: 'CHF 800+', label: 'Compliance audit' },
          { value: 'GDPR + nFADP', label: 'Both covered' },
          { value: '< 2 weeks', label: 'Typical delivery' },
          { value: 'Yes', label: 'Consent Mode v2' },
        ],
        process: [
          { title: 'Compliance audit', text: 'We inventory your cookies, trackers and data flows, then map the gaps against GDPR and nFADP. 48-hour report.' },
          { title: 'Banner and consent', text: 'Compliant cookie banner with Consent Mode v2, granular options, no dark patterns. Analytics preserved.' },
          { title: 'Policies and register', text: 'Privacy policy rewritten in plain language, processing register documented, legal notices updated.' },
          { title: 'Request handling', text: 'A process and tooling to answer data subject requests (access, deletion) within legal deadlines.' },
        ],
        pricing: {
          title: 'Audit, full pack or ongoing',
          subtitle: 'From a quick compliance audit to a managed, always-up-to-date setup.',
          tiers: [
            { name: 'Audit', price: 'CHF 800', cadence: 'One-off', description: 'A full compliance audit with a prioritised gap list. 48-hour delivery.', features: ['Cookie and tracker inventory', 'GDPR and nFADP gap analysis', 'Prioritised remediation list', 'Risk assessment', '48-hour report', 'One review call'], ctaLabel: 'Start with an audit' },
            { name: 'Compliance pack', price: "CHF 2'500", cadence: 'One-off', description: 'The complete compliance setup for a website or app.', features: ['Everything in Audit, plus:', 'Cookie banner with Consent Mode v2', 'Privacy policy rewrite', 'Processing register', 'Data subject request flow', 'Implementation and testing'], highlighted: true, ctaLabel: 'Get compliant' },
            { name: 'Ongoing monitoring', price: 'CHF 350', cadence: 'Per month', description: 'Keep compliance current as your tools and laws evolve.', features: ['Everything in Compliance pack, maintained:', 'Quarterly compliance review', 'Cookie inventory kept current', 'Policy updates on changes', 'Regulatory change monitoring', 'Priority support'], ctaLabel: 'Talk to us' },
          ],
          note: 'All prices in Swiss francs, excluding VAT 8.1%. We are not lawyers but collaborate with Geneva-based data protection lawyers for projects that need a legal signature.',
        },
        testimonials: [
          { quote: 'DKDP made us GDPR and nFADP compliant without killing our analytics. Consent Mode v2 means we still see conversions even when users decline. Best of both worlds.', author: 'Marketing Manager', role: 'Geneva e-commerce' },
          { quote: 'As a fiduciary, compliance is existential. They audited us, fixed the gaps, documented the processing register and set up our request flow. Our legal review was clean.', author: 'Managing Partner', role: 'Geneva fiduciary' },
          { quote: 'The 48-hour audit found trackers we did not know we had. The compliance pack sorted everything in under two weeks. Painless and thorough.', author: 'Founder', role: 'Swiss SaaS, Lausanne' },
        ],
        bridge: {
          title: 'Going further with DKDP',
          links: [
            { label: 'Web design', href: '/en/digital-agency/web-design', description: 'Building a new site? We bake compliance in from day one. From CHF 2\'500.' },
            { label: 'AI chatbot', href: '/en/artificial-intelligence/ai-chatbot', description: 'A chatbot that handles personal data needs proper consent and Swiss hosting. We do both. From CHF 2\'900.' },
            { label: 'Cybersecurity training', href: '/en/corporate-training/cybersecurity', description: 'Compliance is also a people problem. Train your team on data protection reflexes.' },
          ],
        },
        faq: [
          { question: 'Do we really need a cookie banner if we are Swiss?', answer: 'If you have visitors from the EU, you need GDPR compliance. The Swiss nFADP (in force since 1 September 2023) also adds requirements. In practice, a single well-built banner covers both legal frameworks and a few more.' },
          { question: 'How much does compliance cost?', answer: "A compliance audit is CHF 800. The full compliance pack (banner, privacy policy, processing register, request flow) is CHF 2'500. Ongoing monitoring is CHF 350/month to stay current as laws and your stack evolve." },
          { question: 'What are the penalties for non-compliance?', answer: 'GDPR fines reach up to 20 million euros or 4% of worldwide turnover. The Swiss nFADP carries fines up to CHF 250,000, applied to responsible individuals, not just companies. Compliance is cheaper than the risk.' },
          { question: 'Will it break our Google Analytics?', answer: 'No, that is the point of using Google Consent Mode v2. Even when users refuse cookies, GA continues to receive aggregated, modelled data. You stay compliant and you keep measurable analytics.' },
          { question: 'Can you handle the privacy policy too?', answer: 'Yes. We review or rewrite your privacy policy in plain language. We are not lawyers, but we collaborate with Geneva-based data protection lawyers for projects that need a legal signature.' },
          { question: 'What is the processing register?', answer: 'A documented record of your data processing activities, required under both GDPR and the Swiss nFADP. We build it for you and keep it current under the monitoring plan.' },
        ],
        finalTitle: 'Free compliance check',
        finalText: 'Share your URL. We run a quick cookie and tracker scan and tell you where you stand against GDPR and nFADP, plus a fixed-quote proposal. No commitment.',
        extraSchemas: [
          buildServiceWithLocalBusiness({
            name: 'GDPR and nFADP compliance Geneva',
            url: '/en/digital-agency/gdpr-cookies',
            description: 'GDPR, Swiss nFADP and cookie compliance in Geneva for SMBs. Cookie banner with Consent Mode v2, privacy policy, processing register, data subject request handling.',
            serviceType: 'Data protection compliance',
            priceFrom: 800,
            lang: 'en',
            extraAreas: ['Zurich', 'Basel', 'Bern'],
          }),
        ],
      }}
    />
  )
}
