import { Presentation } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Marketing Consulting Geneva · Digital Strategy and Growth | DKDP',
  description:
    'Marketing consulting in Geneva for Swiss SMBs. Digital strategy, growth experiments, channel mix, AI rollout planning. Workshop, monthly retainer or one-off audit.',
  enPath: '/en/digital-agency/marketing-consulting',
  frPath: '/agence-digitale/consulting-marketing',
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
          'A senior consultant who also ships. Digital strategy, growth experiments, channel mix, AI rollout planning. You leave each session with concrete next steps, not a PDF that gathers dust.',
        icon: Presentation,
        bullets: [
          { title: 'Strategic audit', text: 'Current funnel, channel mix, customer acquisition cost, competitive landscape. Plain English.' },
          { title: 'Growth roadmap', text: '90-day prioritised plan: what to ship, in what order, with what expected impact.' },
          { title: 'Workshops with your team', text: 'In-person or remote workshops to align on positioning, messaging, channels and execution.' },
          { title: 'Fractional CMO option', text: 'Monthly retainer to act as your part-time head of marketing. Hiring quality, fractional cost.' },
          { title: 'AI rollout planning', text: 'Where and how to deploy AI in your marketing stack without breaking what already works.' },
          { title: 'Executive-ready outputs', text: 'Memos, board updates, investor-ready slides when you need them. Written by someone who ships.' },
        ],
        stats: [
          { value: 'CHF 2,500+', label: 'One-off audit' },
          { value: 'CHF 4k/mo', label: 'Fractional CMO' },
          { value: '4-6 weeks', label: 'First roadmap impact' },
          { value: 'Senior only', label: 'No juniors on call' },
        ],
        faq: [
          {
            question: 'Is this just slides and recommendations?',
            answer:
              "No. Every session ends with a concrete next-action list with owners and dates. We can also execute the work ourselves through the rest of DKDP's services if you want it shipped, not just planned.",
          },
          {
            question: 'Do you replace our in-house marketing team?',
            answer:
              'We work alongside in-house teams. Fractional CMO setups are typical for SMBs without a senior marketing hire yet. We coach, set strategy and ship with your team, not against it.',
          },
          {
            question: 'What does a typical engagement look like?',
            answer:
              'Either a 4-6 week audit + roadmap deliverable (fixed quote), or an ongoing monthly retainer (1-2 days per week of senior time). Both can be combined with delivery work through our other services.',
          },
        ],
      }}
    />
  )
}
