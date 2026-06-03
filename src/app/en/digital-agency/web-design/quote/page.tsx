import { CalendarCheck } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Free Website Quote · Geneva | DKDP',
  description:
    'Free website quote in 24 hours. Scope, price and timeline upfront, no commitment. Custom websites, redesigns, e-commerce or web apps built by a senior team in Geneva.',
  enPath: '/en/digital-agency/web-design/quote',
  frPath: '/agence-digitale/creation-site-web/estimation',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/web-design/quote"
      config={{
        pillar: 'agence',
        hubName: 'Web design',
        hubHref: '/en/digital-agency/web-design',
        tag: 'Free quote · 24h reply',
        h1Lead: 'Free website quote,',
        h1Highlight: 'in plain numbers.',
        subtitle:
          'Tell us what you are trying to ship. Within 24 hours you receive a written quote with scope, price and timeline. Fixed before kickoff. No commitment.',
        icon: CalendarCheck,
        primaryCta: 'Request my quote',
        bullets: [
          { title: 'Scope, written down', text: "What's in, what's out. No grey zone, no surprise during the build." },
          { title: 'Fixed price upfront', text: 'The number on the quote is the number on the invoice. No hidden hours.' },
          { title: 'Clear timeline', text: 'Week-by-week plan from kickoff to launch. Deadlines we stick to.' },
          { title: 'Honest about constraints', text: 'If your budget will not deliver what you want, we say so on the call. We do not start losing projects.' },
          { title: 'Yours to compare', text: 'No commitment, no pressure. Take our quote to other agencies, see how we look in context.' },
          { title: 'Reply within 24 hours', text: 'No two-week silence. Even when we are busy, you hear back the next business day.' },
        ],
        finalTitle: 'Get your free quote',
        finalText: 'Send us your brief, a deck, screenshots, anything you have. Within 24 hours we send scope, price and timeline.',
      }}
    />
  )
}
