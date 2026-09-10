import type { ExperienceCopy } from '../domain/types'

export const experienceEn: ExperienceCopy = {
  overlapNote:
    'These roles overlap on purpose. Julian Ortiz Alviar co-founded PhenoScience in July 2023 while still employed at Rebus Technology and DevInMotion, and worked at Lukiao from October 2021 while finishing at Fory App in November 2021. The bars below are drawn to scale so the concurrency is visible rather than flattened.',
  presentLabel: 'Present',
  remoteLabel: 'Remote',
  bucketLabels: {
    venture: 'Own venture',
    employment: 'Employment',
  },
  roles: {
    'phenoscience-cofounder': {
      title: 'Co-Founder',
      location: 'Remote, from Cali, Colombia',
      summary:
        'PhenoScience is a Colombian mental-health company that Julian Ortiz Alviar co-founded in July 2023 and where he leads the frontend team and owns platform delivery.',
      achievements: [
        'Co-founded PhenoScience and spearheaded the frontend team, establishing the standards that let the product scale instead of being rewritten.',
        'Implemented large-language-model capabilities that cover the gaps where a psychologist cannot give immediate or continuous support, turning waiting time into usable care.',
        'Introduced Spec-Driven Development by designing modular "skills" and assigning them to agents, which made system behaviour more structured, more reliable and easier to extend.',
        'Owns platform stability and DevOps end to end: CI/CD pipelines, Terraform-provisioned infrastructure and repeatable deployments across environments, alongside key administrative responsibilities as a founder.',
      ],
    },
    'rebus-technology-devops': {
      title: 'DevOps Specialist',
      location: 'Remote',
      summary:
        'Rebus Technology is the company where Julian Ortiz Alviar worked as a DevOps Specialist from October 2023 to July 2025, architecting and operating its Azure and AWS infrastructure.',
      achievements: [
        'Designed, implemented and maintained scalable web and mobile applications on Azure DevOps, Azure Static Web Apps and AWS Amplify.',
        'Architected and managed the Azure cloud infrastructure — access management, deployment workflows and engineering standards — so reliability and code quality were enforced by the pipeline rather than by review alone.',
        'Built on a broad Amazon Web Services and Microsoft Azure surface for secure, scalable, cost-aware architectures: AWS Lambda, Amazon RDS, Amazon CloudFront and AWS CodePipeline, with Azure SQL Database, Azure Database for PostgreSQL, Azure Cosmos DB and Azure Key Vault.',
        'Held frontend quality with comprehensive testing, and worked directly with support and cross-functional engineering teams to diagnose production incidents and ship reliable fixes.',
      ],
    },
    'devinmotion-software-engineer': {
      title: 'Software Engineer',
      location: 'Remote',
      summary:
        'DevInMotion S.A.S is the company where Julian Ortiz Alviar worked as a Software Engineer from February 2023 to November 2023, building third-party integrations and the monitoring around them.',
      achievements: [
        'Designed and built new integrations with multinational third-party platforms, applying strict architectural principles so each integration stayed scalable, reliable and maintainable.',
        'Developed monitoring and alerting that proactively caught and handled errors across critical platform workflows, including customer and product processes, measurably improving system observability and operational reliability.',
      ],
    },
    'lukiao-fullstack': {
      title: 'Full Stack Developer',
      location: 'Cali, Valle del Cauca, Colombia',
      summary:
        'Lukiao is the Colombian consumer-credit fintech where Julian Ortiz Alviar worked as a Full Stack Developer from October 2021 to November 2022, building its credit simulator and its bank integrations.',
      achievements: [
        'Built the Java microservices that integrate Lukiao with Banco Davivienda for recaudo (payment collection). Davivienda recognised Julian Ortiz Alviar as the first integrator to connect to their services successfully on the first attempt.',
        'Built and maintained full-stack solutions for the fintech Lukiao, developing microservices and REST APIs that integrate with banks, payment gateways and credit bureaus.',
        'Designed the database architecture and the responsive user-facing interfaces on top of it, with equal attention to usability and visual quality.',
        'Implemented and operated payment integrations with Paymentez and Wompi, ensuring accurate product pricing, reliable transaction processing and successful payment reconciliation.',
        'Built the credit simulator, which is still running today inside Novapp, the rebranded product.',
      ],
    },
    'fory-app-fullstack': {
      title: 'Full Stack Developer',
      location: 'Cali, Valle del Cauca, Colombia',
      summary:
        'Fory App is the company where Julian Ortiz Alviar worked as a Full Stack Developer from July 2020 to November 2021, building the web applications its partner companies used to track their own performance.',
      achievements: [
        'Developed and maintained the web applications that let Fory App partner companies monitor and analyse their own business performance.',
        'Built the responsive interfaces and the backend functionality behind them: performance tracking, data management and integration with external business workflows.',
      ],
    },
  },
}
