import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async(userCredentials: { email: string; password: string })=>{
    const request = axios.post('http://localhost:8080/user', userCredentials) 
    const response = (await request).data.data;
    localStorage.setItem('user', JSON.stringify(response));
    console.log(response);
    return response; 
  }
);

interface UserState {
  loading: boolean;
  user: null | any; 
  error: null | string; 
}

const initialState: UserState = {
  loading: false,
  user: null,
  error: null,
};

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
  extraReducers:(builder)=>{
    builder
    .addCase(loginUser.pending,(state)=>{
      state.loading = true;
      state.user = null;
      state.error= null;
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
      state.loading = false;
      state.user = action.payload;
      state.error= null;
    })
    .addCase(loginUser.rejected,(state,action)=>{
      state.loading = false;
      state.user = null;
      console.log(action.error.message);
      if(action.error.message==='Request failed with status code 401'){
        state.error = 'Access Denied! Invalid Credentials'
      }
      else {
        state.error = action.error?.message ?? 'An error occurred'; // nullish coalescing operator to provide a fallback message
      }
    })
  }
});

export const { setLoading, setUser, setError } = userSlice.actions;
export default userSlice.reducer;
