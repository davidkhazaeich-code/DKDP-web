import { Film } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Video Editing Training Geneva · Premiere, DaVinci | DKDP',
  description:
    "Video editing training in Geneva. Premiere Pro, DaVinci Resolve, CapCut on phone. Produce shareable, brand-aligned videos. From CHF 1'500 per half-day.",
  enPath: '/en/corporate-training/video-editing',
  frPath: '/formation-entreprise/montage-video',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/video-editing"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'Video editing · Geneva',
        h1Lead: 'Edit videos that',
        h1Highlight: 'people watch through.',
        subtitle:
          'Hands-on video editing training. Premiere Pro, DaVinci Resolve or CapCut on phone. Produce shareable, brand-aligned videos with the tools your team already has.',
        icon: Film,
        bullets: [
          { title: 'Editing fundamentals', text: 'Cuts, transitions, J/L cuts, pacing. The principles that work on any tool.' },
          { title: 'Sound design that matters', text: 'Music selection, audio cleanup, voice-over, sound effects. Most amateurs ignore this. Big mistake.' },
          { title: 'Colour grading basics', text: 'Lookup tables, scopes, primary corrections. Make footage look intentional, not phone-y.' },
          { title: 'Motion graphics', text: 'Animated text, lower thirds, logo animations, transitions. Without After Effects if possible.' },
          { title: 'Captions and accessibility', text: 'Burned captions for social, accessibility for compliance, multi-language for international.' },
          { title: 'Export for every platform', text: 'Aspect ratios, bitrates, codecs for YouTube, LinkedIn, Instagram, TikTok. No more rejected uploads.' },
        ],
        stats: [
          { value: "CHF 1'500+", label: 'Half-day session' },
          { value: '4-8 people', label: 'Per session' },
          { value: 'Real footage', label: 'Yours or ours' },
          { value: 'Cross-tool', label: 'Premiere, DaVinci, CapCut' },
        ],
      }}
    />
  )
}
