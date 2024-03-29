import {ObjectId} from 'mongodb';
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
// import { json } from 'body-parser';

class ProductRepository{

    constructor(){
        this.collection = "products";
    }
 
    async add(newProduct){
        try{
            // 1 . Get the db.
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            console.log(products);
            return products;
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id: new ObjectId(id)});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async filter(minPrice, maxPrice, category){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression={};
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            if(maxPrice){
                filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
            }
            if(category){
                filterExpression.category=category;
            }         
            
            // logical operators 

            // if(category)
            // {
            //     filterExpression.category={$and:[{category:category}, filterExpression]};
            // }
            // if(category)
            // {
            //     filterExpression.category={$or:[{category:category}, filterExpression]};
            // }

            // // ['cat1','cat2']
            // categories = JSON.parse(categories.replace(/'/g,""));
            // if(categories)
            // {
            //     filterExpression.category={$or:[{category:{$in:categories}}, filterExpression]};
            // }
            
            // return await collection.find(filterExpression).toArray();

            return await collection.find(filterExpression).project({name:1,price:1,_id:0,rating:{$slice:1}}).toArray();       
            // to show only limited data we use .project({obj:1 to include and obj:0 to exclude})
            // to include only 1st element of rating array rating:{$slice:1} for two rating:{$slice:2}
            // to include last element of rating array rating:{$slice:-1}

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    // async rate(userID, productID, rating){
    //     try{
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         // 1. Find the product
    //         const product = await collection.findOne({_id:new ObjectId(productID)})
    //         // 2. Find the rating
           
    //         const userRating = await product?.ratings?.find(r=>r.userID==userID);
    //         if(userRating){
    //         // 3. Update the rating
    //         await collection.updateOne({
    //             _id: new ObjectId(productID), "ratings.userID": new ObjectId(userID)
    //         },{
    //             $set:{
    //                 "ratings.$.rating":rating
    //             }
    //         }
    //         );
    //         }else{
    //             await collection.updateOne({
    //                 _id:new ObjectId(productID)
    //             },{
    //                 $push: {ratings: {userID:new ObjectId(userID), rating}}
    //             })
    //         }
    //     }catch(err){
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong with database", 500);
    //     }
    // }

    async rate(userID, productID, rating){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            
            // 1. Removes existing entry
            await collection.updateOne({
                _id:new ObjectId(productID)
            },
            {
                $pull:{ratings:{userID: new ObjectId(userID)}}
            })

            // 2. Add new entry
            await collection.updateOne({
                _id:new ObjectId(productID)
            },{
                $push: {ratings: {userID:new ObjectId(userID), rating}}
            })

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async avaragePricePerCategory()
    {
        try{
            const db = getDB();
            await db.collection(this.collection)
            .aggregate([
                {
                    // stage 1 : get verge price per category
                    $group:{
                        _id:"$category",
                        avaragePrice:{$avg:"$price"}
                    }
                }
            ]).toArray();
        }
        catch(err)
        {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }

    }

}

export default ProductRepository;