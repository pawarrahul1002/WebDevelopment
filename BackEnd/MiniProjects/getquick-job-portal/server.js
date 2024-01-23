//packages import
import express from "express";
import dotenv from "dotenv";
import  colors  from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-error";
//files import
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import errorMiddleware from "./middleware/errorMiddleware.js"
import userAuth from "./middleware/authMiddleware.js";
dotenv.config();
 
//mongodb connection
connectDB();


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.use(userAuth,testRoutes);
app.use("/api/v1/auth",authRoutes)
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to job portal</h1>");
});

app.use(errorMiddleware);


const port  = process.env.PORT || 8080;

app.listen(8080,()=>{
    // user nodemon run server or npx nodemon server.js
    console.log(`node is running in ${process.env.DEV_MODE} on port ${port}`.bgBlue.white); 
});