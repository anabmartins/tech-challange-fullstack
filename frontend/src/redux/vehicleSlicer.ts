import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, Vehicle } from "../models/vehicleModel";

// Action

export const createVehicle = createAsyncThunk(
  'vehicle/createVehicle',
  async (newVehicle: Vehicle) => {
    // request axios 
  }
)

// Slicer

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
  }
})

export default vehicleSlice.reducer;
