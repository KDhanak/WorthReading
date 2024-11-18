import express from 'express';
import { loginUser, registerUser, accessToken, logoutUser, refreshAccessToken } from '../controllers/authControllers.js';
import rateLimit from 'express-rate-limit';

const requestLimiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 6, 
    message: 'Too many login attempts. Please try again later.',
});

const loginRequestLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5, 
    message: 'Too many login attempts. Please try again later.',
})

const authRouter = express.Router();

// Register route
authRouter.post('/register', registerUser);

// Login route
authRouter.post('/login', loginRequestLimiter, loginUser);

// token validation
authRouter.get('/validate', accessToken);

// token refresh route
authRouter.post('/refresh-token', requestLimiter, refreshAccessToken)

// logout route
authRouter.post('/logout', logoutUser);

export default authRouter;
