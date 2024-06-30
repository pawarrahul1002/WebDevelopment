import express from "express";
import { connectDB } from "./utils/features.js";
const port = 3000;
const app = express();
app.use("/hello", (req, res) => {
    res.send("Hello Everyone!!");
});
app.use("/", (req, res) => {
    res.send("This is default request");
});
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
    connectDB();
});
