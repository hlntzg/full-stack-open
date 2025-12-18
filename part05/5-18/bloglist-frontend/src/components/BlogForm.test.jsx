// simulate text input with userEvent

import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  // select inputs by placeholder
  const titleInput = screen.getByPlaceholderText('blog title')
  const authorInput = screen.getByPlaceholderText('blog author')
  const urlInput = screen.getByPlaceholderText('blog url')

  // fill the form
  await user.type(titleInput, 'Testing forms')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'https://example.com')

  // submit the form by clicking 'create' button
  await user.click(screen.getByText('create'))

  // assert handler was called once
  expect(createBlog).toHaveBeenCalledTimes(1)

  // assert correct data
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Testing forms',
    author: 'Test Author',
    url: 'https://example.com',
  })
})