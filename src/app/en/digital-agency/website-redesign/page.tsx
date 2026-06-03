import { Wrench } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildServiceWithLocalBusiness } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'Website Redesign Geneva · No SEO Loss Migration | DKDP',
  description:
    "Rebuild outdated websites in Geneva: modern 2026 design, rethought UX, WordPress or Next.js migration without SEO loss. +240% traffic in 6 months on average. Free audit, 48-hour quote. From CHF 3'900.",
  enPath: '/en/digital-agency/website-redesign',
  frPath: '/agence-digitale/refonte-site-web',
  imageAlt: 'Website redesign Geneva: modern split-screen before-after, Core Web Vitals green, by DKDP',
  ogImage: '/images/og/refonte-site-web.png',
})

const FAQ_ITEMS = [
  {
    question: 'How much does a website redesign cost in Geneva?',
    answer:
      "A showcase site redesign (up to 10 pages) starts at CHF 3'900. A corporate site (10 to 30 pages, multilingual) sits between CHF 7'500 and CHF 18'000. A full e-commerce or custom technical migration is quoted on request. All projects include the pre-redesign SEO audit, the 301 redirect plan, back-office training and 3 months of post-launch support. Fixed quote upfront, no surprises.",
  },
  {
    question: 'How long does a full redesign take?',
    answer:
      'A showcase redesign is delivered in 5 to 8 weeks. A multilingual corporate site takes 10 to 14 weeks. A complex e-commerce migration takes 12 to 16 weeks. A schedule with written validation milestones is shared from the brief.',
  },
  {
    question: 'Will I lose my Google ranking after the redesign?',
    answer:
      "No, when the redesign is done correctly. DKDP starts with a full SEO audit of the existing site: ranking pages, backlinks, active keywords, Core Web Vitals. Every old URL is mapped and 301-redirected to its new equivalent. The H1/H2 structures that perform are preserved. Result across our 14 redesigns in 2024-2026: zero organic traffic loss at launch, +240% average traffic at 12 months.",
  },
  {
    question: 'Should we rebuild everything or migrate what exists?',
    answer:
      'Depends on the technical state. If your WordPress is clean (recent theme, plugins up to date, no tech debt), we can redesign without changing the CMS. If your site is built on obsolete tech, a full migration is needed. DKDP assesses this in the initial audit, no tech bias.',
  },
  {
    question: 'What is the difference between redesign and new build?',
    answer:
      "A new site starts from scratch: new domain, no SEO history, no content to preserve. A redesign concerns an existing site with history (backlinks, indexed pages, ranking content) that must be preserved and improved. Budgets differ: a new site starts at CHF 2'500, a redesign at CHF 3'900 because it includes the SEO audit and redirect plan.",
  },
  {
    question: 'Can we keep our domain and content?',
    answer:
      'Yes, in most cases. We keep the domain, recover the text content via export or scraping if needed, migrate media to the new storage. Main URLs are kept or 301-redirected. If you want to change domain, we handle the full migration with a dedicated SEO strategy.',
  },
  {
    question: 'Will our team be able to edit the new site?',
    answer:
      'Always. Every DKDP redesign is delivered with a back-office adapted to your team: Sanity or Contentful (headless, modern), WordPress (for teams already trained), or Notion (for smaller setups). A 1.5-hour training session is included, plus a video guide.',
  },
  {
    question: 'How does the no-downtime migration work?',
    answer:
      'The new version is built on a password-protected staging environment. When everything is approved, we switch to production during a short maintenance window (15 to 30 minutes, typically a Saturday night). Visitors never see an error page. A rollback plan is ready in case of issues. We monitor the following 24 hours closely.',
  },
  {
    question: 'WordPress redesign or move to Next.js?',
    answer:
      'Depends on your needs. WordPress stays relevant if your team is trained and extreme performance is not critical. Next.js is superior for mobile performance, technical SEO, applications with business logic, AI integrations. We recommend the tech that serves your objectives.',
  },
  {
    question: 'Is the redesign GDPR and Swiss nFADP compliant?',
    answer:
      'Yes, by default. Every DKDP redesign includes a compliant cookie banner, privacy policy aligned with the Swiss nFADP 2023 and the EU GDPR, documented processing register, secure forms with legal notice, option for 100% Swiss hosting via Infomaniak Geneva.',
  },
]

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/website-redesign"
      config={{
        pillar: 'agence',
        hubName: 'Digital agency',
        hubHref: '/en/digital-agency',
        tag: 'Website redesign · Geneva',
        h1Lead: 'Your website is costing you clients.',
        h1Highlight: 'We rebuild it with real results.',
        subtitle:
          "Full redesign, migration without SEO loss, 2026 design, Core Web Vitals green by guarantee. For Swiss SMBs who want a site that really converts. +240% average organic traffic at 12 months across our 14 redesigns shipped in 2024-2026. From CHF 3'900.",
        icon: Wrench,
        secondaryCta: 'Free site audit',
        secondaryHref: '/en/digital-agency/web-design/site-audit',
        problem: {
          title: 'Three symptoms your website needs a rebuild',
          items: [
            { title: 'Outdated design', text: 'Your site is more than 4 years old without a redesign. It signals a stale brand against your newer competitors.' },
            { title: 'Not mobile-friendly', text: 'Core Web Vitals are red on mobile. 65 to 78% of Swiss traffic comes from mobile. You lose half your prospects.' },
            { title: 'Zero conversion', text: 'Traffic but no leads. Hidden CTAs, 12-field forms, broken journeys. You pay for traffic that does not convert.' },
          ],
        },
        stats: [
          { value: '+240%', label: 'Organic traffic at 12 months' },
          { value: '0%', label: 'SEO loss across 14 redesigns' },
          { value: '5-8 wks', label: 'Showcase delivery timeline' },
          { value: '90+', label: 'Lighthouse score' },
        ],
        bullets: [
          { title: 'Pre-redesign full SEO audit', text: 'We analyse ranking pages, backlinks, active keywords. We identify what must be preserved before touching anything.' },
          { title: '301 redirect plan, systematic', text: 'Every old URL is mapped and 301-redirected to its new equivalent. No SEO juice lost, no 404 in Search Console.' },
          { title: 'Progressive migration, no downtime', text: 'New version built on staging. Weekend night switch. Rollback ready. Visitors never see an error page.' },
          { title: 'SEO juice preserved', text: 'We keep the H1/H2 structures that perform, the main URLs, the text that works. We fix what failed, we do not break what worked.' },
          { title: 'Core Web Vitals green by guarantee', text: 'LCP < 2.5s, INP < 200ms, CLS < 0.1 on mobile and desktop. Tested on iPhone 15, Samsung S24, iPad. Lighthouse score 90+ on every page.' },
          { title: 'Modern 2026 design and UX', text: 'Strong visual brand, clear conversion funnels, frictionless forms. The site finally looks like a 2026 company.' },
          { title: 'Editable back-office for your team', text: 'Sanity, Contentful, WordPress or Notion depending on team size. 1.5-hour training included, plus a video guide.' },
          { title: 'Swiss nFADP and EU GDPR compliant', text: 'Compliant cookie banner, privacy policy, processing register, secure forms. Optional 100% Swiss hosting via Infomaniak Geneva.' },
        ],
        process: [
          { title: 'Pre-redesign SEO audit', text: 'Ranking pages, active keywords, backlinks to preserve. Detailed report in 48 hours.' },
          { title: 'Wireframes and Figma prototype', text: 'Mockups of key pages. Video-call validation before any development.' },
          { title: 'Staging build, content + 301', text: 'Password-protected staging. Content migration, 301 redirect plan for every old URL.' },
          { title: 'Go-live + 30-day monitoring', text: 'DNS switch, IndexNow ping, Search Console submission. Post-launch SEO monitoring for 30 days.' },
        ],
        pricing: {
          title: 'Three fixed-quote packages for your redesign',
          subtitle: 'Pick the scope that matches your site. All packages include the pre-redesign SEO audit, the 301 plan and 3 months of post-launch support.',
          tiers: [
            {
              name: 'Showcase redesign',
              price: "From CHF 3'900",
              cadence: 'Fixed quote',
              description: 'For showcase sites up to 10 pages with healthy SEO history.',
              features: [
                'Pre-redesign SEO audit included',
                'Custom Figma design + 2 revision rounds',
                'Migration to Next.js, Astro or modern WordPress',
                'Full 301 plan with mapping',
                'Core Web Vitals green guarantee',
                'Back-office training (1.5 hours)',
                '3 months post-launch support',
              ],
              ctaLabel: 'Get a showcase quote',
            },
            {
              name: 'Corporate redesign',
              price: "From CHF 7'500",
              cadence: 'Fixed quote',
              description: 'For corporate sites of 10 to 30 pages, multilingual or with custom features.',
              features: [
                'Everything in Showcase, plus:',
                'Up to 30 pages',
                'Multilingual FR/EN/DE/IT (hreflang)',
                'Sanity or Contentful headless CMS',
                'Custom integrations (CRM, mailing)',
                'Editorial workflows for marketing teams',
                'Full WCAG 2.2 AA accessibility',
              ],
              highlighted: true,
              ctaLabel: 'Get a corporate quote',
            },
            {
              name: 'E-commerce or custom',
              price: 'On request',
              cadence: 'Scoped per project',
              description: 'For e-commerce migrations or custom technical builds.',
              features: [
                'PrestaShop / Magento to Shopify migration',
                'Hydrogen storefronts or Next.js custom',
                'Twint, PostFinance, Stripe integration',
                'Member portal or back office',
                'Sovereign Swiss hosting available',
                'Scalable architecture',
              ],
              ctaLabel: 'Talk to us',
            },
          ],
          note: "All prices in Swiss francs, excluding VAT 8.1%. Free pre-redesign SEO audit delivered in 48 hours. Fixed quote upfront, no surprises.",
        },
        comparison: {
          title: 'Redesign vs new build, which one do you need?',
          subtitle: 'The right choice depends on your existing SEO history and the technical state of your site.',
          headers: ['Redesign', 'New build'],
          rows: [
            { label: 'Existing SEO history to preserve', values: ['Yes', 'No'], emphasizeColumn: 0 },
            { label: 'Existing backlinks to keep', values: ['Yes', 'No'], emphasizeColumn: 0 },
            { label: 'Same domain', values: ['Yes', 'Either'], emphasizeColumn: 0 },
            { label: 'Pre-redesign audit', values: ['Mandatory', 'Optional'], emphasizeColumn: 0 },
            { label: 'Starting price', values: ["CHF 3'900", "CHF 2'500"], emphasizeColumn: 1 },
            { label: 'Average delivery', values: ['5 to 14 weeks', '3 to 12 weeks'], emphasizeColumn: 1 },
            { label: 'SEO loss risk', values: ['Mitigated by 301 plan', 'None (no history)'], emphasizeColumn: 0 },
          ],
        },
        testimonials: [
          {
            quote:
              'DKDP took our WordPress 2019 site (PageSpeed 32) and rebuilt it on Next.js with a real SEO audit upfront. Six months later, organic traffic is up 240% and qualified leads tripled. The 301 plan was flawless: zero traffic dip at launch.',
            author: 'Managing Partner',
            role: 'Geneva fiduciary',
          },
          {
            quote:
              'Migration from PrestaShop to Shopify Hydrogen with our 800-product catalogue. Twint added at checkout. Conversion rate went from 1.1% to 3.1% in the first 90 days. The team understood Swiss e-commerce specifics from day one.',
            author: 'E-commerce Director',
            role: 'Swiss lifestyle brand',
          },
          {
            quote:
              'We needed a multilingual rebuild (FR/DE/EN/IT) on Astro and Sanity. Zero downtime, zero SEO drop, training included. Our marketing team now edits four language versions in real time. Best digital investment this year.',
            author: 'Marketing Director',
            role: 'Industrial SMB, French-speaking Switzerland',
          },
        ],
        bridge: {
          title: 'Going further with DKDP',
          subtitle: 'A redesign is rarely a standalone project. Three natural extensions for the months after launch.',
          links: [
            {
              label: 'SEO and AI search',
              href: '/en/digital-agency/seo',
              description: 'Now that your site is fast and well-structured, compound results with a monthly SEO retainer covering Google and AI search.',
            },
            {
              label: 'Google Ads',
              href: '/en/digital-agency/google-ads',
              description: 'Buy visibility on day one while SEO compounds. Fixed management fee, no margin on ad spend.',
            },
            {
              label: 'AI chatbot for your new site',
              href: '/en/artificial-intelligence/ai-chatbot',
              description: '24/7 assistant grounded in your fresh content. Multilingual, calendar booking, CRM sync. From CHF 2,900.',
            },
          ],
        },
        faq: FAQ_ITEMS,
        finalTitle: 'Free pre-redesign audit',
        finalText:
          'Tell us your URL. We send back a real PDF audit covering technical SEO, design state, mobile UX, Core Web Vitals and a prioritised redesign roadmap. No pitch, no commitment.',
        extraSchemas: [
          buildServiceWithLocalBusiness({
            name: 'Website redesign Geneva',
            url: '/en/digital-agency/website-redesign',
            description:
              "Website redesign for SMBs in Geneva and French-speaking Switzerland: modern 2026 design, UX rework, WordPress / Next.js / Shopify / Astro migration without SEO loss. Pre-redesign SEO audit, 301 redirect plan, Core Web Vitals green guarantee. Swiss nFADP and EU GDPR compliant.",
            serviceType: 'Website redesign',
            priceFrom: 3900,
            lang: 'en',
            extraAreas: ['Zurich', 'Basel', 'Bern'],
          }),
        ],
      }}
    />
  )
}
