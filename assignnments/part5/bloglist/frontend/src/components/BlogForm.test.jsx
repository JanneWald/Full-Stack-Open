import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

test('calls submitBlog with correct details when form is submitted', async () => {
  const submitBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm submitBlog={submitBlog} />)

  // Fill in form fields
  const titleInput = screen.getByLabelText('Title')
  const authorInput = screen.getByLabelText('Author')
  const urlInput = screen.getByLabelText('Url')

  await user.type(titleInput,'TestingTitle')
  await user.type(authorInput, 'TestAuthor')
  await user.type(urlInput,'www.test.com')

  // Submit the form
  const submitButton = screen.getByText('Add')
  await user.click(submitButton)

  // Verify the handler was called once
  expect(submitBlog).toHaveBeenCalledTimes(1)

  // Verify it was called with the correct data
  const callArgs = submitBlog.mock.calls[0]  // first call
  const dataArg = callArgs[1]                // the { title, author, url } object

  expect(dataArg).toEqual({
    title: 'TestingTitle',
    author: 'TestAuthor',
    url: 'www.test.com'
  })
})
