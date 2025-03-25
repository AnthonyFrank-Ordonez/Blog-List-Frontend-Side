import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  user: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload
    },
    setUser(state, action) {
      state.user = action.payload
    },
    removeUser(state, action) {
      state.user = action.payload
    },
  },
})

export const { setUsers, setUser, removeUser } = usersSlice.actions

export default usersSlice.reducer
