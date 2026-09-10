import { expect, test } from '@playwright/test'

/** Unique per run so the suite can be re-run against the same database. */
const run = Date.now()
const account = {
  name: 'E2E User',
  email: `e2e-${run}@example.com`,
  password: 'password123',
}
/** Slugs are unique per language across every author, so the title varies too. */
const postTitle = `Hello from Playwright ${run}`
const postSlug = `hello-from-playwright-${run}`

test('redirects the root to a locale-prefixed URL', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/(en|es)$/)
})

test('sends a signed-out visitor from a protected page to sign-in, with a callback', async ({
  page,
}) => {
  await page.goto('/en/dashboard')
  await expect(page).toHaveURL(/\/en\/sign-in\?callbackUrl=/)
})

test('sign up, create a post, sign out', async ({ page }) => {
  await page.goto('/en/sign-up')

  await page.getByLabel('Name').fill(account.name)
  await page.getByLabel('Email').fill(account.email)
  await page.getByLabel('Password', { exact: true }).fill(account.password)
  await page.getByLabel('Confirm password').fill(account.password)
  await page.getByRole('button', { name: 'Sign up' }).click()

  await expect(page).toHaveURL(/\/en\/dashboard/)

  await page.getByRole('link', { name: 'New post' }).first().click()
  await page.getByLabel('Title').fill(postTitle)
  await page.getByLabel('Content').fill('Written by an end-to-end test.')
  // The slug is derived from the title by usePostForm.
  await expect(page.getByLabel('Slug')).toHaveValue(postSlug)
  await page.getByRole('button', { name: 'Save' }).click()

  await expect(page).toHaveURL(/\/en\/posts(\?|$)/)
  await expect(page.getByText(postTitle)).toBeVisible()

  // Deleting raises a global toast — the row is already gone, so there is no
  // longer an inline place to report the outcome.
  page.on('dialog', (dialog) => dialog.accept())
  await page
    .getByRole('listitem')
    .filter({ hasText: postTitle })
    .getByRole('button', { name: 'Delete' })
    .click()

  const toast = page.getByRole('list', { name: 'Notifications' })
  await expect(toast.getByText('Post deleted.')).toBeVisible()
  await expect(page.getByText(postTitle)).toBeHidden()

  // It dismisses itself; nothing is left on screen to clean up.
  await expect(toast.getByText('Post deleted.')).toBeHidden({ timeout: 10_000 })

  await page.getByRole('button', { name: /E/ }).last().click()
  await page.getByRole('button', { name: 'Sign out' }).click()
  await expect(page).toHaveURL(/\/en$/)
})

test('shows the locale switcher and swaps language in place', async ({ page }) => {
  await page.goto('/en')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('already a backend')

  await page.getByRole('button', { name: 'es' }).click()
  await expect(page).toHaveURL(/\/es$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('ya es un backend')
})

test('shows validation errors in the visitor\'s language', async ({ page }) => {
  // Regression: schemas emit message keys and the action boundary translates
  // them, so a Spanish visitor must never see an English validation message.
  await page.goto('/es/sign-in')
  await page.getByLabel('Correo').fill('no-es-un-correo')
  await page.getByLabel('Contraseña').fill('x')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()

  await expect(page.getByRole('alert').first()).toHaveText('Escribe un correo válido.')

  await page.goto('/en/sign-in')
  await page.getByLabel('Email').fill('not-an-email')
  await page.getByLabel('Password').fill('x')
  await page.getByRole('button', { name: 'Sign in' }).click()

  await expect(page.getByRole('alert').first()).toHaveText('Enter a valid email address.')
})

test('rejects wrong credentials in the visitor\'s language', async ({ page }) => {
  await page.goto('/es/sign-in')
  await page.getByLabel('Correo').fill('admin@example.com')
  await page.getByLabel('Contraseña').fill('contraseña-incorrecta')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()

  // Better Auth's own message is English prose; our key wins.
  await expect(page.getByRole('status').first()).toContainText(
    'El correo o la contraseña no son correctos.',
  )
})

test('serves blog content in the visitor\'s language', async ({ page }) => {
  await page.goto('/es/blog')
  await expect(page.getByRole('heading', { name: 'Dónde va realmente la autorización' })).toBeVisible()

  await page.goto('/en/blog')
  await expect(page.getByRole('heading', { name: 'Where authorization actually belongs' })).toBeVisible()
})

test('publishes documentation in the app, in both languages', async ({ page }) => {
  await page.goto('/en/docs')
  await expect(page.getByRole('heading', { name: 'Documentation', level: 1 })).toBeVisible()

  await page
    .getByRole('navigation', { name: 'Documentation' })
    .getByRole('link', { name: 'What this is' })
    .click()
  await expect(page).toHaveURL(/\/en\/docs\/overview/)

  // The live panel reports the deployment's real state, not a screenshot of it.
  await expect(page.getByText('Signed out')).toBeVisible()
  await expect(page.getByText('Data source')).toBeVisible()

  await page.getByRole('button', { name: 'es' }).click()
  await expect(page).toHaveURL(/\/es\/docs\/overview/)
  await expect(page.getByRole('heading', { name: 'Qué es esto', level: 1 })).toBeVisible()
})
