import { render, screen } from '@testing-library/react'
import { test, expect, vi, describe, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let container
  let likeHandler
  let deletehandler

  beforeEach(() => {
    const blog = {
      title: 'testing blog',
      author: 'test author',
      url: 'testing.com',
      likes: 0,
      user: '34534hjhjdfg443534',
    }

    likeHandler = vi.fn()
    deletehandler = vi.fn()

    container = render(
      <Blog blog={blog} toggleLike={likeHandler} toggleDelete={deletehandler} />
    ).container
  })

  test('renders a blog with title and author', () => {
    const div = container.querySelector('.blog-component')

    expect(div.textContent).toContain('testing blog test author')
  })

  test('checks is url and likes are rendered', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('#button-view')
    await user.click(button)

    const urlDiv = container.querySelector('.blog-url')
    const likeDiv = container.querySelector('.blog-likes')

    expect(urlDiv).toBeInTheDocument()
    expect(likeDiv).toBeInTheDocument()
  })

  test('check if the view button is clicked twice', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('#button-view')
    await user.click(button)

    const likeBtn = container.querySelector('#button-likes')
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})

describe('<BlogForm />', () => {
  test('calls the event handler with the right details when a new blog is created', async () => {
    const createNewBlogHandler = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm handleNewBlog={createNewBlogHandler} />)

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('Url')
    const createBtn = screen.getByText('Create')

    await user.type(titleInput, 'test input')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test url')
    await user.click(createBtn)

    expect(createNewBlogHandler.mock.calls).toHaveLength(1)
    expect(createNewBlogHandler.mock.calls[0][0].title).toBe('test input')
    expect(createNewBlogHandler.mock.calls[0][0].author).toBe('test author')
    expect(createNewBlogHandler.mock.calls[0][0].url).toBe('test url')
  })
})
