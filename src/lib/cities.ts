export type City = {
  slug: string
  name: string
  canton: string
  description: string
  heroLine: string
  localContext: string
  distance: string
  population: string
  economicProfile: string
  videoSrc: string
}

export const CITIES: City[] = [
  {
    slug: 'geneve',
    name: 'Genève',
    canton: 'GE',
    heroLine: 'Votre agence digitale au coeur de Genève',
    description: 'Agence digitale a Geneve : creation de sites web, SEO, IA et formation pour les PME genevoises. Basee aux Eaux-Vives, a 5 minutes de Rive.',
    localContext: 'Basee au 36 rue du 31 Decembre, aux Eaux-Vives, DKDP accompagne les entreprises genevoises depuis 2015. De la Vieille-Ville a Carouge, du quartier des Nations au Grand-Saconnex, nous connaissons le tissu economique local et ses enjeux.',
    distance: 'Sur place',
    population: '200 000+ habitants',
    economicProfile: 'Organisations internationales, banques, horlogerie, negoce de matieres premieres, startups tech',
    videoSrc: '/videos/hero-geneve.mp4',
  },
  {
    slug: 'lausanne',
    name: 'Lausanne',
    canton: 'VD',
    heroLine: 'Agence digitale pour les entreprises lausannoises',
    description: 'DKDP accompagne les entreprises de Lausanne en creation de sites web, SEO, intelligence artificielle et formation. Agence basee a Geneve, interventions regulieres sur Lausanne.',
    localContext: 'A 45 minutes de Geneve, Lausanne est un bassin economique majeur de Suisse romande. DKDP travaille regulierement avec des entreprises lausannoises, de Flon a Ouchy, en passant par l\'EPFL et le quartier du Tribunal federal.',
    distance: '60 km de Geneve (45 min)',
    population: '140 000+ habitants',
    economicProfile: 'EPFL, startups tech, hospitality, sport international, pharma',
    videoSrc: '/videos/hero-lausanne.mp4',
  },
  {
    slug: 'nyon',
    name: 'Nyon',
    canton: 'VD',
    heroLine: 'Agence digitale pour les PME de Nyon et La Cote',
    description: 'Creation de sites web, SEO et solutions IA pour les entreprises de Nyon et de la region de La Cote. Agence DKDP basee a Geneve.',
    localContext: 'Entre Geneve et Lausanne, Nyon et la region de La Cote abritent de nombreuses PME et sieges de multinationales. DKDP accompagne ces entreprises avec un service de proximite, a seulement 25 minutes de nos bureaux.',
    distance: '27 km de Geneve (25 min)',
    population: '22 000+ habitants',
    economicProfile: 'Sieges de multinationales, PME, commerce local, tourisme du lac',
    videoSrc: '/videos/hero-nyon.mp4',
  },
  {
    slug: 'fribourg',
    name: 'Fribourg',
    canton: 'FR',
    heroLine: 'Agence digitale au service des entreprises fribourgeoises',
    description: 'DKDP cree des sites web, optimise le SEO et deploie l\'IA pour les entreprises de Fribourg. Expertise Suisse romande depuis Geneve.',
    localContext: 'Fribourg, ville bilingue au carrefour de la Suisse romande et alemannique, offre un positionnement unique pour les entreprises. DKDP apporte son expertise digitale aux PME fribourgeoises qui veulent se demarquer en ligne.',
    distance: '140 km de Geneve (1h30)',
    population: '42 000+ habitants',
    economicProfile: 'Universite, agroalimentaire, industrie, services, tourisme',
    videoSrc: '/videos/hero-fribourg.mp4',
  },
  {
    slug: 'sion',
    name: 'Sion',
    canton: 'VS',
    heroLine: 'Agence digitale pour les entreprises valaisannes',
    description: 'Agence digitale pour les entreprises de Sion et du Valais. Sites web, SEO, IA et formation par DKDP, agence basee a Geneve.',
    localContext: 'Capitale du Valais, Sion est le centre economique d\'un canton en pleine transformation digitale. DKDP accompagne les entreprises valaisannes, du tourisme a l\'energie, en passant par l\'agroalimentaire et les services.',
    distance: '155 km de Geneve (1h45)',
    population: '35 000+ habitants',
    economicProfile: 'Tourisme, energie, viticulture, construction, services publics',
    videoSrc: '/videos/hero-sion.mp4',
  },
  {
    slug: 'neuchatel',
    name: 'Neuchatel',
    canton: 'NE',
    heroLine: 'Agence digitale pour les entreprises neuchateloises',
    description: 'DKDP cree des sites web, optimise le SEO et deploie l\'IA pour les entreprises de Neuchatel. Expertise en Suisse romande.',
    localContext: 'Neuchatel, berceau de l\'horlogerie et de la microtechnique, abrite des entreprises innovantes qui ont besoin d\'une presence digitale a la hauteur de leur savoir-faire. DKDP accompagne cette transformation.',
    distance: '155 km de Geneve (1h30)',
    population: '34 000+ habitants',
    economicProfile: 'Horlogerie, microtechnique, CSEM, startups deeptech, universite',
    videoSrc: '/videos/hero-neuchatel.mp4',
  },
  {
    slug: 'morges',
    name: 'Morges',
    canton: 'VD',
    heroLine: 'Agence digitale pour les entreprises de Morges',
    description: 'Sites web, SEO et IA pour les PME de Morges et de la region. Agence digitale DKDP basee a Geneve.',
    localContext: 'A mi-chemin entre Geneve et Lausanne, Morges et sa region abritent un tissu de PME dynamiques. DKDP offre un accompagnement digital complet, de la creation de site a la formation IA.',
    distance: '47 km de Geneve (35 min)',
    population: '16 000+ habitants',
    economicProfile: 'PME, commerce, viticulture, tourisme, industrie legere',
    videoSrc: '/videos/hero-morges.mp4',
  },
  {
    slug: 'montreux',
    name: 'Montreux',
    canton: 'VD',
    heroLine: 'Agence digitale pour les entreprises de Montreux',
    description: 'Agence digitale pour Montreux et la Riviera vaudoise. Sites web, SEO, IA et formation par DKDP.',
    localContext: 'Montreux, celebre pour son festival de jazz et le tourisme de la Riviera, est aussi une ville d\'affaires. DKDP aide les entreprises locales, de l\'hotellerie aux services, a renforcer leur presence en ligne.',
    distance: '95 km de Geneve (1h)',
    population: '27 000+ habitants',
    economicProfile: 'Tourisme, hotellerie, evenementiel, Nestle (Vevey), services',
    videoSrc: '/videos/hero-montreux.mp4',
  },
]

export function getCity(slug: string): City | undefined {
  return CITIES.find(c => c.slug === slug)
}
