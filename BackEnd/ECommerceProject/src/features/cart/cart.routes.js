import express from "express";
import { CartItemsController } from "./cart.controller.js";


const cartRouter = express.Router();
const cartController = new CartItemsController();
cartRouter.get("/",cartController.get);
cartRouter.post("/",cartController.add);
cartRouter.delete("/:id",cartController.delete);

export default cartRouter;