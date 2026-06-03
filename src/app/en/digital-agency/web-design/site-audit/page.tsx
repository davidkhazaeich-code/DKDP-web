import { Search } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildService } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'Free Website Audit · Geneva | DKDP',
  description:
    'Free website audit by a senior team in Geneva. Performance, UX, accessibility, conversion, SEO foundations. Real findings in 48 hours. Yours to keep with no engagement.',
  enPath: '/en/digital-agency/web-design/site-audit',
  frPath: '/agence-digitale/creation-site-web/audit-site',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/web-design/site-audit"
      config={{
        pillar: 'agence',
        hubName: 'Web design',
        hubHref: '/en/digital-agency/web-design',
        tag: 'Free site audit · 48h delivery',
        h1Lead: 'Free website audit,',
        h1Highlight: 'real findings.',
        subtitle:
          'A senior team looks at your live site for 2 hours and writes a real audit, not an automated PDF. Performance, UX, accessibility, conversion, SEO. Delivered in 48 hours.',
        icon: Search,
        primaryCta: 'Request my audit',
        bullets: [
          { title: 'Performance', text: 'Core Web Vitals, image weight, bundle size, third-party scripts. With concrete fix recommendations.' },
          { title: 'UX and conversion', text: 'Friction points, weak CTAs, mobile-first issues, form drop-offs. Ranked by likely impact.' },
          { title: 'Accessibility', text: 'WCAG 2.2 AA spot checks: contrast, focus states, keyboard navigation, screen reader basics.' },
          { title: 'SEO foundations', text: 'Title tags, headings, schema, internal linking, indexation. Quick wins flagged.' },
          { title: 'Brand and visual', text: 'Consistency, hierarchy, typographic rhythm, where the design is letting you down.' },
          { title: 'Honest verdict', text: 'Rebuild, partial redesign, or just polish. We tell you what we would do in your shoes.' },
        ],
        stats: [
          { value: 'Free', label: 'No commitment' },
          { value: '48 hours', label: 'Delivery' },
          { value: 'Senior', label: 'Real human review' },
          { value: 'Yours', label: 'To keep' },
        ],
        process: [
          { title: 'Send your URL', text: 'Share your live site. That is all we need to begin.' },
          { title: 'Two hours of senior eyes', text: 'A senior team reviews performance, UX, accessibility, conversion and SEO, by hand.' },
          { title: 'We write the verdict', text: 'Findings ranked by likely impact, with concrete fix recommendations and an honest verdict.' },
          { title: 'You receive the report', text: 'Within 48 hours, a real PDF audit. Yours to keep, no obligation, no upsell.' },
        ],
        bridge: {
          title: 'After the audit',
          links: [
            { label: 'Web design', href: '/en/digital-agency/web-design', description: 'If the verdict is rebuild, a fast, conversion-focused new site. From CHF 2\'500.' },
            { label: 'Website redesign', href: '/en/digital-agency/website-redesign', description: 'A redesign that keeps your SEO and fixes the foundations. From CHF 3\'900.' },
            { label: 'Free SEO audit', href: '/en/digital-agency/seo/seo-audit', description: 'Want the SEO and AI search side checked too? A free SEO audit in 48 hours.' },
          ],
        },
        faq: [
          { question: 'Is the website audit really free?', answer: 'Yes, genuinely free and yours to keep, with no obligation. We deliver it even if you tell us upfront you will not be hiring us.' },
          { question: 'What does the audit cover?', answer: 'Performance (Core Web Vitals, image weight, scripts), UX and conversion, WCAG 2.2 AA accessibility spot checks, SEO foundations, brand and visual consistency, plus an honest verdict: rebuild, redesign or polish.' },
          { question: 'How fast do you deliver it?', answer: 'Within 48 hours. A real report from a senior team, not an automated scan that flags hundreds of meaningless issues.' },
          { question: 'Will you just tell me to rebuild?', answer: 'No. We give an honest verdict. Often the answer is partial redesign or simple polish, not a full rebuild. We tell you what we would do in your shoes.' },
          { question: 'Do I need to prepare anything?', answer: 'Just your URL. If you have analytics access or a specific concern, share it, but it is not required.' },
        ],
        finalTitle: 'Get your free website audit',
        finalText: 'Send us your URL. 48 hours later you get a real report from a senior team. No obligation, no upsell.',
        extraSchemas: [
          buildService({
            name: 'Free website audit',
            url: '/en/digital-agency/web-design/site-audit',
            description: 'Free website audit by a senior team in Geneva. Performance, UX, accessibility, conversion and SEO foundations. Real findings in 48 hours, yours to keep.',
            lang: 'en',
          }),
        ],
      }}
    />
  )
}
