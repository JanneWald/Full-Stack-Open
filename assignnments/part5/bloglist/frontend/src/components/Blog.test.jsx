import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import Blog from './Blog'

test('renders summary view with title and author, but not URL or likes by default', () => {
  const blog = {
    author: 'Mark',
    title: 'Cool',
    url: 'www.cool.url',
    likes: 14
  }

  render(<Blog blog={blog} />)

  // The summary view should exist
  const summaryElement = document.querySelector('.blog-summary')
  expect(summaryElement).not.toBeNull()

  // The detailed view should NOT exist
  const detailsElement = document.querySelector('.blog-details')
  expect(detailsElement).toBeNull()

  // Confirm summary text shows title and author
  expect(summaryElement.textContent).toContain('Cool')
  expect(summaryElement.textContent).toContain('Mark')

  // Should NOT show url or likes by default
  const urlElement = screen.queryByText('www.cool.url')
  const likesElement = screen.queryByText(/Likes:/i)

  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})
