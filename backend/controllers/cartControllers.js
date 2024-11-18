import Cart from '../models/Cart.js';
import Book from '../models/Book.js';

export const getCart = async (req, res) => {
    try {
         const cart = await Cart.findOne({userId: req.user._id}).populate('items.productId');
         if (!cart) return res.status(404).json({message: 'Cart not found error'});
         res.json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const addItemToCart = async (req, res) => {
    const {productId, quantity } = req.body;

    const userId = req.user.id;
    try {
        const book = await Book.findById(productId);
        if(!book) return res.status(404).json({message: 'Book not found'});

        let cart = await Cart.findOne({userId: userId});
        if (!cart) {
            cart = new Cart({userId: userId, items: []});
        }

        const existingItem = cart.items.find(item => item.productId.equals(productId));
        if(existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({productId, quantity, price: book.price, name: book.title});
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const updateCartItem = async (req, res) => {
    const {productId, quantity} = req.body;
    try{
        const cart = await Cart.findOne({userId: req.user._id});
        if (!cart) return res.status(404).json({message: 'Cart not found'});
        
        const item = cart.items.find(item => item.productId.equals(productId));
        if (!item) return res.status(404).json({message: 'Item not found in cart'});

        item.quantity = quantity;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const removeItemFromCart = async (req, res) => {
    const {productId} = req.body;
    try{
        const cart = await Cart.findOne({userId: req.user._id});
        if(!cart) return res.status(404).json({message: 'Cart not found'});

        cart.items = cart.items.filter(item => !item.productId.equals(productId));
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            {userId: req.user.id},
            {items: []},
            {new: true}
        );
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
