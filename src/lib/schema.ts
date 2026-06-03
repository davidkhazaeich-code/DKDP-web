const BASE_URL = 'https://dkdp.ch'

export type SchemaLang = 'fr' | 'en'

/** Map our internal lang code to schema.org inLanguage tags. */
const IN_LANGUAGE: Record<SchemaLang, string> = {
  fr: 'fr-CH',
  en: 'en',
}

/** Localized locality name (Genève vs Geneva). */
const LOCALITY: Record<SchemaLang, string> = {
  fr: 'Genève',
  en: 'Geneva',
}

/** Localized region name. */
const REGION: Record<SchemaLang, string> = {
  fr: 'Suisse romande',
  en: 'French-speaking Switzerland',
}

const COUNTRY: Record<SchemaLang, string> = {
  fr: 'Suisse',
  en: 'Switzerland',
}

/** Localized descriptions for the agency. */
const ORG_DESCRIPTION: Record<SchemaLang, string> = {
  fr: 'Agence digitale à Genève spécialisée en création de sites web, SEO, intelligence artificielle et formation entreprise pour PME suisses.',
  en: 'Digital agency in Geneva, Switzerland, specialised in web design, SEO, artificial intelligence and corporate training for Swiss SMBs.',
}

const LOCAL_BUSINESS_DESCRIPTION: Record<SchemaLang, string> = {
  fr: "Agence digitale à Genève (quartier des Eaux-Vives) spécialisée en création de sites web, SEO, intelligence artificielle et formation entreprise pour PME. 700+ clients accompagnés en Suisse romande depuis 2015.",
  en: 'Digital agency based in Geneva (Eaux-Vives district), specialised in web design, SEO, artificial intelligence and corporate training for SMBs. 700+ clients served across French-speaking Switzerland since 2015.',
}

const WEBSITE_DESCRIPTION: Record<SchemaLang, string> = {
  fr: 'Agence digitale à Genève spécialisée en création de sites web, SEO, intelligence artificielle et formation entreprise.',
  en: 'Digital agency in Geneva specialised in web design, SEO, artificial intelligence and corporate training.',
}

const PERSON_JOB_TITLE: Record<SchemaLang, string> = {
  fr: 'Fondateur et Directeur',
  en: 'Founder and Director',
}

const TRAINER_JOB_TITLE: Record<SchemaLang, string> = {
  fr: 'Fondateur et formateur principal',
  en: 'Founder and lead trainer',
}

const ABOUT_PATH: Record<SchemaLang, string> = {
  fr: '/a-propos',
  en: '/en/about',
}

const BLOG_PATH: Record<SchemaLang, string> = {
  fr: '/blog',
  en: '/blog',
}

const CITIES_LOCALIZED: Record<SchemaLang, { '@type': string; name: string }[]> = {
  fr: [
    { '@type': 'City', name: 'Genève' },
    { '@type': 'City', name: 'Lausanne' },
    { '@type': 'City', name: 'Nyon' },
    { '@type': 'City', name: 'Morges' },
    { '@type': 'City', name: 'Fribourg' },
    { '@type': 'City', name: 'Neuchâtel' },
    { '@type': 'City', name: 'Sion' },
    { '@type': 'AdministrativeArea', name: 'Suisse romande' },
  ],
  en: [
    { '@type': 'City', name: 'Geneva' },
    { '@type': 'City', name: 'Lausanne' },
    { '@type': 'City', name: 'Nyon' },
    { '@type': 'City', name: 'Morges' },
    { '@type': 'City', name: 'Fribourg' },
    { '@type': 'City', name: 'Neuchatel' },
    { '@type': 'City', name: 'Sion' },
    { '@type': 'AdministrativeArea', name: 'French-speaking Switzerland' },
  ],
}

export function buildLocalBusiness(lang: SchemaLang = 'fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://dkdp.ch/#local-business',
    name: 'DKDP',
    description: LOCAL_BUSINESS_DESCRIPTION[lang],
    url: BASE_URL,
    telephone: '+41799407969',
    email: 'dk@dkdp.ch',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue du 31 Décembre 36',
      addressLocality: LOCALITY[lang],
      addressRegion: LOCALITY[lang],
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
    areaServed: CITIES_LOCALIZED[lang],
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

export function buildService({
  name,
  url,
  description,
  lang = 'fr',
}: {
  name: string
  url: string
  description?: string
  lang?: SchemaLang
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    ...(description ? { description } : {}),
    url: `${BASE_URL}${url}`,
    inLanguage: IN_LANGUAGE[lang],
    provider: {
      '@type': 'Organization',
      name: 'DKDP',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'Place',
      name: `${LOCALITY[lang]}, ${REGION[lang]}`,
    },
    serviceType: name,
  }
}

/**
 * Service combiné à LocalBusiness (GEO-optimized).
 * Émet un seul graph {Service, LocalBusiness} lié par @id, avec areaServed
 * détaillé (8 villes romandes) et offers chiffrés. Utilisé sur les pages
 * services pilier et les pages ville pour maximiser les citations AI Overviews.
 */
export function buildServiceWithLocalBusiness({
  name,
  url,
  description,
  serviceType,
  priceFrom,
  priceCurrency = 'CHF',
  priceSpecDescription,
  extraAreas = [],
  lang = 'fr',
}: {
  name: string
  url: string
  description: string
  serviceType: string
  priceFrom?: number | string
  priceCurrency?: string
  priceSpecDescription?: string
  extraAreas?: string[]
  lang?: SchemaLang
}) {
  const areasRomandes = [
    ...CITIES_LOCALIZED[lang],
    { '@type': 'City', name: 'Montreux' },
    ...extraAreas.map((a) => ({ '@type': 'City', name: a })),
  ]

  const defaultPriceSpec =
    lang === 'fr'
      ? `À partir de ${priceCurrency} ${priceFrom}`
      : `From ${priceCurrency} ${priceFrom}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${BASE_URL}${url}#service`,
        name,
        description,
        url: `${BASE_URL}${url}`,
        serviceType,
        inLanguage: IN_LANGUAGE[lang],
        provider: { '@id': 'https://dkdp.ch/#local-business' },
        areaServed: areasRomandes,
        ...(priceFrom
          ? {
              offers: {
                '@type': 'Offer',
                priceCurrency,
                price: String(priceFrom),
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  priceCurrency,
                  price: String(priceFrom),
                  description: priceSpecDescription ?? defaultPriceSpec,
                },
                availability: 'https://schema.org/InStock',
                url: `${BASE_URL}${url}`,
              },
            }
          : {}),
      },
      buildLocalBusiness(lang),
    ],
  }
}

export function buildCourse({
  name,
  url,
  description,
  duration,
  teaches,
  prerequisites,
  priceFrom,
  ratingValue,
  ratingCount,
  image,
  lang = 'fr',
}: {
  name: string
  url: string
  description?: string
  duration?: string
  teaches?: string[]
  prerequisites?: string
  priceFrom?: number
  ratingValue?: number | string
  ratingCount?: number
  image?: string
  lang?: SchemaLang
}) {
  const courseLanguage = lang === 'fr' ? 'fr' : 'en'
  const availableLanguage = lang === 'fr' ? 'French' : 'English'
  const priceDescription =
    lang === 'fr'
      ? priceFrom
        ? `À partir de CHF ${priceFrom}/h`
        : 'Sur devis'
      : priceFrom
        ? `From CHF ${priceFrom}/h`
        : 'On request'
  const locationName = lang === 'fr' ? 'Genève, Suisse' : 'Geneva, Switzerland'

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    ...(description ? { description } : {}),
    url: `${BASE_URL}${url}`,
    ...(image ? { image } : {}),
    provider: {
      '@type': 'Organization',
      name: 'DKDP',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/logo/dkdp_blanc-croped.png` },
    },
    courseMode: ['onsite', 'online'],
    inLanguage: courseLanguage,
    availableLanguage,
    ...(duration ? { duration } : {}),
    ...(teaches ? { teaches } : {}),
    ...(prerequisites ? { coursePrerequisites: prerequisites } : {}),
    ...(ratingValue
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: Number(ratingValue),
            reviewCount: ratingCount ?? 500,
            bestRating: 5,
          },
        }
      : {}),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['onsite', 'online'],
      inLanguage: courseLanguage,
      startDate: '2026-01-06',
      location: {
        '@type': 'Place',
        name: locationName,
        address: {
          '@type': 'PostalAddress',
          addressLocality: LOCALITY[lang],
          postalCode: '1207',
          addressCountry: 'CH',
        },
      },
      instructor: {
        '@type': 'Person',
        name: 'David Khazaei',
        jobTitle: TRAINER_JOB_TITLE[lang],
        url: `${BASE_URL}${ABOUT_PATH[lang]}`,
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'CHF',
        ...(priceFrom
          ? {
              price: priceFrom,
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'CHF',
                price: priceFrom,
                description: priceDescription,
              },
            }
          : { category: lang === 'fr' ? 'Sur devis' : 'On request' }),
        url: `${BASE_URL}/contact?service=formation`,
        availability: 'https://schema.org/InStock',
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
      item: url.startsWith('http') ? url : `${BASE_URL}${url}`,
    })),
  }
}

export function buildWebSite(lang: SchemaLang = 'fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://dkdp.ch/#website',
    name: 'DKDP',
    url: BASE_URL,
    description: WEBSITE_DESCRIPTION[lang],
    inLanguage: IN_LANGUAGE[lang],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}${BLOG_PATH[lang]}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function buildPerson(lang: SchemaLang = 'fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'David Khazaei',
    url: `${BASE_URL}${ABOUT_PATH[lang]}`,
    jobTitle: PERSON_JOB_TITLE[lang],
    worksFor: {
      '@type': 'Organization',
      name: 'DKDP',
      url: BASE_URL,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: LOCALITY[lang],
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
  readTime?: string
  lang?: SchemaLang
}) {
  const lang: SchemaLang = data.lang ?? 'fr'
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.headline,
    description: data.description,
    url: `${BASE_URL}${data.url}`,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    inLanguage: IN_LANGUAGE[lang],
    author: {
      '@type': 'Person',
      name: data.authorName ?? 'David Khazaei',
      url: `${BASE_URL}${ABOUT_PATH[lang]}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DKDP',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo/dkdp_blanc-croped.png`,
      },
    },
    isPartOf: {
      '@type': 'Blog',
      name: lang === 'fr' ? 'Blog DKDP' : 'DKDP Blog',
      url: `${BASE_URL}${BLOG_PATH[lang]}`,
    },
    ...(data.image
      ? {
          image: {
            '@type': 'ImageObject',
            url: data.image,
            width: 1200,
            height: 675,
          },
        }
      : {}),
    ...(data.readTime ? { timeRequired: `PT${data.readTime.replace(/\D/g, '')}M` } : {}),
  }
}

export function buildOrganization(lang: SchemaLang = 'fr') {
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
    description: ORG_DESCRIPTION[lang],
    foundingDate: '2015',
    founder: {
      '@type': 'Person',
      name: 'David Khazaei',
      jobTitle: PERSON_JOB_TITLE[lang],
      url: `${BASE_URL}${ABOUT_PATH[lang]}`,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue du 31 Décembre 36',
      addressLocality: LOCALITY[lang],
      postalCode: '1207',
      addressRegion: LOCALITY[lang],
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
      name: lang === 'fr' ? 'Services DKDP' : 'DKDP Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: lang === 'fr' ? 'Création site web' : 'Web design',
            description:
              lang === 'fr'
                ? 'Sites web sur mesure pour PME suisses'
                : 'Custom websites for Swiss SMBs',
          },
          priceCurrency: 'CHF',
          price: '2500',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'CHF',
            price: '2500',
            description: lang === 'fr' ? 'À partir de CHF 2500' : 'From CHF 2,500',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: lang === 'fr' ? 'Formation IA entreprise' : 'Corporate AI training',
            description:
              lang === 'fr'
                ? 'Formations IA appliquées pour équipes'
                : 'Applied AI training for teams',
          },
          priceCurrency: 'CHF',
          price: '1500',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'CHF',
            price: '1500',
            description:
              lang === 'fr' ? 'À partir de CHF 1500 par session' : 'From CHF 1,500 per session',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: lang === 'fr' ? 'SEO et référencement' : 'SEO and search',
            description:
              lang === 'fr'
                ? 'Référencement naturel Google pour PME'
                : 'Google organic search optimisation for SMBs',
          },
          priceCurrency: 'CHF',
          price: '600',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'CHF',
            price: '600',
            description: lang === 'fr' ? 'À partir de CHF 600/mois' : 'From CHF 600/month',
          },
        },
      ],
    },
  }
}

export function buildWebPageWithSpeakable({
  name,
  url,
  description,
  lang = 'fr',
}: {
  name: string
  url: string
  description: string
  lang?: SchemaLang
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    url: `${BASE_URL}${url}`,
    description,
    inLanguage: IN_LANGUAGE[lang],
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

export function buildRealisationPage(input: {
  realisation: {
    slug: string
    client: { name: string }
    meta: { title: string; excerpt: string; dateISO: string }
    category: string
    liveUrl?: string
  }
}): Record<string, unknown> {
  const r = input.realisation
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${r.client.name} : ${r.meta.title}`,
    url: `${BASE_URL}/realisations/${r.slug}`,
    description: r.meta.excerpt,
    datePublished: r.meta.dateISO,
    about: {
      '@type': 'CreativeWork',
      genre: r.category,
    },
    mentions: {
      '@type': 'Organization',
      name: r.client.name,
      ...(r.liveUrl ? { url: r.liveUrl } : {}),
    },
  }
}

export function buildRealisationsCollection(input: { items: { slug: string; client: { name: string }; meta: { title: string } }[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Realisations DKDP',
    url: `${BASE_URL}/realisations`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: input.items.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${BASE_URL}/realisations/${r.slug}`,
        name: `${r.client.name} : ${r.meta.title}`,
      })),
    },
  } as const
}
