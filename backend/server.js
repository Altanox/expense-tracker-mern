import * as dontenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import * as path from 'path';

dontenv.config();

const app = express();

// Middleware - handle cors
app.use(
    cors({
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json());

connectDB();

app.use('/api/v1/auth', authRoutes);

// serve uploads directory
app.use('/uploads', express.static(path.join(path.dirname('.'), 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
