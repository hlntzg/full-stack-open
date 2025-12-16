// simulate text input with userEvent

import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)

// const input = screen.getByRole('textbox') // only one input field
//   const inputs = screen.getAllByRole('textbox') // multiple inputs, but relies on the order
  const input = screen.getByLabelText('content')
  const sendButton = screen.getByText('save')

  // the method type of the userEvent is used to write text to the input field
// await user.type(input, 'testing a form...') // only one input field
//   await user.type(inputs[0], 'testing a form...') // multiple inputs, but relies on the order
  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  console.log(createNote.mock.calls)
  
  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')


})