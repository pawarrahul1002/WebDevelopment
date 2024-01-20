// commentController.js

import commentModel from './commentModel.js';

const commentController = {
  // Get all comments for a specific post
  getCommentsForPost: (req, res) => {
    const postId = parseInt(req.params.postId);
    const commentsForPost = commentModel.getCommentsForPost(postId);
    res.json(commentsForPost);
  },

  // Add a new comment to a specific post
  addCommentToPost: (req, res) => {
    const userId = 'user123'; // Replace with actual user ID (retrieve from token or session)
    const postId = parseInt(req.params.postId);
    const { content } = req.body;

    // Validation (Add your own validation logic)

    const newComment = commentModel.addCommentToPost(userId, postId, content);
    res.json(newComment);
  },

  // Update a specific comment by ID
  updateCommentById: (req, res) => {
    const commentId = parseInt(req.params.id);
    const { content } = req.body;

    // Validation (Add your own validation logic)

    const updatedComment = commentModel.updateCommentById(commentId, content);

    if (updatedComment) {
      res.json(updatedComment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  },

  // Delete a specific comment by ID
  deleteCommentById: (req, res) => {
    const commentId = parseInt(req.params.id);
    const deletedComment = commentModel.deleteCommentById(commentId);

    if (deletedComment) {
      res.json(deletedComment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  },
};

export default commentController;
