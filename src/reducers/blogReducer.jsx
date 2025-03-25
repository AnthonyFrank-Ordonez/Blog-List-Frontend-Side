import { createSlice } from '@reduxjs/toolkit'

// FROM SRC FOLDERS
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const { id } = action.payload
      return state.map((blog) => (blog.id !== id ? blog : action.payload))
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { setBlogs, addBlog, addVote, deleteBlog } = blogSlice.actions

// REDUX THUNKS
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addNewBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(addBlog(newBlog))
  }
}

export const updateVote = (content) => {
  return async (dispatch, getState) => {
    const { blogs } = getState()

    const selectedId = content.id
    const selectedBlog = blogs.find((blog) => blog.id === selectedId)

    // BLOG TO ADD LIKES
    const toChange = {
      ...selectedBlog,
      likes: selectedBlog.likes + 1,
    }

    const updatedBlog = await blogService.update(selectedId, toChange)

    dispatch(addVote(updatedBlog))
  }
}

export const handleDeleteBlog = (content) => {
  return async (dispatch) => {
    const selectedId = content.id

    await blogService.deleteBLog(selectedId)

    dispatch(deleteBlog(selectedId))
  }
}

export default blogSlice.reducer
