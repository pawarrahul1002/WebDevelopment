// postController.js

import postModel from './postModel.js';

const postController = {
  // Get all posts
  getAllPosts: (req, res) => {
    const posts = postModel.getAllPosts();
    res.json(posts);
  },

  // Create a new post
  createPost: (req, res) => {
    const {caption, imageUrl } = req.body;

    // Validation (Add your own validation logic)
    const userId = req.userId;
    const newPost = postModel.createPost({ userId, caption, imageUrl });
    res.json(newPost);
  },

  // Get post by ID
  getPostById: (req, res) => {
    const postId = parseInt(req.params.id);
    const post = postModel.getPostById(postId);

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  },

  // Update post by ID
  updatePost: (req, res) => {
    const postId = parseInt(req.params.id);
    const { caption, imageUrl } = req.body;

    // Validation (Add your own validation logic)

    const updatedPost = postModel.updatePost(postId, { caption, imageUrl });

    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  },

  // Delete post by ID
  deletePost: (req, res) => {
    const postId = parseInt(req.params.id);
    const deletedPost = postModel.deletePost(postId);

    if (deletedPost) {
      res.json(deletedPost);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  },
};

export default postController;
