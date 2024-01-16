import CartItemModel from "../model/cart.model.js";

export class CartItemsController{
    add(req,res){
        const {productId,quantity} = req.query;
        const userId = req.userId;
        CartItemModel.add(productId,userId,quantity);
        res.status(201).send("Cart is updated");
    }

    get(req,res)
    {
        const userId = req.userId;
        const items =   CartItemModel.getCartItems(userId);
        res.status(201).send(items);
    }

    delete(req,res)
    {
        const userId = req.userId;
        const cartId = req.params.id;
        const result = CartItemModel.delete(cartId,userId);
        if(!result.status)
        {
            res.status(400).send(result.msg);
        }
        else
        {
            res.status(200).send(result.msg)
        }
    }
    
}