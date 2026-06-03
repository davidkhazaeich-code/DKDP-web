import { Cpu } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildServiceWithLocalBusiness } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'AI Implementation Geneva · Deploy AI Inside Your Stack | DKDP',
  description:
    "AI implementation in Geneva. Integrate ChatGPT, Claude and other LLMs inside your existing stack and train your team. From CHF 3'500 fixed quote.",
  enPath: '/en/artificial-intelligence/implementation',
  frPath: '/intelligence-artificielle/mise-en-place',
  imageAlt: 'AI implementation Geneva, deploy LLMs in your stack by DKDP',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/artificial-intelligence/implementation"
      config={{
        pillar: 'ia',
        hubName: 'Artificial Intelligence',
        hubHref: '/en/artificial-intelligence',
        tag: 'AI implementation · Geneva',
        h1Lead: 'Real AI, deployed',
        h1Highlight: 'inside your existing stack.',
        subtitle:
          "Integration of ChatGPT, Claude and other LLMs inside your existing tools, connected to your data and adopted by your team. No proof-of-concept hell, no shelfware. From CHF 3'500.",
        icon: Cpu,
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        problem: {
          title: 'Why AI projects fail to land',
          items: [
            { title: 'It lives outside the workflow', text: 'A separate AI tool nobody opens. We deploy AI inside Slack, Teams, your CRM and inbox, where work already happens.' },
            { title: 'It does not know your context', text: 'Generic AI gives generic answers. We connect the model to your documents, your CRM, your databases so it knows your business.' },
            { title: 'Nobody adopts it', text: 'Adoption is the real risk. We run a champion programme, training and metrics so usage actually sticks past 70%.' },
          ],
        },
        bullets: [
          { title: 'Works in your environment', text: 'Slack, Teams, Notion, HubSpot, Pipedrive, Gmail. Wherever your team already lives.' },
          { title: 'Connected to your data', text: 'Google Drive, SharePoint, Notion, your CMS, your databases. The AI knows your context.' },
          { title: 'The right model for the job', text: 'Claude Opus 4.7, GPT-5, Gemini 3, Mistral, Llama 4, or sovereign Swiss (Euria, Swisscom). Benchmarked on your data.' },
          { title: 'IT-friendly deployment', text: 'SSO, audit logs, role-based access. We work with your IT and security team, not around them.' },
          { title: 'Internal champion programme', text: 'We train 2 to 3 of your team to extend prompts and workflows themselves. Knowledge stays in-house.' },
          { title: 'Adoption metrics tracked', text: 'How many people use it, how often, on which tasks. We share the dashboard, not hide it.' },
          { title: 'Cost optimisation', text: 'Model choice, caching, prompt size, batch inference. We minimise the AI bill without sacrificing quality.' },
          { title: 'Sector use cases', text: 'Sales, support, HR, finance, legal. Concrete deployments per department, not abstract demos.' },
        ],
        stats: [
          { value: "CHF 3'500+", label: 'From, fixed quote' },
          { value: '4-12 weeks', label: 'End-to-end' },
          { value: 'SSO + audit', label: 'IT-friendly' },
          { value: '> 70%', label: 'Adoption typical' },
        ],
        process: [
          { title: 'Discovery and scope', text: '2-week kickoff: interviews, data inventory, security alignment with your IT team.' },
          { title: 'Build and integrate', text: 'Weekly build sprints with demos. Model, connectors, surfaces and analytics wired up.' },
          { title: 'Pilot and iterate', text: '2 to 4 weeks of pilot with a champion team. We adjust prompts, tools and UI based on real use.' },
          { title: 'Rollout and train', text: 'Company-wide rollout with training sessions. Champions take over routine maintenance.' },
        ],
        pricing: {
          title: 'Two packages plus enterprise',
          subtitle: 'Scoped to the number of surfaces and integrations.',
          tiers: [
            { name: 'Standard', price: "CHF 3'500", cadence: 'Fixed quote', description: 'LLM integration into one or two surfaces, connected to your core data.', features: ['1 to 2 surfaces (Slack, CRM, etc.)', 'Connected to your key data sources', 'Model benchmarking on your data', 'Prompt library and guardrails', '4 to 6-week delivery', '3-month follow-up'], ctaLabel: 'Start with Standard' },
            { name: 'Advanced', price: "CHF 6'500", cadence: 'Fixed quote', description: 'Multi-surface deployment, IT integration, champion programme and adoption tracking.', features: ['Everything in Standard, plus:', 'Multi-surface deployment', 'SSO and audit logs', 'Champion programme + training', 'Adoption dashboard', 'Cost optimisation pass', '8 to 12-week delivery'], highlighted: true, ctaLabel: 'Start with Advanced' },
            { name: 'Enterprise', price: 'On request', cadence: 'Scoped per project', description: 'Sovereign Swiss hosting, custom integrations, organisation-wide rollout.', features: ['Everything in Advanced, plus:', 'Sovereign Swiss hosting (Euria / Swisscom)', 'Self-hosted Mistral / Llama option', 'Custom integrations', 'Organisation-wide rollout', 'SLA and dedicated support'], ctaLabel: 'Talk to us' },
          ],
          note: 'All prices in Swiss francs, excluding VAT 8.1%. Free initial scoping. Optional managed support from CHF 250/month.',
        },
        comparison: {
          title: 'Which LLM should you deploy?',
          subtitle: 'We benchmark on your real data and pick the best fit, with the option to swap as the field moves.',
          headers: ['Claude Opus 4.7', 'GPT-5', 'Gemini 3', 'Mistral / Euria'],
          rows: [
            { label: 'Long-document reasoning', values: ['Excellent', 'Good', 'Good', 'Fair'], emphasizeColumn: 0 },
            { label: 'Multimodal (image, voice)', values: ['Good', 'Excellent', 'Excellent', 'Limited'], emphasizeColumn: 1 },
            { label: 'Google Workspace fit', values: ['Good', 'Good', 'Excellent', 'Fair'], emphasizeColumn: 2 },
            { label: 'Self-hostable / Swiss', values: ['No', 'No', 'No', 'Yes'], emphasizeColumn: 3 },
            { label: 'Cost per million tokens', values: ['$15 / $75', '$10 / $40', '$3.5 / $14', 'Low / subscription'] },
            { label: 'Best fit at DKDP', values: ['Knowledge, legal', 'Multimodal support', 'Workspace-first', 'Regulated, sovereign'] },
          ],
        },
        testimonials: [
          { quote: 'DKDP deployed Claude inside our Slack and connected it to our knowledge base. Adoption hit 78% in 90 days. People now ask the AI before they ask a colleague.', author: 'COO', role: 'Swiss services firm' },
          { quote: 'We needed a sovereign deployment on Euria for compliance. DKDP handled the integration, SSO, audit logs and trained two champions. Our DPO signed off cleanly.', author: 'Head of IT', role: 'Geneva private bank' },
          { quote: 'The cost-optimisation pass alone cut our AI bill by 40% through caching and model routing. The implementation paid for itself within the year.', author: 'CFO', role: 'B2B SaaS, Lausanne' },
        ],
        bridge: {
          title: 'Going further with AI',
          links: [
            { label: 'Custom AI agents', href: '/en/artificial-intelligence/ai-agents', description: 'Move from assistance to autonomous action with agents that decide and execute. From CHF 2\'500.' },
            { label: 'Corporate AI training', href: '/en/corporate-training/ai', description: 'Adoption sticks faster when your team is trained. Hands-on AI training. From CHF 1\'500.' },
            { label: 'AI audit and consulting', href: '/en/artificial-intelligence/audit-consulting', description: 'Not sure what to deploy first? A 2-week audit and prioritised roadmap. From CHF 490.' },
          ],
        },
        faq: [
          { question: 'Will this work with our existing tools?', answer: 'Almost certainly. We integrate with all major SaaS (Microsoft 365, Google Workspace, Slack, HubSpot, Pipedrive, Notion, Salesforce, Bexio, etc.) and most APIs. If a tool has no API, we find a workable workaround or recommend an alternative.' },
          { question: 'How do we handle data privacy?', answer: 'Privacy is baked into the design: anonymisation pipelines, no training on your data, EU or sovereign Swiss hosting where required, audit logs, retention policies. We work with your DPO from week one.' },
          { question: 'What if our team does not use it?', answer: 'Adoption is the biggest risk and we plan for it. Pilot programme with champions, training sessions, weekly office hours, adoption metrics shared with leadership. Most rollouts hit over 70% weekly active users within 90 days.' },
          { question: 'Which LLM will you use?', answer: 'We benchmark Claude Opus 4.7, GPT-5, Gemini 3, Mistral and Llama 4 on your real data, plus sovereign Swiss options (Euria, Swisscom) for regulated sectors. We pick the best fit and can swap later as the field evolves.' },
          { question: 'Can you deploy on sovereign Swiss infrastructure?', answer: 'Yes. For regulated sectors we deploy on Infomaniak Euria, Swisscom Swiss AI, or self-host Mistral / Llama on a Swiss VPS, so data never leaves Swiss territory. nFADP-compliant by design.' },
          { question: 'How do you keep AI costs under control?', answer: 'A dedicated cost-optimisation pass: model routing (cheap model for easy tasks), prompt caching, batch inference, prompt-size reduction. Typical savings of 30 to 50% versus a naive deployment.' },
        ],
        finalTitle: 'Free AI implementation scoping',
        finalText: 'Tell us your stack and your top use case. We come back with a fixed quote, a model recommendation, an integration plan and an adoption strategy. No commitment.',
        extraSchemas: [
          buildServiceWithLocalBusiness({
            name: 'AI implementation Geneva',
            url: '/en/artificial-intelligence/implementation',
            description: 'AI implementation in Geneva for Swiss SMBs. Integrate Claude, GPT-5, Gemini or sovereign Swiss LLMs inside your existing stack, connected to your data, adopted by your team.',
            serviceType: 'AI implementation and integration',
            priceFrom: 3500,
            lang: 'en',
            extraAreas: ['Zurich', 'Basel', 'Bern'],
          }),
        ],
      }}
    />
  )
}
