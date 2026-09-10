import type { RoleMeta, RoleSlug } from '../domain/types'

/**
 * Reverse chronological, which is also the render order and the order the
 * `ItemList` on `/experience` declares.
 *
 * HerbaFit is deliberately attached to no role: Google Play names BTi Group as
 * its publisher, and BTi Group appears nowhere on the résumé, so the project is
 * credited on its own page and the timeline is left as the résumé states it.
 */
export const roleMeta: readonly RoleMeta[] = [
  {
    slug: 'phenoscience-cofounder',
    employer: 'PhenoScience',
    start: '2023-07',
    end: null,
    remote: true,
    bucket: 'venture',
    technologies: [
      'TypeScript',
      'React',
      'React Router',
      'TanStack Query',
      'WebSockets',
      'Node.js',
      'PostgreSQL',
      'Terraform',
      'CI/CD',
      'Amazon CloudFront',
      'LLM integration',
      'Spec-Driven Development',
    ],
    projectSlugs: ['phenoscience', 'clinpsia'],
  },
  {
    slug: 'rebus-technology-devops',
    employer: 'Rebus Technology',
    start: '2023-10',
    end: '2025-07',
    remote: true,
    bucket: 'employment',
    technologies: [
      'Azure DevOps',
      'Azure Static Web Apps',
      'Azure SQL Database',
      'Azure Database for PostgreSQL',
      'Azure Cosmos DB',
      'Azure Key Vault',
      'AWS Amplify',
      'AWS Lambda',
      'Amazon RDS',
      'Amazon CloudFront',
      'AWS CodePipeline',
      'AWS CloudFormation',
      'CI/CD',
    ],
    projectSlugs: [],
  },
  {
    slug: 'devinmotion-software-engineer',
    employer: 'DevInMotion S.A.S',
    start: '2023-02',
    end: '2023-11',
    remote: true,
    bucket: 'employment',
    // The résumé names no concrete stack for this role, and none is invented.
    technologies: [],
    projectSlugs: [],
  },
  {
    slug: 'lukiao-fullstack',
    employer: 'Lukiao',
    start: '2021-10',
    end: '2022-11',
    remote: false,
    bucket: 'employment',
    technologies: [
      'Java',
      'Microservices',
      'REST API design',
      'SOAP',
      'React',
      'Paymentez',
      'Wompi',
      'Relational data modelling',
    ],
    projectSlugs: ['lukiao-novapp'],
  },
  {
    slug: 'fory-app-fullstack',
    employer: 'Fory App',
    start: '2020-07',
    end: '2021-11',
    remote: false,
    bucket: 'employment',
    technologies: [],
    projectSlugs: [],
  },
]

export const roleSlugs: readonly RoleSlug[] = roleMeta.map((role) => role.slug)
