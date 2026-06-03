import { Film } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildCourse } from '@/lib/schema'

const PRICING = {
  title: 'Hourly rate scaled to your group',
  subtitle: 'Price depends on the number of participants. The programme is tailored to your team.',
  tiers: [
    { name: '1 person', price: 'CHF 200', cadence: 'Per hour', description: 'One-to-one coaching on the editing tool of your choice.', features: ['Personalised agenda', 'Your real footage', 'Take-home presets and templates', '2 weeks email Q&A', 'Completion certificate'], ctaLabel: 'Book a session' },
    { name: '2 people', price: 'CHF 300', cadence: 'Per hour', description: 'Paired training for two colleagues.', features: ['Everything in 1 person, plus:', 'Shared project workflow', 'Peer practice', 'Two certificates'], highlighted: true, ctaLabel: 'Book a session' },
    { name: 'Group (3 to 8)', price: 'On request', cadence: 'Half-day or full day', description: 'Team session, on-site or remote, custom programme.', features: ['Everything above, plus:', 'Half-day or full-day format', 'Team editing workflow', 'Brand templates and presets', 'On-site across Switzerland or remote'], ctaLabel: 'Request a quote' },
  ],
  note: 'All prices in Swiss francs, excluding VAT 8.1%. Group sessions are quoted per project. We adapt to Premiere Pro, DaVinci Resolve or CapCut.',
}

export const metadata = buildServiceMetadata({
  title: 'Video Editing Training Geneva · Premiere, DaVinci | DKDP',
  description:
    "Video editing training in Geneva. Premiere Pro, DaVinci Resolve, CapCut on phone. Produce shareable, brand-aligned videos. From CHF 1'500 per half-day.",
  enPath: '/en/corporate-training/video-editing',
  frPath: '/formation-entreprise/montage-video',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/video-editing"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'Video editing · Geneva',
        h1Lead: 'Edit videos that',
        h1Highlight: 'people watch through.',
        subtitle:
          'Hands-on video editing training. Premiere Pro, DaVinci Resolve or CapCut on phone. Produce shareable, brand-aligned videos with the tools your team already has.',
        icon: Film,
        bullets: [
          { title: 'Editing fundamentals', text: 'Cuts, transitions, J/L cuts, pacing. The principles that work on any tool.' },
          { title: 'Sound design that matters', text: 'Music selection, audio cleanup, voice-over, sound effects. Most amateurs ignore this. Big mistake.' },
          { title: 'Colour grading basics', text: 'Lookup tables, scopes, primary corrections. Make footage look intentional, not phone-y.' },
          { title: 'Motion graphics', text: 'Animated text, lower thirds, logo animations, transitions. Without After Effects if possible.' },
          { title: 'Captions and accessibility', text: 'Burned captions for social, accessibility for compliance, multi-language for international.' },
          { title: 'Export for every platform', text: 'Aspect ratios, bitrates, codecs for YouTube, LinkedIn, Instagram, TikTok. No more rejected uploads.' },
        ],
        stats: [
          { value: "CHF 1'500+", label: 'Half-day session' },
          { value: '4-8 people', label: 'Per session' },
          { value: 'Real footage', label: 'Yours or ours' },
          { value: 'Cross-tool', label: 'Premiere, DaVinci, CapCut' },
        ],
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        process: [
          { title: 'Pre-session interview', text: '30-minute call to map your tools, footage and the videos you need to produce.' },
          { title: 'Edit real footage', text: 'We edit your real clips, from cuts to colour to captions, on your chosen tool.' },
          { title: 'Build a reusable workflow', text: 'Presets, templates and an export checklist your team keeps for every future video.' },
          { title: 'Follow-up Q&A', text: 'Two weeks of free email Q&A after the session.' },
        ],
        pricing: PRICING,
        bridge: {
          title: 'Going further',
          links: [
            { label: 'Video production service', href: '/en/digital-agency/video-production', description: 'Prefer us to produce your videos? Brand films, reels, testimonials. From CHF 800.' },
            { label: 'Social media training', href: '/en/corporate-training/social-media', description: 'Learn where and how to post the videos you just edited. From CHF 200/h.' },
            { label: 'Canva training', href: '/en/corporate-training/canva', description: 'Add motion graphics and quick video in Canva. From CHF 200/h.' },
          ],
        },
        faq: [
          { question: 'How much does video editing training cost?', answer: "CHF 200/hour for one person, CHF 300/hour for two. Group sessions (3 to 8 people) are quoted per project as a half-day or full-day." },
          { question: 'Which tool do you teach?', answer: 'Whichever fits your team: Premiere Pro, DaVinci Resolve (free and powerful) or CapCut for phone-first editing. The fundamentals transfer across all three.' },
          { question: 'Do we edit our own footage?', answer: 'Yes. We edit your real clips so you leave with finished videos and a workflow you can repeat, not toy exercises.' },
          { question: 'Do we need a powerful computer?', answer: 'Not necessarily. We can run a phone-first CapCut session, or a desktop session on DaVinci Resolve which is free and works on modest machines.' },
          { question: 'Is the training in person or online?', answer: 'Both. On-site across Geneva and French-speaking Switzerland, or online with live editing. Hybrid format also available.' },
        ],
        finalTitle: 'Book your video editing training',
        finalText: 'Tell us your tool and the videos you need to make. We design a tailored agenda, send a fixed quote and deliver in Geneva or remote, in English or French.',
        extraSchemas: [
          buildCourse({
            name: 'Video Editing Training',
            url: '/en/corporate-training/video-editing',
            description: 'Hands-on video editing training in Geneva. Premiere Pro, DaVinci Resolve or CapCut. Cuts, sound design, colour grading, captions, multi-platform export.',
            duration: 'PT6H',
            teaches: ['Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Sound design', 'Colour grading', 'Captions and export'],
            prerequisites: 'No prerequisites',
            priceFrom: 200,
            ratingValue: '4.9',
            ratingCount: 85,
            lang: 'en',
          }),
        ],
      }}
    />
  )
}
