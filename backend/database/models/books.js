import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const bookSchema = new mongoose.Schema(
  {
    bookUserId: {
      type: String,
      require: true,
    },
    bookId: {
      type: String,
      require: true,
      unique: true,
      default: uuid,
    },
    bookName: {
      type: String,
      require: true,
    },
    bookDesc: {
      type: String,
      require: true,
    },
    bookUrl: {
      type: String,
      require: true, // URL for the uploaded PDF
    },
    isbn: {
      type: String,
      unique: true,
      require: true,
    },
    author: {
      type: String,
      require: true, 
    },
    publicationDate: {
      type: Date,
    },
    publisher: {
      type: String,
    },
    genre: {
      type: String,
    },
    language: {
      type: String,
      default: "English",
    },
    pageCount: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

const bookModel = mongoose.model("bookDetails", bookSchema);

export default bookModel;
