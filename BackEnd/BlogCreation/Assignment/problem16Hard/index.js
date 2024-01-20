import express from "express";
import userRoutes from "./src/features/user/routes/user.routes.js";
import { logger } from "./src/middlewares/logger.middleware.js";
import { invalidRoutesHandlerMiddleware } from "./src/middlewares/invalidRoutes.middleware.js";
import {
  customErrorHandler,
  errorHandlerMiddleware,
} from "./src/middlewares/errorHandler.js";
const app = express();

// Middleware to log errors using Winston





app.use(express.json());

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).send("welcome to CN");
});

app.get("/test-custom-error", (req, res) => {
  throw new customErrorHandler(
    505,
    "testing app level custom error handling middleware"
  );
});

app.get("/test-unhandled-error", (req, res) => {
  throw "Unknown Server Error";
});



app.use(invalidRoutesHandlerMiddleware);

app.use((err, req, res, next) => {
  // Log the error using Winston logger
  logger.error({
    level: "error",
    message: err.message,
    requestURL: req.originalUrl,
    
  });
// Middleware to handle errors
app.use(errorHandlerMiddleware);


  // Continue to the next middleware
  next(err);
});
export default app;
