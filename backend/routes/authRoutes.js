import express from 'express';
import { loginUser, registerUser, accessToken, logoutUser } from '../controllers/authControllers.js';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// token validation
router.get('/validate', accessToken);

// logout route
router.post('/logout', logoutUser)

export default router;
