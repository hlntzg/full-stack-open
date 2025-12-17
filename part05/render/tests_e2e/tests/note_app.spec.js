const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    // add a new user to the backend:
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    // access frontend page
    await page.goto('http://localhost:5173')
  })  

  test('front page can be opened', async ({ page }) => {
    //   const locator = page.getByText('Notes')
    //   await expect(locator).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Notes' })).toBeVisible();
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
    })

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()

    // await page.getByRole('textbox').first().fill('mluukkai2')
    // await page.getByRole('textbox').last().fill('salainen')

    // If there were more than two text fields, 
    // using the methods first and last is not enough
    // const textboxes = await page.getByRole('textbox').all()
    // await textboxes[0].fill('mluukkai2')
    // await textboxes[1].fill('salainen')
    // but, this can be problematic to the extent that if the 
    // registration form is changed, the tests may break

    await page.getByLabel('username').fill('mluukkai')
    await page.getByLabel('password').fill('salainen')

    await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })

  // the execution of each test starts from the browser's "zero state", 
  // all changes made to the browser's state by the previous tests are reset
  describe('when logged in', () => {

    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new note' }).click()
      await page.getByRole('textbox').fill('a note created by playwright 2')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('a note created by playwright 2')).toBeVisible()
    })
  })  
})