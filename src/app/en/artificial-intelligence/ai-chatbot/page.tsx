import { MessageCircle } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'

export const metadata = buildServiceMetadata({
  title: 'AI Chatbot Geneva · 24/7 Assistant for Your Business | DKDP',
  description:
    'AI chatbot built for your business. Grounded answers from your docs, lead capture, calendar booking, voice input. Hosted in Switzerland. From CHF 5,000 fixed quote.',
  enPath: '/en/artificial-intelligence/ai-chatbot',
  frPath: '/intelligence-artificielle/chatbot-ia',
})

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/artificial-intelligence/ai-chatbot"
      config={{
        pillar: 'ia',
        hubName: 'Artificial intelligence',
        hubHref: '/en/artificial-intelligence',
        tag: 'AI chatbot · Geneva',
        h1Lead: 'A chatbot that',
        h1Highlight: 'actually helps.',
        subtitle:
          'A 24/7 assistant grounded in your real documentation, with lead capture, calendar booking and voice input. Hosted in Switzerland. Used daily by hundreds of DKDP clients.',
        icon: MessageCircle,
        bullets: [
          { title: 'Grounded in your real docs', text: 'Knowledge base, product pages, FAQ, internal SOPs. Answers cite the source.' },
          { title: 'Lead capture built in', text: 'Identifies high-intent visitors and asks for email, phone or a meeting. Hands off to your CRM.' },
          { title: 'Calendar booking', text: 'Native Cal.com or Calendly integration. Visitor books a call without leaving the chat.' },
          { title: 'Voice input', text: 'Press to talk, transcribed locally, sent to the model. Drops friction by 50%.' },
          { title: 'Multilingual out of the box', text: 'French, English, German, Italian. Detects the user language, answers in the same.' },
          { title: 'Analytics dashboard', text: 'Conversations, top topics, leads generated, deflection rate. Yours, in a dashboard.' },
        ],
        stats: [
          { value: 'CHF 5k+', label: 'From, fixed quote' },
          { value: '2-4 weeks', label: 'Time to live' },
          { value: '24/7', label: 'Always on' },
          { value: 'Multi-lang', label: 'EN/FR/DE/IT' },
        ],
        faq: [
          {
            question: 'Will the chatbot say wrong things about our business?',
            answer:
              "We use Retrieval-Augmented Generation: the chatbot only answers from your documents. Out-of-scope questions get a polite 'I do not know' and an offer to connect with a human. Hallucination is minimised by design.",
          },
          {
            question: 'Can we host it on Swiss servers?',
            answer:
              'Yes. Infrastructure on Infomaniak or Swiss Cloud. Model providers (Anthropic, OpenAI) offer EU data zones. Sensitive sectors (health, finance) can run on dedicated Swiss-hosted infrastructure.',
          },
          {
            question: 'How does it integrate with our CRM?',
            answer:
              'Native HubSpot, Pipedrive, Salesforce and Bexio integrations. Captured leads land directly in your CRM with the conversation transcript and contact details.',
          },
        ],
      }}
    />
  )
}
