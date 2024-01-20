// Please don't change the pre-written code
// Import the necessary modules here
import {addToCart,removeFromCart } from "../model/cart.model.js"
export const addToCartController = (req, res) => {
  // Write your code here
        const {productId,quantity} = req.query;
        const userId = req.userId;
        const result = addToCart(userId,productId,quantity);
        res.status(result.code).send({success:result.success,"item":result.item});
     
};

export const removeFromCartController = (req, res) => {
  // Write your code here
  
  const userId = req.userId;
  const cartId = req.params.itemId;
  // console.log(cartId);
  const result = removeFromCart(cartId,userId);
  console.log(result);
  if(!result.success)
  {
    res.status(400).send({success: false, msg: "operation not allowed" });
  }
  else
  {
    res.status(200).send({success: true, deletedCartItem: result.deletedCartItem });
  }

};
