import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  genre: {
    type: String,
    required: true,
    enum: [
      "Fiction",
      "Non-Fiction",
      "Science Fiction",
      "Mystery",
      "Fantasy",
      "Other",
    ],
  },
  copies: {
    type: Number,
    required: true,
    min: 1,
  },
  availableCopies: {
    type: Number,
    required: true,
    min: 0,
  },
});

export default bookSchema;
