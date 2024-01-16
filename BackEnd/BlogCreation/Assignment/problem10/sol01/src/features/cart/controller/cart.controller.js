import CartItemModel from "../model/cart.model.js";

export class CartItemsController{
    add(req,res){
        const {productId,quantity} = req.query;
        const userId = req.userId;
        CartItemModel.add(productId,userId,quantity);
        res.status(201).send("Cart is updated");
    }

    
}