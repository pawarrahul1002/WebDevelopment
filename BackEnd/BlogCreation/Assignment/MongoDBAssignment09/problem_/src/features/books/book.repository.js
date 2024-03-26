import mongoose from "mongoose";
import { bookSchema } from "./book.schema.js";

const bookModel = mongoose.model("Books", bookSchema);

export default class BookRepository {
  // -----Change code in below functions only-----

  //book creation
  async createBook(bookData) {
    const newBook = new bookModel(bookData);
    await newBook.save();
    return newBook;
  }

  //filtering the book by id
  async getOne(id) {
    return await bookModel.findOne({ _id: id });
  }
}
