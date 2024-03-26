import OrderRpository from "./order.repository";

const orderRpository = new OrderRpository();
export default class OrderController{

    async placeOrder(req,res,next){
        try{

            const userID = req.userID;
            await orderRpository.placeOrder(userID);
            res.status(201).send("Order is created");
        }
        catch(err)
        {
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
}