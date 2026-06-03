import { BarChart2 } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildService } from '@/lib/schema'

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
        stats: [
          { value: 'Free', label: 'No commitment' },
          { value: '48 hours', label: 'Delivery' },
          { value: 'Top 10', label: 'Prioritised actions' },
          { value: 'Yours', label: 'To keep' },
        ],
        process: [
          { title: 'Send your URL', text: 'Tell us your site and your top target keywords. That is all we need to start.' },
          { title: 'We crawl and look', text: 'A senior consultant runs the crawl, checks AI search visibility and reviews your competitors. By hand, not just a tool.' },
          { title: 'We prioritise', text: 'We turn the findings into a top-10 action plan ranked by impact and effort.' },
          { title: 'You receive the PDF', text: 'Within 48 hours, a real report in plain English. Yours to keep, useful even if you never hire us.' },
        ],
        bridge: {
          title: 'After the audit',
          links: [
            { label: 'SEO and AI search', href: '/en/digital-agency/seo', description: 'Ready to execute? A monthly retainer covering Google and AI search. From CHF 600/month.' },
            { label: 'Website redesign', href: '/en/digital-agency/website-redesign', description: 'If the audit shows deep technical debt, a rebuild without SEO loss. From CHF 3\'900.' },
            { label: 'Free website audit', href: '/en/digital-agency/web-design/site-audit', description: 'Want the design and UX checked too? A free site audit in 48 hours.' },
          ],
        },
        faq: [
          { question: 'Is the SEO audit really free?', answer: 'Yes, genuinely free and yours to keep, with no obligation to engage. It is useful even if you decide to execute it yourself or with another agency.' },
          { question: 'What does the audit include?', answer: 'Technical crawl (errors, redirects, Core Web Vitals), schema, content gap analysis vs competitors, AI search visibility (ChatGPT, Perplexity, Google AI Overviews), local SEO, backlink profile, and a prioritised top-10 action plan.' },
          { question: 'How fast do you deliver it?', answer: 'Within 48 hours of receiving your URL and target keywords. A real report from a senior consultant, not an automated tool dump.' },
          { question: 'Why is it not just an automated report?', answer: 'Automated tools flag hundreds of issues with no priority. A senior consultant looks at what actually matters for your business and ranks the top 10 by impact and effort.' },
          { question: 'Do you cover AI search (GEO)?', answer: 'Yes. We check whether you are cited by ChatGPT, Perplexity and Google AI Overviews on your top queries, and what it would take to get cited. Few audits do this.' },
        ],
        finalTitle: 'Get your free SEO audit',
        finalText: 'Send us your URL and your target keywords. We deliver the audit within 48 hours, in plain English, with no obligation.',
        extraSchemas: [
          buildService({
            name: 'Free SEO audit',
            url: '/en/digital-agency/seo/seo-audit',
            description: 'Free SEO audit for Swiss SMBs in Geneva. Technical SEO, content gaps, AI search visibility, local SEO, backlinks, prioritised action plan. Delivered in 48 hours.',
            lang: 'en',
          }),
        ],
      }}
    />
  )
}
