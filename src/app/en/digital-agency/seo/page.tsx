import { Search } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildServiceWithLocalBusiness } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'SEO Geneva and AI Search · Built for Swiss SMBs | DKDP',
  description:
    "SEO and Generative Engine Optimisation (GEO) in Geneva for Swiss SMBs. Technical SEO, content, schema, AI search optimisation for ChatGPT, Perplexity, Google AI Overviews. From CHF 600/month or CHF 1'500 one-time setup.",
  enPath: '/en/digital-agency/seo',
  frPath: '/agence-digitale/seo',
  imageAlt: 'SEO Geneva: organic visibility on Google and AI search engines by DKDP',
  ogImage: '/images/og/seo-geneve.png',
})

const FAQ_ITEMS = [
  {
    question: 'How much does SEO cost in Geneva?',
    answer:
      "DKDP SEO retainers start at CHF 600/month for a showcase site with local targeting. A more ambitious project (e-commerce, Switzerland-wide market) sits between CHF 1'000 and CHF 2'500/month. We always start with a free audit to calibrate effort and timeline. Setup-only packages from CHF 1'500.",
  },
  {
    question: 'How long until I see SEO results?',
    answer:
      'First technical wins (indexation, schema, Core Web Vitals) move within 30 days. Local Geneva keywords typically progress between 6 and 12 weeks. Significant organic traffic and steady leads build over 3 to 6 months. We share a monthly transparent report with the leading and lagging indicators.',
  },
  {
    question: 'What is the difference between SEO and GEO (Generative Engine Optimisation)?',
    answer:
      'SEO (Search Engine Optimisation) targets traditional Google results. GEO targets the answers shown by ChatGPT, Perplexity, Google AI Overviews, Bing Copilot and Claude. GEO requires citable passages, llms.txt files, clean schema and authoritative content. DKDP works both layers in the same retainer because the technical foundation is largely shared.',
  },
  {
    question: 'Do you optimise for ChatGPT and Perplexity citations?',
    answer:
      "Yes. We track citations in Perplexity, ChatGPT search, Google AI Overviews and Bing Copilot every month. Our work includes structured passages, FAQPage and Service schema, a maintained llms.txt, and authoritative content with proper E-E-A-T signals. Several DKDP-built sites are now cited as primary sources by Perplexity on Swiss SMB topics.",
  },
  {
    question: 'What does on-page vs off-page SEO mean?',
    answer:
      'On-page covers everything inside your site: page structure, meta tags, content, Core Web Vitals, internal linking. Off-page concerns the authority of your domain: backlinks, brand mentions, local citations. DKDP works on both axes in every retainer.',
  },
  {
    question: 'Is local SEO different from generic SEO in Switzerland?',
    answer:
      'Local SEO targets geo-located queries like "digital agency Geneva" or "plumber 1207". It includes Google Business Profile optimisation, consistent NAP citations across Swiss directories, and content centred on your service area. Essential for Geneva and Lausanne SMBs serving a local market.',
  },
  {
    question: 'Should I choose between Google Ads and SEO?',
    answer:
      'No. Google Ads buys you immediate visibility while you build SEO authority. SEO is cheaper per lead over 6+ months but takes time to ramp. DKDP typically runs both: Google Ads to test messaging and bring leads on day one, SEO to compound long-term. We can also handle the Ads side or work alongside your existing agency.',
  },
  {
    question: 'Do you handle content production or only briefs?',
    answer:
      'Both. We can produce end-to-end content (research, draft, edit, image generation, SEO optimisation, publish) or deliver detailed briefs for your team to execute. Both options are priced upfront in the engagement letter.',
  },
  {
    question: 'What does a DKDP SEO audit include?',
    answer:
      'Technical crawl (errors, redirects, Core Web Vitals, mobile UX), tag and schema analysis, existing content audit, backlink profile, competitor analysis on your target keywords, and a 90-day prioritised action plan. Free, delivered in 48 hours.',
  },
  {
    question: 'Do you work with sites built on Webflow, Shopify, WordPress, or custom Next.js?',
    answer:
      'All of them. Our team has shipped SEO on WordPress, Webflow, Shopify, Squarespace, Sanity, Strapi, Next.js, Astro and plain HTML. We adapt our tooling and execution to your stack, not the other way around.',
  },
  {
    question: 'Is content also translated to English for international targeting?',
    answer:
      'If you serve international or expat clients in Switzerland, bilingual SEO (FR + EN) is worth it. We can manage both content pipelines, with hreflang and canonical configuration handled cleanly. Our own site dkdp.ch is a working example.',
  },
]

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/seo"
      config={{
        pillar: 'agence',
        hubName: 'Digital agency',
        hubHref: '/en/digital-agency',
        tag: 'SEO and AI search · Geneva',
        h1Lead: 'Get found on Google',
        h1Highlight: 'and on AI search engines.',
        subtitle:
          "Modern SEO covers Google but also ChatGPT, Perplexity, Bing Copilot and Google AI Overviews. We rebuild your site's foundations so search engines and large language models cite you. Built for Swiss SMBs.",
        icon: Search,
        secondaryCta: 'Free SEO audit',
        secondaryHref: '/en/digital-agency/seo/seo-audit',
        problem: {
          title: 'Three reasons your SEO is plateauing',
          items: [
            {
              title: 'You are invisible in AI search',
              text: 'ChatGPT, Perplexity, Google AI Overviews and Bing Copilot now answer 30% of buyer queries. If your site is not structured for citation, your competitors are cited instead. The fix is technical, not editorial.',
            },
            {
              title: 'Your rankings are fragile',
              text: 'Without schema, fast Core Web Vitals and proper internal linking, every Google update wipes out months of work. We rebuild the foundations so updates lift your rankings instead of crushing them.',
            },
            {
              title: 'You are not tracking the right thing',
              text: 'Most agencies report rankings on vanity keywords. We track sessions, qualified leads, AI citations and revenue impact. Vanity rankings do not pay your invoices.',
            },
          ],
        },
        stats: [
          { value: "CHF 600+", label: 'Monthly retainer' },
          { value: '6-12 wks', label: 'Local ranking moves' },
          { value: '4 engines', label: 'Google, Bing, ChatGPT, Perplexity' },
          { value: 'Monthly', label: 'Real reporting cadence' },
        ],
        bullets: [
          { title: 'Technical SEO audit', text: 'Crawl, index, schema, Core Web Vitals, internal linking, mobile UX. Real findings, prioritised by impact, not by what we can charge for.' },
          { title: 'Content strategy', text: 'Topic clusters, search intent mapping, briefs your team or ours can execute on. SEO writing that reads like a senior author wrote it.' },
          { title: 'Schema markup at scale', text: 'Organization, LocalBusiness, FAQ, HowTo, Speakable, Article, Product. Properly validated, kept in sync as the site evolves.' },
          { title: 'AI search optimisation (GEO)', text: 'Citable passages, llms.txt, AI-readable structure. We track citations in Perplexity, ChatGPT search and Google AI Overviews monthly.' },
          { title: 'Local SEO for Geneva and Switzerland', text: 'Google Business Profile, NAP citations on Swiss directories, schema for every Geneva, Lausanne, Zurich or Basel location.' },
          { title: 'Authority and link building', text: 'Quality Swiss-relevant backlinks, brand mentions, directory cleanups, digital PR. No PBNs, no risky shortcuts.' },
          { title: 'Monthly reporting that matters', text: 'Sessions, qualified leads, AI citations, pipeline impact. Tracked monthly with plain-English commentary, not GA4 dumps.' },
          { title: 'Quarterly strategy review', text: 'Every three months we step back: market shifts, competitor moves, channel mix, ROI. The plan adapts, the price does not.' },
        ],
        process: [
          { title: 'Audit and baseline', text: 'Free 48-hour audit covering technical SEO, content, backlinks, GEO. Delivered as a PDF with prioritised actions.' },
          { title: 'Roadmap and quick wins', text: '90-day plan with quick wins shipped in week one (schema, Core Web Vitals, indexation fixes, GBP).' },
          { title: 'Content and technical work', text: 'Monthly retainer ships content, fixes, schema and outreach in plain sight, with a shared Notion or Linear board.' },
          { title: 'Report and iterate', text: 'Monthly report on sessions, leads, AI citations and pipeline. We adjust the plan, not the price.' },
        ],
        pricing: {
          title: 'Three SEO packages, one fixed quote',
          subtitle: 'Pick the package that matches your stage. Switch at any time, no lock-in.',
          tiers: [
            {
              name: 'SEO Setup',
              price: "CHF 1'500",
              cadence: 'One-time setup',
              description: 'For sites that need clean foundations before any monthly work makes sense.',
              features: [
                'Full technical audit + 90-day plan',
                'Schema markup across all key pages',
                'On-page SEO on 10 priority pages',
                'Google Business Profile setup or rescue',
                'llms.txt and AI search readiness',
                '60-day support window included',
              ],
              ctaLabel: 'Start with setup',
            },
            {
              name: 'SEO Monthly',
              price: 'CHF 600',
              cadence: 'Per month, no commitment',
              description: 'Compound results: content, technical fixes, link building, AI citations, monthly reporting.',
              features: [
                'Everything in SEO Setup, plus:',
                '2 long-form articles or briefs per month',
                'OR 1 article + ongoing technical work',
                'Monthly Google + AI search reporting',
                'Quarterly strategy review',
                'Slack or email access to the team',
                'Cancellation anytime, no penalty',
              ],
              highlighted: true,
              ctaLabel: 'Start the retainer',
            },
            {
              name: 'SEO Authority',
              price: "From CHF 1'200",
              cadence: 'Per month',
              description: 'For competitive niches, e-commerce or Switzerland-wide growth ambitions.',
              features: [
                'Everything in SEO Monthly, plus:',
                '4 long-form articles or 2 + 1 study',
                'Active digital PR and link building',
                'AI search benchmarking vs competitors',
                'Conversion rate optimisation included',
                'Bi-weekly strategy and reporting calls',
              ],
              ctaLabel: 'Talk to us',
            },
          ],
          note: "All prices in Swiss francs, excluding VAT 8.1%. Free 48-hour SEO audit included with every engagement. Cancel any monthly retainer at the end of any month with 30 days notice.",
        },
        comparison: {
          title: 'SEO vs Google Ads, when to pick which',
          subtitle: 'Both work. The right answer is usually both, but with a clear priority based on your stage.',
          headers: ['SEO', 'Google Ads'],
          rows: [
            { label: 'Time to first leads', values: ['8 to 12 weeks', '24 to 48 hours'], emphasizeColumn: 1 },
            { label: 'Cost per lead, month 6+', values: ['Compounds downward', 'Stays roughly flat'], emphasizeColumn: 0 },
            { label: 'Compounds over time', values: ['Yes, builds an asset', 'No, stops when you stop paying'], emphasizeColumn: 0 },
            { label: 'AI search citations', values: ['Yes, directly', 'No'], emphasizeColumn: 0 },
            { label: 'Geographic precision', values: ['Excellent for local', 'Excellent for everything'], emphasizeColumn: 1 },
            { label: 'Best when launching', values: ['Slow start', 'Fast validation'], emphasizeColumn: 1 },
            { label: 'Best for long-term moat', values: ['Yes, defensible', 'No, competitors copy easily'], emphasizeColumn: 0 },
          ],
        },
        testimonials: [
          {
            quote:
              'DKDP rebuilt our site, fixed our technical SEO and put us back in Google AI Overviews within four months. Lead volume tripled, cost per acquisition dropped 60%.',
            author: 'Operations Director',
            role: 'Geneva fiduciary, 40 staff',
          },
          {
            quote:
              'We were stuck behind larger competitors for two years. Three months into the DKDP retainer, we are now cited by Perplexity on our core topic. That alone justifies the engagement.',
            author: 'Founder',
            role: 'B2B SaaS, Lausanne',
          },
          {
            quote:
              'The monthly report is the only one I actually read. No fluff, plain numbers, clear next steps. That is rare in this industry.',
            author: 'Head of Marketing',
            role: 'Swiss watch brand, Geneva',
          },
        ],
        bridge: {
          title: 'Going further with DKDP',
          subtitle: 'SEO works best alongside complementary services. We can run them together or pass you a clean brief.',
          links: [
            {
              label: 'Google Ads',
              href: '/en/digital-agency/google-ads',
              description: 'Buy visibility on day one while SEO compounds over months. Fixed management fee, no margin on ad spend.',
            },
            {
              label: 'Corporate AI training',
              href: '/en/corporate-training/ai',
              description: 'Train your team on Claude and ChatGPT so they ship SEO-grade content faster, without losing your tone.',
            },
            {
              label: 'AI chatbot',
              href: '/en/artificial-intelligence/ai-chatbot',
              description: 'Convert your new organic traffic with a 24/7 AI assistant trained on your offering and tone.',
            },
          ],
        },
        faq: FAQ_ITEMS,
        finalTitle: 'Free SEO audit in 48 hours',
        finalText:
          'Tell us your URL and your target market. We send back a real PDF audit with technical findings, content gaps and a prioritised 90-day plan. No pitch, no commitment.',
        extraSchemas: [
          buildServiceWithLocalBusiness({
            name: 'SEO and AI search optimisation',
            url: '/en/digital-agency/seo',
            description:
              "SEO and Generative Engine Optimisation services in Geneva for Swiss SMBs. Technical SEO, content, schema, AI search optimisation for ChatGPT, Perplexity, Google AI Overviews. From CHF 600/month.",
            serviceType: 'SEO and AI search optimisation',
            priceFrom: 600,
            lang: 'en',
            extraAreas: ['Zurich', 'Basel', 'Bern'],
          }),
        ],
      }}
    />
  )
}
