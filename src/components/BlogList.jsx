import { useDispatch, useSelector } from 'react-redux'
import { handleDeleteBlog, updateVote } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = ({ isLoading }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

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

  const handleAddLike = async (blog) => {
    // Dispatch the updateVote thunk
    dispatch(updateVote(blog))
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <h2>Blog App</h2>

      <BlogForm />

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
}

export default BlogList
