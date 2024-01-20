// likeController.js

import likeModel from './likeModel.js';

const likeController = {
  // Get all likes for a specific post
  getLikesForPost: (req, res) => {
    const postId = parseInt(req.params.postId);
    const likesForPost = likeModel.getLikesForPost(postId);
    res.json(likesForPost);
  },

  // Toggle like status for a specific post
  toggleLikeForPost: (req, res) => {
    const userId = 'user123'; // Replace with actual user ID (retrieve from token or session)
    const postId = parseInt(req.params.postId);

    const result = likeModel.toggleLikeForPost(userId, postId);

    if (result.liked) {
      res.json({ message: 'Like added successfully' });
    } else {
      res.json({ message: 'Like removed successfully' });
    }
  },
};

export default likeController;

