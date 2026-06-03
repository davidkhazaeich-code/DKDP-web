import { Share2 } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Social Media Agency Geneva · LinkedIn, Instagram, TikTok | DKDP',
  description:
    'Social media management in Geneva. LinkedIn, Instagram, TikTok content production and community management. Brand-consistent, engagement-focused. From CHF 1,500 per month.',
  enPath: '/en/digital-agency/social-media',
  frPath: '/agence-digitale/reseaux-sociaux',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/social-media"
      config={{
        pillar: 'agence',
        hubName: 'Digital agency',
        hubHref: '/en/digital-agency',
        tag: 'Social media · Geneva',
        h1Lead: 'A social presence',
        h1Highlight: 'people remember.',
        subtitle:
          'LinkedIn, Instagram and TikTok management from Geneva. Strategy, content production, community management, paid amplification. Consistent, engaging, on-brand.',
        icon: Share2,
        bullets: [
          { title: 'Content strategy per platform', text: 'LinkedIn for B2B, Instagram for craft, TikTok for reach. No copy-paste across platforms.' },
          { title: 'Production in plain sight', text: 'Photo, short-form video, motion graphics produced weekly. You see the work, not a black box.' },
          { title: 'Community management', text: 'Inbox triage, replies, DMs handled by humans who understand your brand voice.' },
          { title: 'Paid amplification', text: 'Targeted ads on LinkedIn, Meta and TikTok to boost what already performs organically.' },
          { title: 'Brand voice consistency', text: 'A documented tone of voice your team can also use, not a moving target.' },
          { title: 'Monthly performance review', text: 'Reach, engagement, leads, top-performing posts. The numbers that matter, not vanity metrics.' },
        ],
        stats: [
          { value: 'CHF 1,500+', label: 'Monthly retainer' },
          { value: '8-15 posts', label: 'Per platform, per month' },
          { value: '< 4h', label: 'Average reply time' },
          { value: 'Monthly', label: 'Performance review' },
        ],
        faq: [
          {
            question: 'Which platforms do you cover?',
            answer:
              'LinkedIn, Instagram and TikTok primarily. Facebook, X and YouTube available on request. We do not recommend trying to cover every platform — better to nail two than dilute across five.',
          },
          {
            question: 'Do we provide content or do you produce it?',
            answer:
              'Both options work. Most clients let us produce 80% of the content (writing, photo, video) and provide raw material we adapt. Some prefer to write and let us handle production and posting.',
          },
          {
            question: 'What about paid social ads?',
            answer:
              'Included as an option. Once organic content is working, we can boost top performers and run targeted campaigns on LinkedIn or Meta. Paid budget is on top of the management fee.',
          },
        ],
      }}
    />
  )
}
