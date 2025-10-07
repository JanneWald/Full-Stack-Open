import { createSlice } from '@reduxjs/toolkit'

const initialState = 'noti :3'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const newNotif = action.payload
      return newNotif
    }
  }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
