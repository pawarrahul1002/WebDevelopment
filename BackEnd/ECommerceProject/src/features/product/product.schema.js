import mongoose from "monggose";

export const productSchema = new mongoose.Schema({

    name:String,
    price:Number,
    category:String,
    description:String,
    inStock:Number

})

// this.name = name;
// this.desc = desc;
// this.price = price;
// this.imageUrl = imageUrl;
// this.category = category;
// this.sizes = sizes;
// this.ratings = ratings;