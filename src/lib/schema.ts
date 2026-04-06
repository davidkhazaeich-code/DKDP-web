const BASE_URL = 'https://dkdp.ch'

export function buildLocalBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://dkdp.ch/#local-business',
    name: 'DKDP',
    description: 'Agence digitale à Genève spécialisée en création de sites web, SEO, intelligence artificielle et formation entreprise pour PME. 700+ clients accompagnés en Suisse romande.',
    url: BASE_URL,
    telephone: '+41799407969',
    email: 'dk@dkdp.ch',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue du 31 Décembre 36',
      addressLocality: 'Genève',
      postalCode: '1207',
      addressCountry: 'CH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 46.20440,
      longitude: 6.14320,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '18',
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '$$',
    currenciesAccepted: 'CHF',
    areaServed: [
      { '@type': 'City', name: 'Genève' },
      { '@type': 'City', name: 'Lausanne' },
      { '@type': 'City', name: 'Nyon' },
      { '@type': 'City', name: 'Morges' },
      { '@type': 'City', name: 'Fribourg' },
      { '@type': 'City', name: 'Neuchâtel' },
      { '@type': 'City', name: 'Sion' },
      { '@type': 'AdministrativeArea', name: 'Suisse romande' },
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/images/logo/dkdp_blanc-croped.png`,
    },
    sameAs: [
      'https://www.linkedin.com/company/dkdp',
      'https://www.instagram.com/davidkhazaei',
      `https://maps.google.com/?cid=13230766909416496931`,
    ],
  }
}

export function buildService({ name, url, description }: { name: string; url: string; description?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    ...(description ? { description } : {}),
    url: `${BASE_URL}${url}`,
    provider: {
      '@type': 'Organization',
      name: 'DKDP',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Genève, Suisse romande',
    },
    serviceType: name,
  }
}

export function buildCourse({ name, url, description }: { name: string; url: string; description?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    ...(description ? { description } : {}),
    url: `${BASE_URL}${url}`,
    provider: {
      '@type': 'Organization',
      name: 'DKDP',
      url: BASE_URL,
    },
    courseMode: 'onsite',
    inLanguage: 'fr',
    availableLanguage: 'French',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      inLanguage: 'fr',
      location: {
        '@type': 'Place',
        name: 'Genève, Suisse',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Genève',
          postalCode: '1207',
          addressCountry: 'CH',
        },
      },
      offers: {
        '@type': 'Offer',
        category: 'Sur devis',
        priceCurrency: 'CHF',
        url: `${BASE_URL}/contact`,
      },
    },
  }
}

export function buildFAQPage(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }
}

export function buildBreadcrumbList(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, url }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: url,
    })),
  }
}

export function buildWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DKDP',
    url: BASE_URL,
    description: 'Agence digitale à Genève spécialisée en création de sites web, SEO, intelligence artificielle et formation entreprise.',
    inLanguage: 'fr-CH',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function buildPerson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'David Khazaei',
    url: `${BASE_URL}/a-propos`,
    jobTitle: 'Fondateur et Directeur',
    worksFor: {
      '@type': 'Organization',
      name: 'DKDP',
      url: BASE_URL,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Genève',
      addressCountry: 'CH',
    },
  }
}

export function buildArticle(data: {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  authorName?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    url: `${BASE_URL}${data.url}`,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      '@type': 'Person',
      name: data.authorName ?? 'David Khazaei',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DKDP',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo/dkdp_blanc-croped.png`,
      },
    },
    ...(data.image ? { image: data.image } : {}),
  }
}

export function buildOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://dkdp.ch/#organization',
    name: 'DKDP',
    legalName: 'DKDP',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/images/logo/dkdp_blanc-croped.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/images/logo/dkdp_blanc-croped.png`,
    description: 'Agence digitale a Geneve specialisee en creation de sites web, SEO, intelligence artificielle et formation entreprise pour PME suisses.',
    foundingDate: '2015',
    founder: {
      '@type': 'Person',
      name: 'David Khazaei',
      jobTitle: 'Fondateur et Directeur',
      url: `${BASE_URL}/a-propos`,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue du 31 Decembre 36',
      addressLocality: 'Geneve',
      postalCode: '1207',
      addressRegion: 'Geneve',
      addressCountry: 'CH',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+41799407969',
        email: 'dk@dkdp.ch',
        availableLanguage: ['French', 'English'],
        areaServed: 'CH',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '18',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.linkedin.com/company/dkdp',
      'https://www.instagram.com/davidkhazaei',
      'https://maps.google.com/?cid=13230766909416496931',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services DKDP',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Creation site web', description: 'Sites web sur mesure pour PME suisses' },
          priceCurrency: 'CHF',
          price: '2500',
          priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'CHF', price: '2500', description: 'A partir de CHF 2500' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Formation IA entreprise', description: 'Formations IA appliquees pour equipes' },
          priceCurrency: 'CHF',
          price: '1500',
          priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'CHF', price: '1500', description: 'A partir de CHF 1500 par session' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'SEO et referencement', description: 'Referencement naturel Google pour PME' },
          priceCurrency: 'CHF',
          price: '500',
          priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'CHF', price: '500', description: 'A partir de CHF 500/mois' },
        },
      ],
    },
  }
}

export function buildWebPageWithSpeakable({ name, url, description }: { name: string; url: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    url: `${BASE_URL}${url}`,
    description,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '[data-speakable]', '.hero-copy'],
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://dkdp.ch/#website',
      name: 'DKDP',
      url: BASE_URL,
    },
  }
}
