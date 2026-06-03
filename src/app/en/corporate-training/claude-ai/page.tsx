import { GraduationCap } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildCourse } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'Claude AI Training Geneva · Claude.ai, Projects, Code | DKDP',
  description:
    "Hands-on Claude AI training for your team. Claude.ai, Projects, Cowork and Claude Code. From first prompt to autonomous agents. Geneva or remote. From CHF 200/h.",
  enPath: '/en/corporate-training/claude-ai',
  frPath: '/formation-entreprise/claude-ai',
  imageAlt: 'Claude AI training Geneva, Claude.ai Projects Code by DKDP',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/claude-ai"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'Claude AI Training · Geneva',
        h1Lead: 'Master Claude,',
        h1Highlight: 'from first prompt to agents.',
        subtitle:
          'Hands-on training on Claude.ai, Projects, Cowork and Claude Code. From everyday prompting to building autonomous agents your team uses daily. Delivered in Geneva or remote. From CHF 200/h.',
        icon: GraduationCap,
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        problem: {
          title: 'Why teams underuse Claude',
          items: [
            { title: 'Stuck on basic prompting', text: 'Most people treat Claude like a search box. We teach the techniques that 10x output: context, structure, iteration, Projects.' },
            { title: 'Afraid of data leaks', text: 'Teams avoid AI for fear of leaking sensitive data. We teach exactly what to share, what to anonymise, and how Workspaces work.' },
            { title: 'No shared practice', text: 'One power user, the rest left behind. We level the whole team and leave a shared prompt library everyone reuses.' },
          ],
        },
        bullets: [
          { title: 'Claude.ai daily use', text: 'Prompting techniques, attachments, voice input, artifacts, Extended Thinking. The features your team will reuse.' },
          { title: 'Projects and knowledge bases', text: 'How to set up Projects with your documents, style guides and brand voice for consistent outputs.' },
          { title: 'Cowork for teams', text: 'Shared spaces, multi-agent workflows, async collaboration patterns. The right way to scale.' },
          { title: 'Claude Code for devs', text: 'Pair programming, file ops, refactors, MCPs, custom agents. From beginner to advanced patterns.' },
          { title: 'Use cases by department', text: 'Leadership, marketing, sales, HR, finance, legal, developers. Concrete prompts for every role.' },
          { title: 'Privacy and data handling', text: 'What to share, what to anonymise, how to use Workspaces vs personal accounts properly.' },
          { title: 'Custom prompts library', text: 'We co-build 20+ prompts tailored to your business. Yours to keep and extend.' },
          { title: 'Take-home playbook', text: 'A documented playbook of techniques, prompts and workflows so the learning sticks past day one.' },
        ],
        stats: [
          { value: 'CHF 200/h', label: 'For 1 person' },
          { value: '4-12 people', label: 'Per group session' },
          { value: 'Claude Pro', label: 'Setup advice included' },
          { value: '2 weeks', label: 'Email Q&A after' },
        ],
        process: [
          { title: 'Pre-session interview', text: '30-minute call to map your tools, team level and real use cases. We design the agenda accordingly.' },
          { title: 'Co-build the playbook', text: 'During the session we co-write the prompts and Projects your team will reuse, on your real work.' },
          { title: 'Live, hands-on', text: 'Tools open from minute 10. Real prompts, real outputs, per-department use cases.' },
          { title: 'Follow-up Q&A', text: 'Two weeks of free email Q&A after the session. Real questions, real answers.' },
        ],
        pricing: {
          title: 'Hourly rate scaled to your group',
          subtitle: 'Price depends on the number of participants. The programme is tailored to your company.',
          tiers: [
            { name: '1 person', price: 'CHF 200', cadence: 'Per hour', description: 'One-to-one coaching, fully tailored to your role and tools.', features: ['Fully personalised agenda', 'Your real use cases', 'Custom prompt library', 'Claude Pro setup advice', '2 weeks email Q&A', 'Completion certificate'], ctaLabel: 'Book a session' },
            { name: '2 people', price: 'CHF 300', cadence: 'Per hour', description: 'Paired training for two colleagues on shared workflows.', features: ['Everything in 1 person, plus:', 'Shared workflows and prompts', 'Peer practice exercises', 'Two completion certificates'], highlighted: true, ctaLabel: 'Book a session' },
            { name: 'Group (3 to 10)', price: 'On request', cadence: 'Half-day or full day', description: 'Team session, on-site or remote, with a custom programme.', features: ['Everything above, plus:', 'Half-day or full-day format', 'Per-department use cases', 'Group playbook', 'On-site across Switzerland or remote', 'Dedicated Claude Code module option'], ctaLabel: 'Request a quote' },
          ],
          note: 'All prices in Swiss francs, excluding VAT 8.1%. Group sessions (3 to 10 people) are quoted per project. A dedicated Claude Code developer session is available as a full or two-day format.',
        },
        comparison: {
          title: 'Claude vs ChatGPT vs Copilot',
          subtitle: 'We cover the comparison and help your team pick the right tool per task.',
          headers: ['Claude', 'ChatGPT', 'Copilot'],
          rows: [
            { label: 'Long-form writing', values: ['Excellent', 'Good', 'Good'], emphasizeColumn: 0 },
            { label: 'Reasoning and nuance', values: ['Excellent', 'Good', 'Fair'], emphasizeColumn: 0 },
            { label: 'Long-document analysis', values: ['Excellent', 'Good', 'Fair'], emphasizeColumn: 0 },
            { label: 'Tool use and plugins', values: ['Good', 'Excellent', 'Good'], emphasizeColumn: 1 },
            { label: 'Microsoft 365 integration', values: ['Fair', 'Good', 'Excellent'], emphasizeColumn: 2 },
            { label: 'Coding (agentic)', values: ['Excellent', 'Good', 'Good'], emphasizeColumn: 0 },
            { label: 'Projects / knowledge base', values: ['Excellent', 'Good', 'Fair'], emphasizeColumn: 0 },
            { label: 'Best for', values: ['Knowledge work, writing, code', 'General assistance, tools', 'Office 365 power users'] },
          ],
        },
        testimonials: [
          { quote: 'Romane ran a Claude session for our leadership team. Within a week, everyone was using Projects with our own documents. The take-home playbook is referenced daily.', author: 'Managing Director', role: 'Geneva services firm' },
          { quote: 'The Claude Code developer day transformed how our engineers work. Custom agents, MCPs, real refactors on our codebase. Worth every hour.', author: 'Engineering Lead', role: 'Swiss SaaS scale-up' },
          { quote: 'Per-department use cases made it click for everyone, from finance to marketing. No generic theory, just prompts we use the next morning.', author: 'COO', role: 'Lausanne SME' },
        ],
        bridge: {
          title: 'Going further',
          links: [
            { label: 'Corporate AI training', href: '/en/corporate-training/ai', description: 'Want to cover ChatGPT and Copilot too, not just Claude? A broader AI tools session. From CHF 200/h.' },
            { label: 'AI implementation', href: '/en/artificial-intelligence/implementation', description: 'Ready to deploy Claude across your stack with SSO and integrations? From CHF 3\'500.' },
            { label: 'Custom AI agents', href: '/en/artificial-intelligence/ai-agents', description: 'Turn Claude into an autonomous agent for your team. From CHF 2\'500.' },
          ],
        },
        faq: [
          { question: 'How much does Claude training cost?', answer: "CHF 200/hour for one person, CHF 300/hour for two. Group sessions (3 to 10 people) are quoted per project as a half-day or full-day. The programme is fully tailored to your team and tools." },
          { question: 'Do we need a Claude Pro plan for the training?', answer: 'Claude Pro per participant is strongly recommended (Workspaces or individual). We help you choose the right plan during the pre-session call. Free-plan limits make practical exercises difficult.' },
          { question: 'Is Claude better than ChatGPT or Copilot?', answer: 'Different strengths. Claude tends to win on long-form writing, reasoning and nuanced tasks. ChatGPT on tool use and general assistance. Copilot on Microsoft 365 integration. We cover the comparison and help your team pick the right tool per task.' },
          { question: 'Can we have a custom session for Claude Code?', answer: 'Yes. A dedicated full-day or two-day developer session covering Claude Code: setup, MCPs, custom agents, project workflows, advanced patterns. Built for engineering teams.' },
          { question: 'In which language is the training delivered?', answer: 'English or French, your choice. Materials can be provided in both. Our trainers work daily with bilingual teams in Geneva and across Switzerland.' },
          { question: 'Do participants get a certificate?', answer: 'Yes. Each participant receives a personalised completion certificate plus the take-home playbook of prompts and workflows covered in the session.' },
        ],
        finalTitle: 'Book your Claude AI training',
        finalText: 'Tell us your team size and goals. We design a tailored agenda, send a fixed quote and run the session in Geneva or remote, in English or French. No commitment.',
        extraSchemas: [
          buildCourse({
            name: 'Claude AI Training',
            url: '/en/corporate-training/claude-ai',
            description: 'Hands-on Claude AI training for teams in Geneva. Claude.ai, Projects, Cowork, Claude Code. From everyday prompting to autonomous agents.',
            duration: 'PT6H',
            teaches: ['Claude.ai prompting', 'Claude Projects', 'Cowork for teams', 'Claude Code', 'Prompt engineering', 'AI data privacy'],
            prerequisites: 'No technical prerequisites',
            priceFrom: 200,
            ratingValue: '4.9',
            ratingCount: 120,
            lang: 'en',
          }),
        ],
      }}
    />
  )
}
