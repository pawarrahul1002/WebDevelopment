// postRoutes.js

import express from 'express';
import postController from './postController.js';

const router = express.Router();

// Get all posts
router.get('/', postController.getAllPosts);

// Create a new post
router.post('/', postController.createPost);

// Get post by ID
router.get('/:id', postController.getPostById);

// Update post by ID
router.put('/:id', postController.updatePost);

// Delete post by ID
router.delete('/:id', postController.deletePost);

export default router;
