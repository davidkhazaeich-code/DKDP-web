import { Wand2 } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildCourse } from '@/lib/schema'

const PRICING = {
  title: 'Hourly rate scaled to your group',
  subtitle: 'Price depends on the number of participants. The programme is tailored to your team.',
  tiers: [
    { name: '1 person', price: 'CHF 200', cadence: 'Per hour', description: 'One-to-one coaching, fully tailored to your brand and needs.', features: ['Personalised agenda', 'Your real brand assets', 'Live Brand Kit setup', '2 weeks email Q&A', 'Completion certificate'], ctaLabel: 'Book a session' },
    { name: '2 people', price: 'CHF 300', cadence: 'Per hour', description: 'Paired training for two colleagues.', features: ['Everything in 1 person, plus:', 'Shared template library', 'Peer practice', 'Two certificates'], highlighted: true, ctaLabel: 'Book a session' },
    { name: 'Group (3 to 15)', price: 'On request', cadence: 'Half-day or full day', description: 'Team session, on-site or remote, custom programme.', features: ['Everything above, plus:', 'Half-day or full-day format', '10+ branded templates delivered', 'Team workflow setup', 'On-site across Switzerland or remote'], ctaLabel: 'Request a quote' },
  ],
  note: 'All prices in Swiss francs, excluding VAT 8.1%. Group sessions are quoted per project. A half-day is 3 hours training plus 1 hour prep; a full day is 6 plus 2.',
}

export const metadata = buildServiceMetadata({
  title: 'Canva Training Geneva · Brand Kit, AI Magic Studio | DKDP',
  description:
    "Canva training in Geneva. Brand Kit setup, templates, Magic Studio AI, video editing. Build a brand-consistent design system in one day. From CHF 1'500 per half-day.",
  enPath: '/en/corporate-training/canva',
  frPath: '/formation-entreprise/canva',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/canva"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'Canva training · Geneva',
        h1Lead: 'Build a design system',
        h1Highlight: 'in one day.',
        subtitle:
          'Canva Brand Kit, templates, Magic Studio AI, video, presentations, social formats. We turn your team into a small in-house design studio in one focused day.',
        icon: Wand2,
        bullets: [
          { title: 'Brand Kit setup', text: 'Logo, fonts, colours, brand voice synced into Canva. Every team member starts on-brand.' },
          { title: 'Template library', text: 'Social posts, presentations, documents, email banners. Built once, reused forever.' },
          { title: 'Magic Studio AI', text: 'Magic Write, Magic Edit, Magic Design. The new AI features that change everything.' },
          { title: 'Video and motion', text: 'Short-form video for social, motion graphics, animated logos. All inside Canva.' },
          { title: 'Multi-platform export', text: 'Resize for every platform without losing quality. Auto-translate for multi-language content.' },
          { title: 'Team workflow', text: 'Folders, approvals, shared brand assets, comments, version history. The right way to collaborate.' },
        ],
        stats: [
          { value: "CHF 1'500+", label: 'Half-day session' },
          { value: '4-15 people', label: 'Per session' },
          { value: 'Brand Kit', label: 'Live setup included' },
          { value: 'Templates', label: '10+ delivered' },
        ],
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        process: [
          { title: 'Pre-session interview', text: '30-minute call to understand your brand, your needs and your team level.' },
          { title: 'Live Brand Kit setup', text: 'We set up your logo, fonts, colours and brand voice in Canva during the session.' },
          { title: 'Build your template library', text: '10+ branded templates for social, presentations and documents, ready to reuse.' },
          { title: 'Follow-up Q&A', text: 'Two weeks of free email Q&A after the session.' },
        ],
        pricing: PRICING,
        bridge: {
          title: 'Going further',
          links: [
            { label: 'Web design training', href: '/en/corporate-training/web-design', description: 'Go deeper into design with Figma: UI/UX, wireframes, design systems. From CHF 200/h.' },
            { label: 'Social media training', href: '/en/corporate-training/social-media', description: 'Turn your Canva visuals into a winning social strategy. From CHF 200/h.' },
            { label: 'Video editing training', href: '/en/corporate-training/video-editing', description: 'Produce reels and short-form video for your channels. From CHF 200/h.' },
          ],
        },
        faq: [
          { question: 'How much does Canva training cost?', answer: "CHF 200/hour for one person, CHF 300/hour for two. Group sessions (3 to 15 people) are quoted per project as a half-day or full-day." },
          { question: 'Do you set up our Brand Kit during the session?', answer: 'Yes. We set up your logo, fonts, colours and brand voice live in Canva so every team member starts on-brand from day one.' },
          { question: 'Do we need Canva Pro?', answer: 'Canva Pro unlocks Brand Kit, Magic Studio AI and premium templates. We recommend it and help you choose the right plan during the pre-session call.' },
          { question: 'Is the training in person or online?', answer: 'Both. On-site across Geneva and French-speaking Switzerland, or online via video conference with live exercises. Hybrid format also available.' },
          { question: 'What do participants take home?', answer: 'A personalised completion certificate, 10+ branded templates and a documented team workflow for collaboration in Canva.' },
        ],
        finalTitle: 'Book your Canva training',
        finalText: 'Tell us about your brand and team. We design a tailored agenda, send a fixed quote and run the session in Geneva or remote, in English or French.',
        extraSchemas: [
          buildCourse({
            name: 'Canva Training',
            url: '/en/corporate-training/canva',
            description: 'Hands-on Canva training in Geneva. Brand Kit, templates, Magic Studio AI, video and team workflow. Build a brand-consistent design system in one day.',
            duration: 'PT6H',
            teaches: ['Canva Brand Kit', 'Templates', 'Magic Studio AI', 'Video editing in Canva', 'Multi-platform export', 'Team workflow'],
            prerequisites: 'No design prerequisites',
            priceFrom: 200,
            ratingValue: '4.9',
            ratingCount: 130,
            lang: 'en',
          }),
        ],
      }}
    />
  )
}
