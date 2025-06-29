import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API = import.meta.env.VITE_API || 'http://localhost:5000/api';

export const login = createAsyncThunk('auth/login', async(data)=>{
    
    try{
        const res = await axios.post(`${API}/auth/login`,data);
        return res.data;
    }catch(error){
        if (error.response) {
            return rejectWithValue(error.response.data.message || 'Login failed');
          } else if (error.request) {
            return rejectWithValue('Network error - no server response');
          } else {
            return rejectWithValue(error.message);
          }
    }
    
});

export const register = createAsyncThunk('auth/register', async(data)=>{

    try{
        const res = await axios.post(`${API}/auth/register`,data);
        return res.data;
    }catch(error){
        if (error.response) {
            return rejectWithValue(error.response.data.message || 'Register failed');
          } else if (error.request) {
            return rejectWithValue('Network error - no server response');
          } else {
            return rejectWithValue(error.message);
          }
    }
    
});

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        status: null,
    },
    reducers:{
        logout: (state)=>{
            localStorage.clear();
            state.user=null;
            state.token=null;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            state.token = action.payload.token;
            const decoded = JSON.parse(atob(action.payload.token.split('.')[1]));
            state.user = {userId: decoded.userId, role: decoded.role};
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('user', JSON.stringify(state.user));
        })
        .addCase(register.fulfilled, (state, action) => {
            state.token = action.payload.token;
            const decoded = JSON.parse(atob(action.payload.token.split('.')[1]));
            state.user = { userId: decoded.userId, role: decoded.role };
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(state.user));
          });
    },
});

export const {logout}= authSlice.actions;
export default authSlice.reducer;

