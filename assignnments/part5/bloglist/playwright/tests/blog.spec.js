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

  test('Succesful Login', async ({ page }) => {
    await loginWith(page, 'root', '123456')
    await expect(page.getByText('root logged in')).toBeVisible()
   })

  test('Unsuccesful Login', async ({ page }) => {
    await loginWith(page, 'root', '1234567')
    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })

})