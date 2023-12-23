// export default works with
// 1 class
// 2 assignment Expression
// 3 hoisted declared function

import { body,validationResult } from "express-validator";
// import ProductModel from '../models/product.model.js';

const validateNewItem = async (req, res, next) => {
    // validate data
    // 1. setup rules for validation
    // 2. run those rules 
    // 3. check if there are any errors after running the rules 

    const rules = [
        body("name").notEmpty().withMessage("Name is required"),
        body("price").isFloat().withMessage({ gt: 0 }).withMessage("price should be positive value"),
        // body("imageUrl").isURL().withMessage("Invalid URL")
        body("imageUrl").custom((value,{req})=>{
            if(!req.file)
            {
                throw new Error("Image is required");
            }
            else{
                return true;
            }
        }),


    ];

    await Promise.all(rules.map((rule)=>rule.run(req)));

    let validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        console.log(validationErrors.array()[0].msg );
        // const productFound = ProductModel.getById(req.body.id);
        // console.log(req.body.id);
        return res.render("new-product", {product:null, errorMessage: validationErrors.array()[0].msg })
    }
    next();
}

export default validateNewItem;
