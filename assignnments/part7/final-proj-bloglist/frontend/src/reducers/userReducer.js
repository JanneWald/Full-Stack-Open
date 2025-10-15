import { createSlice } from '@reduxjs/toolkit';
import { createNotification } from './notificationReducer';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const newUser = action.payload;
      console.log('setting the new user', newUser);
      return newUser;
    },
    clearUser(state, action) {
      console.log('removing current user');
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

export const updateUser = (user) => {
  return async (dispatch) => {
    console.log('updateUser reciever', user);
    dispatch(setUser(user));
    dispatch(createNotification('Logged in as', user.name));
  };
};
