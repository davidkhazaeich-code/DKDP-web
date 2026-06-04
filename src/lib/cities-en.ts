import { CITIES, type City } from './cities'

/** A city with its English content and English URL slug. */
export type CityEN = City & { enSlug: string }

/** FR slug -> EN slug (most identical; Geneva differs). */
const EN_SLUG: Record<string, string> = {
  geneve: 'geneva',
  lausanne: 'lausanne',
  nyon: 'nyon',
  fribourg: 'fribourg',
  sion: 'sion',
  neuchatel: 'neuchatel',
  morges: 'morges',
  montreux: 'montreux',
}

/** English content overlay, keyed by FR slug. */
const EN: Record<string, Partial<City>> = {
  geneve: {
    name: 'Geneva',
    description: 'Digital agency in Geneva: web design, SEO, AI and training for Geneva SMEs. Based in Eaux-Vives, 5 minutes from Rive.',
    localContext: 'Based at 36 rue du 31 Décembre, in Eaux-Vives, DKDP has supported Geneva companies since 2015. From the Old Town to Carouge, from the Nations district to Grand-Saconnex, we know the local business landscape and its challenges.',
    distance: 'On site',
    population: '200,000+ residents',
    economicProfile: 'International organisations, banks, watchmaking, commodity trading, tech startups',
    iaUseCases: [
      'AI agents for banking compliance and automated KYC',
      'Reporting automation for international organisations',
      'Multilingual chatbots for hospitality and luxury',
      'Generative AI for corporate communications',
    ],
    formationContext: 'Geneva teams, often multilingual and in regulated sectors (finance, NGOs, trading), need to master AI within a structured framework. Our on-site training in Geneva covers Claude AI, ChatGPT and workflow automation.',
  },
  lausanne: {
    name: 'Lausanne',
    description: 'DKDP supports Lausanne companies with web design, SEO, artificial intelligence and training. Agency based in Geneva, regular work in Lausanne.',
    localContext: '45 minutes from Geneva, Lausanne is a major economic hub of French-speaking Switzerland. DKDP regularly works with Lausanne companies, from Flon to Ouchy, including EPFL and the Federal Court district.',
    distance: '60 km from Geneva (45 min)',
    population: '140,000+ residents',
    economicProfile: 'EPFL, tech startups, hospitality, international sport, pharma',
    iaUseCases: [
      'AI agents for EPFL tech startups and scale-ups',
      'Automation of hotel management and revenue management',
      'AI applied to pharmaceutical and biotech research',
      'Smart chatbots for sport and events',
    ],
    formationContext: 'The Lausanne tech ecosystem (EPFL, Swiss Tech, AI startups) demands advanced AI skills. Our training in Lausanne is tailored to technical teams as well as managers who want to integrate AI into their processes.',
  },
  nyon: {
    name: 'Nyon',
    description: 'Web design, SEO and AI solutions for companies in Nyon and the La Cote region. DKDP agency based in Geneva.',
    localContext: 'Between Geneva and Lausanne, Nyon and the La Cote region host many SMEs and multinational headquarters. DKDP supports these companies with local service, just 25 minutes from our offices.',
    distance: '27 km from Geneva (25 min)',
    population: '22,000+ residents',
    economicProfile: 'Multinational headquarters, SMEs, local retail, lakeside tourism',
    iaUseCases: [
      'Workflow automation for multinational headquarters',
      'AI agents for document management and reporting',
      'Generative AI for local SME marketing',
      'Customer-service chatbots for La Cote retail',
    ],
    formationContext: 'Multinationals and SMEs in Nyon and La Cote look for practical, immediately applicable AI training. Our on-site sessions in Nyon let teams master Claude AI and automation tools.',
  },
  fribourg: {
    name: 'Fribourg',
    description: 'DKDP builds websites, optimises SEO and deploys AI for Fribourg companies. French-speaking Switzerland expertise from Geneva.',
    localContext: 'Fribourg, a bilingual city at the crossroads of French and German-speaking Switzerland, offers a unique position for companies. DKDP brings its digital expertise to Fribourg SMEs that want to stand out online.',
    distance: '140 km from Geneva (1h30)',
    population: '42,000+ residents',
    economicProfile: 'University, agri-food, industry, services, tourism',
    iaUseCases: [
      'AI for optimising the agri-food chain',
      'Bilingual (FR/DE) AI agents for customer service',
      'Automation of industrial and quality processes',
      'Generative AI for tourism marketing',
    ],
    formationContext: 'Fribourg, a bilingual city, needs AI training suited to a multicultural context. Our training covers AI tools in French and can be adapted for bilingual FR/DE teams.',
  },
  sion: {
    name: 'Sion',
    description: 'Digital agency for companies in Sion and Valais. Websites, SEO, AI and training by DKDP, agency based in Geneva.',
    localContext: 'The capital of Valais, Sion is the economic centre of a canton in full digital transformation. DKDP supports Valais companies, from tourism to energy, agri-food and services.',
    distance: '155 km from Geneva (1h45)',
    population: '35,000+ residents',
    economicProfile: 'Tourism, energy, viticulture, construction, public services',
    iaUseCases: [
      'AI for energy optimisation and dam management',
      'AI agents for tourism booking and yield management',
      'Automation of vineyard management and traceability',
      'Chatbots for cantonal public services',
    ],
    formationContext: 'Valais is in full digital transformation. Our AI training in Sion helps Valais companies in tourism, energy and agri-food adopt AI pragmatically and profitably.',
  },
  neuchatel: {
    name: 'Neuchatel',
    description: 'DKDP builds websites, optimises SEO and deploys AI for Neuchatel companies. Expertise across French-speaking Switzerland.',
    localContext: 'Neuchatel, the cradle of watchmaking and microtechnology, hosts innovative companies that need a digital presence worthy of their craftsmanship. DKDP supports that transformation.',
    distance: '155 km from Geneva (1h30)',
    population: '34,000+ residents',
    economicProfile: 'Watchmaking, microtechnology, CSEM, deeptech startups, university',
    iaUseCases: [
      'AI for quality control in watchmaking and microtechnology',
      'AI agents for R&D and scientific data analysis',
      'Automation of deeptech production processes',
      'Generative AI for technical documentation and patents',
    ],
    formationContext: 'The Neuchatel deeptech ecosystem (CSEM, watchmaking, microtechnology) requires advanced AI training. Our sessions in Neuchatel cover AI applied to industry, quality control and innovation.',
  },
  morges: {
    name: 'Morges',
    description: 'Websites, SEO and AI for SMEs in Morges and the region. DKDP digital agency based in Geneva.',
    localContext: 'Halfway between Geneva and Lausanne, Morges and its region host a dynamic network of SMEs. DKDP offers complete digital support, from website creation to AI training.',
    distance: '47 km from Geneva (35 min)',
    population: '16,000+ residents',
    economicProfile: 'SMEs, retail, viticulture, tourism, light industry',
    iaUseCases: [
      'AI agents for SME management and administrative automation',
      'AI for e-commerce and customer loyalty',
      'Digital marketing automation for local retailers',
      'Recommendation chatbots for tourism and viticulture',
    ],
    formationContext: 'SMEs in Morges and the region need concrete, immediately applicable AI training. Our hands-on sessions let small teams take advantage of Claude AI, ChatGPT and automation tools.',
  },
  montreux: {
    name: 'Montreux',
    description: 'Digital agency for Montreux and the Vaud Riviera. Websites, SEO, AI and training by DKDP.',
    localContext: 'Montreux, famous for its jazz festival and Riviera tourism, is also a business city. DKDP helps local companies, from hospitality to services, strengthen their online presence.',
    distance: '95 km from Geneva (1h)',
    population: '27,000+ residents',
    economicProfile: 'Tourism, hospitality, events, Nestle (Vevey), services',
    iaUseCases: [
      'AI for hospitality: revenue management and guest experience',
      'AI agents for event management and ticketing',
      'Automation of tourism marketing and seasonal campaigns',
      'Multilingual chatbots for reception and concierge services',
    ],
    formationContext: 'Montreux and the Vaud Riviera live on tourism and events. Our on-site AI training helps hotels, restaurants and event organisers automate their operations and improve the guest experience.',
  },
}

export const CITIES_EN: CityEN[] = CITIES.map((c) => ({
  ...c,
  ...EN[c.slug],
  enSlug: EN_SLUG[c.slug] ?? c.slug,
}))

export function getCityEN(enSlug: string): CityEN | undefined {
  return CITIES_EN.find((c) => c.enSlug === enSlug)
}
