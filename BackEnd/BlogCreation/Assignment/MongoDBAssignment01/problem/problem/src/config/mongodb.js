// 1. Import MongoDB Client
import {MongoClient} from "mongodb";
// const url = "mongodb://localhost:27017/confession";
const url = "mongodb://127.0.0.1:27017/confession";
// 2. Function to connect to the database
let client;
export const connectToMongoDB = () => {
    MongoClient.connect(url).then(clientInstance=>{
        client = clientInstance;
        console.log("Connected to mongodb");
    }).catch(err=>{
        console.log(err);
    })
    
};

// 3. Function to access the database
export const getDB = () => {
    return client.db();
};



// const url = "mongodb://localhost:27017/ecomdb";
// const url = "mongodb://127.0.0.1:27017/ecomdb";

// export const connectToDb = () =>{
//     MongoClient.connect(url).then(clientInstance=>{
//         client = clientInstance;
//         console.log("Connected to mongodb");
//     }).catch(err=>{
//         console.log(err);
//     })
// }

