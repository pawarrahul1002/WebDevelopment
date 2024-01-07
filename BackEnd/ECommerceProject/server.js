import express from "express";
import productRouter from "./src/features/product/product.routes.js";  
import userRouter from "./src/features/user/user.routes.js";
import basciAuthorizer from "./src/middleware/basicAuth.middleware.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import bodyParser from "body-parser";
const server = express();

server.use(bodyParser.json());

server.get("/",(req,res)=>{
    res.send("welcome to ECommerce API's ");
})

const port = 3200;
server.use("/api/products",jwtAuth,productRouter);
server.use("/api/users",userRouter);
server.listen(port,()=>{
    console.log("server is listening to",port);
});