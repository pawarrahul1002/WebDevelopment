// export default works with
// 1 class
// 2 assignment Expression
// 3 hoisted declared function

import { body,validationResult } from "express-validator";

const validateNewItem = async (req, res, next) => {
    // validate data
    // 1. setup rules for validation
    // 2. run those rules 
    // 3. check if there are any errors after running the rules 

    const rules = [
        body("name").notEmpty().withMessage("Name is required"),
        body("price").isFloat().withMessage({ gt: 0 }).withMessage("price should be positive value"),
        body("imageUrl").isURL().withMessage("Invalid URL")


    ];

    await Promise.all(rules.map((rule)=>rule.run(req)));

    let validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        console.log(validationErrors.array()[0].msg );
        return res.render("new-product", { errorMessage: validationErrors.array()[0].msg })
    }
    next();
}

export default validateNewItem;
