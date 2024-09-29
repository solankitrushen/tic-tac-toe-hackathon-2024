import { bookRepository } from "../database/index.js";
import { formateData } from "../utils/index.js";
import { APIError } from "../utils/app-errors.js";
// All Business logic for books will be here
export default class bookService {
  constructor() {
    this.repository = new bookRepository();
  }

  // Add a new book and upload its file
  async addBook(bookInputs, file) {
    const { bookName, bookDesc, isbn, bookUrl} = bookInputs;

    try {
      // Upload the PDF file to storage (like AWS S3 or any other storage service)

      // Add the book URL to bookInputs
      bookInputs.bookUrl = bookUrl;

      // Save book data to the database
      const newBook = await this.repository.createBook(bookInputs);

      return formateData({
        message: "Book uploaded successfully",
        book: newBook,
      });
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  // Find a book by its ID
  async getBookById(bookId) {
    try {
      const book = await this.repository.findBookById(bookId);

      if (book) {
        return formateData({
          book,
        });
      } else {
        return formateData({
          message: "Book not found",
        });
      }
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  // Find books based on any search parameters (e.g., book name, author, etc.)
  async findBooks(query) {
    try {
      const books = await this.repository.findBooks(query);

      if (books && books.length > 0) {
        return formateData({
          books,
        });
      } else {
        return formateData({
          message: "No books found",
        });
      }
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  // Update book details
  async updateBook(bookId, updateData) {
    try {
      const updatedBook = await this.repository.updateBook(bookId, updateData);

      if (updatedBook) {
        return formateData({
          message: "Book updated successfully",
          book: updatedBook,
        });
      } else {
        return formateData({
          message: "Book not found",
        });
      }
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  // Delete a book and its associated PDF file
  async deleteBook(bookId) {
    try {
      const book = await this.repository.findBookById(bookId);

      if (book) {
        // Delete the associated book file from storage
        await deleteBookFile(book.bookUrl);

        // Delete the book entry from the database
        const deletedBook = await this.repository.deleteBook(bookId);

        return formateData({
          message: "Book deleted successfully",
          book: deletedBook,
        });
      } else {
        return formateData({
          message: "Book not found",
        });
      }
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  // Find a book by its ISBN number
  async getBookByISBN(isbn) {
    try {
      const book = await this.repository.findBookByISBN(isbn);

      if (book) {
        return formateData({
          book,
        });
      } else {
        return formateData({
          message: "Book not found",
        });
      }
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }
  async getAllBooks() {
    try {
      const books = await this.repository.findAllBooks(); // Assuming you have a findAllBooks method in your repository
  
      if (books && books.length > 0) {
        return formateData({
          books,
        });
      } else {
        return formateData({
          message: "No books found",
        });
      }
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }
}
