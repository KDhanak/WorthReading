import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
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
    publishedDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    genres: {
      type: [String],
      default: [],
    },
    summary: {
      type: String,
      trim: true,
    },
    pageCount: {
      type: Number,
      min: 1,
    },
    language: {
      type: String,
      default: 'English',
    },
    isbn: {
      type: String,
      unique: true,
      required: true,
    },
    publisher: {
      type: String,
      trim: true,
    },
    availableCopies: {
      type: Number,
      default: 0,
      min: 0,
    },
    coverImageUrl: {
      type: String,
      trim: true,
    },
  }, {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  });

const Book = mongoose.model('book', bookSchema);

export default Book;
