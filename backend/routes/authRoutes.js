import express from 'express';
import { loginUser, registerUser, accessToken, logoutUser, refreshAccessToken } from '../controllers/authControllers.js';

const authRouter = express.Router();

// Register route
authRouter.post('/register', registerUser);

// Login route
authRouter.post('/login', loginUser);

// token validation
authRouter.get('/validate', accessToken);

// token refresh route
authRouter.post('/refresh-token', refreshAccessToken)

// logout route
authRouter.post('/logout', logoutUser);

export default authRouter;
