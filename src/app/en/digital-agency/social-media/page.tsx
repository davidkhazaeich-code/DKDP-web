import { Share2 } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildServiceWithLocalBusiness } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'Social Media Agency Geneva · LinkedIn, Instagram, TikTok | DKDP',
  description:
    'Social media management in Geneva. LinkedIn, Instagram, TikTok content and community management. Brand-consistent, engagement-focused. From CHF 450/month.',
  enPath: '/en/digital-agency/social-media',
  frPath: '/agence-digitale/reseaux-sociaux',
  imageAlt: 'Social media agency Geneva, LinkedIn Instagram TikTok by DKDP',
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
          'LinkedIn, Instagram and TikTok management from Geneva. Strategy, content production, community management, paid amplification. Consistent, engaging, on-brand. From CHF 450/month.',
        icon: Share2,
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        problem: {
          title: 'Why most SMB social accounts go quiet',
          items: [
            { title: 'No time to post consistently', text: 'The account starts strong, then stalls when the founder gets busy. We keep it alive with a steady, planned content flow.' },
            { title: 'Same content on every platform', text: 'LinkedIn is not Instagram is not TikTok. Copy-pasting kills reach. We tailor format and tone per platform.' },
            { title: 'Engagement but no leads', text: 'Likes that never become clients. We connect content to a funnel so social actually drives pipeline.' },
          ],
        },
        bullets: [
          { title: 'Content strategy per platform', text: 'LinkedIn for B2B, Instagram for craft, TikTok for reach. No copy-paste across platforms.' },
          { title: 'Production in plain sight', text: 'Photo, short-form video, motion graphics produced weekly. You see the work, not a black box.' },
          { title: 'Platform expertise', text: 'LinkedIn, Instagram, TikTok, Facebook, YouTube. We focus where your audience actually is.' },
          { title: 'Community management', text: 'Inbox triage, replies, DMs handled by humans who understand your brand voice.' },
          { title: 'Paid amplification', text: 'Targeted ads on LinkedIn, Meta and TikTok to boost what already performs organically.' },
          { title: 'Brand voice consistency', text: 'A documented tone of voice your team can also use, not a moving target.' },
          { title: 'Monthly performance review', text: 'Reach, engagement, leads, top-performing posts. The numbers that matter, not vanity metrics.' },
        ],
        stats: [
          { value: 'CHF 450+', label: 'Monthly retainer' },
          { value: '8-15 posts', label: 'Per platform, per month' },
          { value: '< 4h', label: 'Average reply time' },
          { value: 'Monthly', label: 'Performance review' },
        ],
        process: [
          { title: 'Strategy and brand voice', text: 'We define platforms, pillars and tone of voice, documented so it stays consistent.' },
          { title: 'Content calendar', text: 'A monthly calendar you approve before anything goes live. No surprises, no off-brand posts.' },
          { title: 'Produce and publish', text: 'Photo, video, motion graphics produced and scheduled. Community managed daily.' },
          { title: 'Review and amplify', text: 'Monthly review of what worked. We boost top performers with paid amplification.' },
        ],
        pricing: {
          title: 'Three monthly packages',
          subtitle: 'Pick the cadence that matches your ambition. Switch up or down at any time.',
          tiers: [
            { name: 'Starter', price: 'CHF 450', cadence: 'Per month', description: 'One platform, a steady content flow to keep your presence alive and growing.', features: ['1 platform', '8 posts per month', 'Content calendar', 'Basic community management', 'Monthly performance report', 'Cancel anytime'], ctaLabel: 'Start with Starter' },
            { name: 'Pro', price: 'CHF 900', cadence: 'Per month', description: 'Two platforms with richer production and active community management.', features: ['Everything in Starter, plus:', '2 platforms', '12 posts per month', 'Short-form video production', 'Active community management', 'Brand voice document'], highlighted: true, ctaLabel: 'Start with Pro' },
            { name: 'Full Social', price: "CHF 1'600", cadence: 'Per month', description: 'Full multi-platform presence with paid amplification and reporting.', features: ['Everything in Pro, plus:', 'Up to 3 platforms', '12+ posts per month', 'Paid amplification management', 'Influencer and UGC coordination', 'Bi-weekly strategy calls'], ctaLabel: 'Talk to us' },
          ],
          note: 'All prices in Swiss francs, excluding VAT 8.1%. Paid media budget is billed separately. No long-term commitment.',
        },
        testimonials: [
          { quote: 'DKDP took our dormant LinkedIn and turned it into a real lead channel. Consistent posting, sharp positioning. We now get inbound from posts, not just ads.', author: 'Founder', role: 'B2B consultancy, Geneva' },
          { quote: 'The Instagram and TikTok content finally looks like a 2026 brand. Reach tripled in three months and our shop sees the traffic spike after every reel.', author: 'Owner', role: 'Geneva lifestyle shop' },
          { quote: 'They built a documented brand voice we use internally too. Community management is fast and on-tone. It feels like an in-house team, not an agency.', author: 'Marketing Lead', role: 'Swiss SME' },
        ],
        bridge: {
          title: 'Going further with DKDP',
          links: [
            { label: 'Video production', href: '/en/digital-agency/video-production', description: 'Level up your social content with brand films and reels shot by professionals. From CHF 800.' },
            { label: 'Google Ads', href: '/en/digital-agency/google-ads', description: 'Capture high-intent search demand alongside social reach. Fixed management fee. From CHF 350/month.' },
            { label: 'Social media training', href: '/en/corporate-training/social-media', description: 'Want your team to run social in-house? We train them on LinkedIn, Instagram and TikTok.' },
          ],
        },
        faq: [
          { question: 'Which platforms do you cover?', answer: 'LinkedIn, Instagram and TikTok primarily. Facebook, X and YouTube available on request. We do not recommend trying to cover every platform, better to nail two than dilute across five.' },
          { question: 'How much does social media management cost?', answer: "Our Starter package is CHF 450/month for one platform with 8 posts. Pro is CHF 900/month for two platforms. Full Social is CHF 1'600/month for the complete multi-platform presence. Paid media budget is separate." },
          { question: 'Do we provide content or do you produce it?', answer: 'Both options work. Most clients let us produce 80% of the content (writing, photo, video) and provide raw material we adapt. Some prefer to write and let us handle production and posting.' },
          { question: 'What about paid social ads?', answer: 'Included as an option in the Full Social package. Once organic content is working, we boost top performers and run targeted campaigns on LinkedIn or Meta. Paid budget is on top of the management fee.' },
          { question: 'How many posts per month?', answer: '8 on Starter, 12 on Pro and 12+ on Full Social, per platform. We prioritise quality and consistency over volume, with formats tailored to each platform.' },
          { question: 'How do you measure success?', answer: 'Reach, engagement rate, follower growth, link clicks and, most importantly, leads attributed to social. Monthly report with the top-performing posts and a plain-English read on what to do next.' },
        ],
        finalTitle: 'Free social media audit',
        finalText: 'Share your handles. We send back an audit of your current presence, the quickest wins, and a content direction, plus a fixed-fee proposal. No commitment.',
        extraSchemas: [
          buildServiceWithLocalBusiness({
            name: 'Social media management Geneva',
            url: '/en/digital-agency/social-media',
            description: 'Social media management in Geneva for Swiss SMBs. LinkedIn, Instagram, TikTok strategy, content production, community management and paid amplification.',
            serviceType: 'Social media management',
            priceFrom: 450,
            lang: 'en',
            extraAreas: ['Zurich', 'Basel', 'Bern'],
          }),
        ],
      }}
    />
  )
}
