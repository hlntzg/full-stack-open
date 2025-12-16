// componentes/Blog.test.jsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event' // clicking buttons tests
import Blog from './Blog'

test('renders content: title and author, but not url or likes by default', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'The Author',
    url: 'https://example.com',
    likes: 5,
    user: { name: 'Tester' },
  }

  // Important testing rule:
  // If text is split across multiple elements, do NOT use exact getByText
  const { container } = render(<Blog blog={blog} />)

  const blogDiv = container.querySelector('.blog')

  expect(blogDiv).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(blogDiv).toHaveTextContent(
    'The Author'
  )

  // Blog component: 'detailsVisible is false by default'
  expect(container.querySelector('.blog-details')).toHaveStyle('display: none')
})

test('renders content: url and likes are shown when view button is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'The Author',
    url: 'https://example.com',
    likes: 5,
    user: { name: 'Tester' },
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()

  const detailsDiv = container.querySelector('.blog-details')

  // url and likes not visible
  expect(detailsDiv).toHaveStyle('display: none')

  // click the "view" button
  await user.click(screen.getByText('view'))

  // url and likes are visible
  expect(detailsDiv).not.toHaveStyle('display: none')
})

test('click like button: the event handler the component received as props is called proportionally', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'The Author',
    url: 'https://example.com',
    likes: 5,
    user: { name: 'Tester' },
  }

  const mockUpdateBlog = vi.fn()
  const mockRemoveBlog = vi.fn()

  render(<Blog
      blog={blog}
      updateBlog={mockUpdateBlog}
      removeBlog={mockRemoveBlog}/>)

  const user = userEvent.setup()

  // click the "view" button
  await user.click(screen.getByText('view'))

  // click the "like" button 2x
  await user.click(screen.getByText('like'))
  await user.click(screen.getByText('like'))

  expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
})