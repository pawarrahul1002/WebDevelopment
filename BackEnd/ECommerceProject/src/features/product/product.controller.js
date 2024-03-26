import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
const productRepository = new ProductRepository();
export default class ProductController {

  // constructor() {
  //   // this.productRepository = new ProductRepository();
  // }

  async getAllProduct(req, res) {
    // console.log("ProductController :: getAllProduct");
    // const products = await this.productRepository.getAll();
    // res.status(200).send(products);

    console.log(req.body);
    try {
      const products = await productRepository.getAll();
      
      console.log(products);
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async addProduct(req, res) {
    try {
      const { name, desc, price, category, sizes } = req.body;
      const parsedSizes = typeof sizes === 'string' ? sizes.split(",") : [];
      console.log("data :: ",name, desc, price,req.file.filename, category, parsedSizes );
      const newProduct = new ProductModel(
        name,
        desc,
        parseFloat(price),
        req.file.filename,
        category,
        parsedSizes
      );

      const createdProduct = await productRepository.add(newProduct);
      res.status(201).send(createdProduct);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async rateProduct(req, res) {
    try {
      const userID = req.userID;
      console.log(userID);
      const productID = req.body.productId;
      const rating = req.body.rating;

      await productRepository.rate(userID, productID, rating);
      // await ProductModel.rateProduct(userID, productID, rating);
      return res.status(400).send("this is not working Rating has been added");
    } catch (err) {
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
    }
  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await productRepository.get(id);
      if (!product) {
        res.status(404).send("Product not found");
      } else {
        return res.status(200).send(product);
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  //http://localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=Cateogory1

  async filterProduct(req, res) 
  {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;
      const result = await productRepository.filter(
        minPrice,
        maxPrice,
        category
      );
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async avaragePrice(req,res,next)
  {
    try {
      const result = await productRepository.avaragePricePerCategory();
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
}
