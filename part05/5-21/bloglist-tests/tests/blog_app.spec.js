const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    // add a new user to the backend
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    // access frontend page
    await page.goto('http://localhost:5173')
    await page.getByRole('button', { name: 'login' }).click()
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Log in to application' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'cancel' })).toBeVisible();
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Blog about playwright', 'Playwright Author', 'https://example.com')
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'first blog', 'First Author', 'https://example.com')
        // await createBlog(page, 'second blog', 'Second Author', 'https://example.com')
        // await createBlog(page, 'third blog', 'Third Author', 'https://example.com')
      })

      test('a blog can be liked', async ({ page }) => {
        // Click 'view' to expand the blog details
        const blog = page.locator('.blog').filter({ hasText: 'first blog' })

        await blog.locator('button:visible', { hasText: 'view' }).click()
        // Confirm details are shown
        await expect(blog.locator('button', { hasText: 'hide' })).toBeVisible()
        
        const likeButton = blog.locator('button', { hasText: 'like' })
        await likeButton.click()

        // Verify likes increased
        await expect(blog.getByText('1')).toBeVisible()

        await likeButton.click()
        await expect(blog.getByText('2')).toBeVisible()
      })
    })

    describe('and multiple blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'first blog', 'First Author', 'https://example.com')
        await createBlog(page, 'second blog', 'Second Author', 'https://example.com')
        await createBlog(page, 'third blog', 'Third Author', 'https://example.com')
      })

      test('the creator can delete a blog', async ({ page }) => {
        const blog = page.locator('.blog').filter({ hasText: 'first blog' })

        await blog.locator('button', { hasText: 'view' }).first().click()

        // Register dialog handler BEFORE clicking remove
        page.once('dialog', async dialog => {
          expect(dialog.type()).toBe('confirm')
          await dialog.accept()
        })

        await blog.getByRole('button', { name: 'remove' }).click()

        // Assert blog is removed from the DOM
        await expect(blog).toHaveCount(0) // element fully removed whiie 

        // Other blogs should still exist
        await expect(
          page.locator('.blog').filter({ hasText: 'second blog' })
        ).toBeVisible()

        await expect(
          page.locator('.blog').filter({ hasText: 'third blog' })
        ).toBeVisible()
      })
    })
  })
})
