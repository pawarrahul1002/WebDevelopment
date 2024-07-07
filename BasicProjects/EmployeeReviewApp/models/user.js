// Importing mongoose for MongoDB schema modeling
const mongoose = require('mongoose');

// Defining the schema for the User model
const userSchema = new mongoose.Schema(
    {
        // Name of the user
        name: {
            type: String,
            required: true 
        },
        // Email of the user
        email: {
            type: String,
            required: true, 
            unique: true 
        },
        // Password of the user
        password: {
            type: String,
            required: true 
        },
        // Role of the user (e.g., Admin, Employee)
        role: {
            type: String,
            required: true 
        },
        // List of reviews assigned to the user
        reviewAssigned: [
            {   
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User' 
            }
        ],
        // List of feedback given by others to the user
        feedbackByOthers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Feedback' 
            },
        ]
    },
    {
        timestamps: true, // Automatic timestamps for createdAt and updatedAt fields
    }
)

// Creating the User model from the userSchema
const User = mongoose.model('User', userSchema);

// Exporting the User model for use in other modules
module.exports = User;
