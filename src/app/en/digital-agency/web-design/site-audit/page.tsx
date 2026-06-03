import { Search } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

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
        finalTitle: 'Get your free website audit',
        finalText: 'Send us your URL. 48 hours later you get a real report from a senior team. No obligation, no upsell.',
      }}
    />
  )
}
