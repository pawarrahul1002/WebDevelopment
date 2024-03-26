// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
const url = "mongodb://127.0.0.1:27017";
// const url = "mongodb://localhost:27017";
// mongodb://127.0.0.1:27017/ecomdb
export const connectUsingMongoose = async () => {
  // write your code here
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connected using mongoose");
  } catch (err) {
    console.log("Error while connecting to db");
    console.log(err);
  }
};
