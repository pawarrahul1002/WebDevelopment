import { UserModel } from "./user.model.js";
import Jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const userRepository = new UserRepository();

export default class UserController {
  // constructor() {
  //   this.userRepository = new UserRepository();
  // }

  async resetPassword(req, res, next){
    const {newPassword} = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    const userID = req.userID;
    try{
      await userRepository.resetPassword(userID, hashedPassword)
      res.status(200).send("Password is updated");
    }catch(err){
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
    }
  }

  async signUp(req, res) {
    console.log("signUp called");
    const { name, email, password, type } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12)
   
    const newUser = new UserModel(name, email, hashedPassword, type);
    const result = await userRepository.signUp(newUser); // UserModel.signUp(name, email, password, type);
    res.status(201).send(result);
  }

  async signIn(req, res) {
    try {
      console.log("signIn called");
      const result = await userRepository.signIn(
        req.body.email,
        req.body.password
      );
      // const result = UserModel.signIn(req.body.email, req.body.password);
      if (!result) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        const toekn = Jwt.sign(
          { 
            userId: result._id, 
            email: result.email 
          },
          
          "p9nFyMt36ffIZmym1CXPlSIlN6Hacg7Q",
          { expiresIn: "1h" }
        );

        res.status(200).send(toekn);

        //   res.status(200).send("Login Successful");
      }
    } catch (error) {
      console.log(error.message);
      throw new ApplicationError("Something went wrong", 500, error);
    }
  }
}
