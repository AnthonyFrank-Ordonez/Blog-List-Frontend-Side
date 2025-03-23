// Import Services
import { useState, useEffect, useRef } from 'react'

// Import Components
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {
  addNewBlog,
  handleDeleteBlog,
  initializeBlogs,
  updateVote,
} from './reducers/blogReducer'
import { initializeUser, removeUser } from './reducers/userReducer'

// PS.
// THUNK/Thunk -- REDUX THUNK

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const addBlog = async (newBlog) => {
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

  const handleAddLike = async (blog) => {
    // Dispatch the updateVote thunk
    dispatch(updateVote(blog))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      await dispatch(initializeUser({ username, password }))

      setUsername('')
      setPassword('')

      dispatch(setNotification('Login Success', 5000))
    } catch (error) {
      dispatch(setNotification('Invalid Username or password', 5000))
    } finally {
      setLoading(false)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type='text'
            data-testid='username'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type='text'
            data-testid='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <Toggable btnLabel='Add new Blog' ref={blogFormRef}>
      <BlogForm handleNewBlog={addBlog} />
    </Toggable>
  )

  const handleDelete = async (blog) => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )

    if (confirm) {
      // Dispatch the handleDeleteBlog thunk
      dispatch(handleDeleteBlog(blog))

      dispatch(
        setNotification(
          `Successfully deleted ${blog.title} by ${blog.author}`,
          5000
        )
      )
    }
  }

  const blogList = () => (
    <>
      <h2>Blogs</h2>
      <p>
        {user.name} logged-in{' '}
        <button onClick={() => dispatch(removeUser(null))}>Log out</button>{' '}
      </p>

      {blogForm()}

      {[...blogs]
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            toggleLike={handleAddLike}
            toggleDelete={handleDelete}
            user={user}
          />
        ))}
    </>
  )

  return (
    <div>
      <Notification />

      {isLoading ? (
        <div>Loading...</div>
      ) : user === null ? (
        loginForm()
      ) : (
        <div>{blogList()}</div>
      )}
    </div>
  )
}

export default App
