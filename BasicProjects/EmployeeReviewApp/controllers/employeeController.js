// Required modules
const User = require('../models/user'); // Importing User model
const Feedback = require('../models/feedback'); // Importing Feedback model

// Controller functions for employee actions

// Function to render employee dashboard
module.exports.employee = async (req, res) => {
    try {
        let employeeAssignedForReview = [];
        const idOfAssignReview = req.user.reviewAssigned;
        let feedbackByOther = [];
        const idofFeedbacks = req.user.feedbackByOthers;

        // Retrieve employees assigned for review
        if (idOfAssignReview.length > 0) {
            for (let index = 0; index < idOfAssignReview.length; index++) {
                let employee = await User.findById(idOfAssignReview[index]);
                if (employee) {
                    employeeAssignedForReview.push(employee);
                }
            }
        }

        // Retrieve feedbacks received by the employee
        if (idofFeedbacks.length > 0) {
            for (let index = 0; index < idofFeedbacks.length; index++) {
                let feedback = await Feedback.findById(idofFeedbacks[index]).populate('reviewer', 'name');
                if (feedback) {
                    feedbackByOther.push(feedback);
                }
            }
        }

        // Render employee dashboard view with assigned reviews and feedbacks
        res.render('employee', {
            title: "Employee | Dashboard",
            assignReviews: employeeAssignedForReview,
            feedbacks: feedbackByOther
        });
    } catch (error) {
        console.log(error);
    }
}

// Function to add a review
module.exports.addReview = async (req, res) => {
    try {
        const recipient = req.query.id;
        const reviewer = req.user._id;
        const { comment } = req.body;

        // Create new feedback
        const feedbackId = await Feedback.create({
            comment,
            reviewer,
            recipient
        });

        // Update recipient's feedbackByOthers array
        const recipientEmployee = await User.findById(recipient);
        recipientEmployee.feedbackByOthers.push(feedbackId);
        await recipientEmployee.save();

        // Update reviewer's reviewAssigned array
        const reviewerEmployee = await User.findById(reviewer);
        const assignedReviews = reviewerEmployee.reviewAssigned;
        const newAssignedReview = assignedReviews.filter(
            (review) => JSON.stringify(review) !== JSON.stringify(recipient)
        );
        reviewerEmployee.reviewAssigned = newAssignedReview;
        await reviewerEmployee.save();

        // Flash message for successful addition of feedback
        req.flash('success', 'Your feedback is added !!!');
        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}
