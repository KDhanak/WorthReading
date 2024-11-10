import express from 'express';
import { loginUser, registerUser, accessToken, logoutUser, fetchAllBooks, fetchBookById } from '../controllers/authControllers.js';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// token validation
router.get('/validate', accessToken);

// logout route
router.post('/logout', logoutUser);

//fetch the books
router.get('/books', fetchAllBooks);

//fetch a specific book
router.get('/book/:id', fetchBookById);

export default router;
