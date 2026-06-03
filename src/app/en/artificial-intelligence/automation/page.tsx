import { Workflow } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Business Automation Geneva · n8n, Make, Zapier | DKDP',
  description:
    'Business automation in Geneva with n8n, Make and Zapier. Lead routing, invoice generation, CRM sync, AI-assisted workflows. From CHF 2,500 fixed quote.',
  enPath: '/en/artificial-intelligence/automation',
  frPath: '/intelligence-artificielle/automatisation',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/artificial-intelligence/automation"
      config={{
        pillar: 'ia',
        hubName: 'Artificial intelligence',
        hubHref: '/en/artificial-intelligence',
        tag: 'Business automation · Geneva',
        h1Lead: 'No-code automation,',
        h1Highlight: 'zero friction.',
        subtitle:
          'Workflows on n8n, Make and Zapier that connect your CRM, mailbox, accounting, payment and AI in a coherent pipeline. Built in Geneva, documented for your team.',
        icon: Workflow,
        bullets: [
          { title: 'Lead routing', text: 'Form fills, inbox parsing, AI-classified intent, automatic assignment to the right person.' },
          { title: 'Invoice and accounting', text: 'Bexio, QuickBooks, Pennylane: invoices created, sent and reconciled without a human in the loop.' },
          { title: 'CRM sync', text: 'HubSpot, Pipedrive, Salesforce kept in sync with your other tools. No more double entry.' },
          { title: 'AI-assisted workflows', text: 'GPT or Claude inside the workflow to summarise, classify, draft, translate. Reliable, not toy.' },
          { title: 'Self-hosted option', text: 'n8n on your own server for sensitive data. Swiss hosting available.' },
          { title: 'Documented and handed over', text: 'Every workflow documented in plain language. Your team can edit and extend without us.' },
        ],
        stats: [
          { value: 'CHF 2,500+', label: 'From, fixed quote' },
          { value: '2-6 weeks', label: 'Average delivery' },
          { value: 'n8n, Make, Zapier', label: 'Tools we use' },
          { value: 'Yours to maintain', label: 'No vendor lock' },
        ],
        faq: [
          {
            question: 'n8n, Make or Zapier — which one is best?',
            answer:
              'n8n for technical teams who want self-hosting and unlimited workflows. Make for SMBs with frequent multi-step workflows. Zapier for simple integrations and teams that prefer the most polished UI. We help you pick based on your team and constraints.',
          },
          {
            question: 'Will workflows break when our tools update?',
            answer:
              'Real integrations break sometimes. We add health-check monitoring on every workflow so you are alerted before a customer notices. Maintenance is offered as a small monthly retainer.',
          },
          {
            question: 'Can we host n8n on Swiss servers?',
            answer:
              'Yes. We self-host n8n on Infomaniak (Geneva), AWS Zurich or your own infrastructure. Best fit for sensitive data, financial flows or any sector with Swiss residency requirements.',
          },
        ],
      }}
    />
  )
}
