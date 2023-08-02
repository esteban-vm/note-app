import { test, expect } from '@playwright/test'

test.beforeEach(({ page }) => {
  page.setDefaultTimeout(5_000)
})

test.skip('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/)
})

test.skip('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/)
})

test('Note app has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/note app/i)
})
