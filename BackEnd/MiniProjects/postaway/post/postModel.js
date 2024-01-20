// postModel.js

const posts = [];

const postModel = {
  // Get all posts
  getAllPosts: () => posts,

  // Create a new post
  createPost: ({ userId, caption, imageUrl }) => {
    const newPost = {
      id: posts.length + 1,
      userId,
      caption,
      imageUrl,
    };

    posts.push(newPost);
    return newPost;
  },

  // Get post by ID
  getPostById: (postId) => posts.find(post => post.id === postId),

  // Update post by ID
  updatePost: (postId, { caption, imageUrl }) => {
    const index = posts.findIndex(post => post.id === postId);

    if (index !== -1) {
      posts[index] = { ...posts[index], caption, imageUrl };
      return posts[index];
    }

    return null;
  },

  // Delete post by ID
  deletePost: (postId) => {
    const index = posts.findIndex(post => post.id === postId);

    if (index !== -1) {
      const deletedPost = posts.splice(index, 1)[0];
      return deletedPost;
    }

    return null;
  },
};

export default postModel;
