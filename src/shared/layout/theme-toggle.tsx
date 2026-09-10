'use client'

import { useSyncExternalStore } from 'react'
import { useTranslations } from '@/shared/i18n/i18n-provider'

type Theme = 'dark' | 'light'

/**
 * The site ships dark and stays dark unless the visitor says otherwise, so
 * this writes an explicit choice rather than toggling a preference: the value
 * lands in `localStorage` and on `documentElement.dataset.theme`, which is what
 * the light palette in `globals.css` is keyed on.
 *
 * `data-theme` on the root element is the single source of truth — the
 * pre-paint script in the root layout has already applied a stored choice by
 * the time this mounts, so reading React state back from the DOM (rather than
 * keeping a second copy in `useState`) is what keeps the two from disagreeing.
 */
function subscribe(onStoreChange: () => void): () => void {
  const observer = new MutationObserver(onStoreChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  return () => observer.disconnect()
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

/** Dark is the CSS default, so that is what the prerendered HTML shows. */
function getServerSnapshot(): Theme {
  return 'dark'
}

export function ThemeToggle() {
  const t = useTranslations()
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    // Writing the attribute is the state change; the observer above re-renders.
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // A private window that refuses storage still gets the theme it clicked;
      // it just will not survive the next navigation. Not worth failing over.
    }
  }

  return (
    <button type="button" onClick={toggle} className="icon-btn" aria-pressed={theme === 'light'}>
      <span className="sr-only">
        {theme === 'dark' ? t.common.themeToLight : t.common.themeToDark}
      </span>
      {theme === 'dark' ? (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </svg>
      ) : (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  )
}
