import { cn } from '@/shared/lib/cn'
import type { Profile, SkillTier } from '../domain/types'

const tierStyles: Record<Exclude<SkillTier, 'listed'>, string> = {
  core: 'border-brand/40 bg-brand-subtle text-brand font-medium',
  strong: 'border-border-strong bg-surface text-fg',
  working: 'border-border bg-subtle text-faint',
}

/**
 * Skills grouped by domain and ranked by evidence rather than by a bar chart
 * nobody can verify. `core` and `strong` read as strengths; `working` is
 * visually quieter; bare résumé labels are confined to the row below and never
 * enter the graph.
 */
export function SkillGroups({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-col gap-8">
      {profile.skillGroups.map((group) => (
        <div key={group.key}>
          <h3 className="text-sm font-semibold tracking-wide uppercase text-faint">
            {profile.categoryLabels[group.key]}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <li
                key={skill.name}
                title={skill.note ?? profile.tierLabels[skill.tier]}
                className={cn(
                  'rounded border px-2 py-0.5 text-sm',
                  tierStyles[skill.tier],
                )}
              >
                {skill.name}
                <span className="sr-only"> — {profile.tierLabels[skill.tier]}</span>
              </li>
            ))}
          </ul>
          {group.skills.some((skill) => skill.note) ? (
            <ul className="mt-2 flex flex-col gap-1 text-xs text-faint">
              {group.skills
                .filter((skill) => skill.note)
                .map((skill) => (
                  <li key={skill.name}>
                    {skill.name}: {skill.note}
                  </li>
                ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export function SkillTierLegend({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-wrap gap-2">
        {(['core', 'strong', 'working'] as const).map((tier) => (
          <li key={tier} className={cn('rounded border px-2 py-0.5 text-sm', tierStyles[tier])}>
            {profile.tierLabels[tier]}
          </li>
        ))}
      </ul>
      <p className="max-w-measure text-sm text-pretty text-muted">{profile.tierNote}</p>
    </div>
  )
}

export function AlsoListedSkills({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-wrap gap-1.5">
        {profile.alsoListed.map((skill) => (
          <li
            key={skill}
            className="rounded border border-dashed border-border px-2 py-0.5 text-sm text-faint"
          >
            {skill}
          </li>
        ))}
      </ul>
      <p className="max-w-measure text-sm text-pretty text-muted">{profile.alsoListedNote}</p>
    </div>
  )
}
