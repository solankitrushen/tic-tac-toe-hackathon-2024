import bookService from "../services/book-service.js"; // Assuming you have a book service
import uploadBooksToS3 from "../api/middlewares/uploadBookToS3.js"; // Import the S3 upload middleware
import { AWS_BUCKET_NAME, AWS_REGION } from "../config/index.js";

const books = (app) => {
  const service = new bookService();

  // Welcome Route
  app.get("/books", async (req, res, next) => {
    res.status(200).json({ message: "Welcome to Books API" });
  });

  // Add a new book (with file upload to S3)
  app.post("/books/add", async (req, res, next) => {
    try {
      const { title, author, description } = req.body;

      const newBook = {
        title,
        author,
        description,
      };

      const { data } = await service.addBook(newBook);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post(
    "/uploadBooksToS3",
    uploadBooksToS3.single("bookFile"),

    (req, res) => {
      const fileUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${req.file.key}`;
      res.status(200).json({
        status: "success",
        message: "uploaded successfully!",
        imageUrl: fileUrl,
      });
    }
  );

  // Get all books
  app.get("/books/list", async (req, res, next) => {
    try {
      const books = await service.getAllBooks();
      return res.json(books);
    } catch (err) {
      next(err);
    }
  });

  // Get a book by ID
  app.get("/books/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await service.getBookById(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.json(book);
    } catch (err) {
      next(err);
    }
  });

  // Update book details
  app.put("/books/update/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedBookDetails = req.body;

      const updatedBook = await service.updateBook(id, updatedBookDetails);
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.json(updatedBook);
    } catch (err) {
      next(err);
    }
  });


};

export default books;
