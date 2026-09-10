import type { OpenSourceCopy } from '../domain/types'

export const openSourceEn: OpenSourceCopy = {
  indexTitle: 'Open source',
  indexIntro:
    'Julian Ortiz Alviar maintains five public starter templates on GitHub under the handle Jdavid0610. They are not toy starters. Each one codifies the standards of a system that was actually shipped, and Julian Ortiz Alviar runs them himself: next-stack is what this portfolio is built on, react-native-expo-stack is the stack HerbaFit ships on, and fastapi-lambda-cdk-template codifies the conventions of TALENTÜ\'s production backend. Together the five cover one delivery target each: a Next.js full-stack app, a React Native mobile app, a Vite single-page client, a Python serverless backend and a Node backend.',
  dogfoodLine:
    'You are reading a site built on next-stack. If you want to know whether the template works, you are looking at the answer.',
  labels: {
    avatarAlt: 'The profile picture Julian Ortiz Alviar uses on GitHub',
    repository: 'Repository',
    demo: 'Live demo',
    language: 'Language',
    stars: 'Stars',
    created: 'Created',
    lastPush: 'Last push',
    license: 'License',
    noLicense: 'None declared',
    asOf: 'Repository figures as of',
    includes: 'What it includes',
    maintenance: 'Maintenance',
    tags: 'Stack',
    relatedProject: 'Same stack in production',
    poweringThisSite: 'This site runs on it',
  },
  templates: {
    'next-stack': {
      tagline: 'A Next.js 16 template that is also its own backend.',
      definition:
        'next-stack is an open-source Next.js 16 template by Julian Ortiz Alviar that is server-rendered, SEO-complete, authenticated with role-based access, internationalised in English and Spanish, and organised so each feature lives in one folder.',
      metaTitle: 'next-stack — Next.js 16 template',
      metaDescription:
        'next-stack is a Next.js 16 template with SSR, complete SEO, auth with RBAC and i18n, by Julian Ortiz Alviar. This portfolio is built on it.',
      description:
        'next-stack is an open-source Next.js 16 template by Julian Ortiz Alviar that is also its own backend: server-rendered, SEO-complete, authenticated with role-based access, internationalised in English and Spanish, and organised so each feature lives in one folder. This portfolio site is built on next-stack.',
      problem:
        'Most Next.js starters give you routing and a stylesheet, then leave authentication, internationalisation, SEO and data access to be bolted on incompatibly later. next-stack ships all four already agreeing with each other, plus a mock mode that runs the whole application with no database at all.',
      includes: [
        'One architectural rule: dependencies point one way, from routing to features to server, and a route never contains business logic.',
        'Next.js 16 and React 19 on TypeScript, with Drizzle ORM over PostgreSQL 17 and better-auth for sessions and role-based access.',
        'SEO as a first-class module: canonical URLs and a complete hreflang set with x-default generated from one source of truth, plus sitemap, robots, OpenGraph images and JSON-LD.',
        'Typed content as data: documentation pages live as typed objects, with no markdown parser, so a missing translation is a compile error.',
        'Global toasts with no provider, built on module state read through useSyncExternalStore, with titles stored as message keys resolved at render time.',
        'A mock mode that runs the entire application on in-memory data, so a contributor sees the product working before Docker is running.',
        'Vitest with Testing Library for unit tests and Playwright for end-to-end tests, both already wired.',
        'Two-audience documentation: an in-app section for visitors, and a folder structure and cookbook for contributors.',
      ],
      narrative: [
        'next-stack is the Next.js 16 template by Julian Ortiz Alviar, and it is the template this portfolio runs on. Its premise is that the four things every real application needs — server rendering, complete SEO, authentication with roles, and two languages — should already agree with each other on day one, instead of being bolted together later at the cost of a rewrite. One rule holds it together: dependencies point one way, from routing to features to server, and a route never contains business logic.',
        'The stack is current and opinionated: Next.js 16 and React 19 on TypeScript, Drizzle ORM over PostgreSQL 17, better-auth for sessions and role-based access, TanStack Query for server state, Zod for validation, Tailwind CSS 4 for styling, and both Vitest and Playwright wired up. SEO is a first-class module rather than a head-tag afterthought: canonical URLs and a full hreflang set are generated from one source of truth, and a page that only exists in one language declares only that language.',
        'Two details show the taste behind it. The documentation is typed data instead of markdown, so a missing Spanish translation fails the build rather than shipping an English string to a Spanish reader — the same pattern this portfolio\'s content uses. And the entire application runs with no database at all in mock mode, which means a contributor can clone it and see the product working before they have Docker running.',
      ],
      maintenance:
        'Active. next-stack was created on 10 September 2026 and last pushed on 10 September 2026, and it is the foundation of this site.',
      note: 'This portfolio is a pruned deployment of next-stack: it keeps the routing, i18n, SEO, JSON-LD and typed-content layers, and drops the authentication and database layers it does not need, which is exactly the one-folder-per-feature deletion the architecture is designed for.',
    },
    'react-native-expo-stack': {
      tagline: 'A production-ready React Native starter with domain-driven modules.',
      definition:
        'react-native-expo-stack is a production-ready React Native starter by Julian Ortiz Alviar, built with Expo and organised into domain-driven modules with strict separation of concerns.',
      metaTitle: 'react-native-expo-stack — Expo starter',
      metaDescription:
        'A production-ready React Native and Expo SDK 54 starter with domain-driven modules, by Julian Ortiz Alviar. TypeScript, Expo Router, Zustand, Zod.',
      description:
        'react-native-expo-stack is a production-ready React Native starter by Julian Ortiz Alviar, built with Expo SDK 54 and React Native 0.81, following a domain-driven modular architecture with strict separation of concerns. It is the most-starred repository of Julian Ortiz Alviar.',
      problem:
        'A bare Expo project gives you a screen. react-native-expo-stack gives you the decisions: where navigation stops and features start, where authentication state lives, how it persists, and how forms validate.',
      includes: [
        'Expo SDK 54, React Native 0.81 and React 19 on TypeScript 5.9 in strict mode.',
        'Expo Router v6 file-based navigation, where a route file is thin and renders a screen instead of holding logic.',
        'Feature modules under modules/, each owning its own hooks, validation schemas, screens, components and service calls.',
        'Cross-cutting concerns in shared/: an Axios client with interceptors, centralised environment config, and a small UI kit.',
        'TanStack Query v5 for server state and Zustand v5 for client state, mirroring the web templates on purpose.',
        'react-hook-form v7 with Zod v4 for forms, through @hookform/resolvers.',
        'MMKV v4 for synchronous storage, with a Zustand persistence adapter and a persisted auth store.',
        'NativeWind v4 so Tailwind classes work in React Native, and Reanimated v4 for animation off the JavaScript thread.',
        'Signed-out and signed-in route groups already separated, with an auth guard in the root layout.',
      ],
      narrative: [
        'react-native-expo-stack is the most-starred repository of Julian Ortiz Alviar, and the mobile counterpart to his web templates. It answers the question a new Expo project leaves open: not "which libraries?" but "where does each kind of code belong?". Navigation files contain navigation and nothing else — a route is a thin file that renders a screen — while every feature owns a folder holding its own hooks, validation schemas, screens, components and API calls.',
        'The library choices mirror his web stack deliberately, so an engineer moving between his web and mobile projects meets the same ideas: TanStack Query for server state, Zustand for client state, react-hook-form with Zod for forms, and Axios with interceptors for HTTP. Where mobile differs, it picks the fast option — MMKV for synchronous storage with a Zustand persistence adapter, NativeWind so Tailwind classes work in React Native, and Reanimated for animation off the JavaScript thread.',
        'This template also has a production counterpart. HerbaFit, the official Herbalife fitness app for Android that Julian Ortiz Alviar worked on at BTi Group, is built with React Native and Expo — the same stack this starter codifies. The template was not extracted from that app, and no such claim is made: the honest and checkable version is that the stack he ships in production is the stack he maintains a public starter for.',
      ],
      maintenance:
        'Active. react-native-expo-stack was created on 9 February 2026 and last pushed on 27 June 2026.',
    },
    'vite-stack': {
      tagline: 'A React 19 and Vite single-page client for when a server is not needed.',
      definition:
        'vite-stack is a React 19 and Vite single-page application starter by Julian Ortiz Alviar, built for an authenticated client that talks to an API which already exists.',
      metaTitle: 'vite-stack — React 19 and Vite starter',
      metaDescription:
        'vite-stack is a React 19 and Vite single-page starter by Julian Ortiz Alviar, with an operation-addressed API layer, Tailwind CSS 4 and Zod.',
      description:
        'vite-stack is a React 19 and Vite single-page application starter by Julian Ortiz Alviar. It fixes the file layout, the routing and route-guard pattern, the API-call convention and the form pattern up front, for an authenticated client that consumes an existing API.',
      problem:
        'Some jobs do not need a server: an authenticated dashboard-style client talking to an API that already exists. vite-stack is the template for that case, and it settles the file layout, the guard pattern, the API-call convention and the form pattern before the first screen is written.',
      includes: [
        'React 19 on Vite with Tailwind CSS 4, React Router 7, TanStack Query 5 and Zustand 5.',
        'An API layer addressed by resource, HTTP verb and operation — api/auth/post/login/, api/user/get/getUser/ — with request and response types in a sibling interface file.',
        'One central queryKeys file, so every cache key is registered in a single place.',
        'Self-contained pages: a page folder holds its own hook and its own Zod schema.',
        'A pages/template/ folder left in the repository as the thing you copy to start the next screen.',
        'A private-route guard, a layout-and-sidebar shell, and an auth store behind a useAuth facade.',
        'The full Poppins family self-hosted, so the application makes no font request to a third party.',
        'Path aliases, a strict ESLint setup and pnpm, plus a CLAUDE.md so the conventions are written down for AI agents too.',
      ],
      narrative: [
        'vite-stack is the template for the job that does not need a server: an authenticated single-page client talking to an API that already exists. It runs React 19 on Vite with Tailwind CSS 4, React Router 7 for routing, TanStack Query for server state, Zustand for client state, and react-hook-form with Zod for forms — the same choices as the Next.js and React Native templates, so the three feel like one family.',
        'Its distinctive idea is the API layer. Instead of a services bag, every call gets a folder addressed by resource, HTTP verb and operation, with its request and response types in a sibling interface file and its cache key registered in one central queryKeys file. Pages are equally self-contained: a page folder holds its own hook and its own Zod schema, and a template folder is left in the repository as the thing you copy to start the next screen.',
        'The rest is the unglamorous groundwork: a private-route guard, a layout-and-sidebar shell, an auth store behind a useAuth facade, path aliases, a strict ESLint setup, pnpm, and the full Poppins family self-hosted so the application makes no font request to a third party.',
      ],
      maintenance:
        'Active. vite-stack was created on 25 April 2025 and last pushed on 23 July 2026. It is the only one of the five with a fork.',
      note: 'The README of vite-stack is still the stock create-vite text and does not describe any of the conventions above. It is the single highest-leverage improvement across the five repositories.',
    },
    'fastapi-lambda-cdk-template': {
      tagline: 'A Python serverless backend: FastAPI on AWS Lambda, with infrastructure in CDK.',
      definition:
        'fastapi-lambda-cdk-template is a Python serverless backend template by Julian Ortiz Alviar built on FastAPI, AWS Lambda, Amazon API Gateway and the AWS CDK, with PostgreSQL, Amazon DynamoDB, Amazon S3, Amazon CloudFront and Amazon SQS.',
      metaTitle: 'fastapi-lambda-cdk-template — Python',
      metaDescription:
        'A Python serverless backend template by Julian Ortiz Alviar: FastAPI on AWS Lambda with API Gateway, CDK, PostgreSQL, DynamoDB and SQS.',
      description:
        'fastapi-lambda-cdk-template is a Python serverless backend template by Julian Ortiz Alviar. It runs FastAPI on AWS Lambda behind Mangum and Amazon API Gateway, defines its infrastructure in the AWS CDK, and splits data across PostgreSQL for relational work and Amazon DynamoDB for sessions and key-value access.',
      problem:
        'Serverless Python backends are mostly glue: packaging, layers, authorizers, parameter plumbing and local-development parity. This template ships that glue already working, so a new service starts at the business logic.',
      includes: [
        'FastAPI behind Mangum, running on AWS Lambda.',
        'A custom Lambda Authorizer that validates a JWT and confirms the session still exists in Amazon DynamoDB.',
        'AWS CDK in Python with stacks split by concern — api, s3, dynamo, sqs — and reusable constructs for Lambda functions and for shared-code and dependency layers.',
        'Configuration read from AWS Systems Manager Parameter Store rather than a committed file, with the parameter contract documented.',
        'A shared Lambda layer carrying SQLAlchemy models, Pydantic config, security helpers and DynamoDB, S3 and SQS repositories.',
        'A repeatable per-Lambda pattern: app, router, routes, services, repositories, schemas and constants.',
        'Alembic migrations preconfigured against the shared models.',
        'Unified local development: one entry point boots every Lambda together on port 8003 from a single config file, with Swagger docs.',
        'CI/CD through GitHub Actions using OIDC, so the repository stores no AWS secrets at all.',
        'A Bruno API collection for local and production, a VS Code debug configuration, and a documented rename checklist.',
      ],
      narrative: [
        'fastapi-lambda-cdk-template is the Python half of the template set of Julian Ortiz Alviar, and the one that shows the DevOps half of his title most directly. It is a serverless backend starter: FastAPI running on AWS Lambda behind Mangum and Amazon API Gateway, with infrastructure defined in the AWS CDK, and data split across PostgreSQL for relational work and Amazon DynamoDB for sessions and key-value access.',
        'The parts that make it a template rather than a demo are the operational ones. Infrastructure is split into separate CDK stacks for API, S3, DynamoDB and SQS, with reusable constructs for Lambda functions and for both shared-code and dependency layers, and every environment value comes from AWS Systems Manager Parameter Store rather than a committed file. Authorization is a custom Lambda Authorizer that checks a JWT and confirms the session still exists in DynamoDB. Deployment runs through GitHub Actions using OIDC, so the repository holds no AWS secrets at all — the documented first-deploy step is populating Parameter Store, not pasting keys.',
        'Local development is treated as a real requirement: one entry point boots every Lambda together on port 8003 from a single config file, with Swagger docs and a Bruno collection for both local and production, plus a VS Code debug configuration and Alembic migrations wired to the shared models. It also ships a rename checklist, so the first ten minutes of a new service are a copy and six edits.',
        'This template has a production lineage. Its README states that it is based on the standards of TalentosBackend, and TalentosBackend is the production backend of TALENTÜ — the football scouting platform Julian Ortiz Alviar co-founded technically and whose backend he architected. The template is therefore the conventions of a running system published as a starting point, rather than a demo written to be published.',
      ],
      maintenance:
        'New. fastapi-lambda-cdk-template was created on 11 May 2026 and last pushed on 11 May 2026, in a single push.',
      note: 'The README states the template is based on the standards of TalentosBackend, which is the production backend of TALENTÜ — the football scouting platform Julian Ortiz Alviar co-founded technically and whose backend he architected. The verified stack facts above describe this template, read from its own README and manifest; the production backend\'s internal implementation was never fetched, so the documented relationship is that the template codifies that backend\'s conventions.',
    },
    'express-hexagonal': {
      tagline: 'An Express and TypeScript REST backend built to ports and adapters.',
      definition:
        'express-hexagonal is a backend application by Julian Ortiz Alviar built with Express and TypeScript, following the principles of hexagonal architecture.',
      metaTitle: 'express-hexagonal — Express backend',
      metaDescription:
        'express-hexagonal is an Express and TypeScript REST backend by Julian Ortiz Alviar, built to hexagonal ports-and-adapters with Sequelize and Docker.',
      description:
        'express-hexagonal is a backend application by Julian Ortiz Alviar built with Express and TypeScript, following the principles of hexagonal architecture. Its domain layer defines contracts and its infrastructure layer satisfies them, so changing the persistence engine does not touch business logic.',
      problem:
        'express-hexagonal is the Node counterpart to the FastAPI template: a conventional REST service where the domain layer does not know it is talking to Sequelize. It is the most explicit of the five in architectural terms.',
      includes: [
        'Express and TypeScript, structured as ports and adapters.',
        'Domain contracts under context/shared/domain/contracts/: a base repository, a Sequelize-shaped repository, an encapsulation port, and DTO and DTO-factory contracts.',
        'Infrastructure adapters that implement those contracts, kept in a sibling folder.',
        'Domain services responsible for DTO mapping and encapsulation.',
        'A typed PropertyNotFound exception living in the domain rather than a thrown string.',
        'Two worked feature slices, users and properties, showing what a real feature looks like on the skeleton.',
        'Swagger UI wired up so the API documents itself.',
        'A Dockerfile and a docker-compose file, with the README documenting both the container path and the local development loop.',
      ],
      narrative: [
        'express-hexagonal is the oldest of the public templates of Julian Ortiz Alviar — created in July 2024, last pushed in December 2024 — and the most explicit in architectural terms. It is a REST backend in Express and TypeScript built to the ports-and-adapters pattern, where the domain layer defines contracts and the infrastructure layer satisfies them, so changing the persistence engine does not reach into business logic.',
        'The whole idea is visible in the folder names. The domain contracts folder holds the ports — a base repository, a Sequelize-shaped repository, an encapsulation port, and DTO and DTO-factory contracts — while the infrastructure folder holds the adapters that implement them, and the domain services handle DTO mapping and encapsulation. A typed PropertyNotFound exception lives in the domain instead of being thrown as a string. Two example slices, users and properties, show what a real feature looks like on that skeleton, and Swagger UI is wired up so the API documents itself.',
        'It also ships the deployment story: a Dockerfile and a docker-compose file, with the README documenting both the container path and the local development loop. Its honest status is maintained but lagging — it targets Express 4 and pins the Sequelize Postgres driver to a 7.0 alpha, and it has not received a push since December 2024, which makes it the clearest candidate for a refresh among the five.',
      ],
      maintenance:
        'Maintained but lagging. express-hexagonal was created on 12 July 2024 and last pushed on 1 December 2024, which makes it the oldest of the five and the clearest candidate for a dependency refresh.',
    },
  },
}
