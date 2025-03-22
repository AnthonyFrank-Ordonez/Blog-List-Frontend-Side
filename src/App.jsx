// Import Services
import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

// Import Components
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msgNotification, setMsgNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedObject = await blogService.create(newBlog)
      setBlogs([...blogs, returnedObject])

      setMsgNotification(
        `A new blog ${returnedObject.title} by ${returnedObject.author} has been added`
      )

      setTimeout(() => {
        setMsgNotification(null)
      }, 5000)
    } catch (error) {
      setMsgNotification(error.message)

      setTimeout(() => {
        setMsgNotification(null)
      }, 5000)
    }
  }

  const handleAddLike = async (id) => {
    const blog = blogs.find((blog) => {
      return id === blog.id
    })
    const addLike = { ...blog, likes: (blog.likes += 1) }

    const response = await blogService.update(id, addLike)
    setBlogs(blogs.map((blog) => (blog.id === id ? response : blog)))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMsgNotification('Login Success')

      setTimeout(() => {
        setMsgNotification(null)
      }, 3000)
    } catch (error) {
      setMsgNotification('Invalid Username or password')

      setTimeout(() => {
        setMsgNotification(null)
      }, 5000)
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

  const handleDelete = async (id) => {
    const blog = blogs.find((blog) => id === blog.id)
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )

    if (confirm) {
      await blogService.deleteBLog(blog.id)
      setBlogs(blogs.filter((blog) => blog.id !== id))

      setMsgNotification(`Successfully deleted ${blog.title} by ${blog.author}`)

      setTimeout(() => {
        setMsgNotification(null)
      }, 5000)
    }
  }

  const blogList = () => (
    <>
      <h2>Blogs</h2>
      <p>
        {user.name} logged-in{' '}
        <button onClick={() => setUser(null)}>Log out</button>{' '}
      </p>

      {blogForm()}

      {blogs
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
      <Notification message={msgNotification} />

      {user === null ? loginForm() : <div>{blogList()}</div>}
    </div>
  )
}

export default App
