import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { authHeader } from '../../utils/authHeader';

const API = import.meta.env.VITE_API || 'http://localhost:5000/api';

export const fetchLeaves = createAsyncThunk('leaves/fetchLeaves', async () => {
    const res = await axios.get(`${API}/leaves`, { headers: authHeader() });
    return res.data;
  });
  
  export const applyLeave = createAsyncThunk('leaves/applyLeave', async (data) => {
    const res = await axios.post(`${API}/leaves`, data, { headers: authHeader() });
    return res.data;
  });
  
  export const cancelLeave = createAsyncThunk('leaves/cancelLeave', async (id) => {
    await axios.delete(`${API}/leaves/${id}`, { headers: authHeader() });
    return id;
  });

const leaveSlice = createSlice({
    name: 'leaves',
    initialState: {
      leaves: [],
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchLeaves.fulfilled, (state, action) => {
          state.leaves = action.payload;
        })
        .addCase(applyLeave.fulfilled, (state, action) => {
          state.leaves.push(action.payload);
        })
        .addCase(cancelLeave.fulfilled, (state, action) => {
          state.leaves = state.leaves.filter(leave => leave._id !== action.payload);
        });
    },
  });

  export default leaveSlice.reducer;