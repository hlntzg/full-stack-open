const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    // add a new user to the backend:
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    // access frontend page
    await page.goto('/')
  })  

  test('front page can be opened', async ({ page }) => {
    //   const locator = page.getByText('Notes')
    //   await expect(locator).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Notes' })).toBeVisible();
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })

  test('user can login with correct credentials', async ({ page }) => {
    // await page.getByRole('button', { name: 'login' }).click()

        // await page.getByRole('textbox').first().fill('mluukkai2')
        // await page.getByRole('textbox').last().fill('salainen')

        // If there were more than two text fields, 
        // using the methods first and last is not enough
        // const textboxes = await page.getByRole('textbox').all()
        // await textboxes[0].fill('mluukkai2')
        // await textboxes[1].fill('salainen')
        // but, this can be problematic to the extent that if the 
        // registration form is changed, the tests may break

    // await page.getByLabel('username').fill('mluukkai')
    // await page.getByLabel('password').fill('salainen')

    // await page.getByRole('button', { name: 'login' }).click()
  
    await loginWith(page, 'mluukkai', 'salainen')
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    // await page.getByRole('button', { name: 'login' }).click()
    // await page.getByLabel('username').fill('mluukkai')
    // await page.getByLabel('password').fill('wrong')
    // await page.getByRole('button', { name: 'login' }).click()
    await loginWith(page, 'mluukkai', 'wrong')

    // await expect(page.getByText('wrong credentials')).toBeVisible()
    // refined test to ensure that the error message is printed exactly in the right place,
    // i.e. in the element containing the CSS class error (Notification component)
    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('wrong')

    // test the application's CSS styles
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)') // colors must be defined to Playwright as rgb codes

    // do not render the message
    await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
  })

  // the execution of each test starts from the browser's "zero state", 
  // all changes made to the browser's state by the previous tests are reset
  describe('when logged in', () => {

    beforeEach(async ({ page }) => {
    //   await page.getByRole('button', { name: 'login' }).click()
    //   await page.getByLabel('username').fill('mluukkai')
    //   await page.getByLabel('password').fill('salainen')
    //   await page.getByRole('button', { name: 'login' }).click()
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new note can be created', async ({ page }) => {
    //   await page.getByRole('button', { name: 'new note' }).click()
    //   await page.getByRole('textbox').fill('a note created by playwright 2')
    //   await page.getByRole('button', { name: 'save' }).click()
    //   await expect(page.getByText('a note created by playwright 2')).toBeVisible()
        await createNote(page, 'a note created by playwright')
    })

    // describe('and a note exists', () => {
    //   beforeEach(async ({ page }) => {
    //     // await page.getByRole('button', { name: 'new note' }).click()
    //     // await page.getByRole('textbox').fill('another note by playwright')
    //     // await page.getByRole('button', { name: 'save' }).click()
    //     await createNote(page, 'another note by playwright')
    //   })
    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })

      // test('importance can be changed', async ({ page }) => {
      //   await page.getByRole('button', { name: 'make not important' }).click()
      //   await expect(page.getByText('make important')).toBeVisible()
      // })
      test('one of those can be made nonimportant', async ({ page }) => {
        await page.pause() //
        const otherNoteText = page.getByText('second note')
        const otherNoteElement = otherNoteText.locator('..')

        await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })
  })  
})