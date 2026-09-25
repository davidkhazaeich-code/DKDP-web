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

type RealisationEN = Partial<Pick<Realisation, 'tags' | 'answer' | 'facts' | 'lessons' | 'faq'>> & {
  client?: Partial<Realisation['client']>
  meta?: Partial<Pick<Realisation['meta'], 'title' | 'excerpt' | 'seoTitle' | 'seoDescription'>>
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
  seo?: Realisation['seo']
}

export const EN_CONTENT: Record<string, RealisationEN> = {
  'sos-relevage': {
    tags: ['Showcase site', 'Next.js', 'Local SEO', 'Custom CRM', 'GEO'],
    client: { sector: 'Lift pumps', location: 'Geneva' },
    mockup: {
      src: '/images/realisations/sos-relevage/mockup-hero.webp',
      alt: 'The SOS Relevage website on a laptop and a phone: home page with the before-and-after slider on a plant room',
    },
    meta: {
      title: 'Local service website and job-management CRM for a Geneva building-services company',
      seoTitle: 'Website and CRM for a Geneva building-services firm | DKDP',
      seoDescription:
        'Next.js website and custom job-management CRM for a Geneva building-services firm: request funnel, local SEO and sourced figures.',
      excerpt:
        'Next.js 15 website for a Geneva lift-pump specialist: a four-step request funnel feeds a custom intervention CRM, with local SEO and answers written to be quoted by generative engines.',
    },
    answer:
      'SOS Relevage, a Geneva lift-pump specialist, launched its business on 24 August 2026 with a website we built: a four-step request funnel feeds a custom intervention CRM. In a manual check on 20 September 2026, the site ranked first in the local pack for “pompe de relevage genève”.',
    facts: [
      { label: 'Sector', value: 'Building services, lift pumps' },
      { label: 'Location', value: 'Canton of Geneva' },
      { label: 'Launch', value: '24 August 2026' },
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
      seoTitle: 'Geneva gold-buying website, real-time prices | DKDP',
      seoDescription:
        'Astro rebuild for a Geneva gold buyer: prices refreshed every 10 seconds, API with a backup source, live 12 days after the first commit.',
      excerpt:
        'Astro rebuild for a Geneva gold buyer: the buy-back estimator and prices refresh every 10 seconds, from an API that keeps a backup source. Live 12 days after the first commit.',
    },
    answer:
      'Golden Cash, a gold buyer in Geneva, asked us to rebuild its website in April 2026. The new Astro site shows a buy-back estimator and prices refreshed every 10 seconds, from an API that keeps a backup source. It went live 12 days after the first commit.',
    facts: [
      { label: 'Sector', value: 'Gold and precious-metal buying' },
      { label: 'Location', value: 'Geneva, Eaux-Vives' },
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
      src: '/images/realisations/goldencash-refonte/mockup-hero.webp',
      alt: 'The Golden Cash website on a laptop and a phone: home page “Vendez votre or au meilleur prix” and the price ticker',
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
    seo: e.seo ?? r.seo,
  }
}
