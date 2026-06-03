import { BrainCircuit } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildCourse } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'Corporate AI Training Geneva · ChatGPT, Claude, Copilot | DKDP',
  description:
    "Hands-on AI team training in Geneva. ChatGPT, Claude, Copilot, Gemini and the daily workflows your team uses. From CHF 200/h, on-site or remote, in English or French.",
  enPath: '/en/corporate-training/ai',
  frPath: '/formation-entreprise/ia',
  imageAlt: 'Corporate AI training Geneva, ChatGPT Claude Copilot by DKDP',
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
          'Hands-on AI training for your team on Claude, ChatGPT, Copilot and Gemini. Practical workflows, real prompts, take-home playbook. Half-day to two days, on-site or remote. From CHF 200/h.',
        icon: BrainCircuit,
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        problem: {
          title: 'Why AI training so often fails to stick',
          items: [
            { title: 'Theory, not practice', text: 'Slide decks about "what AI is". We open the tools at minute 10 and work on your real tasks for the rest of the session.' },
            { title: 'Generic, not your tools', text: 'A demo on a fictional company. We build prompts for your actual workflows, your documents, your context.' },
            { title: 'One session, then forgotten', text: 'No reinforcement, no playbook. We leave a documented prompt library and offer two weeks of follow-up Q&A.' },
          ],
        },
        bullets: [
          { title: 'Daily-driver tools', text: 'Claude.ai, ChatGPT, Microsoft Copilot, Google Gemini. The ones your team will actually use.' },
          { title: 'Real workflows', text: 'Email drafting, meeting summaries, data analysis, document generation, research, coding helpers.' },
          { title: 'Custom prompts and playbooks', text: 'We co-write 20 to 30 prompts tailored to your business. Your team keeps and extends them.' },
          { title: 'Prompt engineering', text: 'Context, structure, iteration, few-shot examples. The techniques that turn AI from gimmick to multiplier.' },
          { title: 'Privacy and prompt hygiene', text: 'What to share, what to never share, how to anonymise. Practical, not paranoid.' },
          { title: 'On-site or remote', text: 'Your office in Geneva, Lausanne, Zurich, Basel, or remote on Teams or Meet.' },
          { title: 'Bilingual delivery', text: 'Sessions delivered in English or French. Materials in both languages on request.' },
        ],
        stats: [
          { value: 'CHF 200/h', label: 'For 1 person' },
          { value: '4-12 people', label: 'Per group session' },
          { value: 'Tailored', label: 'To your tools' },
          { value: '2 weeks', label: 'Email follow-up' },
        ],
        process: [
          { title: 'Pre-session interview', text: '30-minute call to map your tools, pain points and team level. We design the agenda accordingly.' },
          { title: 'Co-build playbook', text: 'During the session we co-write the prompts and workflows your team will reuse, on your real work.' },
          { title: 'Live workflows', text: 'No slides past minute 10. Tools open, real prompts, real outputs.' },
          { title: 'Follow-up Q&A', text: 'Two weeks of free email Q&A after the session. Real questions, real answers.' },
        ],
        pricing: {
          title: 'Hourly rate scaled to your group',
          subtitle: 'Price depends on the number of participants. The programme is tailored to your company.',
          tiers: [
            { name: '1 person', price: 'CHF 200', cadence: 'Per hour', description: 'One-to-one coaching, fully tailored to your role and tools.', features: ['Personalised agenda', 'Your real use cases', 'Custom prompt library', '2 weeks email Q&A', 'Completion certificate'], ctaLabel: 'Book a session' },
            { name: '2 people', price: 'CHF 300', cadence: 'Per hour', description: 'Paired training for two colleagues on shared workflows.', features: ['Everything in 1 person, plus:', 'Shared workflows', 'Peer practice exercises', 'Two certificates'], highlighted: true, ctaLabel: 'Book a session' },
            { name: 'Group (3 to 10)', price: 'On request', cadence: 'Half-day or full day', description: 'Team session, on-site or remote, with a custom programme.', features: ['Everything above, plus:', 'Half-day or full-day format', 'Department-specific use cases', 'Group playbook', 'On-site across Switzerland or remote'], ctaLabel: 'Request a quote' },
          ],
          note: 'All prices in Swiss francs, excluding VAT 8.1%. Group sessions are quoted per project. A half-day is 3 hours of training plus 1 hour of preparation; a full day is 6 hours plus 2.',
        },
        testimonials: [
          { quote: 'The team avoided ChatGPT out of fear. After one DKDP session, everyone has their own prompts, saves over an hour a day, and understands the limits. 100% operational from day one.', author: 'Operations Director', role: 'Geneva SME' },
          { quote: 'Romane tailored the whole session to our real workflows. No generic theory. The take-home playbook is used across the team weeks later.', author: 'HR Lead', role: 'Swiss services firm' },
          { quote: 'We trained 12 people across departments in a single day. Marketing, sales, finance, each left with prompts for their own work. ROI was obvious within the month.', author: 'CEO', role: 'Lausanne company' },
        ],
        bridge: {
          title: 'Going further',
          links: [
            { label: 'Claude AI Training', href: '/en/corporate-training/claude-ai', description: 'Go deep on Claude specifically: Projects, Cowork, Claude Code. From CHF 200/h.' },
            { label: 'AI implementation', href: '/en/artificial-intelligence/implementation', description: 'Ready to deploy AI across your stack, not just train on it? From CHF 3\'500.' },
            { label: 'Business automation', href: '/en/artificial-intelligence/automation', description: 'Automate the repetitive work your team just learned to spot. From CHF 1\'500.' },
          ],
        },
        faq: [
          { question: 'Do you need technical skills to follow the AI training?', answer: 'No. The training is designed for non-technical people: managers, assistants, sales, HR, finance. We start from the tools you already use and learn to enrich them with AI. No code, no technical prerequisites.' },
          { question: 'How much does corporate AI training cost?', answer: "CHF 200/hour for one person, CHF 300/hour for two. Group sessions (3 to 10 people) are quoted per project as a half-day or full-day. The programme is 100% tailored to your tools and real use cases." },
          { question: 'How long does the AI training last?', answer: 'The standard format is a half-day (3 hours training plus 1 hour prep) or a full day (6 hours plus 2). Custom hour-by-hour formats are available for specific topics or smaller groups.' },
          { question: 'Can the team be trained on its own tools?', answer: 'Yes, and it is recommended. We adapt every exercise to your existing tools (Microsoft 365, Google Workspace, Notion, HubSpot). Your team learns directly on its real environment.' },
          { question: 'Is the training in person or online?', answer: 'Both. On-site across Geneva and French-speaking Switzerland, or online via video conference with interactive exercises and live workshops. Hybrid format also available.' },
          { question: 'Do participants receive a certificate?', answer: 'Yes. Each participant receives a personalised completion certificate plus a detailed PDF summary of the programme covered.' },
        ],
        finalTitle: 'Book your AI team training',
        finalText: 'Tell us your team size and the tools they use. We design a tailored agenda, send a fixed quote and run the session in Geneva or remote, in English or French. No commitment.',
        extraSchemas: [
          buildCourse({
            name: 'Corporate AI Training',
            url: '/en/corporate-training/ai',
            description: 'Hands-on AI training for teams in Geneva. ChatGPT, Claude, Copilot, Gemini and the daily workflows your team uses. Tailored to your tools.',
            duration: 'PT6H',
            teaches: ['ChatGPT', 'Claude', 'Microsoft Copilot', 'Gemini', 'Prompt engineering', 'AI data privacy'],
            prerequisites: 'No technical prerequisites',
            priceFrom: 200,
            ratingValue: '4.9',
            ratingCount: 200,
            lang: 'en',
          }),
        ],
      }}
    />
  )
}
