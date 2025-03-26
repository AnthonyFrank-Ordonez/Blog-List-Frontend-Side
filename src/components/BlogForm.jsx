import { useRef } from 'react'
import { useDispatch } from 'react-redux'

// FROM SRC FOLDER
import Toggable from './Toggable'
import { setNotification } from '../reducers/notificationReducer'
import { useCreateNewBlog, useField } from '../hooks'

const BlogForm = () => {
  const { mutateAsync: createBlog } = useCreateNewBlog()
  const { reset: Titlereset, ...title } = useField('text')
  const { reset: Authorreset, ...author } = useField('text')
  const { reset: Urlreset, ...url } = useField('text')

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const handleNewBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      await createBlog(newBlog)

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
      title: title.value,
      author: author.value,
      url: url.value,
    })

    Titlereset()
    Authorreset()
    Urlreset()
  }

  return (
    <div>
      <Toggable btnLabel='Add new Blog' ref={blogFormRef}>
        <form onSubmit={addBlog}>
          <h1>Create New Blog</h1>
          <div>
            Title:
            <input {...title} name='Title' placeholder='Title' />
          </div>

          <div>
            Author:
            <input {...author} name='Author' placeholder='Author' />
          </div>

          <div>
            Url:
            <input {...url} name='Url' placeholder='Url' />
          </div>
          <button type='submit'>Create</button>
        </form>
      </Toggable>
    </div>
  )
}

export default BlogForm
