import { Film } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildServiceWithLocalBusiness } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'Video Production Geneva · Brand Films and Reels | DKDP',
  description:
    "Video production in Geneva. Brand films, product videos, testimonials, reels and short-form social. From script to final cut, shot in Switzerland. From CHF 800.",
  enPath: '/en/digital-agency/video-production',
  frPath: '/agence-digitale/creation-video',
  imageAlt: 'Video production Geneva, brand films and reels by DKDP',
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
          'Brand films, product videos, client testimonials, reels and short-form social. From script to final cut, shot in Switzerland with post-production in-house. From CHF 800.',
        icon: Film,
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        problem: {
          title: 'Why most SMB videos miss',
          items: [
            { title: 'No script, no story', text: 'A camera pointed at a founder is not a video. We start with a script and a story that holds attention to the end.' },
            { title: 'Wrong format for the platform', text: 'A horizontal corporate film posted as a Reel dies in two seconds. We produce the right format for each channel.' },
            { title: 'One video, then nothing', text: 'A single expensive film that ages fast. We plan a content system: one shoot, many cuts, weeks of content.' },
          ],
        },
        bullets: [
          { title: 'Brand films', text: '1 to 3 minute story-driven videos for your homepage, About page or sales deck. Cinematic, on-brand.' },
          { title: 'Product videos', text: 'Show the feature, the workflow, the outcome. Tight scripts, clean visuals, captions ready for social.' },
          { title: 'Client testimonials', text: 'Real clients, well lit and well directed. The most persuasive content you can own.' },
          { title: 'Short-form social', text: 'TikTok, Reels, Shorts. Hooks tested, captions on, formats native to each platform.' },
          { title: 'Video formats covered', text: 'Square, vertical, horizontal. Reels, YouTube, LinkedIn, in-store screens. One shoot, every aspect ratio.' },
          { title: 'Multi-language deliverables', text: 'French, English, German. Subtitles, dubbed voice-over, separate cuts per market when needed.' },
          { title: 'Owned source files', text: 'Project files, raw footage, brand assets. Yours, on a drive we hand over at the end.' },
        ],
        stats: [
          { value: 'CHF 800+', label: 'From, fixed quote' },
          { value: '5-10 days', label: 'Short format turnaround' },
          { value: '4K + audio', label: 'Production quality' },
          { value: 'In-house', label: 'Post-production' },
        ],
        process: [
          { title: 'Script and storyboard', text: 'We write the script, build the shot list and storyboard. You approve before we book a camera.' },
          { title: 'Shoot in Switzerland', text: 'Professional crew, lighting and audio. On location or in studio, across Geneva and beyond.' },
          { title: 'Edit and grade', text: 'Cutting, colour grading, sound design, captions, motion graphics. All in-house.' },
          { title: 'Deliver every format', text: 'Final cut plus every aspect ratio for your channels, subtitled and ready to publish.' },
        ],
        pricing: {
          title: 'Three formats, fixed quote',
          subtitle: 'Scoped to the production scale and the number of deliverables.',
          tiers: [
            { name: 'Short format', price: 'From CHF 800', cadence: 'Fixed quote', description: 'Reels, social shorts, a product clip. One half-day shoot, fast turnaround.', features: ['Half-day shoot', '1 to 3 short videos', 'Vertical + square cuts', 'Captions and subtitles', '5 to 10-day delivery', 'Source files included'], ctaLabel: 'Get a quote' },
            { name: 'Brand film', price: "From CHF 2'500", cadence: 'Fixed quote', description: 'A 60 to 120-second story-driven film for your homepage or sales deck.', features: ['Everything in Short format, plus:', 'Full-day shoot', 'Script and storyboard', 'Colour grading + sound design', 'Motion graphics', 'Multi-language subtitles'], highlighted: true, ctaLabel: 'Get a quote' },
            { name: 'Production', price: "From CHF 6'000", cadence: 'Scoped per project', description: 'Multi-day shoots, campaigns, series, drone and animation.', features: ['Everything in Brand film, plus:', 'Multi-day shoots', 'Drone and aerial', 'Animation and 3D', 'Full content series', 'Per-market versions'], ctaLabel: 'Talk to us' },
          ],
          note: 'All prices in Swiss francs, excluding VAT 8.1%. A 90-second brand film with a half-day shoot typically lands between CHF 3\'500 and CHF 8\'000 depending on scope.',
        },
        testimonials: [
          { quote: 'DKDP wrote, shot and edited our brand film. The story was right, the craft was high, and we got every format for social out of one shoot. 2.7x more engagement than our old videos.', author: 'Marketing Director', role: 'Swiss watch brand, Geneva' },
          { quote: 'A series of client testimonials, beautifully directed. They became our highest-converting sales asset. The footage is ours to reuse, which we do constantly.', author: 'Founder', role: 'B2B consultancy, Lausanne' },
          { quote: 'Short-form reels produced monthly. Captions, hooks, native formats. Our TikTok finally took off and the in-store screens look professional now.', author: 'Owner', role: 'Geneva retailer' },
        ],
        bridge: {
          title: 'Going further with DKDP',
          links: [
            { label: 'Social media', href: '/en/digital-agency/social-media', description: 'Turn your videos into a consistent social presence with planned distribution. From CHF 450/month.' },
            { label: 'Video editing training', href: '/en/corporate-training/video-editing', description: 'Want your team to produce reels in-house? We train them on Premiere, DaVinci and CapCut.' },
            { label: 'Web design', href: '/en/digital-agency/web-design', description: 'Put your brand film where it converts: a fast, modern homepage. From CHF 2\'500.' },
          ],
        },
        faq: [
          { question: 'How much does a brand film cost in Geneva?', answer: "A 90-second brand film with a half-day shoot and full post-production typically lands between CHF 3'500 and CHF 8'000. Short-format reels start at CHF 800. Larger productions with multi-day shoots, drone work or animation start around CHF 12'000. Every project is fixed-quote upfront." },
          { question: 'Do you handle scripting and storyboarding too?', answer: 'Yes. Script, storyboard, shot list and casting are all in scope. You approve before we book a single camera.' },
          { question: 'Which formats do you deliver?', answer: 'Every aspect ratio your channels need: vertical (Reels, TikTok, Shorts), square (feed), horizontal (YouTube, web, in-store screens). One shoot, all formats, subtitled.' },
          { question: 'Can we edit our own videos after?', answer: 'You receive the final cut plus the source project files (Final Cut, Premiere or DaVinci Resolve) and raw footage. Your team can re-edit or repurpose anytime.' },
          { question: 'How fast is the turnaround?', answer: 'Short-format videos: 5 to 10 days. A brand film: 3 to 5 weeks including shoot and post. Larger productions are scheduled per project.' },
          { question: 'Do you produce multi-language versions?', answer: 'Yes. Subtitles in French, English and German, or fully dubbed voice-over and separate cuts per market when you serve multiple regions.' },
        ],
        finalTitle: 'Free video scoping call',
        finalText: 'Tell us what you want to film and where it will live. We come back with a creative direction, a fixed quote and a delivery plan. No commitment.',
        extraSchemas: [
          buildServiceWithLocalBusiness({
            name: 'Video production Geneva',
            url: '/en/digital-agency/video-production',
            description: 'Professional video production in Geneva for Swiss SMBs. Brand films, product videos, testimonials, reels and short-form social. Script to final cut, post-production in-house.',
            serviceType: 'Video production',
            priceFrom: 800,
            lang: 'en',
            extraAreas: ['Zurich', 'Basel', 'Bern'],
          }),
        ],
      }}
    />
  )
}
