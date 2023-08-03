import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Creating a note:', () => {
  test('should succeed with correct values', async ({ page }) => {
    await expect(page.getByText(/^0$/)).toBeVisible()

    await page.getByRole('link', { name: /new note/i }).click()
    await expect(page).toHaveURL(/.*new/)

    const titleInput = page.getByPlaceholder(/the title/i)
    await expect(titleInput).toBeEmpty()
    await expect(titleInput).toBeFocused()
    await titleInput.fill('Testing note')
    await titleInput.press('Tab')

    const contentInput = page.getByPlaceholder(/write the note/i)
    await expect(contentInput).toBeEmpty()
    await expect(contentInput).toBeFocused()
    await contentInput.fill('This should be created')

    await page.getByRole('button', { name: /create/i }).click()
    await page.getByText(/yes/i).click()

    await expect(page.getByText(/created successfully/i)).toBeVisible()
    await expect(page.getByText(/^1$/)).toBeVisible()
    await expect(page.getByRole('link', { name: /testing note/i })).toBeVisible()
  })

  test('min length of values should be validated', async ({ page }) => {
    await page.getByRole('link', { name: /new note/i }).click()

    const createBtn = page.getByRole('button', { name: /create/i })
    await createBtn.click()

    await expect(page.getByText(/title must be at least 3 characters long/i)).toBeVisible()

    const titleInput = page.getByPlaceholder(/the title/i)
    await expect(titleInput).toBeFocused()
    await titleInput.fill('Testing min length')

    await expect(page.getByText(/content must be at least 10 characters long/i)).toBeVisible()
    await page.getByPlaceholder(/write the note/i).fill('Hopefully should pass now')

    await createBtn.click()
    await page.getByText(/yes/i).click()

    await expect(page.getByText(/created successfully/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /testing min length/i })).toBeVisible()
  })

  test('politeness of values should be validated', async ({ page }) => {
    await page.getByRole('link', { name: /new note/i }).click()

    const titleInput = page.getByPlaceholder(/the title/i)
    await titleInput.fill('This sh1t should not pass')

    const contentInput = page.getByPlaceholder(/write the note/i)
    await contentInput.fill('What the hell is this')

    const createBtn = page.getByRole('button', { name: /create/i })

    await createBtn.click()
    await expect(page.getByText("Please, don't use bad words").first()).toBeVisible()

    await titleInput.clear()
    await titleInput.fill('Testing politeness')

    await expect(page.getByText("Please, don't use bad words")).toBeVisible()

    await contentInput.clear()
    await contentInput.fill('Nice to meet you')

    await createBtn.click()
    await page.getByText(/yes/i).click()

    await expect(page.getByText(/created successfully/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /testing politeness/i })).toBeVisible()
  })
})
