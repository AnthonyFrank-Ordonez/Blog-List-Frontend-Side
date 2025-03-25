import { useRef, useState } from 'react'
import Toggable from './Toggable'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      // Dispatch the add new blog thunk
      dispatch(addNewBlog(newBlog))

      // dispatch the setNotification thunk
      dispatch(
        setNotification(
          `A new blog ${newBlog.title} by ${newBlog.author} has been added`,
          5000
        )
      )
    } catch (error) {
      dispatch(setNotification(error.message, 5000))
    }
  }

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
      <Toggable btnLabel='Add new Blog' ref={blogFormRef}>
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
      </Toggable>
    </div>
  )
}

export default BlogForm
