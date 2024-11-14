import express from 'express';
import { getCart, addItemToCart, updateCartItem, removeItemFromCart, clearCart } from '../controllers/cartControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const cartRouter = express.Router();

// fetch the cart
cartRouter.get('/', protect, getCart);

// add items to cart
cartRouter.post('/add', protect, addItemToCart);

// update cart items
cartRouter.put('/update', protect, updateCartItem);

// remove items from cart
cartRouter.delete('/remove', protect, removeItemFromCart);

// clear the cart
cartRouter.delete('/clear', protect, clearCart);

export default cartRouter;
