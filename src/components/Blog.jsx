import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { useDeleteBlog, useUpdateBlogVote } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const { blogs } = useSelector((state) => state.blogs)
  const { user } = useSelector((state) => state.users)
  const { mutateAsync: updateBlogLike } = useUpdateBlogVote()
  const { mutateAsync: deleteBlog } = useDeleteBlog()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useMatch('blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const handleAddLike = async (blog) => {
    await updateBlogLike({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = async (blog) => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )

    if (confirm) {
      await deleteBlog(blog.id)

      dispatch(
        setNotification(
          `Successfully deleted ${blog.title} by ${blog.author}`,
          5000
        )
      )

      navigate('/')
    }
  }

  if (!blog) return null

  return (
    <div>
      <h1>
        {blog.title} <button onClick={() => navigate('/')}> Back </button>
      </h1>

      <div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes{' '}
          <button onClick={() => handleAddLike(blog)}>Like</button>
        </div>
        <div>added by {blog.user[0]?.name}</div>
        {blog.user[0]?.username === user.username && (
          <div>
            Delete this blog?{' '}
            <button onClick={() => handleDelete(blog)}>Delete</button>
          </div>
        )}
      </div>

      <h3>Comments: </h3>
    </div>
  )
}

export default Blog
