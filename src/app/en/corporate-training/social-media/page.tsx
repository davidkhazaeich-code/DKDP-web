import { Share2 } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Social Media Training Geneva · LinkedIn, Instagram, TikTok | DKDP',
  description:
    'Social media training in Geneva. Master LinkedIn, Instagram, TikTok and the algorithms that move the needle. Strategy, content, paid ads. From CHF 1,500 per half-day.',
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
          { value: 'CHF 1,500+', label: 'Half-day session' },
          { value: '4-12 people', label: 'Per session' },
          { value: '3 platforms', label: 'LinkedIn, IG, TikTok' },
          { value: 'Templates', label: 'Take-home included' },
        ],
      }}
    />
  )
}
