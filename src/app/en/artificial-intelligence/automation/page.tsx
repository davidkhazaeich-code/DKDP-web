import { Workflow } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildServiceWithLocalBusiness } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'Business Automation Geneva · n8n, Make, Zapier | DKDP',
  description:
    "Business automation in Geneva with n8n, Make and Zapier. Lead routing, invoice generation, CRM sync, AI-assisted workflows. From CHF 1'500 fixed quote. Swiss self-hosting available.",
  enPath: '/en/artificial-intelligence/automation',
  frPath: '/intelligence-artificielle/automatisation',
  imageAlt: 'Business automation Geneva with n8n, Make, Zapier by DKDP',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/artificial-intelligence/automation"
      config={{
        pillar: 'ia',
        hubName: 'Artificial Intelligence',
        hubHref: '/en/artificial-intelligence',
        tag: 'Business automation · Geneva',
        h1Lead: 'No-code automation,',
        h1Highlight: 'zero friction.',
        subtitle:
          "Workflows on n8n, Make and Zapier that connect your CRM, mailbox, accounting, payment and AI in a coherent pipeline. Built in Geneva, documented for your team. From CHF 1'500.",
        icon: Workflow,
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        problem: {
          title: 'The hidden cost of manual work',
          items: [
            { title: 'Copy-paste between tools', text: 'Your team retypes the same data from email to CRM to spreadsheet to invoice. Hours lost every week, errors guaranteed.' },
            { title: 'Leads that go cold', text: 'A form fill at 8pm sits unanswered until morning. By then the prospect booked your competitor. Automation routes and replies instantly.' },
            { title: 'Reporting nobody has time for', text: 'The weekly report takes 4 hours to assemble by hand. Automated, it lands in your inbox every Monday at 7am.' },
          ],
        },
        bullets: [
          { title: 'Lead routing', text: 'Form fills, inbox parsing, AI-classified intent, automatic assignment to the right person.' },
          { title: 'Invoice and accounting', text: 'Bexio, Pennylane, QuickBooks: invoices created, sent and reconciled without a human in the loop.' },
          { title: 'CRM sync', text: 'HubSpot, Pipedrive, Salesforce kept in sync with your other tools. No more double entry.' },
          { title: 'AI-assisted workflows', text: 'GPT or Claude inside the workflow to summarise, classify, draft, translate. Reliable, not toy.' },
          { title: 'Connected tools', text: 'CRM, email, ERP, calendars, e-signature, payment, Slack, Notion. Dozens of native connectors plus custom APIs.' },
          { title: 'n8n Switzerland', text: 'Self-hosted n8n on Infomaniak (Geneva) or AWS Zurich for sensitive data. Sovereign, no per-task SaaS fees.' },
          { title: 'Health-check monitoring', text: 'Every workflow monitored. You are alerted before a customer notices a break.' },
          { title: 'Documented and handed over', text: 'Every workflow documented in plain language. Your team can edit and extend without us.' },
        ],
        stats: [
          { value: "CHF 1'500+", label: 'From, fixed quote' },
          { value: '2-6 weeks', label: 'Average delivery' },
          { value: 'n8n, Make, Zapier', label: 'Tools we use' },
          { value: '8-15h', label: 'Saved per person/week' },
        ],
        process: [
          { title: 'Map the workflow', text: 'We shadow the manual process, identify every step, tool and decision point. Output: a clear automation blueprint.' },
          { title: 'Build on staging', text: 'We build the workflow, connect your tools, add AI steps where they help. You test on real data.' },
          { title: 'Monitor and harden', text: 'Health checks, error handling, human escalation paths. The workflow survives tool updates.' },
          { title: 'Document and hand over', text: 'Plain-language docs, a 1-hour training. Your team owns and extends the workflow.' },
        ],
        pricing: {
          title: 'Three packages, fixed quote',
          subtitle: 'Scoped to the number and complexity of workflows.',
          tiers: [
            { name: 'Starter', price: "CHF 1'500", cadence: 'Fixed quote', description: 'One to three workflows connecting your core tools.', features: ['1 to 3 workflows', 'Up to 5 connected tools', 'Health-check monitoring', 'Plain-language documentation', '2 to 3-week delivery', '30-day support'], ctaLabel: 'Start with Starter' },
            { name: 'Business', price: "From CHF 3'500", cadence: 'Fixed quote', description: 'Multi-workflow automation with AI steps and CRM/ERP sync.', features: ['Everything in Starter, plus:', 'Multiple coordinated workflows', 'AI steps (GPT / Claude) inside flows', 'CRM and ERP two-way sync', 'Self-hosted n8n option', '4 to 6-week delivery'], highlighted: true, ctaLabel: 'Start with Business' },
            { name: 'Enterprise', price: 'On request', cadence: 'Scoped per project', description: 'Sovereign Swiss self-hosting, complex orchestration, custom integrations.', features: ['Everything in Business, plus:', 'Self-hosted n8n on Swiss VPS', 'Custom API integrations', 'Complex multi-step orchestration', 'SLA and dedicated support', 'Team training'], ctaLabel: 'Talk to us' },
          ],
          note: 'All prices in Swiss francs, excluding VAT 8.1%. Optional monthly maintenance from CHF 200/month covers monitoring and adjustments.',
        },
        testimonials: [
          { quote: 'DKDP automated our quote-to-invoice flow on n8n connected to Bexio. We went from 3 hours of admin a day to 20 minutes. The team finally focuses on clients.', author: 'Founder', role: 'Geneva trades SME' },
          { quote: 'Lead routing with AI intent classification. Hot leads now reach a human in under 2 minutes, 24/7. Conversion is up 22% since launch.', author: 'Sales Manager', role: 'B2B services, Lausanne' },
          { quote: 'We needed self-hosted n8n for data residency. DKDP set it up on a Swiss VPS, documented everything, trained two of us. We extend it ourselves now.', author: 'IT Lead', role: 'Geneva fiduciary' },
        ],
        bridge: {
          title: 'Going further with AI',
          links: [
            { label: 'Custom AI agents', href: '/en/artificial-intelligence/ai-agents', description: 'When a workflow needs to decide and act autonomously, an AI agent picks up where automation stops. From CHF 2\'500.' },
            { label: 'AI audit and consulting', href: '/en/artificial-intelligence/audit-consulting', description: 'Not sure what to automate first? A 2-week audit maps the highest-ROI workflows. From CHF 490.' },
            { label: 'AI chatbot', href: '/en/artificial-intelligence/ai-chatbot', description: 'Automate the front door too: a 24/7 chatbot that qualifies leads and books meetings. From CHF 2\'900.' },
          ],
        },
        faq: [
          { question: 'n8n, Make or Zapier, which one is best?', answer: 'n8n for technical teams who want self-hosting and unlimited workflows. Make for SMBs with frequent multi-step workflows. Zapier for simple integrations and teams that prefer the most polished UI. We help you pick based on your team and constraints.' },
          { question: 'Will workflows break when our tools update?', answer: 'Real integrations break sometimes. We add health-check monitoring on every workflow so you are alerted before a customer notices. Maintenance is offered as a small monthly retainer from CHF 200/month.' },
          { question: 'Can we host n8n on Swiss servers?', answer: 'Yes. We self-host n8n on Infomaniak (Geneva), AWS Zurich or your own infrastructure. Best fit for sensitive data, financial flows or any sector with Swiss residency requirements (nFADP, banking secrecy).' },
          { question: 'How much time can automation realistically save?', answer: 'On DKDP deployments in 2026, business automation frees 8 to 15 hours per person per week on the automated processes, and cuts data-entry errors close to zero. ROI is typically reached within 6 to 12 weeks.' },
          { question: 'Which tools can you connect?', answer: 'Hundreds: HubSpot, Pipedrive, Salesforce, Bexio, Pennylane, Microsoft 365, Google Workspace, Slack, Notion, Airtable, Stripe, Twint, Mailchimp, and any tool with an API. If there is no API, we find a workaround.' },
          { question: 'Do you put AI inside the workflows?', answer: 'When it helps. GPT or Claude steps to summarise emails, classify intent, draft replies, extract data from PDFs, translate. Always with guardrails and human escalation for low-confidence cases.' },
          { question: 'Who owns and maintains the workflows?', answer: 'You do. Everything is documented in plain language and we train your team. Optional monthly maintenance is available if you prefer us to keep an eye on it.' },
          { question: 'Is automation GDPR and nFADP compliant?', answer: 'Yes. We sign a DPA, anonymise where needed, and for sensitive data we self-host on Swiss infrastructure so data never leaves the country.' },
        ],
        finalTitle: 'Free automation scoping call',
        finalText: 'Tell us the manual process that wastes the most time. We come back with an automation blueprint, a fixed quote and an estimate of hours saved. No commitment.',
        extraSchemas: [
          buildServiceWithLocalBusiness({
            name: 'Business automation Geneva',
            url: '/en/artificial-intelligence/automation',
            description: 'No-code business automation in Geneva for Swiss SMBs with n8n, Make and Zapier. Lead routing, invoicing, CRM sync, AI-assisted workflows. Sovereign Swiss self-hosting available.',
            serviceType: 'Business process automation',
            priceFrom: 1500,
            lang: 'en',
            extraAreas: ['Zurich', 'Basel', 'Bern'],
          }),
        ],
      }}
    />
  )
}
