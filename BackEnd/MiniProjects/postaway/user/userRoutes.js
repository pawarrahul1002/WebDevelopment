// userRoutes.js

import express from 'express';
import userController from './userController.js';

const router = express.Router();

// Get all users
router.get('/', userController.getAllUsers);

// Create a new user (Signup)
router.post('/signup', userController.signUp);

// User login
router.post('/signin', userController.signIn);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user by ID
router.put('/:id', userController.updateUser);

// Delete user by ID
router.delete('/:id', userController.deleteUser);

export default router;

