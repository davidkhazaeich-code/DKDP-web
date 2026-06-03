import { Smartphone } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildServiceWithLocalBusiness } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'App Development Geneva · iOS, Android, Web Apps, PWAs | DKDP',
  description:
    "iOS, Android, web apps and PWAs designed and developed in Geneva for Swiss SMBs. React Native, Expo, Next.js, one codebase. From CHF 8'000, fixed quote.",
  enPath: '/en/digital-agency/app-development',
  frPath: '/agence-digitale/developpement-application',
  imageAlt: 'App development Geneva, iOS Android web apps by DKDP',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/app-development"
      config={{
        pillar: 'agence',
        hubName: 'Digital agency',
        hubHref: '/en/digital-agency',
        tag: 'App development · Geneva',
        h1Lead: 'Apps that ship,',
        h1Highlight: 'on every device.',
        subtitle:
          "iOS, Android, web apps and PWAs designed and developed in Geneva for Swiss SMBs. Built on React Native, Expo and Next.js so you maintain one codebase, not three. From CHF 8'000.",
        icon: Smartphone,
        secondaryCta: 'Free quote',
        secondaryHref: '/en/contact',
        problem: {
          title: 'Why app projects overrun and stall',
          items: [
            { title: 'Three codebases, triple the cost', text: 'Building native iOS, native Android and web separately triples the effort. We use React Native and Expo for one codebase across all three.' },
            { title: 'No backend plan', text: 'A beautiful app with nowhere to store data. We scope database, auth and storage from day one, not as an afterthought.' },
            { title: 'Locked out after launch', text: 'You cannot ship updates without the original dev. We document, train your team and hand over a maintainable codebase.' },
          ],
        },
        bullets: [
          { title: 'Cross-platform from day one', text: 'React Native and Expo cover iOS, Android and web from a single codebase. No duplicated effort.' },
          { title: 'Native when it matters', text: 'Push notifications, Face ID, camera, geolocation, in-app payments. All wired up properly.' },
          { title: 'PWA path available', text: 'When a native app is overkill, we ship a fast PWA with offline support and install-to-home prompts.' },
          { title: 'App types covered', text: 'Customer apps, internal tools, marketplaces, booking apps, field-service apps, member portals.' },
          { title: 'Backend included', text: 'Supabase, Firebase or custom Node. Database, auth, file storage, edge functions, all in scope.' },
          { title: 'App Store submission', text: 'We handle Apple Developer and Google Play submission, screenshots, descriptions, review responses.' },
          { title: 'Swiss hosting available', text: 'For sensitive data, we host the backend in Switzerland or the EU. nFADP-compliant by design.' },
          { title: 'Maintainable handover', text: 'Your team can ship updates. Documentation, code review, optional retainer for ongoing work.' },
        ],
        stats: [
          { value: "CHF 8'000+", label: 'From, fixed quote' },
          { value: '8-16 wks', label: 'Average delivery' },
          { value: '1 codebase', label: 'iOS + Android + web' },
          { value: 'Yes', label: 'App Store submission' },
        ],
        process: [
          { title: 'Scope and design', text: 'User flows, wireframes, interactive prototype. You validate the full app before we write code.' },
          { title: 'Build in sprints', text: 'Weekly builds you can install on your phone. Backend, screens and integrations wired up incrementally.' },
          { title: 'Test and submit', text: 'QA on real devices, beta testing via TestFlight and Play Console, then App Store submission.' },
          { title: 'Launch and support', text: 'Go-live, monitoring, and a documented handover. Optional retainer for ongoing features.' },
        ],
        pricing: {
          title: 'Three packages, fixed quote',
          subtitle: 'Scoped to the complexity and the number of platforms.',
          tiers: [
            { name: 'PWA / simple', price: "From CHF 8'000", cadence: 'Fixed quote', description: 'A fast progressive web app or a focused single-feature mobile app.', features: ['Progressive web app (installable)', 'Or focused single-purpose app', 'Backend (Supabase / Firebase)', 'Offline support', '6 to 8-week delivery', '3-month support'], ctaLabel: 'Get a quote' },
            { name: 'Cross-platform app', price: "From CHF 15'000", cadence: 'Fixed quote', description: 'A full iOS, Android and web app from one React Native codebase.', features: ['Everything in PWA, plus:', 'iOS + Android + web (one codebase)', 'Native features (push, camera, etc.)', 'Auth, payments, file storage', 'App Store + Play Store submission', '8 to 12-week delivery'], highlighted: true, ctaLabel: 'Get a quote' },
            { name: 'Complex / native', price: "From CHF 25'000", cadence: 'Scoped per project', description: 'Marketplaces, complex business logic, or fully native builds.', features: ['Everything in Cross-platform, plus:', 'Complex business logic', 'Native modules where needed', 'Custom backend and integrations', 'Sovereign Swiss hosting option', 'Scalable architecture'], ctaLabel: 'Talk to us' },
          ],
          note: 'All prices in Swiss francs, excluding VAT 8.1%. Apple Developer and Google Play account fees billed separately by the platforms.',
        },
        testimonials: [
          { quote: 'DKDP built our field-service app on React Native: iOS, Android and a web dashboard from one codebase. Delivered on time, on budget. Our technicians use it daily.', author: 'Operations Director', role: 'Geneva services company' },
          { quote: 'A booking app with payments and push notifications. They handled the entire App Store submission and got us approved on the first try. Smooth from start to launch.', author: 'Founder', role: 'Wellness startup, Lausanne' },
          { quote: 'They documented everything and trained our junior dev to ship updates. We are no longer dependent on an agency for every tweak. Real handover, not lock-in.', author: 'CTO', role: 'Swiss SaaS scale-up' },
        ],
        bridge: {
          title: 'Going further with DKDP',
          links: [
            { label: 'Web design', href: '/en/digital-agency/web-design', description: 'Need a marketing site alongside the app? Fast, conversion-focused websites. From CHF 2\'500.' },
            { label: 'Custom AI agents', href: '/en/artificial-intelligence/ai-agents', description: 'Add an AI assistant inside your app, grounded in your data. From CHF 2\'500.' },
            { label: 'Business automation', href: '/en/artificial-intelligence/automation', description: 'Connect your app to your back-office tools with no-code workflows. From CHF 1\'500.' },
          ],
        },
        faq: [
          { question: 'iOS-only or cross-platform?', answer: 'Cross-platform with React Native is our default for SMBs because it cuts the cost roughly in half. We only recommend native (Swift, Kotlin) when there is a specific reason: heavy 3D, low-latency audio, deep OS integration.' },
          { question: 'How much does an app cost?', answer: "A PWA or simple app starts at CHF 8'000. A full cross-platform iOS, Android and web app starts at CHF 15'000. Complex apps (marketplaces, native modules) start at CHF 25'000. Fixed quote provided before kickoff." },
          { question: 'Do you handle the App Store and Play Store submission?', answer: 'Yes. We register your developer accounts, prepare screenshots and copy, submit the binaries, respond to review feedback. Typical first submission lands within 1 to 2 weeks.' },
          { question: 'What about the backend?', answer: 'Included. Most projects use Supabase or Firebase: database, auth, storage, edge functions. We pick what fits your team and your data residency constraints. Swiss hosting is available on request.' },
          { question: 'How long does it take?', answer: 'A PWA or simple app: 6 to 8 weeks. A full cross-platform app: 8 to 12 weeks. Complex projects: 12 weeks and up. We share weekly installable builds so you see progress continuously.' },
          { question: 'Can our team maintain it after launch?', answer: 'Yes. We deliver a documented, maintainable codebase, do a handover and can train your developer. An optional retainer is available if you prefer us to keep building features.' },
        ],
        finalTitle: 'Free app scoping call',
        finalText: 'Tell us the app you have in mind. We come back with a fixed quote, a recommended stack, a timeline and an App Store plan. No commitment.',
        extraSchemas: [
          buildServiceWithLocalBusiness({
            name: 'App development Geneva',
            url: '/en/digital-agency/app-development',
            description: 'Custom iOS, Android, web app and PWA development in Geneva for Swiss SMBs. React Native, Expo, Next.js, Supabase. One codebase, App Store submission, maintainable handover.',
            serviceType: 'Mobile and web app development',
            priceFrom: 8000,
            lang: 'en',
            extraAreas: ['Zurich', 'Basel', 'Bern'],
          }),
        ],
      }}
    />
  )
}
