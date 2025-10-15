import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

const blog = {
  author: 'Mark',
  title: 'Cool',
  url: 'www.cool.url',
  likes: 14,
};

test('renders summary view with title and author, but not URL or likes by default', () => {
  render(<Blog blog={blog} />);

  // The summary view should exist
  const summaryElement = document.querySelector('.blog-summary');
  expect(summaryElement).not.toBeNull();

  // The detailed view should NOT exist
  const detailsElement = document.querySelector('.blog-details');
  expect(detailsElement).toBeNull();

  // Confirm summary text shows title and author
  expect(summaryElement.textContent).toContain('Cool');
  expect(summaryElement.textContent).toContain('Mark');

  // Should NOT show url or likes by default
  const urlElement = screen.queryByText('www.cool.url');
  const likesElement = screen.queryByText(/Likes:/i);

  expect(urlElement).toBeNull();
  expect(likesElement).toBeNull();
});

test('url and likes ARE visible after click', async () => {
  const user = userEvent.setup();
  render(<Blog blog={blog} />);

  const detailButton = screen.getByText('Show Details');
  await user.click(detailButton);

  // The summary view should NOT exist
  const summaryElement = document.querySelector('.blog-summary');
  expect(summaryElement).toBeNull();

  // The detailed view should NOT exist
  const detailsElement = document.querySelector('.blog-details');
  expect(detailsElement).not.toBeNull();

  // Confirm summary text shows title, author, url, likes
  expect(detailsElement.textContent).toContain('Cool');
  expect(detailsElement.textContent).toContain('Mark');
  expect(detailsElement.textContent).toContain('14');
  expect(detailsElement.textContent).toContain('www.cool.url');
});

test('like button handler is called twice on 2 clicks', async () => {
  const user = userEvent.setup();
  const likeBlog = vi.fn();
  render(<Blog blog={blog} likeBlog={likeBlog} />);

  const detailButton = screen.getByText('Show Details');
  await user.click(detailButton);

  const likeButton = screen.getByText('Like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(likeBlog.mock.calls).toHaveLength(2);
});
