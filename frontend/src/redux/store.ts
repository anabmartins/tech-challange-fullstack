import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlicer';
import vehicleReducer from './vehicleSlicer'

const store = configureStore({
  reducer: {
    user: userReducer,
    vehicle: vehicleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;
