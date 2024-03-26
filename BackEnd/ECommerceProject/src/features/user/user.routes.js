import express from "express";
import jwtAuth from "./src/middleware/jwt.middleware.js";

import UserController from "./user.controller.js";

const userRouter = express.Router();
const userController = new UserController();
userRouter.post("/signup", (req, res) => {
  userController.signUp(req, res);
});
userRouter.post("/signin", (req, res) => {
  userController.signIn(req, res);
});
userRouter.put("/resetPassword", jwtAuth, (req, res, next) => {
  userController.resetPassword(req, res, next);
});

export default userRouter;
