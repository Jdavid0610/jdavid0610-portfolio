import type { MetadataRoute } from 'next'
import { siteConfig } from '@/shared/config/site'

/**
 * Answer-time retrieval agents. These decide whether this site can be fetched,
 * indexed and **cited inside a generated answer**. Blocking one of these
 * removes Julian Ortiz Alviar from that assistant's answers, which is the
 * opposite of what this site exists for.
 */
const AI_RETRIEVAL_AGENTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
]

/**
 * Model training and grounding. Allowed by default: this is a public résumé
 * with nothing confidential in it, so training inclusion is free, durable
 * distribution. If crawl volume ever becomes a problem, these — and only
 * these — are the tokens worth restricting.
 */
const AI_TRAINING_AGENTS = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'cohere-ai',
  'meta-externalagent',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // `/api/health` is a liveness probe, not content: nothing to index.
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      // Functionally the same as the rule above; its value is documentary —
      // the policy is stated in a file anyone auditing the site can read.
      { userAgent: [...AI_RETRIEVAL_AGENTS, ...AI_TRAINING_AGENTS], allow: '/' },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
