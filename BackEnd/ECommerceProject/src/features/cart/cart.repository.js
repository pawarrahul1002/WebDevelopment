import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export default class CartItemsRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async add(productId, userId, quantity) {
    try {
      // 1 . Get the db.
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.updateOne({
        productId: new ObjectId(productId),
        userId: new ObjectId(userId),
        },
        {
          $inc:{
            quantity: quantity
          }
        },
        {upsert:true}
        );
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async get(userId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find({ userId: new ObjectId(userId) }).toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async delete(userId, cartId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection
        .deleteOne({
        _id: new ObjectId(cartId),
          userId: new ObjectId(userId),
        });

      return result.deletedCount > 0;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
