import { Bot } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildServiceWithLocalBusiness } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'Custom AI Agents Geneva · Claude, GPT-5, LangChain | DKDP',
  description:
    "Custom autonomous AI agents for Swiss SMBs: virtual assistants, sales agents, RAG. Built on Claude Anthropic, GPT-5, LangChain, n8n. From CHF 2'500, 48-hour quote.",
  enPath: '/en/artificial-intelligence/ai-agents',
  frPath: '/intelligence-artificielle/agents-ia',
  imageAlt: 'Custom AI agents Geneva: Claude, GPT-5, LangChain by DKDP',
  ogImage: '/images/og/agents-ia.png',
})

const FAQ_ITEMS = [
  {
    question: 'What is the difference between an AI agent and a simple chatbot?',
    answer:
      'A chatbot replies to predefined keywords along a fixed decision tree. An AI agent reads the context of every interaction, makes autonomous decisions based on your business rules, integrates with your tools (CRM, email, databases) and executes concrete actions without human intervention. It is the difference between a smart form and an autonomous teammate.',
  },
  {
    question: 'Which languages can the agent communicate in?',
    answer:
      'DKDP agents work natively in French, English, German and Italian. For specific markets, other languages can be added depending on your context. The agent automatically detects the language of the person it talks to and replies in the same language.',
  },
  {
    question: 'How is my data protected?',
    answer:
      'Data security is an absolute priority. Depending on your constraints, we deploy the agent on your infrastructure (private cloud or on-premise) or via providers compliant with the GDPR and Swiss data protection law. Your data is never used to train third-party models. A confidentiality agreement is always signed.',
  },
  {
    question: 'Who maintains the agent once deployed?',
    answer:
      'DKDP provides a 3-month post-deployment follow-up included in every project. During this period, we monitor performance, adjust behaviours and handle the edge cases identified. Beyond that, a monthly maintenance can be set up. Your team is also trained to handle routine adjustments autonomously.',
  },
  {
    question: 'What happens if the agent makes a mistake?',
    answer:
      'Every agent is built with a confidence threshold. Below that threshold, it automatically escalates to a human rather than answering incorrectly. Errors are logged and analysed during the monthly follow-up. In the first weeks, we recommend human validation on a subset of interactions to calibrate the behaviour.',
  },
  {
    question: 'Claude or ChatGPT for my business?',
    answer:
      'We pick the model based on your use case. Claude Opus 4.7 (Anthropic) is preferred for agents that reason over long text, analyse large documents (contracts, reports, knowledge bases) and use business tools. GPT-5 (OpenAI) is preferred for multimodal agents (text, image, voice) and broad integrations. Gemini 3 (Google) wins when your stack is 100% Google Workspace. For regulated sectors (medical, legal, finance), we also offer self-hosted Mistral, Llama 4, or sovereign Swiss solutions (Infomaniak Euria, Swisscom Swiss AI Assistant).',
  },
  {
    question: 'Is my data hosted in Switzerland?',
    answer:
      'Yes, if your regulatory constraints (Swiss nFADP 2023, banking secrecy, medical confidentiality) require it. We then deploy the agent on an Infomaniak VPS in Switzerland or on your on-premise infrastructure, with LangChain/LangGraph for orchestration and self-hosted Qdrant or Weaviate as the vector store. Data never leaves Swiss territory. A confidentiality agreement and a DPA (Data Processing Agreement) are signed before kickoff.',
  },
  {
    question: 'What ROI can I expect from a sales AI agent?',
    answer:
      'On DKDP deployments in 2026, a sales-qualification agent frees up on average 15 hours per week for the sales team, handles 100+ leads per day and improves the conversion rate by 20 to 35% (better scoring, sharper follow-ups, automatic CRM enrichment). ROI is generally reached within 2 to 4 months for an SMB of 5 to 30 people. We deliver a quantified ROI projection during the free initial audit.',
  },
  {
    question: 'How long to deploy a custom AI agent?',
    answer:
      "A Starter agent (1 use case, 1 channel) goes live in 2 weeks. A Pro agent (multi-channel, CRM and business-tool integrations, up to 3 coordinated agents) takes 4 to 6 weeks. More complex projects (RAG agents on large knowledge bases, LangGraph multi-agent orchestration, specific integrations like Bexio, HubSpot, Salesforce) are quoted on request, with a first testable version in 3 to 4 weeks.",
  },
]

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/artificial-intelligence/ai-agents"
      config={{
        pillar: 'ia',
        hubName: 'Artificial Intelligence',
        hubHref: '/en/artificial-intelligence',
        tag: 'AI agents · Geneva',
        h1Lead: 'Custom AI agents',
        h1Highlight: 'that act, not just chat.',
        subtitle:
          'Autonomous AI agents trained on your documentation, your tone of voice and your processes. Built on Claude Anthropic, GPT-5 or Gemini 3, deployed where your team already works. From CHF 2\'500.',
        icon: Bot,
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        problem: {
          title: 'Where AI agents pay back fastest',
          items: [
            { title: 'Sales qualification', text: 'Inbound leads pile up faster than your team can answer. An agent qualifies, scores and enriches the CRM 24/7, then hands the hot ones to a human.' },
            { title: 'Customer support', text: 'The same 20 questions, all day. A RAG agent grounded in your docs handles them instantly and escalates only what needs a human.' },
            { title: 'Internal knowledge', text: 'Your team wastes hours searching contracts, procedures, past projects. An agent retrieves the right answer with the source cited.' },
          ],
        },
        stats: [
          { value: "CHF 2'500+", label: 'From, fixed quote' },
          { value: '2-6 weeks', label: 'Build and train' },
          { value: 'Claude, GPT, Gemini', label: 'Models benchmarked' },
          { value: 'Your data', label: 'Stays yours' },
        ],
        bullets: [
          { title: 'Grounded in your context', text: 'Agents read your docs, knowledge base and style guide. Answers stay on brand, never hallucinated.' },
          { title: 'Tool use that works', text: 'Calendar booking, CRM updates, file retrieval, payment status, invoice generation. Real integrations, not demos.' },
          { title: 'Technical stack', text: 'Claude Anthropic, GPT-5, Gemini 3, LangChain, LangGraph, n8n, Qdrant, Weaviate. The right tool for the job.' },
          { title: 'Slack, Teams, web, voice', text: 'Deployed in the surfaces your team already uses. Web widget, Slack bot, Teams app, voice agent.' },
          { title: 'Privacy first', text: 'Anonymisation pipelines, no training on your data, sovereign Swiss hosting (Euria, Swisscom) when it matters. nFADP-clean.' },
          { title: 'Multilingual by default', text: 'French, English, German, Italian detected automatically. Other languages on request.' },
          { title: 'Maintainable by you', text: 'You own the prompts and the workflows. We document, train your team, no lock-in.' },
          { title: 'Measured ROI', text: 'Hours saved, tickets deflected, leads captured. The metric your CFO actually asks about. ROI projection at the audit.' },
        ],
        process: [
          { title: 'Free audit', text: 'We map your use cases, pick the highest-ROI agent, and benchmark models on your real data. ROI projection delivered.' },
          { title: 'Prototype in 2 weeks', text: 'A working agent on one use case and one channel. You test it in real conditions before validating.' },
          { title: 'Integrate and orchestrate', text: 'Connection to your tools (CRM, ERP, calendar). Multi-agent orchestration with LangGraph if needed. Zero stack rebuild.' },
          { title: 'Train and follow up', text: 'Your team learns to adjust the agent. 3-month follow-up included, with weekly tuning in month one.' },
        ],
        pricing: {
          title: 'Three packages, fixed quote',
          subtitle: 'Pick the scope that matches your use case. Switch up at any time, no lock-in.',
          tiers: [
            {
              name: 'Starter',
              price: "CHF 2'500",
              cadence: 'Fixed quote',
              description: 'One agent, one use case, one channel. Perfect to prove value fast.',
              features: ['1 use case (support, sales or internal)', '1 channel (web, Slack or WhatsApp)', 'RAG on up to 100 documents', 'Model benchmarking included', '2-week delivery', '3-month follow-up'],
              ctaLabel: 'Start with Starter',
            },
            {
              name: 'Pro',
              price: "From CHF 4'900",
              cadence: 'Fixed quote',
              description: 'Multi-channel, CRM and business-tool integrations, up to 3 coordinated agents.',
              features: ['Everything in Starter, plus:', 'Multi-channel (web + Slack + WhatsApp)', 'CRM and ERP integrations', 'Up to 3 coordinated agents', 'Custom analytics dashboard', '4 to 6-week delivery'],
              highlighted: true,
              ctaLabel: 'Start with Pro',
            },
            {
              name: 'Enterprise',
              price: 'On request',
              cadence: 'Scoped per project',
              description: 'Large knowledge bases, LangGraph multi-agent orchestration, sovereign Swiss hosting.',
              features: ['Everything in Pro, plus:', 'RAG on large knowledge bases', 'LangGraph multi-agent orchestration', 'Sovereign Swiss hosting (Euria / Swisscom)', 'SSO and audit logs', 'Dedicated team training'],
              ctaLabel: 'Talk to us',
            },
          ],
          note: 'All prices in Swiss francs, excluding VAT 8.1%. Free initial audit with ROI projection. Optional monthly maintenance from CHF 250/month.',
        },
        comparison: {
          title: 'Which LLM should power your agent?',
          subtitle: 'We benchmark on your real data before locking in, and we can swap later if a better model arrives.',
          headers: ['Claude Opus 4.7', 'GPT-5', 'Gemini 3', 'Euria / Swiss'],
          rows: [
            { label: 'Long-context reasoning', values: ['Excellent', 'Good', 'Good', 'Fair'], emphasizeColumn: 0 },
            { label: 'Tool use and orchestration', values: ['Excellent', 'Excellent', 'Good', 'Fair'], emphasizeColumn: 0 },
            { label: 'Multimodal (image, voice)', values: ['Good', 'Excellent', 'Excellent', 'Limited'], emphasizeColumn: 1 },
            { label: 'Google Workspace fit', values: ['Good', 'Good', 'Excellent', 'Fair'], emphasizeColumn: 2 },
            { label: 'Swiss data residency', values: ['EU only', 'EU only', 'EU only', 'Full Swiss'], emphasizeColumn: 3 },
            { label: 'Best fit at DKDP', values: ['Knowledge work, legal', 'Multimodal, broad integrations', 'Workspace-first SMBs', 'Regulated sectors'] },
          ],
        },
        testimonials: [
          { quote: 'The sales-qualification agent handles 120 inbound leads a week, scores them and enriches our CRM. The team gained 15 hours a week and conversion is up 28%.', author: 'Sales Director', role: 'B2B services, Geneva' },
          { quote: 'We deployed a RAG agent on our internal procedures, hosted on Euria for nFADP compliance. Our consultants find the right clause in seconds instead of minutes.', author: 'Managing Partner', role: 'Geneva fiduciary' },
          { quote: 'A multilingual support agent on WhatsApp and our website. 65% of questions resolved without a human. Our reception team finally has time to breathe.', author: 'Operations Lead', role: 'Lausanne retailer' },
        ],
        bridge: {
          title: 'Going further with AI',
          links: [
            { label: 'Business automation', href: '/en/artificial-intelligence/automation', description: 'Connect your agent to no-code workflows on n8n: invoicing, CRM sync, reporting. From CHF 1\'500.' },
            { label: 'AI chatbot', href: '/en/artificial-intelligence/ai-chatbot', description: 'Need a customer-facing assistant first? Start with a chatbot grounded in your docs. From CHF 2\'900.' },
            { label: 'AI audit and consulting', href: '/en/artificial-intelligence/audit-consulting', description: 'Not sure which agent to build first? Start with a 2-week audit and a prioritised roadmap.' },
          ],
        },
        faq: FAQ_ITEMS,
        finalTitle: 'Free AI agent scoping call',
        finalText: 'Tell us your top use case (sales, support, internal knowledge). We come back with a fixed quote, a model recommendation and an ROI projection. No commitment.',
        extraSchemas: [
          buildServiceWithLocalBusiness({
            name: 'Custom AI agent development',
            url: '/en/artificial-intelligence/ai-agents',
            description: 'Custom autonomous AI agent development in Geneva for Swiss SMBs. Built on Claude, GPT-5 or Gemini, with LangChain, n8n, Qdrant. Sovereign Swiss hosting available.',
            serviceType: 'AI agent development',
            priceFrom: 2500,
            lang: 'en',
            extraAreas: ['Zurich', 'Basel', 'Bern'],
          }),
        ],
      }}
    />
  )
}
