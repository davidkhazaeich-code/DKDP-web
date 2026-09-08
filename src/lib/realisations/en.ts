import type { Realisation } from './types'
import type { Locale } from '@/i18n/config'

/**
 * English content overlay for realisations, keyed by slug.
 * FR data stays the single source; this merges EN text when lang === 'en'.
 * Tech labels (stack, dates, images, URLs) are shared and not duplicated here.
 */
type RealisationEN = Partial<Pick<Realisation, 'tags'>> & {
  client?: Partial<Realisation['client']>
  meta?: Partial<Realisation['meta']>
  problem?: Realisation['problem']
  approach?: Realisation['approach']
  results?: Realisation['results']
  testimonial?: Realisation['testimonial']
  highlights?: Realisation['highlights']
  direction?: Realisation['direction']
  seo?: Realisation['seo']
}

const EN_CONTENT: Record<string, RealisationEN> = {
  'sos-relevage': {
    tags: ['Showcase site', 'Next.js', 'Local SEO', 'Custom CRM', 'GEO'],
    client: { sector: 'Lift pumps', location: 'Geneva' },
    meta: {
      title: 'Local service site with a request funnel and a field CRM',
      excerpt:
        'Next.js 15 site for a Geneva lift-pump specialist: a four-step request funnel wired to a custom intervention CRM, local SEO and content written to be quoted by generative engines.',
    },
    problem: {
      title: 'A trade nobody searches for until the basement floods',
      body: 'SOS Relevage is a Geneva company that does one thing: servicing, repairing and replacing wastewater lift pumps for property managers, condominiums and homeowners. The site had to launch together with the business, with no history, no reviews and no references to show, in a market where nobody looks for a contractor before the breakdown.\n\nIt had to be found on very local queries, earn the trust of a property manager comparing suppliers, and turn a hurried visit into a complete request, address and access details included, with no call back to ask for the basics.',
      facts: [
        { label: 'Trade', value: 'Wastewater lift pumps, nothing else' },
        { label: 'Audience', value: 'Property managers, condominiums, homeowners' },
        { label: 'Territory', value: 'Canton of Geneva' },
        { label: 'Start', value: 'A new business, no reviews or references yet' },
      ],
    },
    approach: {
      title: 'A service site that feeds the field tool directly',
      body: 'Next.js 15 with the App Router, content versioned in code without a CMS, hosted on Vercel with functions in Europe and the database in Zurich. The heart of the site is a four-step request funnel, situation, requester, building, contact, preset by the button it was opened from: every submission creates a record in a custom intervention CRM, with scheduling, photo job reports, a maintenance checklist and a shared calendar.\n\nOn the search side, one page per intent (repair, maintenance, replacement, property-manager contract, flood emergency, who to call), a JSON-LD FAQ, an llms.txt regenerated at every build and answers written to be quoted as-is by generative engines. All of it on a visual identity created for the brand, from the logo to the signature wave.',
      bullets: [
        'Next.js 15, React 19, Tailwind 4, Vercel deployment, content versioned in code',
        'Four-step request funnel, preset by the button, validated client-side and server-side',
        'Custom intervention CRM: scheduling, photo reports, 12-point checklist, ICS calendar',
        'Address search on the federal building register, with no dependency on Google',
        'JSON-LD LocalBusiness, Service and FAQPage, llms.txt and llms-full.txt generated at build',
        'Twelve blog guides and intent pages for local search',
        'Visual identity and logo created for the brand, 24/7 on-call service announced sitewide',
      ],
    },
    results: [
      { metric: 'Search Console', value: '22 pages', label: 'indexed six weeks after launch' },
      { metric: 'Average position', value: '10.4', label: 'on lift-pump queries in Geneva' },
      { metric: 'Requests', value: '5 forms', label: 'wired to the field CRM, address and access included' },
    ],
    highlights: [
      {
        eyebrow: 'Arriving',
        tag: 'UI',
        title: 'A before-and-after slider as the promise',
        body: 'The first screen does not describe the trade, it shows it: the same plant room flooded on the left, back in service on the right, with the technician in front. The slider follows the mouse without a click and drifts back on its own when released. One title, one sentence, a red button reserved for emergencies, a blue one for everything else.',
        image: { src: '/images/realisations/sos-relevage/hero-desktop.webp', alt: 'SOS Relevage home page: headline, before-and-after slider on a flooded plant room brought back into service, technician in the foreground', path: '/' },
        phone: { src: '/images/realisations/sos-relevage/hero-mobile.webp', alt: 'SOS Relevage on mobile: the same first screen with stacked title and buttons, call bar at the bottom' },
        points: ['A 24/7 on-call strip above the menu, visible before anything else', 'One red per screen: the emergency one', 'The slider reacts to hover, not only to dragging'],
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
        points: ['Four subjects: urgent repair, repair, check-up and maintenance, works', 'The same validation rules client-side and server-side', 'Urgent repair requires a phone number, works require an email'],
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
        { name: 'SOS blue', hex: '#186092', role: 'actions, links' },
        { name: 'Technical blue', hex: '#0d4b7b', role: 'hover, depth' },
        { name: 'Light blue', hex: '#46b0d6', role: 'accents, clean water' },
        { name: 'Water brown', hex: '#5f3716', role: 'wastewater, before' },
        { name: 'Mud brown', hex: '#97713e', role: 'transition' },
        { name: 'Emergency red', hex: '#a8332a', role: 'one per screen, the emergency' },
      ],
      type: [
        { role: 'headings and body copy, variable from 200 to 900', family: 'Hubot Sans', sample: 'Spécialiste des pompes de relevage à Genève.' },
        { role: 'labels, section numbers, footer', family: 'JetBrains Mono', sample: '04 · Identification · 8 signaux', mono: true },
      ],
      principles: [
        { title: 'One red per screen', body: 'Red is reserved for emergencies. Every other action is blue, which makes the emergency button impossible to miss.' },
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
    tags: ['Rebuild', 'Astro', 'Live API', 'Admin dashboard', 'Local SEO'],
    client: { sector: 'Precious metals', location: 'Geneva' },
    meta: {
      title: 'Astro rebuild with real-time DTI pricing',
      excerpt:
        'Astro SSG showcase site with a hybrid XMLCharts plus FXCM API, a secure admin dashboard and precious-metal prices refreshed every 10 seconds.',
    },
    problem: {
      title: 'An ageing, unreliable system',
      body: "Golden Cash's previous system had several limitations. Precious-metal prices were not refreshed in real time, forcing clients to call to confirm a rate before each transaction. The admin interface was not properly secured, and occasional bugs affected the public display. For a business where trust and responsiveness on rates are essential, these flaws held back online conversion.",
    },
    approach: {
      title: 'Astro SSG plus a hybrid API with a secure dashboard',
      body: `A complete rebuild on Astro 5 in SSG for performance and deployment simplicity. On the backend, a PHP API acts as a hybrid proxy between two precious-metal price sources: XMLCharts as the primary source and FXCM as an automatic fallback. A 10-second cache limits paid calls while guaranteeing freshly validated rates. The public estimator calculates buy-back in real time based on weight and carat, and a JWT-secured admin dashboard lets the Golden Cash team switch between API sources, adjust margins, override EUR/CHF rates or manually freeze prices in seconds.`,
      bullets: [
        'Astro 5 SSG, Infomaniak deployment, Lighthouse 100/100',
        'Live estimator: weight and carat to real-time price, 30s refresh',
        'DTI table auto-refresh 10s for direct DTI transactions',
        'PHP API with automatic XMLCharts to FXCM fallback',
        'JWT-secured admin dashboard (8h), 1-click API switch',
        'Manual override of EUR/CHF, USD/CHF, USD/EUR rates',
        'Override mode to freeze prices if both APIs are unavailable',
      ],
    },
    results: [
      { metric: 'Lighthouse', value: '100/100', label: 'Mobile performance' },
      { metric: 'Latency', value: '< 10s', label: 'API switch XMLCharts to FXCM' },
      { metric: 'Timeline', value: '< 6 wks', label: 'Brief to production' },
    ],
    testimonial: {
      quote:
        "I highly recommend DKDP digital agency for the quality of its work. David handled my project with great professionalism and fully understood my brief from the start, with great responsiveness at every step. I particularly appreciated his attentiveness, his availability and the care given to details. An efficient and pleasant collaboration.",
      author: 'Sandrine',
      role: 'Co-manager, Golden Cash Geneva',
    },
  },
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
    problem: e.problem ?? r.problem,
    approach: e.approach ?? r.approach,
    results: e.results ?? r.results,
    testimonial: e.testimonial ?? r.testimonial,
    highlights: e.highlights ?? r.highlights,
    direction: e.direction ?? r.direction,
    seo: e.seo ?? r.seo,
  }
}
