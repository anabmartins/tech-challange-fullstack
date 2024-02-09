import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlicer';

const store = configureStore({
  reducer: {
    user: userReducer
  },
});

export default store;
