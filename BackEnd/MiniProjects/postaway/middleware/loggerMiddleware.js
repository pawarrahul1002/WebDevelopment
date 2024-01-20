// loggerMiddleware.js

const loggerMiddleware = (req, res, next) => {
    // Log request URL and body (excluding user routes for privacy)
    if (!req.url.includes('/api/users')) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
    }
  
    // Continue with the next middleware or route handler
    next();
  };
  
  export default loggerMiddleware;
  