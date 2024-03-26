import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/issuestracker";

let client;

export const connectToDb = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Connected to MongoDB");
      // Additional setup or initialization logic can go here
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err);
    });
};

export const getDB = () => {
  return client.db();
};
