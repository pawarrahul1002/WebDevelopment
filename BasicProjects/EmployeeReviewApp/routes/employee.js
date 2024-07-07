// Importing express module
const express = require('express');

// Creating a new router instance
const router = express.Router();

// Importing passport for authentication
const passport = require('passport');

// Importing employeeController for handling employee-related routes
const employeeController = require('../controllers/employeeController');

// Route to access employee dashboard
router.get('/',
    passport.checkAuthentication, // Middleware to check if user is authenticated
    passport.isEmployee, // Middleware to check if user is employee
    employeeController.employee // Handler function for rendering employee dashboard
);

// Route to add a review
router.post('/addReview',
    passport.checkAuthentication, // Middleware to check if user is authenticated
    passport.isEmployee, // Middleware to check if user is employee
    employeeController.addReview // Handler function for adding a review
);

// Exporting the router for use in other modules
module.exports = router;
