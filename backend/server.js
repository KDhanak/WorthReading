import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './api/authRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello, JavaScript with Express using ES Modules!');
});

app.use('/api/auth', router);

// Connect to MongoDB and start server
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => console.error(`MongoDB connection error: ${error}`));

export default app;
