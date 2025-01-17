import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
}, { _id: false });

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    items: {
        type: [wishlistItemSchema],
        default: [],
    },
}, {
    timestamps: true, 
});

wishlistSchema.virtual('totalItems').get(function () {
    return this.items.length;
});

wishlistSchema.set('toJSON', { virtuals: true });
wishlistSchema.set('toObject', { virtuals: true });

const Wishlist = mongoose.model('wishlist', wishlistSchema);

export default Wishlist;
