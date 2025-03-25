import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  blogs: [],
  isLoading: false,
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    addBlog(state, action) {
      state.blogs.push(action.payload)
    },
    addVote(state, action) {
      state.blogs = state.blogs.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    deleteBlog(state, action) {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, addBlog, addVote, deleteBlog, setLoading } =
  blogSlice.actions

export default blogSlice.reducer
