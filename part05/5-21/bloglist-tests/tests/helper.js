const loginWith = async (page, username, password)  => {
//   await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url ) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
 
  await page.getByRole('textbox', { name: 'title' }).fill(title)
  await page.getByRole('textbox', { name: 'author' }).fill(author)
  await page.getByRole('textbox', { name: 'url' }).fill(url)
 
  await page.getByRole('button', { name: 'create' }).click()
  
  // "slowing down" the insert operations
  // await page.getByText(title).waitFor() 
  // await page.getByText(author).waitFor() 
  // await page.getByText(url).waitFor() 
}

export { loginWith, createBlog }