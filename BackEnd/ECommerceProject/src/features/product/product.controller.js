import ProductModel from "./product.model.js";
import productRouter from "./product.routes.js";
export default class ProductController{
    getAllProduct(req,res)
    {
        console.log("ProductController :: getAllProduct");
        const products = ProductModel.GetAll();
        res.status(200).send(products);
    }

    addProduct(req, res){
        const {name, price, sizes} = req.body;
        const newProduct = {
            name,
            price:parseFloat(price),
            sizes:sizes.split(','),
            imageUrl: req.file.filename,
        };
        const createdRecord=ProductModel.add(newProduct);
        res.status(201).send("Post request recieved");
    }

    rateProduct(req,res)
    {

    }

    getOneProduct(req,res)
    {
        const id = req.params.id;
        const product = ProductModel.getById(id);
        if(product)
        {
            return res.status(200).send(product);
        }
        else
        {
            return res.status(404).send("Product Not found");
        }

    }

    //http://localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=Cateogory1
    
    filterProduct(req,res){i
        const {minPrice,maxPrice,category} = req.query;
        // console.log(minPrice,maxPrice,category);
        const result = ProductModel.filterProduct(minPrice,maxPrice,category);
        if(result.length>0)
        {
            return res.status(200).send(result);
        }
        else
        {
            return res.status(404).send("data Not found");
        }
    }
}