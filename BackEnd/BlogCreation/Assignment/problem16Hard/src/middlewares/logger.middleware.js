// Import the necessary modules here
import winston from "winston";

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log',options: { flags: 'w', newline: true }  })
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"
    }),
    winston.format.printf(info => {
      return JSON.stringify({
        
        level:info.level,
        timestamp: info.timestamp+" (India Standard Time)",
        "request URL": info.requestURL || "/",
        "error message": info.message
      }); // The last argument (2) is for pretty printing with an indentation of 2 spaces
    })
  )
});

// Example usage:
// logger.error({
//   level: "error",
//   message: "testing app level error handling middleware"
// });





















// import winston, { format, transports } from "winston";
// import fs from 'fs';

// const print = format.printf((info) => {
//   const log = `${info.level}: ${info.message}`;

//   return info.stack
//     ? `${log}\n${info.stack}`
//     : log;
// });

// const errorFileFormat = format.combine(
//   format.timestamp({ format: 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ' }),
//   format.errors({ stack: true }),
//   format.json()
// );

// export const logger = winston.createLogger({
//   level: 'debug',
//   format: format.combine(
//     format.errors({ stack: true }),
//     print,
//   ),
//   transports: [
//     new transports.Console(),
//     new transports.File({ filename: 'error.log', format: errorFileFormat })
//   ],
// });

// const error = new Error('Ooops');

// logger.error(error);
// logger.error('An error occurred:', error);







// const error = new Error('Ooops');/

// logger.error(error);
// logger.error('An error occurred:', error);
// export const logger = winston.createLogger({
//   level: 'debug',
//   format: winston.format.combine(
//     format.errors({ stack: true }),
//     print,
//   ),
//   transports: [new transports.Console()],
// });

// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.json(),
//   defaultMeta: { service: "request-logging" },
//   transports: [new winston.transports.File({  filename: 'error.log' })],
// });

// const loggerMiddleware = async (req, res, next) => {
//   // 1. Log request body.
//   if (!req.url.includes("signin")) {
//     const logData = `${req.url} - ${JSON.stringify(req.body)}`;
//     logger.info(logData);
//   }
//   next();
// };

// export default loggerMiddleware;




















// export const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'error.log' })
//   ],
//   format: winston.format.combine(
//     winston.format.timestamp({
//       format: "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (India Standard Time)"
//     }),
//     winston.format.printf(info => JSON.stringify({
//       level: info.level,
//       timestamp: info.timestamp,
//       "request URL": info.requestURL || "/",
//       "error message": info.message
//     }))
//   )
// });

// Example usage:
// try {
//   logger.error({
//     level: "error",
//     message: "testing app level error handling middleware"
//   });
// } catch (error) {
//   console.error("Error during logging:", error);
// }


