import { Cpu } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'IT Skills Training Geneva · Essentials for Modern Teams | DKDP',
  description:
    'IT skills training in Geneva for non-tech teams. Cloud collaboration, modern productivity, automation, AI literacy. Practical, no jargon. From CHF 1,500 per half-day.',
  enPath: '/en/corporate-training/it-skills',
  frPath: '/formation-entreprise/informatique',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/it-skills"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'IT skills · Geneva',
        h1Lead: 'IT essentials,',
        h1Highlight: 'no jargon.',
        subtitle:
          'Practical IT training for non-tech teams. Cloud collaboration, modern productivity, basic automation, AI literacy. Build the digital reflexes every team member needs in 2026.',
        icon: Cpu,
        bullets: [
          { title: 'Cloud collaboration', text: 'Drive, SharePoint, Notion. Sharing, permissions, versioning. Stop emailing attachments forever.' },
          { title: 'Modern productivity', text: 'Calendar discipline, deep work blocks, async communication, meeting hygiene.' },
          { title: 'Automation basics', text: 'Recipes in Make or Zapier your team can build alone. Stop doing repetitive copy-paste tasks.' },
          { title: 'AI literacy', text: 'What AI can and cannot do, when to trust it, when to verify, basic privacy hygiene.' },
          { title: 'Browser power tools', text: 'Tabs, bookmarks, password manager, extensions that actually pay back. Time saved daily.' },
          { title: 'Tool selection', text: 'Help your team pick the right tool per task. Stop buying SaaS your team will not adopt.' },
        ],
        stats: [
          { value: 'CHF 1,500+', label: 'Half-day session' },
          { value: '4-15 people', label: 'Per session' },
          { value: 'Non-tech', label: 'Built for' },
          { value: 'Practical', label: 'No jargon' },
        ],
      }}
    />
  )
}
