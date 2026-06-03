import { Users2 } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'Individual Training Geneva · AI, Web, Office, Design | DKDP',
  description:
    'Private 1-to-1 training in Geneva for individuals. AI, web design, office tools, social media, video. From CHF 200 per hour, delivered in English or French.',
  enPath: '/en/individual-training',
  frPath: '/formation-particuliers',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/individual-training"
      config={{
        pillar: 'formation',
        hubName: 'Training',
        hubHref: '/en/corporate-training',
        tag: 'Individual training · Geneva',
        h1Lead: 'Private training,',
        h1Highlight: 'on your schedule.',
        subtitle:
          'One-to-one training for individuals on AI, web design, office tools, social media or video. Booked by the hour, delivered in person in Geneva or remote.',
        icon: Users2,
        primaryCta: 'Book my session',
        bullets: [
          { title: 'AI for personal use', text: 'Claude, ChatGPT, Midjourney, image and voice tools. From first prompt to daily workflows.' },
          { title: 'Office productivity', text: 'Excel, Word, Mac and Windows essentials, file organisation, calendar discipline.' },
          { title: 'Web design and Figma', text: 'Build a portfolio site or learn the basics of UI design with Figma.' },
          { title: 'Social media for personal brand', text: 'LinkedIn presence, Instagram strategy, content production with your phone.' },
          { title: 'Video editing on phone or desktop', text: 'CapCut, DaVinci Resolve, Premiere. Edit holiday videos or polish personal content.' },
          { title: 'Custom subjects', text: 'Tell us what you want to learn. We probably know someone senior who can teach it.' },
        ],
        stats: [
          { value: 'CHF 200/h', label: 'Private rate' },
          { value: '1-to-1', label: 'Always' },
          { value: 'Your schedule', label: 'Evenings and weekends OK' },
          { value: 'Bilingual', label: 'EN or FR' },
        ],
        faq: [
          {
            question: 'How does pricing work?',
            answer:
              'CHF 200 per hour for 1-to-1 sessions. Packs of 5 or 10 hours come with discounts. First 30-minute call to assess your level and goals is always free.',
          },
          {
            question: 'Can I learn at my own pace?',
            answer:
              'Yes. Most students book 1-2 sessions per week. Some go intensive (2 hours twice a week), some go slow (1 session every 2 weeks). You set the pace.',
          },
          {
            question: 'Do I get materials to keep?',
            answer:
              'Yes. After every session you receive a written summary, the prompts or templates we used, and links to recommended reading or videos.',
          },
        ],
      }}
    />
  )
}
