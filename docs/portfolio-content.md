# Portfolio content specification — Julian David Ortiz Alviar

**Status:** research/content phase output. This file is the single source of content truth for the
developer agent. Nothing here is code; everything here is meant to be dropped into the `next-stack`
template as **typed data**, following the `src/modules/docs/content/{en,es}.ts` pattern (content as
typed data, one file per locale, a missing translation is a compile error).

**Provenance legend used throughout:**

| Tag | Meaning |
| --- | --- |
| `[RESUME]` | Verified against `JulianOrtizResume.pdf` (authoritative for employment facts) |
| `[FETCHED]` | Verified by fetching the live site / API on 2026-09-10 |
| `[BUNDLE]` | Verified by reading the site's own production JS bundle (its literal UI copy) |
| `[GITHUB]` | Verified via the GitHub REST API / raw README |
| `[USER]` | Stated by the user in the brief, not independently verifiable |
| `[UNVERIFIED]` | Could not be confirmed — do not present as fact on the site |

**Two placeholders the developer must resolve before shipping:**

- `{{SITE_URL}}` — the portfolio's canonical origin, no trailing slash. Set `NEXT_PUBLIC_APP_URL`
  and let `siteConfig.url` derive from it (`src/shared/config/site.ts` already does this). Examples
  in this document use `https://julianortiz.dev` purely as an illustration — see
  [Open questions](#9-open-questions--to-confirm) Q1.
- `{{EMAIL}}` — **RESOLVED: `jdavidortizy2k@gmail.com`** (with the `y`). Confirmed against the resume
  PDF text layer, the `express-hexagonal` README `mailto:`, and the user's own account identity. The
  brief's `jdavidortiz2k@gmail.com` was a typo. Substitute the resolved address everywhere,
  including in section 2's contact row, whose "Conflict" note is superseded — see
  [Open questions](#9-open-questions--to-confirm) Q2.

---

## 1. Identity & positioning

### 1.1 Core identity fields

| Field | Value | Source |
| --- | --- | --- |
| Full legal name | Julian David Ortiz Alviar | `[RESUME]` |
| Display name | Julian Ortiz Alviar | derived |
| Short name / handle | Jdavid0610 | `[GITHUB]` |
| Headline (canonical) | Senior FullStack Developer · DevOps Specialist · AI Engineer | `[RESUME]` |
| GitHub self-description | "Sr frontend dev, Azure DevOps Specialist" | `[GITHUB]` |
| Base city | Cali, Valle del Cauca, Colombia | `[RESUME]` `[USER]` |
| Work mode | Remote (worldwide); most recent roles are explicitly `Remote` | `[RESUME]` |
| Current role | Co-Founder, PhenoScience (2023-07 → present) | `[RESUME]` |
| Degree | Systems Engineering, Universidad Santiago de Cali (2017-08 → 2022-06) | `[RESUME]` |
| Languages spoken | Spanish (native), English (professional — site ships EN + ES) | `[UNVERIFIED]` level |

> Note on the headline: the resume writes "Senior FullStack developer | DevOps Specialist | AI
> Engineer". Use title case consistently on the site — `Senior FullStack Developer` — but do not
> upgrade it to anything else (no "Lead", no "Principal", no "Architect").

### 1.2 One-line bio

**EN (≤ 90 chars, for `<title>` suffixes, OG cards, JSON-LD `description` of `Person`):**

> Senior FullStack Developer, DevOps Specialist and AI Engineer based in Cali, Colombia.

**ES (es-CO):**

> Desarrollador FullStack Senior, especialista en DevOps e ingeniero de IA, basado en Cali, Colombia.

### 1.3 Three-line bio (hero subheading)

**EN:**

> Julian David Ortiz Alviar is a Senior FullStack Developer, DevOps Specialist and AI Engineer based
> in Cali, Colombia, working remotely.
> He builds end-to-end products — architecture, frontend, backend, database and deployment — with
> TypeScript, React, Next.js, Node.js and Python on AWS and Azure.
> Since July 2023 he has been co-founder of PhenoScience, where he leads the frontend team and
> integrates LLM capabilities into mental-health products.

**ES (es-CO):**

> Julian David Ortiz Alviar es desarrollador FullStack Senior, especialista en DevOps e ingeniero de
> IA. Vive en Cali, Colombia, y trabaja de forma remota.
> Construye productos de punta a punta — arquitectura, frontend, backend, base de datos y despliegue
> — con TypeScript, React, Next.js, Node.js y Python sobre AWS y Azure.
> Desde julio de 2023 es cofundador de PhenoScience, donde lidera el equipo de frontend e integra
> capacidades de LLM en productos de salud mental.

### 1.4 Long bio (~120 words)

**EN (123 words):**

> Julian David Ortiz Alviar is a Senior FullStack Developer, DevOps Specialist and AI Engineer based
> in Cali, Valle del Cauca, Colombia. He designs, builds and deploys scalable web applications and
> AI-powered software, working across TypeScript, React, Next.js, Node.js, Python and Java, with
> PostgreSQL and MongoDB behind them. His work spans the whole path from architecture and frontend
> development to backend services, database design, LLM integration, testing and production
> deployment. On the infrastructure side he works in cloud-native environments: CI/CD pipelines,
> containerization, Linux, Terraform, AWS and Azure, plus monitoring, security and performance
> optimization. Julian Ortiz has been co-founder of PhenoScience since July 2023, and previously
> worked as a DevOps Specialist at Rebus Technology, a Software Engineer at DevInMotion and a
> full-stack developer at the fintech startup Lukiao.

**ES (es-CO, 124 words):**

> Julian David Ortiz Alviar es desarrollador FullStack Senior, especialista en DevOps e ingeniero de
> IA. Vive en Cali, Valle del Cauca, Colombia. Diseña, construye y despliega aplicaciones web
> escalables y software con inteligencia artificial, trabajando con TypeScript, React, Next.js,
> Node.js, Python y Java, y con PostgreSQL y MongoDB por detrás. Su trabajo cubre todo el camino:
> arquitectura y desarrollo frontend, servicios de backend, diseño de bases de datos, integración de
> LLM, pruebas y despliegue a producción. En infraestructura se mueve en entornos cloud-native:
> pipelines de CI/CD, contenedores, Linux, Terraform, AWS y Azure, además de monitoreo, seguridad y
> optimización de rendimiento. Julian Ortiz es cofundador de PhenoScience desde julio de 2023 y
> antes fue especialista en DevOps en Rebus Technology, ingeniero de software en DevInMotion y
> desarrollador full-stack en la fintech Lukiao.

### 1.5 Positioning statement (what the site should make obvious in 5 seconds)

**EN:** "One person who can take a product from architecture to production — and from a model to a
feature." Three proof pillars, in this order: (1) **shipped products** — PhenoScience/ClinPsia,
Lukiao/Novapp, HerbaFit on Google Play; (2) **infrastructure depth** — AWS + Azure, Terraform,
CI/CD, serverless CDK; (3) **reusable engineering standards** — five public starter templates,
one of which this very site runs on.

**ES:** "Una sola persona que lleva un producto de la arquitectura a producción — y de un modelo a
una funcionalidad."

---

## 2. Contact & profiles

| Channel | Canonical value | Notes | Source |
| --- | --- | --- | --- |
| Email | `{{EMAIL}}` | **Conflict — see Q2.** Candidates: `jdavidortizy2k@gmail.com` (resume header + `express-hexagonal` README `mailto:`) and `jdavidortiz2k@gmail.com` (user brief). | `[RESUME]` `[GITHUB]` `[USER]` |
| Phone | `+573164344625` | Display as `+57 316 434 4625`. Corroborated: riwin.com.co publishes `(316) 434 4625` as its support line. | `[RESUME]` `[BUNDLE]` |
| LinkedIn | `https://www.linkedin.com/in/julian-ortiz-alviar` | Profile page returns HTTP 999 to automated fetches — link is from the resume and the GitHub profile, content **not** independently read. | `[RESUME]` `[GITHUB]` |
| GitHub | `https://github.com/Jdavid0610` | 20 public repos, 12 followers; bio "Sr frontend dev, Azure DevOps Specialist"; company `PhenoScience-Co`; website `https://www.phenoscience.com.co`. | `[FETCHED]` |
| Company site | `https://phenoscience.com.co` | Listed as his website on GitHub. | `[FETCHED]` |
| Location | Cali, Valle del Cauca, Colombia | Use `addressLocality: "Cali"`, `addressRegion: "Valle del Cauca"`, `addressCountry: "CO"`. | `[RESUME]` |

**`sameAs` array to use verbatim in JSON-LD** (order matters only for readability):

```
https://www.linkedin.com/in/julian-ortiz-alviar
https://github.com/Jdavid0610
https://phenoscience.com.co
https://clinpsia.com
```

**Do not publish on the site:** nothing here is private, but the phone number should be rendered as
a `tel:` link only on `/contact`, not in the global footer, and the email should be emitted as a
real `mailto:` (no obfuscation — AI answer engines must be able to read it).

---

## 3. Experience timeline

Five roles, `[RESUME]`-authoritative. Order on the site: reverse chronological. `end: null` means
current. All dates are `YYYY-MM` as printed on the resume; do not invent days.

> **Overlap notice (intentional, do not "fix"):** PhenoScience (2023-07 →) overlaps Rebus Technology
> (2023-10 → 2025-07) and DevInMotion (2023-02 → 2023-11); Lukiao (2021-10 → 2022-11) overlaps Fory
> App (2020-07 → 2021-11). This is consistent with concurrent contract/founder work but is worth
> confirming — see Q3. Present the timeline as overlapping bars rather than a strict single-track
> list so it renders honestly.

### 3.1 Co-Founder — PhenoScience

| Field | Value |
| --- | --- |
| `slug` | `phenoscience-cofounder` |
| Employer | PhenoScience |
| Title EN / ES | Co-Founder / Cofundador |
| Start / End | `2023-07` / `null` (present) |
| Location | Remote (based in Cali, Colombia) |
| `remote` | `true` |
| Bucket | **Own venture + employment** |
| Related project slugs | `phenoscience`, `clinpsia` |

**Achievement bullets — EN (portfolio voice, impact first):**

1. Co-founded PhenoScience and spearheaded the frontend team, establishing the standards that let
   the product scale instead of being rewritten.
2. Implemented LLM-based capabilities that cover the gaps where a psychologist cannot give immediate
   or continuous support, turning waiting time into usable care.
3. Introduced Spec-Driven Development (SDD) by designing modular "skills" and assigning them to
   agents, making system behavior more structured, reliable and extensible.
4. Owns platform stability and DevOps end to end: CI/CD pipelines, Terraform-provisioned
   infrastructure and repeatable deployments across environments — alongside key administrative
   responsibilities as a founder.

**ES (es-CO):**

1. Cofundó PhenoScience y lidera el equipo de frontend, estableciendo los estándares que permiten
   que el producto escale en vez de reescribirse.
2. Implementó capacidades basadas en LLM para cubrir los vacíos donde un psicólogo no puede dar
   soporte inmediato o continuo, convirtiendo el tiempo de espera en atención aprovechable.
3. Introdujo Spec-Driven Development (SDD) diseñando "skills" modulares y asignándolas a agentes,
   con lo que el comportamiento del sistema quedó más estructurado, confiable y extensible.
4. Se encarga de la estabilidad de la plataforma y del DevOps de punta a punta: pipelines de CI/CD,
   infraestructura provisionada con Terraform y despliegues repetibles entre ambientes — además de
   responsabilidades administrativas clave como fundador.

**Technologies:** TypeScript · React · React Router · TanStack Query · WebSockets · Node.js ·
LLM integration · Spec-Driven Development · Terraform · CI/CD · AWS (CloudFront-fronted delivery,
per DNS/`[FETCHED]`) · PostgreSQL.
*(Frontend stack signals verified from the production bundle `[BUNDLE]`; Terraform/CI-CD from
`[RESUME]`; the specific cloud services beyond CDN edge are `[UNVERIFIED]`.)*

### 3.2 DevOps Specialist — Rebus Technology

| Field | Value |
| --- | --- |
| `slug` | `rebus-technology-devops` |
| Employer | Rebus Technology |
| Title EN / ES | DevOps Specialist / Especialista DevOps |
| Start / End | `2023-10` / `2025-07` |
| Location | Remote |
| `remote` | `true` |
| Bucket | **Employment** |
| Related project slugs | `herbafit` *(association unconfirmed — see Q4)* |

**Achievement bullets — EN:**

1. Designed, implemented and maintained scalable web and mobile applications on Azure DevOps, Azure
   Static Web Apps and AWS Amplify.
2. Architected and managed Azure cloud infrastructure — access management, deployment workflows and
   engineering standards — so continuous improvement, reliability and code quality were enforced by
   the pipeline rather than by review alone.
3. Built on a broad AWS and Azure surface for secure, scalable, cost-aware architectures: AWS
   Lambda, RDS, CloudFront and CodePipeline; Azure SQL Database, Azure PostgreSQL, Cosmos DB and Key
   Vault — covering serverless compute, managed databases, content delivery, CI/CD automation and
   secret storage.
4. Held frontend quality with comprehensive testing and worked directly with support and
   cross-functional engineering teams to troubleshoot production issues and ship reliable fixes.

**ES (es-CO):**

1. Diseñó, implementó y mantuvo aplicaciones web y móviles escalables con Azure DevOps, Azure Static
   Web Apps y AWS Amplify.
2. Diseñó y administró la infraestructura de Azure — gestión de accesos, flujos de despliegue y
   estándares de ingeniería — para que la mejora continua, la confiabilidad y la calidad del código
   las garantizara el pipeline y no solo la revisión manual.
3. Construyó sobre una superficie amplia de AWS y Azure para lograr arquitecturas seguras,
   escalables y eficientes en costos: AWS Lambda, RDS, CloudFront y CodePipeline; Azure SQL
   Database, Azure PostgreSQL, Cosmos DB y Key Vault — cómputo serverless, bases de datos
   administradas, entrega de contenido, automatización de CI/CD y almacenamiento de secretos.
4. Sostuvo la calidad del frontend con pruebas exhaustivas y trabajó directamente con soporte y
   equipos de ingeniería multifuncionales para diagnosticar incidentes en producción y entregar
   correcciones confiables.

**Technologies:** Azure DevOps · Azure Static Web Apps · Azure SQL Database · Azure Database for
PostgreSQL · Azure Cosmos DB · Azure Key Vault · AWS Amplify · AWS Lambda · AWS RDS · AWS CloudFront
· AWS CodePipeline · AWS CloudFormation · CI/CD · testing. *All `[RESUME]`.*

### 3.3 Software Engineer — DevInMotion S.A.S

| Field | Value |
| --- | --- |
| `slug` | `devinmotion-software-engineer` |
| Employer | DevInMotion S.A.S |
| Title EN / ES | Software Engineer / Ingeniero de Software |
| Start / End | `2023-02` / `2023-11` |
| Location | Remote |
| `remote` | `true` |
| Bucket | **Employment** |
| Related project slugs | `herbafit` *(association unconfirmed — see Q4)* |

**Achievement bullets — EN:**

1. Designed and built new integrations with multinational third-party platforms, applying strict
   architectural principles so each integration stayed scalable, reliable and maintainable.
2. Developed monitoring and alerting that proactively caught and handled errors across critical
   platform workflows — customer and product processes included — measurably improving system
   observability and operational reliability.

**ES (es-CO):**

1. Diseñó y desarrolló nuevas integraciones con plataformas de terceros multinacionales, aplicando
   principios arquitectónicos estrictos para que cada integración se mantuviera escalable, confiable
   y mantenible.
2. Desarrolló capacidades de monitoreo y alertamiento que detectan y manejan errores de forma
   proactiva en flujos críticos de la plataforma — procesos de clientes y de producto incluidos —
   mejorando la observabilidad y la confiabilidad operativa.

**Technologies:** third-party platform integrations · monitoring & alerting · observability ·
software architecture. *All `[RESUME]`; concrete vendor names are not in the resume — do not invent
them.*

### 3.4 Full Stack Developer — Lukiao

| Field | Value |
| --- | --- |
| `slug` | `lukiao-fullstack` |
| Employer | Lukiao (fintech startup) |
| Title EN / ES | Full Stack Developer / Desarrollador Full Stack |
| Start / End | `2021-10` / `2022-11` |
| Location | Cali, Valle del Cauca, Colombia |
| `remote` | `false` |
| Bucket | **Employment** |
| Related project slugs | `lukiao-novapp` |

**Achievement bullets — EN:**

1. Built and maintained full-stack solutions for the fintech startup Lukiao, developing microservices
   and RESTful APIs that integrate with banks, payment gateways and credit bureaus.
2. Designed the database architecture and the responsive, user-facing interfaces on top of it, with
   equal attention to usability and visual quality.
3. Implemented and operated payment integrations with Paymentez and Wompi, ensuring accurate product
   pricing, reliable transaction processing and successful payment reconciliation.
4. Delivered SOAP-based integrations — including Davivienda — for secure, reliable communication with
   external financial services.

**ES (es-CO):**

1. Construyó y mantuvo soluciones full-stack para la fintech Lukiao, desarrollando microservicios y
   APIs REST integradas con bancos, pasarelas de pago y centrales de riesgo.
2. Diseñó la arquitectura de base de datos y, sobre ella, las interfaces responsivas de cara al
   usuario, con la misma atención a la usabilidad y a la calidad visual.
3. Implementó y operó integraciones de pago con Paymentez y Wompi, asegurando precios correctos,
   procesamiento confiable de transacciones y conciliación exitosa de pagos.
4. Entregó integraciones basadas en SOAP — incluida Davivienda — para una comunicación segura y
   confiable con servicios financieros externos.

**Technologies:** microservices · REST APIs · SOAP · Paymentez · Wompi · Davivienda · relational
database design · responsive frontend · React (per the surviving Novapp bundle, `[BUNDLE]`).

### 3.5 Full Stack Developer — Fory App

| Field | Value |
| --- | --- |
| `slug` | `fory-app-fullstack` |
| Employer | Fory App |
| Title EN / ES | Full Stack Developer / Desarrollador Full Stack |
| Start / End | `2020-07` / `2021-11` |
| Location | Cali, Valle del Cauca, Colombia |
| `remote` | `false` |
| Bucket | **Employment** |
| Related project slugs | — |

**Achievement bullets — EN:**

1. Developed and maintained the web applications that let Fory's partner companies monitor and
   analyze their own business performance.
2. Built the responsive interfaces and the backend functionality behind them — performance tracking,
   data management and integration with external business workflows.

**ES (es-CO):**

1. Desarrolló y mantuvo las aplicaciones web con las que las empresas aliadas de Fory monitorean y
   analizan su desempeño de negocio.
2. Construyó las interfaces responsivas y la funcionalidad de backend detrás de ellas: seguimiento
   de desempeño, gestión de datos e integración con flujos de negocio externos.

**Technologies:** full-stack web development · responsive frontend · backend services · data
management · external workflow integration. *All `[RESUME]`; no stack names are given in the resume
for this role — do not invent them.*

### 3.6 Education

| Field | Value |
| --- | --- |
| Degree | Systems Engineering (Ingeniería de Sistemas) |
| Institution | Universidad Santiago de Cali |
| Dates | `2017-08` → `2022-06` |
| Country | Colombia |
| Source | `[RESUME]` |

Use as `alumniOf` in the `Person` JSON-LD, with `url: "https://www.usc.edu.co"` *(institution URL is
`[UNVERIFIED]` — omit the `url` property if the developer cannot confirm it; the `name` alone is
valid).*

---

## 4. Projects catalog

Seven projects. This is the centre of the site: `/projects` is an index, each entry gets a detail
page at `/projects/{slug}`.

**How to read the fields.** `bucket` is one of **own venture** (he co-founded it), **client work**
(built for a third party outside a listed employment) or **employment** (built inside one of the
five roles in section 3). `status` is one of **live** (public, fetched successfully),
**login-walled** (public URL exists, content behind auth — not accessed) or **store-listed**
(distributed through an app store).

> **Scoping rule for the developer — apply it literally.** Where a fact came from fetching the
> live product it is tagged `[FETCHED]`/`[BUNDLE]` and describes *the product*, not necessarily
> *his contribution*. Where the contribution is only his own claim it is tagged `[USER]`. Never
> merge the two into a sentence that implies he personally built a `[FETCHED]` feature unless the
> "What he specifically built" row says so. When in doubt, describe the product and let the role
> field carry the attribution.

### 4.0 Index summary

| `slug` | Name | Bucket | Status | Role | URL |
| --- | --- | --- | --- | --- | --- |
| `phenoscience` | PhenoScience | own venture + employment | live | Co-Founder | `https://phenoscience.com.co` |
| `clinpsia` | ClinPsia | own venture (product of PhenoScience) | live | Co-Founder / platform lead | `https://clinpsia.com` |
| `mareaverde` | Marea Verde Growshop | **unattributed — see Q5** | live | unconfirmed | `https://mareaverdepalma.com` |
| `herbafit` | HerbaFit (Herbalife) | employment (BTi Group) | store-listed | developer | Google Play `com.herbalife.herbafit` |
| `lukiao-novapp` | Lukiao → Novapp | employment | live (as Novapp) | Full Stack Developer | `https://novapp.com.co` |
| `talentu` | TALENTÜ | own venture | live | Co-Founder (technical) | `https://www.talentü.com` |
| `riwin` | Riwin | own venture | live | Co-Founder | `https://riwin.com.co` |

### 4.1 PhenoScience — `phenoscience`

| Field | Value |
| --- | --- |
| `slug` | `phenoscience` |
| Name | PhenoScience |
| Tagline EN | Mental-health platform pairing on-demand counselling with self-guided wellbeing content. |
| Tagline ES | Plataforma de salud mental que combina consejería a demanda con contenido de bienestar autoguiado. |
| His role | Co-Founder; leads the frontend team; owns DevOps and platform stability `[RESUME]` |
| Bucket | Own venture + employment (see experience `phenoscience-cofounder`) |
| Status | **live** — `https://phenoscience.com.co` returns HTTP 200 `[FETCHED]` |
| Live URL | `https://phenoscience.com.co` |
| API origin | `https://api.phenoscience.com.co` `[BUNDLE]` |
| Related experience `slug` | `phenoscience-cofounder` |
| Sibling project | `clinpsia` (a product of this company) |

**The problem it solves.** A psychologist cannot be available at 2 a.m., and cannot follow a patient
continuously between sessions. PhenoScience closes that gap: the platform offers counselling
sessions with mental-health specialists, appointment booking with psychologists, and — for the hours
in between — daily wellbeing reminders and serialized content, all behind a subscription.

**What he specifically built** `[RESUME]` `[USER]`: co-founded the company; established the frontend
standards and leads the frontend team; implemented the LLM-based capabilities that cover the gaps
where a psychologist cannot give immediate or continuous support; introduced Spec-Driven Development
by designing modular "skills" assigned to agents; owns CI/CD, Terraform-provisioned infrastructure
and cross-environment deployments.

**Verified product surface** `[BUNDLE]` — literal UI copy from the production bundle:

| Surface | Evidence (verbatim ES) |
| --- | --- |
| Counselling sessions | "Accede a sesiones de consejería con nuestros especialistas en salud mental." |
| Appointment booking | "Programa tus citas con nuestros psicólogos de forma fácil y rápida." |
| On-demand counsellor CTA | "Cuando necesites hablar con alguien, este botón te conecta con nuestros consejeros." |
| Serialized wellbeing content | "Explora contenido en serie sobre bienestar y salud mental." |
| Daily reminders & tips | "Aquí encontrarás recordatorios y consejos para tu bienestar diario." |
| Subscription gating | "Necesitas una suscripción para acceder a este recurso" |
| Audience segmentation onboarding | "Cuéntanos quién eres para mostrarte el contenido más relevante para ti." |
| Guided product tour | "Te daremos un recorrido rápido para que conozcas todo lo que la plataforma tiene para ti." |
| Account & plan management | "Gestiona tu información personal, contraseña y plan activo." |

**Tech stack (tag list).** `React` · `React Router` · `Zustand` · `Axios` · `Vite` ·
`lucide-react` · `TypeScript` · `Node.js` · `PostgreSQL` · `AWS S3` · `AWS CloudFront` ·
`Terraform` · `CI/CD` · `LLM integration` · `Spec-Driven Development`
*(Frontend/build/state/HTTP/icon libraries and the S3 + own-API origins are `[BUNDLE]`; Node.js,
PostgreSQL, Terraform, CI/CD and LLM integration are `[RESUME]`.)*

**Other verified signals** `[BUNDLE]`: a Meta Pixel is installed (`fbq('init', '2080145499429805')`);
legal documents (privacy policy, terms, informed-consent email templates) are served from
`phenoscience.s3.us-west-1.amazonaws.com`; support runs through WhatsApp
(`https://wa.me/message/BMYPCXKQVOQTP1`); the site links a `/sitemap.xml`.

**Narrative — EN (3 paragraphs):**

> PhenoScience is a mental-health company Julian Ortiz Alviar co-founded in July 2023. Its platform
> gives people two things a private practice alone cannot: a counsellor reachable on demand, and
> something useful to do with the time between appointments. Users book sessions with psychologists,
> tap a single button to be connected to a counsellor when they need to talk, and work through
> serialized wellbeing content and daily reminders in between — all under one subscription.
>
> Julian Ortiz's remit at PhenoScience is the whole delivery path. He spearheaded the frontend team
> and set the standards that let the product grow without being rewritten; the shipped application
> is a React and TypeScript single-page app built with Vite, holding client state in Zustand and
> talking to a dedicated API at `api.phenoscience.com.co`. He also implemented the LLM-based
> capabilities that answer users when a human clinician cannot, and introduced Spec-Driven
> Development to the team by expressing system behaviour as modular "skills" assigned to agents.
>
> He owns the infrastructure side as well: CI/CD pipelines, Terraform-provisioned environments and
> repeatable deployments, with legal documents and email templates served from S3 and delivery
> fronted by a CDN. PhenoScience is also the parent company of ClinPsia — the clinician-facing
> product described next — which makes the venture a two-sided bet on the same problem: support the
> patient, and support the psychologist treating them.

**Narrative — ES (es-CO):**

> PhenoScience es la empresa de salud mental que Julian Ortiz Alviar cofundó en julio de 2023. Su
> plataforma le da a las personas dos cosas que un consultorio por sí solo no puede: un consejero
> disponible cuando se necesita, y algo útil que hacer con el tiempo entre citas. Los usuarios
> agendan sesiones con psicólogos, tocan un botón para que los conecten con un consejero cuando
> necesitan hablar, y mientras tanto avanzan en contenido de bienestar en serie y recordatorios
> diarios — todo dentro de una suscripción.
>
> En PhenoScience, Julian Ortiz responde por todo el camino de entrega. Lidera el equipo de frontend
> y definió los estándares que permiten que el producto crezca sin reescribirse; la aplicación en
> producción es una SPA de React y TypeScript construida con Vite, con estado de cliente en Zustand
> y una API propia en `api.phenoscience.com.co`. También implementó las capacidades basadas en LLM
> que responden al usuario cuando un clínico humano no puede, e introdujo Spec-Driven Development
> en el equipo expresando el comportamiento del sistema como "skills" modulares asignadas a agentes.
>
> La infraestructura también es suya: pipelines de CI/CD, ambientes provisionados con Terraform y
> despliegues repetibles, con los documentos legales y las plantillas de correo servidos desde S3 y
> la entrega detrás de un CDN. PhenoScience es además la empresa detrás de ClinPsia — el producto
> para clínicos que se describe enseguida — lo que convierte a la compañía en una apuesta de dos
> lados sobre el mismo problema: acompañar al paciente y acompañar al psicólogo que lo atiende.

### 4.2 ClinPsia — `clinpsia`

| Field | Value |
| --- | --- |
| `slug` | `clinpsia` |
| Name | ClinPsia |
| **Parent** | **A product of PhenoScience** — state this relationship explicitly wherever ClinPsia appears `[USER]` |
| Tagline EN | The all-in-one clinical platform for clinical psychologists: patients, video consultations, records and traceability in one place. |
| Tagline ES | La plataforma clínica todo-en-uno para psicólogos clínicos: pacientes, videoconsultas, historias y trazabilidad en un solo lugar. |
| His role | Co-Founder of the parent company; frontend lead and LLM integration `[RESUME]` `[USER]` |
| Bucket | Own venture (product of `phenoscience`) |
| Status | **live** — HTTP 200 `[FETCHED]` |
| Live URL | `https://clinpsia.com` |
| API origin | `https://api.clinpsia.com` `[BUNDLE]` |
| Related experience `slug` | `phenoscience-cofounder` |
| Parent project `slug` | `phenoscience` |

**Official positioning** `[FETCHED]` — verbatim from the page's own `<title>` and `<meta name="description">`:

> `ClinPsia — Plataforma clínica para psicólogos`
> `Gestiona pacientes, realiza videoconsultas y lleva trazabilidad clínica desde un solo lugar.`

And from the landing bundle `[BUNDLE]`:

> "ClinPsia es la plataforma todo en uno para psicólogos clínicos. Gestiona pacientes, realiza
> videoconsultas, lleva trazabilidad y comparte tu conocimiento — desde un solo lugar."

**The problem it solves** `[BUNDLE]` — in the product's own words:

> "ClinPsia nació de una frustración compartida: los psicólogos dedicaban horas a gestionar papeles,
> agendas y plataformas dispersas, tiempo que debería estar con sus pacientes."

**What he specifically built** `[USER]` `[RESUME]`: ClinPsia is the clinician-facing product of the
company he co-founded, built by the team he leads. His personal, resume-backed contributions are the
frontend standards and team leadership, the LLM-based capabilities, the SDD/agent-skills method, and
the CI/CD + Terraform delivery pipeline. **Do not claim individual authorship of specific ClinPsia
features** — the honest framing is "co-founder of the company that builds ClinPsia; led the frontend
and the LLM work".

**Verified feature set** `[BUNDLE]`:

| Feature | Evidence (verbatim ES) |
| --- | --- |
| Patient management | "Gestión de pacientes" |
| Centralized clinical records | "Historias clínicas centralizadas y seguras" — "Historial clínico completo, documentos, consentimientos y seguimiento en un solo perfil por paciente." |
| In-person + video consultations | "Consultas presenciales y videollamadas" |
| Digitally signed informed consent | "Genera, envía y almacena consentimientos informados firmados digitalmente. Sin papel, sin riesgos." |
| Structured assessment with automatic risk indicators | "Evaluación estructurada del paciente con indicadores de riesgo calculados automáticamente." |
| Clinical traceability / audit log | "Trazabilidad clínica" — "Registro cronológico de cada acción, sesión y cambio en el expediente del paciente." |
| Knowledge sharing | "Cursos y episodios" |
| Clinician dashboard | "Panel de control", "Consultas hoy" |
| Billing & payments | "Facturación y pagos" |
| Free trial | "15 días gratis. Sin compromisos. Sin tarjeta de crédito." |
| Colombian PQRS module with tracked case numbers, incl. anonymous filing | "Peticiones, quejas, reclamos, sugerencias y felicitaciones… conforme a la Ley 1755 de 2015"; "Quiero radicar de forma anónima"; "Número de radicado" |
| Colombian data-protection compliance | "conforme a la Ley 1581 de 2012" |
| Colombian ID types | "Cédula de Ciudadanía", "Cédula de Extranjería", "Tarjeta de Identidad" |
| Trust/metrics section | "Números que hablan por sí solos" — "Psicólogos activos", "Satisfacción", "De nuestros usuarios en encuestas de NPS" |

**Product values, verbatim** `[BUNDLE]` — good pull-quotes for the detail page:

> "Cada decisión de diseño parte de una pregunta: ¿hace esto la vida del psicólogo y del paciente más fácil?"
> "Incorporamos tecnología solo cuando mejora la atención clínica real, no por moda."
> "Los datos clínicos son sensibles. ClinPsia se construye con los más altos estándares de seguridad y cumplimiento normativo."

**Tech stack (tag list).** `React` · `React Router` · `Zod` · `react-hook-form` · `Axios` · `Vite` ·
`lucide-react` · `TypeScript` · `LLM integration` · own REST API (`api.clinpsia.com`).
*(All frontend items `[BUNDLE]`; Zod appears heavily — validation is schema-first. LLM integration is
`[RESUME]`/`[USER]`.)*

> ⚠️ **Honesty flag the developer must respect.** The user describes ClinPsia as "LLM-powered", and
> the resume confirms he "implemented LLM-based capabilities" at PhenoScience. **The public ClinPsia
> landing bundle contains no AI, IA, LLM, assistant, transcription or auto-summary copy whatsoever**
> `[BUNDLE]`. So: the LLM work is real and resume-backed at the *company* level, but ClinPsia does
> not currently market itself as an AI product. Write the AI claim against PhenoScience, tagged
> `[RESUME]`; do **not** put "AI-powered" in ClinPsia's tagline or `SoftwareApplication` description.
> See Q6.

**Narrative — EN:**

> ClinPsia is a product of PhenoScience — the same company Julian Ortiz Alviar co-founded in 2023 —
> aimed at the other side of the consulting room. Where the PhenoScience platform serves the person
> seeking help, ClinPsia serves the clinical psychologist treating them, and it exists because of a
> specific waste: psychologists spend hours on paperwork, calendars and scattered tools, hours that
> belong to their patients.
>
> The platform consolidates a whole practice. One profile per patient holds the complete clinical
> history, documents, consents and follow-up. Consultations happen in person or over video from the
> same schedule. Informed consents are generated, signed digitally and stored, so no paper is
> involved. Patient assessments are structured, with risk indicators calculated automatically rather
> than eyeballed. Every action, session and change to a record is logged chronologically — the
> traceability that makes a clinical record defensible. Around that sit billing, a clinician
> dashboard, a courses-and-episodes library for sharing knowledge, and a Colombian PQRS desk with
> tracked case numbers and an anonymous filing option, built to the deadlines set by Ley 1755 de 2015.
>
> ClinPsia is built by the frontend team Julian Ortiz leads, on the standards he set: a React and
> TypeScript application with schema-first validation in Zod, forms through react-hook-form, and its
> own API at `api.clinpsia.com`. Compliance is a first-class constraint rather than a footnote —
> Colombian document types, Ley 1581 de 2012 data-processing authorisation and privacy-by-design are
> in the shipped interface, not just the policy page.

**Narrative — ES (es-CO):**

> ClinPsia es un producto de PhenoScience — la misma empresa que Julian Ortiz Alviar cofundó en 2023
> — dirigido al otro lado del consultorio. Mientras la plataforma de PhenoScience atiende a la
> persona que busca ayuda, ClinPsia atiende al psicólogo clínico que la trata, y existe por un
> desperdicio muy concreto: los psicólogos dedican horas a papeles, agendas y herramientas dispersas,
> horas que le pertenecen a sus pacientes.
>
> La plataforma consolida la práctica completa. Un solo perfil por paciente reúne la historia clínica
> completa, documentos, consentimientos y seguimiento. Las consultas se atienden presenciales o por
> videollamada desde la misma agenda. Los consentimientos informados se generan, se firman
> digitalmente y se almacenan, sin papel. Las evaluaciones son estructuradas, con indicadores de
> riesgo calculados automáticamente y no a ojo. Cada acción, sesión y cambio en el expediente queda
> registrado cronológicamente — la trazabilidad que hace defendible una historia clínica. Alrededor
> están la facturación, un panel para el clínico, una biblioteca de cursos y episodios para compartir
> conocimiento, y una mesa de PQRS colombiana con número de radicado y opción anónima, construida
> según los plazos de la Ley 1755 de 2015.
>
> ClinPsia la construye el equipo de frontend que lidera Julian Ortiz, sobre los estándares que él
> definió: una aplicación en React y TypeScript con validación schema-first en Zod, formularios con
> react-hook-form y su propia API en `api.clinpsia.com`. El cumplimiento normativo es una restricción
> de primera clase y no una nota al pie — los tipos de documento colombianos, la autorización de
> tratamiento de datos de la Ley 1581 de 2012 y la privacidad por diseño están en la interfaz que se
> entrega, no solo en la página de políticas.

### 4.3 Marea Verde Growshop — `mareaverde`

| Field | Value |
| --- | --- |
| `slug` | `mareaverde` |
| Name | Marea Verde Growshop |
| Tagline EN | SEO-engineered e-commerce for an indoor-growing shop in Palma de Mallorca, on a serverless AWS backend. |
| Tagline ES | E-commerce optimizado para buscadores de un growshop de cultivo indoor en Palma de Mallorca, sobre un backend serverless en AWS. |
| His role | **Unconfirmed — see Q5.** The user supplied the URL but did not state the employer, client or role. |
| Bucket | **Unattributed** — do **not** assign a bucket until Q5 is answered |
| Status | **live** — HTTP 200 `[FETCHED]` |
| Live URL | `https://mareaverdepalma.com` |
| API origin | `https://e4mt9rjmx5.execute-api.us-east-1.amazonaws.com/prod/api` — AWS API Gateway, `us-east-1`, `prod` stage `[BUNDLE]` |
| Locales | `es-ES` primary at `/`, `en` at `/en/`, `x-default` → `/` `[FETCHED]` |
| Related experience `slug` | — (blocked on Q5) |

> 🚩 **Publication gate.** Because the role is unknown, **this entry must not ship as a credited
> project** until the user confirms attribution. Two safe options: (a) hold it out of `/projects`
> entirely, or (b) publish it with the role stated as the real relationship once known. Never
> default to "own venture". Also note the storefront is age-gated — "Debes ser mayor de 18 años para
> acceder a esta tienda" — and sells cultivation equipment, so the user may prefer to omit it from a
> professional portfolio for reasons that have nothing to do with the engineering. Ask before
> publishing.

**What it actually is** `[FETCHED]` `[BUNDLE]`: a retail growshop in Palma de Mallorca (Balearic
Islands, Spain) selling indoor-cultivation equipment online and from a physical store. Verbatim
positioning:

> "Marea Verde Growshop · Cultivo indoor en Palma de Mallorca"
> "Growshop en Palma de Mallorca: iluminación LED, sustratos y abonos, control de clima, genética y
> cosecha. Envío en 24-48 h y asesoramiento real."
> "No buscamos impresionar. Buscamos que tu cultivo salga bien."

**The problem it solves.** A local specialist shop competing against generic marketplaces has one
lever: being the best answer to a specific question. So the site is built as an answer engine —
catalogue with real stock counts, step-by-step cultivation guides, per-product Q&A, a wattage
calculator, and a search-engine surface engineered far past the usual storefront.

**Verified product surface** `[FETCHED]` `[BUNDLE]`:

| Area | Evidence |
| --- | --- |
| Catalogue categories | iluminación (crecimiento y floración), sustratos y abonos, control de clima, riego, genética, cosecha |
| Real-time stock | "`${stockCount}` en stock · Listo para enviar hoy" |
| Shipping promise | "Envíos 24-48h en península"; standard 3–5 days, express 24–48 h, free over 80 € |
| Contact | store in Palma de Mallorca; phone `+34 666 723 880`; WhatsApp deep-link with a prefilled message |
| Tools | "Calculadora de cultivo · Vatios y cobertura" — "Calcula cuántos vatios de LED y qué cobertura necesitas según los metros de tu armario de cultivo" |
| Editorial | "Guías de cultivo paso a paso"; blog "escritos por quien está detrás del mostrador" |
| Product Q&A + reviews | "Lo que nos preguntáis sobre este producto."; star ratings with `aria-label` "Valoración: N de M estrellas" |
| Legal / consent | granular cookie consent (necessary vs. optional, revocable); 18+ age gate citing EU regulation; warranty & returns page with statutory periods |
| Payments | `Stripe` |
| Accessibility | localized `aria-label`s on pagination, add-to-cart and rating widgets |

**SEO engineering — the standout, and directly relevant to this portfolio's own goals** `[FETCHED]`:

- A **sitemap index** splitting into seven child sitemaps: `sitemap-static.xml`,
  `sitemap-products.xml`, `sitemap-categories.xml`, `sitemap-blog.xml`, `sitemap-guides.xml`,
  `sitemap-landings.xml`, `sitemap-comparisons.xml` — each with its own `lastmod` (all within
  Aug–Sep 2026, i.e. actively maintained).
- `robots.txt` allowing `/` while disallowing `/panel`, `/checkout`, `/cuenta`, `/carrito`, `/api/`,
  plus an explicit `Googlebot` block and a `Sitemap:` line.
- Full default head: `canonical`, `hreflang` for `es-ES`/`en`/`x-default`, `robots` with
  `max-image-preview:large`, complete OpenGraph and Twitter cards, `theme-color`.
- Per-route meta injected client-side with `react-helmet-async`, with the static head deliberately
  describing the whole store as a fallback for non-JS crawlers — and an in-file comment saying so.
- Performance work: two Montserrat `woff2` weights preloaded, and a pre-paint inline script that
  applies the persisted theme (`localStorage` key `mv-theme`) to avoid a flash of unstyled content.

**Spec-driven development fingerprints** `[FETCHED]` — the shipped `index.html` carries source
comments referencing `typography/spec.md (RF-05)`, `dark-mode/spec.md`, `seo-tecnico (RF-07)` and a
`DECISIONS.md` entry dated **2026-05-10**, with requirements numbered `RF-xx` in Spanish. That is
the same Spec-Driven Development practice the resume credits him with introducing at PhenoScience
`[RESUME]` — a suggestive but **not conclusive** signal of authorship. It is evidence for Q5, not an
answer to it.

**Tech stack (tag list).** `React` · `TypeScript` · `Vite` · `Zod` · `Zustand` ·
`react-helmet-async` · `Stripe` · `AWS API Gateway` · `AWS Lambda` (inferred from the
`execute-api`/`prod` origin) · `i18n (es-ES / en)` · segmented XML sitemaps · granular cookie
consent. *All `[BUNDLE]`/`[FETCHED]` except the Lambda inference, which is `[UNVERIFIED]`.*

**Narrative — EN:**

> Marea Verde Growshop is an indoor-cultivation retailer in Palma de Mallorca whose online store is
> engineered as an answer engine rather than a catalogue. The shop's advantage over a generic
> marketplace is knowledge, so the site puts knowledge in front: step-by-step cultivation guides,
> articles written "by whoever is behind the counter", per-product question threads, customer
> ratings, and a calculator that turns a grow-tent's dimensions into the LED wattage and coverage it
> actually needs.
>
> Technically it is a React and TypeScript single-page app on Vite, validating with Zod and taking
> payments through Stripe, backed by a serverless API on AWS API Gateway in `us-east-1`. It ships in
> Spanish and English with a correct `hreflang` set, a canonical URL, an 18+ age gate required by EU
> rules for this product category, and a revocable, granular cookie consent that separates strictly
> necessary storage from analytics.
>
> The search surface is unusually thorough for a shop this size: a sitemap index fanning out into
> seven child sitemaps — static pages, products, categories, blog, guides, landings and product
> comparisons — each carrying its own `lastmod`, all of them refreshed within the last month. The
> repository's own conventions show through in the shipped HTML, where comments cite numbered
> requirements (`RF-05`, `RF-07`) and a dated decision log: the same spec-driven method Julian Ortiz
> introduced elsewhere. **His exact role on this project is unconfirmed — see open question Q5.**

**Narrative — ES (es-CO):**

> Marea Verde Growshop es una tienda de cultivo indoor en Palma de Mallorca cuya tienda en línea
> está construida como un motor de respuestas y no como un catálogo. La ventaja del negocio frente a
> un marketplace genérico es el conocimiento, así que el sitio pone el conocimiento adelante: guías
> de cultivo paso a paso, artículos escritos "por quien está detrás del mostrador", preguntas y
> respuestas por producto, valoraciones de clientes y una calculadora que convierte las medidas del
> armario de cultivo en los vatios de LED y la cobertura que realmente hacen falta.
>
> Por dentro es una SPA de React y TypeScript sobre Vite, con validación en Zod y pagos con Stripe,
> respaldada por una API serverless en AWS API Gateway en `us-east-1`. Se entrega en español e
> inglés con un juego correcto de `hreflang`, URL canónica, una puerta de edad 18+ exigida por la
> normativa europea para esta categoría, y un consentimiento de cookies granular y revocable que
> separa el almacenamiento estrictamente necesario de la analítica.
>
> La superficie de búsqueda es inusualmente completa para una tienda de este tamaño: un índice de
> sitemaps que se abre en siete hijos — páginas estáticas, productos, categorías, blog, guías,
> landings y comparativas — cada uno con su propio `lastmod` y todos actualizados en el último mes.
> Las convenciones del repositorio se asoman en el HTML publicado, donde los comentarios citan
> requisitos numerados (`RF-05`, `RF-07`) y un registro de decisiones fechado: el mismo método
> spec-driven que Julian Ortiz introdujo en otros equipos. **Su rol exacto en este proyecto está sin
> confirmar — ver la pregunta abierta Q5.**

### 4.4 HerbaFit (Herbalife) + the "Let's All Do Good" platform — `herbafit`

| Field | Value |
| --- | --- |
| `slug` | `herbafit` |
| Name | HerbaFit |
| Tagline EN | The official Herbalife fitness app for Android: guided training, smart-scale body tracking and wearable sync. |
| Tagline ES | La app oficial de fitness de Herbalife para Android: entrenamiento guiado, seguimiento corporal con báscula inteligente y sincronización con wearables. |
| His role | Developer on HerbaFit, and on every app built on the "Let's All Do Good" pattern, while at **BTI** `[USER]` |
| Bucket | Employment |
| Status | **store-listed** — live on Google Play |
| Store URL | `https://play.google.com/store/apps/details?id=com.herbalife.herbafit&hl=es_419` |
| Package | `com.herbalife.herbafit` |
| Related experience `slug` | see Q4 — the resume never names BTI |

**Verified Google Play facts** `[FETCHED]` — read from the store page's own `SoftwareApplication`
JSON-LD, so these are the store's numbers, not estimates:

| Field | Value |
| --- | --- |
| App name | HerbaFit |
| **Developer / `author`** | **BTi Group** (`"author":{"@type":"Person","name":"BTi Group"}`) |
| Developer contact | `https://www.herbalife.com/es-co/footer/contacto` |
| `applicationCategory` | `HEALTH_AND_FITNESS` |
| `operatingSystem` | `ANDROID` |
| `aggregateRating` | **`ratingValue` 4.25 · `ratingCount` 63** |
| Installs | **10,000+** |
| Price | 0 COP (free), `availability: InStock` |
| Content rating | "Apto para todo público" |
| App versions observed in reviews | `1.2.0`, `1.3.1`, `1.3.2` |
| Most recent review date observed | 21 de marzo de 2026 |
| Short store blurb | "Transforma tu bienestar con HerbaFit: entrenos, seguimiento físico y más." |

> ✅ **Q4 is substantially resolved by this fetch.** Google Play lists the publisher of
> `com.herbalife.herbafit` as **BTi Group**, which corroborates the user's statement that he built
> HerbaFit while at BTI. What remains open is only the bookkeeping: **the resume contains no BTI
> role**, so HerbaFit cannot be attached to any of the five documented employments. Section 3
> tentatively linked it to `rebus-technology-devops` and `devinmotion-software-engineer` — **remove
> those tentative links** and either (a) add a BTI role to the resume/timeline, or (b) present
> HerbaFit as an uncredited-employer project. See the updated Q4.

**Full app description** `[FETCHED]`, verbatim ES — the store's own copy:

> "HerbaFit, la aplicación oficial de Herbalife diseñada para ayudarte a alcanzar tus metas de salud
> y bienestar de manera fácil y efectiva. Lleva el control de tu progreso físico, accede a recursos
> exclusivos y conecta con tus dispositivos inteligentes para consolidar todos tus datos en un solo
> lugar."
>
> **Funciones principales:**
> - "**Entrenamiento guiado:** Explora una amplia biblioteca de videos y contenido multimedia para
>   crear y mantener tus rutinas de ejercicio."
> - "**Seguimiento físico avanzado:** Registra y visualiza métricas clave como peso, talla y otros
>   indicadores gracias a la integración con una báscula inteligente."
> - "**Conexión con dispositivos wearables:** Sincroniza aplicaciones de dispositivos inteligentes
>   para consolidar tu actividad y progreso de forma eficiente."

**Declared Android permissions** `[FETCHED]`: photos/media/files, storage (read and modify USB
storage contents), camera. Consistent with progress photos and media-heavy training content.

**The problem it solves.** Herbalife distributors and customers track body metrics across a scale, a
wearable and a paper log that never agree. HerbaFit consolidates all three into one account:
guided-training video library, body metrics captured directly from a paired smart scale, and
wearable sync so activity data lands in the same place as the weigh-ins.

**What he specifically built** `[USER]`: he worked on HerbaFit and on **all** the apps built on the
**"Let's All Do Good"** pattern — a family of partner apps sharing a single codebase/pattern — while
at BTI. Individual feature-level attribution inside HerbaFit is **not** established; write this as
"worked on the HerbaFit Android app and on the shared-codebase partner-app platform at BTi Group".

**On "Let's All Do Good"** `[USER]` `[UNVERIFIED]`: the user describes it as a family of partner apps
sharing one codebase/pattern, which matches the white-label model of the publicly documented
*LetsAllDoGood* platform — a "universal do-good smartphone app" that lets organisations reach
supporters with rich actionable content and push notifications, including optional location-based
messaging. **A vendor relationship between BTi Group and LetsAllDoGood could not be confirmed from
any public source**, and no BTi Group developer page is reachable on Google Play (a
`store/apps/dev?id=BTi+Group` lookup returns HTTP 404 `[FETCHED]`). Present the platform work as
his own account of it, in general terms, and do not name partner apps that cannot be verified. See Q7.

**Tech stack (tag list).** `Android` · mobile app development · smart-scale (BLE) device integration
· wearable / health-data sync · guided-video content delivery · shared white-label codebase.
*Framework-level detail (native Kotlin/Java vs. React Native vs. Flutter) is `[UNVERIFIED]` — the
store page does not expose it and the user did not say. **Do not guess a framework.** See Q8.*

**Narrative — EN:**

> HerbaFit is the official Herbalife fitness app for Android, published on Google Play by BTi Group,
> where it holds a 4.25 rating from 63 ratings and has passed 10,000 installs. It gives Herbalife
> customers one place for the three things that normally live apart: a guided-training library of
> video and multimedia routines, body metrics such as weight and measurements captured straight from
> a paired smart scale, and activity synced in from wearable devices.
>
> Julian Ortiz Alviar worked on HerbaFit while at BTI, alongside every app built on the "Let's All Do
> Good" pattern — a family of partner applications sharing a single codebase, where one engineering
> change has to land correctly across many branded products at once. That constraint is the
> interesting part of the work: partner apps that share a codebase reward strict architectural
> boundaries and punish per-client special cases, which is the same discipline his later roles are
> built on.
>
> Two caveats stated plainly. The framework HerbaFit is built on is not disclosed on the store page
> and is not claimed here. And BTI does not appear anywhere in his resume, so this project sits
> outside the documented five-role timeline until that gap is reconciled — see open questions Q4 and Q8.

**Narrative — ES (es-CO):**

> HerbaFit es la app oficial de fitness de Herbalife para Android, publicada en Google Play por BTi
> Group, donde tiene una calificación de 4.25 sobre 63 valoraciones y superó las 10.000
> instalaciones. Le da a los clientes de Herbalife un solo lugar para las tres cosas que normalmente
> viven separadas: una biblioteca de entrenamiento guiado con videos y contenido multimedia, métricas
> corporales como peso y talla capturadas directamente desde una báscula inteligente emparejada, y la
> actividad sincronizada desde dispositivos wearables.
>
> Julian Ortiz Alviar trabajó en HerbaFit durante su paso por BTI, junto con todas las apps
> construidas sobre el patrón "Let's All Do Good" — una familia de aplicaciones de socios que
> comparten un mismo código base, donde un cambio de ingeniería tiene que aterrizar bien en muchos
> productos con marca distinta a la vez. Esa restricción es la parte interesante del trabajo: las
> apps que comparten código premian los límites arquitectónicos estrictos y castigan los casos
> especiales por cliente, que es la misma disciplina sobre la que se construyen sus roles posteriores.
>
> Dos advertencias dichas de frente. El framework con el que está hecho HerbaFit no aparece en la
> ficha de la tienda y aquí no se afirma. Y BTI no figura en ninguna parte de su hoja de vida, así
> que este proyecto queda por fuera de la línea de tiempo documentada de cinco roles hasta que se
> resuelva ese vacío — ver las preguntas abiertas Q4 y Q8.

### 4.5 Lukiao → Novapp — `lukiao-novapp`

| Field | Value |
| --- | --- |
| `slug` | `lukiao-novapp` |
| Name | Lukiao → Novapp |
| Tagline EN | Colombian consumer-credit fintech: cédula-only credit applications, an instrumented credit simulator, and disbursement and instalment management. |
| Tagline ES | Fintech colombiana de crédito de consumo: solicitud de crédito solo con la cédula, un simulador de crédito instrumentado, y gestión de desembolsos y cuotas. |
| His role | Full Stack Developer at Lukiao, `2021-10` → `2022-11` `[RESUME]`; also worked on the Lukiao **mobile app** `[USER]` |
| Bucket | Employment |
| Status | **live, rebranded** — the product now ships as **Novapp**; `https://novapp.com.co` returns HTTP 200 `[FETCHED]`. The Lukiao admin console at `https://admin.lukiao.com.co/auth/login` is **login-walled** and was **not** accessed. |
| Live URL | `https://novapp.com.co` |
| API origin | `https://server.finovaapp.com` `[BUNDLE]` |
| Related experience `slug` | `lukiao-fullstack` |

> ⚠️ **State this nuance exactly — it is the whole point of the entry** `[USER]`:
> **He did not work on the rebranding.** Novapp is a later rebrand of Lukiao, done without him.
> **Novapp still uses much of what he built at Lukiao — notably the credit simulator.** He also
> worked on the Lukiao mobile app. Phrase it as continuity of his work, never as participation in
> the rebrand. Suggested sentence, EN: *"Novapp is the rebrand of Lukiao. Julian Ortiz Alviar did
> not work on the rebranding, but much of what he built at Lukiao is still running inside Novapp —
> the credit simulator among it."*

**Hard evidence that Novapp is running Lukiao-era code** `[BUNDLE]` — this is the strongest single
verification in the whole document, because the rebranded bundle still points at the old brand's
storage:

| Evidence | Value |
| --- | --- |
| Lukiao S3 bucket referenced from the Novapp bundle | `https://lukiaostorage.s3.amazonaws.com` |
| Lukiao onboarding videos still served | `https://lukiaostorage.s3.us-east-1.amazonaws.com/guide_videos/Chrome…`, `…/guide_videos/Safari…` |
| CDN distribution | `https://d32ifhfkfh157f.cloudfront.net/` |
| API host (a third name again) | `https://server.finovaapp.com` |
| Build tooling | `create-react-app` — the shipped `<meta name="description">` is still the CRA default, `"Web site created using create-react-app"` |

**The credit simulator, verified in the shipped bundle** `[BUNDLE]`. The funnel is instrumented
step-by-step, and two of the tracked steps name the simulator directly:

```
{ currentStep: 46, desc: "el usuario indico que si en la reoferta y pasa al simulador" }
{ prevStep: 46, currentStep: 45, desc: "el usuario se devuelve del simulador de la reoferta" }
```

So the simulator is not a marketing widget — it is a tracked stage inside a 40+ step credit journey,
with forward and backward transitions logged by name.

**Verified credit-domain surface** `[BUNDLE]`:

| Area | Evidence (verbatim ES) |
| --- | --- |
| Application with ID only | "Solo con tu cédula puedes realizar la solicitud de tu crédito." |
| Pre-approval | "¡Tu solicitud de crédito ha sido pre aprobada!", "Tu credito ha sido *preaprobado" |
| Instalment terms | "con la opción de pagar de 2 a 8 cuotas quincenales." |
| Legal interest rate | "La tasa de interés efectiva anual legalmente constituida." |
| Amortisation table | "Cuotas de tu crédito", "Fecha de cuota", "Valor cuota", fields `c202_fecha_cuota` / `c211_valor_cuota` |
| Disbursement | "Solicitud de desembolso", "Monto desembolsado", "Fecha de desembolso", "Desembolso rápido", "Desembolsos a tu banco", "Cambiar cuenta de desembolso" |
| Renewal & re-offer | "La renovación de tu credito", "Tu renovación de credito", "reoferta" |
| Arrears / frozen state | "Saldo en mora con próxima cuota", "Tu credito se encuentra congelado" |
| Funnel outcomes tracked | `credito_desembolsado`, `credito_rechazo`, cancellation paths from `NoResponse`, `callsheduled`, `rescheduleVC` states |
| Payments | `Wompi`; a Scotiabank Colpatria payments page is linked |
| Support | WhatsApp `https://wa.me/573183988052` |
| Legal pages | `https://novapp.com.co/terms`, `https://novapp.com.co/privacy-policies` |
| Mobile app | a Google Play listing is linked from the web bundle — consistent with the mobile app he worked on `[USER]` |

**What he specifically built** `[RESUME]` `[USER]`: microservices and REST APIs integrating banks,
payment gateways and credit bureaus; the database architecture and the responsive user-facing
interfaces on top of it; payment integrations with **Paymentez** and **Wompi** including reconciliation;
SOAP integrations with financial institutions including **Davivienda**; the **credit simulator**; and
the Lukiao **mobile app**.

**Tech stack (tag list).** `React` (`create-react-app`) · `Redux` · `Formik` · `Yup` ·
`Moment.js` · `Bootstrap` · `MUI` · `Axios` · `Socket.IO` · `SweetAlert` · `Google Maps JS API` +
Geocoding · `Wompi` · `AWS S3` · `AWS CloudFront` · microservices · `REST` · `SOAP` · `Paymentez` ·
`Davivienda` · relational database design.
*(Frontend/realtime/maps/Wompi/S3/CloudFront are `[BUNDLE]` from the live Novapp build; microservices,
REST, SOAP, Paymentez and Davivienda are `[RESUME]`. Note the bundle is the **current Novapp** build,
which post-dates him — treat library versions as "the codebase his work lives in", not as personal
choices.)*

**Narrative — EN:**

> Lukiao was a Colombian consumer-credit fintech where Julian Ortiz Alviar worked as a full-stack
> developer from October 2021 to November 2022. The product does the hard, unglamorous parts of
> lending: a borrower applies with nothing but a national ID, gets pre-approved, sees exactly what
> they will owe, chooses between two and eight fortnightly instalments at the legally constituted
> effective annual rate, and has the money sent to their bank account — after which the platform
> tracks the instalment schedule, arrears, renewals and re-offers.
>
> His work spanned both sides. On the backend he built microservices and REST APIs that integrate
> banks, payment gateways and credit bureaus, plus SOAP integrations with financial institutions
> including Davivienda, and payment processing through Paymentez and Wompi with reconciliation that
> has to balance. On the frontend he designed the database architecture and the responsive interfaces
> over it, built the credit simulator, and worked on the Lukiao mobile app.
>
> Lukiao has since been rebranded to Novapp. Julian Ortiz did not work on that rebranding — but much
> of what he built is still running inside it, the credit simulator among it. That is verifiable from
> outside: the current Novapp production bundle still loads onboarding videos and assets from the
> `lukiaostorage` S3 bucket, and the simulator still appears by name in the funnel's own step
> instrumentation, as the stage users enter and leave when they accept a re-offer. The Lukiao admin
> console remains online behind a login, which was deliberately not accessed.

**Narrative — ES (es-CO):**

> Lukiao fue una fintech colombiana de crédito de consumo donde Julian Ortiz Alviar trabajó como
> desarrollador full-stack entre octubre de 2021 y noviembre de 2022. El producto hace las partes
> difíciles y poco glamorosas de prestar: el solicitante aplica solo con su cédula, queda
> preaprobado, ve exactamente lo que va a deber, elige entre 2 y 8 cuotas quincenales a la tasa de
> interés efectiva anual legalmente constituida, y recibe el dinero en su cuenta bancaria — después
> de lo cual la plataforma le sigue el rastro al plan de cuotas, la mora, las renovaciones y las
> reofertas.
>
> Su trabajo cubrió los dos lados. En el backend construyó microservicios y APIs REST integradas con
> bancos, pasarelas de pago y centrales de riesgo, además de integraciones SOAP con entidades
> financieras como Davivienda, y procesamiento de pagos con Paymentez y Wompi con una conciliación
> que tiene que cuadrar. En el frontend diseñó la arquitectura de base de datos y las interfaces
> responsivas encima de ella, construyó el simulador de crédito y trabajó en la app móvil de Lukiao.
>
> Lukiao pasó luego a llamarse Novapp. Julian Ortiz no participó en ese rebranding — pero buena parte
> de lo que construyó sigue corriendo adentro, el simulador de crédito incluido. Eso se puede
> verificar desde afuera: el bundle de producción actual de Novapp todavía carga videos de
> onboarding y recursos desde el bucket de S3 `lukiaostorage`, y el simulador sigue apareciendo por
> nombre en la instrumentación de pasos del embudo, como la etapa a la que el usuario entra y de la
> que sale cuando acepta una reoferta. La consola de administración de Lukiao sigue en línea detrás
> de un login, al que deliberadamente no se accedió.

### 4.6 TALENTÜ — `talentu`

| Field | Value |
| --- | --- |
| `slug` | `talentu` |
| Name | TALENTÜ |
| Tagline EN | Football scouting platform: players upload match video, get real analyst feedback, and reach verified scouts anywhere. |
| Tagline ES | Plataforma de scouting de fútbol: el jugador sube video, recibe retroalimentación de analistas reales y llega a ojeadores verificados en cualquier parte. |
| His role | Co-Founder (technical) `[USER]` — **see the attribution note below** |
| Bucket | Own venture |
| Status | **live** — HTTP 200 `[FETCHED]` |
| Display URL | `https://www.talentü.com` |
| **ASCII / punycode URL** | **`https://www.xn--talent-8ya.com`** (apex `https://xn--talent-8ya.com` also returns 200) `[FETCHED]` |
| Hosting | Amazon S3 behind CloudFront (`server: AmazonS3`, `via: … .cloudfront.net`, edge PoP `BOG51`) `[FETCHED]` |
| Related experience `slug` | — (own venture, not in the employment timeline) |

**Domain handling — the developer must get this exactly right** `[FETCHED]`:

| Form | Result |
| --- | --- |
| `https://www.talentü.com` | The correct human-readable form. **Use this as display text only.** |
| `https://www.xn--talent-8ya.com` | The IDNA/punycode form. **HTTP 200, identical byte-for-byte to the `ü` site.** Use this in `href`, `sameAs`, `url` and JSON-LD — punycode is what belongs in machine-readable fields. |
| `https://xn--talent-8ya.com` | Apex, also HTTP 200. |
| `https://talentu.com` (no umlaut) | ⚠️ **A DIFFERENT, UNRELATED DOMAIN.** It returns a parked lander (`window.location.href="/lander"`, 114 bytes) and is not owned by TALENTÜ. **Never link to it.** |

*Reachability note:* a command-line client passing the literal `ü` in the hostname fails the TLS
handshake (SNI/IDN encoding), while the punycode host succeeds. Practical rule: **render `talentü.com`,
link `xn--talent-8ya.com`.**

> ⚠️ **Attribution note — read before writing the byline** `[FETCHED]` `[USER]`. The live site names
> **Julián González** as the founder: "Julián González — Fundador de TALENTÜ", described as a sports
> scientist and coach, "La mente detrás de TALENTÜ", with training at Escuela Nacional del Deporte
> and Universidad del Valle (both Cali, Colombia). Julian Ortiz Alviar is **not named** anywhere in
> the public site. The user states TALENTÜ is his own venture and that he is a co-founder — treat
> that as `[USER]`, and phrase his role as the **technical** co-founder so it does not contradict the
> site's own founder credit. Recommended phrasing: *"Julian Ortiz Alviar is a technical co-founder
> of TALENTÜ, the football scouting platform founded by sports scientist Julián González."* Confirm
> before publishing — see Q9.

**The problem it solves** `[BUNDLE]`, verbatim:

> "El talento no tiene código postal. Solo necesita una oportunidad para ser visto."
> "En TALENTÜ creemos que el mundo está perdiendo a los próximos grandes del fútbol porque no cuentan
> con la visibilidad que merecen. Nuestra misión es cambiar eso."
> "Un jugador en Medellín, el Chocó o La Guajira tiene las mismas posibilidades de ser descubierto
> que uno en Madrid o São Paulo."

**Verified product surface** `[BUNDLE]`:

| Feature | Evidence (verbatim ES) |
| --- | --- |
| Video upload → professional analysis | "Entrenadores y analistas reales revisan tu video y te dan feedback técnico detallado." |
| Generated professional profile | "Construimos tu perfil profesional con estadísticas, fortalezas y áreas de mejora." |
| **AI-assisted analysis** | "Usamos IA para democratizar el acceso al análisis profesional que antes solo tenían los clubes grandes." |
| Verified scouts | "Todos los scouts y representantes de academias pasan por un proceso de verificación antes de poder acceder a los perfiles de jugadores." |
| Scout-view notifications | "Vio tu perfil" |
| Freemium model | "El registro y el perfil básico son completamente gratuitos. Ofrecemos planes premium con más análisis y mayor visibilidad ante los scouts." |
| Geographic availability | "Actualmente disponible en Latinoamérica, España y África subsahariana." |
| Minors policy | "Sí, desde los 13 años con el consentimiento de un padre o tutor." |
| Mobile apps | Google Play and Apple App Store links present |
| Traction claim | "+10k jugadores ya están en TALENTÜ" — **a marketing claim, `[UNVERIFIED]`; do not restate it as a fact** |
| Copyright year | "© 2026 TALENTÜ. Eliminando barreras para el talento." |

**What he specifically built** `[USER]`: co-founded the venture and owns the technical side. The
public site does not itemise engineering contributions, so **no feature-level claim is available**.
The verifiable technical facts are the ones below (stack, hosting) plus one suggestive signal: his
`fastapi-lambda-cdk-template` README states it is "Basado en los estándares de `TalentosBackend`"
`[GITHUB]` — a talent-domain backend whose standards he codified into a public template. That the
`TalentosBackend` in question is TALENTÜ's backend is plausible but **`[UNVERIFIED]`** (see Q10); if
confirmed it is a strong story: the production backend of his own venture became an open template.

**Tech stack (tag list).** `React` · `React Router` · `TypeScript` · `Vite` · `lucide-react` ·
`AWS S3` static hosting · `AWS CloudFront` · WhatsApp Business deep links · Android + iOS apps ·
AI-assisted video analysis. *Frontend/hosting `[FETCHED]`/`[BUNDLE]`; the AI claim is the site's own
copy `[BUNDLE]`; the backend stack is `[UNVERIFIED]` pending Q10.*

**Narrative — EN:**

> TALENTÜ exists to answer one question: how does a footballer in Chocó or La Guajira get seen by the
> same eyes that see a footballer in Madrid or São Paulo? The platform's answer is to make the
> evidence portable. A player uploads match video; real coaches and analysts review it and return
> detailed technical feedback; the platform assembles that into a professional profile with
> statistics, strengths and areas to improve; and verified scouts and academy representatives —
> verified before they can see any player's profile — browse those profiles from anywhere. AI is used
> to scale the analysis layer, which the site frames as democratising the professional analysis that
> only large clubs could previously afford.
>
> It is a freemium product: registration and a basic profile are free, with premium plans adding
> deeper analysis and more visibility to scouts. It runs in Latin America, Spain and sub-Saharan
> Africa, ships as a web app plus Android and iOS apps, and accepts players from age thirteen with a
> guardian's consent. Julian Ortiz Alviar is a technical co-founder; the platform was founded by
> sports scientist Julián González, who is the founder credited on the site.
>
> Two details worth knowing for anyone linking to it. The brand's domain carries a non-ASCII
> character — `talentü.com` — which resolves as `xn--talent-8ya.com` in punycode; that punycode form
> is what belongs in any machine-readable field. And `talentu.com` without the umlaut is a different,
> unrelated parked domain. The site itself is served as a static build from Amazon S3 behind
> CloudFront, with the Bogotá edge location serving Colombian traffic.

**Narrative — ES (es-CO):**

> TALENTÜ existe para responder una sola pregunta: ¿cómo hace un futbolista del Chocó o de La Guajira
> para que lo vean los mismos ojos que ven a uno de Madrid o São Paulo? La respuesta de la plataforma
> es volver portable la evidencia. El jugador sube video de partido; entrenadores y analistas reales
> lo revisan y le devuelven retroalimentación técnica detallada; la plataforma arma con eso un perfil
> profesional con estadísticas, fortalezas y áreas de mejora; y ojeadores y representantes de
> academias — verificados antes de poder ver el perfil de cualquier jugador — consultan esos perfiles
> desde cualquier parte. La IA se usa para escalar la capa de análisis, que el sitio plantea como
> democratizar el análisis profesional que antes solo podían pagar los clubes grandes.
>
> Es un producto freemium: el registro y el perfil básico son gratuitos, y los planes premium agregan
> más análisis y más visibilidad ante los scouts. Opera en Latinoamérica, España y África
> subsahariana, se entrega como web más apps de Android e iOS, y acepta jugadores desde los trece
> años con consentimiento de un acudiente. Julian Ortiz Alviar es cofundador técnico; la plataforma
> fue fundada por el profesional en ciencias del deporte Julián González, que es el fundador
> acreditado en el sitio.
>
> Dos detalles útiles para quien vaya a enlazarlo. El dominio de la marca tiene un carácter no ASCII
> — `talentü.com` — que se resuelve como `xn--talent-8ya.com` en punycode; esa forma en punycode es
> la que va en cualquier campo legible por máquinas. Y `talentu.com` sin diéresis es un dominio
> distinto y sin relación, parqueado. El sitio se sirve como build estático desde Amazon S3 detrás de
> CloudFront, con el nodo de borde de Bogotá atendiendo el tráfico colombiano.

### 4.7 Riwin — `riwin`

| Field | Value |
| --- | --- |
| `slug` | `riwin` |
| Name | Riwin |
| Tagline EN | Travel-guide publishing house with an online bookstore where every purchase earns raffle entries. |
| Tagline ES | Editorial de guías de viaje con librería en línea donde cada compra suma tickets para sorteos. |
| His role | Co-Founder `[USER]` |
| Bucket | Own venture |
| Status | **live** — HTTP 200 `[FETCHED]` |
| Live URL | `https://riwin.com.co` |
| API origin | `https://api-riwin.riwin.com.co` `[BUNDLE]` |
| Corroborates | riwin.com.co publishes `(316) 434 4625` as its support line — the same number as his resume `[BUNDLE]` `[RESUME]`, see section 2 |
| Related experience `slug` | — (own venture, not in the employment timeline) |

**What it actually is** `[BUNDLE]` — verbatim positioning:

> "Editorial que abre puertas al mundo a través de los libros"
> "Cada guía es una fuente de conocimiento sobre geografía, cultura, historia y tradiciones de
> diferentes lugares del mundo."
> "La lectura amplía perspectivas, desarrolla empatía cultural y enriquece el conocimiento personal."

**The problem it solves.** Travel guides compete with free content, so Riwin changes the incentive:
buying a book is also an entry into a prize draw. The catalogue is editorial — researched,
fact-checked, professionally edited guides — and the commerce layer wraps each purchase in raffle
tickets, which turns a one-off book sale into a repeat relationship.

**Verified product surface** `[BUNDLE]`:

| Area | Evidence (verbatim ES) |
| --- | --- |
| Book catalogue by category | "Lo sentimos, no hay libros disponibles en este momento. Intenta explorar otras categorías…" |
| Purchase → raffle tickets | "¡Ya estoy participando! con `${…}` tickets"; "Autogenerar todos los números de ticket"; "Aún no has comprado ningún libro. ¡Explora nuestro catálogo y participa en sorteos increíbles!" |
| Raffle lifecycle | "Por el momento no tenemos sorteos disponibles. ¡Mantente atento, pronto tendremos nuevas oportunidades!" |
| Editorial standards | "Investigación exhaustiva y verificación de fuentes"; "Edición profesional y diseño de calidad editorial"; "Información práctica y consejos de expertos viajeros" |
| Accounts | login, email verification codes, notification preferences per channel, self-service account deletion with a double confirmation |
| **Payments** | **Openpay** — production `resources.openpay.co/openpay.v1.min.js` + sandbox `sandbox-api.openpay.co/v1/merchant/charges/`; anti-fraud device session id (`openpay-data.v1.min.js`) |
| Payment compliance copy | "Procesamiento de pagos certificado PCI-DSS Nivel 1, el más alto estándar de seguridad en la industria de pagos" |
| Bank authorisation handling | "Favor de comunicarse con su banco para autorizar la transacción." |
| Security posture copy | "Encriptación SSL/TLS para transmisión segura de datos"; "Almacenamiento seguro de información sensible con cifrado"; "Auditorías de seguridad y pruebas de penetración regulares"; "Acceso restringido a información personal por empleados autorizados únicamente" |
| Data policy | "No vendemos su información personal." |
| Company pages | mission/values/culture and a careers page ("…seguir explorando nuestras oportunidades") |
| Support | "puedes llamarnos en nuestro horario de atención al (316) 434 4625"; "Normalmente respondemos en menos de 24 horas hábiles" |
| Sustainability stance | "Promovemos el turismo responsable y sostenible…" |

> ℹ️ Two honesty notes for the developer. (1) The PCI-DSS Level 1 and penetration-testing statements
> are **the site's own claims about its payment processor and practices**; quote them as site copy or
> omit them — do not restate them as independently audited facts. (2) Some catalogue imagery is still
> `via.placeholder.com` `[BUNDLE]`, so parts of the storefront are pre-launch. Describe Riwin as
> live-but-early rather than a finished commercial operation. See Q11.

**What he specifically built** `[USER]`: co-founded the venture. The public site does not itemise
engineering credit; the verifiable technical facts are the stack below and the fact that Riwin runs
its own API at `api-riwin.riwin.com.co`. **No feature-level personal claim is available** — write
"co-founder" and let the product description carry the rest.

**Tech stack (tag list).** `React` · `React Router` · `TypeScript` · `Vite` · `Zustand` · `Axios` ·
`Openpay` (payments + device-fingerprint anti-fraud) · own REST API · email-code verification.
*All `[BUNDLE]`/`[FETCHED]`.*

**Narrative — EN:**

> Riwin is a publishing house that sells travel guides and describes itself as an editorial house
> that "opens doors to the world through books". Each guide is positioned as a work of research
> rather than a listicle — exhaustive research with source verification, professional editing and
> editorial-quality design, practical information from experienced travellers — and the catalogue is
> organised so a reader can browse by destination and category.
>
> The commercial idea is the part worth noticing. Buying a book also earns raffle tickets, so the
> store has a prize-draw system layered over the catalogue: purchases generate ticket numbers, an
> account page shows how many entries a reader holds, and draws open and close on their own
> lifecycle. Around that sits the machinery any real store needs — accounts with email-code
> verification, per-channel notification preferences, self-service account deletion, and card
> payments through Openpay with a device-fingerprint anti-fraud step before the charge.
>
> Julian Ortiz Alviar is a co-founder of Riwin. The platform is a React and TypeScript application on
> Vite talking to its own API at `api-riwin.riwin.com.co`, and it also happens to corroborate his
> contact details: the phone number Riwin publishes as its support line, `(316) 434 4625`, is the
> same number printed on his resume. Parts of the storefront still use placeholder imagery, so it is
> best described as live and early rather than fully commercial.

**Narrative — ES (es-CO):**

> Riwin es una editorial que vende guías de viaje y se describe como una editorial que "abre puertas
> al mundo a través de los libros". Cada guía se plantea como un trabajo de investigación y no como
> una lista rápida — investigación exhaustiva con verificación de fuentes, edición profesional y
> diseño de calidad editorial, información práctica de viajeros expertos — y el catálogo está
> organizado para que el lector navegue por destino y categoría.
>
> La idea comercial es la parte que vale la pena notar. Comprar un libro también otorga tickets para
> sorteos, así que la tienda tiene un sistema de rifas encima del catálogo: las compras generan
> números de ticket, una página de cuenta muestra cuántas participaciones tiene el lector, y los
> sorteos abren y cierran con su propio ciclo de vida. Alrededor está la maquinaria que necesita
> cualquier tienda real — cuentas con verificación por código de correo, preferencias de
> notificación por canal, eliminación de cuenta autogestionada, y pagos con tarjeta a través de
> Openpay con un paso antifraude de huella de dispositivo antes del cargo.
>
> Julian Ortiz Alviar es cofundador de Riwin. La plataforma es una aplicación de React y TypeScript
> sobre Vite que habla con su propia API en `api-riwin.riwin.com.co`, y además corrobora sus datos de
> contacto: el número que Riwin publica como línea de soporte, `(316) 434 4625`, es el mismo que
> aparece en su hoja de vida. Partes de la tienda todavía usan imágenes de placeholder, así que lo
> más honesto es describirla como en vivo y temprana antes que como una operación comercial madura.

---

## 5. Open-source templates catalog

Five public starter templates authored by `Jdavid0610`. These are the third proof pillar from
section 1.5: not products, but the engineering standards he reuses. Route them to
`/open-source` (index) with detail pages at `/open-source/{slug}`.

**All repository metadata below was read from the GitHub REST API on 2026-09-10** `[GITHUB]`.
None of the five declares a license, none sets repository topics, and only `next-stack` sets a
homepage — three concrete, cheap improvements worth mentioning to the user (see Q12).

### 5.0 Index summary

| `slug` | Repo | Language | Stars | Created | Last push | Freshness |
| --- | --- | --- | --- | --- | --- | --- |
| `next-stack` | `Jdavid0610/next-stack` | TypeScript | 1 | 2026-09-10 | 2026-09-10 | **active — this portfolio runs on it** |
| `vite-stack` | `Jdavid0610/vite-stack` | TypeScript | 4 (1 fork) | 2025-04-25 | 2026-07-23 | active |
| `react-native-expo-stack` | `Jdavid0610/react-native-expo-stack` | TypeScript | **5** (most-starred) | 2026-02-09 | 2026-06-27 | active |
| `fastapi-lambda-cdk-template` | `Jdavid0610/fastapi-lambda-cdk-template` | Python | 1 | 2026-05-11 | 2026-05-11 | new, single push |
| `express-hexagonal` | `Jdavid0610/express-hexagonal` | TypeScript | 3 | 2024-07-12 | 2024-12-01 | **maintained but lagging** |

Together they cover one stack per delivery target: a Next.js full-stack app, a Vite SPA, a React
Native mobile app, a Python serverless backend, and a Node backend — the same four-language surface
(`TypeScript`, `Python`) the resume claims, expressed as runnable code.

### 5.1 next-stack — `next-stack`

| Field | Value |
| --- | --- |
| `slug` | `next-stack` |
| Repo | `https://github.com/Jdavid0610/next-stack` |
| Demo | `https://next-stack-phi.vercel.app` (repo `homepage`) `[GITHUB]` |
| Language | TypeScript |
| Stars / forks | 1 / 0 `[GITHUB]` |
| Created / last push | `2026-09-10` / `2026-09-10` `[GITHUB]` |
| License | none declared `[GITHUB]` |

> 🎯 **HEADLINE POINT — put this on the home page, the `/open-source` index and this detail page.**
> **This portfolio is built on `next-stack`.** The template is not a demo he wrote and left; it is
> the foundation of the site the visitor is currently reading. That is live dogfooding: every
> convention this site follows — the typed-content-as-data pattern, the SEO helpers, the i18n route
> structure, the module boundaries — is the template's, running in public, under load, on his own
> name. Suggested one-liner, EN: *"You are reading a site built on next-stack. If you want to know
> whether the template works, you are looking at the answer."* ES: *"Estás leyendo un sitio
> construido sobre next-stack. Si quieres saber si la plantilla funciona, estás viendo la respuesta."*

**The problem it solves** `[GITHUB]`, from the README verbatim:

> "A Next.js 16 template that is also its own backend: server-rendered, SEO-complete, authenticated,
> internationalised, and organised so a feature lives in one folder."

Most Next.js starters give you routing and a stylesheet, then leave authentication, i18n, SEO and
data access to be bolted on incompatibly later. This template ships all four already agreeing with
each other, plus a mock mode so the whole app runs with **no database at all** (`pnpm dev:mock`).

**The architecture rule, verbatim** `[GITHUB]`:

```
app/ (routing)  →  modules/ (features)  →  server/ (db, auth, env)
                          ↘  shared/ (dumb UI, generic hooks, lib)
```

> "Dependencies point one way. `app/` never contains business logic — a page resolves its params,
> calls a feature service, and renders a feature component. `server/` never imports a feature."

**Verified stack** — read from the repository's own `package.json`:

| Concern | Package |
| --- | --- |
| Framework | `next ^16.3.4`, `react ^19.3.0` |
| Language | `typescript ^5.9.2` |
| Database | `drizzle-orm ^0.45.2` + `pg ^8.16.3` (PostgreSQL 17 via Docker, host port 5433), `drizzle-kit` for generate/push/studio |
| Auth + RBAC | `better-auth ^1.7.3` |
| Server state | `@tanstack/react-query ^5.102.8` |
| Validation | `zod ^4.6.1` |
| Styling | `tailwindcss ^4.3.3` (`@tailwindcss/postcss`) |
| **Structured data** | **`schema-dts ^1.1.5`** — already a dependency; see section 7 |
| Tests | `vitest ^3.2.4` + `@testing-library/react`, `@playwright/test ^1.56.1` for E2E |
| Server-boundary safety | `server-only` |

**Notable features he built into it** `[GITHUB]`:

- **Typed content as data.** `/en/docs` and `/es/docs` are six pages living in
  `src/modules/docs/content/` as typed data — "no markdown parser, and a missing translation is a
  compile error". **This is the pattern the whole portfolio content spec targets.**
- **Live status panel** in the docs "reporting the deployment's actual language, session and data
  source, so the docs describe the running system rather than an idealised one."
- **Global toasts with no provider**: plain module state read through `useSyncExternalStore`, titles
  stored as message keys resolved at render time so a toast raised before a language switch cannot
  render stale text; assertive error announcements, hover-pauses the timer, duplicates refresh
  instead of stacking, and a no-op on the server because module state there is shared across requests.
- **Mock mode**: `pnpm dev:mock` runs the entire app on in-memory data; `build:mock` exists too,
  gated behind `ALLOW_MOCKS_IN_PRODUCTION`.
- **Two-audience documentation**: `/docs` for site visitors; `docs/structure.md` (every folder, route
  groups, request lifecycles) and `docs/cookbook.md` (recipes: features, forms, SEO, RBAC, mocks,
  locales) for contributors.
- **SEO built in**: `buildMetadata()` produces canonical URLs plus a complete `hreflang` set for
  every locale with `x-default`, and content pages can narrow `availableLocales` "because an hreflang
  pointing at a 404 is worse than declaring nothing".

**Tag list.** `Next.js 16` · `React 19` · `TypeScript` · `App Router` · `SSR` · `Drizzle ORM` ·
`PostgreSQL` · `better-auth` · `RBAC` · `TanStack Query` · `Zod` · `Tailwind CSS 4` · `schema-dts` ·
`Vitest` · `Playwright` · `i18n (en/es)` · `mock mode`

**Narrative — EN:**

> `next-stack` is Julian Ortiz Alviar's Next.js 16 template, and it is the template this portfolio
> runs on. Its premise is that the four things every real application needs — server rendering,
> complete SEO, authentication with roles, and two languages — should already agree with each other
> on day one, instead of being bolted together later at the cost of a rewrite. One rule holds it
> together: dependencies point one way, from routing to features to server, and a route never
> contains business logic.
>
> The stack is current and opinionated: Next.js 16 and React 19 on TypeScript, Drizzle ORM over
> PostgreSQL 17, `better-auth` for sessions and role-based access, TanStack Query for server state,
> Zod for validation, Tailwind CSS 4 for styling, and both Vitest and Playwright wired up. SEO is a
> first-class module rather than a `<head>` afterthought: canonical URLs and a full `hreflang` set
> are generated from one source of truth, and a page that only exists in one language declares only
> that language.
>
> Two details show the taste behind it. The documentation is typed data instead of markdown, so a
> missing Spanish translation fails the build rather than shipping an English string to a Spanish
> reader — the same pattern this portfolio's content uses. And the entire application runs with no
> database at all in mock mode, which means a contributor can clone it and see the product working
> before they have Docker running.

**Narrative — ES (es-CO):**

> `next-stack` es la plantilla de Next.js 16 de Julian Ortiz Alviar, y es la plantilla sobre la que
> corre este portafolio. Su premisa es que las cuatro cosas que necesita toda aplicación real —
> renderizado en servidor, SEO completo, autenticación con roles y dos idiomas — deberían estar de
> acuerdo entre sí desde el primer día, en vez de pegarse después al costo de una reescritura. Una
> sola regla lo sostiene: las dependencias apuntan en una dirección, de routing a features a server,
> y una ruta nunca contiene lógica de negocio.
>
> El stack es actual y con opinión: Next.js 16 y React 19 sobre TypeScript, Drizzle ORM sobre
> PostgreSQL 17, `better-auth` para sesiones y control de acceso por roles, TanStack Query para
> estado de servidor, Zod para validación, Tailwind CSS 4 para estilos, y Vitest y Playwright ya
> conectados. El SEO es un módulo de primera clase y no un apéndice del `<head>`: las URLs canónicas
> y el juego completo de `hreflang` se generan desde una sola fuente de verdad, y una página que solo
> existe en un idioma declara solo ese idioma.
>
> Dos detalles muestran el criterio detrás. La documentación es data tipada en vez de markdown, así
> que una traducción al español que falte rompe el build en vez de entregarle un texto en inglés a un
> lector hispanohablante — el mismo patrón que usa el contenido de este portafolio. Y toda la
> aplicación corre sin base de datos en modo mock, lo que significa que quien la clone puede ver el
> producto funcionando antes de tener Docker arriba.

### 5.2 react-native-expo-stack — `react-native-expo-stack`

| Field | Value |
| --- | --- |
| `slug` | `react-native-expo-stack` |
| Repo | `https://github.com/Jdavid0610/react-native-expo-stack` |
| Language | TypeScript |
| Stars / forks | **5** / 0 — his most-starred repository `[GITHUB]` |
| Created / last push | `2026-02-09` / `2026-06-27` `[GITHUB]` |
| License / homepage | none declared `[GITHUB]` |

**The problem it solves** `[GITHUB]`, verbatim: "Production-ready React Native starter built with
Expo, following domain-driven modular architecture with strict separation of concerns." A bare
`create-expo-app` gives you a screen; this gives you the decisions — where navigation stops and
features start, where auth state lives, how it persists, and how forms validate.

**Verified stack** `[GITHUB]` — the README ships an explicit table:

| Category | Technology |
| --- | --- |
| Framework | Expo SDK 54, React Native 0.81, React 19 |
| Language | TypeScript 5.9 (strict mode) |
| Routing | Expo Router v6 (file-based) |
| Server state | `@tanstack/react-query` v5 |
| Client state | `zustand` v5 |
| Forms | `react-hook-form` v7 + `zod` v4 + `@hookform/resolvers` v5 |
| HTTP | Axios with interceptors |
| Storage | `react-native-mmkv` v4 |
| Styling | NativeWind v4 (Tailwind CSS) |
| Animations | `react-native-reanimated` v4 |
| Env config | `react-native-config` |

**Architecture** `[GITHUB]`: `app/` is Expo Router only — "navigation only, no business logic", with
thin route files delegating to screens (`login.tsx` → `LoginScreen`). Features live in
`modules/{auth,profile,trips,settings}`, each with its own `hooks/`, `schemas/`, `screens/`,
`components/` and `services.ts`. Cross-cutting concerns sit in `shared/{api,config,hooks,query,storage,storages,ui}`
— an Axios client with interceptors, centralized env config, an MMKV instance plus a Zustand storage
adapter, a persisted auth store, and a small UI kit. Route groups `(auth)` and `(tabs)` separate the
signed-out and signed-in shells, with an auth guard in the root layout.

**Tag list.** `React Native 0.81` · `Expo SDK 54` · `Expo Router v6` · `React 19` ·
`TypeScript strict` · `TanStack Query` · `Zustand` · `react-hook-form` · `Zod` · `NativeWind` ·
`Reanimated` · `MMKV` · `Axios`

**Narrative — EN:**

> `react-native-expo-stack` is Julian Ortiz Alviar's most-starred repository, and the mobile
> counterpart to his web templates. It answers the question a new Expo project leaves open: not
> "which libraries?" but "where does each kind of code belong?". Navigation files under `app/`
> contain navigation and nothing else — a route is a thin file that renders a screen — while every
> feature owns a folder holding its own hooks, validation schemas, screens, components and API calls.
>
> The library choices mirror his web stack deliberately, so an engineer moving between his web and
> mobile projects meets the same ideas: TanStack Query for server state, Zustand for client state,
> react-hook-form with Zod for forms, and Axios with interceptors for HTTP. Where mobile differs, it
> picks the fast option — MMKV for synchronous storage with a Zustand persistence adapter,
> NativeWind so Tailwind classes work in React Native, and Reanimated for animation off the JS thread.
>
> It ships on current versions — Expo SDK 54, React Native 0.81, React 19, TypeScript 5.9 in strict
> mode — with signed-out and signed-in route groups already separated and an auth guard in the root
> layout, plus two empty feature modules left in place as worked examples of where the next feature goes.

**Narrative — ES (es-CO):**

> `react-native-expo-stack` es el repositorio con más estrellas de Julian Ortiz Alviar, y la
> contraparte móvil de sus plantillas web. Responde la pregunta que un proyecto nuevo de Expo deja
> abierta: no "¿cuáles librerías?" sino "¿dónde va cada tipo de código?". Los archivos de navegación
> bajo `app/` contienen navegación y nada más — una ruta es un archivo delgado que renderiza una
> pantalla — mientras cada feature es dueña de una carpeta con sus propios hooks, esquemas de
> validación, pantallas, componentes y llamadas a la API.
>
> Las librerías elegidas replican su stack web a propósito, para que quien se mueva entre sus
> proyectos web y móviles encuentre las mismas ideas: TanStack Query para estado de servidor, Zustand
> para estado de cliente, react-hook-form con Zod para formularios, y Axios con interceptores para
> HTTP. Donde lo móvil se diferencia, elige la opción rápida — MMKV para almacenamiento sincrónico
> con adaptador de persistencia para Zustand, NativeWind para que las clases de Tailwind funcionen en
> React Native, y Reanimated para animar por fuera del hilo de JS.
>
> Viene con versiones actuales — Expo SDK 54, React Native 0.81, React 19, TypeScript 5.9 en modo
> estricto — con los grupos de rutas de sesión iniciada y no iniciada ya separados y un guard de
> autenticación en el layout raíz, además de dos módulos de feature vacíos dejados a propósito como
> ejemplo de dónde va la siguiente funcionalidad.

### 5.3 vite-stack — `vite-stack`

| Field | Value |
| --- | --- |
| `slug` | `vite-stack` |
| Repo | `https://github.com/Jdavid0610/vite-stack` |
| Language | TypeScript |
| Stars / forks | 4 / **1** — his only forked repository `[GITHUB]` |
| Created / last push | `2025-04-25` / `2026-07-23` `[GITHUB]` |
| Package name | `vite-react-ts` `[GITHUB]` |
| License / homepage | none declared `[GITHUB]` |

**The problem it solves.** A Vite SPA for the case where a full Next.js app is more machinery than
the job needs: an authenticated dashboard-style client that talks to an existing API. It fixes the
file layout, the routing/guard pattern, the API-call convention and the form pattern up front.

**Verified stack** `[GITHUB]` — from `package.json`, not from prose:

`react ^19.0.0` · `react-dom ^19` · `react-router-dom ^7.5.2` · `@tanstack/react-query ^5.95.2` ·
`zustand ^5.0.12` · `react-hook-form ^7.72.0` + `zod ^4.3.6` + `@hookform/resolvers ^5.2.2` ·
`axios ^1.18.1` · `tailwindcss ^4.0.9` via `@tailwindcss/vite` · `react-icons ^5.6.0` ·
`vite-tsconfig-paths ^5.1.4`. Dev: `vite`, `typescript`, `eslint` + `typescript-eslint` +
`eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`. Managed with **pnpm** (a
`pnpm-workspace.yaml` is present), 58 files total.

**Conventions worth naming** `[GITHUB]` — visible in the file tree:

- **API calls are addressed by resource, verb and operation**, each with a co-located type file:
  `src/api/auth/post/login/{login.ts,login.interface.ts}`, `src/api/user/get/getUser/…`, plus a
  shared `src/api/client.ts` and a central `src/api/queryKeys.ts`.
- **Pages own their logic**: `src/pages/login/{index.tsx,hooks/useLogin.ts,schemas/login.schema.ts}`,
  and a `src/pages/template/` folder kept as a copy-me starting point.
- **Routing is declarative and separated**: `src/router/AppRouter.tsx` + `src/router/routes.ts`, with
  a `components/PrivateRoute/` guard and a `components/Layout/` + `Sidebar` shell.
- **Auth state** in `src/stores/useAuthStore.ts` with a `hooks/auth/useAuth.ts` facade.
- **Self-hosted Poppins** (the full 18-weight family in `public/fonts/`) — no Google Fonts request.
- A `CLAUDE.md` ships in the repo, i.e. the conventions are written down for AI agents too.

> ℹ️ **Documentation gap, worth telling the user** `[GITHUB]`: `vite-stack`'s `README.md` is still the
> **stock `create-vite` React+TS readme** ("This template provides a minimal setup to get React
> working in Vite with HMR and some ESLint rules") and says nothing about the conventions above. It
> is the single highest-leverage fix across the five repos — the template is good and the readme
> hides it. See Q12.

**Tag list.** `React 19` · `Vite` · `TypeScript` · `React Router 7` · `TanStack Query 5` ·
`Zustand 5` · `react-hook-form` · `Zod 4` · `Tailwind CSS 4` · `Axios` · `pnpm`

**Narrative — EN:**

> `vite-stack` is the template for the job that does not need a server: an authenticated
> single-page client talking to an API that already exists. It runs React 19 on Vite with Tailwind
> CSS 4, React Router 7 for routing, TanStack Query for server state, Zustand for client state, and
> react-hook-form with Zod for forms — the same choices as his Next.js and React Native templates,
> so the three feel like one family.
>
> Its distinctive idea is the API layer. Instead of a `services/` bag, every call gets a folder
> addressed by resource, HTTP verb and operation — `api/auth/post/login/`, `api/user/get/getUser/` —
> with its request and response types in a sibling `.interface.ts` and its cache key registered in
> one central `queryKeys.ts`. Pages are equally self-contained: a page folder holds its own hook and
> its own Zod schema, and a `pages/template/` folder is left in the repository as the thing you copy
> to start the next screen.
>
> The rest is the unglamorous groundwork: a private-route guard, a layout-and-sidebar shell, an auth
> store behind a `useAuth` facade, path aliases, a strict ESLint setup, pnpm, and the full Poppins
> family self-hosted so the app makes no font request to a third party. The one thing it is missing
> is a readme that says any of this — the file is still the stock Vite template text.

**Narrative — ES (es-CO):**

> `vite-stack` es la plantilla para el trabajo que no necesita servidor: un cliente de una sola
> página con autenticación que consume una API que ya existe. Corre React 19 sobre Vite con Tailwind
> CSS 4, React Router 7 para el enrutamiento, TanStack Query para estado de servidor, Zustand para
> estado de cliente, y react-hook-form con Zod para formularios — las mismas decisiones de sus
> plantillas de Next.js y React Native, así que las tres se sienten como una familia.
>
> Su idea distintiva es la capa de API. En vez de una bolsa de `services/`, cada llamada tiene una
> carpeta direccionada por recurso, verbo HTTP y operación — `api/auth/post/login/`,
> `api/user/get/getUser/` — con sus tipos de request y response en un `.interface.ts` hermano y su
> llave de caché registrada en un único `queryKeys.ts`. Las páginas son igual de autocontenidas: la
> carpeta de una página guarda su propio hook y su propio esquema de Zod, y una carpeta
> `pages/template/` queda en el repositorio como lo que uno copia para empezar la siguiente pantalla.
>
> El resto es el trabajo de base poco vistoso: un guard de ruta privada, un shell de layout con
> sidebar, un store de autenticación detrás de una fachada `useAuth`, alias de rutas, una
> configuración estricta de ESLint, pnpm, y la familia Poppins completa autoalojada para que la app
> no le pida fuentes a un tercero. Lo único que le falta es un readme que cuente algo de esto — el
> archivo sigue siendo el texto de la plantilla por defecto de Vite.

### 5.4 fastapi-lambda-cdk-template — `fastapi-lambda-cdk-template`

| Field | Value |
| --- | --- |
| `slug` | `fastapi-lambda-cdk-template` |
| Repo | `https://github.com/Jdavid0610/fastapi-lambda-cdk-template` |
| Language | **Python** — the only non-TypeScript template `[GITHUB]` |
| Stars / forks | 1 / 0 `[GITHUB]` |
| Created / last push | `2026-05-11` / `2026-05-11` — one push, brand new `[GITHUB]` |
| License / homepage | none declared `[GITHUB]` |
| Provenance | "Basado en los estándares de `TalentosBackend`" `[GITHUB]` — see Q10 |

**The problem it solves** `[GITHUB]`, verbatim: "Template de backend serverless para Python. Stack:
**FastAPI + AWS Lambda + API Gateway + AWS CDK + PostgreSQL + DynamoDB + S3/CloudFront + SQS**.
Listo para clonar, renombrar y empezar." Serverless Python backends are mostly glue — packaging,
layers, authorizers, parameter plumbing, local-dev parity — and this template ships that glue
already working, so a new service starts at the business logic.

**What it includes** `[GITHUB]`, verbatim from the README:

- **FastAPI** behind **Mangum** running on AWS Lambda.
- A **custom Lambda Authorizer** validating a JWT *and* a session in DynamoDB.
- **AWS CDK (Python)** with stacks split by concern (`api`, `s3`, `dynamo`, `sqs`), reusable
  constructs (`PythonLambdaFunction`, `SharedCodeLayer`, `PythonDependenciesLayer`), and
  configuration read from **SSM Parameter Store**.
- A **shared Lambda Layer** (`shared/`) carrying SQLAlchemy models, Pydantic config, security
  (`bcrypt` + `jose`) and DynamoDB/S3/SQS repositories.
- A **repeatable Lambda pattern**: `app + router + routes + services + repositories + schemas +
  constants`, with singletons.
- **Alembic** preconfigured against `shared.models.models.Base`.
- **Unified local dev**: `local_main.py` boots every Lambda on `:8003` from a `config.ini`, with
  Swagger at `http://localhost:8003/docs`.
- **CI/CD** via GitHub Actions with **OIDC — no secrets stored in the repository**.
- A **Bruno** API collection (Local + Production environments) and a VS Code debug configuration.
- A `CLAUDE.md` with a `{{PROJECT_NAME}}` placeholder, and a documented rename checklist covering
  `shared/core/config.py`, `cdk_deployment/config/settings.py`, `cdk_deployment/app.py`, the deploy
  workflow, `bruno/bruno.json` and `CLAUDE.md`.
- A documented **SSM parameter contract** to populate before the first deploy:
  `/{STACK_NAME}/{env}/database/{host-reader,host-writer,port,user,password,name}`.

**Tag list.** `Python` · `FastAPI` · `Mangum` · `AWS Lambda` · `API Gateway` · `AWS CDK` ·
`Lambda Authorizer` · `DynamoDB` · `PostgreSQL` · `SQLAlchemy` · `Alembic` · `Pydantic` · `SQS` ·
`S3` · `CloudFront` · `SSM Parameter Store` · `GitHub Actions OIDC` · `bcrypt` · `python-jose` ·
`Bruno`

**Narrative — EN:**

> `fastapi-lambda-cdk-template` is the Python half of Julian Ortiz Alviar's template set, and the one
> that shows the DevOps half of his title most directly. It is a serverless backend starter: FastAPI
> running on AWS Lambda behind Mangum and API Gateway, with infrastructure defined in AWS CDK, and
> data split across PostgreSQL for relational work and DynamoDB for sessions and key-value access.
>
> The parts that make it a template rather than a demo are the operational ones. Infrastructure is
> split into separate CDK stacks for API, S3, DynamoDB and SQS, with reusable constructs for Lambda
> functions and for both shared-code and dependency layers, and every environment value comes from
> SSM Parameter Store rather than a committed file. Authorization is a custom Lambda Authorizer that
> checks a JWT and confirms the session still exists in DynamoDB. Deployment runs through GitHub
> Actions using OIDC, so the repository holds no AWS secrets at all — the documented first-deploy
> step is populating SSM, not pasting keys.
>
> Local development is treated as a real requirement: `local_main.py` boots every Lambda together on
> port 8003 from a single config file, with Swagger docs and a Bruno collection for both local and
> production, plus a VS Code debug configuration and Alembic migrations wired to the shared models.
> The README states the template codifies the standards of a project called `TalentosBackend`,
> and it ships a rename checklist so the first ten minutes of a new service are a copy and six edits.

**Narrative — ES (es-CO):**

> `fastapi-lambda-cdk-template` es la mitad en Python del conjunto de plantillas de Julian Ortiz
> Alviar, y la que muestra más directamente la parte de DevOps de su título. Es un starter de backend
> serverless: FastAPI corriendo en AWS Lambda detrás de Mangum y API Gateway, con la infraestructura
> definida en AWS CDK, y los datos repartidos entre PostgreSQL para lo relacional y DynamoDB para
> sesiones y acceso llave-valor.
>
> Lo que la vuelve una plantilla y no una demo son las partes operativas. La infraestructura está
> partida en stacks de CDK separados para API, S3, DynamoDB y SQS, con constructs reutilizables para
> funciones Lambda y para las capas de código compartido y de dependencias, y cada valor de ambiente
> viene de SSM Parameter Store y no de un archivo versionado. La autorización es un Lambda Authorizer
> propio que valida el JWT y confirma que la sesión siga existiendo en DynamoDB. El despliegue corre
> por GitHub Actions con OIDC, así que el repositorio no guarda ningún secreto de AWS — el primer
> paso documentado del despliegue es poblar SSM, no pegar llaves.
>
> El desarrollo local se trata como un requisito real: `local_main.py` levanta todas las lambdas
> juntas en el puerto 8003 desde un solo archivo de configuración, con documentación Swagger y una
> colección de Bruno para local y producción, más una configuración de depuración de VS Code y
> migraciones de Alembic conectadas a los modelos compartidos. El README dice que la plantilla
> codifica los estándares de un proyecto llamado `TalentosBackend`, y trae una lista de renombrado
> para que los primeros diez minutos de un servicio nuevo sean una copia y seis ediciones.

### 5.5 express-hexagonal — `express-hexagonal`

| Field | Value |
| --- | --- |
| `slug` | `express-hexagonal` |
| Repo | `https://github.com/Jdavid0610/express-hexagonal` |
| Language | TypeScript |
| Stars / forks | 3 / 0 `[GITHUB]` |
| Created / last push | `2024-07-12` / **`2024-12-01`** `[GITHUB]` |
| License / homepage | none declared `[GITHUB]` |
| Maintenance status | **maintained but lagging** — the oldest of the five, last code push December 2024 |

> 🔵 **Framing instruction.** The user's own words: it is "a little up to date", i.e. slightly behind
> and due an update. **Present this neutrally and factually — "maintained but lagging, last pushed
> December 2024" — not as abandoned, and not as current.** The dates do the honest work; no adjective
> is needed. It is also the template whose dependency list would most benefit from a refresh:
> Express 4 (Express 5 is out) and `@sequelize/postgres` pinned to a `7.0.0-alpha` release.

**The problem it solves** `[GITHUB]`, verbatim: "This project is a backend application built with
Express.js and TypeScript, following the principles of Hexagonal Architecture." It is the Node
counterpart to the FastAPI template: a conventional REST service where the domain layer does not
know it is talking to Sequelize.

**Verified stack** `[GITHUB]` — from `package.json`:

`express ^4.19.2` · `typescript ^5.4.5` · `sequelize ^6.37.3` + `@sequelize/postgres ^7.0.0-alpha.43`
· `express-validator ^7.1.0` · `cors` · `dotenv` · `http-status` · `ts-node`. Dev:
`swagger-jsdoc` + `swagger-ui-express` (an OpenAPI UI is wired up in `swagger.ts`), `nodemon` for
live reload. Ships a `Dockerfile` and a `docker-compose.yml`; the README documents both the Docker
path (`docker build`/`docker run -p 3080:3080`) and `npm run dev` / `npm start`.

**The hexagonal layout, from the file tree** `[GITHUB]` — 27 files, and the interesting ones are all
in `src/context/shared/`:

| Path | Role |
| --- | --- |
| `domain/contracts/baseRepository.ts` | the port every repository implements |
| `domain/contracts/sequelizeRepository.ts` | the Sequelize-shaped contract |
| `domain/contracts/encapsulationRepository.ts` | contract for the encapsulation layer |
| `domain/contracts/DTO/{DTORepository,DTOFactoryRepository}.ts` | DTO ports and a factory port |
| `domain/BaseDTORepository.ts` | shared DTO repository base |
| `domain/services/{DTOMappingService,EncapsulationService}.ts` | domain-side mapping and encapsulation |
| `domain/exceptions/PropertyNotFound.ts` | a typed domain exception |
| `infrastructure/{DTO.ts,SequelizeBaseRepository.ts}` | the adapters that satisfy the ports |
| `src/controllers/{estate,user}` · `src/models/estate/Estate.ts` · `src/requests/user/SingInUserRequest.ts` | worked example slices |

**Tag list.** `Node.js` · `Express 4` · `TypeScript` · `Hexagonal Architecture` · `Ports & Adapters`
· `Sequelize` · `PostgreSQL` · `express-validator` · `Swagger / OpenAPI` · `Docker` ·
`docker-compose`

**Narrative — EN:**

> `express-hexagonal` is the oldest of Julian Ortiz Alviar's public templates — created in July 2024,
> last pushed in December 2024 — and the most architecturally explicit. It is an Express and
> TypeScript REST backend built to the ports-and-adapters pattern, where the domain layer defines
> contracts and the infrastructure layer satisfies them, so swapping the persistence engine does not
> reach into business logic.
>
> The whole idea is visible in the folder names. `src/context/shared/domain/contracts/` holds the
> ports — a base repository, a Sequelize-shaped repository, an encapsulation repository, and DTO and
> DTO-factory contracts — while `src/context/shared/infrastructure/` holds the adapters that
> implement them, and domain-side services handle DTO mapping and encapsulation. A typed
> `PropertyNotFound` exception lives in the domain rather than being thrown as a string. Two worked
> slices, users and estates, show what a real feature looks like on top of that skeleton, and Swagger
> UI is wired up so the API documents itself.
>
> It also ships the deployment story: a Dockerfile and a docker-compose file, with the README
> documenting both the container path and the local `npm run dev` loop. Its honest status is
> maintained but lagging — it targets Express 4 and pins Sequelize's Postgres driver to a 7.0
> alpha, and it has not been pushed to since December 2024, which makes it the clearest candidate
> for a refresh among the five.

**Narrative — ES (es-CO):**

> `express-hexagonal` es la más antigua de las plantillas públicas de Julian Ortiz Alviar — creada en
> julio de 2024, con su último push en diciembre de 2024 — y la más explícita en términos
> arquitectónicos. Es un backend REST en Express y TypeScript construido con el patrón de puertos y
> adaptadores, donde la capa de dominio define contratos y la de infraestructura los satisface, de
> modo que cambiar el motor de persistencia no entra a tocar la lógica de negocio.
>
> La idea completa se ve en los nombres de las carpetas.
> `src/context/shared/domain/contracts/` guarda los puertos — un repositorio base, uno con forma de
> Sequelize, uno de encapsulación, y contratos de DTO y de fábrica de DTO — mientras
> `src/context/shared/infrastructure/` guarda los adaptadores que los implementan, y los servicios
> del dominio se encargan del mapeo de DTOs y de la encapsulación. Una excepción tipada
> `PropertyNotFound` vive en el dominio en vez de lanzarse como string. Dos cortes de ejemplo,
> usuarios e inmuebles, muestran cómo se ve una feature real sobre ese esqueleto, y Swagger UI queda
> conectado para que la API se documente sola.
>
> También trae la historia del despliegue: un Dockerfile y un docker-compose, con el README
> documentando tanto el camino de contenedor como el ciclo local de `npm run dev`. Su estado honesto
> es mantenida pero rezagada — apunta a Express 4 y fija el driver de Postgres de Sequelize en un
> alpha de la 7.0, y no recibe un push desde diciembre de 2024, lo que la vuelve la candidata más
> clara a una actualización entre las cinco.

---

## 6. Skills taxonomy

### 6.1 The raw input

The resume carries a **flat, unordered, untiered list of 29 skill labels** in its right-hand column
`[RESUME]`, reproduced here verbatim so nothing is silently dropped:

> Problem-solving · Object-oriented programming · Software Development · Code debugging · Web
> application development · Agile development methodologies · AI Engineer · Git proficiency · API
> integration · Code review · Database design & integration · Back-end frameworks · Front-end
> frameworks · Project management · Software architecture design · User experience design ·
> Application development · Ecommerce development · React frameworks specialist · Angular specialist
> · Python specialist · AI Trainer · CMS · Applied AI · Microsoft Azure · RESTful WebServices · AWS
> CloudFormation · PWAs · Control Systems

Concrete technology names appear **not** in that list but in the resume's **summary paragraph and
role descriptions** `[RESUME]`: TypeScript, React, Next.js, Node.js, Python, Java, PostgreSQL,
MongoDB, REST APIs, AI/LLM, CI/CD, containerization, Linux, infrastructure automation, monitoring,
security, performance optimization, Azure DevOps, Azure Static Web Apps, Azure SQL Database, Azure
Database for PostgreSQL, Azure Cosmos DB, Azure Key Vault, AWS Amplify, AWS Lambda, AWS RDS, AWS
CloudFront, AWS CodePipeline, AWS CloudFormation, Terraform, microservices, SOAP, Paymentez, Wompi,
Davivienda.

The site must present a **grouped, tiered** taxonomy instead of that flat list — that is the whole
point of this section.

### 6.2 Proficiency tiers — definitions

Tiers are assigned **conservatively and from evidence only**. A resume label on its own never earns
better than T3.

| Tier | Label EN | Label ES | Bar it must clear |
| --- | --- | --- | --- |
| **T1** | Core | Núcleo | Shipped in **production in more than one project**, **and** independently verified in a live bundle, a store listing or a repository |
| **T2** | Strong | Sólido | Named with specifics in the resume **and** corroborated by at least one verified artefact |
| **T3** | Working | En uso | Resume-attested with specifics, but **no independent verification available** |
| **T4** | Claimed | Declarado | Appears only as a bare resume label, with **no** corroborating detail anywhere |

> ⚠️ **Rule for the developer: T4 skills must not be rendered as strengths.** Options, in order of
> preference: (a) omit them from the site; (b) render them in a visually secondary "also listed on
> my CV" group; (c) ask the user for one concrete example each and promote them to T3. **Never** put
> a T4 skill in a hero, a headline, `knowsAbout`, or a proficiency bar. Publishing "Angular
> specialist" next to seven verified React codebases invites the exact question the portfolio cannot
> answer. See Q13.

### 6.3 Category labels (bilingual)

| Key | EN label | ES label |
| --- | --- | --- |
| `languages` | Languages | Lenguajes |
| `frontend` | Frontend | Frontend |
| `backend` | Backend & APIs | Backend y APIs |
| `ai` | AI & LLM | IA y LLM |
| `cloud` | Cloud & DevOps | Cloud y DevOps |
| `data` | Databases & Data | Bases de datos y datos |
| `practices` | Practices & Architecture | Prácticas y arquitectura |

### 6.4 `languages` — Languages / Lenguajes

| Skill | Tier | Evidence |
| --- | --- | --- |
| TypeScript | **T1** | Resume summary `[RESUME]`; the primary language of 4 of 5 public templates `[GITHUB]`; verified in the PhenoScience, ClinPsia, Marea Verde, TALENTÜ and Riwin production builds `[BUNDLE]` |
| JavaScript | **T1** | Implied by, and inseparable from, every verified frontend build `[BUNDLE]` |
| Python | **T2** | "Python specialist" `[RESUME]`; `fastapi-lambda-cdk-template` is a Python repo with FastAPI, SQLAlchemy, Pydantic, Alembic and CDK-in-Python `[GITHUB]` |
| SQL | **T2** | "Database design & integration" `[RESUME]`; PostgreSQL and Azure SQL named across roles `[RESUME]`; Drizzle + `pg` in `next-stack`, Sequelize in `express-hexagonal` `[GITHUB]` |
| Java | **T3** | Named once, in the resume summary only `[RESUME]`. **No Java appears in any repository or any fetched artefact.** Render as "familiar", never as a specialty. See Q14. |

### 6.5 `frontend` — Frontend

| Skill | Tier | Evidence |
| --- | --- | --- |
| React | **T1** | "React frameworks specialist" `[RESUME]`; verified in **five** distinct production bundles — PhenoScience, ClinPsia, Marea Verde, TALENTÜ, Riwin — plus Novapp `[BUNDLE]`; and in 4 repos `[GITHUB]` |
| Next.js | **T1** | Resume summary `[RESUME]`; `next-stack` (Next.js 16, App Router, SSR, RSC) `[GITHUB]`; **this portfolio runs on it** |
| Vite | **T1** | The build tool behind PhenoScience, ClinPsia, Marea Verde, TALENTÜ and Riwin `[BUNDLE]`, and `vite-stack` `[GITHUB]` |
| React Router | **T1** | Verified in PhenoScience, ClinPsia, TALENTÜ, Riwin `[BUNDLE]`; v7 in `vite-stack` `[GITHUB]` |
| Zustand | **T1** | Verified in PhenoScience, Marea Verde, Riwin `[BUNDLE]`; v5 in `vite-stack` and `react-native-expo-stack` `[GITHUB]` |
| Zod | **T1** | Heaviest single dependency by string count in the ClinPsia and Marea Verde bundles `[BUNDLE]`; v4 in three templates `[GITHUB]` |
| TanStack Query | **T2** | v5 in `next-stack`, `vite-stack`, `react-native-expo-stack` `[GITHUB]`; query-client internals present in the PhenoScience bundle `[BUNDLE]` |
| react-hook-form | **T2** | In the ClinPsia bundle `[BUNDLE]`; in three templates `[GITHUB]` |
| Tailwind CSS | **T2** | v4 in `next-stack` and `vite-stack`; NativeWind v4 in the Expo template `[GITHUB]` |
| React Native / Expo | **T2** | `react-native-expo-stack` — his most-starred repo, Expo SDK 54 / RN 0.81 `[GITHUB]`; mobile app work at Lukiao `[USER]` and on HerbaFit `[USER]` |
| Responsive UI / UX design | **T2** | "User experience design" `[RESUME]`; responsive interfaces named at Lukiao and Fory App `[RESUME]`; verified responsive, accessible widgets with localized `aria-label`s in Marea Verde `[BUNDLE]` |
| Bootstrap · MUI · Formik · Moment.js | **T3** | Verified in the Novapp/Lukiao-era bundle `[BUNDLE]`, but that build post-dates him and these are legacy choices — list as "worked in", not as current preferences |
| Angular | **T4** | "Angular specialist" `[RESUME]` and nothing else. **Zero Angular in any repository or any of the six fetched production bundles.** See Q13. |
| PWAs | **T4** | Bare resume label `[RESUME]`. No manifest/service-worker evidence found in the fetched sites. |
| CMS | **T4** | Bare resume label `[RESUME]`. No CMS named anywhere. |

### 6.6 `backend` — Backend & APIs / Backend y APIs

| Skill | Tier | Evidence |
| --- | --- | --- |
| Node.js | **T1** | Resume summary `[RESUME]`; `express-hexagonal` `[GITHUB]`; the whole `next-stack` server layer `[GITHUB]` |
| REST API design | **T1** | "RESTful WebServices", "API integration" `[RESUME]`; REST APIs built at Lukiao `[RESUME]`; four verified own-API origins across his projects — `api.phenoscience.com.co`, `api.clinpsia.com`, `api-riwin.riwin.com.co`, the Marea Verde API Gateway stage `[BUNDLE]` |
| FastAPI | **T2** | `fastapi-lambda-cdk-template`: FastAPI behind Mangum, routers, services, repositories, schemas `[GITHUB]` |
| Express | **T2** | `express-hexagonal` on Express 4 with `express-validator` and Swagger UI `[GITHUB]` |
| Microservices | **T2** | Microservices built at Lukiao `[RESUME]`; the per-Lambda `app + router + routes + services + repositories` pattern in the CDK template `[GITHUB]` |
| Authentication & sessions | **T2** | `better-auth` + RBAC in `next-stack` `[GITHUB]`; a custom Lambda Authorizer validating JWT **and** a DynamoDB session, with `bcrypt` + `jose`, in the FastAPI template `[GITHUB]` |
| Payment-gateway integration | **T2** | Paymentez, Wompi and payment reconciliation at Lukiao `[RESUME]`; Wompi verified in the Novapp bundle, Openpay (with device-fingerprint anti-fraud) in Riwin, Stripe in Marea Verde `[BUNDLE]` |
| Third-party / financial integrations | **T2** | Multinational third-party platform integrations at DevInMotion `[RESUME]`; banks, payment gateways and credit bureaus at Lukiao `[RESUME]`; a verified credit funnel with disbursement and instalment machinery `[BUNDLE]` |
| SOAP | **T3** | SOAP integrations including Davivienda `[RESUME]`. Not independently verifiable from outside. |
| WebSockets / realtime | **T3** | `socket.io` present in the Novapp bundle `[BUNDLE]` — a codebase he worked in, though this build post-dates him |
| SQS / async messaging | **T3** | An SQS stack and SQS repositories in the CDK template `[GITHUB]`; no production usage verified |

### 6.7 `ai` — AI & LLM / IA y LLM

| Skill | Tier | Evidence |
| --- | --- | --- |
| LLM integration | **T2** | "I implemented LLM-based capabilities to fill the gaps where a psychologist cannot provide immediate or continuous support" `[RESUME]`; the headline claims "AI Engineer" and "Applied AI" `[RESUME]`. **Not verifiable from outside** — see the honesty flag below. |
| Spec-Driven Development with agent "skills" | **T2** | "introduced Spec-Driven Development (SDD) by designing modular 'skills' and assigning them to agents" `[RESUME]`; corroborating fingerprints — numbered `RF-xx` requirements, per-feature `spec.md` files, a dated `DECISIONS.md` — are visible in the Marea Verde build `[FETCHED]`, and a `CLAUDE.md` ships in three of the five templates `[GITHUB]` |
| AI-assisted product features | **T3** | TALENTÜ's own copy: "Usamos IA para democratizar el acceso al análisis profesional que antes solo tenían los clubes grandes" `[BUNDLE]` — a product claim on a venture he co-founded, not a personal implementation claim |
| AI Trainer | **T4** | Bare resume label `[RESUME]`, with no described engagement. Ask for one example or omit. |

> ⚠️ **Honesty flag — the AI pillar is the least externally verifiable claim in this portfolio.**
> The resume states the LLM work plainly and that is good enough to publish, tagged `[RESUME]`. But
> **no fetched artefact exposes an LLM feature**: the ClinPsia landing bundle contains no AI/IA/LLM
> copy at all `[BUNDLE]`, and the PhenoScience bundle exposes counselling, scheduling and content
> surfaces without naming a model. Therefore: state the AI work as **his role at PhenoScience**
> ("implemented LLM-based capabilities that…"), never as a product badge on ClinPsia, and consider
> asking the user for one publishable specific — which model or provider, what the feature does,
> whether retrieval or tool-calling is involved. That single detail would move this from T2 to the
> strongest section on the site. See Q6.

### 6.8 `cloud` — Cloud & DevOps / Cloud y DevOps

| Skill | Tier | Evidence |
| --- | --- | --- |
| AWS | **T1** | Lambda, RDS, CloudFront, CodePipeline, CloudFormation, Amplify `[RESUME]`; verified in production: S3 + CloudFront serving PhenoScience assets and the whole TALENTÜ site, an API Gateway `prod` stage behind Marea Verde, S3 + CloudFront behind Novapp `[BUNDLE]` `[FETCHED]` |
| CI/CD pipelines | **T1** | Azure DevOps pipelines and engineering standards enforced by pipeline `[RESUME]`; CI/CD owned at PhenoScience `[RESUME]`; GitHub Actions with OIDC in the CDK template `[GITHUB]` |
| Microsoft Azure | **T2** | The broadest single technology surface in the resume — Azure DevOps, Static Web Apps, Azure SQL Database, Azure Database for PostgreSQL, Cosmos DB, Key Vault — across a 21-month DevOps Specialist role `[RESUME]`; GitHub bio reads "Azure DevOps Specialist" `[GITHUB]`. **No Azure artefact was independently fetchable**, hence T2 not T1. |
| AWS CDK (IaC) | **T2** | CDK-in-Python with stacks split by concern and reusable constructs `[GITHUB]` |
| Terraform | **T2** | "automating infrastructure with Terraform" at PhenoScience `[RESUME]`. Not externally verifiable. |
| Serverless architecture | **T2** | FastAPI on Lambda behind API Gateway `[GITHUB]`; a live API Gateway `prod` stage behind Marea Verde `[BUNDLE]`; AWS Lambda named at Rebus `[RESUME]` |
| Static hosting + CDN delivery | **T2** | S3-origin/CloudFront verified for TALENTÜ (edge PoP `BOG51`), PhenoScience assets and Novapp assets `[FETCHED]` `[BUNDLE]` |
| Secrets & configuration management | **T2** | Azure Key Vault `[RESUME]`; SSM Parameter Store as the sole config source, and OIDC instead of stored secrets, in the CDK template `[GITHUB]` |
| Containerization / Docker | **T2** | "containerization" `[RESUME]`; a Dockerfile + docker-compose in `express-hexagonal`, Postgres via docker-compose in `next-stack` `[GITHUB]` |
| Monitoring, alerting & observability | **T2** | "Developed monitoring and alerting capabilities to proactively identify and handle errors across critical platform workflows" at DevInMotion `[RESUME]`; monitoring named in the summary `[RESUME]` |
| AWS CloudFormation | **T3** | Bare resume label plus a Rebus mention `[RESUME]`; in practice superseded by his CDK usage (CDK synthesises CloudFormation) — group it under IaC rather than listing it separately |
| Linux | **T3** | Resume summary `[RESUME]`; no artefact-level evidence |
| Security hardening | **T3** | "security" in the summary, Key Vault and secure architectures `[RESUME]`; OIDC-over-secrets and `bcrypt`/`jose` in the CDK template `[GITHUB]`. Site copy for Riwin/Marea Verde makes security claims but those are **the products'** claims, not audits. |
| Performance optimization | **T3** | Resume summary `[RESUME]`; verified artefacts of the practice in Marea Verde — preloaded `woff2` subsets, a pre-paint theme script to prevent FOUC `[FETCHED]` — though authorship there is pending Q5 |
| Control Systems | **T4** | Bare resume label `[RESUME]`. Ambiguous (industrial control? version control? access control?) and unsupported. **Recommend dropping it from the site.** |

### 6.9 `data` — Databases & Data / Bases de datos y datos

| Skill | Tier | Evidence |
| --- | --- | --- |
| PostgreSQL | **T1** | Resume summary, plus Azure Database for PostgreSQL and AWS RDS `[RESUME]`; `next-stack` on PostgreSQL 17 via Drizzle + `pg`, `express-hexagonal` via `@sequelize/postgres`, the CDK template via SQLAlchemy + Alembic `[GITHUB]` |
| Relational data modelling | **T1** | "Designed database architecture" at Lukiao `[RESUME]`; "Database design & integration" `[RESUME]`; schema/migration tooling in three templates `[GITHUB]` |
| ORMs & migrations | **T2** | Drizzle ORM + `drizzle-kit` (`next-stack`), Sequelize (`express-hexagonal`), SQLAlchemy + Alembic (CDK template) — three ecosystems `[GITHUB]` |
| DynamoDB | **T2** | Session store validated by the Lambda Authorizer, a dedicated CDK stack, and DynamoDB repositories in the shared layer `[GITHUB]`; Azure Cosmos DB (the analogous document store) at Rebus `[RESUME]` |
| MongoDB | **T3** | Named in the resume summary only `[RESUME]`; no repository or artefact uses it |
| Azure SQL Database · Azure Cosmos DB | **T3** | Named at Rebus `[RESUME]`; not externally verifiable |
| Object storage (S3) | **T2** | Verified S3 origins for PhenoScience legal documents, Lukiao/Novapp onboarding videos and the TALENTÜ site `[BUNDLE]` `[FETCHED]`; an S3 stack and repository in the CDK template `[GITHUB]` |

### 6.10 `practices` — Practices & Architecture / Prácticas y arquitectura

| Skill | Tier | Evidence |
| --- | --- | --- |
| Software architecture design | **T1** | "Software architecture design" `[RESUME]`; "applying robust architectural principles and strict engineering standards" at DevInMotion `[RESUME]`; hexagonal ports-and-adapters in `express-hexagonal`, one-way dependency rule in `next-stack`, domain-driven modules in the Expo template `[GITHUB]` |
| Modular / domain-driven structure | **T1** | The explicit organising rule of three separate templates `[GITHUB]` |
| Technical SEO & structured data | **T2** | `next-stack` generates canonical URLs, a full `hreflang` set with `x-default`, sitemap, robots, OG images and JSON-LD from one source of truth `[GITHUB]`; Marea Verde ships a seven-child sitemap index and complete head metadata `[FETCHED]` (authorship pending Q5) |
| Internationalization | **T2** | `next-stack` ships `en`/`es` in the URL for both UI and content, with a missing translation as a compile error `[GITHUB]`; Marea Verde ships `es-ES`/`en` with correct `hreflang` `[FETCHED]` |
| Testing | **T2** | "Ensured frontend quality through comprehensive testing" at Rebus `[RESUME]`; Vitest + Testing Library + Playwright wired in `next-stack` `[GITHUB]`. **No test suite is visible in the other four templates** — do not claim broad test coverage. See Q15. |
| Git & code review | **T2** | "Git proficiency", "Code review" `[RESUME]`; 20 public repositories `[GITHUB]` |
| Spec-Driven Development | **T2** | See §6.7 |
| Accessibility | **T3** | "User experience design" `[RESUME]`; localized `aria-label`s on interactive widgets in Marea Verde `[BUNDLE]` (authorship pending Q5). No WCAG conformance claim is supported — **do not publish one**. |
| Agile methodologies · Project management | **T3** | Bare resume labels, but supported in substance by the founder role's "key administrative responsibilities" `[RESUME]` |
| Ecommerce development | **T3** | Bare resume label `[RESUME]`, corroborated in substance by Riwin (bookstore + raffles, Openpay) `[BUNDLE]` and Marea Verde (catalogue, cart, Stripe) `[FETCHED]`, though the latter's attribution is pending Q5 |
| Regulatory compliance (Colombian) | **T3** | Ley 1581 de 2012 data-processing authorisation, Ley 1755 de 2015 PQRS deadlines and Colombian ID types shipped in ClinPsia `[BUNDLE]`; EU age-gating and granular cookie consent in Marea Verde `[FETCHED]`. Real, unusual and worth a line — scoped as **product-level** compliance implementation, not legal expertise. |
| Technical writing / documentation | **T2** | `docs/structure.md` and `docs/cookbook.md` in `next-stack`, a six-page typed-data docs module, a documented rename checklist and SSM contract in the CDK template `[GITHUB]`. Counter-evidence: `vite-stack`'s readme is still the stock Vite text and three repos have no description `[GITHUB]` — see Q12. |

### 6.11 Suggested display order on `/about`

`frontend` → `backend` → `cloud` → `ai` → `data` → `languages` → `practices`.

Rationale: lead with the two areas carrying the most T1 entries and the most independent
verification (frontend, backend), follow immediately with `cloud` because "DevOps Specialist" is in
the headline and must be substantiated early, then `ai` (headline claim, T2 ceiling — it needs the
credibility the preceding sections build), then the supporting categories. Render T1 and T2
prominently; put T3 in a quieter "also works with" row; **handle T4 per the rule in §6.2.**

---

## 7. AI-search / GEO-AEO specification

This section is a hard requirement of the project, not a nice-to-have. The goal is that an AI answer
engine — ChatGPT Search, Claude, Perplexity, Google AI Overviews — can answer a question about
Julian Ortiz Alviar **correctly, and with attribution to this site**, without a human ever visiting
it. Everything below is meant to be copy-pasteable.

Three terms, used consistently: **SEO** (rank in a list of links), **AEO** (be the extracted answer
to a question), **GEO** (be the cited source inside a generated answer). The tactics differ: SEO
wants keywords and links, AEO wants self-contained question-shaped content, GEO wants machine-readable
entities and stable, quotable claims.

### 7.1 The JSON-LD graph to emit

#### 7.1.0 Two blocking implementation notes — read first

**(1) `src/shared/lib/json-ld.tsx` must be widened.** It currently exports exactly four helpers —
`organizationJsonLd()`, `websiteJsonLd()`, `articleJsonLd()`, `breadcrumbJsonLd()` — and, critically,
its `JsonLd` component prop type is a **closed union**:

```tsx
// src/shared/lib/json-ld.tsx — AS IT EXISTS TODAY
export function JsonLd({ data }: { data: WithContext<Article | BreadcrumbList | Organization | WebSite> }) { … }
```

None of `Person`, `ProfilePage`, `SoftwareApplication`, `WebApplication`, `CreativeWork`, `ItemList`,
`FAQPage`, `CollectionPage` or `Graph` is assignable to that union, so **every type this section
requires will fail to typecheck until the union is widened.** Do it once, in that file:

```tsx
import type {
  Article, BreadcrumbList, CollectionPage, CreativeWork, FAQPage, Graph, ItemList,
  Organization, Person, ProfilePage, SoftwareApplication, WebApplication, WebSite, WithContext,
} from 'schema-dts'

type PortfolioSchema =
  | Article | BreadcrumbList | CollectionPage | CreativeWork | FAQPage | ItemList
  | Organization | Person | ProfilePage | SoftwareApplication | WebApplication | WebSite

export function JsonLd({ data }: { data: WithContext<PortfolioSchema> | Graph }) { … }
```

Keep the existing body unchanged — it already renders from a server component (zero client JS,
present in the initial HTML for crawlers) and already escapes every `<` as a `<` unicode
escape, which closes the `</script>` injection hole. Add the new builders as sibling exported functions in the same file, so
there stays exactly one place where structured data is constructed.

**(2) `schema-dts` is already a dependency.** It is in `devDependencies` at `^1.1.5`. Nothing needs
installing — but note it is a **types-only** package, so `devDependencies` is correct and must not be
"fixed" by moving it. Build every object below as a typed `WithContext<T>` so a typo in a property
name is a compile error rather than a silently ignored key.

**Emission rules.**
- Every block is rendered **server-side** in the initial HTML. Never inject structured data from a
  client effect — several AI crawlers do not execute JavaScript.
- Every `url`, `@id` and `sameAs` value derives from `siteConfig.url` (which derives from
  `NEXT_PUBLIC_APP_URL`). **No hardcoded origins.** `{{SITE_URL}}` below marks every such
  interpolation.
- Use a single `@graph` per page where several entities co-occur, with `@id` cross-references, rather
  than several disconnected `<script>` blocks. One graph lets an engine resolve "the Person who
  authored this SoftwareApplication" without guessing.
- Stable `@id` scheme, used verbatim: `{{SITE_URL}}/#person`, `{{SITE_URL}}/#website`,
  `{{SITE_URL}}/{locale}/projects/{slug}#project`, `{{SITE_URL}}/#org-{slug}`.
- `{{EMAIL}}` = **`jdavidortizy2k@gmail.com`** — resolved, see §9 Q2.

#### 7.1.1 `Person` — the root entity

Emitted on **every** page (in the root `[locale]` layout) as the anchor of the graph. This is the
single most important block on the site: it is what an engine resolves "Who is Julian Ortiz Alviar?"
against.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "{{SITE_URL}}/#person",
  "name": "Julian David Ortiz Alviar",
  "alternateName": ["Julian Ortiz Alviar", "Julian Ortiz", "Jdavid0610"],
  "givenName": "Julian David",
  "familyName": "Ortiz Alviar",
  "jobTitle": ["Senior FullStack Developer", "DevOps Specialist", "AI Engineer"],
  "description": "Senior FullStack Developer, DevOps Specialist and AI Engineer based in Cali, Colombia. Co-founder of PhenoScience since July 2023.",
  "url": "{{SITE_URL}}/en",
  "mainEntityOfPage": { "@id": "{{SITE_URL}}/en/about#page" },
  "image": "{{SITE_URL}}/en/opengraph-image",
  "email": "mailto:jdavidortizy2k@gmail.com",
  "telephone": "+573164344625",
  "knowsLanguage": [
    { "@type": "Language", "name": "Spanish", "alternateName": "es" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cali",
    "addressRegion": "Valle del Cauca",
    "addressCountry": "CO"
  },
  "nationality": { "@type": "Country", "name": "Colombia" },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Universidad Santiago de Cali",
    "address": { "@type": "PostalAddress", "addressLocality": "Cali", "addressCountry": "CO" }
  },
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "degree",
    "educationalLevel": "Bachelor",
    "name": "Systems Engineering",
    "recognizedBy": { "@type": "CollegeOrUniversity", "name": "Universidad Santiago de Cali" }
  },
  "worksFor": { "@id": "{{SITE_URL}}/#org-phenoscience" },
  "jobTitle_note": "REMOVE THIS KEY — see note below on non-schema keys",
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Senior FullStack Developer",
    "occupationLocation": { "@type": "City", "name": "Cali, Colombia" },
    "skills": "TypeScript, React, Next.js, Node.js, Python, PostgreSQL, AWS, Microsoft Azure, Terraform, CI/CD, LLM integration"
  },
  "knowsAbout": [
    "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python", "FastAPI",
    "React Native", "Expo", "Vite", "Zod", "TanStack Query", "Tailwind CSS",
    "PostgreSQL", "Drizzle ORM", "SQLAlchemy", "DynamoDB", "REST API design",
    "Amazon Web Services", "AWS Lambda", "AWS CDK", "Amazon CloudFront", "Amazon S3",
    "Microsoft Azure", "Azure DevOps", "Terraform", "CI/CD", "Docker",
    "Serverless architecture", "Hexagonal architecture", "Technical SEO",
    "Internationalization", "LLM integration", "Spec-Driven Development"
  ],
  "sameAs": [
    "https://www.linkedin.com/in/julian-ortiz-alviar",
    "https://github.com/Jdavid0610",
    "https://phenoscience.com.co",
    "https://clinpsia.com"
  ]
}
```

> **Notes the developer must act on.**
> 1. **Delete the `jobTitle_note` key** — it is an annotation, not schema. It is present only to flag
>    the next point.
> 2. `jobTitle` as an **array** is valid (schema.org properties accept multiple values) and is
>    preferred here, because the three titles are the positioning. If a validator complains, emit
>    the array anyway — it is `Text` repeated, not a violation.
> 3. `knowsAbout` is drawn **only from T1/T2 skills in section 6**. Do not add T3, and never add T4 —
>    no `Angular`, no `PWAs`, no `CMS`, no `Control Systems`, no `Java`. `knowsAbout` is the property
>    an engine quotes when asked "what does he know?", so it must be the defensible list.
> 4. `knowsLanguage` for English is `[UNVERIFIED]` at the proficiency level (section 1.1). Naming the
>    language is safe; **do not add a `proficiencyLevel`.**
> 5. Keep `sameAs` **byte-identical to section 2's array.** Two divergent `sameAs` lists on one site
>    is an entity-resolution bug.

#### 7.1.2 `ProfilePage` + `WebSite` — the site frame

`ProfilePage` on `/{locale}/about` (and, optionally, on the home page — `ProfilePage` is the correct
type for a page *about a person*, which a personal portfolio home page is):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "{{SITE_URL}}/en/about#page",
      "url": "{{SITE_URL}}/en/about",
      "name": "About Julian Ortiz Alviar",
      "inLanguage": "en-US",
      "isPartOf": { "@id": "{{SITE_URL}}/#website" },
      "mainEntity": { "@id": "{{SITE_URL}}/#person" },
      "about": { "@id": "{{SITE_URL}}/#person" },
      "dateModified": "2026-09-10",
      "breadcrumb": { "@id": "{{SITE_URL}}/en/about#breadcrumb" }
    },
    {
      "@type": "WebSite",
      "@id": "{{SITE_URL}}/#website",
      "url": "{{SITE_URL}}/en",
      "name": "Julian Ortiz Alviar",
      "alternateName": "Julian Ortiz Alviar — Senior FullStack Developer",
      "description": "Portfolio of Julian David Ortiz Alviar, Senior FullStack Developer, DevOps Specialist and AI Engineer based in Cali, Colombia.",
      "inLanguage": ["en-US", "es-CO"],
      "publisher": { "@id": "{{SITE_URL}}/#person" },
      "author": { "@id": "{{SITE_URL}}/#person" },
      "copyrightHolder": { "@id": "{{SITE_URL}}/#person" }
    }
  ]
}
```

> Note the existing `websiteJsonLd(locale)` helper emits `name: siteConfig.name` and a
> template-flavoured description. **It must be repointed at the portfolio's own values and given a
> `publisher`/`author` reference to `#person`** — a personal site whose `WebSite` has no author is a
> missed connection.
>
> **Do not add `SearchAction`/`potentialAction`** unless the site actually ships a working
> `/search?q=` route. Declaring a search box that does not exist is a false claim an engine can and
> will test.

#### 7.1.3 `Organization` — one per venture

Emitted in the graph of each relevant project page, and referenced from `Person.worksFor` /
`Person.founder`-side relations. Four organizations are supportable.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "{{SITE_URL}}/#org-phenoscience",
  "name": "PhenoScience",
  "url": "https://phenoscience.com.co",
  "description": "Colombian mental-health company whose platform pairs on-demand counselling with self-guided wellbeing content. Parent company of ClinPsia.",
  "foundingDate": "2023-07",
  "founder": { "@id": "{{SITE_URL}}/#person" },
  "employee": { "@id": "{{SITE_URL}}/#person" },
  "address": { "@type": "PostalAddress", "addressLocality": "Cali", "addressRegion": "Valle del Cauca", "addressCountry": "CO" },
  "sameAs": ["https://phenoscience.com.co"],
  "subOrganization": { "@id": "{{SITE_URL}}/#org-clinpsia" }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "{{SITE_URL}}/#org-talentu",
  "name": "TALENTÜ",
  "url": "https://www.xn--talent-8ya.com",
  "description": "Football scouting platform where players upload match video, receive analyst feedback and reach verified scouts. Available in Latin America, Spain and sub-Saharan Africa.",
  "founder": { "@id": "{{SITE_URL}}/#person" },
  "areaServed": [
    { "@type": "Place", "name": "Latin America" },
    { "@type": "Country", "name": "Spain" },
    { "@type": "Place", "name": "Sub-Saharan Africa" }
  ],
  "sameAs": ["https://www.xn--talent-8ya.com"]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "{{SITE_URL}}/#org-riwin",
  "name": "Riwin",
  "url": "https://riwin.com.co",
  "description": "Colombian publishing house selling researched travel guides, where each book purchase also earns entries into prize draws.",
  "founder": { "@id": "{{SITE_URL}}/#person" },
  "address": { "@type": "PostalAddress", "addressCountry": "CO" },
  "sameAs": ["https://riwin.com.co"]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "{{SITE_URL}}/#org-clinpsia",
  "name": "ClinPsia",
  "url": "https://clinpsia.com",
  "description": "All-in-one clinical platform for clinical psychologists, and a product of PhenoScience.",
  "parentOrganization": { "@id": "{{SITE_URL}}/#org-phenoscience" },
  "sameAs": ["https://clinpsia.com"]
}
```

> **Attribution guards.** Emit `founder: #person` **only** where the founder claim is safe:
> PhenoScience `[RESUME]`, Riwin `[USER]`. For **TALENTÜ**, the live site credits Julián González as
> founder (§4.6) — either omit `founder` or model him explicitly and give Julian Ortiz a
> `member`/`employee` relation instead; do not silently claim sole founding. **Emit no `Organization`
> for Marea Verde, BTi Group, Lukiao, Novapp, Rebus Technology, DevInMotion or Fory App** as
> entities *he founded* — the first is unattributed (Q5) and the rest are third parties. Third-party
> employers belong in `Person`'s work history prose and in the experience page, not as owned orgs.

#### 7.1.4 `SoftwareApplication` / `WebApplication` / `CreativeWork` — one per project

**Type-selection rule, apply it mechanically:**

| Project | Type | Why |
| --- | --- | --- |
| `herbafit` | `MobileApplication` (a subtype of `SoftwareApplication`) | A distributed Android app with a store listing, a rating and an install count |
| `phenoscience`, `clinpsia`, `lukiao-novapp`, `talentu`, `riwin`, `mareaverde` | `WebApplication` | Browser-delivered applications with accounts and server state |
| The five templates (§5) | `SoftwareSourceCode` | Source repositories, not running products — `SoftwareSourceCode` carries `codeRepository` and `programmingLanguage`, which is exactly what they are |
| Blog posts | `Article` (existing `articleJsonLd()` helper) | Already implemented |

`WebApplication`, project detail page — ClinPsia as the worked example:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "{{SITE_URL}}/en/projects/clinpsia#project",
      "name": "ClinPsia",
      "url": "https://clinpsia.com",
      "applicationCategory": "HealthApplication",
      "applicationSubCategory": "Clinical practice management",
      "operatingSystem": "Web browser",
      "browserRequirements": "Requires JavaScript",
      "inLanguage": "es-CO",
      "description": "ClinPsia is an all-in-one clinical platform for clinical psychologists. It centralises patient records, in-person and video consultations, digitally signed informed consents, structured assessments with automatically calculated risk indicators, and a chronological audit trail of every change to a patient's file. ClinPsia is a product of PhenoScience.",
      "featureList": [
        "Patient management",
        "Centralised and secure clinical records",
        "In-person consultations and video calls",
        "Digitally signed informed consents",
        "Structured patient assessment with automatically calculated risk indicators",
        "Clinical traceability: a chronological log of every action, session and record change",
        "Courses and episodes for knowledge sharing",
        "Billing and payments"
      ],
      "publisher": { "@id": "{{SITE_URL}}/#org-phenoscience" },
      "isPartOf": { "@id": "{{SITE_URL}}/#org-phenoscience" },
      "contributor": { "@id": "{{SITE_URL}}/#person" },
      "mainEntityOfPage": { "@id": "{{SITE_URL}}/en/projects/clinpsia" },
      "offers": { "@type": "Offer", "description": "15-day free trial, no credit card required" }
    },
    { "@type": "BreadcrumbList", "@id": "{{SITE_URL}}/en/projects/clinpsia#breadcrumb", "itemListElement": [] }
  ]
}
```

`MobileApplication` for `herbafit` — every number here is from the Play Store's own JSON-LD (§4.4),
so `aggregateRating` is a **restatement of a verifiable third-party rating**, not a self-review:

```json
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "@id": "{{SITE_URL}}/en/projects/herbafit#project",
  "name": "HerbaFit",
  "url": "https://play.google.com/store/apps/details?id=com.herbalife.herbafit",
  "installUrl": "https://play.google.com/store/apps/details?id=com.herbalife.herbafit",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Android",
  "inLanguage": "es",
  "description": "HerbaFit is the official Herbalife fitness application for Android, published on Google Play by BTi Group. It provides a guided-training video library, body-metric tracking through a paired smart scale, and activity synchronisation from wearable devices.",
  "publisher": { "@type": "Organization", "name": "BTi Group" },
  "contributor": { "@id": "{{SITE_URL}}/#person" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.25", "ratingCount": "63", "bestRating": "5", "worstRating": "1" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "COP" }
}
```

> ⚠️ **`aggregateRating` guard.** Emit it **only** for `herbafit`, and only while the Play Store
> numbers still match (they will drift — re-check before launch, and consider dropping the property
> rather than shipping a stale rating). **Never** invent an `aggregateRating` for any other project.
> Fabricated review data is exactly the failure mode search engines penalise and answer engines
> propagate.

`SoftwareSourceCode` for a template — `next-stack` as the worked example:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "@id": "{{SITE_URL}}/en/open-source/next-stack#project",
  "name": "next-stack",
  "codeRepository": "https://github.com/Jdavid0610/next-stack",
  "url": "https://github.com/Jdavid0610/next-stack",
  "programmingLanguage": [
    { "@type": "ComputerLanguage", "name": "TypeScript" }
  ],
  "runtimePlatform": "Node.js",
  "codeSampleType": "template",
  "author": { "@id": "{{SITE_URL}}/#person" },
  "maintainer": { "@id": "{{SITE_URL}}/#person" },
  "dateCreated": "2026-09-10",
  "dateModified": "2026-09-10",
  "description": "next-stack is an open-source Next.js 16 template by Julian Ortiz Alviar that is also its own backend: server-rendered, SEO-complete, authenticated with role-based access, internationalised in English and Spanish, and organised so each feature lives in one folder. This portfolio site is built on next-stack.",
  "keywords": "Next.js, React, TypeScript, App Router, Drizzle ORM, PostgreSQL, better-auth, RBAC, i18n, SEO, template",
  "isAccessibleForFree": true
}
```

#### 7.1.5 `ItemList` — the projects and open-source indexes

Emitted on `/{locale}/projects` and `/{locale}/open-source`. This is the block that lets an engine
answer "what has Julian Ortiz built?" as a **complete list** rather than whichever page it happened
to crawl. Keep `numberOfItems` and the array in sync, and keep the order identical to the rendered
order.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "{{SITE_URL}}/en/projects#page",
      "url": "{{SITE_URL}}/en/projects",
      "name": "Projects by Julian Ortiz Alviar",
      "inLanguage": "en-US",
      "isPartOf": { "@id": "{{SITE_URL}}/#website" },
      "about": { "@id": "{{SITE_URL}}/#person" },
      "mainEntity": { "@id": "{{SITE_URL}}/en/projects#list" }
    },
    {
      "@type": "ItemList",
      "@id": "{{SITE_URL}}/en/projects#list",
      "name": "Projects built by Julian Ortiz Alviar",
      "itemListOrder": "https://schema.org/ItemListOrderDescending",
      "numberOfItems": 6,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "PhenoScience", "url": "{{SITE_URL}}/en/projects/phenoscience", "item": { "@id": "{{SITE_URL}}/en/projects/phenoscience#project" } },
        { "@type": "ListItem", "position": 2, "name": "ClinPsia", "url": "{{SITE_URL}}/en/projects/clinpsia", "item": { "@id": "{{SITE_URL}}/en/projects/clinpsia#project" } },
        { "@type": "ListItem", "position": 3, "name": "TALENTÜ", "url": "{{SITE_URL}}/en/projects/talentu", "item": { "@id": "{{SITE_URL}}/en/projects/talentu#project" } },
        { "@type": "ListItem", "position": 4, "name": "Riwin", "url": "{{SITE_URL}}/en/projects/riwin", "item": { "@id": "{{SITE_URL}}/en/projects/riwin#project" } },
        { "@type": "ListItem", "position": 5, "name": "Lukiao / Novapp", "url": "{{SITE_URL}}/en/projects/lukiao-novapp", "item": { "@id": "{{SITE_URL}}/en/projects/lukiao-novapp#project" } },
        { "@type": "ListItem", "position": 6, "name": "HerbaFit", "url": "{{SITE_URL}}/en/projects/herbafit", "item": { "@id": "{{SITE_URL}}/en/projects/herbafit#project" } }
      ]
    }
  ]
}
```

> `numberOfItems` is **6, not 7** — `mareaverde` is excluded pending Q5. If Q5 resolves in favour of
> publishing, add it at the appropriate position and bump the count. Keeping a count that disagrees
> with the array is worse than omitting the property.

#### 7.1.6 `BreadcrumbList` — every non-home page

The existing `breadcrumbJsonLd(items)` helper is already correct; it just needs calling on every
route with a parent, and its output folded into the page's `@graph` with an `@id` so
`WebPage.breadcrumb` can reference it.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "{{SITE_URL}}/en/projects/clinpsia#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "{{SITE_URL}}/en" },
    { "@type": "ListItem", "position": 2, "name": "Projects", "item": "{{SITE_URL}}/en/projects" },
    { "@type": "ListItem", "position": 3, "name": "ClinPsia", "item": "{{SITE_URL}}/en/projects/clinpsia" }
  ]
}
```

Breadcrumb name translations: `Home`/`Inicio`, `Projects`/`Proyectos`, `Open source`/`Código abierto`,
`Experience`/`Experiencia`, `About`/`Sobre mí`, `Contact`/`Contacto`, `Blog`/`Blog`.

#### 7.1.7 `FAQPage` — the AEO payload

Emitted **once**, on `/{locale}/faq` (or on `/{locale}/about` if the FAQ is a section there rather
than its own route — pick one and only one; two `FAQPage` blocks on one site is a duplication
signal). Its content is §7.2 verbatim, and the rendered HTML must contain the same text as the
JSON-LD — mismatched structured data and visible content is a policy violation, not just a bad idea.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "{{SITE_URL}}/en/faq#faq",
  "inLanguage": "en-US",
  "about": { "@id": "{{SITE_URL}}/#person" },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is Julian Ortiz Alviar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Julian David Ortiz Alviar is a Senior FullStack Developer, DevOps Specialist and AI Engineer based in Cali, Valle del Cauca, Colombia, who works remotely. He has been a co-founder of PhenoScience since July 2023, where he leads the frontend team and owns the platform's DevOps. He holds a Systems Engineering degree from Universidad Santiago de Cali."
      }
    }
  ]
}
```

Repeat the `Question`/`acceptedAnswer` shape for **every** pair in §7.2, in the same order, with the
Spanish set on the `es` route and `inLanguage: "es-CO"`.

### 7.2 The 20 questions this site must be able to answer

These are the AEO backbone. Each answer is **2–3 sentences, self-contained** (it makes sense quoted
with no surrounding context), **names the entity instead of using a pronoun**, and **states dates
explicitly**. They serve three purposes at once: the `FAQPage` JSON-LD payload (§7.1.7), the visible
FAQ content, and a copy-tone reference for the rest of the site.

Ship them in this order. Q1–Q3 are identity (highest-value, most-asked); Q4–Q13 are entity/project
resolution; Q14–Q20 are capability and contact.

| # | Question EN | Answer EN |
| --- | --- | --- |
| 1 | Who is Julian Ortiz Alviar? | Julian David Ortiz Alviar is a Senior FullStack Developer, DevOps Specialist and AI Engineer based in Cali, Valle del Cauca, Colombia, working remotely. Julian Ortiz Alviar has been a co-founder of PhenoScience since July 2023, where he leads the frontend team and owns the platform's DevOps. He holds a Systems Engineering degree from Universidad Santiago de Cali, completed in June 2022. |
| 2 | What does Julian Ortiz Alviar do? | Julian Ortiz Alviar builds and ships software end to end: architecture, frontend, backend services, database design, LLM integration, testing and production deployment. He works primarily in TypeScript, React, Next.js, Node.js and Python, over PostgreSQL, and deploys to Amazon Web Services and Microsoft Azure. |
| 3 | Where is Julian Ortiz Alviar based, and is he available for remote work? | Julian Ortiz Alviar is based in Cali, Valle del Cauca, Colombia. He works remotely, and his three most recent roles — Co-Founder at PhenoScience, DevOps Specialist at Rebus Technology and Software Engineer at DevInMotion — were all remote positions. |
| 4 | Who built ClinPsia? | ClinPsia is built by PhenoScience, the Colombian mental-health company that Julian Ortiz Alviar co-founded in July 2023. Julian Ortiz Alviar leads the frontend team that builds ClinPsia and set the engineering standards it is built on. |
| 5 | What is ClinPsia? | ClinPsia is an all-in-one clinical platform for clinical psychologists, and a product of PhenoScience. ClinPsia centralises patient records, in-person and video consultations, digitally signed informed consents, structured assessments with automatically calculated risk indicators, and a chronological audit trail of every change to a patient's file. |
| 6 | What is PhenoScience? | PhenoScience is a Colombian mental-health company co-founded by Julian Ortiz Alviar in July 2023. Its platform pairs on-demand counselling and appointment booking with mental-health specialists against self-guided wellbeing content and daily reminders, and PhenoScience is also the parent company of the clinician-facing platform ClinPsia. |
| 7 | Who built the Lukiao credit simulator? | Julian Ortiz Alviar built the credit simulator at Lukiao, the Colombian consumer-credit fintech where he worked as a Full Stack Developer from October 2021 to November 2022. The simulator is still running inside Novapp, the rebranded product, where it appears as a tracked stage in the credit application funnel. |
| 8 | Is Novapp the same product as Lukiao? | Novapp is the rebrand of Lukiao, the Colombian consumer-credit fintech. Julian Ortiz Alviar did not work on the rebranding, but much of what he built at Lukiao between October 2021 and November 2022 is still running inside Novapp, including the credit simulator. |
| 9 | What open-source starter templates does Julian Ortiz Alviar maintain? | Julian Ortiz Alviar maintains five public starter templates on GitHub under the handle Jdavid0610: `next-stack` (Next.js 16 full-stack), `vite-stack` (React and Vite single-page app), `react-native-expo-stack` (React Native with Expo), `fastapi-lambda-cdk-template` (Python serverless on AWS) and `express-hexagonal` (Express with hexagonal architecture). Together they cover one template per delivery target: web app, single-page client, mobile app, serverless backend and Node backend. |
| 10 | What is next-stack? | `next-stack` is an open-source Next.js 16 template by Julian Ortiz Alviar that is also its own backend: server-rendered, SEO-complete, authenticated with role-based access, internationalised in English and Spanish, and organised so each feature lives in one folder. It uses Drizzle ORM over PostgreSQL, better-auth for sessions and roles, TanStack Query, Zod and Tailwind CSS 4, and it runs with no database at all in mock mode. The portfolio site at {{SITE_URL}} is itself built on `next-stack`. |
| 11 | Who built HerbaFit, the Herbalife app? | HerbaFit is the official Herbalife fitness app for Android, published on Google Play by BTi Group, and Julian Ortiz Alviar worked on it during his time at BTI. HerbaFit offers a guided-training video library, body-metric tracking through a paired smart scale, and activity synchronisation from wearable devices, and has passed 10,000 installs. |
| 12 | What is TALENTÜ? | TALENTÜ is a football scouting platform where players upload match video, receive detailed technical feedback from real coaches and analysts, and are discovered by verified scouts and academy representatives. TALENTÜ operates in Latin America, Spain and sub-Saharan Africa; it was founded by sports scientist Julián González, and Julian Ortiz Alviar is a technical co-founder. |
| 13 | What is Riwin? | Riwin is a Colombian publishing house co-founded by Julian Ortiz Alviar that sells researched travel guides through an online bookstore. Every book purchase at Riwin also earns entries into prize draws, and payments run through Openpay with a device-fingerprint anti-fraud step. |
| 14 | What technologies does Julian Ortiz Alviar use? | Julian Ortiz Alviar works primarily in TypeScript and JavaScript on the frontend with React, Next.js, Vite, Zod, TanStack Query and Tailwind CSS, and in Node.js and Python on the backend with Express and FastAPI. On data he uses PostgreSQL with Drizzle ORM, SQLAlchemy and Sequelize, plus DynamoDB. For mobile he uses React Native with Expo. |
| 15 | What cloud platforms and DevOps tools does Julian Ortiz Alviar work with? | Julian Ortiz Alviar works across Amazon Web Services and Microsoft Azure. On AWS he uses Lambda, API Gateway, RDS, S3, CloudFront, CodePipeline, CloudFormation, Amplify and the AWS CDK; on Azure he uses Azure DevOps, Static Web Apps, Azure SQL Database, Azure Database for PostgreSQL, Cosmos DB and Key Vault. He also works with Terraform, Docker, Linux and CI/CD pipelines including GitHub Actions with OIDC. |
| 16 | How many years of experience does Julian Ortiz Alviar have? | Julian Ortiz Alviar has worked professionally as a software developer since July 2020, starting as a Full Stack Developer at Fory App in Cali, Colombia. Since then he has been a Full Stack Developer at the fintech Lukiao, a Software Engineer at DevInMotion, a DevOps Specialist at Rebus Technology, and co-founder of PhenoScience since July 2023. |
| 17 | Where did Julian Ortiz Alviar study? | Julian Ortiz Alviar studied Systems Engineering at Universidad Santiago de Cali in Cali, Colombia, from August 2017 to June 2022. |
| 18 | How can I contact Julian Ortiz Alviar? | Julian Ortiz Alviar can be reached by email at jdavidortizy2k@gmail.com or by phone at +57 316 434 4625. He is also on LinkedIn at linkedin.com/in/julian-ortiz-alviar and on GitHub as Jdavid0610. |
| 19 | Does Julian Ortiz Alviar work with AI and large language models? | Yes. At PhenoScience, Julian Ortiz Alviar implemented LLM-based capabilities designed to cover the gaps where a psychologist cannot provide immediate or continuous support. He also introduced Spec-Driven Development to the team, designing modular "skills" and assigning them to agents so that system behaviour is structured, reliable and extensible. |
| 20 | What is the difference between Julian Ortiz Alviar's five starter templates? | Each of Julian Ortiz Alviar's five templates targets a different delivery shape. `next-stack` is a full-stack Next.js 16 application with its own backend, auth and i18n; `vite-stack` is a React and Vite single-page client for when a server is not needed; `react-native-expo-stack` is a React Native and Expo mobile app; `fastapi-lambda-cdk-template` is a Python serverless backend on AWS Lambda, API Gateway and CDK; and `express-hexagonal` is a Node and Express REST backend built to ports-and-adapters. |

**ES (es-CO) — same order, same numbering.** Natural Spanish, not translated-sounding: Spanish
copy keeps `Julian Ortiz Alviar` and product names unchanged, since entity names must not be
localised.

| # | Pregunta ES | Respuesta ES |
| --- | --- | --- |
| 1 | ¿Quién es Julian Ortiz Alviar? | Julian David Ortiz Alviar es desarrollador FullStack Senior, especialista en DevOps e ingeniero de IA. Vive en Cali, Valle del Cauca, Colombia, y trabaja de forma remota. Julian Ortiz Alviar es cofundador de PhenoScience desde julio de 2023, donde lidera el equipo de frontend y responde por el DevOps de la plataforma. Es ingeniero de sistemas de la Universidad Santiago de Cali, título terminado en junio de 2022. |
| 2 | ¿A qué se dedica Julian Ortiz Alviar? | Julian Ortiz Alviar construye y entrega software de punta a punta: arquitectura, frontend, servicios de backend, diseño de bases de datos, integración de LLM, pruebas y despliegue a producción. Trabaja principalmente con TypeScript, React, Next.js, Node.js y Python, sobre PostgreSQL, y despliega en Amazon Web Services y Microsoft Azure. |
| 3 | ¿Dónde vive Julian Ortiz Alviar y trabaja de forma remota? | Julian Ortiz Alviar vive en Cali, Valle del Cauca, Colombia. Trabaja de forma remota, y sus tres roles más recientes — cofundador en PhenoScience, especialista DevOps en Rebus Technology e ingeniero de software en DevInMotion — fueron todos remotos. |
| 4 | ¿Quién construye ClinPsia? | ClinPsia la construye PhenoScience, la empresa colombiana de salud mental que Julian Ortiz Alviar cofundó en julio de 2023. Julian Ortiz Alviar lidera el equipo de frontend que construye ClinPsia y definió los estándares de ingeniería sobre los que está hecha. |
| 5 | ¿Qué es ClinPsia? | ClinPsia es la plataforma clínica todo-en-uno para psicólogos clínicos, y es un producto de PhenoScience. ClinPsia centraliza las historias clínicas, las consultas presenciales y por videollamada, los consentimientos informados firmados digitalmente, las evaluaciones estructuradas con indicadores de riesgo calculados automáticamente, y el registro cronológico de cada cambio en el expediente del paciente. |
| 6 | ¿Qué es PhenoScience? | PhenoScience es una empresa colombiana de salud mental que Julian Ortiz Alviar cofundó en julio de 2023. Su plataforma combina consejería a demanda y agendamiento con especialistas en salud mental con contenido de bienestar autoguiado y recordatorios diarios, y PhenoScience es además la empresa detrás de ClinPsia, la plataforma para psicólogos. |
| 7 | ¿Quién construyó el simulador de crédito de Lukiao? | Julian Ortiz Alviar construyó el simulador de crédito en Lukiao, la fintech colombiana de crédito de consumo donde trabajó como desarrollador full-stack entre octubre de 2021 y noviembre de 2022. El simulador sigue funcionando dentro de Novapp, el producto rebautizado, donde aparece como una etapa registrada del embudo de solicitud de crédito. |
| 8 | ¿Novapp es el mismo producto que Lukiao? | Novapp es el rebranding de Lukiao, la fintech colombiana de crédito de consumo. Julian Ortiz Alviar no participó en ese rebranding, pero buena parte de lo que construyó en Lukiao entre octubre de 2021 y noviembre de 2022 sigue funcionando dentro de Novapp, incluido el simulador de crédito. |
| 9 | ¿Qué plantillas open source mantiene Julian Ortiz Alviar? | Julian Ortiz Alviar mantiene cinco plantillas públicas en GitHub bajo el usuario Jdavid0610: `next-stack` (Next.js 16 full-stack), `vite-stack` (SPA con React y Vite), `react-native-expo-stack` (React Native con Expo), `fastapi-lambda-cdk-template` (backend serverless en Python sobre AWS) y `express-hexagonal` (Express con arquitectura hexagonal). Entre las cinco cubren un objetivo de entrega distinto cada una: aplicación web, cliente de una página, app móvil, backend serverless y backend en Node. |
| 10 | ¿Qué es next-stack? | `next-stack` es una plantilla open source de Next.js 16 hecha por Julian Ortiz Alviar que además es su propio backend: renderizada en servidor, con SEO completo, autenticación con control de acceso por roles, internacionalización en inglés y español, y organizada para que cada feature viva en una sola carpeta. Usa Drizzle ORM sobre PostgreSQL, better-auth para sesiones y roles, TanStack Query, Zod y Tailwind CSS 4, y corre sin base de datos en modo mock. El portafolio en {{SITE_URL}} está construido sobre `next-stack`. |
| 11 | ¿Quién hizo HerbaFit, la app de Herbalife? | HerbaFit es la app oficial de fitness de Herbalife para Android, publicada en Google Play por BTi Group, y Julian Ortiz Alviar trabajó en ella durante su paso por BTI. HerbaFit ofrece una biblioteca de entrenamiento guiado en video, seguimiento de métricas corporales con báscula inteligente y sincronización de actividad desde dispositivos wearables, y superó las 10.000 instalaciones. |
| 12 | ¿Qué es TALENTÜ? | TALENTÜ es una plataforma de scouting de fútbol donde los jugadores suben video de partido, reciben retroalimentación técnica detallada de entrenadores y analistas reales, y son descubiertos por ojeadores y representantes de academias verificados. TALENTÜ opera en Latinoamérica, España y África subsahariana; fue fundada por el profesional en ciencias del deporte Julián González, y Julian Ortiz Alviar es cofundador técnico. |
| 13 | ¿Qué es Riwin? | Riwin es una editorial colombiana cofundada por Julian Ortiz Alviar que vende guías de viaje investigadas a través de una librería en línea. Cada compra de un libro en Riwin también otorga participaciones para sorteos, y los pagos corren por Openpay con un paso antifraude de huella de dispositivo. |
| 14 | ¿Qué tecnologías usa Julian Ortiz Alviar? | Julian Ortiz Alviar trabaja principalmente con TypeScript y JavaScript en el frontend, con React, Next.js, Vite, Zod, TanStack Query y Tailwind CSS, y con Node.js y Python en el backend, con Express y FastAPI. En datos usa PostgreSQL con Drizzle ORM, SQLAlchemy y Sequelize, además de DynamoDB. En móvil usa React Native con Expo. |
| 15 | ¿Con qué plataformas de nube y herramientas de DevOps trabaja Julian Ortiz Alviar? | Julian Ortiz Alviar trabaja en Amazon Web Services y Microsoft Azure. En AWS usa Lambda, API Gateway, RDS, S3, CloudFront, CodePipeline, CloudFormation, Amplify y el AWS CDK; en Azure usa Azure DevOps, Static Web Apps, Azure SQL Database, Azure Database for PostgreSQL, Cosmos DB y Key Vault. También trabaja con Terraform, Docker, Linux y pipelines de CI/CD, incluido GitHub Actions con OIDC. |
| 16 | ¿Cuántos años de experiencia tiene Julian Ortiz Alviar? | Julian Ortiz Alviar trabaja profesionalmente como desarrollador de software desde julio de 2020, cuando empezó como desarrollador full-stack en Fory App en Cali, Colombia. Desde entonces ha sido desarrollador full-stack en la fintech Lukiao, ingeniero de software en DevInMotion, especialista DevOps en Rebus Technology, y cofundador de PhenoScience desde julio de 2023. |
| 17 | ¿Dónde estudió Julian Ortiz Alviar? | Julian Ortiz Alviar estudió Ingeniería de Sistemas en la Universidad Santiago de Cali, en Cali, Colombia, entre agosto de 2017 y junio de 2022. |
| 18 | ¿Cómo contactar a Julian Ortiz Alviar? | A Julian Ortiz Alviar se le puede escribir al correo jdavidortizy2k@gmail.com o llamar al +57 316 434 4625. También está en LinkedIn como linkedin.com/in/julian-ortiz-alviar y en GitHub como Jdavid0610. |
| 19 | ¿Julian Ortiz Alviar trabaja con IA y modelos de lenguaje? | Sí. En PhenoScience, Julian Ortiz Alviar implementó capacidades basadas en LLM pensadas para cubrir los vacíos donde un psicólogo no puede dar soporte inmediato o continuo. También introdujo Spec-Driven Development en el equipo, diseñando "skills" modulares y asignándolas a agentes para que el comportamiento del sistema sea estructurado, confiable y extensible. |
| 20 | ¿Cuál es la diferencia entre las cinco plantillas de Julian Ortiz Alviar? | Cada una de las cinco plantillas de Julian Ortiz Alviar apunta a una forma de entrega distinta. `next-stack` es una aplicación full-stack de Next.js 16 con su propio backend, autenticación e i18n; `vite-stack` es un cliente de una sola página con React y Vite para cuando no hace falta servidor; `react-native-expo-stack` es una app móvil con React Native y Expo; `fastapi-lambda-cdk-template` es un backend serverless en Python sobre AWS Lambda, API Gateway y CDK; y `express-hexagonal` es un backend REST en Node y Express construido con puertos y adaptadores. |

> **Maintenance rule.** These 40 strings are the site's most-quoted text. When a fact changes (a new
> role, a rebrand, a template retired), **update the answer here and in the typed content in the same
> commit.** An answer engine that cached a stale answer will keep serving it long after the page
> changes, so drift is expensive.

### 7.3 `llms.txt` — content plan

`llms.txt` is a plain-text, Markdown-flavoured map of the site written for language models: a curated
index of what exists and where, so a model does not have to infer structure from HTML. It is a
convention, not a standard — treat it as cheap insurance rather than a guarantee.

#### 7.3.1 Implementation constraints — both are mandatory

1. **It must be a route handler in `src/app/`, not a file in `public/`.** Reason: it must interpolate
   `siteConfig.url` (which derives from `NEXT_PUBLIC_APP_URL`), and a static file in `public/` cannot.
   A hardcoded origin in `public/llms.txt` is exactly the mistake settled decision #1 exists to
   prevent.
2. **It must live outside `[locale]`.** `llms.txt` describes the whole site in one document, in both
   languages; it is not a localised page. Put it at `src/app/llms.txt/route.ts` — a sibling of
   `robots.ts` and `sitemap.ts`, which are already outside `[locale]` for the same reason. The
   resulting URL is `{{SITE_URL}}/llms.txt`, with **no locale prefix**. Verify the i18n
   redirect/proxy does not rewrite it into `/en/llms.txt`; if it does, add `llms.txt` (and
   `llms-full.txt`) to the middleware's exclusion list alongside `robots.txt` and `sitemap.xml`.

Shape of the handler:

```ts
// src/app/llms.txt/route.ts
export const dynamic = 'force-static'   // prerender it; it changes only when content changes

export function GET() {
  return new Response(body(), {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  })
}
```

Serve `text/plain; charset=utf-8` — **not** `text/markdown` — and keep `charset=utf-8` so `TALENTÜ`
and Spanish accents survive.

#### 7.3.2 `llms.txt` — exact content

Sections in this order. `{{SITE_URL}}` is interpolated at request time.

```markdown
# Julian David Ortiz Alviar

> Senior FullStack Developer, DevOps Specialist and AI Engineer based in Cali, Valle del Cauca,
> Colombia, working remotely. Co-founder of PhenoScience since July 2023. Builds products end to
> end — architecture, frontend, backend, database, deployment — in TypeScript, React, Next.js,
> Node.js and Python, on AWS and Azure.

This site is available in English at {{SITE_URL}}/en and in Spanish (es-CO) at {{SITE_URL}}/es.
Every page below exists in both languages; swap the `/en/` segment for `/es/`.

## Identity

- Name: Julian David Ortiz Alviar
- Titles: Senior FullStack Developer, DevOps Specialist, AI Engineer
- Location: Cali, Valle del Cauca, Colombia — remote worldwide
- Email: jdavidortizy2k@gmail.com
- Phone: +57 316 434 4625
- GitHub: https://github.com/Jdavid0610
- LinkedIn: https://www.linkedin.com/in/julian-ortiz-alviar
- Education: Systems Engineering, Universidad Santiago de Cali (August 2017 – June 2022)

## Start here

- [About Julian Ortiz Alviar]({{SITE_URL}}/en/about): full biography, skills grouped by domain, education.
- [FAQ]({{SITE_URL}}/en/faq): twenty direct questions and answers about who he is and what he has built.
- [Experience]({{SITE_URL}}/en/experience): five roles from July 2020 to the present, with dates and achievements.
- [Projects]({{SITE_URL}}/en/projects): products he has built, one page each.
- [Open source]({{SITE_URL}}/en/open-source): five public starter templates he authors and maintains.
- [Contact]({{SITE_URL}}/en/contact): email, phone and profiles.

## Experience

- Co-Founder, PhenoScience — July 2023 to present, remote. Leads the frontend team; implemented LLM-based capabilities; introduced Spec-Driven Development; owns CI/CD and Terraform infrastructure. [Details]({{SITE_URL}}/en/experience#phenoscience-cofounder)
- DevOps Specialist, Rebus Technology — October 2023 to July 2025, remote. Azure DevOps, Azure Static Web Apps, AWS Amplify; Azure cloud infrastructure and deployment workflows. [Details]({{SITE_URL}}/en/experience#rebus-technology-devops)
- Software Engineer, DevInMotion S.A.S — February 2023 to November 2023, remote. Integrations with multinational third-party platforms; monitoring and alerting. [Details]({{SITE_URL}}/en/experience#devinmotion-software-engineer)
- Full Stack Developer, Lukiao — October 2021 to November 2022, Cali, Colombia. Fintech microservices and REST APIs integrating banks, payment gateways and credit bureaus; built the credit simulator; Paymentez, Wompi and SOAP integrations. [Details]({{SITE_URL}}/en/experience#lukiao-fullstack)
- Full Stack Developer, Fory App — July 2020 to November 2021, Cali, Colombia. Web applications letting partner companies monitor their business performance. [Details]({{SITE_URL}}/en/experience#fory-app-fullstack)

## Projects

- [PhenoScience]({{SITE_URL}}/en/projects/phenoscience): mental-health platform pairing on-demand counselling with self-guided wellbeing content. Co-founder. Live at https://phenoscience.com.co
- [ClinPsia]({{SITE_URL}}/en/projects/clinpsia): all-in-one clinical platform for clinical psychologists — a product of PhenoScience. Live at https://clinpsia.com
- [TALENTÜ]({{SITE_URL}}/en/projects/talentu): football scouting platform; players upload video, analysts give feedback, verified scouts discover them. Technical co-founder. Live at https://www.xn--talent-8ya.com (displayed as talentü.com)
- [Riwin]({{SITE_URL}}/en/projects/riwin): travel-guide publishing house whose online bookstore turns each purchase into prize-draw entries. Co-founder. Live at https://riwin.com.co
- [Lukiao / Novapp]({{SITE_URL}}/en/projects/lukiao-novapp): Colombian consumer-credit fintech. Built the credit simulator, payment integrations and the mobile app at Lukiao; the work still runs inside the rebranded Novapp. Live at https://novapp.com.co
- [HerbaFit]({{SITE_URL}}/en/projects/herbafit): the official Herbalife fitness app for Android, published by BTi Group. Guided training, smart-scale tracking, wearable sync. https://play.google.com/store/apps/details?id=com.herbalife.herbafit

## Open-source templates

- [next-stack]({{SITE_URL}}/en/open-source/next-stack): Next.js 16 full-stack template — SSR, SEO, auth with RBAC, i18n. **This site is built on it.** https://github.com/Jdavid0610/next-stack
- [react-native-expo-stack]({{SITE_URL}}/en/open-source/react-native-expo-stack): React Native and Expo SDK 54 starter with domain-driven modules. https://github.com/Jdavid0610/react-native-expo-stack
- [vite-stack]({{SITE_URL}}/en/open-source/vite-stack): React 19 and Vite single-page app with an operation-addressed API layer. https://github.com/Jdavid0610/vite-stack
- [fastapi-lambda-cdk-template]({{SITE_URL}}/en/open-source/fastapi-lambda-cdk-template): Python serverless backend — FastAPI on AWS Lambda, API Gateway and CDK. https://github.com/Jdavid0610/fastapi-lambda-cdk-template
- [express-hexagonal]({{SITE_URL}}/en/open-source/express-hexagonal): Express and TypeScript REST backend built to hexagonal architecture. https://github.com/Jdavid0610/express-hexagonal

## Skills

- Languages: TypeScript, JavaScript, Python, SQL
- Frontend: React, Next.js, Vite, React Router, Zustand, Zod, TanStack Query, react-hook-form, Tailwind CSS, React Native with Expo
- Backend: Node.js, Express, FastAPI, REST API design, microservices, authentication and RBAC, payment-gateway integration
- Cloud and DevOps: AWS (Lambda, API Gateway, RDS, S3, CloudFront, CodePipeline, CloudFormation, Amplify, CDK), Microsoft Azure (Azure DevOps, Static Web Apps, Azure SQL, Cosmos DB, Key Vault), Terraform, Docker, Linux, CI/CD, GitHub Actions with OIDC
- Data: PostgreSQL, Drizzle ORM, SQLAlchemy, Sequelize, DynamoDB, Amazon S3
- AI: LLM integration, Spec-Driven Development with agent skills
- Practices: software architecture, hexagonal and domain-driven structure, technical SEO, internationalisation, testing with Vitest and Playwright

## Also available in Spanish

Every URL above works with `/es/` in place of `/en/`. The Spanish edition is written in es-CO.

## Optional

- [Blog]({{SITE_URL}}/en/blog): occasional writing on architecture, cloud and delivery.
- [Full text of every page]({{SITE_URL}}/llms-full.txt)
```

#### 7.3.3 `llms-full.txt` — optional, recommended

Same constraints (`src/app/llms-full.txt/route.ts`, outside `[locale]`, `force-static`, `text/plain`).
Where `llms.txt` is a map, `llms-full.txt` is the territory: the **complete prose of the site as plain
text**, so a model with one fetch has the whole corpus and never needs to render a page.

Generate it, do not hand-write it — the content already exists as typed data, so walk it:

1. Header: name, one-line bio, canonical URL, generation timestamp, "This document is generated from
   the same typed content that renders the site."
2. The full long bio, EN then ES (§1.4).
3. Contact block (§2).
4. Every experience entry: title, employer, ISO dates, location, all achievement bullets, technologies
   — EN then ES.
5. Every project entry: name, slug, role, status, URL, problem, what he built, tech stack, and the
   full 3-paragraph narrative — EN then ES.
6. Every template entry: repo, stack, what it includes, narrative — EN then ES.
7. The full skills taxonomy by category, **T1–T3 only** (never T4).
8. All 20 FAQ pairs, EN then ES.
9. Blog: title, date, description and full body of every published post.

Keep it under ~200 KB. If it grows past that, drop the blog bodies first (they have their own URLs),
then the ES narratives, and say in the header what was omitted.

### 7.4 `robots.txt` guidance

#### 7.4.1 First: the existing rules are now wrong for this site

`src/app/robots.ts` today emits:

```ts
disallow: ['/api/', '/*/dashboard', '/*/posts', '/*/settings', '/*/admin', '/*/sign-in', '/*/sign-up']
```

Under the settled scope decision (static portfolio; blog kept but converted to typed data; no
Postgres, no auth in production; dashboard/admin/settings/posts-CRUD/sign-in/sign-up **not part of
the public portfolio**), **those routes will not exist.** Consequences the developer must act on:

- **Delete `/*/dashboard`, `/*/posts`, `/*/settings`, `/*/admin`, `/*/sign-in`, `/*/sign-up`.**
  Disallowing paths that return 404 is not harmful, but it is a public list of surfaces that do not
  exist — misleading to a reader and to a crawler, and it invites probing.
- **Keep `/api/`** *only if* any route handler survives (e.g. a contact-form endpoint). If the final
  build has no `src/app/api/` at all, drop it too.
- ⚠️ **Do not add `llms.txt` or `llms-full.txt` to `disallow`.** They exist precisely to be fetched.
- Keep `sitemap` and `host`. Both are already correct and both derive from `siteConfig.url`.

#### 7.4.2 The fifteen AI user-agents, and what each one actually governs

The distinction that matters: a **training** token controls whether your content may be used to train
or improve a model — it has no effect on whether you appear in that assistant's answers today. A
**retrieval** token controls whether your content can be fetched, indexed or cited **at answer time**
— blocking one of these removes you from that engine's answers. For a portfolio, those two decisions
have opposite risk profiles.

| User-agent | Operator | Governs | Effect of blocking it |
| --- | --- | --- | --- |
| `GPTBot` | OpenAI | **Training** — bulk crawl used to train and improve OpenAI models | Content excluded from OpenAI training corpora. Does **not** remove you from ChatGPT search results. |
| `OAI-SearchBot` | OpenAI | **Answer-time retrieval** — builds the index behind ChatGPT search | **You disappear from ChatGPT search results and citations.** High cost. |
| `ChatGPT-User` | OpenAI | **Answer-time, user-triggered** — fetches a page because a user asked ChatGPT to look at it | A user who explicitly asks ChatGPT to read your page gets a fetch failure. Very high cost, near-zero benefit to blocking. |
| `ClaudeBot` | Anthropic | **Training** — bulk crawl for model training | Content excluded from Anthropic training data. |
| `Claude-User` | Anthropic | **Answer-time, user-triggered** — fetches a page on a Claude user's direct request | Same as `ChatGPT-User`: blocks a user who explicitly asked for your page. |
| `Claude-SearchBot` | Anthropic | **Answer-time retrieval** — indexes pages to support Claude's search results | You lose Claude search visibility and citations. |
| `anthropic-ai` | Anthropic | **Training** — legacy/deprecated token; kept for older tooling that still honours it | Belt-and-braces training exclusion. Harmless either way. |
| `PerplexityBot` | Perplexity | **Answer-time retrieval** — indexes pages so Perplexity can cite them | **You disappear from Perplexity answers.** Perplexity is the most citation-forward engine; this is the most expensive single block for GEO. |
| `Perplexity-User` | Perplexity | **Answer-time, user-triggered** — fetches a page a user pointed at | Blocks direct user-initiated reads. |
| `Google-Extended` | Google | **Training / grounding only** — *not a crawler*; a robots.txt control token stating whether Googlebot-crawled content may be used for Gemini training and grounding | Excludes you from Gemini training and grounding. **Does not affect Google Search ranking, and does not remove you from AI Overviews** — those use Googlebot, which this token does not control. |
| `Applebot-Extended` | Apple | **Training only** — *not a crawler*; states whether Applebot-crawled content may train Apple foundation models | Excludes you from Apple model training. **Does not affect Siri, Spotlight or Apple search**, which use `Applebot`. |
| `CCBot` | Common Crawl | **Training (indirect)** — Common Crawl is not an AI company, but its public corpus is one of the largest upstream training sources for many models | Removes you from the Common Crawl corpus, and therefore from an unknown number of downstream training sets. Also removes you from legitimate research use. |
| `Bytespider` | ByteDance | **Training** — bulk crawl associated with ByteDance model training | Training exclusion. This crawler has a reputation for high request volume and weak robots compliance, so blocking it is as much a bandwidth decision as a policy one. |
| `cohere-ai` | Cohere | **Training** — crawl for Cohere model training | Training exclusion. |
| `meta-externalagent` | Meta | **Training** — Meta's crawler for AI training and product improvement | Training exclusion. |

#### 7.4.3 Recommendation

**Recommended default: explicitly `Allow: /` for all fifteen.** Justification in one line: this site's
entire purpose is to make one person findable and quotable, so both channels are pure upside —
retrieval agents are the GEO mechanism the whole of section 7 exists to serve, and training inclusion
is free, durable distribution of a résumé that contains nothing confidential.

Two qualifiers, stated so the choice is informed rather than default:

- If bandwidth or crawl noise ever becomes a problem, the **only** tokens worth restricting are the
  training ones — and `Bytespider` and `CCBot` first, since they are the highest-volume and give the
  least attribution back. **Never restrict `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`,
  `ChatGPT-User`, `Claude-User` or `Perplexity-User`**; blocking those is a direct, self-inflicted
  loss of exactly the citations this site is optimised for.
- If the user's preference is "be answerable, don't be training data" — a coherent position — the
  policy is: allow all six retrieval tokens, disallow `GPTBot`, `ClaudeBot`, `anthropic-ai`,
  `Google-Extended`, `Applebot-Extended`, `CCBot`, `Bytespider`, `cohere-ai`,
  `meta-externalagent`. Note this is strictly worse for long-term visibility and should be a
  deliberate choice. Ask — see Q16.

Implementation, matching the recommended default:

```ts
// src/app/robots.ts
import type { MetadataRoute } from 'next'
import { siteConfig } from '@/shared/config/site'

/** Answer-time retrieval: these decide whether the site can be cited in AI answers. */
const AI_RETRIEVAL_AGENTS = [
  'OAI-SearchBot', 'ChatGPT-User',
  'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
]

/** Model training / grounding. Allowed by default: durable distribution, nothing confidential. */
const AI_TRAINING_AGENTS = [
  'GPTBot', 'ClaudeBot', 'anthropic-ai',
  'Google-Extended', 'Applebot-Extended',
  'CCBot', 'Bytespider', 'cohere-ai', 'meta-externalagent',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: [...AI_RETRIEVAL_AGENTS, ...AI_TRAINING_AGENTS], allow: '/' },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
```

Note that an explicit `Allow: /` per agent is functionally identical to `User-agent: *` for a site
with no disallow rules — its value is **documentary**: it states the policy in a file the user, and
anyone auditing the site, can read. Keep the two arrays named and commented exactly as above so the
training/retrieval distinction survives in the codebase and a future edit cannot blur it.

### 7.5 Per-page metadata table

Every title below is **≤ 60 characters** and every description **≤ 155 characters** — both verified
by measurement, not by eye. All of it goes through the existing `buildMetadata()` helper
(`src/shared/lib/seo.ts`), which already produces the canonical URL, the full `hreflang` set with
`x-default`, OpenGraph and Twitter cards. **Pass `title` and `description` per route; do not
hand-roll `<head>` tags.**

Conventions used in the table:
- **Primary entity** = the one thing the page is *about*. Exactly one per page. If a page has two,
  split it.
- The `Person` block (§7.1.1) is emitted in the root `[locale]` layout, so **it is present on every
  route** and is not repeated in the per-route JSON-LD column. Likewise `WebSite`.
- `WebPage`/`CollectionPage`/`ProfilePage` + `BreadcrumbList` are the frame; the listed types are the
  payload.

#### English routes

| Route | Title (≤60) | Description (≤155) | Primary entity | JSON-LD for this route |
| --- | --- | --- | --- | --- |
| `/en` | Julian Ortiz Alviar — FullStack Developer & DevOps | Senior FullStack Developer, DevOps Specialist and AI Engineer in Cali, Colombia. Co-founder of PhenoScience. Building products end to end since 2020. | `Person` | `ProfilePage`, `WebSite`, `Person` |
| `/en/about` | About Julian Ortiz Alviar | Biography, skills and education of Julian Ortiz Alviar: Senior FullStack Developer, DevOps Specialist and AI Engineer based in Cali, Colombia. | `Person` | `ProfilePage`, `Person`, `BreadcrumbList` |
| `/en/projects` | Projects by Julian Ortiz Alviar | Products Julian Ortiz Alviar has built: PhenoScience, ClinPsia, TALENTÜ, Riwin, the Lukiao credit platform and the HerbaFit Android app. | `ItemList` of projects | `CollectionPage`, `ItemList`, `BreadcrumbList` |
| `/en/projects/phenoscience` | PhenoScience — mental-health platform | PhenoScience pairs on-demand counselling with self-guided wellbeing content. Julian Ortiz Alviar co-founded it in July 2023 and leads its frontend. | `WebApplication` PhenoScience | `WebApplication`, `Organization` (`#org-phenoscience`), `BreadcrumbList` |
| `/en/projects/clinpsia` | ClinPsia — clinical platform for psychologists | ClinPsia is the all-in-one platform for clinical psychologists and a product of PhenoScience: records, video consultations and clinical traceability. | `WebApplication` ClinPsia | `WebApplication`, `Organization` (`#org-clinpsia` + `#org-phenoscience`), `BreadcrumbList` |
| `/en/projects/talentu` | TALENTÜ — football scouting platform | TALENTÜ lets players upload match video, get analyst feedback and reach verified scouts. Julian Ortiz Alviar is a technical co-founder. | `WebApplication` TALENTÜ | `WebApplication`, `Organization` (`#org-talentu`), `BreadcrumbList` |
| `/en/projects/riwin` | Riwin — travel-guide publishing house | Riwin sells researched travel guides online, and every purchase earns prize-draw entries. Julian Ortiz Alviar is a co-founder of Riwin. | `WebApplication` Riwin | `WebApplication`, `Organization` (`#org-riwin`), `BreadcrumbList` |
| `/en/projects/lukiao-novapp` | Lukiao credit simulator, now Novapp | Julian Ortiz Alviar built the credit simulator, payment integrations and mobile app at the fintech Lukiao. The work still runs inside Novapp. | `WebApplication` Lukiao/Novapp | `WebApplication`, `BreadcrumbList` (**no owned `Organization`** — third party) |
| `/en/projects/herbafit` | HerbaFit — official Herbalife Android app | HerbaFit offers guided training, smart-scale body tracking and wearable sync. Julian Ortiz Alviar worked on the app at BTi Group. | `MobileApplication` HerbaFit | `MobileApplication` (incl. `aggregateRating`), `BreadcrumbList` |
| `/en/open-source` | Open-source templates by Julian Ortiz | Five public starter templates by Julian Ortiz Alviar: next-stack, vite-stack, react-native-expo-stack, fastapi-lambda-cdk-template, express-hexagonal. | `ItemList` of repos | `CollectionPage`, `ItemList`, `BreadcrumbList` |
| `/en/open-source/next-stack` | next-stack — Next.js 16 template | next-stack is a Next.js 16 template with SSR, complete SEO, auth with RBAC and i18n, by Julian Ortiz Alviar. This portfolio is built on it. | `SoftwareSourceCode` | `SoftwareSourceCode`, `BreadcrumbList` |
| `/en/open-source/react-native-expo-stack` | react-native-expo-stack — Expo starter | A production-ready React Native and Expo SDK 54 starter with domain-driven modules, by Julian Ortiz Alviar. TypeScript, Expo Router, Zustand, Zod. | `SoftwareSourceCode` | `SoftwareSourceCode`, `BreadcrumbList` |
| `/en/open-source/vite-stack` | vite-stack — React 19 and Vite starter | vite-stack is a React 19 and Vite single-page starter by Julian Ortiz Alviar, with an operation-addressed API layer, Tailwind CSS 4 and Zod. | `SoftwareSourceCode` | `SoftwareSourceCode`, `BreadcrumbList` |
| `/en/open-source/fastapi-lambda-cdk-template` | fastapi-lambda-cdk-template — Python | A Python serverless backend template by Julian Ortiz Alviar: FastAPI on AWS Lambda with API Gateway, CDK, PostgreSQL, DynamoDB and SQS. | `SoftwareSourceCode` | `SoftwareSourceCode`, `BreadcrumbList` |
| `/en/open-source/express-hexagonal` | express-hexagonal — Express backend | express-hexagonal is an Express and TypeScript REST backend by Julian Ortiz Alviar, built to hexagonal ports-and-adapters with Sequelize and Docker. | `SoftwareSourceCode` | `SoftwareSourceCode`, `BreadcrumbList` |
| `/en/experience` | Experience — Julian Ortiz Alviar | Five roles from July 2020 to today: co-founder at PhenoScience, DevOps at Rebus Technology, DevInMotion, the fintech Lukiao and Fory App. | `Person` (work history) | `ProfilePage`, `ItemList` of roles, `BreadcrumbList` |
| `/en/contact` | Contact Julian Ortiz Alviar | Email jdavidortizy2k@gmail.com or call +57 316 434 4625. Julian Ortiz Alviar works remotely from Cali, Colombia, and is on LinkedIn and GitHub. | `Person` (contact) | `ContactPage`, `Person` (with `email`, `telephone`, `address`), `BreadcrumbList` |
| `/en/faq` | FAQ — Julian Ortiz Alviar | Twenty direct answers about Julian Ortiz Alviar: who he is, what he has built, which technologies he uses and how to reach him. | `FAQPage` | `FAQPage` (20 `Question`s), `BreadcrumbList` |
| `/en/blog` | Blog — Julian Ortiz Alviar | Writing by Julian Ortiz Alviar on software architecture, cloud infrastructure, delivery pipelines and building products end to end. | `Blog` | `CollectionPage`, `Blog`, `ItemList` of posts, `BreadcrumbList` |
| `/en/blog/[slug]` | *(post title, ≤60 — enforce at authoring time)* | *(post description, ≤155 — a required field on the typed post, not derived from the body)* | `Article` | `Article` (existing `articleJsonLd()`), `BreadcrumbList` |

#### Spanish routes

| Route | Title (≤60) | Description (≤155) | Primary entity | JSON-LD for this route |
| --- | --- | --- | --- | --- |
| `/es` | Julian Ortiz Alviar — Desarrollador FullStack | Desarrollador FullStack Senior, especialista DevOps e ingeniero de IA en Cali, Colombia. Cofundador de PhenoScience. Productos de punta a punta. | `Person` | `ProfilePage`, `WebSite`, `Person` |
| `/es/about` | Sobre Julian Ortiz Alviar | Biografía, habilidades y formación de Julian Ortiz Alviar: desarrollador FullStack Senior, especialista DevOps e ingeniero de IA en Cali, Colombia. | `Person` | `ProfilePage`, `Person`, `BreadcrumbList` |
| `/es/projects` | Proyectos de Julian Ortiz Alviar | Productos que ha construido Julian Ortiz Alviar: PhenoScience, ClinPsia, TALENTÜ, Riwin, la plataforma de crédito Lukiao y la app HerbaFit. | `ItemList` of projects | `CollectionPage`, `ItemList`, `BreadcrumbList` |
| `/es/projects/phenoscience` | PhenoScience — plataforma de salud mental | PhenoScience combina consejería a demanda con contenido de bienestar autoguiado. Julian Ortiz Alviar la cofundó en julio de 2023 y lidera su frontend. | `WebApplication` | as EN |
| `/es/projects/clinpsia` | ClinPsia — plataforma clínica para psicólogos | ClinPsia es la plataforma todo-en-uno para psicólogos clínicos y un producto de PhenoScience: historias, videoconsultas y trazabilidad clínica. | `WebApplication` | as EN |
| `/es/projects/talentu` | TALENTÜ — plataforma de scouting de fútbol | En TALENTÜ el jugador sube video, recibe análisis y llega a ojeadores verificados. Julian Ortiz Alviar es cofundador técnico de la plataforma. | `WebApplication` | as EN |
| `/es/projects/riwin` | Riwin — editorial de guías de viaje | Riwin vende guías de viaje investigadas en línea y cada compra suma tickets para sorteos. Julian Ortiz Alviar es cofundador de Riwin. | `WebApplication` | as EN |
| `/es/projects/lukiao-novapp` | Simulador de crédito de Lukiao, hoy Novapp | Julian Ortiz Alviar construyó el simulador de crédito, las integraciones de pago y la app móvil en la fintech Lukiao. Su trabajo sigue en Novapp. | `WebApplication` | as EN |
| `/es/projects/herbafit` | HerbaFit — app oficial de Herbalife | HerbaFit ofrece entrenamiento guiado, seguimiento con báscula inteligente y sincronización con wearables. Julian Ortiz Alviar trabajó en ella en BTi Group. | `MobileApplication` | as EN |
| `/es/open-source` | Plantillas open source de Julian Ortiz | Cinco plantillas públicas de Julian Ortiz Alviar: next-stack, vite-stack, react-native-expo-stack, fastapi-lambda-cdk-template y express-hexagonal. | `ItemList` of repos | `CollectionPage`, `ItemList`, `BreadcrumbList` |
| `/es/open-source/next-stack` | next-stack — plantilla de Next.js 16 | next-stack es una plantilla de Next.js 16 con SSR, SEO completo, autenticación con roles e i18n, de Julian Ortiz Alviar. Este portafolio corre sobre ella. | `SoftwareSourceCode` | as EN |
| `/es/open-source/react-native-expo-stack` | react-native-expo-stack — starter Expo | Starter de React Native y Expo SDK 54 listo para producción, con módulos por dominio, de Julian Ortiz Alviar. TypeScript, Expo Router, Zustand y Zod. | `SoftwareSourceCode` | as EN |
| `/es/open-source/vite-stack` | vite-stack — starter de React 19 y Vite | vite-stack es un starter SPA de React 19 y Vite de Julian Ortiz Alviar, con capa de API por operación, Tailwind CSS 4 y validación con Zod. | `SoftwareSourceCode` | as EN |
| `/es/open-source/fastapi-lambda-cdk-template` | fastapi-lambda-cdk-template — Python | Plantilla de backend serverless en Python de Julian Ortiz Alviar: FastAPI en AWS Lambda con API Gateway, CDK, PostgreSQL, DynamoDB y SQS. | `SoftwareSourceCode` | as EN |
| `/es/open-source/express-hexagonal` | express-hexagonal — backend en Express | express-hexagonal es un backend REST en Express y TypeScript de Julian Ortiz Alviar, con arquitectura hexagonal, Sequelize y Docker. | `SoftwareSourceCode` | as EN |
| `/es/experience` | Experiencia — Julian Ortiz Alviar | Cinco roles desde julio de 2020: cofundador en PhenoScience, DevOps en Rebus Technology, DevInMotion, la fintech Lukiao y Fory App. | `Person` (work history) | as EN |
| `/es/contact` | Contactar a Julian Ortiz Alviar | Escribe a jdavidortizy2k@gmail.com o llama al +57 316 434 4625. Julian Ortiz Alviar trabaja remoto desde Cali, Colombia. También en LinkedIn y GitHub. | `Person` (contact) | as EN |
| `/es/faq` | Preguntas frecuentes — Julian Ortiz Alviar | Veinte respuestas directas sobre Julian Ortiz Alviar: quién es, qué ha construido, qué tecnologías usa y cómo contactarlo. | `FAQPage` | as EN, `inLanguage: es-CO` |
| `/es/blog` | Blog — Julian Ortiz Alviar | Escritos de Julian Ortiz Alviar sobre arquitectura de software, infraestructura en la nube, pipelines de entrega y construir productos completos. | `Blog` | as EN |
| `/es/blog/[slug]` | *(post title, ≤60)* | *(post description, ≤155)* | `Article` | as EN |

**Notes.**
- `/en/projects/mareaverde` and `/es/projects/mareaverde` are **deliberately absent** pending Q5.
- `ContactPage` is not currently in the `JsonLd` union either — add it to the widened type in §7.1.0
  if the contact page uses it.
- Titles here are the **page-level** title. If a `title.template` is configured in the root layout
  (e.g. `%s | Julian Ortiz Alviar`), **subtract the suffix length from the 60-char budget** or the
  rendered titles will overflow. Given several titles above already name him, the cleaner choice is
  **no global suffix**: set `title.absolute` per route, or configure `title.default` only.

### 7.6 Content-writing rules that help AI extraction

These are checkable rules, not style advice. A developer or reviewer should be able to open any page
and mark each one pass/fail.

| # | Rule | How to check it | Why it matters for AI extraction |
| --- | --- | --- | --- |
| 1 | **Every sentence must survive being quoted alone.** No sentence may depend on the previous one to be understood. | Pick any 5 sentences at random, read each in isolation. If one is ambiguous, rewrite it. | Answer engines extract sentences, not paragraphs. A sentence that only works in context becomes a wrong quote. |
| 2 | **Repeat the entity name; do not use pronouns across sentences.** Write "Julian Ortiz Alviar built…", not "He built…", whenever a new sentence starts a new claim. | Count pronouns opening a sentence. Target: near zero on identity, project and skill pages. | An extracted sentence starting with "He" has lost its subject and is unusable — or worse, gets attached to the wrong person. |
| 3 | **One claim per sentence.** Split any sentence containing two independent facts joined by "and" or a semicolon. | Look for sentences with two verbs and two objects. | A sentence carrying two claims cannot be cited for one of them without importing the other. |
| 4 | **State dates explicitly and absolutely.** Write "since July 2023", never "recently", "currently for a while", "over two years". | Search the rendered text for: recently, currently, lately, nowadays, "years of", "a while". Each hit is a defect. | Relative time expressions decay. A page saying "recently" is wrong the moment it is cached, and there is no way for an engine to correct it. |
| 5 | **Open every page and every section with a definition-style first line**: `<Entity> is a <category> that <does what>`. | Read the first sentence of each `<section>`. It must be a definition, not a hook. | The first sentence after a heading is the single most-extracted string on a page. Spending it on a rhetorical opener wastes the highest-value slot. |
| 6 | **Never introduce a fact only in an image, a chart, an icon label or a CSS-generated string.** Every fact must exist in the DOM as text. | Disable images and CSS; re-read. Any fact that vanished is a defect. | Several AI crawlers do not execute JavaScript and none read pixels. |
| 7 | **Heading discipline: exactly one `<h1>` per page, naming the primary entity, and no skipped levels.** | `document.querySelectorAll('h1').length === 1`; then walk `h1→h6` and assert no level jumps by more than one. | Heading hierarchy is how an extractor decides which text answers which question. A skipped level merges two topics. |
| 8 | **Phrase headings as the question or the noun a reader would search for.** "Who built ClinPsia?" or "ClinPsia" — not "Our Story", not "The Journey". | Read every heading out of context. If it does not name a topic, rename it. | Question-shaped headings match question-shaped queries directly. |
| 9 | **Use semantic HTML**: `<article>` for a project or post, `<section>` with an accessible name, `<time datetime="2023-07">` for every date, `<address>` for contact details, `<dl>` for field/value pairs, `<table>` with `<th scope>` for comparisons. | Run the page through an HTML validator and an accessibility-tree inspector. | The accessibility tree is the structure machines read. Semantic markup and AI extraction want the same thing. |
| 10 | **Mirror the JSON-LD in the visible text.** Every claim in structured data must appear, in words, on the page. | Diff the `featureList`, `description` and FAQ answers in JSON-LD against the rendered copy. | Structured data that contradicts the visible page is a spam signal, and can get the markup ignored entirely. |
| 11 | **Name technologies canonically and consistently.** "Next.js" not "NextJS/next.js"; "PostgreSQL" not "Postgres"; "Amazon Web Services (AWS)" spelled out on first use per page; "TypeScript" not "TS". | Grep the content files for variant spellings; fix to one form. | Entity matching is string-sensitive. Three spellings of one skill are three weak entities instead of one strong one. |
| 12 | **Give every number a unit, a date and a source.** "4.25 out of 5 from 63 ratings on Google Play, as of September 2026" — never a bare "4.25★". | Find every numeral in the content; check it has all three. | An unsourced number is the fact most likely to be repeated wrongly, and the hardest to correct once it spreads. |
| 13 | **Scope every claim to the actual contributor.** Distinguish "Julian Ortiz Alviar built X" from "the team he leads builds X" from "the company he co-founded ships X". | For each project page, check the claim level against §4's "What he specifically built" row. | Overclaiming is the failure that destroys credibility permanently, and an answer engine will repeat it verbatim to a recruiter. |
| 14 | **Never let a bilingual page mix languages.** No English string on an `/es` page and no Spanish on an `/en` page, except proper nouns and code identifiers. | Set `<html lang>` correctly, then spot-read. The typed-content pattern makes a missing translation a compile error — rely on it. | Mixed-language pages are down-weighted and confuse language detection, which decides which query language you can answer. |
| 15 | **Front-load the answer, then explain.** Answer in sentence one; add nuance in sentences two and three. Never build up to a conclusion. | Read only the first sentence of each answer/section. It must already be the answer. | Extractors truncate. Anything after the first two sentences may never be read. |
| 16 | **Keep paragraphs 2–4 sentences and give each one a single topic.** | Any paragraph over ~5 sentences or covering two topics gets split. | Chunking for retrieval usually happens at paragraph boundaries; a two-topic paragraph produces a diluted chunk that matches neither query well. |

---

## 8. Sitemap of routes

The complete route list to build, honouring the settled scope decision: **static portfolio; the blog
is kept but converted to typed data — no Postgres, no auth in production, fully prerendered.** There
are therefore **no `dashboard`, `admin`, `settings`, `posts`, `sign-in` or `sign-up` routes** and no
`(app)` or `(auth)` route groups. Everything public lives under `(marketing)`.

**Locale rules.** Default locale is `en`; `es` (es-CO) ships alongside. **Bare paths redirect to
`/en`** — `/` → `/en`, `/projects` → `/en/projects`. Both locales cover every content route, so
`availableLocales` never needs narrowing (§`buildMetadata`) except for a blog post published in only
one language.

**Rendering modes.** `static` = prerendered at build time via `generateStaticParams`, zero runtime
data access. `static (revalidate)` = prerendered with a `revalidate` window, used only where an
external fact drifts. Nothing is server-rendered per request; nothing needs a database.

### 8.1 Content routes

| Path pattern | Locales | Rendering | Priority | `changeFrequency` | Notes |
| --- | --- | --- | --- | --- | --- |
| `/` | — | redirect | — | — | 308 → `/en`. Handled by the existing i18n proxy/middleware. |
| `/{locale}` | `en`, `es` | static | **1.0** | `monthly` | Home. Hero + positioning (§1.5), featured projects, featured templates, contact CTA. |
| `/{locale}/about` | `en`, `es` | static | **0.9** | `monthly` | Long bio (§1.4), skills taxonomy (§6), education. `ProfilePage`. |
| `/{locale}/projects` | `en`, `es` | static | **0.9** | `monthly` | Index of 6 projects (7 if Q5 resolves). `ItemList`. |
| `/{locale}/projects/{slug}` | `en`, `es` | static | **0.8** | `monthly` | 6 slugs × 2 locales = **12 pages**. Slugs: `phenoscience`, `clinpsia`, `talentu`, `riwin`, `lukiao-novapp`, `herbafit`. `generateStaticParams` returns the cross-product of `locales` × project slugs. |
| `/{locale}/open-source` | `en`, `es` | static | **0.9** | `monthly` | Index of 5 templates. Lead with `next-stack` and the dogfooding line (§5.1). |
| `/{locale}/open-source/{slug}` | `en`, `es` | static (revalidate) | **0.7** | `weekly` | 5 slugs × 2 locales = **10 pages**. Slugs: `next-stack`, `react-native-expo-stack`, `vite-stack`, `fastapi-lambda-cdk-template`, `express-hexagonal`. ⚠️ **Star counts and last-push dates drift.** Either hardcode them as typed data with an "as of 2026-09-10" label (simplest, fully static — **recommended**), or fetch from the GitHub API with `revalidate: 86400`. Do not render an unlabelled live-looking number from stale typed data. |
| `/{locale}/experience` | `en`, `es` | static | **0.8** | `yearly` | The five roles from §3, reverse chronological, rendered as **overlapping bars** per §3's overlap notice. Anchor ids = the experience slugs, so `llms.txt` deep links resolve. |
| `/{locale}/faq` | `en`, `es` | static | **0.8** | `monthly` | The 20 pairs from §7.2. `FAQPage`. **The single highest-value AEO page on the site.** |
| `/{locale}/contact` | `en`, `es` | static | **0.7** | `yearly` | Real `mailto:` and `tel:` links, unobfuscated (§2). The phone appears **here only**, not in the global footer. |
| `/{locale}/blog` | `en`, `es` | static | **0.6** | `weekly` | Index over typed post data. **No database.** |
| `/{locale}/blog/{slug}` | per post | static | **0.5** | `yearly` | One page per post per locale it exists in. A post that exists in one language only must narrow `availableLocales` in both `buildMetadata()` and the sitemap — the existing helpers already support this. |

### 8.2 Machine-readable routes — all outside `[locale]`

| Path | Rendering | Source file | Notes |
| --- | --- | --- | --- |
| `/robots.txt` | static | `src/app/robots.ts` | **Exists — must be revised per §7.4.1** (drop the dead disallow rules) **and extended per §7.4.3** (the AI user-agent policy). |
| `/sitemap.xml` | static | `src/app/sitemap.ts` | **Exists — must be rewritten.** See §8.3. |
| `/llms.txt` | static (`force-static`) | `src/app/llms.txt/route.ts` | **New.** Content in §7.3.2. `text/plain; charset=utf-8`. |
| `/llms-full.txt` | static (`force-static`) | `src/app/llms-full.txt/route.ts` | **New, optional but recommended.** Plan in §7.3.3. |
| `/manifest.webmanifest` | static | `src/app/manifest.ts` | Exists. Update `name`, `short_name`, `description` away from the template's values. |
| `/icon.svg` | static | `src/app/icon.svg` | Exists. Replace the template mark. |
| `/{locale}/opengraph-image` | static | `src/app/[locale]/opengraph-image.tsx` | Exists, one per locale. Referenced by `buildMetadata()` as the default OG image. Restyle for the portfolio. |

**Add these three exclusions** to the i18n middleware/proxy so it does not rewrite them into a
locale: `llms.txt`, `llms-full.txt`, and (verify it is already there) `robots.txt` / `sitemap.xml` /
`manifest.webmanifest`. A `/en/llms.txt` is a broken contract.

### 8.3 Required changes to `src/app/sitemap.ts`

The current implementation is close but has three blockers under the new scope:

1. **It imports `@/modules/posts/server/posts.service` and awaits `listPublished()`.** That module is
   part of the Postgres-backed posts feature being removed. **Replace with a typed-data read** —
   exactly the `docSlugs()` pattern already used in the same file for docs. Once no async data access
   remains, the function can be synchronous and the whole sitemap is build-time static.
2. **`export const revalidate = 3600` becomes pointless.** With every entry from typed data, drop it
   (or keep a long window if the open-source pages fetch GitHub live). The `try/catch` around post
   entries can go with it.
3. **The entry list is the template's, not the portfolio's.** It currently emits `''`, `/blog`,
   `/docs` and `docSlugs()`. Replace with: `''` (1.0), `/about` (0.9), `/projects` (0.9), each project
   slug (0.8), `/open-source` (0.9), each template slug (0.7), `/experience` (0.8), `/faq` (0.8),
   `/contact` (0.7), `/blog` (0.6), each post slug (0.5). **Decide whether `/docs` survives** — it is
   the template's own documentation, not portfolio content; recommendation is to remove it and let
   `/open-source/next-stack` link to the GitHub repo instead (see Q17).

Keep `withAlternates()` unchanged — it is correct, and its `availableLocales` narrowing is exactly
what partially-translated blog posts need.

### 8.4 Route count

| Group | Pages |
| --- | --- |
| Fixed content routes × 2 locales | 8 × 2 = 16 |
| Project detail pages | 6 × 2 = 12 |
| Template detail pages | 5 × 2 = 10 |
| Blog index | included above |
| Blog posts | n × (1 or 2) |
| Machine-readable routes | 5–7 |
| **Total prerendered HTML pages** | **38 + blog posts** |

Small enough that everything can be statically prerendered with no ISR at all — which is the right
outcome for a portfolio, and the reason the AI-crawler story works: every crawler, including the ones
that never run JavaScript, receives complete HTML with the structured data already in it.

---

## 9. Open questions / to confirm

Numbered `Q1…Q23`. **Status** is one of `SETTLED` (a decision was made — no action needed beyond
implementing it), `RESOLVED` (a conflict was investigated and answered — no action needed),
`BLOCKING` (something cannot ship correctly until answered) or `OPEN` (should be answered, but the
site can ship with the conservative fallback stated).

### Carried forward from the first pass

**Q1 — Canonical URL. `SETTLED`.**
No longer a blocker and no longer a content question: **the canonical origin is not hardcoded
anywhere.** Everything derives from the `NEXT_PUBLIC_APP_URL` environment variable via
`siteConfig.url` (`src/shared/config/site.ts` already does exactly this, including stripping a
trailing slash). This makes the canonical URL a **deploy-time environment decision**, not a content
decision — the same build serves preview and production correctly. `{{SITE_URL}}` throughout this
document marks every place that value is interpolated; `https://julianortiz.dev` appears only as an
illustration and must not be committed. **Action for the developer:** set `NEXT_PUBLIC_APP_URL` in
the deployment environment (no trailing slash), and grep the finished build for any literal origin
before shipping — `robots.ts`, `sitemap.ts`, `seo.ts`, `json-ld.tsx`, `llms.txt/route.ts` must all
read `siteConfig.url`.

**Q2 — Email address. `RESOLVED`.**
The authoritative address is **`jdavidortizy2k@gmail.com`** — with the `y`. Three independent
confirmations: (1) the resume header, read directly from the PDF text layer `[RESUME]`; (2) the
`mailto:` in the `express-hexagonal` README `[GITHUB]`; (3) the user's own account identity `[USER]`.
The `jdavidortiz2k@gmail.com` spelling in the original brief — no `y` — was a typo and must not be
used. **Action:** replace every `{{EMAIL}}` occurrence with `jdavidortizy2k@gmail.com`, including in
section 2's contact table (whose "Conflict — see Q2" note is now superseded) and in the `Person`
JSON-LD as `mailto:jdavidortizy2k@gmail.com`. Emit it as a real, unobfuscated `mailto:` — AI answer
engines must be able to read it.

**Q3 — Overlapping employment dates. `OPEN`.**
Unchanged and still unresolved. PhenoScience (2023-07 → present) overlaps Rebus Technology
(2023-10 → 2025-07) and DevInMotion (2023-02 → 2023-11); Lukiao (2021-10 → 2022-11) overlaps Fory
App (2020-07 → 2021-11). Consistent with concurrent contract and founder work, but worth an explicit
confirmation before publishing a timeline a recruiter will read closely. **Question for the user:**
were these genuinely concurrent (founder work alongside employment, or parallel contracts), or is a
date on the resume off by a month or a year? **Fallback if unanswered:** ship the overlapping-bars
timeline exactly as the resume states it. Overlaps rendered honestly read as concurrent work;
overlaps hidden inside a single-track list read as an error.

**Q4 — BTI ↔ HerbaFit employer attribution. `PARTIALLY RESOLVED` → `OPEN` (bookkeeping only).**
**What got resolved:** Google Play's own `SoftwareApplication` JSON-LD names the publisher of
`com.herbalife.herbafit` as **BTi Group** `[FETCHED]`, which independently corroborates the user's
statement that he built HerbaFit while at BTI. **What remains open:** the resume contains **no BTI
role at all**, so HerbaFit cannot be attached to any of the five documented employments. Section 3
currently links `herbafit` tentatively to both `rebus-technology-devops` and
`devinmotion-software-engineer`; **those two tentative links are now known to be wrong and must be
removed.** **Question for the user:** was BTI a separate employer that belongs on the resume and
timeline as a sixth role (with dates), or was BTI a client/subcontract reached through one of the
listed employers — and if so, which one? **Fallback if unanswered:** publish HerbaFit as a project
with the role "Developer, at BTi Group" and **no link to any timeline entry**, and leave BTI out of
the experience section rather than guessing.

### New — attribution and scope

**Q5 — Marea Verde: whose project is it? `BLOCKING`.**
The user supplied `https://mareaverdepalma.com` with no employer, client or role. The site is a real,
actively maintained, SEO-engineered e-commerce (§4.3) and its shipped HTML carries **spec-driven
fingerprints matching his documented practice** — numbered `RF-xx` requirements, per-feature
`spec.md` references, a `DECISIONS.md` dated 2026-05-10 `[FETCHED]`. That is suggestive, not
conclusive. **Questions:** (a) Did he build it, and in what capacity — freelance client work, an own
venture, or through an employer? (b) Is there a named client to credit? (c) **Does he want it on the
portfolio at all?** The store is age-gated 18+ and sells cultivation equipment, which is a
positioning decision entirely separate from the engineering. **Fallback until answered: hold it out.**
It is excluded from `/projects`, from the `ItemList` (`numberOfItems: 6`), from `llms.txt` and from
the sitemap. Do **not** default it to "own venture".

**Q6 — The LLM work: one publishable specific. `OPEN` (high value).**
The resume states he "implemented LLM-based capabilities to fill the gaps where a psychologist cannot
provide immediate or continuous support" `[RESUME]`, and "AI Engineer" is a third of his headline.
But **no fetched artefact exposes an LLM feature**: the ClinPsia landing bundle contains no
AI/IA/LLM/assistant/transcription copy at all, and the PhenoScience bundle shows counselling,
scheduling and content surfaces without naming a model `[BUNDLE]`. So the site's AI pillar currently
rests on a single resume sentence — the weakest evidence base of the three positioning pillars.
**Questions:** which model or provider; what the feature actually does for a user; is it retrieval-
augmented, tool-calling, or plain completion; is it live in production today; and can it be named
publicly? **Fallback until answered:** state the AI work as his role at PhenoScience (tagged
`[RESUME]`), and **do not** put "AI-powered" in ClinPsia's tagline, description or
`SoftwareApplication` JSON-LD. One concrete detail here would move §6.7 from T2 to the strongest
section on the site.

**Q7 — "Let's All Do Good": what exactly is the relationship? `OPEN`.**
The user describes a family of partner apps sharing one codebase/pattern that he worked on at BTI.
The publicly documented *LetsAllDoGood* product is a white-label nonprofit-communications app
platform, which matches that description in shape — but **no public source links BTi Group to it**,
and Google Play has no reachable developer page for BTi Group (`store/apps/dev?id=BTi+Group` returns
HTTP 404) `[FETCHED]`. **Questions:** is the platform he worked on the same LetsAllDoGood product, or
an internal BTi platform of a similar shape that happens to share the name? Can any partner app be
named publicly? Roughly how many apps shipped on the shared codebase? **Fallback:** describe it in
general terms as his own account (`[USER]`), name **no** partner apps, and make no claim about the
vendor relationship.

**Q8 — HerbaFit: which framework? `OPEN`.**
The Play Store listing does not expose it and the user did not say. **Do not guess** — a wrong
framework claim on a shipped app is trivially falsifiable by anyone who decompiles the APK.
**Question:** native Kotlin/Java, React Native, Flutter, or something else? **Fallback:** describe
the work as "Android app development" with no framework named, as §4.4 currently does.

**Q9 — TALENTÜ founder credit. `OPEN` (reputational).**
The live TALENTÜ site names **Julián González** as "Fundador de TALENTÜ" and "La mente detrás de
TALENTÜ", and does **not** mention Julian Ortiz Alviar anywhere `[FETCHED]`. The user states it is
his own venture and that he is a co-founder `[USER]`. These are reconcilable — a technical co-founder
need not be on the marketing site — but the portfolio must not publish a claim the referenced site
appears to contradict. **Questions:** is "technical co-founder" the correct and agreed title? Would
Julián González confirm it? Should TALENTÜ's `Organization` JSON-LD carry `founder: #person`, name
Julián González as founder with Julian Ortiz as a member, or omit `founder` entirely? **Fallback:**
publish the phrasing in §4.6 ("technical co-founder of TALENTÜ, the platform founded by sports
scientist Julián González") and **omit `founder`** from the `Organization` block.

**Q10 — Is `TalentosBackend` TALENTÜ's backend? `OPEN`.**
`fastapi-lambda-cdk-template`'s README states it is "Basado en los estándares de `TalentosBackend`"
`[GITHUB]`. If `TalentosBackend` is TALENTÜ's production backend, that is a strong, specific story —
*the production backend of his own venture, codified into a public open-source template* — and it
would also fill the gap left by Q9 (a concrete technical contribution to TALENTÜ). **Question:**
confirm or deny the link, and confirm it is publishable. **Fallback:** mention the README string as
provenance only, with no claim about which project it refers to, as §5.4 currently does.

**Q11 — Riwin: launch status and the security claims. `OPEN`.**
Parts of the Riwin storefront still use `via.placeholder.com` imagery `[BUNDLE]`, so it is live but
pre-launch in places. Separately, the site publishes claims about "PCI-DSS Nivel 1" processing,
"auditorías de seguridad y pruebas de penetración regulares" and SSL/TLS encryption — these are the
**product's** claims about itself and its processor, not audited findings. **Questions:** is Riwin
open for real orders today? Should the portfolio describe it as launched, in beta, or in development?
**Fallback:** describe it as "live and early", and quote the security statements as site copy or omit
them — never restate them as independently verified facts.

**Q12 — Repository hygiene across all five templates. `OPEN` (cheap, high leverage).**
Verified from the GitHub API `[GITHUB]`: **none of the five declares a license**; **none sets
repository topics**; **only `next-stack` sets a `homepage`**; and **four of five have an empty
`description`** field. Worse, `vite-stack`'s `README.md` is still the **stock `create-vite`
boilerplate** and says nothing about the conventions that make it worth using (§5.3). **Suggestions
to the user, in priority order:** (1) write a real `vite-stack` README; (2) add a license — MIT is the
conventional choice for starter templates, and its absence technically means "all rights reserved",
which discourages exactly the reuse a template exists for; (3) add one-line `description` fields and
topics (`nextjs`, `template`, `typescript`, `expo`, `fastapi`, `aws-cdk`, `hexagonal-architecture`);
(4) refresh `express-hexagonal`. **This affects the portfolio directly** — the `/open-source` pages
will show "No license" and empty descriptions unless these are fixed first.

### New — skills honesty

**Q13 — "Angular specialist" and the other T4 skills. `OPEN` (credibility risk).**
The resume lists **"Angular specialist"**, and **zero Angular appears in any of his 20 repositories
or any of the six production bundles fetched** — all of which are React `[GITHUB]` `[BUNDLE]`. The
same problem, less sharply, applies to `PWAs`, `CMS`, `AI Trainer` and `Control Systems`: bare labels
with nothing behind them anywhere. **Questions:** is there real Angular work (a client project, an
internal app) that could be named or at least dated? For each of the other four, is there one
concrete example? **Fallback:** apply the §6.2 rule — omit T4 skills from the site, or confine them
to a visually secondary "also listed on my CV" row. **Never** put them in a hero, a proficiency bar,
or `knowsAbout`. Specifically: **recommend dropping "Control Systems" entirely** (the term is
ambiguous — industrial control? version control? access control? — and unsupported), and recommend
either substantiating or dropping "Angular specialist", because publishing it beside seven verified
React codebases invites the one question the site cannot answer.

**Q14 — Java. `OPEN`.**
Java is named once, in the resume summary, and appears in no repository and no artefact `[RESUME]`
`[GITHUB]`. **Question:** where was Java used, and when? **Fallback:** keep it at T3 and render it as
"familiar with", never as a specialty, and keep it out of `knowsAbout`.

**Q15 — Testing claims. `OPEN`.**
The Rebus role says he "ensured frontend quality through comprehensive testing" `[RESUME]`, and
`next-stack` has Vitest, Testing Library and Playwright wired up `[GITHUB]`. But **no test suite is
visible in the other four templates.** **Question:** which testing tools does he actually use day to
day, and is there a project with meaningful coverage worth citing? **Fallback:** claim testing at the
`next-stack` level only — "wires up Vitest and Playwright" — and make no coverage claim anywhere.

### New — product and policy decisions

**Q16 — AI-crawler policy. `OPEN` (needs one decision).**
§7.4.3 recommends **allowing all fifteen** AI user-agents, and explains the training-vs-retrieval
distinction so the choice can be made informedly. **Question:** does the user accept the recommended
allow-all, or does he prefer "answerable but not training data" (allow the six retrieval agents,
disallow the nine training agents)? **Fallback:** ship the recommended allow-all — it is the policy
that serves the site's purpose, and it is trivially reversible in one file.

**Q17 — Does `/docs` survive? `OPEN`.**
The template ships a six-page `/docs` module documenting *the template*, referenced by
`sitemap.ts` via `docSlugs()`. On a personal portfolio it is content about someone else's product.
**Question:** remove `/docs` (recommended — let `/open-source/next-stack` link to the GitHub repo
instead), or keep it as a live demonstration of the template's own documentation? **Fallback:**
remove it, and remove `docSlugs()` from the sitemap.

**Q18 — English proficiency. `OPEN`.**
The site ships in English and Spanish, and section 1.1 flags the English *level* as `[UNVERIFIED]`.
**Question:** what level should be stated — professional working proficiency, fluent, or nothing at
all? **Fallback:** name both languages in `Person.knowsLanguage` with **no `proficiencyLevel`**, and
make no claim in prose. For a remote-work portfolio this is worth answering: "English: professional
working proficiency" is a line recruiters look for.

**Q19 — Three roles have no projects attached. `OPEN`.**
Rebus Technology, DevInMotion and Fory App currently link to **no** project (once the wrong `herbafit`
links from Q4 are removed). That leaves 21 months of DevOps work, 9 months of integration work and
16 months of full-stack work with no visible artefact. **Question:** is there anything publicly
nameable from any of the three — a product name, a public URL, an app, even an anonymised
description? **Fallback:** the resume bullets in §3 stand on their own; they are specific enough to
be credible without a linked project.

**Q20 — Blog content. `OPEN`.**
The blog is kept and converted to typed data, but **no posts exist yet**. **Question:** will there be
posts at launch, and if so how many and in which languages? **Fallback:** if there are none, either
omit `/blog` from the navigation and the sitemap until the first post exists (recommended — an empty
blog index is a worse signal than no blog), or ship it with one post. A partially-translated post is
fully supported: narrow `availableLocales` in both `buildMetadata()` and the sitemap.

**Q21 — The TALENTÜ domain. `OPEN` (minor but concrete).**
Verified `[FETCHED]`: `https://www.xn--talent-8ya.com` and `https://xn--talent-8ya.com` both return
200 and serve the TALENTÜ site (S3 + CloudFront); the literal-`ü` hostname fails a command-line TLS
handshake; and **`talentu.com` without the umlaut is a different, unrelated parked domain.**
**Questions:** does he also own `talentu.com`, or should the site be careful never to link it? Should
display text be `talentü.com` or `TALENTÜ`? **Fallback:** display `talentü.com`, link and emit
`https://www.xn--talent-8ya.com` in every machine-readable field, and never link `talentu.com`.

**Q22 — Assets. `OPEN` (blocks visual completion, not content).**
Nothing in this document supplies: a headshot or portrait, a personal logo/favicon to replace
`src/app/icon.svg`, project screenshots or logos for the six project pages, or brand marks for the
templates. The template's `[locale]/opengraph-image.tsx` will render the template's design until
restyled. **Question:** does the user have these, or should the site be typographic-only with
generated OG cards? **Fallback:** typographic-only. Generated OG cards from `buildMetadata()` are
already wired and look deliberate; broken or placeholder images do not.

**Q23 — Login-walled surfaces. `RESOLVED`, recorded for the audit trail.**
`https://admin.lukiao.com.co/auth/login` was **not** accessed and no authentication was attempted, per
instruction. Only its existence and login-walled status are recorded (§4.5). The same applies to any
authenticated area of PhenoScience, ClinPsia, Novapp, TALENTÜ or Riwin: everything in §4 was read from
**public** pages, public production JS bundles and public store listings. **No credentials were used
anywhere.** If the user wants deeper detail on any admin surface, he must describe it himself — do
not log in to verify.

---

### Priority order for the user

1. **Q5** (Marea Verde) — blocking; decides whether the projects catalogue has six entries or seven.
2. **Q4** (BTI) — blocking for the experience timeline's correctness.
3. **Q6** (LLM specifics) — highest upside; turns the weakest pillar into the strongest.
4. **Q9** (TALENTÜ credit) — reputational; get the byline right before publishing.
5. **Q13** (Angular / T4 skills) — credibility; one sentence from the user closes it.
6. **Q12** (repo hygiene) — cheap external fix, visibly improves `/open-source`.
7. **Q16** (crawler policy), **Q17** (`/docs`), **Q20** (blog), **Q22** (assets) — build-time
   decisions, each with a safe fallback already specified.
8. Everything else can ship on its stated fallback.

---

*End of content specification. Sections 1–3 were produced in the first pass; sections 4–9 in the
second. All `[FETCHED]`, `[BUNDLE]` and `[GITHUB]` verifications in sections 4–6 were performed on
2026-09-10.*
