import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController{

    getProducts(req,res){
        let products = ProductModel.get();
        // console.log(products);
        // return res.sendFile(path.join(path.resolve(),"MVC_DemoProject02","INVENTORY-MGMT","src",'views',"products.html" ));
        res.render("products",{products:products});
    }

    getAddForm(req,res)
    {
        return res.render("new-product",{errorMessage:null});
    }

    postNewProduct(req,res){
        
        let products = ProductModel.add(req.body);
        res.render("products",{products:products});
    }
}