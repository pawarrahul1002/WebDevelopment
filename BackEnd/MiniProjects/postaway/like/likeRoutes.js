// likeRoutes.js

import express from 'express';
import likeController from './likeController.js';

const router = express.Router();

// Get all likes for a specific post
router.get('/:postId', likeController.getLikesForPost);

// Toggle like status for a specific post
router.get('/toggle/:postId', likeController.toggleLikeForPost);

export default router;
