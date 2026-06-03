import { MessageCircle } from 'lucide-react'
import { ServicePage } from '@/app/en/_components/ServicePage'
import { buildServiceMetadata } from '@/app/en/_components/buildServiceMetadata'
import { buildServiceWithLocalBusiness } from '@/lib/schema'

export const metadata = buildServiceMetadata({
  title: 'AI Chatbot Geneva · Claude, GPT-5, Gemini 3 | DKDP',
  description:
    "Custom AI chatbots for Swiss SMBs in Geneva: 24/7 support, lead qualification, calendar booking, multilingual FR/EN/DE/IT. Built on Claude Opus 4.7, GPT-5 or Gemini 3. WhatsApp, website, Messenger integration. From CHF 2'900, deployed in 2 weeks.",
  enPath: '/en/artificial-intelligence/ai-chatbot',
  frPath: '/intelligence-artificielle/chatbot-ia',
  imageAlt: 'Custom AI chatbot Geneva, powered by Claude and GPT-5, by DKDP agency',
  ogImage: '/images/og/chatbot-ia.png',
})

const FAQ_ITEMS = [
  {
    question: 'Chatbot vs AI agent, what is the difference?',
    answer:
      "A chatbot answers questions in a conversation, typically on your website or WhatsApp. An AI agent goes further: it makes autonomous decisions, executes actions in your tools (CRM, ERP, calendar) and can chain multiple tasks. A chatbot that fires off a Zapier workflow is essentially an agent. DKDP ships both, on a continuum: we often start with an Essential chatbot and grow into a full agent as use cases expand.",
  },
  {
    question: 'Claude or GPT for my chatbot?',
    answer:
      "Claude Opus 4.7 (Anthropic) is the best fit for chatbots that reason over long documents: contracts, technical FAQs, legal databases, anonymised medical files. Best choice when your customers ask complex questions. GPT-5 (OpenAI) is ideal for multimodal chatbots that handle photos, PDFs or audio: technical or medical support with attachments. Gemini 3 (Google) makes sense if you are already in Google Workspace. Every DKDP chatbot is grounded in your private knowledge base (RAG) and answers from your real content, never hallucinated.",
  },
  {
    question: 'Can we use a sovereign Swiss AI for the chatbot?',
    answer:
      "Yes. For regulated sectors (fiduciary, medical, legal, private banking, HR) we deploy Infomaniak Euria (Swiss AI hosted in Geneva and Winterthur) or Swisscom Swiss AI Assistant. We can also self-host Mistral Large 2 or Llama 4 on a Swiss VPS. Data never leaves Swiss territory. A Data Processing Agreement is signed by default. Slightly higher cost (roughly +15 to 25%) but full Swiss nFADP 2023 compliance and professional secrecy preserved.",
  },
  {
    question: 'How do we integrate the chatbot on WhatsApp?',
    answer:
      "Via the WhatsApp Business API (Twilio or 360dialog). We request a business number under your name, link it to the chatbot, and get Meta validation in 2 to 5 days. The chatbot answers automatically on WhatsApp with your brand identity, escalates to human advisors when needed, and syncs every conversation into your CRM. Particularly effective for real estate, medical practices, and e-commerce stores in Geneva.",
  },
  {
    question: 'How much does a custom AI chatbot cost?',
    answer:
      "An Essential chatbot starts at CHF 2'900 (FAQ-style answers, website integration, 2-week deployment). Packages with connections to your business tools (CRM, calendar, ERP) sit between CHF 5'500 and CHF 12'000. Multi-channel chatbots with RAG on large knowledge bases are quoted on request. Fixed price provided upfront, no surprises. Monthly maintenance from CHF 250/month, optional.",
  },
  {
    question: 'How long to deploy a chatbot?',
    answer:
      "Essential chatbot: 2 weeks from kickoff to live. Pro chatbot with RAG and CRM integration: 4 to 6 weeks. Enterprise multi-channel chatbot with multilingual support and analytics dashboard: 8 to 10 weeks. We deliver a working preview in week one of every engagement, so you can adjust tone, scope and integrations before launch.",
  },
  {
    question: 'Does the chatbot speak multiple languages?',
    answer:
      "Yes. Default deployment covers French, English, German and Italian, automatically detected from the user's message. Other languages (Farsi, Arabic, Portuguese, Spanish, Chinese) can be enabled at no extra cost. We test multilingual quality on real conversations during the QA phase.",
  },
  {
    question: 'Can the chatbot book meetings directly into our calendar?',
    answer:
      "Yes, via Cal.com, Calendly or Google Calendar. The chatbot qualifies the lead, offers available slots, books the meeting and sends a confirmation. We also support more complex flows: collecting documents, sending pre-meeting questionnaires, or triggering a Zapier or n8n workflow on booking confirmation.",
  },
  {
    question: 'What if the chatbot does not know the answer?',
    answer:
      "The chatbot is instructed to say so honestly rather than hallucinate. It then offers to take the question to a human (email capture, Slack/Teams notification to your team, or a callback request). We track unanswered questions weekly to keep improving the knowledge base.",
  },
  {
    question: 'Can the chatbot take voice input?',
    answer:
      "Yes. We integrate voice transcription (Whisper API or browser-native speech recognition) so users can dictate questions on mobile. Particularly useful for accessibility, hands-free contexts (drivers, on-site technicians) and senior users uncomfortable with typing.",
  },
  {
    question: 'How do we measure the chatbot ROI?',
    answer:
      "Three core KPIs: deflection rate (% of questions handled without human escalation), qualified leads captured (chatbot-driven contacts, bookings, sign-ups), and customer satisfaction (1-click feedback at the end of each conversation). Reported monthly with a real dashboard, not vanity metrics. Typical results after 60 days: 40 to 70% deflection, 2 to 4x more after-hours leads, CSAT around 4.5/5.",
  },
  {
    question: 'Is the chatbot GDPR and nFADP compliant?',
    answer:
      "Yes. We sign a Data Processing Agreement, anonymise logs by default, expose a clear privacy notice with the chatbot widget, and let users request data deletion in one click. For regulated sectors we add encryption at rest, IP whitelisting, single-sign-on (SSO) and detailed audit logs. Hosting in EU (Frankfurt) by default, Swiss hosting on request.",
  },
]

export default function Page() {
  return (
    <ServicePage
      currentUrl="/en/artificial-intelligence/ai-chatbot"
      config={{
        pillar: 'ia',
        hubName: 'Artificial Intelligence',
        hubHref: '/en/artificial-intelligence',
        tag: 'AI chatbot · Geneva',
        h1Lead: 'An AI assistant',
        h1Highlight: 'designed for your business.',
        subtitle:
          "Custom AI chatbots for Swiss SMBs. 24/7 support, lead qualification, calendar booking, multilingual FR/EN/DE/IT. Built on Claude Opus 4.7, GPT-5 or Gemini 3, grounded in your private knowledge. Deployed in 2 weeks.",
        icon: MessageCircle,
        secondaryCta: 'See pricing',
        secondaryHref: '/en/pricing',
        problem: {
          title: 'Three problems an AI chatbot solves on day one',
          items: [
            {
              title: 'You miss leads after 6pm',
              text: '50 to 70% of B2C enquiries arrive outside business hours. Without a 24/7 assistant, they go to your competitor or evaporate by morning. The chatbot catches them, qualifies them, books a call.',
            },
            {
              title: 'Your team answers the same 20 questions every day',
              text: '"What are your opening hours?", "How much does X cost?", "Can you deliver in Lausanne?". A chatbot grounded in your real content handles 40 to 70% of these in seconds. Your team focuses on the 30% that actually need a human.',
            },
            {
              title: 'Your contact form converts at 1%',
              text: "Static forms feel like work. A conversational interface that picks up the user's language, answers their first question and quietly captures their email triples form completion in most cases.",
            },
          ],
        },
        stats: [
          { value: "CHF 2'900+", label: 'Fixed-price quote' },
          { value: '2 weeks', label: 'To go live' },
          { value: '24/7', label: 'Always on, every channel' },
          { value: '4 langs', label: 'FR / EN / DE / IT' },
        ],
        bullets: [
          { title: 'Grounded in your real content', text: 'RAG on your website, PDFs, knowledge base, CRM. Answers from your real content, never hallucinated. Sources cited inline when relevant.' },
          { title: 'Multi-channel deployment', text: 'Website widget, WhatsApp Business, Facebook Messenger, Instagram DM, Microsoft Teams, Slack. One brain, every channel.' },
          { title: 'Lead capture and CRM sync', text: 'Email and phone collected naturally during conversation. Pushed in real time to HubSpot, Pipedrive, Bexio, Notion or any other CRM via API or n8n.' },
          { title: 'Calendar booking built in', text: 'Cal.com, Calendly or Google Calendar integration. The bot qualifies, offers slots, books the meeting and sends a confirmation, all in one flow.' },
          { title: 'Multilingual by default', text: 'French, English, German and Italian detected automatically. Other languages on request. Quality tested on real conversations during QA.' },
          { title: 'Voice input ready', text: 'Users can dictate questions instead of typing. Whisper API or browser-native transcription. Great for mobile, accessibility and senior users.' },
          { title: 'Analytics dashboard', text: 'Deflection rate, qualified leads captured, CSAT, top unanswered questions, peak hours, language mix. Monthly digest in plain English.' },
          { title: 'Swiss hosting available', text: 'For fiduciary, medical, legal, private banking and HR use cases. Infomaniak Euria, Swisscom Swiss AI or self-hosted Mistral / Llama on a Swiss VPS. Data never leaves Switzerland.' },
          { title: 'Honest fallback', text: 'When the chatbot does not know, it says so and offers a human escalation. We track unanswered questions weekly to improve the knowledge base.' },
        ],
        process: [
          { title: 'Discovery and scoping', text: 'We map your top 20 questions, your tools, your tone and your data sources. Output: a brief and a fixed quote.' },
          { title: 'Knowledge base setup', text: 'We ingest your real content (site, PDFs, CRM) and structure it for retrieval. You see a preview in week one.' },
          { title: 'Build, test, refine', text: 'We build the chatbot, integrate channels and tools, then run QA on real conversation samples. You adjust tone before launch.' },
          { title: 'Launch and learn', text: 'Go-live with monitoring. We tune answers weekly during month one, then monthly. Optional retainer keeps the chatbot sharp.' },
        ],
        pricing: {
          title: 'Three packages, fixed price upfront',
          subtitle: 'Pick the tier that matches your scope. Switch up or down at any time, no lock-in.',
          tiers: [
            {
              name: 'Essential',
              price: "CHF 2'900",
              cadence: 'One-time fixed quote',
              description: 'A capable, single-channel chatbot grounded in your website and FAQs. Perfect for small businesses and showcase sites.',
              features: [
                'Website widget deployment',
                'RAG on up to 100 pages',
                '2 languages (FR + EN by default)',
                'Email capture and lead notification',
                'Cal.com booking integration',
                '2-week delivery',
                '30-day support window',
              ],
              ctaLabel: 'Start with Essential',
            },
            {
              name: 'Pro',
              price: "From CHF 5'500",
              cadence: 'One-time fixed quote',
              description: 'A connected chatbot that picks up where forms stop: CRM sync, multilingual, voice input, real analytics.',
              features: [
                'Everything in Essential, plus:',
                'CRM sync (HubSpot, Pipedrive, Bexio)',
                'WhatsApp or Messenger channel',
                '4 languages (FR / EN / DE / IT)',
                'Voice input on mobile',
                'Monthly analytics dashboard',
                '4 to 6-week delivery',
                '60-day support window',
              ],
              highlighted: true,
              ctaLabel: 'Start with Pro',
            },
            {
              name: 'Enterprise',
              price: "From CHF 12'000",
              cadence: 'Fixed quote, scoped per project',
              description: 'For regulated sectors, large knowledge bases, multi-channel rollouts or sovereign Swiss hosting.',
              features: [
                'Everything in Pro, plus:',
                'Multi-channel (web + WhatsApp + Teams)',
                'Sovereign Swiss hosting (Euria / Swisscom)',
                'SSO and audit logs',
                'Custom integrations (ERP, internal tools)',
                'Dedicated training of the team',
                '8 to 10-week delivery',
                '90-day support + optional retainer',
              ],
              ctaLabel: 'Talk to us',
            },
          ],
          note: "All prices in Swiss francs, excluding VAT 8.1%. Optional maintenance retainer from CHF 250/month covers monitoring, KB updates and weekly tuning.",
        },
        comparison: {
          title: 'Which LLM should power your chatbot?',
          subtitle: 'Every engine has strengths. The right answer depends on your data, your sector and your budget.',
          headers: ['Claude Opus 4.7', 'GPT-5', 'Gemini 3', 'Euria / Swiss'],
          rows: [
            { label: 'Best for long-context reasoning', values: ['Excellent', 'Good', 'Good', 'Fair'], emphasizeColumn: 0 },
            { label: 'Multimodal (images, PDFs)', values: ['Good', 'Excellent', 'Excellent', 'Limited'], emphasizeColumn: 1 },
            { label: 'Native Google Workspace fit', values: ['Good', 'Good', 'Excellent', 'Fair'], emphasizeColumn: 2 },
            { label: 'Swiss data residency', values: ['EU only', 'EU only', 'EU only', 'Full Swiss'], emphasizeColumn: 3 },
            { label: 'Latency for short answers', values: ['Fast', 'Fast', 'Fast', 'Medium'] },
            { label: 'Best fit at DKDP', values: ['Legal, fiduciary, knowledge work', 'E-commerce, multimodal support', 'Workspace-first SMBs', 'Regulated sectors'] },
          ],
        },
        testimonials: [
          {
            quote:
              'Within 8 weeks, the chatbot was answering 62% of our incoming questions. We doubled qualified leads without adding headcount. Our after-hours pipeline is a real channel now.',
            author: 'Operations Director',
            role: 'Geneva fiduciary, 35 staff',
          },
          {
            quote:
              "We deployed a sovereign Swiss chatbot (Euria) on our internal HR portal. nFADP compliance was a hard requirement. DKDP delivered, the team uses it daily, and our legal review was clean.",
            author: 'Head of HR',
            role: 'Swiss private bank, Geneva',
          },
          {
            quote:
              'The WhatsApp chatbot handles booking confirmations and reschedules. Our reception desk went from 80 calls a day to 30. We did not believe the numbers until we saw them.',
            author: 'Founder',
            role: 'Medical practice, Lausanne',
          },
        ],
        bridge: {
          title: 'Going further with AI',
          subtitle: 'A chatbot is often the entry point. Three natural extensions when the use case matures.',
          links: [
            {
              label: 'Custom AI agents',
              href: '/en/artificial-intelligence/ai-agents',
              description: 'Move from conversation to autonomous action: agents that browse, decide and execute in your tools.',
            },
            {
              label: 'Business automation',
              href: '/en/artificial-intelligence/automation',
              description: 'Connect the chatbot to your real workflows: invoicing, CRM, ERP, internal tools. No-code, with n8n or Make.',
            },
            {
              label: 'AI audit and consulting',
              href: '/en/artificial-intelligence/audit-consulting',
              description: 'Not sure where a chatbot fits in your stack? Start with a 2-week audit and a prioritised 90-day roadmap.',
            },
          ],
        },
        faq: FAQ_ITEMS,
        finalTitle: 'Free chatbot scoping call',
        finalText:
          'Tell us your top use cases (support, lead capture, booking, internal Q&A) and your channels. We come back with a fixed quote and a 2-week timeline. No commitment.',
        extraSchemas: [
          buildServiceWithLocalBusiness({
            name: 'Custom AI chatbot development',
            url: '/en/artificial-intelligence/ai-chatbot',
            description:
              "Custom AI chatbot development in Geneva for Swiss SMBs. 24/7 support, lead qualification, calendar booking, multilingual. Built on Claude Opus 4.7, GPT-5 or Gemini 3. Optional sovereign Swiss hosting via Infomaniak Euria or Swisscom Swiss AI.",
            serviceType: 'AI chatbot development',
            priceFrom: 2900,
            lang: 'en',
            extraAreas: ['Zurich', 'Basel', 'Bern'],
          }),
        ],
      }}
    />
  )
}
