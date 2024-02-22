import axios from "axios";
import { VehicleList } from "../models/vehicleModel";
import { VEHICLE_API } from "../models/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
 const initialState: VehicleList[] = [];

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  builder
  .addCase(fetchVehicle.fulfilled, (_state, action) => {
  // Update the state with the fetched data
       return action.payload;
     });
   },
});

export default vehicleSlice.reducer;
