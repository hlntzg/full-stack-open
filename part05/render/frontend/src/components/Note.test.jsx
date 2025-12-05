import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  //   const element = screen.getByText(
  //     'Component testing is done with react-testing-library'
  //     , { exact: false })

  //   screen.debug()

  // findByText returns a promise. USE ON ASYNC FUNCTION
  // look for an element that contains the text, USE EXTRA OPTION { exact: false }
  const element = await screen.findByText(
    'react-testing-library'
    , { exact: false })

  //   screen.debug(element)

  expect(element).toBeDefined()
})

test('renders content: does not render this', () => {
  const note = {
    content: 'This is a reminder',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.queryByText('do not want this thing to be rendered')
  expect(element).toBeNull()
})


// It is, however, recommended to search for elements primarily using methods other than
// the container object and CSS selectors. CSS attributes can often be changed without
// affecting the application's functionality, and users are not aware of them. It is better
// to search for elements based on properties visible to the user, for example, by using the
// getByText method. This way, the tests better simulate the actual nature of the component
// and how a user would find the element on the screen.
test('renders content: querySelector of the object Container', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const { container } = render(<Note note={note} />)

  const div = container.querySelector('.note')
  //   console.log(container)
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})