import {
  customErrorHandler
} from "./errorHandler.js";
export const invalidRoutesHandlerMiddleware = (req, res, next) => {
  
  throw new customErrorHandler(404, `Invalid path: ${req.originalUrl}` );
  // res
  //   .status(404)
  //   .json({ success: false, msg: `Invalid path: ${req.originalUrl}` });
  // next();
};
