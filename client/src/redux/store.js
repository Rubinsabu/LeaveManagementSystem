import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import leaveReducer from '../features/leaves/leaveSlice';
import adminReducer from '../features/admin/adminSlice'

export default configureStore({
    reducer:{
        auth: authReducer,
        leaves: leaveReducer,
        admin: adminReducer,
    }
});