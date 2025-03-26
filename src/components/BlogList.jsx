import { useSelector } from 'react-redux'

// FROM SRC FOLDER
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const { blogs, isLoading } = useSelector((state) => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <BlogForm />

      {[...blogs]
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map((blog) => (
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList
