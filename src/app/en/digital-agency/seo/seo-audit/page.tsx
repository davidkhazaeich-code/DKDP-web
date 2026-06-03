import { BarChart2 } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Free SEO Audit · Geneva | DKDP',
  description:
    'Free SEO audit for Swiss SMBs. Real findings on technical SEO, content gaps, AI search visibility, schema. Delivered in 48 hours, yours to keep, no commitment.',
  enPath: '/en/digital-agency/seo/seo-audit',
  frPath: '/agence-digitale/seo/audit-seo',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/seo/seo-audit"
      config={{
        pillar: 'agence',
        hubName: 'SEO',
        hubHref: '/en/digital-agency/seo',
        tag: 'Free SEO audit · 48h delivery',
        h1Lead: 'Free SEO audit,',
        h1Highlight: 'no fluff.',
        subtitle:
          'A real SEO audit delivered in 48 hours. Not an automated report dump. We crawl, we look, we prioritise. Yours to keep with no commitment, useful even if you decide not to engage with us.',
        icon: BarChart2,
        primaryCta: 'Request my audit',
        bullets: [
          { title: 'Technical health', text: 'Crawl, index, schema, redirects, Core Web Vitals, internal linking. Real findings, prioritised.' },
          { title: 'Content gap analysis', text: 'What your competitors rank for that you do not. Where the easy wins are.' },
          { title: 'AI search visibility', text: 'Are you cited by ChatGPT, Perplexity, Google AI Overviews on your top queries? We check.' },
          { title: 'Local SEO', text: 'Google Business Profile, citations, schema for every Geneva, Lausanne, Zurich location.' },
          { title: 'Backlink profile', text: 'Quality, anchors, toxic links. We flag the risks and the unclaimed opportunities.' },
          { title: 'Prioritised action plan', text: 'Top 10 actions ranked by impact and effort. You can execute it yourself or hire anyone.' },
        ],
        finalTitle: 'Get your free SEO audit',
        finalText: 'Send us your URL. We deliver the audit within 48 hours, in plain English, with no obligation.',
      }}
    />
  )
}
