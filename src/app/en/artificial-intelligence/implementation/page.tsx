import { Cpu } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'AI Implementation Geneva · Deploy AI Inside Your Stack | DKDP',
  description:
    "AI implementation in Geneva. We deploy AI agents, automation and chatbots inside your existing stack and train your team to use them. From CHF 6'000 fixed quote.",
  enPath: '/en/artificial-intelligence/implementation',
  frPath: '/intelligence-artificielle/mise-en-place',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/artificial-intelligence/implementation"
      config={{
        pillar: 'ia',
        hubName: 'Artificial intelligence',
        hubHref: '/en/artificial-intelligence',
        tag: 'AI implementation · Geneva',
        h1Lead: 'Real AI, deployed',
        h1Highlight: 'on your real stack.',
        subtitle:
          'We deploy the AI agent, connect it to your CRM, your inbox, your documents and your tools, then train your team to actually use it. No proof-of-concept hell, no shelfware.',
        icon: Cpu,
        bullets: [
          { title: 'Works in your environment', text: 'Slack, Teams, Notion, HubSpot, Pipedrive, Gmail. Wherever your team already lives.' },
          { title: 'Connected to your data', text: 'Google Drive, SharePoint, Notion, your CMS, your databases. The AI knows your context.' },
          { title: 'IT-friendly deployment', text: 'SSO, audit logs, role-based access. We work with your IT and security team, not around them.' },
          { title: 'Internal champion programme', text: 'We train 2-3 of your team to extend prompts and workflows themselves. Knowledge stays in-house.' },
          { title: 'Adoption metrics tracked', text: 'How many people use it, how often, on which tasks. We share the dashboard, not hide it.' },
          { title: 'Cost optimisation', text: 'Model choice, caching, prompt size, batch inference. We minimise the AI bill without sacrificing quality.' },
        ],
        stats: [
          { value: 'CHF 6k+', label: 'From, fixed quote' },
          { value: '4-12 weeks', label: 'End-to-end' },
          { value: 'SSO + audit', label: 'IT-friendly' },
          { value: '> 70%', label: 'Adoption typical' },
        ],
        process: [
          { title: 'Discovery & scope', text: '2-week kickoff: interviews, data inventory, security alignment with your IT team.' },
          { title: 'Build & integrate', text: 'Weekly build sprints with demos. Agent, connectors, surfaces and analytics wired up.' },
          { title: 'Pilot & iterate', text: '2-4 weeks of pilot with a champion team. We adjust prompts, tools and UI based on real use.' },
          { title: 'Rollout & train', text: 'Company-wide rollout with training sessions. Champions take over routine maintenance.' },
        ],
        faq: [
          {
            question: 'Will this work with our existing tools?',
            answer:
              'Almost certainly. We integrate with all major SaaS (Microsoft 365, Google Workspace, Slack, HubSpot, Pipedrive, Notion, Salesforce, Bexio, etc.) and most APIs. If a tool has no API, we find a workable workaround or recommend an alternative.',
          },
          {
            question: 'How do we handle data privacy?',
            answer:
              'Privacy is baked into the design: anonymisation pipelines, no training on your data, EU or Swiss hosting where required, audit logs, retention policies. We work with your DPO from week one.',
          },
          {
            question: 'What if our team does not use it?',
            answer:
              'Adoption is the biggest risk and we plan for it. Pilot programme with champions, training sessions, weekly office hours, adoption metrics shared with leadership. Most rollouts hit > 70% weekly active users within 90 days.',
          },
        ],
      }}
    />
  )
}
