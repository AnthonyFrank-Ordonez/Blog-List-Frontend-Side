import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    sendNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return action.payload
    },
  },
})

export const { sendNotification, clearNotification } = notificationSlice.actions

// Redux toolkit thunks for asynchoronus operations:
export const setNotification = (content, time) => {
  return async (dispatch) => {
    // Clear timeout if there are
    if (timeoutId) clearTimeout()

    // Initiate send notification
    dispatch(sendNotification(content))

    // Initiate clearNotification to clear the notifications
    timeoutId = setTimeout(() => {
      dispatch(clearNotification(null))
      timeoutId = null
    }, time)
  }
}

export default notificationSlice.reducer
