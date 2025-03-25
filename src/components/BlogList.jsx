import { useDispatch, useSelector } from 'react-redux'

// FROM SRC FOLDER
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { useDeleteBlog, useUpdateBlogVote } from '../hooks'

const BlogList = () => {
  const { mutateAsync: updateBlogLike } = useUpdateBlogVote()
  const { mutateAsync: deleteBlog } = useDeleteBlog()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)
  const { blogs, isLoading } = useSelector((state) => state.blogs)

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
    }
  }

  const handleAddLike = async (blog) => {
    await updateBlogLike({ ...blog, likes: blog.likes + 1 })
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
