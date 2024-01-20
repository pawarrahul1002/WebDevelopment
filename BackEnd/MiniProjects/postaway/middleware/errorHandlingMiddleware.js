// errorHandlingMiddleware.js

class CustomError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  const errorHandlingMiddleware = (err, req, res, next) => {
    if (err instanceof CustomError) {
      // Custom error with a specific status code
      res.status(err.statusCode).json({ error: err.message });
    } else {
      // Generic error handling for unexpected errors
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export { CustomError, errorHandlingMiddleware };
  



// // In your controller
// import { CustomError } from './errorHandlingMiddleware';

// // ...

// const exampleControllerFunction = (req, res, next) => {
//   try {
//     // Your controller logic here

//     // If something goes wrong, throw a custom error
//     throw new CustomError(404, 'Resource not found');
//   } catch (error) {
//     // Pass the error to the next middleware for handling
//     next(error);
//   }
// };
