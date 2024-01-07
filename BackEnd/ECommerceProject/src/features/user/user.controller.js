import { UserModel } from "./user.model.js";


export default class UserController{

    signUp(req,res){
        console.log("signUp called");
        const{name, email,password, type} = req.body;
        const newUser  = UserModel.signUp(name, email,password, type);
        res.status(201).send(newUser);

    }

    signIn(req,res){
        console.log("signIn called");
        const result = UserModel.signIn(req.body.email,req.body.password);
        if(!result)
        {
            return res.status(400).send("Incorrect Credentials");

        }
        else{
            res.status(200).send("Login Successful");
        }
    }
}