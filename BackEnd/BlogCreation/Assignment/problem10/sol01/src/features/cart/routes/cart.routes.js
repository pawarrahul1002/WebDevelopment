import express from "express";
import { CartItemsController } from "../controller/cart.controller.js";


const cartRouter = express.Router();
const cartController = new CartItemsController();
cartRouter.post("/",cartController.add);

export default cartRouter;