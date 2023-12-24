// Please don't change the pre-written code
// Import the necessary modules here
import { body, validationResult } from "express-validator";

export const formValidation = async (req, res, next) => {
  // Write your code here
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      } else {
        return true;
      }
    }),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  next();
};
