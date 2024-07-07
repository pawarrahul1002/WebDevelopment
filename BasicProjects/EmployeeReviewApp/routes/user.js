// Importing express module
const express = require('express');

// Creating a new router instance
const router = express.Router();

// Importing passport for authentication
const passport = require('passport');

// Importing userController for handling user-related routes
const userController = require('../controllers/userController');

// Route for home page
router.get('/', userController.home);

// Route for sign-up page
router.get('/sign-up', userController.signUp);

// Route for signing out
router.get('/signout', userController.signout);

// Route for user authentication
router.post('/create-session', 
    passport.authenticate(
        'local', // Using local strategy for authentication
        { failureRedirect: '/' } // Redirect to home page on authentication failure
    ),
    userController.createSession // Handler function for creating user session
);

// Route for creating a new user account
router.post('/create-account', userController.createAccount);

// Exporting the router for use in other modules
module.exports = router;
