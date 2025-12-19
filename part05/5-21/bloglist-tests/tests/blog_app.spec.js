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
        const blogElement = page.getByText('first blog').locator('..')

        await blogElement.getByRole('button', { name: 'view' }).click()
        await expect(blogElement.getByText('hide')).toBeVisible() // 'hide' button is visible after expanding the blog

        const likeButton = blogElement.getByRole('button', { name: 'like' })
        await likeButton.click()

        // Verify likes increased
        await expect(blogElement.getByText('1')).toBeVisible()

        await likeButton.click()
        await expect(blogElement.getByText('2')).toBeVisible()
      })
    })

    describe('and multiple blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'first blog', 'First Author', 'https://example.com')
        await createBlog(page, 'second blog', 'Second Author', 'https://example.com')
        await createBlog(page, 'third blog', 'Third Author', 'https://example.com')
      })

      test('the creator can delete a blog', async ({ page }) => {
        // Click 'view' to expand the blog details
        const blogElement = page.getByText('first blog').locator('..')

        await blogElement.getByRole('button', { name: 'view' }).click()

        const removeButton = blogElement.getByRole('button', { name: 'remove' })
        await removeButton.click()

        // Handle the dialog that appears for confirmation when removing the blog
        page.on('dialog', async dialog => {
          expect(dialog.type()).toBe('confirm')
          await dialog.accept()
        })

        // Assert that the 'first blog' is no longer visible
        await expect(page.getByText('first blog')).not.toBeVisible()

        // Ensure other blogs still exist on the page
        await expect(page.getByText('second blog')).toBeVisible()
        await expect(page.getByText('third blog')).toBeVisible()
      })
    })
  })
})
