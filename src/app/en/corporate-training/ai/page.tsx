import { BrainCircuit } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Corporate AI Training Geneva · Claude, ChatGPT, Copilot | DKDP',
  description:
    'Corporate AI training in Geneva. Hands-on sessions on Claude, ChatGPT, Copilot, Gemini and the daily workflows your team actually uses. From CHF 1,500 per half-day.',
  enPath: '/en/corporate-training/ai',
  frPath: '/formation-entreprise/ia',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/ai"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'AI training · Geneva',
        h1Lead: 'Train your team',
        h1Highlight: 'on AI that ships.',
        subtitle:
          'Hands-on AI training for your team on Claude, ChatGPT, Copilot and Gemini. Practical workflows, real prompts, take-home playbook. Half-day to two days, on-site or remote.',
        icon: BrainCircuit,
        bullets: [
          { title: 'Daily-driver tools', text: 'Claude.ai, ChatGPT, Microsoft Copilot, Google Gemini. The ones your team will actually use.' },
          { title: 'Real workflows', text: 'Email drafting, meeting summaries, data analysis, document generation, research, coding helpers.' },
          { title: 'Custom prompts and playbooks', text: 'We co-write 20-30 prompts tailored to your business. Your team keeps and extends them.' },
          { title: 'Privacy and prompt hygiene', text: 'What to share, what to never share, how to anonymise. Practical, not paranoid.' },
          { title: 'On-site or remote', text: 'Your office in Geneva, Lausanne, Zurich, Basel, or remote on Teams or Meet.' },
          { title: 'Bilingual delivery', text: 'Sessions delivered in English or French. Materials in both languages on request.' },
        ],
        stats: [
          { value: 'CHF 1,500+', label: 'Half-day session' },
          { value: '4-12 people', label: 'Per session' },
          { value: 'Tailored', label: 'To your tools' },
          { value: '2 weeks', label: 'Email follow-up' },
        ],
        process: [
          { title: 'Pre-session interview', text: '30-minute call to map your tools, pain points, team level. We design the agenda accordingly.' },
          { title: 'Co-build playbook', text: 'During the session we co-write the prompts and workflows your team will reuse.' },
          { title: 'Live workflows', text: 'No slides past minute 10. Tools open, real prompts, real outputs.' },
          { title: 'Follow-up Q&A', text: 'Two weeks of free email Q&A after the session. Real questions, real answers.' },
        ],
      }}
    />
  )
}
