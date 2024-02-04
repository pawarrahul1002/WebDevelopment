import CartItemModel from "./cart.model.js";
import CartItemsRepository from "./cart.repository.js";

const cartRepository = new CartItemsRepository();
export class CartItemsController {
  //   constructor() {
  //   }

  async add(req, res) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.userID;
      await cartRepository.add(productId, userId, quantity);
      res.status(201).send("Cart is updated");
    } catch {
      res.status(500).send("Something went wrong");
    }
  }

  async get(req, res) {
    try {
      const userId = req.userID;
      const items = await cartRepository.get(userId);
      res.status(201).send(items);
    } catch {
      res.status(500).send("Something went wrong");
    }
  }

  async delete(req, res) {
    try {
      const userId = req.userID;
      const cartId = req.params.id;

      const isDeleted = await cartRepository.delete(userId, cartId);
      if (!isDeleted) {
        res.status(201).send("Item not found");
      } else {
        res.status(201).send("Item deleted successfully");
      }
    } catch {
      res.status(500).send("Something went wrong");
    }
  }
}
