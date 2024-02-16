import axios from "axios";
import { initialState, Vehicle } from "../models/vehicleModel";
import { VEHICLE_API } from "../models/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action

export const createVehicle = createAsyncThunk(
  "vehicle/createVehicle",
  async (newVehicle: Vehicle) => {
    const request = axios.post<any>(VEHICLE_API, newVehicle);
    const response = (await request).data;
    return response;
  }
);

export const listVehicle = createAsyncThunk("vehicle/listVehicle", async () => {
  const request = axios.get<any>(VEHICLE_API);
  const response = (await request).data;
  return response;
});

// Slicer

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default vehicleSlice.reducer;
