import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { loginUser, registerUser } from './controllers/authControllers.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello, JavaScript with Express using ES Modules!');
});

app.get('/test', (req, res) => {
	res.send("Testing!!");
})

app.get('/database', (req, res) => {
	mongoose
		.connect(process.env.MONGO_URI)
		.then(() => {
			res.send('Connected to MongoDB');
			app.listen(PORT, () => res.send(`Server running on port ${PORT}`));
		})
		.catch((error) => res.send(`MongoDB connection error: ${error}`));
})
// Connect to MongoDB and start server

app.get('/status', (req, res) => {
	res.json({ message: 'Server is running and connected to MongoDB' });
});

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

export default app;
