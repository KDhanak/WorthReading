import express from 'express';
import { fetchAllBooks, fetchBookById} from '../controllers/bookControllers.js'

const bookRouter = express.Router();

// fetch the books
bookRouter.get('/', fetchAllBooks);

// fetch a specific book
bookRouter.get('/:id', fetchBookById);

export default bookRouter;
