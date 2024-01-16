// Please don't change the pre-written code
// Import the necessary modules here

// Write your code here
import fs from "fs";
import winston from "winston";

const fsPromise = fs.promises;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "combined.log" })],
});


export const loggerMiddleware = async (req, res, next) => {
  // Write your code here  if (!req.url.includes("signin")) {
    const logData = `${req.url} - ${JSON.stringify(req.body)}`;
    logger.info(logData);
    next();
};
export default loggerMiddleware;
