import type { SkillGroup } from '../domain/types'

/**
 * Locale-independent facts. Technology names are proper nouns and are written
 * once, in their canonical spelling — "Next.js" not "NextJS", "PostgreSQL" not
 * "Postgres" — because entity matching is string-sensitive and three spellings
 * of one skill are three weak entities instead of one strong one.
 *
 * Display order leads with the two categories carrying the most independently
 * verified entries, then `cloud` because "DevOps Specialist" is in the
 * headline and has to be substantiated early, then `ai`, then the rest.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    key: 'frontend',
    skills: [
      { name: 'React', tier: 'core' },
      { name: 'Next.js', tier: 'core' },
      { name: 'Vite', tier: 'core' },
      { name: 'React Router', tier: 'core' },
      { name: 'Zustand', tier: 'core' },
      { name: 'Zod', tier: 'core' },
      { name: 'TanStack Query', tier: 'strong' },
      { name: 'react-hook-form', tier: 'strong' },
      { name: 'Tailwind CSS', tier: 'strong' },
      { name: 'React Native', tier: 'strong' },
      { name: 'Expo', tier: 'strong' },
      { name: 'Bootstrap', tier: 'working' },
      { name: 'Material UI', tier: 'working' },
      { name: 'Formik', tier: 'working' },
    ],
  },
  {
    key: 'backend',
    skills: [
      { name: 'Node.js', tier: 'core' },
      { name: 'REST API design', tier: 'core' },
      { name: 'FastAPI', tier: 'strong' },
      { name: 'Express', tier: 'strong' },
      { name: 'Microservices', tier: 'strong' },
      { name: 'Authentication and RBAC', tier: 'strong' },
      { name: 'Payment-gateway integration', tier: 'strong' },
      { name: 'SOAP', tier: 'working' },
      { name: 'WebSockets', tier: 'working' },
      { name: 'Amazon SQS', tier: 'working' },
    ],
  },
  {
    key: 'cloud',
    skills: [
      { name: 'Amazon Web Services', tier: 'core' },
      { name: 'CI/CD', tier: 'core' },
      { name: 'Microsoft Azure', tier: 'strong' },
      { name: 'AWS Lambda', tier: 'strong' },
      { name: 'Amazon API Gateway', tier: 'strong' },
      { name: 'AWS CDK', tier: 'strong' },
      { name: 'Terraform', tier: 'strong' },
      { name: 'Docker', tier: 'strong' },
      { name: 'Amazon CloudFront', tier: 'strong' },
      { name: 'Azure DevOps', tier: 'strong' },
      { name: 'Serverless architecture', tier: 'strong' },
      {
        name: 'Mobile release automation',
        tier: 'strong',
        note: 'The deployment workflow shipping a family of white-label React Native apps at BTi Group',
      },
      { name: 'AWS CloudFormation', tier: 'working' },
      { name: 'Linux', tier: 'working' },
    ],
  },
  {
    key: 'ai',
    skills: [
      { name: 'LLM integration', tier: 'strong' },
      { name: 'Spec-Driven Development', tier: 'strong' },
    ],
  },
  {
    key: 'data',
    skills: [
      { name: 'PostgreSQL', tier: 'core' },
      { name: 'Relational data modelling', tier: 'core' },
      { name: 'Drizzle ORM', tier: 'strong' },
      { name: 'SQLAlchemy', tier: 'strong' },
      { name: 'Amazon DynamoDB', tier: 'strong' },
      { name: 'Amazon S3', tier: 'strong' },
      { name: 'Sequelize', tier: 'working' },
      { name: 'MongoDB', tier: 'working' },
      { name: 'Azure SQL Database', tier: 'working' },
      { name: 'Azure Cosmos DB', tier: 'working' },
    ],
  },
  {
    key: 'languages',
    skills: [
      { name: 'TypeScript', tier: 'core' },
      { name: 'JavaScript', tier: 'core' },
      { name: 'Python', tier: 'strong' },
      { name: 'SQL', tier: 'strong' },
      {
        name: 'Java',
        tier: 'strong',
        note: 'Java microservices for the Banco Davivienda recaudo integration at Lukiao, 2021-2022',
      },
    ],
  },
  {
    key: 'practices',
    skills: [
      { name: 'Software architecture design', tier: 'core' },
      { name: 'Hexagonal architecture', tier: 'strong' },
      { name: 'Technical SEO', tier: 'strong' },
      { name: 'Internationalization', tier: 'strong' },
      { name: 'Testing', tier: 'strong' },
      { name: 'Git and code review', tier: 'strong' },
      { name: 'Technical writing', tier: 'strong' },
      { name: 'Accessibility', tier: 'working' },
      { name: 'Agile methodologies', tier: 'working' },
      { name: 'Ecommerce development', tier: 'working' },
    ],
  },
]

/**
 * Bare résumé labels with no corroborating detail anywhere. They are published
 * for completeness in one secondary row and are deliberately absent from the
 * hero, the category groups and `Person.knowsAbout`.
 */
export const alsoListedSkills: readonly string[] = ['Angular', 'PWAs', 'CMS', 'AI Trainer']

export const education = {
  start: '2017-08',
  end: '2022-06',
  institution: 'Universidad Santiago de Cali',
} as const

/** First professional role, used to state experience in absolute terms. */
export const careerStart = '2020-07'
