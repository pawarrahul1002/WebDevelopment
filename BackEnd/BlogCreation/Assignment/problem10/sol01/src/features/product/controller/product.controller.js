// Please don't change the pre-written code
// Import the necessary modules here
// Write your code here

import { fetchAllProducts,rateProductModel } from "../model/product.model.js";

export const getAllProducts = (req, res, next) => {
  const products = fetchAllProducts();
  res.json({ success: true, products });
};
export const getOneProduct = (req, res, next) => {
  res.json({ success: true, msg: "getOneProduct working" });
};
export const addProduct = (req, res, next) => {
  res.json({ success: true, msg: "addProduct working" });
};

// http://localhost:3000/api/product/rateproduct?userId=2&productId=3&rating=4
export const rateProduct = (req, res, next) => {
  // Write your code here
  const uId = req.query.userId;
  const pId = req.query.productId;
  const rating = req.query.rating;

  const result = rateProductModel( pId,uId, rating);
  if(!result.success)
  {
    res.status(401).send(result);
  }
  else{
    res.status(200).send(result);
  }
};
