import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { authHeader } from "../../utils/authHeader";

const API = import.meta.env.VITE_API || 'http://localhost:5000/api';


export const fetchAllLeaves = createAsyncThunk('admin/fetchAllLeaves', async () => {
    const res = await axios.get(`${API}/admin/leaves`, { headers: authHeader() });
    return res.data;
  });

export const updateLeaveStatus = createAsyncThunk('admin/updateLeaveStatus', async ({ id, status }) => {
    const res = await axios.put(`${API}/admin/leaves/${id}/status`, { status }, { headers: authHeader() });
    return res.data;
  });

  const adminSlice = createSlice({
    name: 'admin',
    initialState: {
      allLeaves: [],
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllLeaves.fulfilled, (state, action) => {
          state.allLeaves = action.payload;
        })
        .addCase(updateLeaveStatus.fulfilled, (state, action) => {
          const index = state.allLeaves.findIndex(leave => leave._id === action.payload._id);
          if (index !== -1) state.allLeaves[index] = action.payload;
        });
    },
  });
  
  export default adminSlice.reducer;
