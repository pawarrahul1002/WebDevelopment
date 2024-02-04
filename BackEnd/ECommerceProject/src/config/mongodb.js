import {MongoClient} from "mongodb";

// const url = "mongodb://localhost:27017/ecomdb";
const url = "mongodb://127.0.0.1:27017/ecomdb";
let client;
export const connectToDb = () =>{
   
    MongoClient.connect(url).then(clientInstance=>{
        client = clientInstance;
        console.log("Connected to mongodb");
    }).catch(err=>{
        console.log(err);
    })
}

export const getDB = ()=>{
    return client.db();
}