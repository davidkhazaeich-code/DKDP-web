import { Film } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Video Production Geneva · Brand Films and Product Videos | DKDP',
  description:
    'Video production in Geneva. Brand films, product videos, training content, short-form social. From script to final cut. Shoot in Switzerland, post-production in-house.',
  enPath: '/en/digital-agency/video-production',
  frPath: '/agence-digitale/creation-video',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/digital-agency/video-production"
      config={{
        pillar: 'agence',
        hubName: 'Digital agency',
        hubHref: '/en/digital-agency',
        tag: 'Video production · Geneva',
        h1Lead: 'Videos that earn',
        h1Highlight: 'attention and trust.',
        subtitle:
          'Brand films, product videos, training content, short-form social. From script to final cut, shot in Switzerland with post-production in-house.',
        icon: Film,
        bullets: [
          { title: 'Brand films', text: '1-3 minute story-driven videos for your homepage, About page or sales deck. Cinematic, on-brand.' },
          { title: 'Product videos', text: 'Show the feature, the workflow, the outcome. Tight scripts, clean visuals, captions ready for social.' },
          { title: 'Training content', text: 'Internal videos for your team. Onboarding, tool walkthroughs, SOPs filmed and edited for reuse.' },
          { title: 'Short-form social', text: 'TikTok, Reels, Shorts. Hooks tested, captions on, formats native to each platform.' },
          { title: 'Multi-language deliverables', text: 'French, English, German. Subtitles, dubbed voice-over, separate cuts per market when needed.' },
          { title: 'Owned source files', text: 'Project files, raw footage, brand assets. Yours, on a drive we hand over at the end.' },
        ],
        stats: [
          { value: "CHF 3'500+", label: 'From, fixed quote' },
          { value: '2-4 weeks', label: 'Average turnaround' },
          { value: '4K + audio', label: 'Production quality' },
          { value: 'In-house', label: 'Post-production' },
        ],
        faq: [
          {
            question: 'How much does a brand film cost in Geneva?',
            answer:
              "A 90-second brand film with a half-day shoot and full post-production typically lands between CHF 3'500 and CHF 8'000. Larger productions with multi-day shoots, drone work or animation start around CHF 12'000. Every project is fixed-quote upfront.",
          },
          {
            question: 'Do you handle scripting and storyboarding too?',
            answer:
              'Yes. Script, storyboard, shot list and casting are all in scope. You approve before we book a single camera.',
          },
          {
            question: 'Can we edit our own videos after?',
            answer:
              'You receive the final cut plus the source project files (Final Cut, Premiere or DaVinci Resolve) and raw footage. Your team can re-edit or repurpose anytime.',
          },
        ],
      }}
    />
  )
}
