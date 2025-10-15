import { createSlice } from '@reduxjs/toolkit';
import { createNotification } from './notificationReducer';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const newUser = action.payload;
      return newUser;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

export const updateUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
    dispatch(createNotification('Logged in as', user.name));
  };
};
