const { test, expect, beforeEach, describe } = require('@playwright/test')

const loginWith = async (page, username, password) => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
} 

const addBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Add blog' }).click()
  await page.getByLabel('Title').fill(title)
  await page.getByLabel('Author').fill(author)
  await page.getByLabel('Url').fill(url)
  await page.getByRole('button', { name: 'Add' }).click()
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

    await request.post('/api/users', {
      data: {
        name: 'random user',
        username: 'rando',
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

  test('a new blog can be created', async ({ page }) => {
    await loginWith(page, 'root', '123456')

    await addBlog(page, 'testTitle', 'testAuthor', 'testUrl')
    // Wait until a new blog-summary appears
    const summaries = page.locator('.blog-summary')

    // Get the last one and assert it contains our values
    const lastSummary = summaries.last()
    await expect(lastSummary).toContainText('testTitle')
    await expect(lastSummary).toContainText('testAuthor')
  })

  test('A blog can be liked', async ({ page }) => {
    await loginWith(page, 'root', '123456')

    await addBlog(page, 'testTitle', 'testAuthor', 'testUrl')
    
    await page.getByText('Show details').click()
    await page.getByRole('button', { name: 'Like' }).click()

    // Get the last one and assert it contains our values
    const details = page.locator('.blog-details')
    await expect(details).toContainText('Likes: 1')
  })

  test('A blog can be deleted by the same user', async ({ page }) => {
    await loginWith(page, 'root', '123456')

    await addBlog(page, 'testTitle', 'testAuthor', 'testUrl')
    await page.getByRole('button', { name: 'Show Details' }).click()
    page.on('dialog', dialog => dialog.accept())
    await page.getByRole('button', { name: 'Delete' }).click()

    await expect(page.getByText('Removed testTitle')).toBeVisible()
  })

  test('A blog cannot be deleted by a different user', async ({ page }) => {
    await loginWith(page, 'root', '123456')
    await addBlog(page, 'testTitle', 'testAuthor', 'testUrl')
    await page.getByRole('button', { name: 'Logout' }).click()

    await loginWith(page, 'rando', '123456')
    await page.getByRole('button', { name: 'Show Details' }).click()
    await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
  })

  test.only('blogs are arranged by likes in descending order', async ({ page }) => {
    await loginWith(page, 'root', '123456')

    await addBlog(page, 'First Blog', 'Author1', 'url1')
    await addBlog(page, 'Second Blog', 'Author2', 'url2')

    await page.getByRole('button', { name: 'Show Details' }).first().click()
    await page.getByRole('button', { name: 'Show Details' }).last().click()

    const secondBlog = await page.locator('.blog-details').last()
    await secondBlog.getByRole('button', { name: 'Like' }).click()

    await page.waitForTimeout(500)

    const updatedBlogs = await page.locator('.blog-summary, .blog-details').all()
    const firstBlogText = await updatedBlogs[0].textContent()
    const secondBlogText = await updatedBlogs[1].textContent()

    // Expect the second blog (with more likes) to now be first
    expect(firstBlogText).toContain('Second Blog')
    expect(secondBlogText).toContain('First Blog')
  })

})