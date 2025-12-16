// componentes/Blog.test.jsx

import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event' // clicking buttons tests
import Blog from './Blog'

test('renders content', async () => {
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