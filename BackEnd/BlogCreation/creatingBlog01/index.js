// Please don't change the pre-written code
// Import the necessary modules here

import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import {renderBlogForm} from "./src/controllers/blog.controller.js"
const app = express();

app.set("view engine", "ejs");

console.log(path.resolve("src", "views"));
app.set("views", path.resolve("src", "views"));
app.use(expressEjsLayouts);

// Write your code here
app.get("/",(req,res)=>{
    res.send("default route");
});

app.get("/createblog",renderBlogForm);


// app.listen("3000",()=>{
//     console.log("server is listening to port 3000");
// })

export default app;
