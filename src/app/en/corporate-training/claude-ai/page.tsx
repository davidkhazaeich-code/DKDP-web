import { GraduationCap } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Claude Training Geneva · Claude.ai, Projects, Code | DKDP',
  description:
    'Hands-on Claude AI training for your team. Claude.ai, Projects, Cowork and Claude Code. From first prompt to autonomous agents. Delivered in Geneva or remote.',
  enPath: '/en/corporate-training/claude-ai',
  frPath: '/formation-entreprise/claude-ai',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/claude-ai"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'Claude training · Geneva',
        h1Lead: 'Master Claude,',
        h1Highlight: 'from first prompt to agents.',
        subtitle:
          'Hands-on training on Claude.ai, Projects, Cowork and Claude Code. From everyday prompting to building autonomous agents your team uses daily. Delivered in Geneva or remote.',
        icon: GraduationCap,
        bullets: [
          { title: 'Claude.ai daily use', text: 'Prompting techniques, attachments, voice input, artifacts. The features your team will reuse.' },
          { title: 'Projects and knowledge bases', text: 'How to set up Projects with your documents, style guides, brand voice for consistent outputs.' },
          { title: 'Cowork for teams', text: 'Shared spaces, multi-agent workflows, async collaboration patterns. The right way to scale.' },
          { title: 'Claude Code for devs', text: 'Pair programming, file ops, refactors, custom agents. From beginner to advanced patterns.' },
          { title: 'Privacy and data handling', text: 'What to share, what to anonymise, how to use Workspaces vs personal accounts properly.' },
          { title: 'Custom prompts library', text: 'We co-build 20+ prompts tailored to your business. Yours to keep and extend.' },
        ],
        stats: [
          { value: "CHF 1'500+", label: 'Half-day session' },
          { value: '4-12 people', label: 'Per session' },
          { value: 'Claude Pro', label: 'Setup advice included' },
          { value: '2 weeks', label: 'Email Q&A after' },
        ],
        faq: [
          {
            question: 'Do we need a Claude Pro plan for the training?',
            answer:
              'Claude Pro per participant is strongly recommended (Workspaces or individual). We help you choose the right plan during the pre-session call. Free plan limits make practical exercises difficult.',
          },
          {
            question: 'Is Claude better than ChatGPT or Copilot?',
            answer:
              'Different strengths. Claude tends to win on long-form writing, reasoning and nuanced tasks. ChatGPT on tool use and general assistance. Copilot on Microsoft 365 integration. We cover the comparison and help your team pick the right tool per task.',
          },
          {
            question: 'Can we have a custom session for Claude Code?',
            answer:
              'Yes. A dedicated full-day or two-day developer session covering Claude Code: setup, MCPs, custom agents, project workflows, advanced patterns. Built for engineering teams.',
          },
        ],
      }}
    />
  )
}
