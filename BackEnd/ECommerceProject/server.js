import express from "express";
import productRouter from "./src/features/product/product.routes.js";  
import bodyParser from "body-parser";
const server = express();

server.use(bodyParser.json());

server.get("/",(req,res)=>{
    res.send("welcome to ECommerce API's ");
})

const port = 3200;
server.use("/api/products",productRouter);
server.listen(port,()=>{
    console.log("server is listening to",port);
});