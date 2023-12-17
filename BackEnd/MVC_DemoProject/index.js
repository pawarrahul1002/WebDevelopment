import express from 'express'
import ProductController from './src/controllers/product.controller.js';
import path from "path";
import ejsLayout from "express-ejs-layouts";
import validateNewItem from "./src/middleware/validation.middleware.js"
import { url } from 'inspector';
// const express = require('express');

const server = express();

// setup view engine
server.use(express.urlencoded({extended:true}));
server.set("view engine","ejs");
// console.log(path.resolve());
server.set("views",path.join(path.resolve(),"BackEnd","MVC_DemoProject","src",'views'));
server.use(ejsLayout);


// create an instance of ProductController
const productController = new ProductController(); 
server.get('/', (productController.getProducts));
server.get('/new', (productController.getAddForm));
server.post('/',validateNewItem, productController.postNewProduct);
server.post('/update-product',validateNewItem, productController.postUpdateProduct);
server.get('/delete-product/:id',productController.getDeleteProduct);
server.get("/update-product/:id",productController.getUpdateProductView);
server.use(express.static('src/views'));


// return res.send('Welcome to Inventory App');
server.listen(3400,()=>{
    console.log('Server is listening on port 3400');
});