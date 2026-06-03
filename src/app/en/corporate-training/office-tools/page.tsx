import { BookOpen } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

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
      }}
    />
  )
}
