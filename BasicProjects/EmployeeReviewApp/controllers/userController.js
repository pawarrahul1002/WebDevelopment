// Required modules
const User = require('../models/user'); // Importing User model
const bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing

// Controller functions for user authentication and account management

// Function to render home page
module.exports.home = (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        if (user.role === 'Admin') {
            return res.redirect('/dashboard/admin');
        }
        return res.redirect('/dashboard/employee');
    }
    return res.render('signIn', {
        title: "Sign In"
    });
}

// Function to render sign up page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        if (user.role === 'Admin') {
            return res.redirect('/dashboard/admin');
        }
        return res.redirect('/dashboard/employee');
    }
    return res.render('signUp', {
        title: "Sign Up"
    });
}

// Function to create a new user account
module.exports.createAccount = async (req, res) => {
    try {
        let { name, email, password, cnf_password, role } = req.body;
        email = email.toLowerCase();
        const userExist = await User.findOne({ email });
        if (userExist) {
            req.flash('error', 'User already exists');
            return res.redirect('/');
        }

        if (password !== cnf_password) {
            req.flash('error', 'Password does not match !!');
            return res.redirect('back');
        }

        // Hashing the password
        const cryptPassword = await bcrypt.hash(password, 10);

        // Creating new user
        const user = await User.create({
            name,
            email,
            role,
            password: cryptPassword,
        });

        req.flash('success', 'New User created, Please login !!');
        return res.status(201).redirect('/');

    } catch (error) {
        console.log(error);
    }
}

// Function to handle user login session creation
module.exports.createSession = (req, res) => {
    const user = req.user;
    req.flash('success', 'Welcome, You are logged in');
    if (user.role === 'Admin') {
        return res.redirect('/dashboard/admin');
    }
    return res.redirect('/dashboard/employee');
}

// Function to handle user signout
module.exports.signout = async (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You are logged out successfully !!');
        res.redirect('/');
    });
}
