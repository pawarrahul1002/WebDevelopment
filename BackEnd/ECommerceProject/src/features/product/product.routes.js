import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middleware/fileupload.midddleware.js";




const productController = new ProductController();
const productRouter = express.Router();

productRouter.get("/",productController.getAllProduct);
productRouter.get("/filter",productController.filterProduct);
productRouter.get("/:id",productController.getOneProduct);
productRouter.post("/",upload.single("imageUrl"),productController.addProduct);



export default productRouter;

