import { BookOpen } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildCourse } from '@/lib/schema'

const PRICING = {
  title: 'Hourly rate scaled to your group',
  subtitle: 'Price depends on the number of participants. The programme is tailored to your team.',
  tiers: [
    { name: '1 person', price: 'CHF 200', cadence: 'Per hour', description: 'One-to-one coaching, fully tailored to your role and files.', features: ['Personalised agenda', 'Your real files and templates', 'Take-home cheat sheet', '2 weeks email Q&A', 'Completion certificate'], ctaLabel: 'Book a session' },
    { name: '2 people', price: 'CHF 300', cadence: 'Per hour', description: 'Paired training for two colleagues.', features: ['Everything in 1 person, plus:', 'Shared workflows', 'Peer practice', 'Two certificates'], highlighted: true, ctaLabel: 'Book a session' },
    { name: 'Group (3 to 10)', price: 'On request', cadence: 'Half-day or full day', description: 'Team session, on-site or remote, custom programme.', features: ['Everything above, plus:', 'Half-day or full-day format', 'Department-specific exercises', 'Group materials', 'On-site across Switzerland or remote'], ctaLabel: 'Request a quote' },
  ],
  note: 'All prices in Swiss francs, excluding VAT 8.1%. Group sessions are quoted per project. A half-day is 3 hours training plus 1 hour prep; a full day is 6 plus 2.',
}

export const metadata = buildServiceMetadata({
  title: 'Office Tools Training Geneva · Excel, Word, PowerPoint, AI | DKDP',
  description:
    "Office tools training in Geneva: Excel, Word, PowerPoint, Microsoft 365 and Copilot. Save hours every week on the files you use daily. From CHF 1'500.",
  enPath: '/en/corporate-training/office-tools',
  frPath: '/formation-entreprise/bureautique',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/corporate-training/office-tools"
      config={{
        pillar: 'formation',
        hubName: 'Corporate training',
        hubHref: '/en/corporate-training',
        tag: 'Office tools · Geneva',
        h1Lead: 'Save hours every week',
        h1Highlight: 'on every file.',
        subtitle:
          'Practical training on Excel, Word, PowerPoint, Outlook and Microsoft 365 Copilot. The shortcuts, formulas and AI features that actually shave hours off your team\'s week.',
        icon: BookOpen,
        bullets: [
          { title: 'Excel that scales', text: 'Pivot tables, Power Query, formulas, dashboards, automation with macros and Office Scripts.' },
          { title: 'Word for real documents', text: 'Styles, templates, table of contents, mail merge, document collaboration that does not break.' },
          { title: 'PowerPoint that respects time', text: 'Templates, brand assets, animation that means something, exporting for video.' },
          { title: 'Outlook hygiene', text: 'Rules, search, calendar templates, focused inbox. Stop drowning in emails.' },
          { title: 'Microsoft 365 Copilot', text: 'AI features inside Office: summarise emails, generate slides, draft documents, analyse spreadsheets.' },
          { title: 'Google Workspace too', text: 'Docs, Sheets, Slides, Gmail, Drive. The same principles, different tools. We cover both.' },
        ],
        stats: [
          { value: "CHF 1'500+", label: 'Half-day session' },
          { value: '4-12 people', label: 'Per session' },
          { value: 'On-site', label: 'Or remote' },
          { value: 'Bilingual', label: 'EN or FR' },
        ],
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        process: [
          { title: 'Pre-session interview', text: '30-minute call to map your tools, files and team level. We design the agenda accordingly.' },
          { title: 'Work on your files', text: 'We train on your real spreadsheets, documents and decks, not toy examples.' },
          { title: 'Build reusable templates', text: 'Templates, formulas and macros your team keeps and reuses long after the session.' },
          { title: 'Follow-up Q&A', text: 'Two weeks of free email Q&A after the session.' },
        ],
        pricing: PRICING,
        bridge: {
          title: 'Going further',
          links: [
            { label: 'Corporate AI training', href: '/en/corporate-training/ai', description: 'Add Microsoft 365 Copilot and ChatGPT to your office workflows. From CHF 200/h.' },
            { label: 'Canva training', href: '/en/corporate-training/canva', description: 'Make professional visuals and presentations in minutes. From CHF 200/h.' },
            { label: 'Cybersecurity training', href: '/en/corporate-training/cybersecurity', description: 'Protect the data in those files: phishing, passwords, nFADP. From CHF 200/h.' },
          ],
        },
        faq: [
          { question: 'How much does office tools training cost?', answer: "CHF 200/hour for one person, CHF 300/hour for two. Group sessions (3 to 10 people) are quoted per project as a half-day or full-day." },
          { question: 'Do you cover Microsoft 365 and Google Workspace?', answer: 'Both. Excel, Word, PowerPoint, Outlook, Microsoft 365 Copilot, plus Docs, Sheets, Slides and Gmail. We adapt to whichever suite your team uses.' },
          { question: 'Can we train on our own files?', answer: 'Yes, and it is recommended. We work on your real spreadsheets, documents and decks so the skills transfer directly to your daily work.' },
          { question: 'Is the training in person or online?', answer: 'Both. On-site across Geneva and French-speaking Switzerland, or online via video conference with live exercises. Hybrid format also available.' },
          { question: 'Do participants get a certificate?', answer: 'Yes. Each participant receives a personalised completion certificate plus a take-home cheat sheet of shortcuts and formulas.' },
        ],
        finalTitle: 'Book your office tools training',
        finalText: 'Tell us your team and the tools they use. We design a tailored agenda, send a fixed quote and run the session in Geneva or remote, in English or French.',
        extraSchemas: [
          buildCourse({
            name: 'Office Tools Training',
            url: '/en/corporate-training/office-tools',
            description: 'Hands-on office tools training in Geneva. Excel, Word, PowerPoint, Outlook, Microsoft 365 Copilot and Google Workspace, on your real files.',
            duration: 'PT6H',
            teaches: ['Excel', 'Word', 'PowerPoint', 'Outlook', 'Microsoft 365 Copilot', 'Google Workspace'],
            prerequisites: 'No technical prerequisites',
            priceFrom: 200,
            ratingValue: '4.9',
            ratingCount: 150,
            lang: 'en',
          }),
        ],
      }}
    />
  )
}
