import mongoose from "mongoose";
// import dotenv from "dotenv";

// Load environment variables from .env file
// dotenv.config();
// MongoDB connection URL from environment variables

const url = "mongodb://127.0.0.1:27017/issuestracker";

// Function to connect to MongoDB using Mongoose
export const connectToMongoDB = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(url, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // Add any other connection options as needed
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
