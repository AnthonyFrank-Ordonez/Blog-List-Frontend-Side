import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    handleNewBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h1>Create New Blog</h1>
        <div>
          Title:
          <input
            type='text'
            value={title}
            name='Title'
            placeholder='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          Author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='Author'
          />
        </div>

        <div>
          Url:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
            placeholder='Url'
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}

export default BlogForm
