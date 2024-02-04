import { MongoClient } from "mongodb";
const url = "mongodb://127.0.0.1:27017/";
// const url = "mongodb://localhost:27017";
let client;

export const connectToMongoDB = async () => {
  try {
    client = await MongoClient.connect(url);
    console.log("MongoDB is connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err; // Rethrow the error to handle it elsewhere if needed
  }
};

export const getDB = () => {
  if (!client) {
    throw new Error("MongoDB client is not initialized");
  }
  return client.db("ExpenZap");
};
