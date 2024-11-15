import express from 'express';
import { loginUser, registerUser, accessToken, logoutUser, refreshAccessToken } from '../controllers/authControllers.js';
import { rateLimit } from 'express-rate-limit';

const refreshTokenLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max:5,
    message: 'Too meany refresh token requests, please try again later.'
})

const authRouter = express.Router();

// Register route
authRouter.post('/register', registerUser);

// Login route
authRouter.post('/login', loginUser);

// token validation
authRouter.get('/validate', accessToken);

// token refresh route
authRouter.post('/refresh-token', refreshTokenLimiter, refreshAccessToken)

// logout route
authRouter.post('/logout', logoutUser);

export default authRouter;
