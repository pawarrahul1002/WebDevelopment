// Importing express module
const express = require('express');

// Creating a new router instance
const router = express.Router();

// Mounting user routes
router.use('/', require('./user'));

// Mounting admin routes under the /dashboard/admin path
router.use('/dashboard/admin', require('./admin'));

// Mounting employee routes under the /dashboard/employee path
router.use('/dashboard/employee', require('./employee'));

// Exporting the router for use in other modules
module.exports = router;
