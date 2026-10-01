import type { Realisation, RealisationResult, RealisationVideo } from './types'
import type { Locale } from '@/i18n/config'

/**
 * English content overlay for realisations, keyed by slug.
 * FR data stays the single source; this merges EN text when lang === 'en'.
 * Tech labels (stack, dates, images, URLs) are shared and not duplicated here.
 *
 * v2 (2026-09-25): a case study only gets an English page when it has an
 * entry here (`hasEnglish`). Results and data stories are merged by index:
 * the overlay translates the words, the figures, sources and dates stay the
 * French ones, so a translation can never change a number.
 */
type ResultEN = Pick<RealisationResult, 'metric' | 'value' | 'label'> & { period?: string; source?: string }

type DataStoryEN = {
  title: string
  unit: string
  period: string
  caption?: string
  /** Same order as the French annotations. */
  annotations?: string[]
}

type RealisationEN = Partial<Pick<Realisation, 'tags' | 'lead' | 'teaser' | 'answer' | 'facts' | 'lessons' | 'faq'>> & {
  client?: Partial<Realisation['client']>
  meta?: Partial<Pick<Realisation['meta'], 'title' | 'titleAccent' | 'excerpt' | 'seoTitle' | 'seoDescription'>>
  problem?: Realisation['problem']
  approach?: Realisation['approach']
  flow?: Realisation['flow']
  results?: ResultEN[]
  dataStories?: DataStoryEN[]
  /** Same order as the French videos: words only, files stay shared. */
  videos?: Pick<RealisationVideo, 'title' | 'description' | 'transcript'>[]
  testimonial?: Pick<NonNullable<Realisation['testimonial']>, 'quote' | 'role' | 'source'>
  highlights?: Realisation['highlights']
  showcase?: Realisation['showcase']
  mockup?: Realisation['mockup']
  direction?: Realisation['direction']
  touchpoints?: Realisation['touchpoints']
  seo?: Realisation['seo']
}

export const EN_CONTENT: Record<string, RealisationEN> = {
  'sos-relevage': {
    tags: ['Showcase site', 'Next.js', 'Local SEO', 'Custom CRM', 'GEO'],
    client: { sector: 'Lift pumps', location: 'Geneva' },
    mockup: {
      src: '/images/realisations/sos-relevage/presentation.webp',
      alt: 'The SOS Relevage website on a laptop and a phone: home page and first step of the request form, real screenshots staged between clear water, a steel pipe and a brass valve',
    },
    meta: {
      title: 'Local service website and job-management CRM for a Geneva building-services company',
      titleAccent: 'job-management CRM',
      seoTitle: 'Website and CRM for a Geneva building-services firm | DKDP',
      seoDescription:
        'Next.js website and custom job-management CRM for a Geneva building-services firm: request funnel, local SEO and sourced figures.',
      excerpt:
        'Next.js 15 website for a Geneva lift-pump specialist: a four-step request funnel feeds a custom intervention CRM, with local SEO and answers written to be quoted by generative engines.',
    },
    lead: 'The website launched with the business: every request goes through a four-step funnel, then lands directly in a custom-built job-management CRM.',
    teaser: ['Four-step request form', 'Requests land in a custom CRM', 'Visual identity and local SEO'],
    answer:
      'SOS Relevage, a Geneva lift-pump specialist, launched its business on 24 August 2026 with a website we built: a four-step request funnel feeds a custom intervention CRM. In a manual check on 20 September 2026, the site ranked first in the local pack for “pompe de relevage genève”.',
    facts: [
      { label: 'Sector', value: 'Building services, lift pumps' },
      { label: 'Location', value: 'Canton of Geneva' },
      { label: 'Project start', value: '8 May 2026' },
      { label: 'Open to Google', value: '25 July 2026' },
      { label: 'Business launch', value: '24 August 2026' },
      { label: 'Delivered', value: 'Website, CRM, SEO, visual identity' },
      { label: 'Technology', value: 'Next.js 15, Supabase, Vercel' },
    ],
    problem: {
      title: 'A trade nobody searches for until the basement floods',
      body: 'SOS Relevage is a Geneva company that does one thing: servicing, repairing and replacing wastewater lift pumps for property managers, condominiums and homeowners. The site had to launch together with the business, with no history, no reviews and no references to show, in a market where nobody looks for a contractor before the breakdown.\n\nIt had to be found on very local queries, earn the trust of a property manager comparing suppliers, and turn a hurried visit into a complete request, address and access details included, with no call back to ask for the basics.',
      facts: [
        { label: 'Audience', value: 'Property managers, condominiums, homeowners' },
        { label: 'Territory', value: 'Canton of Geneva' },
        { label: 'Start', value: 'A new business, no reviews or references yet' },
      ],
    },
    approach: {
      title: 'A service site that feeds the field tool directly',
      body: 'Next.js 15 with the App Router, content versioned in code without a CMS, hosted on Vercel with functions in Europe and the database in Zurich. The heart of the site is a four-step request funnel, situation, requester, building, contact, preset by the button it was opened from: every submission creates a record in a custom intervention CRM, with scheduling, a synced calendar, appointment reminders and a photo job report.\n\nOn the search side, one page per intent (repair, maintenance, replacement, property-manager contract, flood emergency, who to call), a JSON-LD FAQ, an llms.txt file and answers written to be quoted as-is by generative engines. All of it on a visual identity created for the brand, from the logo to the signature wave.',
      bullets: [
        'Next.js 15, React 19, Tailwind 4, Vercel deployment, content versioned in code',
        'Four-step request funnel, preset by the button, validated client-side and server-side',
        'First name, last name, email and phone asked on all five forms, like the bexio contact record',
        'Custom intervention CRM: scheduling, calendar synced with Google, email and SMS reminders, report per intervention type with photos',
        'Address search on the federal building register, with no dependency on Google',
        'JSON-LD LocalBusiness, Service and FAQPage, llms.txt and llms-full.txt generated at build',
        'Eleven blog guides and intent pages for local search',
        'Visual identity and logo created for the brand, 24/7 on-call service announced sitewide',
      ],
    },
    flow: {
      title: 'From request to report, with no re-typing',
      intro: 'What happens to a request sent from the website, up to the report handed to the customer.',
      steps: [
        { label: 'Website button', detail: 'it pre-fills the subject of the request', kind: 'source' },
        { label: 'Four-step funnel', detail: 'subject, requester, building, contact details', kind: 'outil' },
        { label: 'Record in the CRM', detail: 'address and plant-room access included', kind: 'outil' },
        { label: 'Scheduled intervention', detail: 'Google calendar, email and SMS reminder', kind: 'controle' },
        { label: 'Intervention report', detail: 'photos for each checkpoint', kind: 'sortie' },
      ],
      note: 'The customer PDF report is still assembled outside the CRM, from its data.',
    },
    videos: [
      {
        title: 'The request funnel, on the live site',
        description: 'From the “Faire une demande” button to the contact step, in 14 seconds, unedited.',
        transcript:
          'From the home page, a click on “Faire une demande” opens the four-step funnel. The visitor picks the subject (check-up and maintenance), then their profile (property manager). At the address step, they type the first letters and pick the official address suggested by the federal building register. The last step asks for contact details. The video stops before sending.',
      },
    ],
    dataStories: [
      {
        title: 'Google impressions, rolling 7 days',
        unit: 'impressions',
        period: 'From 25 July to 23 September 2026, each point adds up the previous 7 days',
        caption: 'Search Console hides more than half of this site’s queries: the curve counts every impression, including those whose query is hidden.',
        annotations: ['Business launch', 'Brand name back in the home page title'],
      },
    ],
    results: [
      { metric: 'Google local pack', value: '1st', label: 'for “pompe de relevage genève”, and 3rd in organic results', source: 'Manual check of the results page, from Geneva', period: 'single check' },
      { metric: 'Google impressions', value: "1'802", label: 'and 44 clicks since the first impressions', period: 'from 25 July to 23 September 2026' },
      { metric: 'Average position', value: '5.0', label: 'of the home page, all queries combined', period: '28 days, from 27 August to 23 September 2026' },
    ],
    lessons: [
      'Search Console hides a large share of a local site’s queries: 57% of SOS Relevage impressions were anonymised in the 20 September check. Before concluding that a query does not rank, we check the results page ourselves, from Geneva.',
      'Removing the brand from the home page title was a mistake: for six weeks, Google never showed the site for “sos relevage”. The name went back to the front of the title on 8 September 2026.',
      'For a repair business, the phone number matters as much as the site: until 24 September 2026, its Google profile was the only one of the three in the local pack without a number.',
    ],
    faq: [
      { question: 'Why a custom CRM rather than an off-the-shelf tool?', answer: 'Because the website and the field tool share the same data: each request arrives with the address, the plant-room access and the type of intervention, and becomes a scheduled job with no re-typing. A generic tool would have meant copying that information from one system to another.' },
      { question: 'Can the site be quoted by answer engines such as ChatGPT?', answer: 'Every service page opens with a 40-to-60-word answer that names the company, and an llms.txt file describes the site for generative engines. Nothing guarantees a citation, but these passages are written to be quoted as they are.' },
      { question: 'Where is request data hosted?', answer: 'The site is served by Vercel, with functions in Europe, and the CRM database is hosted in Zurich.' },
    ],
    highlights: [
      {
        eyebrow: 'Arriving',
        tag: 'UI',
        title: 'A before-and-after slider as the promise',
        body: 'The first screen does not describe the trade, it shows it: the same plant room flooded on the left, back in service on the right, with the technician in front. The slider follows the mouse without a click and drifts back on its own when released. One title, one sentence, a red button to send a request and, second, the emergency line.',
        image: { src: '/images/realisations/sos-relevage/hero-desktop.webp', alt: 'SOS Relevage home page: headline, before-and-after slider on a flooded plant room brought back into service, technician in the foreground', path: '/' },
        phone: { src: '/images/realisations/sos-relevage/hero-mobile.webp', alt: 'SOS Relevage on mobile: the same first screen with stacked title and buttons, call bar at the bottom' },
        points: ['A 24/7 on-call strip above the menu, visible before anything else', 'Red carries the main action: the request, or the call when it is urgent', 'The slider reacts to hover, not only to dragging'],
      },
      {
        eyebrow: 'Recognising',
        tag: 'UX',
        title: 'Eight signals to self-diagnose before calling',
        body: 'Someone whose basement is flooding does not always know they have a lift pump. Eight symptoms sorted into emergency, to schedule or preventive, an image that changes with the hovered signal, and on mobile a sticky panel driven by scrolling: you go down the list, the image follows without an extra gesture.',
        image: { src: '/images/realisations/sos-relevage/section-1.webp', alt: 'SOS Relevage, the eight-signal section: symptoms sorted by urgency, photo of a Flygt pump and a Describe my breakdown button', path: '/' },
        phone: { src: '/images/realisations/sos-relevage/symptomes-mobile.webp', alt: 'SOS Relevage on mobile: the eight signals with the sticky image following the scroll' },
        points: ['On mobile, scrolling drives the image: nothing to learn', 'Each signal opens the right request directly', 'A “which pump do I have?” block for those who are not sure'],
      },
      {
        eyebrow: 'Asking',
        tag: 'UX',
        title: 'A four-step request, preset by the button',
        body: 'Every button on the site opens the same funnel: the subject, who you are, the building, your details. The originating button pre-fills what it already knows, the address is looked up in the federal building register, and access to the plant room is asked for right away. Every submission creates a record in the field CRM, with no call back to ask for the basics.',
        image: { src: '/images/realisations/sos-relevage/tunnel-desktop.webp', alt: 'SOS Relevage request funnel opened on the home page: “Which subject?” step with four tiles', path: '/' },
        phone: { src: '/images/realisations/sos-relevage/tunnel-mobile.webp', alt: 'SOS Relevage on mobile: the request funnel full screen, four subjects stacked' },
        steps: ['Subject', 'You', 'Address', 'Contact'],
        points: ['Four subjects: urgent repair, repair, check-up and maintenance, works', 'The same validation rules client-side and server-side', 'First name, last name, email and phone asked every time, for a complete record'],
      },
      {
        eyebrow: 'When it overflows',
        tag: 'Content',
        title: 'An emergency page that also says when it is not us',
        body: 'Six steps in order, four water origins to recognise before calling, who to call and in which order, with the fire brigade ahead of everyone. The page states in plain words what the company does not do: it restores drainage, it does not dry the building. That is what makes it quotable rather than promotional.',
        image: { src: '/images/realisations/sos-relevage/urgence-gestes-desktop.webp', alt: 'SOS Relevage flood emergency page: “Safety first, damage second”, six numbered steps in a grid', path: '/urgence-inondation-geneve' },
        points: ['A direct answer at the top of the page, quoted as is by engines', 'The 118 as a phone link, never competing with the form', 'A companion minute-by-minute article on the blog'],
      },
      {
        eyebrow: 'Knowing who to call',
        tag: 'SEO',
        title: 'A pivot page comparing four trades',
        body: 'Lift-pump specialist, plumber, drainage company, electrician: for each, what it handles and what it does not. The page answers the “who” questions Search Console surfaced without a single click, then ends with the laws and official services cited at the source.',
        image: { src: '/images/realisations/sos-relevage/qui-appeler-desktop.webp', alt: 'SOS Relevage “Who to call” page: two cards comparing the lift-pump specialist and the general plumber, what each handles and does not', path: '/qui-appeler-pompe-relevage-geneve' },
        points: ['Four cards, two lists each: what it handles, what it does not', 'Reference texts linked: LEaux, OIBT, OCEau, the 118', '“Who” FAQ reused in the structured data'],
      },
    ],
    direction: {
      intro: 'An identity created for the brand: two blues for clean water and the technical side, two browns for wastewater, and an arrow going up. The shift from brown to blue tells the trade in one image, on the logo as in the gradients of the site.',
      logo: { src: '/images/realisations/sos-relevage/logo-transparent.webp', alt: 'SOS Relevage logo: SOS letters with a wave and an arrow going up, from brown to blue' },
      tagline: '« Pompes de relevage. Un seul métier. »',
      palette: [
        { name: 'Night blue', hex: '#09365f', role: 'headings, footer' },
        { name: 'SOS blue', hex: '#186092', role: 'links, secondary actions' },
        { name: 'Technical blue', hex: '#0d4b7b', role: 'hover, depth' },
        { name: 'Light blue', hex: '#46b0d6', role: 'accents, clean water' },
        { name: 'Water brown', hex: '#5f3716', role: 'wastewater, before' },
        { name: 'Mud brown', hex: '#97713e', role: 'transition' },
        { name: 'Action red', hex: '#a8332a', role: 'the main action of the screen' },
      ],
      type: [
        { role: 'headings and body copy, variable from 200 to 900', family: 'Hubot Sans', sample: 'Spécialiste des pompes de relevage à Genève.' },
        { role: 'labels, section numbers, footer', family: 'JetBrains Mono', sample: '04 · Identification · 8 signaux', mono: true },
      ],
      principles: [
        { title: 'One red per screen', body: 'Red carries the main action: sending a request in normal times, calling when it is urgent. Everything else is blue, which makes the expected action impossible to miss.' },
        { title: 'Never a heading in capitals', body: 'Capitals live in buttons and small mono labels. Headings stay in sentence case, more legible and less loud.' },
        { title: 'One gradient, one direction', body: 'Brown turns to blue from left to right or bottom to top, never the other way: the direction of lifting.' },
        { title: 'Nothing decorative', body: 'No animated bands, no abstract illustration. A plant room, a pump, a technician, at eye level.' },
        { title: 'Pages that read like a file', body: '01, 02, 03 in mono labels ahead of each section: a structure the eye finds again from one page to the next.' },
        { title: 'Thumb before mouse', body: 'A call bar that fades while reading and returns when scrolling up, a full-screen funnel, 44-pixel targets.' },
      ],
    },
    seo: {
      intro: 'Search is not a layer added at the end. Each page answers one precise search intent, each answer is written to be quoted as is, and the structured data is generated from the content, never duplicated.',
      serp: {
        siteName: 'SOS Relevage',
        url: 'https://sos-relevage.ch',
        title: 'SOS Relevage - Dépannage & Entretien de pompes à Genève',
        description: "Pompe de relevage en panne à Genève ? Contrôle, entretien et dépannage pour éviter l'inondation. Urgence 24h/24, audit gratuit.",
        favicon: '/images/realisations/sos-relevage/logo-color.webp',
      },
      intents: [
        { label: 'Repair', path: '/depannage-pompe-relevage-geneve' },
        { label: 'Maintenance', path: '/maintenance-pompes-relevage' },
        { label: 'Replacement', path: '/remplacement-pompes' },
        { label: 'Property-manager contract', path: '/contrat-entretien-regies' },
        { label: 'Flood emergency', path: '/urgence-inondation-geneve' },
        { label: 'Who to call', path: '/qui-appeler-pompe-relevage-geneve' },
        { label: 'Municipalities served', path: '/zones-geneve' },
        { label: 'Guides', path: '/blog' },
      ],
      schemas: ['LocalBusiness', 'Plumber', 'Service', 'FAQPage', 'Article', 'VideoObject', 'BreadcrumbList', 'WebSite'],
      geo: [
        { title: 'Answers written to be quoted', body: 'On every service page, a heading phrased like the question (“who can replace a lift pump in Geneva?”) followed by a 40-to-60-word answer that names the company and makes sense outside the page.' },
        { title: 'The out-of-scope, in writing', body: 'The emergency page says what the company does not do. A generative engine reading “we restore drainage, we do not dry the building” does not present it as a post-disaster remediation firm.' },
        { title: 'llms.txt and linked sources', body: 'A hand-written llms.txt, an llms-full.txt generated at every build from the site data, and the laws cited with their link: LEaux, OIBT, OCEau, SIG, the 118.' },
      ],
    },
  },
  'goldencash-refonte': {
    tags: ['Rebuild', 'Astro', 'Real-time API', 'Dashboard', 'Local SEO'],
    client: { sector: 'Gold and precious-metal buying', location: 'Geneva' },
    meta: {
      title: 'Rebuilding a Geneva gold-buying website, with real-time prices',
      titleAccent: 'real-time prices',
      seoTitle: 'Geneva gold-buying website, real-time prices | DKDP',
      seoDescription:
        'Astro rebuild for a Geneva gold buyer: prices refreshed every 10 seconds, API with a backup source, live 12 days after the first commit.',
      excerpt:
        'Astro rebuild for a Geneva gold buyer: the buy-back estimator and prices refresh every 10 seconds, from an API that keeps a backup source. Live 12 days after the first commit.',
    },
    lead: 'The new site shows a buy-back estimator and prices refreshed every 10 seconds. It went live 12 days after the first commit.',
    teaser: ['Buy-back estimator tied to live gold prices', 'Gold prices refreshed every 10 seconds', 'Rebuilt in Astro, SEO included'],
    answer:
      'Golden Cash, a gold buyer in Geneva, put its new website live on 25 April 2026. The Astro site shows a buy-back estimator and prices refreshed every 10 seconds, from an API that keeps a backup source. The first commit was on 13 April, 12 days earlier.',
    facts: [
      { label: 'Sector', value: 'Gold and precious-metal buying' },
      { label: 'Location', value: 'Geneva, Eaux-Vives' },
      { label: 'Project start', value: '13 April 2026' },
      { label: 'Live', value: '25 April 2026' },
      { label: 'Delivered', value: 'Website rebuild, price API, SEO' },
      { label: 'Technology', value: 'Astro 5, PHP API, Infomaniak' },
    ],
    problem: {
      title: 'Prices to confirm by phone before every sale',
      body: "Golden Cash's previous site did not show precious-metal prices in real time: a customer who wanted to know what their gold was worth had to call before coming in. The admin interface was not properly secured, and occasional bugs affected the public display.\n\nIn a trade where trust depends on an accurate price, the site had to show a correct rate at all times, and let the team take back control within seconds if a price source went down.",
      facts: [
        { label: 'Audience', value: 'Individuals and professionals selling gold' },
        { label: 'Stake', value: 'An accurate displayed price, with no prior call' },
        { label: 'Start', value: 'Previous WordPress site' },
      ],
    },
    approach: {
      title: 'A fast static site, a price API that does not go down',
      body: 'A complete rebuild on Astro 5 as a static site, for speed and simple deployment to Infomaniak through GitHub Actions. On the server side, a PHP API queries GoldAPI by default and keeps XMLCharts as a backup. A 10-second cache limits paid calls, and the EUR/CHF rate is read live from Yahoo Finance, with two fallback sources.\n\nThe public estimator calculates the buy-back price from weight and carat, and a token-secured dashboard lets the team choose the price source, adjust its margins and correct a price by hand.',
      bullets: [
        'Astro 5 static site, Infomaniak deployment through GitHub Actions',
        'Buy-back estimator: weight and carat, price refreshed every 10 seconds',
        'Price ticker across the site, refreshed every 10 seconds',
        'PHP API: GoldAPI by default, XMLCharts as backup, 10-second cache',
        'EUR/CHF rate read live, with two fallbacks and a plausibility check',
        'Secure dashboard: price source, margins, manual correction',
      ],
    },
    results: [
      { metric: 'Time to production', value: '12 days', label: 'between the first commit and going live', source: 'Project git history', period: 'from 13 to 25 April 2026' },
      { metric: 'Displayed prices', value: '10 s', label: 'between two updates of the estimator and the price ticker', source: 'Production site code' },
      { metric: 'Price sources', value: '2', label: 'GoldAPI by default, XMLCharts as backup, selectable from the dashboard', source: 'Production site code' },
    ],
    lessons: [
      'A price source is chosen for its reliability before its cost: two days after launch, the site switched to GoldAPI by default, keeping XMLCharts as a backup.',
      'An exchange rate derived from two gold prices drifted by 0.3 to 1% from the market. Since 28 April 2026, the EUR/CHF rate is read live, with two fallbacks.',
      'The site’s security policy blocked conversion tracking without any error message. Since 20 June 2026, we check every tag on the production site, not only on the preview.',
    ],
    testimonial: {
      quote:
        'I highly recommend DKDP digital agency for the quality of its work. David handled my project with great professionalism and fully understood my brief from the start, with great responsiveness at every step. I particularly appreciated his attentiveness, his availability and the care given to details. An efficient and pleasant collaboration.',
      role: 'Co-manager, Golden Cash Geneva',
      source: 'Google review, translated from French',
    },
    mockup: {
      src: '/images/realisations/goldencash-refonte/presentation.webp',
      alt: 'The Golden Cash website on a laptop and a phone: home page “Vendez votre or au meilleur prix” and the online estimator for 50 g of 22-carat gold, real screenshots staged on navy marble with gold jewellery',
    },
    videos: [
      {
        title: 'The buy-back estimator, on the live site',
        description: 'Pick the carat and the weight, read the estimated value in francs or euros, in 11 seconds, unedited.',
        transcript:
          'On the Estimation page, the visitor picks the quality of their gold, 18 then 22 carats, and the weight, from 20 to 100 grams. The estimated value is recalculated on every click, in Swiss francs then in euros. The price moved during the recording: for 100 grams of 22-carat gold, the value went from CHF 9,536 to CHF 9,537.',
      },
    ],
    faq: [
      { question: 'Where do the prices on the site come from?', answer: 'From an API that queries GoldAPI by default and can switch to XMLCharts from the dashboard. The EUR/CHF rate is read live from Yahoo Finance, with two fallbacks, and a 10-second cache limits paid calls.' },
      { question: 'How long did the rebuild take?', answer: 'Twelve days separate the first commit, on 13 April 2026, from going live, on 25 April 2026. Content and tracking adjustments followed in the weeks after.' },
      { question: 'Where is the site hosted?', answer: 'With Infomaniak, in Switzerland, with automatic deployment through GitHub Actions on every change.' },
    ],
  },
  'cours-informatique-refonte': {
    tags: ['Rebuild', 'Astro', 'WordPress migration', 'UX for seniors', 'Local SEO', 'GEO'],
    client: { sector: 'Computer lessons for individuals', location: 'Geneva' },
    meta: {
      title: 'WordPress to Astro rebuild for a Geneva computer school for seniors',
      titleAccent: 'WordPress to Astro',
      seoTitle: 'WordPress to Astro rebuild, Geneva school | DKDP',
      seoDescription:
        'Astro rebuild for a Geneva computer school: a journey for seniors, a price estimator, 88 redirects, first on Google in a manual check.',
      excerpt:
        'A complete rebuild of cours-informatique.ch, from WordPress to Astro: a journey designed for seniors and beginners, a four-question price estimator, 88 redirects and one page per neighbourhood. First on Google for “cours informatique genève” in a manual check on 28 September 2026.',
    },
    lead: 'A site written for someone who is afraid to touch their computer: one button to call, a four-question price estimator, one page per neighbourhood.',
    teaser: ['A journey designed for seniors and beginners', 'A four-question price estimator', '88 redirects and one page per neighbourhood'],
    answer:
      'Cours-informatique.ch, the computer school founded by David Khazaei in Geneva, moved from WordPress to Astro on 1 September 2026. The new site speaks first to seniors and beginners: one button to call, a price estimator, one page per neighbourhood. In a manual check on 28 September 2026, it ranked first for “cours informatique genève”.',
    facts: [
      { label: 'Sector', value: 'Computer lessons for individuals' },
      { label: 'Location', value: 'Geneva, Eaux-Vives' },
      { label: 'Project start', value: '28 March 2026' },
      { label: 'Live', value: '1 September 2026' },
      { label: 'Delivered', value: 'Rebuild, migration, SEO, English version' },
      { label: 'Technology', value: 'Astro 6, Infomaniak, GitHub Actions' },
    ],
    mockup: {
      src: '/images/realisations/cours-informatique-refonte/presentation.webp',
      alt: 'The cours-informatique.ch website on a laptop and a phone: home page “Cours d’informatique à Genève pour débutant et senior” and the estimator result, 6 to 12 hours for CHF 840 to 1,680, real screenshots staged on a dining table with reading glasses and a cup of tea',
    },
    problem: {
      title: 'An audience wary of computers, a site that had become hard to evolve',
      body: 'Cours-informatique.ch has taught one-to-one computer lessons in Geneva since 2014, at home or in its Eaux-Vives office. Its audience is first of all people who hesitate: seniors, beginners, people who no longer dare ask their family for help. For them, a website has to say in one sentence who it is for, and offer one obvious way to call.\n\nThe previous WordPress site, built with Elementor, had grown page by page and was too heavy for this audience. It was fragile too: on 23 August 2026, a WordPress update took it offline. The rebuild had to pass twelve years of search rankings on to the new site, on a simpler base to evolve.',
      facts: [
        { label: 'Audience', value: 'Seniors, beginners, professionals' },
        { label: 'Area', value: 'Canton of Geneva, at home' },
        { label: 'Start', value: 'WordPress and Elementor site' },
      ],
    },
    approach: {
      title: 'A static site, one button per screen, every old address redirected',
      body: 'The site is rebuilt on Astro 6 as a static site, with no CMS and no CSS framework: light HTML pages, served by Infomaniak in Switzerland and published by GitHub Actions on every change. The journey is written for a beginner: a headline that names the audience, a blue button that shows the phone number, blue kept for what can be clicked, a full-screen menu with no accordion on mobile, a four-question price estimator and a catalogue filtered by profile.\n\nOn the search side, every address of the old site keeps its place: 88 301 redirects, a 410 code for archive and test pages, one page per Geneva neighbourhood linked to its three closest neighbours, an English version, structured data for the school, the courses and the FAQs, and an llms.txt file for generative engines.',
      bullets: [
        'Astro 6 static site, custom CSS, content versioned in the code',
        'Hosted by Infomaniak in Switzerland, published by GitHub Actions in about a minute and a half',
        'One blue button per screen, the phone number written out, WhatsApp second',
        'Full-screen menu below 1024 pixels, with no accordion or hidden sub-menu',
        'Four-question estimator: recommended course, hours and budget',
        'Catalogue filtered by profile, search that tolerates missing accents and typos',
        '88 301 redirects from the WordPress addresses, archive and test pages in 410',
        '14 neighbourhood pages, each linked to its three closest neighbours',
        'English version of 37 pages, JSON-LD LocalBusiness, Course, FAQPage and VideoObject, llms.txt',
        'Requests measured by the site itself: form, call, WhatsApp',
      ],
    },
    videos: [
      {
        title: 'The price estimator, on the live site',
        description: 'Four answers, then the recommended course, the duration and the budget, in 10 seconds, unedited.',
        transcript:
          'On the home page, the visitor opens the free price estimate and answers four questions: senior or complete beginner, mastering my computer, starting from scratch, 6 to 12 hours. The result recommends the Mac and PC computer course, suggests cybersecurity to go further, and estimates 6 to 12 hours, or CHF 840 to 1,680. Two buttons follow: book by phone or write on WhatsApp.',
      },
    ],
    results: [
      { metric: 'Google', value: '1st', label: 'in organic results for “cours informatique genève” and “cours informatique à domicile”', source: 'Manual check of the results page, from Geneva', period: 'single check' },
      { metric: 'Google AI Mode', value: '5 of 6', label: 'answers that cite the site, with the exact prices', source: 'Manual check of six questions in Google AI Mode', period: 'single check' },
      { metric: 'Mobile performance', value: '99', label: 'out of 100 in Lighthouse, largest contentful paint in 2.1 s, no layout shift', source: 'Lighthouse 12, mobile, median of three runs', period: 'home page' },
      { metric: 'Live pages', value: '88', label: 'in French and English, including 16 course pages and 14 neighbourhood pages in French', source: 'Live sitemap' },
    ],
    lessons: [
      'At the switchover, request tracking stopped silently: the tag manager was still listening to the buttons of the old WordPress theme. For three weeks, no call or form was counted. Since 21 September 2026, the site sends its own events, and we test tracking on the day of the switchover.',
      'The artificial-intelligence page lost clicks when its address changed, despite a clean 301 redirect: the old URL ranked 8 to 9, the new one 9 to 10. On the next migration, we will keep the address of pages that already bring clicks.',
      'The 353 KB tracking script loaded at the same time as the main image: on mobile, the largest contentful paint took 4.8 seconds. Loaded after the page, it came down to 2.78 seconds on 11 September 2026. We now measure every third-party script before going live.',
    ],
    faq: [
      { question: 'Why move a lesson website from WordPress to Astro?', answer: 'Because the site does not need a back office: it presents courses, prices and neighbourhoods that rarely change. Astro generates static HTML pages, light and with no database to maintain. In a check on 1 October 2026, Lighthouse scores it 99 out of 100 on mobile, with a largest contentful paint of 2.1 seconds.' },
      { question: 'How do you keep your search rankings during a rebuild?', answer: 'By redirecting every old address to the page that answers the same question: 88 301 redirects for cours-informatique.ch, and a 410 code for archive and test pages. On the day of the switchover, you also have to check request tracking: that is what we missed here.' },
      { question: 'Can a website really be designed for seniors?', answer: 'Yes, through simple choices: one action button per screen, the phone number written out, short texts, no menu hidden behind an accordion, and an estimator that gives the price without asking for an email address.' },
      { question: 'Where is the site hosted?', answer: 'With Infomaniak, in Switzerland. Every change is published by GitHub Actions in about a minute and a half.' },
    ],
    showcase: {
      title: 'The screens that carry the site',
      intro: 'Five screens, in the order a beginner meets them. Each answers one precise question: who is this site for, which course to pick, how much it costs, where to click, will they come to my home.',
    },
    highlights: [
      {
        eyebrow: 'Arrive',
        tag: 'UI',
        title: 'A headline that names the audience, a button that shows the number',
        body: 'The first screen speaks to one person: the beginner. The headline names the audience in orange, the sentence says what will happen, the trainer sits down next to you, and the only blue button shows the phone number in full. On mobile, the photo moves above the headline and the call button spans the full width.',
        image: {
          src: '/images/realisations/cours-informatique-refonte/hero-desktop.webp',
          alt: 'cours-informatique.ch home page: headline “Cours d’informatique à Genève pour débutant et senior”, Google rating 4.9 out of 5, blue button “Prendre rendez-vous au 078 238 20 71” and three lesson photos',
          path: '/',
        },
        phone: {
          src: '/images/realisations/cours-informatique-refonte/hero-mobile.webp',
          alt: 'cours-informatique.ch on mobile: lesson photo on top, headline, Google rating and a full-width call button',
        },
        points: ['Blue is only for what can be clicked, never for decoration', 'The Google rating and review count before the button', 'WhatsApp always within reach, as a floating button'],
      },
      {
        eyebrow: 'Choose',
        tag: 'UX',
        title: 'A catalogue filtered by profile, not by software',
        body: 'A beginner does not look for “Microsoft 365”, they want to sort their photos. The catalogue filters first by profile, beginner and senior, professional, AI and tech, creative, then through a search that understands missing accents, typos and everyday words. The most frequent searches are one click away.',
        image: {
          src: '/images/realisations/cours-informatique-refonte/catalogue-desktop.webp',
          alt: 'cours-informatique.ch catalogue “Choisissez votre cours”: profile filters with the number of courses, search field, frequent searches Excel, ChatGPT, iPhone, Photos, Canva and the first course cards',
          path: '/cours/',
        },
        phone: {
          src: '/images/realisations/cours-informatique-refonte/catalogue-mobile.webp',
          alt: 'cours-informatique.ch on mobile: catalogue filters, search and sorting, then the first course card',
        },
        points: ['Four profiles, the number of courses shown on each filter', 'Search reworked on 2 September 2026, tested on 41 realistic queries', 'Excel, ChatGPT, iPhone, Photos: frequent searches as shortcuts'],
      },
      {
        eyebrow: 'Estimate',
        tag: 'UX',
        title: 'The budget in four questions, before even calling',
        body: 'The question a beginner does not dare ask on the phone is the price. The estimator asks it for them: situation, goal, level, desired duration. It answers with a recommended course, a second one to go further, a range of hours and a budget calculated on the real prices, then offers to call or write on WhatsApp.',
        image: {
          src: '/images/realisations/cours-informatique-refonte/estimateur-desktop.webp',
          alt: 'cours-informatique.ch estimator result: Mac and PC computer course recommended, cybersecurity to go further, estimate of 6 to 12 hours for CHF 840 to 1,680, phone and WhatsApp buttons',
          path: '/',
        },
        phone: {
          src: '/images/realisations/cours-informatique-refonte/estimateur-mobile.webp',
          alt: 'cours-informatique.ch on mobile: the same estimator result, recommended courses, duration and budget',
        },
        steps: ['Situation', 'Goal', 'Level', 'Duration'],
        points: ['Budget calculated on the public price list: CHF 140, 150 or 200 per hour', 'No email address asked to see the result', 'Booking by phone or WhatsApp, straight from the result'],
      },
      {
        eyebrow: 'Navigate',
        tag: 'UX',
        title: 'A full-screen menu, with no accordion to unfold',
        body: 'On a computer, the course menu opens in four columns by profile, each course with the logos of the tools it teaches. Below 1024 pixels, it becomes a full screen: opening hours at the top, shortcuts as tiles, every course visible by scrolling, and the call and WhatsApp buttons fixed at the bottom. No hidden sub-menu to guess.',
        image: {
          src: '/images/realisations/cours-informatique-refonte/mega-desktop.webp',
          alt: 'cours-informatique.ch “Nos cours individuels” menu open: four columns, beginners and seniors, professionals, AI and tech, creative and social, with tool logos',
          path: '/',
        },
        phone: {
          src: '/images/realisations/cours-informatique-refonte/menu-mobile.webp',
          alt: 'cours-informatique.ch on mobile: full-screen menu with opening hours, four shortcut tiles, the course list and the call and WhatsApp buttons at the bottom',
        },
        points: ['No accordion: everything shows by scrolling', 'Opening hours before the links', 'Call and WhatsApp stay at the bottom of the screen'],
      },
      {
        eyebrow: 'Be found',
        tag: 'SEO',
        title: 'One page per neighbourhood, linked to its neighbours',
        body: 'The trainer travels across the canton, but people look for a lesson near home. Each neighbourhood has its page: travel time from the office, tram and bus lines, local landmarks on a swisstopo aerial view and the travel fee. At the bottom, the three closest neighbourhoods, calculated from coordinates, link the pages together.',
        image: {
          src: '/images/realisations/cours-informatique-refonte/quartier-voisins-desktop.webp',
          alt: 'cours-informatique.ch Eaux-Vives page: swisstopo aerial view with the office marker, travel time, tram and bus lines, local landmarks, then the neighbouring areas Champel, Pâquis and Plainpalais',
          path: '/cours-informatique-eaux-vives/',
        },
        phone: {
          src: '/images/realisations/cours-informatique-refonte/quartier-mobile.webp',
          alt: 'cours-informatique.ch on mobile: the Eaux-Vives page, lesson photo, headline and call button',
        },
        points: ['14 neighbourhoods in French, as many in English', 'A swisstopo aerial view rather than a Google map', 'Three “neighbouring areas” links per page, calculated by distance'],
      },
    ],
    direction: {
      intro:
        'The brand guidelines, tightened for the rebuild and measured in the site code: a warm orange that carries the headings, peach backgrounds that let the page breathe, a blue kept for action. Headings are set in RuckSack Bold, a round and heavy typeface, inside orange pills.',
      logo: { src: '/images/realisations/cours-informatique-refonte/logo-blanc.webp', alt: 'cours-informatique.ch logo on orange: the mascot, a laptop wearing glasses and waving, and the site name in white' },
      logoLight: { src: '/images/realisations/cours-informatique-refonte/logo.webp', alt: 'cours-informatique.ch logo on a light background: the mascot and the site name, with “.ch” in orange' },
      tagline: '“Computing made simple”',
      theme: { tile: '#E56001', accent: '#FFE8D4', lightTile: '#FFF3E8', logoWidth: 300 },
      palette: [
        { name: 'Orange', hex: '#E56001', role: 'heading pills, accents, section backgrounds' },
        { name: 'Peach', hex: '#FFF3E8', role: 'backgrounds that breathe' },
        { name: 'Deep peach', hex: '#FFE8D4', role: 'cards, inserts, speech bubbles' },
        { name: 'Action blue', hex: '#1A70E0', role: 'buttons and links, nothing else' },
        { name: 'Sage green', hex: '#6B9E7D', role: 'ticks and badges, as a signal' },
        { name: 'Charcoal', hex: '#1E1E1E', role: 'headings and text' },
        { name: 'Mascot blue', hex: '#5BA8D9', role: 'the mascot’s screen' },
      ],
      type: [
        { role: 'body text, buttons, forms', family: 'Roboto', sample: 'Your trainer sits down next to you and explains every step.' },
        { role: 'handwritten notes, mascot speech bubbles', family: 'Caveat', sample: 'We always start with a coffee and a smile.' },
      ],
      principles: [
        { title: 'Blue means clickable', body: 'Blue is kept for buttons and links. A senior who sees blue knows they can press it, and never looks for the action in a decoration.' },
        { title: 'Backgrounds that breathe', body: 'Between white and orange, peach backgrounds and notebook grids soften the reading of long pages.' },
        { title: 'Sage green as a signal only', body: 'Ticks, badges, small icons, never a section background: the signal stays readable because it stays rare.' },
        { title: 'Headings in pills', body: 'Each section opens on a white heading inside an orange pill: the eye finds the start of a block effortlessly.' },
        { title: 'A mascot that guides', body: 'The laptop with glasses waves, points, thinks: it announces a step or a question, it never fills a gap.' },
        { title: 'The number written out', body: 'The phone remains the first channel for this audience: the number is written on the button, never hidden behind a “Contact us”.' },
      ],
    },
    seo: {
      intro:
        'The search history of cours-informatique.ch went back twelve years. The rebuild had to pass it on to the new site, then widen it: one page per intent, one page per neighbourhood, and answers written to be quoted by generative engines.',
      serp: {
        siteName: 'Cours-Informatique.ch',
        url: 'https://cours-informatique.ch',
        title: "Cours d'informatique à Genève pour débutant et senior",
        description:
          "Cours d'informatique individuels à Genève, chez vous ou aux Eaux-Vives. Dès 140 CHF/h, sans engagement. 4,9/5 sur 86 avis. 078 238 20 71.",
        favicon: '/images/realisations/cours-informatique-refonte/mascotte.webp',
      },
      serpNote:
        'The title names the audience, the description gives the price, the rating and the number: everything a beginner wants to know before clicking. Both are measured in pixels, as Google displays them.',
      intents: [
        { label: 'One-to-one courses', path: '/cours/' },
        { label: 'Seniors', path: '/cours-informatique-seniors-geneve/' },
        { label: 'Artificial intelligence', path: '/cours/intelligence-artificielle/' },
        { label: 'Excel', path: '/cours/excel/' },
        { label: 'Neighbourhoods', path: '/cours-informatique-eaux-vives/' },
        { label: 'Group courses', path: '/cours-en-groupe/' },
        { label: 'Companies', path: '/cours-entreprise/' },
        { label: 'IT repair', path: '/depannage-informatique-domicile-geneve/' },
      ],
      schemas: ['LocalBusiness', 'Course', 'CourseInstance', 'FAQPage', 'VideoObject', 'BreadcrumbList', 'BlogPosting', 'WebSite'],
      geo: [
        { title: 'Prices written out', body: 'CHF 140, 150 and 200 per hour, written on the pages, in the FAQs and in the llms.txt. In a manual check on 28 September 2026, Google AI Mode cited the site in five answers out of six, exact prices included.' },
        { title: 'A real answer, even when it does not sell', body: '“Are there free computer lessons in Geneva?” gets an answer on the home page: the City’s free digital help desks first, then what a one-to-one lesson adds.' },
        { title: 'No figure without a source', body: 'Customer counters and unsourced “certified” badges were removed on 21 September 2026, from the site and from the llms.txt: an engine that cross-checks its sources quotes what it can verify.' },
      ],
    },
  },
  'mkr-caucasian-camp': {
    tags: ['Visual identity', 'Next.js', 'Bilingual website', 'Online application', 'Custom back office', 'Google Ads'],
    client: { sector: 'Wrestling and MMA camps', location: 'Dagestan and Chechnya' },
    mockup: {
      src: '/images/realisations/mkr-caucasian-camp/presentation.webp',
      alt: 'The MKR Caucasian Camp website on a laptop and a phone: first screen of the French version and the application choice, real screenshots staged in a wrestling gym',
    },
    meta: {
      title: 'Brand, bilingual website and application platform for a wrestling and MMA camp',
      titleAccent: 'application platform',
      seoTitle: 'Brand and bilingual website for a sports camp | DKDP',
      seoDescription:
        'Logo, brand guidelines, Next.js site in French and English, online application and custom back office for a wrestling and MMA camp in the Caucasus.',
      excerpt:
        'For MKR Caucasian Camp, which runs wrestling camps in Dagestan and MMA camps in Chechnya, we created the brand, the Next.js website in French and English, the online application, the back office that follows every file until departure, the emails, the presentation film and the Google Ads campaigns.',
    },
    lead: 'We built everything, from the brand to the film: the bilingual website, the online application, the back office, the emails and the Google ads.',
    teaser: ['Brand, bilingual website and presentation film', 'Online applications and custom back office', 'Automated emails and Google Ads tracking'],
    answer:
      'MKR Caucasian Camp runs wrestling camps in Dagestan and MMA camps in Chechnya. Since April 2026 we have built everything: the brand, the bilingual website, the application, the back office, the emails, the film and the Google ads. In a manual check on 29 September 2026, the site ranked first for “camp lutte daghestan”.',
    facts: [
      { label: 'Sector', value: 'Sport, wrestling and MMA camps' },
      { label: 'Destinations', value: 'Dagestan and Chechnya' },
      { label: 'Project start', value: '4 April 2026' },
      { label: 'Live', value: '27 May 2026' },
      { label: 'Delivered', value: 'Brand, website, applications, back office, emails, video, advertising' },
      { label: 'Technologies', value: 'Next.js 16, Supabase, Resend, Vercel' },
    ],
    problem: {
      title: 'Selling a camp at the far end of the world to athletes who have never been there',
      body: 'MKR Caucasian Camp takes wrestlers and MMA fighters to train in the gyms of the Caucasus, in Dagestan and Chechnya. Its founder, Ruslan Mukhtarov, is Chechen, born in Dagestan, and a former member of the French Olympic wrestling team who trained at INSEP from 2012 to 2016: he opens doors that few foreigners get through.\n\nAt the start, the project had no brand, no website and no way to apply. We had to reassure people about a destination that worries them, explain the visa and transfer logistics, speak to French and English speakers alike, then turn curiosity into applications, without ever promising more than the camp delivers.',
      facts: [
        { label: 'Audience', value: 'Adult fighters, families, clubs' },
        { label: 'Languages', value: 'French and English' },
        { label: 'Starting point', value: 'No brand, no website, no tool' },
      ],
    },
    approach: {
      title: 'A brand, a website and an application tool, designed as one piece',
      body: 'Everything starts with the brand. The M of MKR draws a ridge of peaks, and the guidelines, named “Mineral Brutalism”, set the black of rock, the orange of sunlight on a summit and a red kept for actions. The Next.js 16 website follows from it, in French and English, with one page per discipline, per destination and per camp format, sessions that are calculated and renew themselves, and an application that adapts its questions to the chosen format.\n\nBehind it, a custom back office follows every file from the selection video call to departure: next step, PDF contract, payment, reminders and the applicant’s WhatsApp within reach. Emails go out from the camp’s own domain, Google Ads tracking follows each lead all the way to the application, and the presentation film, whose script and editor brief we wrote, opens the home page.',
      bullets: [
        'Logo, “Mineral Brutalism” guidelines, Teko and Barlow typefaces, light and dark versions',
        'Next.js 16 website in French and English: 36 pages per language, static, hreflang tags',
        'Calculated sessions: each one leaves the application form on its start date, and the same season of the following year takes its place',
        'Five-step application for four formats (session, custom, family, club), price calculated live, selection video call booked online',
        'Installable back office: today’s to-do list, filterable files, next step, PDF contracts, payments, sessions, partners',
        'Applicant emails in two languages with the founder’s direct WhatsApp, and an acknowledgement for the contact form',
        'Presentation film in French and English, landscape and vertical: script, editor brief, integration into the site',
        'Google Ads: four conversions, Consent Mode v2, every application linked to its campaign',
        'SEO and GEO: structured data, llms.txt in two languages, eight blog articles, a downloadable Caucasus guide',
        'A3 poster for partner gyms, Instagram launch kit, covers for the documentary teaser',
      ],
    },
    flow: {
      title: 'From the first visit to the camp departure',
      intro: 'What happens to someone who discovers the camp, all the way to their departure.',
      steps: [
        { label: 'Ad or Google search', detail: 'the campaign stays recorded on the application', kind: 'source' },
        { label: 'Website in French or English', detail: 'disciplines, destinations, sessions and prices', kind: 'outil' },
        { label: 'Five-step application', detail: 'questions adapted to the chosen format', kind: 'outil' },
        { label: 'Selection video call', detail: 'slot booked online with the founder', kind: 'controle' },
        { label: 'Contract and bank transfer', detail: 'PDF contract generated from the back office', kind: 'controle' },
        { label: 'Departure to the Caucasus', detail: 'reminders, pre-departure email, WhatsApp', kind: 'sortie' },
      ],
      note: 'Payment is made by bank transfer: it is recorded in the back office, which then moves the file to “Paid”.',
    },
    results: [
      {
        metric: 'Google, “camp mma tchétchénie”',
        value: '1st',
        label: 'and also 2nd, 3rd and 5th: four of the first five results are pages of the site',
        source: 'Manual check of the google.ch results page, from Geneva',
        period: 'single check',
      },
      {
        metric: 'Google, “camp lutte daghestan”',
        value: '1st',
        label: 'with the destination page, and 3rd with the home page',
        source: 'Manual check of the google.ch results page, from Geneva',
        period: 'single check',
      },
      {
        metric: 'Google in English, “dagestan wrestling camp”',
        value: '2nd',
        label: 'with the English version of the site',
        source: 'Manual check of the google.ch results page in English, from Geneva',
        period: 'single check',
      },
      {
        metric: 'Pages published',
        value: '72',
        label: '36 pages in French and their 36 English versions, listed in the sitemap',
        source: 'mkrcamp.com sitemap (sitemap.xml)',
        period: 'single check',
      },
    ],
    videos: [
      {
        title: 'The application, on the live site',
        description: 'From choosing a format to the Identity step, in 14 seconds, unedited. Submission is blocked: no application was sent.',
        transcript:
          'On the application page, the visitor picks the official sessions, then the winter 2027 session, wrestling in Dagestan and two weeks. The summary immediately shows the camp, the session, the duration and the estimated total. At the Identity step, the dialling code of the browser’s country is already suggested, here Switzerland, and the visitor types a fictitious first name, last name and email address. The video stops before submission.',
      },
      {
        title: 'The film, started from the home page',
        description: '“Voir la vidéo de présentation” scrolls the page down to the film, then the room goes dark around the screen.',
        transcript:
          'From the first screen, a click on “Voir la vidéo de présentation” (watch the presentation video) scrolls the page to the film section, which starts at once while everything around the screen dims. For this silent recording, the film picks up at the founder’s introduction: the logo over a village in Dagestan, then Ruslan Mukhtarov introducing himself, Chechen, born in Dagestan and a former member of the French wrestling team.',
      },
      {
        title: 'The home page, scrolling',
        description: 'From the first screen to the choice of format, with mountain ridges between the sections.',
        transcript:
          'The first screen cycles through the next sessions and their remaining places, over a background video. Scrolling down, you pass the film section, the six services included on site, then the five-step path from application to immersion, up to the choice of format. A drawn mountain range makes the transition from one section to the next.',
      },
    ],
    lessons: [
      'Rebuilding the site every hour, just to switch four sessions a year, rewrote every page continuously and became the largest item on the hosting bill. Since 23 September 2026 the site has been static, and a scheduled task only rebuilds it on the day a session changes.',
      'A single word can hold a campaign back: the first ads promised to take care of the visa, and Google restricted them under its policy on official documents. We rewrote them without that word, and we now review every ad with that policy in mind.',
      'The server functions were running in Washington by default, while the database is in Frankfurt. By moving them closer on 31 July 2026, we brought a back-office page down from 205 to 118 milliseconds.',
      'In our tests, a transactional email illustrated with a large photo landed in spam at Infomaniak, while the lighter version reached the Gmail inbox. The camp’s emails therefore stay plain, with a single green WhatsApp button.',
    ],
    faq: [
      {
        question: 'Why a bilingual website for a camp in the Caucasus?',
        answer:
          'Because participants come from France, Switzerland and Belgium as much as from the United Kingdom or North America. Every page exists in both languages with its own address, and the application, the emails and the back office follow the applicant’s language.',
      },
      {
        question: 'How do the sessions update without anyone stepping in?',
        answer:
          'Four season templates calculate the dates. A session leaves the application form on its start date, the same season of the following year replaces it, and a scheduled task rebuilds the site that day, with no manual entry and no redeployment.',
      },
      {
        question: 'What happens when someone applies?',
        answer:
          'The applicant receives an email inviting them to book their selection video call, with the founder’s WhatsApp. On his side, the founder receives the application with the chosen session in the subject line, then the back office files it in the right queue: call to hold, file to decide, contract to send or payment expected.',
      },
      {
        question: 'Can you build the same set-up for another activity?',
        answer:
          'Yes. The brand, the website, the application and the tracking tool can be designed together for a club, a training course, a trip or a sports event: we start from your real application process, then build what is missing.',
      },
    ],
    showcase: {
      title: 'The screens that carry the camp',
      intro:
        'Seven screens from the French version of the site, each with its English twin, in the order an athlete meets them: arriving, watching the film, choosing a format, applying, talking to the founder, understanding where they are going. The last one belongs to the founder, who follows every file from his back office.',
    },
    highlights: [
      {
        eyebrow: 'Arriving',
        tag: 'UI',
        title: 'A first screen that sets the scene',
        body: 'The first screen states the promise in three lines, “Train among champions”, over a background video. On the right, a card cycles through the next sessions with their remaining places and starting price. Only two buttons compete for attention: apply, or watch the film.',
        image: {
          src: '/images/realisations/mkr-caucasian-camp/hero-desktop.webp',
          alt: 'MKR Caucasian Camp home page, French version: headline “Entraîne-toi au milieu des champions”, apply and presentation-video buttons, card for the February 2027 session with remaining places',
          path: '/',
        },
        phone: {
          src: '/images/realisations/mkr-caucasian-camp/hero-mobile.webp',
          alt: 'MKR Caucasian Camp on mobile: the same headline, both buttons stacked and the WhatsApp bubble',
        },
        points: [
          'Each session shows its remaining places per discipline, read live',
          'Red is only used for the apply button, orange underlines the word that matters',
          'The founder’s WhatsApp bubble is on every page of the site',
        ],
      },
      {
        eyebrow: 'Seeing before going',
        tag: 'UX',
        title: 'A cinema inside the page',
        body: 'The presentation film takes the second section of the home page. Started from the first screen, it scrolls the page down to itself, then the room goes dark around the screen during playback. On a phone, a vertical version takes over with its own subtitles, a sound button and a full-screen button.',
        image: {
          src: '/images/realisations/mkr-caucasian-camp/film-desktop.webp',
          alt: 'MKR Caucasian Camp, presentation film playing in the page: founder Ruslan Mukhtarov with a coach, French subtitle about a real immersion',
          path: '/',
        },
        phone: {
          src: '/images/realisations/mkr-caucasian-camp/film-mobile.webp',
          alt: 'MKR Caucasian Camp on mobile: the vertical version of the film, with the sound and full-screen buttons',
        },
        points: [
          'Nothing downloads before the click: the film does not slow the page down',
          'Playback pauses when you leave the section',
          'Two languages and two formats: French and English, landscape and vertical',
        ],
      },
      {
        eyebrow: 'Choosing how to come',
        tag: 'UX',
        title: 'Four formats, one way in',
        body: 'Before asking anything, the application page asks for a format: the official sessions, a custom camp, the family camp or a club. Each card says who it is for, which dates and from how many people, then the form that follows adapts to the chosen format.',
        image: {
          src: '/images/realisations/mkr-caucasian-camp/inscription-choix-desktop.webp',
          alt: 'MKR Caucasian Camp, “Choose your application” page: four cards, official sessions, custom, family, club and group, with dates, duration and group size',
          path: '/inscription',
        },
        phone: {
          src: '/images/realisations/mkr-caucasian-camp/inscription-choix-mobile.webp',
          alt: 'MKR Caucasian Camp on mobile: the choice of application format, cards stacked',
        },
      },
      {
        eyebrow: 'Applying',
        tag: 'UX',
        title: 'A five-step application, with the price shown live',
        body: 'The application moves through five steps: the camp, identity, experience, health, then confirmation. From the first choice, a summary shows the discipline, the session, the duration and the estimated total, recalculated on every click. Once the application is sent, the confirmation email goes out at once: it invites the applicant to book the selection call and gives the founder’s WhatsApp.',
        image: {
          src: '/images/realisations/mkr-caucasian-camp/inscription-camp-desktop.webp',
          alt: 'MKR Caucasian Camp, step 1 of the application “Which session, which discipline?”: four sessions from autumn 2026 to summer 2027, then the choice between wrestling and MMA',
          path: '/inscription',
        },
        phone: {
          src: '/images/realisations/mkr-caucasian-camp/email-confirmation-mobile.webp',
          alt: 'The confirmation email received on a phone by a fictitious applicant: “Book your call with Ruslan”, camp summary and booking button',
        },
        steps: ['The camp', 'Identity', 'Experience', 'Health', 'Confirmation'],
        points: [
          'The level required for MMA in Chechnya is checked in the form',
          'A hidden field and a minimum delay keep bots out, without a captcha',
          'Each application keeps track of the campaign that brought it in',
        ],
      },
      {
        eyebrow: 'Talking to the founder',
        tag: 'UX',
        title: 'The founder one tap away, on every page',
        body: 'A camp in the Caucasus raises questions a form cannot settle. The WhatsApp bubble therefore opens a panel with Ruslan Mukhtarov’s photo and a welcome message; on a computer, a QR code lets the visitor carry on the conversation on their phone. The same WhatsApp button comes back in the emails sent to applicants.',
        image: {
          src: '/images/realisations/mkr-caucasian-camp/whatsapp-desktop.webp',
          alt: 'MKR Caucasian Camp, WhatsApp panel open on the home page: photo and name of Ruslan Mukhtarov, welcome message, QR code and “Open WhatsApp” button',
          path: '/',
        },
        phone: {
          src: '/images/realisations/mkr-caucasian-camp/whatsapp-mobile.webp',
          alt: 'MKR Caucasian Camp on mobile: the WhatsApp panel open, without a QR code, with the green button',
        },
        points: [
          'One number, set in a single place in the code, for the site and the emails alike',
          'The QR code only appears on computers, where WhatsApp is not always installed',
          'The bubble steps aside during the application, so as not to distract the applicant',
        ],
      },
      {
        eyebrow: 'Knowing where you are going',
        tag: 'Content',
        title: 'Pages that answer the worry',
        body: 'Going to Dagestan or Chechnya worries people, and the answer does not fit in a slogan. Each destination therefore has its own page, with facts, partner gyms and access via Istanbul, while a logistics page details the visa, the transfers and the total budget. The blog adds guides, including one on safety, updated for 2026.',
        image: {
          src: '/images/realisations/mkr-caucasian-camp/daghestan-desktop.webp',
          alt: 'MKR Caucasian Camp, Dagestan destination page, French version: “The land that forges champions”, facts about the region and the wrestling camp',
          path: '/destinations/dagestan',
        },
        points: [
          'One page per destination, with verifiable facts and its own FAQ',
          'The trip budget broken down line by line on the logistics page',
          'A Caucasus guide to download in exchange for an email address',
        ],
      },
      {
        eyebrow: 'Behind the scenes',
        tag: 'Tool',
        title: 'A back office that says what to do today',
        body: 'The founder does not have to look for his files: the back-office home sorts them by action, whether a call to decide on, a payment expected or a contract to send, with today’s calls and the next departure alongside. Each file then shows the next step and its buttons, keyboard shortcuts and the applicant’s WhatsApp. The screenshots come from the fictitious data set used to test the tool.',
        image: {
          src: '/images/realisations/mkr-caucasian-camp/admin-a-faire-desktop.webp',
          alt: 'MKR back office in dark mode, fictitious data: “To do” page with calls to decide, payments expected and contracts to send, next departure and today’s calls on the right',
          path: '/admin',
        },
        phone: {
          src: '/images/realisations/mkr-caucasian-camp/admin-fiche-mobile.webp',
          alt: 'MKR back office on a phone, fictitious data: an applicant’s file with the next step and its buttons',
        },
        points: [
          'PDF contract generated and sent from the file, in the applicant’s language',
          'A view per session, with the places taken per discipline',
          'Installable on a phone, in light or dark mode',
        ],
      },
    ],
    direction: {
      intro:
        'An identity created from scratch and named “Mineral Brutalism”: the black of rock dominates, the orange of sunlight hitting a summit signs the brand, and red is only used for action. The M of MKR draws a ridge of peaks, from red to orange, that comes back everywhere, from the website to the back office.',
      logo: {
        src: '/images/realisations/mkr-caucasian-camp/logo-white.webp',
        alt: 'MKR Caucasian Camp logo for dark backgrounds: the M drawn as red and orange peaks, the letters KR and CAUCASIAN CAMP in white',
      },
      logoLight: {
        src: '/images/realisations/mkr-caucasian-camp/logo-dark.webp',
        alt: 'MKR Caucasian Camp logo for light backgrounds: the same red and orange peaks, the letters in charcoal grey',
      },
      tagline: '“Forged in the Caucasus.”',
      theme: { tile: '#131313', accent: '#C84B31', lightTile: '#F2F0EC', taglineUppercase: true },
      palette: [
        { name: 'Rock', hex: '#131313', role: 'page background' },
        { name: 'Chasm', hex: '#0E0E0E', role: 'recessed areas' },
        { name: 'Stratum', hex: '#1A1A18', role: 'cards, surfaces' },
        { name: 'Ridge', hex: '#2A2A2A', role: 'active elements' },
        { name: 'Mountain Glow', hex: '#C84B31', role: 'signature, labels, glows' },
        { name: 'Crimson', hex: '#C41E3A', role: 'decisive actions' },
        { name: 'Snow', hex: '#F8F8F8', role: 'text' },
      ],
      ratio: [
        { label: 'dark surfaces', hex: '#131313', share: 70 },
        { label: 'light text', hex: '#F8F8F8', share: 15 },
        { label: 'Mountain Glow', hex: '#C84B31', share: 10 },
        { label: 'Crimson', hex: '#C41E3A', share: 5 },
      ],
      type: [
        { role: 'headings, always in capitals', family: 'Teko', sample: 'Train where champions are born', uppercase: true },
        { role: 'body text', family: 'Barlow', sample: 'Wrestling camps in Dagestan and MMA camps in Chechnya, from one to three weeks.' },
        { role: 'labels and metadata', family: 'Barlow Condensed', sample: 'Session · Winter 2027 · 15 places', uppercase: true },
      ],
      principles: [
        { title: 'Sharp corners', body: 'On the site, buttons, cards, fields and panels keep square corners: every component should look machined from steel.' },
        { title: 'Orange signs, red cuts', body: 'Orange carries the identity: labels, glows, key figures. Red is only used for decisive actions, such as applying, because if everything is red, nothing is urgent any more.' },
        { title: 'Tones, not lines', body: 'Sections stand apart through shifts of black, like layers of rock, rather than drawn borders.' },
        { title: 'A ridge between two sections', body: 'A drawn mountain range makes the transition from one section to the next: scrolling down the page feels like crossing mountain passes.' },
        { title: 'Headings that hit', body: 'Teko, condensed and angular, is always set in capitals, with a single word in orange when it needs weight: “among CHAMPIONS”.' },
        { title: 'One world, from the site to the tools', body: 'The emails, the partner-gym poster, the video covers and the back office share the black, the orange and the same hierarchy.' },
      ],
    },
    touchpoints: {
      title: 'The brand beyond the website',
      intro:
        'An identity does not live on a website alone. Here are the pieces delivered around it: print for partner gyms, the Instagram launch, the covers of the documentary teaser, the email every applicant receives and the founder’s tool.',
      items: [
        {
          src: '/images/realisations/mkr-caucasian-camp/affiche-a3-salles.webp',
          alt: 'MKR Caucasian Camp A3 poster for partner gyms: headline “Forgé dans le Caucase” (forged in the Caucasus), 15 wrestling places and 15 MMA places, mkrcamp.com and a QR code',
          label: 'A3 poster for partner gyms',
          kind: 'imprime',
          caption: 'One headline, two disciplines and a QR code that leads to the application.',
          cols: 4,
          ratio: '3/4',
        },
        {
          src: '/images/realisations/mkr-caucasian-camp/teaser-couverture-reel.webp',
          alt: 'Vertical cover of the “Immersion au Daghestan” teaser: a fighter punching focus mitts, headline in capitals and MKR logo',
          label: 'Cover of the documentary teaser',
          kind: 'video',
          caption: 'We replaced the end logo, produced the vertical versions and designed the covers.',
          credit: 'Skudy (@skud.y), who shot and directed the teaser',
          cols: 4,
          ratio: '3/4',
        },
        {
          src: '/images/realisations/mkr-caucasian-camp/email-confirmation-mobile.webp',
          alt: 'MKR application confirmation email on a phone, fictitious applicant: founder’s photo, “Book your call with Ruslan”, summary and booking button',
          label: 'The email received after applying',
          kind: 'email',
          caption: 'Rendered here with a fictitious applicant.',
          cols: 4,
          ratio: '3/4',
          device: 'phone',
        },
        {
          src: '/images/realisations/mkr-caucasian-camp/instagram-lancement.webp',
          alt: 'Four slides of the Instagram launch carousel, in French: “The site is live”, “Before, you needed a DM”, “Choose your format” with a screenshot of the site, and the list of what is online',
          label: 'Instagram launch carousel',
          kind: 'reseaux',
          caption: 'Nine slides announced the launch, with real screenshots of the site; the launch kit counts around thirty posts.',
          cols: 12,
        },
        {
          src: '/images/realisations/mkr-caucasian-camp/teaser-miniature-youtube.webp',
          alt: 'YouTube thumbnail of the “Immersion au Daghestan” teaser: two fighters training, headline in white capitals',
          label: 'YouTube thumbnail of the teaser',
          kind: 'video',
          credit: 'Skudy (@skud.y)',
          cols: 6,
        },
        {
          src: '/images/realisations/mkr-caucasian-camp/admin-a-faire-clair-desktop.webp',
          alt: 'MKR back office in light mode, fictitious data: “To do” page with calls to decide, payments expected and contracts to send',
          label: 'The back office, in light mode',
          kind: 'outil',
          caption: 'The founder picks the light or dark theme. Fictitious test data.',
          cols: 6,
        },
      ],
    },
    seo: {
      intro:
        'Two languages, one architecture: every page exists in French and English, with its own address, hreflang tags and structured data. Generative engines also get an llms.txt file in each of the two languages.',
      serp: {
        siteName: 'MKR Caucasian Camp',
        url: 'https://mkrcamp.com',
        title: 'MMA Camp Chechnya and Wrestling Camp Dagestan | MKR Caucasian',
        description:
          'Train where champions are born. Wrestling in Dagestan, MMA in Chechnya. 1 to 3 weeks in the Caucasus, 4 sessions per year, visa and housing included.',
        favicon: '/images/realisations/mkr-caucasian-camp/favicon.webp',
      },
      serpNote:
        'The query first, the brand at the end of the title, and the core of the offer in the snippet: both disciplines, the duration, the session rhythm and what is included.',
      schemasNote:
        'Generated from the same data as the pages: sessions, prices and contact details live in a single place in the code.',
      intents: [
        { label: 'Wrestling in Dagestan', path: '/en/program/wrestling' },
        { label: 'MMA in Chechnya', path: '/en/program/mma' },
        { label: 'Sessions and prices', path: '/en/sessions' },
        { label: 'Family camp', path: '/en/family' },
        { label: 'Clubs and groups', path: '/en/clubs-groups' },
        { label: 'Dagestan destination', path: '/en/destinations/dagestan' },
        { label: 'Logistics and budget', path: '/en/logistics' },
        { label: 'French version', path: '/' },
      ],
      schemas: ['SportsOrganization', 'SportsActivityLocation', 'Event', 'AggregateOffer', 'Person', 'FAQPage', 'BlogPosting', 'TouristDestination', 'DigitalDocument', 'BreadcrumbList', 'WebSite'],
      geo: [
        {
          title: 'One llms.txt per language',
          body: 'llms.txt and llms-en.txt describe the camp, its two destinations, the entry rule, the sessions and the price list. They change on the day the offer changes, just like the site and the ads.',
        },
        {
          title: 'Facts rather than superlatives',
          body: 'The destination pages line up verifiable facts, Olympic medals from the region, partner gyms, access via Istanbul, rather than promises: a generative engine picks up a fact, rarely an adjective.',
        },
        {
          title: 'The founder, described the same way everywhere',
          body: 'Chechen, born in Dagestan, a former member of the French Olympic wrestling team: the same description comes back in the Person JSON-LD, the About page, the FAQ and the llms.txt, so that engines connect the founder to the camp.',
        },
      ],
    },
  },
}

/** True when the case study has an English translation, hence an /en/portfolio page. */
export function hasEnglish(slug: string): boolean {
  return slug in EN_CONTENT
}

/** Returns the realisation with EN text merged in when lang === 'en'. */
export function localizeRealisation(r: Realisation, lang: Locale): Realisation {
  if (lang !== 'en') return r
  const e = EN_CONTENT[r.slug]
  if (!e) return r
  return {
    ...r,
    tags: e.tags ?? r.tags,
    client: { ...r.client, ...e.client },
    meta: { ...r.meta, ...e.meta },
    lead: e.lead ?? r.lead,
    teaser: e.teaser ?? r.teaser,
    answer: e.answer ?? r.answer,
    facts: e.facts ?? r.facts,
    problem: e.problem ?? r.problem,
    approach: e.approach ?? r.approach,
    flow: e.flow ?? r.flow,
    results: r.results?.map((res, i) => ({ ...res, ...(e.results?.[i] ?? {}) })),
    videos: r.videos?.map((v, i) => ({ ...v, ...(e.videos?.[i] ?? {}) })),
    dataStories: r.dataStories?.map((ds, i) => {
      const t = e.dataStories?.[i]
      if (!t) return ds
      return {
        ...ds,
        title: t.title,
        unit: t.unit,
        period: t.period,
        caption: t.caption ?? ds.caption,
        annotations: ds.annotations?.map((a, j) => ({ ...a, label: t.annotations?.[j] ?? a.label })),
      }
    }),
    lessons: e.lessons ?? r.lessons,
    faq: e.faq ?? r.faq,
    testimonial: r.testimonial && e.testimonial ? { ...r.testimonial, ...e.testimonial, translated: true } : r.testimonial,
    highlights: e.highlights ?? r.highlights,
    showcase: e.showcase ?? r.showcase,
    mockup: r.mockup && e.mockup ? { ...r.mockup, ...e.mockup } : r.mockup,
    direction: e.direction ?? r.direction,
    touchpoints: e.touchpoints ?? r.touchpoints,
    seo: e.seo ?? r.seo,
  }
}
