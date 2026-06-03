import { CalendarCheck } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildService } from '@/lib/schema'

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
        stats: [
          { value: '24 hours', label: 'Reply time' },
          { value: 'Fixed', label: 'Price upfront' },
          { value: "CHF 2'500+", label: 'Showcase sites from' },
          { value: 'No', label: 'Commitment' },
        ],
        process: [
          { title: 'Send your brief', text: 'A few lines, a deck, screenshots, a competitor you like. Whatever you have.' },
          { title: 'We scope it', text: 'We turn your brief into a clear scope: what is in, what is out, the right technology.' },
          { title: 'You get the quote', text: 'Within 24 hours: a written quote with scope, fixed price and a week-by-week timeline.' },
          { title: 'You decide', text: 'No pressure. Compare us with other agencies. The quote is yours to keep.' },
        ],
        extra: (
          <section className="py-16 sm:py-20 border-y border-border" style={{ background: 'var(--bg-card)' }}>
            <div className="max-w-[1000px] mx-auto px-6">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Indicative pricing</h2>
                <p className="text-text-secondary text-sm max-w-[640px] mx-auto leading-relaxed">
                  Every project is unique, but these ranges give you a clear order of magnitude before we talk. All prices exclude Swiss VAT 8.1%.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Showcase website', price: "From CHF 2'500", note: 'Up to 10 pages, custom design, SEO-ready' },
                  { label: 'CMS or e-commerce', price: "CHF 4'500 to 12'000", note: 'Online shop, member area, blog, integrations' },
                  { label: 'Web app or custom', price: 'On request', note: 'Next.js application, API integrations, portals' },
                ].map((t) => (
                  <div key={t.label} className="rounded-xl border border-border p-6" style={{ background: 'var(--bg)' }}>
                    <p className="text-text-muted text-xs font-bold uppercase tracking-widest mb-2">{t.label}</p>
                    <p className="text-2xl font-bold text-text mb-2">{t.price}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{t.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ),
        faq: [
          { question: 'How much does a website cost?', answer: "A showcase site starts at CHF 2'500. A CMS or e-commerce site is CHF 4'500 to 12'000. Web apps and custom builds are quoted on request. You get a fixed quote before kickoff, no hidden hours." },
          { question: 'How fast is the quote?', answer: 'Within 24 hours of your message, even when we are busy. No two-week silence. A written quote with scope, fixed price and timeline.' },
          { question: 'Is the price really fixed?', answer: 'Yes. The number on the quote is the number on the invoice. New features added mid-project are quoted separately and only with your approval.' },
          { question: 'Can I compare your quote with others?', answer: 'Absolutely, and we encourage it. No commitment, no pressure. The quote is yours to take to other agencies and see how we look in context.' },
          { question: 'What do you need from me?', answer: 'A brief in plain words, plus any deck, screenshots, references or a competitor site you admire. The more context, the sharper the quote.' },
        ],
        finalTitle: 'Get your free quote',
        finalText: 'Send us your brief, a deck, screenshots, anything you have. Within 24 hours we send scope, price and timeline.',
        extraSchemas: [
          buildService({
            name: 'Free website quote',
            url: '/en/digital-agency/web-design/quote',
            description: "Free website quote in 24 hours for Swiss SMBs in Geneva. Scope, fixed price and timeline upfront. Custom websites, redesigns, e-commerce and web apps from CHF 2'500.",
            lang: 'en',
          }),
        ],
      }}
    />
  )
}
