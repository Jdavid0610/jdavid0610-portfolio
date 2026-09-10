import type { ProfileCopy } from '../domain/types'

export const profileEn: ProfileCopy = {
  headline: 'Senior FullStack Developer · DevOps Specialist · AI Engineer',
  titles: ['Senior FullStack Developer', 'DevOps Specialist', 'AI Engineer'],
  oneLineBio:
    'Senior FullStack Developer, DevOps Specialist and AI Engineer based in Cali, Colombia.',
  heroBio: [
    'Julian David Ortiz Alviar is a Senior FullStack Developer, DevOps Specialist and AI Engineer based in Cali, Colombia, working remotely.',
    'Julian Ortiz Alviar builds end-to-end products — architecture, frontend, backend, database and deployment — with TypeScript, React, Next.js, Node.js and Python on Amazon Web Services and Microsoft Azure.',
    'Since July 2023 Julian Ortiz Alviar has been co-founder of PhenoScience, where he leads the frontend team and integrates large-language-model capabilities into mental-health products.',
  ],
  longBio: [
    'Julian David Ortiz Alviar is a Senior FullStack Developer, DevOps Specialist and AI Engineer based in Cali, Valle del Cauca, Colombia. Julian Ortiz Alviar designs, builds and deploys scalable web applications and AI-powered software, working across TypeScript, React, Next.js, Node.js, Python and Java, with PostgreSQL and MongoDB behind them.',
    'His work spans the whole path from architecture and frontend development to backend services, database design, LLM integration, testing and production deployment. On the infrastructure side he works in cloud-native environments: CI/CD pipelines, containerization, Linux, Terraform, Amazon Web Services and Microsoft Azure, plus monitoring, security and performance optimization.',
    'Julian Ortiz Alviar has been co-founder of PhenoScience since July 2023. He previously worked as a DevOps Specialist at Rebus Technology, a Software Engineer at DevInMotion and a full-stack developer at the fintech startup Lukiao.',
  ],
  positioning: {
    statement:
      'One person who can take a product from architecture to production — and from a model to a feature.',
    pillars: [
      {
        title: 'Shipped products',
        description:
          'PhenoScience and ClinPsia are live in Colombian mental-health care, the Lukiao credit platform still runs inside Novapp, and HerbaFit has passed 10,000 installs on Google Play.',
      },
      {
        title: 'Infrastructure depth',
        description:
          'Amazon Web Services and Microsoft Azure, Terraform-provisioned environments, CI/CD pipelines that enforce standards, and serverless backends defined in AWS CDK.',
      },
      {
        title: 'Reusable engineering standards',
        description:
          'Five public starter templates, one per delivery target, and each one codifies the standards of a system he actually shipped. HerbaFit runs on the stack of react-native-expo-stack, TALENTÜ\'s production backend supplied the standards of fastapi-lambda-cdk-template, and the site you are reading is built on next-stack.',
      },
    ],
  },
  heroFacts: [
    { value: '2020', label: 'shipping since' },
    { value: '7', label: 'products shipped' },
    { value: '5', label: 'public templates' },
  ],
  stats: [
    { value: '2023', label: 'Co-founder, PhenoScience' },
    { value: '10k+', label: 'Installs, HerbaFit' },
    { value: '1st', label: 'Davivienda first-try integration' },
    { value: '5', label: 'Open-source templates' },
  ],
  location: 'Cali, Valle del Cauca, Colombia',
  workMode: 'Remote, worldwide',
  education: {
    degree: 'Systems Engineering',
    institution: 'Universidad Santiago de Cali',
    summary:
      'Julian Ortiz Alviar studied Systems Engineering at Universidad Santiago de Cali in Cali, Colombia, from August 2017 to June 2022.',
  },
  languages: ['Spanish (native)', 'English'],
  categoryLabels: {
    frontend: 'Frontend',
    backend: 'Backend & APIs',
    cloud: 'Cloud & DevOps',
    ai: 'AI & LLM',
    data: 'Databases & Data',
    languages: 'Languages',
    practices: 'Practices & Architecture',
  },
  tierLabels: {
    core: 'Core',
    strong: 'Strong',
    working: 'Working',
    listed: 'Also listed on my CV',
  },
  tierNote:
    'Core means shipped in production in more than one project and independently verifiable from outside. Strong means named with specifics on the résumé and corroborated by at least one public artefact. Working means used in real work with no external verification available.',
  alsoListedNote:
    'These labels appear on the résumé of Julian Ortiz Alviar but have no public artefact behind them, so they are listed here rather than presented as strengths.',
  contactIntro:
    'Julian Ortiz Alviar works remotely from Cali, Colombia, and reads every message. Email is the fastest route.',
  contactLabels: {
    email: 'Email',
    phone: 'Phone',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    company: 'Company',
    location: 'Location',
  },
}
