// Importing passport for authentication
const passport = require('passport');

// Importing LocalStrategy for username/password authentication
const LocalStrategy = require('passport-local').Strategy;

// Importing bcrypt for password hashing and comparison
const bcrypt = require('bcryptjs');

// Importing the User model
const User = require('../models/user');

// Configuring Passport to use LocalStrategy for authentication
passport.use(new LocalStrategy(
    {
        usernameField: 'email' // Field for username in the request body
    },
    async (email, password, done) => {
        // Find user by email in the database
        const user = await User.findOne({ email: email });
        
        // If user is found
        if (user) {
            // Compare passwords
            const found = await bcrypt.compare(password, user.password);
            
            // If passwords match
            if (found) {
                return done(null, user); // Authentication successful
            } else {
                return done(null, false, { message: 'Incorrect password.' }); // Incorrect password
            }
        } else {
            return done(null, false, { message: 'Incorrect username.' }); // User not found
        }
    }
));

// Serialization of user for session storage
passport.serializeUser(function(user, done){
    return done(null, user.id);
});

// Deserialization of user from session storage
passport.deserializeUser(async function(id, done){
    const user = await User.findById(id);
    if (!user) {
        return done(new Error('User not found')); // User not found
    }
    return done(null, user); // Deserialization successful
});

// Middleware to check if user is authenticated
passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User authenticated, proceed to next middleware
    }
    return res.redirect('/'); // User not authenticated, redirect to home page
};

// Middleware to set authenticated user in response locals
passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user; // Set user in response locals
    }
    return next();
};

// Middleware to check if user is an admin
passport.isAdmin = function(req, res, next) {
    if (req.user.role === 'Admin') {
        return next(); // User is admin, proceed to next middleware
    }
    return res.redirect('back'); // User is not admin, redirect back
};

// Middleware to check if user is an employee
passport.isEmployee = function(req, res, next) {
    if (req.user.role === 'Employee') {
        return next(); // User is employee, proceed to next middleware
    }
    return res.redirect('back'); // User is not employee, redirect back
};

// Exporting Passport for use in other modules
module.exports = passport;
