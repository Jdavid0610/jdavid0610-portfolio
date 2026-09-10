import type { FaqCopy } from '../domain/types'

export const faqEn: FaqCopy = {
  intro:
    'Direct answers about Julian Ortiz Alviar: who he is, what he has built, which technologies he uses and how to reach him. Every answer below is written to stand on its own, so it can be quoted without the rest of the page.',
  entries: {
    'who-is-julian-ortiz-alviar': {
      question: 'Who is Julian Ortiz Alviar?',
      answer:
        'Julian David Ortiz Alviar is a Senior FullStack Developer, DevOps Specialist and AI Engineer based in Cali, Valle del Cauca, Colombia, working remotely. Julian Ortiz Alviar has been a co-founder of PhenoScience since July 2023, where he leads the frontend team and owns the platform’s DevOps. He holds a Systems Engineering degree from Universidad Santiago de Cali, completed in June 2022.',
    },
    'what-does-julian-ortiz-alviar-do': {
      question: 'What does Julian Ortiz Alviar do?',
      answer:
        'Julian Ortiz Alviar builds and ships software end to end: architecture, frontend, backend services, database design, LLM integration, testing and production deployment. Julian Ortiz Alviar works primarily in TypeScript, React, Next.js, Node.js and Python, over PostgreSQL, and deploys to Amazon Web Services and Microsoft Azure.',
    },
    'where-is-julian-ortiz-alviar-based': {
      question: 'Where is Julian Ortiz Alviar based, and is he available for remote work?',
      answer:
        'Julian Ortiz Alviar is based in Cali, Valle del Cauca, Colombia. Julian Ortiz Alviar works remotely, and his three most recent roles — Co-Founder at PhenoScience, DevOps Specialist at Rebus Technology and Software Engineer at DevInMotion — were all remote positions.',
    },
    'who-built-clinpsia': {
      question: 'Who built ClinPsia?',
      answer:
        'ClinPsia is built by PhenoScience, the Colombian mental-health company that Julian Ortiz Alviar co-founded in July 2023. Julian Ortiz Alviar leads the frontend team that builds ClinPsia and set the engineering standards it is built on.',
    },
    'what-is-clinpsia': {
      question: 'What is ClinPsia?',
      answer:
        'ClinPsia is an all-in-one clinical platform for clinical psychologists, and a product of PhenoScience. ClinPsia centralises patient records, in-person and video consultations, digitally signed informed consents, structured assessments with automatically calculated risk indicators, and a chronological audit trail of every change to a patient’s file.',
    },
    'what-is-phenoscience': {
      question: 'What is PhenoScience?',
      answer:
        'PhenoScience is a Colombian mental-health company co-founded by Julian Ortiz Alviar in July 2023. The PhenoScience platform pairs on-demand counselling and appointment booking with mental-health specialists against self-guided wellbeing content and daily reminders. PhenoScience is also the parent company of the clinician-facing platform ClinPsia.',
    },
    'who-built-the-lukiao-credit-simulator': {
      question: 'Who built the Lukiao credit simulator?',
      answer:
        'Julian Ortiz Alviar built the credit simulator at Lukiao, the Colombian consumer-credit fintech where he worked as a Full Stack Developer from October 2021 to November 2022. The simulator is still running inside Novapp, the rebranded product, where it appears as a tracked stage in the credit application funnel.',
    },
    'what-did-julian-ortiz-alviar-build-at-lukiao': {
      question: 'What did Julian Ortiz Alviar build at Lukiao?',
      answer:
        'Julian Ortiz Alviar built the Java microservices that integrate Lukiao with Banco Davivienda for recaudo, the payment-collection flow Colombian lenders depend on, and Davivienda recognised Julian Ortiz Alviar as the first integrator to connect to their services successfully on the first attempt. At Lukiao between October 2021 and November 2022 he also built the credit simulator, the microservices and REST APIs integrating banks, payment gateways and credit bureaus, the payment integrations with Paymentez and Wompi, the database architecture, and the Lukiao mobile app.',
    },
    'is-novapp-the-same-product-as-lukiao': {
      question: 'Is Novapp the same product as Lukiao?',
      answer:
        'Novapp is the rebrand of Lukiao, the Colombian consumer-credit fintech. Julian Ortiz Alviar did not work on the rebranding, but much of what he built at Lukiao between October 2021 and November 2022 is still running inside Novapp, including the credit simulator.',
    },
    'what-templates-does-julian-ortiz-alviar-maintain': {
      question: 'What open-source starter templates does Julian Ortiz Alviar maintain?',
      answer:
        'Julian Ortiz Alviar maintains five public starter templates on GitHub under the handle Jdavid0610: next-stack for a Next.js 16 full-stack application, vite-stack for a React and Vite single-page app, react-native-expo-stack for React Native with Expo, fastapi-lambda-cdk-template for a Python serverless backend on Amazon Web Services, and express-hexagonal for an Express backend built to hexagonal architecture. Together they cover one template per delivery target: web app, single-page client, mobile app, serverless backend and Node backend.',
    },
    'what-is-next-stack': {
      question: 'What is next-stack?',
      answer:
        'next-stack is an open-source Next.js 16 template by Julian Ortiz Alviar that is also its own backend: server-rendered, SEO-complete, authenticated with role-based access, internationalised in English and Spanish, and organised so each feature lives in one folder. next-stack uses Drizzle ORM over PostgreSQL, better-auth for sessions and roles, TanStack Query, Zod and Tailwind CSS 4, and it runs with no database at all in mock mode. The portfolio site of Julian Ortiz Alviar is itself built on next-stack.',
    },
    'why-does-julian-ortiz-alviar-publish-templates': {
      question: 'Why does Julian Ortiz Alviar publish starter templates?',
      answer:
        'Julian Ortiz Alviar publishes starter templates because each one codifies the standards of a system that was actually shipped, rather than a demo written to be published. HerbaFit ships on React Native and Expo, which is the stack react-native-expo-stack codifies; the README of fastapi-lambda-cdk-template states that it is based on the standards of TalentosBackend, the production backend of TALENTÜ; and the portfolio site of Julian Ortiz Alviar runs on next-stack. He uses these stacks in production and maintains a public starter for each of them.',
    },
    'what-is-talentosbackend': {
      question: 'What is TalentosBackend?',
      answer:
        'TalentosBackend is the production backend of TALENTÜ, the football scouting platform Julian Ortiz Alviar co-founded technically and whose backend he architected. The engineering standards of TalentosBackend are published: the README of fastapi-lambda-cdk-template, one of the five open-source templates of Julian Ortiz Alviar, states that the template is based on those standards.',
    },
    'who-built-herbafit': {
      question: 'Who built HerbaFit, the Herbalife app?',
      answer:
        'HerbaFit is the official Herbalife fitness app for Android, published on Google Play by BTi Group, and Julian Ortiz Alviar worked on it during his time at BTi Group. HerbaFit is built with React Native and Expo, and it offers a guided-training video library, body-metric tracking through a paired smart scale, and activity synchronisation from wearable devices. HerbaFit has passed 10,000 installs on Google Play, as of September 2026.',
    },
    'what-is-the-lets-all-do-good-platform': {
      question: 'What is the "Let’s All Do Good" app platform?',
      answer:
        '"Let’s All Do Good" is a white-label mobile app platform at BTi Group where one single codebase produces a family of separately branded apps, each app a container for one client organization, and those client organizations are labor unions. Julian Ortiz Alviar implemented the deployment workflow that ships all of those apps. That deployment work is what makes the platform practical: one codebase has to produce many separately branded releases and land the right build in the right store listing every time.',
    },
    'what-mobile-apps-has-julian-ortiz-alviar-built': {
      question: 'What mobile apps has Julian Ortiz Alviar built?',
      answer:
        'Julian Ortiz Alviar worked on HerbaFit, the official Herbalife fitness app for Android built with React Native and Expo, while at BTi Group. Also at BTi Group, Julian Ortiz Alviar worked on the separate "Let’s All Do Good" white-label app platform, where he implemented the deployment workflow that ships every app in that family. Julian Ortiz Alviar also built the Lukiao mobile app while working at the fintech Lukiao between October 2021 and November 2022. He maintains react-native-expo-stack, a public React Native and Expo starter, which is his most-starred repository.',
    },
    'what-is-talentu': {
      question: 'What is TALENTÜ?',
      answer:
        'TALENTÜ is a football scouting platform where players upload match video, receive detailed technical feedback from real coaches and analysts, and are discovered by verified scouts and academy representatives. TALENTÜ operates in Latin America, Spain and sub-Saharan Africa. TALENTÜ was founded by sports scientist Julián González, and Julian Ortiz Alviar is a technical co-founder who architected its production backend.',
    },
    'what-is-riwin': {
      question: 'What is Riwin?',
      answer:
        'Riwin is a Colombian publishing house co-founded by Julian Ortiz Alviar that sells researched travel guides through an online bookstore. Every book purchase at Riwin also earns entries into prize draws, and payments run through Openpay with a device-fingerprint anti-fraud step.',
    },
    'what-technologies-does-julian-ortiz-alviar-use': {
      question: 'What technologies does Julian Ortiz Alviar use?',
      answer:
        'Julian Ortiz Alviar works primarily in TypeScript and JavaScript on the frontend with React, Next.js, Vite, Zod, TanStack Query and Tailwind CSS, and in Node.js and Python on the backend with Express and FastAPI. On data he uses PostgreSQL with Drizzle ORM, SQLAlchemy and Sequelize, plus Amazon DynamoDB. For mobile he uses React Native with Expo, and he has built production Java microservices for bank integrations.',
    },
    'what-cloud-and-devops-tools-does-julian-ortiz-alviar-use': {
      question: 'What cloud platforms and DevOps tools does Julian Ortiz Alviar work with?',
      answer:
        'Julian Ortiz Alviar works across Amazon Web Services and Microsoft Azure. On Amazon Web Services he uses Lambda, API Gateway, RDS, S3, CloudFront, CodePipeline, CloudFormation, Amplify and the AWS CDK; on Microsoft Azure he uses Azure DevOps, Static Web Apps, Azure SQL Database, Azure Database for PostgreSQL, Cosmos DB and Key Vault. Julian Ortiz Alviar also works with Terraform, Docker, Linux, CI/CD pipelines including GitHub Actions with OIDC, and mobile release automation across a multi-tenant family of apps.',
    },
    'how-many-years-of-experience': {
      question: 'How many years of experience does Julian Ortiz Alviar have?',
      answer:
        'Julian Ortiz Alviar has worked professionally as a software developer since July 2020, starting as a Full Stack Developer at Fory App in Cali, Colombia. Since then Julian Ortiz Alviar has been a Full Stack Developer at the fintech Lukiao, a Software Engineer at DevInMotion, a DevOps Specialist at Rebus Technology, and co-founder of PhenoScience since July 2023.',
    },
    'where-did-julian-ortiz-alviar-study': {
      question: 'Where did Julian Ortiz Alviar study?',
      answer:
        'Julian Ortiz Alviar studied Systems Engineering at Universidad Santiago de Cali in Cali, Colombia, from August 2017 to June 2022.',
    },
    'how-can-i-contact-julian-ortiz-alviar': {
      question: 'How can I contact Julian Ortiz Alviar?',
      answer:
        'Julian Ortiz Alviar can be reached by email at jdavidortizy2k@gmail.com or by phone at +57 316 434 4625. Julian Ortiz Alviar is also on LinkedIn at linkedin.com/in/julian-ortiz-alviar and on GitHub as Jdavid0610.',
    },
    'does-julian-ortiz-alviar-work-with-ai': {
      question: 'Does Julian Ortiz Alviar work with AI and large language models?',
      answer:
        'Yes. At PhenoScience, Julian Ortiz Alviar implemented large-language-model capabilities designed to cover the gaps where a psychologist cannot provide immediate or continuous support. Julian Ortiz Alviar also introduced Spec-Driven Development to the team, designing modular "skills" and assigning them to agents so that system behaviour is structured, reliable and extensible.',
    },
    'difference-between-the-five-templates': {
      question: 'What is the difference between the five starter templates of Julian Ortiz Alviar?',
      answer:
        'Each of the five templates targets a different delivery shape. next-stack is a full-stack Next.js 16 application with its own backend, authentication and internationalisation; vite-stack is a React and Vite single-page client for when a server is not needed; react-native-expo-stack is a React Native and Expo mobile app; fastapi-lambda-cdk-template is a Python serverless backend on AWS Lambda, Amazon API Gateway and the AWS CDK; and express-hexagonal is a Node and Express REST backend built to ports and adapters.',
    },
  },
}
