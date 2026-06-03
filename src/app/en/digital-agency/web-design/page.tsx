import { Globe } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Web Design Geneva · Custom Websites that Convert | DKDP',
  description:
    'Custom websites designed and coded in Geneva on Next.js, Astro or a headless CMS. Fast Core Web Vitals, SEO-ready, multi-language support. Free quote in 24 hours.',
  enPath: '/en/digital-agency/web-design',
  frPath: '/agence-digitale/creation-site-web',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/web-design"
      config={{
        pillar: 'agence',
        hubName: 'Digital agency',
        hubHref: '/en/digital-agency',
        tag: 'Web design · Geneva',
        h1Lead: 'Websites that convert,',
        h1Highlight: 'not just look good.',
        subtitle:
          'Custom websites designed and coded in Geneva, built on Next.js, Astro or a headless CMS. Fast, accessible, ready for SEO and AI search engines from day one.',
        icon: Globe,
        primaryCta: 'Free quote',
        secondaryCta: 'Free site audit',
        secondaryHref: '/en/digital-agency/web-design/site-audit',
        bullets: [
          { title: 'Custom design, not a template', text: 'Every page wireframed and designed for your brand, your offer, your audience. No off-the-shelf themes.' },
          { title: 'Built for Core Web Vitals', text: 'Sub-second LCP, sub-200ms INP, low CLS. Measured before launch, monitored after.' },
          { title: 'Multi-language ready', text: 'French, English, German out of the box if you need it. Proper hreflang, sitemap and translated slugs.' },
          { title: 'SEO foundations baked in', text: 'Schema markup, internal linking, fast indexing, AI-citable content from day one.' },
          { title: 'CMS your team can use', text: 'Sanity, Strapi or static MDX. Your editors update content without a developer in the loop.' },
          { title: 'Hosted where it matters', text: 'Vercel, Infomaniak, AWS. Swiss hosting available for sensitive sectors. GDPR-clean by default.' },
        ],
        stats: [
          { value: '4-6 wks', label: 'Average delivery' },
          { value: 'CHF 6k+', label: 'From, fixed quote' },
          { value: '90+', label: 'Lighthouse score' },
          { value: '30 days', label: 'Free post-launch fixes' },
        ],
        process: [
          { title: 'Discovery & scope', text: '30-minute call. We map your goals, your audience, your tech and your team. Free.' },
          { title: 'Design & prototype', text: 'Wireframes then high-fidelity mockups in Figma. Weekly demo, no surprises.' },
          { title: 'Build & integrate', text: 'Coded in plain sight. CMS, forms, analytics, schema and SEO wired up together.' },
          { title: 'Launch & train', text: 'Go-live with your team trained on the CMS. 30 days of free fixes after launch.' },
        ],
        faq: [
          {
            question: 'How long does a custom website take?',
            answer:
              'A showcase website is delivered in 4 to 6 weeks from kickoff. Complex projects with custom development, e-commerce or AI features take 8 to 12 weeks. We always agree on a fixed timeline and price upfront.',
          },
          {
            question: 'Do you use templates or build from scratch?',
            answer:
              'Everything we ship is custom-designed and custom-coded for your brand. We do not resell templates. We do however reuse our own internal component library to keep the build fast and the quality consistent.',
          },
          {
            question: 'Can you keep our existing CMS?',
            answer:
              'Yes if it makes sense (Sanity, Strapi, WordPress, Webflow, etc.). We integrate to your existing stack rather than force a rebuild. If a migration is the right move, we say so and quote it separately.',
          },
          {
            question: 'Do you also handle SEO and content?',
            answer:
              'SEO foundations (schema, internal linking, sitemap, performance) are baked into every build. Ongoing SEO content production is an add-on retainer if you need it.',
          },
        ],
      }}
    />
  )
}
