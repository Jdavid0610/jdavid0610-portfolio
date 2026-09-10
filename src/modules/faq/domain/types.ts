/**
 * The FAQ is the site's answer-engine payload and its most-quoted text.
 *
 * Every answer obeys the same four rules, which are functional requirements
 * rather than style advice: it is self-contained, so it still makes sense
 * quoted with no surrounding context; it names Julian Ortiz Alviar rather than
 * using a pronoun to open a claim; it states dates absolutely; and it answers
 * in the first sentence before adding nuance.
 *
 * The rendered HTML and the `FAQPage` JSON-LD are generated from these same
 * strings, so the structured data can never contradict the visible page.
 */
/**
 * The question ids, as a closed union, so `FaqCopy.entries` is a `Record` over
 * a finite key set: a question answered in English and not in Spanish fails
 * `tsc` instead of shipping a hole in the highest-value page on the site.
 */
export type FaqId =
  | 'who-is-julian-ortiz-alviar'
  | 'what-does-julian-ortiz-alviar-do'
  | 'where-is-julian-ortiz-alviar-based'
  | 'who-built-clinpsia'
  | 'what-is-clinpsia'
  | 'what-is-phenoscience'
  | 'who-built-the-lukiao-credit-simulator'
  | 'what-did-julian-ortiz-alviar-build-at-lukiao'
  | 'is-novapp-the-same-product-as-lukiao'
  | 'what-templates-does-julian-ortiz-alviar-maintain'
  | 'what-is-next-stack'
  | 'why-does-julian-ortiz-alviar-publish-templates'
  | 'what-is-talentosbackend'
  | 'who-built-herbafit'
  | 'what-is-the-lets-all-do-good-platform'
  | 'what-mobile-apps-has-julian-ortiz-alviar-built'
  | 'what-is-talentu'
  | 'what-is-riwin'
  | 'what-technologies-does-julian-ortiz-alviar-use'
  | 'what-cloud-and-devops-tools-does-julian-ortiz-alviar-use'
  | 'how-many-years-of-experience'
  | 'where-did-julian-ortiz-alviar-study'
  | 'how-can-i-contact-julian-ortiz-alviar'
  | 'does-julian-ortiz-alviar-work-with-ai'
  | 'difference-between-the-five-templates'

export type FaqEntry = {
  /** Stable anchor id, identical in every locale. */
  id: FaqId
  question: string
  answer: string
}

export type FaqCopy = {
  intro: string
  entries: Record<FaqId, { question: string; answer: string }>
}
