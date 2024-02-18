import axios from "axios";
import { VehicleList, initialState } from "../models/vehicleModel";
import { VEHICLE_API } from "../models/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Action

export const createVehicle = createAsyncThunk(
  "vehicle/createVehicle",
  async (newVehicle: {name: string, plate: string, model: string}) => {
    const request = axios.post<any>(VEHICLE_API, newVehicle);
    const response = (await request).data;
    return response;
  }
);

export const fetchVehicle = createAsyncThunk(
  "vehicle/fetchVehicle", 
  async () => {
  try {
    const response = await axios.get<VehicleList[]>(VEHICLE_API);
    return response.data;
  } catch (error) {
    throw error; 
  }
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
