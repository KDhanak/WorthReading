import Book from '../models/Book.js';

export const fetchAllBooks = async (req, res) => {
	try {
		const books = await Book.find();
		res.status(200).json({
			message: 'Books fetched successfully',
			data: books,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Failed to fetch the books',
			error: error.message,
		});
	}
};

export const fetchBookById = async (req, res) => {
	try {
		const bookId = req.params.id
		const book = await Book.findById(bookId);

		if (book) {
			res.status(200).json({
				message: 'Book fetched successfully',
				data: book,
			});
		} else{
			res.status(404).json({
				message: 'Book not found',
			});
		}
	} catch (error) {
		res.status(500).json({
			message: 'Internal Server Error',
			error: error.message
		});
	}
}
