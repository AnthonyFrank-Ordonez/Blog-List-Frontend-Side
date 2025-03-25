import { createSlice } from '@reduxjs/toolkit'

// FROM SRC FOLDER
import userService from '../services/user'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

// THUNK
export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer
