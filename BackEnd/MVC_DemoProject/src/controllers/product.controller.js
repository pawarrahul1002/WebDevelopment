import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController {

    getProducts(req, res) 
    {
        let products = ProductModel.get();
        // console.log(products);
        // return res.sendFile(path.join(path.resolve(),"MVC_DemoProject02","INVENTORY-MGMT","src",'views',"products.html" ));
        res.render("products", { products: products });
    }

    getAddForm(req, res) 
    {
        return res.render("new-product", {product:null, errorMessage: null });
    }

    postNewProduct(req, res) 
    {
        const{name,desc,price} = req.body;
        // console.log("body",req.body);
        const imageUrl = "images/"+req.file.filename;
        let products = ProductModel.add(name,desc,price,imageUrl);
        console.log("after adding new producct",products);
        res.render("products", { products: products });
    }

    postUpdateProduct(req,res)
    {
        ProductModel.updateProduct(req.body);
        let products = ProductModel.getAll();
        products.forEach((p)=>console.log(p));
        res.render("products", { products: products });
    }

    postDeleteProduct(req,res)
    {
        const id = req.params.id;
        console.log(id);
        const productFound = ProductModel.getById(id);
        console.log("productFound :: ",productFound);
        if (productFound) {
            // 1 if product exists thne return view
            ProductModel.deleteProduct(productFound);
            const products = ProductModel.getAll();
            res.render("products",{ products:products, errorMessage: null });
        }
        else 
        {
            // 2 return error that product not exists
            res.status(401).send("Product not found");
        }
    }



    getUpdateProductView(req, res, next) {
        console.log(req.params.id);
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if (productFound) 
        {
            // 1 if product exists thne return view
            res.render("update-product",{ product:productFound, errorMessage: null });
        }
        else 
        {
            // 2 return error that product not exists
            res.status(401).send("Product not fount");
        }
    }

}