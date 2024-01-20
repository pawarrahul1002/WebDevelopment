import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import basciAuthorizer from "./src/middleware/basicAuth.middleware.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import bodyParser from "body-parser";
import cartRouter from "./src/features/cart/routes/cart.routes.js";
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
const server = express();

server.use(bodyParser.json());

server.use(loggerMiddleware);

// below code we are doing with cors librry
// import cors from "cors";
// let corsOptions = {
//   origin: "http://localhost:5000/",
// };

// server.use(cors(corsOptions));
// server.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","http://localhost:5000");
//     res.header("Access-Control-Allow-Headers","*");
//     res.header("Access-Control-Allow-Methods","*");

//     if(req.method=="OPTIONS")
//     {
//         return res.status(200);
//     }
//     next();
// })

// server.get("/", (req, res) => {
//   res.send("welcome to ECommerce API's ");
// });

const port = 3200;
server.get("/", (req, res) => {
  res.send(`Server is listening on port ${port}`);
});

server.use("/api/products", jwtAuth, productRouter);
server.use("/api/users", userRouter);
server.use("/api/cartItems", jwtAuth, cartRouter);
server.listen(port, () => {
  console.log("server is listening to", port);
});

server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
  }
  res.status(500).send("Something went wrong! Please try again later");
});
server.use("/", (req, res) => {
  res.status(404).send("API not found");
});
