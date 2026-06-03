import { Users2 } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildCourse } from '@/lib/schema'

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
        process: [
          { title: 'Free 30-minute call', text: 'We assess your level, your goals and what you want to learn. No cost, no commitment.' },
          { title: 'Tailored plan', text: 'A learning plan built around your subject, your pace and your schedule, evenings and weekends included.' },
          { title: 'One-to-one sessions', text: 'In person in Geneva or remote. We work on your real goals, at your speed.' },
          { title: 'Materials to keep', text: 'After every session: a written summary, the prompts or templates we used, and recommended next steps.' },
        ],
        pricing: {
          title: 'Private hourly rate and packs',
          subtitle: 'One-to-one in English. For French-language lessons, our sister brand cours-informatique.ch offers the same teachers at CHF 150/h.',
          tiers: [
            { name: 'Single session', price: 'CHF 200', cadence: 'Per hour', description: 'A focused one-to-one session on any subject.', features: ['One-to-one, always', 'Any subject (AI, web, office, video)', 'In Geneva or remote', 'Evenings and weekends OK', 'Written summary after', 'Free 30-min assessment call'], ctaLabel: 'Book a session' },
            { name: 'Pack of 5', price: "CHF 950", cadence: '5 hours', description: 'Five hours with a discount, for steady progress.', features: ['Everything in Single, plus:', 'CHF 190/h effective rate', 'Flexible scheduling', 'Progress tracking'], highlighted: true, ctaLabel: 'Buy a pack' },
            { name: 'Pack of 10', price: "CHF 1'800", cadence: '10 hours', description: 'Ten hours at the best rate, for a real skill jump.', features: ['Everything in Pack of 5, plus:', 'CHF 180/h effective rate', 'Structured curriculum', 'Priority scheduling'], ctaLabel: 'Buy a pack' },
          ],
          note: 'All prices in Swiss francs, excluding VAT 8.1%. English one-to-one sessions are CHF 200/h. For lessons in French at CHF 150/h, visit cours-informatique.ch, our sister brand run by the same trainers.',
        },
        bridge: {
          title: 'Other ways to learn with us',
          links: [
            { label: 'Corporate training', href: '/en/corporate-training', description: 'Training a whole team instead? Group sessions tailored to your company. From CHF 200/h.' },
            { label: 'Claude AI Training', href: '/en/corporate-training/claude-ai', description: 'Go deep on Claude one-to-one or as a team. From CHF 200/h.' },
            { label: 'cours-informatique.ch', href: 'https://cours-informatique.ch', description: 'Our sister brand for French-language lessons, beginners and seniors. From CHF 150/h.' },
          ],
        },
        faq: [
          { question: 'How does pricing work?', answer: "CHF 200 per hour for one-to-one sessions in English. Packs of 5 hours (CHF 950) and 10 hours (CHF 1'800) come with discounts. The first 30-minute call to assess your level and goals is always free." },
          { question: 'Can I have lessons in French?', answer: 'Yes. For French-language lessons we run a sister brand, cours-informatique.ch, with the same trainers at CHF 150/h, ideal for beginners and seniors who want to learn at their own pace in French.' },
          { question: 'Can I learn at my own pace?', answer: 'Yes. Most students book 1 to 2 sessions per week. Some go intensive (2 hours twice a week), some go slow (1 session every 2 weeks). You set the pace.' },
          { question: 'What subjects can I learn?', answer: 'AI tools, office productivity, web design and Figma, social media, video editing, or a custom subject. Tell us what you want to learn and we match you with a senior trainer.' },
          { question: 'Do I get materials to keep?', answer: 'Yes. After every session you receive a written summary, the prompts or templates we used, and links to recommended reading or videos.' },
        ],
        finalTitle: 'Book your free assessment call',
        finalText: 'A free 30-minute call to understand your goals and level, then a tailored plan. One-to-one in English in Geneva or remote. For French, see cours-informatique.ch.',
        extraSchemas: [
          buildCourse({
            name: 'Individual Training',
            url: '/en/individual-training',
            description: 'Private one-to-one training in Geneva for individuals. AI, web design, office tools, social media, video editing. Delivered in English, in person or remote.',
            duration: 'PT1H',
            teaches: ['AI tools', 'Office productivity', 'Web design', 'Social media', 'Video editing'],
            prerequisites: 'No prerequisites',
            priceFrom: 200,
            ratingValue: '4.9',
            ratingCount: 80,
            lang: 'en',
          }),
        ],
      }}
    />
  )
}
