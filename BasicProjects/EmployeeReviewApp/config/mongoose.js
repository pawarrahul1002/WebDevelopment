// Importing mongoose library 
const mongoose = require('mongoose');
const env = require('./environment');
const mongoUrl = env.mongoose_path;

// Function to establish connection with MongoDB using async/await
 async function connectToDB() {
    try {
        // Connecting to MongoDB using Mongoose
        await mongoose.connect(mongoUrl);
        console.log('Database is connected successfully');
    } catch (err) {
        // Error handling if database connection fails
        console.log('Error in Database connection',err);
    }
};

connectToDB();

