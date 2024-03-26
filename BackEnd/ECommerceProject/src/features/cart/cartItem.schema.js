import mongoose from "mongoose";

export const cartSchema = new mongoose.Schema({
    productID:{
        type: mongoose.Schema.type.objectId,
        ref:"Product"
    },

    userID:{
        type: mongoose.Schema.type.objectId,
        ref:"User"
    },

    quantity:Number


})