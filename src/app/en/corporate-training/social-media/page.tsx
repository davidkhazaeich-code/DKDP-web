import { Share2 } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildCourse } from '@/lib/schema'

const PRICING = {
  title: 'Hourly rate scaled to your group',
  subtitle: 'Price depends on the number of participants. The programme is tailored to your team.',
  tiers: [
    { name: '1 person', price: 'CHF 200', cadence: 'Per hour', description: 'One-to-one coaching, tailored to your platforms and goals.', features: ['Personalised agenda', 'Your real accounts', 'Take-home content templates', '2 weeks email Q&A', 'Completion certificate'], ctaLabel: 'Book a session' },
    { name: '2 people', price: 'CHF 300', cadence: 'Per hour', description: 'Paired training for two colleagues.', features: ['Everything in 1 person, plus:', 'Shared content calendar', 'Peer practice', 'Two certificates'], highlighted: true, ctaLabel: 'Book a session' },
    { name: 'Group (3 to 12)', price: 'On request', cadence: 'Half-day or full day', description: 'Team session, on-site or remote, custom programme.', features: ['Everything above, plus:', 'Half-day or full-day format', 'Team content calendar', 'Brand voice workshop', 'On-site across Switzerland or remote'], ctaLabel: 'Request a quote' },
  ],
  note: 'All prices in Swiss francs, excluding VAT 8.1%. Group sessions are quoted per project.',
}

export const metadata = buildServiceMetadata({
  title: 'Social Media Training Geneva · LinkedIn, Instagram, TikTok | DKDP',
  description:
    "Social media training in Geneva. Master LinkedIn, Instagram, TikTok and the algorithms that move the needle. Strategy, content, paid ads. From CHF 1'500 per half-day.",
  enPath: '/en/corporate-training/social-media',
  frPath: '/formation-entreprise/reseaux-sociaux',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/social-media"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'Social media training · Geneva',
        h1Lead: 'Master the platforms',
        h1Highlight: 'that move the needle.',
        subtitle:
          'Strategy, content production, paid amplification, community management. We train your team on the social platforms that actually convert for your business.',
        icon: Share2,
        bullets: [
          { title: 'LinkedIn for B2B', text: 'Personal branding, employee advocacy, lead-gen forms, content cadence that ranks in the feed.' },
          { title: 'Instagram for craft', text: 'Reels, carousels, stories, highlights, hashtag strategy. The mix that actually works in 2026.' },
          { title: 'TikTok for reach', text: 'Hooks, native formats, trends, paid amplification. Yes, B2B works on TikTok too if done right.' },
          { title: 'Content production basics', text: 'Phone-first video, copywriting that hooks, basic design with Canva. No fancy gear needed.' },
          { title: 'Paid social fundamentals', text: 'Audience targeting, creative testing, budget allocation. Stop boosting random posts.' },
          { title: 'Algorithm-aware editorial', text: 'How each platform really decides what to show. Practical takeaways, not conspiracy theories.' },
        ],
        stats: [
          { value: "CHF 1'500+", label: 'Half-day session' },
          { value: '4-12 people', label: 'Per session' },
          { value: '3 platforms', label: 'LinkedIn, IG, TikTok' },
          { value: 'Templates', label: 'Take-home included' },
        ],
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        process: [
          { title: 'Pre-session interview', text: '30-minute call to map your platforms, audience and goals.' },
          { title: 'Work on your accounts', text: 'We audit and improve your real profiles, not fictional examples.' },
          { title: 'Build a content calendar', text: 'A reusable content calendar and templates your team keeps and runs.' },
          { title: 'Follow-up Q&A', text: 'Two weeks of free email Q&A after the session.' },
        ],
        pricing: PRICING,
        bridge: {
          title: 'Going further',
          links: [
            { label: 'Social media service', href: '/en/digital-agency/social-media', description: 'Prefer us to run your social media for you? From CHF 450/month.' },
            { label: 'Video editing training', href: '/en/corporate-training/video-editing', description: 'Produce the reels and short-form video your social needs. From CHF 200/h.' },
            { label: 'Canva training', href: '/en/corporate-training/canva', description: 'Create scroll-stopping social visuals fast. From CHF 200/h.' },
          ],
        },
        faq: [
          { question: 'How much does social media training cost?', answer: "CHF 200/hour for one person, CHF 300/hour for two. Group sessions (3 to 12 people) are quoted per project as a half-day or full-day." },
          { question: 'Which platforms do you cover?', answer: 'LinkedIn, Instagram and TikTok primarily, with Facebook and YouTube on request. We focus on the platforms that actually convert for your business rather than spreading thin.' },
          { question: 'Do we work on our real accounts?', answer: 'Yes. We audit and improve your real profiles and build a content calendar you keep, so the skills transfer directly to your daily work.' },
          { question: 'Does B2B really work on TikTok?', answer: 'Yes, when done right. We cover hooks, native formats and trends adapted to B2B, plus how each algorithm decides what to show.' },
          { question: 'Is the training in person or online?', answer: 'Both. On-site across Geneva and French-speaking Switzerland, or online with live exercises. Hybrid format also available.' },
        ],
        finalTitle: 'Book your social media training',
        finalText: 'Tell us your platforms and goals. We design a tailored agenda, send a fixed quote and deliver in Geneva or remote, in English or French.',
        extraSchemas: [
          buildCourse({
            name: 'Social Media Training',
            url: '/en/corporate-training/social-media',
            description: 'Hands-on social media training in Geneva. LinkedIn, Instagram, TikTok strategy, content production, paid amplification and algorithm-aware editorial.',
            duration: 'PT6H',
            teaches: ['LinkedIn', 'Instagram', 'TikTok', 'Content production', 'Paid social', 'Social media strategy'],
            prerequisites: 'No prerequisites',
            priceFrom: 200,
            ratingValue: '4.9',
            ratingCount: 100,
            lang: 'en',
          }),
        ],
      }}
    />
  )
}
