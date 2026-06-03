import { Palette } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildCourse } from '@/lib/schema'

const PRICING = {
  title: 'Hourly rate scaled to your group',
  subtitle: 'Price depends on the number of participants. The programme is tailored to your team.',
  tiers: [
    { name: '1 person', price: 'CHF 200', cadence: 'Per hour', description: 'One-to-one coaching on Figma, tailored to your level.', features: ['Personalised agenda', 'Real briefs from your business', 'Take-home Figma templates', '2 weeks email Q&A', 'Completion certificate'], ctaLabel: 'Book a session' },
    { name: '2 people', price: 'CHF 300', cadence: 'Per hour', description: 'Paired training for two colleagues.', features: ['Everything in 1 person, plus:', 'Shared design system', 'Peer practice', 'Two certificates'], highlighted: true, ctaLabel: 'Book a session' },
    { name: 'Group (3 to 10)', price: 'On request', cadence: 'Half-day or full day', description: 'Team session, on-site or remote, custom programme.', features: ['Everything above, plus:', 'Half-day or full-day format', 'Team design system setup', 'Developer handoff workflow', 'On-site across Switzerland or remote'], ctaLabel: 'Request a quote' },
  ],
  note: 'All prices in Swiss francs, excluding VAT 8.1%. Group sessions are quoted per project. A half-day is 3 hours training plus 1 hour prep; a full day is 6 plus 2.',
}

export const metadata = buildServiceMetadata({
  title: 'Web Design Training with Figma · Geneva | DKDP',
  description:
    "Web design training in Geneva with Figma. UI/UX, wireframes, design systems, interactive prototypes. Real client briefs, real deliverables. From CHF 1'500 per half-day.",
  enPath: '/en/corporate-training/web-design',
  frPath: '/formation-entreprise/web-design',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/web-design"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'Web design training · Geneva',
        h1Lead: 'Web design with Figma,',
        h1Highlight: 'from zero to system.',
        subtitle:
          'Hands-on Figma training: UI/UX fundamentals, wireframes, design systems, interactive prototypes. We work on real briefs from your business, not toy exercises.',
        icon: Palette,
        bullets: [
          { title: 'UI/UX fundamentals', text: 'Hierarchy, spacing, typography, colour. The principles every web designer needs.' },
          { title: 'Wireframing fast', text: 'Low-fi sketches to high-fi mockups. Iteration loops that move quickly.' },
          { title: 'Design systems', text: 'Tokens, components, variants, auto-layout. Build once, reuse everywhere.' },
          { title: 'Interactive prototypes', text: 'Click-through prototypes for stakeholder review and user testing. No code required.' },
          { title: 'Handoff to development', text: 'Annotations, design specs, code snippets, asset export. Clean handoff to developers.' },
          { title: 'AI inside Figma', text: 'Figma AI, third-party plugins, prompt-driven design. The new workflows that save hours.' },
        ],
        stats: [
          { value: "CHF 1'500+", label: 'Half-day session' },
          { value: '4-10 people', label: 'Per session' },
          { value: 'Real briefs', label: 'From your business' },
          { value: 'Take-home', label: 'Templates included' },
        ],
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        process: [
          { title: 'Pre-session interview', text: '30-minute call to map your team level and the kind of design work you do.' },
          { title: 'Work on real briefs', text: 'We design real screens from your business, from wireframe to interactive prototype.' },
          { title: 'Build a design system', text: 'Tokens, components and auto-layout your team reuses on every future project.' },
          { title: 'Follow-up Q&A', text: 'Two weeks of free email Q&A after the session.' },
        ],
        pricing: PRICING,
        bridge: {
          title: 'Going further',
          links: [
            { label: 'Canva training', href: '/en/corporate-training/canva', description: 'Prefer a faster, template-driven tool for non-designers? Canva training. From CHF 200/h.' },
            { label: 'Web design service', href: '/en/digital-agency/web-design', description: 'Want us to design and build the site for you? From CHF 2\'500.' },
            { label: 'Corporate AI training', href: '/en/corporate-training/ai', description: 'Add AI design workflows to your toolkit. From CHF 200/h.' },
          ],
        },
        faq: [
          { question: 'How much does web design training cost?', answer: "CHF 200/hour for one person, CHF 300/hour for two. Group sessions (3 to 10 people) are quoted per project as a half-day or full-day." },
          { question: 'Do we need Figma experience?', answer: 'No. We start from the fundamentals (hierarchy, spacing, typography) and build up to design systems and prototypes. Suitable for beginners and intermediates.' },
          { question: 'Do we work on real projects?', answer: 'Yes. We design real screens from your business, not toy exercises, so the skills transfer directly to your work.' },
          { question: 'Is the training in person or online?', answer: 'Both. On-site across Geneva and French-speaking Switzerland, or online via video conference with live exercises. Hybrid format also available.' },
          { question: 'What do participants take home?', answer: 'A personalised completion certificate, Figma templates and a starter design system your team can reuse on future projects.' },
        ],
        finalTitle: 'Book your web design training',
        finalText: 'Tell us your team level and goals. We design a tailored agenda, send a fixed quote and run the session in Geneva or remote, in English or French.',
        extraSchemas: [
          buildCourse({
            name: 'Web Design Training with Figma',
            url: '/en/corporate-training/web-design',
            description: 'Hands-on Figma web design training in Geneva. UI/UX fundamentals, wireframes, design systems, interactive prototypes, developer handoff.',
            duration: 'PT6H',
            teaches: ['Figma', 'UI/UX fundamentals', 'Wireframing', 'Design systems', 'Interactive prototypes', 'Developer handoff'],
            prerequisites: 'No design prerequisites',
            priceFrom: 200,
            ratingValue: '4.9',
            ratingCount: 90,
            lang: 'en',
          }),
        ],
      }}
    />
  )
}
