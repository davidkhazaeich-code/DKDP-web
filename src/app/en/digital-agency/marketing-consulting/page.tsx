import { Presentation } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildServiceWithLocalBusiness } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'Marketing Consulting Geneva · Digital Strategy and Growth | DKDP',
  description:
    "Marketing consulting in Geneva for Swiss SMBs. Digital strategy, growth experiments, channel mix, AI rollout planning. One-off audit from CHF 1'500 or monthly retainer from CHF 900.",
  enPath: '/en/digital-agency/marketing-consulting',
  frPath: '/agence-digitale/consulting-marketing',
  imageAlt: 'Marketing consulting Geneva, digital strategy by DKDP',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/marketing-consulting"
      config={{
        pillar: 'agence',
        hubName: 'Digital agency',
        hubHref: '/en/digital-agency',
        tag: 'Marketing consulting · Geneva',
        h1Lead: 'Strategy plus hands,',
        h1Highlight: 'not just slides.',
        subtitle:
          'A senior consultant who also ships. Digital strategy, growth experiments, channel mix, AI rollout planning. You leave each session with concrete next steps, not a PDF that gathers dust. From CHF 1\'500.',
        icon: Presentation,
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        problem: {
          title: 'Why marketing budgets underperform',
          items: [
            { title: 'No clear strategy', text: 'Tactics without a plan. Random posts, scattered ads, no positioning. We define where to play and how to win first.' },
            { title: 'Spreading too thin', text: 'Five channels, all mediocre. We focus your budget on the two or three that actually move your pipeline.' },
            { title: 'Plans that never ship', text: 'A strategy deck nobody executes. We end every session with concrete actions, owners and dates, and we can ship them too.' },
          ],
        },
        bullets: [
          { title: 'Strategic audit', text: 'Current funnel, channel mix, customer acquisition cost, competitive landscape. Plain English.' },
          { title: 'Growth roadmap', text: '90-day prioritised plan: what to ship, in what order, with what expected impact.' },
          { title: 'Workshops with your team', text: 'In-person or remote workshops to align on positioning, messaging, channels and execution.' },
          { title: 'Fractional CMO option', text: 'Monthly retainer to act as your part-time head of marketing. Hiring quality, fractional cost.' },
          { title: 'AI rollout planning', text: 'Where and how to deploy AI in your marketing stack without breaking what already works.' },
          { title: 'Executive-ready outputs', text: 'Memos, board updates, investor-ready slides when you need them. Written by someone who ships.' },
        ],
        stats: [
          { value: "CHF 1'500+", label: 'One-off audit' },
          { value: 'CHF 900/mo', label: 'Ongoing retainer' },
          { value: '4-6 weeks', label: 'First roadmap impact' },
          { value: 'Senior only', label: 'No juniors on call' },
        ],
        process: [
          { title: 'Diagnostic audit', text: 'We assess your funnel, channels, CAC and positioning against your competitors. Honest baseline.' },
          { title: 'Strategy and roadmap', text: 'A 90-day prioritised plan with expected impact per initiative. You approve before anything ships.' },
          { title: 'Workshops and alignment', text: 'Working sessions with your team to align on messaging, channels and ownership.' },
          { title: 'Execute or coach', text: 'We ship the plan through DKDP services, or coach your team to do it. Your call.' },
        ],
        pricing: {
          title: 'Audit, retainer or full strategy',
          subtitle: 'Pick the engagement that matches your stage. They combine well.',
          tiers: [
            { name: 'Audit', price: "CHF 1'500", cadence: 'One-off', description: 'A strategic audit of your funnel, channels and positioning with a 90-day roadmap.', features: ['Funnel and channel audit', 'Competitive positioning', 'Customer acquisition cost review', '90-day prioritised roadmap', 'Executive summary', 'One alignment workshop'], ctaLabel: 'Start with an audit' },
            { name: 'Ongoing', price: 'CHF 900', cadence: 'Per month', description: 'A senior consultant on call to steer your marketing month to month.', features: ['Everything in Audit, plus:', 'Monthly strategy session', 'Roadmap maintained and adjusted', 'Channel and campaign review', 'Async support between sessions', 'Cancel anytime'], highlighted: true, ctaLabel: 'Start the retainer' },
            { name: 'Strategy 360', price: "CHF 3'500", cadence: 'Per month', description: 'Fractional CMO: part-time senior marketing leadership for your business.', features: ['Everything in Ongoing, plus:', '1 to 2 days per week of senior time', 'Team coaching and hiring support', 'Board and investor updates', 'AI rollout planning', 'Execution oversight across channels'], ctaLabel: 'Talk to us' },
          ],
          note: 'All prices in Swiss francs, excluding VAT 8.1%. Consulting combines with delivery through the rest of DKDP services if you want the plan shipped, not just planned.',
        },
        testimonials: [
          { quote: 'DKDP audited our marketing in two weeks and handed us a roadmap we could actually execute. Leads up 65% in six months. ROI-first, no fluff, no junior consultants.', author: 'CEO', role: 'Geneva SME, 30 staff' },
          { quote: 'The fractional CMO setup gave us senior marketing leadership we could not afford to hire full-time. Strategy, coaching and execution oversight, one or two days a week.', author: 'Founder', role: 'Swiss B2B startup' },
          { quote: 'Ninety-five percent retention on our retainer says it all. Every session ends with a clear action list. They ship with us, not against us.', author: 'COO', role: 'Services firm, Lausanne' },
        ],
        bridge: {
          title: 'Going further with DKDP',
          links: [
            { label: 'SEO and AI search', href: '/en/digital-agency/seo', description: 'Once the strategy is set, build defensible organic visibility. Monthly retainer from CHF 600.' },
            { label: 'Google Ads', href: '/en/digital-agency/google-ads', description: 'Validate channels fast with paid traffic. Fixed management fee from CHF 350/month.' },
            { label: 'AI audit and consulting', href: '/en/artificial-intelligence/audit-consulting', description: 'Plan where AI fits in your marketing stack. A 2-week audit and roadmap. From CHF 490.' },
          ],
        },
        faq: [
          { question: 'Is this just slides and recommendations?', answer: 'No. Every session ends with a concrete next-action list with owners and dates. We can also execute the work ourselves through the rest of DKDP services if you want it shipped, not just planned.' },
          { question: 'How much does marketing consulting cost?', answer: "A one-off strategic audit with roadmap is CHF 1'500. An ongoing monthly retainer is CHF 900. A fractional CMO engagement (Strategy 360) is CHF 3'500/month for one to two days a week of senior time." },
          { question: 'Do you replace our in-house marketing team?', answer: 'We work alongside in-house teams. Fractional CMO setups are typical for SMBs without a senior marketing hire yet. We coach, set strategy and ship with your team, not against it.' },
          { question: 'What does a typical engagement look like?', answer: "Either a 4 to 6-week audit and roadmap deliverable (CHF 1'500 fixed), or an ongoing monthly retainer (1 to 2 days per week of senior time). Both can be combined with delivery work through our other services." },
          { question: 'How quickly will we see impact?', answer: 'The roadmap delivers quick wins in the first 4 to 6 weeks. Compounding channel work (SEO, content, positioning) builds over 3 to 6 months. We track CAC and pipeline so impact is measurable, not anecdotal.' },
          { question: 'Can you help plan our AI rollout?', answer: 'Yes. AI rollout planning is part of the consulting: where to deploy AI across your marketing stack, in what order, with what guardrails, without breaking what already works.' },
        ],
        finalTitle: 'Book a strategy call',
        finalText: 'A short call to understand your business and goals, then a fixed-quote proposal for an audit or retainer. Senior time only, no junior hand-off.',
        extraSchemas: [
          buildServiceWithLocalBusiness({
            name: 'Marketing consulting Geneva',
            url: '/en/digital-agency/marketing-consulting',
            description: 'Marketing consulting in Geneva for Swiss SMBs. Digital strategy, growth roadmap, channel mix, fractional CMO and AI rollout planning. Senior consultant who also ships.',
            serviceType: 'Marketing consulting',
            priceFrom: 1500,
            lang: 'en',
            extraAreas: ['Zurich', 'Basel', 'Bern'],
          }),
        ],
      }}
    />
  )
}
