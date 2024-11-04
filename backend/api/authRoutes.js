import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { loginUser, registerUser } from '../controllers/authControllers';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Register route
app.post('/register', registerUser);

// Login route
app.post('/login', loginUser);

// Connect to MongoDB only once
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error(`MongoDB connection error: ${error}`));

// Export the app as the default for Vercel's serverless function handler
export default app;
