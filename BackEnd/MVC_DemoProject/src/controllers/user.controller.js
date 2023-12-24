import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController {


    getRegister(req, res) {
        res.render('register');
    }


    postRegister(req, res) {

        const { name, email, password } = req.body;
        UserModel.add(name, email, password);

        res.render('login',{errorMessage:null});
    }



    getLogin(req, res) {
        res.render('login',{errorMessage:null});
    }



    postLogin(req, res) {
        const { email, password } = req.body;
        const user = UserModel.isValid(email, password);
        if (!user) {
            console.log(email, password);
            res.render('login', { errorMessage: "Invalid Credentials" });

        }

        const products = ProductModel.getAll();
        res.render("products",{ products:products, errorMessage: null });
    }


}