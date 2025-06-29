import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth',authRoutes);
app.use('/api/leaves',leaveRoutes);
app.use('/api/admin',adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});