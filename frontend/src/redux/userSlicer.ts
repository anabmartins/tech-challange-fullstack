import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTH_API, USER_API } from "../models/constants";
import { initialState, UserCredentials } from "../models/userModel";

// Actions
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials: { email: string; password: string }) => {
    const request = axios.post<any>(AUTH_API, userCredentials);
    const response = (await request).data;
    localStorage.setItem("token", response.acees_token);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userCredentials: UserCredentials) => {
    const request = axios.post(USER_API, userCredentials);
    const response = (await request).data;
    console.log(response.data);
    return response;
  }
);

// Slice

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === "Request failed with status code 500") {
          state.error = "Credenciais inválidas";
        } 
        else if(action.error.message === "Request failed with status code 401"){
          state.error = "Login ou senha inválidas";
        }
        else {
          state.error = action.error?.message ?? "An error occurred"; // nullish coalescing operator to provide a fallback message
        }
      })
      // register user case
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error?.message ?? "An error occurred";
      });
  },
});

export const { setLoading, setUser, setError } = userSlice.actions;
export default userSlice.reducer;
