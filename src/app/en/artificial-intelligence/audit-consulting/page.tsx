import { BrainCircuit } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'AI Audit & Consulting Geneva · Where AI Pays Back | DKDP',
  description:
    "AI audit and consulting in Geneva. Find where AI moves the needle in your business. Prioritised roadmap, no buzzwords, in plain English. From CHF 4'000 fixed quote.",
  enPath: '/en/artificial-intelligence/audit-consulting',
  frPath: '/intelligence-artificielle/audit-conseil',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/artificial-intelligence/audit-consulting"
      config={{
        pillar: 'ia',
        hubName: 'Artificial intelligence',
        hubHref: '/en/artificial-intelligence',
        tag: 'AI audit · Geneva',
        h1Lead: 'Find where AI',
        h1Highlight: 'actually pays back.',
        subtitle:
          'A 2-4 week audit of your business to map where AI moves the needle and where it does not. Prioritised roadmap, no buzzwords, no slide-deck theatre.',
        icon: BrainCircuit,
        bullets: [
          { title: 'Process discovery', text: 'Interviews with key roles, document review, time tracking. We see what your team really does.' },
          { title: 'Use-case mapping', text: 'Every process scored on AI fit: model maturity, data availability, expected ROI, risk.' },
          { title: 'Vendor-neutral recommendations', text: 'Claude, GPT, Gemini, n8n, custom build. We pick what fits your team, not what pays us most.' },
          { title: 'Privacy and risk assessment', text: 'GDPR, Swiss nLPD, sector-specific risks. We flag what you cannot deploy and why.' },
          { title: 'Prioritised 90-day roadmap', text: 'Top 3-5 AI initiatives ranked by impact and effort. Quick wins shipped in week one.' },
          { title: 'Optional implementation', text: 'You can take the roadmap to any vendor or have us execute through our AI services.' },
        ],
        stats: [
          { value: "CHF 4'000+", label: 'From, fixed quote' },
          { value: '2-4 weeks', label: 'Audit delivery' },
          { value: '5-10 ideas', label: 'Scored and ranked' },
          { value: 'Vendor-neutral', label: 'No conflict of interest' },
        ],
        faq: [
          {
            question: 'How is this different from a consulting deck?',
            answer:
              'Every recommendation is technical enough to be implemented. We provide model choices, integration paths, expected costs, risk flags. You can act on the roadmap on day one, not after another phase of work.',
          },
          {
            question: 'What if we already use AI?',
            answer:
              'Common. The audit then focuses on optimising what is deployed (prompts, models, costs) and finding the next 3 high-impact additions. Often the biggest wins are not new tools, but better use of existing ones.',
          },
          {
            question: 'Do you also implement what you recommend?',
            answer:
              'We can, through our AI agents, automation, chatbot and training services. But the audit is deliberately vendor-neutral so you keep full freedom to choose another implementation partner.',
          },
        ],
      }}
    />
  )
}
