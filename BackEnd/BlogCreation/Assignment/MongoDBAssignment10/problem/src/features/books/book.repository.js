// -------------pre-written code starts---------------
import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

export default class BookRepository {

    //book creation
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    // filtering of book by id
    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    // ------------prewritten code ends----------------


    // Complete the following functions:

    //filtering the books based on genre
    async listBooksByGenre(genre) { 
        try {
            const books = await booksModel.find({ genre });
            return books;
        } catch (error) {
            console.error("Error listing books by genre:", error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    //increasing the count of available books
    // async updateBookAvailability(bookId, quantity) {
    //     try {
    //         await booksModel.findByIdAndUpdate(bookId, { $inc: { availableCopies: quantity } });
    //         return getOne(bookId);
    //     } catch (error) {
    //         console.error("Error listing books by genre:", error);
    //         throw error; // Rethrow the error to be handled by the caller
    //     }
    //  }

    async updateBookAvailability(bookId, quantity) {
        await booksModel.findByIdAndUpdate(bookId, { $inc: { availableCopies: quantity } });
    }


    //deletion of book
    async deleteBookById(bookId) {
        await booksModel.findByIdAndDelete(bookId);
    }
}