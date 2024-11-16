import express from 'express';
import { loginUser, registerUser, accessToken, logoutUser } from '../controllers/authControllers.js';
import rateLimit from 'express-rate-limit';

const requestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 45, // Limit each IP to 10 login attempts per window
    message: 'Too many login attempts. Please try again later.',
});

const authRouter = express.Router();

// Register route
authRouter.post('/register', registerUser);

// Login route
authRouter.post('/login', requestLimiter, loginUser);

// token validation
authRouter.get('/validate', accessToken);

// token refresh route
// authRouter.post('/refresh-token', requestLimiter, refreshAccessToken)

// logout route
authRouter.post('/logout', logoutUser);

export default authRouter;
