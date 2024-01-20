// commentRoutes.js

import express from 'express';
import commentController from './commentController.js';

const router = express.Router();

// Get all comments for a specific post
router.get('/:postId', commentController.getCommentsForPost);

// Add a new comment to a specific post
router.post('/:postId', commentController.addCommentToPost);

// Update a specific comment by ID
router.put('/:id', commentController.updateCommentById);

// Delete a specific comment by ID
router.delete('/:id', commentController.deleteCommentById);

export default router;
