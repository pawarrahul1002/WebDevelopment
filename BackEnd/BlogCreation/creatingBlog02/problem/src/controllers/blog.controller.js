// Please don't change the pre-written code
// Import the necessary modules here
import BlogModel from "../models/blog.model.js"

export const renderBlogs = (req,res) => {
  // Write your code here
  let blogs = BlogModel.getAll();
  res.render("blogs",{blogs:blogs});
};
export const renderBlogForm =(req,res)  => {
  // Write your code here
  res.render("addBlogForm");
};
export const addBlog = (req,res) => {
  // Write your code here
  BlogModel.add(req.body);
  let blogs = BlogModel.getAll();
  res.render("blogs",{blogs:blogs});
};
