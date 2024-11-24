import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
}, {_id: false});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    items: {
        type: [cartItemSchema],
        default: [],
    },
}, {
    timestamps: true,
});

cartSchema.virtual('totalPrice').get(function () {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
});

cartSchema.set('toJSON', {virtuals: true});
cartSchema.set('toObject', {virtuals: true});

const Cart = mongoose.model('cart', cartSchema);

export default Cart;
