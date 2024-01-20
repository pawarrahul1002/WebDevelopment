// commentModel.js

const comments = [];

const commentModel = {
  // Get all comments for a specific post
  getCommentsForPost: (postId) => comments.filter(comment => comment.postId === postId),

  // Add a new comment to a specific post
  addCommentToPost: (userId, postId, content) => {
    const newComment = {
      id: comments.length + 1,
      userId,
      postId,
      content,
    };

    comments.push(newComment);
    return newComment;
  },

  // Update a specific comment by ID
  updateCommentById: (commentId, updatedContent) => {
    const index = comments.findIndex(comment => comment.id === commentId);

    if (index !== -1) {
      comments[index] = { ...comments[index], content: updatedContent };
      return comments[index];
    }

    return null;
  },

  // Delete a specific comment by ID
  deleteCommentById: (commentId) => {
    const index = comments.findIndex(comment => comment.id === commentId);

    if (index !== -1) {
      const deletedComment = comments.splice(index, 1)[0];
      return deletedComment;
    }

    return null;
  },
};

export default commentModel;
