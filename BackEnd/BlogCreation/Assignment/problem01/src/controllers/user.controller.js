// Please don't change the pre-written code
// Import the necessary modules here
import {registerUser,authenticateUser} from "../models/user.model.js"
export default class UserController {
  getRegister = (req, res, next) => {
    // Write your code here 

    res.render("user-register");
    
  };
  getLogin = (req, res, next) => {
    // Write your code here
    res.render("user-login");
  };
  addUser = (req, res) => {
    // Write your code here
    // console.log("user",req.body);
    const user = req.body;
    // const{name,email,password} = req.body;
    registerUser(user);

    res.render("user-login");
  };


  loginUser = (req, res) => {
    // Write your code here
    const{email,password} = req.body;
    const reqUser = {
      email_:email,
      pass_:password
    }
    const result = authenticateUser(reqUser);
    // console.log("result",result);
    if(result)
    {
      res.send({ success: "true", message: "login successfull" });
    }
    else
    {
      res.send({ success: "false", message: "login failed" });
    }
    // { success: "true", message: "login successfull" }; otherwise, respond with { success: "false", message: "login failed" }
  };
}
