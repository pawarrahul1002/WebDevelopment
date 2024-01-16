// Please don't change the pre-written code
// Import the necessary modules here
import { getAllUsers } from "../../user/model/user.model.js";

let id = 3;
const products = [
  { id: 1, name: "iphone", price: 100000 },
  { id: 2, name: "oneplus", price: 50000 },
  { id: 3, name: "samsung", price: 60000 },
];

export const fetchAllProducts = () => {
  return products;
};

export const rateProductModel = (productId, userId, rating) => {
  // Write your code here

  if (!(rating >= 0 && rating <= 5)) {
    return {
      success: false,
      msg: "rating should be b/w 0 and 5",
    };
  }

  const product = products.find((p) => p.id == productId);

  if (!product) {
    return {
      success: false,
      msg: "product not found",
    };
  }

  const user = getAllUsers().find((u) => u.id == userId);
  if (!user) {
    return {
      success: false,
      msg: "user not found",
    }; // "user not found";
  }



  if (!product.ratingArr) 
  {
    product.ratingArr = [];
    const rateObj = {
      userId: userId,
      rating: rating,
    };
    product.ratingArr.push(rateObj);
  } 
  else 
  {
    const isRatingExistByThisUser = product.ratingArr.findIndex(
      (r) => r.userId == userId
    );
    if (isRatingExistByThisUser >= 0) {
      product.ratingArr[isRatingExistByThisUser] = {
        userId: userId,
        rating: rating,
      };
    } else {
      const rateObj = {
        userId: userId,
        rating: rating,
      };
      product.ratingArr.push(rateObj);
    }
  }

  return {
    success: true,
    product: product,
  };
};
