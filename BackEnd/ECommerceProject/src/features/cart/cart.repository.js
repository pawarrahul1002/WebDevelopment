import { getDB } from "../../config/mongodb";

export default class CartItemsRepository{

    constructor(){
        this.collection = "cartItems";
    }

    async add(productId,userId,quantity){
        const db = getDB();
        const collection = db.collection(this.collection);
        await collection.insertOne({productId,userId,quantity});
    }
}