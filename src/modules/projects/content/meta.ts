import type { OrganizationMeta, ProjectMeta, ProjectSlug } from '../domain/types'

const phenoscienceOrg: OrganizationMeta = {
  key: 'phenoscience',
  name: 'PhenoScience',
  url: 'https://phenoscience.com.co',
  foundingDate: '2023-07',
  founder: true,
  employee: true,
  locality: 'Cali',
  region: 'Valle del Cauca',
  country: 'CO',
  subKey: 'clinpsia',
}

const clinpsiaOrg: OrganizationMeta = {
  key: 'clinpsia',
  name: 'ClinPsia',
  url: 'https://clinpsia.com',
  founder: false,
  parentKey: 'phenoscience',
}

/**
 * Index order, which is also the render order and the order the `ItemList`
 * declares. Own ventures first, then employment and freelance work.
 */
export const projectMeta: readonly ProjectMeta[] = [
  {
    slug: 'phenoscience',
    name: 'PhenoScience',
    bucket: 'venture',
    status: 'live',
    schemaType: 'WebApplication',
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'Mental-health care',
    operatingSystem: 'Web browser',
    inLanguage: 'es-CO',
    links: [
      { key: 'live', href: 'https://phenoscience.com.co', display: 'phenoscience.com.co' },
      { key: 'api', href: 'https://api.phenoscience.com.co', display: 'api.phenoscience.com.co' },
    ],
    organization: phenoscienceOrg,
    experienceSlug: 'phenoscience-cofounder',
    stack: [
      'React',
      'React Router',
      'Zustand',
      'Axios',
      'Vite',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Amazon S3',
      'Amazon CloudFront',
      'Terraform',
      'CI/CD',
      'LLM integration',
      'Spec-Driven Development',
    ],
  },
  {
    slug: 'clinpsia',
    name: 'ClinPsia',
    bucket: 'venture',
    status: 'live',
    schemaType: 'WebApplication',
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'Clinical practice management',
    operatingSystem: 'Web browser',
    inLanguage: 'es-CO',
    links: [
      { key: 'live', href: 'https://clinpsia.com', display: 'clinpsia.com' },
      { key: 'api', href: 'https://api.clinpsia.com', display: 'api.clinpsia.com' },
    ],
    organization: clinpsiaOrg,
    relatedOrganization: phenoscienceOrg,
    parentSlug: 'phenoscience',
    experienceSlug: 'phenoscience-cofounder',
    stack: [
      'React',
      'React Router',
      'TypeScript',
      'Zod',
      'react-hook-form',
      'Axios',
      'Vite',
      'REST API design',
    ],
  },
  {
    slug: 'talentu',
    name: 'TALENTÜ',
    bucket: 'venture',
    status: 'live',
    schemaType: 'WebApplication',
    applicationCategory: 'SportsApplication',
    applicationSubCategory: 'Football scouting',
    operatingSystem: 'Web browser, Android, iOS',
    inLanguage: 'es',
    links: [
      // Punycode in the href, the readable form as display text. The
      // literal-`ü` hostname fails some TLS clients, and `talentu.com`
      // without the umlaut is a different, unrelated parked domain.
      { key: 'live', href: 'https://www.xn--talent-8ya.com', display: 'talentü.com' },
    ],
    organization: {
      key: 'talentu',
      name: 'TALENTÜ',
      url: 'https://www.xn--talent-8ya.com',
      founder: false,
      areaServed: ['Latin America', 'Spain', 'Sub-Saharan Africa'],
    },
    relatedTemplateSlug: 'fastapi-lambda-cdk-template',
    stack: [
      'React',
      'React Router',
      'TypeScript',
      'Vite',
      'Amazon S3',
      'Amazon CloudFront',
      'React Native',
    ],
  },
  {
    slug: 'riwin',
    name: 'Riwin',
    bucket: 'venture',
    status: 'live-early',
    schemaType: 'WebApplication',
    applicationCategory: 'ShoppingApplication',
    applicationSubCategory: 'Online bookstore',
    operatingSystem: 'Web browser',
    inLanguage: 'es-CO',
    links: [
      { key: 'live', href: 'https://riwin.com.co', display: 'riwin.com.co' },
      { key: 'api', href: 'https://api-riwin.riwin.com.co', display: 'api-riwin.riwin.com.co' },
    ],
    organization: {
      key: 'riwin',
      name: 'Riwin',
      url: 'https://riwin.com.co',
      founder: true,
      country: 'CO',
    },
    stack: [
      'React',
      'React Router',
      'TypeScript',
      'Vite',
      'Zustand',
      'Axios',
      'Openpay',
      'REST API design',
    ],
  },
  {
    slug: 'lukiao-novapp',
    name: 'Lukiao / Novapp',
    bucket: 'employment',
    status: 'live',
    schemaType: 'WebApplication',
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Consumer credit',
    operatingSystem: 'Web browser, Android',
    inLanguage: 'es-CO',
    links: [{ key: 'live', href: 'https://novapp.com.co', display: 'novapp.com.co' }],
    // Lukiao and Novapp are third parties: no owned `Organization` is emitted.
    experienceSlug: 'lukiao-fullstack',
    stack: [
      'Java',
      'Microservices',
      'REST API design',
      'SOAP',
      'React',
      'Redux',
      'Wompi',
      'Paymentez',
      'Amazon S3',
      'Amazon CloudFront',
      'Relational data modelling',
    ],
  },
  {
    slug: 'mareaverde',
    name: 'Marea Verde Growshop',
    bucket: 'freelance',
    status: 'live',
    schemaType: 'WebApplication',
    applicationCategory: 'ShoppingApplication',
    applicationSubCategory: 'Specialist retail e-commerce',
    operatingSystem: 'Web browser',
    inLanguage: 'es-ES',
    links: [{ key: 'live', href: 'https://mareaverdepalma.com', display: 'mareaverdepalma.com' }],
    // Freelance client work: the client is not named, and no owned
    // `Organization` is emitted for someone else's business.
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Zod',
      'Zustand',
      'Stripe',
      'Amazon API Gateway',
      'AWS Lambda',
      'Serverless architecture',
      'Technical SEO',
      'Internationalization',
    ],
  },
  {
    slug: 'herbafit',
    name: 'HerbaFit',
    bucket: 'employment',
    status: 'store-listed',
    schemaType: 'MobileApplication',
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'Fitness tracking',
    operatingSystem: 'Android',
    inLanguage: 'es',
    links: [
      {
        key: 'store',
        href: 'https://play.google.com/store/apps/details?id=com.herbalife.herbafit',
        display: 'Google Play · com.herbalife.herbafit',
      },
    ],
    // BTi Group publishes HerbaFit and appears nowhere on the résumé, so the
    // project links to no experience entry.
    relatedTemplateSlug: 'react-native-expo-stack',
    stack: [
      'React Native',
      'Expo',
      'Android',
      'TypeScript',
      'Smart-scale device integration',
      'Wearable health-data sync',
      'White-label multi-tenant codebase',
      'Mobile release automation',
      'CI/CD',
    ],
    /**
     * Restated from the Google Play listing's own `SoftwareApplication`
     * JSON-LD, so this is a third-party rating rather than a self-review. It
     * will drift: re-read the store page before trusting the label.
     */
    aggregateRating: {
      ratingValue: '4.25',
      ratingCount: 63,
      bestRating: '5',
      worstRating: '1',
      source: 'Google Play',
      asOf: '2026-09',
    },
  },
]

export const projectSlugs: readonly ProjectSlug[] = projectMeta.map((project) => project.slug)
