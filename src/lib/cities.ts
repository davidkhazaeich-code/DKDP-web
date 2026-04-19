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
  /** IA use cases relevant to the city's economic profile */
  iaUseCases: string[]
  /** Formation context specific to the city */
  formationContext: string
  /** MP4 video for hero background (used if set) */
  videoSrc?: string
  /** Static image for hero background (used if no videoSrc) */
  imageSrc?: string
}

export const CITIES: City[] = [
  {
    slug: 'geneve',
    name: 'Genève',
    canton: 'GE',
    heroLine: 'Votre agence digitale au cœur de Genève',
    description: 'Agence digitale à Genève : création de sites web, SEO, IA et formation pour les PME genevoises. Basée aux Eaux-Vives, à 5 minutes de Rive.',
    localContext: 'Basée au 36 rue du 31 Décembre, aux Eaux-Vives, DKDP accompagne les entreprises genevoises depuis 2015. De la Vieille-Ville à Carouge, du quartier des Nations au Grand-Saconnex, nous connaissons le tissu économique local et ses enjeux.',
    distance: 'Sur place',
    population: '200 000+ habitants',
    economicProfile: 'Organisations internationales, banques, horlogerie, négoce de matieres premieres, startups tech',
    iaUseCases: [
      'Agents IA pour le compliance bancaire et KYC automatisé',
      'Automatisation du reporting pour organisations internationales',
      'Chatbots multilingues pour l\'hotellerie et le luxe',
      'IA generative pour la communication corporate',
    ],
    formationContext: 'Les équipes genevoises, souvent multilingues et dans des secteurs réglementés (finance, ONG, négoce), ont besoin de maîtriser l\'IA dans un cadre structuré. Nos formations sur site à Genève couvrent Claude AI, ChatGPT et l\'automatisation des workflows.',
    videoSrc: '/videos/hero-geneve.mp4',
  },
  {
    slug: 'lausanne',
    name: 'Lausanne',
    canton: 'VD',
    heroLine: 'Agence digitale pour les entreprises lausannoises',
    description: 'DKDP accompagne les entreprises de Lausanne en création de sites web, SEO, intelligence artificielle et formation. Agence basée à Genève, interventions regulieres sur Lausanne.',
    localContext: 'A 45 minutes de Geneve, Lausanne est un bassin économique majeur de Suisse romande. DKDP travaille regulierement avec des entreprises lausannoises, de Flon a Ouchy, en passant par l\'EPFL et le quartier du Tribunal federal.',
    distance: '60 km de Geneve (45 min)',
    population: '140 000+ habitants',
    economicProfile: 'EPFL, startups tech, hospitality, sport international, pharma',
    iaUseCases: [
      'Agents IA pour startups tech et scale-ups de l\'EPFL',
      'Automatisation de la gestion hoteliere et du revenue management',
      'IA appliquee a la recherche pharmaceutique et biotech',
      'Chatbots intelligents pour le sport et l\'evenementiel',
    ],
    formationContext: 'L\'ecosysteme tech lausannois (EPFL, Swiss Tech, startups IA) exige des compétences IA avancees. Nos formations a Lausanne sont adaptees aux équipes techniques comme aux managers qui veulent intégrer l\'IA dans leurs processus.',
    imageSrc: '/images/cities/hero-lausanne.jpg',
  },
  {
    slug: 'nyon',
    name: 'Nyon',
    canton: 'VD',
    heroLine: 'Agence digitale pour les PME de Nyon et La Cote',
    description: 'Création de sites web, SEO et solutions IA pour les entreprises de Nyon et de la region de La Cote. Agence DKDP basée à Genève.',
    localContext: 'Entre Geneve et Lausanne, Nyon et la region de La Cote abritent de nombreuses PME et sieges de multinationales. DKDP accompagne ces entreprises avec un service de proximite, a seulement 25 minutes de nos bureaux.',
    distance: '27 km de Geneve (25 min)',
    population: '22 000+ habitants',
    economicProfile: 'Sieges de multinationales, PME, commerce local, tourisme du lac',
    iaUseCases: [
      'Automatisation des workflows pour sieges de multinationales',
      'Agents IA pour la gestion documentaire et le reporting',
      'IA generative pour le marketing des PME locales',
      'Chatbots service client pour le commerce de La Cote',
    ],
    formationContext: 'Les multinationales et PME de Nyon et La Cote recherchent des formations IA pratiques et applicables immediatement. Nos sessions sur site a Nyon permettent aux équipes de maîtriser Claude AI et les outils d\'automatisation.',
    imageSrc: '/images/cities/hero-nyon.jpg',
  },
  {
    slug: 'fribourg',
    name: 'Fribourg',
    canton: 'FR',
    heroLine: 'Agence digitale au service des entreprises fribourgeoises',
    description: 'DKDP créé des sites web, optimisé le SEO et déploie l\'IA pour les entreprises de Fribourg. Expertise Suisse romande depuis Geneve.',
    localContext: 'Fribourg, ville bilingue au carrefour de la Suisse romande et alemannique, offre un positionnement unique pour les entreprises. DKDP apporte son expertise digitale aux PME fribourgeoises qui veulent se demarquer en ligne.',
    distance: '140 km de Geneve (1h30)',
    population: '42 000+ habitants',
    economicProfile: 'Universite, agroalimentaire, industrie, services, tourisme',
    iaUseCases: [
      'IA pour l\'optimisation de la chaine agroalimentaire',
      'Agents IA bilingues (FR/DE) pour le service client',
      'Automatisation des processus industriels et qualité',
      'IA generative pour le marketing touristique',
    ],
    formationContext: 'Fribourg, ville bilingue, a besoin de formations IA adaptees a un contexte multiculturel. Nos formations couvrent les outils IA en francais et peuvent etre adaptees pour des équipes bilingues FR/DE.',
    imageSrc: '/images/cities/hero-fribourg.jpg',
  },
  {
    slug: 'sion',
    name: 'Sion',
    canton: 'VS',
    heroLine: 'Agence digitale pour les entreprises valaisannes',
    description: 'Agence digitale pour les entreprises de Sion et du Valais. Sites web, SEO, IA et formation par DKDP, agence basée à Genève.',
    localContext: 'Capitale du Valais, Sion est le centre économique d\'un canton en pleine transformation digitale. DKDP accompagne les entreprises valaisannes, du tourisme a l\'energie, en passant par l\'agroalimentaire et les services.',
    distance: '155 km de Geneve (1h45)',
    population: '35 000+ habitants',
    economicProfile: 'Tourisme, energie, viticulture, construction, services publics',
    iaUseCases: [
      'IA pour l\'optimisation energetique et la gestion des barrages',
      'Agents IA pour la reservation touristique et le yield management',
      'Automatisation de la gestion viticole et de la tracabilite',
      'Chatbots pour les services publics cantonaux',
    ],
    formationContext: 'Le Valais est en pleine transformation digitale. Nos formations IA a Sion aident les entreprises valaisannes du tourisme, de l\'energie et de l\'agroalimentaire a adopter l\'IA de maniere pragmatique et rentable.',
    imageSrc: '/images/cities/hero-sion.jpg',
  },
  {
    slug: 'neuchatel',
    name: 'Neuchatel',
    canton: 'NE',
    heroLine: 'Agence digitale pour les entreprises neuchateloises',
    description: 'DKDP créé des sites web, optimisé le SEO et déploie l\'IA pour les entreprises de Neuchatel. Expertise en Suisse romande.',
    localContext: 'Neuchatel, berceau de l\'horlogerie et de la microtechnique, abrite des entreprises innovantes qui ont besoin d\'une presence digitale a la hauteur de leur savoir-faire. DKDP accompagne cette transformation.',
    distance: '155 km de Geneve (1h30)',
    population: '34 000+ habitants',
    economicProfile: 'Horlogerie, microtechnique, CSEM, startups deeptech, universite',
    iaUseCases: [
      'IA pour le controle qualité en horlogerie et microtechnique',
      'Agents IA pour la R&D et l\'analyse de données scientifiques',
      'Automatisation des processus de production deeptech',
      'IA generative pour la documentation technique et brevets',
    ],
    formationContext: 'L\'ecosysteme deeptech neuchatelois (CSEM, horlogerie, microtechnique) requiert des formations IA pointues. Nos sessions a Neuchatel couvrent l\'IA appliquee a l\'industrie, au controle qualité et a l\'innovation.',
    videoSrc: '/videos/hero-neuchatel.mp4',
  },
  {
    slug: 'morges',
    name: 'Morges',
    canton: 'VD',
    heroLine: 'Agence digitale pour les entreprises de Morges',
    description: 'Sites web, SEO et IA pour les PME de Morges et de la region. Agence digitale DKDP basée à Genève.',
    localContext: 'A mi-chemin entre Geneve et Lausanne, Morges et sa region abritent un tissu de PME dynamiques. DKDP offre un accompagnement digital complet, de la création de site a la formation IA.',
    distance: '47 km de Geneve (35 min)',
    population: '16 000+ habitants',
    economicProfile: 'PME, commerce, viticulture, tourisme, industrie legere',
    iaUseCases: [
      'Agents IA pour la gestion des PME et l\'automatisation administrative',
      'IA pour le e-commerce et la fidelisation client',
      'Automatisation du marketing digital pour commerces locaux',
      'Chatbots de recommandation pour le tourisme et la viticulture',
    ],
    formationContext: 'Les PME de Morges et de la region ont besoin de formations IA concretes et directement applicables. Nos sessions pratiques permettent aux petites équipes de tirer parti de Claude AI, ChatGPT et des outils d\'automatisation.',
    imageSrc: '/images/cities/hero-morges.jpg',
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
    iaUseCases: [
      'IA pour l\'hotellerie : revenue management et expérience client',
      'Agents IA pour la gestion evenementielle et la billetterie',
      'Automatisation du marketing touristique et des campagnes saisonnieres',
      'Chatbots multilingues pour l\'accueil et la conciergerie',
    ],
    formationContext: 'Montreux et la Riviera vaudoise vivent du tourisme et de l\'evenementiel. Nos formations IA sur site aident les hotels, restaurants et organisateurs d\'événements a automatiser leurs operations et améliorer l\'expérience client.',
    videoSrc: '/videos/hero-montreux.mp4',
  },
]

export function getCity(slug: string): City | undefined {
  return CITIES.find(c => c.slug === slug)
}
