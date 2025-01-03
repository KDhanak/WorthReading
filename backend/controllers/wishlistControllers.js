import Book from '../models/Book.js';
import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import Wishlist from '../models/Wishlist.js';

export const getWishList = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const wishlist = await Wishlist.findOne({ userId: user._id }).populate('items.books')
        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

        res.json(wishlist);
    } catch (error) {
        console.error(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

export const addToWishList = async (req, res) => {
    const { productId } = req.body;
    console.error(productId)

    const userId = req.user.id;
    try {
        const book = await Book.findById(productId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        let wishlist = await Wishlist.findOne({ userId: userId });
        if (!wishlist) {
            wishlist = new Wishlist({ userId: userId, items: [] });
        } else {
            wishlist.items.push({ productId, author: book.author, price: book.price, title: book.title });
        }

        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeWishListItem = async (req, res) => {
    const { productId } = req.params;
    try {
        const wishlist = await Wishlist.findOne({ userId: req.user.id });
        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

        wishlist.items = wishlist.items.filter(item => !item.productId.equals(productId));
        await wishlist.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
