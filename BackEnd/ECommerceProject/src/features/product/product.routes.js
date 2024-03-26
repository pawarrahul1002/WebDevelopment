import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middleware/fileupload.midddleware.js";




const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/",productController.getAllProduct);
productRouter.get("/filter",productController.filterProduct);
productRouter.get("/:id",productController.getOneProduct);
productRouter.post("/",upload.single("imageUrl"),productController.addProduct);
productRouter.post("/rate",productController.rateProduct);
productRouter.get("/avaragePrice",productController.avaragePrice);



export default productRouter;

