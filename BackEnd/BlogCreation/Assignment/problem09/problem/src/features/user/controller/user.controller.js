// Please don't change the pre-written code
// Import the necessary modules here
import { serialize } from 'cookie';
import  Jwt  from "jsonwebtoken";
import { addUser, confirmLogin } from "../model/user.model.js";
export const registerUser = (req, res, next) => {
  const userData = req.body;
  if (userData) {
    let user = addUser(userData);
    res.status(201).send({ status: "success", user });
  } else {
    res.status(400).json({ status: "failure", msg: "invalid user details" });
  }
};

export const loginUser = (req, res) => {
  let status = confirmLogin(req.body);
  if (status) {
    //  Write your code here to create the JWT token and store it in a cookie named "jwtToken"
    const token = Jwt.sign(
      { userId: status.id, email: status.email },
      "p9nFyMt36ffIZmym1CXPlSIlN6Hacg7Q",
      { expiresIn: "1h" }
    );

    // Set the token in a cookie
    const cookieOptions = {
      httpOnly: true, // Ensures that the cookie is only accessible through the HTTP(S) protocol
      maxAge: 3600000, // Expires in 1 hour (1h * 60min * 60s * 1000ms)
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS in production
      sameSite: "Strict", // Restricts the cookie to be sent only to the same site as the domain
      path: "/", // Specifies the path for which the cookie is valid
    };

    res.setHeader("Set-Cookie", serialize("jwtToken", token, cookieOptions));

    res
      .status(200)
      .json({ status: "success", msg: "login successfull", token });
  } else {
    res.status(400).json({ status: "failure", msg: "invalid user details" });
  }
};
