import { body, validationResult } from "express-validator";

export const validateBlog = async (req, res) => {
  const rules = [
    body("title")
      .notEmpty().withMessage("Title is required.")
      .isLength({ min: 3 }).withMessage("Title should contain at least 3 characters."),
    
    body("description")
      .notEmpty().withMessage("Description is required.")
      .isLength({ min: 10 }).withMessage("Description should contain at least 10 characters."),
    
    body("image")
      .isURL().withMessage("Invalid URL for Image."),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map(error => error.msg);
    return res.render("addBlog", { errors, success: false });
  }

  res.status(201).render("addBlog", { errors: null, success: true });
};


export const renderBlogForm = (req, res) => {
  res.render("addBlog", { errors: null, success: false });
};