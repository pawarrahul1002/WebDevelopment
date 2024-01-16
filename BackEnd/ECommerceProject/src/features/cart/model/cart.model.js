export default class CartItemModel {
  constructor(productId, userId, quantity, id) {
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
    this.id = id;
  }

  static add(productId, userId, quantity) {
    const cartItem = new CartItemModel(
      productId,
      userId,
      quantity,
      cartItems.length + 1
    );
    cartItems.push(cartItem);
    return cartItem;
  }

  static getCartItems(userId) {
    return cartItems.filter((c) => c.userId == userId);
  }

  static delete(cartItemId, userId) 
  {
    
    console.log("cartItemId :: ",cartItemId," userId :: ",userId);
    const cartItemIndex = cartItems.findIndex(i=>
      i.id === cartItemId && i.userId === userId
    );

    console.log("cartItemIndex :: ",cartItemIndex," userId :: ",userId);
    if (cartItemIndex == -1) {
      return { status: false, msg: "Item not found" };
    } else {
      cartItems.splice(cartItemIndex, 1);
      return { status: true, msg: "Item deleted successfully" };
    }
  }
}

let cartItems = [new CartItemModel(1, 2, 1, 1), new CartItemModel(1, 1, 2, 2)];
