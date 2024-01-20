// Please don't change the pre-written code
// Import the necessary modules here
import { getAllUsers } from "../../user/model/user.model.js";
let cartId = 0;
export class cartModel {
  constructor(userId, productId, quantity) {
    this.id = ++cartId;
    this.userId = userId;
    this.productId = Number(productId);
    this.quantity = Number(quantity);
  }
}
const cartItems = [new cartModel(1, 2, 5), new cartModel(3, 3, 10)];

export const addToCart = (userId, productId, quantity) => {
  // Write your code here
  const isCartExist = cartItems.find((c) => c.productId == productId);
  if (!isCartExist) {
    const cartItem = new cartModel(userId, productId, quantity);

    cartItems.push(cartItem);
  } else {
    const cartIndex = cartItems.indexOf(isCartExist);
    cartItems[cartIndex].quantity = parseInt(quantity);
  }

  const userCartItems = [];
  userCartItems.push(cartItems.filter((c) => c.userId == userId));
  return { code: 201, success: true, item: userCartItems };

  // let user = getAllUsers().find(u=>u.userId==userId);
  // if(!user)
  // {
  //   return {code:401,"success":"false", "msg":"user not found"};
  // }

  // let isCartExist = user.cart
};

export const removeFromCart = (cartItemId,userId) => {
  // Write your code here
  // const cartItemIndex = cartItems.findIndex(
  //   (i) => i.id === cartItemId && i.userId === userId
  // );


  // const cartItemIndex = cartItems.findIndex(
  //   (i) => i.id === cartItemId && i.userId === userId
  //   );

  let cartItemIndex = -1;
  let i = 0;
  cartItems.forEach(e => {
   
    if(e.id== cartItemId && e.userId == userId)
    {
      console.log("found");
      cartItemIndex = i;

    }
    i++;
  });
    
    console.log(cartItems);
  if (cartItemIndex == -1) {
    return { code: 400, success: false, msg: "operation not allowed" };
  } else {
    const item = cartItems.splice(cartItemIndex, 1);
    return { code: 200, success: true, deletedCartItem: item };
  }
};
