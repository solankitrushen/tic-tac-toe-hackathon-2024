import { APIError, STATUS_CODES } from "../../utils/app-errors.js";
import bookModel from "../models/books.js";
// Dealing with book database operations
export default class bookRepository {
  async createBook(bookInputs) {
    try {
      const book = await bookModel.create(bookInputs);
      return book;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to create book"
      );
    }
  }

  async findBookById(bookId) {
    try {
      const book = await bookModel.findOne({ bookId });
      return book;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to find book"
      );
    }
  }

  async findBooks(query) {
    try {
      const books = await bookModel.find(query);
      return books;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to find books"
      );
    }
  }

  async updateBook(bookId, updateData) {
    try {
      const updatedBook = await bookModel.findOneAndUpdate(
        { bookId },
        updateData,
        { new: true }
      );
      return updatedBook;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to update book"
      );
    }
  }

  async deleteBook(bookId) {
    try {
      const deletedBook = await bookModel.findOneAndDelete({ bookId });
      return deletedBook;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to delete book"
      );
    }
  }

  async findBookByISBN(isbn) {
    try {
      const book = await bookModel.findOne({ isbn });
      return book;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to find book by ISBN"
      );
    }
  }
}
