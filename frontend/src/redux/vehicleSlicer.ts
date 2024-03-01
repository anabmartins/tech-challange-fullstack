import axios from "axios";
import { VehicleList } from "../models/vehicleModel";
import { VEHICLE_API } from "../models/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action

export const createVehicle = createAsyncThunk(
  "vehicle/createVehicle",
  async (newVehicle: { name: string; plate: string; modelName: string }) => {
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
  }
);

export const editVehicle = createAsyncThunk(
  "vehicle/editVehicle",
  async (vehicleToEdit: {
    id: number;
    name: string;
    plate: string;
    modelName: string;
  }) => {
    const request = axios.patch<any>(
      `${VEHICLE_API}/${vehicleToEdit.id}`,
      vehicleToEdit
    );
    const response = (await request).data;
    return response;
  }
);

export const deleteVehicle = createAsyncThunk(
  "vehicle/deleteVehicle",
  async (vehicleId: number) => {
    const request = axios.delete<any>(`${VEHICLE_API}/${vehicleId}`);
    const response = (await request).data;
    return response;
  }
);

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
      })
      .addCase(editVehicle.fulfilled, (state, action) => {
        // Update the state with the edited data
        const index = state.findIndex(
          (vehicle) => vehicle.id === action.payload.id
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        // Update the state by removing the deleted vehicle
        return state.filter((vehicle) => vehicle.id !== action.payload.id);
      });
  },
});

export default vehicleSlice.reducer;
