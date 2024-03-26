import mongoose from "mongoose";
import BookRepository from "./book.repository.js";
import { BookModel } from "./book.model.js";

export default class BookController {
  constructor() {
    this.bookRepository = new BookRepository();
  }

  //------change code in below functions only--------

  // creation of book
  createBook = async (req, res) => {
    try {
      const { title, author, genre, copies, availableCopies } = req.body;

      const newBook = new BookModel(
        title,
        author,
        genre,
        copies,
        availableCopies
      );
      const result = await this.bookRepository.createBook(newBook);
      res.status(201).send(result);
    } catch (err) {
      res.status(500).send("Something went wrong with database");
    }
  };

  // filtering of book by id
  getOne = async (req, res) => {
    try {
      const id = req.params.bookId; // Extract id from request parameters
      
      console.log(id);
      const book = await this.bookRepository.getOne(id); // Call repository method with id
      console.log(book);
      if (!book) {
        return res.status(404).send({ message: "Book not found" });
      }
      res.status(200).send(book);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  };
}
