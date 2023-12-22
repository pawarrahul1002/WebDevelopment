import express from 'express'
import ProductController from './src/controllers/product.controller.js';
import path from "path";
import ejsLayout from "express-ejs-layouts";
import validateNewItem from "./src/middleware/validation.middleware.js"
import {uploadFile} from "./src/middleware/file-upload.middleware.js"


const server = express();

server.use(express.static('public'));
server.use(express.static('src/views'));

// setup view engine
server.use(express.urlencoded({extended:true}));
server.set("view engine","ejs");

console.log(path.resolve());
server.set("views",path.join(path.resolve(),"MVC_DemoProject","src",'views'));
server.use(ejsLayout);


// create an instance of ProductController
const productController = new ProductController(); 
server.get('/', (productController.getProducts));
server.get('/new', (productController.getAddForm));
server.post('/',validateNewItem,uploadFile.single("imageUrl"), productController.postNewProduct);
server.post('/update-product',validateNewItem, productController.postUpdateProduct);
server.post('/delete-product/:id',productController.postDeleteProduct);
server.get("/update-product/:id",productController.getUpdateProductView);


// return res.send('Welcome to Inventory App');
server.listen(3400,()=>{
    console.log('Server is listening on port 3400');
});