
export default class CartItemModel{

    constructor(productId,userId,quantity,id)
    {
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this.is = id;
    }

    static add(productId,userId,quantity)
    {
        const cartItem = new CartItemModel(productId,userId,quantity,cartItems.length+1);
        cartItems.push(cartItem);
        return cartItem;
    }
   
}

let cartItems = [new CartItemModel(1,2,1,1)];