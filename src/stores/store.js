import { configureStore } from '@reduxjs/toolkit'

// FROM SRC FOLDER
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
})

export default store
