import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('creating a note', () => {
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
    await titleInput.fill('This sh!t should not pass')

    const contentInput = page.getByPlaceholder(/write the note/i)
    await contentInput.fill('What the fuk* is this')

    const createBtn = page.getByRole('button', { name: /create/i })
    await createBtn.click()

    const message = page.getByText("Please, don't use bad words")
    await expect(message.first()).toBeVisible()

    await titleInput.clear()
    await titleInput.fill('Testing politeness')

    await expect(message).toBeVisible()

    await contentInput.clear()
    await contentInput.fill('Nice to meet you')

    await createBtn.click()
    await page.getByText(/yes/i).click()

    await expect(page.getByText(/created successfully/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /testing politeness/i })).toBeVisible()
  })
})

test('editing a note', async ({ page }) => {
  await page.getByRole('link', { name: /new note/i }).click()
  await page.getByPlaceholder(/the title/i).fill('Note to update')
  await page.getByPlaceholder(/write the note/i).fill('This note should be updated')
  await page.getByRole('button', { name: /create/i }).click()
  await page.getByText(/yes/i).click()

  await page.getByRole('link', { name: /note to update/i }).click()
  await expect(page).toHaveURL(/.*note-./)

  const titleInput = page.getByPlaceholder(/the title/i)
  await expect(titleInput).not.toBeEmpty()
  await expect(titleInput).not.toBeFocused()
  await titleInput.clear()
  await titleInput.fill('Note updated')

  const contentInput = page.getByPlaceholder(/edit the note/i)
  await expect(contentInput).not.toBeEmpty()
  await contentInput.clear()
  await contentInput.fill('Note updated')

  await page.getByRole('button', { name: /update/i }).click()
  await page.getByText(/yes/i).click()
  await expect(page.getByText(/updated successfully/i)).toBeVisible()
  await expect(page.getByRole('link', { name: /note updated/i })).toBeVisible()
})

test('removing a note', async ({ page }) => {
  await page.getByRole('link', { name: /new note/i }).click()
  await page.getByPlaceholder(/the title/i).fill('Note to remove')
  await page.getByPlaceholder(/write the note/i).fill('This note should be removed')
  await page.getByRole('button', { name: /create/i }).click()
  await page.getByText(/yes/i).click()

  await page.getByRole('link', { name: /note to remove/i }).click()
  await page.getByRole('button', { name: /remove/i }).click()
  await page.getByText(/yes/i).click()

  await expect(page.getByText(/removed successfully/i)).toBeVisible()
  await expect(page.getByRole('link', { name: /note to remove/i })).toBeHidden()
})

test('toggling theme', async ({ page }) => {
  const themeBtn = page.getByRole('button', { name: /theme/i })
  await themeBtn.click()
  await expect(page.getByTestId('layout')).toHaveClass(/light/i)
})

test('toggling language', async ({ page }) => {
  const langBtn = page.getByRole('button', { name: /language/i })
  await langBtn.click()
  await expect(page.getByText(/mis notas/i)).toBeVisible()
})
