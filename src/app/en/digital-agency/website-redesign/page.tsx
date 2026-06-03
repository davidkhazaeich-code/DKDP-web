import { Globe } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Website Redesign Geneva · No SEO Loss, Modern 2026 Design | DKDP',
  description:
    'Website redesign in Geneva with zero SEO loss. URL mapping, 301 redirects, schema and performance overhaul. Modern 2026 design, fully audited before go-live.',
  enPath: '/en/digital-agency/website-redesign',
  frPath: '/agence-digitale/refonte-site-web',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/website-redesign"
      config={{
        pillar: 'agence',
        hubName: 'Digital agency',
        hubHref: '/en/digital-agency',
        tag: 'Website redesign · Geneva',
        h1Lead: 'Modern redesign,',
        h1Highlight: 'zero SEO loss.',
        subtitle:
          'A redesign without losing the rankings, the backlinks or the conversions you spent years building. We map every URL, redirect every page, and audit performance before go-live.',
        icon: Globe,
        bullets: [
          { title: 'URL-to-URL mapping', text: 'Every page on your old site mapped to a destination. Nothing falls through the cracks.' },
          { title: '301 redirects done right', text: 'Permanent redirects from every old slug to its new equivalent. Search Console clean on launch day.' },
          { title: 'Schema and metadata audit', text: 'Existing schema preserved or upgraded, metadata reviewed page by page for the new IA.' },
          { title: 'Performance overhaul', text: 'Core Web Vitals fixed: LCP, INP, CLS measured before and after, no regressions allowed.' },
          { title: 'Modern 2026 visual language', text: 'Updated typography, layout system, motion, accessibility. Brand-aligned, not generic.' },
          { title: 'Staging then surgical cutover', text: 'Built on a staging URL, audited, then switched in under an hour. No downtime windows in business hours.' },
        ],
        stats: [
          { value: '6-10 wks', label: 'Average delivery' },
          { value: 'CHF 10k+', label: 'From, fixed quote' },
          { value: '0%', label: 'SEO drop, monitored' },
          { value: '< 1h', label: 'Cutover downtime' },
        ],
        process: [
          { title: 'SEO + content audit', text: 'Crawl your current site, list every URL, every schema, every ranking keyword. Free report.' },
          { title: 'Mapping & design', text: 'Every URL mapped to a destination. New design proposed for each template family.' },
          { title: 'Build on staging', text: 'New site built on a private URL. You can browse, test, request changes weekly.' },
          { title: 'Cutover & monitor', text: 'Switch DNS, push redirects, watch Search Console for 30 days. We fix what moves.' },
        ],
        faq: [
          {
            question: 'Will we lose Google rankings during the redesign?',
            answer:
              'No, that is the whole point. Every existing URL is mapped to a destination with a 301 redirect. We monitor Search Console for 30 days after launch and fix any drop within 48 hours. We have done this on 50+ sites without measurable SEO loss.',
          },
          {
            question: 'Can we keep our existing CMS?',
            answer:
              'Often yes. If your WordPress, Sanity or Webflow is healthy, we redesign on top of it. If the CMS itself is a bottleneck, we propose a migration and quote it transparently.',
          },
          {
            question: 'What if we want to add new pages too?',
            answer:
              'Standard. A redesign is the best moment to add the pages that were missing on your old structure. We propose a new IA, you approve, we ship.',
          },
        ],
      }}
    />
  )
}
