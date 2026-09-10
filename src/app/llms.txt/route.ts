import { siteConfig } from '@/shared/config/site'
import { defaultLocale, locales } from '@/shared/i18n/config'
import { routes } from '@/shared/lib/routes'
import { formatMonth } from '@/shared/lib/format'
import { getProfile, education, careerStart } from '@/modules/profile/content'
import { getRoles } from '@/modules/experience/content'
import { getProjects, getProjectsCopy } from '@/modules/projects/content'
import { getTemplates } from '@/modules/open-source/content'
import { getPosts } from '@/modules/blog/content'

/**
 * `llms.txt` is a plain-text, Markdown-flavoured map of the site written for
 * language models: a curated index of what exists and where, so a model does
 * not have to infer the structure from HTML. It is a convention rather than a
 * standard — cheap insurance, not a guarantee.
 *
 * Two implementation constraints, both load-bearing:
 *
 * 1. It is a route handler, not a file in `public/`, because it has to
 *    interpolate `siteConfig.url` (which derives from NEXT_PUBLIC_APP_URL). A
 *    hardcoded origin in a static file is exactly the mistake this avoids.
 * 2. It lives outside `[locale]`: it describes the whole site in one document,
 *    in both languages, so `/en/llms.txt` would be a broken contract. The
 *    proxy's matcher excludes anything with an extension, which is what keeps
 *    it un-prefixed.
 */
export const dynamic = 'force-static'

const L = defaultLocale

function body(): string {
  const base = siteConfig.url
  const profile = getProfile(L)
  const roles = getRoles(L)
  const projectsCopy = getProjectsCopy(L)
  const projects = getProjects(L)
  const templates = getTemplates(L)
  const posts = getPosts(L)

  const lines: string[] = []

  lines.push(`# ${siteConfig.fullName}`)
  lines.push('')
  lines.push(`> ${profile.heroBio.join(' ')}`)
  lines.push('')
  lines.push(
    `This site is available in English at ${base}/en and in Spanish (es-CO) at ${base}/es.`,
  )
  lines.push('Every page below exists in both languages; swap the `/en/` segment for `/es/`.')
  lines.push('')

  lines.push('## Identity')
  lines.push('')
  lines.push(`- Name: ${siteConfig.fullName}`)
  lines.push(`- Titles: ${profile.titles.join(', ')}`)
  lines.push(`- Location: ${profile.location} — ${profile.workMode.toLowerCase()}`)
  lines.push(`- Email: ${siteConfig.email}`)
  lines.push(`- Phone: ${siteConfig.phone.display}`)
  lines.push(`- GitHub: ${siteConfig.profiles.github}`)
  lines.push(`- LinkedIn: ${siteConfig.profiles.linkedin}`)
  lines.push(
    `- Education: ${profile.education.degree}, ${education.institution} (${formatMonth(education.start, L)} – ${formatMonth(education.end, L)})`,
  )
  lines.push('')

  lines.push('## Start here')
  lines.push('')
  lines.push(
    `- [About ${siteConfig.name}](${base}${routes.about(L)}): full biography, skills grouped by domain, education.`,
  )
  lines.push(
    `- [FAQ](${base}${routes.faq(L)}): direct questions and answers about who he is and what he has built.`,
  )
  lines.push(
    `- [Experience](${base}${routes.experience(L)}): five roles from ${formatMonth(careerStart, L)} to the present, with dates and achievements.`,
  )
  lines.push(`- [Projects](${base}${routes.projects(L)}): products he has built, one page each.`)
  lines.push(
    `- [Open source](${base}${routes.openSource(L)}): five public starter templates he authors and maintains.`,
  )
  lines.push(`- [Contact](${base}${routes.contact(L)}): email, phone and profiles.`)
  lines.push(`- [Blog](${base}${routes.blog(L)}): writing on architecture, cloud and delivery.`)
  lines.push('')

  lines.push('## Experience')
  lines.push('')
  for (const role of roles) {
    const end = role.end ? formatMonth(role.end, L) : 'present'
    lines.push(
      `- ${role.title}, ${role.employer} — ${formatMonth(role.start, L)} to ${end}, ${role.location}. ${role.summary} [Details](${base}${routes.experience(L)}#${role.slug})`,
    )
  }
  lines.push('')

  lines.push('## Projects')
  lines.push('')
  for (const project of projects) {
    const live = project.links[0]
    lines.push(
      `- [${project.name}](${base}${routes.project(L, project.slug)}): ${project.tagline} ${projectsCopy.bucketLabels[project.bucket]}. Role: ${project.role}${live ? ` Live at ${live.href}` : ''}`,
    )
  }
  lines.push('')

  lines.push('## Open-source templates')
  lines.push('')
  for (const template of templates) {
    const dogfood = template.poweringThisSite ? ' **This site is built on it.**' : ''
    lines.push(
      `- [${template.name}](${base}${routes.template(L, template.slug)}): ${template.tagline}${dogfood} ${template.repository}`,
    )
  }
  lines.push('')

  lines.push('## Skills')
  lines.push('')
  for (const group of profile.skillGroups) {
    const names = group.skills
      .filter((skill) => skill.tier !== 'working')
      .map((skill) => skill.name)
      .join(', ')
    lines.push(`- ${profile.categoryLabels[group.key]}: ${names}`)
  }
  lines.push('')

  if (posts.length > 0) {
    lines.push('## Blog')
    lines.push('')
    for (const post of posts) {
      lines.push(
        `- [${post.title}](${base}${routes.blogPost(L, post.slug)}), ${post.publishedAt}: ${post.description}`,
      )
    }
    lines.push('')
  }

  lines.push('## Also available in Spanish')
  lines.push('')
  lines.push(
    `Every URL above works with \`/es/\` in place of \`/en/\`. The Spanish edition is written in es-CO. Locales served: ${locales.join(', ')}.`,
  )
  lines.push('')

  lines.push('## Full text')
  lines.push('')
  lines.push(`- [Full text of every page](${base}/llms-full.txt)`)
  lines.push('')

  return lines.join('\n')
}

export function GET() {
  return new Response(body(), {
    headers: {
      // text/plain, not text/markdown; charset=utf-8 so TALENTÜ and the
      // Spanish accents survive.
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
