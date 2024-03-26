// import { connectToDb } from "./src/backend/config/mongoDB.config.js";
import express from "express";
import projectRouter from "./src/backend/routes/projects.routes.js";
import issuesRouter from "./src/backend/routes/issues.routes.js";
import { connectToMongoDB } from "./src/backend/config/mongoose.config.js";
import ejsLayout from "express-ejs-layouts";
import path from "path";


const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine","ejs");
app.set("views",path.join(path.resolve(),"src","frontend",'views'))
app.use(ejsLayout);


app.use(express.json());
app.use("/api",projectRouter);
app.use("/api",issuesRouter);

app.use(express.static(path.join(path.resolve(),"src","frontend",'views')));

// "E:\Web Development\JS_Code\Basics\WebDevLearning\BackEnd\BlogCreation\IssueTrackerProject\src\src\frontend\src\views"

console.log("IssueTrackerProject\src\frontend\views");

const port = 3000;
app.listen(port,()=>{
    console.log(`Server is listening at ${port}`);
    // connectToDb();
    connectToMongoDB();
})