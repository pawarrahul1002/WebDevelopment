// app.js

import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './user/userRoutes.js';
import postRoutes from './post/postRoutes.js';
import commentRoutes from './comment/commentRoutes.js';
import likeRoutes from './like/likeRoutes.js';
import { CustomError, errorHandlingMiddleware } from './middleware/errorHandlingMiddleware.js';
import authenticationMiddleware from './middleware/authenticationMiddleware.js';
import fileUploadMiddleware from './middleware/fileUploadMiddleware.js';
import loggerMiddleware from './middleware/loggerMiddleware.js';

const app = express();
 
// Middleware
app.use(bodyParser.json());


// Logger middleware for all routes
app.use(loggerMiddleware);

// User routes (public)
app.use('/api/users/', userRoutes);
// app.use('/api/users/', userRoutes);

// Authentication middleware for secure routes
app.use(authenticationMiddleware);

// Post routes
app.use('/api/posts', postRoutes);

// Comment routes
app.use('/api/comments', commentRoutes);

// Like routes
app.use('/api/likes', likeRoutes);

// File upload middleware for posts with media
app.use('/api/posts', fileUploadMiddleware);

// Error handling middleware
app.use(errorHandlingMiddleware);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 