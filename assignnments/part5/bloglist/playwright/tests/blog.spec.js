const { test, expect, beforeEach, describe } = require('@playwright/test')

const loginWith = async (page, username, password) => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
} 

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('/')
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'root user',
        username: 'root',
        password: '123456'
      }
    })
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Login')
    await expect(locator.first()).toBeVisible()
    await expect(locator.last()).toBeVisible()
  })

  describe('Login', () => {
    test('Succesful Login', async ({ page }) => {
      await loginWith(page, 'root', '123456')
      await expect(page.getByText('root logged in')).toBeVisible()
    })

    test('Unsuccesful Login', async ({ page }) => {
      await loginWith(page, 'root', '1234567')
      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  test.only('a new blog can be created', async ({ page }) => {
    await loginWith(page, 'root', '123456')
    
    // Fill in Form
    await page.getByRole('button', { name: 'Add blog' }).click()
    await page.getByLabel('Title').fill('testTitle')
    await page.getByLabel('Author').fill('testAuthor')
    await page.getByLabel('Url').fill('testUrl')
    await page.getByRole('button', { name: 'Add' }).click()
    
    // Wait until a new blog-summary appears
    const summaries = page.locator('.blog-summary')

    // Get the last one and assert it contains our values
    const lastSummary = summaries.last()
    await expect(lastSummary).toContainText('testTitle')
    await expect(lastSummary).toContainText('testAuthor')
  })
})