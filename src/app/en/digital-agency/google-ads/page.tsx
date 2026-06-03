import { Megaphone } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Google Ads Agency Geneva · Profitable Paid Campaigns | DKDP',
  description:
    'Google Ads agency in Geneva. Search, Performance Max, YouTube. Full-funnel ROI reporting, no hidden margins. From CHF 1,200 per month management fee.',
  enPath: '/en/digital-agency/google-ads',
  frPath: '/agence-digitale/publicite-sea',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/google-ads"
      config={{
        pillar: 'agence',
        hubName: 'Digital agency',
        hubHref: '/en/digital-agency',
        tag: 'Google Ads · Geneva',
        h1Lead: 'Paid traffic that',
        h1Highlight: 'actually pays back.',
        subtitle:
          'Google Ads, Bing Ads and YouTube campaigns managed from Geneva. Search, Performance Max, video. No hidden ad agency margins, no vanity reporting.',
        icon: Megaphone,
        bullets: [
          { title: 'Search campaigns built for intent', text: 'Properly structured ad groups, negative keywords from week one, landing pages that match the query.' },
          { title: 'Performance Max done right', text: 'Asset groups segmented by audience, not dumped in one campaign. Daily optimisation, weekly review.' },
          { title: 'YouTube and Display', text: 'Short-form video ads, retargeting, demand-gen campaigns when they fit the funnel.' },
          { title: 'Conversion tracking that works', text: 'Enhanced conversions, server-side GA4, offline conversion uploads. Every metric explained.' },
          { title: 'No hidden margins', text: 'You see the actual spend. We charge a fixed management fee, not a % of budget.' },
          { title: 'Monthly ROI report', text: 'Spend, conversions, CAC, ROAS. The metrics that matter, not impressions and clicks.' },
        ],
        stats: [
          { value: 'CHF 1,200+', label: 'Monthly management' },
          { value: '< 5%', label: 'Wasted spend typical' },
          { value: 'Real-time', label: 'Conversion tracking' },
          { value: 'Monthly', label: 'ROI reporting' },
        ],
        faq: [
          {
            question: 'How much should we budget for Google Ads?',
            answer:
              'Highly business-dependent. For a Geneva SMB targeting local intent, a meaningful test budget starts around CHF 1,500-3,000 per month of ad spend. We can run a 30-day pilot to validate before committing to a larger budget.',
          },
          {
            question: 'Do you also handle Meta Ads (Facebook, Instagram)?',
            answer:
              'We focus on Google Ads where buying intent is highest. Meta is in scope through our Social Media service or through partner agencies. We are upfront when another channel would serve you better.',
          },
          {
            question: 'Can we keep our existing Google Ads account?',
            answer:
              'Yes, we work as managers on your account. You always own the account, the data and the campaigns. If you ever stop with us, everything stays with you.',
          },
        ],
      }}
    />
  )
}
