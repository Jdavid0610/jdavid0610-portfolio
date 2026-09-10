import type { PostCopy, PostSlug } from '../domain/types'

export const postsEn: Record<PostSlug, PostCopy> = {
  'templates-from-production': {
    title: 'Templates worth using come from production',
    description:
      'A starter template is only worth cloning if it encodes decisions that survived a real deployment. Here is where each of my five templates comes from.',
    blocks: [
      {
        type: 'paragraph',
        text: 'A starter template is a set of decisions someone else already made for you. That is its whole value, and also its whole risk: if those decisions were never tested against a shipping product, cloning the repository buys you nothing but a directory layout.',
      },
      {
        type: 'paragraph',
        text: 'I maintain five public templates, and each one exists because I had already made the same decisions twice and did not want to make them a third time from scratch.',
      },
      { type: 'heading', text: 'Where each one comes from' },
      {
        type: 'list',
        items: [
          'next-stack is the template this portfolio runs on. Every convention it defines — the one-way dependency rule, the typed-content pattern, the SEO helpers, the i18n route structure — is running in public on my own name.',
          'react-native-expo-stack codifies the React Native and Expo stack that HerbaFit, the official Herbalife fitness app for Android, ships on.',
          'fastapi-lambda-cdk-template is based on the standards of TalentosBackend, the production backend of TALENTÜ.',
          'vite-stack is the single-page client I reach for when a job does not need a server, and express-hexagonal is the Node counterpart to the FastAPI template.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The claim I am making is narrow on purpose. None of these templates is a verbatim extraction of a client codebase, and none of them is a rewrite of a product. They are the conventions those systems settled on, written down in a form that compiles.',
      },
      { type: 'heading', text: 'What that buys a reader' },
      {
        type: 'paragraph',
        text: 'It means the awkward parts are already solved. A template written to be published tends to be complete where it is easy and vague where it is hard — authentication, internationalisation, deployment, the boundary between routing and business logic. A template extracted from something that shipped is complete precisely where the shipping hurt.',
      },
      {
        type: 'paragraph',
        text: 'It also means I notice when a template rots. This site is a deployment of next-stack, so a decision in the template that turns out to be wrong becomes my problem before it becomes yours.',
      },
    ],
  },
  'typed-content-instead-of-markdown': {
    title: 'Typed content instead of markdown',
    description:
      'Every word on this site is a typed TypeScript object, not a markdown file. That turns a missing Spanish translation into a compile error.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Every page of this portfolio is generated from typed TypeScript objects. There is no markdown parser in the dependency list, no content directory full of files with front matter, and no CMS.',
      },
      {
        type: 'paragraph',
        text: 'That is an unusual choice, so it is worth saying what it buys.',
      },
      { type: 'heading', text: 'A missing translation stops the build' },
      {
        type: 'paragraph',
        text: 'This site ships in English and Spanish, and every page exists in both. The dictionary type is inferred from the English file, so a key that exists in English and not in Spanish is a type error rather than an English sentence served to a Spanish reader. The same rule covers the projects, the templates, the experience timeline and the FAQ.',
      },
      {
        type: 'paragraph',
        text: 'With markdown files, that guarantee does not exist. A translation you forgot is a file that is simply absent, and nothing fails until a reader lands on it.',
      },
      { type: 'heading', text: 'Facts live in one place, prose in two' },
      {
        type: 'paragraph',
        text: 'Each content module separates the facts from the copy. URLs, dates, categories, star counts and entity relationships live in one locale-independent file; the sentences live in one file per language. That split means the English page and the Spanish page can disagree about wording and can never disagree about a URL.',
      },
      {
        type: 'paragraph',
        text: 'It also means the structured data on every page is generated from the same objects as the visible text, which is the only reliable way to keep JSON-LD and rendered copy saying the same thing.',
      },
      { type: 'heading', text: 'The cost' },
      {
        type: 'paragraph',
        text: 'Writing prose inside a TypeScript file is less pleasant than writing markdown, and quoting is fiddly. For a site with a fixed set of pages and a hard bilingual requirement, that trade is easy. For a publication with fifty authors, it would be the wrong call.',
      },
    ],
  },
  'building-for-answer-engines': {
    title: 'Building a site to be quoted, not just ranked',
    description:
      'Search engines rank links. Answer engines extract sentences. Optimising for the second one changes how you write and what you emit.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Classic search optimisation tries to rank a page in a list of links. An answer engine does something different: it extracts a sentence or two and presents them as the answer, sometimes with a citation and sometimes without one. Writing for the second case changes both the markup and the prose.',
      },
      { type: 'heading', text: 'Emit entities, not just pages' },
      {
        type: 'paragraph',
        text: 'This site emits one connected JSON-LD graph per page, rather than several disconnected blocks. A single Person entity is anchored at a stable identifier and referenced from every other entity on the site, so an engine resolving "who authored this software?" follows a reference instead of guessing from proximity.',
      },
      {
        type: 'paragraph',
        text: 'Every structured-data block is rendered on the server and present in the initial HTML, because several AI crawlers do not execute JavaScript. Structured data injected from a client effect is structured data that some readers never see.',
      },
      { type: 'heading', text: 'Write sentences that survive being quoted alone' },
      {
        type: 'list',
        items: [
          'Repeat the entity name instead of using a pronoun to open a claim. An extracted sentence beginning with "He" has lost its subject.',
          'State dates absolutely. "Since July 2023" stays true in a cache; "recently" is wrong the moment it is stored.',
          'Put one claim in one sentence, so it can be cited without importing a second claim.',
          'Open each section with a definition rather than a hook, because the first sentence after a heading is the most-extracted string on a page.',
          'Give every number a unit, a date and a source.',
        ],
      },
      { type: 'heading', text: 'Publish a map for machines' },
      {
        type: 'paragraph',
        text: 'This site serves an llms.txt file: a plain-text index of what exists and where, generated from the same typed content that renders the pages. It is a convention rather than a standard, and it is cheap insurance — a model that fetches one file gets the shape of the whole site instead of inferring it from HTML.',
      },
      {
        type: 'paragraph',
        text: 'The robots policy is the other half. Retrieval agents decide whether a site can be cited in an answer at all, and training agents decide whether it enters a model. This site allows both, and says so explicitly in a named, commented list rather than leaving the distinction implicit.',
      },
    ],
  },
}
