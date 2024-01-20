// likeModel.js

const likes = [];

const likeModel = {
  // Get all likes for a specific post
  getLikesForPost: (postId) => likes.filter(like => like.postId === postId),

  // Toggle like status for a specific post
  toggleLikeForPost: (userId, postId) => {
    const existingLikeIndex = likes.findIndex(like => like.userId === userId && like.postId === postId);

    if (existingLikeIndex !== -1) {
      // If the user has already liked the post, remove the like
      likes.splice(existingLikeIndex, 1);
      return { liked: false };
    } else {
      // If the user has not liked the post, add a new like
      const newLike = { userId, postId };
      likes.push(newLike);
      return { liked: true };
    }
  },
};

export default likeModel;
