import { Wand2 } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Canva Training Geneva · Brand Kit, AI Magic Studio | DKDP',
  description:
    'Canva training in Geneva. Brand Kit setup, templates, Magic Studio AI, video editing. Build a brand-consistent design system in one day. From CHF 1,500 per half-day.',
  enPath: '/en/corporate-training/canva',
  frPath: '/formation-entreprise/canva',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/canva"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'Canva training · Geneva',
        h1Lead: 'Build a design system',
        h1Highlight: 'in one day.',
        subtitle:
          'Canva Brand Kit, templates, Magic Studio AI, video, presentations, social formats. We turn your team into a small in-house design studio in one focused day.',
        icon: Wand2,
        bullets: [
          { title: 'Brand Kit setup', text: 'Logo, fonts, colours, brand voice synced into Canva. Every team member starts on-brand.' },
          { title: 'Template library', text: 'Social posts, presentations, documents, email banners. Built once, reused forever.' },
          { title: 'Magic Studio AI', text: 'Magic Write, Magic Edit, Magic Design. The new AI features that change everything.' },
          { title: 'Video and motion', text: 'Short-form video for social, motion graphics, animated logos. All inside Canva.' },
          { title: 'Multi-platform export', text: 'Resize for every platform without losing quality. Auto-translate for multi-language content.' },
          { title: 'Team workflow', text: 'Folders, approvals, shared brand assets, comments, version history. The right way to collaborate.' },
        ],
        stats: [
          { value: 'CHF 1,500+', label: 'Half-day session' },
          { value: '4-15 people', label: 'Per session' },
          { value: 'Brand Kit', label: 'Live setup included' },
          { value: 'Templates', label: '10+ delivered' },
        ],
      }}
    />
  )
}
