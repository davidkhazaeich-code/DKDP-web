import { Palette } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Web Design Training with Figma · Geneva | DKDP',
  description:
    "Web design training in Geneva with Figma. UI/UX, wireframes, design systems, interactive prototypes. Real client briefs, real deliverables. From CHF 1'500 per half-day.",
  enPath: '/en/corporate-training/web-design',
  frPath: '/formation-entreprise/web-design',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/web-design"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'Web design training · Geneva',
        h1Lead: 'Web design with Figma,',
        h1Highlight: 'from zero to system.',
        subtitle:
          'Hands-on Figma training: UI/UX fundamentals, wireframes, design systems, interactive prototypes. We work on real briefs from your business, not toy exercises.',
        icon: Palette,
        bullets: [
          { title: 'UI/UX fundamentals', text: 'Hierarchy, spacing, typography, colour. The principles every web designer needs.' },
          { title: 'Wireframing fast', text: 'Low-fi sketches to high-fi mockups. Iteration loops that move quickly.' },
          { title: 'Design systems', text: 'Tokens, components, variants, auto-layout. Build once, reuse everywhere.' },
          { title: 'Interactive prototypes', text: 'Click-through prototypes for stakeholder review and user testing. No code required.' },
          { title: 'Handoff to development', text: 'Annotations, design specs, code snippets, asset export. Clean handoff to developers.' },
          { title: 'AI inside Figma', text: 'Figma AI, third-party plugins, prompt-driven design. The new workflows that save hours.' },
        ],
        stats: [
          { value: "CHF 1'500+", label: 'Half-day session' },
          { value: '4-10 people', label: 'Per session' },
          { value: 'Real briefs', label: 'From your business' },
          { value: 'Take-home', label: 'Templates included' },
        ],
      }}
    />
  )
}
