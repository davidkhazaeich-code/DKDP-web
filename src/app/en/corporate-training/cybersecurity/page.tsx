import { Shield } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Cybersecurity Training Geneva · Practical Drills, No Slides | DKDP',
  description:
    'Cybersecurity training in Geneva. Phishing, password hygiene, MFA, social engineering, AI threats. Practical drills, real attacks, take-home checklist. From CHF 1,500.',
  enPath: '/en/corporate-training/cybersecurity',
  frPath: '/formation-entreprise/cybersecurite',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/cybersecurity"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'Cybersecurity · Geneva',
        h1Lead: 'Protect your team',
        h1Highlight: 'before the breach.',
        subtitle:
          'Cybersecurity training that goes beyond awareness slides. Real phishing simulations, password hygiene workshops, MFA setup, social engineering drills, AI-specific risks.',
        icon: Shield,
        bullets: [
          { title: 'Phishing simulation', text: 'We send realistic phishing tests, then debrief the results with your team. Memorable, not embarrassing.' },
          { title: 'Password hygiene workshop', text: '1Password or Bitwarden setup, MFA roll-out, breach monitoring. Hands-on, not theoretical.' },
          { title: 'Social engineering drills', text: 'Voice phishing, deepfake calls, USB drop tests. The threats your team will actually encounter.' },
          { title: 'AI-specific risks', text: 'Prompt injection, model poisoning, hallucinated facts, deepfake video. The new threats nobody covers.' },
          { title: 'Incident response basics', text: 'What to do in the first hour when something goes wrong. Who to call, what to log, what to never delete.' },
          { title: 'Compliance-ready', text: 'Maps to ISO 27001 awareness requirements and Swiss nLPD article 7. Certificates of completion provided.' },
        ],
        stats: [
          { value: 'CHF 1,500+', label: 'Half-day session' },
          { value: '4-15 people', label: 'Per session' },
          { value: 'ISO 27001', label: 'Awareness aligned' },
          { value: 'Real drills', label: 'Not just slides' },
        ],
      }}
    />
  )
}
