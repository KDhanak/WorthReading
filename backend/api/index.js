import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// const F_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: 'https://worth-reading-frontend.vercel.app',
	credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.get('/', (req, res) => {
	res.send('Hello, JavaScript with Express using ES Modules!');
});

app.use('/api/auth', authRouter);
app.use('/api/book', bookRouter);
app.use('/api/cart', cartRouter);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error(`MongoDB connection error: ${error}`));

export default app;
