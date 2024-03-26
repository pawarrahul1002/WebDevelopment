import mongoose from "mongoose";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { userSchema } from "./user.schema.js";
console.log("before userModel");
const userModel = mongoose.model("User", userSchema);
console.log("after userModel");

export default class UserRepository {
  async signUp(user) {
    try {
      const newUser = new userModel(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async signIn(email, password) {
    try {
      return await userModel.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async findByEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async resetPassword(userID, hashedPassword) {
    try {
      let user = await UserModel.findById(userID);
      if (user) {
        user.password = hashedPassword;
        user.save();
      } else {
        throw new Error("No such user found");
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
