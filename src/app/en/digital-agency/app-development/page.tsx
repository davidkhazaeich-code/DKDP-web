import { Smartphone } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'App Development Geneva · iOS, Android, Web Apps, PWAs | DKDP',
  description:
    "iOS, Android, web apps and PWAs designed and developed in Geneva for Swiss SMBs. React Native, Expo, Next.js. From CHF 15'000, fixed quote.",
  enPath: '/en/digital-agency/app-development',
  frPath: '/agence-digitale/developpement-application',
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
          'iOS, Android, web apps and PWAs designed and developed in Geneva for Swiss SMBs. Built on React Native, Expo and Next.js so you maintain one codebase, not three.',
        icon: Smartphone,
        bullets: [
          { title: 'Cross-platform from day one', text: 'React Native and Expo cover iOS, Android and web from a single codebase. No duplicated effort.' },
          { title: 'Native when it matters', text: 'Push notifications, Face ID, camera, geolocation, in-app payments. All wired up properly.' },
          { title: 'PWA path available', text: 'When a native app is overkill, we ship a fast PWA with offline support and install-to-home prompts.' },
          { title: 'Backend included', text: 'Supabase, Firebase or custom Node. Database, auth, file storage, edge functions, all in scope.' },
          { title: 'App Store submission', text: 'We handle Apple Developer and Google Play submission, screenshots, descriptions, review responses.' },
          { title: 'Maintainable handover', text: 'Your team can ship updates. Documentation, code review, optional retainer for ongoing work.' },
        ],
        stats: [
          { value: '10-16 wks', label: 'Average delivery' },
          { value: 'CHF 15k+', label: 'From, fixed quote' },
          { value: '1 codebase', label: 'iOS + Android + web' },
          { value: 'Yes', label: 'App Store submission' },
        ],
        faq: [
          {
            question: 'iOS-only or cross-platform?',
            answer:
              'Cross-platform with React Native is our default for SMBs because it cuts the cost roughly in half. We only recommend native (Swift, Kotlin) when there is a specific reason: heavy 3D, low-latency audio, deep OS integration.',
          },
          {
            question: 'Do you handle the App Store and Play Store submission?',
            answer:
              'Yes. We register your developer accounts, prepare screenshots and copy, submit the binaries, respond to review feedback. Typical first submission lands within 1-2 weeks.',
          },
          {
            question: 'What about the backend?',
            answer:
              'Included. Most projects use Supabase or Firebase: database, auth, storage, edge functions. We pick what fits your team and your data residency constraints (Swiss hosting is available on request).',
          },
        ],
      }}
    />
  )
}
