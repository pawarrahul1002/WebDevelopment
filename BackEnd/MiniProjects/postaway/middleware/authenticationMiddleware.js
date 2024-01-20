// authenticationMiddleware.js

import jwt from 'jsonwebtoken';

const authenticationMiddleware = (req, res, next) => {
  // Extract the token from the request headers or cookies
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  // Verify the token
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // Attach the user ID to the request for further use in controllers
    req.userId = decoded.userId;

    // Continue with the next middleware or route handler
    next();
  });
};

export default authenticationMiddleware;
