import express from 'express';
import { loginUser, registerUser } from '../controllers/authControllers.js';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

console.log("The routes is working.");

export default router;
