import { BrainCircuit } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildServiceWithLocalBusiness } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'AI Audit and Consulting Geneva · Where AI Pays Back | DKDP',
  description:
    'AI audit and consulting in Geneva. Find where AI moves the needle in your business. Prioritised roadmap, no buzzwords, in plain English. From CHF 490.',
  enPath: '/en/artificial-intelligence/audit-consulting',
  frPath: '/intelligence-artificielle/audit-conseil',
  imageAlt: 'AI audit and consulting Geneva by DKDP',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/artificial-intelligence/audit-consulting"
      config={{
        pillar: 'ia',
        hubName: 'Artificial Intelligence',
        hubHref: '/en/artificial-intelligence',
        tag: 'AI audit · Geneva',
        h1Lead: 'Find where AI',
        h1Highlight: 'actually pays back.',
        subtitle:
          'A focused audit of your business to map where AI moves the needle and where it does not. Prioritised roadmap, no buzzwords, no slide-deck theatre. From CHF 490.',
        icon: BrainCircuit,
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        problem: {
          title: 'Why most AI projects stall',
          items: [
            { title: 'Starting with the tool, not the problem', text: 'Teams buy an AI tool, then look for a use. We start from your real bottlenecks and only then pick the technology.' },
            { title: 'No way to measure success', text: 'Without a baseline and clear KPIs, AI initiatives drift. We define the metric before we recommend anything.' },
            { title: 'Compliance discovered too late', text: 'A great use case killed at launch by nFADP or sector rules. We flag what you cannot deploy, and why, upfront.' },
          ],
        },
        bullets: [
          { title: 'Process discovery', text: 'Interviews with key roles, document review, time tracking. We see what your team really does.' },
          { title: 'Use-case mapping', text: 'Every process scored on AI fit: model maturity, data availability, expected ROI, risk.' },
          { title: 'Vendor-neutral recommendations', text: 'Claude, GPT, Gemini, n8n, custom build. We pick what fits your team, not what pays us most.' },
          { title: 'Privacy and risk assessment', text: 'GDPR, Swiss nFADP, sector-specific risks. We flag what you cannot deploy and why.' },
          { title: 'Prioritised 90-day roadmap', text: 'Top 3 to 5 AI initiatives ranked by impact and effort. Quick wins shipped in week one.' },
          { title: 'Optional implementation', text: 'You can take the roadmap to any vendor or have us execute through our AI services.' },
        ],
        stats: [
          { value: 'CHF 490+', label: 'From, fixed quote' },
          { value: '1-4 weeks', label: 'Audit delivery' },
          { value: '5-10 ideas', label: 'Scored and ranked' },
          { value: 'Vendor-neutral', label: 'No conflict of interest' },
        ],
        process: [
          { title: 'Kickoff and discovery', text: 'Interviews with key roles, document and tool inventory. We map how work really flows.' },
          { title: 'Score and prioritise', text: 'Every process scored on AI fit, ROI and risk. The shortlist ranked by impact and effort.' },
          { title: 'Deliverables', text: 'Audit report, scoring matrix, 90-day roadmap, executive summary. Plain English, action-ready.' },
          { title: 'Decision workshop', text: 'A working session to align your team, pick the first initiative and define success metrics.' },
        ],
        pricing: {
          title: 'Three audit formats',
          subtitle: 'Scoped to the size and complexity of your organisation.',
          tiers: [
            { name: 'Express', price: 'CHF 490', cadence: 'Fixed quote', description: 'A focused half-day audit for a single team or process.', features: ['1 process or team', 'Use-case scoring', 'Top 3 recommendations', 'Risk and privacy flags', '1-week delivery', 'Executive summary'], ctaLabel: 'Start with Express' },
            { name: 'In-depth', price: 'CHF 890', cadence: 'Fixed quote', description: 'A full business audit across several teams and processes.', features: ['Everything in Express, plus:', 'Multi-team discovery', '5 to 10 scored use cases', '90-day prioritised roadmap', 'Scoring matrix document', 'Decision workshop'], highlighted: true, ctaLabel: 'Start with In-depth' },
            { name: 'Strategic', price: 'On request', cadence: 'Scoped per project', description: 'A company-wide AI strategy with implementation planning.', features: ['Everything in In-depth, plus:', 'Company-wide AI strategy', 'Build vs buy analysis', 'Budget and timeline planning', 'Change-management guidance', 'Quarterly strategy reviews'], ctaLabel: 'Talk to us' },
          ],
          note: 'All prices in Swiss francs, excluding VAT 8.1%. The audit is deliberately vendor-neutral. You keep full freedom to choose any implementation partner.',
        },
        testimonials: [
          { quote: 'The audit cut through the hype. DKDP showed us the 3 places AI would actually pay back, and the 5 where it would not. We saved months chasing the wrong ideas.', author: 'CEO', role: 'Geneva SME, 25 staff' },
          { quote: 'Vendor-neutral, technical, action-ready. The roadmap had model choices, costs and risk flags. We implemented two initiatives the following month.', author: 'COO', role: 'Swiss services firm' },
          { quote: 'They flagged an nFADP issue on our favourite use case before we wasted budget on it. That single insight paid for the audit ten times over.', author: 'CFO', role: 'Geneva fiduciary' },
        ],
        bridge: {
          title: 'After the audit',
          links: [
            { label: 'Custom AI agents', href: '/en/artificial-intelligence/ai-agents', description: 'Ready to build the top initiative? Custom AI agents trained on your data. From CHF 2\'500.' },
            { label: 'Business automation', href: '/en/artificial-intelligence/automation', description: 'Often the quickest win: no-code workflows that remove manual work. From CHF 1\'500.' },
            { label: 'AI implementation', href: '/en/artificial-intelligence/implementation', description: 'Deploy AI across your stack and train your team to use it. From CHF 3\'500.' },
          ],
        },
        faq: [
          { question: 'How is this different from a consulting deck?', answer: 'Every recommendation is technical enough to be implemented. We provide model choices, integration paths, expected costs, risk flags. You can act on the roadmap on day one, not after another phase of work.' },
          { question: 'What if we already use AI?', answer: 'Common. The audit then focuses on optimising what is deployed (prompts, models, costs) and finding the next 3 high-impact additions. Often the biggest wins are not new tools, but better use of existing ones.' },
          { question: 'Do you also implement what you recommend?', answer: 'We can, through our AI agents, automation, chatbot and training services. But the audit is deliberately vendor-neutral so you keep full freedom to choose another implementation partner.' },
          { question: 'Do you sign an NDA?', answer: 'Yes, always, before any discovery work. For regulated sectors we also sign a DPA. Your data and business details stay confidential.' },
          { question: 'What does the deliverable look like?', answer: 'A concise audit report, a scoring matrix ranking use cases by ROI and effort, a 90-day roadmap, and a one-page executive summary for leadership. No 80-slide deck, just what you act on.' },
          { question: 'How do you measure ROI?', answer: 'We define a baseline (time spent, error rate, cost) before recommending anything, then estimate the expected gain per initiative. After implementation, we track the same metrics so the ROI is real, not theoretical.' },
          { question: 'Is the audit compliant with Swiss nFADP?', answer: 'The audit explicitly assesses nFADP and GDPR risk for every use case, and flags what cannot be deployed without sovereign Swiss hosting or anonymisation. Compliance is part of the scoring, not an afterthought.' },
        ],
        finalTitle: 'Book your AI audit',
        finalText: 'A short call to scope the audit, then a fixed quote. You walk away with a clear, ranked, vendor-neutral roadmap of where AI pays back in your business.',
        extraSchemas: [
          buildServiceWithLocalBusiness({
            name: 'AI audit and consulting Geneva',
            url: '/en/artificial-intelligence/audit-consulting',
            description: 'AI audit and consulting in Geneva for Swiss SMBs. Vendor-neutral use-case scoring, prioritised 90-day roadmap, nFADP and GDPR risk assessment.',
            serviceType: 'AI consulting',
            priceFrom: 490,
            lang: 'en',
            extraAreas: ['Zurich', 'Basel', 'Bern'],
          }),
        ],
      }}
    />
  )
}
