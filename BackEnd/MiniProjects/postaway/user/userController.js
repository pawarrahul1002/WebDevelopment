// userController.js
import userModel from "./userModel.js";
import jwt from "jsonwebtoken";

const userController = {
  // Get all users
  getAllUsers: (req, res) => {
    const users = userModel.getAllUsers();
    res.json(users);
  },

  // Signup a new user
  signUp: (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    // Validation (Add your own validation logic)

    const newUser = userModel.addUser({ name, email, password });
    res.json(newUser);
  },

  // User login
  signIn: (req, res) => {
    const { email, password } = req.body;

    // Validation (Add your own validation logic)

    const user = userModel.loginUser(email, password);

    if (user) {
      const token = jwt.sign({ userId: user.id }, "your-secret-key", {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  },

  // Get user by ID
  getUserById: (req, res) => {
    const userId = parseInt(req.params.id);
    const user = userModel.getUserById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  },

  // Update user by ID
  updateUser: (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;

    // Validation (Add your own validation logic)

    const updatedUser = userModel.updateUser(userId, { name, email, password });

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  },

  // Delete user by ID
  deleteUser: (req, res) => {
    const userId = parseInt(req.params.id);
    const deletedUser = userModel.deleteUser(userId);

    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  },
};

export default userController;
