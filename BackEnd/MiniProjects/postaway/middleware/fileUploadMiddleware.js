// fileUploadMiddleware.js

import multer from 'multer';

// Set up multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fileUploadMiddleware = upload.single('media');

export default fileUploadMiddleware;
