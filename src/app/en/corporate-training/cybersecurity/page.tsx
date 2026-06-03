import { Shield } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildCourse } from '@/lib/schema'

const PRICING = {
  title: 'Hourly rate scaled to your group',
  subtitle: 'Price depends on the number of participants. The programme is tailored to your team.',
  tiers: [
    { name: '1 person', price: 'CHF 200', cadence: 'Per hour', description: 'One-to-one coaching, tailored to your role and risk profile.', features: ['Personalised agenda', 'Phishing test included', 'Take-home checklist', '2 weeks email Q&A', 'Completion certificate'], ctaLabel: 'Book a session' },
    { name: '2 people', price: 'CHF 300', cadence: 'Per hour', description: 'Paired training for two colleagues.', features: ['Everything in 1 person, plus:', 'Shared drills', 'Peer practice', 'Two certificates'], highlighted: true, ctaLabel: 'Book a session' },
    { name: 'Group (3 to 15)', price: 'On request', cadence: 'Half-day or full day', description: 'Team session, on-site or remote, custom programme.', features: ['Everything above, plus:', 'Half-day or full-day format', 'Company-wide phishing simulation', 'Incident response drill', 'On-site across Switzerland or remote'], ctaLabel: 'Request a quote' },
  ],
  note: 'All prices in Swiss francs, excluding VAT 8.1%. Group sessions are quoted per project. Aligned to ISO 27001 awareness requirements and Swiss nFADP article 7.',
}

export const metadata = buildServiceMetadata({
  title: 'Cybersecurity Training Geneva · Real Drills | DKDP',
  description:
    "Cybersecurity training in Geneva. Phishing, password hygiene, MFA, social engineering, AI threats. Practical drills, real attacks, take-home checklist. From CHF 1'500.",
  enPath: '/en/corporate-training/cybersecurity',
  frPath: '/formation-entreprise/cybersecurite',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/cybersecurity"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'Cybersecurity · Geneva',
        h1Lead: 'Protect your team',
        h1Highlight: 'before the breach.',
        subtitle:
          'Cybersecurity training that goes beyond awareness slides. Real phishing simulations, password hygiene workshops, MFA setup, social engineering drills, AI-specific risks.',
        icon: Shield,
        bullets: [
          { title: 'Phishing simulation', text: 'We send realistic phishing tests, then debrief the results with your team. Memorable, not embarrassing.' },
          { title: 'Password hygiene workshop', text: '1Password or Bitwarden setup, MFA roll-out, breach monitoring. Hands-on, not theoretical.' },
          { title: 'Social engineering drills', text: 'Voice phishing, deepfake calls, USB drop tests. The threats your team will actually encounter.' },
          { title: 'AI-specific risks', text: 'Prompt injection, model poisoning, hallucinated facts, deepfake video. The new threats nobody covers.' },
          { title: 'Incident response basics', text: 'What to do in the first hour when something goes wrong. Who to call, what to log, what to never delete.' },
          { title: 'Compliance-ready', text: 'Maps to ISO 27001 awareness requirements and Swiss nLPD article 7. Certificates of completion provided.' },
        ],
        stats: [
          { value: "CHF 1'500+", label: 'Half-day session' },
          { value: '4-15 people', label: 'Per session' },
          { value: 'ISO 27001', label: 'Awareness aligned' },
          { value: 'Real drills', label: 'Not just slides' },
        ],
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        process: [
          { title: 'Baseline phishing test', text: 'Before the session, we run a realistic phishing simulation to measure where your team really stands.' },
          { title: 'Hands-on drills', text: 'Password manager setup, MFA roll-out, social engineering drills, AI-specific threats. Practical, not theoretical.' },
          { title: 'Incident response', text: 'What to do in the first hour when something goes wrong. Roles, logging, escalation.' },
          { title: 'Follow-up test', text: 'A second phishing test after the session to prove the reflexes stuck.' },
        ],
        pricing: PRICING,
        bridge: {
          title: 'Going further',
          links: [
            { label: 'GDPR and cookies compliance', href: '/en/digital-agency/gdpr-cookies', description: 'Cybersecurity and data protection go together. Get your site nFADP and GDPR compliant. From CHF 800.' },
            { label: 'IT skills training', href: '/en/corporate-training/it-skills', description: 'Build the broader digital reflexes every team member needs. From CHF 200/h.' },
            { label: 'Corporate AI training', href: '/en/corporate-training/ai', description: 'Use AI safely: prompt hygiene, what to share, what to never share. From CHF 200/h.' },
          ],
        },
        faq: [
          { question: 'How much does cybersecurity training cost?', answer: "CHF 200/hour for one person, CHF 300/hour for two. Group sessions (3 to 15 people) are quoted per project as a half-day or full-day." },
          { question: 'Does the training map to ISO 27001?', answer: 'Yes. The programme aligns to ISO 27001 awareness requirements and Swiss nFADP article 7. Each participant receives a completion certificate useful for audits.' },
          { question: 'Do you run a real phishing simulation?', answer: 'Yes. We run a realistic phishing test before the session to establish a baseline, debrief it without shaming anyone, then a follow-up test to prove the reflexes stuck.' },
          { question: 'Do you cover AI-specific threats?', answer: 'Yes, and few trainers do. Prompt injection, model poisoning, hallucinated facts, deepfake voice and video. The new threats your team will actually face in 2026.' },
          { question: 'Is the training in person or online?', answer: 'Both. On-site across Geneva and French-speaking Switzerland, or online with live drills. Hybrid format also available.' },
        ],
        finalTitle: 'Book your cybersecurity training',
        finalText: 'Tell us your team size and sector. We design a tailored agenda, run a baseline phishing test, send a fixed quote and deliver in Geneva or remote.',
        extraSchemas: [
          buildCourse({
            name: 'Cybersecurity Training',
            url: '/en/corporate-training/cybersecurity',
            description: 'Hands-on cybersecurity training in Geneva. Phishing simulation, password hygiene, MFA, social engineering, AI threats. ISO 27001 and Swiss nFADP aligned.',
            duration: 'PT6H',
            teaches: ['Phishing awareness', 'Password hygiene', 'MFA', 'Social engineering', 'AI security threats', 'Incident response'],
            prerequisites: 'No technical prerequisites',
            priceFrom: 200,
            ratingValue: '4.9',
            ratingCount: 110,
            lang: 'en',
          }),
        ],
      }}
    />
  )
}
