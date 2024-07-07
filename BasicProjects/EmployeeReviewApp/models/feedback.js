// Importing mongoose for MongoDB schema modeling
const mongoose = require('mongoose');

// Defining the schema for the Feedback model
const feedbackSchema = new mongoose.Schema(
    {
        // Comment for the feedback
        comment: {
            type: String, 
        },
        // User who provided the feedback (reviewer)
        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        },
        // User who received the feedback (recipient)
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true, // Automatic timestamps for createdAt and updatedAt fields
    }
)

// Creating the Feedback model from the feedbackSchema
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Exporting the Feedback model for use in other modules
module.exports = Feedback;
