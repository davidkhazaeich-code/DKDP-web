import { Bot } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Custom AI Agents Geneva · Built on Claude, GPT, Gemini | DKDP',
  description:
    'Custom AI agents trained on your docs, your tone, your processes. Built on Claude, ChatGPT or Gemini and deployed inside your stack. From CHF 8,000 fixed quote.',
  enPath: '/en/artificial-intelligence/ai-agents',
  frPath: '/intelligence-artificielle/agents-ia',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/artificial-intelligence/ai-agents"
      config={{
        pillar: 'ia',
        hubName: 'Artificial intelligence',
        hubHref: '/en/artificial-intelligence',
        tag: 'AI agents · Geneva',
        h1Lead: 'Agents that work',
        h1Highlight: 'on your stack.',
        subtitle:
          'Custom AI agents trained on your documentation, your tone of voice and your processes. Built on Claude, ChatGPT or Gemini, deployed where your team already works.',
        icon: Bot,
        bullets: [
          { title: 'Grounded in your context', text: 'Agents read your docs, your knowledge base, your style guide. Answers stay on brand.' },
          { title: 'Tool use that actually works', text: 'Calendar booking, CRM updates, file retrieval, payment status. Real integrations, not demos.' },
          { title: 'Slack, Teams, web, voice', text: "Deployed in the surfaces your team already uses. Web widget, Slack bot, Teams app, voice agent." },
          { title: 'Privacy first', text: 'Anonymisation pipelines, no training on your data, Swiss hosting when it matters. GDPR-clean.' },
          { title: 'Maintainable by you', text: 'You own the prompts and the workflows. We document, train your team, no lock-in.' },
          { title: 'Measured ROI', text: 'Hours saved, tickets deflected, leads captured. The metric your CFO actually asks about.' },
        ],
        stats: [
          { value: 'CHF 8k+', label: 'From, fixed quote' },
          { value: '4-8 weeks', label: 'Build + train' },
          { value: 'Claude, GPT, Gemini', label: 'Models supported' },
          { value: 'Your data', label: 'Stays yours' },
        ],
        faq: [
          {
            question: 'Which AI model is best for our use case?',
            answer:
              'Depends on the task. Claude tends to win on writing and long reasoning, GPT on tool use and orchestration, Gemini on multimodal. We benchmark on your real data before locking in, and we can swap later if a better model arrives.',
          },
          {
            question: 'Will the AI hallucinate facts about our business?',
            answer:
              'We use Retrieval-Augmented Generation (RAG): the agent only answers from your indexed documents. Out-of-scope questions are answered with "I do not know, talk to a human" and a handover. Hallucination is minimised by design.',
          },
          {
            question: 'Can we run this on Swiss hosting?',
            answer:
              'Yes. For sensitive sectors (health, legal, finance), we deploy on Swiss-hosted infrastructure with Swiss data residency. Model providers like OpenAI, Anthropic and Mistral all offer EU-data options.',
          },
        ],
      }}
    />
  )
}
