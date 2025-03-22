import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, toggleLike, toggleDelete, user }) => {
  const [visible, setVisible] = useState(false)
  const btnLabel = visible ? 'hide' : 'view'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blog-component'>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility} id='button-view'>
          {btnLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div className='blog-title'>
          {blog.title} <button onClick={toggleVisibility}>{btnLabel}</button>
        </div>
        <div className='blog-url'>{blog.url}</div>
        <div className='blog-likes'>
          {blog.likes}{' '}
          <button id='button-likes' onClick={() => toggleLike(blog.id)}>
            like
          </button>
        </div>
        <div>{blog.user[0]?.name}</div>
        <div>
          {user.username === blog.user[0].username ? (
            <button onClick={() => toggleDelete(blog.id)}>Delete</button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

Blog.propsTypes = {
  blog: PropTypes.object.isRequired,
  toggleLike: PropTypes.func.isRequired,
  toggleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
