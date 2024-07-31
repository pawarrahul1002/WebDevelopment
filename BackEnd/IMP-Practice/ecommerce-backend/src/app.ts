import express from "express";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { Error } from "mongoose";
import { ErrorMiddleware } from "./middlewares/error.js";

const app = express();
app.use(express.json());
connectDB();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("This is default get req");
// });

app.use("/api/v1/user", userRoute);

app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log("server is listening on port", port);
});
