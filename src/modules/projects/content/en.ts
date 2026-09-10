import type { ProjectsCopy } from '../domain/types'

export const projectsEn: ProjectsCopy = {
  indexTitle: 'Projects',
  indexIntro:
    'These are the products Julian Ortiz Alviar has built. Four are ventures he co-founded, two were built inside an employment, and one was freelance client work. Each entry states his capacity on that project before it describes the product.',
  bucketLabels: {
    venture: 'Own venture',
    employment: 'Employment',
    freelance: 'Freelance client work',
  },
  statusLabels: {
    live: 'Live',
    'live-early': 'Live, early',
    'store-listed': 'On Google Play',
  },
  linkLabels: {
    live: 'Live site',
    store: 'Store listing',
    api: 'API origin',
  },
  sectionLabels: {
    problem: 'The problem it solves',
    contribution: 'What Julian Ortiz Alviar built',
    features: 'Verified product surface',
    stack: 'Technology',
    facts: 'Facts',
    role: 'Role',
    relatedRole: 'Related role',
  },
  projects: {
    phenoscience: {
      tagline:
        'Mental-health platform pairing on-demand counselling with self-guided wellbeing content.',
      role: 'Co-Founder. Leads the frontend team and owns DevOps and platform stability.',
      definition:
        'PhenoScience is a Colombian mental-health company whose platform pairs on-demand counselling with self-guided wellbeing content.',
      metaTitle: 'PhenoScience — mental-health platform',
      metaDescription:
        'PhenoScience pairs on-demand counselling with self-guided wellbeing content. Julian Ortiz Alviar co-founded it in July 2023 and leads its frontend.',
      description:
        'PhenoScience is a Colombian mental-health company whose platform offers counselling sessions with mental-health specialists, appointment booking with psychologists, and serialized wellbeing content with daily reminders, all under one subscription. Julian Ortiz Alviar co-founded PhenoScience in July 2023.',
      problem:
        'A psychologist cannot be available at 2 a.m., and cannot follow a patient continuously between sessions. PhenoScience closes that gap. The platform offers counselling sessions with mental-health specialists and appointment booking with psychologists, and fills the hours in between with daily wellbeing reminders and serialized content, all behind one subscription.',
      contribution:
        'Julian Ortiz Alviar co-founded PhenoScience, established its frontend standards and leads its frontend team. Julian Ortiz Alviar implemented the large-language-model capabilities that cover the gaps where a psychologist cannot give immediate or continuous support. He introduced Spec-Driven Development to the team by designing modular "skills" and assigning them to agents. He also owns CI/CD, the Terraform-provisioned infrastructure and cross-environment deployments.',
      features: [
        'Counselling sessions with mental-health specialists',
        'Appointment booking with psychologists',
        'An on-demand button that connects a user to a counsellor',
        'Serialized wellbeing and mental-health content',
        'Daily wellbeing reminders and tips',
        'Subscription gating on protected resources',
        'Audience-segmentation onboarding and a guided product tour',
        'Account and subscription-plan management',
      ],
      narrative: [
        'PhenoScience is a mental-health company Julian Ortiz Alviar co-founded in July 2023. Its platform gives people two things a private practice alone cannot: a counsellor reachable on demand, and something useful to do with the time between appointments. Users book sessions with psychologists, tap a single button to be connected to a counsellor when they need to talk, and work through serialized wellbeing content and daily reminders in between.',
        "Julian Ortiz Alviar's remit at PhenoScience is the whole delivery path. He spearheaded the frontend team and set the standards that let the product grow without being rewritten. The shipped application is a React and TypeScript single-page app built with Vite, holding client state in Zustand and talking to a dedicated API at api.phenoscience.com.co. He also implemented the large-language-model capabilities that answer users when a human clinician cannot, and introduced Spec-Driven Development by expressing system behaviour as modular skills assigned to agents.",
        'Julian Ortiz Alviar owns the infrastructure side as well: CI/CD pipelines, Terraform-provisioned environments and repeatable deployments, with legal documents and email templates served from Amazon S3 and delivery fronted by a CDN. PhenoScience is also the parent company of ClinPsia, the clinician-facing product, which makes the venture a two-sided bet on the same problem: support the patient, and support the psychologist treating them.',
      ],
      facts: [
        { label: 'Founded', value: 'July 2023' },
        { label: 'Company', value: 'PhenoScience, Cali, Colombia' },
        { label: 'Sibling product', value: 'ClinPsia' },
      ],
      organizationDescription:
        'PhenoScience is a Colombian mental-health company whose platform pairs on-demand counselling with self-guided wellbeing content. PhenoScience is the parent company of ClinPsia.',
    },
    clinpsia: {
      tagline:
        'The all-in-one clinical platform for clinical psychologists: patients, video consultations, records and traceability in one place.',
      role: 'Co-Founder of PhenoScience, the company that builds ClinPsia. Frontend lead and LLM integration.',
      definition:
        'ClinPsia is an all-in-one clinical platform for clinical psychologists, and a product of PhenoScience.',
      metaTitle: 'ClinPsia — clinical platform for psychologists',
      metaDescription:
        'ClinPsia is the all-in-one platform for clinical psychologists and a product of PhenoScience: records, video consultations and clinical traceability.',
      description:
        "ClinPsia is an all-in-one clinical platform for clinical psychologists. ClinPsia centralises patient records, in-person and video consultations, digitally signed informed consents, structured assessments with automatically calculated risk indicators, and a chronological audit trail of every change to a patient's file. ClinPsia is a product of PhenoScience.",
      problem:
        'ClinPsia exists because of a specific waste, described in the product\'s own words: psychologists spent hours managing paperwork, calendars and scattered platforms, hours that belonged with their patients. ClinPsia consolidates a whole practice into one place so that time returns to clinical work.',
      contribution:
        'ClinPsia is built by PhenoScience, the company Julian Ortiz Alviar co-founded, and by the frontend team he leads. His own contributions are the frontend standards the product is built on, the team leadership, the large-language-model capabilities, the Spec-Driven Development method with agent skills, and the CI/CD and Terraform delivery pipeline. No individual authorship of a specific ClinPsia feature is claimed here.',
      features: [
        'Patient management',
        'Centralised and secure clinical records: full history, documents, consents and follow-up in one profile per patient',
        'In-person consultations and video calls from the same schedule',
        'Digitally signed informed consents, generated, sent and stored',
        'Structured patient assessment with automatically calculated risk indicators',
        'Clinical traceability: a chronological log of every action, session and record change',
        'Courses and episodes for knowledge sharing',
        'Billing and payments',
        'A Colombian PQRS desk with tracked case numbers and an anonymous filing option, built to the deadlines of Ley 1755 de 2015',
        'Colombian data-protection compliance under Ley 1581 de 2012, and Colombian identity-document types',
      ],
      narrative: [
        'ClinPsia is a product of PhenoScience, the company Julian Ortiz Alviar co-founded in July 2023, and it is aimed at the other side of the consulting room. Where the PhenoScience platform serves the person seeking help, ClinPsia serves the clinical psychologist treating them.',
        "The platform consolidates a whole practice. One profile per patient holds the complete clinical history, documents, consents and follow-up. Consultations happen in person or over video from the same schedule. Informed consents are generated, signed digitally and stored, so no paper is involved. Patient assessments are structured, with risk indicators calculated automatically rather than eyeballed. Every action, session and change to a record is logged chronologically — the traceability that makes a clinical record defensible. Around that sit billing, a clinician dashboard, a courses-and-episodes library, and a Colombian PQRS desk with tracked case numbers and an anonymous filing option.",
        'ClinPsia is built by the frontend team Julian Ortiz Alviar leads, on the standards he set: a React and TypeScript application with schema-first validation in Zod, forms through react-hook-form, and its own API at api.clinpsia.com. Regulatory compliance is a first-class constraint rather than a footnote — Colombian document types, Ley 1581 de 2012 data-processing authorisation and privacy-by-design are in the shipped interface, not only on the policy page.',
      ],
      facts: [
        { label: 'Parent company', value: 'PhenoScience' },
        { label: 'Free trial', value: '15 days, no credit card required' },
        { label: 'Compliance', value: 'Ley 1581 de 2012, Ley 1755 de 2015' },
      ],
      organizationDescription:
        'ClinPsia is an all-in-one clinical platform for clinical psychologists, and a product of PhenoScience.',
      relatedOrganizationDescription:
        'PhenoScience is a Colombian mental-health company whose platform pairs on-demand counselling with self-guided wellbeing content. PhenoScience is the parent company of ClinPsia.',
    },
    talentu: {
      tagline:
        'Football scouting platform: players upload match video, get real analyst feedback, and reach verified scouts anywhere.',
      role: 'Technical co-founder of TALENTÜ, the platform founded by sports scientist Julián González.',
      definition:
        'TALENTÜ is a football scouting platform where players upload match video, receive technical feedback from real analysts, and are discovered by verified scouts.',
      metaTitle: 'TALENTÜ — football scouting platform',
      metaDescription:
        'TALENTÜ lets players upload match video, get analyst feedback and reach verified scouts. Julian Ortiz Alviar is a technical co-founder.',
      description:
        'TALENTÜ is a football scouting platform where players upload match video, receive detailed technical feedback from real coaches and analysts, and are discovered by verified scouts and academy representatives. TALENTÜ operates in Latin America, Spain and sub-Saharan Africa.',
      problem:
        'TALENTÜ exists to answer one question: how does a footballer in Chocó or La Guajira get seen by the same eyes that see a footballer in Madrid or São Paulo? The platform makes the evidence portable, so a player anywhere can be assessed on video by real analysts and then found by scouts who have been verified first.',
      contribution:
        'Julian Ortiz Alviar is a technical co-founder of TALENTÜ and architected its production backend, TalentosBackend. The engineering standards of that backend are published: fastapi-lambda-cdk-template, one of his five open-source templates, states in its README that it is based on the standards of TalentosBackend. TALENTÜ was founded by sports scientist Julián González, who is the founder credited on the platform\'s own site, and the public site does not itemise engineering contributions, so no feature-level authorship claim is made here.',
      features: [
        'Video upload reviewed by real coaches and analysts, who return detailed technical feedback',
        'A generated professional profile with statistics, strengths and areas to improve',
        'AI used to scale the analysis layer, which the platform frames as democratising professional analysis',
        'Scouts and academy representatives verified before they can see any player profile',
        'Profile-view notifications when a scout looks at a player',
        'A freemium model: registration and a basic profile are free, premium plans add analysis and visibility',
        'Available in Latin America, Spain and sub-Saharan Africa',
        'Web application plus Android and iOS apps',
      ],
      narrative: [
        'TALENTÜ exists to answer one question: how does a footballer in Chocó or La Guajira get seen by the same eyes that see a footballer in Madrid or São Paulo? The platform\'s answer is to make the evidence portable. A player uploads match video, real coaches and analysts review it and return detailed technical feedback, the platform assembles that into a professional profile with statistics, strengths and areas to improve, and verified scouts and academy representatives browse those profiles from anywhere.',
        'TALENTÜ is a freemium product: registration and a basic profile are free, with premium plans adding deeper analysis and more visibility to scouts. TALENTÜ runs in Latin America, Spain and sub-Saharan Africa, ships as a web app plus Android and iOS apps, and accepts players from age thirteen with a guardian\'s consent. Julian Ortiz Alviar is a technical co-founder; the platform was founded by sports scientist Julián González, who is the founder credited on the site.',
        'The backend is where his own contribution is concrete. Julian Ortiz Alviar architected TalentosBackend, TALENTÜ\'s production backend, and its conventions are now public: his fastapi-lambda-cdk-template states in its README that it is based on the standards of TalentosBackend. That makes TALENTÜ the second of three cases where a system he shipped became a template he publishes and maintains — the others being HerbaFit on react-native-expo-stack, and this portfolio on next-stack.',
        'Two details are worth knowing for anyone linking to TALENTÜ. The brand\'s domain carries a non-ASCII character — talentü.com — which resolves as xn--talent-8ya.com in punycode, and that punycode form is what belongs in any machine-readable field. The domain talentu.com without the umlaut is a different, unrelated parked domain. The site itself is served as a static build from Amazon S3 behind Amazon CloudFront.',
      ],
      facts: [
        { label: 'Founder', value: 'Julián González, sports scientist' },
        { label: 'Backend', value: 'TalentosBackend, architected by Julian Ortiz Alviar' },
        { label: 'Domain', value: 'talentü.com, punycode xn--talent-8ya.com' },
        { label: 'Available in', value: 'Latin America, Spain, sub-Saharan Africa' },
      ],
      note: 'The TALENTÜ site credits sports scientist Julián González as its founder. Julian Ortiz Alviar is a technical co-founder, which is why this page claims a technical co-founder role and the structured data on it claims no founder relationship.',
      organizationDescription:
        'TALENTÜ is a football scouting platform where players upload match video, receive analyst feedback and reach verified scouts. TALENTÜ is available in Latin America, Spain and sub-Saharan Africa.',
    },
    riwin: {
      tagline:
        'Travel-guide publishing house with an online bookstore where every purchase earns raffle entries.',
      role: 'Co-Founder.',
      definition:
        'Riwin is a Colombian publishing house that sells researched travel guides through an online bookstore where every purchase also earns prize-draw entries.',
      metaTitle: 'Riwin — travel-guide publishing house',
      metaDescription:
        'Riwin sells researched travel guides online, and every purchase earns prize-draw entries. Julian Ortiz Alviar is a co-founder of Riwin.',
      description:
        'Riwin is a Colombian publishing house that sells researched travel guides through an online bookstore. Every book purchase at Riwin also earns entries into prize draws, and payments run through Openpay with a device-fingerprint anti-fraud step. Julian Ortiz Alviar is a co-founder of Riwin.',
      problem:
        'Travel guides compete with free content, so Riwin changes the incentive: buying a book is also an entry into a prize draw. The catalogue is editorial — researched, source-verified, professionally edited guides — and the commerce layer wraps each purchase in raffle tickets, which turns a one-off book sale into a repeat relationship.',
      contribution:
        'Julian Ortiz Alviar is a co-founder of Riwin. The public site does not itemise engineering credit, so no feature-level authorship claim is made here. The verifiable technical facts are the stack below and the fact that Riwin runs its own REST API at api-riwin.riwin.com.co.',
      features: [
        'A book catalogue browsable by destination and category',
        'Purchases that generate raffle ticket numbers, with an account page showing how many entries a reader holds',
        'A raffle lifecycle: draws open and close on their own schedule',
        'Stated editorial standards: exhaustive research with source verification, professional editing, practical advice from experienced travellers',
        'Accounts with email-code verification, per-channel notification preferences and self-service account deletion behind a double confirmation',
        'Card payments through Openpay, with a device-fingerprint anti-fraud step before the charge',
      ],
      narrative: [
        'Riwin is a publishing house that sells travel guides and describes itself as an editorial house that opens doors to the world through books. Each guide is positioned as a work of research rather than a listicle — exhaustive research with source verification, professional editing and editorial-quality design, practical information from experienced travellers — and the catalogue is organised so a reader can browse by destination and category.',
        'The commercial idea is the part worth noticing. Buying a book also earns raffle tickets, so the store runs a prize-draw system layered over the catalogue: purchases generate ticket numbers, an account page shows how many entries a reader holds, and draws open and close on their own lifecycle. Around that sits the machinery any real store needs — accounts with email-code verification, per-channel notification preferences, self-service account deletion, and card payments through Openpay with a device-fingerprint anti-fraud step before the charge.',
        'Julian Ortiz Alviar is a co-founder of Riwin. The platform is a React and TypeScript application on Vite talking to its own API at api-riwin.riwin.com.co. Parts of the storefront still use placeholder imagery, so Riwin is best described as live and early rather than a mature commercial operation.',
      ],
      facts: [
        { label: 'Payments', value: 'Openpay, with device-fingerprint anti-fraud' },
        { label: 'Status', value: 'Live, with parts of the storefront still pre-launch' },
      ],
      note: 'The Riwin site publishes claims about PCI-DSS Level 1 payment processing and regular security audits. Those are the product\'s own statements about itself and its payment processor, quoted here as site copy rather than restated as independently audited facts.',
      organizationDescription:
        'Riwin is a Colombian publishing house selling researched travel guides, where each book purchase also earns entries into prize draws.',
    },
    'lukiao-novapp': {
      tagline:
        'Colombian consumer-credit fintech: cédula-only credit applications, an instrumented credit simulator, and disbursement and instalment management.',
      role: 'Full Stack Developer at Lukiao, October 2021 to November 2022.',
      definition:
        'Lukiao is a Colombian consumer-credit fintech, now shipping as Novapp, whose platform takes a borrower from a cédula-only application to a disbursed loan and an instalment schedule.',
      metaTitle: 'Lukiao credit simulator, now Novapp',
      metaDescription:
        'Julian Ortiz Alviar built the credit simulator, the Davivienda recaudo microservices and payment integrations at the fintech Lukiao, now Novapp.',
      description:
        'Lukiao is a Colombian consumer-credit fintech where Julian Ortiz Alviar worked as a Full Stack Developer from October 2021 to November 2022. Julian Ortiz Alviar built the credit simulator, the Java microservices integrating Banco Davivienda for recaudo, and the payment integrations with Paymentez and Wompi. Lukiao now ships as Novapp.',
      problem:
        'Consumer lending in Colombia has to work for a borrower who has a national ID and little else. The Lukiao platform does the unglamorous parts: a borrower applies with nothing but a cédula, gets pre-approved, sees exactly what they will owe, chooses between two and eight fortnightly instalments at the legally constituted effective annual rate, and has the money sent to their bank account. The platform then tracks the instalment schedule, arrears, renewals and re-offers.',
      contribution:
        'Julian Ortiz Alviar built the Java microservices that integrate Lukiao with Banco Davivienda for recaudo (payment collection), and Davivienda recognised him as the first integrator to connect to their services successfully on the first attempt. Julian Ortiz Alviar also built the credit simulator, microservices and REST APIs integrating banks, payment gateways and credit bureaus, the database architecture and the responsive interfaces over it, payment integrations with Paymentez and Wompi including reconciliation, SOAP integrations with financial institutions, and the Lukiao mobile app.',
      features: [
        'A credit application that needs only a Colombian cédula',
        'Pre-approval, with the borrower shown exactly what they will owe',
        'A credit simulator, instrumented as a tracked stage inside the application funnel',
        'Instalment terms of two to eight fortnightly payments at the legally constituted effective annual rate',
        'An amortisation table with instalment dates and amounts',
        'Disbursement to the borrower\'s bank account, with disbursement-account management',
        'Renewal and re-offer flows, plus arrears and frozen-credit states',
        'Payments through Wompi, and a linked mobile app',
      ],
      narrative: [
        'Lukiao was a Colombian consumer-credit fintech where Julian Ortiz Alviar worked as a Full Stack Developer from October 2021 to November 2022. The product does the hard, unglamorous parts of lending: a borrower applies with nothing but a national ID, gets pre-approved, sees exactly what they will owe, chooses between two and eight fortnightly instalments at the legally constituted effective annual rate, and has the money sent to their bank account.',
        'His work spanned both sides. Julian Ortiz Alviar built the Java microservices that connect Lukiao to Banco Davivienda for recaudo, the payment-collection flow Colombian lenders depend on, and Davivienda recognised him as the first integrator to connect to their services successfully on the first attempt. He built microservices and REST APIs integrating banks, payment gateways and credit bureaus, payment processing through Paymentez and Wompi with reconciliation that has to balance, the database architecture and the responsive interfaces over it, the credit simulator, and the Lukiao mobile app.',
        'Lukiao has since been rebranded to Novapp. Julian Ortiz Alviar did not work on that rebranding, but much of what he built is still running inside Novapp, the credit simulator among it. That is verifiable from outside: the current Novapp production bundle still loads onboarding videos and assets from the lukiaostorage Amazon S3 bucket, and the simulator still appears by name in the funnel\'s own step instrumentation, as the stage users enter and leave when they accept a re-offer.',
      ],
      facts: [
        { label: 'Role dates', value: 'October 2021 to November 2022' },
        { label: 'Bank integration', value: 'Banco Davivienda recaudo, in Java' },
        { label: 'Now shipping as', value: 'Novapp' },
      ],
      note: 'Novapp is the rebrand of Lukiao. Julian Ortiz Alviar did not work on the rebranding, but much of what he built at Lukiao is still running inside Novapp — the credit simulator among it.',
    },
    mareaverde: {
      tagline:
        'SEO-engineered e-commerce for an indoor-growing shop in Palma de Mallorca, on a serverless AWS backend.',
      role: 'Freelance engineering work for an independent client. The client is not named here.',
      definition:
        'Marea Verde Growshop is an indoor-cultivation retailer in Palma de Mallorca whose online store is engineered as an answer engine rather than a catalogue.',
      metaTitle: 'Marea Verde — growshop e-commerce on AWS',
      metaDescription:
        'Marea Verde Growshop is a Palma de Mallorca e-commerce on a serverless AWS backend. Julian Ortiz Alviar built it as freelance client work.',
      description:
        'Marea Verde Growshop is an indoor-cultivation retailer in Palma de Mallorca whose bilingual online store runs on a serverless Amazon Web Services backend. The store publishes cultivation guides, per-product question threads and a grow-tent wattage calculator alongside its catalogue. Julian Ortiz Alviar built it as freelance engineering work.',
      problem:
        'A local specialist shop competing against generic marketplaces has one lever: being the best answer to a specific question. So the site is built as an answer engine rather than a catalogue — real stock counts, step-by-step cultivation guides, per-product question threads, a wattage calculator, and a search-engine surface engineered far past the usual storefront.',
      contribution:
        'Julian Ortiz Alviar built this store as freelance engineering work for an independent client. The work covers the React and TypeScript storefront, the serverless backend on Amazon API Gateway, the bilingual routing with a correct hreflang set, the segmented XML sitemap index, and the granular cookie-consent and age-gating required for this product category in the European Union.',
      features: [
        'Catalogue categories for lighting, substrates and nutrients, climate control, irrigation, genetics and harvest',
        'Real-time stock counts shown per product, with a same-day dispatch promise',
        'A cultivation calculator that turns a grow tent\'s dimensions into the LED wattage and coverage it needs',
        'Step-by-step cultivation guides and a blog written by the people behind the counter',
        'Per-product question threads and customer star ratings with localized accessible labels',
        'Card payments through Stripe',
        'Spanish and English editions with a correct hreflang set and a canonical URL',
        'A sitemap index fanning out into seven child sitemaps: static pages, products, categories, blog, guides, landings and comparisons',
        'Granular, revocable cookie consent separating strictly necessary storage from analytics, plus the 18+ age gate required for this category',
      ],
      narrative: [
        'Marea Verde Growshop is an indoor-cultivation retailer in Palma de Mallorca whose online store is engineered as an answer engine rather than a catalogue. The shop\'s advantage over a generic marketplace is knowledge, so the site puts knowledge in front: step-by-step cultivation guides, articles written by whoever is behind the counter, per-product question threads, customer ratings, and a calculator that turns a grow tent\'s dimensions into the LED wattage and coverage it actually needs.',
        'Technically it is a React and TypeScript single-page app on Vite, validating with Zod and taking payments through Stripe, backed by a serverless API on Amazon API Gateway. It ships in Spanish and English with a correct hreflang set, a canonical URL, the 18+ age gate required in the European Union for this product category, and a revocable, granular cookie consent that separates strictly necessary storage from analytics.',
        'The search surface is unusually thorough for a shop this size: a sitemap index fanning out into seven child sitemaps — static pages, products, categories, blog, guides, landings and product comparisons — each carrying its own lastmod. Julian Ortiz Alviar built the store as freelance engineering work for an independent client, and the client is not named here.',
      ],
      facts: [
        { label: 'Engagement', value: 'Freelance, independent client' },
        { label: 'Backend', value: 'Serverless, Amazon API Gateway' },
        { label: 'Locales', value: 'es-ES and en, with x-default' },
      ],
      note: 'This was freelance engineering work for an independent client. The client is deliberately not named, and no organization entity is claimed for someone else\'s business.',
    },
    herbafit: {
      tagline:
        'The official Herbalife fitness app for Android: guided training, smart-scale body tracking and wearable sync.',
      role: 'Developer, at BTi Group.',
      definition:
        'HerbaFit is the official Herbalife fitness application for Android, built with React Native and Expo and published on Google Play by BTi Group.',
      metaTitle: 'HerbaFit — official Herbalife Android app',
      metaDescription:
        'HerbaFit offers guided training, smart-scale body tracking and wearable sync. Julian Ortiz Alviar worked on the app at BTi Group.',
      description:
        'HerbaFit is the official Herbalife fitness application for Android, built with React Native and Expo and published on Google Play by BTi Group. HerbaFit provides a guided-training video library, body-metric tracking through a paired smart scale, and activity synchronisation from wearable devices.',
      problem:
        'Herbalife distributors and customers track body metrics across a scale, a wearable and a paper log that never agree. HerbaFit consolidates all three into one account: a guided-training video library, body metrics captured directly from a paired smart scale, and wearable sync so activity data lands in the same place as the weigh-ins.',
      contribution:
        'HerbaFit is built with React Native and Expo. Julian Ortiz Alviar worked on the HerbaFit Android app while at BTi Group. Separately at BTi Group, Julian Ortiz Alviar worked on the "Let\'s All Do Good" platform — a single codebase that produces multiple organization-branded white-label apps, whose client organizations are labor unions — and implemented the deployment workflow that ships all of those apps. Feature-level attribution inside HerbaFit is not established, so none is claimed here.',
      features: [
        'A guided-training library of video and multimedia routines',
        'Advanced body tracking: weight, measurements and other indicators captured from a paired smart scale',
        'Synchronisation with wearable devices so activity and progress consolidate in one account',
        'Free to install, rated suitable for all audiences',
        'Built with React Native and Expo, and published on Google Play by BTi Group',
      ],
      narrative: [
        'HerbaFit is the official Herbalife fitness app for Android, published on Google Play by BTi Group, where it holds a 4.25 out of 5 rating from 63 ratings and has passed 10,000 installs, as of September 2026. HerbaFit gives Herbalife customers one place for the three things that normally live apart: a guided-training library of video and multimedia routines, body metrics such as weight and measurements captured straight from a paired smart scale, and activity synced in from wearable devices.',
        'HerbaFit is built with React Native and Expo, and Julian Ortiz Alviar worked on it while at BTi Group. At BTi Group he also worked on a separate piece of work: the "Let\'s All Do Good" platform, a family of white-label apps produced from one single codebase, where each app is a branded container for a client organization and those client organizations are labor unions. Julian Ortiz Alviar implemented the deployment workflow that ships all of those apps — one codebase, many separately branded releases, and a pipeline that has to put the right build in the right store listing every time.',
        'HerbaFit is also the clearest through-line in this portfolio. Julian Ortiz Alviar ships production mobile apps on React Native and Expo, and he maintains a public starter for that exact stack — react-native-expo-stack, his most-starred repository. The template was not extracted from HerbaFit; the claim is narrower and checkable, which is that the stack he runs in production is the stack he has codified in the open. One caveat, stated plainly: BTi Group appears nowhere on the résumé of Julian Ortiz Alviar, so this project is credited on its own page and is deliberately not attached to any entry in the experience timeline.',
      ],
      facts: [
        { label: 'Publisher', value: 'BTi Group, on Google Play' },
        { label: 'Built with', value: 'React Native and Expo' },
        { label: 'Package', value: 'com.herbalife.herbafit' },
        {
          label: 'Rating',
          value: '4.25 out of 5 from 63 ratings on Google Play, as of September 2026',
        },
        { label: 'Installs', value: 'More than 10,000, as of September 2026' },
      ],
      note: 'BTi Group does not appear on the résumé of Julian Ortiz Alviar, so this project links to no entry in the experience timeline. No individual partner app other than HerbaFit is named, and no claim is made about a vendor relationship behind the platform.',
    },
  },
}
