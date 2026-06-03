import { Search } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'SEO Geneva · Organic Visibility on Google and AI Search | DKDP',
  description:
    'SEO in Geneva for Swiss SMBs. Technical SEO, content, schema, AI search optimisation for ChatGPT, Perplexity, Google AI Overviews. From CHF 800/month.',
  enPath: '/en/digital-agency/seo',
  frPath: '/agence-digitale/seo',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/seo"
      config={{
        pillar: 'agence',
        hubName: 'Digital agency',
        hubHref: '/en/digital-agency',
        tag: 'SEO · Geneva',
        h1Lead: 'Get found on Google',
        h1Highlight: 'and on AI search.',
        subtitle:
          'Modern SEO for Swiss SMBs covers Google but also ChatGPT, Perplexity, Bing Copilot and Google AI Overviews. We rebuild your site\'s foundations so AI engines cite you.',
        icon: Search,
        secondaryCta: 'Free SEO audit',
        secondaryHref: '/en/digital-agency/seo/seo-audit',
        bullets: [
          { title: 'Technical SEO audit', text: 'Crawl, index, schema, Core Web Vitals, internal linking. Real findings, prioritised by impact.' },
          { title: 'Content strategy', text: 'Topic clusters, search intent mapping, content briefs your team or ours can execute on.' },
          { title: 'Schema markup at scale', text: 'Organization, LocalBusiness, FAQ, HowTo, Speakable. Properly validated, kept in sync.' },
          { title: 'AI search optimisation', text: 'Citable passages, llms.txt, AI-readable structure. Track citations in Perplexity and ChatGPT.' },
          { title: 'Geo-targeted local SEO', text: 'Google Business Profile, local citations, schema for every Geneva, Lausanne, Zurich location.' },
          { title: 'Monthly reporting that matters', text: 'Not vanity rankings. Sessions, leads, citations and pipeline impact tracked monthly.' },
        ],
        stats: [
          { value: 'CHF 800+', label: 'Monthly retainer' },
          { value: '90 days', label: 'First ranking moves' },
          { value: '4 platforms', label: 'Google, Bing, ChatGPT, Perplexity' },
          { value: 'Monthly', label: 'Real reporting cadence' },
        ],
        process: [
          { title: 'Audit & baseline', text: 'Crawl your site, your competitors and your AI search visibility. Free.' },
          { title: 'Roadmap & quick wins', text: 'Prioritised 90-day plan. We ship the quick wins in week one.' },
          { title: 'Content & technical work', text: 'Monthly retainer ships content, fixes, schema and outreach in plain sight.' },
          { title: 'Report & iterate', text: 'Monthly report on sessions, leads, citations. We adjust the plan, not the price.' },
        ],
        faq: [
          {
            question: 'How long until we see SEO results?',
            answer:
              'First technical wins (indexation issues, schema, Core Web Vitals) move within 30 days. Content-driven ranking changes start in 60-90 days. Full impact is usually visible in 4-6 months. We report monthly so you see the trend, not just the destination.',
          },
          {
            question: 'Do you optimise for ChatGPT and Perplexity too?',
            answer:
              'Yes. AI search engines have different citation rules than Google: structured passages, clean schema, llms.txt, citable facts. We optimise for both at the same time because the technical foundation is largely shared.',
          },
          {
            question: 'Can we keep our own writers?',
            answer:
              'Absolutely. We can produce content end-to-end, or just deliver briefs and outlines that your team writes. Both options are priced upfront.',
          },
        ],
      }}
    />
  )
}
