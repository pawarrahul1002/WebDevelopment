// Importing express module
const express = require('express');

// Creating a new router instance
const router = express.Router();

// Importing passport for authentication
const passport = require('passport');

// Importing adminController for handling admin-related routes
const adminController = require('../controllers/adminController');

// Route to access admin dashboard
router.get('/',
    passport.checkAuthentication, // Middleware to check if user is authenticated
    passport.isAdmin, // Middleware to check if user is admin
    adminController.admin // Handler function for rendering admin dashboard
);

// Route to delete an employee
router.get('/delete/',
    passport.checkAuthentication, // Middleware to check if user is authenticated
    passport.isAdmin, // Middleware to check if user is admin
    adminController.deleteEmployee // Handler function for deleting an employee
);

// Route to render update form for an employee
router.get('/updateForm',
    passport.checkAuthentication, // Middleware to check if user is authenticated
    passport.isAdmin, // Middleware to check if user is admin
    adminController.updateForm // Handler function for rendering update form
);

// Route to update an employee
router.post('/update',
    passport.checkAuthentication, // Middleware to check if user is authenticated
    passport.isAdmin, // Middleware to check if user is admin
    adminController.updateEmployee // Handler function for updating an employee
);

// Route to render form for adding a new employee
router.get('/addEmployee',
    passport.checkAuthentication, // Middleware to check if user is authenticated
    passport.isAdmin, // Middleware to check if user is admin
    adminController.addEmployeeForm // Handler function for rendering add employee form
);

// Route to create a new employee
router.post('/createEmployee',
    passport.checkAuthentication, // Middleware to check if user is authenticated
    passport.isAdmin, // Middleware to check if user is admin
    adminController.addEmployee // Handler function for creating a new employee
);

// Route to assign a review to an employee
router.post('/assignReview',
    passport.checkAuthentication, // Middleware to check if user is authenticated
    passport.isAdmin, // Middleware to check if user is admin
    adminController.assignReview // Handler function for assigning a review
);

// Exporting the router for use in other modules
module.exports = router;
