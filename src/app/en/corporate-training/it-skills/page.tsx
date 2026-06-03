import { Cpu } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildCourse } from '@/lib/schema'

const PRICING = {
  title: 'Hourly rate scaled to your group',
  subtitle: 'Price depends on the number of participants. The programme is tailored to your team.',
  tiers: [
    { name: '1 person', price: 'CHF 200', cadence: 'Per hour', description: 'One-to-one coaching, tailored to your role and tools.', features: ['Personalised agenda', 'Your real tools', 'Take-home cheat sheet', '2 weeks email Q&A', 'Completion certificate'], ctaLabel: 'Book a session' },
    { name: '2 people', price: 'CHF 300', cadence: 'Per hour', description: 'Paired training for two colleagues.', features: ['Everything in 1 person, plus:', 'Shared workflows', 'Peer practice', 'Two certificates'], highlighted: true, ctaLabel: 'Book a session' },
    { name: 'Group (3 to 15)', price: 'On request', cadence: 'Half-day or full day', description: 'Team session, on-site or remote, custom programme.', features: ['Everything above, plus:', 'Half-day or full-day format', 'Team tool audit', 'Automation starter recipes', 'On-site across Switzerland or remote'], ctaLabel: 'Request a quote' },
  ],
  note: 'All prices in Swiss francs, excluding VAT 8.1%. Group sessions are quoted per project.',
}

export const metadata = buildServiceMetadata({
  title: 'IT Skills Training Geneva · Essentials for Modern Teams | DKDP',
  description:
    "IT skills training in Geneva for non-tech teams. Cloud collaboration, modern productivity, automation, AI literacy. Practical, no jargon. From CHF 1'500 per half-day.",
  enPath: '/en/corporate-training/it-skills',
  frPath: '/formation-entreprise/informatique',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/it-skills"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'IT skills · Geneva',
        h1Lead: 'IT essentials,',
        h1Highlight: 'no jargon.',
        subtitle:
          'Practical IT training for non-tech teams. Cloud collaboration, modern productivity, basic automation, AI literacy. Build the digital reflexes every team member needs in 2026.',
        icon: Cpu,
        bullets: [
          { title: 'Cloud collaboration', text: 'Drive, SharePoint, Notion. Sharing, permissions, versioning. Stop emailing attachments forever.' },
          { title: 'Modern productivity', text: 'Calendar discipline, deep work blocks, async communication, meeting hygiene.' },
          { title: 'Automation basics', text: 'Recipes in Make or Zapier your team can build alone. Stop doing repetitive copy-paste tasks.' },
          { title: 'AI literacy', text: 'What AI can and cannot do, when to trust it, when to verify, basic privacy hygiene.' },
          { title: 'Browser power tools', text: 'Tabs, bookmarks, password manager, extensions that actually pay back. Time saved daily.' },
          { title: 'Tool selection', text: 'Help your team pick the right tool per task. Stop buying SaaS your team will not adopt.' },
        ],
        stats: [
          { value: "CHF 1'500+", label: 'Half-day session' },
          { value: '4-15 people', label: 'Per session' },
          { value: 'Non-tech', label: 'Built for' },
          { value: 'Practical', label: 'No jargon' },
        ],
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        process: [
          { title: 'Pre-session interview', text: '30-minute call to map your team level and the tools they use daily.' },
          { title: 'Hands-on, no jargon', text: 'We work on your real tools, building the digital reflexes that save hours every week.' },
          { title: 'Starter automations', text: 'Simple Make or Zapier recipes your team can build and extend alone.' },
          { title: 'Follow-up Q&A', text: 'Two weeks of free email Q&A after the session.' },
        ],
        pricing: PRICING,
        bridge: {
          title: 'Going further',
          links: [
            { label: 'Office tools training', href: '/en/corporate-training/office-tools', description: 'Go deeper on Excel, Word, PowerPoint and Microsoft 365. From CHF 200/h.' },
            { label: 'Corporate AI training', href: '/en/corporate-training/ai', description: 'Add AI to the digital toolkit your team just learned. From CHF 200/h.' },
            { label: 'Cybersecurity training', href: '/en/corporate-training/cybersecurity', description: 'Build the security reflexes every team member needs. From CHF 200/h.' },
          ],
        },
        faq: [
          { question: 'How much does IT skills training cost?', answer: "CHF 200/hour for one person, CHF 300/hour for two. Group sessions (3 to 15 people) are quoted per project as a half-day or full-day." },
          { question: 'Is this for non-technical people?', answer: 'Yes, entirely. No jargon, no code. We build the practical digital reflexes every team member needs: cloud collaboration, productivity, basic automation, AI literacy.' },
          { question: 'Can we train on our own tools?', answer: 'Yes, and it is recommended. We adapt every exercise to your real tools (Drive, SharePoint, Notion, Microsoft 365) so the skills transfer directly.' },
          { question: 'Do you cover basic automation?', answer: 'Yes. Simple Make or Zapier recipes your team can build and extend alone, so they stop doing repetitive copy-paste tasks.' },
          { question: 'Is the training in person or online?', answer: 'Both. On-site across Geneva and French-speaking Switzerland, or online with live exercises. Hybrid format also available.' },
        ],
        finalTitle: 'Book your IT skills training',
        finalText: 'Tell us your team and the tools they use. We design a tailored agenda, send a fixed quote and deliver in Geneva or remote, in English or French.',
        extraSchemas: [
          buildCourse({
            name: 'IT Skills Training',
            url: '/en/corporate-training/it-skills',
            description: 'Hands-on IT skills training in Geneva for non-tech teams. Cloud collaboration, modern productivity, basic automation, AI literacy. Practical, no jargon.',
            duration: 'PT6H',
            teaches: ['Cloud collaboration', 'Productivity', 'Basic automation', 'AI literacy', 'Browser power tools', 'Tool selection'],
            prerequisites: 'No prerequisites',
            priceFrom: 200,
            ratingValue: '4.9',
            ratingCount: 95,
            lang: 'en',
          }),
        ],
      }}
    />
  )
}
