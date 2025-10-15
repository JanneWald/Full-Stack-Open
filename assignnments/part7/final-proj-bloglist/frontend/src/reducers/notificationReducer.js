import { createSlice } from '@reduxjs/toolkit';

const initialState = 'noti :3';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const newNotif = action.payload;
      console.log('setting the notification', newNotif);
      return newNotif;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const createNotification = (message, seconds = 5) => {
  return async (dispatch) => {
    console.log('seconds', seconds);

    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(''));
    }, seconds * 1000);
  };
};
