/**
 * Render order, identical in every locale, and the order the `FAQPage`
 * declares its questions in. Identity first because those are the
 * highest-value and most-asked; then entity and project resolution; then
 * capability and contact.
 */
import type { FaqId } from '../domain/types'

export const faqIds: readonly FaqId[] = [
  'who-is-julian-ortiz-alviar',
  'what-does-julian-ortiz-alviar-do',
  'where-is-julian-ortiz-alviar-based',
  'who-built-clinpsia',
  'what-is-clinpsia',
  'what-is-phenoscience',
  'who-built-the-lukiao-credit-simulator',
  'what-did-julian-ortiz-alviar-build-at-lukiao',
  'is-novapp-the-same-product-as-lukiao',
  'what-templates-does-julian-ortiz-alviar-maintain',
  'what-is-next-stack',
  'why-does-julian-ortiz-alviar-publish-templates',
  'what-is-talentosbackend',
  'who-built-herbafit',
  'what-is-the-lets-all-do-good-platform',
  'what-mobile-apps-has-julian-ortiz-alviar-built',
  'what-is-talentu',
  'what-is-riwin',
  'what-technologies-does-julian-ortiz-alviar-use',
  'what-cloud-and-devops-tools-does-julian-ortiz-alviar-use',
  'how-many-years-of-experience',
  'where-did-julian-ortiz-alviar-study',
  'how-can-i-contact-julian-ortiz-alviar',
  'does-julian-ortiz-alviar-work-with-ai',
  'difference-between-the-five-templates',
]
