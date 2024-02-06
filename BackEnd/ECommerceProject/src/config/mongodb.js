import { MongoClient } from "mongodb";

// const url = "mongodb://localhost:27017/ecomdb";
const url = "mongodb://127.0.0.1:27017/ecomdb";
let client;
export const connectToDb = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      createCounter(client.db());
      createIndexes(client.db());
      console.log("Connected to mongodb");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDB = () => {
  return client.db();
};

// const createCounter= async (db)=>{
//   const existingCounter = await db.collection("counters").findOne({_id:"CartItemId"});
//   if(!existingCounter)
//   {
//     await db.collection("counters").insertOne({_id:"cartItemId",value:0});
//   }

const createCounter = async (db) => {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "cartItemId" }); // Corrected casing here
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 }); // Corrected casing here
  }
};

const  createIndexes = async(db)=>{
  try{
    await db.collection("products").createIndex({price:1});
    await db.collection("products").createIndex({name:1,category:-1});
    await db.collection("products").createIndex({desc:"text"});
    console.log("Indexes are created");
  } 
  catch(err){
    console.log(err);
  }
}
