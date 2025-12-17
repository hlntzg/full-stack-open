const { test, describe, expect } = require('@playwright/test')

describe('Note app', () => {

  beforeEach(async ({ page }) => {
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

    await page.getByLabel('username').fill('mluukkai2')
    await page.getByLabel('password').fill('salainen')

    await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })
})