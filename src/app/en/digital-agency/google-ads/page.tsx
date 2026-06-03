import { Megaphone } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildServiceWithLocalBusiness } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'Google Ads Agency Geneva · Profitable Paid Campaigns | DKDP',
  description:
    'Google Ads agency in Geneva. Search, Performance Max, YouTube. Full-funnel ROI reporting, no hidden margins on ad spend. Management fee from CHF 350 per month.',
  enPath: '/en/digital-agency/google-ads',
  frPath: '/agence-digitale/publicite-sea',
  imageAlt: 'Google Ads agency Geneva, profitable paid campaigns by DKDP',
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
          'Google Ads, Bing Ads and YouTube campaigns managed from Geneva. Search, Performance Max, video. No hidden ad agency margins, no vanity reporting. Management from CHF 350/month.',
        icon: Megaphone,
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        problem: {
          title: 'Where ad budgets quietly leak',
          items: [
            { title: 'No conversion tracking', text: 'Without proper tracking, you optimise on clicks, not clients. Half the budget chases traffic that never converts.' },
            { title: 'Performance Max on autopilot', text: 'One unsegmented campaign that Google spends however it likes. We structure asset groups by audience and intent.' },
            { title: 'Agency margin on ad spend', text: 'Most agencies take a percentage of your media budget, so they are incentivised to spend more. We charge a fixed fee.' },
          ],
        },
        bullets: [
          { title: 'Search campaigns built for intent', text: 'Properly structured ad groups, negative keywords from week one, landing pages that match the query.' },
          { title: 'Performance Max done right', text: 'Asset groups segmented by audience, not dumped in one campaign. Daily optimisation, weekly review.' },
          { title: 'YouTube and Display', text: 'Short-form video ads, retargeting, demand-gen campaigns when they fit the funnel.' },
          { title: 'Conversion tracking that works', text: 'Enhanced conversions, server-side GA4, offline conversion uploads. Every metric explained.' },
          { title: 'No hidden margins', text: 'You see the actual spend. We charge a fixed management fee, not a percentage of budget.' },
          { title: 'Landing page alignment', text: 'We make sure the page matches the ad. Often the biggest win is fixing the destination, not the keyword.' },
          { title: 'Monthly ROI report', text: 'Spend, conversions, CAC, ROAS. The metrics that matter, not impressions and clicks.' },
        ],
        stats: [
          { value: 'CHF 350+', label: 'Monthly management fee' },
          { value: '24-48h', label: 'To first traffic' },
          { value: '< 5%', label: 'Wasted spend typical' },
          { value: 'Monthly', label: 'ROI reporting' },
        ],
        process: [
          { title: 'Audit and setup', text: 'Account audit, conversion tracking, GA4 server-side. We fix the foundations before spending a franc.' },
          { title: 'Launch and learn', text: 'Structured campaigns live within 48 hours. First two weeks gather data and prune waste.' },
          { title: 'Optimise daily', text: 'Bids, negatives, ad copy, landing pages adjusted continuously. Budget shifts to what converts.' },
          { title: 'Report and scale', text: 'Monthly ROI report. We scale what works and cut what does not, transparently.' },
        ],
        pricing: {
          title: 'Management fee, your ad spend stays yours',
          subtitle: 'You always own the account and the media budget. We charge a fixed management fee on top, never a percentage of spend.',
          tiers: [
            { name: 'Starter', price: 'CHF 350', cadence: 'Per month', description: 'A single Search campaign for local intent. Ideal to validate the channel.', features: ['1 Search campaign', 'Conversion tracking setup', 'Negative keyword management', 'Monthly ROI report', 'Min. ad spend CHF 500/month', 'Cancel anytime'], ctaLabel: 'Start with Starter' },
            { name: 'Multi-campaign', price: 'CHF 700', cadence: 'Per month', description: 'Search plus Performance Max or YouTube, for growth-stage SMBs.', features: ['Everything in Starter, plus:', 'Search + Performance Max', 'YouTube or Display option', 'Landing page recommendations', 'Bi-weekly optimisation calls', 'Server-side GA4 tracking'], highlighted: true, ctaLabel: 'Start with Multi-campaign' },
            { name: 'Full management', price: "CHF 1'200", cadence: 'Per month', description: 'Full-funnel paid strategy across channels for competitive markets.', features: ['Everything in Multi-campaign, plus:', 'Full-funnel campaign strategy', 'Retargeting and demand-gen', 'Offline conversion uploads', 'A/B testing programme', 'Weekly reporting and calls'], ctaLabel: 'Talk to us' },
          ],
          note: 'All prices in Swiss francs, excluding VAT 8.1%. Ad spend (media budget) is billed separately by Google, directly to you. Minimum recommended ad spend CHF 500/month.',
        },
        comparison: {
          title: 'Google Ads vs SEO, when to pick which',
          subtitle: 'Both work. The right answer is usually both, with a clear priority based on your stage.',
          headers: ['Google Ads', 'SEO'],
          rows: [
            { label: 'Time to first leads', values: ['24 to 48 hours', '8 to 12 weeks'], emphasizeColumn: 0 },
            { label: 'Cost per lead, month 6+', values: ['Stays roughly flat', 'Compounds downward'], emphasizeColumn: 1 },
            { label: 'Stops when you stop paying', values: ['Yes', 'No, builds an asset'], emphasizeColumn: 1 },
            { label: 'Best when launching', values: ['Fast validation', 'Slow start'], emphasizeColumn: 0 },
            { label: 'Geographic precision', values: ['Excellent', 'Excellent for local'] },
            { label: 'Best for long-term moat', values: ['No', 'Yes, defensible'], emphasizeColumn: 1 },
          ],
        },
        testimonials: [
          { quote: 'DKDP rebuilt our tracking, restructured Performance Max and cut wasted spend from 30% to under 5%. Cost per lead dropped 60% in two months, on the same budget.', author: 'Marketing Manager', role: 'B2B services, Geneva' },
          { quote: 'The fixed management fee changed everything. No more incentive to push budget. They actually told us to spend less on one campaign. That honesty earned our trust.', author: 'Founder', role: 'E-commerce, Lausanne' },
          { quote: 'We launched a YouTube demand-gen campaign for a product launch. Tracked through to revenue, ROAS 4.2. The monthly report is the only one our CEO reads.', author: 'Head of Growth', role: 'Swiss SaaS' },
        ],
        bridge: {
          title: 'Going further with DKDP',
          links: [
            { label: 'SEO and AI search', href: '/en/digital-agency/seo', description: 'Buy time with Ads while SEO compounds. A monthly retainer builds defensible organic traffic. From CHF 600/month.' },
            { label: 'Web design', href: '/en/digital-agency/web-design', description: 'Ads only convert if the landing page does. Fast, conversion-focused pages. From CHF 2\'500.' },
            { label: 'Social media', href: '/en/digital-agency/social-media', description: 'Extend reach to LinkedIn, Instagram and TikTok with paid amplification. From CHF 450/month.' },
          ],
        },
        faq: [
          { question: 'How much should we budget for Google Ads?', answer: "Highly business-dependent. For a Geneva SMB targeting local intent, a meaningful test budget starts around CHF 500 to 1'500 per month of ad spend, on top of the management fee from CHF 350. We can run a 30-day pilot to validate before scaling." },
          { question: 'How does your fee work?', answer: 'A fixed monthly management fee from CHF 350, not a percentage of your ad spend. Your media budget is billed by Google directly to you. This removes any incentive for us to push you to spend more.' },
          { question: 'Do you also handle Meta Ads (Facebook, Instagram)?', answer: 'We focus on Google Ads where buying intent is highest. Meta is in scope through our Social Media service or through partner agencies. We are upfront when another channel would serve you better.' },
          { question: 'Can we keep our existing Google Ads account?', answer: 'Yes, we work as managers on your account. You always own the account, the data and the campaigns. If you ever stop with us, everything stays with you.' },
          { question: 'How fast will we see results?', answer: 'Traffic starts within 24 to 48 hours of launch. The first two weeks gather data and prune waste. Stable, optimised performance typically settles in within 4 to 6 weeks.' },
          { question: 'What is included in the monthly report?', answer: 'Spend, conversions, cost per acquisition, ROAS, top campaigns and a plain-English commentary with next steps. No impression-and-click vanity dashboards.' },
        ],
        finalTitle: 'Free Google Ads audit',
        finalText: 'Share your account or your goals. We send back an audit of wasted spend, tracking gaps and quick wins, plus a fixed-fee proposal. No commitment.',
        extraSchemas: [
          buildServiceWithLocalBusiness({
            name: 'Google Ads management Geneva',
            url: '/en/digital-agency/google-ads',
            description: 'Google Ads, Bing Ads and YouTube campaign management in Geneva for Swiss SMBs. Search, Performance Max, video. Fixed management fee, no margin on ad spend.',
            serviceType: 'Google Ads management',
            priceFrom: 350,
            lang: 'en',
            extraAreas: ['Zurich', 'Basel', 'Bern'],
          }),
        ],
      }}
    />
  )
}
