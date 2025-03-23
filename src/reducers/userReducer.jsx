import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

// REDUX THUNK TO SET THE USER
export const initializeUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
